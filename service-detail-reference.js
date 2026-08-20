(function(){
 const BUILD='20260820-service-detail-ref-v4';
 const ICONS={gel:'/assets/%D7%9E%D7%A0%D7%99%D7%A7%D7%95%D7%A8%20%D7%92%D7%9C.png',new:'/assets/ChatGPT%20Image%20Aug%2019%2C%202026%2C%2004_04_17%20PM.png',fill:'/assets/%D7%9E%D7%99%D7%9C%D7%95%D7%99.png',repair:'/assets/%D7%94%D7%A9%D7%9C%D7%9E%D7%94.png',remove:'/assets/%D7%94%D7%A1%D7%A8%D7%94.png'};
 const COPY={
  gel:{desc:'מניקור ג׳ל מוקפד במראה נקי ומדויק, כולל הכנת הציפורן, התאמת צורה ומריחה מקצועית.',include:['ייעוץ והתאמת צורה','מניקור והכנת הציפורן','מריחת ג׳ל וגימור מדויק']},
  new:{desc:'בניית ציפורניים בשיטה מתקדמת ותוצאה חזקה, טבעית ומדויקת מותאמת אישית לאורך ולצורה.',include:['ייעוץ והתאמת צורה','בניית ציפורניים','שיוף ועיצוב','מריחת ג׳ל לק']},
  fill:{desc:'מילוי מקצועי לבנייה קיימת, חידוש המבנה ואיזון הציפורן לקבלת מראה אחיד, נקי ומדויק.',include:['בדיקת המבנה הקיים','מילוי ואיזון המבנה','שיוף ועיצוב','מריחת ג׳ל לק']},
  repair:{desc:'תיקון ממוקד לציפורן שנשברה או נפגעה, תוך התאמה למבנה ולאורך הקיים וגימור אחיד.',include:['בדיקת הציפורן','תיקון והשלמת המבנה','שיוף והתאמת צורה','גימור מדויק']},
  remove:{desc:'הסרה עדינה ומבוקרת של החומר הקיים, תוך שמירה על הציפורן הטבעית והכנתה להמשך.',include:['הסרה מבוקרת','שיוף עדין','ניקוי הציפורן','גימור טבעי']}
 };
 document.getElementById('amit-service-detail-style')?.remove();
 const s=document.createElement('style');s.id='amit-service-detail-style';s.textContent=`
 #detail{position:relative!important;height:calc(100dvh - 82px)!important;min-height:0!important;max-height:calc(100dvh - 82px)!important;padding:12px 20px 18px!important;box-sizing:border-box!important;background:transparent!important;direction:rtl!important;color:#315c57!important;overflow:hidden!important;overscroll-behavior:none!important;scrollbar-width:none!important}#detail::-webkit-scrollbar{display:none!important}
 #detail .top{height:43px!important;min-height:43px!important;display:flex!important;align-items:center!important;justify-content:flex-start!important;margin:0!important;padding:0!important;direction:rtl!important}
 #detail .top b,#detail .top>:not(.round){display:none!important}
 #detail .top .round{display:flex!important;align-items:center!important;justify-content:center!important;width:38px!important;height:38px!important;margin:0!important;padding:0!important;border:0!important;border-radius:0!important;background:transparent!important;box-shadow:none!important;backdrop-filter:none!important;-webkit-backdrop-filter:none!important;color:#214e49!important;font-size:0!important;line-height:1!important;transform:none!important}
 #detail .top .round:before{content:'→'!important;font-size:24px!important;font-weight:300!important;line-height:1!important}
 #detail .service-detail-ref{text-align:center!important;width:100%!important;max-width:368px!important;margin:0 auto!important;padding:0!important}
 #detail .service-detail-icon{width:122px!important;height:112px!important;margin:-3px auto 5px!important;display:flex!important;align-items:center!important;justify-content:center!important;background:transparent!important;border:0!important;box-shadow:none!important}
 #detail .service-detail-icon img{width:112px!important;height:108px!important;object-fit:contain!important;display:block!important}
 #detail .service-detail-ref h1{font-size:22px!important;line-height:1.2!important;font-weight:500!important;margin:1px 0 13px!important;color:#315c57!important}
 #detail .service-detail-desc{font-size:12px!important;line-height:1.65!important;color:#687b78!important;max-width:250px!important;margin:0 auto 9px!important;font-weight:300!important}
 #detail .service-detail-from{font-size:11px!important;color:#778582!important;margin:0 0 1px!important;line-height:1.2!important}
 #detail .service-detail-price{font-size:27px!important;line-height:1.15!important;font-weight:400!important;color:#405f5c!important;margin:0 0 13px!important;direction:ltr!important}
 #detail .service-detail-separator{height:1px!important;width:100%!important;margin:0 0 10px!important;background:linear-gradient(90deg,rgba(47,113,107,0) 0%,rgba(47,113,107,.18) 13%,rgba(47,113,107,.78) 50%,rgba(47,113,107,.18) 87%,rgba(47,113,107,0) 100%)!important}
 #detail .service-detail-duration-label{font-size:11px!important;color:#7a8785!important;margin:0 0 4px!important;line-height:1.2!important}
 #detail .service-detail-duration{font-size:13px!important;color:#526d69!important;margin:0 0 14px!important;line-height:1.3!important}
 #detail .service-detail-book{width:100%!important;height:52px!important;border:0!important;border-radius:10px!important;padding:0 14px!important;background:linear-gradient(90deg,#397d76,#276a64)!important;color:white!important;font-size:17px!important;font-weight:600!important;box-shadow:0 6px 14px rgba(37,93,87,.12)!important;margin:0 0 14px!important}
 #detail .service-detail-include{border-radius:16px!important;padding:14px 20px 13px!important;background:rgba(255,255,255,.48)!important;border:1px solid rgba(255,255,255,.88)!important;box-shadow:0 5px 16px rgba(70,72,66,.06)!important;text-align:right!important}
 #detail .service-detail-include h3{text-align:center!important;font-size:13px!important;font-weight:500!important;margin:0 0 9px!important;color:#315c57!important}
 #detail .service-detail-include p{position:relative!important;font-size:12px!important;color:#607572!important;margin:7px 0!important;padding:0 26px 0 0!important;line-height:1.45!important;text-align:right!important;direction:rtl!important}
 #detail .service-detail-include p:before{content:'✓'!important;position:absolute!important;right:0!important;top:-1px!important;color:#2f716b!important;font-size:17px!important;font-weight:400!important}.service-detail-include p:after{content:none!important}
 @media(max-height:760px){#detail{padding-top:8px!important}#detail .top{height:38px!important;min-height:38px!important}#detail .service-detail-icon{width:105px!important;height:92px!important;margin:-5px auto 2px!important}#detail .service-detail-icon img{width:98px!important;height:92px!important}#detail .service-detail-ref h1{font-size:20px!important;margin-bottom:8px!important}#detail .service-detail-desc{font-size:11px!important;line-height:1.5!important;margin-bottom:6px!important}#detail .service-detail-price{font-size:24px!important;margin-bottom:8px!important}#detail .service-detail-duration{margin-bottom:9px!important}#detail .service-detail-book{height:46px!important;margin-bottom:9px!important}#detail .service-detail-include{padding:10px 18px 8px!important}#detail .service-detail-include p{margin:5px 0!important}}
 `;document.head.appendChild(s);
 const original=window.detail;
 window.detail=function(id){
  if(typeof booking==='undefined'||typeof SERVICES==='undefined')return original?.(id);
  const x=SERVICES.find(v=>v.id===id);if(!x)return original?.(id);
  booking={service:x};show('detail');
  const top=document.querySelector('#detail .top');
  if(top){top.innerHTML='<button class="round" type="button" aria-label="חזרה"></button>';top.querySelector('.round').onclick=()=>window.services?window.services():window.show?.('services');}
  const c=COPY[id]||COPY.gel, icon=ICONS[id]||ICONS.repair;
  document.getElementById('detailBody').innerHTML=`<div class="service-detail-ref"><div class="service-detail-icon"><img src="${icon}?v=${BUILD}" alt=""></div><h1>${x.n}</h1><p class="service-detail-desc">${c.desc}</p><p class="service-detail-from">החל מ</p><div class="service-detail-price">₪${x.p}</div><div class="service-detail-separator"></div><p class="service-detail-duration-label">משך טיפול</p><p class="service-detail-duration">${x.m>=60?`${Math.floor(x.m/60)} שעה${x.m%60?` ו${x.m%60} דקות`:''}`:`${x.m} דקות`}</p><button class="service-detail-book" type="button">הזמיני תור</button><div class="service-detail-include"><h3>מה כולל השירות?</h3>${c.include.map(v=>`<p>${v}</p>`).join('')}</div></div>`;
  document.querySelector('#detail .service-detail-book').onclick=()=>x.id==='remove'?calendar():extras();
 };
})();