(function(){
'use strict';
const ID='amit-final-open-sans-runtime';
const CSS=`
@font-face{font-family:'OpenSansHebrew';src:url('/assets/opensanshebrew-light-webfont.woff') format('woff');font-weight:300;font-style:normal;font-display:swap}
@font-face{font-family:'OpenSansHebrew';src:url('/assets/opensanshebrew-regular-webfont.woff') format('woff');font-weight:400 500;font-style:normal;font-display:swap}
@font-face{font-family:'OpenSansHebrew';src:url('/assets/opensanshebrew-bold-webfont.woff') format('woff');font-weight:600 700;font-style:normal;font-display:swap}
@font-face{font-family:'OpenSansHebrew';src:url('/assets/opensanshebrew-extrabold-webfont.woff') format('woff');font-weight:800 900;font-style:normal;font-display:swap}
@font-face{font-family:'OpenSansHebrew';src:url('/assets/opensanshebrew-lightitalic-webfont.woff') format('woff');font-weight:300;font-style:italic;font-display:swap}
@font-face{font-family:'OpenSansHebrew';src:url('/assets/opensanshebrew-italic-webfont.woff') format('woff');font-weight:400 500;font-style:italic;font-display:swap}
@font-face{font-family:'OpenSansHebrew';src:url('/assets/opensanshebrew-bolditalic-webfont.woff') format('woff');font-weight:600 700;font-style:italic;font-display:swap}
@font-face{font-family:'OpenSansHebrew';src:url('/assets/opensanshebrew-extrabolditalic-webfont.woff') format('woff');font-weight:800 900;font-style:italic;font-display:swap}
html,body,button,input,textarea,select,
#amitAdminRoot,#amitAdminRoot button,#amitAdminRoot input,#amitAdminRoot textarea,#amitAdminRoot select,
#adminBody,#adminBody *:not(img):not(svg):not(path):not(.field-icon):not(.ico):not(.art):not(.spark):not(.checkdot):not(.round):not(.heart):not(.toggle):not(.af-icon):not(i){font-family:'OpenSansHebrew',Arial,sans-serif!important;font-synthesis:none!important}
.field-icon,.ico,.art,.spark,.checkdot,.round,.heart,.toggle,.af-icon,.af-nav i,[class*='icon'],[class*='Icon']{font-family:Arial,'Segoe UI Symbol','Apple Symbols',sans-serif!important}
img,svg,path{font-family:initial!important}
`;
function apply(){
 let style=document.getElementById(ID);
 if(!style){style=document.createElement('style');style.id=ID;style.textContent=CSS}
 if(style.parentNode)style.parentNode.removeChild(style);
 document.head.appendChild(style);
}
apply();
let runs=0;
const timer=setInterval(()=>{apply();if(++runs>=20)clearInterval(timer)},400);
new MutationObserver(()=>apply()).observe(document.documentElement,{childList:true,subtree:true});
})();
