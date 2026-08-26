import fs from 'fs';
const originalReadFileSync=fs.readFileSync.bind(fs);
fs.readFileSync=function adminMessagePatchedReadFileSync(file,...args){
  const result=originalReadFileSync(file,...args);
  if(!String(file||'').endsWith('server-v2.js'))return result;
  const isBuffer=Buffer.isBuffer(result);let source=isBuffer?result.toString('utf8'):String(result);
  if(source.includes("/api/admin/messages/:customerId"))return result;
  const runtime=String.raw`
app.get('/api/admin/messages',async(req,res)=>{
  try{
    const supabase=supabaseClient();
    const {data,error}=await supabase.from('customer_notifications').select('*').order('created_at',{ascending:false}).limit(1000);
    if(error)throw error;
    const grouped=new Map();
    for(const n of data||[]){
      const customerId=String(n.customer_id||'');
      if(!customerId)continue;
      if(!grouped.has(customerId))grouped.set(customerId,{customerId,messages:[],lastAt:n.created_at||null,lastBody:n.body||''});
      grouped.get(customerId).messages.push({id:n.id,body:n.body||'',title:n.title||'',type:n.type||'',createdAt:n.created_at||null,direction:n.type==='admin_message'?'out':'in'});
    }
    const conversations=[];
    for(const item of grouped.values()){
      const customer=await getCustomer(supabase,item.customerId).catch(()=>null);
      conversations.push({customerId:item.customerId,name:customer?[customer.first_name,customer.last_name].filter(Boolean).join(' '):'לקוחה',phone:customer?.phone||'',lastAt:item.lastAt,lastBody:item.lastBody,messages:item.messages});
    }
    conversations.sort((a,b)=>new Date(b.lastAt||0)-new Date(a.lastAt||0));
    res.json({ok:true,conversations});
  }catch(error){console.error('Admin conversations failed',error);if(!res.headersSent)res.status(500).json({error:'MESSAGE_CONVERSATIONS_FAILED'})}
});
app.get('/api/admin/messages/:customerId',async(req,res)=>{
  try{
    const customerId=String(req.params.customerId||'').trim();
    if(!customerId)return res.status(400).json({error:'CUSTOMER_REQUIRED'});
    const supabase=supabaseClient();
    const customer=await getCustomer(supabase,customerId);
    if(!customer)return res.status(404).json({error:'CUSTOMER_NOT_FOUND'});
    const {data,error}=await supabase.from('customer_notifications').select('*').eq('customer_id',customerId).order('created_at',{ascending:true}).limit(300);
    if(error)throw error;
    res.json({ok:true,customer:{id:customer.id,firstName:customer.first_name,lastName:customer.last_name,phone:customer.phone||''},messages:(data||[]).map(n=>({id:n.id,body:n.body||'',title:n.title||'',type:n.type||'',createdAt:n.created_at||null,appointmentId:n.appointment_id||null,direction:n.type==='admin_message'?'out':'in'}))});
  }catch(error){console.error('Admin message history failed',error);if(!res.headersSent)res.status(500).json({error:'MESSAGE_HISTORY_FAILED'})}
});
app.post('/api/admin/messages',async(req,res)=>{
  try{
    const body=String(req.body?.body||'').trim();
    const appointmentId=req.body?.appointmentId?String(req.body.appointmentId):'';
    const suppliedCustomerId=req.body?.customerId?String(req.body.customerId):'';
    if(!body)return res.status(400).json({error:'MESSAGE_REQUIRED'});
    const supabase=supabaseClient();
    let customerId=suppliedCustomerId,appointment=null;
    if(appointmentId){
      const {data,error}=await supabase.from('appointments').select('*').eq('id',appointmentId).single();
      if(error||!data)return res.status(404).json({error:'APPOINTMENT_NOT_FOUND'});
      appointment=data;customerId=String(data.customer_id||'');
    }
    if(!customerId)return res.status(400).json({error:'CUSTOMER_REQUIRED'});
    const customer=await getCustomer(supabase,customerId);
    if(!customer)return res.status(404).json({error:'CUSTOMER_NOT_FOUND'});
    const {data:notification,error}=await supabase.from('customer_notifications').insert({customer_id:customerId,appointment_id:appointment?.id||null,type:'admin_message',title:'הודעה מעמית',body}).select().single();
    if(error)throw error;
    res.status(201).json({ok:true,notification,customer:{id:customer.id,firstName:customer.first_name,lastName:customer.last_name}});
  }catch(error){console.error('Admin message failed',error);if(!res.headersSent)res.status(500).json({error:'MESSAGE_SEND_FAILED'})}
});
`;
  source=source.replace(/app\.listen\(/,runtime+'\napp.listen(');
  return isBuffer?Buffer.from(source,'utf8'):source;
};
