

let gnbHeight = $('.group-nav .common-inner').outerHeight();
let lnbHeight = 0;

$('.link-gnb').on('mouseenter', function(e) {
  e.preventDefault();
  lnbHeight = $(this).parent().find('.lnb-list-container').outerHeight();
  $('.lnb-list-container').css({
    'height': (gnbHeight + lnbHeight) + "px"
  });
  $('.group-nav').addClass('is-open');
  $(this).parent().addClass('is-active').siblings().removeClass('is-active');
})

$('.lnb-list-container').on('mouseleave', function(e) {
  e.preventDefault();
  $('.lnb-list-container').removeAttr('style');
  $('.group-nav').removeClass('is-open');
  $('.gnb-item').removeClass('is-active');
})

