(function(){
  function apply(){
    const tag=document.querySelector('#splash .splash-tag');
    if(!tag)return;
    tag.innerHTML='<span class="splash-tag-line">הטאץ׳ הקטן שעושה</span><span class="splash-tag-line">את כל ההבדל</span>';
    tag.style.setProperty('display','flex','important');
    tag.style.setProperty('flex-direction','column','important');
    tag.style.setProperty('align-items','center','important');
    tag.style.setProperty('justify-content','center','important');
    tag.style.setProperty('white-space','normal','important');
    [...tag.children].forEach(line=>{
      line.style.setProperty('display','block','important');
      line.style.setProperty('width','100%','important');
      line.style.setProperty('white-space','nowrap','important');
      line.style.setProperty('text-align','center','important');
    });
  }
  apply();
  const splash=document.getElementById('splash');
  if(splash){
    const mo=new MutationObserver(()=>apply());
    mo.observe(splash,{childList:true,subtree:true,characterData:true});
    setTimeout(()=>mo.disconnect(),5000);
  }
})();