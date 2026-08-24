import fs from 'fs';
const prev=fs.readFileSync.bind(fs);
fs.readFileSync=function fastProposalPatch(file,...args){
  const result=prev(file,...args);
  if(!String(file||'').endsWith('server-v2.js')) return result;
  const isBuffer=Buffer.isBuffer(result); let source=isBuffer?result.toString('utf8'):String(result);
  if(source.includes("/api/admin/proposal-fast/:appointmentId")) return result;
  const runtime=String.raw`
function fastProposalParse(value){try{const p=JSON.parse(String(value||''));return p&&p.kind==='reschedule_proposal'?p:null}catch(_){return null}}
function fastProposalBody(data){return JSON.stringify({kind:'reschedule_proposal',...data})}
app.post('/api/admin/proposal-fast/:appointmentId',async(req,res)=>{
  try{
    const date=String(req.body?.date||''),time=String(req.body?.time||''),message=String(req.body?.message||'').trim();
    if(!/^\d{4}-\d{2}-\d{2}$/.test(date)||!/^\d{2}:\d{2}$/.test(time)) return res.status(400).json({error:'INVALID_PROPOSAL'});
    const supabase=supabaseClient();
    const {data:appointment,error}=await supabase.from('appointments').select('*').eq('id',req.params.appointmentId).single();
    if(error||!appointment) return res.status(404).json({error:'APPOINTMENT_NOT_FOUND'});
    const customer=await getCustomer(supabase,appointment.customer_id); if(!customer) return res.status(404).json({error:'CUSTOMER_NOT_FOUND'});
    const start=DateTime.fromISO(date+'T'+time,{zone:TZ}); if(!start.isValid||start<=DateTime.now().setZone(TZ)) return res.status(400).json({error:'INVALID_PROPOSAL_TIME'});
    const minutes=Number(appointment.treatment_minutes||60), blockedEnd=start.plus({minutes:minutes+BUFFER_MINUTES});
    const startIso=start.toUTC().toISO(),endIso=blockedEnd.toUTC().toISO();
    const {data:conflicts,error:conflictError}=await supabase.from('appointments').select('id').neq('id',appointment.id).in('status',['pending','confirmed']).lt('starts_at',endIso).gt('ends_at',startIso).limit(1);
    if(conflictError) throw conflictError; if(conflicts&&conflicts.length) return res.status(409).json({error:'SLOT_TAKEN'});
    const {data:rows}=await supabase.from('customer_notifications').select('id,appointment_id,type,body,created_at').in('type',['reschedule_proposal','reschedule_accepted','reschedule_rejected']).order('created_at',{ascending:false}).limit(500);
    const seen=new Set(); for(const row of rows||[]){const key=String(row.appointment_id||''); if(!key||seen.has(key)){continue} seen.add(key); if(String(row.appointment_id)===String(appointment.id)) continue; const p=fastProposalParse(row.body); if(!p||row.type!=='reschedule_proposal'||p.status!=='pending') continue; const ps=DateTime.fromISO(String(p.date)+'T'+String(p.time),{zone:TZ}); if(!ps.isValid) continue; const pe=ps.plus({minutes:Number(p.minutes||60)+BUFFER_MINUTES}); if(start.toMillis()<pe.toMillis()&&blockedEnd.toMillis()>ps.toMillis()) return res.status(409).json({error:'SLOT_TAKEN'});}
    const {data:oldRows}=await supabase.from('customer_notifications').select('id,body').eq('appointment_id',appointment.id).eq('type','reschedule_proposal');
    for(const old of oldRows||[]){const p=fastProposalParse(old.body); if(p&&p.status==='pending'){p.status='superseded'; await supabase.from('customer_notifications').update({type:'reschedule_rejected',body:fastProposalBody(p),updated_at:new Date().toISOString()}).eq('id',old.id)}}
    const data={appointmentId:appointment.id,date,time,endTime:start.plus({minutes}).toFormat('HH:mm'),service:appointment.service_name,price:Number(appointment.total_price||0),minutes,message,status:'pending'};
    const {data:notification,error:noticeError}=await supabase.from('customer_notifications').insert({customer_id:appointment.customer_id,appointment_id:appointment.id,type:'reschedule_proposal',title:'עמית הציעה לך מועד אחר',body:fastProposalBody(data)}).select().single();
    if(noticeError) throw noticeError;
    res.status(201).json({ok:true,notification,proposal:data});
    setImmediate(()=>supabase.from('admin_notifications').insert({type:'reschedule_proposal_sent',title:'ממתינה לתגובת הלקוחה',body:customer.first_name+' '+customer.last_name+' · '+date+' · '+time,customer_id:appointment.customer_id,appointment_id:appointment.id,is_read:false,metadata:{...data,status:'pending_customer_response'}}).then(({error})=>{if(error)console.error('Fast proposal admin notice',error)}).catch(e=>console.error('Fast proposal admin notice',e)));
  }catch(error){console.error('Fast proposal failed',error); if(!res.headersSent) res.status(500).json({error:'PROPOSAL_FAILED'})}
});
app.post('/api/customer-proposal-response-fast/:notificationId',async(req,res)=>{
  try{
    const decision=String(req.body?.decision||''),customerId=String(req.body?.customerId||''); if(!['accept','reject'].includes(decision)) return res.status(400).json({error:'INVALID_DECISION'});
    const supabase=supabaseClient();
    const {data:notification,error}=await supabase.from('customer_notifications').select('*').eq('id',req.params.notificationId).single(); if(error||!notification) return res.status(404).json({error:'NOTIFICATION_NOT_FOUND'});
    if(!customerId||String(notification.customer_id)!==customerId) return res.status(403).json({error:'FORBIDDEN'});
    const proposal=fastProposalParse(notification.body); if(!proposal) return res.status(409).json({error:'NOT_A_PROPOSAL'}); if(proposal.status!=='pending') return res.json({ok:true,status:proposal.status});
    const {data:appointment,error:apptError}=await supabase.from('appointments').select('*').eq('id',notification.appointment_id).single(); if(apptError||!appointment) return res.status(404).json({error:'APPOINTMENT_NOT_FOUND'});
    if(decision==='reject'){
      proposal.status='rejected'; await supabase.from('customer_notifications').update({type:'reschedule_rejected',body:fastProposalBody(proposal),updated_at:new Date().toISOString()}).eq('id',notification.id);
      res.json({ok:true,status:'rejected'});
      setImmediate(()=>supabase.from('admin_notifications').insert({type:'reschedule_rejected',title:'הלקוחה דחתה את ההצעה',body:proposal.date+' · '+proposal.time,customer_id:notification.customer_id,appointment_id:appointment.id,is_read:false,metadata:{...proposal,status:'rejected_customer_response'}})); return;
    }
    const start=DateTime.fromISO(String(proposal.date)+'T'+String(proposal.time),{zone:TZ}); const blockedEnd=start.plus({minutes:Number(appointment.treatment_minutes||proposal.minutes||60)+BUFFER_MINUTES});
    const {data:conflicts,error:conflictError}=await supabase.from('appointments').select('id').neq('id',appointment.id).in('status',['pending','confirmed']).lt('starts_at',blockedEnd.toUTC().toISO()).gt('ends_at',start.toUTC().toISO()).limit(1); if(conflictError) throw conflictError; if(conflicts&&conflicts.length) return res.status(409).json({error:'SLOT_TAKEN'});
    proposal.status='accepted'; const {data:updated,error:updateError}=await supabase.from('appointments').update({starts_at:start.toUTC().toISO(),ends_at:blockedEnd.toUTC().toISO(),status:'confirmed'}).eq('id',appointment.id).select().single(); if(updateError) throw updateError;
    await supabase.from('customer_notifications').update({type:'reschedule_accepted',body:fastProposalBody(proposal),updated_at:new Date().toISOString()}).eq('id',notification.id);
    res.json({ok:true,status:'accepted',appointment:updated});
    setImmediate(()=>supabase.from('admin_notifications').insert({type:'reschedule_accepted',title:'הלקוחה אישרה את הזמן החדש',body:proposal.date+' · '+proposal.time,customer_id:notification.customer_id,appointment_id:appointment.id,is_read:false,metadata:{...proposal,status:'accepted_customer_response'}}).then(({error})=>{if(error)console.error('Fast response admin notice',error)}).catch(e=>console.error('Fast response admin notice',e)));
  }catch(error){console.error('Fast customer response failed',error); if(!res.headersSent) res.status(500).json({error:'PROPOSAL_RESPONSE_FAILED'})}
});
`;
  source=source.replace(/app\.listen\(/,runtime+'\napp.listen(');
  return isBuffer?Buffer.from(source,'utf8'):source;
};
