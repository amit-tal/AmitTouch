(function(){
  const BUILD='20260820-services-page-v1';
  const page=document.getElementById('services');
  if(!page)return;

  document.getElementById('amit-services-page-style')?.remove();
  const style=document.createElement('style');
  style.id='amit-services-page-style';
  style.textContent=`
    #services{min-height:100dvh!important;padding:18px 14px 96px!important;background:transparent!important;color:#315c57!important;direction:rtl!important;font-family:Inter,sans-serif!important;overflow-y:auto!important;scrollbar-width:none!important}
    #services::-webkit-scrollbar{display:none!important}
    #services .services-head{display:grid!important;grid-template-columns:42px 1fr 42px!important;align-items:center!important;min-height:46px!important;margin-bottom:14px!important}
    #services .services-head h2{margin:0!important;text-align:center!important;font-size:17px!important;font-weight:600!important;color:#173f3b!important}
    #services .services-back{width:42px!important;height:42px!important;border:0!important;background:transparent!important;color:#315c57!important;font-size:29px!important;line-height:1!important;cursor:pointer!important}
    #services .services-head-spacer{width:42px!important;height:42px!important}
    #services .services-list{display:flex!important;flex-direction:column!important;gap:7px!important}
    #services .service-card{width:100%!important;min-height:78px!important;border:1px solid rgba(255,255,255,.92)!important;border-radius:18px!important;background:rgba(255,255,255,.48)!important;box-shadow:0 6px 18px rgba(82,66,58,.06)!important;backdrop-filter:blur(15px)!important;-webkit-backdrop-filter:blur(15px)!important;padding:10px 15px!important;display:grid!important;grid-template-columns:minmax(0,1fr) 58px!important;gap:12px!important;align-items:center!important;color:#315c57!important;text-align:right!important;cursor:pointer!important}
    #services .service-copy{min-width:0!important}
    #services .service-card h3{margin:0 0 4px!important;font-size:16px!important;font-weight:500!important;color:#315c57!important;line-height:1.2!important}
    #services .service-from{margin:0 0 1px!important;font-size:11px!important;color:#7d8987!important;font-weight:300!important}
    #services .service-price{margin:0!important;font-size:14px!important;color:#536b68!important;font-weight:400!important;direction:ltr!important;text-align:right!important}
    #services .service-icon-wrap{width:54px!important;height:54px!important;display:flex!important;align-items:center!important;justify-content:center!important;justify-self:end!important;color:#07584f!important}
    #services .service-icon-placeholder{font-size:30px!important;line-height:1!important;font-weight:300!important;color:#07584f!important;opacity:.9!important}
    #services .service-card.extra-service .service-price{font-size:13px!important}
  `;
  document.head.appendChild(style);

  function getServices(){
    try{if(Array.isArray(window.SERVICES))return window.SERVICES;}catch(_){}
    try{if(typeof SERVICES!=='undefined'&&Array.isArray(SERVICES))return SERVICES;}catch(_){}
    return [
      {id:'gel',n:'לק ג׳ל',p:150,m:60,i:'◯'},
      {id:'fill',n:'מילוי',p:200,m:90,i:'⌁'},
      {id:'new',n:'בנייה חדשה',p:250,m:120,i:'✧'},
      {id:'remove',n:'הסרה בלבד',p:25,m:30,i:'╱'}
    ];
  }

  function render(){
    const services=getServices();
    page.innerHTML=`<div class="services-head"><button class="services-back" type="button" aria-label="חזרה">‹</button><h2>השירותים שלי</h2><span class="services-head-spacer"></span></div><div class="services-list">${services.map(s=>`<button class="service-card" type="button" data-id="${s.id}"><div class="service-copy"><h3>${s.n}</h3><p class="service-from">החל מ</p><p class="service-price">₪${s.p}</p></div><div class="service-icon-wrap"><span class="service-icon-placeholder">${s.i||'✦'}</span></div></button>`).join('')}<button class="service-card extra-service" type="button" data-extra="design"><div class="service-copy"><h3>ציורים ועיצוב</h3><p class="service-from">תוספת לפי מורכבות</p><p class="service-price">₪100+</p></div><div class="service-icon-wrap"><span class="service-icon-placeholder">✦</span></div></button></div>`;
    page.querySelector('.services-back').onclick=()=>window.show?.('home');
    page.querySelectorAll('.service-card[data-id]').forEach(btn=>btn.onclick=()=>window.detail?.(btn.dataset.id));
    page.querySelector('[data-extra="design"]')?.addEventListener('click',()=>alert('תוספת זו נבחרת כחלק מהזמנת טיפול'));
  }

  window.services=function(){render();window.show?.('services');};
  render();
})();