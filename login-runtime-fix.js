(function(){
'use strict';
if(window.__AMIT_LOGIN_FINAL_INSTALLED__)return;
window.__AMIT_LOGIN_FINAL_INSTALLED__=true;
const ADMIN_PHONE='0527467143';

function cleanPhone(value){let phone=String(value||'').replace(/\D/g,'');if(phone.startsWith('972')&&phone.length>=11)phone='0'+phone.slice(3);return phone}
function cleanName(value){return String(value||'').replace(/\s+/g,' ').trim()}
function mapAppointment(row){const start=new Date(row.starts_at),extras=Array.isArray(row.extras)?row.extras:[];return{id:row.id,appointmentId:row.id,customerId:row.customer_id,service:row.service_name,price:Number(row.total_price||0),date:new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Jerusalem',year:'numeric',month:'2-digit',day:'2-digit'}).format(start),time:new Intl.DateTimeFormat('he-IL',{timeZone:'Asia/Jerusalem',hour:'2-digit',minute:'2-digit',hour12:false}).format(start),minutes:row.treatment_minutes,buffer:row.buffer_minutes,extra:extras.map(x=>x.name).filter(Boolean).join(', '),eventId:row.google_event_id,status:row.status}}
function enterSafely(){if(typeof window.enterApp==='function')return window.enterApp();document.getElementById('nav')?.classList.add('show');if(typeof window.show==='function')return window.show('home');document.getElementById('login')?.classList.remove('active');document.getElementById('home')?.classList.add('active')}
function ensureAdminCode(){let w=document.getElementById('adminCodeWrap');if(w){w.style.display='flex';const i=w.querySelector('#adminCode');setTimeout(()=>i?.focus(),0);return i}const phone=document.getElementById('loginPhone');const wrap=phone?.closest('.field-wrap');if(!wrap)return null;w=document.createElement('div');w.id='adminCodeWrap';w.className='glass field-wrap';w.style.display='flex';w.innerHTML='<span class="field-icon">✦</span><input id="adminCode" class="field" inputmode="numeric" autocomplete="one-time-code" maxlength="4" placeholder="קוד מנהל">';wrap.insertAdjacentElement('afterend',w);const i=w.querySelector('#adminCode');setTimeout(()=>i?.focus(),0);return i}
function enterAdmin(){
 try{localStorage.removeItem('amitUser');localStorage.removeItem('amit-touch-signed-in-customer-v5');sessionStorage.removeItem('amit-touch-signed-in-customer-v5');localStorage.setItem('amit-touch-admin-session-v1','1');sessionStorage.setItem('amit-touch-admin-session-v1','1')}catch(_){}
 window.__AMIT_ADMIN_SESSION__=true;
 window.user={name:'עמית טל',phone:ADMIN_PHONE,admin:true};
 if(typeof window.AMIT_TOUCH_ENTER_ADMIN==='function'){window.AMIT_TOUCH_ENTER_ADMIN();return}
 document.body.classList.add('admin-session-active','admin-v2');
 document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));
 document.getElementById('admin')?.classList.add('active');
 document.querySelectorAll('#nav,.nav').forEach(n=>{n.classList.remove('show');n.style.display='none'});
 if(typeof window.renderAdminV2==='function')Promise.resolve(window.renderAdminV2()).catch(console.error);
 else if(typeof window.renderAdmin==='function')Promise.resolve(window.renderAdmin()).catch(console.error);
}
async function doLogin(){
 const nameEl=document.getElementById('loginName'),phoneEl=document.getElementById('loginPhone');
 if(!nameEl||!phoneEl)return;
 const fullName=cleanName(nameEl.value),phone=cleanPhone(phoneEl.value);
 if(!fullName||phone.length<9)return alert('יש למלא שם מלא ומספר נייד');
 const isAdminPhone=phone===ADMIN_PHONE;
 const codeEl=document.getElementById('adminCode');
 if(isAdminPhone&&!codeEl){ensureAdminCode();return}
 const adminCode=String(codeEl?.value||'').trim();
 if(isAdminPhone&&!adminCode){ensureAdminCode()?.focus();return}
 try{
  const response=await fetch('/api/login',{method:'POST',credentials:'same-origin',headers:{'Content-Type':'application/json'},cache:'no-store',body:JSON.stringify({fullName,phone,adminCode})});
  const data=await response.json().catch(()=>({}));
  if(isAdminPhone){
   if(response.ok&&data.role==='admin'){enterAdmin();return}
   if(response.status===401){alert('קוד המנהל שגוי');ensureAdminCode()?.focus();return}
   if(response.status===403){ensureAdminCode()?.focus();return}
   throw new Error(data.error||'ADMIN_LOGIN_FAILED');
  }
  if(response.status===404){const parts=fullName.split(' '),first=document.getElementById('regFirst'),last=document.getElementById('regLast'),regPhone=document.getElementById('regPhone');if(first)first.value=parts.shift()||'';if(last)last.value=parts.join(' ');if(regPhone)regPhone.value=phone;if(typeof window.show==='function')window.show('register');return}
  if(response.status===401)return alert('השם ומספר הטלפון לא תואמים לחשבון הרשום');
  if(!response.ok)throw new Error(data.error||'LOGIN_FAILED');
  if(!data.customer||!data.customer.id)throw new Error('INVALID_CUSTOMER_RESPONSE');
  window.AMIT_TOUCH_CLEAR_ADMIN?.();
  window.user={id:data.customer.id,name:data.customer.fullName,firstName:data.customer.firstName,lastName:data.customer.lastName,phone:data.customer.phone,dob:data.customer.birthDate};
  try{localStorage.setItem('amit-touch-signed-in-customer-v5',JSON.stringify(window.user))}catch(_){}
  window.appointments=[];
  enterSafely();
  fetch('/api/customers/'+encodeURIComponent(window.user.id)+'/appointments',{cache:'no-store'}).then(r=>r.ok?r.json():Promise.reject(new Error('APPOINTMENTS_FAILED'))).then(result=>{window.appointments=(result.appointments||[]).filter(x=>x.status!=='cancelled').map(mapAppointment);window.renderHomeAppointments?.();window.renderNext?.()}).catch(error=>console.warn('Signed in successfully; appointments will retry later.',error));
 }catch(error){console.error('Login failed',error);alert('לא הצלחתי להתחבר כרגע. נסי שוב בעוד רגע.')}
}

function interceptClick(e){const btn=e.target?.closest?.('#login .primary');if(!btn)return;e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();doLogin()}
function interceptEnter(e){if(e.key!=='Enter'||!e.target?.closest?.('#login'))return;e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();doLogin()}
function install(){const button=document.querySelector('#login .primary');if(!button)return setTimeout(install,50);button.onclick=null;button.removeAttribute('onclick');window.login=doLogin;document.addEventListener('click',interceptClick,true);document.addEventListener('keydown',interceptEnter,true)}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>setTimeout(install,0),{once:true});else setTimeout(install,0);
})();