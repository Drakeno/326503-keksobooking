'use strict';

(function () {
  var successHandler = function (offers) {
    var offersArrays = [];
    for (var i = 0; i < 8; i++) {
      offersArrays.push(offers[i]);
    }
    window.offers = offersArrays;
  };

  window.backend.load(successHandler, window.helper.errorHandler);
})();
