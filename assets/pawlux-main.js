/* ============================================
   PAWLUX — Main JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const delay = parseFloat(entry.target.dataset.delay || 0);
          setTimeout(() => entry.target.classList.add('is-visible'), delay * 1000);
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  document.querySelectorAll('.reveal:not(.card-wrapper)').forEach((el, i) => {
    el.dataset.delay = el.dataset.delay || (i % 4) * 0.08;
    revealObserver.observe(el);
  });

  const cardRevealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const revealIndex = Number(entry.target.dataset.revealIndex || 0);
          entry.target.style.transitionDelay = `${revealIndex * 80}ms`;
          entry.target.classList.add('is-visible');
          cardRevealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  const initCardReveal = (root = document) => {
    const grids = [];

    if (root.matches?.('.product-grid')) {
      grids.push(root);
    }

    grids.push(...root.querySelectorAll('.product-grid'));

    grids.forEach((grid) => {
      grid.querySelectorAll('.card-wrapper').forEach((card, index) => {
        card.classList.add('reveal');
        card.classList.remove('is-visible');
        card.style.transitionDelay = '0ms';
        card.dataset.revealIndex = index;
        cardRevealObserver.observe(card);
      });
    });
  };

  initCardReveal();

  const productGridContainer = document.getElementById('ProductGridContainer');
  if (productGridContainer) {
    const productGridObserver = new MutationObserver((mutations) => {
      const hasNewNodes = mutations.some((mutation) => mutation.addedNodes.length > 0);
      if (hasNewNodes) {
        initCardReveal(productGridContainer);
      }
    });

    productGridObserver.observe(productGridContainer, { childList: true, subtree: true });
  }

  const header = document.querySelector('.header');
  if (header) {
    const updateHeaderScrolled = () => {
      header.classList.toggle('header--scrolled', window.scrollY > 8);
    };

    updateHeaderScrolled();
    window.addEventListener('scroll', updateHeaderScrolled, { passive: true });
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
`;
document.head.appendChild(style);
