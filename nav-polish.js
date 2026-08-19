(function(){
 const BUILD='20260819-bottom-nav-routes-v17';
 const items=[
  {target:'bookings',label:'זימון תור',icon:'/assets/%D7%96%D7%99%D7%9E%D7%95%D7%9F%20%D7%AA%D7%95%D7%A8.png'},
  {target:'gallery',label:'גלריית עבודות',icon:'/assets/%D7%92%D7%9C%D7%A8%D7%99%D7%99%D7%94.png'},
  {target:'home',label:'בית',icon:'/assets/%D7%91%D7%99%D7%AA.png'},
  {target:'about',label:'אודות',icon:'/assets/%D7%90%D7%95%D7%93%D7%95%D7%AA.png'},
  {target:'profile',label:'פרופיל',icon:'/assets/%D7%9E%D7%A9%D7%AA%D7%9E%D7%A9.png'}
 ];
 document.getElementById('amit-bottom-nav-style')?.remove();
 const style=document.createElement('style');style.id='amit-bottom-nav-style';style.textContent=`
 #amitBottomNav{position:fixed!important;z-index:90!important;left:50%!important;transform:translateX(-50%)!important;bottom:max(16px,calc(env(safe-area-inset-bottom) + 8px))!important;width:min(382px,calc(100vw - 30px))!important;height:56px!important;display:grid!important;grid-template-columns:repeat(5,minmax(0,1fr))!important;align-items:center!important;padding:2px 8px!important;border-radius:30px!important;border:1px solid rgba(255,255,255,.94)!important;background:linear-gradient(110deg,rgba(255,255,255,.58),rgba(249,232,228,.48),rgba(255,255,255,.52))!important;box-shadow:0 10px 24px rgba(188,116,105,.14),inset 0 1px 1px rgba(255,255,255,.98)!important;backdrop-filter:blur(24px) saturate(150%)!important;-webkit-backdrop-filter:blur(24px) saturate(150%)!important;direction:rtl!important;overflow:visible!important}
 #amitBottomNav[hidden]{display:none!important}
 #amitBottomNav .nav-glass-indicator{position:absolute!important;z-index:1!important;top:50%!important;left:0!important;width:52px!important;height:52px!important;aspect-ratio:1/1!important;border-radius:999px!important;border:1.5px solid rgba(255,255,255,.96)!important;background:linear-gradient(145deg,rgba(255,255,255,.62) 0%,rgba(255,241,239,.5) 28%,rgba(247,201,199,.54) 64%,rgba(236,164,161,.42) 100%)!important;box-shadow:0 8px 18px rgba(176,105,98,.17),inset 0 2px 2px rgba(255,255,255,1),inset 0 -1px 2px rgba(220,145,140,.16),inset 0 0 14px rgba(255,255,255,.3)!important;backdrop-filter:blur(20px) saturate(150%)!important;-webkit-backdrop-filter:blur(20px) saturate(150%)!important;transform:translate3d(var(--bubble-x,0px),-66%,0)!important;transition:transform .36s cubic-bezier(.22,.8,.24,1)!important;will-change:transform!important;pointer-events:none!important;overflow:hidden!important;clip-path:circle(50% at 50% 50%)!important;box-sizing:border-box!important;isolation:isolate!important}
 #amitBottomNav .nav-glass-indicator:before{content:''!important;position:absolute!important;z-index:1!important;left:4px!important;right:4px!important;top:3px!important;height:22px!important;border-radius:999px 999px 60% 60%!important;border-top:1px solid rgba(255,255,255,.96)!important;background:radial-gradient(ellipse at 50% 0%,rgba(255,255,255,.92) 0%,rgba(255,255,255,.48) 38%,rgba(255,255,255,0) 74%)!important;pointer-events:none!important}
 #amitBottomNav .nav-glass-indicator:after{content:''!important;position:absolute!important;z-index:0!important;inset:3px!important;border-radius:50%!important;background:radial-gradient(circle at 68% 68%,rgba(239,143,143,.32) 0%,rgba(246,181,183,.2) 38%,rgba(255,255,255,0) 70%)!important;filter:blur(2px)!important;pointer-events:none!important}
 #amitBottomNav button{position:relative!important;z-index:2!important;width:100%!important;height:50px!important;min-width:0!important;border:0!important;background:transparent!important;padding:0!important;margin:0!important;display:block!important;overflow:visible!important}
 #amitBottomNav button:after{content:''!important;position:absolute!important;left:50%!important;transform:translateX(-50%)!important;bottom:1px!important;width:6px!important;height:6px!important;border-radius:50%!important;background:rgba(116,143,138,.42)!important;transition:width .28s ease,height .28s ease,bottom .28s ease,background .28s ease!important}
 #amitBottomNav .nav-icon{position:absolute!important;left:50%!important;top:20px!important;transform:translate(-50%,-50%)!important;width:27px!important;height:27px!important;display:block!important;object-fit:contain!important;object-position:center!important;margin:0!important;transition:transform .28s ease!important}
 #amitBottomNav button.active:after{width:29px!important;height:5px!important;border-radius:6px!important;bottom:-4px!important;background:#e88f89!important}
 #amitBottomNav button.active .nav-icon{transform:translate(-50%,-50%) scale(1.03)!important}
 .screen.active{padding-bottom:82px!important}`;document.head.appendChild(style);
 document.querySelectorAll('.nav').forEach(n=>n.style.setProperty('display','none','important'));
 document.getElementById('amitBottomNav')?.remove();
 const nav=document.createElement('nav');nav.id='amitBottomNav';nav.setAttribute('aria-label','ניווט ראשי');
 const bubble=document.createElement('span');bubble.className='nav-glass-indicator';nav.appendChild(bubble);
 items.forEach(item=>{const b=document.createElement('button');b.type='button';b.dataset.target=item.target;b.setAttribute('aria-label',item.label);b.innerHTML=`<img class="nav-icon" src="${item.icon}?v=${BUILD}" alt="">`;b.onclick=()=>{if(document.getElementById(item.target)&&typeof window.show==='function')window.show(item.target);requestAnimationFrame(()=>requestAnimationFrame(sync));};nav.appendChild(b)});
 document.body.appendChild(nav);
 function sync(){
   const id=document.querySelector('.screen.active')?.id||'';nav.hidden=!id||id==='login'||id==='register';
   const buttons=[...nav.querySelectorAll('button')];
   buttons.forEach(b=>b.classList.toggle('active',b.dataset.target===id));
   const active=buttons.find(b=>b.dataset.target===id);
   if(active&&!nav.hidden){const navRect=nav.getBoundingClientRect(),activeRect=active.getBoundingClientRect(),center=activeRect.left-navRect.left+(activeRect.width/2);nav.style.setProperty('--bubble-x',`${center-26}px`);}
 }
 requestAnimationFrame(()=>requestAnimationFrame(sync));
 addEventListener('resize',()=>requestAnimationFrame(sync),{passive:true});
 new MutationObserver(()=>requestAnimationFrame(sync)).observe(document.body,{subtree:true,attributes:true,attributeFilter:['class']});
})();