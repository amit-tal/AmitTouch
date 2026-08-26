(function(){'use strict';
function label(){document.querySelectorAll('.admin-home-canonical .ah-actions [data-go="appointment-details"]').forEach(function(btn){btn.textContent='פרטי התור'})}
label();
window.addEventListener('amit:session-ready',label);
window.addEventListener('pageshow',label);
import('/admin-messages-live-enhancements.js?v=20260826-live-chat-v99').catch(console.error);
import('/admin-chat-nozoom.js?v=20260826-live-chat-v99').catch(console.error);
})();