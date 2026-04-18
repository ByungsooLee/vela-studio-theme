(() => {
  const roots = document.querySelectorAll('[data-review-lightbox-root]');
  if (!roots.length) return;

  const defaultAppSelectors = [
    '.jdgm-rev__pic-link',
    '.spr-review-gallery-link',
    '.ryviu-review-image a',
    '.stamped-review-image a',
    '.loox-review img'
  ];

  roots.forEach((root) => {
    const modal = root.querySelector('[data-review-lightbox-modal]');
    if (!modal) return;

    const imageNode = modal.querySelector('[data-review-lightbox-image]');
    const counterNode = modal.querySelector('[data-review-lightbox-counter]');
    const prevButton = modal.querySelector('[data-review-lightbox-prev]');
    const nextButton = modal.querySelector('[data-review-lightbox-next]');
    const imageWrap = modal.querySelector('.review-lightbox-modal__image-wrap');

    let currentIndex = 0;
    let currentItems = [];

    const appSelectors = (root.dataset.reviewAppSelectors || '')
      .split(',')
      .map((selector) => selector.trim())
      .filter(Boolean);
    const reviewSelectors = appSelectors.length ? appSelectors : defaultAppSelectors;

    const render = () => {
      if (!currentItems.length) return;
      const item = currentItems[currentIndex];
      if (!item) return;

      imageNode.src = item.src;
      imageNode.alt = item.alt || 'レビュー画像';
      if (counterNode) counterNode.textContent = `${currentIndex + 1} / ${currentItems.length}`;
      if (prevButton) prevButton.disabled = currentIndex === 0;
      if (nextButton) nextButton.disabled = currentIndex >= currentItems.length - 1;
    };

    const openModal = (opener) => {
      if (!currentItems.length) return;
      render();
      if (typeof modal.show === 'function') {
        modal.show(opener || null);
      } else {
        modal.setAttribute('open', '');
      }
    };

    const parseAppImageElement = (element) => {
      if (!element) return null;

      if (element.matches('[data-review-lightbox-trigger]')) {
        return {
          src: element.dataset.reviewLightboxSrc,
          alt: element.dataset.reviewLightboxAlt || ''
        };
      }

      if (element.tagName === 'IMG') {
        return { src: element.currentSrc || element.src, alt: element.alt || '' };
      }

      const link = element.closest('a');
      if (link) {
        const href = link.getAttribute('href') || '';
        const image = link.querySelector('img');
        if (href.includes('://')) {
          return {
            src: href,
            alt: image ? image.alt : ''
          };
        }
        if (image && image.src) {
          return { src: image.currentSrc || image.src, alt: image.alt || '' };
        }
      }

      return null;
    };

    const collectItemsFromGroup = (trigger) => {
      const group = trigger.dataset.reviewLightboxGroup;
      if (!group) return [];
      const grouped = root.querySelectorAll(`[data-review-lightbox-trigger][data-review-lightbox-group="${group}"]`);
      return Array.from(grouped).map((node) => ({
        src: node.dataset.reviewLightboxSrc,
        alt: node.dataset.reviewLightboxAlt || ''
      }));
    };

    const findReviewContainer = (element) => {
      return element.closest('.imported-reviews__images, .jdgm-rev, .spr-review, .ryviu-review-item, .stamped-review, .loox-review');
    };

    const collectItemsFromContainer = (container) => {
      if (!container) return [];
      const selector = reviewSelectors.join(', ');
      const nodes = Array.from(container.querySelectorAll(selector));
      return nodes
        .map((node) => parseAppImageElement(node))
        .filter((item) => item && item.src);
    };

    root.addEventListener('click', (event) => {
      const importedTrigger = event.target.closest('[data-review-lightbox-trigger]');
      if (importedTrigger) {
        event.preventDefault();
        currentItems = collectItemsFromGroup(importedTrigger);
        currentIndex = Number(importedTrigger.dataset.reviewLightboxIndex || 0);
        openModal(importedTrigger);
        return;
      }

      const selector = reviewSelectors.join(', ');
      const appTrigger = event.target.closest(selector);
      if (!appTrigger) return;
      const parsed = parseAppImageElement(appTrigger);
      if (!parsed || !parsed.src) return;

      event.preventDefault();
      const container = findReviewContainer(appTrigger);
      currentItems = collectItemsFromContainer(container);
      currentIndex = currentItems.findIndex((item) => item.src === parsed.src);
      if (currentIndex < 0) currentIndex = 0;
      if (!currentItems.length) currentItems = [parsed];
      openModal(appTrigger);
    });

    if (prevButton) {
      prevButton.addEventListener('click', () => {
        if (currentIndex <= 0) return;
        currentIndex -= 1;
        render();
      });
    }

    if (nextButton) {
      nextButton.addEventListener('click', () => {
        if (currentIndex >= currentItems.length - 1) return;
        currentIndex += 1;
        render();
      });
    }

    modal.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        if (currentIndex > 0) {
          currentIndex -= 1;
          render();
        }
      }
      if (event.key === 'ArrowRight') {
        event.preventDefault();
        if (currentIndex < currentItems.length - 1) {
          currentIndex += 1;
          render();
        }
      }
    });

    if (imageWrap) {
      let touchStartX = 0;
      imageWrap.addEventListener('touchstart', (event) => {
        touchStartX = event.changedTouches[0].screenX;
      });
      imageWrap.addEventListener('touchend', (event) => {
        const touchEndX = event.changedTouches[0].screenX;
        const deltaX = touchEndX - touchStartX;
        if (Math.abs(deltaX) < 30) return;
        if (deltaX > 0 && currentIndex > 0) {
          currentIndex -= 1;
          render();
        } else if (deltaX < 0 && currentIndex < currentItems.length - 1) {
          currentIndex += 1;
          render();
        }
      });
    }
  });
})();
