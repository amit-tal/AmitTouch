import fs from 'fs';

const originalReadFileSync = fs.readFileSync.bind(fs);

fs.readFileSync = function patchedReadFileSync(path, ...args) {
  const result = originalReadFileSync(path, ...args);
  const pathText = String(path || '');
  if (!pathText.endsWith('index.html')) return result;

  const isBuffer = Buffer.isBuffer(result);
  let html = isBuffer ? result.toString('utf8') : String(result);
  const finalLogo = '/assets/amitouch_logo_vector.png?v=20260815-vector-final';

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

  const forceLogoScript = `<script>(function(){const u='${finalLogo}';function fix(){document.querySelectorAll('img.logo,img.splash-logo,img.splash-brand-logo').forEach(function(i){if(i.getAttribute('src')!==u)i.setAttribute('src',u);});}document.addEventListener('DOMContentLoaded',function(){fix();new MutationObserver(fix).observe(document.documentElement,{subtree:true,attributes:true,attributeFilter:['src'],childList:true});});})();</script>`;
  const lateLoginPolish = `<script>(function(){function loadLoginPolish(){if(document.querySelector('script[data-login-polish]'))return;const s=document.createElement('script');s.src='/login-polish.js?v=20260815-6';s.dataset.loginPolish='1';document.body.appendChild(s);}if(document.readyState==='complete')setTimeout(loadLoginPolish,0);else window.addEventListener('load',()=>setTimeout(loadLoginPolish,0),{once:true});})();</script>`;
  const lateRegisterPolish = `<script>(function(){function loadRegisterPolish(){if(document.querySelector('script[data-register-polish]'))return;const s=document.createElement('script');s.src='/register-polish.js?v=20260815-2';s.dataset.registerPolish='1';document.body.appendChild(s);}if(document.readyState==='complete')setTimeout(loadRegisterPolish,5);else window.addEventListener('load',()=>setTimeout(loadRegisterPolish,5),{once:true});})();</script>`;
  const lateAdminLogin = `<script>(function(){function loadAdminLogin(){if(document.querySelector('script[data-admin-login]'))return;const s=document.createElement('script');s.src='/admin-login.js?v=20260815-2';s.dataset.adminLogin='1';document.body.appendChild(s);}if(document.readyState==='complete')setTimeout(loadAdminLogin,25);else window.addEventListener('load',()=>setTimeout(loadAdminLogin,25),{once:true});})();</script>`;
  html = html.replace('</body>', forceLogoScript + lateLoginPolish + lateRegisterPolish + lateAdminLogin + '</body>');

  return isBuffer ? Buffer.from(html, 'utf8') : html;
};
