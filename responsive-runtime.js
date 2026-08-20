(function(){
  const id='amit-responsive-runtime';
  document.getElementById(id)?.remove();
  const style=document.createElement('style');
  style.id=id;
  style.textContent=`
    html,body{width:100%!important;max-width:100%!important;min-height:100%!important;overflow-x:hidden!important;overflow-y:auto!important;-webkit-overflow-scrolling:touch!important;overscroll-behavior-y:auto!important}
    body{min-height:100dvh!important;min-height:100svh!important}
    .app{width:min(100%,430px)!important;max-width:100%!important;min-height:100dvh!important;min-height:100svh!important;margin:0 auto!important;padding-left:max(15px,env(safe-area-inset-left))!important;padding-right:max(15px,env(safe-area-inset-right))!important;padding-bottom:max(110px,calc(92px + env(safe-area-inset-bottom)))!important;overflow:visible!important}
    .screen.active{width:100%!important;max-width:100%!important;height:auto!important;max-height:none!important;min-height:calc(100svh - 100px)!important;overflow-x:hidden!important;overflow-y:visible!important;overscroll-behavior:auto!important;-webkit-overflow-scrolling:touch!important}
    #profile.screen.active,#about.screen.active,#services.screen.active,#book.screen.active,#gallery.screen.active,#orders.screen.active,#login.screen.active,#register.screen.active{height:auto!important;max-height:none!important;overflow-y:visible!important}
    .nav{width:min(405px,calc(100% - 22px - env(safe-area-inset-left) - env(safe-area-inset-right)))!important;bottom:max(10px,env(safe-area-inset-bottom))!important}
    img,svg,video,canvas{max-width:100%!important}
    input,button,select,textarea{max-width:100%!important}
    @media (max-width:380px){
      .app{padding-left:max(11px,env(safe-area-inset-left))!important;padding-right:max(11px,env(safe-area-inset-right))!important}
      #home .quick-grid{gap:7px!important}
      #home .quick{min-width:0!important}
      #home .appointment-card{max-width:100%!important}
      .times{grid-template-columns:repeat(3,minmax(0,1fr))!important}
    }
    @media (min-width:431px) and (max-width:760px){
      .app{width:min(100%,480px)!important}
      .nav{width:min(445px,calc(100% - 28px))!important}
    }
    @supports not (height:100dvh){body,.app{min-height:100vh!important}}
  `;
  document.head.appendChild(style);
  function syncViewport(){
    document.documentElement.style.setProperty('--amit-vh',`${window.innerHeight*0.01}px`);
    const active=document.querySelector('.screen.active');
    if(active&&active.scrollHeight>window.innerHeight){
      document.documentElement.classList.add('amit-content-overflow');
      document.body.style.overflowY='auto';
    }else document.documentElement.classList.remove('amit-content-overflow');
  }
  window.addEventListener('resize',syncViewport,{passive:true});
  window.addEventListener('orientationchange',()=>setTimeout(syncViewport,120),{passive:true});
  new MutationObserver(syncViewport).observe(document.body,{subtree:true,childList:true,attributes:true,attributeFilter:['class']});
  syncViewport();
})();