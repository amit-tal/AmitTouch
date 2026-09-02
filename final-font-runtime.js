(function(){
'use strict';
const ID='amit-final-open-sans-runtime';
document.getElementById(ID)?.remove();
const style=document.createElement('style');
style.id=ID;
style.textContent=`
:root{--hand:'GveretLevin',cursive}
@font-face{font-family:'OpenSansHebrew';src:url('/assets/opensanshebrew-light-webfont.woff') format('woff');font-weight:300;font-style:normal;font-display:swap}
@font-face{font-family:'OpenSansHebrew';src:url('/assets/opensanshebrew-regular-webfont.woff') format('woff');font-weight:400;font-style:normal;font-display:swap}
@font-face{font-family:'OpenSansHebrew';src:url('/assets/opensanshebrew-bold-webfont.woff') format('woff');font-weight:700;font-style:normal;font-display:swap}
@font-face{font-family:'OpenSansHebrew';src:url('/assets/opensanshebrew-extrabold-webfont.woff') format('woff');font-weight:800;font-style:normal;font-display:swap}
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
.hero-touch,.amit-boot-copy,.amit-handwriting,[data-handwriting='1']{font-family:'GveretLevin',cursive!important;font-synthesis:none!important}
#login .secure:before,#register .secure:before{content:''!important;display:block!important;position:absolute!important;right:0!important;top:50%!important;transform:translateY(-50%)!important;width:17px!important;height:17px!important;background-image:url('/assets/%D7%9E%D7%A0%D7%A2%D7%95%D7%9C.png?v=20260902-lock-final')!important;background-position:center!important;background-repeat:no-repeat!important;background-size:contain!important;opacity:1!important;visibility:visible!important}
.field-icon,.ico,.art,.spark,.checkdot,.round,.heart,.toggle,.af-icon,.af-nav i,[class*='icon'],[class*='Icon']{font-family:Arial,'Segoe UI Symbol','Apple Symbols',sans-serif!important}
img,svg,path{font-family:initial!important}
`;
document.head.appendChild(style);
async function loadHandwriting(){
 try{
  const parts=await Promise.all([0,1,2,3].map(i=>fetch('/assets/handwriting.part'+i+'.b64?v=20260902-hand-final',{cache:'no-store'}).then(r=>{if(!r.ok)throw new Error('HAND_PART_'+i);return r.text()})));
  const data=parts.join('').replace(/\s+/g,'');
  if(!data)return;
  const face=new FontFace('GveretLevin',`url(data:font/woff2;base64,${data}) format('woff2')`);
  await face.load();
  document.fonts.add(face);
  document.documentElement.style.setProperty('--hand',"'GveretLevin',cursive");
 }catch(e){console.warn('Handwriting font load failed',e)}
}
loadHandwriting();
})();
