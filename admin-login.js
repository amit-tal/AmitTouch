(function(){
  const ADMIN_NAME='עמית טל';
  const ADMIN_PHONE='0527467143';
  function cleanPhone(value){let p=String(value||'').replace(/\D/g,'');if(p.startsWith('972')&&p.length>=11)p='0'+p.slice(3);return p;}
  function cleanName(value){return String(value||'').replace(/\s+/g,' ').trim();}
  function ensureStyle(){if(document.getElementById('admin-code-style'))return;const s=document.createElement('style');s.id='admin-code-style';s.textContent=`#adminCodeWrap .admin-code-icon{font-size:0!important;position:relative!important;background:none!important}#adminCodeWrap .admin-code-icon:before{content:'••••';font-size:13px!important;line-height:1!important;letter-spacing:2px!important;color:#2f716b!important;font-weight:500!important;display:block!important;transform:translateY(-1px)}#adminCodeWrap.admin-code-reveal{animation:adminCodeReveal .24s ease both}@keyframes adminCodeReveal{from{opacity:0;transform:translateY(-5px)}to{opacity:1;transform:translateY(0)}}`;document.head.appendChild(s);}
  function ensureField(){
    const login=document.getElementById('login');
    const phoneWrap=document.getElementById('loginPhone')?.closest('.field-wrap');
    if(!login||!phoneWrap)return null;
    let wrap=document.getElementById('adminCodeWrap');
    if(!wrap){
      wrap=document.createElement('div');
      wrap.id='adminCodeWrap';
      wrap.className='glass field-wrap admin-code-wrap';
      wrap.style.display='none';
      wrap.innerHTML='<span class="field-icon admin-code-icon" aria-hidden="true"></span><input id="adminCode" class="field" inputmode="numeric" autocomplete="one-time-code" maxlength="4" placeholder="קוד מנהל">';
      phoneWrap.insertAdjacentElement('afterend',wrap);
    }
    return wrap;
  }
  function isAdminDetails(){return cleanName(document.getElementById('loginName')?.value)===ADMIN_NAME&&cleanPhone(document.getElementById('loginPhone')?.value)===ADMIN_PHONE;}
  function hideField(){const wrap=ensureField();if(wrap)wrap.style.display='none';const code=document.getElementById('adminCode');if(code)code.value='';}
  function revealField(){const wrap=ensureField();if(!wrap)return;wrap.style.display='flex';wrap.classList.remove('admin-code-reveal');void wrap.offsetWidth;wrap.classList.add('admin-code-reveal');setTimeout(()=>document.getElementById('adminCode')?.focus(),30);}
  function install(){
    const name=document.getElementById('loginName');
    const phone=document.getElementById('loginPhone');
    if(!name||!phone)return setTimeout(install,50);
    ensureStyle();ensureField();hideField();
    name.addEventListener('input',()=>{if(!isAdminDetails())hideField();});
    phone.addEventListener('input',()=>{if(!isAdminDetails())hideField();});
    const originalLogin=window.login;
    window.login=async function(){
      const fullName=cleanName(name.value);
      const clean=cleanPhone(phone.value);
      if(fullName!==ADMIN_NAME||clean!==ADMIN_PHONE){hideField();return originalLogin?.();}
      const wrap=ensureField();
      if(wrap&&wrap.style.display==='none'){revealField();return;}
      const code=String(document.getElementById('adminCode')?.value||'').trim();
      if(!code){document.getElementById('adminCode')?.focus();return;}
      try{
        const response=await fetch('/api/login',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({fullName,phone:clean,adminCode:code})});
        const data=await response.json();
        if(response.status===401&&data.error==='INVALID_ADMIN_CODE'){document.getElementById('adminCode')?.select();return alert('קוד המנהל שגוי');}
        if(response.status===403&&data.error==='ADMIN_CODE_REQUIRED'){document.getElementById('adminCode')?.focus();return;}
        if(!response.ok)throw new Error(data.error||'LOGIN_FAILED');
        if(data.role!=='admin')throw new Error('ADMIN_ROLE_REQUIRED');
        user={name:fullName,phone:clean,admin:true};
        document.getElementById('nav')?.classList.remove('show');
        show('admin');
        await window.renderAdmin?.();
      }catch(error){console.error(error);alert('לא הצלחתי להתחבר כמנהלת כרגע. נסי שוב בעוד רגע.');}
    };
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>setTimeout(install,0));else setTimeout(install,0);
})();