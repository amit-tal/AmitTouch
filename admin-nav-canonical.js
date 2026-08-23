(function(){
'use strict';
const STYLE_ID='admin-nav-canonical-v4';['admin-nav-canonical-v1','admin-nav-canonical-v2','admin-nav-canonical-v3'].forEach(id=>document.getElementById(id)?.remove());if(document.getElementById(STYLE_ID))return;
const style=document.createElement('style');style.id=STYLE_ID;style.textContent=`
body.admin-session-active .af-nav{position:fixed!important;left:50%!important;transform:translateX(-50%)!important;bottom:max(10px,env(safe-area-inset-bottom))!important;width:min(405px,calc(100% - 22px))!important;height:64px!important;padding:6px 10px!important;border-radius:27px!important;display:grid!important;grid-template-columns:repeat(5,1fr)!important;gap:0!important;direction:ltr!important;overflow:hidden!important;isolation:isolate!important;background:rgba(255,255,255,.76)!important;backdrop-filter:blur(24px)!important;-webkit-backdrop-filter:blur(24px)!important;border:1px solid rgba(255,255,255,.95)!important;box-shadow:0 8px 24px rgba(65,67,63,.085),inset 0 1px rgba(255,255,255,.98)!important;z-index:120!important}
body.admin-session-active .af-nav .admin-nav-slider{position:absolute!important;left:10px!important;top:7px!important;width:calc((100% - 20px)/5)!important;height:50px!important;border-radius:18px!important;background:rgba(241,216,209,.94)!important;z-index:0!important;pointer-events:none!important;transform:translate3d(calc(var(--nav-index,2)*100%),0,0)!important;transition:transform .42s cubic-bezier(.22,.78,.24,1)!important;will-change:transform!important}
body.admin-session-active .af-nav button,body.admin-session-active .af-nav button.on,body.admin-session-active .af-nav button.home,body.admin-session-active .af-nav button.home.on,body.admin-session-active .af-nav button:active{position:relative!important;z-index:1!important;height:52px!important;min-width:0!important;margin:0!important;padding:0!important;border:0!important;border-radius:18px!important;background:transparent!important;background-image:none!important;box-shadow:none!important;outline:0!important;transform:none!important;transition:none!important;display:grid!important;place-items:center!important}
body.admin-session-active .af-nav button i{width:34px!important;height:34px!important;margin:0!important;display:grid!important;place-items:center!important;transform:none!important;transition:none!important}
body.admin-session-active .af-nav button i img{width:30px!important;height:30px!important;object-fit:contain!important;display:block!important;margin:auto!important;transform:none!important;transition:none!important;opacity:1!important}
body.admin-session-active .af-nav button span{display:none!important}
`;
document.head.appendChild(style);
const ORDER=['customers','messages','home','calendar','manage'];
const ICONS={customers:'/assets/%D7%9C%D7%A7%D7%95%D7%97%D7%95%D7%AA.png',messages:'/assets/%D7%94%D7%95%D7%93%D7%A2%D7%95%D7%AA.png',home:'/assets/%D7%91%D7%99%D7%AA2.png',calendar:'/assets/%D7%99%D7%95%D7%9E%D7%9F.png',manage:'/assets/%D7%A0%D7%99%D7%94%D7%95%D7%9C.png'};
let visualIndex=2;
function indexOfRoute(route){const i=ORDER.indexOf(route);return i<0?2:i}
function setIconsAndOrder(nav){const buttons={};nav.querySelectorAll('button[data-route]').forEach(b=>buttons[b.dataset.route]=b);ORDER.forEach(r=>{const b=buttons[r];if(!b)return;let i=b.querySelector('i');if(!i){i=document.createElement('i');b.prepend(i)}let img=i.querySelector('img');if(!img){img=document.createElement('img');i.replaceChildren(img)}if(img.getAttribute('src')!==ICONS[r])img.src=ICONS[r];img.alt='';nav.appendChild(b)})}
function ensureSlider(nav){let s=nav.querySelector('.admin-nav-slider');if(!s){s=document.createElement('span');s.className='admin-nav-slider';nav.prepend(s)}return s}
function syncNewNav(nav){if(!nav)return;setIconsAndOrder(nav);const slider=ensureSlider(nav);const activeRoute=nav.querySelector('button.on[data-route]')?.dataset.route||'home';const target=indexOfRoute(activeRoute);if(nav.dataset.glideReady!=='1'){
  slider.style.transition='none';
  nav.style.setProperty('--nav-index',String(visualIndex));
  nav.dataset.glideReady='1';
  slider.getBoundingClientRect();
  requestAnimationFrame(()=>{
    slider.style.removeProperty('transition');
    requestAnimationFrame(()=>{
      nav.style.setProperty('--nav-index',String(target));
      visualIndex=target;
    });
  });
}else if(target!==visualIndex){nav.style.setProperty('--nav-index',String(target));visualIndex=target}
}
function apply(){document.querySelectorAll('#adminBody .af-nav').forEach(syncNewNav)}
document.addEventListener('pointerdown',e=>{const b=e.target.closest('#adminBody .af-nav button[data-route]');if(!b)return;const nav=b.closest('.af-nav'),target=indexOfRoute(b.dataset.route);ensureSlider(nav);nav.style.setProperty('--nav-index',String(target));visualIndex=target},true);
document.addEventListener('click',e=>{if(e.target.closest('#adminBody .af-nav button[data-route]'))setTimeout(apply,0)},true);
new MutationObserver(m=>{if(m.some(rec=>[...rec.addedNodes].some(n=>n.nodeType===1&&(n.matches?.('.af-nav')||n.querySelector?.('.af-nav')))))requestAnimationFrame(apply)}).observe(document.body,{childList:true,subtree:true});window.addEventListener('resize',apply);window.addEventListener('pageshow',apply);window.addEventListener('amit:session-ready',apply);apply();
})();