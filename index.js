document.addEventListener('DOMContentLoaded', function () {
    // Фиксация высоты для мобильных устройств
    function fixMobileHeight() {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
        const infoSection = document.querySelector('.info');
        if (infoSection) {
            infoSection.style.minHeight = 'calc(var(--vh, 1vh) * 55)';
        }
    }

    fixMobileHeight();
    window.addEventListener('resize', fixMobileHeight);

    // Карусель
    const cards = document.querySelectorAll('.card');
    const radioInputs = document.querySelectorAll('.carousel input[type="radio"]');
    const cardsContainer = document.querySelector('.cards');

    function switchSlide(slideId) {
        const radio = document.getElementById(slideId);
        if (!radio) {
            console.error(`Radio input with ID ${slideId} not found`);
            return;
        }
        if (radio.checked) return;

        // Запускаем анимацию
        cardsContainer.classList.add('animating');

        // Переключаем радиокнопку
        radio.checked = true;

        // Запускаем событие change
        const event = new Event('change', { bubbles: true, cancelable: true });
        radio.dispatchEvent(event);

        // Убираем класс анимации
        setTimeout(() => {
            cardsContainer.classList.remove('animating');
        }, 700);
    }

    cards.forEach((card) => {
        const slideId = card.getAttribute('data-slide');
        if (!slideId) {
            console.error('Card missing data-slide attribute');
            return;
        }

        // Удаляем существующие обработчики (на случай дублирования)
        card.removeEventListener('click', handleCardClick);
        card.removeEventListener('touchend', handleCardClick);

        // Обработчик click для десктопа
        card.addEventListener('click', function (e) {
            e.preventDefault();
            switchSlide(slideId);
        });

        // Обработчик touchend для iOS
        card.addEventListener('touchend', function (e) {
            e.preventDefault();
            switchSlide(slideId);

            // Эффект нажатия
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
        }, { passive: false });
    });

    radioInputs.forEach((input) => {
        // Удаляем существующие обработчики
        input.removeEventListener('change', handleRadioChange);
        input.removeEventListener('touchend', handleRadioTouch);

        // Обработчик change
        input.addEventListener('change', function () {
            if (this.checked) {
                switchSlide(this.id);
            }
        });

        // Обработчик touchend для радиокнопок
        input.addEventListener('touchend', function (e) {
            e.preventDefault();
            switchSlide(this.id);
        }, { passive: false });
    });

    // Бургер-меню
    const burgerCheckbox = document.getElementById('burger-checkbox');
    const menuItems = document.querySelectorAll('.menu-item');

    menuItems.forEach((item) => {
        item.addEventListener('click', () => {
            burgerCheckbox.checked = false;
        });
    });
});

// Функции для предотвращения дублирования
function handleCardClick(e) {}
function handleRadioChange() {}
function handleRadioTouch(e) {}

cards.forEach((card) => {
    card.addEventListener('touchstart', function () {
        console.log('Touch started on card:', card.getAttribute('data-slide'));
    });
});