(function(){
  function install(){
    if(typeof window.show!=='function')return setTimeout(install,40);

    window.enterApp=function(){
      try{
        const firstName=(window.user&&((user.firstName)||(user.name&&String(user.name).trim().split(/\s+/)[0])))||'';
        const hello=document.getElementById('hello');
        if(hello)hello.textContent='איזה כיף שחזרת '+firstName+' ♡';

        document.getElementById('nav')?.classList.add('show');
        window.show('home');

        try{window.renderNext?.();}catch(error){
          console.warn('Home loaded; legacy next appointment target is not present.',error);
        }
      }catch(error){
        console.error('enterApp guard recovered from home DOM mismatch',error);
        try{window.show('home');}catch(_){ }
      }
    };

    const originalRenderNext=window.renderNext;
    if(typeof originalRenderNext==='function'){
      window.renderNext=function(){
        if(!document.getElementById('nextAppointment'))return;
        try{return originalRenderNext.apply(this,arguments);}catch(error){console.warn('renderNext skipped',error);}
      };
    }
  }

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>setTimeout(install,0),{once:true});
  else setTimeout(install,0);
})();