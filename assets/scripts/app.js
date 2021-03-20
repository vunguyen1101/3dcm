
$(document).ready(function(){
  "use strict";   

  //================================= isotope filter tag ===================

  var content=$(".grid-layout"),tabs=$(".filter-tags span");
  tabs.on('click', function(){

    tabs.removeClass('active').filter(this).addClass('active');
    var filter=$(this).data('filter');
    
    content.isotope({
      filter: filter
    });
    return false;
  });




});
 //=========================== blog mansory===================================
$(window).on("load", function () {
  // blog:

});
