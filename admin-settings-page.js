(function(){'use strict';
/* Legacy settings implementation intentionally removed. The canonical settings screen is loaded by admin-settings-route-fix.js. */
if(window.__AMIT_ADMIN_SETTINGS_V4__)delete window.__AMIT_ADMIN_SETTINGS_V4__;
document.querySelectorAll('style[id^="amit-admin-settings-v"]').forEach(x=>x.remove());
document.querySelectorAll('.ast,.ast-sub').forEach(x=>x.remove());
})();