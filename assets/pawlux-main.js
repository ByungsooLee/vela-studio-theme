/* ============================================
   PAWLUX — Main JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          const delay = parseFloat(entry.target.dataset.delay || 0);
          setTimeout(() => entry.target.classList.add('is-visible'), delay * 1000);
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  document.querySelectorAll('.reveal').forEach((el, i) => {
    el.dataset.delay = el.dataset.delay || (i % 4) * 0.08;
    revealObserver.observe(el);
  });

  const gridObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const cards = entry.target.querySelectorAll('.card-wrapper');
          cards.forEach((card, i) => {
            card.style.transitionDelay = `${i * 60}ms`;
            card.classList.add('is-visible');
          });
          gridObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.05 }
  );

  document.querySelectorAll('.product-grid, .grid--4-col-desktop').forEach((grid) => {
    grid.querySelectorAll('.card-wrapper').forEach((card) => {
      card.classList.add('reveal');
    });
    gridObserver.observe(grid);
  });

  const header = document.querySelector('.header');
  if (header) {
    window.addEventListener(
      'scroll',
      () => {
        header.classList.toggle('header--scrolled', window.scrollY > 60);
      },
      { passive: true }
    );
  }

  const cartBubble = document.querySelector('.cart-count-bubble');
  if (cartBubble) {
    const observer = new MutationObserver(() => {
      cartBubble.classList.remove('bump');
      void cartBubble.offsetWidth;
      cartBubble.classList.add('bump');
    });
    observer.observe(cartBubble, { childList: true, subtree: true });
  }

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
});

const style = document.createElement('style');
style.textContent = `
  @keyframes cartBump {
    0%   { transform: scale(1); }
    40%  { transform: scale(1.6); }
    100% { transform: scale(1); }
  }
  .bump { animation: cartBump 0.4s cubic-bezier(0.16,1,0.3,1); }
  .header--scrolled { box-shadow: 0 2px 20px rgba(26,24,20,0.08); }
`;
document.head.appendChild(style);
