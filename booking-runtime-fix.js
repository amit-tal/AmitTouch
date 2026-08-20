(function(){
  const BUILD='20260820-booking-fix-v1';

  function getUser(){
    try{if(window.user&&window.user.id)return window.user;}catch(_){}
    try{if(typeof user!=='undefined'&&user&&user.id)return user;}catch(_){}
    return null;
  }

  function jerusalemNow(){
    const parts=new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Jerusalem',year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',hour12:false}).formatToParts(new Date());
    const map=Object.fromEntries(parts.map(p=>[p.type,p.value]));
    return {date:`${map.year}-${map.month}-${map.day}`,minutes:Number(map.hour)*60+Number(map.minute)};
  }

  function isPastDate(date){return String(date)<jerusalemNow().date;}
  function isPastSlot(date,time){
    const now=jerusalemNow();
    if(String(date)<now.date)return true;
    if(String(date)>now.date)return false;
    const [h,m]=String(time||'00:00').split(':').map(Number);
    return h*60+m<=now.minutes;
  }

  function installStyle(){
    document.getElementById('amit-booking-runtime-style')?.remove();
    const style=document.createElement('style');
    style.id='amit-booking-runtime-style';
    style.textContent=`
      #book .day[disabled],#book .time[disabled]{opacity:.26!important;filter:grayscale(1)!important;cursor:not-allowed!important;pointer-events:none!important}
      #book .day.past,#book .time.past{color:#9ca5a3!important;background:rgba(100,110,108,.07)!important;box-shadow:none!important}
      #book .booking-month-nav{display:grid!important;grid-template-columns:42px 1fr 42px!important;align-items:center!important;margin:14px 0 16px!important}
      #book .booking-month-nav button{width:38px!important;height:38px!important;border:1px solid rgba(47,113,107,.12)!important;border-radius:50%!important;background:rgba(255,255,255,.34)!important;color:#2f716b!important;font-size:20px!important}
      #book .booking-month-title{text-align:center!important;font-size:17px!important;font-weight:400!important;color:#2f716b!important}
      #book .booking-empty{padding:18px!important;text-align:center!important;color:#71817e!important;font-size:13px!important}
      #book .primary[disabled]{opacity:.42!important;pointer-events:none!important;box-shadow:none!important}
    `;
    document.head.appendChild(style);
  }

  let viewYear,viewMonth;

  window.calendar=function(){
    if(!booking?.service)return;
    if(typeof window.show==='function')window.show('book');
    const now=new Date();
    viewYear=now.getFullYear();
    viewMonth=now.getMonth();
    renderCalendar();
  };

  function renderCalendar(){
    const nowJ=jerusalemNow();
    const first=new Date(viewYear,viewMonth,1).getDay();
    const days=new Date(viewYear,viewMonth+1,0).getDate();
    let cells='';
    for(let i=0;i<first;i++)cells+='<i></i>';
    for(let i=1;i<=days;i++){
      const iso=`${viewYear}-${String(viewMonth+1).padStart(2,'0')}-${String(i).padStart(2,'0')}`;
      const past=iso<nowJ.date;
      cells+=`<button class="day${past?' past':''}" ${past?'disabled':''} onclick="datePick('${iso}',this)">${i}</button>`;
    }
    const currentMonthStart=`${nowJ.date.slice(0,7)}-01`;
    const viewMonthStart=`${viewYear}-${String(viewMonth+1).padStart(2,'0')}-01`;
    const disablePrev=viewMonthStart<=currentMonthStart;
    const title=new Intl.DateTimeFormat('he-IL',{month:'long',year:'numeric'}).format(new Date(viewYear,viewMonth,1));
    const body=document.getElementById('bookBody');
    if(!body)return;
    body.innerHTML=`<div class="booking-month-nav"><button type="button" ${disablePrev?'disabled':''} onclick="bookingPrevMonth()">›</button><div class="booking-month-title">${title}</div><button type="button" onclick="bookingNextMonth()">‹</button></div><div class="week"><span>א</span><span>ב</span><span>ג</span><span>ד</span><span>ה</span><span>ו</span><span>ש</span></div><div class="days">${cells}</div><div id="timeArea"></div>`;
  }

  window.bookingPrevMonth=function(){
    const now=jerusalemNow();
    const current=`${now.date.slice(0,7)}-01`;
    let y=viewYear,m=viewMonth-1;if(m<0){m=11;y--;}
    const candidate=`${y}-${String(m+1).padStart(2,'0')}-01`;
    if(candidate<current)return;
    viewYear=y;viewMonth=m;renderCalendar();
  };
  window.bookingNextMonth=function(){viewMonth++;if(viewMonth>11){viewMonth=0;viewYear++;}renderCalendar();};

  window.datePick=async function(date,el){
    if(isPastDate(date))return;
    booking.date=date;booking.time=null;
    document.querySelectorAll('#book .day').forEach(x=>x.classList.remove('sel'));
    el?.classList.add('sel');
    const extra=booking.extra||{m:0};
    const area=document.getElementById('timeArea');
    if(area)area.innerHTML='<p class="subtitle">בודקת זמינות ביומן…</p>';
    try{
      const r=await fetch(`/api/availability?date=${encodeURIComponent(date)}&minutes=${booking.service.m+extra.m}`,{cache:'no-store'});
      const j=await r.json().catch(()=>({}));
      if(!r.ok)throw new Error(j.error||'AVAILABILITY_FAILED');
      const slots=(j.slots||[]).filter(t=>!isPastSlot(date,t));
      renderTimes(slots);
    }catch(error){
      console.error('Availability failed',error);
      if(area)area.innerHTML='<div class="glass card booking-empty">לא ניתן לטעון זמינות כרגע. נסי שוב בעוד רגע.</div>';
    }
  };

  window.renderTimes=function(slots){
    const area=document.getElementById('timeArea');if(!area)return;
    const valid=(slots||[]).filter(t=>booking?.date&&!isPastSlot(booking.date,t));
    if(!valid.length){area.innerHTML='<div class="glass card booking-empty">אין שעות פנויות בתאריך הזה.</div>';return;}
    area.innerHTML=`<h4>בחירת שעה</h4><div class="times">${valid.map(t=>`<button class="time" onclick="timePick('${t}',this)">${t}</button>`).join('')}</div><button class="primary" id="bookingContinue" style="margin-top:18px" onclick="confirmBook()" disabled>המשך</button>`;
  };

  window.timePick=function(t,e){
    if(!booking?.date||isPastSlot(booking.date,t))return;
    booking.time=t;
    document.querySelectorAll('#book .time').forEach(x=>x.classList.remove('sel'));
    e?.classList.add('sel');
    const next=document.getElementById('bookingContinue');if(next)next.disabled=false;
  };

  async function refreshCustomerAppointments(customerId){
    try{
      const r=await fetch('/api/customers/'+encodeURIComponent(customerId)+'/appointments',{cache:'no-store'});
      if(!r.ok)return;
      const result=await r.json();
      const mapped=(result.appointments||[]).filter(x=>x.status!=='cancelled').map(row=>{
        const start=new Date(row.starts_at);const extras=Array.isArray(row.extras)?row.extras:[];
        return {id:row.id,appointmentId:row.id,customerId:row.customer_id,service:row.service_name,price:Number(row.total_price||0),date:new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Jerusalem',year:'numeric',month:'2-digit',day:'2-digit'}).format(start),time:new Intl.DateTimeFormat('he-IL',{timeZone:'Asia/Jerusalem',hour:'2-digit',minute:'2-digit',hour12:false}).format(start),minutes:row.treatment_minutes,buffer:row.buffer_minutes,extra:extras.map(x=>x.name).filter(Boolean).join(', '),eventId:row.google_event_id,status:row.status};
      });
      window.appointments=mapped;
      try{appointments=mapped;}catch(_){}
      window.dispatchEvent(new CustomEvent('amit:appointments-updated'));
    }catch(error){console.warn('Appointment refresh failed',error);}
  }

  window.confirmBook=async function(){
    const current=getUser();
    if(!current?.id)return alert('יש להתחבר מחדש לפני קביעת תור');
    if(!booking?.service||!booking?.date||!booking?.time)return alert('בחרי תאריך ושעה');
    if(isPastSlot(booking.date,booking.time))return alert('לא ניתן להזמין תור למועד שכבר עבר');
    const ex=booking.extra||{n:'',p:0,m:0};
    const payload={customerId:current.id,serviceCode:booking.service.id,service:booking.service.n,price:booking.service.p+ex.p,date:booking.date,time:booking.time,minutes:booking.service.m+ex.m,extra:ex.n||''};
    const body=document.getElementById('bookBody');
    if(body)body.innerHTML='<div class="glass card"><p class="subtitle">קובעת את התור ביומן…</p></div>';
    try{
      const r=await fetch('/api/book',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)});
      const j=await r.json().catch(()=>({}));
      if(!r.ok){
        if(r.status===409){window.calendar();return alert('השעה נתפסה ממש עכשיו. בחרי שעה אחרת.');}
        if(j.error==='PAST_SLOT'){window.calendar();return alert('המועד הזה כבר עבר. בחרי מועד אחר.');}
        throw new Error(j.error||'BOOKING_FAILED');
      }
      await refreshCustomerAppointments(current.id);
      const statusText=j.appointment?.status==='pending'?'הבקשה נשלחה וממתינה לאישור':'ההזמנה בוצעה בהצלחה!';
      if(body)body.innerHTML=`<div class="confirm"><div class="check">✓</div><h2>${statusText}</h2><p class="heart">מחכה לך באהבה ♡</p><div class="summary glass card"><div><b>שירות</b><span>${payload.service}${payload.extra?' + '+payload.extra:''}</span></div><div><b>תאריך</b><span>${new Date(payload.date+'T12:00').toLocaleDateString('he-IL')}</span></div><div><b>שעה</b><span>${payload.time}</span></div></div><button class="primary" onclick="orders()">סיום</button></div>`;
    }catch(error){
      console.error('Booking failed',error);
      if(body)body.innerHTML='<div class="glass card booking-empty">לא הצלחתי לקבוע את התור. נסי שוב בעוד רגע.</div><button class="primary" onclick="calendar()">חזרה לבחירת מועד</button>';
    }
  };

  installStyle();
})();