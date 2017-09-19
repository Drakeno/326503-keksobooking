'use strict';

(function () {
  var PIN_HEIGHT = 75;
  var PIN_WIDTH = 56;
  var map = document.querySelector('.tokyo__pin-map');
  var filter = document.querySelector('.tokyo__filters');
  var selectedPin;
  var filterData = null;
  var housingTypeFilter = document.querySelector('#housing_type');
  var housingPriceFilter = document.querySelector('#housing_price');
  var housingRoomNumber = document.querySelector('#housing_room-number');
  var housingGuestsNumber = document.querySelector('#housing_guests-number');

  var renderOfferPin = function (offer) {
    var newPoint = document.createElement('div');
    newPoint.className = 'pin';
    newPoint.id = offer.id;
    newPoint.tabIndex = '0';
    newPoint.style.left = offer.location.x - PIN_WIDTH / 2 + 'px';
    newPoint.style.top = offer.location.y - PIN_HEIGHT + 'px';
    newPoint.innerHTML = '<img src="' + offer.author.avatar + '" class="rounded" width="40" height="40">';
    return newPoint;
  };

  var generateAllPins = function (pins) {
    return window.helper.createFragment(pins, renderOfferPin);
  };

  var getStartPinData = function (loadPins) {
    var randData = window.helper.shuffleMass(loadPins);
    loadPins = randData.slice(0, 3);
    map.appendChild(generateAllPins(loadPins));
  };

  var highlightOn = function (node) {
    if (selectedPin) {
      selectedPin.classList.remove('pin--active');
    }
    selectedPin = node;
    selectedPin.classList.add('pin--active');
  };

  var highlightOff = function () {
    var pinActive = document.querySelector('.pin--active');
    if (pinActive) {
      pinActive.classList.remove('pin--active');
    }
  };

  var appendPins = function (pin) {
    var pinMass = generateAllPins(pin);
    var oldPins = map.querySelectorAll('.pin:not(.pin__main)');
    oldPins = [].slice.call(oldPins, null);
    highlightOff();

    oldPins.forEach(function (el) {
      map.removeChild(el);
    });
    map.appendChild(pinMass);
  };

  var updatePins = window.helper.debounceFunc(function () {
    appendPins(filterData);
  });

  var getElementFilter = function (value1, value2) {
    return value1 === 'any' || value1 === String(value2);
  };

  var getRangeElementFilter = function (value, price) {
    switch (value) {
      case 'any':
        return true;
      case 'middle':
        return price >= 10000 && price <= 50000;
      case 'low':
        return price < 10000;
      case 'high':
        return price > 50000;
    }
    return false;
  };

  var getClickElementFilter = function (features) {
    var count = 0;
    var featureChecked = document.querySelectorAll('input[name="feature"]:checked');

    for (var i = 0; i < featureChecked.length; i++) {
      features.forEach(function (el) {
        if (featureChecked[i].value === el) {
          count++;
        }
      });
    }

    return count === featureChecked.length;
  };

  var applyFilters = function () {
    var result = window.offers.filter(function (el) {
      return getElementFilter(housingTypeFilter.value, el.offer.type);
    });
    result = result.filter(function (el) {
      return getRangeElementFilter(housingPriceFilter.value, el.offer.price);
    });
    result = result.filter(function (el) {
      return getElementFilter(housingRoomNumber.value, el.offer.rooms);
    });
    result = result.filter(function (el) {
      return getElementFilter(housingGuestsNumber.value, el.offer.guests);
    });
    result = result.filter(function (el) {
      return getClickElementFilter(el.offer.features);
    });

    return result;
  };

  filter.addEventListener('change', function () {
    if (window.offers.length > 1) {
      filterData = applyFilters();
      updatePins();
    }
    window.showCard.hideDialog();
  });

  window.offerPin = {
    pinLighted: highlightOn,
    filtMass: applyFilters,
    getStartPinData: getStartPinData
  };
})();
