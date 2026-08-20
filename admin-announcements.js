(function(){
  const BUILD='20260820-admin-announcements-v1';
  const style=document.createElement('style');style.id='amit-admin-announcement-style';style.textContent=`
  #admin .announcement-admin{margin:10px 0 16px!important;padding:16px!important;border-radius:20px!important;background:linear-gradient(145deg,rgba(255,255,255,.76),rgba(255,247,244,.56))!important;border:1px solid rgba(255,255,255,.94)!important;box-shadow:0 10px 24px rgba(93,63,52,.07)!important}
  #admin .announcement-admin h3{margin:0 0 10px!important;color:#07584f!important;font-size:18px!important;font-weight:500!important}
  #admin .announcement-admin input,#admin .announcement-admin textarea{width:100%!important;margin:7px 0!important;padding:13px 14px!important;border-radius:14px!important;border:1px solid rgba(7,88,79,.12)!important;background:rgba(255,255,255,.72)!important;color:#173f3c!important;outline:0!important;resize:vertical!important}
  #admin .announcement-admin textarea{min-height:88px!important}
  #admin .announcement-admin .announce-actions{display:grid!important;grid-template-columns:1fr auto!important;gap:8px!important;margin-top:8px!important}
  #admin .announcement-admin .announce-list{margin-top:14px!important;display:grid!important;gap:8px!important}
  #admin .announcement-admin .announce-row{padding:12px!important;border-radius:14px!important;background:rgba(255,255,255,.64)!important;border:1px solid rgba(7,88,79,.08)!important}
  #admin .announcement-admin .announce-row b{display:block!important;color:#07584f!important;margin-bottom:4px!important}
  #admin .announcement-admin .announce-row p{margin:0!important;font-size:12px!important;line-height:1.5!important;color:#536764!important}
  #admin .announcement-admin .announce-delete{margin-top:8px!important;border:0!important;background:transparent!important;color:#a76459!important;font-size:11px!important}
  `;document.head.appendChild(style);

  function esc(v){return String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
  async function announcements(){try{const r=await fetch('/api/announcements',{cache:'no-store'});const d=await r.json();if(!r.ok)throw new Error();return d.announcements||[]}catch(_){return[]}}
  async function panel(){const rows=await announcements();return `<section class="announcement-admin"><h3>הודעות ללקוחות</h3><input id="adminAnnouncementTitle" placeholder="כותרת ההודעה"><textarea id="adminAnnouncementBody" placeholder="כתבי כאן את ההודעה שתופיע בעמוד הבית"></textarea><div class="announce-actions"><button class="primary" style="margin:0" onclick="adminPublishAnnouncement()">פרסום הודעה</button><button class="secondary" onclick="adminRefreshAnnouncements()">רענון</button></div><div class="announce-list">${rows.length?rows.map(x=>`<div class="announce-row"><b>${esc(x.title)}</b><p>${esc(x.body)}</p><button class="announce-delete" onclick="adminDeleteAnnouncement('${esc(x.id)}')">מחיקת ההודעה</button></div>`).join(''):'<div class="subtitle">עדיין לא פורסמו הודעות.</div>'}</div></section>`}
  async function inject(){const target=document.getElementById('adminBody');if(!target)return;target.insertAdjacentHTML('afterbegin',await panel());}
  window.adminPublishAnnouncement=async function(){const title=document.getElementById('adminAnnouncementTitle')?.value.trim(),body=document.getElementById('adminAnnouncementBody')?.value.trim();if(!title||!body)return alert('יש למלא כותרת ותוכן להודעה');try{const r=await fetch('/api/admin/announcements',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({title,body})});const d=await r.json();if(!r.ok)throw new Error(d.error||'PUBLISH_FAILED');await window.adminRefreshAnnouncements();alert('ההודעה פורסמה ללקוחות');}catch(e){console.error(e);alert('לא הצלחתי לפרסם את ההודעה');}};
  window.adminDeleteAnnouncement=async function(id){if(!confirm('למחוק את ההודעה?'))return;try{const r=await fetch('/api/admin/announcements/'+encodeURIComponent(id),{method:'DELETE'});if(!r.ok)throw new Error();await window.adminRefreshAnnouncements();}catch(e){console.error(e);alert('לא הצלחתי למחוק את ההודעה');}};
  window.adminRefreshAnnouncements=async function(){document.querySelector('#admin .announcement-admin')?.remove();await inject();};
  const original=window.renderAdmin;
  if(typeof original==='function')window.renderAdmin=async function(){await original.apply(this,arguments);await inject();};
  if(document.getElementById('admin')?.classList.contains('active'))inject();
})();