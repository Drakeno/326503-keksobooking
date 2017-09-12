'use strict';

window.offerPin = (function () {
  var PIN_HEIGHT = 75;
  var PIN_WIDTH = 56;
  var map = document.querySelector('.tokyo__pin-map');
  var filter = document.querySelector('.tokyo__filters');
  var selectedPin;
  var ads;

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

  window.backend.load(successHandler, errorHandler);

  // Функция для активации pin и деактивации другого
  var highlight = function (node) {
    if (selectedPin) {
      selectedPin.classList.remove('pin--active');
    }
    selectedPin = node;
    selectedPin.classList.add('pin--active');
  };

  return {
    pinLighted: highlight
  };

  var updatePins = window.helper.debounceFunc(function () {
    successHandler(filtered);
  });

  var isTypeMatch = function (ad) {
    var houseFilter = filter.querySelector('#housing_type');
    return houseFilter.value === 'any' ? true : ad.offer.type === houseFilter.value;
  };

  var isPricesMatch = function (ad) {
    var priceFilter = filter.querySelector('#housing_price');
    var priceFilterValue = null;

    switch (priceFilter.value) {
      case 'any':
        priceFilterValue = true;
        break;
      case 'middle':
        priceFilterValue = ad.offer.price <= 50000 && ad.offer.price >= 10000;
        break;
      case 'low':
        priceFilterValue = ad.offer.price < 10000;
        break;
      case 'high':
        priceFilterValue = ad.offer.price > 50000;
        break;
    }

    return priceFilterValue;
  };

  var isRoomsMatch = function (ad) {
    var roomsFilter = filter.querySelector('#housing_room-number');

    return roomsFilter.value === 'any' ? true : ad.offer.rooms === parseInt(roomsFilter.value, 10);
  };

  var isGuestsMatch = function (ad) {
    var guestsFilter = filter.querySelector('#housing_guests-number');

    return guestsFilter.value === 'any' ? true : ad.offer.guests === parseInt(guestsFilter.value, 10);
  };

  var featureListMatches = function (ad) {
    var checkedCheckboxes = document.querySelectorAll('.tokyo__filter-set input[name=feature]:checked');

    return [].every.call(checkedCheckboxes, function (checkbox) {
      return ad.offer.features.indexOf(checkbox.value) !== -1;
    });

  };

  filtersFunctions = [
    isTypeMatch,
    isRoomsMatch,
    isGuestsMatch,
    isPricesMatch,
    featureListMatches
  ];

  filter.addEventListener('change', function () {
    filtered = ads.filter(function (ad) {
      return filtersFunctions.every(function (fn) {
        return fn(ad);
      });
    });

    updatePins();
  });
})();
