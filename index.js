document.addEventListener('DOMContentLoaded', function() {
    function fixMobileHeight() {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);

        const infoSection = document.querySelector('.info');
        if (infoSection) {
            infoSection.style.minHeight = 'calc(var(--vh, 1vh) * 50)';
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
    }

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

    let autoSlideInterval = null;
    function startAutoSlide() {
        if (window.innerWidth <= 768) {
            const radioInputs = document.querySelectorAll('.carousel input[type="radio"]');
            let currentIndex = Array.from(radioInputs).findIndex(input => input.checked);
            if (currentIndex === -1) currentIndex = 0;

            autoSlideInterval = setInterval(() => {
                currentIndex = (currentIndex + 1) % radioInputs.length;
                const slideId = radioInputs[currentIndex].id;
                switchSlide(slideId);
                smoothSwitch(slideId);
            }, 3000);
        }
    }

    function stopAutoSlide() {
        if (autoSlideInterval) {
            clearInterval(autoSlideInterval);
            autoSlideInterval = null;
        }
    }

    startAutoSlide();
    window.addEventListener('resize', () => {
        stopAutoSlide();
        startAutoSlide();
    });

    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        const slideId = card.getAttribute('data-slide');

        function handleInteraction(e) {
            e.preventDefault();
            stopAutoSlide();
            switchSlide(slideId);
            smoothSwitch(slideId);

            card.style.transform = 'scale(0.98)';
            setTimeout(() => {
                card.style.transform = '';
            }, 200);

            setTimeout(startAutoSlide, 10000);
        }

        card.addEventListener('click', handleInteraction);

        card.addEventListener('touchend', handleInteraction, { passive: false });
    });

    const radioInputs = document.querySelectorAll('.carousel input[type="radio"]');
    radioInputs.forEach(input => {
        input.addEventListener('change', function() {
            if (this.checked) {
                smoothSwitch(this.id);
            }
        });
    });

    const burgerCheckbox = document.getElementById('burger-checkbox');
    const menuItems = document.querySelectorAll('.menu-item');

    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            burgerCheckbox.checked = false;
        });
    });
});