import './preload.js';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

// Post-process the HTML after preload.js has injected the current UI.
// This makes the manager-code flow part of the delivered HTML itself, before
// any later login script can take over the click.
const preloadReadFileSync = fs.readFileSync.bind(fs);
fs.readFileSync = function amitPreviewReadFileSync(file, ...args) {
  const result = preloadReadFileSync(file, ...args);
  if (!String(file || '').endsWith('index.html')) return result;
  const isBuffer = Buffer.isBuffer(result);
  let html = isBuffer ? result.toString('utf8') : String(result);

  html = html.replace(
    '<button class="primary" onclick="login()">התחברות</button>',
    '<button class="primary" onclick="return window.AMIT_DIRECT_LOGIN(event)">התחברות</button>'
  );

  const managerGate = `<script>(function(){
    var ADMIN_PHONE='0527467143';
    var ADMIN_SESSION='amit-touch-admin-session-v1';
    var CUSTOMER_SESSION='amit-touch-signed-in-customer-v5';
    function cleanPhone(v){var p=String(v||'').replace(/\\D/g,'');if(p.indexOf('972')===0&&p.length>=11)p='0'+p.slice(3);return p}
    function isManager(){return cleanPhone(document.getElementById('loginPhone')&&document.getElementById('loginPhone').value)===ADMIN_PHONE}
    function clearCustomer(){try{localStorage.removeItem('amitUser');localStorage.removeItem(CUSTOMER_SESSION);sessionStorage.removeItem(CUSTOMER_SESSION)}catch(_){}window.__AMIT_EARLY_SESSION__=null}
    function ensureCode(){var existing=document.getElementById('adminCode');if(existing){var ew=existing.closest('.field-wrap');if(ew)ew.style.display='flex';existing.focus();return existing}var phone=document.getElementById('loginPhone');var wrap=phone&&phone.closest('.field-wrap');if(!wrap)return null;var w=document.createElement('div');w.id='adminCodeWrap';w.className='glass field-wrap';w.style.display='flex';w.innerHTML='<span class="field-icon">✦</span><input id="adminCode" class="field" inputmode="numeric" autocomplete="one-time-code" maxlength="4" placeholder="קוד מנהל">';wrap.insertAdjacentElement('afterend',w);var c=w.querySelector('#adminCode');setTimeout(function(){c&&c.focus()},0);return c}
    function enterAdmin(){clearCustomer();try{localStorage.setItem(ADMIN_SESSION,'1');sessionStorage.setItem(ADMIN_SESSION,'1')}catch(_){}window.__AMIT_ADMIN_SESSION__=true;var n=0;(function go(){if(typeof window.AMIT_TOUCH_ENTER_ADMIN==='function'){window.AMIT_TOUCH_ENTER_ADMIN();return}if(++n<120)setTimeout(go,50)})()}
    async function managerLogin(e){if(e){e.preventDefault();e.stopPropagation();e.stopImmediatePropagation()}clearCustomer();var code=document.getElementById('adminCode');if(!code){ensureCode();return false}var adminCode=String(code.value||'').trim();if(!adminCode){code.focus();return false}var name=String((document.getElementById('loginName')&&document.getElementById('loginName').value)||'עמית טל').replace(/\\s+/g,' ').trim()||'עמית טל';try{var r=await fetch('/api/login',{method:'POST',credentials:'same-origin',cache:'no-store',headers:{'Content-Type':'application/json'},body:JSON.stringify({fullName:name,phone:ADMIN_PHONE,adminCode:adminCode})});var d=await r.json().catch(function(){return{}});if(r.ok&&d.role==='admin'){enterAdmin();return false}if(r.status===401){alert('קוד המנהל שגוי');code.focus();return false}if(r.status===403){ensureCode();return false}alert('לא הצלחתי להתחבר כמנהל כרגע. נסי שוב בעוד רגע.')}catch(err){console.error(err);alert('לא הצלחתי להתחבר כמנהל כרגע. נסי שוב בעוד רגע.')}return false}
    window.AMIT_DIRECT_LOGIN=function(e){if(isManager())return managerLogin(e);if(typeof window.login==='function')window.login();return false};
    document.addEventListener('click',function(e){var b=e.target&&e.target.closest&&e.target.closest('#login .primary');if(!b||!isManager())return;managerLogin(e)},true);
    document.addEventListener('keydown',function(e){if(e.key!=='Enter'||!e.target||!e.target.closest||!e.target.closest('#login')||!isManager())return;managerLogin(e)},true);
  })();</script>`;

  html = html.replace('</body>', managerGate + '</body>');
  return isBuffer ? Buffer.from(html, 'utf8') : html;
};

const sourceUrl = new URL('./server-v2.js', import.meta.url);
let source = fs.readFileSync(sourceUrl, 'utf8');
const listenBlock = "const port = process.env.PORT || 3000;\napp.listen(port, () => console.log(`AMIT TOUCH running on ${port}`));";
if (!source.includes(listenBlock)) {
  throw new Error('VERCEL_ENTRY_LISTEN_BLOCK_NOT_FOUND');
}
source = source.replace(listenBlock, 'export default app;');

// Preview-only: manager phone can never fall through to a customer login.
const adminMatch = "if (fullName === ADMIN_NAME && phone === ADMIN_PHONE)";
if (source.includes(adminMatch)) {
  source = source.replace(adminMatch, "if (phone === ADMIN_PHONE)");
}

const packageImports = [
  'express',
  'googleapis',
  'luxon',
  '@supabase/supabase-js',
  'tsdav',
  'node-ical'
];
for (const specifier of packageImports) {
  const resolved = import.meta.resolve(specifier);
  source = source.replaceAll(`from '${specifier}'`, `from '${resolved}'`);
  source = source.replaceAll(`from \"${specifier}\"`, `from \"${resolved}\"`);
}

const runtimePath = path.join(os.tmpdir(), 'amit-touch-vercel-runtime.mjs');
fs.writeFileSync(runtimePath, source, 'utf8');
const runtime = await import(pathToFileURL(runtimePath).href + '?v=' + Date.now());

if (!runtime.default) throw new Error('VERCEL_EXPRESS_EXPORT_MISSING');
export default runtime.default;
