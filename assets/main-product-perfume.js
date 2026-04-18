(() => {
  const sectionNodes = document.querySelectorAll('.perfume-pdp[data-section]');
  if (!sectionNodes.length) return;

  const moneyFormat = window.Shopify && window.Shopify.formatMoney ? window.Shopify.formatMoney : null;

  sectionNodes.forEach((sectionNode) => {
    const sectionId = sectionNode.dataset.section;
    const variantsScript = sectionNode.querySelector('[data-perfume-variants]');
    if (!variantsScript) return;

    let variants = [];
    try {
      variants = JSON.parse(variantsScript.textContent || '[]');
    } catch (error) {
      console.error('Failed to parse variants JSON', error);
      return;
    }

    const variantSelector = sectionNode.querySelector(`[data-variant-selector][data-section-id="${sectionId}"]`);
    const variantButtons = Array.from(sectionNode.querySelectorAll('[data-variant-option]'));
    const variantInput = sectionNode.querySelector('.product-variant-id');
    const submitButton = sectionNode.querySelector(`#ProductSubmitButton-${sectionId}`);
    const inventoryStatus = sectionNode.querySelector('[data-inventory-status]');
    const soldoutActions = sectionNode.querySelector('[data-soldout-actions]');
    const stickyPrice = sectionNode.querySelector('[data-sticky-price]');
    const stickyCtaButton = sectionNode.querySelector('[data-sticky-cta-button]');
    const finalCtaButton = sectionNode.querySelector('[data-final-cta-button]');
    const priceContainer = sectionNode.querySelector(`#PerfumePrice-${sectionId} .price-item--regular, #PerfumePrice-${sectionId} .price-item--last`);
    const scrollButtons = sectionNode.querySelectorAll('[data-scroll-to-purchase]');
    const stickyNode = sectionNode.querySelector('[data-sticky-cta]');
    const purchaseNode = sectionNode.querySelector(`#PerfumePurchase-${sectionId}`);

    if (scrollButtons.length) {
      scrollButtons.forEach((button) => {
        button.addEventListener('click', () => {
          if (!purchaseNode) return;
          purchaseNode.scrollIntoView({ behavior: 'smooth', block: 'center' });
        });
      });
    }

    const updateVariantUI = (variantId) => {
      const variant = variants.find((item) => String(item.id) === String(variantId));
      if (!variant) return;

      if (variantInput) variantInput.value = variant.id;

      if (submitButton) {
        const buttonText = submitButton.querySelector('span');
        submitButton.toggleAttribute('disabled', !variant.available);
        if (buttonText) {
          const defaultText = submitButton.dataset.addText || 'カートに入れる';
          const soldoutText = submitButton.dataset.soldoutText || '現在在庫がありません';
          buttonText.textContent = variant.available ? defaultText : soldoutText;
        }
      }

      if (inventoryStatus) {
        const inStockMessage = inventoryStatus.dataset.inStock || 'ご購入いただけます';
        const soldOutMessage = inventoryStatus.dataset.soldout || '再入荷のお知らせをご利用ください';
        inventoryStatus.textContent = variant.available ? inStockMessage : soldOutMessage;
      }

      if (soldoutActions) {
        soldoutActions.classList.toggle('perfume-pdp__soldout-actions--hidden', variant.available);
      }

      if (stickyCtaButton) {
        const nextLabel = variant.available ? stickyCtaButton.dataset.availableLabel : stickyCtaButton.dataset.soldoutLabel;
        if (nextLabel) stickyCtaButton.textContent = nextLabel;
      }

      if (finalCtaButton) {
        const nextLabel = variant.available ? finalCtaButton.dataset.availableLabel : finalCtaButton.dataset.soldoutLabel;
        if (nextLabel) finalCtaButton.textContent = nextLabel;
      }

      if (priceContainer && moneyFormat) {
        const price = moneyFormat(variant.price);
        priceContainer.textContent = price;
      }

      if (stickyPrice && moneyFormat) {
        stickyPrice.textContent = moneyFormat(variant.price);
      }

      if (variantButtons.length) {
        variantButtons.forEach((button) => {
          const isActive = button.dataset.variantId === String(variant.id);
          button.classList.toggle('is-active', isActive);
          button.setAttribute('aria-pressed', isActive ? 'true' : 'false');
        });
      }
    };

    if (variantSelector) {
      variantSelector.addEventListener('change', (event) => {
        updateVariantUI(event.target.value);
      });
    }

    if (variantButtons.length) {
      variantButtons.forEach((button) => {
        button.addEventListener('click', () => {
          const variantId = button.dataset.variantId;
          if (!variantId) return;
          updateVariantUI(variantId);
        });
      });
    }

    if (stickyNode && purchaseNode) {
      const observer = new IntersectionObserver(
        (entries) => {
          const [entry] = entries;
          stickyNode.classList.toggle('is-hidden', entry.isIntersecting);
        },
        { rootMargin: '-80px 0px 0px 0px' }
      );
      observer.observe(purchaseNode);
    }
  });
})();
