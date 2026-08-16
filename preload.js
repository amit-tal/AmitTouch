import fs from 'fs';

const originalReadFileSync = fs.readFileSync.bind(fs);

fs.readFileSync = function patchedReadFileSync(path, ...args) {
  const result = originalReadFileSync(path, ...args);
  const pathText = String(path || '');
  if (!pathText.endsWith('index.html')) return result;

  const isBuffer = Buffer.isBuffer(result);
  let html = isBuffer ? result.toString('utf8') : String(result);
  const build = '20260816-1015-home-hero-force-v6';
  const finalLogo = `/assets/amitouch_logo_vector.png?v=${build}`;

  html = html
    .replaceAll('/assets/amit-touch-logo.svg', finalLogo)
    .replaceAll('/assets/amit-touch-logo.webp?v=20260815-final-logo', finalLogo)
    .replaceAll('/assets/amit-touch-logo.webp?v=20260815-final', finalLogo)
    .replaceAll('/assets/amit-touch-logo.webp', finalLogo)
    .replaceAll('/assets/amit-touch-logo.png', finalLogo)
    .replaceAll('/assets/amit-touch-logo.jpg', finalLogo)
    .replaceAll('/assets/Amit%20Touch_Logo.png?v=20260815-uploaded', finalLogo)
    .replaceAll('/assets/Amit%20Touch_Logo.png?v=20260815-login-2', finalLogo)
    .replaceAll('/assets/Amit%20Touch_Logo.png?v=20260815-login', finalLogo)
    .replaceAll('/assets/Amit%20Touch_Logo.png', finalLogo);

  const criticalSplash = `<style id="splash-critical">#splash{opacity:0!important;visibility:hidden!important}#splash.brand-ready{opacity:1!important;visibility:visible!important}#splash.brand-done{opacity:0!important;visibility:hidden!important}</style>`;
  html = html.replace('</head>', criticalSplash + '</head>');
  html = html.replace("setTimeout(()=>document.getElementById('splash').classList.add('hide'),1600);","/* splash timing is controlled exclusively by brand-assets.js */");

  const runtime = `<script>(function(){
    const build='${build}',logo='${finalLogo}';
    function fixLogos(){document.querySelectorAll('img.logo,img.splash-logo,img.splash-brand-logo').forEach(i=>{if(i.getAttribute('src')!==logo)i.setAttribute('src',logo);});}
    function forceHero(){
      const home=document.getElementById('home'); if(!home)return;
      let st=document.getElementById('amit-home-hero-force');
      if(!st){st=document.createElement('style');st.id='amit-home-hero-force';document.head.appendChild(st);}
      st.textContent=`#home .hero-photo{height:306px!important;margin:-3px -15px 12px!important;border:0!important;border-radius:0!important;box-shadow:none!important;position:relative!important;overflow:hidden!important;background:#fff9f5 url('/assets/home-hero.png?v=${build}') right center/auto 100% no-repeat!important}#home .hero-photo:before{display:none!important;content:none!important}#home .hero-photo:after{content:''!important;position:absolute!important;inset:0!important;background:linear-gradient(90deg,#fff9f5 0%,rgba(255,249,245,.99) 14%,rgba(255,249,245,.86) 27%,rgba(255,249,245,.30) 46%,rgba(255,249,245,0) 61%)!important;pointer-events:none!important}#home .hero-copy{position:absolute!important;left:24px!important;right:auto!important;top:88px!important;bottom:auto!important;width:158px!important;text-align:right!important;direction:rtl!important;z-index:10!important}#home .hero-copy:before,#home .hero-copy:after,#home .spark,#home .star,#home .stars,#home .sparkle,#home .sparkles,#home [class*='spark'],#home [class*='star']{display:none!important;visibility:hidden!important;opacity:0!important;content:none!important}#home .hero-name{display:block!important;margin:0 0 5px!important;color:#07584f!important;font-family:Inter,sans-serif!important;font-size:21px!important;line-height:1.15!important;font-weight:500!important}#home .hero-welcome{display:block!important;margin:0 0 7px!important;color:#07584f!important;font-family:Inter,sans-serif!important;font-size:17px!important;line-height:1.2!important;font-weight:300!important}#home .hero-touch{display:block!important;margin:0!important;color:#e7a19b!important;font-family:var(--hand,'GveretLevin',cursive)!important;font-size:31px!important;line-height:1.05!important;font-weight:100!important;font-synthesis:none!important;white-space:nowrap!important}#home .home-heart{display:block!important;width:27px!important;height:27px!important;margin:18px auto 0!important;background:url('/assets/amit-touch-heart.svg?v=${build}') center/contain no-repeat!important}#home .primary{display:flex!important;align-items:center!important;justify-content:center!important;gap:18px!important;width:88%!important;height:66px!important;margin:-25px auto 26px!important;border:1px solid rgba(255,255,255,.9)!important;border-radius:34px!important;background:linear-gradient(90deg,rgba(245,205,195,.86),rgba(225,177,163,.84))!important;color:#fff!important;font-size:22px!important;font-weight:400!important;box-shadow:0 12px 25px rgba(179,112,94,.18),inset 0 0 18px rgba(255,255,255,.38)!important}`;
      function firstName(){try{if(typeof user!=='undefined'&&user)return user.firstName||String(user.name||'').trim().split(/\\s+/)[0]||''}catch(_){}return''}
      const copy=home.querySelector('.hero-copy');if(copy){const n=firstName();copy.innerHTML=`<span class="hero-name">${n||'שם פרטי'}</span><span class="hero-welcome">ברוכה הבאה</span><strong class="hero-touch">לטאץ׳ שלך</strong><span class="home-heart" aria-hidden="true"></span>`;}
      const primary=home.querySelector('.primary');if(primary)primary.innerHTML=`<img class="home-book-icon" src="/assets/home-nav-appointments.svg?v=${build}" alt=""><span>הזמיני תור</span>`;
    }
    function loadSequential(files){let i=0;function next(){if(i>=files.length){setTimeout(forceHero,0);setTimeout(forceHero,250);return;}const item=files[i++];document.querySelectorAll('script[data-amit="'+item[1]+'"]').forEach(x=>x.remove());const s=document.createElement('script');s.src=item[0]+'?v='+build;s.dataset.amit=item[1];s.async=false;s.onload=next;s.onerror=next;document.body.appendChild(s);}next();}
    async function clearOld(){try{if('caches'in window){const keys=await caches.keys();await Promise.all(keys.map(k=>caches.delete(k)));}if('serviceWorker'in navigator){const regs=await navigator.serviceWorker.getRegistrations();for(const r of regs){r.active&&r.active.postMessage('CLEAR_AMIT_TOUCH_CACHES');}}}catch(_){}}
    function boot(){fixLogos();loadSequential([['/global-notice.js','global-notice'],['/app-db.js','app-db'],['/login-polish.js','login'],['/login-runtime-fix.js','login-runtime-fix'],['/register-polish.js','register'],['/register-age-check.js','register-age'],['/register-notice.js','register-notice'],['/admin-login.js','admin'],['/home-polish.js','home'],['/login-home-guard.js','login-home-guard']]);clearOld();const u=new URL(location.href);if(u.searchParams.get('ui')!==build&&!sessionStorage.getItem('amit-ui-'+build)){sessionStorage.setItem('amit-ui-'+build,'1');u.searchParams.set('ui',build);setTimeout(()=>location.replace(u.toString()),120);}}
    if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
  })();</script>`;
  html = html.replace('</body>', runtime + '</body>');
  return isBuffer ? Buffer.from(html, 'utf8') : html;
};
