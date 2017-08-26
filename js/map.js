'use strict';
var TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var TYPES = ['flat', 'house', 'bungalo'];
var TIMES = ['12:00', '13:00', '14:00'];
var FEAUTURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

var offers = createOffers();
var map = document.querySelector('.tokyo__pin-map');
var fragment = document.createDocumentFragment();
var offerPopupTemplate = document.querySelector('#lodge-template');
var popupInfo = document.querySelector('.dialog__panel');
var oldInfoNode = popupInfo.parentNode;
var avatarImg = document.querySelector('.dialog__title img');

// Функция вывода рандомного числа
function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Функция для рандома индексов сортировки
function randomIndex() {
  return Math.random() - 0.5;
}

// Функция вывода массива рандомных чисел в заданном диапазоне
function shuffleNumbers(a, b) {
  var newNumbers = [];
  for (var i = a; i < b + 1; i++) {
    newNumbers.push(i);
  }
  newNumbers.sort(randomIndex);
  return newNumbers;
}

// Функция вывода случайного количества случайных строк из массива
function limitedData(massiveName) {
  massiveName.sort(randomIndex);
  var newMassive = [];
  var baseMassiveSize = massiveName.length;
  var newMassiveLenght = randomInteger(1, baseMassiveSize);
  for (var i = 0; i < newMassiveLenght; i++) {
    newMassive.push(massiveName[i]);
  }
  return newMassive;
}

// Задаем JS-Объекты, данные
function createOffers() {
  var offersArrays = [];
  var avatarNumbers = shuffleNumbers(1, 8); // Создаем массив случайных чисел для вызова номера картинки в случайном порядке без повтора
  TITLES.sort(randomIndex); // Перемешиваем тайтлы для вызова в случайном порядке

  for (var i = 0; i < 8; i++) {
    offersArrays.push({
      author: {
        avatar: 'img/avatars/user0' + avatarNumbers[i] + '.png'
      },
      offer: {
        title: TITLES[i],
        address: '{{location.x}}, {{location.y}}',
        price: randomInteger(1000, 1000000),
        type: TYPES[randomInteger(0, 2)],
        rooms: randomInteger(1, 5),
        guests: randomInteger(1, 100), // Лимиты гостей не указаны, так что выбрал 100
        checkin: TIMES[randomInteger(0, TIMES.length - 1)],
        checkout: TIMES[randomInteger(0, TIMES.length - 1)],
        features: limitedData(FEAUTURES),
        description: ' ',
        photos: ''
      },
      location: {
        x: randomInteger(300, 900) - 28, // Координаты с учетом размеров метки pin
        y: randomInteger(100, 500) + 75
      }
    });
  }
  return offersArrays;
}

// Рендерим точки
var renderOfferPin = function (offer) {
  var newPoint = document.createElement('div');

  newPoint.className = 'pin';
  newPoint.style.left = offer.location.x + 'px';
  newPoint.style.top = offer.location.y + 'px';
  newPoint.innerHTML = '<img src="' + offer.author.avatar + '" class="rounded" width="40" height="40">';

  return newPoint;
};

// Ставим полученные точки
for (var i = 0; i < 8; i++) {
  fragment.appendChild(renderOfferPin(offers[i]));
}

map.appendChild(fragment);

// Рендерим инфо из объекта в шаблон
var renderOfferInfo = function (someOffer) {
  var offerElement = offerPopupTemplate.content.cloneNode(true); // Копируем шаблон #lodge-template

  //  Конверт данных type в русскую интерпритацию - TRAVIS не разрешает столь колхозное переназначение ruType :(
  //  var ruType = someOffer.offer.type;
  //  if (ruType === 'flat') {
  //    ruType = 'Квартира';
  //  } else if (ruType === 'bungalo') {
  //    ruType = 'Бунгало';
  //  } else {
  //    ruType = 'Дом';
  //  }

  offerElement.querySelector('.lodge__title').textContent = someOffer.offer.title; // Выведите заголовок объявления offer.title в блок .lodge__title
  offerElement.querySelector('.lodge__address').textContent = someOffer.offer.address; // Выведите заголовок объявления offer.title в блок .lodge__address
  offerElement.querySelector('.lodge__price').textContent = someOffer.offer.price + '₽/ночь'; // Выведите цену offer.price в блок lodge__price строкой вида {{offer.price}}&#x20bd;/ночь
  offerElement.querySelector('.lodge__type').textContent = someOffer.offer.type; // В блок lodge__type выведите тип жилья offer.type: Квартира для flat, Бунгало для bungalo, Дом для house
  // TODO 
  offerElement.querySelector('.lodge__rooms-and-guests').textContent = 'Для ' + someOffer.offer.guests + ' гостей в ' + someOffer.offer.rooms + ' комнатах'; // Выведите количество гостей и комнат
  offerElement.querySelector('.lodge__checkin-time').textContent = 'Заезд после ' + someOffer.offer.checkin + ', выезд до ' + someOffer.offer.checkout; //  Время заезда и выезда
  offerElement.querySelector('.lodge__features').innerHTML = '<span class="feature__image feature__image--' + someOffer.offer.features[0] + '"></span>'; // Выведите все доступные удобства пустыми спанами с классом feature__image--название
  // TODO 
  offerElement.querySelector('.lodge__description').textContent = someOffer.offer.description;

  return offerElement;
};

var someOffer = offers[0]; // Для выполнения функции только на одном первом объекте

fragment.appendChild(renderOfferInfo(someOffer)); // Создаем фрагмент на основе объекта
oldInfoNode.replaceChild(fragment, popupInfo); // Заменяем данные в существующем блоке dialog__panel

// Меняем аватарку в блоке dialog__title img
avatarImg.src = someOffer.author.avatar;
