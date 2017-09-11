'use strict';

window.synchronizeFields = (function () {
// Синхронизация полей времени заезда и выезда
    var timeIn = document.querySelector('#timein');
    var timeOut = document.querySelector('#timeout');

    var syncValues = function (element, value) {
        element.value = value;
    };
    
    window.synchronizeFields(timeIn, timeOut, ['12:00', '13:00', '14:00'], ['12:00', '13:00', '14:00'], syncValues);

// Синхронизация типа жилья и минимальной цены
    var houseType = document.querySelector('#type');
    var housePrice = document.querySelector('#price');

    var syncValueWithMin = function (element, value) {
        element.min = value;
    };

// Односторонняя синхронизация значения первого поля с минимальным значением второго
    window.synchronizeFields(houseType, housePrice, ['flat', 'house', 'palace'], [1000, 5000, 10000], syncValueWithMin);
});