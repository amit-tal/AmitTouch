(function(){const id='amit-post-font-layout-fix';document.getElementById(id)?.remove();const s=document.createElement('style');s.id=id;s.textContent=`
#home .home-announcement-card{box-sizing:border-box!important;padding:18px 26px!important;min-height:0!important;direction:rtl!important}
#home .home-announcement-card>*{box-sizing:border-box!important;max-width:100%!important;margin-right:0!important;margin-left:0!important}
#home .home-announcement-head{width:100%!important;display:grid!important;grid-template-columns:minmax(0,1fr) auto!important;align-items:center!important;gap:18px!important;margin:0 0 8px!important;padding:0!important}
#home .home-announcement-head h3{min-width:0!important;margin:0!important;padding:0!important;text-align:right!important}
#home .home-announcement-age{position:static!important;inset:auto!important;transform:none!important;width:auto!important;min-width:max-content!important;margin:0!important;padding:0!important;text-align:left!important;justify-self:end!important}
#home .home-announcement-card p{width:100%!important;margin:0!important;padding:0!important;text-align:right!important;overflow-wrap:anywhere!important}
#detail,#extras,#book{overflow-x:hidden!important;overflow-y:auto!important;touch-action:pan-y!important;-webkit-overflow-scrolling:touch!important;overscroll-behavior-y:contain!important;scrollbar-width:none!important;padding-bottom:30px!important}
#detail::-webkit-scrollbar,#extras::-webkit-scrollbar,#book::-webkit-scrollbar{display:none!important;width:0!important;height:0!important}
#detail .service-detail-ref{padding-bottom:28px!important}#detail .service-detail-book{margin-bottom:14px!important}
`;document.head.appendChild(s);})();