'use strict';

window.offerCard = (function () {
  var offerPopupTemplate = document.querySelector('#lodge-template');
  var fragment = document.createDocumentFragment();
  var offerInfo = document.querySelector('.dialog');
  var avatarImg = offerInfo.querySelector('.dialog__title img');

  var renderOfferInfo = function (someOffer) {
    var offerElement = offerPopupTemplate.content.cloneNode(true);

    var features = '';
    var length = someOffer.offer.features.length;
    var j;

    for (j = 0; j < length; j++) {
      features += '<span class="feature__image feature__image--' + someOffer.offer.features[j] + '"></span>';
    }

    offerElement.querySelector('.lodge__title').textContent = someOffer.offer.title;
    offerElement.querySelector('.lodge__address').textContent = someOffer.offer.address;
    offerElement.querySelector('.lodge__price').textContent = someOffer.offer.price + '₽/ночь';
    offerElement.querySelector('.lodge__type').textContent = window.helper.buildingTypes[someOffer.offer.type];
    offerElement.querySelector('.lodge__rooms-and-guests').textContent = 'Для ' + someOffer.offer.guests + ' гостей в ' + someOffer.offer.rooms + ' комнатах';
    offerElement.querySelector('.lodge__checkin-time').textContent = 'Заезд после ' + someOffer.offer.checkin + ', выезд до ' + someOffer.offer.checkout;
    offerElement.querySelector('.lodge__features').innerHTML = features;
    offerElement.querySelector('.lodge__description').textContent = someOffer.offer.description;

    return offerElement;
  };

  var dialogueAppearance = function (target) {
    var thisOffer;
    for (var i = 0; i < window.offers.length; i++) {
      if (target.id === window.offers[i].id) {
        thisOffer = window.offers[i];
      }
    }
    var offerInfoContent = offerInfo.querySelector('.dialog__panel');
    var oldInfoNode = offerInfoContent.parentNode;

    fragment.appendChild(renderOfferInfo(thisOffer));
    oldInfoNode.replaceChild(fragment, offerInfoContent);
    avatarImg.src = thisOffer.author.avatar;
  };

  return {
    dialogAppear: dialogueAppearance
  };

})();
