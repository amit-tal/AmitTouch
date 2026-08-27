(function(){'use strict';
if(window.__AMIT_SETTINGS_ROUTE_FIX_V6__)return;
window.__AMIT_SETTINGS_ROUTE_FIX_V6__=true;
let pendingOpen=false;
function loadScript(src,key){return new Promise((resolve,reject)=>{if(window[key])return resolve();const s=document.createElement('script');s.src=src;s.async=false;s.onload=()=>{window[key]=true;resolve()};s.onerror=reject;document.body.appendChild(s)})}
async function ensureRuntime(){
  if(typeof window.AMIT_ADMIN_OPEN_SETTINGS!=='function')await loadScript('/admin-settings-stable.js?v=20260827-settings-stable-6','__AMIT_SETTINGS_STABLE_V6__');
  await loadScript('/admin-simple-settings.js?v=20260827-simple-settings-live-5','__AMIT_SIMPLE_SETTINGS_LIVE_LOADER_V5__');
  await loadScript('/admin-studio-settings-canonical.js?v=20260827-studio-canonical-1','__AMIT_STUDIO_CANONICAL_LOADER_V1__');
  await loadScript('/admin-settings-behavior-hooks.js?v=20260827-settings-hooks-3','__AMIT_SETTINGS_HOOKS_V3__');
  await loadScript('/admin-new-message.js?v=20260827-message-templates-4','__AMIT_MESSAGE_TEMPLATES_V4__');
  window.dispatchEvent(new Event('amit:settings-runtime-ready'));
}
async function open(){
  try{
    await ensureRuntime();pendingOpen=false;window.AMIT_ADMIN_OPEN_SETTINGS?.();window.dispatchEvent(new Event('amit:settings-open'));requestAnimationFrame(()=>requestAnimationFrame(()=>window.AMIT_TOUCH_REFRESH_SETTINGS?.()));
  }catch(e){pendingOpen=false;console.error('AMIT TOUCH settings runtime failed to load',e);window.amitNotice?.('לא הצלחתי לפתוח כרגע את ההגדרות. נסי שוב.','AMIT TOUCH')}
}
if(!window.__AMIT_SETTINGS_ROUTE_BOUND_V6__){window.__AMIT_SETTINGS_ROUTE_BOUND_V6__=true;document.addEventListener('click',e=>{const target=e.target.closest('#adminBody [data-open-settings],#adminBody [data-route="settings"]');if(!target)return;e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();pendingOpen=true;open()},true)}
ensureRuntime().then(()=>{if(pendingOpen)open()}).catch(e=>console.error('AMIT TOUCH settings preload failed',e));
})();