
// a태그 기본동작 방지
$(function () {
  $(document).on('click', 'a[href="#"]', function (e) {
    e.preventDefault();
  });
})

let gnbHeight = $('.nav-container .common-inner').outerHeight();
let lnbHeight = 0;

$('.link-gnb').on('mouseenter', function(e) {
  e.preventDefault();
  lnbHeight = $(this).parent().find('.lnb-list-wrap').outerHeight();
  $('.nav-container').css({
    'height': (gnbHeight + lnbHeight) + "px"
  });
  $('.nav-container').addClass('is-open');
  $(this).parent().addClass('is-active').siblings().removeClass('is-active');
})

$('.lnb-list-wrap').on('mouseleave', function(e) {
  e.preventDefault();
  $('.nav-container').removeAttr('style');
  $('.nav-container').removeClass('is-open');
  $('.gnb-item').removeClass('is-active');
})

$('.footer .btn-related').unbind('click').bind('click', function() {
  const index = $(this).parent().index();

  if($(this).parent().hasClass('is-active')) {
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
  autoplay : true,
  infinite : true,
  prevArrow: $('.btn-prev'),
  nextArrow: $('.btn-next'),
  // dots: true,
  // dotsClass: 'page',
  // customPaging: function (slider, i) {

  //   const currentPage = String((i + 1)).padStart(2, '0')
  //   const totalPage = String(slider.slideCount).padStart(2,'0');
    
  //   return  '<span class="current">'+ currentPage +'</span><span class="gap">-</span><span class="total">' + totalPage + '</span>';
  // }
})
visualSlide.on('init reInit afterChange', function(event, slick, currentSlide, nextSlide){ 

  const currentPage = String((currentSlide ? currentSlide : 0) + 1).padStart(2, '0')
  const totalPage = String(slick.slideCount).padStart(2,'0');
 
  // $('.section-visual .page').html("<span class='current'>"+currentPage+"</span><span> - " + "</span>" + "<span class='total'>" + totalPage +"</span>");

  $('.section-visual .page .current').text(currentPage);
  $('.section-visual .page .total').text(totalPage);
  });

  let slidePaused = false; //자동재생상태
  $('.section-visual .btn-control').on('click', function() {
    // 정지상태라면
    if(slidePaused) {
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
