(function(){'use strict';
if(window.__AMIT_SETTINGS_ROUTE_FIX_V3__)return;
window.__AMIT_SETTINGS_ROUTE_FIX_V3__=true;
let pendingOpen=false;
function loadScript(src,key){return new Promise((resolve,reject)=>{if(window[key])return resolve();const s=document.createElement('script');s.src=src;s.async=false;s.onload=()=>{window[key]=true;resolve()};s.onerror=reject;document.body.appendChild(s)})}
async function ensureRuntime(){
  if(typeof window.AMIT_ADMIN_OPEN_SETTINGS!=='function')await loadScript('/admin-settings-stable.js?v=20260827-settings-stable-3','__AMIT_SETTINGS_STABLE_V3__');
  await loadScript('/admin-simple-settings.js?v=20260827-simple-settings-2','__AMIT_SIMPLE_SETTINGS_V2__').catch(e=>console.error('AMIT TOUCH simple settings failed to load',e));
  window.dispatchEvent(new Event('amit:settings-runtime-ready'));
}
async function open(){try{await ensureRuntime();pendingOpen=false;window.AMIT_ADMIN_OPEN_SETTINGS?.();setTimeout(()=>window.AMIT_TOUCH_REFRESH_SETTINGS?.(),0)}catch(e){pendingOpen=false;console.error('AMIT TOUCH settings runtime failed to load',e);window.amitNotice?.('לא הצלחתי לפתוח כרגע את ההגדרות. נסי שוב.','AMIT TOUCH')}}
if(!window.__AMIT_SETTINGS_ROUTE_BOUND__){window.__AMIT_SETTINGS_ROUTE_BOUND__=true;document.addEventListener('click',e=>{const target=e.target.closest('#adminBody [data-open-settings],#adminBody [data-route="settings"]');if(!target)return;e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();pendingOpen=true;open()},true)}
ensureRuntime().then(()=>{if(pendingOpen)open()}).catch(()=>{});
})();