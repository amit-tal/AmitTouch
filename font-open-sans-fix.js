(function(){
'use strict';
const ID='amit-open-sans-fix-v2';
document.getElementById(ID)?.remove();
const style=document.createElement('style');
style.id=ID;
style.textContent=`
@font-face{font-family:'OpenSansHebrew';src:url('/assets/opensanshebrew-light-webfont.woff') format('woff');font-weight:300;font-style:normal;font-display:swap}
@font-face{font-family:'OpenSansHebrew';src:url('/assets/opensanshebrew-regular-webfont.woff') format('woff');font-weight:400;font-style:normal;font-display:swap}
@font-face{font-family:'OpenSansHebrew';src:url('/assets/opensanshebrew-bold-webfont.woff') format('woff');font-weight:700;font-style:normal;font-display:swap}
@font-face{font-family:'OpenSansHebrew';src:url('/assets/opensanshebrew-extrabold-webfont.woff') format('woff');font-weight:800;font-style:normal;font-display:swap}
@font-face{font-family:'OpenSansHebrew';src:url('/assets/opensanshebrew-lightitalic-webfont.woff') format('woff');font-weight:300;font-style:italic;font-display:swap}
@font-face{font-family:'OpenSansHebrew';src:url('/assets/opensanshebrew-italic-webfont.woff') format('woff');font-weight:400;font-style:italic;font-display:swap}
@font-face{font-family:'OpenSansHebrew';src:url('/assets/opensanshebrew-bolditalic-webfont.woff') format('woff');font-weight:700;font-style:italic;font-display:swap}
@font-face{font-family:'OpenSansHebrew';src:url('/assets/opensanshebrew-extrabolditalic-webfont.woff') format('woff');font-weight:800;font-style:italic;font-display:swap}
html,body,button,input,textarea,select{font-family:'OpenSansHebrew',Arial,sans-serif!important;font-synthesis:none!important}
body{font-weight:400!important;letter-spacing:0!important;background:radial-gradient(circle at 12% 3%,rgba(255,255,255,.96),transparent 34%),radial-gradient(circle at 88% 30%,rgba(227,247,243,.72),transparent 30%),linear-gradient(160deg,#fffaf7,#f3ece5)!important}
#amitAdminRoot,#amitAdminRoot button,#amitAdminRoot input,#amitAdminRoot textarea,#amitAdminRoot select,#adminBody,#adminBody *:not(img):not(svg):not(path){font-family:'OpenSansHebrew',Arial,sans-serif!important;font-synthesis:none!important}
/* Open Sans Hebrew has only real 300, 400, 700 and 800 files. Normalize synthetic weights that looked too heavy. */
[style*='font-weight: 500'],[style*='font-weight:500']{font-weight:400!important}
[style*='font-weight: 550'],[style*='font-weight:550'],[style*='font-weight: 600'],[style*='font-weight:600'],[style*='font-weight: 650'],[style*='font-weight:650']{font-weight:700!important}
/* Preserve visual glyphs and icon containers. */
.field-icon,.ico,.art,.spark,.checkdot,.round,.heart,.toggle,.af-icon,.af-nav i,.ar-title-heart,.ar-cal-back,.ar-cal-more,.ar-cal-add,[class*='icon'],[class*='Icon']{font-family:Arial,'Segoe UI Symbol','Apple Symbols',sans-serif!important;font-synthesis:none!important}
.af-nav img,.af-icon img,img,svg{font-family:initial!important}
/* Restore spacing rhythm after font metric change. */
body.admin-session-active .af.ar-home-ref .af-title{font-weight:700!important;line-height:1.22!important}
body.admin-session-active .af.ar-home-ref .af-sub{font-weight:400!important;line-height:1.35!important}
body.admin-session-active .ar-home-stat b{font-weight:700!important;line-height:1.05!important}
body.admin-session-active .ar-home-stat span{font-weight:400!important;line-height:1.25!important}
body.admin-session-active .ar-next-copy strong{font-weight:700!important;line-height:1.22!important}
body.admin-session-active .ar-next-copy span,body.admin-session-active .ar-next-copy small{font-weight:400!important;line-height:1.35!important}
body.admin-session-active .ar-next-time{font-weight:700!important;line-height:1!important}
body.admin-session-active .ar-next-actions button{font-weight:400!important;line-height:1.1!important}
body.admin-session-active .ar-today-main,body.admin-session-active .ar-today-time{font-weight:400!important;line-height:1.25!important}
body.admin-session-active .ar-calendar-head h1{font-weight:700!important}
body.admin-session-active .ar-event strong{font-weight:700!important}
body.admin-session-active .ar-event span{font-weight:400!important}
`;
document.head.appendChild(style);
})();