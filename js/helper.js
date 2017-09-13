'use strict';

(function () {

  var BUILDING_TYPES = {
    flat: 'Квартира',
    bungalo: 'Бунгало',
    house: 'Дом'
  };

  var KEY_CODES = {
    ESC_KEYCODE: 27,
    ENTER_KEYCODE: 13
  };

  var DEBOUNCE_INTERVAL = 300;

  function enterPressed(evt) {
    return evt.keyCode === KEY_CODES.ENTER_KEYCODE;
  }

  function escPressed(evt) {
    return evt.keyCode === KEY_CODES.ESC_KEYCODE;
  }

  function debounceFunc(func) {
    var lastTimeout;
    return function () {
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(func, DEBOUNCE_INTERVAL);
      return lastTimeout;
    };
  }

  function errorHandler(errorMessage) {
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
  }

  function createFragment(array, fn) {
    var fragment = document.createDocumentFragment();

    array.forEach(function (elem, index) {
      fragment.appendChild(fn(elem, index));
    });

    return fragment;
  }

  window.helper = {
    buildingTypes: BUILDING_TYPES,
    enterPressed: enterPressed,
    escPressed: escPressed,
    errorHandler: errorHandler,
    debounceFunc: debounceFunc,
    createFragment: createFragment
  };
})();
