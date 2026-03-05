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

// Contact uses direct mailto link for static hosting (index.html only)
