import fs from 'fs';
import path from 'path';
import { pathToFileURL } from 'url';

const sourcePath = path.resolve('./server-v2.js');
const runtimePath = path.resolve('./.server-v2-runtime.mjs');
let source = fs.readFileSync(sourcePath, 'utf8');

const helper = String.raw`
async function syncApprovedAppointmentToIcloud(appointment, customer) {
  if (!icloudConfigured() || !appointment || !customer) return false;
  const client = await createDAVClient({
    serverUrl: 'https://caldav.icloud.com',
    credentials: { username: process.env.ICLOUD_APPLE_ID, password: process.env.ICLOUD_APP_PASSWORD },
    authMethod: 'Basic',
    defaultAccountType: 'caldav'
  });
  const calendars = await client.fetchCalendars();
  const target = (calendars || []).find(c => {
    const name = String(c.displayName || c.name || '').trim();
    return name === 'ציפורנים' || name.includes('ציפורנים');
  });
  if (!target) throw new Error('ICLOUD_NAILS_CALENDAR_NOT_FOUND');

  const start = DateTime.fromISO(appointment.starts_at, { setZone: true }).toUTC();
  const treatmentMinutes = Number(appointment.treatment_minutes || 0);
  const treatmentEnd = treatmentMinutes > 0 ? start.plus({ minutes: treatmentMinutes }) : DateTime.fromISO(appointment.ends_at, { setZone: true }).toUTC();
  const uid = 'amit-touch-' + appointment.id + '@amit-touch';
  const stamp = DateTime.utc().toFormat("yyyyLLdd'T'HHmmss'Z'");
  const dtStart = start.toFormat("yyyyLLdd'T'HHmmss'Z'");
  const dtEnd = treatmentEnd.toFormat("yyyyLLdd'T'HHmmss'Z'");
  const summary = 'AMIT TOUCH · ' + customer.first_name + ' ' + customer.last_name + ' · ' + appointment.service_name;
  const description = ['לקוחה: ' + customer.first_name + ' ' + customer.last_name, 'נייד: ' + customer.phone, 'טיפול: ' + appointment.service_name, 'מחיר: ₪' + appointment.total_price].join('\\n');
  const esc = value => String(value || '').replace(/\\/g, '\\\\').replace(/\n/g, '\\n').replace(/,/g, '\\,').replace(/;/g, '\\;');
  const iCalString = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//AMIT TOUCH//Appointments//HE',
    'CALSCALE:GREGORIAN',
    'BEGIN:VEVENT',
    'UID:' + uid,
    'DTSTAMP:' + stamp,
    'DTSTART:' + dtStart,
    'DTEND:' + dtEnd,
    'SUMMARY:' + esc(summary),
    'DESCRIPTION:' + esc(description),
    'STATUS:CONFIRMED',
    'TRANSP:OPAQUE',
    'END:VEVENT',
    'END:VCALENDAR',
    ''
  ].join('\\r\\n');
  await client.createCalendarObject({ calendar: target, filename: uid + '.ics', iCalString });
  return true;
}
`;

const routeMarker = "app.post('/api/admin/appointments/:appointmentId/approve'";
if (!source.includes('syncApprovedAppointmentToIcloud(')) {
  source = source.replace(routeMarker, helper + '\n' + routeMarker);
}

const approvalMarker = "if (updateError) throw updateError; await supabase.from('customer_notifications').insert({ customer_id: appointment.customer_id, appointment_id: appointment.id, type: 'appointment_approved', title: 'התור אושר', body: 'התור שלך אושר ונקבע ביומן.' });";
const approvalReplacement = "if (updateError) throw updateError; try { await syncApprovedAppointmentToIcloud(updated, customer); } catch (icloudError) { console.error('iCloud approval sync failed', icloudError); } await supabase.from('customer_notifications').insert({ customer_id: appointment.customer_id, appointment_id: appointment.id, type: 'appointment_approved', title: 'התור אושר', body: 'התור שלך אושר ונקבע ביומן.' });";
source = source.replace(approvalMarker, approvalReplacement);

fs.writeFileSync(runtimePath, source, 'utf8');
await import(pathToFileURL(runtimePath).href + '?v=' + Date.now());
await import('./preload.js');
