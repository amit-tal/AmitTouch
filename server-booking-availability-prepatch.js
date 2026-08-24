import fs from 'fs';
const previousReadFileSync=fs.readFileSync.bind(fs);
fs.readFileSync=function bookingAvailabilityPatchedReadFileSync(file,...args){
  const result=previousReadFileSync(file,...args);
  if(!String(file||'').endsWith('server-v2.js'))return result;
  const isBuffer=Buffer.isBuffer(result);let source=isBuffer?result.toString('utf8'):String(result);
  const startMarker="app.get('/api/availability', async (req, res) => {";
  const endMarker="app.post('/api/book', async (req, res) => {";
  const startAt=source.indexOf(startMarker),endAt=source.indexOf(endMarker);
  if(startAt<0||endAt<0||endAt<=startAt)return result;
  const route=String.raw`app.get('/api/availability', async (req, res) => {
  try {
    const { date, minutes = 60 } = req.query;
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date || '')) return res.status(400).json({ error: 'INVALID_DATE' });
    const treatmentMinutes = Math.max(1, Number(minutes) || 60);
    const duration = treatmentMinutes + BUFFER_MINUTES;
    const dayStart = DateTime.fromISO(date + 'T00:00', { zone: TZ });
    const dayEnd = dayStart.plus({ days: 1 });
    const supabase = supabaseClient();
    const { data: appointments, error: appointmentsError } = await supabase.from('appointments').select('id,starts_at,ends_at,status').in('status', ['pending','confirmed','pending_customer_response']).lt('starts_at', dayEnd.toUTC().toISO()).gt('ends_at', dayStart.toUTC().toISO());
    if (appointmentsError) throw appointmentsError;
    let externalBusy=[];let calendarIds=[];let icloudCalendars=0;
    try {
      const calendar = calendarClient();
      const external = await Promise.race([getBusyPeriods(calendar, dayStart.toUTC().toISO(), dayEnd.toUTC().toISO()),new Promise(resolve=>setTimeout(()=>resolve({calendarIds:[],icloudCalendars:0,busy:[]}),4500))]);
      externalBusy=external.busy||[];calendarIds=external.calendarIds||[];icloudCalendars=external.icloudCalendars||0;
    } catch (calendarError) { console.error('Availability external calendars skipped', calendarError); }
    const slots=[];const window=getAppointmentStartWindow(dayStart);const firstStart=dayStart.set({hour:window.firstHour,minute:0});const lastStart=dayStart.set({hour:window.lastHour,minute:0});const now=DateTime.now().setZone(TZ);
    for(let t=firstStart;t<=lastStart;t=t.plus({minutes:30})){
      if(t<=now)continue;
      const end=t.plus({minutes:duration}),ts=t.toMillis(),te=end.toMillis();
      const dbConflict=(appointments||[]).some(a=>{const s=DateTime.fromISO(a.starts_at,{setZone:true}).toMillis(),e=DateTime.fromISO(a.ends_at,{setZone:true}).toMillis();return s<te&&e>ts});
      if(dbConflict)continue;
      if(externalBusy.some(item=>conflictsWithBusy(t,end,item)))continue;
      slots.push(t.toFormat('HH:mm'));
    }
    res.set('Cache-Control','no-store');
    res.json({ date, slots, calendarsChecked: calendarIds.length, icloudCalendarsChecked: icloudCalendars, appointmentStartHours: window.label, bufferMinutes: BUFFER_MINUTES, calendarEventBufferMinutes: CALENDAR_EVENT_BUFFER_MINUTES });
  } catch (error) { console.error('Calendar availability failed', error); res.status(500).json({ error: 'CALENDAR_AVAILABILITY_FAILED' }); }
});

`;
  source=source.slice(0,startAt)+route+source.slice(endAt);
  return isBuffer?Buffer.from(source,'utf8'):source;
};
