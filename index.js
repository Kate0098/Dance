function fixIOSViewport() {
    // Фикс для высоты на iOS
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    if (isIOS) {
        const setVH = () => {
            const vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        };

        setVH();
        window.addEventListener('resize', setVH);

        // Применяем к секции
        const infoSection = document.querySelector('.info');
        if (infoSection) {
            infoSection.style.minHeight = 'calc(var(--vh, 1vh) * 100)';
        }
    }
}

document.addEventListener('DOMContentLoaded', function() {
    fixIOSViewport();

    document.addEventListener('DOMContentLoaded', function () {
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
            input.addEventListener('change', function () {
                if (this.checked) {
                    smoothSwitch(this.id);
                }
            });
        });
    });

    document.addEventListener('DOMContentLoaded', function () {
        const burgerCheckbox = document.getElementById('burger-checkbox');
        const menuItems = document.querySelectorAll('.menu-item');

        menuItems.forEach(item => {
            item.addEventListener('click', () => {
                burgerCheckbox.checked = false;
            });
        });

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
            input.addEventListener('change', function () {
                if (this.checked) {
                    smoothSwitch(this.id);
                }
            });
        });
    });
});
