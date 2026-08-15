(function(){
  if(window.__AMIT_REGISTER_NOTICE__)return;
  window.__AMIT_REGISTER_NOTICE__=true;
  const style=document.createElement('style');
  style.id='amit-register-notice-style';
  style.textContent=`
    #amitRegisterNotice{position:fixed!important;inset:0!important;z-index:130!important;display:none!important;place-items:center!important;padding:24px!important;background:rgba(38,70,66,.12)!important;backdrop-filter:blur(12px)!important;-webkit-backdrop-filter:blur(12px)!important}
    #amitRegisterNotice.show{display:grid!important;animation:amitRegisterFade .22s ease both!important}
    #amitRegisterNotice .notice-glass{width:min(340px,calc(100vw - 48px))!important;padding:24px 22px 20px!important;border-radius:28px!important;text-align:center!important;direction:rtl!important;background:linear-gradient(145deg,rgba(255,255,255,.72),rgba(255,248,244,.40))!important;border:1px solid rgba(255,255,255,.82)!important;box-shadow:0 18px 55px rgba(47,113,107,.16),inset 0 1px 0 rgba(255,255,255,.95),inset 0 -1px 0 rgba(255,255,255,.22)!important;backdrop-filter:blur(30px) saturate(155%)!important;-webkit-backdrop-filter:blur(30px) saturate(155%)!important;animation:amitRegisterPop .28s cubic-bezier(.2,.8,.2,1) both!important}
    #amitRegisterNotice .notice-heart{width:34px!important;height:34px!important;margin:0 auto 10px!important;background:url('/assets/amit-touch-heart.svg?v=20260815-heart') center/contain no-repeat!important}
    #amitRegisterNotice h3{margin:0!important;font-size:21px!important;line-height:1.2!important;font-weight:300!important;color:#2f716b!important}
    #amitRegisterNotice p{margin:9px 0 18px!important;font-size:14px!important;line-height:1.55!important;font-weight:300!important;color:#527873!important}
    #amitRegisterNotice button{width:100%!important;height:46px!important;border:0!important;border-radius:15px!important;background:linear-gradient(90deg,#2c655f,#397970)!important;color:white!important;font-size:15px!important;font-weight:300!important;box-shadow:0 8px 20px rgba(47,113,107,.16)!important}
    @keyframes amitRegisterFade{from{opacity:0}to{opacity:1}}
    @keyframes amitRegisterPop{from{opacity:0;transform:translateY(10px) scale(.96)}to{opacity:1;transform:translateY(0) scale(1)}}
  `;
  document.head.appendChild(style);
  let notice=document.getElementById('amitRegisterNotice');
  if(!notice){
    notice=document.createElement('div');
    notice.id='amitRegisterNotice';
    notice.innerHTML='<div class="notice-glass" role="dialog" aria-modal="true" aria-labelledby="amitRegisterNoticeTitle"><div class="notice-heart" aria-hidden="true"></div><h3 id="amitRegisterNoticeTitle">כמעט שם</h3><p>כדי להירשם, מלאי את כל הפרטים ובחרי תאריך לידה.</p><button type="button">הבנתי</button></div>';
    document.body.appendChild(notice);
    notice.querySelector('button').addEventListener('click',()=>notice.classList.remove('show'));
    notice.addEventListener('click',e=>{if(e.target===notice)notice.classList.remove('show');});
  }
  document.addEventListener('click',function(e){
    const btn=e.target.closest('#register .primary');
    if(!btn)return;
    const first=(document.getElementById('regFirst')?.value||'').trim();
    const last=(document.getElementById('regLast')?.value||'').trim();
    const phone=(document.getElementById('regPhone')?.value||'').replace(/\D/g,'');
    const dob=document.getElementById('regDob')?.value||'';
    if(first&&last&&phone.length>=9&&dob)return;
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();
    notice.classList.add('show');
  },true);
})();