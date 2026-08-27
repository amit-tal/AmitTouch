(function(){
'use strict';
if(window.__AMIT_SETTINGS_DIRECT_ACTIONS_V1__)return;
window.__AMIT_SETTINGS_DIRECT_ACTIONS_V1__=true;

const ADMIN_KEY='amit-touch-admin-session-v1';
const CUSTOMER_KEY='amit-touch-signed-in-customer-v5';
const PREVIEW_KEY='amit-touch-admin-preview-mode';

function clearAdminSession(){
  try{localStorage.removeItem(ADMIN_KEY)}catch(_){}
  try{sessionStorage.removeItem(ADMIN_KEY)}catch(_){}
  window.__AMIT_ADMIN_SESSION__=false;
}

async function saveToggle(button){
  const key=button.dataset.liveSetting;
  if(!key)return;
  const next=!button.classList.contains('on');
  button.classList.toggle('on',next);
  button.setAttribute('aria-pressed',next?'true':'false');
  try{
    const r=await fetch('/api/admin/settings',{method:'PATCH',headers:{'Content-Type':'application/json','Cache-Control':'no-cache'},cache:'no-store',body:JSON.stringify({[key]:next})});
    const j=await r.json().catch(()=>({}));
    if(!r.ok)throw new Error(j.error||'SETTINGS_SAVE_FAILED');
    window.dispatchEvent(new CustomEvent('amit:settings-changed',{detail:{[key]:next}}));
  }catch(err){
    button.classList.toggle('on',!next);
    button.setAttribute('aria-pressed',!next?'true':'false');
    window.amitNotice?.('לא הצלחתי לשמור כרגע. נסי שוב.','AMIT TOUCH');
  }
}

async function openCustomerMode(){
  try{
    const r=await fetch('/api/admin/customer-preview?ts='+Date.now(),{cache:'no-store',headers:{'Cache-Control':'no-cache'}});
    const j=await r.json().catch(()=>({}));
    if(!r.ok||!j.customer)throw new Error(j.error||'CUSTOMER_PREVIEW_FAILED');
    const customer={...j.customer,admin:false};
    try{localStorage.setItem(CUSTOMER_KEY,JSON.stringify(customer))}catch(_){}
    try{sessionStorage.setItem(PREVIEW_KEY,'1')}catch(_){}
    clearAdminSession();
    window.user=customer;
    window.location.reload();
  }catch(err){
    window.amitNotice?.('לא הצלחתי לפתוח כרגע את תצוגת הלקוחה. נסי שוב.','AMIT TOUCH');
  }
}

async function logoutNow(){
  try{await fetch('/api/logout',{method:'POST',cache:'no-store'})}catch(_){}
  try{
    [ADMIN_KEY,CUSTOMER_KEY,PREVIEW_KEY].forEach(k=>localStorage.removeItem(k));
    [ADMIN_KEY,CUSTOMER_KEY,PREVIEW_KEY].forEach(k=>sessionStorage.removeItem(k));
  }catch(_){}
  window.__AMIT_ADMIN_SESSION__=false;
  window.user=null;
  window.location.assign('/');
}

window.addEventListener('click',e=>{
  const root=e.target.closest?.('.ast');
  if(!root)return;
  const toggle=e.target.closest?.('.ast-switch[data-live-setting]');
  if(toggle){
    e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();
    saveToggle(toggle);
    return;
  }
  const view=e.target.closest?.('.ast-view');
  if(view){
    e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();
    openCustomerMode();
    return;
  }
  const out=e.target.closest?.('.ast-logout');
  if(out){
    e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();
    logoutNow();
  }
},true);
})();
