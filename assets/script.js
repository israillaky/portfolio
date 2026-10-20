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

// Keep keyboard focus inside the mobile navigation while it is open.
if (menuToggle && navMenu) {
 const mobileViewport = window.matchMedia('(max-width: 768px)');
 const resetMenu = () => {
  navMenu.classList.remove('is-open');
  document.body.classList.remove('menu-open');
  menuToggle.setAttribute('aria-expanded', 'false');
 };
 menuToggle.addEventListener('click', () => menuClose.focus());
 menuClose.addEventListener('click', () => menuToggle.focus());
 menuOverlay.addEventListener('click', () => menuToggle.focus());
 document.addEventListener('keydown', (event) => {
  if (!mobileViewport.matches) return;
  if (event.key === 'Escape' && menuToggle.getAttribute('aria-expanded') === 'false' && navMenu.contains(document.activeElement)) menuToggle.focus();
  if (event.key !== 'Tab' || !navMenu.classList.contains('is-open')) return;
  const items = [...navMenu.querySelectorAll('button, a[href]')];
  const first = items[0], last = items[items.length - 1];
  if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
  else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
 });
 mobileViewport.addEventListener('change', resetMenu);
}

if (aboutTabs.length) {
 const tabList = aboutTabs[0].parentElement;
 tabList.setAttribute('role', 'tablist');
 tabList.setAttribute('aria-orientation', 'vertical');
 aboutTabs.forEach((tab, index) => {
  const key = tab.dataset.tabTarget;
  const panel = [...aboutPanels].find(item => item.dataset.tabPanel === key);
  tab.id = `tab-${key}`;
  tab.setAttribute('role', 'tab');
  tab.setAttribute('aria-controls', `panel-${key}`);
  tab.setAttribute('aria-selected', String(index === 0));
  tab.tabIndex = index === 0 ? 0 : -1;
  panel.id = `panel-${key}`;
  panel.setAttribute('role', 'tabpanel');
  panel.setAttribute('aria-labelledby', tab.id);
  panel.tabIndex = 0;
  tab.addEventListener('click', () => aboutTabs.forEach(item => {
   item.setAttribute('aria-selected', String(item === tab));
   item.tabIndex = item === tab ? 0 : -1;
  }));
  tab.addEventListener('keydown', event => {
   let next;
   if (event.key === 'ArrowDown' || event.key === 'ArrowRight') next = (index + 1) % aboutTabs.length;
   if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') next = (index - 1 + aboutTabs.length) % aboutTabs.length;
   if (event.key === 'Home') next = 0;
   if (event.key === 'End') next = aboutTabs.length - 1;
   if (next !== undefined) { event.preventDefault(); aboutTabs[next].focus(); aboutTabs[next].click(); }
  });
 });
 const tabViewport = window.matchMedia('(max-width: 768px)');
 const updateOrientation = () => tabList.setAttribute('aria-orientation', tabViewport.matches ? 'horizontal' : 'vertical');
 updateOrientation();
 tabViewport.addEventListener('change', updateOrientation);
}

document.querySelectorAll('[data-copy-email]').forEach(button => {
 button.addEventListener('click', async () => {
  const status = button.parentElement.querySelector('.copy-status');
  try {
   await navigator.clipboard.writeText(button.dataset.copyEmail);
   status.textContent = 'Email address copied.';
  } catch {
   status.textContent = 'Please select and copy the email address above.';
  }
 });
});
