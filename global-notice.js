(function(){
  if(window.__AMIT_GLOBAL_NOTICE__)return;
  window.__AMIT_GLOBAL_NOTICE__=true;

  const style=document.createElement('style');
  style.id='amit-global-notice-style';
  style.textContent=`
    #amitGlobalNotice{position:fixed!important;inset:0!important;z-index:250!important;display:none!important;place-items:center!important;padding:22px!important;background:rgba(31,67,63,.10)!important;backdrop-filter:blur(10px)!important;-webkit-backdrop-filter:blur(10px)!important}
    #amitGlobalNotice.show{display:grid!important;animation:amitGlobalFade .2s ease both!important}
    #amitGlobalNotice .notice-glass{width:min(352px,calc(100vw - 44px))!important;padding:25px 22px 21px!important;border-radius:30px!important;text-align:center!important;direction:rtl!important;background:linear-gradient(145deg,rgba(255,255,255,.68),rgba(255,248,244,.38))!important;border:1px solid rgba(255,255,255,.9)!important;box-shadow:0 18px 48px rgba(47,113,107,.13),inset 0 1px 0 rgba(255,255,255,.98),inset 0 -1px 0 rgba(255,255,255,.25)!important;backdrop-filter:blur(30px) saturate(145%)!important;-webkit-backdrop-filter:blur(30px) saturate(145%)!important;animation:amitGlobalPop .25s cubic-bezier(.2,.8,.2,1) both!important}
    #amitGlobalNotice .notice-heart{width:30px!important;height:30px!important;margin:0 auto 12px!important;background:url('/assets/amit-touch-heart.svg?v=20260815-global-notice-2') center/contain no-repeat!important}
    #amitGlobalNotice h3{margin:0!important;font-size:20px!important;line-height:1.25!important;font-weight:300!important;color:#2f716b!important}
    #amitGlobalNotice p{margin:10px 0 19px!important;font-size:13px!important;line-height:1.55!important;font-weight:300!important;color:#527873!important;white-space:pre-line!important}
    #amitGlobalNotice button{width:100%!important;height:46px!important;border:1px solid rgba(255,255,255,.34)!important;border-radius:15px!important;background:linear-gradient(90deg,#2c655f,#397970)!important;color:white!important;font-size:15px!important;font-weight:300!important;box-shadow:0 8px 18px rgba(47,113,107,.14),inset 0 1px 0 rgba(255,255,255,.2)!important}
    @keyframes amitGlobalFade{from{opacity:0}to{opacity:1}}
    @keyframes amitGlobalPop{from{opacity:0;transform:translateY(8px) scale(.97)}to{opacity:1;transform:translateY(0) scale(1)}}
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