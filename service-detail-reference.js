(function(){
 const BUILD='20260820-service-detail-extras-v7';
 const ICONS={gel:'/assets/%D7%9E%D7%A0%D7%99%D7%A7%D7%95%D7%A8%20%D7%92%D7%9C.png',new:'/assets/ChatGPT%20Image%20Aug%2019%2C%202026%2C%2004_04_17%20PM.png',fill:'/assets/%D7%9E%D7%99%D7%9C%D7%95%D7%99.png',repair:'/assets/%D7%94%D7%A9%D7%9C%D7%9E%D7%94.png',remove:'/assets/%D7%94%D7%A1%D7%A8%D7%94.png'};
 const COPY={
  gel:{desc:'מניקור ג׳ל מוקפד במראה נקי ומדויק, כולל הכנת הציפורן, התאמת צורה ומריחה מקצועית.',include:['ייעוץ והתאמת צורה','מניקור והכנת הציפורן','מריחת ג׳ל וגימור מדויק']},
  new:{desc:'בניית ציפורניים בשיטה מתקדמת ותוצאה חזקה, טבעית ומדויקת מותאמת אישית לאורך ולצורה.',include:['ייעוץ והתאמת צורה','בניית ציפורניים','שיוף ועיצוב','מריחת ג׳ל לק']},
  fill:{desc:'מילוי מקצועי לבנייה קיימת, חידוש המבנה ואיזון הציפורן לקבלת מראה אחיד, נקי ומדויק.',include:['בדיקת המבנה הקיים','מילוי ואיזון המבנה','שיוף ועיצוב','מריחת ג׳ל לק']},
  repair:{desc:'תיקון ממוקד לציפורן שנשברה או נפגעה, תוך התאמה למבנה ולאורך הקיים וגימור אחיד.',include:['בדיקת הציפורן','תיקון והשלמת המבנה','שיוף והתאמת צורה','גימור מדויק']},
  remove:{desc:'הסרה עדינה ומבוקרת של החומר הקיים, תוך שמירה על הציפורן הטבעית והכנתה להמשך.',include:['הסרה מבוקרת','שיוף עדין','ניקוי הציפורן','גימור טבעי']}
 };
 const EXTRAS=[
  {id:'none',n:'ללא תוספות',p:0,m:0,sub:'להמשיך לטיפול שבחרת'},
  {id:'art',n:'ציורים ועיצוב',p:100,m:30,sub:'המחיר הסופי לפי מורכבות'},
  {id:'repair',n:'תיקון ציפורן',p:25,m:15,sub:'15/25/30/35 ₪ לפי הבסיס'}
 ];
 document.getElementById('amit-service-detail-style')?.remove();
 const s=document.createElement('style');s.id='amit-service-detail-style';s.textContent=`
 #detail{position:relative!important;height:calc(100dvh - 82px)!important;min-height:0!important;max-height:calc(100dvh - 82px)!important;padding:8px 20px 12px!important;box-sizing:border-box!important;background:transparent!important;direction:rtl!important;color:#315c57!important;overflow:hidden!important;overscroll-behavior:none!important;scrollbar-width:none!important}#detail::-webkit-scrollbar{display:none!important}
 #detail .top{height:38px!important;min-height:38px!important;display:flex!important;align-items:center!important;justify-content:flex-start!important;margin:0!important;padding:0!important;direction:rtl!important}
 #detail .top b,#detail .top>:not(.round){display:none!important}#detail .top .round{display:flex!important;align-items:center!important;justify-content:center!important;width:38px!important;height:38px!important;margin:0!important;padding:0!important;border:0!important;background:transparent!important;box-shadow:none!important;color:#214e49!important;font-size:0!important}#detail .top .round:before{content:'→'!important;font-size:24px!important;font-weight:300!important}
 #detail .service-detail-ref{text-align:center!important;width:100%!important;max-width:368px!important;margin:0 auto!important;padding:0!important}
 #detail .service-detail-icon{width:102px!important;height:84px!important;margin:-4px auto 1px!important;display:flex!important;align-items:center!important;justify-content:center!important}.service-detail-icon img{width:96px!important;height:84px!important;object-fit:contain!important}
 #detail .service-detail-ref h1{font-size:20px!important;font-weight:500!important;margin:1px 0 7px!important;color:#315c57!important}#detail .service-detail-desc{font-size:11px!important;line-height:1.5!important;color:#687b78!important;max-width:260px!important;margin:0 auto 5px!important;font-weight:300!important}
 #detail .service-detail-from{font-size:10px!important;color:#778582!important;margin:0!important}.service-detail-price{font-size:24px!important;line-height:1.1!important;font-weight:400!important;color:#405f5c!important;margin:0 0 7px!important;direction:ltr!important}
 #detail .service-detail-separator{height:1px!important;width:100%!important;margin:0 0 6px!important;background:linear-gradient(90deg,rgba(47,113,107,0),rgba(47,113,107,.78),rgba(47,113,107,0))!important}
 #detail .service-detail-duration-label{font-size:10px!important;color:#7a8785!important;margin:0 0 2px!important}.service-detail-duration{font-size:12px!important;color:#526d69!important;margin:0 0 8px!important}
 #detail .service-detail-include,#detail .service-detail-extras{border-radius:14px!important;padding:9px 15px 8px!important;background:rgba(255,255,255,.46)!important;border:1px solid rgba(255,255,255,.88)!important;box-shadow:0 4px 14px rgba(70,72,66,.05)!important;text-align:right!important;margin-bottom:7px!important}
 #detail .service-detail-include h3,#detail .service-detail-extras h3{text-align:center!important;font-size:11px!important;font-weight:500!important;margin:0 0 5px!important;color:#315c57!important}
 #detail .service-detail-include p{position:relative!important;font-size:10.5px!important;color:#607572!important;margin:4px 0!important;padding:0 22px 0 0!important;line-height:1.35!important}.service-detail-include p:before{content:'✓'!important;position:absolute!important;right:0!important;top:-1px!important;color:#2f716b!important;font-size:14px!important}
 #detail .embedded-extras{display:flex!important;flex-direction:column!important;gap:5px!important}
 #detail .extra-option{width:100%!important;min-height:42px!important;border:1px solid rgba(47,113,107,.14)!important;border-radius:11px!important;background:rgba(255,255,255,.52)!important;color:#496964!important;padding:6px 9px!important;display:grid!important;grid-template-columns:22px minmax(0,1fr)!important;gap:8px!important;align-items:center!important;text-align:right!important;transition:opacity .16s ease,background .16s ease,border-color .16s ease!important;box-shadow:none!important}
 #detail .extra-option .extra-check{width:19px!important;height:19px!important;border-radius:50%!important;border:1.4px solid rgba(47,113,107,.42)!important;display:grid!important;place-items:center!important;color:transparent!important;font-size:12px!important;font-weight:600!important;background:rgba(255,255,255,.35)!important}
 #detail .extra-option .extra-copy strong{display:block!important;font-size:10.5px!important;font-weight:500!important;line-height:1.2!important}.extra-option .extra-copy small{display:block!important;font-size:8.8px!important;font-weight:300!important;color:#7b8986!important;margin-top:2px!important;line-height:1.2!important}
 #detail .extra-option.extra-selected{background:rgba(255,255,255,.72)!important;border-color:rgba(47,113,107,.45)!important;opacity:1!important}.extra-option.extra-selected .extra-check{background:#397a73!important;border-color:#397a73!important;color:#fff!important}.extra-option.extra-dimmed{opacity:.34!important}
 #detail .service-detail-book{width:100%!important;height:46px!important;border:0!important;border-radius:9px!important;padding:0 14px!important;background:linear-gradient(90deg,#397d76,#276a64)!important;color:white!important;font-size:15px!important;font-weight:600!important;box-shadow:0 6px 14px rgba(37,93,87,.12)!important;margin:8px 0 0!important}#detail .service-detail-book:disabled{opacity:.34!important;box-shadow:none!important;cursor:not-allowed!important}
 #detail .extra-required-note{text-align:center!important;font-size:9.5px!important;color:#87918f!important;margin:2px 0 0!important}
 @media(max-height:720px){#detail .service-detail-icon{height:67px!important}.service-detail-icon img{height:67px!important}#detail .service-detail-desc{line-height:1.3!important}#detail .service-detail-include{display:none!important}#detail .service-detail-extras{padding:7px 12px!important}.extra-option{min-height:37px!important}#detail .service-detail-book{height:42px!important}}
 `;document.head.appendChild(s);
 const original=window.detail;
 function durationText(m){if(m<60)return `${m} דקות`;if(m===60)return 'שעה';if(m%60===0)return `${m/60} שעות`;const h=Math.floor(m/60),r=m%60;if(r===30)return h===1?'שעה וחצי':`${h} שעות וחצי`;return `${h} שעות ו${r} דקות`;}
 function extrasMarkup(){return EXTRAS.map(e=>`<button class="extra-option" type="button" data-extra-id="${e.id}"><span class="extra-check">✓</span><span class="extra-copy"><strong>${e.n}</strong><small>${e.sub}</small></span></button>`).join('');}
 window.detail=function(id){
  if(typeof booking==='undefined'||typeof SERVICES==='undefined')return original?.(id);const x=SERVICES.find(v=>v.id===id);if(!x)return original?.(id);booking={service:x};show('detail');
  const top=document.querySelector('#detail .top');if(top){top.innerHTML='<button class="round" type="button" aria-label="חזרה"></button>';top.querySelector('.round').onclick=()=>window.services?window.services():window.show?.('services');}
  const c=COPY[id]||COPY.gel,icon=ICONS[id]||ICONS.repair;
  document.getElementById('detailBody').innerHTML=`<div class="service-detail-ref"><div class="service-detail-icon"><img src="${icon}?v=${BUILD}" alt=""></div><h1>${x.n}</h1><p class="service-detail-desc">${c.desc}</p><p class="service-detail-from">החל מ</p><div class="service-detail-price">₪${x.p}</div><div class="service-detail-separator"></div><p class="service-detail-duration-label">משך טיפול</p><p class="service-detail-duration">${durationText(x.m)}</p><div class="service-detail-include"><h3>מה כולל השירות?</h3>${c.include.map(v=>`<p>${v}</p>`).join('')}</div>${id==='remove'?'':`<div class="service-detail-extras"><h3>בחרי תוספת</h3><div class="embedded-extras">${extrasMarkup()}</div></div><p class="extra-required-note">יש לבחור אפשרות אחת כדי להמשיך לבחירת תאריך</p>`}<button class="service-detail-book" type="button" ${id==='remove'?'':'disabled'}>הזמיני תור</button></div>`;
  const bookBtn=document.querySelector('#detail .service-detail-book');
  if(id==='remove'){bookBtn.onclick=()=>calendar();return;}
  const optionButtons=[...document.querySelectorAll('#detail .extra-option')];
  optionButtons.forEach(btn=>btn.addEventListener('click',function(){
    const chosen=EXTRAS.find(e=>e.id===this.dataset.extraId);if(!chosen)return;
    booking.extra={n:chosen.n,p:chosen.p,m:chosen.m};
    optionButtons.forEach(b=>{const selected=b===this;b.classList.toggle('extra-selected',selected);b.classList.toggle('extra-dimmed',!selected);});
    bookBtn.disabled=false;
  }));
  bookBtn.onclick=()=>{if(bookBtn.disabled||!booking.extra)return;calendar();};
 };
})();