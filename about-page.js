(function(){
 const BUILD='20260820-about-icons-align-v9';
 let about=document.getElementById('about');
 if(!about){about=document.createElement('section');about.id='about';about.className='screen';document.querySelector('main.app')?.appendChild(about);}
 document.getElementById('amit-about-style')?.remove();
 const style=document.createElement('style');style.id='amit-about-style';style.textContent=`
 #about{min-height:100dvh!important;padding:30px 24px 100px!important;background:transparent!important;background-color:transparent!important;background-image:none!important;box-shadow:none!important;border:0!important;outline:0!important;filter:none!important;color:#315c57!important;direction:rtl!important;font-family:Inter,sans-serif!important;text-align:center!important;overflow:auto!important}
 #about:before,#about:after{content:none!important;display:none!important;background:none!important;box-shadow:none!important}
 #about .about-logo{display:block!important;width:min(190px,58vw)!important;height:auto!important;margin:8px auto 34px!important;object-fit:contain!important;background:transparent!important}
 #about .about-tagline{margin:0 auto 30px!important;max-width:320px!important;font-size:16px!important;line-height:1.75!important;font-weight:400!important;color:#385d59!important;background:transparent!important}
 #about .about-divider{height:1px!important;width:100%!important;max-width:330px!important;margin:0 auto 22px!important;background:linear-gradient(90deg,rgba(7,88,79,0) 0%,rgba(7,88,79,.22) 12%,rgba(7,88,79,.74) 50%,rgba(7,88,79,.22) 88%,rgba(7,88,79,0) 100%)!important;border:0!important;box-shadow:none!important}
 #about .about-contact{display:flex!important;flex-direction:column!important;align-items:center!important;gap:18px!important;width:100%!important;margin:0 auto 24px!important;background:transparent!important;transform:translateX(-20px)!important}
 #about .about-row{display:flex!important;flex-direction:row!important;align-items:center!important;justify-content:flex-start!important;gap:12px!important;min-height:32px!important;width:210px!important;max-width:100%!important;color:#516b68!important;font-size:15px!important;font-weight:400!important;text-decoration:none!important;direction:rtl!important;background:transparent!important;border:0!important;box-shadow:none!important;white-space:nowrap!important}
 #about .about-row span{display:block!important;text-align:right!important;direction:ltr!important;line-height:1.25!important;white-space:nowrap!important}
 #about .about-row.location span{direction:rtl!important}
 #about .about-icon-box{width:24px!important;height:24px!important;display:flex!important;align-items:center!important;justify-content:center!important;flex:0 0 24px!important}
 #about .about-icon{display:block!important;width:24px!important;height:24px!important;object-fit:contain!important;object-position:center!important;margin:0!important;background:transparent!important}
 #about .about-icon.instagram{width:21px!important;height:21px!important}
 #about .about-footer{padding-top:0!important;color:#57716e!important;font-size:14px!important;line-height:1.8!important;background:transparent!important}
 #about .about-footer a{display:block!important;color:#57716e!important;text-decoration:none!important;background:transparent!important}
 #about .about-version{margin-top:16px!important;font-size:12px!important;color:#81918e!important;direction:ltr!important}
 `;document.head.appendChild(style);
 const icon=(name,extra='')=>`<span class="about-icon-box"><img class="about-icon ${extra}" src="/assets/${encodeURIComponent(name)}.png?v=${BUILD}" alt=""></span>`;
 about.innerHTML=`<img class="about-logo" src="/assets/amitouch_logo_vector.png?v=${BUILD}" alt="AMITOUCH"><p class="about-tagline">סטודיו בוטיק לציפורניים, שנולד מאהבה לאסתטיקה, דיוק והפרטים הקטנים.<br>כל טיפול וכל עיצוב מקבלים את הטאץ׳ האישי שלהם בדיוק בשבילך.</p><div class="about-divider"></div><div class="about-contact"><a class="about-row" href="tel:0527467143">${icon('טלפון')}<span>052-7467143</span></a><a class="about-row" href="https://instagram.com/amit_touch_" target="_blank" rel="noopener">${icon('אינסטגרם','instagram')}<span>@amit_touch_</span></a><div class="about-row location">${icon('מיקום')}<span>מרכז ראשל״צ</span></div></div><div class="about-divider"></div><div class="about-footer"><a href="#" onclick="return false">מדיניות פרטיות</a><a href="#" onclick="return false">תנאי שימוש</a><div class="about-version">גרסה 1.0.0</div></div>`;
})();