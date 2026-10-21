
document.querySelectorAll('[data-challenge]').forEach(root => {
    const film = root.dataset.film;
    const challenge = root.dataset.challenge;

    const key = `${film === 'loop' ? 'loop' : 'paranormal'}Challenge${challenge === 'one' ? '1' : '2'}`;
    const paths = window.CU_CHALLENGES?.[key] || [];

    let position = 0;
    const images = [];

    root.innerHTML = '';

    paths.forEach((path, index) => {
        const img = document.createElement('img');
        img.className = 'challenge-slide';
        img.alt = `${film} challenge ${challenge} image ${index + 1}`;
        img.src = '../' + path;
        img.onerror = () => console.error('Image failed to load:', img.src);

        root.appendChild(img);
        images.push(img);
    });

    const controls = root.parentElement;
    const counter = controls.querySelector('.challenge-count');
    const previous = controls.querySelector('.challenge-prev');
    const next = controls.querySelector('.challenge-next');

    function paint() {
        const total = images.length;

        images.forEach((img, index) => {
            const offset = (index - position + total) % total;

            img.className = 'challenge-slide';
            img.style.opacity = '';

            if (offset === 0) {
                img.classList.add('center');
            } else if (offset === 1) {
                img.classList.add('right');
            } else if (offset === total - 1) {
                img.classList.add('left');
            } else {
                img.style.opacity = '0';
            }
        });

        if (counter) {
            counter.textContent = total
                ? `${position + 1} / ${total}`
                : '0 / 0';
        }
    }

    function move(step) {
        if (!images.length) return;
        position = (position + step + images.length) % images.length;
        paint();
    }

    previous?.addEventListener('click', () => move(-1));
    next?.addEventListener('click', () => move(1));

    if (images.length) {
        paint();
        setInterval(() => move(1), 4000);
    }
});
