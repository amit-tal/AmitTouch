(function(){'use strict';
function cleanSettingsArtifacts(){
  document.querySelectorAll('.ast-footer').forEach(x=>x.remove());
}
function openCanonicalSettings(){
  document.querySelectorAll('.ast,.ast-sub,.ast-placeholder').forEach(x=>x.remove());
  if(typeof window.AMIT_ADMIN_OPEN_SETTINGS==='function'){
    window.AMIT_ADMIN_OPEN_SETTINGS();
    requestAnimationFrame(cleanSettingsArtifacts);
  }
}

document.addEventListener('click',e=>{
  const target=e.target.closest('#adminBody .af-nav button[data-route="manage"],#adminBody [data-route="settings"],#adminBody [data-open-settings]');
  if(!target)return;
  e.preventDefault();
  e.stopPropagation();
  e.stopImmediatePropagation();
  openCanonicalSettings();
},true);

new MutationObserver(cleanSettingsArtifacts).observe(document.body,{childList:true,subtree:true});
window.addEventListener('amit:session-ready',cleanSettingsArtifacts);
})();