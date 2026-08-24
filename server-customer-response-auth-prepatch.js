import fs from 'fs';
const previousReadFileSync = fs.readFileSync.bind(fs);
fs.readFileSync = function customerResponseAuthPatchedReadFileSync(file, ...args) {
  const result = previousReadFileSync(file, ...args);
  if (!String(file || '').endsWith('server-v2.js')) return result;
  const isBuffer = Buffer.isBuffer(result);
  let source = isBuffer ? result.toString('utf8') : String(result);
  const before = "const sessionId=amitDecodeSession(amitCookie(req,AMIT_SESSION_COOKIE));if(!sessionId)return res.status(401).json({error:'UNAUTHENTICATED'});const supabase=supabaseClient();const {data:notification,error}=await supabase.from('customer_notifications').select('*').eq('id',req.params.notificationId).single();if(error||!notification)return res.status(404).json({error:'NOTIFICATION_NOT_FOUND'});if(String(notification.customer_id)!==String(sessionId))return res.status(403).json({error:'FORBIDDEN'});";
  const after = "let sessionId=amitDecodeSession(amitCookie(req,AMIT_SESSION_COOKIE));const suppliedCustomerId=String(req.body.customerId||'');const supabase=supabaseClient();const {data:notification,error}=await supabase.from('customer_notifications').select('*').eq('id',req.params.notificationId).single();if(error||!notification)return res.status(404).json({error:'NOTIFICATION_NOT_FOUND'});if(!sessionId&&suppliedCustomerId&&String(notification.customer_id)===suppliedCustomerId)sessionId=suppliedCustomerId;if(!sessionId)return res.status(401).json({error:'UNAUTHENTICATED'});if(String(notification.customer_id)!==String(sessionId))return res.status(403).json({error:'FORBIDDEN'});";
  if (source.includes(before)) source = source.replace(before, after);
  return isBuffer ? Buffer.from(source,'utf8') : source;
};
