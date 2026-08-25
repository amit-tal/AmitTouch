import fs from 'fs';
const previousReadFileSync=fs.readFileSync.bind(fs);
fs.readFileSync=function rescheduleAvailabilityPatchedReadFileSync(file,...args){
  const result=previousReadFileSync(file,...args);
  if(!String(file||'').endsWith('server-v2.js'))return result;
  const isBuffer=Buffer.isBuffer(result);let source=isBuffer?result.toString('utf8'):String(result);
  if(source.includes("/api/admin/appointments/:appointmentId/availability"))return result;
  const runtime=String.raw`
app.get('/api/admin/appointments/:appointmentId/availability',async(req,res)=>{
  try{
    const date=String(req.query.date||'');
    if(!/^\d{4}-\d{2}-\d{2}$/.test(date))return res.status(400).json({error:'INVALID_DATE'});
    const supabase=supabaseClient();
    const {data:appointment,error}=await supabase.from('appointments').select('*').eq('id',req.params.appointmentId).single();
    if(error||!appointment)return res.status(404).json({error:'APPOINTMENT_NOT_FOUND'});
    const minutes=Number(appointment.treatment_minutes||60);
    const dayStart=DateTime.fromISO(date+'T00:00',{zone:TZ});
    const dayEnd=dayStart.plus({days:1});
    const {data:rows,error:rowsError}=await supabase.from('appointments').select('id,starts_at,ends_at,status').neq('id',appointment.id).in('status',['pending','confirmed']).lt('starts_at',dayEnd.toUTC().toISO()).gt('ends_at',dayStart.toUTC().toISO());
    if(rowsError)throw rowsError;
    const {data:proposalRows,error:proposalRowsError}=await supabase.from('customer_notifications').select('appointment_id,body').eq('type','reschedule_proposal').neq('appointment_id',appointment.id).limit(200);
    if(proposalRowsError)throw proposalRowsError;
    const proposals=[];
    for(const row of proposalRows||[]){try{const p=JSON.parse(String(row.body||''));if(p?.kind==='reschedule_proposal'&&p.status==='pending')proposals.push({appointment_id:row.appointment_id,proposal:p})}catch(_){}}
    const hours=getAppointmentStartWindow(dayStart);
    const now=DateTime.now().setZone(TZ);
    const slots=[];
    for(let total=hours.firstHour*60;total<=hours.lastHour*60;total+=30){
      const hh=String(Math.floor(total/60)).padStart(2,'0'),mm=String(total%60).padStart(2,'0');
      const start=DateTime.fromISO(date+'T'+hh+':'+mm,{zone:TZ});
      if(!start.isValid||start<=now)continue;
      const blockedEnd=start.plus({minutes:minutes+BUFFER_MINUTES});
      const startMs=start.toMillis(),endMs=blockedEnd.toMillis();
      const dbClash=(rows||[]).some(a=>{const s=DateTime.fromISO(a.starts_at,{setZone:true}).toMillis(),e=DateTime.fromISO(a.ends_at,{setZone:true}).toMillis();return s<endMs&&e>startMs});
      if(dbClash)continue;
      const proposalClash=proposals.some(row=>{const p=row.proposal,ps=DateTime.fromISO(String(p.date||'')+'T'+String(p.time||''),{zone:TZ});if(!ps.isValid)return false;const pe=ps.plus({minutes:Number(p.minutes||60)+BUFFER_MINUTES});return startMs<pe.toMillis()&&endMs>ps.toMillis()});
      if(proposalClash)continue;
      slots.push(hh+':'+mm);
    }
    res.set('Cache-Control','no-store');
    res.json({slots,appointmentId:appointment.id,date,minutes});
  }catch(error){console.error('Reschedule availability failed',error);res.status(500).json({error:'RESCHEDULE_AVAILABILITY_FAILED'})}
});
`;
  source=source.replace(/app\.listen\(/,runtime+'\napp.listen(');
  return isBuffer?Buffer.from(source,'utf8'):source;
};
