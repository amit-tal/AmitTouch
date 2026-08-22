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
function hideNode(node){
  if(!node)return;
  if(!node.hidden)node.hidden=true;
  if(node.style.getPropertyValue('display')!=='none'||node.style.getPropertyPriority('display')!=='important')node.style.setProperty('display','none','important');
  if(node.style.getPropertyValue('visibility')!=='hidden'||node.style.getPropertyPriority('visibility')!=='important')node.style.setProperty('visibility','hidden','important');
  if(node.style.getPropertyValue('pointer-events')!=='none'||node.style.getPropertyPriority('pointer-events')!=='important')node.style.setProperty('pointer-events','none','important');
}
function isolateLegacyUi(){
  document.querySelectorAll('#nav,.nav,#amitBottomNav').forEach(hideNode);
  const app=document.querySelector('main.app');
  if(app){
    if(app.getAttribute('aria-hidden')!=='true')app.setAttribute('aria-hidden','true');
    if(app.style.getPropertyValue('display')!=='none'||app.style.getPropertyPriority('display')!=='important')app.style.setProperty('display','none','important');
    if(app.style.getPropertyValue('visibility')!=='hidden'||app.style.getPropertyPriority('visibility')!=='important')app.style.setProperty('visibility','hidden','important');
    if(app.style.getPropertyValue('pointer-events')!=='none'||app.style.getPropertyPriority('pointer-events')!=='important')app.style.setProperty('pointer-events','none','important');
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
function lockAdmin(){
  if(!isAdmin())return false;
  window.__AMIT_ADMIN_SESSION__=true;
  showAdminShell();
  const renderer=typeof window.renderAdminV2==='function'?window.renderAdminV2:window.renderAdmin;
  if(typeof renderer==='function')Promise.resolve(renderer()).catch(console.error);
  requestAnimationFrame(isolateLegacyUi);
  return true;
}
const oldStyle=document.getElementById('admin-gate-v5-style')||document.getElementById('admin-gate-v4-style');if(oldStyle)oldStyle.remove();
const css=document.createElement('style');css.id='admin-gate-v6-style';css.textContent=`
body.admin-session-active{margin:0!important;overflow:hidden!important;background:#fbf7f2!important}
body.admin-session-active main.app,
body.admin-session-active #nav,
body.admin-session-active .nav,
body.admin-session-active #amitBottomNav{display:none!important;visibility:hidden!important;pointer-events:none!important}
body.admin-session-active #amitAdminRoot{display:block!important;visibility:visible!important;position:fixed!important;inset:0!important;z-index:2147483000!important;width:100%!important;max-width:none!important;height:100dvh!important;min-height:100dvh!important;margin:0!important;padding:0!important;overflow-y:auto!important;overflow-x:hidden!important;background:#fbf7f2!important;-webkit-overflow-scrolling:touch!important}
body.admin-session-active #amitAdminRoot #adminBody{width:min(430px,100%)!important;min-height:100dvh!important;margin:0 auto!important;padding:0 15px calc(104px + env(safe-area-inset-bottom))!important;background:#fbf7f2!important;position:relative!important;z-index:1!important}
body.admin-session-active #amitAdminRoot .af-nav{z-index:2147483001!important}
`;
document.head.appendChild(css);
let observerQueued=false;
const observer=new MutationObserver(mutations=>{
  if(!isAdmin()||!document.body.classList.contains('admin-session-active'))return;
  if(!mutations.some(m=>m.type==='childList'&&m.addedNodes.length))return;
  if(observerQueued)return;
  observerQueued=true;
  requestAnimationFrame(()=>{observerQueued=false;isolateLegacyUi()});
});
observer.observe(document.body,{childList:true,subtree:true});
window.AMIT_TOUCH_ADMIN_LOCK=lockAdmin;
window.AMIT_TOUCH_ADMIN_SHOW_CUSTOMER_PREVIEW=function(){
  const root=document.getElementById('amitAdminRoot');if(root){root.style.display='none';root.hidden=true}
  document.body.classList.remove('admin-session-active','admin-v2');
  const app=document.querySelector('main.app');if(app){app.hidden=false;app.style.removeProperty('display');app.style.removeProperty('visibility');app.style.removeProperty('pointer-events');app.removeAttribute('aria-hidden')}
  document.querySelectorAll('#nav,.nav,#amitBottomNav').forEach(n=>{n.hidden=false;n.style.removeProperty('display');n.style.removeProperty('visibility');n.style.removeProperty('pointer-events')});
  document.querySelectorAll('.screen').forEach(x=>x.classList.remove('active'));
  document.getElementById('home')?.classList.add('active');
};
window.AMIT_TOUCH_ADMIN_RETURN=lockAdmin;
const originalShow=window.show;if(typeof originalShow==='function')window.show=function(id){if(isAdmin()&&!document.body.classList.contains('admin-preview-mode')&&id!=='login'&&id!=='register'){lockAdmin();return}return originalShow.apply(this,arguments)};
const originalEnter=window.enterApp;if(typeof originalEnter==='function')window.enterApp=function(){if(isAdmin()){lockAdmin();return}return originalEnter.apply(this,arguments)};
window.addEventListener('amit:session-ready',()=>setTimeout(lockAdmin,0));
window.addEventListener('pageshow',()=>setTimeout(lockAdmin,0));
window.addEventListener('popstate',()=>setTimeout(lockAdmin,0));
document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='visible')setTimeout(lockAdmin,0)});
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>setTimeout(lockAdmin,0),{once:true});else setTimeout(lockAdmin,0);
})();