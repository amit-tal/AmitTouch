(function(){
  window.__AMIT_HOME_DESIGN_BUILD__='20260815-2205';
  document.getElementById('amit-home-polish')?.remove();
  const home=document.getElementById('home');
  if(!home)return;

  const s=document.createElement('style');
  s.id='amit-home-polish';
  s.dataset.build=window.__AMIT_HOME_DESIGN_BUILD__;
  s.textContent=`
    #home{padding:0 8px 104px!important;color:#174f4a!important;background:#fbf6f1!important;min-height:100dvh!important;overflow-x:hidden!important}
    #home .top{height:48px!important;grid-template-columns:38px 1fr 38px!important;align-items:center!important;margin:0!important;padding:0 2px!important;position:relative!important;z-index:6!important}
    #home .top .round{width:32px!important;height:32px!important;border:0!important;background:transparent!important;box-shadow:none!important;font-size:0!important;background-position:center!important;background-repeat:no-repeat!important;background-size:contain!important;padding:0!important}
    #home .top .round:first-child{background-image:url('/assets/home-icon-menu.svg?v=20260815-2205')!important}
    #home .top .round:last-child{background-image:url('/assets/home-icon-profile-top.svg?v=20260815-2205')!important}

    #home .home-hero{padding:0!important;margin:0!important;position:relative!important}
    #home .home-hero>.logo{display:block!important;width:126px!important;max-width:38vw!important;height:auto!important;margin:-24px auto -1px!important;position:relative!important;z-index:7!important;object-fit:contain!important}
    #home .hero-photo{height:168px!important;margin:0!important;border-radius:0!important;border:0!important;box-shadow:none!important;background:url('/assets/home-hero.webp?v=20260815-2205') right 57%/auto 168px no-repeat!important;position:relative!important;overflow:visible!important}
    #home .hero-photo:before{display:none!important}
    #home .hero-photo:after{content:''!important;position:absolute!important;left:0!important;right:0!important;bottom:0!important;height:44px!important;background:linear-gradient(180deg,rgba(251,246,241,0),#fbf6f1 92%)!important;pointer-events:none!important}
    #home .hero-copy{position:absolute!important;left:9px!important;right:auto!important;bottom:35px!important;width:42%!important;text-align:right!important;direction:rtl!important;z-index:3!important;color:#275e59!important}
    #home .hero-copy small{display:block!important;font-size:11px!important;font-weight:300!important;line-height:1.25!important;color:#46746f!important;margin:0 0 3px!important}
    #home .hero-copy strong{display:block!important;font-size:18px!important;line-height:1.25!important;font-weight:200!important;color:#275e59!important;margin:0!important}

    #home .primary{height:46px!important;padding:0 16px!important;margin:4px 3px 0!important;width:calc(100% - 6px)!important;border:0!important;border-radius:9px!important;font-size:15px!important;line-height:46px!important;font-weight:400!important;background:linear-gradient(90deg,#2d6a64,#376f69)!important;box-shadow:0 5px 13px rgba(38,91,85,.15)!important;color:#fff!important}

    #home .section-title{font-size:10.5px!important;font-weight:300!important;line-height:1!important;margin:12px 2px 8px!important;color:#3d6965!important;gap:8px!important}
    #home .section-title:before,#home .section-title:after{background:linear-gradient(90deg,transparent,rgba(47,113,107,.14),transparent)!important}

    #home .quick-grid{display:grid!important;grid-template-columns:repeat(4,1fr)!important;gap:5px!important;margin:0 0 2px!important}
    #home .quick{min-height:76px!important;padding:7px 2px 6px!important;border-radius:9px!important;background:rgba(255,255,255,.48)!important;border:1px solid rgba(221,207,196,.46)!important;box-shadow:0 3px 9px rgba(80,60,45,.04)!important;color:#2d5d59!important}
    #home .quick span{display:block!important;width:35px!important;height:38px!important;margin:0 auto 3px!important;font-size:0!important;background-position:center!important;background-repeat:no-repeat!important;background-size:contain!important}
    #home .quick:nth-child(1) span{background-image:url('/assets/home-service-manicure.svg?v=20260815-2205')!important}
    #home .quick:nth-child(2) span{background-image:url('/assets/home-service-pedicure.svg?v=20260815-2205')!important}
    #home .quick:nth-child(3) span{background-image:url('/assets/home-service-gel.svg?v=20260815-2205')!important}
    #home .quick:nth-child(4) span{background-image:url('/assets/home-service-design.svg?v=20260815-2205')!important}
    #home .quick b{display:block!important;font-size:8.5px!important;line-height:1.2!important;font-weight:400!important;color:#2d5d59!important}

    #home .next-card{min-height:64px!important;border-radius:9px!important;padding:8px 10px!important;margin:0!important;grid-template-columns:32px 1fr auto!important;gap:8px!important;background:rgba(255,255,255,.48)!important;border:1px solid rgba(221,207,196,.46)!important;box-shadow:0 3px 9px rgba(80,60,45,.04)!important}
    #home .checkdot{width:28px!important;height:28px!important;border:1px solid rgba(47,113,107,.13)!important;background:#f6eee7!important;color:#2f716b!important;font-size:14px!important}
    #home .next-card small{font-size:9px!important;line-height:1.25!important;color:#7a8784!important}
    #home .next-card b{font-size:10.5px!important;line-height:1.25!important;font-weight:500!important;color:#315d59!important}
    #home .date-big{font-size:18px!important;line-height:1!important;font-weight:500!important;color:#315d59!important}

    .nav{direction:rtl!important;position:fixed!important;left:50%!important;transform:translateX(-50%)!important;z-index:40!important;bottom:max(8px,env(safe-area-inset-bottom))!important;width:min(408px,calc(100% - 20px))!important;height:70px!important;border-radius:35px!important;border:1px solid rgba(255,255,255,.82)!important;background:linear-gradient(180deg,rgba(255,248,247,.76),rgba(243,215,213,.58))!important;box-shadow:0 10px 28px rgba(111,76,70,.14),inset 0 2px 2px rgba(255,255,255,.96),inset 0 -2px 4px rgba(194,139,136,.14)!important;backdrop-filter:blur(28px) saturate(160%)!important;-webkit-backdrop-filter:blur(28px) saturate(160%)!important;padding:7px 12px!important;overflow:visible!important;grid-template-columns:repeat(4,1fr)!important}
    .nav:before{content:''!important;position:absolute!important;inset:3px 6px!important;border-radius:32px!important;border-top:1px solid rgba(255,255,255,.95)!important;pointer-events:none!important}
    .nav button{position:relative!important;height:54px!important;border:0!important;background:transparent!important;border-radius:50%!important;font-size:0!important;color:transparent!important;padding:0!important;overflow:visible!important;transition:transform .22s ease,background .22s ease!important}
    .nav button span{position:relative!important;z-index:2!important;width:29px!important;height:31px!important;margin:auto!important;font-size:0!important;background-position:center!important;background-repeat:no-repeat!important;background-size:contain!important;display:block!important;filter:drop-shadow(0 1px 1px rgba(25,75,70,.08))!important}
    .nav button:nth-child(1) span{background-image:url('/assets/home-nav-home.svg?v=20260815-2205')!important}
    .nav button:nth-child(2) span{background-image:url('/assets/home-nav-services.svg?v=20260815-2205')!important}
    .nav button:nth-child(3) span{background-image:url('/assets/home-nav-appointments.svg?v=20260815-2205')!important}
    .nav button:nth-child(4) span{background-image:url('/assets/home-nav-profile.svg?v=20260815-2205')!important}
    .nav button.active{transform:translateY(-12px)!important;background:radial-gradient(circle at 50% 28%,rgba(255,255,255,.82),rgba(244,177,177,.75) 72%,rgba(232,144,147,.68))!important;box-shadow:0 9px 18px rgba(183,105,105,.20),inset 0 2px 3px rgba(255,255,255,.96),inset 0 -3px 6px rgba(181,106,109,.12)!important;border:1px solid rgba(255,255,255,.82)!important}
    .nav button.active:after{content:''!important;position:absolute!important;left:50%!important;bottom:-12px!important;transform:translateX(-50%)!important;width:40px!important;height:4px!important;border-radius:6px!important;background:linear-gradient(90deg,#d77e7f,#e79898)!important;box-shadow:0 1px 5px rgba(188,106,107,.22)!important}
    .nav button.active span{width:33px!important;height:35px!important}

    @media(max-height:760px){#home .hero-photo{height:148px!important;background-size:auto 148px!important}#home .hero-copy{bottom:29px!important}#home .quick{min-height:69px!important}#home .quick span{width:31px!important;height:33px!important}.nav{height:65px!important}.nav button{height:50px!important}}
  `;
  document.head.appendChild(s);

  const logo=home.querySelector('.logo');
  if(logo)logo.src='/assets/amitouch_logo_vector.png?v=20260815-2205';
  const primary=home.querySelector('.primary');
  if(primary)primary.innerHTML='<span aria-hidden="true" style="display:inline-block;margin-left:7px;font-size:15px">▣</span>הזמיני תור';
})();