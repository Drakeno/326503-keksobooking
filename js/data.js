'use strict';

(function () {
  var successHandler = function (offers) {
    var offersArrays = [];
    for (var i = 0; i < 8; i++) {
      offersArrays.push(offers[i]);
    }
    window.offers = offersArrays;
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
})();
