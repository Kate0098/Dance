document.addEventListener('DOMContentLoaded', () => {
    const video = document.querySelector('.background-video');
    const playButton = document.querySelector('.play-button');

    // Принудительная остановка видео (даже если браузер пытается его запустить)
    video.pause();
    video.currentTime = 0;

    // Обработчик клика
    playButton.addEventListener('click', () => {
        video.classList.add('playing');
        playButton.classList.add('hidden');

        // Попытка воспроизведения с обработкой ошибок
        const playPromise = video.play();

        if (playPromise !== undefined) {
            playPromise
                .then(() => {
                    // Видео успешно запущено
                })
                .catch(error => {
                    // Показываем кнопку снова при ошибке
                    playButton.classList.remove('hidden');
                    console.error("Ошибка воспроизведения:", error);
                });
        }
    });

    // Блокировка автовоспроизведения через observer
    const observer = new MutationObserver(() => {
        if (video.playing) {
            video.pause();
            video.currentTime = 0;
        }
    });

    observer.observe(video, {
        attributes: true,
        attributeFilter: ['autoplay', 'muted']
    });
});