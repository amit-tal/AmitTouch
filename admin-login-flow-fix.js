(function(){
'use strict';
if(window.__AMIT_ADMIN_LOGIN_FLOW_FIX__)return;
window.__AMIT_ADMIN_LOGIN_FLOW_FIX__=true;
const ADMIN_NAME='עמית טל';
const ADMIN_PHONE='0527467143';
function cleanName(v){return String(v||'').replace(/\s+/g,' ').trim()}
function cleanPhone(v){let p=String(v||'').replace(/\D/g,'');if(p.startsWith('972')&&p.length>=11)p='0'+p.slice(3);return p}
function isAdminAttempt(){return cleanName(document.getElementById('loginName')?.value)===ADMIN_NAME&&cleanPhone(document.getElementById('loginPhone')?.value)===ADMIN_PHONE}
function ensureCode(){
 let wrap=document.getElementById('adminCodeWrap');
 if(wrap){wrap.style.display='flex';return wrap.querySelector('#adminCode')}
 const phone=document.getElementById('loginPhone');
 const phoneWrap=phone?.closest('.field-wrap');
 if(!phoneWrap)return null;
 wrap=document.createElement('div');
 wrap.id='adminCodeWrap';
 wrap.className='glass field-wrap';
 wrap.style.display='flex';
 wrap.innerHTML='<span class="field-icon" aria-hidden="true">✦</span><input id="adminCode" class="field" inputmode="numeric" autocomplete="one-time-code" maxlength="4" placeholder="קוד מנהל">';
 phoneWrap.insertAdjacentElement('afterend',wrap);
 const input=wrap.querySelector('#adminCode');
 setTimeout(()=>input?.focus(),20);
 return input;
}
async function adminLogin(){
 const fullName=cleanName(document.getElementById('loginName')?.value);
 const phone=cleanPhone(document.getElementById('loginPhone')?.value);
 if(fullName!==ADMIN_NAME||phone!==ADMIN_PHONE)return false;
 const codeInput=document.getElementById('adminCode')||ensureCode();
 if(!codeInput)return true;
 const adminCode=String(codeInput.value||'').trim();
 if(!adminCode){codeInput.focus();return true}
 try{
  const response=await fetch('/api/login',{method:'POST',credentials:'same-origin',cache:'no-store',headers:{'Content-Type':'application/json'},body:JSON.stringify({fullName,phone,adminCode})});
  const data=await response.json().catch(()=>({}));
  if(response.status===401){window.amitNotice?.('קוד המנהל שגוי','לא הצלחתי להתחבר')||alert('קוד המנהל שגוי');codeInput.focus();return true}
  if(!response.ok||data.role!=='admin')throw new Error(data.error||'ADMIN_LOGIN_FAILED');
  window.AMIT_TOUCH_ENTER_ADMIN?.();
 }catch(error){console.error('Admin login failed',error);window.amitNotice?.('לא הצלחתי להתחבר כרגע. נסי שוב.','כניסת מנהל')||alert('לא הצלחתי להתחבר כרגע. נסי שוב.')}
 return true;
}
document.addEventListener('click',function(e){
 const btn=e.target.closest('#login .primary');
 if(!btn||!isAdminAttempt())return;
 e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();
 adminLogin();
},true);
document.addEventListener('keydown',function(e){
 if(e.key!=='Enter'||!isAdminAttempt())return;
 const target=e.target;
 if(!target?.closest?.('#login'))return;
 e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();
 adminLogin();
},true);
})();