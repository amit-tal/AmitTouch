(function(){'use strict';
if(window.__AMIT_SETTINGS_ROUTE_FIX_V2__)return;
window.__AMIT_SETTINGS_ROUTE_FIX_V2__=true;
let ready=typeof window.AMIT_ADMIN_OPEN_SETTINGS==='function';
let pendingOpen=false;
function open(){
  if(typeof window.AMIT_ADMIN_OPEN_SETTINGS==='function'){
    pendingOpen=false;
    window.AMIT_ADMIN_OPEN_SETTINGS();
  }else{
    pendingOpen=true;
  }
}
function bind(){
  if(window.__AMIT_SETTINGS_ROUTE_BOUND__)return;
  window.__AMIT_SETTINGS_ROUTE_BOUND__=true;
  document.addEventListener('click',e=>{
    const target=e.target.closest('#adminBody [data-open-settings],#adminBody [data-route="settings"]');
    if(!target)return;
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();
    open();
  },true);
}
bind();
if(!ready){
  const s=document.createElement('script');
  s.src='/admin-settings-stable.js?v=20260827-settings-stable-2';
  s.async=false;
  s.onload=()=>{
    ready=true;
    window.dispatchEvent(new Event('amit:settings-runtime-ready'));
    if(pendingOpen)open();
  };
  s.onerror=()=>{
    pendingOpen=false;
    console.error('AMIT TOUCH settings runtime failed to load');
  };
  document.body.appendChild(s);
}
})();