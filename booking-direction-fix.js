(function(){
  const style=document.createElement('style');
  style.id='amit-booking-direction-fix';
  style.textContent=`
    #book .times{direction:rtl!important}
    #book .booking-month-nav{direction:ltr!important}
    #book .booking-month-nav>button{font-size:0!important;line-height:1!important}
    #book .booking-month-nav>button::before,#book .booking-month-nav>button::after{display:none!important;content:none!important}
    #book .booking-month-nav>button:first-child{grid-column:1!important}
    #book .booking-month-nav>button:first-child::after{display:block!important;content:'‹'!important;font-size:23px!important}
    #book .booking-month-nav>.booking-month-title{grid-column:2!important}
    #book .booking-month-nav>button:last-child{grid-column:3!important}
    #book .booking-month-nav>button:last-child::after{display:block!important;content:'›'!important;font-size:23px!important}
  `;
  document.getElementById(style.id)?.remove();
  document.head.appendChild(style);
})();