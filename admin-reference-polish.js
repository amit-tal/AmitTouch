(function(){
'use strict';
const old=document.getElementById('admin-reference-polish-v1');if(old)old.remove();
const style=document.createElement('style');
style.id='admin-reference-polish-v2';
style.textContent=`
:root{--ar-green:#1f5b54;--ar-green-dark:#174b46;--ar-cream:#fbf5ef;--ar-pink:#f3ddd6;--ar-pink-2:#f7e9e4;--ar-muted:#8a928f;--ar-glass:rgba(255,255,255,.62);--ar-border:rgba(255,255,255,.92);--ar-shadow:0 14px 38px rgba(73,78,75,.08)}
body.admin-session-active{background:radial-gradient(circle at 88% 8%,rgba(219,240,233,.62),transparent 30%),radial-gradient(circle at 8% 18%,rgba(246,220,211,.48),transparent 28%),linear-gradient(180deg,#fffaf6 0%,#f8f1ea 100%)!important;color:var(--ar-green-dark)!important}
body.admin-session-active #amitAdminRoot{background:transparent!important}
body.admin-session-active #amitAdminRoot #adminBody{width:min(404px,100%)!important;padding:calc(max(24px,env(safe-area-inset-top)) + 4px) 18px calc(120px + env(safe-area-inset-bottom))!important;background:transparent!important}
body.admin-session-active .af{padding-top:0!important;color:var(--ar-green-dark)!important;font-family:Inter,Arial,sans-serif!important}
body.admin-session-active .af-head{height:42px!important;grid-template-columns:40px 1fr 40px!important;margin:0 0 8px!important}
body.admin-session-active .af-head h1{font-size:15px!important;font-weight:650!important;color:var(--ar-green-dark)!important;letter-spacing:-.2px!important}
body.admin-session-active .af-icon{display:grid!important;place-items:center!important;width:36px!important;height:36px!important;border-radius:50%!important;background:rgba(255,255,255,.58)!important;border:1px solid rgba(255,255,255,.88)!important;box-shadow:0 8px 22px rgba(70,75,72,.06)!important;color:var(--ar-green)!important;font-size:17px!important;padding:0!important}
body.admin-session-active .af-title{font-size:24px!important;line-height:1.15!important;font-weight:650!important;margin:8px 2px 4px!important;color:var(--ar-green-dark)!important;letter-spacing:-.45px!important}
body.admin-session-active .af-sub{font-size:11px!important;line-height:1.4!important;color:var(--ar-muted)!important;margin:0 2px 18px!important}
body.admin-session-active .af-grid{gap:10px!important}
body.admin-session-active .af-card,
body.admin-session-active .af-row,
body.admin-session-active .af-menu button,
body.admin-session-active .af-input,
body.admin-session-active .af-select,
body.admin-session-active .af-textarea,
body.admin-session-active .af-drop{background:linear-gradient(145deg,rgba(255,255,255,.82),rgba(255,255,255,.46))!important;border:1px solid var(--ar-border)!important;box-shadow:var(--ar-shadow),inset 0 1px 0 rgba(255,255,255,.98)!important;backdrop-filter:blur(26px) saturate(135%)!important;-webkit-backdrop-filter:blur(26px) saturate(135%)!important}
body.admin-session-active .af-card{border-radius:20px!important;padding:16px!important}
body.admin-session-active .af-stat{min-height:84px!important;display:flex!important;flex-direction:column!important;justify-content:center!important;align-items:center!important;text-align:center!important;padding:13px 10px!important}
body.admin-session-active .af-stat b{font-size:24px!important;font-weight:650!important;line-height:1!important;color:var(--ar-green-dark)!important;margin-bottom:8px!important}
body.admin-session-active .af-stat span{font-size:10px!important;color:#808b87!important;line-height:1.2!important}
body.admin-session-active .af-section{font-size:14px!important;font-weight:700!important;margin:24px 3px 10px!important;color:var(--ar-green-dark)!important}
body.admin-session-active .af-list{gap:10px!important}
body.admin-session-active .af-row{border-radius:18px!important;padding:14px 15px!important;min-height:66px!important}
body.admin-session-active .af-row h3{font-size:13px!important;font-weight:650!important;margin:0 0 5px!important;color:var(--ar-green-dark)!important}
body.admin-session-active .af-row p{font-size:10px!important;line-height:1.5!important;color:#858e8b!important;margin:0!important}
body.admin-session-active .af-note{font-size:10.5px!important;line-height:1.6!important;color:#858e8b!important}
body.admin-session-active .af-badge{font-size:8.5px!important;font-weight:650!important;padding:6px 9px!important;border-radius:99px!important;background:#e8f4f0!important;color:#2f6c65!important}
body.admin-session-active .af-badge.pending{background:#fff0d9!important;color:#9b6b2e!important}
body.admin-session-active .af-badge.cancelled{background:#fbeae6!important;color:#a46159!important}
body.admin-session-active .af-actions{gap:7px!important;margin-top:13px!important}
body.admin-session-active .af-actions button{min-height:38px!important;border-radius:12px!important;padding:9px 6px!important;font-size:9px!important;font-weight:600!important;color:var(--ar-green-dark)!important;background:rgba(255,255,255,.7)!important;border:1px solid rgba(55,86,80,.08)!important;box-shadow:0 5px 14px rgba(63,69,66,.04)!important}
body.admin-session-active .af-actions .primary{background:linear-gradient(135deg,#2f6e67,#1c554f)!important;color:#fff!important;border-color:transparent!important}
body.admin-session-active .af-btn{min-height:48px!important;border-radius:15px!important;background:linear-gradient(135deg,#2f6f68,#1c554f)!important;color:#fff!important;box-shadow:0 10px 25px rgba(27,83,76,.16)!important;font-size:11px!important;font-weight:700!important}
body.admin-session-active .af-tabs{gap:7px!important;padding:2px 0 11px!important;scrollbar-width:none!important}
body.admin-session-active .af-tabs::-webkit-scrollbar{display:none!important}
body.admin-session-active .af-tab{min-height:32px!important;padding:8px 14px!important;border-radius:18px!important;font-size:9px!important;font-weight:600!important;color:#6f7b78!important;background:rgba(255,255,255,.68)!important;border:1px solid rgba(255,255,255,.9)!important;box-shadow:0 5px 16px rgba(66,71,68,.04)!important}
body.admin-session-active .af-tab.on{background:linear-gradient(145deg,#f2d8d1,#f7e9e5)!important;color:#8f625b!important;border-color:rgba(255,255,255,.92)!important}
body.admin-session-active .af-input,
body.admin-session-active .af-select,
body.admin-session-active .af-textarea{border-radius:14px!important;padding:12px 14px!important;font-size:10.5px!important;color:var(--ar-green-dark)!important;margin:5px 0 10px!important;outline:none!important}
body.admin-session-active .af-menu{gap:9px!important}
body.admin-session-active .af-menu button{border-radius:16px!important;padding:15px 16px!important;font-size:10.5px!important;color:var(--ar-green-dark)!important}
body.admin-session-active .af-gallery{gap:10px!important}
body.admin-session-active .af-photo{border-radius:18px!important;box-shadow:var(--ar-shadow)!important}
body.admin-session-active .af-drop{border-radius:18px!important;border:1px dashed rgba(88,103,98,.24)!important;padding:30px 12px!important;color:#8c9290!important;font-size:10px!important}
body.admin-session-active .af-switch{width:36px!important;height:21px!important;border-radius:99px!important;background:#d9dedb!important}
body.admin-session-active .af-switch:after{width:17px!important;height:17px!important}
body.admin-session-active .af-switch.on{background:var(--ar-green)!important}
body.admin-session-active .af-switch.on:after{right:17px!important}
body.admin-session-active .af-nav{width:min(378px,calc(100% - 24px))!important;height:72px!important;bottom:max(12px,env(safe-area-inset-bottom))!important;border-radius:29px!important;padding:7px 8px!important;background:linear-gradient(145deg,rgba(255,255,255,.82),rgba(255,255,255,.56))!important;border:1px solid rgba(255,255,255,.96)!important;box-shadow:0 16px 38px rgba(72,73,69,.14),inset 0 1px rgba(255,255,255,.98)!important;backdrop-filter:blur(28px) saturate(145%)!important;-webkit-backdrop-filter:blur(28px) saturate(145%)!important}
body.admin-session-active .af-nav button{font-size:8.5px!important;color:#5e7470!important;border-radius:20px!important;padding:6px 2px!important;position:relative!important;transition:.2s ease!important}
body.admin-session-active .af-nav i{font-size:18px!important;line-height:1!important;margin-bottom:6px!important;color:#315f59!important}
body.admin-session-active .af-nav button.on{background:transparent!important;color:#93645e!important}
body.admin-session-active .af-nav button.on i{color:#93645e!important}
body.admin-session-active .af-nav .home{transform:translateY(-12px)!important;min-height:62px!important;border-radius:22px!important;background:linear-gradient(145deg,rgba(247,226,220,.98),rgba(255,247,244,.96))!important;border:1px solid rgba(255,255,255,.96)!important;box-shadow:0 10px 24px rgba(126,91,84,.13),inset 0 1px rgba(255,255,255,.98)!important}
body.admin-session-active .af-nav .home.on{background:linear-gradient(145deg,#efd5ce,#f8e8e3)!important}
body.admin-session-active .af-bottomspace{height:96px!important}
@media(max-width:370px){body.admin-session-active #amitAdminRoot #adminBody{padding-left:12px!important;padding-right:12px!important}.af-nav{width:calc(100% - 18px)!important}}
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
     const left=head.children[0],right=head.children[2];
     if(left){left.textContent='♡';left.setAttribute('aria-label','התראות')}
     if(right){right.textContent='';right.style.pointerEvents='none';right.style.opacity='0'}
   }
 }
}
const obs=new MutationObserver(polishDashboard);
obs.observe(document.documentElement,{childList:true,subtree:true});
polishDashboard();
})();