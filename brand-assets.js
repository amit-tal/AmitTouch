(async function(){
  const splash=document.getElementById('splash');
  if(splash) splash.style.visibility='hidden';
  document.querySelectorAll('img.logo,img.splash-logo').forEach(img=>{img.src='/assets/amit-touch-logo.svg?v=6';});

  async function join(parts){
    const texts=await Promise.all(parts.map(p=>fetch(p,{cache:'force-cache'}).then(r=>{if(!r.ok)throw new Error('asset '+p);return r.text();})));
    return texts.join('').replace(/\s+/g,'');
  }
  function base64BlobUrl(b64,type){
    const bin=atob(b64);const bytes=new Uint8Array(bin.length);for(let i=0;i<bin.length;i++)bytes[i]=bin.charCodeAt(i);return URL.createObjectURL(new Blob([bytes],{type}));
  }
  try{
    const [img64,font64]=await Promise.all([
      join(['/assets/splash.part0.b64','/assets/splash.part1.b64','/assets/splash.part2.b64','/assets/splash.part3.b64','/assets/splash.part4.b64']),
      join(['/assets/handwriting.part0.b64','/assets/handwriting.part1.b64','/assets/handwriting.part2.b64','/assets/handwriting.part3.b64'])
    ]);
    const imgUrl=base64BlobUrl(img64,'image/webp');
    const fontUrl=base64BlobUrl(font64,'font/woff2');
    const style=document.createElement('style');
    style.textContent=`@font-face{font-family:'GveretLevin';src:url('${fontUrl}') format('woff2');font-weight:400;font-style:normal;font-display:swap}
    :root{--hand:'GveretLevin',cursive}
    .splash{background:#fbf5ef url('${imgUrl}') center/cover no-repeat!important;visibility:visible!important}
    .splash-inner{position:relative!important;width:min(430px,100%)!important;height:100%!important;padding:0!important}
    .splash-logo{display:block!important;position:absolute!important;top:22.1%!important;left:50%!important;transform:translateX(-50%)!important;width:min(258px,60vw)!important;max-width:none!important;margin:0!important;height:auto!important}
    .splash-tag{display:block!important;position:absolute!important;top:54.7%!important;left:50%!important;transform:translateX(-50%)!important;width:82%!important;margin:0!important;font-family:var(--hand)!important;font-size:27px!important;line-height:1.12!important;color:#285f5a!important;letter-spacing:0!important;text-align:center!important;white-space:normal!important}
    .splash-heart{display:block!important;position:absolute!important;top:66.5%!important;left:50%!important;transform:translateX(-50%)!important;width:38px!important;height:42px!important;margin:0!important;font-size:0!important;color:transparent!important;background:url('/assets/amit-touch-heart.svg?v=3') center/contain no-repeat!important}
    .brush-stroke,.brush-handle{display:none!important}
    .handwriting,.hero-copy strong,.confirm .heart{font-family:var(--hand)!important;font-weight:400!important;letter-spacing:0!important}
    .hero-copy strong{font-size:25px!important;line-height:1.05!important}
    .confirm .heart{font-size:24px!important;line-height:1.15!important}`;
    document.head.appendChild(style);

    const tag=document.querySelector('.splash-tag');
    if(tag) tag.innerHTML='הטאץ׳ הקטן שעושה<br>את כל ההבדל';
    document.querySelectorAll('img.logo,img.splash-logo').forEach(img=>{img.src='/assets/amit-touch-logo.svg?v=6';});
    document.querySelectorAll('[data-handwriting]').forEach(el=>el.classList.add('handwriting'));
    window.AMIT_TOUCH_HANDWRITING_FONT='GveretLevin';
    if(splash) splash.style.visibility='visible';
  }catch(e){
    console.error('AMIT TOUCH brand assets failed',e);
    if(splash) splash.style.visibility='visible';
  }
})();