(function(){
 const home=document.getElementById('home');if(!home)return;
 const BUILD='20260820-home-appointments-pending-v8';
 document.getElementById('amit-home-appointments-style')?.remove();
 const style=document.createElement('style');style.id='amit-home-appointments-style';style.textContent=`
 #home .appointments-stack,#home .appointment-block,#home .appointment-heading{background:transparent!important;background-color:transparent!important;background-image:none!important;box-shadow:none!important;border:0!important;outline:0!important;filter:none!important}
 #home .appointments-stack:before,#home .appointments-stack:after,#home .appointment-block:before,#home .appointment-block:after{content:none!important;display:none!important}
 #home .appointments-stack{margin:4px 0 22px!important;display:flex!important;flex-direction:column!important;gap:18px!important}
 #home .appointment-block{margin:0!important}
 #home .appointment-heading{display:flex!important;align-items:center!important;justify-content:center!important;gap:14px!important;margin:0 0 12px!important;color:#07584f!important;font-family:Inter,sans-serif!important;font-size:18px!important;font-weight:500!important;line-height:1.2!important;text-align:center!important;padding:0!important}
 #home .appointment-heading:before,#home .appointment-heading:after{content:''!important;height:1px!important;flex:1!important;background:linear-gradient(90deg,transparent 0%,rgba(7,88,79,.22) 28%,rgba(7,88,79,.72) 100%)!important}
 #home .appointment-heading:after{transform:scaleX(-1)!important}
 #home .appointment-list{display:flex!important;flex-direction:column!important;gap:10px!important}
 #home .appointment-card{display:grid!important;grid-template-columns:54px minmax(0,1fr) 82px!important;align-items:center!important;gap:14px!important;min-height:112px!important;padding:16px 18px!important;border-radius:22px!important;border:1px solid rgba(255,255,255,.9)!important;background:linear-gradient(145deg,rgba(255,255,255,.74),rgba(255,250,247,.58))!important;box-shadow:0 10px 24px rgba(93,63,52,.08),inset 0 1px 0 rgba(255,255,255,.98)!important;backdrop-filter:blur(20px) saturate(145%)!important;-webkit-backdrop-filter:blur(20px) saturate(145%)!important;direction:ltr!important}
 #home .appointment-card.is-pending{border-color:rgba(229,143,135,.24)!important;background:linear-gradient(145deg,rgba(255,255,255,.76),rgba(255,244,241,.64))!important}
 #home .appointment-status{width:48px!important;height:48px!important;border-radius:50%!important;background:rgba(248,218,211,.76)!important;display:grid!important;place-items:center!important;overflow:hidden!important;border:0!important;padding:0!important;cursor:pointer!important}
 #home .appointment-status img{width:34px!important;height:34px!important;display:block!important;object-fit:contain!important;object-position:center!important;pointer-events:none!important}
 #home .appointment-status svg{width:24px!important;height:24px!important;display:block!important;pointer-events:none!important}
 #home .appointment-main{direction:rtl!important;text-align:center!important;font-family:Inter,sans-serif!important;color:#151c1b!important}
 #home .appointment-service{font-size:20px!important;line-height:1.25!important;font-weight:400!important;margin:0!important}
 #home .appointment-note{display:inline-flex!important;align-items:center!important;justify-content:center!important;margin:8px auto 0!important;padding:5px 10px!important;border-radius:999px!important;font-size:11px!important;line-height:1.2!important;font-weight:400!important;color:#a9655f!important;background:rgba(248,218,211,.62)!important;border:1px solid rgba(229,143,135,.18)!important}
 #home .appointment-date{direction:rtl!important;text-align:center!important;border-left:1px solid rgba(7,88,79,.12)!important;padding-left:12px!important;color:#07584f!important;font-family:Inter,sans-serif!important}
 #home .appointment-day{font-size:14px!important;line-height:1.2!important;font-weight:500!important;margin:0 0 4px!important}
 #home .appointment-date-num{font-size:27px!important;line-height:1!important;font-weight:400!important;margin:0!important}
 #home .appointment-time{font-size:17px!important;line-height:1.2!important;font-weight:300!important;color:#e58f87!important;margin:7px 0 0!important}
 #home .appointment-empty{padding:18px!important;border-radius:18px!important;text-align:center!important;font-family:Inter,sans-serif!important;font-size:14px!important;font-weight:300!important;color:#67807d!important;background:rgba(255,255,255,.42)!important;border:1px solid rgba(255,255,255,.72)!important}
 @media(max-width:360px){#home .appointment-card{grid-template-columns:46px minmax(0,1fr) 74px!important;padding:14px 12px!important;gap:10px!important}#home .appointment-service{font-size:18px!important}}
 `;document.head.appendChild(style);

 function allAppointments(){
   try{
     if(Array.isArray(window.appointments))return window.appointments.filter(a=>a&&a.status!=='cancelled');
   }catch(_){}
   return [];
 }
 function appointmentTs(a){
   const date=String(a?.date||'');const time=String(a?.time||'00:00');
   const ts=new Date(`${date}T${time.length===5?time+':00':time}`).getTime();
   return Number.isFinite(ts)?ts:NaN;
 }
 function splitAppointments(){
   const now=Date.now();
   const list=allAppointments().map(a=>({...a,_ts:appointmentTs(a)})).filter(a=>Number.isFinite(a._ts));
   const upcoming=list.filter(a=>a._ts>now).sort((a,b)=>a._ts-b._ts);
   const past=list.filter(a=>a._ts<=now).sort((a,b)=>b._ts-a._ts);
   return {upcoming,past};
 }
 function heDay(iso){try{return new Intl.DateTimeFormat('he-IL',{weekday:'long'}).format(new Date(iso+'T12:00'))}catch(_){return''}}
 function shortDate(iso){const [y,m,d]=String(iso||'').split('-');return d&&m?`${d}.${m}`:''}
 function escIcs(v){return String(v||'').replace(/\\/g,'\\\\').replace(/\n/g,'\\n').replace(/,/g,'\\,').replace(/;/g,'\\;')}
 function pad(n){return String(n).padStart(2,'0')}
 function icsLocal(dt){return `${dt.getFullYear()}${pad(dt.getMonth()+1)}${pad(dt.getDate())}T${pad(dt.getHours())}${pad(dt.getMinutes())}00`}
 function addToCalendar(data){
   if(!data?.date||!data?.time)return;
   const start=new Date(`${data.date}T${data.time}:00`);if(Number.isNaN(start.getTime()))return;
   const minutes=Number(data.minutes)||60;const end=new Date(start.getTime()+minutes*60000);
   const title=`תור אצל עמית ל - ${data.service||'טיפול'}`;
   const desc=data.status==='pending'?'בקשת תור דרך AMIT TOUCH - ממתין לאישור':'תור שנקבע דרך AMIT TOUCH';
   const uid=`amit-touch-${data.id||start.getTime()}@amit-touch`;
   const ics=['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//AMIT TOUCH//Booking//HE','CALSCALE:GREGORIAN','METHOD:PUBLISH','BEGIN:VEVENT',`UID:${uid}`,`DTSTAMP:${icsLocal(new Date())}`,`DTSTART:${icsLocal(start)}`,`DTEND:${icsLocal(end)}`,`SUMMARY:${escIcs(title)}`,`DESCRIPTION:${escIcs(desc)}`,'END:VEVENT','END:VCALENDAR'].join('\r\n');
   const blob=new Blob([ics],{type:'text/calendar;charset=utf-8'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download='amit-touch-appointment.ics';document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1500);
 }

 const titles=[...home.querySelectorAll('.section-title')];
 const lastTitle=titles.find(t=>/הזמנה אחרונה|הזמנה הקרובה|הזמנה/.test((t.textContent||'').trim()));
 const lastCard=home.querySelector('.next-card');
 if(!lastCard)return;
 const host=document.createElement('div');host.className='appointments-stack';
 function card(data,future){
   const el=document.createElement('div');el.className='appointment-card';
   if(data.status==='pending')el.classList.add('is-pending');
   const status=future?`<button type="button" class="appointment-status add-calendar" aria-label="הוספה ליומן"><img src="/assets/%D7%AA%D7%95%D7%A8%20%D7%A2%D7%AA%D7%99%D7%93%D7%99.png?v=${BUILD}" alt=""></button>`:`<div class="appointment-status" aria-hidden="true"><svg viewBox="0 0 32 32" fill="none"><path d="M8 16.5l5 5L24 10" stroke="#111" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg></div>`;
   const note=data.status==='pending'?'<div class="appointment-note">ממתין לאישור</div>':'';
   el.innerHTML=`${status}<div class="appointment-main"><div class="appointment-service">${data.service||'תור'}</div>${note}</div><div class="appointment-date"><div class="appointment-day">${heDay(data.date)}</div><div class="appointment-date-num">${shortDate(data.date)}</div><div class="appointment-time">${data.time||''}</div></div>`;
   if(future)el.querySelector('.add-calendar')?.addEventListener('click',e=>{e.stopPropagation();addToCalendar(data)});
   return el;
 }
 function heading(title){const h=document.createElement('div');h.className='appointment-heading';h.textContent=title;return h;}
 function empty(text){const e=document.createElement('div');e.className='appointment-empty';e.textContent=text;return e;}
 function render(){
   host.innerHTML='';
   const {upcoming,past}=splitAppointments();
   const futureBlock=document.createElement('section');futureBlock.className='appointment-block';futureBlock.appendChild(heading('תורים עתידיים'));
   const futureList=document.createElement('div');futureList.className='appointment-list';
   if(upcoming.length)upcoming.forEach(a=>futureList.appendChild(card(a,true)));else futureList.appendChild(empty('אין כרגע תורים עתידיים'));
   futureBlock.appendChild(futureList);host.appendChild(futureBlock);
   const lastBlock=document.createElement('section');lastBlock.className='appointment-block';lastBlock.appendChild(heading('הזמנה אחרונה'));
   const lastList=document.createElement('div');lastList.className='appointment-list';
   if(past[0])lastList.appendChild(card(past[0],false));else lastList.appendChild(empty('עדיין אין הזמנות קודמות'));
   lastBlock.appendChild(lastList);host.appendChild(lastBlock);
 }
 window.renderHomeAppointments=render;
 window.addEventListener('amit:appointments-updated',render);
 render();
 if(lastTitle)lastTitle.remove();lastCard.replaceWith(host);
})();