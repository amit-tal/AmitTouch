(function(){
  const id='amit-post-font-layout-fix';
  document.getElementById(id)?.remove();
  const s=document.createElement('style');
  s.id=id;
  s.textContent=`
    #home .home-announcement-card{
      padding-top:18px!important;
      padding-bottom:18px!important;
      padding-right:26px!important;
      padding-left:26px!important;
      min-height:0!important;
    }
    #home .home-announcement-head{
      display:grid!important;
      grid-template-columns:minmax(0,1fr) auto!important;
      align-items:center!important;
      gap:18px!important;
      margin:0 0 8px!important;
    }
    #home .home-announcement-age{
      position:static!important;
      left:auto!important;
      right:auto!important;
      top:auto!important;
      transform:none!important;
      width:auto!important;
      min-width:max-content!important;
      text-align:left!important;
      justify-self:end!important;
    }
    #home .home-announcement-card h3,
    #home .home-announcement-card p{
      max-width:100%!important;
      overflow-wrap:anywhere!important;
    }
    #detail{
      overflow-y:auto!important;
      overflow-x:hidden!important;
      overscroll-behavior-y:contain!important;
      scrollbar-width:none!important;
      padding-bottom:30px!important;
      -webkit-overflow-scrolling:touch!important;
    }
    #detail::-webkit-scrollbar{display:none!important;width:0!important;height:0!important}
    #detail .service-detail-ref{padding-bottom:28px!important}
    #detail .service-detail-book{margin-bottom:14px!important}
  `;
  document.head.appendChild(s);
})();