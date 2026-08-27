import fs from 'fs';
const previousReadFileSync = fs.readFileSync.bind(fs);
fs.readFileSync = function amitSettingsRuntimeRead(path, ...args) {
  const result = previousReadFileSync(path, ...args);
  if (!String(path || '').endsWith('server-v2.js')) return result;
  const isBuffer = Buffer.isBuffer(result);
  let source = isBuffer ? result.toString('utf8') : String(result);
  if (source.includes('AMIT_SETTINGS_RUNTIME_V3')) return result;

  source = source.replace("import fs from 'fs';", "import fs from 'fs';\nimport { AsyncLocalStorage } from 'node:async_hooks';");
  source = source.replace("const BUFFER_MINUTES = 30;", "const AMIT_BUFFER_CONTEXT = new AsyncLocalStorage();\nconst BUFFER_MINUTES = { [Symbol.toPrimitive]() { const store = AMIT_BUFFER_CONTEXT.getStore(); const value = Number(store?.gap_minutes); return Number.isFinite(value) ? value : 30; } };");

  const runtime = String.raw`
/* AMIT_SETTINGS_RUNTIME_V3 */
const AMIT_DEFAULT_SETTINGS = {
  gap_minutes: 30,
  min_advance_hours: 3,
  booking_window_days: 90,
  auto_approve: false,
  confirmation_message: 'היי {שם} 💚 התור שלך ב-AMIT TOUCH אושר ל-{תאריך} בשעה {שעה}. מחכה לך!',
  cancellation_message: 'היי {שם}, התור שלך ב-AMIT TOUCH ל-{תאריך} בשעה {שעה} בוטל. אם תרצי לקבוע מועד חדש, אפשר לעשות את זה ישירות באפליקציה 💚',
  after_treatment_message: 'היי {שם} 💚 תודה שהגעת ל-AMIT TOUCH. היה לי כיף לארח אותך, ואשמח לראות אותך שוב בטיפול הבא!',
  birthday_message: 'יום הולדת שמח {שם} 🎂💚 מאחלת לך יום מלא בדברים יפים, אהבה ופינוקים. מחכה לך ב-AMIT TOUCH!',
  auto_receipt: true,
  notify_requests: true,
  notify_cancellations: true,
  notify_messages: true,
  notify_next_appointment: true,
  admin_pin: '2303'
};
async function amitGetSettings(supabase) {
  try {
    const result = await supabase.from('app_settings').select('*').eq('id', 1).maybeSingle();
    if (result.error) throw result.error;
    return Object.assign({}, AMIT_DEFAULT_SETTINGS, result.data || {});
  } catch (error) {
    console.error('Settings load failed', error);
    return Object.assign({}, AMIT_DEFAULT_SETTINGS);
  }
}
function amitTemplate(template, customer, appointment) {
  const start = appointment && appointment.starts_at ? DateTime.fromISO(appointment.starts_at, { setZone: true }).setZone(TZ) : null;
  const name = customer && (customer.first_name || customer.firstName) ? (customer.first_name || customer.firstName) : 'לקוחה';
  const service = appointment && (appointment.service_name || appointment.service) ? (appointment.service_name || appointment.service) : 'הטיפול';
  return String(template || '').replaceAll('{שם}', name).replaceAll('{תאריך}', start && start.isValid ? start.toFormat('dd.MM.yy') : '').replaceAll('{שעה}', start && start.isValid ? start.toFormat('HH:mm') : '').replaceAll('{טיפול}', service);
}
async function amitSendMessage(supabase, customerId, appointmentId, title, body) {
  const result = await supabase.from('customer_notifications').insert({ customer_id: customerId, appointment_id: appointmentId || null, type: 'admin_message', title, body }).select().single();
  if (result.error) throw result.error;
  return result.data;
}

app.get('/api/admin/settings', async (_req, res) => {
  try { const settings = await amitGetSettings(supabaseClient()); const safe = Object.assign({}, settings); delete safe.admin_pin; res.set('Cache-Control', 'no-store'); res.json({ settings: safe }); }
  catch (error) { console.error(error); res.status(500).json({ error: 'SETTINGS_FAILED' }); }
});
app.patch('/api/admin/settings', async (req, res) => {
  try {
    const allowed = new Set(['gap_minutes','min_advance_hours','booking_window_days','auto_approve','confirmation_message','cancellation_message','after_treatment_message','birthday_message','auto_receipt','notify_requests','notify_cancellations','notify_messages','notify_next_appointment']);
    const payload = {};
    for (const entry of Object.entries(req.body || {})) if (allowed.has(entry[0])) payload[entry[0]] = entry[1];
    if ('gap_minutes' in payload) payload.gap_minutes = Math.max(0, Math.min(180, Number(payload.gap_minutes) || 0));
    if ('min_advance_hours' in payload) payload.min_advance_hours = Math.max(0, Math.min(720, Number(payload.min_advance_hours) || 0));
    if ('booking_window_days' in payload) payload.booking_window_days = Math.max(1, Math.min(730, Number(payload.booking_window_days) || 1));
    payload.updated_at = new Date().toISOString();
    const supabase = supabaseClient();
    const updated = await supabase.from('app_settings').update(payload).eq('id', 1).select().single();
    if (updated.error) throw updated.error;
    const safe = Object.assign({}, updated.data); delete safe.admin_pin;
    res.json({ ok: true, settings: safe });
  } catch (error) { console.error(error); res.status(500).json({ error: 'SETTINGS_UPDATE_FAILED' }); }
});
app.post('/api/admin/settings/pin', async (req, res) => {
  try {
    const oldPin = String(req.body && req.body.oldPin || '').trim();
    const newPin = String(req.body && req.body.newPin || '').trim();
    if (!/^\d{4,6}$/.test(newPin)) return res.status(400).json({ error: 'INVALID_NEW_PIN' });
    const supabase = supabaseClient(); const settings = await amitGetSettings(supabase);
    if (oldPin !== String(settings.admin_pin || '2303')) return res.status(401).json({ error: 'INVALID_OLD_PIN' });
    const updated = await supabase.from('app_settings').update({ admin_pin: newPin, updated_at: new Date().toISOString() }).eq('id', 1);
    if (updated.error) throw updated.error;
    res.json({ ok: true });
  } catch (error) { console.error(error); res.status(500).json({ error: 'PIN_UPDATE_FAILED' }); }
});
app.get('/api/admin/customer-preview', async (_req, res) => {
  try {
    const supabase = supabaseClient(); const phone = normalizePhone(ADMIN_PHONE);
    let found = await supabase.from('customers').select('*').eq('phone', phone).maybeSingle();
    if (found.error) throw found.error;
    let customer = found.data;
    if (!customer) {
      const parts = ADMIN_NAME.split(' ');
      const created = await supabase.from('customers').insert({ first_name: parts[0] || 'עמית', last_name: parts.slice(1).join(' '), phone }).select().single();
      if (created.error) throw created.error; customer = created.data;
    }
    res.json({ ok: true, customer: { id: customer.id, firstName: customer.first_name, lastName: customer.last_name, fullName: String(customer.first_name || '') + ' ' + String(customer.last_name || ''), phone: customer.phone, birthDate: customer.birth_date } });
  } catch (error) { console.error(error); res.status(500).json({ error: 'PREVIEW_CUSTOMER_FAILED' }); }
});
app.post('/api/admin/appointments/:appointmentId/complete', async (req, res) => {
  try {
    const supabase = supabaseClient(); const found = await supabase.from('appointments').select('*').eq('id', req.params.appointmentId).single();
    if (found.error || !found.data) return res.status(404).json({ error: 'APPOINTMENT_NOT_FOUND' });
    const appointment = found.data; const customer = await getCustomer(supabase, appointment.customer_id); const settings = await amitGetSettings(supabase);
    await supabase.from('appointments').update({ status: 'completed' }).eq('id', appointment.id);
    if (customer) await amitSendMessage(supabase, customer.id, appointment.id, 'תודה שביקרת 💚', amitTemplate(settings.after_treatment_message, customer, appointment));
    res.json({ ok: true });
  } catch (error) { console.error(error); res.status(500).json({ error: 'APPOINTMENT_COMPLETE_FAILED' }); }
});
app.post('/api/admin/receipts/deliver', async (req, res) => {
  try {
    const customerId = String(req.body && req.body.customerId || '').trim();
    if (!customerId) return res.status(400).json({ error: 'CUSTOMER_REQUIRED' });
    const supabase = supabaseClient(); const settings = await amitGetSettings(supabase);
    if (!settings.auto_receipt && !(req.body && req.body.force)) return res.json({ ok: true, sent: false, requiresManualSend: true });
    const appointmentId = req.body && req.body.appointmentId ? String(req.body.appointmentId) : null;
    const receiptUrl = String(req.body && req.body.receiptUrl || '').trim();
    const body = receiptUrl ? 'הקבלה שלך מ־AMIT TOUCH מוכנה 💚\n' + receiptUrl : 'הקבלה שלך מ־AMIT TOUCH מוכנה ונשלחה אלייך באפליקציה 💚';
    const message = await amitSendMessage(supabase, customerId, appointmentId, 'הקבלה שלך', body);
    res.json({ ok: true, sent: true, message });
  } catch (error) { console.error(error); res.status(500).json({ error: 'RECEIPT_DELIVERY_FAILED' }); }
});

app.use('/api/login', async (req, res, next) => {
  try {
    const fullName = String(req.body && req.body.fullName || '').replace(/\s+/g, ' ').trim();
    const phone = normalizePhone(req.body && req.body.phone || '');
    if (fullName !== ADMIN_NAME || phone !== ADMIN_PHONE) return next();
    const adminCode = String(req.body && req.body.adminCode || '').trim();
    if (!adminCode) return res.status(403).json({ error: 'ADMIN_CODE_REQUIRED', requiresAdminCode: true });
    const settings = await amitGetSettings(supabaseClient());
    if (adminCode !== String(settings.admin_pin || ADMIN_CODE)) return res.status(401).json({ error: 'INVALID_ADMIN_CODE', requiresAdminCode: true });
    return res.json({ ok: true, role: 'admin', customer: null });
  } catch (error) { console.error(error); next(); }
});

app.use('/api/availability', async (req, res, next) => {
  try {
    const settings = await amitGetSettings(supabaseClient());
    const date = String(req.query && req.query.date || '');
    if (/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      const day = DateTime.fromISO(date + 'T00:00', { zone: TZ });
      const now = DateTime.now().setZone(TZ);
      const maxDay = now.startOf('day').plus({ days: Number(settings.booking_window_days || 90) });
      if (day > maxDay) return res.json({ date, slots: [], bookingWindowExceeded: true, bufferMinutes: Number(settings.gap_minutes || 0) });
    }
    AMIT_BUFFER_CONTEXT.run(settings, () => next());
  } catch (error) { console.error(error); next(); }
});

app.use('/api/book', async (req, res, next) => {
  try {
    const supabase = supabaseClient(); const settings = await amitGetSettings(supabase);
    const originallyAdmin = Boolean(req.body && req.body.createdByAdmin);
    if (!originallyAdmin) {
      const date = String(req.body && req.body.date || ''); const time = String(req.body && req.body.time || '');
      const start = DateTime.fromISO(date + 'T' + time, { zone: TZ }); const now = DateTime.now().setZone(TZ);
      if (start.isValid) {
        if (start < now.plus({ hours: Number(settings.min_advance_hours || 0) })) return res.status(409).json({ error: 'MIN_ADVANCE_TIME' });
        if (start >= now.startOf('day').plus({ days: Number(settings.booking_window_days || 90) + 1 })) return res.status(409).json({ error: 'BOOKING_WINDOW_EXCEEDED' });
      }
      if (settings.auto_approve) req.body.createdByAdmin = true;
    }
    const originalJson = res.json.bind(res);
    res.json = function(payload) {
      if (!originallyAdmin && settings.auto_approve && payload && payload.appointment) {
        payload.appointment.status = 'confirmed';
        const appointment = payload.appointment;
        setImmediate(async () => {
          try {
            await supabase.from('appointments').update({ status: 'confirmed' }).eq('id', appointment.id);
            const customer = await getCustomer(supabase, appointment.customer_id);
            await supabase.from('admin_notifications').insert({ type: 'appointment_updated', title: 'תור חדש אושר אוטומטית', body: customer ? String(customer.first_name || '') + ' קבעה תור' : 'נקבע תור חדש', customer_id: appointment.customer_id, appointment_id: appointment.id, metadata: { starts_at: appointment.starts_at, status: 'confirmed', popup_enabled: Boolean(settings.notify_requests) } });
            if (customer) await amitSendMessage(supabase, customer.id, appointment.id, 'התור אושר', amitTemplate(settings.confirmation_message, customer, appointment));
          } catch (error) { console.error('Auto approval follow-up failed', error); }
        });
      }
      return originalJson(payload);
    };
    AMIT_BUFFER_CONTEXT.run(settings, () => next());
  } catch (error) { console.error(error); next(); }
});

app.use('/api/admin/appointments/:appointmentId/approve', async (req, res, next) => {
  try {
    const supabase = supabaseClient(); const settings = await amitGetSettings(supabase); const originalJson = res.json.bind(res);
    res.json = function(payload) {
      if (payload && payload.appointment) setImmediate(async () => { try { const customer = await getCustomer(supabase, payload.appointment.customer_id); if (customer) await amitSendMessage(supabase, customer.id, payload.appointment.id, 'התור אושר', amitTemplate(settings.confirmation_message, customer, payload.appointment)); } catch (error) { console.error('Approval template message failed', error); } });
      return originalJson(payload);
    };
    next();
  } catch (error) { console.error(error); next(); }
});

app.use('/api/appointments/:appointmentId', async (req, res, next) => {
  if (req.method !== 'DELETE') return next();
  try {
    const supabase = supabaseClient(); const settings = await amitGetSettings(supabase); const found = await supabase.from('appointments').select('*').eq('id', req.params.appointmentId).maybeSingle(); const before = found.data; const originalJson = res.json.bind(res);
    res.json = function(payload) {
      if (payload && payload.ok && before) setImmediate(async () => { try { const customer = await getCustomer(supabase, before.customer_id); if (customer) await amitSendMessage(supabase, customer.id, before.id, 'התור בוטל', amitTemplate(settings.cancellation_message, customer, before)); await supabase.from('admin_notifications').insert({ type: 'appointment_cancelled', title: 'תור בוטל', body: customer ? String(customer.first_name || '') + ' ביטלה תור' : 'תור בוטל', customer_id: before.customer_id, appointment_id: before.id, metadata: { popup_enabled: Boolean(settings.notify_cancellations) } }); } catch (error) { console.error('Cancellation template message failed', error); } });
      return originalJson(payload);
    };
    next();
  } catch (error) { console.error(error); next(); }
});
`;

  source = source.replace("app.get('/', (_req, res) => {", runtime + "\napp.get('/', (_req, res) => {");
  return isBuffer ? Buffer.from(source, 'utf8') : source;
};
