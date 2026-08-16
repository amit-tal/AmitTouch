(function(){
  const home=document.getElementById('home');
  if(!home)return;
  const BUILD='20260816-home-hero-real-img-v12';
  document.getElementById('amit-home-hero-reference')?.remove();
  const style=document.createElement('style');
  style.id='amit-home-hero-reference';
  style.textContent=`
    #home .home-hero{position:relative!important;padding:0!important;margin:0!important;background:#fff9f5!important;overflow:visible!important}
    #home .hero-photo{position:relative!important;height:320px!important;margin:-4px -15px 10px!important;overflow:hidden!important;border:0!important;border-radius:0!important;background:#fff9f5!important;box-shadow:none!important}
    #home .hero-photo:before,#home .hero-photo:after{display:none!important;content:none!important}
    #home .hero-photo>img:not(.home-hero-art){display:none!important}
    #home .home-hero-art{display:block!important;position:absolute!important;z-index:1!important;right:-6px!important;bottom:-2px!important;width:91%!important;height:100%!important;max-width:none!important;object-fit:contain!important;object-position:right bottom!important;opacity:1!important;visibility:visible!important}
    #home .hero-copy{position:absolute!important;z-index:3!important;left:20px!important;right:auto!important;top:84px!important;bottom:auto!important;width:190px!important;text-align:center!important;direction:rtl!important;color:#07584f!important}
    #home .hero-copy:before,#home .hero-copy:after,#home .spark,#home .star,#home .stars,#home .sparkle,#home .sparkles,#home [class*='spark'],#home [class*='star']{display:none!important;content:none!important;visibility:hidden!important;opacity:0!important}
    #home .hero-greeting{display:flex!important;direction:rtl!important;align-items:baseline!important;justify-content:center!important;gap:5px!important;margin:0 0 14px!important;font-family:Inter,sans-serif!important;font-size:18px!important;line-height:1.25!important;font-weight:300!important;color:#07584f!important;white-space:nowrap!important}
    #home .hero-name,#home .hero-welcome{display:inline!important;margin:0!important;font:inherit!important;color:inherit!important}
    #home .hero-touch{display:block!important;margin:0!important;font-family:var(--hand,'GveretLevin',cursive)!important;font-size:31px!important;line-height:1.15!important;font-weight:100!important;font-synthesis:none!important;white-space:nowrap!important;color:#e7a19b!important}
    #home .home-heart{display:block!important;width:68px!important;height:68px!important;margin:20px auto 0!important;background:url('/assets/amit-touch-heart.svg?v=${BUILD}') center/contain no-repeat!important}
    #home .primary{position:relative!important;z-index:6!important;display:flex!important;align-items:center!important;justify-content:center!important;gap:18px!important;width:84%!important;height:64px!important;margin:-31px auto 27px!important;padding:0!important;border:1.5px solid rgba(255,255,255,.96)!important;border-radius:36px!important;background:linear-gradient(115deg,rgba(255,255,255,.35),rgba(241,197,185,.52) 45%,rgba(221,167,154,.48))!important;box-shadow:0 10px 24px rgba(172,111,96,.16),inset 0 1px 1px rgba(255,255,255,.96),inset 0 -1px 0 rgba(255,255,255,.28),inset 0 0 24px rgba(255,255,255,.22)!important;backdrop-filter:blur(22px) saturate(145%)!important;-webkit-backdrop-filter:blur(22px) saturate(145%)!important;color:#fff!important;font-family:Inter,sans-serif!important;font-size:20px!important;font-weight:300!important;overflow:hidden!important}
    #home .primary:before{content:''!important;position:absolute!important;inset:1px 2px 50% 2px!important;border-radius:34px 34px 50% 50%!important;background:linear-gradient(180deg,rgba(255,255,255,.45),rgba(255,255,255,0))!important;pointer-events:none!important}
    #home .primary>*{position:relative!important;z-index:1!important}
    #home .primary .home-book-icon{display:block!important;width:32px!important;height:32px!important;flex:0 0 32px!important;color:#fff!important;opacity:1!important}
    #home .primary .home-book-icon *{stroke:currentColor!important}
  `;
  document.head.appendChild(style);

  function firstName(){
    try{if(typeof user!=='undefined'&&user)return user.firstName||String(user.name||'').trim().split(/\s+/)[0]||''}catch(_){}
    try{const raw=localStorage.getItem('user')||localStorage.getItem('amitUser')||sessionStorage.getItem('user');if(raw){const u=JSON.parse(raw);return u.firstName||String(u.name||'').trim().split(/\s+/)[0]||''}}catch(_){}
    return '';
  }
  function ensureHeroImage(){
    const photo=home.querySelector('.hero-photo');
    if(!photo)return;
    let art=photo.querySelector('.home-hero-art');
    if(!art){art=document.createElement('img');art.className='home-hero-art';art.alt='';photo.prepend(art);}
    if(!art.dataset.ready){
      art.dataset.ready='1';
      art.onerror=function(){if(!this.dataset.fallback){this.dataset.fallback='1';this.src='/assets/home-hero-final.webp?v='+BUILD;}};
    }
    art.src='/assets/home-hero-transparent.webp?v='+BUILD;
  }
  function refresh(){
    ensureHeroImage();
    const copy=home.querySelector('.hero-copy');
    if(copy){
      const n=firstName();
      copy.innerHTML=`<span class="hero-greeting"><span class="hero-name">${n||'שם פרטי'}</span><span class="hero-welcome">ברוכה הבאה</span></span><strong class="hero-touch">לטאץ׳ שלך</strong><span class="home-heart" aria-hidden="true"></span>`;
    }
    const primary=home.querySelector('.primary');
    if(primary)primary.innerHTML=`<svg class="home-book-icon" viewBox="0 0 32 32" aria-hidden="true" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="4.5" y="6.5" width="23" height="21" rx="4" stroke="currentColor" stroke-width="2"/><path d="M10 4.5v5M22 4.5v5M5 12.5h22" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><circle cx="11" cy="17" r="1.5" fill="currentColor"/><circle cx="16" cy="17" r="1.5" fill="currentColor"/><circle cx="21" cy="17" r="1.5" fill="currentColor"/><circle cx="11" cy="22" r="1.5" fill="currentColor"/><circle cx="16" cy="22" r="1.5" fill="currentColor"/><circle cx="21" cy="22" r="1.5" fill="currentColor"/></svg><span>הזמיני תור</span>`;
  }
  refresh();
  new MutationObserver(()=>{if(home.classList.contains('active'))refresh()}).observe(home,{attributes:true,attributeFilter:['class']});
})();