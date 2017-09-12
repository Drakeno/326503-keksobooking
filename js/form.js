'use strict';

(function () {

  var userForm = document.querySelector('.notice__form');
  var timeIn = userForm.querySelector('#timein');
  var timeOut = userForm.querySelector('#timeout');
  var houseType = userForm.querySelector('#type');
  var housePrice = userForm.querySelector('#price');
  var roomNumber = userForm.querySelector('#room_number');
  var roomCapacity = userForm.querySelector('#capacity');
  var guests = userForm.querySelectorAll('#capacity option');
  var times = ['12:00', '13:00', '14:00'];
  var types = ['flat', 'bungalo', 'house', 'palace'];
  var prices = [1000, 0, 5000, 10000];
  var rooms = {
    '1': ['1'],
    '2': ['1', '2'],
    '3': ['1', '2', '3'],
    '100': ['0']
  };

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
  window.synchronizeFieldsSimple(roomNumber, guests, rooms, roomNumberChangeCallBack);

  function roomNumberChangeCallBack(elements, value) {
    elements.forEach(function (elementent) {
      elementent.disabled = !value.includes(elementent.value);
      if (!elementent.disabled) {
        roomCapacity.value = elementent.value;
      }
    });
  }

  // Следим за отправкой формы и навешиваем нужный статус
  var checkValitidy = function () {
    var element = null;

    for (var i = 0; i < userForm.elements.length; i++) {
      element = userForm.elements[i];

      if (!element.checkValidity()) {
        element.classList.add('invalid');
      } else {
        element.classList.remove('invalid');
      }
    }
  };

  var successHandler = function (successMessage) {
    var node = document.createElement('div');
    node.style.zIndex = 100;
    node.style.position = 'absolute';
    node.style.top = '300px';
    node.textContent = successMessage;
    node.style.backgroundColor = 'green';
    node.style.fontSize = '30px';
    node.classList.add('success-message');
    document.body.insertAdjacentElement('afterbegin', node);
    userForm.reset();
  };

  userForm.addEventListener('submit', function (evt) {
    evt.preventDefault();

    if (!userForm.checkValidity()) {
      checkValitidy(userForm);
    } else {
      window.backend.save(new FormData(userForm), successHandler, window.helper.errorHandler);
    }
  });
})();
