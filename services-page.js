(function(){
  const BUILD='20260820-services-page-v4-noscroll';
  const page=document.getElementById('services');
  if(!page)return;

  const ICONS={
    gel:'/assets/%D7%9E%D7%A0%D7%99%D7%A7%D7%95%D7%A8%20%D7%92%D7%9C.png',
    new:'/assets/ChatGPT%20Image%20Aug%2019%2C%202026%2C%2004_04_17%20PM.png',
    fill:'/assets/%D7%9E%D7%99%D7%9C%D7%95%D7%99.png',
    repair:'/assets/%D7%94%D7%A9%D7%9C%D7%9E%D7%94.png',
    remove:'/assets/%D7%94%D7%A1%D7%A8%D7%94.png'
  };

  const PAGE_SERVICES=[
    {id:'gel',label:'מניקור ג׳ל',price:150},
    {id:'new',label:'בנייה',price:250},
    {id:'fill',label:'מילוי',price:200},
    {id:'repair',label:'תיקון',price:15},
    {id:'remove',label:'הסרה',price:25}
  ];

  document.getElementById('amit-services-page-style')?.remove();
  const style=document.createElement('style');
  style.id='amit-services-page-style';
  style.textContent=`
    #services{height:calc(100dvh - 82px)!important;min-height:0!important;max-height:calc(100dvh - 82px)!important;padding:18px 14px 18px!important;box-sizing:border-box!important;background:transparent!important;color:#315c57!important;direction:rtl!important;font-family:Inter,sans-serif!important;overflow:hidden!important;overscroll-behavior:none!important;scrollbar-width:none!important}
    #services::-webkit-scrollbar{display:none!important}
    #services .services-head{display:grid!important;grid-template-columns:42px 1fr 42px!important;align-items:center!important;min-height:46px!important;margin-bottom:12px!important}
    #services .services-head h2{margin:0!important;text-align:center!important;font-size:17px!important;font-weight:600!important;color:#173f3b!important}
    #services .services-back{width:42px!important;height:42px!important;border:0!important;background:transparent!important;color:#315c57!important;font-size:29px!important;line-height:1!important;cursor:pointer!important}
    #services .services-head-spacer{width:42px!important;height:42px!important}
    #services .services-list{display:flex!important;flex-direction:column!important;gap:7px!important}
    #services .service-card{width:100%!important;min-height:72px!important;border:1px solid rgba(255,255,255,.92)!important;border-radius:18px!important;background:rgba(255,255,255,.48)!important;box-shadow:0 6px 18px rgba(82,66,58,.06)!important;backdrop-filter:blur(15px)!important;-webkit-backdrop-filter:blur(15px)!important;padding:8px 15px!important;display:grid!important;grid-template-columns:minmax(0,1fr) 54px!important;gap:12px!important;align-items:center!important;color:#315c57!important;text-align:right!important;cursor:pointer!important}
    #services .service-copy{min-width:0!important}
    #services .service-card h3{margin:0 0 4px!important;font-size:16px!important;font-weight:500!important;color:#315c57!important;line-height:1.2!important}
    #services .service-from{margin:0 0 1px!important;font-size:11px!important;color:#7d8987!important;font-weight:300!important}
    #services .service-price{margin:0!important;font-size:14px!important;color:#536b68!important;font-weight:400!important;direction:ltr!important;text-align:right!important}
    #services .service-icon-wrap{width:54px!important;height:54px!important;display:flex!important;align-items:center!important;justify-content:center!important;justify-self:end!important}
    #services .service-icon-img{display:block!important;width:50px!important;height:54px!important;object-fit:contain!important;object-position:center!important}
  `;
  document.head.appendChild(style);

  function iconMarkup(id){return `<img class="service-icon-img" src="${ICONS[id]}?v=${BUILD}" alt="">`;}

  function openRepair(){
    try{
      booking={service:{id:'repair',n:'תיקון',p:15,m:30,d:'תיקון נקודתי לציפורן בהתאם לסוג התיקון והחומר הקיים.'}};
      window.show?.('detail');
      const body=document.getElementById('detailBody');
      if(body)body.innerHTML=`<div class="detail"><div class="art glass"><img src="${ICONS.repair}?v=${BUILD}" alt="" style="width:78px;height:78px;object-fit:contain"></div><h1>תיקון</h1><p>תיקון נקודתי לציפורן בהתאם לסוג התיקון והחומר הקיים.</p><div class="detail-price">החל מ ₪15</div><p>משך טיפול · 30 דקות</p><button class="primary" style="margin-top:16px" onclick="calendar()">הזמיני תור</button></div>`;
    }catch(_){alert('לא ניתן לפתוח את השירות כרגע');}
  }

  function render(){
    page.innerHTML=`<div class="services-head"><button class="services-back" type="button" aria-label="חזרה">‹</button><h2>השירותים שלי</h2><span class="services-head-spacer"></span></div><div class="services-list">${PAGE_SERVICES.map(s=>`<button class="service-card" type="button" data-id="${s.id}"><div class="service-copy"><h3>${s.label}</h3><p class="service-from">החל מ</p><p class="service-price">₪${s.price}</p></div><div class="service-icon-wrap">${iconMarkup(s.id)}</div></button>`).join('')}</div>`;
    page.querySelector('.services-back').onclick=()=>window.show?.('home');
    page.querySelectorAll('.service-card').forEach(btn=>btn.onclick=()=>{
      const id=btn.dataset.id;
      if(id==='repair')return openRepair();
      window.detail?.(id);
    });
  }

  window.services=function(){render();window.show?.('services');};
  render();
})();