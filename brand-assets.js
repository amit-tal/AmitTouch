(function(){
  if(window.__AMIT_TOUCH_SPLASH_CONTROLLER__)return;
  window.__AMIT_TOUCH_SPLASH_CONTROLLER__=true;
  const style=document.createElement('style');
  style.id='amit-touch-brand-style';
  style.textContent=`
    :root{--hand:'GveretLevin',cursive;--ui-font:'Inter',Arial,sans-serif}
    html,body,body *,button,input,select,textarea,option,optgroup,label,a,p,span,div,h1,h2,h3,h4,h5,h6,strong,b,small,nav,section,header,footer{font-family:var(--ui-font)!important}
    body *::before,body *::after{font-family:var(--ui-font)!important}
    body :is(button,input,select,textarea,option,optgroup,label,a,p,span,h1,h2,h3,h4,h5,h6,strong,b,small,li,td,th,time){font-size:max(16px,1em)}
    .handwriting,.handwriting *,[data-handwriting],[data-handwriting] *,.hero-copy strong,.confirm .heart{font-family:var(--hand)!important;font-weight:100!important;font-variation-settings:'wght' 100!important;font-style:normal!important;font-synthesis:none!important;letter-spacing:0!important}
    .handwriting::before,.handwriting::after,[data-handwriting]::before,[data-handwriting]::after,.hero-copy strong::before,.hero-copy strong::after,.confirm .heart::before,.confirm .heart::after{font-family:var(--hand)!important}
    .hero-copy strong{font-size:25px!important;line-height:1.25!important}
    .confirm .heart{font-size:24px!important;line-height:1.25!important}
  `;
  document.head.appendChild(style);
  document.querySelectorAll('[data-handwriting]').forEach(el=>el.classList.add('handwriting'));
  window.AMIT_TOUCH_HANDWRITING_FONT='GveretLevin';
  window.__AMIT_BRAND_READY__=true;
  window.dispatchEvent(new CustomEvent('amit:splash-ready'));
})();