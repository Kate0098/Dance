document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.card');
    const radioInputs = document.querySelectorAll('.carousel input[type="radio"]');

    function smoothSwitch(slideId) {
        const radio = document.getElementById(slideId);
        if (radio && !radio.checked) {
            document.querySelector('.cards').classList.add('animating');

            radio.checked = true;

            setTimeout(() => {
                document.querySelector('.cards').classList.remove('animating');
            }, 700);
        }
    }

    cards.forEach(card => {
        card.addEventListener('click', () => {
            const slideId = card.getAttribute('data-slide');
            smoothSwitch(slideId);
        });
    });

    radioInputs.forEach(input => {
        input.addEventListener('change', function() {
            if (this.checked) {
                smoothSwitch(this.id);
            }
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const burgerCheckbox = document.getElementById('burger-checkbox');
    const menuItems = document.querySelectorAll('.menu-item');

    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            burgerCheckbox.checked = false;
        });
    });

});

document.addEventListener('DOMContentLoaded', function() {
    // Фиксируем высоту для мобильных устройств
    function fixMobileHeight() {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);

        const infoSection = document.querySelector('.info');
        if (infoSection) {
            infoSection.style.minHeight = 'calc(var(--vh, 1vh) * 50)';
        }
    }

    // Инициализация высоты
    fixMobileHeight();
    window.addEventListener('resize', fixMobileHeight);

    // Функция переключения слайдов
    function switchSlide(slideId) {
        const radio = document.getElementById(slideId);
        if (!radio) return;

        radio.checked = true;

        // Принудительно запускаем событие для мобильных устройств
        const event = new Event('change', { bubbles: true });
        radio.dispatchEvent(event);
    }

    // Обработчики для карточек
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        // Обработчик для клика (десктоп и часть мобильных)
        card.addEventListener('click', function(e) {
            e.preventDefault();
            const slideId = this.getAttribute('data-slide');
            switchSlide(slideId);
        });

        // Обработчик для касания (мобильные устройства)
        card.addEventListener('touchend', function(e) {
            e.preventDefault();
            const slideId = this.getAttribute('data-slide');
            switchSlide(slideId);

            // Визуальная обратная связь
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
        }, { passive: false });
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
