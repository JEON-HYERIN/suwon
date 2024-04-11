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

$('.section-talk .talk-list').slick({
  slidesToShow: 5,
  infinite: false,
  arrows: false,
  swipe: false,
  draggable: false,
  variableWidth: false,
  responsive: [{
      breakpoint: 1001,
      settings: {
        swipe: true,
        draggable: true,
        variableWidth: true,
        swipeToSlide: true
      }
    },
    {
      breakpoint: 641,
      settings: {
        swipe: true,
        draggable: true,
        variableWidth: true,
        swipeToSlide: true
      }
    },
    {
      breakpoint: 621,
      settings: {
        swipe: true,
        draggable: true,
        variableWidth: true,
        swipeToSlide: true,
        slidesToShow: 4
      }
    },
    {
      breakpoint: 491,
      settings: {
        swipe: true,
        draggable: true,
        variableWidth: true,
        swipeToSlide: true,
        slidesToShow: 3
      }
    },
    {
      breakpoint: 391,
      settings: {
        swipe: true,
        draggable: true,
        variableWidth: true,
        swipeToSlide: true,
        slidesToShow: 2
      }
    }
  ]
})

$('.section-shortcut .shortcut-list').slick({
  autoplay: false,
  dots: false,
  slidesToShow: 8,
  slidesToScroll: 1,
  variableWidth: false,
  infinite: false,
  prevArrow: $('.section-shortcut .btn-prev'),
  nextArrow: $('.section-shortcut .btn-next'),
  pauseOnDotsHover: true,
  swipe: false,
  draggable: false,
  responsive: [{
      breakpoint: 1001,
      settings: {
        swipe: true,
        draggable: true,
        swipeToSlide: true,
        slidesToShow: 6
      }
    },
    {
      breakpoint: 641,
      settings: {
        swipe: true,
        draggable: true,
        swipeToSlide: true,
        slidesToShow: 4
      }
    },
    {
      breakpoint: 441,
      settings: {
        swipe: true,
        draggable: true,
        swipeToSlide: true,
        slidesToShow: 3
      }
    }
  ]
})

$('.section-news .news-list').slick({
  autoplay: false,
  dots: false,
  slidesToShow: 3,
  slidesToScroll: 1,
  variableWidth: false,
  infinite: false,
  arrows: false,
  pauseOnDotsHover: true,
  swipe: false,
  draggable: false,
  responsive: [{
      breakpoint: 1001,
      settings: {
        swipe: true,
        draggable: true,
        swipeToSlide: true,
        slidesToShow: 2
      }
    },
    {
      breakpoint: 641,
      settings: {
        swipe: true,
        draggable: true,
        swipeToSlide: true,
        variableWidth: true,
        slidesToShow: 2
      }
    }
  ]
})

$('.section-news .btn-tab').click(function () {
  const index = $(this).index();

  $('.news-list').eq(index).addClass('is-visible').siblings().removeClass('is-visible');
  $(this).parent().addClass('is-active').siblings().removeClass('is-active');
  $('.section-news .news-list').slick('setPosition');
})

$('.section-event .event-list').slick({
  prevArrow: $('.section-event .btn-prev'),
  nextArrow: $('.section-event .btn-next'),
  pauseOnDotsHover: true,
  swipe: false,
  draggable: false,
  responsive: [{
    breakpoint: 1001,
    settings: {
      swipe: true,
      draggable: true
    }
  }]
})

$('.section-board .board[data-category="civicism"] .board-list').slick({
  slidesToShow: 5,
  prevArrow: $('.section-board .board[data-category="civicism"] .btn-prev'),
  nextArrow: $('.section-board .board[data-category="civicism"] .btn-next'),
  autoplay: false,
  dots: false,
  slidesToShow: 4,
  slidesToScroll: 1,
  variableWidth: true,
  infinite: false,
  pauseOnDotsHover: true,
  swipe: false,
  draggable: false,
  responsive: [{
      breakpoint: 1501,
      settings: {
        slidesToShow: 3
      }
    },
    {
      breakpoint: 1201,
      settings: {
        slidesToShow: 2
      }
    },
    {
      breakpoint: 1001,
      settings: {
        swipe: true,
        draggable: true,
        swipeToSlide: true,
        slidesToShow: 2
      }
    },
    {
      breakpoint: 801,
      settings: {
        swipe: true,
        draggable: true,
        swipeToSlide: true,
        slidesToShow: 1
      }
    },
    {
      breakpoint: 641,
      settings: {
        swipe: true,
        draggable: true,
        swipeToSlide: true,
        slidesToShow: 2
      }
    },
    {
      breakpoint: 548,
      settings: {
        swipe: true,
        draggable: true,
        swipeToSlide: true,
        slidesToShow: 1
      }
    }
  ]
})
$('.section-board .board[data-category="job"] .board-list').slick({
  slidesToShow: 5,
  prevArrow: $('.section-board .board[data-category="job"] .btn-prev'),
  nextArrow: $('.section-board .board[data-category="job"] .btn-next'),
  autoplay: false,
  dots: false,
  slidesToShow: 4,
  slidesToScroll: 1,
  variableWidth: true,
  infinite: false,
  pauseOnDotsHover: true,
  swipe: false,
  draggable: false,
  responsive: [{
      breakpoint: 1501,
      settings: {
        slidesToShow: 3
      }
    },
    {
      breakpoint: 1201,
      settings: {
        slidesToShow: 2
      }
    },
    {
      breakpoint: 1001,
      settings: {
        swipe: true,
        draggable: true,
        swipeToSlide: true,
        slidesToShow: 2
      }
    },
    {
      breakpoint: 801,
      settings: {
        swipe: true,
        draggable: true,
        swipeToSlide: true,
        slidesToShow: 1
      }
    },
    {
      breakpoint: 641,
      settings: {
        swipe: true,
        draggable: true,
        swipeToSlide: true,
        slidesToShow: 2
      }
    },
    {
      breakpoint: 548,
      settings: {
        swipe: true,
        draggable: true,
        swipeToSlide: true,
        slidesToShow: 1
      }
    }
  ]
})
$('.section-board .board[data-category="news"] .board-list').slick({
  slidesToShow: 5,
  prevArrow: $('.section-board .board[data-category="news"] .btn-prev'),
  nextArrow: $('.section-board .board[data-category="news"] .btn-next'),
  autoplay: false,
  dots: false,
  slidesToShow: 4,
  slidesToScroll: 1,
  variableWidth: true,
  infinite: false,
  pauseOnDotsHover: true,
  swipe: false,
  draggable: false,
  responsive: [{
      breakpoint: 1501,
      settings: {
        slidesToShow: 3
      }
    },
    {
      breakpoint: 1201,
      settings: {
        slidesToShow: 2
      }
    },
    {
      breakpoint: 1001,
      settings: {
        swipe: true,
        draggable: true,
        swipeToSlide: true,
        slidesToShow: 2
      }
    },
    {
      breakpoint: 801,
      settings: {
        swipe: true,
        draggable: true,
        swipeToSlide: true,
        slidesToShow: 1
      }
    },
    {
      breakpoint: 641,
      settings: {
        swipe: true,
        draggable: true,
        swipeToSlide: true,
        slidesToShow: 2
      }
    },
    {
      breakpoint: 548,
      settings: {
        swipe: true,
        draggable: true,
        swipeToSlide: true,
        slidesToShow: 1
      }
    }
  ]
})
$('.section-board .board[data-category="receipt"] .board-list').slick({
  slidesToShow: 5,
  prevArrow: $('.section-board .board[data-category="receipt"] .btn-prev'),
  nextArrow: $('.section-board .board[data-category="receipt"] .btn-next'),
  autoplay: false,
  dots: false,
  slidesToShow: 4,
  slidesToScroll: 1,
  variableWidth: true,
  infinite: false,
  pauseOnDotsHover: true,
  swipe: false,
  draggable: false,
  responsive: [{
      breakpoint: 1501,
      settings: {
        slidesToShow: 3
      }
    },
    {
      breakpoint: 1201,
      settings: {
        slidesToShow: 2
      }
    },
    {
      breakpoint: 1001,
      settings: {
        swipe: true,
        draggable: true,
        swipeToSlide: true,
        slidesToShow: 2
      }
    },
    {
      breakpoint: 801,
      settings: {
        swipe: true,
        draggable: true,
        swipeToSlide: true,
        slidesToShow: 1
      }
    },
    {
      breakpoint: 641,
      settings: {
        swipe: true,
        draggable: true,
        swipeToSlide: true,
        slidesToShow: 2
      }
    },
    {
      breakpoint: 548,
      settings: {
        swipe: true,
        draggable: true,
        swipeToSlide: true,
        slidesToShow: 1
      }
    }
  ]
})
$('.section-board .board[data-category="information"] .board-list').slick({
  slidesToShow: 5,
  prevArrow: $('.section-board .board[data-category="information"] .btn-prev'),
  nextArrow: $('.section-board .board[data-category="information"] .btn-next'),
  autoplay: false,
  dots: false,
  slidesToShow: 4,
  slidesToScroll: 1,
  variableWidth: true,
  infinite: false,
  pauseOnDotsHover: true,
  swipe: false,
  draggable: false,
  responsive: [{
      breakpoint: 1501,
      settings: {
        slidesToShow: 3
      }
    },
    {
      breakpoint: 1201,
      settings: {
        slidesToShow: 2
      }
    },
    {
      breakpoint: 1001,
      settings: {
        swipe: true,
        draggable: true,
        swipeToSlide: true,
        slidesToShow: 2
      }
    },
    {
      breakpoint: 801,
      settings: {
        swipe: true,
        draggable: true,
        swipeToSlide: true,
        slidesToShow: 1
      }
    },
    {
      breakpoint: 641,
      settings: {
        swipe: true,
        draggable: true,
        swipeToSlide: true,
        slidesToShow: 2
      }
    },
    {
      breakpoint: 548,
      settings: {
        swipe: true,
        draggable: true,
        swipeToSlide: true,
        slidesToShow: 1
      }
    }
  ]
})
$('.section-board .board[data-category="bulletin"] .board-list').slick({
  slidesToShow: 5,
  prevArrow: $('.section-board .board[data-category="bulletin"] .btn-prev'),
  nextArrow: $('.section-board .board[data-category="bulletin"] .btn-next'),
  autoplay: false,
  dots: false,
  slidesToShow: 4,
  slidesToScroll: 1,
  variableWidth: true,
  infinite: false,
  pauseOnDotsHover: true,
  swipe: false,
  draggable: false,
  responsive: [{
      breakpoint: 1501,
      settings: {
        slidesToShow: 3
      }
    },
    {
      breakpoint: 1201,
      settings: {
        slidesToShow: 2
      }
    },
    {
      breakpoint: 1001,
      settings: {
        swipe: true,
        draggable: true,
        swipeToSlide: true,
        slidesToShow: 2
      }
    },
    {
      breakpoint: 801,
      settings: {
        swipe: true,
        draggable: true,
        swipeToSlide: true,
        slidesToShow: 1
      }
    },
    {
      breakpoint: 641,
      settings: {
        swipe: true,
        draggable: true,
        swipeToSlide: true,
        slidesToShow: 2
      }
    },
    {
      breakpoint: 548,
      settings: {
        swipe: true,
        draggable: true,
        swipeToSlide: true,
        slidesToShow: 1
      }
    }
  ]
})

$('.section-board .btn-tab').click(function () {
  const data = $(this).parent().data('tab');
  const boardEls = document.querySelectorAll('.section-board .board');

  $(this).parent().parent().addClass('is-active').siblings().removeClass('is-active');

  // boardEls.forEach(function(el) {
  //   // console.log(el.dataset.category);
  //   if(el.dataset.category === data) {
  //     el.classList.add('is-visible');
  //   } else {
  //     el.classList.remove('is-visible')
  //   }
  // })
  // $('.section-board .board-container').find('.is-visible').slick('setPosition');
  // console.log(target);
  // const index = $(this).index();

  // $('.section-board .board-list-wrap').eq(index).addClass('is-visible').siblings().removeClass('is-visible');
  // $(this).addClass('is-active').siblings().removeClass('is-active');
  // $('.section-board .board-list').slick('setPosition');

  // console.log(data);
})
