(function () {
  var observer;

  function updateReadTimes(scope) {
    var container = scope || document;
    var readTimeNodes = container.querySelectorAll(".article-read-time[data-word-count]");

    readTimeNodes.forEach(function (node) {
      var wordCount = parseInt(node.getAttribute("data-word-count"), 10);
      if (Number.isNaN(wordCount) || wordCount < 1) {
        return;
      }

      var minutes = Math.ceil(wordCount / 200);
      node.textContent = minutes + " min read";
    });
  }

  function revealImages(scope) {
    var container = scope || document;
    var imageWraps = container.querySelectorAll(".blog-card__img-wrap");

    if (!("IntersectionObserver" in window)) {
      imageWraps.forEach(function (wrap) {
        wrap.classList.add("is-visible");
      });
      return;
    }

    if (!observer) {
      observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (!entry.isIntersecting) {
              return;
            }

            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          });
        },
        {
          threshold: 0.1
        }
      );
    }

    imageWraps.forEach(function (wrap) {
      if (wrap.classList.contains("is-visible")) {
        return;
      }
      observer.observe(wrap);
    });
  }

  function wireLoadMore() {
    var button = document.querySelector(".js-blog-load-more");
    var blogGrid = document.querySelector("[data-blog-grid]");
    var loadMoreWrap = document.querySelector("[data-blog-load-more-wrap]");

    if (!button || !blogGrid || !loadMoreWrap) {
      return;
    }

    var defaultText = button.childNodes[0] ? button.childNodes[0].textContent.trim() : "Load more articles";

    button.addEventListener("click", function (event) {
      event.preventDefault();
      var nextUrl = button.getAttribute("data-next-url") || button.getAttribute("href");

      if (!nextUrl || button.classList.contains("is-loading")) {
        return;
      }

      button.classList.add("is-loading");
      button.setAttribute("aria-busy", "true");
      button.childNodes[0].textContent = "Loading...";

      fetch(nextUrl, { credentials: "same-origin" })
        .then(function (response) {
          if (!response.ok) {
            throw new Error("Failed to load blog page");
          }
          return response.text();
        })
        .then(function (html) {
          var parser = new DOMParser();
          var doc = parser.parseFromString(html, "text/html");
          var incomingGrid = doc.querySelector("[data-blog-grid]");
          var incomingCards = incomingGrid ? incomingGrid.children : [];

          if (!incomingCards.length) {
            loadMoreWrap.remove();
            return;
          }

          var fragment = document.createDocumentFragment();

          Array.prototype.forEach.call(incomingCards, function (card) {
            fragment.appendChild(card);
          });

          blogGrid.appendChild(fragment);
          updateReadTimes(blogGrid);
          revealImages(blogGrid);
          window.history.pushState({}, "", nextUrl);

          var incomingLoadMoreWrap = doc.querySelector("[data-blog-load-more-wrap]");
          if (incomingLoadMoreWrap) {
            loadMoreWrap.innerHTML = incomingLoadMoreWrap.innerHTML;
            wireLoadMore();
          } else {
            loadMoreWrap.remove();
          }
        })
        .catch(function () {
          button.childNodes[0].textContent = defaultText;
        })
        .finally(function () {
          var activeButton = document.querySelector(".js-blog-load-more");
          if (activeButton) {
            activeButton.classList.remove("is-loading");
            activeButton.removeAttribute("aria-busy");
            if (activeButton.childNodes[0] && activeButton.childNodes[0].textContent.trim() === "Loading...") {
              activeButton.childNodes[0].textContent = defaultText;
            }
          }
        });
    });
  }

  function initBlogPage() {
    if (!document.querySelector("[data-blog-page]")) {
      return;
    }

    updateReadTimes(document);
    revealImages(document);
    wireLoadMore();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initBlogPage);
  } else {
    initBlogPage();
  }
})();
