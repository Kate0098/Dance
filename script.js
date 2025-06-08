document.addEventListener('DOMContentLoaded', () => {
    const playButton = document.querySelector('.play-button');
    const video = document.querySelector('.background-video');

    if (!playButton) {
        console.error('Play button not found');
        return;
    }

    let videoUrl = '';
    if (video) {
        const source = video.querySelector('source');
        videoUrl = source ? source.getAttribute('src') : '';
    } else {
        console.warn('Video element not found, using fallback URL');
        videoUrl = 'https://kinescope.io/vPd3kch2CHUEozKLKqs31R'; // Запасной URL
    }

    playButton.addEventListener('click', () => {
        if (videoUrl) {
            window.open(videoUrl, '_blank');
            // Отправляем событие в Google Analytics, если gtag доступен
            if (typeof gtag !== 'undefined') {
                gtag('event', 'click', {
                    'event_category': 'Video',
                    'event_label': 'Play Button Click'
                });
            }
        } else {
            console.error('Video URL is not defined');
        }
    });
});