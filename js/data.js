'use strict';

(function () {
  var TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
  var TYPES = ['flat', 'house', 'bungalo'];
  var TIMES = ['12:00', '13:00', '14:00'];
  var FEAUTURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  window.offers = createOffers();

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
})();
