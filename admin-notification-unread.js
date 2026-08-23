(function(){'use strict';
const STYLE_ID='admin-notification-unread-v1';
const KEY='amit-touch-admin-notifications-read-v1';
if(!document.getElementById(STYLE_ID)){
 const style=document.createElement('style');style.id=STYLE_ID;style.textContent=`
body.admin-session-active .admin-home-canonical .ah-bell{overflow:visible!important}
body.admin-session-active .admin-home-canonical .ah-bell .ah-unread-dot{position:absolute!important;left:4px!important;top:4px!important;width:8px!important;height:8px!important;border-radius:50%!important;background:#e8aaa0!important;border:1.5px solid #fbf6f0!important;box-shadow:0 1px 3px rgba(90,70,65,.12)!important;pointer-events:none!important}
`;
 document.head.appendChild(style);
}
function hasUnread(){return localStorage.getItem(KEY)!=='1'}
function render(){const bell=document.querySelector('#adminBody .admin-home-canonical .ah-bell');if(!bell)return;let dot=bell.querySelector('.ah-unread-dot');if(hasUnread()){if(!dot){dot=document.createElement('span');dot.className='ah-unread-dot';dot.setAttribute('aria-hidden','true');bell.appendChild(dot)}}else dot?.remove()}
function markRead(){localStorage.setItem(KEY,'1');render();window.dispatchEvent(new CustomEvent('amit:admin-notifications-read'))}
function setUnread(flag=true){if(flag)localStorage.removeItem(KEY);else localStorage.setItem(KEY,'1');render();window.dispatchEvent(new CustomEvent('amit:admin-notifications-unread-change',{detail:{unread:!!flag}}))}
window.AMIT_ADMIN_SET_UNREAD_NOTIFICATIONS=setUnread;
window.AMIT_ADMIN_HAS_UNREAD_NOTIFICATIONS=hasUnread;
document.addEventListener('click',e=>{if(e.target.closest('#adminBody .admin-home-canonical .ah-bell')){markRead();return}if(e.target.closest('.admin-notifications-v4'))markRead()},true);
const body=document.getElementById('adminBody');if(body)new MutationObserver(()=>{render();if(document.querySelector('#adminBody .admin-notifications-v4'))markRead()}).observe(body,{childList:true,subtree:true});
window.addEventListener('pageshow',render);window.addEventListener('amit:session-ready',render);render();
})();