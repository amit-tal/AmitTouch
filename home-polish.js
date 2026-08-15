(function(){
  const BUILD='20260815-home-reference-v3';
  window.__AMIT_HOME_DESIGN_BUILD__=BUILD;
  document.getElementById('amit-home-polish')?.remove();
  const home=document.getElementById('home');
  if(!home)return;

  const style=document.createElement('style');
  style.id='amit-home-polish';
  style.dataset.build=BUILD;
  style.textContent=`
    #home{padding:0 0 92px!important;color:#174f4a!important;overflow-x:hidden!important}
    #home .top{height:48px!important;display:grid!important;grid-template-columns:40px 1fr 40px!important;align-items:center!important;margin:0!important;padding:0 7px!important;position:relative!important;z-index:8!important}
    #home .top b{font-size:0!important}
    #home .top .round{width:32px!important;height:32px!important;border:0!important;border-radius:0!important;background-color:transparent!important;box-shadow:none!important;backdrop-filter:none!important;-webkit-backdrop-filter:none!important;font-size:0!important;background-position:center!important;background-repeat:no-repeat!important;background-size:25px 25px!important;padding:0!important}
    #home .top .round:first-child{background-image:url('/assets/home-icon-menu.svg?v=${BUILD}')!important}
    #home .top .round:last-child{background-image:url('/assets/home-icon-profile-top.svg?v=${BUILD}')!important}

    #home .home-hero{padding:0!important;margin:0!important;position:relative!important}
    #home .home-hero>.logo{display:block!important;width:132px!important;max-width:46vw!important;height:auto!important;margin:-34px auto 4px!important;position:relative!important;z-index:7!important;object-fit:contain!important}
    #home .hero-photo{height:176px!important;margin:0 -15px 9px!important;border:0!important;border-radius:0!important;box-shadow:none!important;position:relative!important;overflow:hidden!important;background:url('/assets/home-hero.webp?v=${BUILD}') center 56%/cover no-repeat!important}
    #home .hero-photo:before{display:none!important}
    #home .hero-photo:after{content:''!important;position:absolute!important;inset:0!important;background:linear-gradient(90deg,rgba(251,246,239,.94) 0%,rgba(251,246,239,.54) 25%,rgba(251,246,239,0) 53%)!important;pointer-events:none!important}
    #home .hero-copy{position:absolute!important;left:17px!important;right:auto!important;bottom:27px!important;width:122px!important;text-align:right!important;color:#285f5a!important;z-index:3!important;direction:rtl!important}
    #home .hero-copy small{display:block!important;margin:0 0 2px!important;color:#285f5a!important;font-size:11px!important;line-height:1.25!important;font-weight:300!important}
    #home .hero-copy strong{display:block!important;margin:0!important;color:#285f5a!important;font-family:var(--hand,'GveretLevin',cursive)!important;font-size:20px!important;line-height:1.12!important;font-weight:100!important;font-synthesis:none!important}

    #home .primary{display:flex!important;align-items:center!important;justify-content:center!important;gap:8px!important;width:100%!important;height:47px!important;padding:0 12px!important;border:0!important;border-radius:8px!important;background:linear-gradient(90deg,#2f6f69,#356f69)!important;color:#fff!important;font-size:15px!important;font-weight:500!important;box-shadow:0 5px 12px rgba(38,91,85,.18)!important;margin:0!important}
    #home .primary .home-book-icon{width:18px!important;height:18px!important;display:block!important;object-fit:contain!important;filter:brightness(0) invert(1)!important}

    #home .section-title{display:flex!important;align-items:center!important;gap:7px!important;margin:13px 0 7px!important;color:#345e5a!important;font-size:10px!important;line-height:1!important;font-weight:400!important;text-align:center!important}
    #home .section-title:before,#home .section-title:after{content:''!important;display:block!important;height:1px!important;flex:1!important;background:linear-gradient(90deg,transparent,rgba(47,113,107,.18),transparent)!important}

    #home .quick-grid{display:grid!important;grid-template-columns:repeat(4,1fr)!important;gap:4px!important;margin:0!important}
    #home .quick{min-width:0!important;min-height:84px!important;padding:8px 2px 7px!important;border-radius:8px!important;border:1px solid rgba(224,214,204,.72)!important;background:rgba(255,255,255,.44)!important;box-shadow:0 2px 8px rgba(80,60,45,.045)!important;color:#234f4b!important}
    #home .quick span{display:block!important;width:38px!important;height:40px!important;margin:0 auto 4px!important;font-size:0!important;background-position:center!important;background-repeat:no-repeat!important;background-size:contain!important}
    #home .quick:nth-child(1) span{background-image:url('/assets/home-service-manicure.svg?v=${BUILD}')!important}
    #home .quick:nth-child(2) span{background-image:url('/assets/home-service-pedicure.svg?v=${BUILD}')!important}
    #home .quick:nth-child(3) span{background-image:url('/assets/home-service-gel.svg?v=${BUILD}')!important}
    #home .quick:nth-child(4) span{background-image:url('/assets/home-service-design.svg?v=${BUILD}')!important}
    #home .quick b{display:block!important;font-size:8.5px!important;line-height:1.25!important;font-weight:500!important;color:#2e5b57!important;white-space:normal!important}

    #home .next-card{display:grid!important;grid-template-columns:34px 1fr 48px!important;align-items:center!important;gap:8px!important;min-height:66px!important;margin:0!important;padding:8px 10px!important;border-radius:9px!important;background:rgba(255,255,255,.48)!important;border:1px solid rgba(224,214,204,.68)!important;box-shadow:0 2px 8px rgba(80,60,45,.045)!important}
    #home .checkdot{width:29px!important;height:29px!important;border-radius:50%!important;background:#f5eee8!important;border:1px solid rgba(47,113,107,.13)!important;color:#2f716b!important;font-size:15px!important}
    #home .next-card small{font-size:8.5px!important;line-height:1.2!important;color:#6f7d7a!important;font-weight:300!important}
    #home .next-card b{font-size:10px!important;line-height:1.3!important;color:#315b57!important;font-weight:500!important}
    #home .date-big{font-size:17px!important;line-height:1!important;font-weight:500!important;color:#425a57!important}

    .nav{direction:rtl!important;position:fixed!important;z-index:40!important;left:50%!important;transform:translateX(-50%)!important;bottom:max(8px,env(safe-area-inset-bottom))!important;width:min(409px,calc(100% - 20px))!important;height:69px!important;display:none!important;grid-template-columns:repeat(4,1fr)!important;padding:7px 12px!important;border-radius:34px!important;border:1px solid rgba(255,255,255,.80)!important;background:linear-gradient(180deg,rgba(255,250,249,.76),rgba(244,217,214,.58))!important;box-shadow:0 9px 25px rgba(111,76,70,.13),inset 0 2px 2px rgba(255,255,255,.95),inset 0 -2px 4px rgba(194,139,136,.12)!important;backdrop-filter:blur(27px) saturate(160%)!important;-webkit-backdrop-filter:blur(27px) saturate(160%)!important;overflow:visible!important}
    .nav.show{display:grid!important}
    .nav:before{content:''!important;position:absolute!important;inset:3px 6px!important;border-radius:31px!important;border-top:1px solid rgba(255,255,255,.94)!important;pointer-events:none!important}
    .nav button{position:relative!important;height:54px!important;padding:0!important;border:0!important;border-radius:50%!important;background:transparent!important;color:transparent!important;font-size:0!important;overflow:visible!important;transition:transform .2s ease!important}
    .nav button span{display:block!important;width:29px!important;height:31px!important;margin:auto!important;font-size:0!important;background-position:center!important;background-repeat:no-repeat!important;background-size:contain!important;filter:drop-shadow(0 1px 1px rgba(25,75,70,.06))!important}
    .nav button:nth-child(1) span{background-image:url('/assets/home-nav-home.svg?v=${BUILD}')!important}
    .nav button:nth-child(2) span{background-image:url('/assets/home-nav-services.svg?v=${BUILD}')!important}
    .nav button:nth-child(3) span{background-image:url('/assets/home-nav-appointments.svg?v=${BUILD}')!important}
    .nav button:nth-child(4) span{background-image:url('/assets/home-nav-profile.svg?v=${BUILD}')!important}
    .nav button.active{transform:translateY(-11px)!important;background:radial-gradient(circle at 50% 26%,rgba(255,255,255,.84),rgba(246,190,188,.74) 72%,rgba(235,154,157,.68))!important;border:1px solid rgba(255,255,255,.82)!important;box-shadow:0 8px 17px rgba(183,105,105,.18),inset 0 2px 3px rgba(255,255,255,.95),inset 0 -3px 6px rgba(181,106,109,.10)!important}
    .nav button.active:after{content:''!important;position:absolute!important;left:50%!important;bottom:-11px!important;transform:translateX(-50%)!important;width:39px!important;height:4px!important;border-radius:6px!important;background:#df8d8e!important;box-shadow:0 1px 4px rgba(188,106,107,.18)!important}
    .nav button.active span{width:32px!important;height:34px!important}

    @media(max-height:760px){
      #home .hero-photo{height:154px!important}
      #home .home-hero>.logo{width:118px!important;margin-top:-32px!important}
      #home .quick{min-height:74px!important;padding-top:6px!important}
      #home .quick span{width:34px!important;height:35px!important}
      #home .section-title{margin:9px 0 6px!important}
      .nav{height:64px!important}
      .nav button{height:49px!important}
    }
  `;
  document.head.appendChild(style);

  const logo=home.querySelector('.logo');
  if(logo)logo.src=`/assets/amitouch_logo_vector.png?v=${BUILD}`;

  const primary=home.querySelector('.primary');
  if(primary){
    primary.innerHTML=`<img class="home-book-icon" src="/assets/home-nav-appointments.svg?v=${BUILD}" alt=""> <span>הזמיני תור</span>`;
  }
})();