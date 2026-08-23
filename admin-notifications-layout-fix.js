(function(){'use strict';
const ID='admin-notifications-layout-fix-v1';if(document.getElementById(ID))return;
const style=document.createElement('style');style.id=ID;style.textContent=`
body.admin-session-active .admin-notifications-v4 .an4-head{height:46px!important;position:relative!important;display:flex!important;align-items:flex-start!important;justify-content:center!important;margin:0 0 20px!important}
body.admin-session-active .admin-notifications-v4 .an4-title{font-size:20px!important;line-height:24px!important;font-weight:600!important;text-align:center!important;margin:1px 0 0!important;color:#173f3b!important;direction:rtl!important}
body.admin-session-active .admin-notifications-v4 .an4-back{position:absolute!important;right:0!important;top:-2px!important;transform:none!important;width:46px!important;height:46px!important;padding:0 0 6px!important;border:0!important;background:transparent!important;display:grid!important;place-items:center!important;color:#315d58!important;z-index:5!important;font-size:42px!important;line-height:1!important;font-weight:200!important}
body.admin-session-active .an4-archive-sheet .an4-archive-head{height:46px!important;position:relative!important;display:flex!important;align-items:flex-start!important;justify-content:center!important;margin:0 0 20px!important}
body.admin-session-active .an4-archive-sheet .an4-archive-head h2{font-size:20px!important;line-height:24px!important;font-weight:600!important;text-align:center!important;margin:1px 0 0!important;color:#173f3b!important}
body.admin-session-active .an4-archive-sheet .an4-archive-close{position:absolute!important;right:0!important;top:-2px!important;transform:none!important;width:46px!important;height:46px!important;padding:0 0 6px!important;border:0!important;background:transparent!important;display:grid!important;place-items:center!important;color:#315d58!important;z-index:5!important;font-size:42px!important;line-height:1!important;font-weight:200!important}
`;
document.head.appendChild(style);
})();