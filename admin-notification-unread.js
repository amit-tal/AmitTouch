(function(){'use strict';
const KEY='amit-admin-notifications-read-v1';
function hasUnread(){return localStorage.getItem(KEY)!=='1'}
function render(){const bell=document.querySelector('#adminBody .admin-home-canonical .ah-bell');if(!bell)return;bell.classList.toggle('is-read',!hasUnread())}
function markRead(){localStorage.setItem(KEY,'1');render();window.dispatchEvent(new CustomEvent('amit:admin-notifications-read'))}
function setUnread(flag=true){if(flag)localStorage.removeItem(KEY);else localStorage.setItem(KEY,'1');render();window.dispatchEvent(new CustomEvent('amit:admin-notifications-unread-change',{detail:{unread:!!flag}}))}
window.AMIT_ADMIN_SET_UNREAD_NOTIFICATIONS=setUnread;window.AMIT_ADMIN_HAS_UNREAD_NOTIFICATIONS=hasUnread;
document.addEventListener('click',e=>{if(e.target.closest('#adminBody .admin-home-canonical .ah-bell')||e.target.closest('.admin-notifications-v4'))markRead()},true);
const body=document.getElementById('adminBody');if(body)new MutationObserver(render).observe(body,{childList:true,subtree:true});window.addEventListener('pageshow',render);window.addEventListener('amit:session-ready',render);render();
})();