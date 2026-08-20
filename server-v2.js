import express from 'express';
import { google } from 'googleapis';
import { DateTime } from 'luxon';
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

const app = express();
app.use(express.json());

const TZ = 'Asia/Jerusalem';
const CALENDAR_ID = process.env.GOOGLE_CALENDAR_ID || 'primary';
const BUFFER_MINUTES = 30;
const ADMIN_NAME = 'עמית טל';
const ADMIN_PHONE = '0527467143';
const ADMIN_CODE = '2303';

function normalizePhone(value = '') {
  let phone = String(value).replace(/\D/g, '');
  if (phone.startsWith('972') && phone.length >= 11) phone = '0' + phone.slice(3);
  return phone;
}

function supabaseClient() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SECRET_KEY;
  if (!url || !key) throw new Error('Supabase environment variables are not configured');
  return createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
}

function calendarClient() {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const key = (process.env.GOOGLE_PRIVATE_KEY || '').replace(/\\n/g, '\n');
  if (!email || !key) throw new Error('Google Calendar credentials are not configured');
  const auth = new google.auth.JWT({ email, key, scopes: ['https://www.googleapis.com/auth/calendar'] });
  return google.calendar({ version: 'v3', auth });
}

async function getAccessibleCalendarIds(calendar) {
  const ids = new Set();
  let pageToken;
  do {
    const result = await calendar.calendarList.list({ maxResults: 250, pageToken });
    for (const item of result.data.items || []) if (item.id) ids.add(item.id);
    pageToken = result.data.nextPageToken || undefined;
  } while (pageToken);
  ids.add(CALENDAR_ID);
  return [...ids];
}

async function getBusyPeriods(calendar, timeMin, timeMax) {
  const calendarIds = await getAccessibleCalendarIds(calendar);
  const result = await calendar.freebusy.query({ requestBody: { timeMin, timeMax, timeZone: TZ, items: calendarIds.map(id => ({ id })) } });
  const busy = [];
  for (const id of calendarIds) {
    const entry = result.data.calendars?.[id];
    if (entry?.busy?.length) busy.push(...entry.busy);
  }
  return { calendarIds, busy };
}

async function getCustomer(supabase, id) {
  const { data, error } = await supabase.from('customers').select('*').eq('id', id).single();
  if (error || !data) return null;
  return data;
}

app.get('/', (_req, res) => {
  try {
    let html = fs.readFileSync('./index.html', 'utf8');
    const pwaHead = `\n<link rel="manifest" href="/manifest.webmanifest">\n<meta name="theme-color" content="#286d67">\n<meta name="mobile-web-app-capable" content="yes">\n<meta name="apple-mobile-web-app-capable" content="yes">\n<meta name="apple-mobile-web-app-status-bar-style" content="default">\n<meta name="apple-mobile-web-app-title" content="AMIT TOUCH">\n<link rel="apple-touch-icon" href="/assets/amit-touch-logo.svg">`;
    const pwaScript = `<script src="/app-db.js"></script><script src="/admin-ui.js"></script><script>if ('serviceWorker' in navigator) window.addEventListener('load', () => navigator.serviceWorker.register('/sw.js').catch(console.error));</script>`;
    html = html.replace('</head>', pwaHead + '</head>');
    html = html.replace('</body>', pwaScript + '</body>');
    res.type('html').send(html);
  } catch (error) {
    console.error(error);
    res.status(500).send('Unable to load app');
  }
});

app.use(express.static('.'));

app.get('/api/health', async (_req, res) => {
  try {
    const supabase = supabaseClient();
    const { error } = await supabase.from('customers').select('id').limit(1);
    if (error) throw error;
    const calendar = calendarClient();
    const calendarIds = await getAccessibleCalendarIds(calendar);
    res.json({ ok: true, database: true, calendarConfigured: true, approvalFlow: true, calendarsVisible: calendarIds.length });
  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, database: false });
  }
});

app.post('/api/register', async (req, res) => {
  try {
    const firstName = String(req.body.firstName || '').trim();
    const lastName = String(req.body.lastName || '').trim();
    const phone = normalizePhone(req.body.phone);
    const birthDate = req.body.birthDate || null;
    if (!firstName || !lastName || phone.length < 9) return res.status(400).json({ error: 'INVALID_REGISTRATION' });
    const supabase = supabaseClient();
    const { data: existing, error: findError } = await supabase.from('customers').select('*').eq('phone', phone).maybeSingle();
    if (findError) throw findError;
    if (existing) return res.status(409).json({ error: 'PHONE_ALREADY_REGISTERED' });
    const { data: customer, error } = await supabase.from('customers').insert({ first_name: firstName, last_name: lastName, phone, birth_date: birthDate }).select().single();
    if (error) throw error;
    res.status(201).json({ ok: true, customer: { id: customer.id, firstName: customer.first_name, lastName: customer.last_name, fullName: `${customer.first_name} ${customer.last_name}`, phone: customer.phone, birthDate: customer.birth_date } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'REGISTRATION_FAILED' });
  }
});

app.post('/api/login', async (req, res) => {
  try {
    const fullName = String(req.body.fullName || '').replace(/\s+/g, ' ').trim();
    const phone = normalizePhone(req.body.phone);
    const adminCode = String(req.body.adminCode || '').trim();
    if (!fullName || phone.length < 9) return res.status(400).json({ error: 'INVALID_LOGIN' });
    if (fullName === ADMIN_NAME && phone === ADMIN_PHONE) {
      if (!adminCode) return res.status(403).json({ error: 'ADMIN_CODE_REQUIRED', requiresAdminCode: true });
      if (adminCode !== ADMIN_CODE) return res.status(401).json({ error: 'INVALID_ADMIN_CODE', requiresAdminCode: true });
      return res.json({ ok: true, role: 'admin', customer: null });
    }
    const supabase = supabaseClient();
    const { data: customer, error } = await supabase.from('customers').select('*').eq('phone', phone).maybeSingle();
    if (error) throw error;
    if (!customer) return res.status(404).json({ error: 'CUSTOMER_NOT_FOUND' });
    const storedName = `${customer.first_name} ${customer.last_name}`.replace(/\s+/g, ' ').trim();
    if (storedName !== fullName) return res.status(401).json({ error: 'DETAILS_DO_NOT_MATCH' });
    res.json({ ok: true, role: 'customer', customer: { id: customer.id, firstName: customer.first_name, lastName: customer.last_name, fullName: storedName, phone: customer.phone, birthDate: customer.birth_date } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'LOGIN_FAILED' });
  }
});

app.get('/api/customers/:customerId/appointments', async (req, res) => {
  try {
    const supabase = supabaseClient();
    const { data, error } = await supabase.from('appointments').select('*').eq('customer_id', req.params.customerId).order('starts_at', { ascending: true });
    if (error) throw error;
    res.json({ appointments: data || [] });
  } catch (error) { console.error(error); res.status(500).json({ error: 'APPOINTMENTS_FAILED' }); }
});

app.get('/api/admin/notifications', async (_req, res) => {
  try {
    const supabase = supabaseClient();
    const { data, error } = await supabase.from('admin_notifications').select('*').order('created_at', { ascending: false }).limit(100);
    if (error) throw error;
    res.json({ notifications: data || [] });
  } catch (error) { console.error(error); res.status(500).json({ error: 'NOTIFICATIONS_FAILED' }); }
});

app.get('/api/announcements', async (_req, res) => {
  try {
    const supabase = supabaseClient();
    const { data, error } = await supabase.from('admin_notifications').select('*').eq('type', 'broadcast').order('created_at', { ascending: false }).limit(20);
    if (error) throw error;
    res.json({ announcements: data || [] });
  } catch (error) { console.error(error); res.status(500).json({ error: 'ANNOUNCEMENTS_FAILED' }); }
});

app.post('/api/admin/announcements', async (req, res) => {
  try {
    const title = String(req.body.title || '').trim();
    const body = String(req.body.body || '').trim();
    if (!title || !body) return res.status(400).json({ error: 'TITLE_AND_BODY_REQUIRED' });
    const supabase = supabaseClient();
    const { data, error } = await supabase.from('admin_notifications').insert({ type: 'broadcast', title, body, metadata: { audience: 'all_customers' } }).select().single();
    if (error) throw error;
    res.status(201).json({ ok: true, announcement: data });
  } catch (error) { console.error(error); res.status(500).json({ error: 'ANNOUNCEMENT_CREATE_FAILED' }); }
});

app.delete('/api/admin/announcements/:announcementId', async (req, res) => {
  try {
    const supabase = supabaseClient();
    const { error } = await supabase.from('admin_notifications').delete().eq('id', req.params.announcementId).eq('type', 'broadcast');
    if (error) throw error;
    res.json({ ok: true });
  } catch (error) { console.error(error); res.status(500).json({ error: 'ANNOUNCEMENT_DELETE_FAILED' }); }
});

app.get('/api/admin/appointments', async (_req, res) => {
  try {
    const supabase = supabaseClient();
    const { data: rows, error } = await supabase.from('appointments').select('*').order('starts_at', { ascending: true });
    if (error) throw error;
    const customerIds = [...new Set((rows || []).map(x => x.customer_id))];
    const { data: customers, error: customerError } = customerIds.length ? await supabase.from('customers').select('id,first_name,last_name,phone').in('id', customerIds) : { data: [], error: null };
    if (customerError) throw customerError;
    const byId = Object.fromEntries((customers || []).map(c => [c.id, c]));
    res.json({ appointments: (rows || []).map(a => ({ ...a, customer: byId[a.customer_id] || null })) });
  } catch (error) { console.error(error); res.status(500).json({ error: 'ADMIN_APPOINTMENTS_FAILED' }); }
});

app.get('/api/availability', async (req, res) => {
  try {
    const { date, minutes = 60 } = req.query;
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date || '')) return res.status(400).json({ error: 'INVALID_DATE' });
    const duration = Number(minutes) + BUFFER_MINUTES;
    const dayStart = DateTime.fromISO(`${date}T00:00`, { zone: TZ });
    const dayEnd = dayStart.plus({ days: 1 });
    const calendar = calendarClient();
    const { calendarIds, busy } = await getBusyPeriods(calendar, dayStart.toUTC().toISO(), dayEnd.toUTC().toISO());
    const slots = [];
    for (let t = dayStart.set({ hour: 9, minute: 0 }); t.plus({ minutes: duration }) <= dayStart.set({ hour: 19, minute: 0 }); t = t.plus({ minutes: 30 })) {
      const end = t.plus({ minutes: duration });
      const conflict = busy.some(item => t.toMillis() < DateTime.fromISO(item.end).toMillis() && end.toMillis() > DateTime.fromISO(item.start).toMillis());
      if (!conflict) slots.push(t.toFormat('HH:mm'));
    }
    res.json({ date, slots, calendarsChecked: calendarIds.length });
  } catch (error) { console.error(error); res.status(500).json({ error: 'CALENDAR_AVAILABILITY_FAILED' }); }
});

app.post('/api/book', async (req, res) => {
  let createdEventId = null;
  try {
    const booking = req.body;
    if (!booking.customerId || !booking.service || !booking.date || !booking.time || !Number.isFinite(Number(booking.minutes))) return res.status(400).json({ error: 'INVALID_BOOKING' });
    const supabase = supabaseClient();
    const customer = await getCustomer(supabase, booking.customerId);
    if (!customer) return res.status(404).json({ error: 'CUSTOMER_NOT_FOUND' });
    const isAdminCreated = Boolean(booking.createdByAdmin);
    const status = isAdminCreated ? 'confirmed' : 'pending';
    const start = DateTime.fromISO(`${booking.date}T${booking.time}`, { zone: TZ });
    const blockedEnd = start.plus({ minutes: Number(booking.minutes) + BUFFER_MINUTES });
    const calendar = calendarClient();
    const { busy } = await getBusyPeriods(calendar, start.toUTC().toISO(), blockedEnd.toUTC().toISO());
    if (busy.length) return res.status(409).json({ error: 'SLOT_TAKEN' });
    const eventTitle = isAdminCreated ? `AMIT TOUCH · ${customer.first_name} ${customer.last_name} · ${booking.service}` : `ממתין לאישור · AMIT TOUCH · ${customer.first_name} ${customer.last_name} · ${booking.service}`;
    const event = await calendar.events.insert({ calendarId: CALENDAR_ID, requestBody: { summary: eventTitle, description: `סטטוס: ${status}\nלקוחה: ${customer.first_name} ${customer.last_name}\nנייד: ${customer.phone}\nטיפול: ${booking.service}\nתוספות: ${booking.extra || 'ללא'}\nמחיר: ₪${booking.price}\nזמן טיפול: ${booking.minutes} דקות\nBuffer: ${BUFFER_MINUTES} דקות`, start: { dateTime: start.toISO(), timeZone: TZ }, end: { dateTime: blockedEnd.toISO(), timeZone: TZ }, transparency: 'opaque' } });
    createdEventId = event.data.id;
    const extras = booking.extra ? [{ name: booking.extra }] : [];
    const { data: appointment, error: appointmentError } = await supabase.from('appointments').insert({ customer_id: customer.id, service_code: booking.serviceCode || String(booking.service).toLowerCase().replace(/\s+/g, '_'), service_name: booking.service, extras, total_price: Number(booking.price || 0), treatment_minutes: Number(booking.minutes), buffer_minutes: BUFFER_MINUTES, starts_at: start.toUTC().toISO(), ends_at: blockedEnd.toUTC().toISO(), google_event_id: createdEventId, status }).select().single();
    if (appointmentError) throw appointmentError;
    if (!isAdminCreated) await supabase.from('admin_notifications').insert({ type: 'appointment_updated', title: 'תור ממתין לאישור', body: `${customer.first_name} ${customer.last_name} ביקשה ${booking.service}`, customer_id: customer.id, appointment_id: appointment.id, metadata: { starts_at: appointment.starts_at, status: 'pending' } });
    res.status(201).json({ ok: true, appointment, eventId: createdEventId });
  } catch (error) {
    console.error(error);
    if (createdEventId) try { await calendarClient().events.delete({ calendarId: CALENDAR_ID, eventId: createdEventId }); } catch {}
    res.status(500).json({ error: 'BOOKING_FAILED' });
  }
});

app.post('/api/admin/appointments/:appointmentId/approve', async (req, res) => {
  try {
    const supabase = supabaseClient();
    const { data: appointment, error } = await supabase.from('appointments').select('*').eq('id', req.params.appointmentId).single();
    if (error || !appointment) return res.status(404).json({ error: 'APPOINTMENT_NOT_FOUND' });
    if (appointment.status === 'confirmed') return res.json({ ok: true, appointment });
    if (appointment.status === 'cancelled') return res.status(409).json({ error: 'APPOINTMENT_CANCELLED' });
    const customer = await getCustomer(supabase, appointment.customer_id);
    if (appointment.google_event_id && customer) await calendarClient().events.patch({ calendarId: CALENDAR_ID, eventId: appointment.google_event_id, requestBody: { summary: `AMIT TOUCH · ${customer.first_name} ${customer.last_name} · ${appointment.service_name}`, description: `סטטוס: confirmed\nלקוחה: ${customer.first_name} ${customer.last_name}\nנייד: ${customer.phone}\nטיפול: ${appointment.service_name}` } });
    const { data: updated, error: updateError } = await supabase.from('appointments').update({ status: 'confirmed', approved_at: new Date().toISOString() }).eq('id', appointment.id).select().single();
    if (updateError) throw updateError;
    await supabase.from('customer_notifications').insert({ customer_id: appointment.customer_id, appointment_id: appointment.id, type: 'appointment_approved', title: 'התור אושר', body: 'התור שלך אושר ונקבע ביומן.' });
    res.json({ ok: true, appointment: updated });
  } catch (error) { console.error(error); res.status(500).json({ error: 'APPROVAL_FAILED' }); }
});

app.post('/api/admin/appointments/:appointmentId/reject', async (req, res) => {
  try {
    const supabase = supabaseClient();
    const { data: appointment, error } = await supabase.from('appointments').select('*').eq('id', req.params.appointmentId).single();
    if (error || !appointment) return res.status(404).json({ error: 'APPOINTMENT_NOT_FOUND' });
    if (appointment.google_event_id) try { await calendarClient().events.delete({ calendarId: CALENDAR_ID, eventId: appointment.google_event_id }); } catch (calendarError) { console.error(calendarError); }
    const { data: updated, error: updateError } = await supabase.from('appointments').update({ status: 'cancelled', cancelled_at: new Date().toISOString(), cancellation_reason: req.body.reason || 'לא אושר על ידי עמית' }).eq('id', appointment.id).select().single();
    if (updateError) throw updateError;
    await supabase.from('customer_notifications').insert({ customer_id: appointment.customer_id, appointment_id: appointment.id, type: 'appointment_rejected', title: 'התור לא אושר', body: 'בקשת התור לא אושרה. אפשר לבחור מועד אחר באפליקציה.' });
    res.json({ ok: true, appointment: updated });
  } catch (error) { console.error(error); res.status(500).json({ error: 'REJECTION_FAILED' }); }
});

app.delete('/api/appointments/:appointmentId', async (req, res) => {
  try {
    const supabase = supabaseClient();
    const { data: appointment, error } = await supabase.from('appointments').select('*').eq('id', req.params.appointmentId).single();
    if (error || !appointment) return res.status(404).json({ error: 'APPOINTMENT_NOT_FOUND' });
    if (appointment.google_event_id) try { await calendarClient().events.delete({ calendarId: CALENDAR_ID, eventId: appointment.google_event_id }); } catch (calendarError) { console.error(calendarError); }
    const { data: updated, error: updateError } = await supabase.from('appointments').update({ status: 'cancelled', cancelled_at: new Date().toISOString(), cancellation_reason: req.body.reason || 'בוטל דרך האפליקציה' }).eq('id', appointment.id).select().single();
    if (updateError) throw updateError;
    res.json({ ok: true, appointment: updated });
  } catch (error) { console.error(error); res.status(500).json({ error: 'CANCELLATION_FAILED' }); }
});

app.post('/api/admin/customers/ensure', async (req, res) => {
  try {
    const firstName = String(req.body.firstName || '').trim();
    const lastName = String(req.body.lastName || '').trim();
    const phone = normalizePhone(req.body.phone);
    if (!firstName || !phone) return res.status(400).json({ error: 'NAME_AND_PHONE_REQUIRED' });
    const supabase = supabaseClient();
    const { data: existing, error: findError } = await supabase.from('customers').select('*').eq('phone', phone).maybeSingle();
    if (findError) throw findError;
    if (existing) return res.json({ ok: true, customer: existing, created: false });
    const { data: customer, error } = await supabase.from('customers').insert({ first_name: firstName, last_name: lastName || '', phone, profile_incomplete: true }).select().single();
    if (error) throw error;
    res.status(201).json({ ok: true, customer, created: true });
  } catch (error) { console.error(error); res.status(500).json({ error: 'CUSTOMER_ENSURE_FAILED' }); }
});

app.get('/api/customer-notifications/:customerId', async (req, res) => {
  try {
    const supabase = supabaseClient();
    const { data, error } = await supabase.from('customer_notifications').select('*').eq('customer_id', req.params.customerId).order('created_at', { ascending: false }).limit(100);
    if (error) throw error;
    res.json({ notifications: data || [] });
  } catch (error) { console.error(error); res.status(500).json({ error: 'CUSTOMER_NOTIFICATIONS_FAILED' }); }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`AMIT TOUCH running on ${port}`));