(function(){
 const BUILD='20260820-about-layout-v3';
 let about=document.getElementById('about');
 if(!about){about=document.createElement('section');about.id='about';about.className='screen';document.querySelector('main.app')?.appendChild(about);}
 document.getElementById('amit-about-style')?.remove();
 const style=document.createElement('style');style.id='amit-about-style';style.textContent=`
 #about{min-height:100dvh!important;padding:30px 24px 100px!important;background:#fbf6f0!important;color:#315c57!important;direction:rtl!important;font-family:Inter,sans-serif!important;text-align:center!important;overflow:auto!important}
 #about .about-logo{display:block!important;width:min(190px,58vw)!important;height:auto!important;margin:8px auto 18px!important;object-fit:contain!important}
 #about .about-tagline{margin:0 auto 30px!important;max-width:320px!important;font-size:16px!important;line-height:1.75!important;font-weight:400!important;color:#385d59!important}
 #about .about-divider{height:1px!important;width:100%!important;max-width:330px!important;margin:0 auto 22px!important;background:linear-gradient(90deg,rgba(7,88,79,0) 0%,rgba(7,88,79,.22) 12%,rgba(7,88,79,.74) 50%,rgba(7,88,79,.22) 88%,rgba(7,88,79,0) 100%)!important;border:0!important;box-shadow:none!important}
 #about .about-contact{display:grid!important;gap:18px!important;max-width:290px!important;margin:0 auto 24px!important}
 #about .about-row{display:flex!important;flex-direction:row!important;align-items:center!important;justify-content:center!important;gap:12px!important;min-height:32px!important;color:#516b68!important;font-size:15px!important;font-weight:400!important;text-decoration:none!important;direction:rtl!important}
 #about .about-row span{display:block!important;text-align:right!important;direction:ltr!important;line-height:1.25!important}
 #about .about-row.location span{direction:rtl!important}
 #about .about-icon{width:22px!important;height:22px!important;flex:0 0 22px!important;object-fit:contain!important;display:block!important;margin:0!important}
 #about .about-footer{padding-top:0!important;color:#57716e!important;font-size:14px!important;line-height:1.8!important}
 #about .about-footer a{display:block!important;color:#57716e!important;text-decoration:none!important}
 #about .about-version{margin-top:16px!important;font-size:12px!important;color:#81918e!important;direction:ltr!important}
 `;document.head.appendChild(style);
 const icon=(name)=>`<img class="about-icon" src="/assets/${encodeURIComponent(name)}.png?v=${BUILD}" alt="">`;
 about.innerHTML=`<img class="about-logo" src="/assets/amitouch_logo_vector.png?v=${BUILD}" alt="AMITOUCH"><p class="about-tagline">סטודיו בוטיק לציפורניים, שנולד מאהבה לאסתטיקה, דיוק והפרטים הקטנים.<br>כל טיפול וכל עיצוב מקבלים את הטאץ׳ האישי שלהם ־ בדיוק בשבילך.</p><div class="about-divider"></div><div class="about-contact"><a class="about-row" href="tel:0527467143">${icon('טלפון')}<span>052-7467143</span></a><a class="about-row" href="https://instagram.com/amit_touch_" target="_blank" rel="noopener">${icon('אינסטגרם')}<span>@amit_touch_</span></a><div class="about-row location">${icon('מיקום')}<span>מרכז ראשל״צ</span></div></div><div class="about-divider"></div><div class="about-footer"><a href="#" onclick="return false">מדיניות פרטיות</a><a href="#" onclick="return false">תנאי שימוש</a><div class="about-version">גרסה 1.0.0</div></div>`;
})();