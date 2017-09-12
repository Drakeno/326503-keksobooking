'use strict';

(function () {

  window.synchronizeFields = function (firstNode, secondNode, firstData, secondData, callback) {

    if (typeof callback === 'function') {
      firstNode.addEventListener('change', function () {
        callback(secondNode, secondData[firstData.indexOf(firstNode.value)]);
      });
    }
  };

}());