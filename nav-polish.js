(function(){
  const BUILD='20260816-bottom-nav-v1';
  const screens=['bookings','services','home','about','profile'];
  const labels=['זימון תור','השירותים שלי','בית','אודות','הגדרות ופרטי משתמש'];

  document.getElementById('amit-bottom-nav-style')?.remove();
  const style=document.createElement('style');
  style.id='amit-bottom-nav-style';
  style.textContent=`
    #amitBottomNav{position:fixed!important;z-index:90!important;left:50%!important;transform:translateX(-50%)!important;bottom:max(10px,env(safe-area-inset-bottom))!important;width:min(404px,calc(100vw - 20px))!important;height:82px!important;display:grid!important;grid-template-columns:repeat(5,1fr)!important;align-items:center!important;padding:6px 11px!important;border-radius:42px!important;border:1.5px solid rgba(255,255,255,.94)!important;background:linear-gradient(110deg,rgba(255,255,255,.54),rgba(249,232,228,.48),rgba(255,255,255,.48))!important;box-shadow:0 14px 34px rgba(188,116,105,.18),inset 0 1px 1px rgba(255,255,255,.98),inset 0 -1px 0 rgba(255,255,255,.32),inset 0 0 30px rgba(255,255,255,.26)!important;backdrop-filter:blur(24px) saturate(145%)!important;-webkit-backdrop-filter:blur(24px) saturate(145%)!important;direction:rtl!important;overflow:visible!important}
    #amitBottomNav[hidden]{display:none!important}
    #amitBottomNav button{position:relative!important;height:66px!important;border:0!important;background:transparent!important;padding:0!important;margin:0!important;display:flex!important;align-items:center!important;justify-content:center!important;color:#175d56!important;overflow:visible!important}
    #amitBottomNav button:after{content:''!important;position:absolute!important;left:50%!important;transform:translateX(-50%)!important;bottom:1px!important;width:10px!important;height:10px!important;border-radius:50%!important;background:rgba(116,143,138,.47)!important;transition:.2s ease!important}
    #amitBottomNav .nav-icon{display:block!important;width:39px!important;height:39px!important;object-fit:contain!important;filter:none!important;opacity:.98!important;transition:transform .22s ease!important}
    #amitBottomNav .nav-inline{width:39px!important;height:39px!important;color:#175d56!important}
    #amitBottomNav button.active{z-index:2!important}
    #amitBottomNav button.active:before{content:''!important;position:absolute!important;width:72px!important;height:72px!important;top:-15px!important;left:50%!important;transform:translateX(-50%)!important;border-radius:50%!important;border:1.5px solid rgba(255,255,255,.95)!important;background:radial-gradient(circle at 42% 30%,rgba(255,255,255,.75),rgba(249,198,192,.72) 46%,rgba(238,173,167,.52) 100%)!important;box-shadow:0 9px 22px rgba(203,116,106,.20),inset 0 1px 0 rgba(255,255,255,.98),inset 0 0 22px rgba(255,255,255,.35)!important;backdrop-filter:blur(18px)!important;-webkit-backdrop-filter:blur(18px)!important}
    #amitBottomNav button.active:after{width:39px!important;height:8px!important;border-radius:8px!important;bottom:-4px!important;background:#e88f89!important;box-shadow:0 3px 9px rgba(232,143,137,.22)!important}
    #amitBottomNav button.active .nav-icon,#amitBottomNav button.active .nav-inline{position:relative!important;z-index:2!important;transform:translateY(-8px) scale(1.08)!important}
    .screen.active{padding-bottom:96px!important}
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