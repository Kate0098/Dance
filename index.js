document.addEventListener('DOMContentLoaded', function() {
    // Определение типа устройства
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

    // Элементы карусели
    const carousel = document.querySelector('.carousel');
    const cardsContainer = document.querySelector('.cards');
    const cards = document.querySelectorAll('.card');
    const radioInputs = document.querySelectorAll('.carousel input[type="radio"]');

    // Переменные для touch-событий
    let startX = 0;
    let currentX = 0;
    let isDragging = false;
    let currentSlide = 3; // Начальный активный слайд

    // Фикс высоты для мобильных устройств
    function fixMobileHeight() {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
        document.querySelector('.info').style.minHeight = 'calc(var(--vh, 1vh) * 50)';
    }

    // Инициализация
    fixMobileHeight();
    window.addEventListener('resize', fixMobileHeight);

    // Функция переключения слайдов
    function switchSlide(slideIndex) {
        currentSlide = slideIndex;
        const radio = document.getElementById(`slide${slideIndex}`);
        if (radio && !radio.checked) {
            radio.checked = true;
            const event = new Event('change', { bubbles: true });
            radio.dispatchEvent(event);
        }
    }

    // Обработчики для touch-событий (для мобильных)
    if (isMobile) {
        cardsContainer.style.cursor = 'grab';

        cardsContainer.addEventListener('touchstart', handleTouchStart, { passive: false });
        cardsContainer.addEventListener('touchmove', handleTouchMove, { passive: false });
        cardsContainer.addEventListener('touchend', handleTouchEnd);

        // Для iOS добавляем дополнительные обработчики
        if (isIOS) {
            cardsContainer.addEventListener('touchcancel', handleTouchEnd);
        }
    }

    // Обработчики для кликов (для десктопа)
    cards.forEach((card, index) => {
        card.addEventListener('click', () => {
            if (!isDragging) { // Не срабатывает при драге
                switchSlide(index + 1);
            }
        });
    });

    // Обработчики touch-событий
    function handleTouchStart(e) {
        startX = e.touches[0].clientX;
        currentX = startX;
        isDragging = true;
        cardsContainer.style.transition = 'none';
    }

    function handleTouchMove(e) {
        if (!isDragging) return;
        e.preventDefault();

        const x = e.touches[0].clientX;
        const diff = x - currentX;
        currentX = x;

        // Плавное перемещение при драге
        cardsContainer.style.transform = `translateX(${diff}px)`;
    }

    function handleTouchEnd() {
        if (!isDragging) return;
        isDragging = false;
        cardsContainer.style.transition = 'transform 0.3s ease';
        cardsContainer.style.transform = 'translateX(0)';

        const diff = startX - currentX;
        const threshold = 50; // Порог для смены слайда

        if (diff > threshold && currentSlide < 6) {
            // Свайп влево - следующий слайд
            switchSlide(currentSlide + 1);
        } else if (diff < -threshold && currentSlide > 1) {
            // Свайп вправо - предыдущий слайд
            switchSlide(currentSlide - 1);
        }
    }

    // Бургер-меню
    const burgerCheckbox = document.getElementById('burger-checkbox');
    const menuItems = document.querySelectorAll('.menu-item');

    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            burgerCheckbox.checked = false;
        });
    });
});