import fs from 'fs';
const previousReadFileSync=fs.readFileSync.bind(fs);
fs.readFileSync=function amitSettingsRefinementRead(path,...args){
  const result=previousReadFileSync(path,...args);
  if(!String(path||'').endsWith('index.html'))return result;
  const isBuffer=Buffer.isBuffer(result);
  let html=isBuffer?result.toString('utf8'):String(result);

  // The legacy settings implementation must never be requested or executed again.
  html=html.replaceAll("['/admin-settings-page.js','adminsettings'],",'');
  html=html.replace(/<script[^>]+src=["']\/admin-settings-page\.js[^"']*["'][^>]*><\/script>/g,'');

  const cacheReset='<meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate"><meta http-equiv="Pragma" content="no-cache"><meta http-equiv="Expires" content="0"><script>(function(){try{if(\'caches\' in window)caches.keys().then(function(keys){return Promise.all(keys.map(function(k){return caches.delete(k)}))});if(navigator.serviceWorker&&navigator.serviceWorker.controller)navigator.serviceWorker.controller.postMessage(\'CLEAR_AMIT_TOUCH_CACHES\');localStorage.removeItem(\'amit-touch-settings-legacy\')}catch(_){}})();</script>';
  if(!html.includes('AMIT_CACHE_RESET_20260827_V7'))html=html.replace('</head>','<!-- AMIT_CACHE_RESET_20260827_V7 -->'+cacheReset+'</head>');

  const canonical='<script src="/admin-settings-stable.js?v=20260827-settings-canonical-v9"></script><script src="/admin-studio-settings-canonical.js?v=20260827-studio-canonical-v4"></script><script src="/admin-settings-refinements.js?v=20260827-refinements-v7"></script><script src="/customer-studio-settings-bridge.js?v=20260827-refinements-v7"></script><script src="/admin-settings-final-ui-fix.js?v=20260827-settings-final-ui-v3"></script><script src="/admin-simple-settings.js?v=20260827-simple-settings-live-v8"></script><script src="/admin-settings-route-fix.js?v=20260827-settings-route-v9"></script>';

  html=html.replace(/<script src="\/admin-settings-stable\.js\?v=[^"]+"><\/script>/g,'')
           .replace(/<script src="\/admin-studio-settings-canonical\.js\?v=[^"]+"><\/script>/g,'')
           .replace(/<script src="\/admin-settings-refinements\.js\?v=[^"]+"><\/script>/g,'')
           .replace(/<script src="\/customer-studio-settings-bridge\.js\?v=[^"]+"><\/script>/g,'')
           .replace(/<script src="\/admin-settings-final-ui-fix\.js\?v=[^"]+"><\/script>/g,'')
           .replace(/<script src="\/admin-simple-settings\.js\?v=[^"]+"><\/script>/g,'')
           .replace(/<script src="\/admin-settings-route-fix\.js\?v=[^"]+"><\/script>/g,'');
  html=html.replace('</body>',canonical+'</body>');
  return isBuffer?Buffer.from(html,'utf8'):html;
};
