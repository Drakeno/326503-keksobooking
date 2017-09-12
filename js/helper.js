'use strict';

(function () {

  var BUILDING_TYPES = {
    flat: 'квартира',
    bungalo: 'бунгало',
    house: 'дом'
  };

  var KEY_CODES = {
    ESC_KEYCODE: 27,
    ENTER_KEYCODE: 13
  };

  function enterPressed(evt) {
    return evt.keyCode === KEY_CODES.ENTER_KEYCODE;
  }

  function escPressed(evt) {
    return evt.keyCode === KEY_CODES.ESC_KEYCODE;
  }

  window.helper = {
    buildingTypes: BUILDING_TYPES,
    enterPressed: enterPressed,
    escPressed: escPressed
  };

})();