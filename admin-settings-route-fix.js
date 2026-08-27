(function(){'use strict';
function patchSettingsUi(){
  document.querySelectorAll('.ast-footer').forEach(x=>x.remove());
  const view=document.querySelector('.ast-view');
  if(view){
    const first=view.firstElementChild;
    if(!first||first.tagName!=='IMG'){
      const img=document.createElement('img');
      img.src='/assets/%D7%AA%D7%A6%D7%95%D7%92%D7%94.png';
      img.alt='';
      img.className='ast-action-icon';
      if(first)first.replaceWith(img);else view.prepend(img);
    }
  }
  const logout=document.querySelector('.ast-logout');
  if(logout){
    const first=logout.firstElementChild;
    if(!first||first.tagName!=='IMG'){
      const img=document.createElement('img');
      img.src='/assets/%D7%94%D7%AA%D7%A0%D7%AA%D7%A7%D7%95%D7%AA.png';
      img.alt='';
      img.className='ast-action-icon';
      if(first)first.replaceWith(img);else logout.prepend(img);
    }
  }
}
function openCanonicalSettings(){
  document.querySelectorAll('.ast,.ast-sub,.ast-placeholder').forEach(x=>x.remove());
  if(typeof window.AMIT_ADMIN_OPEN_SETTINGS==='function'){
    window.AMIT_ADMIN_OPEN_SETTINGS();
    requestAnimationFrame(patchSettingsUi);
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

new MutationObserver(patchSettingsUi).observe(document.body,{childList:true,subtree:true});
window.addEventListener('amit:session-ready',patchSettingsUi);
})();