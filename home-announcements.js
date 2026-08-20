(function(){
  const home=document.getElementById('home');if(!home)return;
  const BUILD='20260820-home-announcements-v3';
  const style=document.createElement('style');style.id='amit-home-announcements-style';style.textContent=`
  #home .home-announcements{margin:10px 0 20px!important;background:transparent!important;border:0!important;box-shadow:none!important}
  #home .home-announcements-title{display:flex!important;align-items:center!important;justify-content:center!important;gap:14px!important;margin:0 0 12px!important;color:#07584f!important;font-family:Inter,sans-serif!important;font-size:18px!important;font-weight:500!important;text-align:center!important;background:transparent!important}
  #home .home-announcements-title:before,#home .home-announcements-title:after{content:''!important;height:1px!important;flex:1!important;background:linear-gradient(90deg,transparent 0%,rgba(7,88,79,.22) 28%,rgba(7,88,79,.72) 100%)!important}
  #home .home-announcements-title:after{transform:scaleX(-1)!important}
  #home .home-announcements-list{display:grid!important;gap:10px!important}
  #home .home-announcement-card{position:relative!important;padding:15px 78px 15px 17px!important;border-radius:20px!important;border:1px solid rgba(255,255,255,.92)!important;background:linear-gradient(145deg,rgba(255,255,255,.78),rgba(255,248,245,.56))!important;box-shadow:0 9px 20px rgba(93,63,52,.07),inset 0 1px 0 rgba(255,255,255,.98)!important;backdrop-filter:blur(18px) saturate(140%)!important;-webkit-backdrop-filter:blur(18px) saturate(140%)!important;direction:rtl!important;text-align:right!important;min-height:66px!important}
  #home .home-announcement-head{display:block!important;margin:0 0 6px!important}
  #home .home-announcement-card h3{margin:0!important;color:#07584f!important;font-size:16px!important;font-weight:500!important}
  #home .home-announcement-age{position:absolute!important;right:17px!important;top:50%!important;transform:translateY(-50%)!important;width:50px!important;text-align:center!important;color:#82918f!important;font-size:11px!important;font-weight:300!important;white-space:nowrap!important;direction:rtl!important}
  #home .home-announcement-card p{margin:0!important;color:#536764!important;font-size:13px!important;line-height:1.6!important;white-space:pre-wrap!important}
  #home .home-announcement-empty{padding:14px!important;text-align:center!important;color:#83918f!important;font-size:12px!important}
  `;document.head.appendChild(style);
  function esc(v){return String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
  function age(date){const t=new Date(date).getTime();if(!Number.isFinite(t))return'';const ms=Math.max(0,Date.now()-t);const d=Math.floor(ms/86400000);if(d>0)return d===1?'לפני יום':`לפני ${d} ימים`;const h=Math.floor(ms/3600000);if(h>0)return h===1?'לפני שעה':`לפני ${h} שעות`;const m=Math.floor(ms/60000);if(m>0)return m===1?'לפני דקה':`לפני ${m} דקות`;return'עכשיו';}
  function ensureHost(){let host=home.querySelector('.home-announcements');if(host)return host;host=document.createElement('section');host.className='home-announcements';host.innerHTML='<div class="home-announcements-title">הודעות</div><div class="home-announcements-list"><div class="home-announcement-empty">טוענת הודעות…</div></div>';const anchor=home.querySelector('.appointments-stack');if(anchor)anchor.insertAdjacentElement('afterend',host);else home.appendChild(host);return host;}
  async function load(){const host=ensureHost(),list=host.querySelector('.home-announcements-list');try{const r=await fetch('/api/announcements?ts='+Date.now(),{cache:'no-store'});const d=await r.json();if(!r.ok)throw new Error();const rows=d.announcements||[];list.innerHTML=rows.length?rows.map(x=>`<article class="home-announcement-card"><div class="home-announcement-head"><h3>${esc(x.title)}</h3><span class="home-announcement-age">${esc(age(x.created_at))}</span></div><p>${esc(x.body)}</p></article>`).join(''):'<div class="home-announcement-empty">אין כרגע הודעות חדשות</div>';}catch(e){console.error(e);list.innerHTML='<div class="home-announcement-empty">לא הצלחתי לטעון הודעות</div>';}}
  window.refreshHomeAnnouncements=load;
  load();
  new MutationObserver(()=>{if(home.classList.contains('active'))load();}).observe(home,{attributes:true,attributeFilter:['class']});
})();