'use strict';

(function () {

  var userForm = document.querySelector('.notice__form');
  var timeIn = userForm.querySelector('#timein');
  var timeOut = userForm.querySelector('#timeout');
  var houseType = userForm.querySelector('#type');
  var housePrice = userForm.querySelector('#price');
  var roomNumber = userForm.querySelector('#room_number');
  var roomCapacity = userForm.querySelector('#capacity');
  var times = ['12:00', '13:00', '14:00'];
  var types = ['flat', 'bungalo', 'house', 'palace'];
  var prices = [1000, 0, 5000, 10000];
  //  var rooms = ['1', '2', '3', '100'];
  //  var guestsCapacity = ['1', '2', '3', '0'];

  // синхронизация времени заезда/выезда
  var setValue = function (element, value) {
    element.value = value;
  };

  window.synchronizeFields(timeIn, timeOut, times, times, setValue, 'value');
  window.synchronizeFields(timeOut, timeIn, times, times, setValue, 'value');

  // синхронизация типов жилья и стоимости заезда/выезда

  var setTypePrice = function (element, value) {
    element.value = value;
    element.min = value;
  };

  window.synchronizeFields(houseType, housePrice, types, prices, setTypePrice, 'min');

  // Синхронизация количества комнат с гостями
  //  window.synchronizeFields(roomNumber, roomCapacity, rooms, guestsCapacity, setValue);
  // window.synchronizeFields(roomCapacity, roomNumber, guestsCapacity, rooms, setValue);

  var roomCapacityOption = roomCapacity.getElementsByTagName('option');
  var roomNumberOption = roomNumber.getElementsByTagName('option');

  // Подбор количества мест под количество комнат
  roomNumber.onchange = function () {
    for (var n = 0; n < roomCapacityOption.length; n++) {
      roomCapacityOption[n].disabled = true;
      if (roomNumber.value === '1' && roomCapacityOption[n].value === '1') {
        roomCapacityOption[n].disabled = false;
        roomCapacityOption[n].selected = true;
      } else if (roomNumber.value === '2' && (roomCapacityOption[n].value === '1' || roomCapacityOption[n].value === '2')) {
        roomCapacityOption[n].disabled = false;
      } else if (roomNumber.value === '3' && (roomCapacityOption[n].value === '1' || roomCapacityOption[n].value === '2' || roomCapacityOption[n].value === '3')) {
        roomCapacityOption[n].disabled = false;
      } else if (roomNumber.value === '100' && roomCapacityOption[n].value === '0') {
        roomCapacityOption[n].disabled = false;
        roomCapacityOption[n].selected = true;
      }
    }
  };

  // Подбор количества комнат под количество мест
  roomCapacity.onchange = function () {
    for (var m = 0; m < roomNumberOption.length; m++) {
      roomNumberOption[m].disabled = true;
      if (roomNumberOption[m].value === '1' && roomCapacity.value === '1') {
        roomNumberOption[m].disabled = false;
        roomNumberOption[m].selected = true;
      } else if (roomCapacity.value === '2' && (roomNumberOption[m].value === '2' || roomNumberOption[m].value === '3')) {
        roomNumberOption[m].disabled = false;
      } else if (roomCapacity.value === '3' && roomNumberOption[m].value === '3') {
        roomNumberOption[m].disabled = false;
      } else if (roomCapacity.value === '0' && roomNumberOption[m].value === '100') {
        roomNumberOption[m].disabled = false;
        roomNumberOption[m].selected = true;
      }
    }
  };

  // Следим за отправкой формы и навешиваем нужный статус
  userForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.backendSave(new FormData(userForm), function () {
      userForm.reset();
    });
  });
})();
