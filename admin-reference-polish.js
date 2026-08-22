(function(){
'use strict';
const style=document.createElement('style');
style.id='admin-reference-polish-v1';
style.textContent=`
:root{--ar-green:#184f49;--ar-green-2:#2f6f68;--ar-cream:#fbf6f0;--ar-card:rgba(255,255,255,.72);--ar-line:rgba(56,85,79,.08);--ar-pink:#f3dfd8;--ar-muted:#8c9290;--ar-shadow:0 10px 28px rgba(66,74,70,.055)}
body.admin-session-active{background:radial-gradient(circle at 88% 7%,rgba(235,248,244,.55),transparent 27%),radial-gradient(circle at 8% 20%,rgba(250,234,228,.36),transparent 24%),var(--ar-cream)!important;color:var(--ar-green)!important}
body.admin-session-active #amitAdminRoot{background:transparent!important}
body.admin-session-active #amitAdminRoot #adminBody{width:min(390px,100%)!important;padding:calc(max(18px,env(safe-area-inset-top)) + 6px) 16px calc(112px + env(safe-area-inset-bottom))!important;background:transparent!important}
body.admin-session-active .af{padding-top:0!important;color:var(--ar-green)!important;font-family:Inter,Arial,sans-serif!important}
body.admin-session-active .af-head{height:38px!important;grid-template-columns:38px 1fr 38px!important;margin-bottom:4px!important}
body.admin-session-active .af-head h1{font-size:14px!important;font-weight:650!important;letter-spacing:-.1px!important;color:var(--ar-green)!important}
body.admin-session-active .af-icon{font-size:17px!important;color:var(--ar-green)!important;width:34px!important;height:34px!important;border-radius:50%!important;padding:0!important}
body.admin-session-active .af-title{font-size:19px!important;font-weight:650!important;margin:10px 2px 3px!important;letter-spacing:-.25px!important;color:var(--ar-green)!important}
body.admin-session-active .af-sub{font-size:10px!important;margin:0 2px 13px!important;color:var(--ar-muted)!important}
body.admin-session-active .af-grid{gap:8px!important}
body.admin-session-active .af-card,
body.admin-session-active .af-row,
body.admin-session-active .af-menu button,
body.admin-session-active .af-input,
body.admin-session-active .af-select,
body.admin-session-active .af-textarea{background:linear-gradient(145deg,rgba(255,255,255,.84),rgba(255,255,255,.54))!important;border:1px solid rgba(255,255,255,.95)!important;box-shadow:var(--ar-shadow),inset 0 1px 0 rgba(255,255,255,.98)!important;backdrop-filter:blur(20px) saturate(125%)!important;-webkit-backdrop-filter:blur(20px) saturate(125%)!important}
body.admin-session-active .af-card{border-radius:15px!important;padding:13px!important}
body.admin-session-active .af-stat{min-height:72px!important;display:flex!important;flex-direction:column!important;align-items:center!important;justify-content:center!important;padding:10px 8px!important}
body.admin-session-active .af-stat b{font-size:18px!important;line-height:1!important;font-weight:650!important;color:var(--ar-green)!important;margin-bottom:6px!important}
body.admin-session-active .af-stat span{font-size:9px!important;line-height:1.15!important;color:#858e8b!important}
body.admin-session-active .af-section{font-size:13px!important;font-weight:700!important;margin:18px 2px 8px!important;color:var(--ar-green)!important}
body.admin-session-active .af-list{gap:8px!important}
body.admin-session-active .af-row{border-radius:14px!important;padding:12px 13px!important;min-height:61px!important}
body.admin-session-active .af-row h3{font-size:12px!important;font-weight:650!important;margin-bottom:3px!important}
body.admin-session-active .af-row p{font-size:9px!important;line-height:1.45!important;color:#8b918f!important}
body.admin-session-active .af-note{font-size:10px!important;line-height:1.55!important;color:#8b918f!important}
body.admin-session-active .af-badge{font-size:8px!important;padding:5px 8px!important;font-weight:600!important;background:#eaf5f1!important;color:#2d6f67!important}
body.admin-session-active .af-badge.pending{background:#fff1df!important;color:#a27234!important}
body.admin-session-active .af-badge.cancelled{background:#faece8!important;color:#a7645d!important}
body.admin-session-active .af-actions{gap:6px!important;margin-top:10px!important}
body.admin-session-active .af-actions button{min-height:34px!important;border-radius:9px!important;padding:8px 5px!important;font-size:8.5px!important;color:var(--ar-green)!important;background:rgba(255,255,255,.72)!important;border:1px solid rgba(49,85,78,.10)!important}
body.admin-session-active .af-actions .primary{background:linear-gradient(135deg,#28655f,#174d48)!important;color:white!important;border-color:transparent!important}
body.admin-session-active .af-btn{min-height:44px!important;border-radius:13px!important;background:linear-gradient(135deg,#2b6b64,#164d47)!important;box-shadow:0 8px 20px rgba(26,83,76,.14)!important;font-size:11px!important}
body.admin-session-active .af-soft{border-radius:11px!important;font-size:10px!important}
body.admin-session-active .af-tabs{gap:6px!important;padding:2px 0 9px!important;scrollbar-width:none!important}
body.admin-session-active .af-tabs::-webkit-scrollbar{display:none!important}
body.admin-session-active .af-tab{min-height:29px!important;padding:7px 13px!important;border-radius:18px!important;font-size:9px!important;color:#6f7d79!important;background:rgba(255,255,255,.70)!important;border:1px solid rgba(64,88,83,.08)!important}
body.admin-session-active .af-tab.on{background:var(--ar-pink)!important;border-color:rgba(222,183,174,.22)!important;color:#8b625b!important}
body.admin-session-active .af-input,
body.admin-session-active .af-select,
body.admin-session-active .af-textarea{border-radius:12px!important;padding:11px 13px!important;font-size:10px!important;color:var(--ar-green)!important;margin:4px 0 9px!important;outline:none!important}
body.admin-session-active .af-menu{gap:7px!important}
body.admin-session-active .af-menu button{border-radius:13px!important;padding:13px 14px!important;font-size:10px!important;color:var(--ar-green)!important}
body.admin-session-active .af-gallery{gap:8px!important}
body.admin-session-active .af-photo{border-radius:14px!important;box-shadow:var(--ar-shadow)!important}
body.admin-session-active .af-drop{border-radius:15px!important;border:1px dashed rgba(95,104,100,.24)!important;background:rgba(255,255,255,.58)!important;color:#8c9290!important;font-size:10px!important}
body.admin-session-active .af-switch{width:34px!important;height:20px!important;background:#dadeda!important}
body.admin-session-active .af-switch:after{width:16px!important;height:16px!important}
body.admin-session-active .af-switch.on{background:var(--ar-green)!important}
body.admin-session-active .af-switch.on:after{right:16px!important}
body.admin-session-active .af-nav{width:min(368px,calc(100% - 28px))!important;height:65px!important;bottom:max(12px,env(safe-area-inset-bottom))!important;border-radius:25px!important;padding:5px 8px!important;background:linear-gradient(145deg,rgba(255,255,255,.89),rgba(255,255,255,.67))!important;border:1px solid rgba(255,255,255,.96)!important;box-shadow:0 12px 35px rgba(74,76,72,.11),inset 0 1px rgba(255,255,255,.98)!important;backdrop-filter:blur(24px) saturate(135%)!important;-webkit-backdrop-filter:blur(24px) saturate(135%)!important}
body.admin-session-active .af-nav button{font-size:8px!important;color:#4e6d68!important;border-radius:17px!important;padding:5px 1px!important;position:relative!important}
body.admin-session-active .af-nav i{font-size:17px!important;line-height:1!important;margin-bottom:5px!important;color:#315f5a!important}
body.admin-session-active .af-nav button.on{background:transparent!important;color:#9a675f!important}
body.admin-session-active .af-nav button.on i{color:#9a675f!important}
body.admin-session-active .af-nav .home{transform:translateY(-7px)!important;background:linear-gradient(145deg,rgba(246,224,218,.94),rgba(255,246,243,.90))!important;box-shadow:0 7px 18px rgba(116,87,80,.10),inset 0 1px rgba(255,255,255,.95)!important;border:1px solid rgba(255,255,255,.9)!important}
body.admin-session-active .af-nav .home.on{background:linear-gradient(145deg,#f0d8d1,#f8e9e5)!important}
body.admin-session-active .af-bottomspace{height:88px!important}
@media (max-width:370px){body.admin-session-active #amitAdminRoot #adminBody{padding-left:12px!important;padding-right:12px!important}.af-nav{width:calc(100% - 20px)!important}}
`;
document.head.appendChild(style);
function polishDashboard(){
 const root=document.getElementById('adminBody');if(!root)return;
 const af=root.querySelector('.af');if(!af)return;
 const head=af.querySelector('.af-head');
 if(head&&!head.dataset.refined){
   head.dataset.refined='1';
   const title=head.querySelector('h1');
   if(title&&!title.textContent.trim()){
     head.style.gridTemplateColumns='36px 1fr 36px';
     const left=head.children[0],right=head.children[2];
     if(left){left.textContent='♧';left.setAttribute('aria-label','התראות')}
     if(right){right.textContent='';right.style.pointerEvents='none'}
   }
 }
}
const obs=new MutationObserver(()=>polishDashboard());
obs.observe(document.documentElement,{childList:true,subtree:true});
polishDashboard();
})();