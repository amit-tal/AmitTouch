(function(){
'use strict';
const ADMIN_PHONE='0527467143';
function cleanPhone(v){let p=String(v||'').replace(/\D/g,'');if(p.startsWith('972')&&p.length>=11)p='0'+p.slice(3);return p}
function cleanName(v){return String(v||'').replace(/\s+/g,' ').trim()}
function ensureCode(){let wrap=document.getElementById('adminCodeWrap');if(!wrap){const phone=document.getElementById('loginPhone');const row=phone?.closest('.field-wrap');if(!row)return null;wrap=document.createElement('div');wrap.id='adminCodeWrap';wrap.className='glass field-wrap';wrap.innerHTML='<span class="field-icon">✦</span><input id="adminCode" class="field" inputmode="numeric" autocomplete="one-time-code" maxlength="4" placeholder="קוד מנהל">';row.insertAdjacentElement('afterend',wrap)}wrap.style.display='flex';const input=wrap.querySelector('#adminCode');setTimeout(()=>input?.focus(),0);return input}
async function adminLogin(){
 const name=cleanName(document.getElementById('loginName')?.value);
 const phone=cleanPhone(document.getElementById('loginPhone')?.value);
 if(phone!==ADMIN_PHONE)return false;
 if(!name)return true;
 const code=String(document.getElementById('adminCode')?.value||'').trim();
 try{
  const r=await fetch('/api/login',{method:'POST',credentials:'same-origin',cache:'no-store',headers:{'Content-Type':'application/json'},body:JSON.stringify({fullName:name,phone,adminCode:code})});
  const data=await r.json().catch(()=>({}));
  if(r.status===403&&(data.requiresAdminCode||data.error==='ADMIN_CODE_REQUIRED')){ensureCode();return true}
  if(r.status===401){ensureCode();alert('קוד המנהל שגוי');return true}
  if(r.ok&&data.role==='admin'){
   try{localStorage.removeItem('amitUser');localStorage.removeItem('amit-touch-signed-in-customer-v5')}catch(_){}
   window.user={name:'עמית טל',phone:ADMIN_PHONE,admin:true};
   window.AMIT_TOUCH_ENTER_ADMIN?.();
   return true;
  }
  alert('לא הצלחתי להתחבר כמנהל כרגע.');
  return true;
 }catch(e){console.error('Admin login failed',e);alert('לא הצלחתי להתחבר כמנהל כרגע.');return true}
}
function intercept(e){
 const btn=e.target?.closest?.('#login .primary');
 if(!btn)return;
 if(cleanPhone(document.getElementById('loginPhone')?.value)!==ADMIN_PHONE)return;
 e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();adminLogin();
}
document.addEventListener('click',intercept,true);
document.addEventListener('keydown',function(e){if(e.key!=='Enter'||!e.target?.closest?.('#login'))return;if(cleanPhone(document.getElementById('loginPhone')?.value)!==ADMIN_PHONE)return;e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();adminLogin()},true);
window.addEventListener('load',function(){const btn=document.querySelector('#login .primary');if(btn)btn.onclick=null});
})();