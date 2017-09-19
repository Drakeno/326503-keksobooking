'use strict';

window.showCard = (function () {
  var map = document.querySelector('.tokyo__pin-map');
  var offerInfo = document.querySelector('.dialog');
  var offerInfoClose = offerInfo.querySelector('.dialog__close');

  var hideDialog = function () {
    offerInfo.classList.add('hidden');
  };

  offerInfoClose.addEventListener('click', function () {
    closePopup();
  });

  offerInfoClose.addEventListener('keydown', function (evt) {
    if (window.helper.enterPressed(evt)) {
      closePopup();
    }
  });

  var onPopupEscPress = function (evt) {
    if (window.helper.escPressed(evt)) {
      closePopup();
    }
  };

  var closePopup = function () {
    var selectedPin = document.querySelector('.pin--active');
    offerInfo.classList.add('hidden');
    if (selectedPin) {
      selectedPin.classList.remove('pin--active');
    }
    document.removeEventListener('keydown', onPopupEscPress);
  };

  var openPopup = function () {
    offerInfo.classList.remove('hidden');
    document.addEventListener('keydown', onPopupEscPress);
  };

  var show = function (evt) {
    var target = evt.target;
    if (evt.type === 'click' || window.helper.enterPressed(evt)) {
      while (target !== map) {
        if (target.className === 'pin') {
          window.offerCard.dialogAppear(target);
          window.offerPin.pinLighted(target);
          openPopup();
          return;
        }
        target = target.parentNode;
      }
    }
  };

  return {
    showCard: show,
    closePopup: closePopup,
    hideDialog: hideDialog
  };
})();
