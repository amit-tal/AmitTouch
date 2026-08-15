(function(){
  const register=document.getElementById('register');
  const dob=document.getElementById('regDob');
  if(!register||!dob)return;
  const wrap=dob.closest('.field-wrap');
  if(!wrap)return;

  document.getElementById('amit-touch-age-check-style')?.remove();
  const style=document.createElement('style');
  style.id='amit-touch-age-check-style';
  style.textContent=`
    #register .age-check-wrap{cursor:pointer!important;direction:rtl!important;justify-content:flex-start!important;padding:0 18px!important}
    #register .age-check-wrap .field-icon,#register .age-check-wrap .dob-copy{display:none!important}
    #register .age-check-label{width:100%!important;height:100%!important;display:flex!important;align-items:center!important;justify-content:flex-start!important;gap:13px!important;cursor:pointer!important;color:#405d59!important;font-size:15px!important;font-weight:300!important;text-align:right!important;direction:rtl!important}
    #register .age-check-box{width:24px!important;height:24px!important;min-width:24px!important;border-radius:7px!important;border:1.5px solid rgba(47,113,107,.48)!important;background:rgba(255,255,255,.38)!important;display:grid!important;place-items:center!important;box-shadow:inset 0 1px 0 rgba(255,255,255,.85),0 4px 12px rgba(47,113,107,.05)!important;transition:.18s ease!important}
    #register .age-check-box:after{content:'✓'!important;color:#fff!important;font-size:16px!important;line-height:1!important;opacity:0!important;transform:scale(.65)!important;transition:.18s ease!important}
    #register .age-check-input{position:absolute!important;opacity:0!important;pointer-events:none!important;width:1px!important;height:1px!important}
    #register .age-check-input:checked + .age-check-box{background:#34736d!important;border-color:#34736d!important;box-shadow:0 5px 14px rgba(47,113,107,.16),inset 0 1px 0 rgba(255,255,255,.22)!important}
    #register .age-check-input:checked + .age-check-box:after{opacity:1!important;transform:scale(1)!important}
    #register .age-check-text{flex:1!important}
    @media(max-height:700px){#register .age-check-label{font-size:13px!important}#register .age-check-box{width:21px!important;height:21px!important;min-width:21px!important}}
  `;
  document.head.appendChild(style);

  wrap.classList.remove('dob-wrap');
  wrap.classList.add('age-check-wrap');
  wrap.querySelector('.dob-copy')?.remove();
  wrap.querySelector('.field-label')?.remove();
  const icon=wrap.querySelector('.field-icon'); if(icon)icon.style.display='none';
  dob.style.display='none';
  dob.tabIndex=-1;

  let label=wrap.querySelector('.age-check-label');
  if(!label){
    label=document.createElement('label');
    label.className='age-check-label';
    label.innerHTML='<input id="regOver18" class="age-check-input" type="checkbox"><span class="age-check-box"></span><span class="age-check-text">האם את מעל גיל 18?</span>';
    wrap.appendChild(label);
  }
  const check=label.querySelector('#regOver18');
  const sync=()=>{
    dob.value=check.checked?'2000-01-01':'';
    dob.dispatchEvent(new Event('input',{bubbles:true}));
    dob.dispatchEvent(new Event('change',{bubbles:true}));
  };
  check.addEventListener('change',sync);
  sync();
})();