'use strict';

// Функция для подсветки, открытия диалогового окна
window.showCard = (function () {
  var map = document.querySelector('.tokyo__pin-map');
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  var offerInfo = document.querySelector('.dialog');
  var offerInfoClose = offerInfo.querySelector('.dialog__close');

  // Закрываем всплывающее окно по дефолту
  offerInfo.classList.add('hidden');

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

  // Закрытие окна на ESC
  var onPopupEscPress = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      closePopup();
    }
  };

  // Функция закрытия попапа + удаление Esc листнера + удаление активного pin
  var closePopup = function () {
    var selectedPin = document.querySelector('.pin--active');
    offerInfo.classList.add('hidden');
    selectedPin.classList.remove('pin--active');
    document.removeEventListener('keydown', onPopupEscPress);
  };

  return {
    showCard: function showCard(event) {
      var target = event.target;


      // Функция открытия попапа + добавление Esc листнера + Добавление активного класса
      var openPopup = function () {
        offerInfo.classList.remove('hidden');
        document.addEventListener('keydown', onPopupEscPress);
      };

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
  };
})();
