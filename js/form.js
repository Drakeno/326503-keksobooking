'use strict';

(function () {

  var userForm = document.querySelector('.notice__form');
  var timeIn = userForm.querySelector('#timein');
  var timeOut = userForm.querySelector('#timeout');
  var houseType = userForm.querySelector('#type');
  var housePrice = userForm.querySelector('#price');
  var roomNumber = userForm.querySelector('#room_number');
  var roomCapacity = userForm.querySelector('#capacity');
  var adressField = userForm.querySelector('#address');
  var guests = userForm.querySelectorAll('#capacity option');
  var TIMES = ['12:00', '13:00', '14:00'];
  var TYPES = ['flat', 'bungalo', 'house', 'palace'];
  var PRICES = [1000, 0, 5000, 10000];
  var ROOMS = {
    '1': ['1'],
    '2': ['1', '2'],
    '3': ['1', '2', '3'],
    '100': ['0']
  };

  var setValue = function (element, value) {
    element.value = value;
  };

  window.sync.synchronizeFields(timeIn, timeOut, TIMES, TIMES, setValue, 'value');
  window.sync.synchronizeFields(timeOut, timeIn, TIMES, TIMES, setValue, 'value');

  var setTypePrice = function (element, value) {
    element.value = value;
    element.min = value;
  };

  window.sync.synchronizeFields(houseType, housePrice, TYPES, PRICES, setTypePrice, 'min');
  window.sync.synchronizeFieldsSimple(roomNumber, guests, ROOMS, roomNumberChangeCallBack);

  function roomNumberChangeCallBack(elements, value) {
    elements.forEach(function (el) {
      el.disabled = !value.includes(el.value);
      if (!el.disabled) {
        roomCapacity.value = el.value;
      }
    });
  }

  var successHandler = function (successMessage) {
    var node = document.createElement('div');
    node.style.textAlign = 'center';
    node.style.color = 'white';
    node.textContent = successMessage;
    node.style.backgroundColor = 'green';
    node.style.fontSize = '30px';
    node.classList.add('success-message');
    userForm.insertAdjacentElement('afterbegin', node);
    userForm.reset();
  };

  userForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    if (adressField.value === '') {
      userForm.style.border = '3px solid red';
      alert('Пожалуйста, задайте адрес! Это делается перемещением большой оранжевой точки на карте');
    } else {
      userForm.style.border = 'none';
      window.backend.save(new FormData(userForm), successHandler, window.helper.errorHandler);
    }
  });
})();
