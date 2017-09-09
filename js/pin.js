'use strict';
/* global offers */

window.offerPin = (function () {
  var PIN_HEIGHT = 75;
  var PIN_WIDTH = 56;
  var fragment = document.createDocumentFragment();
  var map = document.querySelector('.tokyo__pin-map');
  var selectedPin;

  // Рендерим точки
  var renderOfferPin = function (offer) {
    var newPoint = document.createElement('div');

    newPoint.className = 'pin';
    newPoint.tabIndex = '0';
    newPoint.style.left = offer.location.x + PIN_WIDTH / 2 + 'px'; // Координаты появления с учетом размеров метки
    newPoint.style.top = offer.location.y + PIN_HEIGHT + 'px';
    newPoint.innerHTML = '<img src="' + offer.author.avatar + '" class="rounded" width="40" height="40">';

    return newPoint;
  };

  // Ставим полученные точки
  for (var i = 0; i < 8; i++) {
    fragment.appendChild(renderOfferPin(offers[i]));
  }

  map.appendChild(fragment);

  return {
    // Функция для активации pin и деактивации другого
    pinLighted: function highlight(node) {
      if (selectedPin) {
        selectedPin.classList.remove('pin--active');
      }
      selectedPin = node;
      selectedPin.classList.add('pin--active');
    }
  };
})();
