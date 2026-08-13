import express from 'express';
import { google } from 'googleapis';
import { DateTime } from 'luxon';

const app = express();
app.use(express.json());
app.use(express.static('.'));

const TZ = 'Asia/Jerusalem';
const CALENDAR_ID = process.env.GOOGLE_CALENDAR_ID || 'primary';
const BUFFER_MINUTES = 30;

function calendarClient() {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const key = (process.env.GOOGLE_PRIVATE_KEY || '').replace(/\\n/g, '\n');
  if (!email || !key) throw new Error('Google Calendar credentials are not configured');
  const auth = new google.auth.JWT({ email, key, scopes: ['https://www.googleapis.com/auth/calendar'] });
  return google.calendar({ version: 'v3', auth });
}

function validBooking(b) {
  return b && b.name && b.phone && b.service && b.date && b.time && Number.isFinite(Number(b.minutes));
}

app.get('/api/health', (_req, res) => res.json({ ok: true }));

app.get('/api/availability', async (req, res) => {
  try {
    const { date, minutes = 60 } = req.query;
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date || '')) return res.status(400).json({ error: 'Invalid date' });
    const duration = Number(minutes) + BUFFER_MINUTES;
    const dayStart = DateTime.fromISO(`${date}T00:00`, { zone: TZ });
    const dayEnd = dayStart.plus({ days: 1 });
    const calendar = calendarClient();
    const fb = await calendar.freebusy.query({ requestBody: { timeMin: dayStart.toUTC().toISO(), timeMax: dayEnd.toUTC().toISO(), timeZone: TZ, items: [{ id: CALENDAR_ID }] } });
    const busy = fb.data.calendars?.[CALENDAR_ID]?.busy || [];
    const candidates = [];
    for (let t = dayStart.set({ hour: 9, minute: 0 }); t.plus({ minutes: duration }) <= dayStart.set({ hour: 19, minute: 0 }); t = t.plus({ minutes: 30 })) {
      const end = t.plus({ minutes: duration });
      const conflict = busy.some(x => t.toMillis() < DateTime.fromISO(x.end).toMillis() && end.toMillis() > DateTime.fromISO(x.start).toMillis());
      if (!conflict) candidates.push(t.toFormat('HH:mm'));
    }
    res.json({ date, slots: candidates });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Calendar availability failed' });
  }
});

app.post('/api/book', async (req, res) => {
  try {
    const b = req.body;
    if (!validBooking(b)) return res.status(400).json({ error: 'Invalid booking' });
    const start = DateTime.fromISO(`${b.date}T${b.time}`, { zone: TZ });
    const treatmentEnd = start.plus({ minutes: Number(b.minutes) });
    const blockedEnd = treatmentEnd.plus({ minutes: BUFFER_MINUTES });
    const calendar = calendarClient();
    const fb = await calendar.freebusy.query({ requestBody: { timeMin: start.toUTC().toISO(), timeMax: blockedEnd.toUTC().toISO(), timeZone: TZ, items: [{ id: CALENDAR_ID }] } });
    if ((fb.data.calendars?.[CALENDAR_ID]?.busy || []).length) return res.status(409).json({ error: 'Slot is no longer available' });
    const event = await calendar.events.insert({ calendarId: CALENDAR_ID, requestBody: {
      summary: `AMIT TOUCH · ${b.name} · ${b.service}`,
      description: `לקוחה: ${b.name}\nנייד: ${b.phone}\nטיפול: ${b.service}\nתוספות: ${b.extra || 'ללא'}\nמחיר: ₪${b.price}\nזמן טיפול: ${b.minutes} דקות\nBuffer: ${BUFFER_MINUTES} דקות`,
      start: { dateTime: start.toISO(), timeZone: TZ },
      end: { dateTime: blockedEnd.toISO(), timeZone: TZ },
      transparency: 'opaque'
    }});
    res.json({ ok: true, eventId: event.data.id, treatmentEnd: treatmentEnd.toISO(), blockedEnd: blockedEnd.toISO() });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Calendar booking failed' });
  }
});

app.delete('/api/book/:eventId', async (req, res) => {
  try {
    const eventId = req.params.eventId;
    if (!eventId || !/^[A-Za-z0-9_\-]+$/.test(eventId)) return res.status(400).json({ error: 'Invalid event' });
    await calendarClient().events.delete({ calendarId: CALENDAR_ID, eventId });
    res.json({ ok: true });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Calendar cancellation failed' });
  }
});

const port = process.env.PORT || 10000;
app.listen(port, '0.0.0.0', () => console.log(`AMIT TOUCH listening on ${port}`));
