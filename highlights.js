// Keep the first panel usable without JavaScript; enhance it with optional rotation.
document.querySelectorAll('[data-highlight-carousel]').forEach(carousel => {
  const slides = [...carousel.querySelectorAll('.highlight-slide')];
  const labels = [...carousel.querySelectorAll('[data-slide-label]')];
  const track = carousel.querySelector('.highlight-slides');
  const toggle = carousel.querySelector('[data-rotation]');
  const count = carousel.querySelector('.highlight-count');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let current = 0;
  let rotating = !reducedMotion.matches;
  let readingLink = false;
  let inView = true;
  let timer;

  function schedule() {
    clearTimeout(timer);
    toggle.textContent = rotating ? carousel.dataset.pauseLabel : carousel.dataset.playLabel;
    track.setAttribute('aria-live', rotating ? 'off' : 'polite');
    if (rotating && !readingLink && inView && !document.hidden) {
      timer = setTimeout(() => show(current + 1), 6000);
    }
  }

  function show(index) {
    current = (index + slides.length) % slides.length;
    slides.forEach((slide, i) => {
      const active = i === current;
      slide.classList.toggle('is-active', active);
      slide.setAttribute('aria-hidden', String(!active));
      slide.inert = !active;
      if (active) labels[i].setAttribute('aria-current', 'true');
      else labels[i].removeAttribute('aria-current');
    });
    count.textContent = `${String(current + 1).padStart(2, '0')} / ${String(slides.length).padStart(2, '0')}`;
    schedule();
  }

  toggle.addEventListener('click', () => {
    rotating = !rotating;
    schedule();
  });

  // Preserve a focused link for keyboard users, then resume when focus leaves it.
  // Pointer hover does not interrupt the automatic rotation.
  carousel.addEventListener('focusin', event => {
    readingLink = Boolean(event.target.closest('.highlight-links'));
    schedule();
  });
  carousel.addEventListener('focusout', event => {
    readingLink = Boolean(event.relatedTarget?.closest('.highlight-links'));
    schedule();
  });
  document.addEventListener('visibilitychange', schedule);
  reducedMotion.addEventListener('change', event => {
    if (event.matches) rotating = false;
    schedule();
  });
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      schedule();
    }, { threshold: 0.25 }).observe(carousel);
  }
  carousel.querySelector('.highlight-controls').hidden = false;
  show(0);
});
