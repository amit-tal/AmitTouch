(function(){
  const id='amit-preference-switch-center-fix';
  document.getElementById(id)?.remove();
  const style=document.createElement('style');
  style.id=id;
  const checkSvg=`data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18"><path d="M4.2 9.2 7.4 12.3 13.8 5.8" fill="none" stroke="#07584f" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`)}`;
  style.textContent=`
    #profile .preference-switch:before{content:none!important;display:none!important}
    #profile .preference-switch:after{
      content:''!important;
      position:absolute!important;
      top:3px!important;
      left:3px!important;
      width:18px!important;
      height:18px!important;
      border-radius:50%!important;
      background-color:#fff!important;
      background-image:none!important;
      background-position:center!important;
      background-repeat:no-repeat!important;
      background-size:14px 14px!important;
      box-shadow:0 1px 4px rgba(0,0,0,.16)!important;
      transition:left .2s ease!important;
      z-index:2!important;
    }
    #profile .preference-switch[aria-checked="true"]:after{
      left:21px!important;
      background-image:url("${checkSvg}")!important;
    }
  `;
  document.head.appendChild(style);
})();