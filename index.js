document.addEventListener('DOMContentLoaded', function() {
    const cardsContainer = document.querySelector('.cards');
    const cards = document.querySelectorAll('.card');
    let currentPosition = 3; // Начальная позиция (центр)
    let isDragging = false;
    let startX = 0;

    // Устанавливаем начальную позицию
    cardsContainer.style.setProperty('--position', currentPosition);

    // Функция для обновления позиции карусели
    function updatePosition(newPosition) {
        const totalCards = cards.length;
        currentPosition = Math.max(1, Math.min(newPosition, totalCards)); // Ограничение от 1 до 6
        cardsContainer.style.setProperty('--position', currentPosition);
    }

    // Обработка событий для каждой карточки
    cards.forEach(card => {
        // Клик (для десктопов)
        card.addEventListener('click', function() {
            const cardIndex = parseInt(this.getAttribute('data-index'), 10);
            if (cardIndex > currentPosition) {
                updatePosition(currentPosition + 1); // Сдвиг вправо
            } else if (cardIndex < currentPosition) {
                updatePosition(currentPosition - 1); // Сдвиг влево
            }
            this.style.transform = 'scale(0.98)';
            setTimeout(() => this.style.transform = '', 200);
        });

        // Касание (для iPhone)
        card.addEventListener('touchstart', function(e) {
            startX = e.touches[0].clientX;
            isDragging = false;
        }, { passive: true });

        card.addEventListener('touchmove', function(e) {
            const moveX = e.touches[0].clientX;
            if (Math.abs(moveX - startX) > 15) {
                isDragging = true;
            }
        }, { passive: true });

        card.addEventListener('touchend', function(e) {
            if (!isDragging) {
                const cardIndex = parseInt(this.getAttribute('data-index'), 10);
                console.log('Нажата карта:', cardIndex);
                if (cardIndex > currentPosition) {
                    updatePosition(currentPosition + 1); // Сдвиг вправо
                } else if (cardIndex < currentPosition) {
                    updatePosition(currentPosition - 1); // Сдвиг влево
                }
                this.style.transform = 'scale(0.98)';
                setTimeout(() => this.style.transform = '', 200);
            }
            isDragging = false;
        }, { passive: true });
    });

    // Бургер-меню
    const burgerCheckbox = document.getElementById('burger-checkbox');
    document.querySelectorAll('.menu-item').forEach(item => {
        item.addEventListener('click', () => {
            burgerCheckbox.checked = false;
        });
    });
});