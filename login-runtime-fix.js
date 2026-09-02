(function(){
'use strict';
function cleanPhone(value){let phone=String(value||'').replace(/\D/g,'');if(phone.startsWith('972')&&phone.length>=11)phone='0'+phone.slice(3);return phone}
function cleanName(value){return String(value||'').replace(/\s+/g,' ').trim()}
function mapAppointment(row){const start=new Date(row.starts_at),extras=Array.isArray(row.extras)?row.extras:[];return{id:row.id,appointmentId:row.id,customerId:row.customer_id,service:row.service_name,price:Number(row.total_price||0),date:new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Jerusalem',year:'numeric',month:'2-digit',day:'2-digit'}).format(start),time:new Intl.DateTimeFormat('he-IL',{timeZone:'Asia/Jerusalem',hour:'2-digit',minute:'2-digit',hour12:false}).format(start),minutes:row.treatment_minutes,buffer:row.buffer_minutes,extra:extras.map(x=>x.name).filter(Boolean).join(', '),eventId:row.google_event_id,status:row.status}}
function enterSafely(){if(typeof window.enterApp==='function')return window.enterApp();document.getElementById('nav')?.classList.add('show');if(typeof window.show==='function')return window.show('home');document.getElementById('login')?.classList.remove('active');document.getElementById('home')?.classList.add('active')}
function ensureAdminCode(){let w=document.getElementById('adminCodeWrap');if(w){w.style.display='flex';const existing=w.querySelector('#adminCode');setTimeout(()=>existing?.focus(),10);return existing}const phone=document.getElementById('loginPhone');const wrap=phone?.closest('.field-wrap');if(!wrap)return null;w=document.createElement('div');w.id='adminCodeWrap';w.className='glass field-wrap';w.style.display='flex';w.innerHTML='<span class="field-icon">✦</span><input id="adminCode" class="field" inputmode="numeric" autocomplete="one-time-code" maxlength="4" placeholder="קוד מנהל">';wrap.insertAdjacentElement('afterend',w);const input=w.querySelector('#adminCode');setTimeout(()=>input?.focus(),10);return input}
async function doLogin(){
 const name=document.getElementById('loginName'),phoneInput=document.getElementById('loginPhone');
 if(!name||!phoneInput)return;
 const fullName=cleanName(name.value),phone=cleanPhone(phoneInput.value);
 if(!fullName||phone.length<9)return alert('יש למלא שם מלא ומספר נייד');
 const adminCode=String(document.getElementById('adminCode')?.value||'').trim();
 try{
  const response=await fetch('/api/login',{method:'POST',credentials:'same-origin',headers:{'Content-Type':'application/json'},cache:'no-store',body:JSON.stringify({fullName,phone,adminCode})});
  const data=await response.json().catch(()=>({}));
  if(response.status===403&&(data.requiresAdminCode||data.error==='ADMIN_CODE_REQUIRED')){ensureAdminCode();return}
  if(response.status===401&&document.getElementById('adminCode')){alert('קוד המנהל שגוי');document.getElementById('adminCode')?.focus();return}
  if(response.ok&&data.role==='admin'){window.AMIT_TOUCH_ENTER_ADMIN?.();return}
  if(response.status===404){const parts=fullName.split(' '),first=document.getElementById('regFirst'),last=document.getElementById('regLast'),regPhone=document.getElementById('regPhone');if(first)first.value=parts.shift()||'';if(last)last.value=parts.join(' ');if(regPhone)regPhone.value=phone;if(typeof window.show==='function')window.show('register');return}
  if(response.status===401)return alert('השם ומספר הטלפון לא תואמים לחשבון הרשום');
  if(!response.ok)throw new Error(data.error||'LOGIN_FAILED');
  if(!data.customer||!data.customer.id)throw new Error('INVALID_CUSTOMER_RESPONSE');
  window.AMIT_TOUCH_CLEAR_ADMIN?.();
  window.user={id:data.customer.id,name:data.customer.fullName,firstName:data.customer.firstName,lastName:data.customer.lastName,phone:data.customer.phone,dob:data.customer.birthDate};
  window.appointments=[];
  enterSafely();
  fetch('/api/customers/'+encodeURIComponent(window.user.id)+'/appointments',{cache:'no-store'}).then(r=>r.ok?r.json():Promise.reject(new Error('APPOINTMENTS_FAILED'))).then(result=>{window.appointments=(result.appointments||[]).filter(x=>x.status!=='cancelled').map(mapAppointment);window.renderHomeAppointments?.();window.renderNext?.()}).catch(error=>console.warn('Signed in successfully; appointments will retry later.',error));
 }catch(error){console.error('Login failed',error);alert('לא הצלחתי להתחבר כרגע. נסי שוב בעוד רגע.')}
}
function install(){
 const name=document.getElementById('loginName'),phoneInput=document.getElementById('loginPhone');
 if(!name||!phoneInput)return setTimeout(install,50);
 window.login=doLogin;
 const button=document.querySelector('#login .primary');
 if(button){button.onclick=null;button.addEventListener('click',function(e){e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();doLogin()},true)}
 document.addEventListener('keydown',function(e){if(e.key!=='Enter'||!e.target?.closest?.('#login'))return;e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();doLogin()},true)
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>setTimeout(install,0),{once:true});else setTimeout(install,0)
})();