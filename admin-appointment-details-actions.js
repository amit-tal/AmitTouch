(function(){'use strict';
function label(){document.querySelectorAll('.admin-home-canonical .ah-actions [data-go="appointment-details"]').forEach(function(btn){btn.textContent='פרטי התור'})}
label();
window.addEventListener('amit:session-ready',label);
window.addEventListener('pageshow',label);
import('/admin-messages-live-enhancements.js?v=20260826-live-chat-v99').catch(console.error);
import('/admin-chat-nozoom.js?v=20260826-live-chat-v99').catch(console.error);

function fixStatsBack(){
  document.querySelectorAll('#adminBody .af-head').forEach(function(head){
    const title=head.querySelector('h1');
    if(!title||title.textContent.trim()!=='סטטיסטיקות')return;
    const back=head.querySelector('[data-back]');
    if(!back)return;
    head.classList.add('amit-stats-head-fixed');
    back.textContent='›';
    back.style.gridColumn='3';
    back.style.gridRow='1';
    back.style.justifySelf='end';
    const buttons=head.querySelectorAll('button');
    buttons.forEach(function(btn){if(btn!==back){btn.style.gridColumn='1';btn.style.gridRow='1';btn.style.justifySelf='start'}});
  });
}
fixStatsBack();
new MutationObserver(fixStatsBack).observe(document.body,{childList:true,subtree:true});
window.addEventListener('pageshow',fixStatsBack);
})();