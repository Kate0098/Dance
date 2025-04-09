document.addEventListener('DOMContentLoaded', function() {
    const cardsContainer = document.querySelector('.cards');
    const radioInputs = document.querySelectorAll('.carousel input[type="radio"]');
    let startX = 0;
    let isDragging = false;
    let touchTimeout;

    // Функция для переключения слайда
    function switchSlide(slideId) {
        const radio = document.getElementById(slideId);
        if (radio && !radio.checked) {
            radio.checked = true;
            radio.dispatchEvent(new Event('change', { bubbles: true }));
        }
    }

    // Обработчик нажатий через click (для десктопов)
    cardsContainer.addEventListener('click', function(e) {
        const card = e.target.closest('.card');
        if (card && !isDragging) {
            const slideId = card.getAttribute('data-slide');
            switchSlide(slideId);
        }
    });

    // Обработка касаний для iPhone и других сенсорных устройств
    cardsContainer.addEventListener('touchstart', function(e) {
        startX = e.touches[0].clientX;
        isDragging = false;

        // Задержка для определения, тап это или свайп
        touchTimeout = setTimeout(() => {
            const card = e.target.closest('.card');
            if (card && !isDragging) {
                const slideId = card.getAttribute('data-slide');
                switchSlide(slideId);
                card.style.transform = 'scale(0.98)';
                setTimeout(() => card.style.transform = '', 200);
            }
        }, 150); // Задержка в 150 мс для распознавания тапа
    }, { passive: true });

    cardsContainer.addEventListener('touchmove', function(e) {
        const moveX = e.touches[0].clientX;
        if (Math.abs(moveX - startX) > 10) { // Порог для свайпа
            isDragging = true;
            clearTimeout(touchTimeout); // Отменяем тап, если начался свайп
        }
    }, { passive: true });

    cardsContainer.addEventListener('touchend', function(e) {
        clearTimeout(touchTimeout); // Очищаем таймер при завершении касания
        isDragging = false;
    }, { passive: true });

    // Бургер-меню (без изменений)
    const burgerCheckbox = document.getElementById('burger-checkbox');
    document.querySelectorAll('.menu-item').forEach(item => {
        item.addEventListener('click', () => {
            burgerCheckbox.checked = false;
        });
    });
});