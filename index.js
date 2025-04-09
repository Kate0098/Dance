document.addEventListener('DOMContentLoaded', function() {
    const cardsContainer = document.querySelector('.cards');
    document.querySelectorAll('.card');
    let isDragging = false;
    let startX = 0;

    cardsContainer.style.setProperty('--position', 3);

    function switchSlide(index) {
        cardsContainer.style.setProperty('--position', index);
    }

    cardsContainer.addEventListener('click', function(e) {
        const card = e.target.closest('.card');
        if (card && !isDragging) {
            const index = parseInt(card.getAttribute('data-index'), 10);
            switchSlide(index);
        }
    });

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
            const index = parseInt(card.getAttribute('data-index'), 10);
            switchSlide(index);
            card.style.transform = 'scale(0.98)';
            setTimeout(() => card.style.transform = '', 200);
        }
        isDragging = false;
    }, { passive: true });

    const burgerCheckbox = document.getElementById('burger-checkbox');
    document.querySelectorAll('.menu-item').forEach(item => {
        item.addEventListener('click', () => {
            burgerCheckbox.checked = false;
        });
    });
});