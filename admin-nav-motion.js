(function(){
'use strict';
const ID='admin-nav-motion-v1';
document.getElementById(ID)?.remove();
const style=document.createElement('style');style.id=ID;style.textContent=`
body.admin-session-active .af-nav{position:fixed!important;overflow:hidden!important;isolation:isolate!important;display:grid!important;grid-template-columns:repeat(5,1fr)!important;direction:ltr!important;padding:5px 9px!important;height:68px!important}
body.admin-session-active .af-nav .af-nav-slider{position:absolute!important;top:5px!important;height:58px!important;border-radius:22px!important;background:rgba(241,216,209,.9)!important;box-shadow:inset 0 1px 0 rgba(255,255,255,.72)!important;z-index:0!important;pointer-events:none!important;transition:left .34s cubic-bezier(.22,.78,.24,1),width .34s cubic-bezier(.22,.78,.24,1)!important;will-change:left,width!important}
body.admin-session-active .af-nav button{position:relative!important;z-index:1!important;background:transparent!important;transform:none!important;transition:none!important}
body.admin-session-active .af-nav button.on,body.admin-session-active .af-nav button.home,body.admin-session-active .af-nav button.home.on,body.admin-session-active .af-nav button:active{background:transparent!important;transform:none!important}
body.admin-session-active .af-nav button i,body.admin-session-active .af-nav button i img{transform:none!important;transition:none!important}
body.admin-session-active .af-nav button span{display:none!important}
`;
document.head.appendChild(style);
const ASSETS={customers:'/assets/%D7%9C%D7%A7%D7%95%D7%97%D7%95%D7%AA.png',messages:'/assets/%D7%94%D7%95%D7%93%D7%A2%D7%95%D7%AA.png',home:'/assets/%D7%91%D7%99%D7%AA2.png',calendar:'/assets/%D7%99%D7%95%D7%9E%D7%9F.png',manage:'/assets/%D7%A0%D7%99%D7%94%D7%95%D7%9C.png'};
let transitionFrom=null;
function iconFor(btn){const route=btn.dataset.route,holder=btn.querySelector('i'),src=ASSETS[route];if(!holder||!src)return;let img=holder.querySelector('img');if(!img){img=document.createElement('img');holder.replaceChildren(img)}if(img.getAttribute('src')!==src)img.src=src;img.alt=route}
function position(slider,button,animate){if(!slider||!button)return;if(!animate)slider.style.transition='none';slider.style.left=button.offsetLeft+'px';slider.style.width=button.offsetWidth+'px';if(!animate)requestAnimationFrame(()=>slider.style.removeProperty('transition'))}
function enhance(nav){if(!nav)return;nav.querySelectorAll('button[data-route]').forEach(iconFor);let slider=nav.querySelector('.af-nav-slider');if(!slider){slider=document.createElement('span');slider.className='af-nav-slider';nav.prepend(slider)}const active=nav.querySelector('button[data-route].on')||nav.querySelector('button[data-route="home"]');if(!active)return;const fromRoute=transitionFrom;const from=fromRoute?nav.querySelector('button[data-route="'+CSS.escape(fromRoute)+'"]'):null;if(from&&from!==active){position(slider,from,false);requestAnimationFrame(()=>requestAnimationFrame(()=>position(slider,active,true)))}else{position(slider,active,false)}transitionFrom=null}
function apply(){document.querySelectorAll('#adminBody .af-nav').forEach(enhance)}
document.addEventListener('pointerdown',e=>{const target=e.target.closest('#adminBody .af-nav button[data-route]');if(!target)return;const nav=target.closest('.af-nav'),current=nav.querySelector('button.on');transitionFrom=current?.dataset.route||null},true);
let timer;const schedule=()=>{clearTimeout(timer);timer=setTimeout(apply,10)};new MutationObserver(schedule).observe(document.body,{childList:true,subtree:true});window.addEventListener('resize',schedule);window.addEventListener('pageshow',schedule);window.addEventListener('amit:session-ready',schedule);schedule();
})();