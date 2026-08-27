(function(){'use strict';
if(window.__AMIT_SETTINGS_FINAL_UI_FIX__)return;window.__AMIT_SETTINGS_FINAL_UI_FIX__=true;
const VIEW='/assets/%D7%AA%D7%A6%D7%95%D7%92%D7%94.png';
const LOGOUT='/assets/%D7%94%D7%AA%D7%A0%D7%AA%D7%A7%D7%95%D7%AA.png';
function rowByText(text){return [...document.querySelectorAll('.ast .ast-row')].find(r=>(r.textContent||'').replace(/\s+/g,' ').includes(text));}
function patch(){
  const root=document.querySelector('.ast');if(!root)return;
  root.querySelectorAll('.ast-footer').forEach(x=>x.remove());
  ['Face ID','FACE ID','גיבוי וסנכרון'].forEach(label=>{const r=rowByText(label);if(r)r.remove();});
  const birthday=rowByText('ברכת יום הולדת');
  if(birthday){
    birthday.classList.remove('toggle-row');birthday.classList.add('ass-bound');
    birthday.innerHTML='<span>ברכת יום הולדת</span><span></span><span class="chev">‹</span>';
  }
  const view=root.querySelector('.ast-view');
  if(view){
    let img=view.querySelector('img.ast-action-icon');
    if(!img){img=document.createElement('img');img.className='ast-action-icon';view.prepend(img);}
    img.src=VIEW;img.alt='';
    [...view.children].filter(x=>x!==img&&x.tagName!=='SPAN').forEach(()=>{});
  }
  const out=root.querySelector('.ast-logout');
  if(out){
    let img=out.querySelector('img.ast-action-icon');
    if(!img){img=document.createElement('img');img.className='ast-action-icon';out.prepend(img);}
    img.src=LOGOUT;img.alt='';
  }
}
window.AMIT_TOUCH_PATCH_SETTINGS_FINAL_UI=patch;
window.addEventListener('amit:settings-open',()=>{patch();requestAnimationFrame(()=>{patch();window.AMIT_TOUCH_REFRESH_SETTINGS?.();setTimeout(patch,60);});});
window.addEventListener('amit:settings-runtime-ready',()=>setTimeout(patch,0));
})();