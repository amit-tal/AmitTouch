(function(){
  const KEY='amit-touch-signed-in-customer-v5';
  const OLD_KEYS=['amit-touch-signed-in-customer-v4','amit-touch-signed-in-customer-v3','amit-touch-signed-in-customer-v2','amit-touch-signed-in-customer-v1'];
  const DB_NAME='amit-touch-device-session';
  const STORE='session';
  let explicitLogout=false;

  function currentUser(){try{return typeof user!=='undefined'?user:(window.user||null)}catch(_){return window.user||null}}
  function assignUser(value){try{user=value}catch(_){}window.user=value}
  function assignAppointments(value){try{appointments=value}catch(_){}window.appointments=value}
  function cleanUser(u){if(!u||!u.id||u.admin)return null;return{id:u.id,name:u.name||u.fullName||'',firstName:u.firstName||u.first_name||'',lastName:u.lastName||u.last_name||'',phone:u.phone||'',dob:u.dob||u.birthDate||null}}

  function localRead(){
    if(window.__AMIT_EARLY_SESSION__?.id)return cleanUser(window.__AMIT_EARLY_SESSION__);
    try{
      const primary=localStorage.getItem(KEY);
      if(primary){const parsed=cleanUser(JSON.parse(primary));if(parsed)return parsed}
      for(const old of OLD_KEYS){const raw=localStorage.getItem(old);if(raw){const parsed=cleanUser(JSON.parse(raw));if(parsed)return parsed}}
    }catch(_){}
    return null;
  }
  function localWrite(value){
    try{
      const saved=cleanUser(value);
      if(saved){localStorage.setItem(KEY,JSON.stringify(saved));OLD_KEYS.forEach(k=>localStorage.removeItem(k));window.__AMIT_EARLY_SESSION__=saved}
      else{localStorage.removeItem(KEY);OLD_KEYS.forEach(k=>localStorage.removeItem(k));window.__AMIT_EARLY_SESSION__=null}
    }catch(_){}
  }

  function openDb(){return new Promise(resolve=>{try{const req=indexedDB.open(DB_NAME,1);req.onupgradeneeded=()=>{if(!req.result.objectStoreNames.contains(STORE))req.result.createObjectStore(STORE)};req.onsuccess=()=>resolve(req.result);req.onerror=()=>resolve(null)}catch(_){resolve(null)}})}
  async function idbWrite(value){const db=await openDb();if(!db)return;await new Promise(resolve=>{try{const tx=db.transaction(STORE,'readwrite');const store=tx.objectStore(STORE);value?store.put(value,'customer'):store.delete('customer');tx.oncomplete=tx.onerror=tx.onabort=()=>resolve()}catch(_){resolve()}});db.close()}
  async function idbRead(){const db=await openDb();if(!db)return null;const value=await new Promise(resolve=>{try{const tx=db.transaction(STORE,'readonly');const req=tx.objectStore(STORE).get('customer');req.onsuccess=()=>resolve(cleanUser(req.result)||null);req.onerror=()=>resolve(null)}catch(_){resolve(null)}});db.close();return value}
  async function serverRead(){try{const r=await fetch('/api/session',{credentials:'same-origin',cache:'no-store'});if(!r.ok)return null;const d=await r.json();return d?.authenticated?cleanUser(d.customer):null}catch(_){return null}}

  function persistValue(value){const saved=cleanUser(value||currentUser());if(!saved||explicitLogout)return false;localWrite(saved);idbWrite(saved);return true}
  window.AMIT_TOUCH_PERSIST_SESSION=persistValue;

  async function clearPersisted(){localWrite(null);await idbWrite(null)}
  function mapAppointment(row){const start=new Date(row.starts_at);const extras=Array.isArray(row.extras)?row.extras:[];return{id:row.id,appointmentId:row.id,customerId:row.customer_id,service:row.service_name,price:Number(row.total_price||0),date:new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Jerusalem',year:'numeric',month:'2-digit',day:'2-digit'}).format(start),time:new Intl.DateTimeFormat('he-IL',{timeZone:'Asia/Jerusalem',hour:'2-digit',minute:'2-digit',hour12:false}).format(start),minutes:row.treatment_minutes,buffer:row.buffer_minutes,extra:extras.map(x=>x.name).filter(Boolean).join(', '),eventId:row.google_event_id,status:row.status}}
  async function refreshAppointments(saved){try{const response=await fetch('/api/customers/'+encodeURIComponent(saved.id)+'/appointments',{cache:'no-store'});if(!response.ok)return;const data=await response.json();assignAppointments((data.appointments||[]).filter(x=>x.status!=='cancelled').map(mapAppointment));window.renderHomeAppointments?.();window.renderNext?.()}catch(error){console.warn('Appointments refresh deferred',error)}}
  function forceHome(saved){if(!saved?.id)return false;assignUser(saved);document.querySelectorAll('.screen').forEach(x=>x.classList.remove('active'));document.getElementById('home')?.classList.add('active');document.getElementById('nav')?.classList.add('show');try{window.enterApp?.()}catch(_){}document.querySelectorAll('.screen').forEach(x=>x.classList.remove('active'));document.getElementById('home')?.classList.add('active');document.getElementById('nav')?.classList.add('show');window.renderHomeAppointments?.();window.renderNext?.();return true}
  function activate(saved){if(!saved?.id)return false;persistValue(saved);forceHome(saved);refreshAppointments(saved);return true}

  const originalEnter=window.enterApp;
  if(typeof originalEnter==='function')window.enterApp=function(){persistValue(currentUser());return originalEnter.apply(this,arguments)};

  window.logout=function(){
    explicitLogout=true;
    clearPersisted();
    try{fetch('/api/logout',{method:'POST',credentials:'same-origin',cache:'no-store',keepalive:true}).catch(()=>{})}catch(_){}
    assignUser(null);assignAppointments([]);
    document.getElementById('nav')?.classList.remove('show');
    document.querySelectorAll('.screen').forEach(x=>x.classList.remove('active'));
    document.getElementById('login')?.classList.add('active');
    try{window.scrollTo(0,0)}catch(_){}
  };

  async function restore(){
    let saved=null;
    try{if(window.__AMIT_BOOT_SESSION_PROMISE__)saved=cleanUser(await window.__AMIT_BOOT_SESSION_PROMISE__)}catch(_){}
    if(!saved)saved=localRead();
    if(!saved)saved=await idbRead();
    if(!saved)saved=await serverRead();
    if(saved){localWrite(saved);await idbWrite(saved);activate(saved);return true}
    return false;
  }

  window.AMIT_TOUCH_RESTORE_SESSION=restore;
  window.__AMIT_SESSION_READY__=restore().finally(()=>{window.__AMIT_SESSION_RESTORE_DONE__=true;window.dispatchEvent(new Event('amit:session-ready'))});
  window.addEventListener('pagehide',()=>persistValue(currentUser()),{capture:true});
  window.addEventListener('beforeunload',()=>persistValue(currentUser()),{capture:true});
  document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='hidden')persistValue(currentUser())});
})();