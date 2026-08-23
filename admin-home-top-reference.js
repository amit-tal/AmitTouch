(function(){
'use strict';
const style=document.createElement('style');
style.id='admin-home-top-reference-v1';
style.textContent=`
body.admin-session-active .af.ar-home-ref{position:relative!important}
body.admin-session-active .af.ar-home-ref .af-head{height:38px!important;margin:0!important;position:relative!important;display:block!important}
body.admin-session-active .af.ar-home-ref .af-head .af-icon:last-child{position:absolute!important;left:2px!important;top:2px!important;width:32px!important;height:32px!important;display:grid!important;place-items:center!important;background:transparent!important;border:0!important;padding:0!important;color:#315f5a!important;font-size:0!important;z-index:3!important}
body.admin-session-active .af.ar-home-ref .af-head .af-icon:last-child:before{content:none!important}
body.admin-session-active .af.ar-home-ref .ar-home-bell svg{width:19px!important;height:19px!important;display:block!important;fill:none!important;stroke:currentColor!important;stroke-width:1.7!important;stroke-linecap:round!important;stroke-linejoin:round!important}
body.admin-session-active .af.ar-home-ref .ar-home-bell:after{content:'';position:absolute;left:23px;top:3px;width:5px;height:5px;border-radius:50%;background:#e8b1aa;border:1px solid rgba(255,255,255,.9)}
body.admin-session-active .af.ar-home-ref .af-title{font-size:18px!important;line-height:1.2!important;font-weight:680!important;text-align:center!important;margin:-31px 40px 1px!important;min-height:23px!important;color:#173f3b!important;letter-spacing:-.25px!important;position:relative!important;z-index:2!important}
body.admin-session-active .af.ar-home-ref .af-sub{font-size:9px!important;line-height:1.35!important;text-align:center!important;margin:0 40px 14px!important;color:#8f9693!important}
body.admin-session-active .af.ar-home-ref .af-grid{display:grid!important;grid-template-columns:repeat(3,minmax(0,1fr))!important;gap:6px!important;width:100%!important;direction:ltr!important;align-items:stretch!important;justify-items:stretch!important}
body.admin-session-active .af.ar-home-ref .af-grid>.af-stat:nth-child(1){grid-column:1!important}
body.admin-session-active .af.ar-home-ref .af-grid>.af-stat:nth-child(2){grid-column:2!important}
body.admin-session-active .af.ar-home-ref .af-grid>.af-stat:nth-child(3){grid-column:3!important}
body.admin-session-active .af.ar-home-ref .af-grid>.ar-stat-income{grid-column:2!important;grid-row:2!important}
body.admin-session-active .af.ar-home-ref .af-grid>.ar-stat-month{grid-column:3!important;grid-row:2!important}
body.admin-session-active .af.ar-home-ref .af-grid>.af-stat{direction:rtl!important}
`;
document.head.appendChild(style);
const bell='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.8 9.6a5.2 5.2 0 0 1 10.4 0c0 5.1 2.1 6 2.1 6H4.7s2.1-.9 2.1-6Z"/><path d="M9.8 18.2a2.4 2.4 0 0 0 4.4 0"/></svg>';
function apply(){
 const root=document.getElementById('adminBody');if(!root)return;
 const af=root.querySelector('.af.ar-home-ref');if(!af)return;
 const title=af.querySelector('.af-title');
 if(title&&title.textContent.trim()!=='ברוכה הבאה')title.textContent='ברוכה הבאה';
 const button=af.querySelector('.af-head .af-icon:last-child');
 if(button&&!button.classList.contains('ar-home-bell')){button.classList.add('ar-home-bell');button.innerHTML=bell;button.setAttribute('aria-label','התראות')}
}
let t=0;function schedule(){clearTimeout(t);t=setTimeout(apply,20)}
const observer=new MutationObserver(m=>{if(m.some(x=>[...x.addedNodes].some(n=>n.nodeType===1&&(n.id==='adminBody'||n.classList?.contains('af')||n.querySelector?.('.af')))))schedule()});
observer.observe(document.body,{childList:true,subtree:true});
window.addEventListener('pageshow',schedule);window.addEventListener('amit:session-ready',schedule);document.addEventListener('click',e=>{if(e.target.closest('[data-route="home"]'))schedule()},true);schedule();
})();