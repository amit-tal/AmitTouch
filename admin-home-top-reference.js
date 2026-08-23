(function(){
'use strict';
const existing=document.getElementById('admin-home-top-reference-v2');if(existing)existing.remove();
const style=document.createElement('style');
style.id='admin-home-top-reference-v2';
style.textContent=`
body.admin-session-active .af.ar-home-ref{position:relative!important}
body.admin-session-active #amitAdminRoot #adminBody{width:min(430px,100%)!important;padding:calc(max(24px,env(safe-area-inset-top)) + 8px) 20px calc(122px + env(safe-area-inset-bottom))!important}

/* Home top section proportions */
body.admin-session-active .af.ar-home-ref .af-head{height:46px!important;margin:0 0 2px!important;position:relative!important;display:block!important}
body.admin-session-active .af.ar-home-ref .af-head .af-icon:first-child{display:none!important}
body.admin-session-active .af.ar-home-ref .af-head .af-icon:last-child{position:absolute!important;left:0!important;top:0!important;width:38px!important;height:38px!important;display:grid!important;place-items:center!important;background:transparent!important;border:0!important;padding:0!important;z-index:4!important}
body.admin-session-active .af.ar-home-ref .af-head .af-icon:last-child:before,
body.admin-session-active .af.ar-home-ref .af-head .af-icon:last-child:after{content:none!important}
body.admin-session-active .af.ar-home-ref .ar-home-bell img{display:block!important;width:25px!important;height:25px!important;object-fit:contain!important}
body.admin-session-active .af.ar-home-ref .af-title{font-size:22px!important;line-height:1.2!important;font-weight:680!important;text-align:center!important;margin:-38px 52px 2px!important;min-height:28px!important;color:#173f3b!important;letter-spacing:-.3px!important;position:relative!important;z-index:2!important}
body.admin-session-active .af.ar-home-ref .af-sub{font-size:12px!important;line-height:1.4!important;text-align:center!important;margin:0 52px 20px!important;color:#858d89!important}

/* Summary cards, sized and aligned like the reference */
body.admin-session-active .af.ar-home-ref .af-grid{display:grid!important;grid-template-columns:repeat(3,minmax(0,1fr))!important;gap:9px!important;width:100%!important;direction:rtl!important;align-items:stretch!important;justify-items:stretch!important;margin-top:2px!important}
body.admin-session-active .af.ar-home-ref .af-grid>.af-stat{direction:rtl!important;min-height:74px!important;border-radius:15px!important;padding:11px 7px 10px!important}
body.admin-session-active .af.ar-home-ref .af-grid>.af-stat b{font-size:19px!important;line-height:1!important;margin-bottom:7px!important}
body.admin-session-active .af.ar-home-ref .af-grid>.af-stat span{font-size:10.5px!important;line-height:1.2!important}
body.admin-session-active .af.ar-home-ref .af-grid>.af-stat:nth-child(1){grid-column:1!important;grid-row:1!important}
body.admin-session-active .af.ar-home-ref .af-grid>.af-stat:nth-child(2){grid-column:2!important;grid-row:1!important}
body.admin-session-active .af.ar-home-ref .af-grid>.af-stat:nth-child(3){grid-column:3!important;grid-row:1!important}
body.admin-session-active .af.ar-home-ref .af-grid>.ar-stat-month{grid-column:1!important;grid-row:2!important}
body.admin-session-active .af.ar-home-ref .af-grid>.ar-stat-income{grid-column:2!important;grid-row:2!important}

/* Bottom admin navigation */
body.admin-session-active .af-nav{width:min(398px,calc(100% - 28px))!important;height:76px!important;bottom:max(12px,env(safe-area-inset-bottom))!important;border-radius:29px!important;padding:7px 10px 6px!important;gap:3px!important;direction:rtl!important}
body.admin-session-active .af-nav button{min-width:0!important;min-height:61px!important;padding:5px 3px 4px!important;border-radius:20px!important;font-size:10px!important;line-height:1.1!important;display:flex!important;flex-direction:column!important;align-items:center!important;justify-content:center!important;gap:5px!important}
body.admin-session-active .af-nav i{width:28px!important;height:28px!important;margin:0!important;display:grid!important;place-items:center!important}
body.admin-session-active .af-nav i img{display:block!important;width:27px!important;height:27px!important;object-fit:contain!important}
body.admin-session-active .af-nav .home{transform:translateY(-9px)!important;min-height:67px!important;border-radius:23px!important;padding-top:7px!important}
body.admin-session-active .af-nav .home i img{width:29px!important;height:29px!important}

@media(max-width:370px){
 body.admin-session-active #amitAdminRoot #adminBody{padding-left:16px!important;padding-right:16px!important}
 body.admin-session-active .af.ar-home-ref .af-title{font-size:20px!important}
 body.admin-session-active .af.ar-home-ref .af-sub{font-size:11px!important}
 body.admin-session-active .af.ar-home-ref .af-grid{gap:7px!important}
 body.admin-session-active .af.ar-home-ref .af-grid>.af-stat{min-height:68px!important}
 body.admin-session-active .af-nav{width:calc(100% - 20px)!important}
}
`;
document.head.appendChild(style);

const ASSETS={
 customers:'/assets/%D7%9C%D7%A7%D7%95%D7%97%D7%95%D7%AA.png',
 messages:'/assets/%D7%94%D7%95%D7%93%D7%A2%D7%95%D7%AA.png',
 home:'/assets/%D7%91%D7%99%D7%AA2.png',
 calendar:'/assets/%D7%99%D7%95%D7%9E%D7%9F.png',
 manage:'/assets/%D7%A0%D7%99%D7%94%D7%95%D7%9C.png',
 bell:'/assets/%D7%A4%D7%A2%D7%9E%D7%95%D7%9F.png'
};
function setImg(el,src,alt){if(!el)return;if(el.dataset.assetSrc===src)return;el.innerHTML='<img src="'+src+'" alt="'+(alt||'')+'">';el.dataset.assetSrc=src}
function apply(){
 const root=document.getElementById('adminBody');if(!root)return;
 const af=root.querySelector('.af');if(!af)return;
 const title=af.querySelector('.af-title');
 const isHome=!!(title&&(title.textContent.includes('ברוכה הבאה')||title.textContent.includes('ערב טוב עמית')));
 if(isHome){
   af.classList.add('ar-home-ref');
   if(title&&title.textContent.trim()!=='ברוכה הבאה')title.textContent='ברוכה הבאה';
   const bellBtn=af.querySelector('.af-head .af-icon:last-child');
   if(bellBtn){bellBtn.classList.add('ar-home-bell');bellBtn.setAttribute('aria-label','התראות');setImg(bellBtn,ASSETS.bell,'התראות')}
 }
 const nav=root.querySelector('.af-nav');
 if(nav){
   nav.querySelectorAll('button[data-route]').forEach(btn=>{
     const route=btn.dataset.route,icon=btn.querySelector('i'),src=ASSETS[route];
     if(src&&icon)setImg(icon,src,btn.textContent.trim());
   });
 }
}
let t=0;function schedule(){clearTimeout(t);t=setTimeout(apply,20)}
const observer=new MutationObserver(m=>{if(m.some(x=>[...x.addedNodes].some(n=>n.nodeType===1&&(n.id==='adminBody'||n.classList?.contains('af')||n.querySelector?.('.af')||n.querySelector?.('.af-nav')))))schedule()});
observer.observe(document.body,{childList:true,subtree:true});
window.addEventListener('pageshow',schedule);window.addEventListener('amit:session-ready',schedule);document.addEventListener('click',e=>{if(e.target.closest('[data-route]'))schedule()},true);schedule();
})();