(function(){
  const id='amit-preference-switch-center-fix';
  document.getElementById(id)?.remove();
  const style=document.createElement('style');
  style.id=id;
  style.textContent=`
    #profile .preference-switch:before,#profile .preference-switch:after{content:none!important;display:none!important}
    #profile .preference-knob{display:grid!important;place-items:center!important}
    #profile .preference-knob svg{display:block!important;width:14px!important;height:14px!important;transform:translateY(-1.5px)!important;overflow:visible!important}
    #profile .preference-knob polyline{fill:none!important;stroke:#07584f!important;stroke-width:2.1!important;stroke-linecap:round!important;stroke-linejoin:round!important}
  `;
  document.head.appendChild(style);
})();