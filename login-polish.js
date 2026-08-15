(function(){
  document.getElementById('amit-touch-login-polish')?.remove();
  const style=document.createElement('style');
  style.id='amit-touch-login-polish';
  style.textContent=`
    html:has(#login.active),body:has(#login.active){height:100%!important;overflow:hidden!important;background:#fbf6f1!important}
    #login.active{position:fixed!important;inset:0!important;display:block!important;overflow:hidden!important;background:#fbf6f1!important;z-index:25!important}
    #login .auth{position:relative!important;width:100%!important;height:100dvh!important;max-width:430px!important;margin:0 auto!important;padding:0 29px!important;overflow:hidden!important;text-align:center!important;display:flex!important;flex-direction:column!important;align-items:center!important;background:transparent!important}
    #login .auth>*{flex:0 0 auto!important}
    #login .round{display:none!important}
    #login .spark{position:absolute!important;right:47px!important;top:10.1vh!important;color:#d99486!important;font-size:28px!important;line-height:1!important;font-weight:300!important}
    #login .logo{display:block!important;width:min(292px,76vw)!important;max-width:none!important;height:auto!important;max-height:30vh!important;object-fit:contain!important;margin:8.5vh auto 0!important;background:transparent!important}
    #login h1{margin:3.8vh 0 0!important;font-size:29px!important;line-height:1.1!important;font-weight:300!important;color:#34736d!important;letter-spacing:0!important}
    #login h1 .heart{display:inline-block!important;margin-right:4px!important;color:#d99486!important;font-size:31px!important;font-weight:300!important;vertical-align:-2px!important}
    #login p.subtitle{margin:12px 0 0!important;font-size:16px!important;line-height:1.25!important;font-weight:300!important;color:#4b7e79!important}
    #login .field-wrap{width:100%!important;height:63px!important;min-height:63px!important;margin:4.1vh 0 0!important;padding:0 19px!important;border-radius:16px!important;border:1px solid rgba(53,91,87,.15)!important;background:rgba(255,255,255,.17)!important;box-shadow:0 5px 16px rgba(72,55,44,.025)!important;backdrop-filter:none!important;-webkit-backdrop-filter:none!important;display:flex!important;align-items:center!important;flex-direction:row!important;gap:13px!important}
    #login .field-wrap + .field-wrap{margin-top:14px!important}
    #login .field-icon{width:31px!important;min-width:31px!important;text-align:center!important;font-size:28px!important;line-height:1!important;color:#34736d!important;font-weight:300!important}
    #login .field{height:100%!important;width:100%!important;padding:0!important;border:0!important;background:transparent!important;outline:0!important;text-align:right!important;direction:rtl!important;font-size:17px!important;line-height:1!important;font-weight:300!important;color:#285f5a!important}
    #login .field::placeholder{color:#a9adac!important;opacity:1!important;font-weight:300!important}
    #login .primary{width:100%!important;height:61px!important;min-height:61px!important;margin:4.1vh 0 0!important;padding:0!important;border:0!important;border-radius:14px!important;background:linear-gradient(90deg,#2c655f 0%,#346d67 100%)!important;color:#fff!important;font-size:20px!important;line-height:61px!important;font-weight:300!important;box-shadow:0 7px 15px rgba(36,91,85,.15)!important}
    #login .divider{width:75%!important;margin:4.1vh auto 0!important;display:flex!important;align-items:center!important;gap:15px!important;color:#d99486!important;font-size:14px!important;font-weight:300!important}
    #login .divider:before,#login .divider:after{content:''!important;height:1px!important;flex:1!important;background:rgba(47,92,88,.17)!important}
    #login .secure{margin:3.3vh 0 0!important;font-size:13.5px!important;line-height:1.2!important;font-weight:300!important;color:#3c756f!important}
    #login .auth-link{margin:2.2vh 0 0!important;font-size:13.5px!important;line-height:1.2!important;font-weight:300!important;color:#365f5b!important}
    #login .auth-link button{border:0!important;background:none!important;padding:0 4px!important;color:#2f716b!important;font-size:13.5px!important;font-weight:400!important;text-decoration:underline!important;text-underline-offset:5px!important}
    @media(max-height:780px){
      #login .logo{width:min(250px,68vw)!important;margin-top:5.5vh!important;max-height:25vh!important}
      #login h1{margin-top:2.5vh!important;font-size:26px!important}
      #login p.subtitle{font-size:14px!important;margin-top:7px!important}
      #login .field-wrap{height:56px!important;min-height:56px!important;margin-top:2.5vh!important}
      #login .field-wrap + .field-wrap{margin-top:10px!important}
      #login .primary{height:55px!important;min-height:55px!important;line-height:55px!important;margin-top:2.5vh!important}
      #login .divider{margin-top:2.4vh!important}
      #login .secure{margin-top:2vh!important;font-size:12px!important}
      #login .auth-link{margin-top:1.5vh!important;font-size:12px!important}
    }
  `;
  document.head.appendChild(style);

  const logo=document.querySelector('#login img.logo');
  if(logo) logo.src='/assets/amitouch_logo_vector.png?v=20260815-vector-final';
})();