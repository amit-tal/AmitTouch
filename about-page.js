(function(){
 const BUILD='20260820-about-page-v1';
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
 #about .about-icon{grid-column:3!important;width:21px!important;height:21px!important;justify-self:center!important;color:#587975!important}
 #about .about-footer{padding-top:20px!important;color:#57716e!important;font-size:14px!important;line-height:1.8!important}
 #about .about-footer a{display:block!important;color:#57716e!important;text-decoration:none!important}
 #about .about-version{margin-top:16px!important;font-size:12px!important;color:#81918e!important;direction:ltr!important}
 `;document.head.appendChild(style);
 const icon=(type)=>type==='phone'?'<svg class="about-icon" viewBox="0 0 24 24" fill="none"><path d="M7.5 3.5 10 8 8.3 9.8c1.1 2.5 3.1 4.5 5.6 5.6l1.8-1.7 4.5 2.5-.8 3.1c-.2.8-.9 1.3-1.7 1.2C10.1 19.7 4.3 13.9 3.5 6.3c-.1-.8.4-1.5 1.2-1.7l2.8-1.1Z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>':type==='instagram'?'<svg class="about-icon" viewBox="0 0 24 24" fill="none"><rect x="3.5" y="3.5" width="17" height="17" rx="5" stroke="currentColor" stroke-width="1.6"/><circle cx="12" cy="12" r="4" stroke="currentColor" stroke-width="1.6"/><circle cx="17.4" cy="6.8" r="1" fill="currentColor"/></svg>':'<svg class="about-icon" viewBox="0 0 24 24" fill="none"><path d="M20 10c0 5.3-8 11-8 11S4 15.3 4 10a8 8 0 1 1 16 0Z" stroke="currentColor" stroke-width="1.6"/><circle cx="12" cy="10" r="2.5" stroke="currentColor" stroke-width="1.6"/></svg>';
 about.innerHTML=`<img class="about-logo" src="/assets/amitouch_logo_vector.png?v=${BUILD}" alt="AMITOUCH"><p class="about-tagline">סטודיו בוטיק לציפורניים<br>שירות אישי, מקצועי ומדויק</p><div class="about-divider"></div><div class="about-contact"><a class="about-row" href="tel:0527467143">${icon('phone')}<span>052-7467143</span></a><a class="about-row" href="https://instagram.com/amit_touch_" target="_blank" rel="noopener">${icon('instagram')}<span>@amit_touch_</span></a><div class="about-row location">${icon('location')}<span>מרכז ראשל״צ</span></div></div><div class="about-divider"></div><div class="about-footer"><a href="#" onclick="return false">מדיניות פרטיות</a><a href="#" onclick="return false">תנאי שימוש</a><div class="about-version">גרסה 1.0.0</div></div>`;
})();