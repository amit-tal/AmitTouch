(function(){
'use strict';
if(window.__AMIT_ADMIN_DEMO_PATCH__)return;
window.__AMIT_ADMIN_DEMO_PATCH__=true;
const originalFetch=window.fetch.bind(window);
function isoAt(dayOffset,hour,minute){const d=new Date();d.setDate(d.getDate()+dayOffset);d.setHours(hour,minute,0,0);return d.toISOString()}
const demo=[
{id:'demo-maya',starts_at:isoAt(0,10,0),status:'confirmed',service_name:'בנייה',total_price:220,treatment_minutes:120,notes:'',customer:{id:'demo-c-maya',first_name:'מאיה',last_name:'לוי',fullName:'מאיה לוי',phone:'0546876543',birth_date:'1998-04-12'}},
{id:'demo-shira',starts_at:isoAt(0,12,0),status:'confirmed',service_name:'מילוי',total_price:180,treatment_minutes:90,notes:'',customer:{id:'demo-c-shira',first_name:'שירה',last_name:'ישראלי',fullName:'שירה ישראלי',phone:'0507654321',birth_date:'1997-09-03'}},
{id:'demo-noa',starts_at:isoAt(0,15,30),status:'confirmed',service_name:'מניקור ג׳ל + תיקון',total_price:150,treatment_minutes:60,notes:'רגישה באזור הקוטיקולה',customer:{id:'demo-c-noa',first_name:'נועה',last_name:'כהן',fullName:'נועה כהן',phone:'0521234567',birth_date:'1999-12-03'}},
{id:'demo-dana',starts_at:isoAt(0,17,0),status:'confirmed',service_name:'הסרה + ג׳ל',total_price:170,treatment_minutes:75,notes:'',customer:{id:'demo-c-dana',first_name:'דנה',last_name:'רזון',fullName:'דנה רזון',phone:'0532468135',birth_date:'1996-07-22'}},
{id:'demo-pending-1',starts_at:isoAt(1,11,0),status:'pending',service_name:'מניקור ג׳ל',total_price:150,treatment_minutes:60,notes:'',customer:{id:'demo-c-tal',first_name:'טל',last_name:'בר',fullName:'טל בר',phone:'0524455667'}},
{id:'demo-pending-2',starts_at:isoAt(2,13,0),status:'pending',service_name:'בנייה',total_price:220,treatment_minutes:120,notes:'',customer:{id:'demo-c-yael',first_name:'יעל',last_name:'מור',fullName:'יעל מור',phone:'0509988776'}},
{id:'demo-week-1',starts_at:isoAt(3,10,30),status:'confirmed',service_name:'מילוי',total_price:180,treatment_minutes:90,notes:'',customer:{id:'demo-c-rina',first_name:'רינה',last_name:'לב',fullName:'רינה לב',phone:'0543344556'}},
{id:'demo-week-2',starts_at:isoAt(4,16,0),status:'confirmed',service_name:'מניקור ג׳ל',total_price:150,treatment_minutes:60,notes:'',customer:{id:'demo-c-gal',first_name:'גל',last_name:'חן',fullName:'גל חן',phone:'0521122334'}}
];
const demoPending=demo.filter(a=>a.status==='pending');
window.__AMIT_ADMIN_DEMO_APPOINTMENTS__=demo;
window.fetch=async function(input,init){
 const url=typeof input==='string'?input:(input&&input.url)||'';
 const response=await originalFetch(input,init);
 if(!/\/api\/admin\/appointments(?:\?|$)/.test(url)||String((init&&init.method)||'GET').toUpperCase()!=='GET')return response;
 try{
  const clone=response.clone();
  const data=await clone.json();
  if(response.ok&&Array.isArray(data.appointments)){
   const current=data.appointments;
   const hasPending=current.some(a=>a&&a.status==='pending');
   let appointments=current;
   if(current.length===0){
    appointments=demo;
   }else if(!hasPending){
    const ids=new Set(current.map(a=>String(a&&a.id||'')));
    appointments=[...current,...demoPending.filter(a=>!ids.has(String(a.id)))];
   }
   if(appointments!==current){
    return new Response(JSON.stringify({...data,appointments,demo:true}),{status:200,headers:{'Content-Type':'application/json'}})
   }
  }
 }catch(_){ }
 return response;
};
})();