// a태그 기본동작 방지
$(function () {
  $(document).on('click', 'a[href="#"]', function (e) {
    e.preventDefault();
  });
})

let gnbHeight = $('.nav-container .common-inner').outerHeight();
let lnbHeight = 0;

$('.link-gnb').on('mouseenter', function (e) {
  e.preventDefault();
  lnbHeight = $(this).parent().find('.lnb-list-wrap').outerHeight();
  $('.nav-container').css({
    'height': (gnbHeight + lnbHeight) + "px"
  });
  $('.nav-container').addClass('is-open');
  $(this).parent().addClass('is-active').siblings().removeClass('is-active');
})

$('.lnb-list-wrap').on('mouseleave', function (e) {
  e.preventDefault();
  $('.nav-container').removeAttr('style');
  $('.nav-container').removeClass('is-open');
  $('.gnb-item').removeClass('is-active');
})

// lang btn
$('.header .btn-lang').on('click', function() {
  $(this).parent().toggleClass('is-open');
  $('.header .lang-list').stop().slideToggle();

  if($(this).parent().hasClass('is-open')) {
    $(this).attr('aria-label', '언어선택 닫기');
  } else {
    $(this).attr('aria-label', '언어선택 열기');
  }
});

// zoom btn
let zoomValue = 1;
$('.header .btn-zoom.in').on('click', function() {
  const bodyEl = $('body');
  zoomValue = zoomValue + 0.1;

  bodyEl.css({
    'transform': `scale(${zoomValue})`,
    'transformOrigin': 'left top'
  });

  if(zoomValue === 1) {
    bodyEl.removeAttr('style');
  }
});

$('.header .btn-zoom.out').on('click', function() {
  const bodyEl = $('body');
  zoomValue = zoomValue - 0.1;

  bodyEl.css({
    'transform': `scale(${zoomValue})`,
    'transformOrigin': 'left top'
  });

  if(zoomValue === 1) {
    bodyEl.removeAttr('style');
  }
});

$('.footer .btn-related').unbind('click').bind('click', function () {
  const index = $(this).parent().index();

  if ($(this).parent().hasClass('is-active')) {
    $('.footer .site-list-wrap').stop().slideUp();
    $(this).parent().removeClass('is-active');
  } else {
    $('.footer .site-list-wrap').stop().slideUp();
    $('.footer .site-list-wrap').eq(index).stop().slideDown();
    $(this).parent().addClass('is-active').siblings().removeClass('is-active');
  }
});

const visualSlide = $('.section-visual .slide-wrapper');
visualSlide.slick({
  autoplay: true,
  infinite: true,
  prevArrow: $('.section-visual .btn-prev'),
  nextArrow: $('.section-visual .btn-next'),
  // dots: true,
  // dotsClass: 'page',
  // customPaging: function (slider, i) {

  //   const currentPage = String((i + 1)).padStart(2, '0')
  //   const totalPage = String(slider.slideCount).padStart(2,'0');

  //   return  '<span class="current">'+ currentPage +'</span><span class="gap">-</span><span class="total">' + totalPage + '</span>';
  // }
})
visualSlide.on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {

  const currentPage = String((currentSlide ? currentSlide : 0) + 1).padStart(2, '0')
  const totalPage = String(slick.slideCount).padStart(2, '0');

  // $('.section-visual .page').html("<span class='current'>"+currentPage+"</span><span> - " + "</span>" + "<span class='total'>" + totalPage +"</span>");

  $('.section-visual .page .current').html(`<span class="blind">현재 페이지</span>${currentPage}`);
  $('.section-visual .page .total').html(`<span class="blind">전체 페이지</span>${totalPage}`);
});

let slidePaused = false; //자동재생상태
$('.section-visual .btn-control').on('click', function () {
  // 정지상태라면
  if (slidePaused) {
    $('.btn-control').removeClass('pause');
    visualSlide.slick('slickPlay');
    $('.btn-control .blind').text('정지');
    slidePaused = false;
  } else {
    $('.btn-control').addClass('pause');
    visualSlide.slick('slickPause');
    $('.btn-control .blind').text('재생');
    slidePaused = true;
  }
});

// talk
new Swiper('.section-talk .swiper', {
  slidesPerView: 5,
  breakpoints: {
    391: {
      slidesPerView: 2
    },
    491: {
      slidesPerView: 3
    },
    621: {
      slidesPerView: 4
    },
    641: {
      slidesPerView: 'auto'
    }
  }
});

// shortcut
new Swiper('.section-shortcut .swiper', {
  slidesPerView: 8,
  navigation: {
    prevEl: '.section-shortcut .swiper-button-prev',
    nextEl: '.section-shortcut .swiper-button-next'
  }
});
// $('.section-shortcut .shortcut-list').slick({
//   autoplay: false,
//   dots: false,
//   slidesToShow: 8,
//   slidesToScroll: 1,
//   variableWidth: false,
//   infinite: false,
//   prevArrow: $('.section-shortcut .btn-prev'),
//   nextArrow: $('.section-shortcut .btn-next'),
//   pauseOnDotsHover: true,
//   swipe: false,
//   draggable: false,
//   responsive: [{
//       breakpoint: 1001,
//       settings: {
//         swipe: true,
//         draggable: true,
//         swipeToSlide: true,
//         slidesToShow: 6
//       }
//     },
//     {
//       breakpoint: 641,
//       settings: {
//         swipe: true,
//         draggable: true,
//         swipeToSlide: true,
//         slidesToShow: 4
//       }
//     },
//     {
//       breakpoint: 441,
//       settings: {
//         swipe: true,
//         draggable: true,
//         swipeToSlide: true,
//         slidesToShow: 3
//       }
//     }
//   ]
// })

// news
new Swiper('.section-news .swiper', {
  slidesPerView: 3,
  spaceBetween: 65,
  observer: true,
  observeParents: true,
});
// $('.section-news .news-list').slick({
//   autoplay: false,
//   dots: false,
//   slidesToShow: 3,
//   slidesToScroll: 1,
//   variableWidth: false,
//   infinite: false,
//   arrows: false,
//   pauseOnDotsHover: true,
//   swipe: false,
//   draggable: false,
//   responsive: [{
//       breakpoint: 1001,
//       settings: {
//         swipe: true,
//         draggable: true,
//         swipeToSlide: true,
//         slidesToShow: 2
//       }
//     },
//     {
//       breakpoint: 641,
//       settings: {
//         swipe: true,
//         draggable: true,
//         swipeToSlide: true,
//         variableWidth: true,
//         slidesToShow: 2
//       }
//     }
//   ]
// })

// event
new Swiper('.section-event .swiper', {
  loop: true,
  navigation: {
    prevEl: '.section-event .swiper-button-prev',
    nextEl: '.section-event .swiper-button-next',
  }
})

// $('.section-event .event-list').slick({
//   prevArrow: $('.section-event .btn-prev'),
//   nextArrow: $('.section-event .btn-next'),
//   pauseOnDotsHover: true,
//   swipe: false,
//   draggable: false,
//   responsive: [{
//     breakpoint: 1001,
//     settings: {
//       swipe: true,
//       draggable: true
//     }
//   }]
// })

new Swiper('.section-board [data-category="civicism"] .swiper', {
  navigation: {
    prevEl: '.section-board [data-category="civicism"] .swiper-button-prev',
    nextEl: '.section-board [data-category="civicism"] .swiper-button-next'
  },
  slidesPerView: 'auto',
  spaceBetween: 20,
  speed: 500,
  observer: true,
  observeParents: true,
})
new Swiper('.section-board [data-category="job"] .swiper', {
  navigation: {
    prevEl: '.section-board [data-category="job"] .swiper-button-prev',
    nextEl: '.section-board [data-category="job"] .swiper-button-next'
  },
  slidesPerView: 'auto',
  spaceBetween: 20,
  speed: 500,
  observer: true,
  observeParents: true,
})
new Swiper('.section-board [data-category="news"] .swiper', {
  navigation: {
    prevEl: '.section-board [data-category="news"] .swiper-button-prev',
    nextEl: '.section-board [data-category="news"] .swiper-button-next'
  },
  slidesPerView: 'auto',
  spaceBetween: 20,
  speed: 500,
  observer: true,
  observeParents: true,
})
new Swiper('.section-board [data-category="receipt"] .swiper', {
  navigation: {
    prevEl: '.section-board [data-category="receipt"] .swiper-button-prev',
    nextEl: '.section-board [data-category="receipt"] .swiper-button-next'
  },
  slidesPerView: 'auto',
  spaceBetween: 20,
  speed: 500,
  observer: true,
  observeParents: true,
})
new Swiper('.section-board [data-category="information"] .swiper', {
  navigation: {
    prevEl: '.section-board [data-category="information"] .swiper-button-prev',
    nextEl: '.section-board [data-category="information"] .swiper-button-next'
  },
  slidesPerView: 'auto',
  spaceBetween: 20,
  speed: 500,
  observer: true,
  observeParents: true,
})
new Swiper('.section-board [data-category="bulletin"] .swiper', {
  navigation: {
    prevEl: '.section-board [data-category="bulletin"] .swiper-button-prev',
    nextEl: '.section-board [data-category="bulletin"] .swiper-button-next'
  },
  slidesPerView: 'auto',
  spaceBetween: 20,
  speed: 500,
  observer: true,
  observeParents: true,
})

$('.section-board .tab-title button, .section-news .tab-title button').click(function () {
  $(this).parent().parent().addClass('is-active').siblings().removeClass('is-active');
})
