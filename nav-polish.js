(function(){
  const BUILD='20260816-bottom-nav-thin-v2';
  const screens=['bookings','services','home','about','profile'];
  const labels=['זימון תור','השירותים שלי','בית','אודות','הגדרות ופרטי משתמש'];

  document.getElementById('amit-bottom-nav-style')?.remove();
  const style=document.createElement('style');
  style.id='amit-bottom-nav-style';
  style.textContent=`
    #amitBottomNav{position:fixed!important;z-index:90!important;left:50%!important;transform:translateX(-50%)!important;bottom:max(8px,env(safe-area-inset-bottom))!important;width:min(392px,calc(100vw - 28px))!important;height:62px!important;display:grid!important;grid-template-columns:repeat(5,1fr)!important;align-items:center!important;padding:3px 10px!important;border-radius:32px!important;border:1.2px solid rgba(255,255,255,.94)!important;background:linear-gradient(110deg,rgba(255,255,255,.57),rgba(249,232,228,.47),rgba(255,255,255,.50))!important;box-shadow:0 9px 24px rgba(188,116,105,.15),inset 0 1px 1px rgba(255,255,255,.98),inset 0 -1px 0 rgba(255,255,255,.30),inset 0 0 22px rgba(255,255,255,.24)!important;backdrop-filter:blur(22px) saturate(145%)!important;-webkit-backdrop-filter:blur(22px) saturate(145%)!important;direction:rtl!important;overflow:visible!important}
    #amitBottomNav[hidden]{display:none!important}
    #amitBottomNav button{position:relative!important;height:54px!important;border:0!important;background:transparent!important;padding:0!important;margin:0!important;display:flex!important;align-items:center!important;justify-content:center!important;color:#175d56!important;overflow:visible!important}
    #amitBottomNav button:after{content:''!important;position:absolute!important;left:50%!important;transform:translateX(-50%)!important;bottom:1px!important;width:7px!important;height:7px!important;border-radius:50%!important;background:rgba(116,143,138,.42)!important;transition:.2s ease!important}
    #amitBottomNav .nav-icon{display:block!important;width:31px!important;height:31px!important;object-fit:contain!important;filter:none!important;opacity:.98!important;transition:transform .22s ease!important}
    #amitBottomNav .nav-inline{width:31px!important;height:31px!important;color:#175d56!important}
    #amitBottomNav button.active{z-index:2!important}
    #amitBottomNav button.active:before{content:''!important;position:absolute!important;width:60px!important;height:60px!important;top:-12px!important;left:50%!important;transform:translateX(-50%)!important;border-radius:50%!important;border:1.2px solid rgba(255,255,255,.95)!important;background:radial-gradient(circle at 42% 30%,rgba(255,255,255,.78),rgba(249,198,192,.70) 48%,rgba(238,173,167,.50) 100%)!important;box-shadow:0 7px 18px rgba(203,116,106,.18),inset 0 1px 0 rgba(255,255,255,.98),inset 0 0 18px rgba(255,255,255,.34)!important;backdrop-filter:blur(18px)!important;-webkit-backdrop-filter:blur(18px)!important}
    #amitBottomNav button.active:after{width:31px!important;height:5px!important;border-radius:6px!important;bottom:-3px!important;background:#e88f89!important;box-shadow:0 2px 7px rgba(232,143,137,.20)!important}
    #amitBottomNav button.active .nav-icon,#amitBottomNav button.active .nav-inline{position:relative!important;z-index:2!important;transform:translateY(-6px) scale(1.06)!important}
    .screen.active{padding-bottom:76px!important}
  `;
  document.head.appendChild(style);

  document.querySelectorAll('.nav').forEach(n=>n.style.setProperty('display','none','important'));
  let nav=document.getElementById('amitBottomNav');
  if(nav)nav.remove();
  nav=document.createElement('nav');
  nav.id='amitBottomNav';
  nav.setAttribute('aria-label','ניווט ראשי');

  const iconMarkup=[
    `<img class="nav-icon" src="/assets/home-nav-appointments.svg?v=${BUILD}" alt="">`,
    `<img class="nav-icon" src="/assets/home-nav-services.svg?v=${BUILD}" alt="">`,
    `<img class="nav-icon" src="/assets/home-nav-home.svg?v=${BUILD}" alt="">`,
    `<svg class="nav-inline" viewBox="0 0 40 40" fill="none" aria-hidden="true"><circle cx="20" cy="20" r="15.5" stroke="currentColor" stroke-width="2.2"/><path d="M20 17.5v10" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/><circle cx="20" cy="12.5" r="1.8" fill="currentColor"/></svg>`,
    `<img class="nav-icon" src="/assets/home-nav-profile.svg?v=${BUILD}" alt="">`
  ];

  screens.forEach((target,i)=>{
    const b=document.createElement('button');
    b.type='button';
    b.dataset.target=target;
    b.setAttribute('aria-label',labels[i]);
    b.innerHTML=iconMarkup[i];
    b.addEventListener('click',()=>{
      try{if(typeof window.show==='function')window.show(target);}
      catch(_){const s=document.getElementById(target);if(s){document.querySelectorAll('.screen').forEach(x=>x.classList.remove('active'));s.classList.add('active');}}
      requestAnimationFrame(sync);
    });
    nav.appendChild(b);
  });
  document.body.appendChild(nav);

  function activeScreen(){return document.querySelector('.screen.active')?.id||'';}
  function sync(){
    const id=activeScreen();
    const authenticated=!['','login','register'].includes(id);
    nav.hidden=!authenticated;
    [...nav.querySelectorAll('button')].forEach(b=>b.classList.toggle('active',b.dataset.target===id));
  }
  sync();
  new MutationObserver(sync).observe(document.body,{subtree:true,attributes:true,attributeFilter:['class']});
})();