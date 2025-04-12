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

    // Проверка iOS
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) ||
        (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);

    // Карусель
    const cards = document.querySelectorAll('.card');
    const radioInputs = document.querySelectorAll('.carousel input[type="radio"]');
    const cardsContainer = document.querySelector('.cards');

    function switchSlide(slideId) {
        const radio = document.getElementById(slideId);
        if (!radio || radio.checked) return;

        cardsContainer.classList.add('animating');
        radio.checked = true;

        const event = new Event('change', { bubbles: true, cancelable: true });
        radio.dispatchEvent(event);

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

        // Универсальный обработчик для click и touchend
        card.addEventListener('click', function (e) {
            e.preventDefault();
            switchSlide(slideId);
        });

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
        input.addEventListener('change', function () {
            if (this.checked) {
                switchSlide(this.id);
            }
        });
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