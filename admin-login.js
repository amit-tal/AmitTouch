(function(){
  const ADMIN_NAME='עמית טל';
  const ADMIN_PHONE='0527467143';
  const ADMIN_KEY='amit-touch-admin-session-v1';
  const CODE_ICON="/assets/ChatGPT%20Image%20Aug%2015,%202026,%2008_39_48%20PM.png?v=20260822-admin";
  let adminAttempted=false;
  const cleanPhone=v=>{let p=String(v||'').replace(/\D/g,'');if(p.startsWith('972')&&p.length>=11)p='0'+p.slice(3);return p};
  const cleanName=v=>String(v||'').replace(/\s+/g,' ').trim();
  function isAdmin(){try{return sessionStorage.getItem(ADMIN_KEY)==='1'||localStorage.getItem(ADMIN_KEY)==='1'}catch(_){return false}}
  function saveAdmin(){try{localStorage.setItem(ADMIN_KEY,'1');sessionStorage.setItem(ADMIN_KEY,'1')}catch(_){} window.__AMIT_ADMIN_SESSION__=true}
  function clearAdmin(){try{localStorage.removeItem(ADMIN_KEY);sessionStorage.removeItem(ADMIN_KEY)}catch(_){} window.__AMIT_ADMIN_SESSION__=false}
  function enterAdmin(){
    saveAdmin();
    const u={name:ADMIN_NAME,phone:ADMIN_PHONE,admin:true};try{user=u}catch(_){}window.user=u;
    document.body.classList.add('admin-v2');
    document.querySelectorAll('.screen').forEach(x=>x.classList.remove('active'));
    const screen=document.getElementById('admin');if(screen)screen.classList.add('active');
    document.getElementById('nav')?.classList.remove('show');
    window.renderAdminV2?.();window.renderAdmin?.();
    try{window.scrollTo(0,0)}catch(_){}
  }
  window.AMIT_TOUCH_ENTER_ADMIN=enterAdmin;
  window.AMIT_TOUCH_IS_ADMIN=isAdmin;
  window.AMIT_TOUCH_CLEAR_ADMIN=clearAdmin;
  function ensureStyle(){if(document.getElementById('admin-code-style'))return;const s=document.createElement('style');s.id='admin-code-style';s.textContent=`#adminCodeWrap{display:flex!important}#adminCodeWrap .admin-code-icon{font-size:0!important;background-image:url('${CODE_ICON}')!important;background-position:center!important;background-repeat:no-repeat!important;background-size:contain!important}`;document.head.appendChild(s)}
  function field(){const phoneWrap=document.getElementById('loginPhone')?.closest('.field-wrap');if(!phoneWrap)return;let w=document.getElementById('adminCodeWrap');if(w)return;w=document.createElement('div');w.id='adminCodeWrap';w.className='glass field-wrap';w.innerHTML='<span class="field-icon admin-code-icon"></span><input id="adminCode" class="field" inputmode="numeric" maxlength="4" placeholder="קוד מנהל">';phoneWrap.insertAdjacentElement('afterend',w);setTimeout(()=>document.getElementById('adminCode')?.focus(),20)}
  function remove(){adminAttempted=false;document.getElementById('adminCodeWrap')?.remove()}
  function details(){return cleanName(document.getElementById('loginName')?.value)===ADMIN_NAME&&cleanPhone(document.getElementById('loginPhone')?.value)===ADMIN_PHONE}
  function install(){
    const name=document.getElementById('loginName'),phone=document.getElementById('loginPhone');if(!name||!phone||typeof window.login!=='function')return setTimeout(install,60);
    ensureStyle();const customerLogin=window.login;
    name.addEventListener('input',()=>{if(!details())remove()});phone.addEventListener('input',()=>{if(!details())remove()});
    window.login=async function(){const fullName=cleanName(name.value),clean=cleanPhone(phone.value);if(fullName!==ADMIN_NAME||clean!==ADMIN_PHONE){clearAdmin();remove();return customerLogin()};if(!adminAttempted){adminAttempted=true;field();return}const code=String(document.getElementById('adminCode')?.value||'').trim();if(!code)return document.getElementById('adminCode')?.focus();try{const r=await fetch('/api/login',{method:'POST',credentials:'same-origin',headers:{'Content-Type':'application/json'},body:JSON.stringify({fullName,phone:clean,adminCode:code})});const d=await r.json().catch(()=>({}));if(!r.ok){if(r.status===401)return alert('קוד המנהל שגוי');throw new Error(d.error||'LOGIN_FAILED')}enterAdmin()}catch(e){console.error(e);alert('לא הצלחתי להתחבר כמנהלת כרגע. נסי שוב.')}};
    if(isAdmin())setTimeout(enterAdmin,0);
  }
  window.addEventListener('amit:session-ready',()=>{if(isAdmin())enterAdmin()});
  document.addEventListener('click',e=>{if(!isAdmin())return;const target=e.target.closest('[data-v],[data-back],#nav button');if(target&&document.body.classList.contains('admin-v2'))setTimeout(()=>{if(isAdmin()&&!document.querySelector('#admin.active'))enterAdmin()},0)},true);
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install,{once:true});else install();
})();