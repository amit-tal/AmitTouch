(function(){
  const dob=document.getElementById('regDob');
  if(!dob)return;

  const style=document.createElement('style');
  style.id='amit-touch-date-picker-style';
  style.textContent=`
    #amitDateOverlay{position:fixed;inset:0;z-index:120;display:none;align-items:flex-end;justify-content:center;padding:18px;background:rgba(33,63,59,.16);backdrop-filter:blur(18px) saturate(135%);-webkit-backdrop-filter:blur(18px) saturate(135%)}
    #amitDateOverlay.show{display:flex}
    #amitDateOverlay .date-glass{width:min(398px,100%);border-radius:28px;padding:20px 18px 18px;background:linear-gradient(145deg,rgba(255,255,255,.72),rgba(255,255,255,.28));border:1px solid rgba(255,255,255,.88);box-shadow:0 22px 60px rgba(47,74,69,.18),inset 0 1px 0 rgba(255,255,255,.98),inset 0 -1px 0 rgba(255,255,255,.28);backdrop-filter:blur(30px) saturate(155%);-webkit-backdrop-filter:blur(30px) saturate(155%);animation:amitDateIn .24s ease both;direction:rtl}
    @keyframes amitDateIn{from{opacity:0;transform:translateY(18px) scale(.985)}to{opacity:1;transform:translateY(0) scale(1)}}
    .date-head{display:grid;grid-template-columns:42px 1fr 42px;align-items:center;margin-bottom:14px}
    .date-head button{width:38px;height:38px;border:1px solid rgba(47,113,107,.12);border-radius:50%;background:rgba(255,255,255,.34);color:#2f716b;font-size:20px;font-weight:300}
    .date-title{text-align:center}
    .date-title b{display:block;color:#2f716b;font-size:17px;font-weight:400;line-height:1.2}
    .date-title span{display:block;color:#d88f82;font-size:12px;font-weight:300;margin-top:3px}
    .date-week{display:grid;grid-template-columns:repeat(7,1fr);gap:4px;text-align:center;color:#7a8c89;font-size:11px;font-weight:400;margin:0 0 7px}
    .date-grid{display:grid;grid-template-columns:repeat(7,1fr);gap:5px}
    .date-day{aspect-ratio:1;border:0;border-radius:50%;background:transparent;color:#315f5a;font-size:13px;font-weight:300;display:grid;place-items:center}
    .date-day.empty{visibility:hidden}
    .date-day.today{box-shadow:inset 0 0 0 1px rgba(216,143,130,.55);color:#b76f65}
    .date-day.selected{background:linear-gradient(145deg,#397a73,#28665f);color:#fff;box-shadow:0 7px 16px rgba(42,101,94,.2)}
    .date-foot{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:16px}
    .date-foot button{height:48px;border-radius:15px;font-size:14px;font-weight:400}
    .date-cancel{border:1px solid rgba(47,113,107,.12);background:rgba(255,255,255,.34);color:#386f69}
    .date-confirm{border:0;background:linear-gradient(90deg,#2c655f,#346d67);color:#fff;box-shadow:0 8px 18px rgba(40,94,88,.16)}
  `;
  document.head.appendChild(style);

  const overlay=document.createElement('div');
  overlay.id='amitDateOverlay';
  overlay.innerHTML=`<div class="date-glass"><div class="date-head"><button type="button" class="date-next" aria-label="חודש הבא">‹</button><div class="date-title"><b></b><span>בחרי תאריך לידה</span></div><button type="button" class="date-prev" aria-label="חודש קודם">›</button></div><div class="date-week"><span>א</span><span>ב</span><span>ג</span><span>ד</span><span>ה</span><span>ו</span><span>ש</span></div><div class="date-grid"></div><div class="date-foot"><button type="button" class="date-cancel">ביטול</button><button type="button" class="date-confirm">בחירה</button></div></div>`;
  document.body.appendChild(overlay);

  const months=['ינואר','פברואר','מרץ','אפריל','מאי','יוני','יולי','אוגוסט','ספטמבר','אוקטובר','נובמבר','דצמבר'];
  const now=new Date();
  let viewYear=now.getFullYear();
  let viewMonth=now.getMonth();
  let selected=dob.value||'';

  function pad(n){return String(n).padStart(2,'0');}
  function iso(y,m,d){return `${y}-${pad(m+1)}-${pad(d)}`;}
  function render(){
    overlay.querySelector('.date-title b').textContent=`${months[viewMonth]} ${viewYear}`;
    const grid=overlay.querySelector('.date-grid');
    grid.innerHTML='';
    const first=new Date(viewYear,viewMonth,1).getDay();
    const count=new Date(viewYear,viewMonth+1,0).getDate();
    for(let i=0;i<first;i++){const e=document.createElement('button');e.type='button';e.className='date-day empty';grid.appendChild(e);}
    for(let d=1;d<=count;d++){
      const btn=document.createElement('button');btn.type='button';btn.className='date-day';btn.textContent=d;
      const value=iso(viewYear,viewMonth,d);
      const today=iso(now.getFullYear(),now.getMonth(),now.getDate());
      if(value===today)btn.classList.add('today');
      if(value===selected)btn.classList.add('selected');
      btn.addEventListener('click',()=>{selected=value;render();});
      grid.appendChild(btn);
    }
  }
  function open(){
    if(dob.value){const [y,m]=dob.value.split('-').map(Number);viewYear=y;viewMonth=m-1;selected=dob.value;}
    overlay.classList.add('show');render();
  }
  function close(){overlay.classList.remove('show');}

  const wrap=dob.closest('.field-wrap');
  if(wrap){
    dob.style.pointerEvents='none';
    wrap.addEventListener('click',e=>{e.preventDefault();open();});
  }
  overlay.querySelector('.date-prev').addEventListener('click',()=>{viewMonth--;if(viewMonth<0){viewMonth=11;viewYear--;}render();});
  overlay.querySelector('.date-next').addEventListener('click',()=>{viewMonth++;if(viewMonth>11){viewMonth=0;viewYear++;}render();});
  overlay.querySelector('.date-cancel').addEventListener('click',close);
  overlay.querySelector('.date-confirm').addEventListener('click',()=>{
    if(selected){dob.value=selected;dob.dispatchEvent(new Event('input',{bubbles:true}));dob.dispatchEvent(new Event('change',{bubbles:true}));}
    close();
  });
  overlay.addEventListener('click',e=>{if(e.target===overlay)close();});
})();