'use strict';

(function () {

  var userForm = document.querySelector('.notice__form');
  var timeIn = userForm.querySelector('#timein');
  var timeOut = userForm.querySelector('#timeout');
  var houseType = userForm.querySelector('#type');
  var housePrice = userForm.querySelector('#price');
  var roomNumber = userForm.querySelector('#room_number');
  var roomCapacity = userForm.querySelector('#capacity');
  var adressField = userForm.querySelector('.readonly');
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

  var setValue = function (element, value) {
    element.value = value;
  };

  window.sync.synchronizeFields(timeIn, timeOut, times, times, setValue, 'value');
  window.sync.synchronizeFields(timeOut, timeIn, times, times, setValue, 'value');

  var setTypePrice = function (element, value) {
    element.value = value;
    element.min = value;
  };

  window.sync.synchronizeFields(houseType, housePrice, types, prices, setTypePrice, 'min');

  window.sync.synchronizeFieldsSimple(roomNumber, guests, rooms, roomNumberChangeCallBack);

  function roomNumberChangeCallBack(elements, value) {
    elements.forEach(function (elementent) {
      elementent.disabled = !value.includes(elementent.value);
      if (!elementent.disabled) {
        roomCapacity.value = elementent.value;
      }
    });
  }

  var checkValitidy = function () {
    var element = null;

    for (var i = 0; i < userForm.elements.length; i++) {
      element = userForm.elements[i];
      if (!element.checkValidity) {
        element.classList.remove('invalid');
      } else {
        element.classList.add('invalid');
      }
    }
  };

  var successHandler = function (successMessage) {
    var node = document.createElement('div');
    node.style.zIndex = 100;
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.top = '200px';
    node.style.textAlign = 'center';
    node.style.color = 'white';
    node.textContent = successMessage;
    node.style.backgroundColor = 'green';
    node.style.fontSize = '30px';
    node.classList.add('success-message');
    document.body.insertAdjacentElement('afterbegin', node);
    userForm.reset();
  };

  adressField.addEventListener('keydown', function (e) {
    e.preventDefault();
  });

  adressField.oninvalid = function () {
    adressField.setCustomValidity('Пожалуйста, выберите адрес! Это делается перемещением большой оранжевой точки на карте');
  };

  userForm.addEventListener('submit', function (evt) {
    evt.preventDefault();

    if (!userForm.checkValidity()) {
      checkValitidy(userForm);
    } else {
      var formData = new FormData(userForm);
      window.backend.save(formData, successHandler, window.helper.errorHandler);
    }
  });
})();
