
$(document).ready(function(){
  "use strict";   
  var controller = new ScrollMagic.Controller();

  // blog-single-slider
  var swiper1 = new Swiper('.blog-content__slider', {
    navigation: {
      nextEl: '.blog-content__slider__next',
      prevEl: '.blog-content__slider__prev',
    },
    loop:true
  });

  var portfolio1_left = new Swiper('.portfolio-1__gall--left', {
    direction: 'vertical',
    loop:'true',
    controller: {
      control: portfolio1_right,
      inverse :true,
    },
    navigation: {
      nextEl: '.portfolio-1__arrow--down',
      prevEl: '.portfolio-1__arrow--up',

    },

  });
  var portfolio1_right = new Swiper('.portfolio-1__gall--right', {
    direction: 'vertical',
    loop:'true',
    controller: {
      control: portfolio1_left,
      inverse :true,
    },
    navigation: {
      nextEl: '.portfolio-1__arrow--down',
      prevEl: '.portfolio-1__arrow--up',
    },
  });
 
  // portfolio 2
  if ($('.portfolio-2').length > 0) { 
    // it exists 
    var portfolio2 = new Swiper('.portfolio-2', {
      pagination: {
        el: '.portfolio-2__pagination',
        type: 'bullets',
        clickable:'true'
      },
      loop:true
    });
    var slidesCount = portfolio2.slides.length - 2;
    var rangeStep  = 100/slidesCount;
    $('.portfolio-2').find(".swiper-pagination-bullet").css("width",rangeStep+"% ");
  }
// END portfolio 2

  // portfolio 3
  if ($('.portfolio-3').length > 0) { 
    var galleryThumbs = new Swiper('.portfolio-3__thumb', {
      direction: 'vertical',
      slidesPerView: 4,
      spaceBetween: 25,
      loop: true,
      freeMode: true,
      speed:700,
      // loopedSlides: 5, //looped slides should be the same
      watchSlidesVisibility: true,
      watchSlidesProgress: true,
    });
    var galleryTop = new Swiper('.portfolio-3__gallery', {
      direction: 'vertical',
      loop:true,
      slidesPerView: 1,
      speed:700,
      mousewheel: true,
      thumbs: {
        swiper: galleryThumbs,
      },
    });
  }
  // portfolio 4
  portfolio_create_gall()
  function portfolio_create_gall(){
    $('.portfolio-4__category h1').on('click',function(){
      $('.portfolio-4__category h1').removeClass('h1active');
      $('.portfolio-4__category h1').parent().find('.portfolio-4__category__gallery').removeClass('portfolio-4__gall-active');
      if($(this).attr('data-click-state') == 1) {
        $(this).attr('data-click-state', 0);
        $(this).removeClass('h1active');
        $(this).parent().find('.portfolio-4__category__gallery').removeClass('portfolio-4__gall-active');
      } else {
        $(this).addClass('h1active');
        $(this).attr('data-click-state', 1);
        $(this).parent().find('.portfolio-4__category__gallery').addClass('portfolio-4__gall-active');
        var portfolio4Gall = new Swiper('.portfolio-4__gall-active', {
          loop:'true',
          slidesPerView: 1,
          navigation: {
            nextEl: '.portfolio-4__category__gallery__arrow--right',
            prevEl: '.portfolio-4__category__gallery__arrow--left',
          },
        });
      }
      $('.portfolio-4__category h1').not('.h1active').attr('data-click-state', 0);

      function Por4curentIndex(){
        function geSlideDataIndex(){
          var activeIndex = portfolio4Gall.activeIndex;
          var slidesLen = portfolio4Gall.slides.length;
          if(portfolio4Gall.params.loop){
              switch(portfolio4Gall.activeIndex){
                  case 0:
                      activeIndex = slidesLen-3;
                      break;
                  case slidesLen-1:
                      activeIndex = 0;
                      break;
                  default:
                      --activeIndex;
              }
          }
          return (activeIndex)+1;
        }
        if(geSlideDataIndex() > 0 && geSlideDataIndex() < 10) {
          $('.swiper-counter__current').text('0'+geSlideDataIndex());
        }
        else $('.swiper-counter__current').text(geSlideDataIndex());
      }
      function port4Total(){
        var port4Total = portfolio4Gall.slides.length - 2;
        if(port4Total > 0 && port4Total < 10) return '0'+port4Total;
        else return port4Total
      }
      if ($('.portfolio-4__gall-active').length > 0){
        Por4curentIndex();
        portfolio4Gall.on('slideChange', function () {
          Por4curentIndex();
        });
        $('.swiper-counter__total').text(port4Total());
      } 
      
    });
  }

 // end portfolio 4

 //=================== portfolio 5
  porfolio5();
  function porfolio5(){
  $('.portfolio-5__item').on('click',function(){
    var current = $(this).index();
    $('.portfolio-5-slider').addClass('portfolio-5-slider-active');
    $('.portfolio-5').children('.portfolio-5__item').each(function() {
      $('.portfolio-5-image-detail .swiper-wrapper').append(
          '<div class="swiper-slide portfolio-5__slide-item">'+
            '<img class="swiper-lazy" data-src="' + $(this).find('img').attr('src') + '">'+
            '<div class="swiper-lazy-preloader swiper-lazy-preloader-white"></div>'+
          '</div>'
        );
    });
    var portfolio5 = new Swiper('.portfolio-5-image-detail', {
      slidesPerView: 1,
      initialSlide:current,
      lazy:true
    });
    $('.portfolio-5-slider__close').on('click',function(){
      $('.portfolio-5-slider').removeClass('portfolio-5-slider-active');
      $('.portfolio-5-image-detail .swiper-wrapper .swiper-slide').remove();
      portfolio5.destroy();
    });
  });
  }
  // masonry
  var port5_item_hs = $('.portfolio-5').width()/8;
  var port5_item_hl = $('.portfolio-5').width()/4;
  $('.portfolio-5__item--s').css("height",port5_item_hs+"px");
  $('.portfolio-5__item--l').css("height",port5_item_hl+"px");
  $('.portfolio-5').isotope({
    itemSelector: '.portfolio-5__item',
    masonry: {
    columnWidth: '.portfolio-5__item',
    }
  });
 //====================== end portfolio 5
//======================================== portfolio 6============================
  porfolio6('.portfolio-6');
  porfolio6('.portfolio-6--gall2');
  function porfolio6($greatGrid){
    $($greatGrid+'__item').on('click',function(){
      var current = $(this).index();
      $('.portfolio-5-slider').addClass('portfolio-5-slider-active');
      $($greatGrid).children($greatGrid+'__item').each(function() {
        $('.portfolio-5-image-detail .swiper-wrapper').append(
            '<div class="swiper-slide portfolio-5__slide-item">'+
              '<img class="swiper-lazy" data-src="' + $(this).attr("data-src")+ '">'+
              '<div class="swiper-lazy-preloader swiper-lazy-preloader-white"></div>'+
            '</div>'
          );
      });
      var portfolio5 = new Swiper('.portfolio-5-image-detail', {
        slidesPerView: 1,
        initialSlide:current,
        lazy:true
      });
      $('.portfolio-5-slider__close').on('click',function(){
        $('.portfolio-5-slider').removeClass('portfolio-5-slider-active');
        $('.portfolio-5-image-detail .swiper-wrapper .swiper-slide').remove();
        portfolio5.destroy();
      });
    });
  }
  toogleClassDisplay('.portfolio-6','port6-active','.port6next','.port6prev','port-6-animating',1000);
  function toogleClassDisplay($gallItem,$class,$next,$prev,$classout,$timimg){
    $($next).on('click',function(e){
      e.preventDefault();
      var active = $($gallItem+'.'+$class);
      //add class hide item 
      active.addClass($classout);
      ///remoce current 
      setTimeout(function(){
        active.removeClass($class);
      }, $timimg);
      if(active.next() && active.next().length){
        setTimeout(function(){
          active.next().addClass($class);
        }, $timimg);
      }
      else{
        setTimeout(function(){
          active.siblings(":first").addClass($class);
        }, $timimg);
      } 
      setTimeout(function(){
        active.removeClass($classout);
      }, $timimg+200);
    });
    $($prev).on('click',function(e){
      e.preventDefault();
      var active = $($gallItem+'.'+$class);
      active.addClass($classout);
      setTimeout(function(){
        active.removeClass($class);
      }, $timimg);
      if(active.prev() && active.prev().length){ 
        setTimeout(function(){
          active.prev().addClass($class);
        }, $timimg);
      }
      else{
        setTimeout(function(){
          active.siblings(":last").addClass($class);
        }, $timimg);
      } 
      setTimeout(function(){
        active.removeClass($classout);
      }, $timimg+200);
    });
  }

  
//===================================== end portfolio 6 ==========================================

//===================================== portfolio 7 ===============================================
  var galleryPort7 = new Swiper('.portfolio-7', {
    loop:true,
    // direction: 'vertical',
    spaceBetween: 200,
    slidesPerView: 1,
    mousewheel: true,
    pagination: {
      el: '.portfolio-7__pagination',
      type: 'progressbar',
    },
  });
  // get curent and total silde
  function getSlideDataIndex(port){
    var activeIndex = port.activeIndex;
    var slidesLen = port.slides.length;
    if(port.params.loop){
      switch(port.activeIndex){
        case 0:
          activeIndex = slidesLen-3;
          break;
        case slidesLen-1:
          activeIndex = 0;
          break;
        default:
          --activeIndex;
      }
    }
    return (activeIndex)+1;
  }
  function portfolioTotal(port){
    if(port){
      var port = port.slides.length - 2;
      if(port > 0 && port < 10) return '0'+port;
      else return port
    } 
  }
  function FigureOutPort(port,$curent,$total){
    if(port){
      $($total).text(portfolioTotal(port));
      if(getSlideDataIndex(port) > 0 && getSlideDataIndex(port) < 10) {
        $($curent).text('0'+getSlideDataIndex(port));
      }
      else $($curent).text(geSlideDataIndex7(port));
      port.on('slideChange', function () {
        if(getSlideDataIndex(port) > 0 && getSlideDataIndex(port) < 10) {
          $($curent).text('0'+getSlideDataIndex(port));
        }
        else $($curent).text(geSlideDataIndex7(port));
      });
    }
  }
  function ImgDetailSlide7(){
    $('.portfolio-7__category__slide-item').on('click',function(){
      var current = $(this).index();
      $('.portfolio-7__category__img-detail').addClass('portfolio-7__category__img-detail--active');
      $('.portfolio-7__category-gall .swiper-wrapper').children('.portfolio-7__category__slide-item').each(function() {
        $('.portfolio-7__category__img-detail .swiper-wrapper').append(
            '<div class="swiper-slide portfolio-7__category__img-detail__item">'+
              '<img class="swiper-lazy" data-src="' + $(this).find('img').data('src') + '">'+
              '<div class="swiper-lazy-preloader swiper-lazy-preloader-white"></div>'+
            '</div>'
          );
      });
      var portfolio72 = new Swiper('.portfolio-7__category__img-detail', {
        slidesPerView: 1,
        initialSlide:current,
        lazy:true,
        mousewheel: true,
      });
      $('.portfolio-7__category__img-detail__close').on('click',function(){
       $('.portfolio-7__category__img-detail').removeClass('portfolio-7__category__img-detail--active');
       $('.portfolio-7__category__img-detail .swiper-wrapper .swiper-slide').remove();
       portfolio72.destroy();
     });
    });
  }
  if($('.portfolio-7').length > 0){
    FigureOutPort(galleryPort7,'.portfolio-7__gall__arrow--current','.portfolio-7__gall__arrow--total');
  }
  /// create categoti slider img 
  $('.portfolio-7__item__thumb').on('click',function(){ 
    $('.portfolio-7__category-gall-area').addClass('active-categoty-slider7');
    $(this).find('.portfolio-7__category-data-src').children('a').each(function() {
      $('.portfolio-7__category-gall .swiper-wrapper').append(
        '<div class="swiper-slide portfolio-7__category__slide-item">'+
          '<img class="fit-img" data-src="'+$(this).data("thumb")+'" src="' + $(this).attr("href")+ '">'+
        '</div>'
      );
    });
    var portfolio7 = new Swiper('.portfolio-7__category-gall', {
      slidesPerView: 3,
      spaceBetween:20,
      mousewheel: true,
      centeredSlides: true,
      initialSlide: 1,
    });
    $('.portfolio-7-slider__close').on('click',function(){
      $('.portfolio-7__category-gall-area').removeClass('active-categoty-slider7');
      $('.portfolio-7__category-gall .swiper-wrapper .swiper-slide').remove();
      portfolio7.destroy();
    });
    //img detail
    ImgDetailSlide7();
  });

//===================================== end portfolio 7 ==========================================

//===================================== portfolio 8 ===============================================
/// create categoti slider img 
  $('.portfolio-8__item:not(.portfolio-8__item--text)').on('click',function(){ 
    $('.portfolio-8__category-gall-area').addClass('active-categoty-slider8');
    $(this).find('.portfolio-8__category-data-src').children('a').each(function() {
      $('.portfolio-8__category-gall .swiper-wrapper').append(
        '<div class="swiper-slide portfolio-8__category__slide-item">'+
          '<img  data-src="'+$(this).data("imgdetail")+'" src="' + $(this).attr("href")+ '">'+
        '</div>'
      );
    });
    var portfolio8 = new Swiper('.portfolio-8__category-gall', {
      slidesPerView: 'auto',
      spaceBetween:30,
      mousewheel: true,
      centeredSlides: true,
      initialSlide: 1,
      keyboard: {
        enabled: true,
      },
    });
    $('.portfolio-8-slider__close').on('click',function(){
      $('.portfolio-8__category-gall-area').removeClass('active-categoty-slider8');
      $('.portfolio-8__category-gall .swiper-wrapper .swiper-slide').remove();
      portfolio8.destroy();
    });
    // img detail
    ImgDetailSlide8();
  });
  function ImgDetailSlide8(){
    $('.portfolio-8__category__slide-item').on('click',function(){
      var current = $(this).index();
      $('.porfolio-8__gallery-detail').addClass('portfolio-8__category__img-detail--active');
      $('.portfolio-8__category-gall .swiper-wrapper').children('.portfolio-8__category__slide-item').each(function() {
        $('.portfolio-8__category__img-detail .swiper-wrapper').append(
          '<div class="swiper-slide portfolio-8__category__img-detail__item">'+
            '<img class="swiper-lazy" data-src="' + $(this).find('img').data('src') + '">'+
            '<div class="swiper-lazy-preloader swiper-lazy-preloader-white"></div>'+
          '</div>'
        );
          // apend thumb
        $('.portfolio-8__category__img-detail--thumb .swiper-wrapper').append(
          '<div class="swiper-slide portfolio-8__category__thumb-item">'+
            '<img class="fit-img" src="' + $(this).find('img').attr('src') + '">'+
          '</div>'
        );
      });
      var galleryThumbs8 = new Swiper('.portfolio-8__category__img-detail--thumb', {
        spaceBetween: 20,
        slidesPerView: 7,
        loop: true,
        freeMode: true,
        loopedSlides: 7, //looped slides should be the same
        watchSlidesVisibility: true,
        watchSlidesProgress: true,
        mousewheel: true,
      });
      var portfolio82 = new Swiper('.portfolio-8__category__img-detail', {
        slidesPerView: 1,
        initialSlide:current,
        lazy:true,
        loop: true,
        mousewheel: true,
        thumbs: {
          swiper: galleryThumbs8,
        },
      }); 
      $('.portfolio-7__category__img-detail__close').on('click',function(){
       $('.porfolio-8__gallery-detail').removeClass('portfolio-8__category__img-detail--active');
       $('.portfolio-8__category__img-detail .swiper-wrapper .swiper-slide').remove();
       $('.portfolio-8__category__img-detail--thumb .swiper-wrapper .swiper-slide').remove();
       portfolio82.destroy();
       galleryThumbs8.destroy();
     });
    });
  }
//===================================== end portfolio 8 ==========================================

//===================================== portfolio 9 ===============================================
  // sort z-index
  for (var i = $('.portfolio-9__item').length+1; i > 0  ; i--) {
    $('.portfolio-9__item:nth-child('+i+')').css({'z-index':$('.portfolio-9__item').length+1 - i});
  }
  // wheel img control 
  (function(window,document) {
    var prefix = "", _addEventListener, onwheel, support;
    // detect event model
    if ( window.addEventListener ) {
        _addEventListener = "addEventListener";
    } else {
        _addEventListener = "attachEvent";
        prefix = "on";
    }
    // detect available wheel event
    support = "onwheel" in document.createElement("div") ? "wheel" : // Modern browsers support "wheel"
              document.onmousewheel !== undefined ? "mousewheel" : // Webkit and IE support at least "mousewheel"
              "DOMMouseScroll"; // let's assume that remaining browsers are older Firefox
    window.addWheelListener = function( elem, callback, useCapture ) {
        _addWheelListener( elem, support, callback, useCapture );
        // handle MozMousePixelScroll in older Firefox
        if( support == "DOMMouseScroll" ) {
            _addWheelListener( elem, "MozMousePixelScroll", callback, useCapture );
        }
    };
    function _addWheelListener( elem, eventName, callback, useCapture ) {
      elem[ _addEventListener ]( prefix + eventName, support == "wheel" ? callback : function( originalEvent ) {
        !originalEvent && ( originalEvent = window.event );
        // create a normalized event object
        var event = {
          // keep a ref to the original event object
          originalEvent: originalEvent,
          target: originalEvent.target || originalEvent.srcElement,
          type: "wheel",
          deltaMode: originalEvent.type == "MozMousePixelScroll" ? 0 : 1,
          deltaX: 0,
          delatZ: 0,
          preventDefault: function() {
            originalEvent.preventDefault ? originalEvent.preventDefault() : originalEvent.returnValue = false;
          }
        };  
        // calculate deltaY (and deltaX) according to the event
        if ( support == "mousewheel" ) {
            event.deltaY = - 1/40 * originalEvent.wheelDelta;
            // Webkit also support wheelDeltaX
            originalEvent.wheelDeltaX && ( event.deltaX = - 1/40 * originalEvent.wheelDeltaX );
        } else {
            event.deltaY = originalEvent.detail;
        }
        return callback( event );
      }, useCapture || false );
    }
  })(window,document);
  if($('.portfolio-9-area').length > 0){
    var tl = new TimelineMax(); 
    var itemlength = document.getElementById("port9").childElementCount;
    tl.to('.portfolio-9__item:nth-child(1)', 3, {x:"-50%",y:"-250%", ease: 'Linear.easeNone'},0);
    for (var i = 1; i < itemlength ; i++){
      tl.to('.portfolio-9__item:nth-child('+(i+1)+')', 3, {x:"-50%",y:"-250%", ease: 'Linear.easeNone'},(3*i));
    }
    tl.pause();
    tl.timeScale(1);
    addWheelListener(document.body, function(e) { 
      var progress = tl.progress();
      var progressStep;
      var newTime;
      // e.preventDefault();
      if (e.deltaY < 0) {
        progressStep = e.deltaY/1800;
      } else if (e.deltaY > 0) {
        progressStep = e.deltaY/1800;
      }
      newTime = (progress+progressStep)*tl.duration();
      if (newTime < 0) newTime = 0;
      tl.pause();
      tl.tweenTo(newTime, { ease:Strong.easeOut});
    });
  }
  //end wheel img control
  $('.portfolio-9__item').on('click',function(){ 
    $('.portfolio-9__img-detail').addClass('active-port9-detail');
    $(this).find('.portfolio-9__item__info .portfolio-9__item__imglist').children('a').each(function() {
      $('.portfolio-9__img-detail .swiper-wrapper').append(
        '<div class="swiper-slide portfolio-9__img-detail__item">'+
          '<img class="swiper-lazy" data-src="' +$(this).attr("href")+ '">'+
          '<div class="swiper-lazy-preloader swiper-lazy-preloader-white"></div>'+
        '</div>'
      );
    });
    var portfolio9 = new Swiper('.portfolio-9__img-detail', {
      slidesPerView: 1,
      mousewheel: true,
      centeredSlides: true,
      initialSlide: 0,
      lazy:true,
      keyboard: {
        enabled: true,
      },
    });
    $('.portfolio-9-slider__close__btn').on('click',function(){
      $('.portfolio-9__img-detail').removeClass('active-port9-detail');
      $('.portfolio-9__img-detail .swiper-wrapper .swiper-slide').remove();
      portfolio9.destroy();
    });
  });
//===================================== end portfolio 9 ==========================================

//=====================================  portfolio 10 ==========================================
  var galleryThumbs10 = new Swiper('.portfolio-10__thumbs', {
    spaceBetween: 15,
    slidesPerView: 10,
    speed:900,
    loop: true,
    freeMode: true,
    loopedSlides: 10, //looped slides should be the same
    watchSlidesVisibility: true,
    watchSlidesProgress: true,
    mousewheel: true,
  }); 
  var portfolio10 = new Swiper('.portfolio-10', {
    slidesPerView: 1,
    loop: true,
    mousewheel: true,
    thumbs: {
      swiper: galleryThumbs10,
    },
    navigation: {
      nextEl: '.portfolio-10__arrow--right',
      prevEl: '.portfolio-10__arrow--left',
    },
  }); 
  
//===================================== end portfolio 10 ==========================================

//===================================== about me ===============================================

  if ($('.aboutme-area').length > 0) { 
    // it exists 
    var aboutme = new Swiper('.aboutme-area', {
      loop:true
    });
    $('.aboutme__arrow--left').on('click',function(){
      aboutme.slidePrev();
    });
    $('.aboutme__arrow--right').on('click',function(){
      aboutme.slideNext();
    });
  }
  CounterUp('#process1');
  CounterUp('#process2');
  CounterUp('#process3');
  CounterUp('#process4');
  CounterUp('#process5');
  function CounterUp($processbar){
    var target = $($processbar+' input').attr('value');   
    anime({
      targets: $processbar+' input',
      value: [0, target],
      round: 1,
      easing: 'cubicBezier(.44,.57,.5,1.16)',
      duration:1800
    });
    anime({
      targets: $processbar,
      width: [
        { value: 0, easing: 'cubicBezier(.44,.57,.5,1.16)' },
        { value: ''+target+'%', easing: 'cubicBezier(.44,.57,.5,1.16)' }
      ],
      easing: 'cubicBezier(.44,.57,.5,1.16)',
      duration:1300,
    });
    
  }
  // create radial process
    var circle = document.querySelector('.progress-ring__circle');
    var radius = circle.r.baseVal.value;
    var circumference = radius * 2 * Math.PI;

    circle.style.strokeDasharray = `${circumference} ${circumference}`;
    circle.style.strokeDashoffset = `${circumference}`;

    function setProgress(percent) {
      const offset = circumference - percent / 100 * circumference;
      circle.style.strokeDashoffset = offset;
    }
    const input = document.querySelector('input');
    setProgress(input.value);

    input.addEventListener('change', function(e) {
      if (input.value < 101 && input.value > -1) {
        setProgress(input.value);
      }  
    })
//===================================== end about me ===============================================


});
 //=========================== blog mansory===================================
$(window).on("load", function () {
  // blog:

  $('.blog-mansory-layout__posts').isotope({
    itemSelector: '.blog-post-3',
    mansory: {
    columnWidth: '.blog-post-3',
    horizontalOrder: true,
    gutter:20
    }
  });

  // porfolio:
  $('.portfolio-5').isotope({
    itemSelector: '.portfolio-5__item',
    mansory: {
    columnWidth: '.portfolio-5__item',
    }
  });

  $('.portfolio-8').isotope({
    layoutMode: 'packery',
    itemSelector: '.portfolio-8__item',
  });

});
