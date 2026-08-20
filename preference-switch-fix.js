(function(){
  const id='amit-preference-switch-center-fix';
  document.getElementById(id)?.remove();
  const style=document.createElement('style');
  style.id=id;
  const checkSvg=`data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18"><path d="M4.6 8.3 7.7 11.3 13.4 5.3" fill="none" stroke="#07584f" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`)}`;
  style.textContent=`
    #profile .preference-switch:before{content:none!important;display:none!important}
    #profile .preference-switch:after{
      content:''!important;
      position:absolute!important;
      top:50%!important;
      left:12px!important;
      width:18px!important;
      height:18px!important;
      margin:0!important;
      padding:0!important;
      transform:translate(-50%,-50%)!important;
      border-radius:50%!important;
      background:#fff center/18px 18px no-repeat!important;
      box-shadow:0 1px 4px rgba(0,0,0,.16)!important;
      transition:left .2s ease!important;
      z-index:2!important;
      box-sizing:border-box!important;
    }
    #profile .preference-switch[aria-checked="true"]:after{
      left:30px!important;
      background-image:url("${checkSvg}")!important;
    }
  `;
  document.head.appendChild(style);
})();