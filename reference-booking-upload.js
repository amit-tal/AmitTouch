(function(){
  const ENDPOINT='https://mpiwnnvnikpbgkaorxnl.supabase.co/functions/v1/appointment-reference';
  function fileToDataUrl(file){return new Promise((resolve,reject)=>{const reader=new FileReader();reader.onload=()=>resolve(String(reader.result||''));reader.onerror=()=>reject(reader.error||new Error('READ_FAILED'));reader.readAsDataURL(file);});}
  function currentUser(){try{if(window.user?.id)return window.user;}catch(_){}try{if(typeof user!=='undefined'&&user?.id)return user;}catch(_){}return null;}
  function install(){
    if(typeof window.confirmBook!=='function'||window.__AMIT_REFERENCE_UPLOAD_WRAP__)return false;
    window.__AMIT_REFERENCE_UPLOAD_WRAP__=true;
    const original=window.confirmBook;
    window.confirmBook=async function(...args){
      const file=booking?.artReference instanceof File?booking.artReference:null;
      const customer=currentUser();
      let appointmentId=null;
      const realFetch=window.fetch.bind(window);
      window.fetch=async function(input,init){
        const response=await realFetch(input,init);
        try{
          const url=typeof input==='string'?input:input?.url||'';
          if(url==='/api/book'||url.endsWith('/api/book')){
            const data=await response.clone().json();
            appointmentId=data?.appointment?.id||null;
          }
        }catch(_){}
        return response;
      };
      try{await original.apply(this,args);}finally{window.fetch=realFetch;}
      if(!file||!appointmentId||!customer?.id)return;
      try{
        const dataUrl=await fileToDataUrl(file);
        const upload=await realFetch(ENDPOINT,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({appointmentId,customerId:customer.id,fileName:file.name||'reference',mimeType:file.type||'image/jpeg',dataUrl})});
        if(!upload.ok)throw new Error('REFERENCE_UPLOAD_FAILED');
      }catch(error){console.error('Reference upload failed',error);if(typeof window.amitNotice==='function')window.amitNotice('התור נשמר, אבל תמונת הרפרנס לא עלתה. אפשר לנסות שוב בהזמנה חדשה.','התמונה לא עלתה');}
    };
    return true;
  }
  if(!install()){
    let tries=0;const timer=setInterval(()=>{tries++;if(install()||tries>50)clearInterval(timer);},100);
  }
})();