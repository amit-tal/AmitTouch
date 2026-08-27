import fs from 'fs';
const previousReadFileSync=fs.readFileSync.bind(fs);
fs.readFileSync=function amitSettingsRefinementRead(path,...args){
  const result=previousReadFileSync(path,...args);
  if(!String(path||'').endsWith('index.html'))return result;
  const isBuffer=Buffer.isBuffer(result);
  let html=isBuffer?result.toString('utf8'):String(result);
  const cacheReset='<meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate"><meta http-equiv="Pragma" content="no-cache"><meta http-equiv="Expires" content="0"><script>(function(){try{if(\'caches\' in window)caches.keys().then(function(keys){return Promise.all(keys.map(function(k){return caches.delete(k)}))});if(navigator.serviceWorker&&navigator.serviceWorker.controller)navigator.serviceWorker.controller.postMessage(\'CLEAR_AMIT_TOUCH_CACHES\')}catch(_){}})();</script>';
  if(!html.includes('AMIT_CACHE_RESET_20260827_V4'))html=html.replace('</head>','<!-- AMIT_CACHE_RESET_20260827_V4 -->'+cacheReset+'</head>');
  const refinements='<script src="/admin-settings-refinements.js?v=20260827-refinements-v4"></script><script src="/customer-studio-settings-bridge.js?v=20260827-refinements-v4"></script>';
  const liveSettings='<script src="/admin-simple-settings.js?v=20260827-simple-settings-live-v4-force"></script><script src="/admin-settings-route-fix.js?v=20260827-settings-route-v5-force"></script>';
  if(!html.includes('admin-settings-refinements.js'))html=html.replace('</body>',refinements+'</body>');
  else html=html.replace(/<script src="\/admin-settings-refinements\.js\?v=[^"]+"><\/script><script src="\/customer-studio-settings-bridge\.js\?v=[^"]+"><\/script>/,refinements);
  if(!html.includes('simple-settings-live-v4-force'))html=html.replace('</body>',liveSettings+'</body>');
  return isBuffer?Buffer.from(html,'utf8'):html;
};
