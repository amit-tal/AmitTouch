(function(){
'use strict';
const STYLE_ID='admin-home-transition-guard-v1';if(document.getElementById(STYLE_ID))return;
const style=document.createElement('style');style.id=STYLE_ID;style.textContent=`
body.admin-session-active.admin-home-transition #adminBody>.af:not(.admin-home-canonical){visibility:hidden!important;opacity:0!important;pointer-events:none!important}
body.admin-session-active #adminBody>.af.admin-home-canonical{visibility:visible!important;opacity:1!important}
`;
document.head.appendChild(style);
function start(){if(!document.body.classList.contains('admin-session-active'))return;document.body.classList.add('admin-home-transition')}
function finish(){if(document.querySelector('#adminBody>.af.admin-home-canonical'))document.body.classList.remove('admin-home-transition')}
if(window.__AMIT_ADMIN_SESSION__===true){document.addEventListener('DOMContentLoaded',start,{once:true})}
document.addEventListener('pointerdown',e=>{if(e.target.closest('#adminBody .af-nav button[data-route="home"]'))start()},true);
document.addEventListener('click',e=>{if(e.target.closest('#adminBody .af-nav button[data-route="home"]'))start()},true);
new MutationObserver(()=>{const af=document.querySelector('#adminBody>.af');if(!af)return;const text=af.textContent||'';const home=af.classList.contains('admin-home-canonical')||af.querySelector('.af-nav button[data-route="home"].on')||text.includes('ערב טוב עמית')||text.includes('ברוכה הבאה עמית');if(home&&!af.classList.contains('admin-home-canonical'))start();else if(af.classList.contains('admin-home-canonical'))finish()}).observe(document.body,{childList:true,subtree:true});
window.addEventListener('amit:session-ready',()=>{if(window.__AMIT_ADMIN_SESSION__===true)start();requestAnimationFrame(finish)});
window.addEventListener('pageshow',()=>{if(window.__AMIT_ADMIN_SESSION__===true)start();requestAnimationFrame(finish)});
requestAnimationFrame(finish);
if(!document.querySelector('script[data-amit-calendar-future-overlay]')){const s=document.createElement('script');s.src='/admin-calendar-future-overlay.js?v=20260823-future-overlay-v1';s.dataset.amitCalendarFutureOverlay='1';document.body.appendChild(s)}
})();