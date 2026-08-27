(function(){'use strict';
if(window.__AMIT_SETTINGS_ROUTE_FIX_V9__)return;
window.__AMIT_SETTINGS_ROUTE_FIX_V9__=true;
let pendingOpen=false;
function loadScript(src,key){return new Promise((resolve,reject)=>{if(window[key])return resolve();const s=document.createElement('script');s.src=src;s.async=false;s.onload=()=>{window[key]=true;resolve()};s.onerror=reject;document.body.appendChild(s)})}
async function ensureRuntime(){
  await loadScript('/admin-settings-main-canonical.js?v=20260827-settings-main-canonical-1','__AMIT_SETTINGS_MAIN_CANONICAL_LOADER_V1__');
  await loadScript('/admin-simple-settings.js?v=20260827-simple-settings-live-8','__AMIT_SIMPLE_SETTINGS_LIVE_LOADER_V8__');
  await loadScript('/admin-studio-settings-canonical.js?v=20260827-studio-canonical-4','__AMIT_STUDIO_CANONICAL_LOADER_V4__');
  await loadScript('/admin-settings-final-ui-fix.js?v=20260827-settings-final-ui-3','__AMIT_SETTINGS_FINAL_UI_LOADER_V3__');
  await loadScript('/admin-settings-behavior-hooks.js?v=20260827-settings-hooks-6','__AMIT_SETTINGS_HOOKS_V6__');
  await loadScript('/admin-new-message.js?v=20260827-message-templates-7','__AMIT_MESSAGE_TEMPLATES_V7__');
  window.AMIT_ADMIN_OPEN_SETTINGS=window.AMIT_TOUCH_OPEN_SETTINGS_CANONICAL;
  window.dispatchEvent(new Event('amit:settings-runtime-ready'));
}
async function open(){try{await ensureRuntime();pendingOpen=false;document.querySelectorAll('.ast,.ast-sub').forEach(x=>x.remove());window.AMIT_TOUCH_OPEN_SETTINGS_CANONICAL?.();window.dispatchEvent(new Event('amit:settings-open'));requestAnimationFrame(()=>requestAnimationFrame(()=>{window.AMIT_TOUCH_PATCH_SETTINGS_FINAL_UI?.();window.AMIT_TOUCH_REFRESH_SETTINGS?.()}))}catch(e){pendingOpen=false;console.error('AMIT TOUCH canonical settings runtime failed to load',e);window.amitNotice?.('לא הצלחתי לפתוח כרגע את ההגדרות. נסי שוב.','AMIT TOUCH')}}
if(!window.__AMIT_SETTINGS_ROUTE_BOUND_V9__){window.__AMIT_SETTINGS_ROUTE_BOUND_V9__=true;document.addEventListener('click',e=>{const target=e.target.closest('#adminBody [data-open-settings],#adminBody [data-route="settings"]');if(!target)return;e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();pendingOpen=true;open()},true)}
ensureRuntime().then(()=>{if(pendingOpen)open()}).catch(e=>console.error('AMIT TOUCH settings preload failed',e));
})();