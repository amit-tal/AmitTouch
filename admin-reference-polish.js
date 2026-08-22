(function(){
'use strict';

const style=document.createElement('style');
style.id='admin-reference-polish-v2';
style.textContent=`
:root{--ref-green:#173f3b;--ref-green-soft:#315f5a;--ref-cream:#fbf6f0;--ref-pink:#efd7d1;--ref-pink-soft:#f7ebe7;--ref-muted:#858d89;--ref-white:rgba(255,255,255,.76);--ref-border:rgba(255,255,255,.94);--ref-shadow:0 8px 24px rgba(68,69,64,.055)}
body.admin-session-active{background:linear-gradient(180deg,#fcf8f3 0%,#fbf6f0 46%,#faf4ed 100%)!important;color:var(--ref-green)!important}
body.admin-session-active #amitAdminRoot{background:transparent!important}
body.admin-session-active #amitAdminRoot #adminBody{width:min(390px,100%)!important;margin:0 auto!important;padding:calc(max(19px,env(safe-area-inset-top)) + 2px) 16px calc(103px + env(safe-area-inset-bottom))!important;background:transparent!important}
body.admin-session-active .af{padding:0!important;color:var(--ref-green)!important;font-family:Inter,Arial,sans-serif!important}

/* Home header */
body.admin-session-active .af.ar-home-ref .af-head{height:33px!important;margin:0 0 2px!important;position:relative!important;display:block!important}
body.admin-session-active .af.ar-home-ref .af-head h1{display:none!important}
body.admin-session-active .af.ar-home-ref .af-head .af-icon:first-child{display:none!important}
body.admin-session-active .af.ar-home-ref .af-head .af-icon:last-child{position:absolute!important;left:1px!important;top:1px!important;width:30px!important;height:30px!important;padding:0!important;border:0!important;background:transparent!important;color:var(--ref-green-soft)!important;font-size:0!important}
body.admin-session-active .af.ar-home-ref .af-head .af-icon:last-child:before{content:'🔔';font-size:14px;filter:grayscale(1);opacity:.78}
body.admin-session-active .af.ar-home-ref .af-title{font-size:18px!important;line-height:1.25!important;font-weight:680!important;text-align:right!important;margin:0 46px 1px 0!important;color:var(--ref-green)!important;letter-spacing:-.28px!important}
body.admin-session-active .af.ar-home-ref .af-sub{font-size:9px!important;line-height:1.35!important;text-align:right!important;margin:0 46px 12px 0!important;color:#8f9693!important}

/* Five reference summary cards */
body.admin-session-active .af.ar-home-ref .af-grid{display:grid!important;grid-template-columns:repeat(3,minmax(0,1fr))!important;gap:6px!important;margin:0!important}
body.admin-session-active .af.ar-home-ref .af-stat{min-width:0!important;min-height:53px!important;padding:8px 4px 7px!important;border-radius:11px!important;background:linear-gradient(145deg,rgba(255,255,255,.86),rgba(255,255,255,.57))!important;border:1px solid var(--ref-border)!important;box-shadow:var(--ref-shadow),inset 0 1px rgba(255,255,255,.98)!important;backdrop-filter:blur(18px)!important;-webkit-backdrop-filter:blur(18px)!important;display:flex!important;flex-direction:column!important;justify-content:center!important;align-items:center!important;text-align:center!important}
body.admin-session-active .af.ar-home-ref .af-stat b{font-size:15px!important;line-height:1!important;font-weight:680!important;color:var(--ref-green)!important;margin:0 0 5px!important;white-space:nowrap!important}
body.admin-session-active .af.ar-home-ref .af-stat span{font-size:7.6px!important;line-height:1.15!important;color:#6f7975!important;white-space:normal!important}
body.admin-session-active .af.ar-home-ref .af-stat.ar-stat-income{grid-column:span 2!important}
body.admin-session-active .af.ar-home-ref .af-stat.ar-stat-income b{font-size:14px!important}

/* Sections */
body.admin-session-active .af.ar-home-ref .af-section{font-size:10.5px!important;line-height:1!important;font-weight:700!important;color:var(--ref-green)!important;text-align:right!important;margin:15px 1px 7px!important}

/* Next appointment */
body.admin-session-active .af.ar-home-ref .ar-next-card{padding:10px!important;border-radius:14px!important;background:linear-gradient(145deg,rgba(255,255,255,.84),rgba(255,255,255,.58))!important;border:1px solid var(--ref-border)!important;box-shadow:var(--ref-shadow),inset 0 1px rgba(255,255,255,.98)!important}
body.admin-session-active .af.ar-home-ref .ar-next-top{display:grid!important;grid-template-columns:54px 1fr 52px!important;gap:8px!important;align-items:center!important;direction:rtl!important;min-height:59px!important}
body.admin-session-active .af.ar-home-ref .ar-next-photo{width:52px!important;height:52px!important;border-radius:50%!important;background:linear-gradient(145deg,#e8d0c6,#f6e8e1)!important;background-image:url('/assets/WhatsApp%20Image%202026-08-15%20at%2020.58.05.jpeg')!important;background-size:cover!important;background-position:center!important;border:2px solid rgba(255,255,255,.92)!important;box-shadow:0 4px 13px rgba(61,65,61,.08)!important}
body.admin-session-active .af.ar-home-ref .ar-next-copy{text-align:right!important;min-width:0!important}
body.admin-session-active .af.ar-home-ref .ar-next-copy strong{display:block!important;font-size:12px!important;font-weight:680!important;color:var(--ref-green)!important;margin-bottom:3px!important}
body.admin-session-active .af.ar-home-ref .ar-next-copy span{display:block!important;font-size:8.2px!important;color:#78827e!important;white-space:nowrap!important;overflow:hidden!important;text-overflow:ellipsis!important}
body.admin-session-active .af.ar-home-ref .ar-next-copy small{display:block!important;font-size:7.6px!important;color:#8a918e!important;margin-top:3px!important}
body.admin-session-active .af.ar-home-ref .ar-next-time{font-size:15px!important;font-weight:700!important;line-height:1!important;color:var(--ref-green)!important;text-align:left!important;direction:ltr!important}
body.admin-session-active .af.ar-home-ref .ar-next-card .af-actions{display:grid!important;grid-template-columns:repeat(3,1fr)!important;gap:5px!important;margin-top:8px!important;direction:rtl!important}
body.admin-session-active .af.ar-home-ref .ar-next-card .af-actions button{height:27px!important;min-height:27px!important;padding:0 4px!important;border-radius:8px!important;font-size:7px!important;color:var(--ref-green)!important;background:rgba(255,255,255,.54)!important;border:1px solid rgba(52,73,68,.08)!important;box-shadow:none!important}
body.admin-session-active .af.ar-home-ref .ar-next-card .af-actions .primary{background:#f3ded8!important;color:#805e57!important;border-color:transparent!important}

/* Today schedule as one compact card */
body.admin-session-active .af.ar-home-ref .ar-today-card{border-radius:13px!important;padding:4px 10px!important;background:rgba(255,255,255,.48)!important;border:1px solid rgba(255,255,255,.86)!important;box-shadow:0 5px 16px rgba(68,69,64,.035)!important}
body.admin-session-active .af.ar-home-ref .ar-today-line{display:grid!important;grid-template-columns:1fr 42px!important;gap:8px!important;align-items:center!important;min-height:25px!important;border-bottom:1px solid rgba(75,91,87,.055)!important;direction:rtl!important}
body.admin-session-active .af.ar-home-ref .ar-today-line:last-child{border-bottom:0!important}
body.admin-session-active .af.ar-home-ref .ar-today-main{font-size:7.8px!important;color:#475b57!important;text-align:right!important;white-space:nowrap!important;overflow:hidden!important;text-overflow:ellipsis!important}
body.admin-session-active .af.ar-home-ref .ar-today-time{font-size:7.6px!important;color:#4f5e5a!important;text-align:left!important;direction:ltr!important}
body.admin-session-active .af.ar-home-ref .ar-today-empty{padding:14px 5px!important;font-size:8px!important;color:#8a918e!important;text-align:center!important}
body.admin-session-active .af.ar-home-ref>.af-btn[data-route="future"]{display:none!important}

/* Bottom navigation */
body.admin-session-active .af-nav{width:min(365px,calc(100% - 24px))!important;height:57px!important;bottom:max(9px,env(safe-area-inset-bottom))!important;border-radius:22px!important;padding:4px 7px!important;background:linear-gradient(145deg,rgba(255,255,255,.88),rgba(255,255,255,.68))!important;border:1px solid rgba(255,255,255,.94)!important;box-shadow:0 9px 27px rgba(74,76,72,.085),inset 0 1px rgba(255,255,255,.96)!important;backdrop-filter:blur(22px) saturate(125%)!important;-webkit-backdrop-filter:blur(22px) saturate(125%)!important;direction:rtl!important}
body.admin-session-active .af-nav button{font-size:6.8px!important;color:#465f5a!important;border-radius:15px!important;padding:3px 1px!important;background:transparent!important}
body.admin-session-active .af-nav i{height:19px!important;margin:0 auto 2px!important;display:flex!important;align-items:center!important;justify-content:center!important;color:#315f5a!important}
body.admin-session-active .af-nav svg{width:17px!important;height:17px!important;display:block!important;stroke:currentColor!important;fill:none!important;stroke-width:1.65!important;stroke-linecap:round!important;stroke-linejoin:round!important}
body.admin-session-active .af-nav button.on{color:#98675f!important;background:transparent!important}
body.admin-session-active .af-nav .home{transform:translateY(-3px)!important;background:linear-gradient(145deg,rgba(239,216,209,.9),rgba(250,238,234,.92))!important;border:1px solid rgba(255,255,255,.92)!important;box-shadow:0 5px 13px rgba(113,82,75,.085),inset 0 1px rgba(255,255,255,.95)!important}
body.admin-session-active .af-nav .home.on{background:linear-gradient(145deg,#ecd3cc,#f7e5e0)!important}

@media(max-width:355px){body.admin-session-active #amitAdminRoot #adminBody{padding-left:12px!important;padding-right:12px!important}.af.ar-home-ref .af-grid{gap:5px!important}.af-nav{width:calc(100% - 18px)!important}}
`;
document.head.appendChild(style);

const icons={
 customers:'<svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="3.4"/><path d="M5.8 20c.7-4 2.8-6 6.2-6s5.5 2 6.2 6"/></svg>',
 messages:'<svg viewBox="0 0 24 24"><path d="M5 5.5h14v10H9l-4 3v-13Z"/><path d="M9 9h6M9 12h4"/></svg>',
 home:'<svg viewBox="0 0 24 24"><path d="m4 11 8-7 8 7v9h-5v-6H9v6H4v-9Z"/></svg>',
 calendar:'<svg viewBox="0 0 24 24"><rect x="4" y="6" width="16" height="14" rx="2"/><path d="M8 3v5M16 3v5M4 10h16M8 14h.01M12 14h.01M16 14h.01"/></svg>',
 manage:'<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M19 13.5v-3l-2-.6-.6-1.4 1-1.8-2.1-2.1-1.8 1L12 5l-.6-2h-3l-.6 2-1.5.6-1.8-1-2.1 2.1 1 1.8-.6 1.4-2 .6v3l2 .6.6 1.4-1 1.8 2.1 2.1 1.8-1 1.5.6.6 2h3l.6-2 1.5-.6 1.8 1 2.1-2.1-1-1.8.6-1.4 2-.6Z"/></svg>'
};

let monthCountPromise=null;
function fetchMonthCount(){
 if(monthCountPromise)return monthCountPromise;
 monthCountPromise=fetch('/api/admin/appointments',{cache:'no-store'}).then(r=>r.json()).then(j=>{
   const now=new Date(),m=now.getMonth(),y=now.getFullYear();
   return (j.appointments||[]).filter(a=>{const d=new Date(a.starts_at);return d.getMonth()===m&&d.getFullYear()===y&&a.status!=='cancelled'}).length;
 }).catch(()=>0);
 return monthCountPromise;
}

function polishNav(root){
 const nav=root.querySelector('.af-nav');if(!nav)return;
 nav.querySelectorAll('button[data-route]').forEach(btn=>{
   const r=btn.dataset.route,icon=btn.querySelector('i');
   if(icon&&icons[r])icon.innerHTML=icons[r];
 });
}

async function polishHome(root){
 const af=root.querySelector('.af');if(!af)return;
 const title=af.querySelector('.af-title');
 const isHome=title&&title.textContent.includes('ערב טוב עמית');
 af.classList.toggle('ar-home-ref',!!isHome);
 if(!isHome)return;

 const grid=af.querySelector('.af-grid');
 if(grid){
   const stats=[...grid.querySelectorAll('.af-stat')];
   stats.forEach(x=>x.classList.remove('ar-stat-income','ar-stat-month'));
   const income=stats.find(x=>x.textContent.includes('הכנסות השבוע'));
   if(income)income.classList.add('ar-stat-income');
   if(!grid.querySelector('.ar-stat-month')){
     const month=document.createElement('div');
     month.className='af-card af-stat ar-stat-month';
     month.innerHTML='<b>0</b><span>תורים החודש</span>';
     if(income)grid.insertBefore(month,income);else grid.appendChild(month);
     const n=await fetchMonthCount();
     if(month.isConnected)month.querySelector('b').textContent=String(n);
   }
 }

 const sections=[...af.querySelectorAll('.af-section')];
 const nextSection=sections.find(x=>x.textContent.trim()==='התור הבא');
 if(nextSection){
   const card=nextSection.nextElementSibling;
   if(card&&card.classList.contains('af-card')&&!card.classList.contains('ar-next-card')&&!card.classList.contains('af-note')){
     card.classList.add('ar-next-card');
     const h3=card.querySelector('h3'),p=card.querySelector('.af-note'),actions=card.querySelector('.af-actions');
     if(h3&&p){
       const parts=h3.textContent.split('·').map(s=>s.trim());
       const time=parts.shift()||'';const name=parts.join(' · ')||'לקוחה';
       const pp=p.textContent.split('·').map(s=>s.trim());
       const service=pp[0]||'טיפול';const minutes=pp.slice(1).join(' · ')||'';
       const top=document.createElement('div');top.className='ar-next-top';
       top.innerHTML='<div class="ar-next-photo" aria-hidden="true"></div><div class="ar-next-copy"><strong>'+name+'</strong><span>'+service+'</span><small>'+minutes+'</small></div><div class="ar-next-time">'+time+'</div>';
       h3.remove();p.remove();card.insertBefore(top,actions||card.firstChild);
     }
   }
 }

 const todaySection=sections.find(x=>x.textContent.trim()==='היום שלי');
 if(todaySection){
   const list=todaySection.nextElementSibling;
   if(list&&list.classList.contains('af-list')&&!list.classList.contains('ar-today-card')){
     const rows=[...list.querySelectorAll('.af-row')];
     const card=document.createElement('div');card.className='ar-today-card';
     if(!rows.length){card.innerHTML='<div class="ar-today-empty">אין תורים היום</div>'}
     else rows.forEach(row=>{
       const h=row.querySelector('h3')?.textContent||'';
       const p=row.querySelector('p')?.innerText||'';
       const time=(h.match(/\d{1,2}:\d{2}/)||[''])[0];
       const lines=p.split(/\n+/).map(s=>s.trim()).filter(Boolean);
       const main=[lines[0]||'',(lines[1]||'').split('·')[0].trim()].filter(Boolean).join(' · ');
       const line=document.createElement('div');line.className='ar-today-line';
       line.innerHTML='<div class="ar-today-main">'+main+'</div><div class="ar-today-time">'+time+'</div>';
       line.addEventListener('click',()=>row.click());card.appendChild(line);
     });
     list.replaceWith(card);
   }
 }
}

function apply(){
 const root=document.getElementById('adminBody');if(!root)return;
 polishNav(root);polishHome(root);
}
let queued=false;
const obs=new MutationObserver(()=>{if(queued)return;queued=true;requestAnimationFrame(()=>{queued=false;apply()})});
obs.observe(document.documentElement,{childList:true,subtree:true});
apply();
})();