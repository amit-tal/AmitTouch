(function(){'use strict';
if(window.__AMIT_STUDIO_THEME_FIX_V1__)return;window.__AMIT_STUDIO_THEME_FIX_V1__=true;
const BRAND={green:'#164e4a',green2:'#15998a',green3:'#315d58',pink:'#f3ded8',cream:'#fbf6f0',line:'#e7ddd6',muted:'#728984',danger:'#cf6175'};
function inject(){let s=document.getElementById('amit-studio-theme-fix-v1');if(s)s.remove();s=document.createElement('style');s.id='amit-studio-theme-fix-v1';s.textContent=`
html:has(.asc-page),body:has(.asc-page){background:${BRAND.cream}!important;background-image:none!important}
body:has(.asc-page) .af-nav,body:has(.asc-page) #nav,body:has(.asc-page) footer,body:has(.asc-page) .footer,body:has(.asc-page) [class*="footer"]{display:none!important}
.asc-page{background:${BRAND.cream}!important;background-image:none!important;color:${BRAND.green}!important;padding-bottom:32px!important}
.asc-page,.asc-page *,.asc-modal,.asc-modal *{font-family:Inter,sans-serif!important;box-sizing:border-box}
.asc-card{background:transparent!important;background-image:none!important;border-color:${BRAND.line}!important;box-shadow:none!important}
.asc-row,.asc-hour,.asc-service{background:transparent!important;background-image:none!important;color:${BRAND.green3}!important}
.asc-head,.asc-head h1,.asc-back,.asc-section,.asc-chev,.asc-dots,.asc-drag{color:${BRAND.green}!important}
.asc-switch{background:#d8d6d2!important}.asc-switch.on{background:${BRAND.green2}!important}.asc-switch:after{background:#fff!important}
.asc-save{background:${BRAND.green2}!important;color:#fff!important}.asc-outline{background:transparent!important;color:${BRAND.green2}!important;border-color:${BRAND.green2}!important}
.asc-pencil{background:transparent!important;color:${BRAND.green2}!important;border-color:#cadbd8!important}
.asc-photo{background:transparent!important}.asc-photo:first-child:after{background:${BRAND.green2}!important;color:#fff!important}
.asc-overlay{background:rgba(22,78,74,.18)!important;background-image:none!important}
.asc-modal,.asc-menu{background:${BRAND.cream}!important;background-image:none!important;color:${BRAND.green}!important}
.asc-field input,.asc-field textarea,.asc-field select,.asc-policy-edit{background:transparent!important;background-image:none!important;color:${BRAND.green3}!important;border-color:#d9d0c9!important;outline:none!important;box-shadow:none!important;accent-color:${BRAND.green2}!important;caret-color:${BRAND.green2}!important;color-scheme:light!important}
.asc-field input:focus,.asc-field textarea:focus,.asc-field select:focus,.asc-policy-edit:focus{border-color:${BRAND.green2}!important;outline:1px solid ${BRAND.green2}!important;outline-offset:0!important;box-shadow:none!important}
.asc-field input[type="time"],.asc-field input[type="date"]{appearance:none!important;-webkit-appearance:none!important;color:${BRAND.green3}!important}
.asc-field input[type="time"]::-webkit-calendar-picker-indicator,.asc-field input[type="date"]::-webkit-calendar-picker-indicator{opacity:.7;filter:none!important}
.asc-actions button{background:transparent!important;color:${BRAND.green2}!important;border-color:${BRAND.green2}!important}.asc-actions .primary{background:${BRAND.green2}!important;color:#fff!important}
.asc-menu button{background:transparent!important;color:${BRAND.green3}!important}.asc-menu .danger{color:${BRAND.danger}!important}
.asc-help,.asc-service small,.asc-row .v{color:${BRAND.muted}!important}
`;document.head.appendChild(s)}
function clean(){inject();if(document.querySelector('.asc-page')){document.body.classList.add('amit-studio-settings-open')}else document.body.classList.remove('amit-studio-settings-open')}
new MutationObserver(clean).observe(document.documentElement,{childList:true,subtree:true});window.addEventListener('amit:settings-runtime-ready',clean);window.addEventListener('amit:settings-open',clean);clean();
})();