(function(){
'use strict';
const ID='admin-home-refinement-v29';document.getElementById(ID)?.remove();
const style=document.createElement('style');style.id=ID;style.textContent=`
html,body{scrollbar-width:none!important;-ms-overflow-style:none!important}html::-webkit-scrollbar,body::-webkit-scrollbar,#adminBody::-webkit-scrollbar,.af::-webkit-scrollbar{display:none!important;width:0!important;height:0!important}
body.admin-session-active .af.ar-home-ref .af-sub{margin-bottom:30px!important}
body.admin-session-active .ar-home-stats{grid-template-rows:74px 74px!important;gap:11px!important;margin-bottom:0!important}
body.admin-session-active .ar-home-stat{height:74px!important;padding:11px 6px!important}
body.admin-session-active .ar-section-sep{height:1px!important;width:100%!important;margin:28px 0 25px!important;background:linear-gradient(90deg,transparent 0%,rgba(40,95,90,.14) 11%,rgba(40,95,90,.64) 50%,rgba(40,95,90,.14) 89%,transparent 100%)!important;border:0!important}
body.admin-session-active .ar-home-section-title{margin:0 2px 11px!important}
body.admin-session-active .ar-next-card{padding:15px 12px 14px!important}
body.admin-session-active .ar-next-main{min-height:92px!important;grid-template-columns:64px minmax(0,1fr) 78px!important;gap:12px!important;align-items:center!important}
body.admin-session-active .ar-next-time{font-family:'OpenSansHebrew','Open Sans',Arial,sans-serif!important;font-size:25px!important;line-height:1!important;font-weight:700!important;letter-spacing:0!important;font-kerning:normal!important;font-variant-numeric:tabular-nums!important;font-feature-settings:'tnum' 1!important;transform:none!important;white-space:nowrap!important;direction:ltr!important;text-align:left!important}
body.admin-session-active .ar-next-actions{margin-top:12px!important;margin-bottom:3px!important;gap:9px!important}
body.admin-session-active .ar-next-actions button{height:38px!important;padding:8px 8px!important;border-radius:13px!important;font-size:10px!important}
body.admin-session-active .ar-next-avatar{width:64px!important;height:64px!important;border-radius:50%!important;background:linear-gradient(145deg,#f7e7e2,#efcfc7)!important;border:2px solid rgba(255,255,255,.96)!important;display:grid!important;place-items:center!important;font-size:25px!important;font-weight:600!important;color:#a66f68!important;box-shadow:0 3px 10px rgba(104,72,67,.08)!important;overflow:hidden!important}
body.admin-session-active .ar-next-avatar img{width:100%!important;height:100%!important;object-fit:cover!important;display:block!important;filter:saturate(.62) sepia(.15) hue-rotate(325deg)!important}
body.admin-session-active .ar-today-block{padding:0 2px 7px!important}
body.admin-session-active .ar-today-row{height:31px!important;min-height:31px!important;gap:14px!important}
body.admin-session-active .ar-today-main{font-size:11px!important}.ar-today-time{font-size:10.8px!important}
body.admin-session-active .af.ar-home-ref .af-head{position:relative!important}
body.admin-session-active .af.ar-home-ref .af-head .ar-home-bell{display:grid!important;visibility:visible!important;opacity:1!important;position:absolute!important;left:0!important;top:0!important;width:40px!important;height:40px!important;place-items:center!important;padding:0!important;border:0!important;background:transparent!important;box-shadow:none!important;z-index:50!important}
body.admin-session-active .af.ar-home-ref .af-head .ar-home-bell img{display:block!important;width:26px!important;height:26px!important;object-fit:contain!important;opacity:1!important}
`;
document.head.appendChild(style);
const BELL='/assets/%D7%A4%D7%A2%D7%9E%D7%95%D7%9F.png';
function ensureBell(af){const head=af.querySelector('.af-head');if(!head)return;head.querySelectorAll('.ar-home-bell').forEach((x,i)=>{if(i)x.remove()});let bell=head.querySelector('.ar-home-bell');if(!bell){bell=document.createElement('button');bell.type='button';bell.className='af-icon ar-home-bell';bell.setAttribute('aria-label','התראות');head.prepend(bell)}let img=bell.querySelector('img');if(!img){img=document.createElement('img');bell.replaceChildren(img)}img.src=BELL;img.alt='התראות';bell.onclick=()=>window.AMIT_ADMIN_GO?.('notifications')}
function separators(af){af.querySelectorAll('.ar-section-sep').forEach(x=>x.remove());const stats=af.querySelector('.ar-home-stats'),next=af.querySelector('.ar-next-card');if(stats)stats.insertAdjacentHTML('afterend','<div class="ar-section-sep" aria-hidden="true"></div>');if(next)next.insertAdjacentHTML('afterend','<div class="ar-section-sep" aria-hidden="true"></div>')}
function avatar(af){const old=af.querySelector('.ar-next-photo');if(!old)return;const name=af.querySelector('.ar-next-copy strong')?.textContent.trim()||'נועה';const first=(name.replace(/\s+/g,'').charAt(0)||'נ');const demo=(window.__AMIT_ADMIN_DEMO_APPOINTMENTS__||[]).find(a=>(a.customer?.fullName||'')===name);const photo=demo?.customer?.profile_image||demo?.customer?.avatar_url||'';const wrap=document.createElement('div');wrap.className='ar-next-avatar';wrap.setAttribute('aria-label','תמונת הפרופיל של '+name);if(photo){const img=document.createElement('img');img.src=photo;img.alt=name;img.onerror=()=>{wrap.replaceChildren(document.createTextNode(first))};wrap.appendChild(img)}else wrap.textContent=first;old.replaceWith(wrap)}
function todayDashes(af){af.querySelectorAll('.ar-today-main').forEach(el=>{el.textContent=el.textContent.replace(/\s*[·•]\s*/g,' – ')})}
function apply(){const af=document.querySelector('#adminBody .af.ar-home-ref');if(!af)return;ensureBell(af);separators(af);avatar(af);todayDashes(af)}
let timer=0;function schedule(){clearTimeout(timer);timer=setTimeout(apply,20)}new MutationObserver(m=>{if(m.some(x=>x.addedNodes.length))schedule()}).observe(document.body,{childList:true,subtree:true});document.addEventListener('click',e=>{if(e.target.closest('[data-route]'))schedule()},true);window.addEventListener('pageshow',schedule);window.addEventListener('amit:session-ready',schedule);schedule();
})();