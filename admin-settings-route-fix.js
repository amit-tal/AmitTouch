(function(){'use strict';
if(window.__AMIT_SETTINGS_ROUTE_FIX_V10__)return;
window.__AMIT_SETTINGS_ROUTE_FIX_V10__=true;
let pendingOpen=false;
function loadScript(src,key){return new Promise((resolve,reject)=>{if(window[key])return resolve();const s=document.createElement('script');s.src=src;s.async=false;s.onload=()=>{window[key]=true;resolve()};s.onerror=reject;(document.head||document.documentElement).appendChild(s)})}
async function ensureRuntime(){
  await loadScript('/admin-settings-main-canonical.js?v=20260827-settings-main-canonical-2','__AMIT_SETTINGS_MAIN_CANONICAL_LOADER_V2__');
  await loadScript('/admin-simple-settings.js?v=20260827-simple-settings-live-10','__AMIT_SIMPLE_SETTINGS_LIVE_LOADER_V10__');
  await loadScript('/admin-studio-settings-canonical.js?v=20260827-studio-canonical-6','__AMIT_STUDIO_CANONICAL_LOADER_V6__');
  await loadScript('/admin-settings-final-ui-fix.js?v=20260827-settings-final-ui-5','__AMIT_SETTINGS_FINAL_UI_LOADER_V5__');
  await loadScript('/admin-settings-behavior-hooks.js?v=20260827-settings-hooks-7','__AMIT_SETTINGS_HOOKS_V7__');
  await loadScript('/admin-new-message.js?v=20260827-message-templates-8','__AMIT_MESSAGE_TEMPLATES_V8__');
  window.AMIT_ADMIN_OPEN_SETTINGS=window.AMIT_TOUCH_OPEN_SETTINGS_CANONICAL;
  window.dispatchEvent(new Event('amit:settings-runtime-ready'));
}
async function open(){try{await ensureRuntime();pendingOpen=false;document.querySelectorAll('.ast,.ast-sub').forEach(x=>x.remove());window.AMIT_TOUCH_OPEN_SETTINGS_CANONICAL?.();window.dispatchEvent(new Event('amit:settings-open'));requestAnimationFrame(()=>requestAnimationFrame(()=>{window.AMIT_TOUCH_PATCH_SETTINGS_FINAL_UI?.();window.AMIT_TOUCH_REFRESH_SETTINGS?.()}))}catch(e){pendingOpen=false;console.error('AMIT TOUCH canonical settings runtime failed to load',e);window.amitNotice?.('לא הצלחתי לפתוח כרגע את ההגדרות. נסי שוב.','AMIT TOUCH')}}
function isSettingsTrigger(node){const el=node?.closest?.('[data-open-settings],[data-route="settings"]');if(el)return true;const btn=node?.closest?.('button,[role="button"],a');if(!btn)return false;const t=(btn.textContent||'').replace(/\s+/g,' ').trim();return t==='הגדרות מנהל'||t==='הגדרות';}
if(!window.__AMIT_SETTINGS_ROUTE_BOUND_V10__){window.__AMIT_SETTINGS_ROUTE_BOUND_V10__=true;window.addEventListener('click',e=>{if(!isSettingsTrigger(e.target))return;e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();pendingOpen=true;open()},true)}
ensureRuntime().then(()=>{if(pendingOpen)open()}).catch(e=>console.error('AMIT TOUCH settings preload failed',e));
})();