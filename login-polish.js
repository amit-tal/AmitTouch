(function(){
  const style=document.createElement('style');
  style.id='amit-touch-login-polish';
  style.textContent=`
    #login.active{position:fixed!important;inset:0!important;display:block!important;overflow:hidden!important;background:#fbf6f1!important;z-index:20!important}
    #login .auth{position:relative!important;width:100%!important;height:100dvh!important;max-width:430px!important;margin:0 auto!important;padding:calc(env(safe-area-inset-top) + 18px) 28px calc(env(safe-area-inset-bottom) + 18px)!important;text-align:center!important;overflow:hidden!important;background:#fbf6f1!important;display:flex!important;flex-direction:column!important;align-items:center!important}
    #login .auth:before{content:'';position:absolute!important;inset:0!important;background:url('/assets/login-bg.webp?v=20260815-login') center bottom/cover no-repeat!important;z-index:0!important;pointer-events:none!important}
    #login .auth>*{position:relative;z-index:1}
    #login .round{display:none!important}
    #login .spark{right:40px!important;top:calc(env(safe-area-inset-top) + 78px)!important;color:#d88f82!important;font-size:27px!important;font-weight:300!important}
    #login .logo{width:min(300px,78vw)!important;height:auto!important;max-height:31vh!important;object-fit:contain!important;margin:calc(env(safe-area-inset-top) + 34px) auto 10px!important;flex:0 0 auto!important}
    #login h1{font-size:30px!important;line-height:1.15!important;font-weight:300!important;color:#326e68!important;margin:2px 0 7px!important;letter-spacing:0!important}
    #login h1 .heart{color:#d88f82!important;font-size:31px!important;font-weight:300!important}
    #login p.subtitle{font-size:16px!important;line-height:1.45!important;font-weight:300!important;color:#477d78!important;margin:0 0 25px!important}
    #login .field-wrap{width:100%!important;height:64px!important;min-height:64px!important;margin:0 0 14px!important;padding:0 18px!important;border-radius:16px!important;border:1px solid rgba(59,100,95,.16)!important;background:rgba(255,255,255,.24)!important;box-shadow:0 5px 18px rgba(85,67,55,.025)!important;backdrop-filter:none!important;-webkit-backdrop-filter:none!important;display:flex!important;flex-direction:row-reverse!important;gap:12px!important}
    #login .field-icon{width:31px!important;min-width:31px!important;height:31px!important;font-size:0!important;background-position:center!important;background-repeat:no-repeat!important;background-size:contain!important;opacity:.96!important}
    #login .field-wrap:nth-of-type(1) .field-icon{background-image:url('/assets/user-icon.png?v=20260815-login')!important}
    #login .field-wrap:nth-of-type(2) .field-icon{background-image:url('/assets/phone-icon.png?v=20260815-login')!important}
    #login .field{height:100%!important;padding:0!important;text-align:right!important;direction:rtl!important;font-size:17px!important;font-weight:300!important;color:#285f5a!important}
    #login .field::placeholder{color:#a9adac!important;opacity:1!important;font-weight:300!important}
    #login .primary{width:100%!important;height:61px!important;min-height:61px!important;border:0!important;border-radius:14px!important;margin:3px 0 0!important;padding:0!important;background:linear-gradient(90deg,#2b655f,#346e68)!important;color:#fff!important;font-size:19px!important;font-weight:300!important;box-shadow:0 7px 16px rgba(39,91,86,.14)!important}
    #login .divider{width:78%!important;margin:21px auto 14px!important;gap:14px!important;color:#d58f82!important;font-size:14px!important;font-weight:300!important}
    #login .divider:before,#login .divider:after{background:rgba(60,104,99,.18)!important}
    #login .secure{margin:0!important;font-size:13px!important;font-weight:300!important;color:#3f7772!important;line-height:1.4!important}
    #login .secure:before{content:'🔒';font-size:14px;margin-left:7px;color:#d58f82}
    #login .auth-link{margin-top:13px!important;font-size:13px!important;font-weight:300!important;color:#345f5b!important}
    #login .auth-link button{padding:0 4px!important;font-size:13px!important;font-weight:400!important;color:#2f716b!important;text-underline-offset:5px!important}
    @media(max-height:760px){
      #login .logo{width:min(245px,67vw)!important;margin-top:20px!important;max-height:25vh!important}
      #login h1{font-size:26px!important}#login p.subtitle{margin-bottom:15px!important}
      #login .field-wrap{height:57px!important;min-height:57px!important;margin-bottom:10px!important}
      #login .primary{height:56px!important;min-height:56px!important}
      #login .divider{margin:14px auto 10px!important}
      #login .auth-link{margin-top:9px!important}
    }
  `;
  document.head.appendChild(style);

  const logo=document.querySelector('#login img.logo');
  if(logo) logo.src='/assets/Amit%20Touch_Logo.png?v=20260815-login';

  const secure=document.querySelector('#login .secure');
  if(secure) secure.textContent='הפרטים שלך נשמרים בצורה מאובטחת';
})();