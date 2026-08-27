(function(){
'use strict';
const ADMIN_KEY='amit-touch-admin-session-v1';
const CUSTOMER_KEY='amit-touch-signed-in-customer-v5';
function isAdmin(){try{return localStorage.getItem(ADMIN_KEY)==='1'||sessionStorage.getItem(ADMIN_KEY)==='1'||window.__AMIT_ADMIN_SESSION__===true}catch(_){return !!window.__AMIT_ADMIN_SESSION__}}
function ensureRoot(){let root=document.getElementById('amitAdminRoot');if(!root){root=document.createElement('div');root.id='amitAdminRoot';document.body.appendChild(root)}let body=document.getElementById('adminBody');if(!body){body=document.createElement('div');body.id='adminBody'}if(body.parentElement!==root)root.appendChild(body);return{root,body}}
function hideNode(node){if(!node)return;node.hidden=true;node.style.setProperty('display','none','important');node.style.setProperty('visibility','hidden','important');node.style.setProperty('pointer-events','none','important')}
function isolateLegacyUi(){document.querySelectorAll('#nav,.nav,#amitBottomNav').forEach(hideNode);const app=document.querySelector('main.app');if(app){app.setAttribute('aria-hidden','true');app.style.setProperty('display','none','important');app.style.setProperty('visibility','hidden','important');app.style.setProperty('pointer-events','none','important')}}
function showAdminShell(){const{root}=ensureRoot();document.body.classList.remove('admin-preview-mode');document.body.classList.add('admin-v2','admin-session-active');isolateLegacyUi();root.hidden=false;root.style.setProperty('display','block','important');root.style.setProperty('visibility','visible','important')}
let renderQueued=false;function renderCanonicalAdmin(){if(renderQueued)return;renderQueued=true;queueMicrotask(()=>{renderQueued=false;if(typeof window.renderAdminV2==='function')Promise.resolve(window.renderAdminV2()).catch(console.error)})}
function lockAdmin(){if(!isAdmin()||document.body.classList.contains('admin-preview-mode'))return false;window.__AMIT_ADMIN_SESSION__=true;showAdminShell();renderCanonicalAdmin();requestAnimationFrame(isolateLegacyUi);return true}
['admin-gate-v4-style','admin-gate-v5-style','admin-gate-v6-style','admin-gate-v7-style'].forEach(id=>document.getElementById(id)?.remove());const css=document.createElement('style');css.id='admin-gate-v8-style';css.textContent=`body.admin-session-active{margin:0!important;overflow:hidden!important;background:#fbf7f2!important}body.admin-session-active main.app,body.admin-session-active #nav,body.admin-session-active .nav,body.admin-session-active #amitBottomNav{display:none!important;visibility:hidden!important;pointer-events:none!important}body.admin-session-active #amitAdminRoot{display:block!important;visibility:visible!important;position:fixed!important;inset:0!important;z-index:2147483000!important;width:100%!important;max-width:none!important;height:100dvh!important;min-height:100dvh!important;margin:0!important;padding:0!important;overflow-y:auto!important;overflow-x:hidden!important;background:#fbf7f2!important;-webkit-overflow-scrolling:touch!important;scrollbar-width:none!important;-ms-overflow-style:none!important}body.admin-session-active #amitAdminRoot::-webkit-scrollbar,body.admin-session-active #amitAdminRoot #adminBody::-webkit-scrollbar{display:none!important;width:0!important;height:0!important}body.admin-session-active #amitAdminRoot #adminBody{width:min(430px,100%)!important;min-height:100dvh!important;margin:0 auto!important;padding:0 15px calc(104px + env(safe-area-inset-bottom))!important;background:#fbf7f2!important;position:relative!important;z-index:1!important;scrollbar-width:none!important;-ms-overflow-style:none!important}body.admin-session-active #amitAdminRoot .af-nav{z-index:2147483001!important}`;document.head.appendChild(css);
let observerQueued=false;const observer=new MutationObserver(mutations=>{if(!isAdmin()||document.body.classList.contains('admin-preview-mode')||!document.body.classList.contains('admin-session-active'))return;if(!mutations.some(m=>m.type==='childList'&&m.addedNodes.length))return;if(observerQueued)return;observerQueued=true;requestAnimationFrame(()=>{observerQueued=false;isolateLegacyUi()})});observer.observe(document.body,{childList:true,subtree:true});
window.AMIT_TOUCH_ADMIN_LOCK=lockAdmin;
window.AMIT_TOUCH_ADMIN_SHOW_CUSTOMER_PREVIEW=async function(){
  try{
    const r=await fetch('/api/admin/customer-preview',{cache:'no-store'}),j=await r.json();
    if(!r.ok||!j.customer)throw new Error('PREVIEW_CUSTOMER_FAILED');
    const customer=j.customer;
    window.user=customer;
    try{localStorage.setItem(CUSTOMER_KEY,JSON.stringify(customer))}catch(_){}
    document.body.classList.add('admin-preview-mode');
    const root=document.getElementById('amitAdminRoot');if(root){root.style.display='none';root.hidden=true}
    document.body.classList.remove('admin-session-active','admin-v2');
    const app=document.querySelector('main.app');if(app){app.hidden=false;app.style.removeProperty('display');app.style.removeProperty('visibility');app.style.removeProperty('pointer-events');app.removeAttribute('aria-hidden')}
    document.querySelectorAll('#nav,.nav,#amitBottomNav').forEach(n=>{n.hidden=false;n.style.removeProperty('display');n.style.removeProperty('visibility');n.style.removeProperty('pointer-events')});
    document.querySelectorAll('.screen').forEach(x=>x.classList.remove('active'));
    document.getElementById('home')?.classList.add('active');
    document.getElementById('nav')?.classList.add('show');
    window.dispatchEvent(new CustomEvent('amit:customer-preview',{detail:customer}));
    window.renderHome?.();
  }catch(error){console.error(error);window.amitNotice?.('לא הצלחתי לפתוח כרגע את תצוגת הלקוחה. נסי שוב.','AMIT TOUCH')}
};
window.AMIT_TOUCH_ADMIN_RETURN=function(){document.body.classList.remove('admin-preview-mode');return lockAdmin()};
const originalShow=window.show;if(typeof originalShow==='function')window.show=function(id){if(isAdmin()&&!document.body.classList.contains('admin-preview-mode')&&id!=='login'&&id!=='register'){lockAdmin();return}return originalShow.apply(this,arguments)};const originalEnter=window.enterApp;if(typeof originalEnter==='function')window.enterApp=function(){if(isAdmin()&&!document.body.classList.contains('admin-preview-mode')){lockAdmin();return}return originalEnter.apply(this,arguments)};
window.addEventListener('amit:session-ready',()=>setTimeout(lockAdmin,0));window.addEventListener('pageshow',()=>setTimeout(lockAdmin,0));window.addEventListener('popstate',()=>setTimeout(lockAdmin,0));document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='visible')setTimeout(lockAdmin,0)});if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>setTimeout(lockAdmin,0),{once:true});else setTimeout(lockAdmin,0);
})();