"use client";

import { useEffect, useState } from "react";
import "./StickyMobileATC.css";

type StickyMobileATCProps = {
  variantTitle: string;
  price: string;
  onAddToCart: () => void;
  mainAtcSelector?: string;
};

export function StickyMobileATC({
  variantTitle,
  price,
  onAddToCart,
  mainAtcSelector = '[data-main-atc="true"]',
}: StickyMobileATCProps) {
  const [showSticky, setShowSticky] = useState(false);

  useEffect(() => {
    if (typeof document === "undefined") {
      return;
    }

    const target = document.querySelector(mainAtcSelector);
    if (!target) {
      setShowSticky(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowSticky(!entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [mainAtcSelector]);

  if (!showSticky) {
    return null;
  }

  return (
    <div className="sticky-mobile-atc" role="region" aria-label="Sticky add to cart">
      <div className="sticky-mobile-atc__meta">
        <span className="sticky-mobile-atc__variant">{variantTitle}</span>
        <span className="sticky-mobile-atc__price">{price}</span>
      </div>
      <button type="button" className="sticky-mobile-atc__button" onClick={onAddToCart}>
        Add to Cart
      </button>
    </div>
  );
}

export type { StickyMobileATCProps };
