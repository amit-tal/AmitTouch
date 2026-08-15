(function(){
  if(window.__AMIT_GLOBAL_NOTICE__)return;
  window.__AMIT_GLOBAL_NOTICE__=true;

  const style=document.createElement('style');
  style.id='amit-global-notice-style';
  style.textContent=`
    #amitGlobalNotice{position:fixed!important;inset:0!important;z-index:250!important;display:none!important;place-items:center!important;padding:24px!important;background:rgba(38,70,66,.12)!important;backdrop-filter:blur(12px)!important;-webkit-backdrop-filter:blur(12px)!important}
    #amitGlobalNotice.show{display:grid!important;animation:amitGlobalFade .22s ease both!important}
    #amitGlobalNotice .notice-glass{width:min(340px,calc(100vw - 48px))!important;padding:24px 22px 20px!important;border-radius:28px!important;text-align:center!important;direction:rtl!important;background:linear-gradient(145deg,rgba(255,255,255,.74),rgba(255,248,244,.42))!important;border:1px solid rgba(255,255,255,.84)!important;box-shadow:0 18px 55px rgba(47,113,107,.16),inset 0 1px 0 rgba(255,255,255,.96),inset 0 -1px 0 rgba(255,255,255,.22)!important;backdrop-filter:blur(30px) saturate(155%)!important;-webkit-backdrop-filter:blur(30px) saturate(155%)!important;animation:amitGlobalPop .28s cubic-bezier(.2,.8,.2,1) both!important}
    #amitGlobalNotice .notice-heart{width:34px!important;height:34px!important;margin:0 auto 10px!important;background:url('/assets/amit-touch-heart.svg?v=20260815-global-notice') center/contain no-repeat!important}
    #amitGlobalNotice h3{margin:0!important;font-size:21px!important;line-height:1.2!important;font-weight:300!important;color:#2f716b!important}
    #amitGlobalNotice p{margin:9px 0 18px!important;font-size:14px!important;line-height:1.55!important;font-weight:300!important;color:#527873!important;white-space:pre-line!important}
    #amitGlobalNotice button{width:100%!important;height:46px!important;border:0!important;border-radius:15px!important;background:linear-gradient(90deg,#2c655f,#397970)!important;color:white!important;font-size:15px!important;font-weight:300!important;box-shadow:0 8px 20px rgba(47,113,107,.16)!important}
    @keyframes amitGlobalFade{from{opacity:0}to{opacity:1}}
    @keyframes amitGlobalPop{from{opacity:0;transform:translateY(10px) scale(.96)}to{opacity:1;transform:translateY(0) scale(1)}}
  `;
  document.head.appendChild(style);

  let notice=document.getElementById('amitGlobalNotice');
  if(!notice){
    notice=document.createElement('div');
    notice.id='amitGlobalNotice';
    notice.innerHTML='<div class="notice-glass" role="dialog" aria-modal="true"><div class="notice-heart" aria-hidden="true"></div><h3>כמעט שם</h3><p></p><button type="button">הבנתי</button></div>';
    document.body.appendChild(notice);
  }
  const title=notice.querySelector('h3');
  const text=notice.querySelector('p');
  const button=notice.querySelector('button');
  function close(){notice.classList.remove('show');}
  button.addEventListener('click',close);
  notice.addEventListener('click',e=>{if(e.target===notice)close();});

  window.amitNotice=function(message,heading='כמעט שם'){
    title.textContent=heading||'כמעט שם';
    text.textContent=String(message||'');
    notice.classList.add('show');
    setTimeout(()=>button.focus(),30);
  };

  window.alert=function(message){window.amitNotice(message,'כמעט שם');};
})();