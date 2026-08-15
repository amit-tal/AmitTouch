(function(){
  document.getElementById('amit-touch-register-polish')?.remove();
  const style=document.createElement('style');
  style.id='amit-touch-register-polish';
  style.textContent=`
    html:has(#register.active),body:has(#register.active){height:100%!important;overflow:hidden!important;background:#fbf6f1!important;overscroll-behavior:none!important}
    #register.active{position:fixed!important;inset:0!important;display:block!important;width:100%!important;height:100dvh!important;overflow:hidden!important;background:#fbf6f1!important;z-index:25!important}
    #register .auth{position:relative!important;width:100%!important;height:100dvh!important;max-width:430px!important;margin:0 auto!important;padding:0 28px calc(env(safe-area-inset-bottom) + 10px)!important;overflow:hidden!important;text-align:center!important;display:flex!important;flex-direction:column!important;align-items:center!important;background:url('/assets/ChatGPT%20Image%20Aug%2015,%202026,%2008_24_27%20PM.png?v=20260815-register-bg') center bottom/cover no-repeat!important}
    #register .auth>*{flex:0 0 auto!important;position:relative!important;z-index:1!important}
    #register .spark{display:none!important}
    #register .round{position:absolute!important;left:18px!important;top:max(18px,env(safe-area-inset-top))!important;width:36px!important;height:36px!important;border:0!important;background:transparent!important;box-shadow:none!important;backdrop-filter:none!important;font-size:30px!important;font-weight:200!important;color:#2f716b!important;z-index:4!important}
    #register .logo{display:block!important;width:min(210px,56vw)!important;max-width:none!important;height:auto!important;max-height:19vh!important;object-fit:contain!important;margin:3.8vh auto 0!important;background:transparent!important}
    #register h1{display:flex!important;width:100%!important;align-items:center!important;justify-content:center!important;gap:7px!important;text-align:center!important;margin:1.2vh 0 0!important;font-size:25px!important;line-height:1.1!important;font-weight:200!important;color:#34736d!important;letter-spacing:0!important}
    #register h1 .heart{display:inline-flex!important;width:24px!important;height:24px!important;font-size:0!important;margin:0!important;background:url('/assets/amit-touch-heart.svg?v=20260815-heart') center/contain no-repeat!important}
    #register p.subtitle{width:100%!important;text-align:center!important;margin:6px 0 0!important;font-size:13.5px!important;line-height:1.25!important;font-weight:200!important;color:#4b7e79!important}
    #register .field-wrap{width:100%!important;height:54px!important;min-height:54px!important;margin:1.55vh 0 0!important;padding:0 17px!important;border-radius:15px!important;border:1px solid rgba(53,91,87,.15)!important;background:rgba(255,255,255,.16)!important;box-shadow:0 5px 16px rgba(72,55,44,.025)!important;backdrop-filter:none!important;-webkit-backdrop-filter:none!important;display:flex!important;align-items:center!important;flex-direction:row!important;gap:13px!important}
    #register .field-wrap + .field-wrap{margin-top:8px!important}
    #register .field-icon{display:block!important;width:28px!important;min-width:28px!important;height:28px!important;font-size:0!important;background-position:center!important;background-repeat:no-repeat!important;background-size:contain!important;color:transparent!important}
    #register .field-wrap:nth-of-type(1) .field-icon,#register .field-wrap:nth-of-type(2) .field-icon{background-image:url('/assets/%D7%90%D7%99%D7%A9.png?v=20260815-person')!important}
    #register .field-wrap:nth-of-type(3) .field-icon{background-image:url('/assets/ChatGPT%20Image%20Aug%2014,%202026,%2003_25_24%20PM.png?v=20260815-phone')!important}
    #register .field-wrap:nth-of-type(4) .field-icon{background-image:url('/assets/register-calendar.png?v=20260815-calendar')!important}
    #register .field{height:100%!important;width:100%!important;padding:0!important;border:0!important;background:transparent!important;outline:0!important;text-align:right!important;direction:rtl!important;font-size:15px!important;line-height:1!important;font-weight:300!important;color:#285f5a!important}
    #register .field::placeholder{color:#a9adac!important;opacity:1!important;font-weight:300!important}
    #register .primary{width:100%!important;height:54px!important;min-height:54px!important;margin:1.8vh 0 0!important;padding:0!important;border:0!important;border-radius:14px!important;background:linear-gradient(90deg,#2c655f 0%,#346d67 100%)!important;color:#fff!important;font-size:18px!important;line-height:54px!important;font-weight:300!important;box-shadow:0 7px 15px rgba(36,91,85,.15)!important}
    #register .divider{width:75%!important;margin:1.5vh auto 0!important;display:flex!important;align-items:center!important;gap:15px!important;color:#d99486!important;font-size:12px!important;font-weight:300!important}
    #register .divider:before,#register .divider:after{content:''!important;height:1px!important;flex:1!important;background:rgba(47,92,88,.17)!important}
    #register .secure{position:relative!important;margin:1.2vh 0 0!important;padding-right:23px!important;font-size:11.5px!important;line-height:1.2!important;font-weight:300!important;color:#3c756f!important}
    #register .secure:before{content:''!important;position:absolute!important;right:0!important;top:50%!important;transform:translateY(-50%)!important;width:16px!important;height:16px!important;background:url('/assets/%D7%9E%D7%A0%D7%A2%D7%95%D7%9C.png?v=20260815-lock') center/contain no-repeat!important}
    #register .auth-link{margin:1vh 0 0!important;font-size:11.5px!important;line-height:1.2!important;font-weight:300!important;color:#365f5b!important}
    #register .auth-link button{border:0!important;background:none!important;padding:0 4px!important;color:#2f716b!important;font-size:11.5px!important;font-weight:400!important;text-decoration:underline!important;text-underline-offset:4px!important}
    @media(max-height:780px){#register .logo{width:min(185px,51vw)!important;margin-top:2.5vh!important;max-height:16vh!important}#register h1{font-size:22px!important;margin-top:.7vh!important}#register p.subtitle{font-size:12px!important;margin-top:4px!important}#register .field-wrap{height:48px!important;min-height:48px!important;margin-top:1vh!important}#register .field-wrap + .field-wrap{margin-top:6px!important}#register .primary{height:48px!important;min-height:48px!important;line-height:48px!important;margin-top:1vh!important}#register .divider{margin-top:.9vh!important}#register .secure{margin-top:.8vh!important;font-size:10.5px!important}#register .auth-link{margin-top:.7vh!important;font-size:10.5px!important}}
  `;
  document.head.appendChild(style);
  const register=document.getElementById('register'); if(!register)return;
  register.querySelectorAll('.spark').forEach(el=>el.remove());
  const logo=register.querySelector('img.logo'); if(logo)logo.src='/assets/amitouch_logo_vector.png?v=20260815-vector-final';
  const heart=register.querySelector('h1 .heart'); if(heart)heart.textContent='';
  const fields=[...register.querySelectorAll('.field-wrap')];
  fields.forEach((wrap,i)=>{const icon=wrap.querySelector('.field-icon');if(!icon)return;icon.textContent='';if(i===0||i===1)icon.style.backgroundImage="url('/assets/%D7%90%D7%99%D7%A9.png?v=20260815-person')";if(i===2)icon.style.backgroundImage="url('/assets/ChatGPT%20Image%20Aug%2014,%202026,%2003_25_24%20PM.png?v=20260815-phone')";if(i===3)icon.style.backgroundImage="url('/assets/register-calendar.png?v=20260815-calendar')";});
})();