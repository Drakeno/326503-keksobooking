'use strict';

window.offerCard = (function () {
  var offerPopupTemplate = document.querySelector('#lodge-template');
  var fragment = document.createDocumentFragment();
  var offerInfo = document.querySelector('.dialog');
  var avatarImg = offerInfo.querySelector('.dialog__title img');

  // Рендерим инфо из объекта в шаблон
  var renderOfferInfo = function (someOffer) {
    var offerElement = offerPopupTemplate.content.cloneNode(true); // Копируем шаблон #lodge-template

    var features = '';
    var length = someOffer.offer.features.length;
    var j;

    // Подгрузка иконок
    for (j = 0; j < length; j++) {
      features += '<span class="feature__image feature__image--' + someOffer.offer.features[j] + '"></span>';
    }

    offerElement.querySelector('.lodge__title').textContent = someOffer.offer.title; // Выведите заголовок объявления offer.title в блок .lodge__title
    offerElement.querySelector('.lodge__address').textContent = someOffer.offer.address; // Выведите заголовок объявления offer.title в блок .lodge__address
    offerElement.querySelector('.lodge__price').textContent = someOffer.offer.price + '₽/ночь'; // Выведите цену offer.price в блок lodge__price строкой вида {{offer.price}}&#x20bd;/ночь
    offerElement.querySelector('.lodge__type').textContent = type; // В блок lodge__type выведите тип жилья offer.type: Квартира для flat, Бунгало для bungalo, Дом для house
    offerElement.querySelector('.lodge__rooms-and-guests').textContent = 'Для ' + someOffer.offer.guests + ' гостей в ' + someOffer.offer.rooms + ' комнатах'; // Выведите количество гостей и комнат
    offerElement.querySelector('.lodge__checkin-time').textContent = 'Заезд после ' + someOffer.offer.checkin + ', выезд до ' + someOffer.offer.checkout; //  Время заезда и выезда
    offerElement.querySelector('.lodge__features').innerHTML = features; // Выведите все доступные удобства пустыми спанами с классом feature__image--название
    offerElement.querySelector('.lodge__description').textContent = someOffer.offer.description;

    return offerElement;
  };

  // Функция для вывода инфы в диалоговое окно
  function dialogueAppearance(k) {

    var someOffer = offers[k];
    var offerInfoContent = offerInfo.querySelector('.dialog__panel');
    var oldInfoNode = offerInfoContent.parentNode;

    fragment.appendChild(renderOfferInfo(someOffer)); // Создаем фрагмент на основе объекта
    oldInfoNode.replaceChild(fragment, offerInfoContent); // Заменяем данные в существующем блоке dialog__panel
    avatarImg.src = someOffer.author.avatar;
  }

  return {
    dialogAppear: dialogueAppearance
  };

})();
