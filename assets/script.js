document.getElementById('year').textContent = new Date().getFullYear();

const root = document.documentElement;
let targetX = window.innerWidth * 0.5;
let targetY = window.innerHeight * 0.35;
let currentX = targetX;
let currentY = targetY;

const updateTarget = (x, y) => {
	targetX = x;
	targetY = y;
};

window.addEventListener('pointermove', (event) => {
	updateTarget(event.clientX, event.clientY);
});

window.addEventListener('touchmove', (event) => {
	if (!event.touches || !event.touches[0]) return;
	updateTarget(event.touches[0].clientX, event.touches[0].clientY);
}, { passive: true });

const animateGlow = () => {
	currentX += (targetX - currentX) * 0.12;
	currentY += (targetY - currentY) * 0.12;
	root.style.setProperty('--mx', `${currentX}px`);
	root.style.setProperty('--my', `${currentY}px`);
	requestAnimationFrame(animateGlow);
};

document.querySelectorAll('.project-card a').forEach((link) => {
	const href = link.getAttribute('href');
	if (!href) return;

	const favicon = document.createElement('img');
	favicon.className = 'project-favicon';
	favicon.alt = '';
	favicon.loading = 'lazy';
	favicon.decoding = 'async';
	favicon.referrerPolicy = 'no-referrer';
	favicon.src = `https://www.google.com/s2/favicons?domain_url=${encodeURIComponent(href)}&sz=32`;
	link.prepend(favicon);
});

animateGlow();
