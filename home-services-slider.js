(function(){
  const BUILD='20260820-home-services-clean-v6';
  const home=document.getElementById('home');
  if(!home)return;
  const grid=home.querySelector('.quick-grid');
  if(!grid)return;

  document.getElementById('amit-home-services-slider-style')?.remove();
  const style=document.createElement('style');
  style.id='amit-home-services-slider-style';
  style.textContent=`
    #home .home-hero,#home .quick-grid,#home .appointments-stack,#home .appointment-block,#home .section-title,#home .appointment-heading{background:transparent!important;background-color:transparent!important;background-image:none!important;box-shadow:none!important;border:0!important;outline:0!important;filter:none!important}
    #home .home-hero:before,#home .home-hero:after,#home .quick-grid:before,#home .quick-grid:after,#home .appointments-stack:before,#home .appointments-stack:after,#home .appointment-block:before,#home .appointment-block:after{content:none!important;display:none!important;background:none!important;box-shadow:none!important}
    #home .section-title{display:flex!important;align-items:center!important;justify-content:center!important;gap:14px!important;margin:18px 0 16px!important;padding:0!important;color:#07584f!important;font-size:20px!important;font-weight:500!important}
    #home .section-title:before,#home .section-title:after{content:''!important;display:block!important;height:1px!important;flex:1!important;background:linear-gradient(90deg,transparent 0%,rgba(7,88,79,.22) 28%,rgba(7,88,79,.72) 100%)!important;box-shadow:none!important}
    #home .section-title:after{transform:scaleX(-1)!important}
    #home .quick-grid{display:flex!important;direction:rtl!important;gap:12px!important;margin:0 -15px 28px!important;padding:0 15px 8px!important;overflow-x:auto!important;overflow-y:visible!important;scroll-snap-type:x mandatory!important;scroll-padding-inline:15px!important;-webkit-overflow-scrolling:touch!important;overscroll-behavior-inline:contain!important;touch-action:pan-x pan-y!important;scrollbar-width:none!important}
    #home .quick-grid::-webkit-scrollbar{display:none!important}
    #home .quick{flex:0 0 122px!important;width:122px!important;height:154px!important;min-height:154px!important;padding:14px 8px 12px!important;border-radius:18px!important;border:1px solid rgba(255,255,255,.94)!important;background:linear-gradient(145deg,rgba(255,255,255,.78),rgba(255,248,245,.52))!important;box-shadow:0 10px 22px rgba(112,76,66,.08),inset 0 1px 0 rgba(255,255,255,.98)!important;backdrop-filter:blur(18px) saturate(140%)!important;-webkit-backdrop-filter:blur(18px) saturate(140%)!important;color:#07584f!important;scroll-snap-align:start!important;scroll-snap-stop:always!important;display:flex!important;flex-direction:column!important;align-items:center!important;justify-content:space-between!important}
    #home .quick .service-art{display:block!important;width:82px!important;height:96px!important;margin:0 auto 5px!important;object-fit:contain!important;object-position:center!important;flex:0 0 auto!important}
    #home .quick b{display:block!important;margin:0!important;font-family:Inter,sans-serif!important;font-size:14px!important;line-height:1.25!important;font-weight:400!important;color:#07584f!important;text-align:center!important;white-space:nowrap!important}
  `;
  document.head.appendChild(style);

  const services=[
    {label:'מניקור ג׳ל',icon:'/assets/%D7%9E%D7%A0%D7%99%D7%A7%D7%95%D7%A8%20%D7%92%D7%9C.png'},
    {label:'בניה',icon:'https://raw.githubusercontent.com/amit-tal/AmitTouch/main/assets/%D7%91%D7%A0%D7%99%D7%99%D7%94.png?sha=50c128a0310c454ab6afdee1f529606807d46ce5'},
    {label:'מילוי',icon:'/assets/%D7%9E%D7%99%D7%9C%D7%95%D7%99.png'},
    {label:'תיקון',icon:'/assets/%D7%94%D7%A9%D7%9C%D7%9E%D7%94.png'},
    {label:'הסרה',icon:'/assets/%D7%94%D7%A1%D7%A8%D7%94.png'}
  ];

  grid.innerHTML='';
  services.forEach((service)=>{
    const btn=document.createElement('button');
    btn.type='button';
    btn.className='quick glass';
    btn.setAttribute('aria-label',service.label);
    const sep=service.icon.includes('?')?'&':'?';
    btn.innerHTML=`<img class="service-art" src="${service.icon}${sep}v=${BUILD}" alt=""><b>${service.label}</b>`;
    btn.addEventListener('click',()=>{if(typeof window.services==='function')window.services();else if(typeof window.show==='function')window.show('services');});
    grid.appendChild(btn);
  });
  requestAnimationFrame(()=>{grid.scrollLeft=0;});
})();