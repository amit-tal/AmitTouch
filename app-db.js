(function initFinalSplashOnly(){
  const splash=document.getElementById('splash');
  const guard=document.createElement('style');
  guard.textContent=`.splash{opacity:0!important;visibility:visible!important;background:#fbf5ef!important}.splash.brand-ready{opacity:1!important}.splash.hide{opacity:0!important;visibility:hidden!important}.splash .brush-stroke,.splash .brush-handle{display:none!important}.splash-heart img{display:block;width:46px;height:46px;object-fit:contain;margin:0 auto}`;
  document.head.appendChild(guard);
  if(splash){
    const logo=splash.querySelector('.splash-logo');
    const tag=splash.querySelector('.splash-tag');
    const heart=splash.querySelector('.splash-heart');
    if(logo) logo.src='/assets/amit-touch-logo.svg?v=20260814';
    if(tag) tag.textContent='הטאץ׳ הקטן שעושה את כל ההבדל';
    if(heart) heart.innerHTML='<img src="/assets/amit-touch-heart.svg?v=20260814" alt="">';
  }
  const brandScript=document.createElement('script');
  brandScript.src='/brand-assets.js?v=20260814b';
  brandScript.onload=()=>requestAnimationFrame(()=>requestAnimationFrame(()=>{if(splash)splash.classList.add('brand-ready')}));
  brandScript.onerror=()=>{if(splash){splash.style.background='#fbf5ef';splash.classList.add('brand-ready')}};
  document.head.appendChild(brandScript);
})();

(function () {
  function cleanPhoneValue(value) {
    let phone = String(value || '').replace(/\D/g, '');
    if (phone.startsWith('972') && phone.length >= 11) phone = '0' + phone.slice(3);
    return phone;
  }

  function mapAppointment(row) {
    const start = new Date(row.starts_at);
    const extras = Array.isArray(row.extras) ? row.extras : [];
    return {
      id: row.id,
      appointmentId: row.id,
      customerId: row.customer_id,
      service: row.service_name,
      price: Number(row.total_price || 0),
      date: new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Jerusalem', year: 'numeric', month: '2-digit', day: '2-digit' }).format(start),
      time: new Intl.DateTimeFormat('he-IL', { timeZone: 'Asia/Jerusalem', hour: '2-digit', minute: '2-digit', hour12: false }).format(start),
      minutes: row.treatment_minutes,
      buffer: row.buffer_minutes,
      extra: extras.map(x => x.name).filter(Boolean).join(', '),
      eventId: row.google_event_id,
      status: row.status
    };
  }

  function statusLabel(status) {
    if (status === 'pending') return 'ממתין לאישור';
    if (status === 'confirmed') return 'מאושר';
    if (status === 'cancelled') return 'בוטל';
    return status || '';
  }

  async function loadAppointments() {
    if (!user || !user.id || user.admin) return [];
    const response = await fetch('/api/customers/' + encodeURIComponent(user.id) + '/appointments');
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'APPOINTMENTS_FAILED');
    appointments = (data.appointments || []).filter(x => x.status !== 'cancelled').map(mapAppointment);
    return appointments;
  }

  window.login = async function () {
    const fullName = document.getElementById('loginName').value.replace(/\s+/g, ' ').trim();
    const phone = cleanPhoneValue(document.getElementById('loginPhone').value);
    if (!fullName || phone.length < 9) return alert('יש למלא שם מלא ומספר נייד');
    try {
      const response = await fetch('/api/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ fullName, phone }) });
      const data = await response.json();
      if (response.status === 404) {
        const parts = fullName.split(' ');
        document.getElementById('regFirst').value = parts.shift() || '';
        document.getElementById('regLast').value = parts.join(' ');
        document.getElementById('regPhone').value = phone;
        show('register');
        return;
      }
      if (response.status === 401) return alert('השם ומספר הטלפון לא תואמים לחשבון הרשום');
      if (!response.ok) throw new Error(data.error || 'LOGIN_FAILED');
      if (data.role === 'admin') {
        user = { name: fullName, phone, admin: true };
        document.getElementById('nav').classList.remove('show');
        show('admin');
        await window.renderAdmin();
        return;
      }
      user = { id: data.customer.id, name: data.customer.fullName, firstName: data.customer.firstName, lastName: data.customer.lastName, phone: data.customer.phone, dob: data.customer.birthDate };
      await loadAppointments();
      window.enterApp();
    } catch (error) {
      console.error(error);
      alert('לא הצלחתי להתחבר כרגע. נסי שוב בעוד רגע.');
    }
  };

  window.registerUser = async function () {
    const firstName = document.getElementById('regFirst').value.trim();
    const lastName = document.getElementById('regLast').value.trim();
    const phone = cleanPhoneValue(document.getElementById('regPhone').value);
    const birthDate = document.getElementById('regDob').value || null;
    if (!firstName || !lastName || phone.length < 9) return alert('יש למלא שם פרטי, שם משפחה ומספר נייד');
    try {
      const response = await fetch('/api/register', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ firstName, lastName, phone, birthDate }) });
      const data = await response.json();
      if (response.status === 409) {
        document.getElementById('loginName').value = `${firstName} ${lastName}`;
        document.getElementById('loginPhone').value = phone;
        show('login');
        return alert('המספר הזה כבר רשום. עברתי למסך ההתחברות.');
      }
      if (!response.ok) throw new Error(data.error || 'REGISTRATION_FAILED');
      user = { id: data.customer.id, name: data.customer.fullName, firstName: data.customer.firstName, lastName: data.customer.lastName, phone: data.customer.phone, dob: data.customer.birthDate };
      appointments = [];
      window.enterApp();
    } catch (error) {
      console.error(error);
      alert('לא הצלחתי להשלים את ההרשמה. נסי שוב.');
    }
  };

  window.enterApp = function () {
    document.getElementById('hello').textContent = 'איזה כיף שחזרת ' + (user.firstName || user.name.split(' ')[0]) + ' ♡';
    document.getElementById('nav').classList.add('show');
    window.renderNext();
    show('home');
  };

  window.confirmBook = async function () {
    if (!booking.time) return alert('בחרי שעה');
    if (!user || !user.id) return alert('יש להתחבר מחדש לפני קביעת תור');
    const extra = booking.extra || { n: '', p: 0, m: 0 };
    const payload = { customerId: user.id, serviceCode: booking.service.id, service: booking.service.n, price: booking.service.p + extra.p, date: booking.date, time: booking.time, minutes: booking.service.m + extra.m, extra: extra.n };
    document.getElementById('bookBody').innerHTML = '<div class="glass card"><p class="subtitle">שולחת את בקשת התור לעמית…</p></div>';
    try {
      const response = await fetch('/api/book', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      const data = await response.json();
      if (response.status === 409) {
        calendar();
        return alert('השעה נתפסה ממש עכשיו. בחרי שעה אחרת.');
      }
      if (!response.ok) throw new Error(data.error || 'BOOKING_FAILED');
      const a = mapAppointment(data.appointment);
      appointments.push(a);
      appointments.sort((x, y) => (x.date + x.time).localeCompare(y.date + y.time));
      document.getElementById('bookBody').innerHTML = `<div class="confirm"><div class="check">✓</div><h2>בקשת התור נשלחה</h2><p class="heart">ממתינה לאישור של עמית ♡</p><div class="summary glass card"><div><b>סטטוס</b><span>ממתין לאישור</span></div><div><b>שירות</b><span>${a.service}${a.extra ? ' + ' + a.extra : ''}</span></div><div><b>תאריך</b><span>${new Date(a.date + 'T12:00').toLocaleDateString('he-IL')}</span></div><div><b>שעה</b><span>${a.time}</span></div></div><button class="primary" onclick="orders()">סיום</button></div>`;
      window.renderNext();
    } catch (error) {
      console.error(error);
      document.getElementById('bookBody').innerHTML = '<div class="glass card"><p class="subtitle">לא הצלחתי לשלוח את בקשת התור. נסי שוב.</p></div>';
    }
  };

  window.orders = async function () {
    show('orders');
    try { await loadAppointments(); } catch (error) { console.error(error); }
    const mine = appointments.filter(x => x.status !== 'cancelled');
    document.getElementById('ordersBody').innerHTML = mine.length
      ? mine.map(a => `<div class="booking glass"><h3>${a.service}${a.extra ? ' + ' + a.extra : ''}</h3><p><b>${statusLabel(a.status)}</b><br>עם עמית<br>${new Date(a.date + 'T12:00').toLocaleDateString('he-IL')}<br>${a.time}</p><button class="cancel" onclick="askCancel('${a.id}')">ביטול תור</button></div>`).join('')
      : '<div class="card glass">עדיין אין לך תורים</div>';
  };

  window.renderNext = function () {
    const future = appointments.filter(x => x.status !== 'cancelled').sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time));
    const a = future[0];
    document.getElementById('nextAppointment').innerHTML = a
      ? `<div class="checkdot">${a.status === 'pending' ? '…' : '✓'}</div><div><small>${a.service}</small><br><b>${statusLabel(a.status)}</b><br><span>${a.time}</span></div><div><small>${new Date(a.date + 'T12:00').toLocaleDateString('he-IL', { weekday: 'short' })}</small><div class="date-big">${new Date(a.date + 'T12:00').getDate()}</div></div>`
      : '<div class="checkdot">✦</div><div><small>ההזמנה הקרובה</small><br><b>עדיין אין לך תור</b></div><span>›</span>';
  };

  window.confirmCancel = async function () {
    const a = appointments.find(x => String(x.id) === String(cancelId));
    if (!a) return closeCancel();
    try {
      const response = await fetch('/api/appointments/' + encodeURIComponent(a.id), { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ reason: 'בוטל על ידי הלקוחה דרך האפליקציה' }) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'CANCELLATION_FAILED');
      appointments = appointments.filter(x => String(x.id) !== String(a.id));
      closeCancel();
      await window.orders();
      window.renderNext();
      const msg = encodeURIComponent(`היי עמית, ביטלתי את התור שלי ל${a.service} בתאריך ${a.date} בשעה ${a.time}.`);
      window.open('https://wa.me/972527467143?text=' + msg, '_blank');
    } catch (error) {
      console.error(error);
      alert('לא הצלחתי לבטל את התור. נסי שוב.');
    }
  };

  window.renderAdmin = async function () {
    const target = document.getElementById('adminBody');
    if (!target) return;
    target.innerHTML = '<div class="card glass"><p class="subtitle">טוענת עדכונים…</p></div>';
    try {
      const response = await fetch('/api/admin/notifications');
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'NOTIFICATIONS_FAILED');
      const items = data.notifications || [];
      target.innerHTML = items.length ? items.map(n => `<div class="notice glass"><h3>${n.title}</h3><p>${n.body}</p><small class="subtitle">${new Date(n.created_at).toLocaleString('he-IL')}</small></div>`).join('') : '<div class="card glass">אין עדכונים חדשים</div>';
    } catch (error) {
      console.error(error);
      target.innerHTML = '<div class="card glass">לא הצלחתי לטעון את העדכונים</div>';
    }
  };
})();
