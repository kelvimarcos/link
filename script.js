const popup    = document.getElementById('video-popup');
const video    = popup.querySelector('.popup-video');
const openBtn  = document.getElementById('open-popup');
const closeBtn = document.getElementById('close-popup');

function openPopup() {
    popup.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closePopup() {
    popup.classList.remove('active');
    video.pause();
    document.body.style.overflow = '';
}

openBtn.addEventListener('click', openPopup);
closeBtn.addEventListener('click', closePopup);

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
