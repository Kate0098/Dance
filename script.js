document.addEventListener('DOMContentLoaded', () => {
    const video = document.querySelector('.background-video');
    const playButton = document.querySelector('.play-button');
    const videoContainer = document.querySelector('.video-container');

    // Ensure video is hidden and paused initially
    video.style.display = 'none';
    video.pause();
    video.currentTime = 0;

    // Prevent any automatic playback or loading
    video.setAttribute('playsinline', '');
    video.removeAttribute('autoplay');
    video.preload = 'none';

    // Handle play button click
    playButton.addEventListener('click', () => {
        // Show and play the video
        video.style.display = 'block';
        videoContainer.classList.add('playing');
        playButton.classList.add('hidden');

        // Load video if not already loaded
        if (video.preload === 'none') {
            video.preload = 'auto';
            video.load();
        }

        // Attempt to play the video
        const playPromise = video.play();

        if (playPromise !== undefined) {
            playPromise
                .then(() => {
                    // Video started playing
                })
                .catch(error => {
                    // Revert UI if playback fails
                    video.style.display = 'none';
                    videoContainer.classList.remove('playing');
                    playButton.classList.remove('hidden');
                    console.error('Playback error:', error);
                });
        }
    });

    // Block unintended playback
    video.addEventListener('play', (event) => {
        if (!videoContainer.classList.contains('playing')) {
            video.pause();
            video.currentTime = 0;
            video.style.display = 'none';
        }
    });

    // Pause video and reset UI when page is hidden
    document.addEventListener('visibilitychange', () => {
        if (document.hidden && videoContainer.classList.contains('playing')) {
            video.pause();
            video.style.display = 'none';
            videoContainer.classList.remove('playing');
            playButton.classList.remove('hidden');
        }
    });
});