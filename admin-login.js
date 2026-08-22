(function(){
'use strict';
const ADMIN_NAME='עמית טל';
const ADMIN_PHONE='0527467143';
const ADMIN_KEY='amit-touch-admin-session-v1';
function cleanPhone(v){let p=String(v||'').replace(/\D/g,'');if(p.startsWith('972')&&p.length>=11)p='0'+p.slice(3);return p}
function cleanName(v){return String(v||'').replace(/\s+/g,' ').trim()}
function isAdmin(){try{return localStorage.getItem(ADMIN_KEY)==='1'||sessionStorage.getItem(ADMIN_KEY)==='1'||window.__AMIT_ADMIN_SESSION__===true}catch(_){return !!window.__AMIT_ADMIN_SESSION__}}
function saveAdmin(){try{localStorage.setItem(ADMIN_KEY,'1');sessionStorage.setItem(ADMIN_KEY,'1')}catch(_){}window.__AMIT_ADMIN_SESSION__=true}
function clearAdmin(){try{localStorage.removeItem(ADMIN_KEY);sessionStorage.removeItem(ADMIN_KEY)}catch(_){}window.__AMIT_ADMIN_SESSION__=false;document.body.classList.remove('admin-session-active','admin-v2');document.getElementById('amitAdminRoot')?.remove()}
function ensureAdmin(){let admin=document.getElementById('admin');if(!admin){admin=document.createElement('section');admin.id='admin';admin.className='screen';(document.querySelector('main.app')||document.body).appendChild(admin)}let body=document.getElementById('adminBody');if(!body){body=document.createElement('div');body.id='adminBody';admin.appendChild(body)}return {admin,body}}
function enterAdmin(){
  saveAdmin();
  const u={name:ADMIN_NAME,phone:ADMIN_PHONE,admin:true};window.user=u;try{user=u}catch(_){}
  ensureAdmin();
  if(typeof window.AMIT_TOUCH_ADMIN_LOCK==='function'){
    window.AMIT_TOUCH_ADMIN_LOCK();
  }else{
    document.body.classList.add('admin-session-active','admin-v2');
    document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));
    document.getElementById('admin')?.classList.add('active');
    document.querySelectorAll('#nav,.nav').forEach(n=>{n.classList.remove('show');n.style.display='none'});
    if(typeof window.renderAdminV2==='function')Promise.resolve(window.renderAdminV2()).catch(console.error);
    else if(typeof window.renderAdmin==='function')Promise.resolve(window.renderAdmin()).catch(console.error);
  }
  window.scrollTo?.(0,0);
  return true;
}
window.AMIT_TOUCH_ENTER_ADMIN=enterAdmin;window.AMIT_TOUCH_IS_ADMIN=isAdmin;window.AMIT_TOUCH_CLEAR_ADMIN=clearAdmin;
const style=document.createElement('style');style.id='admin-authority-style-v2';style.textContent=`body.admin-session-active #nav,body.admin-session-active .nav{display:none!important}`;document.head.appendChild(style);
function guard(){if(isAdmin())enterAdmin()}
window.addEventListener('amit:session-ready',guard);window.addEventListener('pageshow',guard);window.addEventListener('popstate',guard);document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='visible')guard()});
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',guard,{once:true});else setTimeout(guard,0);
})();