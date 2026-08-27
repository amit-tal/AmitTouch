(function(){'use strict';
function patch(){
  document.querySelectorAll('.ast-footer').forEach(x=>x.remove());
  const view=document.querySelector('.ast-view');
  if(view){
    let img=view.querySelector('img.ast-action-icon');
    if(!img){img=document.createElement('img');img.className='ast-action-icon';view.prepend(img)}
    img.src='/assets/תצוגה.png';img.alt='';
  }
  const logout=document.querySelector('.ast-logout');
  if(logout){
    let img=logout.querySelector('img.ast-action-icon');
    if(!img){img=document.createElement('img');img.className='ast-action-icon';logout.prepend(img)}
    img.src='/assets/התנתקות.png';img.alt='';
  }
}
document.addEventListener('click',e=>{
  const b=e.target.closest('#adminBody [data-route="settings"],#adminBody [data-open-settings]');
  if(!b)return;
  e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();
  document.querySelectorAll('.ast,.ast-sub').forEach(x=>x.remove());
  window.AMIT_ADMIN_OPEN_SETTINGS?.();
  setTimeout(patch,0);
},true);
new MutationObserver(()=>patch()).observe(document.body,{childList:true,subtree:true});
window.addEventListener('amit:session-ready',patch);
})();