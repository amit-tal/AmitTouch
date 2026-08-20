(function(){
 const BUILD='20260820-about-icons-v2';
 let about=document.getElementById('about');
 if(!about){about=document.createElement('section');about.id='about';about.className='screen';document.querySelector('main.app')?.appendChild(about);}
 document.getElementById('amit-about-style')?.remove();
 const style=document.createElement('style');style.id='amit-about-style';style.textContent=`
 #about{min-height:100dvh!important;padding:30px 24px 100px!important;background:#fbf6f0!important;color:#315c57!important;direction:rtl!important;font-family:Inter,sans-serif!important;text-align:center!important;overflow:auto!important}
 #about .about-logo{display:block!important;width:min(190px,58vw)!important;height:auto!important;margin:8px auto 18px!important;object-fit:contain!important}
 #about .about-tagline{margin:0 auto 28px!important;max-width:290px!important;font-size:17px!important;line-height:1.65!important;font-weight:400!important;color:#385d59!important}
 #about .about-divider{height:1px!important;margin:0 -24px 18px!important;background:rgba(7,88,79,.09)!important}
 #about .about-contact{display:grid!important;gap:17px!important;max-width:290px!important;margin:0 auto 22px!important}
 #about .about-row{display:grid!important;grid-template-columns:28px 1fr 28px!important;align-items:center!important;gap:8px!important;min-height:30px!important;color:#516b68!important;font-size:15px!important;font-weight:400!important;text-decoration:none!important}
 #about .about-row span{grid-column:2!important;text-align:center!important;direction:ltr!important}
 #about .about-row.location span{direction:rtl!important}
 #about .about-icon{grid-column:3!important;width:22px!important;height:22px!important;justify-self:center!important;object-fit:contain!important;display:block!important}
 #about .about-footer{padding-top:20px!important;color:#57716e!important;font-size:14px!important;line-height:1.8!important}
 #about .about-footer a{display:block!important;color:#57716e!important;text-decoration:none!important}
 #about .about-version{margin-top:16px!important;font-size:12px!important;color:#81918e!important;direction:ltr!important}
 `;document.head.appendChild(style);
 const icon=(name)=>`<img class="about-icon" src="/assets/${encodeURIComponent(name)}.png?v=${BUILD}" alt="">`;
 about.innerHTML=`<img class="about-logo" src="/assets/amitouch_logo_vector.png?v=${BUILD}" alt="AMITOUCH"><p class="about-tagline">סטודיו בוטיק לציפורניים<br>שירות אישי, מקצועי ומדויק</p><div class="about-divider"></div><div class="about-contact"><a class="about-row" href="tel:0527467143">${icon('טלפון')}<span>052-7467143</span></a><a class="about-row" href="https://instagram.com/amit_touch_" target="_blank" rel="noopener">${icon('אינסטגרם')}<span>@amit_touch_</span></a><div class="about-row location">${icon('מיקום')}<span>מרכז ראשל״צ</span></div></div><div class="about-divider"></div><div class="about-footer"><a href="#" onclick="return false">מדיניות פרטיות</a><a href="#" onclick="return false">תנאי שימוש</a><div class="about-version">גרסה 1.0.0</div></div>`;
})();