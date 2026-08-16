(function(){
  const home=document.getElementById('home');
  if(!home)return;
  const BUILD='20260816-home-hero-reference-v9';
  document.getElementById('amit-home-hero-reference')?.remove();
  const style=document.createElement('style');
  style.id='amit-home-hero-reference';
  style.textContent=`
    #home .home-hero{position:relative!important;padding:0!important;margin:0!important;background:#fff9f5!important;overflow:visible!important}
    #home .hero-photo{position:relative!important;height:304px!important;margin:-4px -15px 10px!important;overflow:hidden!important;border:0!important;border-radius:0!important;background:#fff9f5!important;box-shadow:none!important}
    #home .hero-photo:before{content:''!important;display:block!important;position:absolute!important;z-index:1!important;right:-18px!important;bottom:-6px!important;width:86%!important;height:100%!important;background:url('/assets/home-hero-transparent.webp?v=${BUILD}') right bottom/contain no-repeat!important;opacity:1!important;visibility:visible!important}
    #home .hero-photo:after{display:none!important;content:none!important}
    #home .hero-copy{position:absolute!important;z-index:3!important;left:25px!important;right:auto!important;top:83px!important;bottom:auto!important;width:154px!important;text-align:right!important;direction:rtl!important;color:#07584f!important}
    #home .hero-copy:before,#home .hero-copy:after,#home .spark,#home .star,#home .stars,#home .sparkle,#home .sparkles,#home [class*='spark'],#home [class*='star']{display:none!important;content:none!important;visibility:hidden!important;opacity:0!important}
    #home .hero-name{display:block!important;margin:0 0 5px!important;font-family:Inter,sans-serif!important;font-size:19px!important;line-height:1.15!important;font-weight:400!important;color:#07584f!important}
    #home .hero-welcome{display:block!important;margin:0 0 7px!important;font-family:Inter,sans-serif!important;font-size:18px!important;line-height:1.2!important;font-weight:300!important;color:#07584f!important}
    #home .hero-touch{display:block!important;margin:0!important;font-family:var(--hand,'GveretLevin',cursive)!important;font-size:30px!important;line-height:1.05!important;font-weight:100!important;font-synthesis:none!important;white-space:nowrap!important;color:#e7a19b!important}
    #home .home-heart{display:block!important;width:25px!important;height:25px!important;margin:18px auto 0!important;background:url('/assets/amit-touch-heart.svg?v=${BUILD}') center/contain no-repeat!important}
    #home .primary{position:relative!important;z-index:6!important;display:flex!important;align-items:center!important;justify-content:center!important;gap:16px!important;width:84%!important;height:62px!important;margin:-28px auto 27px!important;padding:0!important;border:1.5px solid rgba(255,255,255,.98)!important;border-radius:34px!important;background:linear-gradient(90deg,rgba(246,215,207,.88),rgba(225,182,169,.84))!important;box-shadow:0 9px 20px rgba(180,118,101,.17),inset 0 1px 0 rgba(255,255,255,.96),inset 0 0 17px rgba(255,255,255,.34)!important;backdrop-filter:blur(18px) saturate(125%)!important;-webkit-backdrop-filter:blur(18px) saturate(125%)!important;color:#fff!important;font-family:Inter,sans-serif!important;font-size:20px!important;font-weight:300!important}
    #home .primary .home-book-icon{width:29px!important;height:29px!important;object-fit:contain!important;filter:brightness(0) invert(1)!important;opacity:1!important}
  `;
  document.head.appendChild(style);

  function firstName(){
    try{if(typeof user!=='undefined'&&user)return user.firstName||String(user.name||'').trim().split(/\s+/)[0]||''}catch(_){}
    try{const raw=localStorage.getItem('user')||localStorage.getItem('amitUser')||sessionStorage.getItem('user');if(raw){const u=JSON.parse(raw);return u.firstName||String(u.name||'').trim().split(/\s+/)[0]||''}}catch(_){}
    return '';
  }
  function refresh(){
    const copy=home.querySelector('.hero-copy');
    if(copy){
      const n=firstName();
      copy.innerHTML=`<span class="hero-name">${n||'שם פרטי'}</span><span class="hero-welcome">ברוכה הבאה</span><strong class="hero-touch">לטאץ׳ שלך</strong><span class="home-heart" aria-hidden="true"></span>`;
    }
    const primary=home.querySelector('.primary');
    if(primary)primary.innerHTML=`<img class="home-book-icon" src="/assets/home-nav-appointments.svg?v=${BUILD}" alt=""><span>הזמיני תור</span>`;
  }
  refresh();
  new MutationObserver(()=>{if(home.classList.contains('active'))refresh()}).observe(home,{attributes:true,attributeFilter:['class']});
})();