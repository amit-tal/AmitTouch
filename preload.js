import fs from 'fs';

const originalReadFileSync = fs.readFileSync.bind(fs);

fs.readFileSync = function patchedReadFileSync(path, ...args) {
  const result = originalReadFileSync(path, ...args);
  const pathText = String(path || '');
  if (!pathText.endsWith('index.html')) return result;

  const isBuffer = Buffer.isBuffer(result);
  let html = isBuffer ? result.toString('utf8') : String(result);
  const build = '20260820-0918-services-calendar-clean-v17';
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
  const runtime = `<script>(function(){const build='${build}',logo='${finalLogo}';function fixLogos(){document.querySelectorAll('img.logo,img.splash-logo,img.splash-brand-logo').forEach(i=>{if(i.getAttribute('src')!==logo)i.setAttribute('src',logo);});}function loadSequential(files){let i=0;function next(){if(i>=files.length)return;const item=files[i++];document.querySelectorAll('script[data-amit="'+item[1]+'"]').forEach(x=>x.remove());const s=document.createElement('script');s.src=item[0]+'?v='+build;s.dataset.amit=item[1];s.async=false;s.onload=next;s.onerror=next;document.body.appendChild(s);}next();}async function clearOld(){try{if('caches'in window){const keys=await caches.keys();await Promise.all(keys.map(k=>caches.delete(k)));}if('serviceWorker'in navigator){const regs=await navigator.serviceWorker.getRegistrations();for(const r of regs){r.active&&r.active.postMessage('CLEAR_AMIT_TOUCH_CACHES');}}}catch(_){}}function boot(){fixLogos();loadSequential([['/brand-assets.js','brand-assets'],['/splash-force-two-lines.js','splash-force-two-lines'],['/global-notice.js','global-notice'],['/app-db.js','app-db'],['/login-polish.js','login'],['/login-runtime-fix.js','login-runtime-fix'],['/register-polish.js','register'],['/register-age-check.js','register-age'],['/register-notice.js','register-notice'],['/admin-login.js','admin'],['/home-polish.js','home'],['/home-hero-reference.js','home-hero-reference'],['/home-services-slider.js','home-services-slider'],['/home-appointments-section.js','home-appointments-section'],['/nav-polish.js','bottom-nav'],['/login-home-guard.js','login-home-guard']]);clearOld();const u=new URL(location.href);if(u.searchParams.get('ui')!==build&&!sessionStorage.getItem('amit-ui-'+build)){sessionStorage.setItem('amit-ui-'+build,'1');u.searchParams.set('ui',build);setTimeout(()=>location.replace(u.toString()),120);}}if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();})();</script>`;
  html = html.replace('</body>', runtime + '</body>');
  return isBuffer ? Buffer.from(html, 'utf8') : html;
};