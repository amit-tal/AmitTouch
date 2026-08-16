(function(){
  const BUILD='20260816-home-reference-v2';
  const home=document.getElementById('home');
  if(!home)return;
  document.getElementById('amit-home-polish')?.remove();

  const style=document.createElement('style');
  style.id='amit-home-polish';
  style.textContent=`
  #home{padding:0 0 76px!important;margin:0!important;color:#244f4b!important;overflow:visible!important;background:#fbf7f2!important}
  #home .top{height:48px!important;display:grid!important;grid-template-columns:34px 1fr 34px!important;align-items:center!important;padding:0 2px!important;margin:0!important;position:relative!important;z-index:8!important}
  #home .top b{font-size:0!important}
  #home .top .round{width:30px!important;height:30px!important;border:0!important;background-color:transparent!important;box-shadow:none!important;backdrop-filter:none!important;-webkit-backdrop-filter:none!important;font-size:0!important;background-repeat:no-repeat!important;background-position:center!important;background-size:21px 21px!important;padding:0!important}
  #home .top .round:first-child{background-image:url('/assets/home-icon-menu.svg?v=${BUILD}')!important}
  #home .top .round:last-child{background-image:url('/assets/home-icon-profile-top.svg?v=${BUILD}')!important}

  #home .home-hero{padding:0!important;margin:0!important;position:relative!important}
  #home .home-hero>.logo{display:block!important;width:142px!important;height:auto!important;max-width:58vw!important;margin:-42px auto 2px!important;position:relative!important;z-index:9!important;object-fit:contain!important}

  #home .hero-photo{height:190px!important;margin:-2px -15px 8px!important;border:0!important;border-radius:0!important;box-shadow:none!important;position:relative!important;overflow:hidden!important;background:#fbf7f2 url('/assets/home-hero.png?v=${BUILD}') right 49%/auto 100% no-repeat!important}
  #home .hero-photo:before{display:none!important}
  #home .hero-photo:after{content:''!important;position:absolute!important;inset:0!important;background:linear-gradient(90deg,#fbf7f2 0%,rgba(251,247,242,.97) 13%,rgba(251,247,242,.79) 25%,rgba(251,247,242,.24) 44%,rgba(251,247,242,0) 60%)!important;pointer-events:none!important}
  #home .hero-copy{position:absolute!important;left:20px!important;right:auto!important;bottom:31px!important;width:126px!important;text-align:right!important;direction:rtl!important;color:#28635e!important;z-index:4!important}
  #home .hero-copy small{display:block!important;margin:0 0 4px!important;color:#28635e!important;font-family:Inter,sans-serif!important;font-size:11px!important;line-height:1.15!important;font-weight:300!important}
  #home .hero-copy strong{display:block!important;margin:0!important;color:#28635e!important;font-family:var(--hand,'GveretLevin',cursive)!important;font-size:20px!important;line-height:1.2!important;font-weight:100!important;font-synthesis:none!important;letter-spacing:0!important}
  #home .hero-copy .home-heart{display:block!important;width:18px!important;height:18px!important;margin:7px 4px 0 auto!important;background:url('/assets/amit-touch-heart.svg?v=${BUILD}') center/contain no-repeat!important}

  #home .primary{display:flex!important;align-items:center!important;justify-content:center!important;gap:7px!important;width:100%!important;height:44px!important;padding:0!important;margin:0 0 3px!important;border:0!important;border-radius:8px!important;background:linear-gradient(90deg,#31726b,#2b625d)!important;color:#fff!important;font-size:13px!important;line-height:1!important;font-weight:500!important;box-shadow:0 5px 12px rgba(38,91,85,.14)!important}
  #home .primary .home-book-icon{width:16px!important;height:16px!important;display:block!important;object-fit:contain!important;filter:brightness(0) invert(1)!important}

  #home .section-title{display:flex!important;align-items:center!important;justify-content:center!important;gap:8px!important;margin:12px 0 7px!important;color:#345d59!important;font-size:10px!important;line-height:1!important;font-weight:400!important;text-align:center!important}
  #home .section-title:before,#home .section-title:after{content:''!important;display:block!important;height:1px!important;flex:1!important;background:linear-gradient(90deg,transparent,rgba(47,113,107,.15),transparent)!important}

  #home .quick-grid{display:grid!important;grid-template-columns:repeat(4,minmax(0,1fr))!important;gap:5px!important;margin:0!important;direction:rtl!important}
  #home .quick{min-width:0!important;height:77px!important;min-height:77px!important;padding:7px 2px 5px!important;border-radius:8px!important;border:1px solid rgba(225,216,207,.86)!important;background:rgba(255,255,255,.54)!important;box-shadow:0 2px 6px rgba(80,60,45,.045)!important;color:#275a55!important}
  #home .quick span{display:block!important;width:35px!important;height:37px!important;margin:0 auto 3px!important;font-size:0!important;background-position:center!important;background-repeat:no-repeat!important;background-size:contain!important}
  #home .quick:nth-child(1) span{background-image:url('/assets/home-service-design.svg?v=${BUILD}')!important}
  #home .quick:nth-child(2) span{background-image:url('/assets/home-service-gel.svg?v=${BUILD}')!important}
  #home .quick:nth-child(3) span{background-image:url('/assets/home-service-pedicure.svg?v=${BUILD}')!important}
  #home .quick:nth-child(4) span{background-image:url('/assets/home-service-manicure.svg?v=${BUILD}')!important}
  #home .quick b{display:block!important;font-family:Inter,sans-serif!important;font-size:7.8px!important;line-height:1.25!important;font-weight:500!important;color:#2d5b56!important;white-space:normal!important;text-align:center!important}

  #home .next-card{display:grid!important;grid-template-columns:32px minmax(0,1fr) 48px!important;align-items:center!important;gap:8px!important;min-height:65px!important;margin:0!important;padding:8px 10px!important;border-radius:8px!important;background:rgba(255,255,255,.55)!important;border:1px solid rgba(225,216,207,.84)!important;box-shadow:0 2px 6px rgba(80,60,45,.045)!important;direction:ltr!important}
  #home .checkdot{width:28px!important;height:28px!important;border-radius:50%!important;background:#f6eee8!important;border:1px solid rgba(47,113,107,.12)!important;color:#2f716b!important;font-size:13px!important;display:grid!important;place-items:center!important}
  #home .next-card>div:nth-child(2){direction:rtl!important;text-align:right!important}
  #home .next-card small{font-family:Inter,sans-serif!important;font-size:8px!important;line-height:1.25!important;color:#7a8583!important;font-weight:300!important}
  #home .next-card b{font-family:Inter,sans-serif!important;font-size:9px!important;line-height:1.3!important;color:#315b57!important;font-weight:500!important}
  #home .next-card>div:last-child{direction:rtl!important;text-align:center!important;color:#5b6765!important}
  #home .date-big{font-size:17px!important;line-height:1!important;font-weight:500!important;color:#4a5f5c!important}

  .nav{position:fixed!important;z-index:40!important;left:50%!important;transform:translateX(-50%)!important;bottom:0!important;width:min(430px,100%)!important;height:64px!important;display:none!important;grid-template-columns:repeat(4,1fr)!important;padding:5px 8px max(4px,env(safe-area-inset-bottom))!important;border-radius:0!important;border:1px solid rgba(228,217,207,.72)!important;border-bottom:0!important;background:rgba(251,247,242,.97)!important;box-shadow:0 -3px 12px rgba(80,60,45,.05)!important;backdrop-filter:blur(16px)!important;-webkit-backdrop-filter:blur(16px)!important;direction:ltr!important;overflow:visible!important}
  .nav.show{display:grid!important}
  .nav:before{display:none!important}
  .nav button{position:relative!important;height:52px!important;padding:3px 0 2px!important;border:0!important;border-radius:10px!important;background:transparent!important;color:#315b57!important;font-size:8px!important;line-height:1.1!important;display:flex!important;flex-direction:column!important;align-items:center!important;justify-content:center!important;gap:2px!important;overflow:visible!important;transform:none!important}
  .nav button span:first-child{display:block!important;width:22px!important;height:23px!important;margin:0 auto!important;font-size:0!important;background-position:center!important;background-repeat:no-repeat!important;background-size:contain!important;filter:none!important}
  .nav button:nth-child(1) span:first-child{background-image:url('/assets/home-nav-profile.svg?v=${BUILD}')!important}
  .nav button:nth-child(2) span:first-child{background-image:url('/assets/home-nav-appointments.svg?v=${BUILD}')!important}
  .nav button:nth-child(3) span:first-child{background-image:url('/assets/home-nav-home.svg?v=${BUILD}')!important}
  .nav button:nth-child(4) span:first-child{background-image:url('/assets/home-nav-services.svg?v=${BUILD}')!important}
  .nav button.active{background:#f7e9e3!important;color:#b36f66!important;box-shadow:none!important;border:0!important;transform:none!important}
  .nav button.active:after{display:none!important}
  .nav .home-nav-label{display:block!important;font-size:8px!important;line-height:1!important;color:inherit!important;font-family:Inter,sans-serif!important;font-weight:400!important}

  @media(max-height:760px){
    #home .home-hero>.logo{width:132px!important;margin-top:-40px!important}
    #home .hero-photo{height:174px!important}
    #home .hero-copy{bottom:27px!important}
    #home .quick{height:72px!important;min-height:72px!important}
    #home .quick span{width:31px!important;height:32px!important}
    .nav{height:60px!important}.nav button{height:48px!important}
  }
  `;
  document.head.appendChild(style);

  const logo=home.querySelector('.logo');
  if(logo)logo.src=`/assets/amitouch_logo_vector.png?v=${BUILD}`;

  function currentFirstName(){
    try{
      if(typeof user!=='undefined'&&user)return user.firstName||String(user.name||'').trim().split(/\s+/)[0]||'';
    }catch(_){}
    return '';
  }
  function refreshGreeting(){
    const heroCopy=home.querySelector('.hero-copy');
    if(!heroCopy)return;
    const first=currentFirstName();
    heroCopy.innerHTML=`<small>ברוכה הבאה</small><strong>איזה כיף<br>שחזרת${first?' '+first:''}</strong><span class="home-heart" aria-hidden="true"></span>`;
  }
  refreshGreeting();
  const activeObserver=new MutationObserver(()=>{if(home.classList.contains('active'))refreshGreeting();});
  activeObserver.observe(home,{attributes:true,attributeFilter:['class']});

  const primary=home.querySelector('.primary');
  if(primary)primary.innerHTML=`<img class="home-book-icon" src="/assets/home-nav-appointments.svg?v=${BUILD}" alt=""><span>הזמיני תור</span>`;

  const sectionTitles=home.querySelectorAll('.section-title');
  if(sectionTitles[0])sectionTitles[0].textContent='השירותים שלי';
  if(sectionTitles[1])sectionTitles[1].textContent='הזמנה קרובה';

  const serviceLabels=['עיצוב ואקסטרה','ג׳ל לק','מניקור','בניית ציפורניים'];
  home.querySelectorAll('.quick').forEach((el,i)=>{const b=el.querySelector('b');if(b&&serviceLabels[i])b.textContent=serviceLabels[i];});

  const nav=document.getElementById('nav')||document.querySelector('.nav');
  if(nav){
    const labels=['פרופיל','הזמנות','בית','שירותים'];
    nav.querySelectorAll('button').forEach((btn,i)=>{
      btn.querySelectorAll('.home-nav-label').forEach(x=>x.remove());
      const lab=document.createElement('span');
      lab.className='home-nav-label';
      lab.textContent=labels[i]||'';
      btn.appendChild(lab);
    });
  }
})();