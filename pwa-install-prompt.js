(function(){
  const id='amit-pwa-install-prompt-style';
  document.getElementById(id)?.remove();
  const style=document.createElement('style');
  style.id=id;
  style.textContent=`
    .amit-install-overlay{position:fixed!important;inset:0!important;z-index:2147483000!important;background:rgba(31,58,55,.22)!important;backdrop-filter:blur(8px)!important;display:flex!important;align-items:center!important;justify-content:center!important;padding:22px!important;box-sizing:border-box!important;direction:rtl!important}
    .amit-install-card{width:min(360px,100%)!important;border-radius:24px!important;background:rgba(255,250,247,.96)!important;border:1px solid rgba(255,255,255,.9)!important;box-shadow:0 18px 50px rgba(31,93,87,.18)!important;padding:26px 22px 20px!important;text-align:center!important;color:#315c57!important}
    .amit-install-card img{width:72px!important;height:72px!important;object-fit:contain!important;margin:0 auto 12px!important;display:block!important}
    .amit-install-card h2{margin:0 0 10px!important;font-size:22px!important;font-weight:600!important;color:#173f3b!important}
    .amit-install-card p{margin:0 0 18px!important;font-size:16px!important;line-height:1.55!important;color:#56706c!important}
    .amit-install-actions{display:grid!important;gap:10px!important}
    .amit-install-primary,.amit-install-secondary{width:100%!important;min-height:50px!important;border-radius:12px!important;font-size:16px!important;font-weight:500!important}
    .amit-install-primary{border:0!important;background:linear-gradient(90deg,#397a73,#28665f)!important;color:#fff!important}
    .amit-install-secondary{border:1px solid rgba(47,113,107,.18)!important;background:rgba(255,255,255,.5)!important;color:#315c57!important}
  `;
  document.head.appendChild(style);

  function isStandalone(){
    return window.matchMedia?.('(display-mode: standalone)').matches || window.navigator.standalone === true;
  }

  function isIOS(){return /iphone|ipad|ipod/i.test(navigator.userAgent||'');}

  let deferredPrompt=null;
  window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();deferredPrompt=e;});

  function closePrompt(){document.querySelector('.amit-install-overlay')?.remove();}

  function showPrompt(){
    if(isStandalone()||document.querySelector('.amit-install-overlay'))return;
    const overlay=document.createElement('div');
    overlay.className='amit-install-overlay';
    const ios=isIOS();
    overlay.innerHTML=`<div class="amit-install-card"><img src="/assets/amitouch_logo_vector.png" alt="AMIT TOUCH"><h2>שמרי את AMIT TOUCH במסך הבית</h2><p>${ios?'פתחי את תפריט השיתוף בדפדפן ובחרי ״הוספה למסך הבית״ כדי לפתוח את הממשק כמו אפליקציה.':'אפשר לשמור את AMIT TOUCH במסך הבית ולפתוח אותה בפעם הבאה כמו אפליקציה.'}</p><div class="amit-install-actions">${ios?'':`<button class="amit-install-primary" type="button">הוספה למסך הבית</button>`}<button class="amit-install-secondary" type="button">לא עכשיו</button></div></div>`;
    document.body.appendChild(overlay);
    overlay.querySelector('.amit-install-secondary').onclick=closePrompt;
    const primary=overlay.querySelector('.amit-install-primary');
    if(primary)primary.onclick=async()=>{
      if(deferredPrompt){
        deferredPrompt.prompt();
        try{await deferredPrompt.userChoice;}catch(_){ }
        deferredPrompt=null;
        closePrompt();
      }else{
        primary.textContent='פתחי את תפריט הדפדפן ובחרי הוספה למסך הבית';
      }
    };
  }

  function maybeShow(){
    if(isStandalone())return;
    setTimeout(showPrompt,900);
  }

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',maybeShow,{once:true});else maybeShow();
})();