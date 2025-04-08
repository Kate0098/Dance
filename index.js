document.addEventListener('DOMContentLoaded', function() {
    // Определяем iOS устройство
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

    // Функция для переключения слайдов
    function switchSlide(slideId) {
        const radio = document.getElementById(slideId);
        if (!radio) return;

        radio.checked = true;

        // Для iOS создаем и запускаем событие вручную
        if (isIOS) {
            const event = new Event('change', {
                bubbles: true,
                cancelable: true
            });
            radio.dispatchEvent(event);
        }
    }

    // Обработчики для карточек
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        // Для iOS используем touchend, для других - click
        if (isIOS) {
            // Обработчик для касания (iOS)
            card.addEventListener('touchend', function(e) {
                e.preventDefault();
                const slideId = this.getAttribute('data-slide');
                switchSlide(slideId);

                // Визуальная обратная связь
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 150);
            }, { passive: false });
        } else {
            // Обработчик для клика (не-iOS)
            card.addEventListener('click', function() {
                const slideId = this.getAttribute('data-slide');
                switchSlide(slideId);
            });
        }
    });

    // Остальной код (бургер-меню и т.д.)
    const burgerCheckbox = document.getElementById('burger-checkbox');
    const menuItems = document.querySelectorAll('.menu-item');

    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            burgerCheckbox.checked = false;
        });
    });
});