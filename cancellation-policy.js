(function(){
 const DAY=24*60*60*1000;
 const style=document.createElement('style');
 style.id='amit-cancel-center-style';
 style.textContent=`
   #cancelModal{position:fixed!important;inset:0!important;z-index:260!important;display:none!important;place-items:center!important;padding:22px!important;background:rgba(31,67,63,.12)!important;backdrop-filter:blur(10px)!important;-webkit-backdrop-filter:blur(10px)!important}
   #cancelModal.show{display:grid!important}
   #cancelModal .modal-box{width:min(352px,calc(100vw - 44px))!important;margin:0!important;padding:25px 22px 21px!important;border-radius:30px!important;text-align:center!important;direction:rtl!important;background:linear-gradient(145deg,rgba(255,255,255,.68),rgba(255,248,244,.38))!important;border:1px solid rgba(255,255,255,.9)!important;box-shadow:0 18px 48px rgba(47,113,107,.13),inset 0 1px 0 rgba(255,255,255,.98)!important;backdrop-filter:blur(30px) saturate(145%)!important;-webkit-backdrop-filter:blur(30px) saturate(145%)!important}
   #cancelModal h2{margin:0!important;font-size:20px!important;line-height:1.25!important;font-weight:300!important;color:#2f716b!important}
   #cancelModal .subtitle{margin:10px 0 18px!important;font-size:13px!important;line-height:1.55!important;font-weight:300!important;color:#527873!important}
   #cancelModal .danger{width:100%!important;height:46px!important;border:1px solid rgba(255,255,255,.34)!important;border-radius:15px!important;background:linear-gradient(90deg,#2c655f,#397970)!important;color:white!important;font-size:15px!important;font-weight:300!important;box-shadow:0 8px 18px rgba(47,113,107,.14)!important}
   #cancelModal .secondary{margin-top:7px!important}
 `;
 document.getElementById(style.id)?.remove();
 document.head.appendChild(style);
 function list(){try{return Array.isArray(window.appointments)?window.appointments:[]}catch(_){return []}}
 function ts(a){const d=String(a?.date||''),t=String(a?.time||'00:00');const v=new Date(`${d}T${t.length===5?t+':00':t}`).getTime();return Number.isFinite(v)?v:NaN}
 function canCancel(a){const v=ts(a);return Number.isFinite(v)&&v-Date.now()>=DAY}
 window.canCancelAppointment=canCancel;
 window.askCancel=function(id){const a=list().find(x=>String(x.id)===String(id));if(!a)return;if(!canCancel(a)){window.amitNotice?.('ניתן לבטל תור עד 24 שעות לפני מועד התור. לאחר מכן לא ניתן לבצע ביטול דרך האפליקציה.','ביטול תור');return;}window.cancelId=id;const modal=document.getElementById('cancelModal');if(modal){const title=modal.querySelector('h2');const text=modal.querySelector('.subtitle');const danger=modal.querySelector('.danger');if(title)title.textContent='לבטל את התור?';if(text)text.textContent='הביטול אפשרי עד 24 שעות לפני מועד התור.';if(danger)danger.textContent='כן, לבטל את התור';modal.classList.add('show');}}
 window.confirmCancel=async function(){const a=list().find(x=>String(x.id)===String(window.cancelId));if(!a){document.getElementById('cancelModal')?.classList.remove('show');return;}if(!canCancel(a)){document.getElementById('cancelModal')?.classList.remove('show');window.amitNotice?.('חלון הביטול נסגר. ניתן לבטל תור עד 24 שעות לפני מועד התור.','ביטול תור');return;}try{const r=await fetch('/api/appointments/'+encodeURIComponent(a.id),{method:'DELETE',headers:{'Content-Type':'application/json'},body:JSON.stringify({reason:'בוטל על ידי הלקוחה דרך האפליקציה'})});const j=await r.json().catch(()=>({}));if(!r.ok)throw new Error(j.error||'CANCELLATION_FAILED');window.appointments=list().filter(x=>String(x.id)!==String(a.id));try{appointments=window.appointments}catch(_){}window.cancelId=null;document.getElementById('cancelModal')?.classList.remove('show');window.renderHomeAppointments?.();window.dispatchEvent(new CustomEvent('amit:appointments-updated'));window.amitNotice?.('התור בוטל בהצלחה.','התור בוטל');}catch(e){console.error(e);window.amitNotice?.('לא הצלחתי לבטל את התור כרגע. נסי שוב בעוד רגע.','ביטול תור');}}
})();