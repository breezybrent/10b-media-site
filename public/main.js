/* 10b.media — progressive enhancement only.
   The page is fully readable and navigable with JS disabled.
   This only adds: current-section nav state and a scroll-reveal for the
   long lower sections. Nothing here is load-bearing. */
(() => {
  'use strict';

  const navLinks = Array.from(document.querySelectorAll('.nav nav a[href^="#"]'));
  if (!navLinks.length) return;

  const sections = navLinks
    .map((a) => {
      const id = a.getAttribute('href').slice(1);
      const el = id ? document.getElementById(id) : null;
      return el ? { link: a, el } : null;
    })
    .filter(Boolean);

  if (!sections.length) return;

  // Mark the section currently occupying the upper third of the viewport.
  const setActive = () => {
    const line = window.innerHeight / 3;
    let current = null;
    for (const s of sections) {
      if (s.el.getBoundingClientRect().top <= line) current = s;
    }
    for (const s of sections) {
      const on = s === current;
      s.link.style.color = on ? 'var(--ink)' : '';
      s.link.style.borderBottomColor = on ? 'var(--signal)' : '';
    }
  };

  let ticking = false;
  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      setActive();
      ticking = false;
    });
  };

  setActive();
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
})();