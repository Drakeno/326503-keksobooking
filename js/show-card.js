// Функция для подсветки, открытия диалогового окна
window.showCard = (function () {
    var map = document.querySelector('.tokyo__pin-map');
    var offerInfo = document.querySelector('.dialog');
    
    // Закрываем всплывающее окно по дефолту
    offerInfo.classList.add('hidden');

    // Закрытие окна на ESC
    var onPopupEscPress = function (evt) {
        if (evt.keyCode === ESC_KEYCODE) {
            closePopup();
        }
    };

    // Функция закрытия попапа + удаление Esc листнера + удаление активного pin
    var closePopup = function () {
        var selectedPin = document.querySelector('.pin--active');
        offerInfo.classList.add('hidden');
        selectedPin.classList.remove('pin--active');
        document.removeEventListener('keydown', onPopupEscPress);
    };

    return {
        showCard: function showCard(event) {
            var target = event.target;


            // Функция открытия попапа + добавление Esc листнера + Добавление активного класса
            var openPopup = function () {
                offerInfo.classList.remove('hidden');
                document.addEventListener('keydown', onPopupEscPress);
            };

            if (event.type === 'click' || event.keyCode === ENTER_KEYCODE) {
                while (target !== map) {
                    if (target.className === 'pin') {
                        for (var l = 0; l < map.children.length; l++) {
                            if (map.children[l] === target) {
                                window.offerCard.dialogAppear(l - 1); // Компенсация main-pin
                            }
                        }
                        window.offerPin.pinLighted(target);
                        openPopup();
                        return;
                    }
                    target = target.parentNode;
                }
            }
        }
    };
})();