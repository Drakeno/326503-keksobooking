(function () {

  var userForm = document.querySelector('.notice__form');
  var timeIn = userForm.querySelector('#timein');
  var timeOut = userForm.querySelector('#timeout');
  var houseType = userForm.querySelector('#type');
  var housePrice = userForm.querySelector('#price');
  var roomNumber = userForm.querySelector('#room_number');
  var roomCapacity = userForm.querySelector('#capacity');
  var roomCapacityOption = roomCapacity.getElementsByTagName('option');
  var roomNumberOption = roomNumber.getElementsByTagName('option');
  var sbmButton = userForm.querySelector('.form__submit');

// Подстраивание селектов заезда/выезда друг под друга
  timeOut.onchange = function () {
    timeIn.value = timeOut.value;
  };

  timeIn.onchange = function () {
    timeOut.value = timeIn.value;
  };


// Синхронизация типа жилья с минимальной ценой
  houseType.onchange = function () {
    if (houseType.value === 'flat') {
      housePrice.min = 1000;
      housePrice.value = 1000; // TODO Не уверен, что value тоже стоит менять
    } else if (houseType.value === 'house') {
      housePrice.min = 5000;
      housePrice.value = 5000;
    } else if (houseType.value === 'palace') {
      housePrice.min = 10000;
      housePrice.value = 10000;
    } else {
      housePrice.min = 0;
      housePrice.value = 0;
    }
  };

// Подбор типа жилься в зависимости от цены
  housePrice.addEventListener('input', function () {
    if (housePrice.value >= 1000 && housePrice.value < 5000) {
      houseType.value = 'flat';
    } else if (housePrice.value >= 5000 && housePrice.value < 10000) {
      houseType.value = 'house';
    } else if (housePrice.value >= 10000) {
      houseType.value = 'palace';
    } else {
      houseType.value = 'bungalo';
    }
  });

// Количество комнат связано с количеством гостей:
// 1 комната — «для одного гостя»
// 2 комнаты — «для 2-х или 1-го гостя»
// 3 комнаты — «для 2-х, 1-го или 3-х гостей»
// 100 комнат — «не для гостей»

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

// 5 После отправки формы все значения должны сбрасываться на те, что были по умолчанию
  sbmButton.onclick = function () {
    userForm.reset();
  };
})();
