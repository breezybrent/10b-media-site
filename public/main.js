/* 10b.media — progressive enhancement only. The page works with JS disabled. */
(() => {
  'use strict';

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  // Marquee: duplicate the list once so translateX(-50%) loops seamlessly.
  const marquee = document.querySelector('[data-marquee]');
  if (marquee) {
    const list = marquee.querySelector('ul');
    if (list) {
      const clone = list.cloneNode(true);
      clone.setAttribute('aria-hidden', 'true');
      // Kill tab-focus on the decorative copy.
      clone.querySelectorAll('a, button').forEach((el) => el.setAttribute('tabindex', '-1'));
      marquee.appendChild(clone);
    }
    if (reduceMotion.matches) {
      marquee.style.overflowX = 'auto';
    }
  }

  // Keep the marquee from eating CPU when scrolled out of view.
  if (marquee && 'IntersectionObserver' in window) {
    let visible = true;
    new IntersectionObserver((entries) => {
      for (const e of entries) visible = e.isIntersecting;
      marquee.querySelectorAll('ul').forEach((ul) => {
        ul.style.animationPlayState = visible ? 'running' : 'paused';
      });
    }, { threshold: 0 }).observe(marquee);
  }
})();