(function(){
'use strict';
const ID='amit-final-open-sans-runtime';
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
html,body,button,input,textarea,select,
#login,#login *:not(img):not(svg):not(path):not(.field-icon):not(.heart):not(.spark):not(.round),
#register,#register *:not(img):not(svg):not(path):not(.field-icon):not(.heart):not(.spark):not(.round),
#amitAdminRoot,#amitAdminRoot button,#amitAdminRoot input,#amitAdminRoot textarea,#amitAdminRoot select,
#adminBody,#adminBody *:not(img):not(svg):not(path):not(.field-icon):not(.ico):not(.art):not(.spark):not(.checkdot):not(.round):not(.heart):not(.toggle):not(.af-icon):not(i){font-family:'OpenSansHebrew',Arial,sans-serif!important;font-synthesis:none!important}
#login h1,#login p,#login .field,#login .field::placeholder,#login .primary,#login .divider,#login .secure,#login .auth-link,#login .auth-link button,
#register h1,#register p,#register .field,#register .field::placeholder,#register .field-label,#register .dob-copy b,#register .dob-copy span,#register .primary,#register .divider,#register .secure,#register .auth-link,#register .auth-link button{font-family:'OpenSansHebrew',Arial,sans-serif!important;font-synthesis:none!important}
#login h1,#login p.subtitle,#login .field,#login .field::placeholder,#login .primary,#login .divider,#login .secure,#login .auth-link,
#register h1,#register p.subtitle,#register .field,#register .field::placeholder,#register .dob-copy span,#register .primary,#register .divider,#register .secure,#register .auth-link{font-weight:300!important}
#login .auth-link button,#register .auth-link button,#register .field-label,#register .dob-copy b{font-weight:400!important}
.field-icon,.ico,.art,.spark,.checkdot,.round,.heart,.toggle,.af-icon,.af-nav i,[class*='icon'],[class*='Icon']{font-family:Arial,'Segoe UI Symbol','Apple Symbols',sans-serif!important}
img,svg,path{font-family:initial!important}
`;
document.head.appendChild(style);
})();
