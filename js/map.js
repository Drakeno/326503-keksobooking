'use strict';
var TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var TYPES = ['flat', 'house', 'bungalo'];
var TIMES = ['12:00', '13:00', '14:00'];
var FEAUTURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PIN_HEIGHT = 75;
var PIN_WIDTH = 56;
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

var offers = createOffers();
var map = document.querySelector('.tokyo__pin-map');
var fragment = document.createDocumentFragment();
var offerPopupTemplate = document.querySelector('#lodge-template');
var offerInfo = document.querySelector('.dialog');
var offerInfoClose = offerInfo.querySelector('.dialog__close');
var avatarImg = offerInfo.querySelector('.dialog__title img');
var selectedPin;

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
  offerInfo.classList.add('hidden');
  selectedPin.classList.remove('pin--active');
  document.removeEventListener('keydown', onPopupEscPress);
};

// Функция для активации pin и деактивации другого
function highlight(node) {
  if (selectedPin) {
    selectedPin.classList.remove('pin--active');
  }
  selectedPin = node;
  selectedPin.classList.add('pin--active');
}

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
    var xCoord = randomInteger(300, 900);
    var yCoord = randomInteger(100, 500);

    offersArrays.push({
      author: {
        avatar: 'img/avatars/user0' + avatarNumbers[i] + '.png'
      },
      offer: {
        title: TITLES[i],
        address: xCoord + ' ' + yCoord,
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
        x: xCoord,
        y: yCoord
      }
    });
  }
  return offersArrays;
}

// Рендерим точки
var renderOfferPin = function (offer) {
  var newPoint = document.createElement('div');

  newPoint.className = 'pin';
  newPoint.tabIndex = '0';
  newPoint.style.left = offer.location.x - PIN_WIDTH / 2 + 'px'; // Координаты появления с учетом размеров метки
  newPoint.style.top = offer.location.y - PIN_HEIGHT + 'px';
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

  var features = '';
  var length = someOffer.offer.features.length;
  var j;
  var type = '';

  // Подгрузка иконок
  for (j = 0; j < length; j++) {
    features += '<span class="feature__image feature__image--' + someOffer.offer.features[j] + '"></span>';
  }

  // Замена слов типа жилья
  switch (someOffer.offer.type) {
    case 'flat':
      type = 'Квартира';
      break;
    case 'house':
      type = 'Дом';
      break;
    case 'bungalo':
      type = 'Бунгало';
      break;
    default:
      break;
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
function createDialogInfo(k) {
  var someOffer = offers[k];
  var offerInfoContent = offerInfo.querySelector('.dialog__panel');
  var oldInfoNode = offerInfoContent.parentNode;
  fragment.appendChild(renderOfferInfo(someOffer)); // Создаем фрагмент на основе объекта
  oldInfoNode.replaceChild(fragment, offerInfoContent); // Заменяем данные в существующем блоке dialog__panel

  avatarImg.src = someOffer.author.avatar;
}

// Закрываем всплывающее окно по дефолту
offerInfo.classList.add('hidden');

// Отслеживаем клики по пинам на карте и подсвечиваем, открываем диалоговое окно
map.addEventListener('click', function () {
  var target = event.target;

  while (target !== map) {
    if (target.className === 'pin') {
      for (var l = 0; l < map.children.length; l++) {
        if (map.children[l] === target) {
          createDialogInfo(l - 1); // Компенсация main-pin
        }
      }
      highlight(target);
      openPopup();
      return;
    }
    target = target.parentNode;
  }
});

// То же самое, но отслеживаем теперь нажатия Enter по элементам
map.addEventListener('keydown', function (evt) {
  var target = event.target;

  while (target !== map) {
    if (target.className === 'pin' && evt.keyCode === ENTER_KEYCODE) {
      for (var m = 0; m < map.children.length; m++) {
        if (map.children[m] === target) {
          createDialogInfo(m - 1); // Компенсация main-pin
        }
      }
      highlight(target);
      openPopup();
      return;
    }
    target = target.parentNode;
  }
});

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
