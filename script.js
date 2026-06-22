const popup    = document.getElementById('video-popup');
const video    = popup.querySelector('.popup-video');
const openBtn  = document.getElementById('open-popup');
const closeBtn = document.getElementById('close-popup');
const muteBtn  = document.getElementById('mute-btn');

function openPopup() {
    popup.classList.add('active');
    document.body.style.overflow = 'hidden';
    video.muted = false;
    video.play().catch(() => {});
}

function closePopup() {
    popup.classList.remove('active');
    video.pause();
    video.currentTime = 0;
    video.muted = false;
    muteBtn.textContent = '🔊';
    document.body.style.overflow = '';
}

const heroPhoto = document.querySelector('.hero__photo');

openBtn.addEventListener('click', openPopup);
heroPhoto.addEventListener('click', openPopup);
closeBtn.addEventListener('click', closePopup);

muteBtn.addEventListener('click', () => {
    video.muted = !video.muted;
    muteBtn.textContent = video.muted ? '🔇' : '🔊';
    muteBtn.setAttribute('aria-label', video.muted ? 'Ativar som' : 'Silenciar');
});

video.addEventListener('click', () => {
    if (video.paused) video.play().catch(() => {});
    else video.pause();
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && popup.classList.contains('active')) closePopup();
});

// Compartilhar link
const shareBtn = document.getElementById('share-btn');

shareBtn.addEventListener('click', async () => {
    const url = window.location.href;
    if (navigator.share) {
        try { await navigator.share({ url }); } catch (_) {}
    } else {
        try {
            await navigator.clipboard.writeText(url);
            const img = shareBtn.querySelector('img');
            img.style.opacity = '.4';
            setTimeout(() => (img.style.opacity = ''), 1500);
        } catch (_) {}
    }
});
