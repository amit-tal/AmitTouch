(function(){
 const id='amit-booking-final-fix';document.getElementById(id)?.remove();
 const s=document.createElement('style');s.id=id;s.textContent=`
 #book .booking-month-nav>button{font-size:0!important;line-height:1!important;position:relative!important;color:transparent!important}
 #book .booking-month-nav>button:after{content:none!important;display:none!important}
 #book .booking-month-nav>button:before{display:grid!important;place-items:center!important;width:100%!important;height:100%!important;color:#315f5a!important;font-size:27px!important;font-weight:300!important;line-height:1!important}
 #book .booking-month-nav>button:first-child{grid-column:1!important}
 #book .booking-month-nav>button:first-child:before{content:'‹'!important}
 #book .booking-month-nav>button:last-child{grid-column:3!important}
 #book .booking-month-nav>button:last-child:before{content:'›'!important}
 #book .booking-month-nav>.booking-month-title{grid-column:2!important}
 #book .times{direction:rtl!important}
 `;document.head.appendChild(s);
 function normalizeArrows(){const nav=document.querySelector('#book .booking-month-nav');if(!nav)return;const buttons=nav.querySelectorAll(':scope>button');buttons.forEach(btn=>{btn.textContent='';});if(buttons[0])buttons[0].setAttribute('aria-label','חודש קודם');if(buttons[1])buttons[1].setAttribute('aria-label','חודש הבא');}
 function repairBooking(){const book=document.getElementById('book');if(!book)return;normalizeArrows();document.querySelectorAll('#book .time').forEach(btn=>{if(btn.dataset.amitFixed)return;btn.dataset.amitFixed='1';btn.addEventListener('click',()=>{document.querySelectorAll('#book .time').forEach(x=>x.classList.remove('sel'));btn.classList.add('sel');try{booking.time=btn.textContent.trim();}catch(_){}const next=document.getElementById('bookingContinue');if(next)next.disabled=false;});});}
 const originalCalendar=window.calendar;if(typeof originalCalendar==='function'&&!window.__AMIT_CALENDAR_REPAIRED__){window.__AMIT_CALENDAR_REPAIRED__=true;window.calendar=function(...args){const result=originalCalendar.apply(this,args);setTimeout(repairBooking,0);return result;};}
 const obs=new MutationObserver(()=>requestAnimationFrame(repairBooking));obs.observe(document.body,{childList:true,subtree:true});repairBooking();
})();