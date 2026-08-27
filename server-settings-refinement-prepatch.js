import fs from 'fs';
const previousReadFileSync=fs.readFileSync.bind(fs);
fs.readFileSync=function amitSettingsRefinementRead(path,...args){
  const result=previousReadFileSync(path,...args);
  if(!String(path||'').endsWith('index.html'))return result;
  const isBuffer=Buffer.isBuffer(result);
  let html=isBuffer?result.toString('utf8'):String(result);

  // Remove every legacy settings script reference regardless of query string or attribute order.
  const legacyFiles=['admin-settings-page.js','admin-settings-stable.js','admin-settings-route-fix.js','admin-simple-settings.js','admin-studio-settings-canonical.js','admin-settings-refinements.js','customer-studio-settings-bridge.js','admin-settings-final-ui-fix.js'];
  for(const file of legacyFiles){
    const re=new RegExp('<script[^>]*src=["\\\'][^"\\\']*\\/'+file.replace(/[.*+?^${}()|[\\]\\]/g,'\\$&')+'[^"\\\']*["\\\'][^>]*><\\/script>','gi');
    html=html.replace(re,'');
  }
  html=html.replaceAll("['/admin-settings-page.js','adminsettings'],",'');

  const cacheReset='<meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate"><meta http-equiv="Pragma" content="no-cache"><meta http-equiv="Expires" content="0"><script>(function(){try{if(\'caches\' in window)caches.keys().then(function(keys){return Promise.all(keys.map(function(k){return caches.delete(k)}))});if(navigator.serviceWorker){navigator.serviceWorker.getRegistrations().then(function(rs){rs.forEach(function(r){r.update();if(r.active)r.active.postMessage(\'CLEAR_AMIT_TOUCH_CACHES\')})})}localStorage.removeItem(\'amit-touch-settings-legacy\')}catch(_){}})();</script>';
  const canonical='<script src="/admin-settings-main-canonical.js?v=20260827-settings-main-canonical-2"></script><script src="/admin-simple-settings.js?v=20260827-simple-settings-live-10"></script><script src="/admin-studio-settings-canonical.js?v=20260827-studio-canonical-6"></script><script src="/admin-settings-final-ui-fix.js?v=20260827-settings-final-ui-5"></script><script src="/admin-settings-behavior-hooks.js?v=20260827-settings-hooks-7"></script><script src="/admin-new-message.js?v=20260827-message-templates-8"></script><script src="/admin-settings-route-fix.js?v=20260827-settings-route-v11"></script>';
  if(!html.includes('AMIT_SETTINGS_CANONICAL_HEAD_V11'))html=html.replace('</head>','<!-- AMIT_SETTINGS_CANONICAL_HEAD_V11 -->'+cacheReset+canonical+'</head>');
  return isBuffer?Buffer.from(html,'utf8'):html;
};
