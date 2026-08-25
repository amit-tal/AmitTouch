(function(){'use strict';
const ID='admin-home-bell-fix-v8';document.querySelectorAll('[id^="admin-home-bell-fix-v"]').forEach(x=>x.remove());const s=document.createElement('style');s.id=ID;s.textContent=`
body.admin-session-active .admin-home-canonical .ah-bell{position:absolute!important;left:-2px!important;top:-5px!important;width:56px!important;height:56px!important;padding:0!important;border:0!important;background:transparent!important;display:grid!important;place-items:center!important;overflow:visible!important}
body.admin-session-active .admin-home-canonical .ah-bell img{width:52px!important;height:52px!important;object-fit:contain!important;display:block!important}
body.admin-session-active .admin-home-canonical .ah-bell-dot{position:absolute!important;top:4px!important;right:5px!important;width:13px!important;height:13px!important;border-radius:50%!important;background:#efaaa6!important;border:2px solid #fbf6f0!important;box-sizing:border-box!important;z-index:20!important;pointer-events:none!important}
body.admin-session-active .admin-home-canonical .ah-bell.is-read .ah-bell-dot{display:none!important}
`;document.head.appendChild(s);
function unread(){try{return window.AMIT_ADMIN_HAS_UNREAD_NOTIFICATIONS?window.AMIT_ADMIN_HAS_UNREAD_NOTIFICATIONS():localStorage.getItem('amit-admin-notifications-read-v2')!=='1'}catch(_){return true}}
function sync(){const bell=document.querySelector('#adminBody .admin-home-canonical .ah-bell');if(!bell)return;bell.classList.toggle('is-read',!unread())}
document.addEventListener('click',e=>{const bell=e.target.closest('#adminBody .admin-home-canonical .ah-bell');if(!bell)return;e.preventDefault();e.stopImmediatePropagation();window.AMIT_ADMIN_GO?.('notifications');setTimeout(()=>{window.AMIT_ADMIN_MARK_ALL_NOTIFICATIONS_READ?.();sync()},120)},true);
const body=document.getElementById('adminBody');if(body)new MutationObserver(sync).observe(body,{childList:true,subtree:true});window.addEventListener('amit:admin-notifications-unread-change',sync);window.addEventListener('amit:admin-notifications-read',sync);window.addEventListener('pageshow',sync);sync();
})();