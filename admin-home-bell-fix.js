(function(){'use strict';
const ID='admin-home-bell-fix-v4';['admin-home-bell-fix-v1','admin-home-bell-fix-v2','admin-home-bell-fix-v3'].forEach(x=>document.getElementById(x)?.remove());if(document.getElementById(ID))return;const s=document.createElement('style');s.id=ID;s.textContent=`
body.admin-session-active .admin-home-canonical .ah-bell{width:52px!important;height:52px!important;overflow:visible!important}
body.admin-session-active .admin-home-canonical .ah-bell img{width:44px!important;height:44px!important;object-fit:contain!important;display:block!important}
body.admin-session-active .admin-home-canonical .ah-bell-dot{position:absolute!important;top:5px!important;right:7px!important;width:12px!important;height:12px!important;border-radius:50%!important;background:#f2b0ae!important;border:2px solid #fbf6f0!important;box-sizing:border-box!important;box-shadow:0 1px 4px rgba(99,65,65,.12)!important;z-index:10!important;pointer-events:none!important}
body.admin-session-active .admin-home-canonical .ah-bell.is-read .ah-bell-dot{display:none!important}
`;document.head.appendChild(s);
function unread(){try{return window.AMIT_ADMIN_HAS_UNREAD_NOTIFICATIONS?window.AMIT_ADMIN_HAS_UNREAD_NOTIFICATIONS():localStorage.getItem('amit-admin-notifications-read-v2')!=='1'}catch(_){return true}}
function sync(){const bell=document.querySelector('#adminBody .admin-home-canonical .ah-bell');if(!bell)return;bell.classList.toggle('is-read',!unread())}
document.addEventListener('click',e=>{const bell=e.target.closest('#adminBody .admin-home-canonical .ah-bell');if(!bell)return;e.preventDefault();e.stopImmediatePropagation();window.AMIT_ADMIN_GO?.('notifications');setTimeout(sync,0)},true);
const body=document.getElementById('adminBody');if(body)new MutationObserver(sync).observe(body,{childList:true,subtree:true});window.addEventListener('amit:admin-notifications-unread-change',sync);window.addEventListener('amit:admin-notifications-read',sync);window.addEventListener('pageshow',sync);sync();
})();