'use strict';

(function () {
  var PIN_HEIGHT = 75;
  var PIN_WIDTH = 56;
  var map = document.querySelector('.tokyo__pin-map');
  var filter = document.querySelector('.tokyo__filters');
  var selectedPin;
  var filtered = null;

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

  var isTypeMatch = function (value) {
    return value === 'any' ? window.offers : window.offers.filter(function (item) {
      return item.offer.type === value;
    });
  };

  var isPricesMatch = function (value) {
    if (value === 'any') {
      return window.offers;
    } else if (value === 'middle') {
      return window.offers.filter(function (item) {
        return item.offer.price <= 50000 && item.offer.price >= 10000;
      });
    } else if (value === 'low') {
      return window.offers.filter(function (item) {
        return item.offer.price < 10000;
      });
    } else if (value === 'high') {
      return window.offers.filter(function (item) {
        return item.offer.price > 50000;
      });
    } else {
      return window.offers;
    }
  };

  var isRoomsMatch = function (value) {
    return value === 'any' ? window.offers : window.offers.filter(function (item) {
      return item.offer.rooms === parseInt(value, 10);
    });
  };

  var isGuestsMatch = function (value) {
    return value === 'any' ? window.offers : window.offers.filter(function (item) {
      return item.offer.guests === parseInt(value, 10);
    });
  };

  //  var featureListMatches = function (value) {
  //    var checkedCheckboxes = document.querySelectorAll('.tokyo__filter-set input[name=feature]:checked');
  //
  //    return [].every.call(checkedCheckboxes,  window.offers.filter(function (item) {
  //      return item.offer.features.indexOf(checkedCheckboxes.value) !== -1;
  //    });
  //  };

  filter.addEventListener('change', function (evt) {
    var attr = evt.target.getAttribute('id');
    var value = evt.target.value;
    filter = null;

    switch (attr) {
      case 'housing_type':
        filter = isTypeMatch;
        break;
      case 'housing_price':
        filter = isPricesMatch;
        break;
      case 'housing_room-number':
        filter = isRoomsMatch;
        break;
      case 'housing_guests-number':
        filter = isGuestsMatch;
        break;
        //      case 'housing_features':
        //        filter = featureListMatches;
        //        break;
      default:
        break;
    }

    filtered = filter(value);

    updatePins();
  });

  window.offerPin = {
    pinLighted: highlight
  };
})();
