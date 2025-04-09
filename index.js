document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.card');
    const radioInputs = document.querySelectorAll('.carousel input[type="radio"]');
    let startX = 0;
    let isDragging = false;

    // Функция для переключения слайда
    function switchSlide(slideId) {
        const radio = document.getElementById(slideId);
        if (radio && !radio.checked) {
            radio.checked = true;
            // Имитируем событие change для обновления интерфейса
            const event = new Event('change', { bubbles: true });
            radio.dispatchEvent(event);
        }
    }

    // Обработчики для кликов
    cards.forEach(card => {
        card.addEventListener('click', function(e) {
            if (!isDragging) { // Проверяем, не было ли это частью свайпа
                const slideId = this.getAttribute('data-slide');
                switchSlide(slideId);
            }
        });
    });

    // Обработчики для касаний (для мобильных устройств)
    cards.forEach(card => {
        card.addEventListener('touchstart', function(e) {
            startX = e.touches[0].clientX;
            isDragging = false;
        }, { passive: true });

        card.addEventListener('touchmove', function(e) {
            if (Math.abs(e.touches[0].clientX - startX) > 10) {
                isDragging = true; // Пользователь начал свайп
            }
        }, { passive: true });

        card.addEventListener('touchend', function(e) {
            if (!isDragging) {
                const slideId = this.getAttribute('data-slide');
                switchSlide(slideId);
                this.style.transform = 'scale(0.98)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 200);
            }
            isDragging = false;
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