(function(){
 const id='amit-auth-visual-fix';document.getElementById(id)?.remove();
 const logo='/assets/amitouch_logo_vector.png?v=20260820-auth-unified';
 const heart='/assets/amit-touch-heart.svg?v=20260820-auth-heart';
 const s=document.createElement('style');s.id=id;s.textContent=`
 #login .logo,#register .logo{display:block!important;width:min(248px,66vw)!important;height:auto!important;max-height:24vh!important;object-fit:contain!important;object-position:center!important;margin:4.1vh auto 0!important;background:transparent!important;border:0!important;box-shadow:none!important}
 #login h1,#register h1{margin-top:1.75vh!important}
 #login h1 .heart,#register h1 .heart{display:inline-block!important;width:26px!important;height:26px!important;min-width:26px!important;background-image:url('${heart}')!important;background-position:center!important;background-repeat:no-repeat!important;background-size:contain!important;font-size:0!important;color:transparent!important;overflow:hidden!important}
 #login h1 .heart::before,#login h1 .heart::after,#register h1 .heart::before,#register h1 .heart::after{content:none!important;display:none!important}
 @media(max-height:820px){#login .logo,#register .logo{width:min(225px,62vw)!important;margin-top:2.8vh!important;max-height:21vh!important}#login h1,#register h1{margin-top:1.25vh!important}}
 @media(max-height:700px){#login .logo,#register .logo{width:min(205px,58vw)!important;margin-top:1.8vh!important;max-height:19vh!important}#login h1,#register h1{margin-top:.9vh!important}}
 `;document.head.appendChild(s);
 function fix(){document.querySelectorAll('#login img.logo,#register img.logo').forEach(img=>{img.src=logo;img.style.background='transparent';});document.querySelectorAll('#login h1 .heart,#register h1 .heart').forEach(el=>{el.textContent='';el.innerHTML='';});}
 fix();new MutationObserver(fix).observe(document.body,{childList:true,subtree:true});
})();