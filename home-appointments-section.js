(function(){
 const home=document.getElementById('home');if(!home)return;
 const BUILD='20260820-home-appointments-calendar-v5';
 document.getElementById('amit-home-appointments-style')?.remove();
 const style=document.createElement('style');style.id='amit-home-appointments-style';style.textContent=`
 #home .appointments-stack,#home .appointment-block,#home .appointment-heading{background:transparent!important;background-color:transparent!important;background-image:none!important;box-shadow:none!important;border:0!important;outline:0!important;filter:none!important}
 #home .appointments-stack:before,#home .appointments-stack:after,#home .appointment-block:before,#home .appointment-block:after{content:none!important;display:none!important}
 #home .appointments-stack{margin:4px 0 22px!important;display:flex!important;flex-direction:column!important;gap:18px!important}
 #home .appointment-block{margin:0!important}
 #home .appointment-heading{display:flex!important;align-items:center!important;justify-content:center!important;gap:14px!important;margin:0 0 12px!important;color:#07584f!important;font-family:Inter,sans-serif!important;font-size:18px!important;font-weight:500!important;line-height:1.2!important;text-align:center!important;padding:0!important}
 #home .appointment-heading:before,#home .appointment-heading:after{content:''!important;height:1px!important;flex:1!important;background:linear-gradient(90deg,transparent 0%,rgba(7,88,79,.22) 28%,rgba(7,88,79,.72) 100%)!important}
 #home .appointment-heading:after{transform:scaleX(-1)!important}
 #home .appointment-card{display:grid!important;grid-template-columns:54px minmax(0,1fr) 82px!important;align-items:center!important;gap:14px!important;min-height:112px!important;padding:16px 18px!important;border-radius:22px!important;border:1px solid rgba(255,255,255,.9)!important;background:linear-gradient(145deg,rgba(255,255,255,.74),rgba(255,250,247,.58))!important;box-shadow:0 10px 24px rgba(93,63,52,.08),inset 0 1px 0 rgba(255,255,255,.98)!important;backdrop-filter:blur(20px) saturate(145%)!important;-webkit-backdrop-filter:blur(20px) saturate(145%)!important;direction:ltr!important}
 #home .appointment-status{width:48px!important;height:48px!important;border-radius:50%!important;background:rgba(248,218,211,.76)!important;display:grid!important;place-items:center!important;overflow:hidden!important;border:0!important;padding:0!important;cursor:pointer!important}
 #home .appointment-status img{width:34px!important;height:34px!important;display:block!important;object-fit:contain!important;object-position:center!important;pointer-events:none!important}
 #home .appointment-status svg{width:24px!important;height:24px!important;display:block!important;pointer-events:none!important}
 #home .appointment-main{direction:rtl!important;text-align:center!important;font-family:Inter,sans-serif!important;color:#151c1b!important}
 #home .appointment-service{font-size:20px!important;line-height:1.25!important;font-weight:400!important;margin:0!important}
 #home .appointment-date{direction:rtl!important;text-align:center!important;border-left:1px solid rgba(7,88,79,.12)!important;padding-left:12px!important;color:#07584f!important;font-family:Inter,sans-serif!important}
 #home .appointment-day{font-size:14px!important;line-height:1.2!important;font-weight:500!important;margin:0 0 4px!important}
 #home .appointment-date-num{font-size:27px!important;line-height:1!important;font-weight:400!important;margin:0!important}
 #home .appointment-time{font-size:17px!important;line-height:1.2!important;font-weight:300!important;color:#e58f87!important;margin:7px 0 0!important}
 @media(max-width:360px){#home .appointment-card{grid-template-columns:46px minmax(0,1fr) 74px!important;padding:14px 12px!important;gap:10px!important}#home .appointment-service{font-size:18px!important}}
 `;document.head.appendChild(style);

 function currentUserPhone(){try{if(typeof user!=='undefined'&&user?.phone)return String(user.phone)}catch(_){}try{const raw=localStorage.getItem('user')||localStorage.getItem('amitUser')||sessionStorage.getItem('user');if(raw){const u=JSON.parse(raw);return String(u.phone||'')}}catch(_){}return''}
 function getUpcoming(){try{const list=JSON.parse(localStorage.getItem('amitTouchAppointments')||'[]');const phone=currentUserPhone();const now=Date.now();return list.filter(a=>!phone||String(a.phone||'')===phone).map(a=>({...a,_ts:new Date(`${a.date}T${a.time||'00:00'}`).getTime()})).filter(a=>Number.isFinite(a._ts)&&a._ts>=now).sort((a,b)=>a._ts-b._ts)[0]||null}catch(_){return null}}
 function heDay(iso){try{return new Intl.DateTimeFormat('he-IL',{weekday:'long'}).format(new Date(iso+'T12:00'))}catch(_){return''}}
 function shortDate(iso){const [y,m,d]=String(iso||'').split('-');return d&&m?`${d}.${m}`:''}
 function escIcs(v){return String(v||'').replace(/\\/g,'\\\\').replace(/\n/g,'\\n').replace(/,/g,'\\,').replace(/;/g,'\\;')}
 function pad(n){return String(n).padStart(2,'0')}
 function icsLocal(dt){return `${dt.getFullYear()}${pad(dt.getMonth()+1)}${pad(dt.getDate())}T${pad(dt.getHours())}${pad(dt.getMinutes())}00`}
 function addToCalendar(data){
   if(!data?.date||!data?.time)return;
   const start=new Date(`${data.date}T${data.time}:00`);if(Number.isNaN(start.getTime()))return;
   const minutes=Number(data.minutes)||60;const end=new Date(start.getTime()+minutes*60000);
   const title=`תור אצל AMIT TOUCH - ${data.service||'טיפול'}`;
   const desc='תור שנקבע דרך AMIT TOUCH';
   const uid=`amit-touch-${data.id||start.getTime()}@amit-touch`;
   const ics=['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//AMIT TOUCH//Booking//HE','CALSCALE:GREGORIAN','METHOD:PUBLISH','BEGIN:VEVENT',`UID:${uid}`,`DTSTAMP:${icsLocal(new Date())}`,`DTSTART:${icsLocal(start)}`,`DTEND:${icsLocal(end)}`,`SUMMARY:${escIcs(title)}`,`DESCRIPTION:${escIcs(desc)}`,'END:VEVENT','END:VCALENDAR'].join('\r\n');
   const blob=new Blob([ics],{type:'text/calendar;charset=utf-8'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download='amit-touch-appointment.ics';document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1500);
 }

 const titles=[...home.querySelectorAll('.section-title')];
 const lastTitle=titles.find(t=>/הזמנה אחרונה|הזמנה הקרובה|הזמנה/.test((t.textContent||'').trim()));
 const lastCard=home.querySelector('.next-card');
 if(!lastCard)return;
 const host=document.createElement('div');host.className='appointments-stack';
 function card({day,date,time,service,future,calendarData}){const el=document.createElement('div');el.className='appointment-card';const status=future?`<button type="button" class="appointment-status add-calendar" aria-label="הוספה ליומן"><img src="/assets/%D7%AA%D7%95%D7%A8%20%D7%A2%D7%AA%D7%99%D7%93%D7%99.png?v=${BUILD}" alt=""></button>`:`<div class="appointment-status" aria-hidden="true"><svg viewBox="0 0 32 32" fill="none"><path d="M8 16.5l5 5L24 10" stroke="#111" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg></div>`;el.innerHTML=`${status}<div class="appointment-main"><div class="appointment-service">${service}</div></div><div class="appointment-date"><div class="appointment-day">${day}</div><div class="appointment-date-num">${date}</div><div class="appointment-time">${time}</div></div>`;if(future){el.querySelector('.add-calendar')?.addEventListener('click',e=>{e.stopPropagation();addToCalendar(calendarData)})}return el;}
 function block(title,data){const b=document.createElement('section');b.className='appointment-block';const h=document.createElement('div');h.className='appointment-heading';h.textContent=title;b.append(h,card(data));return b;}
 const upcoming=getUpcoming();
 const futureData=upcoming?{day:heDay(upcoming.date),date:shortDate(upcoming.date),time:upcoming.time||'',service:upcoming.service||'תור',future:true,calendarData:upcoming}:{day:'שלישי',date:'21.05',time:'15:30',service:'מניקור ג׳ל',future:true,calendarData:null};
 host.append(block('תורים עתידיים',futureData));
 host.append(block('הזמנה אחרונה',{day:'שלישי',date:'21.05',time:'15:30',service:'מניקור + ג׳ל לק',future:false}));
 if(lastTitle)lastTitle.remove();lastCard.replaceWith(host);
})();