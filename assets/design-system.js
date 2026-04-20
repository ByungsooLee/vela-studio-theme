(function () {
  var ANNOUNCEMENT_KEY = "announcement_dismissed";

  var announcement = document.querySelector("[data-ds-announcement]");
  if (announcement) {
    try {
      if (window.sessionStorage.getItem(ANNOUNCEMENT_KEY) === "true") {
        announcement.style.display = "none";
      }
    } catch (e) {}

    var dismissButton = announcement.querySelector("[data-ds-announcement-dismiss]");
    if (dismissButton) {
      dismissButton.addEventListener("click", function () {
        announcement.style.display = "none";
        try {
          window.sessionStorage.setItem(ANNOUNCEMENT_KEY, "true");
        } catch (e) {}
      });
    }
  }

  var headerWrapper = document.querySelector(".header-wrapper.ds-header");
  var heroTarget = document.querySelector("[data-ds-hero]");
  if (headerWrapper && heroTarget && "IntersectionObserver" in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        if (!entries.length) return;
        headerWrapper.classList.toggle("is-solid", !entries[0].isIntersecting);
      },
      { threshold: 0.05 }
    );
    observer.observe(heroTarget);
  } else if (headerWrapper) {
    headerWrapper.classList.add("is-solid");
  }

  var variantInput = document.querySelector("[data-ds-selected-variant]");
  var variantButtons = document.querySelectorAll("[data-ds-variant-option]");
  var priceNode = document.querySelector("[data-ds-price]");
  var compareNode = document.querySelector("[data-ds-compare]");
  var stickyTitle = document.querySelector("[data-ds-sticky-title]");
  var stickyPrice = document.querySelector("[data-ds-sticky-price]");
  if (variantInput && variantButtons.length) {
    variantButtons.forEach(function (button) {
      button.addEventListener("click", function () {
        var variantId = button.getAttribute("data-variant-id");
        if (!variantId) return;
        variantInput.value = variantId;
        variantButtons.forEach(function (btn) {
          btn.classList.remove("is-active");
        });
        button.classList.add("is-active");

        var variantPrice = button.getAttribute("data-variant-price");
        var variantCompare = button.getAttribute("data-variant-compare");
        var variantTitle = button.getAttribute("data-variant-title");
        if (priceNode && variantPrice) priceNode.textContent = variantPrice;
        if (stickyPrice && variantPrice) stickyPrice.textContent = variantPrice;
        if (stickyTitle && variantTitle) stickyTitle.textContent = variantTitle;

        if (compareNode) {
          if (variantCompare) {
            compareNode.textContent = variantCompare;
            compareNode.hidden = false;
          } else {
            compareNode.hidden = true;
          }
        }
      });
    });
  }

  var faqItems = document.querySelectorAll("[data-ds-faq-item]");
  faqItems.forEach(function (item) {
    var trigger = item.querySelector("[data-ds-faq-trigger]");
    var panel = item.querySelector(".ds-main-product__faq-panel");
    var mark = trigger ? trigger.querySelector("span:last-child") : null;
    if (!trigger) return;
    trigger.addEventListener("click", function () {
      var isOpen = item.classList.contains("is-open");
      faqItems.forEach(function (other) {
        other.classList.remove("is-open");
        var otherPanel = other.querySelector(".ds-main-product__faq-panel");
        var otherMark = other.querySelector("[data-ds-faq-trigger] span:last-child");
        if (otherPanel) otherPanel.hidden = true;
        if (otherMark) otherMark.textContent = "+";
      });
      if (!isOpen) {
        item.classList.add("is-open");
        if (panel) panel.hidden = false;
        if (mark) mark.textContent = "-";
      }
    });
  });

  var mainAtc = document.querySelector("[data-ds-main-atc]");
  var stickyAtc = document.querySelector("[data-ds-sticky-atc]");
  var stickyButton = stickyAtc ? stickyAtc.querySelector("[data-ds-sticky-atc-button]") : null;
  if (mainAtc && stickyAtc && "IntersectionObserver" in window) {
    var atcObserver = new IntersectionObserver(
      function (entries) {
        if (!entries.length) return;
        stickyAtc.classList.toggle("is-visible", !entries[0].isIntersecting);
      },
      { threshold: 0.1 }
    );
    atcObserver.observe(mainAtc);

    if (stickyButton) {
      stickyButton.addEventListener("click", function () {
        mainAtc.click();
      });
    }
  }
})();
