'use strict';

(function () {
  var map = document.querySelector('.tokyo__pin-map');
  var mapArea = document.querySelector('.tokyo');
  var pin = {
    height: 75,
    width: 94
  };
  var pinMain = map.querySelector('.pin__main');
  var formAddress = document.querySelector('#address');

  // Отслеживаем клики + enter по пинам на карте
  map.addEventListener('click', window.showCard.showCard, false);
  map.addEventListener('keydown', window.showCard.showCard, false);

  // Активируем возможность перемещения главного пина

  var pinAddressCoord = {
    x: pinMain.offsetLeft + pin.width / 2,
    y: pinMain.offsetTop + pin.height
  };

  var mapSize = {
    width: mapArea.clientWidth,
    height: mapArea.clientHeight
  };

  pinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvent) {
      moveEvent.preventDefault();

      formAddress.style.boxShadow = '';

      var shift = {
        x: startCoords.x - moveEvent.clientX,
        y: startCoords.y - moveEvent.clientY
      };

      startCoords = {
        x: moveEvent.clientX,
        y: moveEvent.clientY
      };

      // Изменяем значения адресного инпута
      pinAddressCoord = {
        x: pinMain.offsetLeft - shift.x + Math.floor(pin.width / 2),
        y: pinMain.offsetTop - shift.y + pin.height
      };

      if (pinAddressCoord.x >= 0 && pinAddressCoord.x <= mapSize.width && pinAddressCoord.y >= 0 && pinAddressCoord.y <= mapSize.height) {
        // Меняем положение пина в заданных границах
        pinMain.style.top = (pinMain.offsetTop - shift.y) + 'px';
        pinMain.style.left = (pinMain.offsetLeft - shift.x) + 'px';

        formAddress.value = 'x: ' + pinAddressCoord.x + ', y: ' + pinAddressCoord.y;
      }
    };

    var onMouseUp = function (event) {
      event.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();

// Как привязывать глобальные функции к селектам??
// Как корректно выводить переменные в глобал? Или лучше в своих модулях свои переменные
// Фильтр... тоже не понимаю, как привязать к селектам
// Как сгладить синхронизацию и добавить или или
