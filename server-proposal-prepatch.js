import fs from 'fs';
const originalReadFileSync=fs.readFileSync.bind(fs);
fs.readFileSync=function proposalPatchedReadFileSync(file,...args){
  const result=originalReadFileSync(file,...args);
  if(!String(file||'').endsWith('server-v2.js'))return result;
  const isBuffer=Buffer.isBuffer(result);let source=isBuffer?result.toString('utf8'):String(result);
  if(source.includes("/api/admin/appointments/:appointmentId/propose"))return result;
  const runtime=String.raw`
function proposalBody(data){return JSON.stringify({kind:'reschedule_proposal',...data});}
function parseProposalBody(value){try{const data=JSON.parse(String(value||''));return data&&data.kind==='reschedule_proposal'?data:null}catch(_){return null}}
async function proposalSlotIsFree(supabase,appointment,start,blockedEnd){
  const startIso=start.toUTC().toISO(),endIso=blockedEnd.toUTC().toISO();
  const {data:conflicts,error}=await supabase.from('appointments').select('id').neq('id',appointment.id).in('status',['pending','confirmed']).lt('starts_at',endIso).gt('ends_at',startIso).limit(1);
  if(error)throw error;if(conflicts&&conflicts.length)return false;
  const calendar=calendarClient();
  const {busy}=await getBusyPeriods(calendar,startIso,endIso);
  return !busy.some(item=>conflictsWithBusy(start,blockedEnd,item));
}
app.post('/api/admin/appointments/:appointmentId/propose',async(req,res)=>{
  try{
    const date=String(req.body.date||''),time=String(req.body.time||''),message=String(req.body.message||'').trim();
    if(!/^\d{4}-\d{2}-\d{2}$/.test(date)||!/^\d{2}:\d{2}$/.test(time))return res.status(400).json({error:'INVALID_PROPOSAL'});
    const supabase=supabaseClient();
    const {data:appointment,error}=await supabase.from('appointments').select('*').eq('id',req.params.appointmentId).single();
    if(error||!appointment)return res.status(404).json({error:'APPOINTMENT_NOT_FOUND'});
    const customer=await getCustomer(supabase,appointment.customer_id);if(!customer)return res.status(404).json({error:'CUSTOMER_NOT_FOUND'});
    const start=DateTime.fromISO(date+'T'+time,{zone:TZ});if(!start.isValid||start<=DateTime.now().setZone(TZ))return res.status(400).json({error:'INVALID_PROPOSAL_TIME'});
    const minutes=Number(appointment.treatment_minutes||60),blockedEnd=start.plus({minutes:minutes+BUFFER_MINUTES});
    const hours=getAppointmentStartWindow(start);if(start.hour<hours.firstHour||start.hour>hours.lastHour)return res.status(409).json({error:'OUTSIDE_WORK_HOURS'});
    if(!(await proposalSlotIsFree(supabase,appointment,start,blockedEnd)))return res.status(409).json({error:'SLOT_TAKEN'});
    const end=start.plus({minutes});
    const data={appointmentId:appointment.id,date,time,endTime:end.toFormat('HH:mm'),service:appointment.service_name,price:Number(appointment.total_price||0),minutes,message,status:'pending'};
    const body=proposalBody(data);
    const {data:notification,error:noticeError}=await supabase.from('customer_notifications').insert({customer_id:appointment.customer_id,appointment_id:appointment.id,type:'reschedule_proposal',title:'עמית הציעה לך מועד אחר',body}).select().single();
    if(noticeError)throw noticeError;
    try{await supabase.from('admin_notifications').insert({type:'reschedule_proposal_sent',title:'הצעת זמן נשלחה',body:customer.first_name+' '+customer.last_name+' · '+date+' · '+time,customer_id:appointment.customer_id,appointment_id:appointment.id,metadata:data})}catch(e){console.error('Proposal admin notification failed',e)}
    res.status(201).json({ok:true,notification,proposal:data});
  }catch(error){console.error('Proposal failed',error);res.status(500).json({error:'PROPOSAL_FAILED'})}
});
app.post('/api/customer-notifications/:notificationId/respond',async(req,res)=>{
  try{
    const decision=String(req.body.decision||'');if(!['accept','reject'].includes(decision))return res.status(400).json({error:'INVALID_DECISION'});
    const sessionId=amitDecodeSession(amitCookie(req,AMIT_SESSION_COOKIE));if(!sessionId)return res.status(401).json({error:'UNAUTHENTICATED'});
    const supabase=supabaseClient();
    const {data:notification,error}=await supabase.from('customer_notifications').select('*').eq('id',req.params.notificationId).single();
    if(error||!notification)return res.status(404).json({error:'NOTIFICATION_NOT_FOUND'});if(String(notification.customer_id)!==String(sessionId))return res.status(403).json({error:'FORBIDDEN'});
    const proposal=parseProposalBody(notification.body);if(!proposal)return res.status(409).json({error:'NOT_A_PROPOSAL'});if(proposal.status!=='pending')return res.json({ok:true,status:proposal.status});
    const {data:appointment,error:apptError}=await supabase.from('appointments').select('*').eq('id',notification.appointment_id).single();if(apptError||!appointment)return res.status(404).json({error:'APPOINTMENT_NOT_FOUND'});
    if(decision==='reject'){
      proposal.status='rejected';await supabase.from('customer_notifications').update({type:'reschedule_rejected',body:proposalBody(proposal)}).eq('id',notification.id);
      try{await supabase.from('admin_notifications').insert({type:'reschedule_rejected',title:'הלקוחה דחתה את ההצעה',body:proposal.date+' · '+proposal.time,customer_id:notification.customer_id,appointment_id:appointment.id,metadata:proposal})}catch(e){console.error(e)}
      return res.json({ok:true,status:'rejected'});
    }
    const start=DateTime.fromISO(proposal.date+'T'+proposal.time,{zone:TZ}),blockedEnd=start.plus({minutes:Number(appointment.treatment_minutes||proposal.minutes||60)+BUFFER_MINUTES});
    if(!(await proposalSlotIsFree(supabase,appointment,start,blockedEnd)))return res.status(409).json({error:'SLOT_TAKEN'});
    const {data:updated,error:updateError}=await supabase.from('appointments').update({starts_at:start.toUTC().toISO(),ends_at:blockedEnd.toUTC().toISO(),status:'confirmed'}).eq('id',appointment.id).select().single();if(updateError)throw updateError;
    const customer=await getCustomer(supabase,appointment.customer_id);try{await syncApprovedAppointmentToIcloud(updated,customer)}catch(e){console.error('Proposal iCloud sync failed',e)}
    proposal.status='accepted';await supabase.from('customer_notifications').update({type:'reschedule_accepted',body:proposalBody(proposal)}).eq('id',notification.id);
    try{await supabase.from('admin_notifications').insert({type:'reschedule_accepted',title:'הלקוחה אישרה את הזמן החדש',body:proposal.date+' · '+proposal.time,customer_id:notification.customer_id,appointment_id:appointment.id,metadata:proposal})}catch(e){console.error(e)}
    res.json({ok:true,status:'accepted',appointment:updated});
  }catch(error){console.error('Proposal response failed',error);res.status(500).json({error:'PROPOSAL_RESPONSE_FAILED'})}
});
`;
  source=source.replace(/app\.listen\(/,runtime+'\napp.listen(');
  return isBuffer?Buffer.from(source,'utf8'):source;
};
