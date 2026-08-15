(function(){
  const ADMIN_NAME='עמית טל';
  const ADMIN_PHONE='0527467143';
  const CODE_ICON="/assets/ChatGPT%20Image%20Aug%2015,%202026,%2008_39_48%20PM.png?v=20260815-admin-code";
  let adminAttempted=false;

  function cleanPhone(value){let p=String(value||'').replace(/\D/g,'');if(p.startsWith('972')&&p.length>=11)p='0'+p.slice(3);return p;}
  function cleanName(value){return String(value||'').replace(/\s+/g,' ').trim();}
  function ensureStyle(){if(document.getElementById('admin-code-style'))return;const s=document.createElement('style');s.id='admin-code-style';s.textContent=`#adminCodeWrap{display:flex!important}#adminCodeWrap .admin-code-icon{font-size:0!important;background-image:url('${CODE_ICON}')!important;background-position:center!important;background-repeat:no-repeat!important;background-size:contain!important}#adminCodeWrap.admin-code-reveal{animation:adminCodeReveal .24s ease both}@keyframes adminCodeReveal{from{opacity:0;transform:translateY(-5px)}to{opacity:1;transform:translateY(0)}}`;document.head.appendChild(s);}
  function createField(){const phoneWrap=document.getElementById('loginPhone')?.closest('.field-wrap');if(!phoneWrap)return null;let wrap=document.getElementById('adminCodeWrap');if(wrap)return wrap;wrap=document.createElement('div');wrap.id='adminCodeWrap';wrap.className='glass field-wrap admin-code-wrap admin-code-reveal';wrap.innerHTML='<span class="field-icon admin-code-icon" aria-hidden="true"></span><input id="adminCode" class="field" inputmode="numeric" autocomplete="one-time-code" maxlength="4" placeholder="קוד מנהל">';phoneWrap.insertAdjacentElement('afterend',wrap);setTimeout(()=>document.getElementById('adminCode')?.focus(),30);return wrap;}
  function removeField(){adminAttempted=false;document.getElementById('adminCodeWrap')?.remove();}
  function isAdminDetails(){return cleanName(document.getElementById('loginName')?.value)===ADMIN_NAME&&cleanPhone(document.getElementById('loginPhone')?.value)===ADMIN_PHONE;}
  async function customerLogin(fullName,phone){
    try{
      const response=await fetch('/api/login',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({fullName,phone})});
      const data=await response.json().catch(()=>({}));
      if(response.ok&&data.role==='customer'&&data.customer){
        const c=data.customer;
        user={name:c.fullName||fullName,phone:c.phone||phone,dob:c.birthDate||null};
        try{
          const parts=(c.fullName||fullName).trim().split(/\s+/);
          const first=c.firstName||parts.shift()||'';
          const last=c.lastName||parts.join(' ');
          profiles=profiles.filter(x=>x.phone!==user.phone);
          profiles.push({first,last,phone:user.phone,dob:c.birthDate||''});
          localStorage.setItem('amitTouchProfiles',JSON.stringify(profiles));
        }catch(_){ }
        enterApp();
        return;
      }
      if(response.status===404){
        const local=profiles.find(x=>x.phone===phone);
        if(local){user={name:(local.first+' '+local.last).trim(),phone:local.phone,dob:local.dob};enterApp();return;}
        document.getElementById('regPhone').value=phone;
        show('register');
        return;
      }
      if(response.status===401&&data.error==='DETAILS_DO_NOT_MATCH')return alert('הפרטים שהוזנו אינם תואמים לחשבון הקיים.');
      if(response.status===400)return alert('יש למלא שם מלא ומספר נייד תקין.');
      throw new Error(data.error||'LOGIN_FAILED');
    }catch(error){
      console.error(error);
      const local=profiles.find(x=>x.phone===phone);
      if(local){user={name:(local.first+' '+local.last).trim(),phone:local.phone,dob:local.dob};enterApp();return;}
      alert('לא הצלחתי להתחבר כרגע. נסי שוב בעוד רגע.');
    }
  }
  function install(){
    const name=document.getElementById('loginName');const phone=document.getElementById('loginPhone');if(!name||!phone)return setTimeout(install,50);
    ensureStyle();removeField();
    name.addEventListener('input',()=>{if(!isAdminDetails())removeField();});
    phone.addEventListener('input',()=>{if(!isAdminDetails())removeField();});
    window.login=async function(){
      const fullName=cleanName(name.value);const clean=cleanPhone(phone.value);
      if(!fullName||clean.length<9)return alert('יש למלא שם מלא ומספר נייד');
      if(fullName!==ADMIN_NAME||clean!==ADMIN_PHONE){removeField();return customerLogin(fullName,clean);}
      if(!adminAttempted){adminAttempted=true;createField();return;}
      const code=String(document.getElementById('adminCode')?.value||'').trim();if(!code){document.getElementById('adminCode')?.focus();return;}
      try{
        const response=await fetch('/api/login',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({fullName,phone:clean,adminCode:code})});
        const data=await response.json();
        if(response.status===401&&data.error==='INVALID_ADMIN_CODE'){document.getElementById('adminCode')?.select();return alert('קוד המנהל שגוי');}
        if(response.status===403&&data.error==='ADMIN_CODE_REQUIRED'){document.getElementById('adminCode')?.focus();return;}
        if(!response.ok)throw new Error(data.error||'LOGIN_FAILED');
        user={name:fullName,phone:clean,admin:true};document.getElementById('nav')?.classList.remove('show');show('admin');await window.renderAdmin?.();
      }catch(error){console.error(error);alert('לא הצלחתי להתחבר כמנהלת כרגע. נסי שוב בעוד רגע.');}
    };
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>setTimeout(install,0));else setTimeout(install,0);
})();