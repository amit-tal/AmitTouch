(function(){
  const id='amit-booking-rescue-style';
  document.getElementById(id)?.remove();
  const style=document.createElement('style');
  style.id=id;
  style.textContent=`
    #book #bookingContinue[disabled]{opacity:.42!important;pointer-events:none!important}
    #book #bookingContinue:not([disabled]){opacity:1!important;pointer-events:auto!important;cursor:pointer!important}
  `;
  document.head.appendChild(style);

  let submitting=false;

  function bookingState(){
    try{return window.booking||booking||null}catch(_){return window.booking||null}
  }

  function syncTimeButton(btn){
    const b=bookingState();
    if(!b||!b.date)return;
    const value=(btn.textContent||'').trim();
    if(!value)return;
    b.time=value;
    try{window.booking=b}catch(_){}
    document.querySelectorAll('#book .time').forEach(x=>x.classList.toggle('sel',x===btn));
    const next=document.getElementById('bookingContinue');
    if(next){
      next.disabled=false;
      next.removeAttribute('disabled');
      next.setAttribute('aria-disabled','false');
    }
  }

  async function submitBooking(){
    if(submitting)return;
    const next=document.getElementById('bookingContinue');
    const b=bookingState();
    if(!b?.date||!b?.time||!b?.service)return;
    submitting=true;
    if(next){next.disabled=true;next.setAttribute('aria-disabled','true');next.textContent='רק רגע…';}
    try{
      if(typeof window.confirmBook!=='function')throw new Error('CONFIRM_BOOK_MISSING');
      await window.confirmBook();
    }catch(error){
      console.error('Booking submit failed',error);
      if(next&&document.body.contains(next)){
        next.disabled=false;
        next.removeAttribute('disabled');
        next.setAttribute('aria-disabled','false');
        next.textContent='המשך';
      }
      if(typeof window.amitNotice==='function')window.amitNotice('לא הצלחתי להשלים את קביעת התור. נסי שוב.','קביעת התור לא הושלמה');
    }finally{
      submitting=false;
    }
  }

  function repair(){
    document.querySelectorAll('#book .time').forEach(btn=>{
      if(btn.dataset.bookingRescueBound)return;
      btn.dataset.bookingRescueBound='1';
      btn.removeAttribute('onclick');
      btn.addEventListener('click',function(e){
        e.preventDefault();
        e.stopPropagation();
        syncTimeButton(this);
      });
    });
    const next=document.getElementById('bookingContinue');
    if(next&&!next.dataset.bookingRescueBound){
      next.dataset.bookingRescueBound='1';
      next.removeAttribute('onclick');
      next.addEventListener('click',function(e){
        e.preventDefault();
        e.stopPropagation();
        submitBooking();
      });
    }
  }

  const observer=new MutationObserver(()=>requestAnimationFrame(repair));
  observer.observe(document.body,{childList:true,subtree:true});
  document.addEventListener('click',e=>{
    const btn=e.target.closest?.('#book .time');
    if(btn&&!btn.dataset.bookingRescueBound){e.preventDefault();syncTimeButton(btn);repair();}
  },true);
  repair();
})();