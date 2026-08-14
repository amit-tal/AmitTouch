(async function(){
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
    .splash{background:#fbf5ef url('${imgUrl}') center/cover no-repeat!important}
    .splash-inner{padding:14vh 22px 40px!important}
    .splash-logo{display:block!important;width:min(340px,86vw)!important;margin:6.5vh auto 0!important}
    .splash-tag{display:block!important;font-family:var(--hand)!important;font-size:30px!important;line-height:1.18!important;color:#285f5a!important;margin-top:25px!important;letter-spacing:0!important}
    .splash-heart{display:block!important;font-family:var(--hand)!important;font-size:31px!important;color:#df8f83!important;margin-top:8px!important}
    .brush-stroke,.brush-handle{display:none!important}
    .handwriting,.hero-copy strong,.confirm .heart{font-family:var(--hand)!important;font-weight:400!important;letter-spacing:0!important}
    .hero-copy strong{font-size:25px!important;line-height:1.05!important}
    .confirm .heart{font-size:24px!important;line-height:1.15!important}`;
    document.head.appendChild(style);
    document.querySelectorAll('[data-handwriting]').forEach(el=>el.classList.add('handwriting'));
    window.AMIT_TOUCH_HANDWRITING_FONT='GveretLevin';
  }catch(e){console.error('AMIT TOUCH brand assets failed',e)}
})();