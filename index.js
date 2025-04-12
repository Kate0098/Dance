document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.card');
    const radioInputs = document.querySelectorAll('.carousel input[type="radio"]');

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

    cards.forEach(card => {
        card.addEventListener('click', () => {
            const slideId = card.getAttribute('data-slide');
            smoothSwitch(slideId);
        });
    });

    radioInputs.forEach(input => {
        input.addEventListener('change', function() {
            if (this.checked) {
                smoothSwitch(this.id);
            }
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const burgerCheckbox = document.getElementById('burger-checkbox');
    const menuItems = document.querySelectorAll('.menu-item');

    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            burgerCheckbox.checked = false;
        });
    });

});

document.addEventListener('DOMContentLoaded', function() {
    // Фиксируем высоту для мобильных устройств
    function fixMobileHeight() {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);

        const infoSection = document.querySelector('.info');
        if (infoSection) {
            infoSection.style.minHeight = 'calc(var(--vh, 1vh) * 55)';
        }
    }

    fixMobileHeight();
    window.addEventListener('resize', fixMobileHeight);

    function switchSlide(slideId) {
        const radio = document.getElementById(slideId);
        if (!radio) return;

        radio.checked = true;

        const event = new Event('change', { bubbles: true });
        radio.dispatchEvent(event);

        if (isIOS) {
            const event = new Event('change', {
                bubbles: true,
                cancelable: true
            });
            radio.dispatchEvent(event);
        }
    }

    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('click', function(e) {
            e.preventDefault();
            const slideId = this.getAttribute('data-slide');
            switchSlide(slideId);
        });

        card.addEventListener('touchend', function(e) {
            e.preventDefault();
            const slideId = this.getAttribute('data-slide');
            switchSlide(slideId);

            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
        }, { passive: false });
    });

    const burgerCheckbox = document.getElementById('burger-checkbox');
    const menuItems = document.querySelectorAll('.menu-item');

    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            burgerCheckbox.checked = false;
        });
    });
});

const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) ||
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);

function handleCardClick(e, card) {
    if (isIOS) {
        e.preventDefault();
        const slideId = card.getAttribute('data-slide');
        switchSlide(slideId);

        // Добавляем анимацию нажатия для iOS
        card.style.transform = 'scale(0.98)';
        setTimeout(() => {
            card.style.transform = '';
        }, 200);
    }
}

cards.forEach(card => {
    card.addEventListener('click', (e) => handleCardClick(e, card));
    card.addEventListener('touchend', (e) => handleCardClick(e, card), { passive: false });
});