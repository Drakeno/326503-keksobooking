'use strict';

(function () {
  var successHandler = function (offers) {
    var offersArrays = [];
    if (offers !== null) {
      for (var i = 0; i < offers.length; i++) {
        offers[i]['id'] = createUnicId();
        offersArrays.push(offers[i]);
      }
    } else {
      window.helper.errorHandler();
    }
    window.offers = offersArrays;
    window.offerPin.getStartPinData(offersArrays);
  };

  var createUnicId = function () {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0;
      var v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  };

  window.backend.load(successHandler, window.helper.errorHandler);
})();
