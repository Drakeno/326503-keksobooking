'use strict';

(function () {
  var PIN_HEIGHT = 75;
  var PIN_WIDTH = 56;
  var map = document.querySelector('.tokyo__pin-map');
  var filter = document.querySelector('.tokyo__filters');
  var selectedPin;
  var filtered = null;
  var pins = null;

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
  var generateAllPins = function (ads) {
    return window.helper.createFragment(ads, renderOfferPin);
  };

  // Функция для активации pin и деактивации другого
  var highlight = function (node) {
    if (selectedPin) {
      selectedPin.classList.remove('pin--active');
    }
    selectedPin = node;
    selectedPin.classList.add('pin--active');
  };

  var getStartPinData = function (loadPins) {
    loadPins = window.offers;
    pins = loadPins;
    filtered = loadPins;
    generateAllPins(loadPins);
    map.appendChild(generateAllPins(loadPins));
  };

  window.backend.load(getStartPinData, window.helper.errorHandler);

  var deactivatePin = function () {
    var pinActive = document.querySelector('.pin--active');

    if (pinActive) {
      pinActive.classList.remove('pin--active');
    }
  };

  var appendPins = function (advert) {
    var advs = generateAllPins(advert);
    var oldPins = map.querySelectorAll('.pin:not(.pin__main)');

    deactivatePin();

    for (var i = 0; i < oldPins.length; i++) {
      oldPins[i].parentElement.removeChild(oldPins[i]);
    }

    map.appendChild(advs);
  };

  var updatePins = window.helper.debounceFunc(function () {
    appendPins(filtered);
  });

  var isTypeMatch = function (pin) {
    var houseFilter = filter.querySelector('#housing_type');
    return houseFilter.value === 'any' ? true : pin.offer.type === houseFilter.value;
  };

  var isPricesMatch = function (pin) {
    var priceFilter = filter.querySelector('#housing_price');
    var priceFilterValue = null;

    switch (priceFilter.value) {
      case 'any':
        priceFilterValue = true;
        break;
      case 'middle':
        priceFilterValue = pin.offer.price <= 50000 && pin.offer.price >= 10000;
        break;
      case 'low':
        priceFilterValue = pin.offer.price < 10000;
        break;
      case 'high':
        priceFilterValue = pin.offer.price > 50000;
        break;
    }

    return priceFilterValue;
  };

  var isRoomsMatch = function (pin) {
    var roomsFilter = filter.querySelector('#housing_room-number');

    return roomsFilter.value === 'any' ? true : pin.offer.rooms === parseInt(roomsFilter.value, 10);
  };

  var isGuestsMatch = function (pin) {
    var guestsFilter = filter.querySelector('#housing_guests-number');

    return guestsFilter.value === 'any' ? true : pin.offer.guests === parseInt(guestsFilter.value, 10);
  };

  var featureListMatches = function (pin) {
    var checkedCheckboxes = document.querySelectorAll('.tokyo__filter-set input[name=feature]:checked');

    return [].every.call(checkedCheckboxes, function (checkbox) {
      return pin.offer.features.indexOf(checkbox.value) !== -1;
    });

  };

  var filtersFunctions = [
    isTypeMatch,
    isRoomsMatch,
    isGuestsMatch,
    isPricesMatch,
    featureListMatches
  ];

  filter.addEventListener('change', function () {
    filtered = pins.filter(function (pin) {
      return filtersFunctions.every(function (fn) {
        return fn(pin);
      });
    });

    updatePins();
  });

  window.offerPin = {
    pinLighted: highlight
  };
})();
