// a태그 기본동작 방지
$(function () {
  $(document).on('click', 'a[href="#"]', function (e) {
    e.preventDefault();
  });
})

// navigation
const gnbHeight = $('.header .nav-container .common-inner').outerHeight();
let lnbHeight = 0;
let navIndex = 0;

desktopNav();

function desktopNav() {
  const windowWidth = $(window).width();

  $('.header .link-gnb').on('mouseenter focus', function () {
    if (windowWidth >= 1001) {
      navIndex = $(this).parent().index();

      openNav(navIndex);
    } else {
      closeNav();
    }
  })

  $('.header .link-gnb:first-child').on('keydown', function (e) {
    if (windowWidth >= 1001) {
      if (e.key === 'Tab' && e.shiftKey) {
        closeNav(); 
      }
    } else {
      closeNav();
    }
  })

  $('.header .lnb-list-wrap').on('mouseleave', closeNav);

  $('.header .lnb-item:first-child .link-lnb').on('keydown', function (e) {
    if (windowWidth >= 1001) {
      navIndex = $(this).parents('.gnb-item').index();

      if (e.key === 'Tab' && e.shiftKey) {
        if (navIndex === 0) {
          closeNav();
        } else {
          openNav(navIndex - 1);
        }
      }
    } else {
      closeNav();
    }
  });

  $('.header .lnb-item:last-child .link-lnb').on('keydown', function (e) {
    if (windowWidth >= 1001) {
      navIndex = $(this).parents('.gnb-item').index();
      const navTotal = $('.header .gnb-item').length;

      if (e.key === 'Tab' && !e.shiftKey) {
        if ((navIndex + 1) === navTotal) {
          closeNav();
        } else {
          openNav(navIndex + 1);
        }
      }
    } else {
      closeNav();
    }
  });
}

function openNav(navIndex) {
  const windowWidth = $(window).width();
  lnbHeight = $('.header .gnb-item').eq(navIndex).find('.lnb-list-wrap').outerHeight();

  if (windowWidth >= 1001) {
    $('.header .nav-container').css({
      'height': (gnbHeight + lnbHeight) + 'px'
    });
    $('.header .nav-container').addClass('is-open');
    $('.header .gnb-item').eq(navIndex).addClass('is-active').siblings().removeClass('is-active');
  }
}

function closeNav() {
  const windowWidth = $(window).width();
  
  if (windowWidth >= 1001) {
    $('.header .nav-container').removeAttr('style');
    $('.header .nav-container').removeClass('is-open');
    $('.header .gnb-item').removeClass('is-active');
  }
}

$('.header .btn-nav').on('click', function () {
  const windowWidth = $(window).width();

  $('body').addClass('is-nav-open');
});
$('.header .btn-close-nav').on('click', function () {
  const windowWidth = $(window).width();

  $('body').removeClass('is-nav-open');
});

$(window).on('resize', function () {
  const windowWidth = $(window).width();
  desktopNav();
  checkHasSiteList();
  if (windowWidth >= 1001) {
    $('body').removeClass('is-nav-open');
    $('.header .lnb-item').removeClass('is-active');
    $('.header .site-list').removeAttr('style');
    $('.header .gnb-item').removeClass('is-active');
  } else {
    $('.header .nav-container').removeAttr('style');
    $('.header .nav-container').removeClass('is-open');
  }
});

checkHasSiteList();

function checkHasSiteList() {
  const windowWidth = $(window).width();

  if (windowWidth <= 1000) {
    $('.header .link-lnb').each(function (index, el) {
      if ($(el).next().hasClass('site-list')) {
        $(el).parent().addClass('has-sub-menu');
      }
    });
  } else {
    $('.header .lnb-item').removeClass('has-sub-menu');
  }
}

$('.header .link-gnb').on('click', function () {
  const windowWidth = $(window).width();

  if (windowWidth <= 1000) {
    $(this).parent().addClass('is-active').siblings().removeClass('is-active');
  }
});

$('.header .link-lnb').on('click', function () {
  const windowWidth = $(window).width();

  if (windowWidth <= 1000) {
    if ($(this).parent().hasClass('is-active')) {
      $('.header .site-list').stop().slideUp();
      $(this).parent().removeClass('is-active');
    } else {
      $('.header .site-list').stop().slideUp();
      $(this).next().stop().slideToggle();
      $(this).parent().addClass('is-active').siblings().removeClass('is-active');
    }
  }
});

// lang btn
$('.header .btn-lang').on('click', function () {
  $(this).parent().toggleClass('is-open');
  $('.header .lang-list').stop().slideToggle();

  if ($(this).parent().hasClass('is-open')) {
    $(this).attr('aria-label', '언어선택 닫기');
  } else {
    $(this).attr('aria-label', '언어선택 열기');
  }
});

$('.header .lang-item:first-child .link-lang').on('keydown', function (e) {
  if (e.key === 'Tab' && e.shiftKey) {
    closeLangList();
  }
});

$('.header .lang-item:last-child .link-lang').on('keydown', function (e) {
  if (e.key === 'Tab' && !e.shiftKey) {
    closeLangList();
  }
});

function closeLangList() {
  $('.header .service-item.lang').removeClass('is-open');
  $('.lang-list').stop().slideUp();
  $('.header .btn-lang').attr('aria-label', '언어선택 열기');
}

// zoom btn
let zoomValue = 1;
$('.header .btn-zoom.in').on('click', function () {
  const bodyEl = $('body');
  zoomValue = zoomValue + 0.1;

  bodyEl.css({
    'transform': `scale(${zoomValue})`,
    'transformOrigin': 'left top'
  });

  if (zoomValue === 1) {
    bodyEl.removeAttr('style');
  }
});

$('.header .btn-zoom.out').on('click', function () {
  const bodyEl = $('body');
  zoomValue = zoomValue - 0.1;

  bodyEl.css({
    'transform': `scale(${zoomValue})`,
    'transformOrigin': 'left top'
  });

  if (zoomValue === 1) {
    bodyEl.removeAttr('style');
  }
});

// footer related-list
let relatedIndex = 0;
$('.footer .btn-related').unbind('click').bind('click', function () {
  relatedIndex = $(this).parent().index();

  if ($(this).parent().hasClass('is-active')) {
    closeRelatedList(relatedIndex);
  } else {
    openRelatedList(relatedIndex);
  }
});

$('.footer .site-item:first-child .link-site').on('keydown', function (e) {
  if (e.key === 'Tab' && e.shiftKey) {
    closeRelatedList(relatedIndex);
  }
});

$('.footer .site-item:last-child .link-site').on('keydown', function (e) {
  if (e.key === 'Tab' && !e.shiftKey) {
    closeRelatedList(relatedIndex);
  }
});

function openRelatedList(relatedIndex) {
  $('.footer .site-list-wrap').stop().slideUp();
  $('.footer .site-list-wrap').eq(relatedIndex).stop().slideDown();
  $('.related-item').eq(relatedIndex).addClass('is-active').siblings().removeClass('is-active');
}

function closeRelatedList(relatedIndex) {
  $('.footer .site-list-wrap').stop().slideUp();
  $('.related-item').eq(relatedIndex).removeClass('is-active');
}

$(window).on('resize', function() {
  $('.footer .site-list-wrap').removeAttr('style');
  $('.related-item').removeClass('is-active');
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
      return String(number).padStart(2, '0');
    },
    formatFractionTotal: function (number) {
      return String(number).padStart(2, '0');
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
  }
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
  slidesPerView: 'auto',
  spaceBetween: 25,
  breakpoints: {
    641: {
      slidesPerView: 'auto',
      spaceBetween: 22,
    },
    1001: {
      slidesPerView: 5,
      spaceBetween: 'auto'
    }
  }
});

// shortcut
new Swiper('.section-shortcut .swiper', {
  slidesPerView: 3,
  navigation: {
    prevEl: '.section-shortcut .btn-prev',
    nextEl: '.section-shortcut .btn-next',
  },
  breakpoints: {
    441: {
      slidesPerView: 4
    },
    641: {
      slidesPerView: 6
    },
    1001: {
      slidesPerView: 8
    }
  }
});

// news
new Swiper('.section-news .swiper', {
  slidesPerView: 'auto',
  spaceBetween: 40,
  observer: true,
  observeParents: true,
  breakpoints: {
    641: {
      slidesPerView: 2,
      spaceBetween: 20
    },
    1001: {
      slidesPerView: 3,
      spaceBetween: 65,
    }
  }
});

// event
new Swiper('.section-event .swiper', {
  loop: true,
  navigation: {
    prevEl: '.section-event .btn-prev',
    nextEl: '.section-event .btn-next',
  }
})

new Swiper('.section-board [data-category="civicism"] .swiper', {
  navigation: {
    prevEl: '.section-board [data-category="civicism"] .btn-prev',
    nextEl: '.section-board [data-category="civicism"] .btn-next'
  },
  slidesPerView: 'auto',
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
  speed: 500,
  observer: true,
  observeParents: true,
})

$('.section-board .tab-title button, .section-news .tab-title button').click(function () {
  $(this).parent().parent().addClass('is-active').siblings().removeClass('is-active');
})
