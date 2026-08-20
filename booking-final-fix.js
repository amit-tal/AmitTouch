(function(){
 const id='amit-booking-final-fix';document.getElementById(id)?.remove();
 const s=document.createElement('style');s.id=id;s.textContent=`
 #book .booking-month-nav>button:before,#book .booking-month-nav>button:after{content:none!important;display:none!important}
 #book .booking-month-nav>button{font-size:26px!important;line-height:1!important}
 #book .booking-month-nav>button:first-child{grid-column:1!important}
 #book .booking-month-nav>button:last-child{grid-column:3!important}
 #book .booking-month-nav>.booking-month-title{grid-column:2!important}
 #book .times{direction:rtl!important}
 `;document.head.appendChild(s);
 function normalizeArrows(){const nav=document.querySelector('#book .booking-month-nav');if(!nav)return;const buttons=nav.querySelectorAll(':scope>button');if(buttons[0]){buttons[0].textContent='‹';buttons[0].setAttribute('aria-label','חודש קודם');}if(buttons[1]){buttons[1].textContent='›';buttons[1].setAttribute('aria-label','חודש הבא');}}
 function repairBooking(){const book=document.getElementById('book');if(!book)return;book.classList.remove('confirm-mode');normalizeArrows();document.querySelectorAll('#book .time').forEach(btn=>{if(btn.dataset.amitFixed)return;btn.dataset.amitFixed='1';btn.addEventListener('click',()=>{document.querySelectorAll('#book .time').forEach(x=>x.classList.remove('sel'));btn.classList.add('sel');try{booking.time=btn.textContent.trim();}catch(_){}const next=document.getElementById('bookingContinue');if(next)next.disabled=false;});});const next=document.getElementById('bookingContinue');if(next&&!next.dataset.amitFixed){next.dataset.amitFixed='1';next.addEventListener('click',e=>{if(next.disabled)return;e.preventDefault();e.stopPropagation();if(typeof window.confirmBook==='function')window.confirmBook();},true);}}
 const originalCalendar=window.calendar;if(typeof originalCalendar==='function'&&!window.__AMIT_CALENDAR_REPAIRED__){window.__AMIT_CALENDAR_REPAIRED__=true;window.calendar=function(...args){const result=originalCalendar.apply(this,args);setTimeout(repairBooking,0);return result;};}
 const obs=new MutationObserver(()=>requestAnimationFrame(repairBooking));obs.observe(document.body,{childList:true,subtree:true});repairBooking();
})();