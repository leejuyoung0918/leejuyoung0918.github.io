// Keep the first panel usable without JavaScript; enhance it with optional rotation.
document.querySelectorAll('[data-highlight-carousel]').forEach(carousel => {
  const slides = [...carousel.querySelectorAll('.highlight-slide')];
  const selectors = [...carousel.querySelectorAll('[data-slide]')];
  const track = carousel.querySelector('.highlight-slides');
  const toggle = carousel.querySelector('[data-rotation]');
  const count = carousel.querySelector('.highlight-count');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let current = 0;
  let rotating = !reducedMotion.matches;
  let hovered = false;
  let inView = true;
  let timer;

  function schedule() {
    clearTimeout(timer);
    toggle.textContent = rotating ? carousel.dataset.pauseLabel : carousel.dataset.playLabel;
    track.setAttribute('aria-live', rotating ? 'off' : 'polite');
    if (rotating && !hovered && inView && !document.hidden) {
      timer = setTimeout(() => show(current + 1), 6000);
    }
  }

  function show(index, manual = false) {
    if (manual) rotating = false;
    current = (index + slides.length) % slides.length;
    slides.forEach((slide, i) => {
      const active = i === current;
      slide.classList.toggle('is-active', active);
      slide.setAttribute('aria-hidden', String(!active));
      slide.inert = !active;
      selectors[i].setAttribute('aria-pressed', String(active));
    });
    count.textContent = `${String(current + 1).padStart(2, '0')} / ${String(slides.length).padStart(2, '0')}`;
    schedule();
  }

  toggle.addEventListener('click', () => {
    rotating = !rotating;
    schedule();
  });
  carousel.querySelector('[data-previous]').addEventListener('click', () => show(current - 1, true));
  carousel.querySelector('[data-next]').addEventListener('click', () => show(current + 1, true));
  selectors.forEach((button, index) => button.addEventListener('click', () => show(index, true)));

  // A reader hovering or tabbing into a panel should be able to finish reading it.
  carousel.addEventListener('pointerenter', event => {
    if (event.pointerType === 'mouse') {
      hovered = true;
      schedule();
    }
  });
  carousel.addEventListener('pointerleave', event => {
    if (event.pointerType === 'mouse') {
      hovered = false;
      schedule();
    }
  });
  carousel.addEventListener('focusin', event => {
    if (event.target !== toggle) {
      rotating = false;
      schedule();
    }
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
  carousel.querySelector('.highlight-selectors').hidden = false;
  show(0);
});
