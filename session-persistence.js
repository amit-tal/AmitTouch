(function(){
  const KEY='amit-touch-signed-in-customer-v1';
  function currentUser(){try{return typeof user!=='undefined'?user:window.user||null}catch(_){return window.user||null}}
  function assignUser(value){try{user=value}catch(_){}window.user=value}
  function assignAppointments(value){try{appointments=value}catch(_){}window.appointments=value}
  function save(){const u=currentUser();if(!u||!u.id||u.admin)return;try{localStorage.setItem(KEY,JSON.stringify({id:u.id,name:u.name||'',firstName:u.firstName||'',lastName:u.lastName||'',phone:u.phone||'',dob:u.dob||null}))}catch(_){}}
  function clear(){try{localStorage.removeItem(KEY)}catch(_){}}
  function read(){try{return JSON.parse(localStorage.getItem(KEY)||'null')}catch(_){return null}}
  function mapAppointment(row){const start=new Date(row.starts_at);const extras=Array.isArray(row.extras)?row.extras:[];return{id:row.id,appointmentId:row.id,customerId:row.customer_id,service:row.service_name,price:Number(row.total_price||0),date:new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Jerusalem',year:'numeric',month:'2-digit',day:'2-digit'}).format(start),time:new Intl.DateTimeFormat('he-IL',{timeZone:'Asia/Jerusalem',hour:'2-digit',minute:'2-digit',hour12:false}).format(start),minutes:row.treatment_minutes,buffer:row.buffer_minutes,extra:extras.map(x=>x.name).filter(Boolean).join(', '),eventId:row.google_event_id,status:row.status}}
  const originalEnter=window.enterApp;
  if(typeof originalEnter==='function')window.enterApp=function(){save();return originalEnter.apply(this,arguments)};
  const originalLogout=window.logout;
  window.logout=function(){clear();assignUser(null);assignAppointments([]);try{document.getElementById('nav')?.classList.remove('show')}catch(_){}if(typeof originalLogout==='function'){try{return originalLogout.apply(this,arguments)}catch(_){}}window.show?.('login')};
  async function refreshAppointments(saved){try{const response=await fetch('/api/customers/'+encodeURIComponent(saved.id)+'/appointments',{cache:'no-store'});if(!response.ok)return;const data=await response.json();assignAppointments((data.appointments||[]).filter(x=>x.status!=='cancelled').map(mapAppointment));window.renderHomeAppointments?.();window.renderNext?.();}catch(error){console.warn('Appointments refresh deferred',error)}}
  function restoreImmediately(){const saved=read();if(!saved?.id||currentUser()?.id)return false;assignUser(saved);if(!Array.isArray(window.appointments))assignAppointments([]);if(typeof window.enterApp==='function')window.enterApp();refreshAppointments(saved);return true}
  window.AMIT_TOUCH_RESTORE_SESSION=restoreImmediately;
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',restoreImmediately,{once:true});else restoreImmediately();
})();