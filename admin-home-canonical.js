(function(){
'use strict';
const STYLE_ID='admin-home-canonical-v3';document.getElementById('admin-home-canonical-v1')?.remove();document.getElementById('admin-home-canonical-v2')?.remove();if(document.getElementById(STYLE_ID))return;
const style=document.createElement('style');style.id=STYLE_ID;style.textContent=`
body.admin-session-active .admin-home-canonical .ah-head{height:46px!important;position:relative!important;display:flex!important;align-items:flex-start!important;justify-content:center!important}
body.admin-session-active .admin-home-canonical .ah-bell{position:absolute!important;left:0!important;top:0!important;width:34px!important;height:28px!important;padding:0!important;border:0!important;background:transparent!important;display:grid!important;place-items:center!important;z-index:5!important}
body.admin-session-active .admin-home-canonical .ah-bell img{width:30px!important;height:30px!important;display:block!important;object-fit:contain!important}
body.admin-session-active .admin-home-canonical .ah-title-wrap{text-align:center!important;padding-top:1px!important}
body.admin-session-active .admin-home-canonical .ah-title{margin:0!important;font-size:20px!important;line-height:24px!important;font-weight:600!important;color:#173f3b!important;display:flex!important;align-items:center!important;justify-content:center!important;gap:5px!important}
`;
document.head.appendChild(style);
})();