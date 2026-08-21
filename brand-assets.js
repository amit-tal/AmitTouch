(function(){
  if(window.__AMIT_TOUCH_SPLASH_CONTROLLER__)return;
  window.__AMIT_TOUCH_SPLASH_CONTROLLER__=true;

  const splashCopy=document.querySelector('#amit-boot-splash .amit-boot-copy');
  if(splashCopy){
    splashCopy.style.setProperty('visibility','hidden','important');
    splashCopy.querySelectorAll('.amit-boot-line').forEach(el=>el.style.setProperty('visibility','hidden','important'));
  }

  const style=document.createElement('style');
  style.id='amit-touch-brand-style';
  style.textContent=`
    :root{--hand:'GveretLevin',cursive;--ui-font:'Inter',Arial,sans-serif}
    html,body,body *,button,input,select,textarea,option,optgroup,label,a,p,span,div,h1,h2,h3,h4,h5,h6,strong,b,small,nav,section,header,footer{font-family:var(--ui-font)!important}
    body *::before,body *::after{font-family:var(--ui-font)!important}
    body :is(button,input,select,textarea,option,optgroup,label,a,p,span,h1,h2,h3,h4,h5,h6,strong,b,small,li,td,th,time){font-size:max(16px,1em)}
    .handwriting,.handwriting *,[data-handwriting],[data-handwriting] *,.hero-copy strong,.confirm .heart{font-family:var(--hand)!important;font-weight:100!important;font-variation-settings:'wght' 100!important;font-style:normal!important;font-synthesis:none!important;letter-spacing:0!important}
    .handwriting::before,.handwriting::after,[data-handwriting]::before,[data-handwriting]::after,.hero-copy strong::before,.hero-copy strong::after,.confirm .heart::before,.confirm .heart::after{font-family:var(--hand)!important}
    .hero-copy strong{font-size:25px!important;line-height:1.25!important}
    .confirm .heart{font-size:24px!important;line-height:1.25!important}
    #amit-boot-splash .amit-boot-copy,#amit-boot-splash .amit-boot-line{font-family:'GveretLevin',cursive!important;font-weight:100!important;font-variation-settings:'wght' 100!important;font-style:normal!important;font-synthesis:none!important}
  `;
  document.head.appendChild(style);
  document.querySelectorAll('[data-handwriting]').forEach(el=>el.classList.add('handwriting'));
  window.AMIT_TOUCH_HANDWRITING_FONT='GveretLevin';

  window.__AMIT_HANDWRITING_READY__=(async function(){
    try{
      const paths=['/assets/handwriting.part0.b64','/assets/handwriting.part1.b64','/assets/handwriting.part2.b64','/assets/handwriting.part3.b64'];
      const parts=await Promise.all(paths.map(path=>fetch(path,{cache:'force-cache'}).then(r=>r.ok?r.text():Promise.reject(new Error('font part')))));
      const base64=parts.join('').replace(/\s+/g,'');
      const face=new FontFace('GveretLevin',`url(data:font/woff2;base64,${base64}) format('woff2')`,{weight:'100 900',style:'normal',display:'block'});
      document.fonts.add(face);
      await face.load();
      await document.fonts.load('100 25px GveretLevin','הטאץ׳ הקטן שעושה את כל ההבדל');
      document.documentElement.classList.add('amit-handwriting-ready');
      const copy=document.querySelector('#amit-boot-splash .amit-boot-copy');
      if(copy){
        copy.style.setProperty('font-family','GveretLevin, cursive','important');
        copy.style.setProperty('font-weight','100','important');
        copy.style.setProperty('font-variation-settings',"'wght' 100",'important');
        copy.style.setProperty('visibility','visible','important');
        copy.querySelectorAll('.amit-boot-line').forEach(el=>{
          el.style.setProperty('font-family','GveretLevin, cursive','important');
          el.style.setProperty('font-weight','100','important');
          el.style.setProperty('font-variation-settings',"'wght' 100",'important');
          el.style.setProperty('visibility','visible','important');
        });
      }
      return true;
    }catch(e){
      console.warn('Handwriting font could not be restored',e);
      const copy=document.querySelector('#amit-boot-splash .amit-boot-copy');
      if(copy){copy.style.setProperty('visibility','visible','important');copy.querySelectorAll('.amit-boot-line').forEach(el=>el.style.setProperty('visibility','visible','important'));}
      return false;
    }
  })();

  window.__AMIT_HANDWRITING_READY__.finally(()=>{
    window.__AMIT_BRAND_READY__=true;
    window.dispatchEvent(new CustomEvent('amit:splash-ready'));
  });
})();