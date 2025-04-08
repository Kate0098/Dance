document.addEventListener('DOMContentLoaded', function() {
    // Фикс для iOS
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

    // Функция для переключения слайдов
    function smoothSwitch(slideId) {
        const radio = document.getElementById(slideId);
        if (radio && !radio.checked) {
            document.querySelector('.cards').classList.add('animating');
            radio.checked = true;

            // Для iOS добавляем принудительное обновление
            if (isIOS) {
                const event = new Event('change', { bubbles: true });
                radio.dispatchEvent(event);
            }

            setTimeout(() => {
                document.querySelector('.cards').classList.remove('animating');
            }, 700);
        }
    }

    // Обработчики для карточек
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        // Добавляем оба обработчика для кросс-браузерности
        card.addEventListener('click', handleCardClick);
        card.addEventListener('touchstart', handleCardClick, { passive: true });
    });

    function handleCardClick(e) {
        if (isIOS) e.preventDefault(); // Только для iOS
        const slideId = this.getAttribute('data-slide');
        smoothSwitch(slideId);
    }

    // Остальной ваш код (бургер-меню и т.д.)
    const burgerCheckbox = document.getElementById('burger-checkbox');
    const menuItems = document.querySelectorAll('.menu-item');

    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            burgerCheckbox.checked = false;
        });
    });

    // iOS-specific fixes
    if (isIOS) {
        // Фикс для 100vh на iOS
        const setVH = () => {
            const vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        };
        setVH();
        window.addEventListener('resize', setVH);

        // Применяем к секции
        const infoSection = document.querySelector('.info');
        if (infoSection) {
            infoSection.style.minHeight = 'calc(var(--vh, 1vh) * 100)';
        }

        // Добавляем задержку для карточек на iOS
        cards.forEach(card => {
            card.style.cursor = 'pointer';
            card.style.webkitTapHighlightColor = 'transparent';
        });
    }
});