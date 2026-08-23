(function(){'use strict';
const ID='admin-reschedule-click-fix-v1';if(document.getElementById(ID))return;const marker=document.createElement('meta');marker.id=ID;document.head.appendChild(marker);
function openFrom(trigger){if(typeof window.AMIT_ADMIN_OPEN_RESCHEDULE==='function'){window.AMIT_ADMIN_OPEN_RESCHEDULE(trigger);return true}return false}
document.addEventListener('click',function(e){const trigger=e.target.closest('.admin-notifications-v4 [data-action="reschedule"],.admin-notifications-v4 [data-notify-action="reschedule"]');if(!trigger)return;e.preventDefault();e.stopImmediatePropagation();if(openFrom(trigger))return;let tries=0;const timer=setInterval(()=>{tries++;if(openFrom(trigger)||tries>=20)clearInterval(timer)},50)},true);
})();