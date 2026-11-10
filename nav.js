// Mark the visible section while retaining native anchor navigation.
const aboutLink = document.querySelector('.nav a[href="#about"]');
const workLink = document.querySelector('.nav a[href="#work"]');
const projects = document.getElementById('work');
if (aboutLink && workLink && projects) {
  function updateNav() {
    const active = projects.getBoundingClientRect().top <= Math.min(200, innerHeight / 3) ? workLink : aboutLink;
    [aboutLink, workLink].forEach(link => {
      if (link === active) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  }
  addEventListener('scroll', updateNav, { passive: true });
  addEventListener('resize', updateNav);
  updateNav();
}

// Keep a link to the same section when readers switch languages.
const languageLink = document.querySelector('[data-language-link]');
if (languageLink) {
  function syncLanguageAnchor() {
    languageLink.hash = window.location.hash;
  }
  syncLanguageAnchor();
  window.addEventListener('hashchange', syncLanguageAnchor);
}
