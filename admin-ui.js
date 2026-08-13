(function(){
  async function resolveCustomer(fullName, phone){
    const loginRes=await fetch('/api/login',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({fullName,phone})});
    if(loginRes.ok){const data=await loginRes.json();return data.customer;}
    if(loginRes.status!==404) throw new Error('CUSTOMER_LOOKUP_FAILED');
    const parts=fullName.trim().split(/\s+/);const firstName=parts.shift()||'';const lastName=parts.join(' ');
    const regRes=await fetch('/api/register',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({firstName,lastName,phone,birthDate:null})});
    const regData=await regRes.json();
    if(!regRes.ok) throw new Error(regData.error||'CUSTOMER_CREATE_FAILED');
    return regData.customer;
  }

  window.openAdminBooking=function(){
    const target=document.getElementById('adminBody');
    if(!target)return;
    target.innerHTML=`<div class="glass card"><h3>קביעת תור ידנית</h3><input id="adminCustomerName" class="field" placeholder="שם מלא"><input id="adminCustomerPhone" class="field" inputmode="tel" placeholder="נייד"><select id="adminService" class="field"><option value="gel">לק ג׳ל</option><option value="fill">מילוי</option><option value="new">בנייה חדשה</option><option value="remove">הסרה בלבד</option></select><input id="adminDate" class="field" type="date"><input id="adminTime" class="field" type="time"><button class="primary" onclick="adminCreateBooking()">שמירת תור</button><button class="secondary" onclick="renderAdmin()">חזרה</button></div>`;
  };

  window.adminCreateBooking=async function(){
    try{
      const fullName=document.getElementById('adminCustomerName').value.replace(/\s+/g,' ').trim();
      const phone=document.getElementById('adminCustomerPhone').value.replace(/\D/g,'');
      const serviceId=document.getElementById('adminService').value;
      const date=document.getElementById('adminDate').value;
      const time=document.getElementById('adminTime').value;
      if(!fullName||phone.length<9||!date||!time)return alert('יש למלא את כל פרטי התור');
      const customer=await resolveCustomer(fullName,phone);
      const svc=(window.SERVICES||[]).find(x=>x.id===serviceId);
      if(!svc)throw new Error('SERVICE_NOT_FOUND');
      const response=await fetch('/api/book',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({customerId:customer.id,serviceCode:svc.id,service:svc.n,price:svc.p,date,time,minutes:svc.m,extra:'נקבע ידנית על ידי עמית'})});
      const data=await response.json();
      if(response.status===409)return alert('השעה תפוסה ביומן');
      if(!response.ok)throw new Error(data.error||'BOOKING_FAILED');
      alert('התור נשמר ונוסף ליומן');
      await window.renderAdmin();
    }catch(error){console.error(error);alert('לא הצלחתי לשמור את התור');}
  };

  const originalRenderAdmin=window.renderAdmin;
  window.renderAdmin=async function(){
    if(originalRenderAdmin)await originalRenderAdmin();
    const target=document.getElementById('adminBody');
    if(!target)return;
    const create=document.createElement('button');create.className='primary';create.textContent='＋ קביעת תור ידנית';create.onclick=window.openAdminBooking;target.prepend(create);
    target.querySelectorAll('.notice').forEach(card=>{
      const txt=card.textContent||'';
      if(!txt.includes('תור חדש'))return;
    });
  };
})();