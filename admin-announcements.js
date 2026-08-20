(function(){
  const BUILD='20260820-admin-announcements-v2';
  document.getElementById('amit-admin-announcement-style')?.remove();
  const style=document.createElement('style');style.id='amit-admin-announcement-style';style.textContent=`
  #admin .announcement-admin{margin:10px 0 16px!important;padding:16px!important;border-radius:20px!important;background:linear-gradient(145deg,rgba(255,255,255,.76),rgba(255,247,244,.56))!important;border:1px solid rgba(255,255,255,.94)!important;box-shadow:0 10px 24px rgba(93,63,52,.07)!important}
  #admin .announcement-admin h3{margin:0 0 10px!important;color:#07584f!important;font-size:18px!important;font-weight:500!important}
  #admin .announcement-admin input,#admin .announcement-admin textarea{width:100%!important;margin:7px 0!important;padding:13px 14px!important;border-radius:14px!important;border:1px solid rgba(7,88,79,.12)!important;background:rgba(255,255,255,.72)!important;color:#173f3c!important;outline:0!important;resize:vertical!important;box-sizing:border-box!important}
  #admin .announcement-admin textarea{min-height:88px!important}
  #admin .announcement-admin .announce-actions{display:grid!important;grid-template-columns:1fr auto!important;gap:8px!important;margin-top:8px!important}
  #admin .announcement-admin .announce-list{margin-top:14px!important;display:grid!important;gap:8px!important}
  #admin .announcement-admin .announce-row{padding:12px!important;border-radius:14px!important;background:rgba(255,255,255,.64)!important;border:1px solid rgba(7,88,79,.08)!important}
  #admin .announcement-admin .announce-row b{display:block!important;color:#07584f!important;margin-bottom:4px!important}
  #admin .announcement-admin .announce-row p{margin:0!important;font-size:12px!important;line-height:1.5!important;color:#536764!important}
  #admin .announcement-admin .announce-delete{margin-top:8px!important;border:0!important;background:transparent!important;color:#a76459!important;font-size:11px!important}
  #admin .announcement-admin .announce-status{min-height:20px!important;margin-top:8px!important;font-size:12px!important;color:#687d7a!important;text-align:center!important}
  `;document.head.appendChild(style);

  function esc(v){return String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
  async function announcements(){const r=await fetch('/api/announcements?v='+BUILD,{cache:'no-store'});const d=await r.json();if(!r.ok)throw new Error(d.error||'LOAD_FAILED');return d.announcements||[]}
  async function panel(){let rows=[];try{rows=await announcements()}catch(_){}return `<section class="announcement-admin"><h3>הודעות ללקוחות</h3><input id="adminAnnouncementTitle" placeholder="כותרת ההודעה"><textarea id="adminAnnouncementBody" placeholder="כתבי כאן את ההודעה שתופיע ללקוחות"></textarea><div class="announce-actions"><button type="button" class="primary admin-announce-publish" style="margin:0">פרסום הודעה</button><button type="button" class="secondary admin-announce-refresh">רענון</button></div><div class="announce-status" aria-live="polite"></div><div class="announce-list">${rows.length?rows.map(x=>`<div class="announce-row"><b>${esc(x.title)}</b><p>${esc(x.body)}</p><button type="button" class="announce-delete" data-id="${esc(x.id)}">מחיקת ההודעה</button></div>`).join(''):'<div class="subtitle">עדיין לא פורסמו הודעות.</div>'}</div></section>`}
  function bind(root){
    root.querySelector('.admin-announce-publish')?.addEventListener('click',publish);
    root.querySelector('.admin-announce-refresh')?.addEventListener('click',refresh);
    root.querySelectorAll('.announce-delete').forEach(btn=>btn.addEventListener('click',()=>remove(btn.dataset.id)));
  }
  async function inject(){const target=document.getElementById('adminBody');if(!target)return;target.querySelector('.announcement-admin')?.remove();target.insertAdjacentHTML('afterbegin',await panel());const root=target.querySelector('.announcement-admin');if(root)bind(root)}
  async function publish(){
    const title=document.getElementById('adminAnnouncementTitle')?.value.trim();
    const body=document.getElementById('adminAnnouncementBody')?.value.trim();
    const root=document.querySelector('#admin .announcement-admin');
    const status=root?.querySelector('.announce-status');
    const button=root?.querySelector('.admin-announce-publish');
    if(!title||!body){if(status)status.textContent='יש למלא כותרת ותוכן להודעה';return;}
    if(button){button.disabled=true;button.textContent='מפרסמת…'}
    if(status)status.textContent='';
    try{
      const r=await fetch('/api/admin/announcements',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({title,body})});
      const d=await r.json().catch(()=>({}));
      if(!r.ok)throw new Error(d.error||'PUBLISH_FAILED');
      await inject();
      const fresh=document.querySelector('#admin .announcement-admin .announce-status');if(fresh)fresh.textContent='ההודעה פורסמה בהצלחה';
    }catch(e){console.error(e);if(status)status.textContent='לא הצלחתי לפרסם את ההודעה';if(button){button.disabled=false;button.textContent='פרסום הודעה'}}
  }
  async function remove(id){if(!id||!confirm('למחוק את ההודעה?'))return;try{const r=await fetch('/api/admin/announcements/'+encodeURIComponent(id),{method:'DELETE'});if(!r.ok)throw new Error();await inject()}catch(e){console.error(e);alert('לא הצלחתי למחוק את ההודעה')}}
  async function refresh(){await inject()}
  window.adminPublishAnnouncement=publish;
  window.adminDeleteAnnouncement=remove;
  window.adminRefreshAnnouncements=refresh;
  const original=window.renderAdmin;
  if(typeof original==='function')window.renderAdmin=async function(){await original.apply(this,arguments);await inject();};
  if(document.getElementById('admin')?.classList.contains('active'))inject();
})();