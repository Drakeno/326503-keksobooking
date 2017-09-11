'use strict';

(function () {
  var map = document.querySelector('.tokyo__pin-map');
  var MAIN_PIN_HEIGHT = 75;
  var MAIN_PIN_WIDTH = 94;
  var pinMain = map.querySelector('.pin__main');
  var formAddress = document.querySelector('#address');

  // Отслеживаем клики + enter по пинам на карте
  map.addEventListener('click', window.showCard.showCard, false);
  map.addEventListener('keydown', window.showCard.showCard, false);

  // Активируем возможность перемещения главного пина
  pinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      pinMain.style.top = (pinMain.offsetTop - shift.y) + 'px';
      pinMain.style.left = (pinMain.offsetLeft - shift.x) + 'px';

      formAddress.value = 'x:' + (parseInt(pinMain.style.left, 10) + MAIN_PIN_WIDTH / 2) + ', y: ' + (parseInt(pinMain.style.top, 10) + MAIN_PIN_HEIGHT);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();

// TODO переменные offerInfo, fragment, map - как бы их эффективнее использовать и не повторять
// TODO formAddress элегантнее как-то?
// TODO synchronize-fields
