(function(){
'use strict';
const ID='admin-home-refinement-v25';document.getElementById(ID)?.remove();
const style=document.createElement('style');style.id=ID;style.textContent=`
body.admin-session-active .af.ar-home-ref .af-sub{margin-bottom:28px!important}
body.admin-session-active .ar-home-stats{grid-template-rows:72px 72px!important;gap:10px!important;margin-bottom:3px!important}
body.admin-session-active .ar-home-stat{height:72px!important;padding:10px 6px!important}
body.admin-session-active .ar-section-sep{height:1px!important;width:100%!important;margin:20px 0 17px!important;background:linear-gradient(90deg,transparent 0%,rgba(40,95,90,.16) 10%,rgba(40,95,90,.58) 50%,rgba(40,95,90,.16) 90%,transparent 100%)!important;border:0!important}
body.admin-session-active .ar-home-section-title{margin:0 2px 10px!important}
body.admin-session-active .ar-next-card{padding:13px 11px 12px!important}
body.admin-session-active .ar-next-main{min-height:86px!important;grid-template-columns:60px 1fr 112px!important;gap:10px!important}
body.admin-session-active .ar-next-time{font-size:52px!important;line-height:.95!important;font-weight:600!important;letter-spacing:-2px!important}
body.admin-session-active .ar-next-actions{margin-top:14px!important;gap:8px!important}
body.admin-session-active .ar-next-actions button{height:38px!important;padding:8px 7px!important;border-radius:12px!important;font-size:10px!important}
body.admin-session-active .ar-next-avatar{width:60px!important;height:60px!important;border-radius:50%!important;background:#f0dfd8!important;border:2px solid rgba(255,255,255,.95)!important;display:grid!important;place-items:center!important;font-size:24px!important;font-weight:600!important;color:#285f5a!important;box-shadow:0 3px 10px rgba(58,64,60,.07)!important;overflow:hidden!important}
body.admin-session-active .ar-next-avatar img{width:100%!important;height:100%!important;object-fit:cover!important;display:block!important}
body.admin-session-active .ar-today-block{padding:0 2px 4px!important}
body.admin-session-active .ar-today-row{height:30px!important;min-height:30px!important;gap:14px!important}
body.admin-session-active .ar-today-main{font-size:11px!important}.ar-today-time{font-size:10.8px!important}
body.admin-session-active .af-nav button i{width:34px!important;height:34px!important}
body.admin-session-active .af-nav button i img{width:30px!important;height:30px!important;max-width:30px!important;max-height:30px!important;object-fit:contain!important}
`;
document.head.appendChild(style);
const CUSTOMER_ICON='/assets/%D7%9C%D7%A7%D7%95%D7%97%D7%95%D7%AA.png';
function separators(af){af.querySelectorAll('.ar-section-sep').forEach(x=>x.remove());const stats=af.querySelector('.ar-home-stats'),next=af.querySelector('.ar-next-card'),todayTitle=[...af.querySelectorAll('.ar-home-section-title')].find(x=>x.textContent.includes('היום שלי'));if(stats)stats.insertAdjacentHTML('afterend','<div class="ar-section-sep" aria-hidden="true"></div>');if(next)next.insertAdjacentHTML('afterend','<div class="ar-section-sep" aria-hidden="true"></div>');if(todayTitle&&todayTitle.previousElementSibling?.classList.contains('ar-section-sep')){} }
function avatar(af){const old=af.querySelector('.ar-next-photo');if(!old)return;const name=af.querySelector('.ar-next-copy strong')?.textContent.trim()||'נועה';const first=(name.replace(/\s+/g,'').charAt(0)||'נ');const demo=(window.__AMIT_ADMIN_DEMO_APPOINTMENTS__||[]).find(a=>(a.customer?.fullName||'')===name);const photo=demo?.customer?.profile_image||demo?.customer?.avatar_url||'';const wrap=document.createElement('div');wrap.className='ar-next-avatar';wrap.setAttribute('aria-label','תמונת הפרופיל של '+name);if(photo){const img=document.createElement('img');img.src=photo;img.alt=name;img.onerror=()=>{wrap.replaceChildren(document.createTextNode(first))};wrap.appendChild(img)}else wrap.textContent=first;old.replaceWith(wrap)}
function todayDashes(af){af.querySelectorAll('.ar-today-main').forEach(el=>{el.textContent=el.textContent.replace(/\s*[·•]\s*/g,' – ')})}
function navIcons(){document.querySelectorAll('#adminBody .af-nav button[data-route="customers"] i').forEach(i=>{let img=i.querySelector('img');if(!img){img=document.createElement('img');i.replaceChildren(img)}img.src=CUSTOMER_ICON;img.alt='לקוחות'})}
function apply(){const af=document.querySelector('#adminBody .af.ar-home-ref');if(af){separators(af);avatar(af);todayDashes(af)}navIcons()}
let timer=0;function schedule(){clearTimeout(timer);timer=setTimeout(apply,24)}new MutationObserver(m=>{if(m.some(x=>x.addedNodes.length))schedule()}).observe(document.body,{childList:true,subtree:true});document.addEventListener('click',e=>{if(e.target.closest('[data-route]'))schedule()},true);window.addEventListener('pageshow',schedule);window.addEventListener('amit:session-ready',schedule);schedule();
})();