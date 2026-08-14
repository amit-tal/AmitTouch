(async function(){
  const splash=document.getElementById('splash');
  if(!splash)return;

  splash.classList.remove('brand-ready','brand-done','hide');
  splash.classList.add('brand-loading');
  splash.style.opacity='0';
  splash.style.visibility='hidden';

  const guard=document.createElement('style');
  guard.id='amit-touch-splash-guard';
  guard.textContent=`
    #splash.brand-loading{opacity:0!important;visibility:hidden!important;pointer-events:none!important}
    #splash.brand-ready,#splash.brand-ready.hide:not(.brand-done){opacity:1!important;visibility:visible!important;pointer-events:auto!important}
    #splash.brand-done,#splash.brand-done.hide{opacity:0!important;visibility:hidden!important;pointer-events:none!important}
  `;
  document.head.appendChild(guard);

  async function join(parts){
    const texts=await Promise.all(parts.map(p=>fetch(p,{cache:'force-cache'}).then(r=>{if(!r.ok)throw new Error('asset '+p);return r.text();})));
    return texts.join('').replace(/\s+/g,'');
  }
  function base64BlobUrl(b64,type){
    const bin=atob(b64);
    const bytes=new Uint8Array(bin.length);
    for(let i=0;i<bin.length;i++)bytes[i]=bin.charCodeAt(i);
    return URL.createObjectURL(new Blob([bytes],{type}));
  }

  try{
    const [img64,font64]=await Promise.all([
      join(['/assets/splash.part0.b64','/assets/splash.part1.b64','/assets/splash.part2.b64','/assets/splash.part3.b64','/assets/splash.part4.b64']),
      join(['/assets/handwriting.part0.b64','/assets/handwriting.part1.b64','/assets/handwriting.part2.b64','/assets/handwriting.part3.b64'])
    ]);

    const imgUrl=base64BlobUrl(img64,'image/webp');
    const fontUrl=base64BlobUrl(font64,'font/woff2');
    const logoUrl='/assets/amit-touch-logo.svg?v=20260814-4';
    const heartUrl='/assets/amit-touch-heart.svg?v=20260814-4';

    await Promise.all([
      new Promise(resolve=>{const i=new Image();i.onload=i.onerror=resolve;i.src=logoUrl;}),
      new Promise(resolve=>{const i=new Image();i.onload=i.onerror=resolve;i.src=heartUrl;}),
      new Promise(resolve=>{const i=new Image();i.onload=i.onerror=resolve;i.src=imgUrl;})
    ]);

    document.querySelectorAll('img.logo, img.splash-logo').forEach(el=>{el.src=logoUrl;});

    const oldHeart=splash.querySelector('.splash-heart');
    if(oldHeart){
      oldHeart.innerHTML='';
      const heart=document.createElement('img');
      heart.src=heartUrl;
      heart.alt='';
      heart.className='splash-heart-image';
      oldHeart.appendChild(heart);
    }

    const tag=splash.querySelector('.splash-tag');
    if(tag)tag.innerHTML='הטאץ׳ הקטן שעושה<br>את כל ההבדל';

    const style=document.createElement('style');
    style.id='amit-touch-brand-style';
    style.textContent=`
      @font-face{font-family:'GveretLevin';src:url('${fontUrl}') format('woff2');font-weight:100 400;font-style:normal;font-display:block}
      :root{--hand:'GveretLevin',cursive}
      #splash{background:#fbf5ef url('${imgUrl}') center/cover no-repeat!important;transition:opacity .5s ease,visibility .5s ease!important}
      #splash .splash-inner{width:min(430px,100%)!important;height:100%!important;padding:0 22px!important;display:flex!important;flex-direction:column!important;align-items:center!important;position:relative!important;text-align:center!important}
      #splash .splash-logo{display:block!important;width:min(335px,84vw)!important;max-height:43vh!important;object-fit:contain!important;margin:12.5vh auto 0!important;flex:0 0 auto!important}
      #splash .splash-tag{display:block!important;font-family:var(--hand)!important;font-size:25px!important;line-height:1.55!important;color:#285f5a!important;margin:36px 0 0!important;letter-spacing:0!important;font-weight:100!important;direction:rtl!important}
      #splash .splash-heart{display:block!important;width:42px!important;height:42px!important;margin:20px auto 0!important;line-height:1!important}
      #splash .splash-heart-image{display:block!important;width:100%!important;height:100%!important;object-fit:contain!important}
      #splash .brush-stroke,#splash .brush-handle{display:none!important}
      .handwriting,.hero-copy strong,.confirm .heart{font-family:var(--hand)!important;font-weight:100!important;letter-spacing:0!important}
      .hero-copy strong{font-size:25px!important;line-height:1.25!important}
      .confirm .heart{font-size:24px!important;line-height:1.25!important}
    `;
    document.head.appendChild(style);

    if(document.fonts&&document.fonts.load){
      try{await document.fonts.load("100 25px 'GveretLevin'");}catch(_){}
    }

    document.querySelectorAll('[data-handwriting]').forEach(el=>el.classList.add('handwriting'));
    window.AMIT_TOUCH_HANDWRITING_FONT='GveretLevin';

    splash.classList.remove('brand-loading','hide');
    splash.classList.add('brand-ready');
    splash.style.visibility='visible';
    splash.style.opacity='1';

    window.clearTimeout(window.__amitTouchSplashTimer);
    window.__amitTouchSplashTimer=window.setTimeout(()=>{
      splash.classList.add('brand-done','hide');
    },5000);
  }catch(e){
    console.error('AMIT TOUCH brand assets failed',e);
    splash.classList.remove('brand-loading','hide');
    splash.classList.add('brand-ready');
    splash.style.visibility='visible';
    splash.style.opacity='1';
    window.clearTimeout(window.__amitTouchSplashTimer);
    window.__amitTouchSplashTimer=window.setTimeout(()=>splash.classList.add('brand-done','hide'),5000);
  }
})();