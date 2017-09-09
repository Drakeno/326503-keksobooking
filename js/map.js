'use strict';

(function () {
  var map = document.querySelector('.tokyo__pin-map');
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  var offerInfo = document.querySelector('.dialog');
  var offerInfoClose = offerInfo.querySelector('.dialog__close');
  var MAIN_PIN_HEIGHT = 75;
  var MAIN_PIN_WIDTH = 94;
  var pinMain = map.querySelector('.pin__main');
  var formAddress = document.querySelector('#address');

  // Функция для подсветки, открытия диалогового окна
  function setView(event) {
    var target = event.target;
    if (event.type === 'click' || event.keyCode === ENTER_KEYCODE) {
      while (target !== map) {
        if (target.className === 'pin') {
          for (var l = 0; l < map.children.length; l++) {
            if (map.children[l] === target) {
              window.offerCard.dialogAppear(l - 1); // Компенсация main-pin
            }
          }
          window.offerPin.pinLighted(target);
          openPopup();
          return;
        }
        target = target.parentNode;
      }
    }
  }

  // Закрываем всплывающее окно по дефолту
  offerInfo.classList.add('hidden');

  // Закрытие окна на ESC
  var onPopupEscPress = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      closePopup();
    }
  };

  // Функция открытия попапа + добавление Esc листнера + Добавление активного класса
  var openPopup = function () {
    offerInfo.classList.remove('hidden');
    document.addEventListener('keydown', onPopupEscPress);
  };

  // Функция закрытия попапа + удаление Esc листнера + удаление активного pin
  var closePopup = function () {
    var selectedPin = document.querySelector('.pin--active');
    offerInfo.classList.add('hidden');
    selectedPin.classList.remove('pin--active');
    document.removeEventListener('keydown', onPopupEscPress);
  };

  // Отслеживаем клики + enter по пинам на карте
  map.addEventListener('click', setView, false);
  map.addEventListener('keydown', setView, false);

  // Закрытие на крестик
  offerInfoClose.addEventListener('click', function () {
    closePopup();
  });

  // Закрытие крестика на ENTER в фокусе
  offerInfoClose.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      closePopup();
    }
  });

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
// TODO Трабл с selectedPin после разделения
// TODO Дополнительно: вместо блокирования ввода поля адреса — синхронизировать координаты, введенные в поле адреса, с положением пина на карте
// TODO formAddress
