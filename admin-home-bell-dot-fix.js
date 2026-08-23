(function(){'use strict';
const ID='admin-home-bell-dot-fix-v1';if(document.getElementById(ID))return;
const style=document.createElement('style');style.id=ID;style.textContent=`
body.admin-session-active .admin-home-canonical .ah-bell{overflow:visible!important}
body.admin-session-active .admin-home-canonical .ah-bell img{width:40px!important;height:40px!important;display:block!important;object-fit:contain!important}
body.admin-session-active .admin-home-canonical .ah-bell-dot{position:absolute!important;top:2px!important;right:2px!important;width:12px!important;height:12px!important;border-radius:50%!important;background:#f2b0ae!important;border:2px solid #fbf6f0!important;box-sizing:border-box!important;box-shadow:0 1px 3px rgba(99,65,65,.12)!important;z-index:10!important}
`;
document.head.appendChild(style);
function syncUnread(){const bell=document.querySelector('#adminBody .admin-home-canonical .ah-bell');if(!bell)return;try{if(window.AMIT_ADMIN_HAS_UNREAD_NOTIFICATIONS?.()){bell.classList.remove('is-read');localStorage.removeItem('amit-admin-notifications-read-v1')}}catch(_){}}
document.addEventListener('click',e=>{if(!e.target.closest('#adminBody .admin-home-canonical .ah-bell'))return;setTimeout(syncUnread,0)},true);
const body=document.getElementById('adminBody');if(body)new MutationObserver(syncUnread).observe(body,{childList:true,subtree:true});
window.addEventListener('pageshow',syncUnread);window.addEventListener('amit:admin-notifications-unread-change',syncUnread);syncUnread();
})();