(function(){
  const STYLE_ID='amit-pwa-install-prompt-style';
  document.getElementById(STYLE_ID)?.remove();
  const style=document.createElement('style');
  style.id=STYLE_ID;
  style.textContent=`
    .amit-install-overlay{position:fixed!important;inset:0!important;z-index:2147483000!important;background:rgba(31,58,55,.22)!important;backdrop-filter:blur(8px)!important;display:flex!important;align-items:center!important;justify-content:center!important;padding:22px!important;box-sizing:border-box!important;direction:rtl!important}
    .amit-install-card{width:min(360px,100%)!important;border-radius:24px!important;background:rgba(255,250,247,.97)!important;border:1px solid rgba(255,255,255,.92)!important;box-shadow:0 18px 50px rgba(31,93,87,.18)!important;padding:26px 22px 20px!important;text-align:center!important;color:#315c57!important}
    .amit-install-card img{width:76px!important;height:76px!important;object-fit:contain!important;margin:0 auto 12px!important;display:block!important;background:transparent!important}
    .amit-install-card h2{margin:0 0 10px!important;font-size:22px!important;font-weight:600!important;color:#173f3b!important}
    .amit-install-card p{margin:0 0 18px!important;font-size:16px!important;line-height:1.55!important;color:#56706c!important}
    .amit-install-actions{display:grid!important;gap:10px!important}
    .amit-install-primary,.amit-install-secondary{width:100%!important;min-height:50px!important;border-radius:12px!important;font-size:16px!important;font-weight:500!important}
    .amit-install-primary{border:0!important;background:linear-gradient(90deg,#397a73,#28665f)!important;color:#fff!important}
    .amit-install-secondary{border:1px solid rgba(47,113,107,.18)!important;background:rgba(255,255,255,.5)!important;color:#315c57!important}
    .amit-install-guide{margin-top:14px!important;padding:14px!important;border-radius:14px!important;background:rgba(57,122,115,.08)!important;color:#315c57!important;font-size:16px!important;line-height:1.55!important;text-align:right!important}
  `;
  document.head.appendChild(style);

  function isStandalone(){return Boolean(window.matchMedia&&window.matchMedia('(display-mode: standalone)').matches)||window.navigator.standalone===true;}
  function isIOS(){return /iphone|ipad|ipod/i.test(navigator.userAgent||'');}
  function isGoogleInApp(){const ua=navigator.userAgent||'';return /GSA|GoogleApp|CriOS/i.test(ua)&&isIOS();}
  function homeIsActive(){const home=document.getElementById('home');if(!home)return false;return home.classList.contains('active')||(getComputedStyle(home).display!=='none'&&getComputedStyle(home).visibility!=='hidden');}

  let deferredPrompt=null;
  let shownThisSession=false;
  let scheduled=false;

  window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();deferredPrompt=e;});
  window.addEventListener('appinstalled',()=>{document.querySelector('.amit-install-overlay')?.remove();deferredPrompt=null;shownThisSession=true;});

  function closePrompt(){document.querySelector('.amit-install-overlay')?.remove();shownThisSession=true;}

  function showGuide(card){
    card.querySelector('.amit-install-guide')?.remove();
    const guide=document.createElement('div');
    guide.className='amit-install-guide';
    if(isGoogleInApp()) guide.textContent='באייפון דרך Google: פתחי את הקישור ב Safari, לחצי על כפתור השיתוף ובחרי ״הוספה למסך הבית״.';
    else if(isIOS()) guide.textContent='לחצי על כפתור השיתוף ב Safari ובחרי ״הוספה למסך הבית״.';
    else guide.textContent='פתחי את תפריט הדפדפן ובחרי ״התקנת אפליקציה״ או ״הוספה למסך הבית״.';
    card.appendChild(guide);
  }

  async function installOrGuide(card){
    if(deferredPrompt){
      try{deferredPrompt.prompt();await deferredPrompt.userChoice;}catch(error){console.warn('Install prompt failed',error);}
      deferredPrompt=null;
      closePrompt();
      return;
    }
    showGuide(card);
  }

  function showPrompt(force){
    if(isStandalone()||shownThisSession||document.querySelector('.amit-install-overlay'))return;
    if(!force&&!homeIsActive())return;
    const overlay=document.createElement('div');
    overlay.className='amit-install-overlay';
    overlay.innerHTML=`<div class="amit-install-card"><img src="/assets/amitouch_logo_vector.png" alt="AMIT TOUCH"><h2>שמרי את AMIT TOUCH כאפליקציה</h2><p>נכנסת דרך הדפדפן. אפשר לשמור את AMIT TOUCH במסך הבית ולפתוח אותה בפעם הבאה כמו אפליקציה.</p><div class="amit-install-actions"><button class="amit-install-primary" type="button">שמירה במסך הבית</button><button class="amit-install-secondary" type="button">לא עכשיו</button></div></div>`;
    document.body.appendChild(overlay);
    const card=overlay.querySelector('.amit-install-card');
    overlay.querySelector('.amit-install-primary').addEventListener('click',()=>installOrGuide(card));
    overlay.querySelector('.amit-install-secondary').addEventListener('click',closePrompt);
  }

  function schedulePrompt(force){
    if(isStandalone()||shownThisSession||scheduled)return;
    scheduled=true;
    setTimeout(()=>{scheduled=false;showPrompt(force);},650);
  }

  function maybeShow(){
    if(isStandalone()||shownThisSession)return;
    if(homeIsActive())schedulePrompt(false);
  }

  function start(){
    const observer=new MutationObserver(maybeShow);
    observer.observe(document.body,{subtree:true,attributes:true,attributeFilter:['class','style'],childList:true});
    maybeShow();
    if(isGoogleInApp()) setTimeout(()=>showPrompt(true),1400);
    setTimeout(maybeShow,2200);
  }

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
})();