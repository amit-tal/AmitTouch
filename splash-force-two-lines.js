(function(){
  function apply(){
    const tag=document.querySelector('#splash .splash-tag');
    if(!tag)return;
    const ok=tag.children.length===2&&tag.children[0]?.textContent==='הטאץ׳ הקטן שעושה'&&tag.children[1]?.textContent==='את כל ההבדל';
    if(!ok){
      tag.innerHTML='<span class="splash-tag-line">הטאץ׳ הקטן שעושה</span><span class="splash-tag-line">את כל ההבדל</span>';
    }
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
  setTimeout(apply,120);
  setTimeout(apply,500);
})();