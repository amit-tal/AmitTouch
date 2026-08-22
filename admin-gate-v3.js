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
function showAdminShell(){
  const {root}=ensureRoot();
  document.body.classList.add('admin-v2','admin-session-active');
  document.querySelector('main.app')?.setAttribute('aria-hidden','true');
  document.querySelectorAll('#nav,.nav').forEach(n=>{n.classList.remove('show');n.style.display='none'});
  root.style.display='block';
}
function hideAdminShell(){
  const root=document.getElementById('amitAdminRoot');if(root)root.style.display='none';
  document.querySelector('main.app')?.removeAttribute('aria-hidden');
  document.body.classList.remove('admin-v2','admin-session-active');
}
function lockAdmin(){
  if(!isAdmin())return false;
  window.__AMIT_ADMIN_SESSION__=true;
  showAdminShell();
  if(typeof window.renderAdminV2==='function')Promise.resolve(window.renderAdminV2()).catch(console.error);
  else if(typeof window.renderAdmin==='function')Promise.resolve(window.renderAdmin()).catch(console.error);
  return true;
}
const css=document.createElement('style');css.id='admin-gate-v4-style';css.textContent=`
body.admin-session-active{margin:0!important;overflow-x:hidden!important;background:#fbf7f2!important}
body.admin-session-active main.app,body.admin-session-active #nav,body.admin-session-active .nav{display:none!important}
body.admin-session-active #amitAdminRoot{display:block!important;position:relative!important;z-index:10!important;min-height:100dvh!important;width:100%!important;max-width:430px!important;margin:0 auto!important;padding:0 15px calc(104px + env(safe-area-inset-bottom))!important}
body.admin-session-active #amitAdminRoot #adminBody{min-height:100dvh!important}
`;
document.head.appendChild(css);
window.AMIT_TOUCH_ADMIN_LOCK=lockAdmin;
window.AMIT_TOUCH_ADMIN_SHOW_CUSTOMER_PREVIEW=function(){
  const root=document.getElementById('amitAdminRoot');if(root)root.style.display='none';
  document.body.classList.remove('admin-session-active','admin-v2');
  const app=document.querySelector('main.app');if(app){app.style.display='block';app.removeAttribute('aria-hidden')}
  document.querySelectorAll('.screen').forEach(x=>x.classList.remove('active'));
  document.getElementById('home')?.classList.add('active');
  document.getElementById('nav')?.classList.add('show');
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