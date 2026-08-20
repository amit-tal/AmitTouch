(function(){
 const STYLE_ID='amit-static-pages-scroll-lock';
 document.getElementById(STYLE_ID)?.remove();
 const style=document.createElement('style');
 style.id=STYLE_ID;
 style.textContent=`
   #profile,#about,#services,#detail,#extras,#book{
     overflow:hidden!important;
     overflow-x:hidden!important;
     overflow-y:hidden!important;
     overscroll-behavior:none!important;
     touch-action:pan-x!important;
     scrollbar-width:none!important;
     -ms-overflow-style:none!important;
   }
   #profile::-webkit-scrollbar,#about::-webkit-scrollbar,#services::-webkit-scrollbar,#detail::-webkit-scrollbar,#extras::-webkit-scrollbar,#book::-webkit-scrollbar{display:none!important;width:0!important;height:0!important}
   body.amit-static-lock,html.amit-static-lock{overflow:hidden!important;overscroll-behavior:none!important;touch-action:none!important}
 `;
 document.head.appendChild(style);
 const ids=new Set(['profile','about','services','detail','extras','book']);
 const sync=()=>{
   const locked=[...ids].some(id=>document.getElementById(id)?.classList.contains('active'));
   document.documentElement.classList.toggle('amit-static-lock',locked);
   document.body.classList.toggle('amit-static-lock',locked);
 };
 const stop=e=>{
   const active=e.target?.closest?.('#profile.active,#about.active,#services.active,#detail.active,#extras.active,#book.active');
   if(active)e.preventDefault();
 };
 document.addEventListener('touchmove',stop,{passive:false});
 document.addEventListener('wheel',stop,{passive:false});
 new MutationObserver(sync).observe(document.body,{subtree:true,attributes:true,attributeFilter:['class']});
 sync();
})();