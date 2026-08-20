(function(){
  const STYLE_ID='amit-touch-font-minimum-16';
  function install(){
    document.getElementById(STYLE_ID)?.remove();
    const style=document.createElement('style');
    style.id=STYLE_ID;
    style.textContent=`
      html{font-size:16px!important;-webkit-text-size-adjust:100%!important;text-size-adjust:100%!important}
      body,body *{--amit-min-font:16px}
      body :is(button,input,select,textarea,option,optgroup,label,a,p,span,h1,h2,h3,h4,h5,h6,strong,b,small,li,td,th,time,legend,figcaption,summary){font-size:max(16px,1em)!important}
      body input::placeholder,body textarea::placeholder{font-size:16px!important}
      body [style*="font-size"]{font-size:max(16px,1em)!important}
      body :is(.subtitle,.muted,.hint,.note,.status,.badge,.chip,.nav-label,.time,.day,.booking-month-title,.service-detail-desc,.service-detail-from,.service-detail-duration-label,.service-detail-duration,.extra-copy,.extra-copy small,.extra-required-note,.art-file-name){font-size:max(16px,1em)!important}
      #splash .splash-tag,#splash .splash-tag *,.handwriting,.handwriting *,[data-handwriting],[data-handwriting] *,.hero-copy strong,.confirm .heart{font-size:max(16px,1em)!important}
    `;
    document.head.appendChild(style);
  }
  function audit(root=document){
    root.querySelectorAll?.('body *').forEach(el=>{
      if(el.children.length===0 && el.textContent?.trim()){
        const size=parseFloat(getComputedStyle(el).fontSize);
        if(Number.isFinite(size)&&size<16)el.style.setProperty('font-size','16px','important');
      }
    });
  }
  function run(){install();audit();}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run,{once:true});else run();
  const observer=new MutationObserver(()=>requestAnimationFrame(()=>audit()));
  observer.observe(document.documentElement,{childList:true,subtree:true});
  window.addEventListener('load',()=>setTimeout(audit,0),{once:true});
})();