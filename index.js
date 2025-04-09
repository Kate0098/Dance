document.addEventListener('DOMContentLoaded', function() {
    const cardsContainer = document.querySelector('.cards');
    let startX = 0;
    let isDragging = false;

    // Функция для переключения слайда
    function switchSlide(slideId) {
        const radio = document.getElementById(slideId);
        if (radio && !radio.checked) {
            radio.checked = true;
            radio.dispatchEvent(new Event('change', { bubbles: true }));
        }
    }

    // Обработчик кликов для десктопов
    cardsContainer.addEventListener('click', function(e) {
        const card = e.target.closest('.card');
        if (card && !isDragging) {
            const slideId = card.getAttribute('data-slide');
            switchSlide(slideId);
        }
    });

    // Обработка касаний для iPhone и сенсорных устройств
    cardsContainer.addEventListener('touchstart', function(e) {
        startX = e.touches[0].clientX;
        isDragging = false;
    }, { passive: true });

    cardsContainer.addEventListener('touchmove', function(e) {
        const moveX = e.touches[0].clientX;
        if (Math.abs(moveX - startX) > 15) { // Увеличил порог до 15 пикселей
            isDragging = true;
        }
    }, { passive: true });

    cardsContainer.addEventListener('touchend', function(e) {
        const card = e.target.closest('.card');
        if (card && !isDragging) {
            const slideId = card.getAttribute('data-slide');
            switchSlide(slideId);
            card.style.transform = 'scale(0.98)';
            setTimeout(() => card.style.transform = '', 200);
        }
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