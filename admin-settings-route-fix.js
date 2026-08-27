(function(){'use strict';
if(window.__AMIT_SETTINGS_ROUTE_FIX_V13__)return;
window.__AMIT_SETTINGS_ROUTE_FIX_V13__=true;
function loadScript(src,key){return new Promise((resolve,reject)=>{if(window[key])return resolve();const s=document.createElement('script');s.src=src+'?v=20260827-settings-v13';s.async=false;s.onload=()=>{window[key]=true;resolve()};s.onerror=reject;document.head.appendChild(s)})}
async function ensureCanonical(){
  await loadScript('/admin-settings-main-canonical.js','__AMIT_SETTINGS_MAIN_V13__');
  await loadScript('/admin-simple-settings.js','__AMIT_SIMPLE_SETTINGS_V13__');
  await loadScript('/admin-settings-direct-actions.js','__AMIT_SETTINGS_DIRECT_ACTIONS_V13__');
  await loadScript('/admin-studio-settings-canonical.js','__AMIT_STUDIO_SETTINGS_V13__');
  await loadScript('/admin-studio-settings-theme-fix.js','__AMIT_STUDIO_THEME_FIX_V13__');
  await loadScript('/admin-settings-final-ui-fix.js','__AMIT_SETTINGS_FINAL_UI_V13__');
  await loadScript('/admin-settings-behavior-hooks.js','__AMIT_SETTINGS_HOOKS_V13__');
  window.AMIT_ADMIN_OPEN_SETTINGS=window.AMIT_TOUCH_OPEN_SETTINGS_CANONICAL;
}
async function openSettings(){
  try{
    await ensureCanonical();
    document.querySelectorAll('.ast,.ast-sub').forEach(x=>x.remove());
    window.AMIT_TOUCH_OPEN_SETTINGS_CANONICAL();
    window.dispatchEvent(new Event('amit:settings-open'));
    requestAnimationFrame(()=>{window.AMIT_TOUCH_PATCH_SETTINGS_FINAL_UI?.();window.AMIT_TOUCH_REFRESH_SETTINGS?.()});
  }catch(e){console.error('Canonical settings failed',e)}
}
function isSettingsTrigger(node){const el=node?.closest?.('[data-open-settings],[data-route="settings"]');if(el)return true;const b=node?.closest?.('button,[role="button"],a');if(!b)return false;const t=(b.textContent||'').replace(/\s+/g,' ').trim();return t==='הגדרות'||t==='הגדרות מנהל'}
window.addEventListener('click',e=>{if(!isSettingsTrigger(e.target))return;e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();openSettings()},true);
ensureCanonical().then(()=>{const original=window.AMIT_ADMIN_GO;if(typeof original==='function'){window.AMIT_ADMIN_GO=function(name,...args){if(name==='settings')return openSettings();return original.call(this,name,...args)}}}).catch(console.error);
})();