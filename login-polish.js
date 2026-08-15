(function(){
  document.getElementById('amit-touch-login-polish')?.remove();
  const style=document.createElement('style');
  style.id='amit-touch-login-polish';
  style.textContent=`
    html,body{height:100%!important;overflow:hidden!important}
    html:has(#login.active),body:has(#login.active){height:100%!important;overflow:hidden!important;background:#fbf6f1!important;overscroll-behavior:none!important}
    #login.active{position:fixed!important;inset:0!important;display:block!important;width:100%!important;height:100dvh!important;overflow:hidden!important;background:#fbf6f1!important;z-index:25!important}
    #login .auth{position:relative!important;width:100%!important;height:100dvh!important;max-width:430px!important;margin:0 auto!important;padding:0 28px calc(env(safe-area-inset-bottom) + 10px)!important;overflow:hidden!important;text-align:center!important;display:flex!important;flex-direction:column!important;align-items:center!important;background:url('/assets/ChatGPT%20Image%20Aug%2014,%202026,%2003_22_37%20PM.png?v=20260815-login-bg') center bottom/cover no-repeat!important}
    #login .auth>*{flex:0 0 auto!important;position:relative!important;z-index:1!important}
    #login .round,#login .spark{display:none!important}
    #login .logo{display:block!important;width:min(248px,66vw)!important;max-width:none!important;height:auto!important;max-height:24vh!important;object-fit:contain!important;margin:5.4vh auto 0!important;background:transparent!important}
    #login h1{display:flex!important;width:100%!important;align-items:center!important;justify-content:center!important;gap:7px!important;text-align:center!important;margin:2.2vh 0 0!important;font-size:27px!important;line-height:1.1!important;font-weight:200!important;color:#34736d!important;letter-spacing:0!important}
    #login h1 .heart{display:inline-flex!important;width:26px!important;height:26px!important;font-size:0!important;margin:0!important;background:url('/assets/amit-touch-heart.svg?v=20260815-heart') center/contain no-repeat!important;vertical-align:middle!important}
    #login p.subtitle{width:100%!important;text-align:center!important;margin:8px 0 0!important;font-size:15px!important;line-height:1.25!important;font-weight:200!important;color:#4b7e79!important}
    #login .field-wrap{width:100%!important;height:58px!important;min-height:58px!important;margin:2.7vh 0 0!important;padding:0 18px!important;border-radius:16px!important;border:1px solid rgba(53,91,87,.15)!important;background:rgba(255,255,255,.16)!important;box-shadow:0 5px 16px rgba(72,55,44,.025)!important;backdrop-filter:none!important;-webkit-backdrop-filter:none!important;display:flex!important;align-items:center!important;flex-direction:row!important;gap:13px!important}
    #login .field-wrap + .field-wrap{margin-top:11px!important}
    #login .field-icon{display:block!important;width:30px!important;min-width:30px!important;height:30px!important;font-size:0!important;background-position:center!important;background-repeat:no-repeat!important;background-size:contain!important;color:transparent!important}
    #login .field-wrap:has(#loginName) .field-icon{background-image:url('/assets/%D7%90%D7%99%D7%A9.png?v=20260815-person-final')!important}
    #login .field-wrap:has(#loginPhone) .field-icon{background-image:url('/assets/ChatGPT%20Image%20Aug%2014,%202026,%2003_25_24%20PM.png?v=20260815-phone-final')!important}
    #login .field{height:100%!important;width:100%!important;padding:0!important;border:0!important;background:transparent!important;outline:0!important;text-align:right!important;direction:rtl!important;font-size:16px!important;line-height:1!important;font-weight:300!important;color:#285f5a!important}
    #login .field::placeholder{color:#a9adac!important;opacity:1!important;font-weight:300!important}
    #login .primary{width:100%!important;height:56px!important;min-height:56px!important;margin:2.6vh 0 0!important;padding:0!important;border:0!important;border-radius:14px!important;background:linear-gradient(90deg,#2c655f 0%,#346d67 100%)!important;color:#fff!important;font-size:19px!important;line-height:56px!important;font-weight:300!important;box-shadow:0 7px 15px rgba(36,91,85,.15)!important}
    #login .divider{width:75%!important;margin:2.4vh auto 0!important;display:flex!important;align-items:center!important;gap:15px!important;color:#d99486!important;font-size:13px!important;font-weight:300!important}
    #login .divider:before,#login .divider:after{content:''!important;height:1px!important;flex:1!important;background:rgba(47,92,88,.17)!important}
    #login .secure{position:relative!important;margin:2vh 0 0!important;padding-right:24px!important;font-size:12.5px!important;line-height:1.2!important;font-weight:300!important;color:#3c756f!important}
    #login .secure:before{content:''!important;position:absolute!important;right:0!important;top:50%!important;transform:translateY(-50%)!important;width:17px!important;height:17px!important;background:url('/assets/%D7%9E%D7%A0%D7%A2%D7%95%D7%9C.png?v=20260815-icons') center/contain no-repeat!important}
    #login .auth-link{margin:1.4vh 0 0!important;font-size:12.5px!important;line-height:1.2!important;font-weight:300!important;color:#365f5b!important}
    #login .auth-link button{border:0!important;background:none!important;padding:0 4px!important;color:#2f716b!important;font-size:12.5px!important;font-weight:400!important;text-decoration:underline!important;text-underline-offset:5px!important}
    @media(max-height:820px){#login .logo{width:min(225px,62vw)!important;margin-top:3.8vh!important;max-height:21vh!important}#login h1{margin-top:1.6vh!important;font-size:24px!important}#login p.subtitle{font-size:13.5px!important;margin-top:6px!important}#login .field-wrap{height:52px!important;min-height:52px!important;margin-top:1.9vh!important}#login .field-wrap + .field-wrap{margin-top:9px!important}#login .primary{height:50px!important;min-height:50px!important;line-height:50px!important;margin-top:1.9vh!important}#login .divider{margin-top:1.8vh!important}#login .secure{margin-top:1.4vh!important;font-size:11.5px!important}#login .auth-link{margin-top:1vh!important;font-size:11.5px!important}}
    @media(max-height:700px){#login .logo{width:min(205px,58vw)!important;margin-top:2.5vh!important;max-height:19vh!important}#login h1{margin-top:1vh!important;font-size:22px!important}#login p.subtitle{margin-top:4px!important;font-size:12.5px!important}#login .field-wrap{height:48px!important;min-height:48px!important;margin-top:1.2vh!important}#login .field-wrap + .field-wrap{margin-top:7px!important}#login .primary{height:47px!important;min-height:47px!important;line-height:47px!important;margin-top:1.2vh!important}#login .divider{margin-top:1.1vh!important}#login .secure{margin-top:1vh!important}#login .auth-link{margin-top:.8vh!important}}
  `;
  document.head.appendChild(style);
  const logo=document.querySelector('#login img.logo');
  if(logo) logo.src='/assets/amitouch_logo_vector.png?v=20260815-vector-final';
  const loginName=document.getElementById('loginName');
  const loginPhone=document.getElementById('loginPhone');
  if(loginName) loginName.placeholder='שם מלא';
  if(loginPhone) loginPhone.placeholder='מספר טלפון';
  const secure=document.querySelector('#login .secure');
  if(secure) secure.textContent='הפרטים שלך נשמרים בצורה מאובטחת';
})();