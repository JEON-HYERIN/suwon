

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