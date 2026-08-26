import fs from 'fs';
const originalReadFileSync=fs.readFileSync.bind(fs);
fs.readFileSync=function adminCustomersPatchedReadFileSync(file,...args){
  const result=originalReadFileSync(file,...args);
  if(!String(file||'').endsWith('server-v2.js'))return result;
  const isBuffer=Buffer.isBuffer(result);let source=isBuffer?result.toString('utf8'):String(result);
  if(source.includes('ADMIN_CUSTOMERS_PATCH_V1'))return result;
  const runtime=String.raw`
/* ADMIN_CUSTOMERS_PATCH_V1 */
app.get('/api/admin/customers',async(req,res)=>{
  try{
    const supabase=supabaseClient();
    const {data,error}=await supabase.from('customers').select('id,first_name,last_name,phone,birth_date,created_at').order('created_at',{ascending:false});
    if(error)throw error;
    res.set('Cache-Control','no-store');
    res.json({ok:true,customers:(data||[]).map(c=>({id:c.id,firstName:c.first_name,lastName:c.last_name,fullName:[c.first_name,c.last_name].filter(Boolean).join(' '),phone:c.phone||'',birthDate:c.birth_date||null,createdAt:c.created_at||null}))});
  }catch(error){console.error('Admin customers failed',error);if(!res.headersSent)res.status(500).json({error:'CUSTOMERS_LOAD_FAILED'})}
});
app.post('/api/admin/customers',async(req,res)=>{
  try{
    const firstName=String(req.body?.firstName||'').trim(),lastName=String(req.body?.lastName||'').trim();
    const phone=String(req.body?.phone||'').replace(/\D/g,'');const birthDate=req.body?.birthDate||null;
    if(!firstName||!lastName||phone.length<9)return res.status(400).json({error:'INVALID_CUSTOMER'});
    const supabase=supabaseClient();
    const {data:existing}=await supabase.from('customers').select('id').eq('phone',phone).maybeSingle();
    if(existing)return res.status(409).json({error:'PHONE_EXISTS'});
    const {data,error}=await supabase.from('customers').insert({first_name:firstName,last_name:lastName,phone,birth_date:birthDate}).select().single();
    if(error)throw error;
    res.status(201).json({ok:true,customer:{id:data.id,firstName:data.first_name,lastName:data.last_name,fullName:[data.first_name,data.last_name].filter(Boolean).join(' '),phone:data.phone||'',birthDate:data.birth_date||null}});
  }catch(error){console.error('Admin customer create failed',error);if(!res.headersSent)res.status(500).json({error:'CUSTOMER_CREATE_FAILED'})}
});
app.delete('/api/admin/customers/:customerId',async(req,res)=>{
  try{
    const id=String(req.params.customerId||'').trim();if(!id)return res.status(400).json({error:'CUSTOMER_REQUIRED'});
    const supabase=supabaseClient();
    await supabase.from('customer_notifications').delete().eq('customer_id',id);
    await supabase.from('admin_notifications').delete().eq('customer_id',id);
    await supabase.from('appointments').delete().eq('customer_id',id);
    const {error}=await supabase.from('customers').delete().eq('id',id);if(error)throw error;
    res.json({ok:true});
  }catch(error){console.error('Admin customer delete failed',error);if(!res.headersSent)res.status(500).json({error:'CUSTOMER_DELETE_FAILED'})}
});
`;
  source=source.replace(/app\.listen\(/,runtime+'\napp.listen(');
  return isBuffer?Buffer.from(source,'utf8'):source;
};
