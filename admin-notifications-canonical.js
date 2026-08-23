(function(){'use strict';
function loadOnce(selector,src,key){if(document.querySelector(selector))return;const x=document.createElement('script');x.src=src;x.dataset[key]='1';x.async=false;document.body.appendChild(x)}
loadOnce('script[data-admin-home-bell-fix]','/admin-home-bell-fix.js?v=20260823-bell-v3','adminHomeBellFix');
if(document.querySelector('script[data-admin-notifications-v4]')){loadOnce('script[data-admin-notifications-layout-fix]','/admin-notifications-layout-fix.js?v=20260823-layout-v11','adminNotificationsLayoutFix');loadOnce('script[data-admin-reschedule-launch-fix]','/admin-reschedule-launch-fix.js?v=20260823-launch-v2','adminRescheduleLaunchFix');return}
const s=document.createElement('script');s.src='/admin-notifications-v4.js?v=20260823-notifications-v45';s.dataset.adminNotificationsV4='1';s.async=false;s.onload=()=>{
loadOnce('script[data-admin-notifications-layout-fix]','/admin-notifications-layout-fix.js?v=20260823-layout-v11','adminNotificationsLayoutFix');
loadOnce('script[data-admin-notification-unread]','/admin-notification-unread.js?v=20260823-unread-v3','adminNotificationUnread');
const old=document.querySelector('script[data-amіt="adminnotificationsreschedule"],script[src*="admin-notifications-reschedule-v5.js"]');if(old)old.remove();
const r=document.createElement('script');r.src='/admin-notifications-reschedule-v5.js?v=20260823-reschedule-v7';r.dataset.adminNotificationsReschedule='1';r.async=false;r.onload=()=>loadOnce('script[data-admin-reschedule-launch-fix]','/admin-reschedule-launch-fix.js?v=20260823-launch-v2','adminRescheduleLaunchFix');document.body.appendChild(r)
};document.body.appendChild(s)
})();