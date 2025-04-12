document.addEventListener('DOMContentLoaded', function() {
    // Проверяем iOS устройство
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) ||
        (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);

    // Элементы карусели
    const cardsContainer = document.querySelector('.cards');
    const cards = document.querySelectorAll('.card');
    const radioInputs = document.querySelectorAll('.carousel input[type="radio"]');

    // Функция для переключения слайда
    function switchSlide(slideId) {
        const radio = document.getElementById(slideId);
        if (!radio || radio.checked) return;

        // Добавляем класс анимации
        cardsContainer.classList.add('animating');

        // Устанавливаем новую позицию
        radio.checked = true;

        // Для iOS добавляем небольшой таймаут
        if (isIOS) {
            setTimeout(() => {
                cardsContainer.classList.remove('animating');
            }, 100);
        } else {
            cardsContainer.classList.remove('animating');
        }
    }

    // Обработчики для карточек
    cards.forEach(card => {
        const slideId = card.getAttribute('data-slide');

        // Клик для десктопов
        card.addEventListener('click', () => {
            switchSlide(slideId);
        });

        // Особый обработчик для iOS
        if (isIOS) {
            let startX = 0;
            let moved = false;

            card.addEventListener('touchstart', (e) => {
                startX = e.touches[0].clientX;
                moved = false;
            }, { passive: true });

            card.addEventListener('touchmove', (e) => {
                if (Math.abs(e.touches[0].clientX - startX) > 10) {
                    moved = true;
                }
            }, { passive: true });

            card.addEventListener('touchend', (e) => {
                if (!moved) {
                    e.preventDefault();
                    switchSlide(slideId);

                    // Эффект нажатия
                    card.style.transform = card.style.transform + ' scale(0.98)';
                    setTimeout(() => {
                        card.style.transform = card.style.transform.replace(' scale(0.98)', '');
                    }, 200);
                }
            }, { passive: false });
        }
    });

    // Обработчики для радио-кнопок
    radioInputs.forEach(input => {
        input.addEventListener('change', function() {
            if (this.checked) {
                switchSlide(this.id);
            }
        });
    });

    // Бургер-меню
    const burgerCheckbox = document.getElementById('burger-checkbox');
    const menuItems = document.querySelectorAll('.menu-item');

    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            burgerCheckbox.checked = false;
        });
    });
});