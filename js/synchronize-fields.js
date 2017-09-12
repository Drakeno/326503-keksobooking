'use strict';

(function () {

  window.synchronizeFields = function (firstNode, secondNode, firstData, secondData, callback) {

    if (typeof callback === 'function') {
      firstNode.addEventListener('change', function () {
        callback(secondNode, secondData[firstData.indexOf(firstNode.value)]);
      });
    }
  };

  window.synchronizeFieldsSimple = function (firstElement, secondElement, data, callBack) {
    firstElement.addEventListener('change', function () {
      callBack(secondElement, data[firstElement.value]);
    });
  };

}());
