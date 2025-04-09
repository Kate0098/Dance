document.addEventListener('DOMContentLoaded', function() {
    const cardsContainer = document.querySelector('.cards');
    let currentPosition = 3; // Начальная позиция (центр)
    let isDragging = false;
    let startX = 0;

    // Устанавливаем начальную позицию
    cardsContainer.style.setProperty('--position', currentPosition);

    // Функция для обновления позиции карусели
    function updatePosition(newPosition) {
        const totalCards = document.querySelectorAll('.card').length;
        currentPosition = Math.max(1, Math.min(newPosition, totalCards)); // Ограничение от 1 до 6
        cardsContainer.style.setProperty('--position', currentPosition);
    }

    // Обработка кликов (для десктопов)
    cardsContainer.addEventListener('click', function(e) {
        const card = e.target.closest('.card');
        if (card && !isDragging) {
            const cardIndex = parseInt(card.getAttribute('data-index'), 10);
            if (cardIndex > currentPosition) {
                updatePosition(currentPosition + 1); // Сдвиг вправо
            } else if (cardIndex < currentPosition) {
                updatePosition(currentPosition - 1); // Сдвиг влево
            }
            card.style.transform = 'scale(0.98)';
            setTimeout(() => card.style.transform = '', 200);
        }
    });

    // Обработка касаний (для iPhone)
    cardsContainer.addEventListener('touchstart', function(e) {
        startX = e.touches[0].clientX;
        isDragging = false;
    }, { passive: true });

    cardsContainer.addEventListener('touchmove', function(e) {
        const moveX = e.touches[0].clientX;
        if (Math.abs(moveX - startX) > 15) {
            isDragging = true;
        }
    }, { passive: true });

    cardsContainer.addEventListener('touchend', function(e) {
        const card = e.target.closest('.card');
        if (card && !isDragging) {
            const cardIndex = parseInt(card.getAttribute('data-index'), 10);
            if (cardIndex > currentPosition) {
                updatePosition(currentPosition + 1); // Сдвиг вправо
            } else if (cardIndex < currentPosition) {
                updatePosition(currentPosition - 1); // Сдвиг влево
            }
            card.style.transform = 'scale(0.98)';
            setTimeout(() => card.style.transform = '', 200);
        }
        isDragging = false;
    }, { passive: true });

    // Бургер-меню
    const burgerCheckbox = document.getElementById('burger-checkbox');
    document.querySelectorAll('.menu-item').forEach(item => {
        item.addEventListener('click', () => {
            burgerCheckbox.checked = false;
        });
    });
});