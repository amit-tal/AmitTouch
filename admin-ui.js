(function(){
  const ADMIN_SERVICES={
    gel:{id:'gel',name:'לק ג׳ל',price:150,minutes:60},
    fill:{id:'fill',name:'מילוי',price:200,minutes:90},
    new:{id:'new',name:'בנייה חדשה',price:250,minutes:120},
    remove:{id:'remove',name:'הסרה בלבד',price:25,minutes:30}
  };

  function cleanPhone(value){
    let phone=String(value||'').replace(/\D/g,'');
    if(phone.startsWith('972')&&phone.length>=11)phone='0'+phone.slice(3);
    return phone;
  }

  async function resolveCustomer(fullName,phone){
    const lookup=await fetch('/api/login',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({fullName,phone})});
    if(lookup.ok){const data=await lookup.json();if(data.role==='admin')throw new Error('ADMIN_NOT_CUSTOMER');return data.customer;}
    if(lookup.status!==404)throw new Error('CUSTOMER_LOOKUP_FAILED');
    const parts=fullName.replace(/\s+/g,' ').trim().split(' ');
    const firstName=parts.shift()||'';
    const lastName=parts.join(' ');
    if(!firstName||!lastName)throw new Error('FULL_NAME_REQUIRED');
    const create=await fetch('/api/register',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({firstName,lastName,phone,birthDate:null})});
    const data=await create.json();
    if(!create.ok)throw new Error(data.error||'CUSTOMER_CREATE_FAILED');
    return data.customer;
  }

  function adminShell(){
    return `<div style="display:grid;grid-template-columns:1fr 1fr;gap:9px;margin:10px 0 16px"><button class="primary" style="margin:0" onclick="openAdminBooking()">＋ קביעת תור</button><button class="glass card" style="margin:0;border:0;font-weight:600" onclick="renderAdmin()">↻ רענון</button></div>`;
  }

  window.openAdminBooking=function(){
    const target=document.getElementById('adminBody');if(!target)return;
    target.innerHTML=`${adminShell()}<div class="glass card"><h3 style="margin-top:0">קביעת תור ידנית</h3><p class="subtitle">תור שאת קובעת בעצמך מאושר מיד ונכנס ל־Google Calendar.</p><input id="adminCustomerName" class="field" placeholder="שם מלא"><input id="adminCustomerPhone" class="field" inputmode="tel" placeholder="מספר נייד"><select id="adminService" class="field"><option value="gel">לק ג׳ל · ₪150 · שעה</option><option value="fill">מילוי · ₪200 · שעה וחצי</option><option value="new">בנייה חדשה · ₪250 · שעתיים</option><option value="remove">הסרה בלבד · ₪25</option></select><input id="adminDate" class="field" type="date"><input id="adminTime" class="field" type="time" step="1800"><button class="primary" onclick="adminCreateBooking()">שמירת התור ביומן</button><button class="secondary" onclick="renderAdmin()">ביטול וחזרה</button></div>`;
  };

  window.adminCreateBooking=async function(){
    const fullName=document.getElementById('adminCustomerName').value.replace(/\s+/g,' ').trim();
    const phone=cleanPhone(document.getElementById('adminCustomerPhone').value);
    const serviceId=document.getElementById('adminService').value;
    const date=document.getElementById('adminDate').value;
    const time=document.getElementById('adminTime').value;
    if(!fullName||phone.length<9||!date||!time)return alert('יש למלא שם מלא, נייד, שירות, תאריך ושעה');
    const svc=ADMIN_SERVICES[serviceId];
    try{
      const customer=await resolveCustomer(fullName,phone);
      const availability=await fetch(`/api/availability?date=${encodeURIComponent(date)}&minutes=${svc.minutes}`);
      const availabilityData=await availability.json();
      if(!availability.ok)throw new Error(availabilityData.error||'AVAILABILITY_FAILED');
      if(!availabilityData.slots.includes(time))return alert('השעה שבחרת אינה פנויה ביומן. בחרי שעה אחרת.');
      const response=await fetch('/api/book',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({customerId:customer.id,serviceCode:svc.id,service:svc.name,price:svc.price,date,time,minutes:svc.minutes,extra:'נקבע ידנית על ידי עמית',createdByAdmin:true})});
      const data=await response.json();
      if(response.status===409)return alert('השעה נתפסה ממש עכשיו ביומן');
      if(!response.ok)throw new Error(data.error||'BOOKING_FAILED');
      alert('התור נשמר כמאושר ונוסף ל־Google Calendar');
      await window.renderAdmin();
    }catch(error){console.error(error);if(error.message==='FULL_NAME_REQUIRED')return alert('ללקוחה חדשה יש להזין שם פרטי ושם משפחה');alert('לא הצלחתי לשמור את התור. נסי שוב.');}
  };

  window.adminApproveAppointment=async function(id){
    if(!confirm('לאשר את התור?'))return;
    try{const r=await fetch('/api/admin/appointments/'+encodeURIComponent(id)+'/approve',{method:'POST'});const d=await r.json();if(!r.ok)throw new Error(d.error||'APPROVAL_FAILED');alert('התור אושר');await window.renderAdmin();}catch(e){console.error(e);alert('לא הצלחתי לאשר את התור');}
  };

  window.adminRejectAppointment=async function(id){
    if(!confirm('לדחות את בקשת התור?'))return;
    try{const r=await fetch('/api/admin/appointments/'+encodeURIComponent(id)+'/reject',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({reason:'בקשת התור לא אושרה על ידי עמית'})});const d=await r.json();if(!r.ok)throw new Error(d.error||'REJECTION_FAILED');alert('בקשת התור נדחתה');await window.renderAdmin();}catch(e){console.error(e);alert('לא הצלחתי לדחות את הבקשה');}
  };

  window.adminCancelAppointment=async function(appointmentId,customerLabel){
    if(!appointmentId)return;
    if(!confirm(`לבטל את התור${customerLabel?' של '+customerLabel:''}?\nהתור יימחק גם מ־Google Calendar.`))return;
    try{const response=await fetch('/api/appointments/'+encodeURIComponent(appointmentId),{method:'DELETE',headers:{'Content-Type':'application/json'},body:JSON.stringify({reason:'בוטל על ידי עמית דרך ממשק המנהלת'})});const data=await response.json();if(!response.ok)throw new Error(data.error||'CANCELLATION_FAILED');alert('התור בוטל ונמחק מהיומן');await window.renderAdmin();}catch(error){console.error(error);alert('לא הצלחתי לבטל את התור. נסי שוב.');}
  };

  function info(a){const c=a.customer||{};return{name:[c.first_name,c.last_name].filter(Boolean).join(' ')||'לקוחה',phone:c.phone||'',when:new Date(a.starts_at).toLocaleString('he-IL',{dateStyle:'short',timeStyle:'short'}),service:a.service_name||'',price:Number(a.total_price||0)};}

  window.renderAdmin=async function(){
    const target=document.getElementById('adminBody');if(!target)return;
    target.innerHTML=adminShell()+'<div class="card glass"><p class="subtitle">טוענת תורים…</p></div>';
    try{
      const response=await fetch('/api/admin/appointments');
      const data=await response.json();
      if(!response.ok)throw new Error(data.error||'ADMIN_APPOINTMENTS_FAILED');
      const rows=(data.appointments||[]).filter(a=>a.status!=='cancelled');
      const pending=rows.filter(a=>a.status==='pending');
      const confirmed=rows.filter(a=>a.status==='confirmed');
      const pendingHtml=pending.length?'<div class="section-title">ממתינים לאישור</div>'+pending.map(a=>{const x=info(a);return `<div class="notice glass"><h3>${x.name}</h3><p>${x.service}<br>${x.when}<br>${x.phone}<br>₪${x.price}</p><div style="display:grid;grid-template-columns:1fr 1fr;gap:8px"><button class="primary" style="margin:0" onclick="adminApproveAppointment('${a.id}')">אישור</button><button class="cancel" style="margin:0" onclick="adminRejectAppointment('${a.id}')">דחייה</button></div></div>`}).join(''):'<div class="card glass"><p class="subtitle">אין בקשות שממתינות לאישור.</p></div>';
      const confirmedHtml=confirmed.length?'<div class="section-title">תורים מאושרים</div>'+confirmed.map(a=>{const x=info(a);return `<div class="notice glass"><h3>${x.name}</h3><p>${x.service}<br>${x.when}<br>${x.phone}<br>₪${x.price}</p><button class="cancel" onclick="adminCancelAppointment('${a.id}','${x.name.replace(/'/g,'&#39;')}')">ביטול התור</button></div>`}).join(''):'<div class="card glass"><p class="subtitle">אין כרגע תורים מאושרים.</p></div>';
      target.innerHTML=adminShell()+pendingHtml+confirmedHtml;
    }catch(error){console.error(error);target.innerHTML=adminShell()+'<div class="card glass">לא הצלחתי לטעון את נתוני הניהול</div>';}
  };
})();