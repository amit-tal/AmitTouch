(function(){
  const style=document.createElement('style');
  style.id='amit-booking-direction-fix';
  style.textContent=`
    #book .times{direction:rtl!important}
    #book .booking-month-nav{direction:ltr!important}
    #book .booking-month-nav>button{position:relative!important;font-size:0!important;line-height:1!important;color:transparent!important;overflow:hidden!important}
    #book .booking-month-nav>button>*{display:none!important;visibility:hidden!important}
    #book .booking-month-nav>button::after{display:none!important;content:none!important}
    #book .booking-month-nav>button::before{display:block!important;position:absolute!important;inset:0!important;place-content:center!important;text-align:center!important;color:#315c57!important;font-size:25px!important;line-height:42px!important;font-weight:300!important}
    #book .booking-month-nav>button:first-child{grid-column:1!important}
    #book .booking-month-nav>button:first-child::before{content:'‹'!important}
    #book .booking-month-nav>.booking-month-title{grid-column:2!important}
    #book .booking-month-nav>button:last-child{grid-column:3!important}
    #book .booking-month-nav>button:last-child::before{content:'›'!important}
  `;
  document.getElementById(style.id)?.remove();
  document.head.appendChild(style);
})();