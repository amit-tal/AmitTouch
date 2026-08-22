(function(){
'use strict';
const ADMIN_KEY='amit-touch-admin-session-v1';
function isAdmin(){try{return localStorage.getItem(ADMIN_KEY)==='1'||sessionStorage.getItem(ADMIN_KEY)==='1'||window.__AMIT_ADMIN_SESSION__===true}catch(_){return !!window.__AMIT_ADMIN_SESSION__}}
function ensureRoot(){
  let root=document.getElementById('amitAdminRoot');
  if(!root){root=document.createElement('div');root.id='amitAdminRoot';document.body.appendChild(root)}
  let body=document.getElementById('adminBody');
  if(!body){body=document.createElement('div');body.id='adminBody'}
  if(body.parentElement!==root)root.appendChild(body);
  return {root,body};
}
function isolateLegacyUi(){
  document.querySelectorAll('#nav,.nav,#amitBottomNav').forEach(n=>{
    n.classList.remove('show');
    n.hidden=true;
    n.style.setProperty('display','none','important');
    n.style.setProperty('visibility','hidden','important');
    n.style.setProperty('pointer-events','none','important');
  });
  const app=document.querySelector('main.app');
  if(app){
    app.setAttribute('aria-hidden','true');
    app.style.setProperty('display','none','important');
    app.style.setProperty('visibility','hidden','important');
    app.style.setProperty('pointer-events','none','important');
  }
}
function showAdminShell(){
  const {root}=ensureRoot();
  document.body.classList.add('admin-v2','admin-session-active');
  isolateLegacyUi();
  root.hidden=false;
  root.style.setProperty('display','block','important');
  root.style.setProperty('visibility','visible','important');
}
function hideAdminShell(){
  const root=document.getElementById('amitAdminRoot');
  if(root){root.style.display='none';root.hidden=true}
  document.body.classList.remove('admin-v2','admin-session-active');
}
function lockAdmin(){
  if(!isAdmin())return false;
  window.__AMIT_ADMIN_SESSION__=true;
  showAdminShell();
  if(typeof window.renderAdminV2==='function')Promise.resolve(window.renderAdminV2()).catch(console.error);
  else if(typeof window.renderAdmin==='function')Promise.resolve(window.renderAdmin()).catch(console.error);
  requestAnimationFrame(isolateLegacyUi);
  setTimeout(isolateLegacyUi,50);
  return true;
}
const oldStyle=document.getElementById('admin-gate-v4-style');if(oldStyle)oldStyle.remove();
const css=document.createElement('style');css.id='admin-gate-v5-style';css.textContent=`
body.admin-session-active{margin:0!important;overflow:hidden!important;background:#fbf7f2!important}
body.admin-session-active>main.app,
body.admin-session-active>#nav,
body.admin-session-active>.nav,
body.admin-session-active>#amitBottomNav{display:none!important;visibility:hidden!important;pointer-events:none!important}
body.admin-session-active #amitBottomNav{display:none!important;visibility:hidden!important;pointer-events:none!important}
body.admin-session-active #amitAdminRoot{display:block!important;visibility:visible!important;position:fixed!important;inset:0!important;z-index:2147483000!important;width:100%!important;max-width:none!important;height:100dvh!important;min-height:100dvh!important;margin:0!important;padding:0!important;overflow-y:auto!important;overflow-x:hidden!important;background:#fbf7f2!important;overscroll-behavior:contain!important;-webkit-overflow-scrolling:touch!important}
body.admin-session-active #amitAdminRoot #adminBody{width:min(430px,100%)!important;min-height:100dvh!important;margin:0 auto!important;padding:0 15px calc(104px + env(safe-area-inset-bottom))!important;background:#fbf7f2!important;position:relative!important;z-index:1!important}
body.admin-session-active #amitAdminRoot .af-nav{z-index:2147483001!important}
`;
document.head.appendChild(css);
const observer=new MutationObserver(()=>{if(isAdmin()&&document.body.classList.contains('admin-session-active'))isolateLegacyUi()});
observer.observe(document.body,{childList:true,subtree:true,attributes:true,attributeFilter:['class','style','hidden']});
window.AMIT_TOUCH_ADMIN_LOCK=lockAdmin;
window.AMIT_TOUCH_ADMIN_SHOW_CUSTOMER_PREVIEW=function(){
  const root=document.getElementById('amitAdminRoot');if(root){root.style.display='none';root.hidden=true}
  document.body.classList.remove('admin-session-active','admin-v2');
  const app=document.querySelector('main.app');if(app){app.style.removeProperty('display');app.style.removeProperty('visibility');app.style.removeProperty('pointer-events');app.removeAttribute('aria-hidden')}
  const customerNav=document.getElementById('amitBottomNav');if(customerNav){customerNav.hidden=false;customerNav.style.removeProperty('display');customerNav.style.removeProperty('visibility');customerNav.style.removeProperty('pointer-events')}
  document.querySelectorAll('.screen').forEach(x=>x.classList.remove('active'));
  document.getElementById('home')?.classList.add('active');
};
window.AMIT_TOUCH_ADMIN_RETURN=function(){lockAdmin()};
const originalShow=window.show;if(typeof originalShow==='function')window.show=function(id){if(isAdmin()&&!document.body.classList.contains('admin-preview-mode')&&id!=='login'&&id!=='register'){lockAdmin();return}return originalShow.apply(this,arguments)};
const originalEnter=window.enterApp;if(typeof originalEnter==='function')window.enterApp=function(){if(isAdmin()){lockAdmin();return}return originalEnter.apply(this,arguments)};
window.addEventListener('amit:session-ready',()=>setTimeout(lockAdmin,0));
window.addEventListener('pageshow',()=>setTimeout(lockAdmin,0));
window.addEventListener('popstate',()=>setTimeout(lockAdmin,0));
document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='visible')setTimeout(lockAdmin,0)});
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>setTimeout(lockAdmin,0),{once:true});else setTimeout(lockAdmin,0);
})();