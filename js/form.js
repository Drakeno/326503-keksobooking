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
  var titleField = userForm.querySelector('#title');
  var guestsOpt = userForm.querySelectorAll('#capacity option');
  var roomsOpt = userForm.querySelectorAll('#room_number option');
  var TIMES = ['12:00', '13:00', '14:00'];
  var TYPES = ['flat', 'bungalo', 'house', 'palace'];
  var PRICES = [1000, 0, 5000, 10000];
  var ROOMS_COMBINATIONS = {
    '1': ['1'],
    '2': ['1', '2'],
    '3': ['1', '2', '3'],
    '100': ['0']
  };
  var GUESTS_COMBINATIONS = {
    '1': ['1', '2', '3'],
    '2': ['2', '3'],
    '3': ['3'],
    '0': ['100']
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

  var roomsCheck = function () {
    roomsOpt = [].slice.call(roomsOpt, null);
    roomsOpt.forEach(function (el) {
      if (el.disabled) {
        el.selected = false;
      }
    });
  };

  var roomNumberChangeCallBack = function (elements, value) {
    elements = [].slice.call(elements, null);
    elements.forEach(function (el) {
      el.disabled = !value.includes(el.value);
      if (!el.disabled) {
        roomCapacity.value = el.value;
      }
    });
  };

  var roomCapacityChangeCallBack = function (elements, value) {
    elements = [].slice.call(elements, null);
    elements.forEach(function (el) {
      el.disabled = !value.includes(el.value);
    });
    roomsCheck();
  };

  var roomAndGuestsReset = function () {
    roomsOpt.disabled = false;
    guestsOpt.disabled = false;
    roomNumber.value = '1';
    roomCapacity.value = '1';
  };

  roomAndGuestsReset();

  window.sync.synchronizeFields(houseType, housePrice, TYPES, PRICES, setTypePrice, 'min');
  window.sync.synchronizeFieldsSimple(roomNumber, guestsOpt, ROOMS_COMBINATIONS, roomNumberChangeCallBack);
  window.sync.synchronizeFieldsSimple(roomCapacity, roomsOpt, GUESTS_COMBINATIONS, roomCapacityChangeCallBack);

  var successHandler = function (successMessage) {
    var node = document.createElement('div');
    node.style.textAlign = 'center';
    node.id = 'successMess';
    node.style.color = 'white';
    node.textContent = successMessage;
    node.style.backgroundColor = 'green';
    node.style.fontSize = '30px';
    node.classList.add('success-message');
    userForm.insertAdjacentElement('afterbegin', node);
    userForm.reset();
    roomAndGuestsReset();
  };

  titleField.addEventListener('input', function (evt) {
    var target = evt.target;
    if (target.value.length < 30) {
      target.setCustomValidity('Заголовок должен состоять минимум из 30 символов');
    } else if (target.value.length > 100) {
      target.setCustomValidity('Заголовок не должен быть длиннее 100 символов');
    } else {
      target.setCustomValidity('');
    }
  });

  titleField.addEventListener('invalid', function () {
    if (!titleField.validity.valid) {
      if (titleField.validity.tooShort) {
        titleField.setCustomValidity('Заголовок должен состоять минимум из 30 символов');
      } else if (titleField.validity.tooLong) {
        titleField.setCustomValidity('Заголовок не должен быть длиннее 100 символов');
      } else if (titleField.validity.valueMissing) {
        titleField.setCustomValidity('Обязательное поле');
      }
    } else {
      titleField.setCustomValidity('');
    }
  });

  userForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    if (adressField.value === '') {
      var successMess = document.querySelector('#successMess');
      userForm.style.border = '3px solid red';
      window.helper.errorHandler('Пожалуйста, задайте адрес! Переместите большую оранжевую точку на карте');
      adressField.placeholder = 'Задайте адрес на карте выше!';
      if (successMess !== null) {
        successMess.style.display = 'none';
      }
    } else if (titleField.value.length < 30) {
      titleField.setCustomValidity('Заголовок должен состоять минимум из 30 символов');
    } else if (titleField.value.length > 100) {
      titleField.setCustomValidity('Заголовок не должен быть длиннее 100 символов');
    } else if (titleField.validity.valueMissing) {
      titleField.setCustomValidity('Обязательное поле');
    } else {
      var errorMess = document.querySelector('#errorMess');
      userForm.style.border = 'none';
      adressField.placeholder = '';
      titleField.setCustomValidity('');
      if (errorMess !== null) {
        errorMess.style.display = 'none';
      }
      window.backend.save(new FormData(userForm), successHandler, window.helper.errorHandler);
    }
  });
})();
