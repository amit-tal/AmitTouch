(function(){
 const BUILD='20260820-profile-v1';
 let page=document.getElementById('profile');
 if(!page){page=document.createElement('section');page.id='profile';page.className='screen';document.querySelector('main.app')?.appendChild(page);}
 document.getElementById('amit-profile-style')?.remove();
 const style=document.createElement('style');style.id='amit-profile-style';style.textContent=`
 #profile{min-height:100dvh!important;padding:18px 15px 100px!important;background:transparent!important;color:#315c57!important;direction:rtl!important;font-family:Inter,sans-serif!important;overflow:auto!important}
 #profile:before,#profile:after{content:none!important;display:none!important}
 #profile .profile-head{display:grid!important;grid-template-columns:42px 1fr 42px!important;align-items:center!important;margin-bottom:18px!important}
 #profile .profile-head h2{margin:0!important;text-align:center!important;font-size:18px!important;font-weight:600!important;color:#173f3b!important}
 #profile .profile-back{border:0!important;background:transparent!important;color:#315c57!important;font-size:28px!important;line-height:1!important;width:42px!important;height:42px!important;cursor:pointer!important}
 #profile .profile-identity{text-align:center!important;margin:0 auto 24px!important}
 #profile .profile-avatar{width:86px!important;height:86px!important;border-radius:50%!important;margin:0 auto 12px!important;display:grid!important;place-items:center!important;background:rgba(255,255,255,.62)!important;border:1px solid rgba(255,255,255,.9)!important;color:#07584f!important;font-size:32px!important;font-weight:500!important;box-shadow:0 8px 20px rgba(93,63,52,.06)!important;overflow:hidden!important}
 #profile .profile-avatar img{width:100%!important;height:100%!important;object-fit:cover!important}
 #profile .profile-name{margin:0 0 5px!important;font-size:17px!important;font-weight:600!important;color:#315c57!important}
 #profile .profile-phone{margin:0!important;font-size:14px!important;color:#697c79!important;direction:ltr!important}
 #profile .profile-card{max-width:360px!important;margin:0 auto 14px!important;border-radius:16px!important;border:1px solid rgba(255,255,255,.92)!important;background:rgba(255,255,255,.48)!important;box-shadow:0 6px 18px rgba(82,66,58,.06)!important;overflow:hidden!important;backdrop-filter:blur(14px)!important;-webkit-backdrop-filter:blur(14px)!important}
 #profile .profile-row{width:100%!important;min-height:54px!important;padding:0 16px!important;border:0!important;border-bottom:1px solid rgba(7,88,79,.08)!important;background:transparent!important;display:flex!important;align-items:center!important;justify-content:space-between!important;color:#405e5a!important;font-family:inherit!important;font-size:14px!important;cursor:pointer!important;text-align:right!important}
 #profile .profile-row:last-child{border-bottom:0!important}
 #profile .profile-row-label{display:flex!important;align-items:center!important;gap:11px!important}
 #profile .profile-row svg{width:20px!important;height:20px!important;color:#66827e!important;flex:0 0 20px!important}
 #profile .profile-chevron{font-size:21px!important;color:#8b9a98!important;font-weight:300!important}
 #profile .profile-logout{max-width:360px!important;width:100%!important;margin:12px auto 0!important;min-height:52px!important;border-radius:16px!important;border:1px solid rgba(255,255,255,.92)!important;background:rgba(255,255,255,.42)!important;color:#b46f69!important;font-family:inherit!important;font-size:14px!important;cursor:pointer!important;display:block!important}
 `;document.head.appendChild(style);
 const userIcon='<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="3.5" stroke="currentColor" stroke-width="1.5"/><path d="M5.5 20c.6-4 2.8-6 6.5-6s5.9 2 6.5 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>';
 const settingsIcon='<svg viewBox="0 0 24 24" fill="none"><path d="M12 8.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Z" stroke="currentColor" stroke-width="1.5"/><path d="M19 13.5v-3l-2-.6a7 7 0 0 0-.7-1.7l1-1.8-2.1-2.1-1.8 1a7 7 0 0 0-1.7-.7L11 2.5H8l-.6 2.1a7 7 0 0 0-1.7.7l-1.8-1-2.1 2.1 1 1.8a7 7 0 0 0-.7 1.7l-2 .6v3l2 .6c.2.6.4 1.2.7 1.7l-1 1.8 2.1 2.1 1.8-1c.5.3 1.1.5 1.7.7l.6 2.1h3l.6-2.1c.6-.2 1.2-.4 1.7-.7l1.8 1 2.1-2.1-1-1.8c.3-.5.5-1.1.7-1.7l2-.6Z" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"/></svg>';
 function current(){try{return window.user||user||{}}catch(_){return{}}}
 function render(){const u=current(),name=u.name||u.full_name||u.fullName||'הפרופיל שלי',phone=u.phone||u.phone_number||'';const initials=name==='הפרופיל שלי'?'♡':name.trim().charAt(0);page.innerHTML=`<div class="profile-head"><button class="profile-back" type="button" aria-label="חזרה">‹</button><h2>הפרופיל שלי</h2><span></span></div><div class="profile-identity"><div class="profile-avatar">${initials}</div><h3 class="profile-name">${String(name)}</h3>${phone?`<p class="profile-phone">${String(phone)}</p>`:''}</div><div class="profile-card"><button class="profile-row" type="button" data-action="details"><span class="profile-row-label">${userIcon}<span>הפרטים שלי</span></span><span class="profile-chevron">‹</span></button><button class="profile-row" type="button" data-action="preferences"><span class="profile-row-label">${settingsIcon}<span>העדפות</span></span><span class="profile-chevron">‹</span></button></div><button class="profile-logout" type="button">התנתקות</button>`;page.querySelector('.profile-back').onclick=()=>window.show?.('home');page.querySelector('.profile-logout').onclick=()=>{if(typeof window.logout==='function')window.logout();else if(typeof logout==='function')logout();};}
 window.profile=function(){render();window.show?.('profile');};
 render();
})();