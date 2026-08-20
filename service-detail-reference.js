(function(){
 const BUILD='20260820-service-detail-ref-v1';
 const ICONS={gel:'/assets/%D7%9E%D7%A0%D7%99%D7%A7%D7%95%D7%A8%20%D7%92%D7%9C.png',new:'/assets/ChatGPT%20Image%20Aug%2019%2C%202026%2C%2004_04_17%20PM.png',fill:'/assets/%D7%9E%D7%99%D7%9C%D7%95%D7%99.png',repair:'/assets/%D7%94%D7%A9%D7%9C%D7%9E%D7%94.png',remove:'/assets/%D7%94%D7%A1%D7%A8%D7%94.png'};
 const COPY={
  gel:{desc:'מניקור ג׳ל מוקפד במראה נקי ומדויק, כולל הכנת הציפורן, התאמת צורה ומריחה מקצועית.',include:['ייעוץ והתאמת צורה','מניקור והכנת הציפורן','מריחת ג׳ל וגימור מדויק']},
  new:{desc:'בנייה בהתאמה אישית למבנה הציפורן, בשיטה מתקדמת ובגימור נקי, מדויק ועמיד לאורך זמן.',include:['ייעוץ והתאמת צורה','בניית ציפורניים','שיוף ועיצוב','מריחת ג׳ל לק']},
  fill:{desc:'מילוי מקצועי לבנייה קיימת, חידוש המבנה ואיזון הציפורן לקבלת מראה אחיד, נקי ומדויק.',include:['בדיקת המבנה הקיים','מילוי ואיזון המבנה','שיוף ועיצוב','מריחת ג׳ל לק']},
  repair:{desc:'תיקון ממוקד לציפורן שנשברה או נפגעה, תוך התאמה למבנה ולאורך הקיים וגימור אחיד.',include:['בדיקת הציפורן','תיקון והשלמת המבנה','שיוף והתאמת צורה','גימור מדויק']},
  remove:{desc:'הסרה עדינה ומבוקרת של החומר הקיים, תוך שמירה על הציפורן הטבעית והכנתה להמשך.',include:['הסרה מבוקרת','שיוף עדין','ניקוי הציפורן','גימור טבעי']}
 };
 document.getElementById('amit-service-detail-style')?.remove();
 const s=document.createElement('style');s.id='amit-service-detail-style';s.textContent=`
 #detail{padding:18px 12px 100px!important;background:transparent!important;direction:rtl!important;color:#315c57!important;overflow-y:auto!important;scrollbar-width:none!important}#detail::-webkit-scrollbar{display:none!important}
 #detail .top{height:48px!important;margin-bottom:2px!important}#detail .top .round{border:0!important;background:transparent!important;box-shadow:none!important;backdrop-filter:none!important;font-size:27px!important;color:#214e49!important}#detail .top b{font-size:14px!important;font-weight:600!important;color:#173f3b!important}
 #detail .service-detail-ref{text-align:center!important;max-width:360px!important;margin:0 auto!important;padding:0 5px!important}
 #detail .service-detail-icon{width:112px!important;height:112px!important;margin:2px auto 6px!important;display:flex!important;align-items:center!important;justify-content:center!important;background:transparent!important;border:0!important;box-shadow:none!important}
 #detail .service-detail-icon img{width:104px!important;height:104px!important;object-fit:contain!important;display:block!important}
 #detail .service-detail-ref h1{font-size:21px!important;line-height:1.25!important;font-weight:500!important;margin:2px 0 12px!important;color:#315c57!important}
 #detail .service-detail-desc{font-size:11.5px!important;line-height:1.75!important;color:#687b78!important;max-width:265px!important;margin:0 auto 7px!important;font-weight:300!important}
 #detail .service-detail-from{font-size:10px!important;color:#778582!important;margin:2px 0 0!important}.service-detail-price{font-size:24px!important;font-weight:400!important;color:#405f5c!important;margin:0 0 9px!important;direction:ltr!important}
 #detail .service-detail-separator{height:1px!important;background:rgba(47,113,107,.12)!important;margin:0 0 9px!important}
 #detail .service-detail-duration-label{font-size:10px!important;color:#7a8785!important;margin:0 0 3px!important}.service-detail-duration{font-size:12px!important;color:#526d69!important;margin:0 0 13px!important}
 #detail .service-detail-book{width:100%!important;border:0!important;border-radius:10px!important;padding:13px 14px!important;background:linear-gradient(90deg,#397d76,#276a64)!important;color:white!important;font-size:15px!important;font-weight:600!important;box-shadow:0 6px 14px rgba(37,93,87,.12)!important;margin:0 0 12px!important}
 #detail .service-detail-include{border-radius:15px!important;padding:12px 15px 10px!important;background:rgba(255,255,255,.48)!important;border:1px solid rgba(255,255,255,.88)!important;box-shadow:0 5px 16px rgba(70,72,66,.06)!important;text-align:right!important}
 #detail .service-detail-include h3{text-align:center!important;font-size:11px!important;font-weight:500!important;margin:0 0 8px!important;color:#315c57!important}.service-detail-include p{position:relative!important;font-size:11px!important;color:#607572!important;margin:6px 0!important;padding-right:0!important;padding-left:23px!important;line-height:1.45!important}.service-detail-include p:after{content:'✓'!important;position:absolute!important;left:0!important;top:0!important;color:#2f716b!important;font-size:14px!important}.service-detail-include p:before{content:none!important}
 `;document.head.appendChild(s);
 const original=window.detail;
 window.detail=function(id){
  if(typeof booking==='undefined'||typeof SERVICES==='undefined')return original?.(id);
  const x=SERVICES.find(v=>v.id===id);if(!x)return original?.(id);
  booking={service:x};show('detail');
  const c=COPY[id]||COPY.gel, icon=ICONS[id]||ICONS.repair;
  document.getElementById('detailBody').innerHTML=`<div class="service-detail-ref"><div class="service-detail-icon"><img src="${icon}?v=${BUILD}" alt=""></div><h1>${x.n}</h1><p class="service-detail-desc">${c.desc}</p><p class="service-detail-from">החל מ</p><div class="service-detail-price">₪${x.p}</div><div class="service-detail-separator"></div><p class="service-detail-duration-label">משך טיפול</p><p class="service-detail-duration">${x.m>=60?`${Math.floor(x.m/60)} שעה${x.m%60?` ו${x.m%60} דקות`:''}`:`${x.m} דקות`} + 30 דקות</p><button class="service-detail-book" type="button">הזמיני תור</button><div class="service-detail-include"><h3>מה כולל השירות?</h3>${c.include.map(v=>`<p>${v}</p>`).join('')}</div></div>`;
  document.querySelector('#detail .service-detail-book').onclick=()=>x.id==='remove'?calendar():extras();
 };
})();