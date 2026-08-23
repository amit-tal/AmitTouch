(function(){'use strict';
const KEY='amit-admin-notifications-read-v2';
function hasUnread(){return localStorage.getItem(KEY)!=='1'}
function render(){const bell=document.querySelector('#adminBody .admin-home-canonical .ah-bell');if(!bell)return;bell.classList.toggle('is-read',!hasUnread())}
function markAllRead(){localStorage.setItem(KEY,'1');render();window.dispatchEvent(new CustomEvent('amit:admin-notifications-read'))}
function setUnread(flag=true){if(flag)localStorage.removeItem(KEY);else localStorage.setItem(KEY,'1');render();window.dispatchEvent(new CustomEvent('amit:admin-notifications-unread-change',{detail:{unread:!!flag}}))}
window.AMIT_ADMIN_SET_UNREAD_NOTIFICATIONS=setUnread;
window.AMIT_ADMIN_HAS_UNREAD_NOTIFICATIONS=hasUnread;
window.AMIT_ADMIN_MARK_ALL_NOTIFICATIONS_READ=markAllRead;
/* Opening the bell or visiting notifications does NOT clear unread state. The dot remains until all notifications are explicitly marked read. */
document.addEventListener('click',e=>{if(e.target.closest('[data-mark-all-notifications-read]'))markAllRead()},true);
const body=document.getElementById('adminBody');if(body)new MutationObserver(render).observe(body,{childList:true,subtree:true});
window.addEventListener('pageshow',render);window.addEventListener('amit:session-ready',render);render();
})();