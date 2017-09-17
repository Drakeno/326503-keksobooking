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

  var enterPressed = function (evt) {
    return evt.keyCode === KEY_CODES.ENTER_KEYCODE;
  };

  var escPressed = function (evt) {
    return evt.keyCode === KEY_CODES.ESC_KEYCODE;
  };

  var debounceFunc = function (func) {
    var lastTimeout;
    return function () {
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(func, DEBOUNCE_INTERVAL);
      return lastTimeout;
    };
  };

  var shuffleMass = function (array) {
    let counter = array.length;
    while (counter > 0) {
      let index = Math.floor(Math.random() * counter);
      counter--;
      let temp = array[counter];
      array[counter] = array[index];
      array[index] = temp;
    }
    return array;
  };

  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style.zIndex = 100;
    node.id = 'errorMess';
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

  var createFragment = function (array, fn) {
    var fragment = document.createDocumentFragment();
    array.forEach(function (elem, callback) {
      fragment.appendChild(fn(elem, callback));
    });
    return fragment;
  };

  window.helper = {
    buildingTypes: BUILDING_TYPES,
    enterPressed: enterPressed,
    escPressed: escPressed,
    errorHandler: errorHandler,
    debounceFunc: debounceFunc,
    createFragment: createFragment,
    shuffleMass: shuffleMass
  };
})();
