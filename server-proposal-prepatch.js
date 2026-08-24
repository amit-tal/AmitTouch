import fs from 'fs';
const originalReadFileSync = fs.readFileSync.bind(fs);
fs.readFileSync = function proposalPatchedReadFileSync(file, ...args) {
  const result = originalReadFileSync(file, ...args);
  if (!String(file || '').endsWith('server-v2.js')) return result;
  const isBuffer = Buffer.isBuffer(result);
  let source = isBuffer ? result.toString('utf8') : String(result);
  if (source.includes("/api/admin/appointments/:appointmentId/propose")) return result;

  const runtime = String.raw`
function proposalBody(data){return JSON.stringify({kind:'reschedule_proposal',...data});}
function parseProposalBody(value){try{const data=JSON.parse(String(value||''));return data&&data.kind==='reschedule_proposal'?data:null}catch(_){return null}}

async function proposalHasConflict(supabase, appointmentId, start, blockedEnd){
  const {data:conflicts,error}=await supabase.from('appointments').select('id').neq('id',appointmentId).in('status',['pending','confirmed']).lt('starts_at',blockedEnd.toUTC().toISO()).gt('ends_at',start.toUTC().toISO()).limit(1);
  if(error) throw error;
  if(conflicts&&conflicts.length) return true;
  const {data:rows,error:proposalError}=await supabase.from('customer_notifications').select('appointment_id,body').eq('type','reschedule_proposal').neq('appointment_id',appointmentId).limit(100);
  if(proposalError) throw proposalError;
  for(const row of rows||[]){
    const p=parseProposalBody(row.body); if(!p||p.status!=='pending') continue;
    const ps=DateTime.fromISO(String(p.date||'')+'T'+String(p.time||''),{zone:TZ}); if(!ps.isValid) continue;
    const pe=ps.plus({minutes:Number(p.minutes||60)+BUFFER_MINUTES});
    if(start.toMillis()<pe.toMillis()&&blockedEnd.toMillis()>ps.toMillis()) return true;
  }
  return false;
}

app.post('/api/admin/appointments/:appointmentId/propose',async(req,res)=>{
  try{
    const date=String(req.body?.date||''),time=String(req.body?.time||''),message=String(req.body?.message||'').trim();
    if(!/^\d{4}-\d{2}-\d{2}$/.test(date)||!/^\d{2}:\d{2}$/.test(time)) return res.status(400).json({error:'INVALID_PROPOSAL'});
    const supabase=supabaseClient();
    const {data:appointment,error}=await supabase.from('appointments').select('*').eq('id',req.params.appointmentId).single();
    if(error||!appointment) return res.status(404).json({error:'APPOINTMENT_NOT_FOUND'});
    const customer=await getCustomer(supabase,appointment.customer_id);
    if(!customer) return res.status(404).json({error:'CUSTOMER_NOT_FOUND'});
    const start=DateTime.fromISO(date+'T'+time,{zone:TZ});
    if(!start.isValid||start<=DateTime.now().setZone(TZ)) return res.status(400).json({error:'INVALID_PROPOSAL_TIME'});
    const minutes=Number(appointment.treatment_minutes||60),blockedEnd=start.plus({minutes:minutes+BUFFER_MINUTES});
    if(await proposalHasConflict(supabase,appointment.id,start,blockedEnd)) return res.status(409).json({error:'SLOT_TAKEN'});

    await supabase.from('customer_notifications').delete().eq('appointment_id',appointment.id).eq('type','reschedule_proposal');
    const data={appointmentId:appointment.id,date,time,endTime:start.plus({minutes}).toFormat('HH:mm'),service:appointment.service_name,price:Number(appointment.total_price||0),minutes,message,status:'pending'};
    const {data:notification,error:noticeError}=await supabase.from('customer_notifications').insert({customer_id:appointment.customer_id,appointment_id:appointment.id,type:'reschedule_proposal',title:'עמית הציעה לך מועד אחר',body:proposalBody(data)}).select().single();
    if(noticeError) throw noticeError;

    res.status(201).json({ok:true,notification,proposal:data});
    setImmediate(()=>supabase.from('admin_notifications').insert({type:'reschedule_proposal_sent',title:'ממתינה לתגובת הלקוחה',body:customer.first_name+' '+customer.last_name+' · '+date+' · '+time,customer_id:appointment.customer_id,appointment_id:appointment.id,is_read:false,metadata:{...data,status:'pending_customer_response'}}).then(({error})=>{if(error)console.error('Proposal admin notification failed',error)}).catch(e=>console.error('Proposal admin notification failed',e)));
  }catch(error){console.error('Proposal failed',error);if(!res.headersSent)res.status(500).json({error:'PROPOSAL_FAILED'})}
});

app.post('/api/customer-notifications/:notificationId/respond',async(req,res)=>{
  try{
    const decision=String(req.body?.decision||''), suppliedCustomerId=String(req.body?.customerId||'');
    if(!['accept','reject'].includes(decision)) return res.status(400).json({error:'INVALID_DECISION'});
    const supabase=supabaseClient();
    const {data:notification,error}=await supabase.from('customer_notifications').select('*').eq('id',req.params.notificationId).single();
    if(error||!notification) return res.status(404).json({error:'NOTIFICATION_NOT_FOUND'});
    let sessionId=amitDecodeSession(amitCookie(req,AMIT_SESSION_COOKIE));
    if(!sessionId&&suppliedCustomerId&&String(notification.customer_id)===suppliedCustomerId) sessionId=suppliedCustomerId;
    if(!sessionId) return res.status(401).json({error:'UNAUTHENTICATED'});
    if(String(notification.customer_id)!==String(sessionId)) return res.status(403).json({error:'FORBIDDEN'});
    const proposal=parseProposalBody(notification.body);
    if(!proposal) return res.status(409).json({error:'NOT_A_PROPOSAL'});
    if(proposal.status!=='pending') return res.json({ok:true,status:proposal.status});

    if(decision==='reject'){
      proposal.status='rejected';
      const {error:updateError}=await supabase.from('customer_notifications').update({type:'reschedule_rejected',body:proposalBody(proposal),updated_at:new Date().toISOString()}).eq('id',notification.id);
      if(updateError) throw updateError;
      res.json({ok:true,status:'rejected'});
      setImmediate(()=>supabase.from('admin_notifications').insert({type:'reschedule_rejected',title:'הלקוחה דחתה את ההצעה',body:proposal.date+' · '+proposal.time,customer_id:notification.customer_id,appointment_id:notification.appointment_id,is_read:false,metadata:{...proposal,status:'rejected_customer_response'}}).catch(e=>console.error('Reject admin notice failed',e)));
      return;
    }

    const {data:appointment,error:apptError}=await supabase.from('appointments').select('*').eq('id',notification.appointment_id).single();
    if(apptError||!appointment) return res.status(404).json({error:'APPOINTMENT_NOT_FOUND'});
    const start=DateTime.fromISO(String(proposal.date||'')+'T'+String(proposal.time||''),{zone:TZ});
    const blockedEnd=start.plus({minutes:Number(appointment.treatment_minutes||proposal.minutes||60)+BUFFER_MINUTES});
    if(await proposalHasConflict(supabase,appointment.id,start,blockedEnd)) return res.status(409).json({error:'SLOT_TAKEN'});

    proposal.status='accepted';
    const {data:updated,error:updateError}=await supabase.from('appointments').update({starts_at:start.toUTC().toISO(),ends_at:blockedEnd.toUTC().toISO(),status:'confirmed'}).eq('id',appointment.id).select().single();
    if(updateError) throw updateError;
    const {error:noticeUpdateError}=await supabase.from('customer_notifications').update({type:'reschedule_accepted',body:proposalBody(proposal),updated_at:new Date().toISOString()}).eq('id',notification.id);
    if(noticeUpdateError) throw noticeUpdateError;

    res.json({ok:true,status:'accepted',appointment:updated});
    setImmediate(()=>supabase.from('admin_notifications').insert({type:'reschedule_accepted',title:'הלקוחה אישרה את הזמן החדש',body:proposal.date+' · '+proposal.time,customer_id:notification.customer_id,appointment_id:appointment.id,is_read:false,metadata:{...proposal,status:'accepted_customer_response'}}).then(({error})=>{if(error)console.error('Accepted admin notice failed',error)}).catch(e=>console.error('Accepted admin notice failed',e)));
  }catch(error){console.error('Proposal response failed',error);if(!res.headersSent)res.status(500).json({error:'PROPOSAL_RESPONSE_FAILED'})}
});
`;

  source = source.replace(/app\.listen\(/, runtime + '\napp.listen(');
  return isBuffer ? Buffer.from(source,'utf8') : source;
};
