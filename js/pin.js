'use strict';
/* global offers */

window.offerPin = (function () {
  var PIN_HEIGHT = 75;
  var PIN_WIDTH = 56;
  var map = document.querySelector('.tokyo__pin-map');
  var selectedPin;

  // Рендерим точки
  var renderOfferPin = function (offer) {
    var newPoint = document.createElement('div');

    newPoint.className = 'pin';
    newPoint.tabIndex = '0';
    newPoint.style.left = offer.location.x - PIN_WIDTH / 2 + 'px'; // Координаты появления с учетом размеров метки
    newPoint.style.top = offer.location.y - PIN_HEIGHT + 'px';
    newPoint.innerHTML = '<img src="' + offer.author.avatar + '" class="rounded" width="40" height="40">';

    return newPoint;
  };

  // Ставим полученные точки
  var successHandler = function (offers) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < 8; i++) {
      fragment.appendChild(renderOfferPin(offers[i]));
    }
    map.appendChild(fragment);
  };

  // Обработчик ошибок
  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style.zIndex = 100;
    node.style.backgroundColor = 'red';
    node.style.textAlign = 'center';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.top = '100px';
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.backend.backendLoad(successHandler, errorHandler);

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
