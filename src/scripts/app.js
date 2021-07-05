
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



  $('.grid-item').on('click',function(){
    var current = $(this).index();
    $('.gallery-slider').addClass('gallery-slider-active');
    $('.grid-layout').children('.grid-item ').each(function() {
      $('.gallery-slider-content .swiper-wrapper').append(
          '<div class="swiper-slide gallery-slider__item">'+
            '<img class="swiper-lazy" data-src="' + $(this).find('img').attr('src') + '">'+
            '<span class="slide-img-title">' + $(this).find('img').attr('alt') + '</span>'+
            '<div class="swiper-lazy-preloader swiper-lazy-preloader-white"></div>'+
          '</div>'
        );
    });
    var portfolio5 = new Swiper('.gallery-slider-content', {
      slidesPerView: 1,
      initialSlide:current,
      mousewheel: true,
      lazy:true,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
    $('.gallery-slider__close').on('click',function(){
      $('.gallery-slider').removeClass('gallery-slider-active');
      $('.gallery-slider-content .swiper-wrapper .swiper-slide').remove();
      portfolio5.destroy();
    });
  });
//------------------------------------- Before and After iamges


});
 //=========================== blog mansory===================================
$(window).on("load", function () {
  // blog:

  $(function(){
    $("#container1").twentytwenty();
  });
});
