// Set current year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// Add scroll effect to navbar
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
	const currentScroll = window.pageYOffset;
	
	if (currentScroll > 50) {
		navbar.style.background = 'rgba(15, 23, 42, 0.95)';
		navbar.style.backdropFilter = 'blur(12px)';
	} else {
		navbar.style.background = 'rgba(15, 23, 42, 0.8)';
		navbar.style.backdropFilter = 'blur(12px)';
	}
});

const aboutTabs = document.querySelectorAll('.about-tab[data-tab-target]');
const aboutPanels = document.querySelectorAll('.about-tab-panel[data-tab-panel]');

if (aboutTabs.length && aboutPanels.length) {
	aboutTabs.forEach((tab) => {
		tab.addEventListener('click', () => {
			const target = tab.getAttribute('data-tab-target');
			if (!target) return;

			aboutTabs.forEach((item) => item.classList.remove('is-active'));
			tab.classList.add('is-active');

			aboutPanels.forEach((panel) => {
				const panelName = panel.getAttribute('data-tab-panel');
				const isMatch = panelName === target;
				panel.hidden = !isMatch;
				panel.classList.toggle('is-active', isMatch);
			});
		});
	});
}

const menuToggle = document.querySelector('.menu-toggle');
const menuClose = document.querySelector('.menu-close');
const navMenu = document.querySelector('.nav-menu');
const menuOverlay = document.querySelector('.menu-overlay');
const mobileMenuLinks = document.querySelectorAll('.nav-menu .nav-link');

if (menuToggle && menuClose && navMenu && menuOverlay) {
	const openMenu = () => {
		navMenu.classList.add('is-open');
		document.body.classList.add('menu-open');
		menuToggle.setAttribute('aria-expanded', 'true');
	};

	const closeMenu = () => {
		navMenu.classList.remove('is-open');
		document.body.classList.remove('menu-open');
		menuToggle.setAttribute('aria-expanded', 'false');
	};

	menuToggle.addEventListener('click', openMenu);
	menuClose.addEventListener('click', closeMenu);
	menuOverlay.addEventListener('click', closeMenu);

	mobileMenuLinks.forEach((link) => {
		link.addEventListener('click', closeMenu);
	});

	document.addEventListener('keydown', (event) => {
		if (event.key === 'Escape') {
			closeMenu();
		}
	});
}

// Contact uses direct mailto link for static hosting (index.html only)
