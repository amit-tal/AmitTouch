import fs from 'fs';
const previousReadFileSync = fs.readFileSync.bind(fs);
fs.readFileSync = function proposalResponsePatchedReadFileSync(file, ...args) {
  const result = previousReadFileSync(file, ...args);
  if (!String(file || '').endsWith('server-v2.js')) return result;
  const isBuffer = Buffer.isBuffer(result);
  let source = isBuffer ? result.toString('utf8') : String(result);
  const oldBlock = "if(noticeError)throw noticeError;try{await supabase.from('admin_notifications').insert({type:'reschedule_proposal_sent',title:'הצעת זמן נשלחה',body:customer.first_name+' '+customer.last_name+' · '+date+' · '+time,customer_id:appointment.customer_id,appointment_id:appointment.id,metadata:{...data,status:'pending_customer_response'}})}catch(e){console.error('Proposal admin notification failed',e)}res.status(201).json({ok:true,notification,proposal:data})";
  const newBlock = "if(noticeError)throw noticeError;res.status(201).json({ok:true,notification,proposal:data});setImmediate(()=>{supabase.from('admin_notifications').insert({type:'reschedule_proposal_sent',title:'הצעת זמן נשלחה',body:customer.first_name+' '+customer.last_name+' · '+date+' · '+time,customer_id:appointment.customer_id,appointment_id:appointment.id,metadata:{...data,status:'pending_customer_response'}}).then(({error})=>{if(error)console.error('Proposal admin notification failed',error)}).catch(e=>console.error('Proposal admin notification failed',e))})";
  if (source.includes(oldBlock)) source = source.replace(oldBlock, newBlock);
  return isBuffer ? Buffer.from(source, 'utf8') : source;
};
