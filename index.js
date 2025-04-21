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

        // Принудительно запускаем событие change
        const event = new Event('change', { bubbles: true });
        radio.dispatchEvent(event);
    }

    // Функция плавного переключения слайдов
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

    // Обработчики для карточек карусели
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        const slideId = card.getAttribute('data-slide');

        // Универсальный обработчик для click и touchend
        function handleInteraction(e) {
            e.preventDefault(); // Предотвращаем нежелательное поведение (например, прокрутку)
            switchSlide(slideId);
            smoothSwitch(slideId);

            // Визуальная обратная связь
            card.style.transform = 'scale(0.98)';
            setTimeout(() => {
                card.style.transform = '';
            }, 200);
        }

        // Добавляем обработчик для click
        card.addEventListener('click', handleInteraction);

        // Добавляем обработчик для touchend
        card.addEventListener('touchend', handleInteraction, { passive: false });
    });

    // Обработчики для радио-кнопок
    const radioInputs = document.querySelectorAll('.carousel input[type="radio"]');
    radioInputs.forEach(input => {
        input.addEventListener('change', function() {
            if (this.checked) {
                smoothSwitch(this.id);
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