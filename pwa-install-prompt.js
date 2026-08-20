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
    .amit-install-actions{display:grid!important;gap:10px!important}.amit-install-primary,.amit-install-secondary{width:100%!important;min-height:50px!important;border-radius:12px!important;font-size:16px!important;font-weight:500!important}.amit-install-primary{border:0!important;background:linear-gradient(90deg,#397a73,#28665f)!important;color:#fff!important}.amit-install-secondary{border:1px solid rgba(47,113,107,.18)!important;background:rgba(255,255,255,.5)!important;color:#315c57!important}.amit-install-guide{margin-top:14px!important;padding:14px!important;border-radius:14px!important;background:rgba(57,122,115,.08)!important;color:#315c57!important;font-size:16px!important;line-height:1.55!important;text-align:right!important}
  `;
  document.head.appendChild(style);
  const standalone=()=>Boolean(window.matchMedia&&window.matchMedia('(display-mode: standalone)').matches)||navigator.standalone===true;
  const ios=()=>/iphone|ipad|ipod/i.test(navigator.userAgent||'');
  let deferredPrompt=null,shown=false;
  window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();deferredPrompt=e;});
  window.addEventListener('appinstalled',()=>{document.querySelector('.amit-install-overlay')?.remove();shown=true;deferredPrompt=null;});
  function close(){document.querySelector('.amit-install-overlay')?.remove();shown=true;}
  function guide(card){card.querySelector('.amit-install-guide')?.remove();const g=document.createElement('div');g.className='amit-install-guide';g.textContent=ios()?'פתחי את הקישור ב Safari, לחצי על כפתור השיתוף ובחרי ״הוספה למסך הבית״.':'פתחי את תפריט הדפדפן ובחרי ״התקנת אפליקציה״ או ״הוספה למסך הבית״.';card.appendChild(g);}
  async function install(card){if(deferredPrompt){try{deferredPrompt.prompt();await deferredPrompt.userChoice;}catch(_){}deferredPrompt=null;close();return;}guide(card);}
  function canShowOnHome(){const home=document.getElementById('home');if(!home?.classList.contains('active'))return false;let u=null;try{u=window.user||user||null}catch(_){u=window.user||null}return Boolean(u&&((u.id)||u.admin));}
  function show(){if(standalone()||shown||document.querySelector('.amit-install-overlay')||!canShowOnHome())return;const overlay=document.createElement('div');overlay.className='amit-install-overlay';overlay.innerHTML=`<div class="amit-install-card"><img src="/assets/amitouch_logo_vector.png" alt="AMIT TOUCH"><h2>שמרי את AMIT TOUCH כאפליקציה</h2><p>נכנסת דרך האינטרנט. אפשר לשמור את AMIT TOUCH במסך הבית ולפתוח אותה בפעם הבאה ישירות כאפליקציה.</p><div class="amit-install-actions"><button class="amit-install-primary" type="button">שמירה במסך הבית</button><button class="amit-install-secondary" type="button">לא עכשיו</button></div></div>`;document.body.appendChild(overlay);const card=overlay.querySelector('.amit-install-card');overlay.querySelector('.amit-install-primary').onclick=()=>install(card);overlay.querySelector('.amit-install-secondary').onclick=close;}
  function check(){if(standalone()||shown)return;if(canShowOnHome())setTimeout(show,250);}
  const observer=new MutationObserver(check);observer.observe(document.body,{subtree:true,attributes:true,attributeFilter:['class']});
  window.addEventListener('amit:session-restored',check);
  window.addEventListener('amit:entered-home',check);
  check();
})();