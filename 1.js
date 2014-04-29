$(document).ready(function ($) {
  var delta = $('.catalog__item').outerWidth(true);
  var tab = $('.catalog__item');
  var tabsWidth = tab.length * delta;
  var tabMenu = parseInt($('.basket__desktop__catalog__tabs').width() / delta) * delta;
  var getStep = function () {
    return delta;
  };
  /* Catalog scroller */
  $('a.basket__desktop__catalog__arrow-back').click(function () {
    right();
  });
  $('a.basket__desktop__catalog__arrow-forward').click(function () {
    left();
  });

  var bdc = document.getElementsByClassName('basket__desktop__catalog')[0];

  if (bdc.addEventListener) {
    if ('onwheel' in document) {
      // IE9+, FF17+
      bdc.addEventListener("wheel", bindScroll, false);
    } else if ('onmousewheel' in document) {
      // ���������� ������� �������
      bdc.addEventListener("mousewheel", bindScroll, false);
    } else {
      // 3.5 <= Firefox < 17, ����� ������ ������� DOMMouseScroll ���������
      bdc.addEventListener("MozMousePixelScroll", bindScroll, false);
    }
  } else { // IE<9
    bdc.attachEvent("onmousewheel", bindScroll);
  }

  function bindScroll(e) {
    e.preventDefault();
    if ($('.basket__desktop__catalog').is(':animated')) {
      return false;
    }
    var whDelta = e.deltaY || e.detail || e.wheelDelta;
    if (whDelta > 0 && isLeft()) {
      right();
    } else if (whDelta < 0 && isRight()) {
      left();
    }
  }
  var right = function () {
    $('.basket__desktop__catalog').animate({ left: "+=" + getStep() }, 350, function () {
      checkSwitch();
    });
  };
  var left = function () {
    $('.basket__desktop__catalog').animate({ left: "-=" + getStep() }, 350, function () {
      checkSwitch();
    });
  };
  var checkSwitch = function () {
    if (isRight()) {
      $('a.basket__desktop__catalog__arrow-forward').show();
    } else {
      $('a.basket__desktop__catalog__arrow-forward').hide();
    }
    if (isLeft()) {
      $('a.basket__desktop__catalog__arrow-back').show();
    } else {
      $('a.basket__desktop__catalog__arrow-back').hide();
    }
  };
  var isRight = function () {
    var leftHide = parseInt($('.basket__desktop__catalog').css('left'));
    var rightHide = tabsWidth + leftHide - tabMenu;
    if (rightHide > 0) {
      return true;
    } else {
      return false;
    }
  };
  var isLeft = function () {
    var leftHide = parseInt($('.basket__desktop__catalog').css('left'));
    if (leftHide === 0) {
      return false;
    } else if (leftHide < 0) {
      return true;
    }
  };
  /* End Catalog scroller */
  $('.counter')
    .on('click', '.add', function () {
      $(this).siblings('.counter__price').show();
    })
    .on('click', '.deduct', function () {
      $(this).siblings('.counter__price').hide();
    });
  $('.js-catalog-popup').click(function () {
    $('#all-br-items').show();
  });

});