(function(){
  const style=document.createElement('style');
  style.id='amit-booking-direction-fix';
  style.textContent=`
    #book .times{direction:rtl!important}
    #book .booking-month-nav{direction:ltr!important}
    #book .booking-month-nav>button:first-child{grid-column:1!important;font-size:0!important}
    #book .booking-month-nav>button:first-child:before{content:'‹'!important;font-size:23px!important}
    #book .booking-month-nav>.booking-month-title{grid-column:2!important}
    #book .booking-month-nav>button:last-child{grid-column:3!important;font-size:0!important}
    #book .booking-month-nav>button:last-child:before{content:'›'!important;font-size:23px!important}
  `;
  document.getElementById(style.id)?.remove();
  document.head.appendChild(style);
})();