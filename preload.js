import fs from 'fs';

const originalReadFileSync = fs.readFileSync.bind(fs);

fs.readFileSync = function patchedReadFileSync(path, ...args) {
  const result = originalReadFileSync(path, ...args);
  const pathText = String(path || '');
  if (!pathText.endsWith('index.html')) return result;

  const isBuffer = Buffer.isBuffer(result);
  let html = isBuffer ? result.toString('utf8') : String(result);
  const build = '20260815-2212';
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

  html = html.replace(
    "setTimeout(()=>document.getElementById('splash').classList.add('hide'),1600);",
    "/* splash timing is controlled exclusively by brand-assets.js */"
  );

  const runtime = `<script>(function(){const build='${build}',logo='${finalLogo}';function fixLogos(){document.querySelectorAll('img.logo,img.splash-logo,img.splash-brand-logo').forEach(i=>{if(i.getAttribute('src')!==logo)i.setAttribute('src',logo);});}function load(src,key){if(document.querySelector('script[data-amit="'+key+'"]'))return;const s=document.createElement('script');s.src=src+'?v='+build;s.dataset.amit=key;document.body.appendChild(s);}document.addEventListener('DOMContentLoaded',fixLogos,{once:true});window.addEventListener('load',()=>{fixLogos();load('/login-polish.js','login');load('/register-polish.js','register');load('/register-notice.js','register-notice');setTimeout(()=>load('/date-picker-polish.js','date-picker'),15);load('/admin-login.js','admin');load('/home-polish.js','home');if('serviceWorker'in navigator){navigator.serviceWorker.ready.then(r=>r.active&&r.active.postMessage('CLEAR_AMIT_TOUCH_CACHES')).catch(()=>{});}}, {once:true});})();</script>`;
  html = html.replace('</body>', runtime + '</body>');

  return isBuffer ? Buffer.from(html, 'utf8') : html;
};
