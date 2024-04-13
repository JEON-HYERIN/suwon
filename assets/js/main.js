// a태그 기본동작 방지
$(function () {
  $(document).on('click', 'a[href="#"]', function (e) {
    e.preventDefault();
  });
})

// navigation
let gnbHeight = $('.nav-container .common-inner').outerHeight();
let lnbHeight = 0;
let navIndex = 0;

$('.link-gnb').on('mouseenter focusin', function () {
  navIndex = $(this).parent().index();

  openNav(navIndex);
})

// 첫 번째 gnb 까지 shift + tab 키 누르면 네비게이션 닫히게 하기
$('.link-gnb').on('keydown', function(e) {
  navIndex = $(this).parent().index();

  if(e.keyCode === 9 && e.shiftKey) {
    if(navIndex === 0) {
      closeNav();
    }
  }
})

$('.lnb-list-wrap').on('mouseleave', closeNav);

$('.header .lnb-item:first-child .link-lnb').on('keydown', function(e) {
  navIndex =$(this).parents('.gnb-item').index();

  if(e.keyCode === 9 && e.shiftKey) {
    if(navIndex === 0) {
      closeNav();
    } else {
      openNav(navIndex - 1);
    }
  }
});

$('.header .lnb-item:last-child .link-lnb').on('keydown', function(e) {
  navIndex =$(this).parents('.gnb-item').index();
  const navTotal = $('.gnb-item').length;

  if(e.keyCode === 9 && !e.shiftKey) {
    if((navIndex + 1) === navTotal) {
      closeNav();
    } else {
      openNav(navIndex + 1);
    }
  }
});

function openNav(navIndex) {
  lnbHeight = $('.gnb-item').eq(navIndex).find('.lnb-list-wrap').outerHeight();
  
  $('.nav-container').css({
    'height': (gnbHeight + lnbHeight) + 'px'
  });
  $('.nav-container').addClass('is-open');
  $('.gnb-item').eq(navIndex).addClass('is-active').siblings().removeClass('is-active');
}

function closeNav() {
  $('.nav-container').removeAttr('style');
  $('.nav-container').removeClass('is-open');
  $('.gnb-item').removeClass('is-active');
}

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

$('.footer .site-item:first-child .link-site').on('keydown', function(e) {
  if(e.keyCode === 9 && e.shiftKey) {
    $('.site-list-wrap').stop().slideUp();
  }
});

$('.footer .site-item:last-child .link-site').on('keydown', function(e) {
  if(e.keyCode === 9 && !e.shiftKey) {
    $('.site-list-wrap').stop().slideUp();
  }
});

// visual
const visualSwiper = new Swiper('.section-visual .swiper', {
  loop: true,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
  navigation: {
    prevEl: '.section-visual .btn-prev',
    nextEl: '.section-visual .btn-next'
  },
  pagination: {
    el: '.section-visual .page',
    type: 'fraction',
    formatFractionCurrent: function (number) {
        return ('0' + number).slice(-2);
    },
    formatFractionTotal: function (number) {
        return ('0' + number).slice(-2);
    },
    renderFraction: function (currentClass, totalClass) {
        return `
        <span class="current">
          <span class="blind">현재 페이지</span>
          <span class=${currentClass}></span>
        </span>
        -
        <span class="total">
          <span class="blind">전체 페이지</span>
          <span class=${totalClass}></span>
        </span>
        `;
    }
},
});

let slidePaused = false; //자동재생상태
$('.section-visual .btn-control').on('click', function () {
  // 정지상태라면
  if (slidePaused) {
    $('.btn-control').removeClass('pause');
    $('.btn-control .blind').text('정지');
    visualSwiper.autoplay.start();
    slidePaused = false;
  } else {
    $('.btn-control').addClass('pause');
    $('.btn-control .blind').text('재생');
    visualSwiper.autoplay.stop();
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
    prevEl: '.section-shortcut .btn-prev',
    nextEl: '.section-shortcut .btn-next'
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
    prevEl: '.section-event .btn-prev',
    nextEl: '.section-event .btn-next',
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
    prevEl: '.section-board [data-category="civicism"] .btn-prev',
    nextEl: '.section-board [data-category="civicism"] .btn-next'
  },
  slidesPerView: 'auto',
  spaceBetween: 20,
  speed: 500,
  observer: true,
  observeParents: true,
})
new Swiper('.section-board [data-category="job"] .swiper', {
  navigation: {
    prevEl: '.section-board [data-category="job"] .btn-prev',
    nextEl: '.section-board [data-category="job"] .btn-next'
  },
  slidesPerView: 'auto',
  spaceBetween: 20,
  speed: 500,
  observer: true,
  observeParents: true,
})
new Swiper('.section-board [data-category="news"] .swiper', {
  navigation: {
    prevEl: '.section-board [data-category="news"] .btn-prev',
    nextEl: '.section-board [data-category="news"] .btn-next'
  },
  slidesPerView: 'auto',
  spaceBetween: 20,
  speed: 500,
  observer: true,
  observeParents: true,
})
new Swiper('.section-board [data-category="receipt"] .swiper', {
  navigation: {
    prevEl: '.section-board [data-category="receipt"] .btn-prev',
    nextEl: '.section-board [data-category="receipt"] .btn-next'
  },
  slidesPerView: 'auto',
  spaceBetween: 20,
  speed: 500,
  observer: true,
  observeParents: true,
})
new Swiper('.section-board [data-category="information"] .swiper', {
  navigation: {
    prevEl: '.section-board [data-category="information"] .btn-prev',
    nextEl: '.section-board [data-category="information"] .btn-next'
  },
  slidesPerView: 'auto',
  spaceBetween: 20,
  speed: 500,
  observer: true,
  observeParents: true,
})
new Swiper('.section-board [data-category="bulletin"] .swiper', {
  navigation: {
    prevEl: '.section-board [data-category="bulletin"] .btn-prev',
    nextEl: '.section-board [data-category="bulletin"] .btn-next'
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
