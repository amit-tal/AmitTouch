import fs from 'fs';
const previousReadFileSync = fs.readFileSync.bind(fs);
fs.readFileSync = function amitSettingsRuntimeRead(path, ...args) {
  const result = previousReadFileSync(path, ...args);
  if (!String(path || '').endsWith('server.js')) return result;
  const isBuffer = Buffer.isBuffer(result);
  let code = isBuffer ? result.toString('utf8') : String(result);
  const marker = "fs.writeFileSync(runtimePath, source, 'utf8');";
  if (!code.includes(marker) || code.includes('AMIT_SETTINGS_RUNTIME_PATCH_V1')) return result;

  const patch = String.raw`
// AMIT_SETTINGS_RUNTIME_PATCH_V1
const settingsRuntime = String.raw\`
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
    const { data, error } = await supabase.from('app_settings').select('*').eq('id', 1).maybeSingle();
    if (error) throw error;
    return { ...AMIT_DEFAULT_SETTINGS, ...(data || {}) };
  } catch (error) {
    console.error('Settings load failed', error);
    return { ...AMIT_DEFAULT_SETTINGS };
  }
}
function amitMessage(template, customer, appointment) {
  const start = appointment?.starts_at ? DateTime.fromISO(appointment.starts_at, { setZone: true }).setZone(TZ) : null;
  const name = customer?.first_name || customer?.firstName || 'לקוחה';
  return String(template || '').replaceAll('{שם}', name).replaceAll('{תאריך}', start?.isValid ? start.toFormat('dd.MM.yy') : '').replaceAll('{שעה}', start?.isValid ? start.toFormat('HH:mm') : '');
}
app.get('/api/admin/settings', async (_req, res) => {
  try { const supabase = supabaseClient(); const settings = await amitGetSettings(supabase); const { admin_pin, ...safe } = settings; res.set('Cache-Control', 'no-store'); res.json({ settings: safe }); }
  catch (error) { console.error(error); res.status(500).json({ error: 'SETTINGS_FAILED' }); }
});
app.patch('/api/admin/settings', async (req, res) => {
  try {
    const allowed = ['gap_minutes','min_advance_hours','booking_window_days','auto_approve','confirmation_message','cancellation_message','after_treatment_message','birthday_message','auto_receipt','notify_requests','notify_cancellations','notify_messages','notify_next_appointment'];
    const payload = {}; for (const key of allowed) if (Object.prototype.hasOwnProperty.call(req.body || {}, key)) payload[key] = req.body[key];
    if ('gap_minutes' in payload) payload.gap_minutes = Math.max(0, Math.min(180, Number(payload.gap_minutes) || 0));
    if ('min_advance_hours' in payload) payload.min_advance_hours = Math.max(0, Math.min(720, Number(payload.min_advance_hours) || 0));
    if ('booking_window_days' in payload) payload.booking_window_days = Math.max(1, Math.min(730, Number(payload.booking_window_days) || 1));
    payload.updated_at = new Date().toISOString();
    const supabase = supabaseClient(); const { data, error } = await supabase.from('app_settings').update(payload).eq('id', 1).select().single(); if (error) throw error;
    const { admin_pin, ...safe } = data; res.json({ ok: true, settings: safe });
  } catch (error) { console.error(error); res.status(500).json({ error: 'SETTINGS_UPDATE_FAILED' }); }
});
app.post('/api/admin/settings/pin', async (req, res) => {
  try {
    const oldPin = String(req.body?.oldPin || '').trim(); const newPin = String(req.body?.newPin || '').trim();
    if (!/^\\d{4,6}$/.test(newPin)) return res.status(400).json({ error: 'INVALID_NEW_PIN' });
    const supabase = supabaseClient(); const settings = await amitGetSettings(supabase);
    if (oldPin !== String(settings.admin_pin || '2303')) return res.status(401).json({ error: 'INVALID_OLD_PIN' });
    const { error } = await supabase.from('app_settings').update({ admin_pin: newPin, updated_at: new Date().toISOString() }).eq('id', 1); if (error) throw error; res.json({ ok: true });
  } catch (error) { console.error(error); res.status(500).json({ error: 'PIN_UPDATE_FAILED' }); }
});
app.get('/api/admin/customer-preview', async (_req, res) => {
  try {
    const supabase = supabaseClient(); const phone = normalizePhone(ADMIN_PHONE);
    let { data: customer, error } = await supabase.from('customers').select('*').eq('phone', phone).maybeSingle(); if (error) throw error;
    if (!customer) { const parts = ADMIN_NAME.split(' '); const created = await supabase.from('customers').insert({ first_name: parts[0] || 'עמית', last_name: parts.slice(1).join(' '), phone }).select().single(); if (created.error) throw created.error; customer = created.data; }
    res.json({ ok: true, customer: customerPayload(customer) });
  } catch (error) { console.error(error); res.status(500).json({ error: 'PREVIEW_CUSTOMER_FAILED' }); }
});
\`;
source = source.replace("app.get('/', (_req, res) => {", settingsRuntime + "\\napp.get('/', (_req, res) => {");
source = source.replace("if (fullName === ADMIN_NAME && phone === ADMIN_PHONE) { if (!adminCode) return res.status(403).json({ error: 'ADMIN_CODE_REQUIRED', requiresAdminCode: true }); if (adminCode !== ADMIN_CODE) return res.status(401).json({ error: 'INVALID_ADMIN_CODE', requiresAdminCode: true }); return res.json({ ok: true, role: 'admin', customer: null }); }", "if (fullName === ADMIN_NAME && phone === ADMIN_PHONE) { if (!adminCode) return res.status(403).json({ error: 'ADMIN_CODE_REQUIRED', requiresAdminCode: true }); const adminSettings = await amitGetSettings(supabaseClient()); if (adminCode !== String(adminSettings.admin_pin || ADMIN_CODE)) return res.status(401).json({ error: 'INVALID_ADMIN_CODE', requiresAdminCode: true }); return res.json({ ok: true, role: 'admin', customer: null }); }");
source = source.replace("    const duration = Number(minutes) + BUFFER_MINUTES;", "    const supabase = supabaseClient(); const amitSettings = await amitGetSettings(supabase); const duration = Number(minutes) + Number(amitSettings.gap_minutes || 0);");
source = source.replace("    const dayStart = DateTime.fromISO(\`\${date}T00:00\`, { zone: TZ });", "    const dayStart = DateTime.fromISO(\`\${date}T00:00\`, { zone: TZ }); const nowJerusalem = DateTime.now().setZone(TZ); const maxBookingDay = nowJerusalem.startOf('day').plus({ days: Number(amitSettings.booking_window_days || 90) }); if (dayStart > maxBookingDay) return res.json({ date, slots: [], bookingWindowExceeded: true });");
source = source.replace("      const conflict = busy.some(item => conflictsWithBusy(t, end, item));", "      const tooSoon = t < nowJerusalem.plus({ hours: Number(amitSettings.min_advance_hours || 0) }); const conflict = tooSoon || busy.some(item => conflictsWithBusy(t, end, item));");
source = source.replace("bufferMinutes: BUFFER_MINUTES, calendarEventBufferMinutes", "bufferMinutes: Number(amitSettings.gap_minutes || 0), calendarEventBufferMinutes");
source = source.replace("    const isAdminCreated = Boolean(booking.createdByAdmin); const status = isAdminCreated ? 'confirmed' : 'pending';", "    const isAdminCreated = Boolean(booking.createdByAdmin); const amitSettings = await amitGetSettings(supabase); const status = (isAdminCreated || amitSettings.auto_approve) ? 'confirmed' : 'pending';");
source = source.replace("    const blockedEnd = start.plus({ minutes: Number(booking.minutes) + BUFFER_MINUTES });", "    if (!isAdminCreated) { const minStart = DateTime.now().setZone(TZ).plus({ hours: Number(amitSettings.min_advance_hours || 0) }); const maxStart = DateTime.now().setZone(TZ).startOf('day').plus({ days: Number(amitSettings.booking_window_days || 90) + 1 }); if (start < minStart) return res.status(409).json({ error: 'MIN_ADVANCE_TIME' }); if (start >= maxStart) return res.status(409).json({ error: 'BOOKING_WINDOW_EXCEEDED' }); } const blockedEnd = start.plus({ minutes: Number(booking.minutes) + Number(amitSettings.gap_minutes || 0) });");
source = source.replace("buffer_minutes: BUFFER_MINUTES, starts_at", "buffer_minutes: Number(amitSettings.gap_minutes || 0), starts_at");
source = source.replace("    if (!isAdminCreated) supabase.from('admin_notifications').insert({ type: 'appointment_updated', title: 'תור ממתין לאישור', body: \`\${customer.first_name} \${customer.last_name} ביקשה \${booking.service}\`, customer_id: customer.id, appointment_id: appointment.id, metadata: { starts_at: appointment.starts_at, status: 'pending' } }).then(({ error }) => { if (error) console.error('Admin notification failed', error); }).catch(error => console.error('Admin notification failed', error));", "    if (!isAdminCreated) { const notificationTitle = status === 'confirmed' ? 'תור חדש אושר אוטומטית' : 'תור ממתין לאישור'; supabase.from('admin_notifications').insert({ type: 'appointment_updated', title: notificationTitle, body: \`\${customer.first_name} \${customer.last_name} ביקשה \${booking.service}\`, customer_id: customer.id, appointment_id: appointment.id, metadata: { starts_at: appointment.starts_at, status, popup_enabled: !!amitSettings.notify_requests } }).then(({ error }) => { if (error) console.error('Admin notification failed', error); }).catch(error => console.error('Admin notification failed', error)); if (status === 'confirmed') supabase.from('customer_notifications').insert({ customer_id: customer.id, appointment_id: appointment.id, type: 'appointment_approved', title: 'התור אושר', body: amitMessage(amitSettings.confirmation_message, customer, appointment) }).then(({ error }) => { if (error) console.error('Auto approval customer message failed', error); }); }");
source = source.replaceAll("Buffer: \${BUFFER_MINUTES} דקות", "Buffer: \${Number(amitSettings.gap_minutes || 0)} דקות");
`;
  code = code.replace(marker, patch + '\n' + marker);
  return isBuffer ? Buffer.from(code, 'utf8') : code;
};
