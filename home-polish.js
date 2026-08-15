(function(){
  const BUILD='20260815-home-approved-v1';
  const home=document.getElementById('home');
  if(!home)return;
  document.getElementById('amit-home-polish')?.remove();

  const style=document.createElement('style');
  style.id='amit-home-polish';
  style.textContent=`
  #home{padding:0 0 78px!important;margin:0!important;color:#1f5550!important;overflow:hidden!important}
  #home .top{height:44px!important;display:grid!important;grid-template-columns:36px 1fr 36px!important;align-items:center!important;padding:0 4px!important;margin:0!important;position:relative!important;z-index:6!important}
  #home .top b{font-size:0!important}
  #home .top .round{width:30px!important;height:30px!important;border:0!important;background:transparent!important;box-shadow:none!important;backdrop-filter:none!important;-webkit-backdrop-filter:none!important;font-size:0!important;background-repeat:no-repeat!important;background-position:center!important;background-size:23px 23px!important;padding:0!important}
  #home .top .round:first-child{background-image:url('/assets/home-icon-menu.svg?v=${BUILD}')!important}
  #home .top .round:last-child{background-image:url('/assets/home-icon-profile-top.svg?v=${BUILD}')!important}

  #home .home-hero{padding:0!important;margin:0!important;position:relative!important}
  #home .home-hero>.logo{display:block!important;width:126px!important;height:auto!important;max-width:46vw!important;margin:-30px auto 2px!important;position:relative!important;z-index:7!important;object-fit:contain!important}
  #home .hero-photo{height:166px!important;margin:0 -15px 7px!important;border:0!important;border-radius:0!important;box-shadow:none!important;position:relative!important;overflow:hidden!important;background:url('/assets/home-hero.png?v=${BUILD}') center 48%/cover no-repeat!important}
  #home .hero-photo:before{display:none!important}
  #home .hero-photo:after{content:''!important;position:absolute!important;inset:0!important;background:linear-gradient(90deg,rgba(251,246,239,.95) 0%,rgba(251,246,239,.68) 20%,rgba(251,246,239,.12) 47%,rgba(251,246,239,0) 62%)!important;pointer-events:none!important}
  #home .hero-copy{position:absolute!important;left:18px!important;right:auto!important;bottom:25px!important;width:116px!important;text-align:right!important;direction:rtl!important;color:#2b625d!important;z-index:3!important}
  #home .hero-copy small{display:block!important;margin:0 0 2px!important;color:#2b625d!important;font-size:10px!important;line-height:1.2!important;font-weight:300!important}
  #home .hero-copy strong{display:block!important;margin:0!important;color:#2b625d!important;font-family:var(--hand,'GveretLevin',cursive)!important;font-size:18px!important;line-height:1.12!important;font-weight:100!important;font-synthesis:none!important}
  #home .hero-copy .home-heart{display:block!important;width:18px!important;height:18px!important;margin:6px 3px 0 auto!important;background:url('/assets/amit-touch-heart.svg?v=${BUILD}') center/contain no-repeat!important}

  #home .primary{display:flex!important;align-items:center!important;justify-content:center!important;gap:7px!important;width:100%!important;height:45px!important;padding:0!important;margin:0!important;border:0!important;border-radius:8px!important;background:#2f6e68!important;color:#fff!important;font-size:14px!important;font-weight:500!important;box-shadow:0 4px 10px rgba(38,91,85,.17)!important}
  #home .primary .home-book-icon{width:17px!important;height:17px!important;display:block!important;object-fit:contain!important;filter:brightness(0) invert(1)!important}

  #home .section-title{display:flex!important;align-items:center!important;justify-content:center!important;gap:6px!important;margin:11px 0 6px!important;color:#315f5a!important;font-size:9.5px!important;line-height:1!important;font-weight:400!important;text-align:center!important}
  #home .section-title:before,#home .section-title:after{content:''!important;display:block!important;height:1px!important;flex:1!important;background:linear-gradient(90deg,transparent,rgba(47,113,107,.14),transparent)!important}

  #home .quick-grid{display:grid!important;grid-template-columns:repeat(4,minmax(0,1fr))!important;gap:4px!important;margin:0!important;direction:rtl!important}
  #home .quick{min-width:0!important;min-height:77px!important;padding:6px 2px 7px!important;border-radius:8px!important;border:1px solid rgba(224,214,204,.70)!important;background:rgba(255,255,255,.43)!important;box-shadow:0 2px 7px rgba(80,60,45,.04)!important;color:#275a55!important}
  #home .quick span{display:block!important;width:36px!important;height:38px!important;margin:0 auto 3px!important;font-size:0!important;background-position:center!important;background-repeat:no-repeat!important;background-size:contain!important}
  #home .quick:nth-child(1) span{background-image:url('/assets/home-service-design.svg?v=${BUILD}')!important}
  #home .quick:nth-child(2) span{background-image:url('/assets/home-service-gel.svg?v=${BUILD}')!important}
  #home .quick:nth-child(3) span{background-image:url('/assets/home-service-pedicure.svg?v=${BUILD}')!important}
  #home .quick:nth-child(4) span{background-image:url('/assets/home-service-manicure.svg?v=${BUILD}')!important}
  #home .quick b{display:block!important;font-size:8px!important;line-height:1.2!important;font-weight:500!important;color:#2d5b56!important;white-space:normal!important;text-align:center!important}

  #home .next-card{display:grid!important;grid-template-columns:32px 1fr 48px!important;align-items:center!important;gap:7px!important;min-height:61px!important;margin:0!important;padding:7px 9px!important;border-radius:8px!important;background:rgba(255,255,255,.47)!important;border:1px solid rgba(224,214,204,.68)!important;box-shadow:0 2px 7px rgba(80,60,45,.04)!important}
  #home .checkdot{width:27px!important;height:27px!important;border-radius:50%!important;background:#f4ede7!important;border:1px solid rgba(47,113,107,.12)!important;color:#2f716b!important;font-size:14px!important;display:grid!important;place-items:center!important}
  #home .next-card small{font-size:8px!important;line-height:1.2!important;color:#74817f!important;font-weight:300!important}
  #home .next-card b{font-size:9.5px!important;line-height:1.28!important;color:#315b57!important;font-weight:500!important}
  #home .date-big{font-size:16px!important;line-height:1!important;font-weight:500!important;color:#425a57!important}

  .nav{position:fixed!important;z-index:40!important;left:50%!important;transform:translateX(-50%)!important;bottom:0!important;width:min(430px,100%)!important;height:62px!important;display:none!important;grid-template-columns:repeat(4,1fr)!important;padding:4px 7px max(4px,env(safe-area-inset-bottom))!important;border-radius:0!important;border:1px solid rgba(228,217,207,.65)!important;border-bottom:0!important;background:rgba(251,247,242,.95)!important;box-shadow:0 -4px 14px rgba(80,60,45,.05)!important;backdrop-filter:blur(16px)!important;-webkit-backdrop-filter:blur(16px)!important;direction:rtl!important;overflow:visible!important}
  .nav.show{display:grid!important}
  .nav:before{display:none!important}
  .nav button{position:relative!important;height:52px!important;padding:4px 0 2px!important;border:0!important;border-radius:9px!important;background:transparent!important;color:#315b57!important;font-size:8px!important;line-height:1.1!important;display:flex!important;flex-direction:column!important;align-items:center!important;justify-content:center!important;gap:2px!important;overflow:visible!important;transform:none!important}
  .nav button span:first-child{display:block!important;width:22px!important;height:23px!important;margin:0 auto!important;font-size:0!important;background-position:center!important;background-repeat:no-repeat!important;background-size:contain!important;filter:none!important}
  .nav button:nth-child(1) span:first-child{background-image:url('/assets/home-nav-home.svg?v=${BUILD}')!important}
  .nav button:nth-child(2) span:first-child{background-image:url('/assets/home-nav-services.svg?v=${BUILD}')!important}
  .nav button:nth-child(3) span:first-child{background-image:url('/assets/home-nav-appointments.svg?v=${BUILD}')!important}
  .nav button:nth-child(4) span:first-child{background-image:url('/assets/home-nav-profile.svg?v=${BUILD}')!important}
  .nav button.active{background:#f7e9e3!important;color:#b36f66!important;box-shadow:none!important;border:0!important;transform:none!important}
  .nav button.active:after{display:none!important}
  .nav button.active span:first-child{width:22px!important;height:23px!important}
  .nav .home-nav-label{display:block!important;font-size:8px!important;line-height:1!important;color:inherit!important;font-family:Inter,sans-serif!important}

  @media(max-height:760px){#home .hero-photo{height:146px!important}#home .home-hero>.logo{width:116px!important;margin-top:-29px!important}#home .quick{min-height:70px!important}#home .quick span{width:31px!important;height:33px!important}.nav{height:58px!important}.nav button{height:48px!important}}
  `;
  document.head.appendChild(style);

  const logo=home.querySelector('.logo');
  if(logo)logo.src=`/assets/amitouch_logo_vector.png?v=${BUILD}`;

  const heroCopy=home.querySelector('.hero-copy');
  if(heroCopy)heroCopy.innerHTML='<small>ברוכה הבאה</small><strong>איזה כיף<br>שחזרת עמית</strong><span class="home-heart" aria-hidden="true"></span>';

  const primary=home.querySelector('.primary');
  if(primary)primary.innerHTML=`<img class="home-book-icon" src="/assets/home-nav-appointments.svg?v=${BUILD}" alt=""><span>הזמיני תור</span>`;

  const sectionTitles=home.querySelectorAll('.section-title');
  if(sectionTitles[0])sectionTitles[0].textContent='השירותים שלי';
  if(sectionTitles[1])sectionTitles[1].textContent='הזמנה קרובה';

  const serviceLabels=['עיצוב ואקסטרה','ג׳ל לק','מניקור','בניית ציפורניים'];
  home.querySelectorAll('.quick').forEach((el,i)=>{const b=el.querySelector('b');if(b&&serviceLabels[i])b.textContent=serviceLabels[i];});

  const nav=document.getElementById('nav')||document.querySelector('.nav');
  if(nav){
    const labels=['בית','שירותים','הזמנות','פרופיל'];
    nav.querySelectorAll('button').forEach((btn,i)=>{
      btn.querySelectorAll('.home-nav-label').forEach(x=>x.remove());
      const lab=document.createElement('span');lab.className='home-nav-label';lab.textContent=labels[i]||'';btn.appendChild(lab);
    });
  }
})();