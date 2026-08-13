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
    res.json({ ok: true, database: true, calendarConfigured: Boolean(process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL && process.env.GOOGLE_PRIVATE_KEY) });
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
    if (!fullName || phone.length < 9) return res.status(400).json({ error: 'INVALID_LOGIN' });
    if (fullName === ADMIN_NAME && phone === ADMIN_PHONE) return res.json({ ok: true, role: 'admin', customer: null });

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
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'APPOINTMENTS_FAILED' });
  }
});

app.get('/api/admin/notifications', async (_req, res) => {
  try {
    const supabase = supabaseClient();
    const { data, error } = await supabase.from('admin_notifications').select('*').order('created_at', { ascending: false }).limit(100);
    if (error) throw error;
    res.json({ notifications: data || [] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'NOTIFICATIONS_FAILED' });
  }
});

app.get('/api/availability', async (req, res) => {
  try {
    const { date, minutes = 60 } = req.query;
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date || '')) return res.status(400).json({ error: 'INVALID_DATE' });
    const duration = Number(minutes) + BUFFER_MINUTES;
    const dayStart = DateTime.fromISO(`${date}T00:00`, { zone: TZ });
    const dayEnd = dayStart.plus({ days: 1 });
    const calendar = calendarClient();
    const busyResult = await calendar.freebusy.query({ requestBody: { timeMin: dayStart.toUTC().toISO(), timeMax: dayEnd.toUTC().toISO(), timeZone: TZ, items: [{ id: CALENDAR_ID }] } });
    const busy = busyResult.data.calendars?.[CALENDAR_ID]?.busy || [];
    const slots = [];
    for (let t = dayStart.set({ hour: 9, minute: 0 }); t.plus({ minutes: duration }) <= dayStart.set({ hour: 19, minute: 0 }); t = t.plus({ minutes: 30 })) {
      const end = t.plus({ minutes: duration });
      const conflict = busy.some(item => t.toMillis() < DateTime.fromISO(item.end).toMillis() && end.toMillis() > DateTime.fromISO(item.start).toMillis());
      if (!conflict) slots.push(t.toFormat('HH:mm'));
    }
    res.json({ date, slots });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'CALENDAR_AVAILABILITY_FAILED' });
  }
});

app.post('/api/book', async (req, res) => {
  let createdEventId = null;
  try {
    const booking = req.body;
    const customerId = booking.customerId;
    if (!customerId || !booking.service || !booking.date || !booking.time || !Number.isFinite(Number(booking.minutes))) return res.status(400).json({ error: 'INVALID_BOOKING' });

    const supabase = supabaseClient();
    const { data: customer, error: customerError } = await supabase.from('customers').select('*').eq('id', customerId).single();
    if (customerError || !customer) return res.status(404).json({ error: 'CUSTOMER_NOT_FOUND' });

    const start = DateTime.fromISO(`${booking.date}T${booking.time}`, { zone: TZ });
    const treatmentEnd = start.plus({ minutes: Number(booking.minutes) });
    const blockedEnd = treatmentEnd.plus({ minutes: BUFFER_MINUTES });
    const calendar = calendarClient();
    const busyResult = await calendar.freebusy.query({ requestBody: { timeMin: start.toUTC().toISO(), timeMax: blockedEnd.toUTC().toISO(), timeZone: TZ, items: [{ id: CALENDAR_ID }] } });
    if ((busyResult.data.calendars?.[CALENDAR_ID]?.busy || []).length) return res.status(409).json({ error: 'SLOT_TAKEN' });

    const event = await calendar.events.insert({ calendarId: CALENDAR_ID, requestBody: {
      summary: `AMIT TOUCH · ${customer.first_name} ${customer.last_name} · ${booking.service}`,
      description: `לקוחה: ${customer.first_name} ${customer.last_name}\nנייד: ${customer.phone}\nטיפול: ${booking.service}\nתוספות: ${booking.extra || 'ללא'}\nמחיר: ₪${booking.price}\nזמן טיפול: ${booking.minutes} דקות\nBuffer: ${BUFFER_MINUTES} דקות`,
      start: { dateTime: start.toISO(), timeZone: TZ },
      end: { dateTime: blockedEnd.toISO(), timeZone: TZ },
      transparency: 'opaque'
    }});
    createdEventId = event.data.id;

    const extras = booking.extra ? [{ name: booking.extra }] : [];
    const { data: appointment, error: appointmentError } = await supabase.from('appointments').insert({
      customer_id: customer.id,
      service_code: booking.serviceCode || String(booking.service).toLowerCase().replace(/\s+/g, '_'),
      service_name: booking.service,
      extras,
      total_price: Number(booking.price || 0),
      treatment_minutes: Number(booking.minutes),
      buffer_minutes: BUFFER_MINUTES,
      starts_at: start.toUTC().toISO(),
      ends_at: blockedEnd.toUTC().toISO(),
      google_event_id: createdEventId,
      status: 'confirmed'
    }).select().single();
    if (appointmentError) throw appointmentError;

    res.status(201).json({ ok: true, appointment, eventId: createdEventId });
  } catch (error) {
    console.error(error);
    if (createdEventId) {
      try { await calendarClient().events.delete({ calendarId: CALENDAR_ID, eventId: createdEventId }); } catch {}
    }
    res.status(500).json({ error: 'BOOKING_FAILED' });
  }
});

app.delete('/api/appointments/:appointmentId', async (req, res) => {
  try {
    const supabase = supabaseClient();
    const { data: appointment, error: loadError } = await supabase.from('appointments').select('*').eq('id', req.params.appointmentId).single();
    if (loadError || !appointment) return res.status(404).json({ error: 'APPOINTMENT_NOT_FOUND' });
    if (appointment.status === 'cancelled') return res.json({ ok: true });

    if (appointment.google_event_id) await calendarClient().events.delete({ calendarId: CALENDAR_ID, eventId: appointment.google_event_id });

    const { error: updateError } = await supabase.from('appointments').update({ status: 'cancelled', cancelled_at: new Date().toISOString(), cancellation_reason: String(req.body?.reason || 'בוטל על ידי הלקוחה') }).eq('id', appointment.id);
    if (updateError) throw updateError;
    res.json({ ok: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'CANCELLATION_FAILED' });
  }
});

const port = process.env.PORT || 10000;
app.listen(port, '0.0.0.0', () => console.log(`AMIT TOUCH listening on ${port}`));
