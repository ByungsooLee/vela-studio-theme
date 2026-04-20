"use client";

import { type ReactNode, useEffect, useMemo, useState } from "react";
import "./Header.css";

type HeaderNavItem = {
  label: string;
  href: string;
};

type HeaderProps = {
  logo: ReactNode;
  navItems: HeaderNavItem[];
  cartItemCount?: number;
  onSearchClick?: () => void;
  onCartClick?: () => void;
  heroSelector?: string;
};

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        d="M10.5 3.5a7 7 0 1 0 4.4 12.4l4.85 4.86 1.06-1.06-4.86-4.85A7 7 0 0 0 10.5 3.5Zm0 1.5a5.5 5.5 0 1 1 0 11 5.5 5.5 0 0 1 0-11Z"
        fill="currentColor"
      />
    </svg>
  );
}

function CartIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        d="M6 6h12l-1.2 12H7.2L6 6Zm2 2 .8 8h6.4l.8-8H8Zm2-3a2 2 0 0 1 4 0h1.5a3.5 3.5 0 1 0-7 0H10Z"
        fill="currentColor"
      />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        d="M4 6h16v1.5H4V6Zm0 5.25h16v1.5H4v-1.5ZM4 16.5h16V18H4v-1.5Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function Header({
  logo,
  navItems,
  cartItemCount = 0,
  onSearchClick,
  onCartClick,
  heroSelector = '[data-hero="true"]',
}: HeaderProps) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isSolid, setIsSolid] = useState(false);
  const hasCartItems = cartItemCount > 0;

  useEffect(() => {
    if (typeof document === "undefined") {
      return;
    }

    const hero = document.querySelector(heroSelector);
    if (!hero) {
      setIsSolid(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsSolid(!entry.isIntersecting);
      },
      { threshold: 0.05 }
    );

    observer.observe(hero);
    return () => observer.disconnect();
  }, [heroSelector]);

  useEffect(() => {
    if (typeof document === "undefined") {
      return;
    }

    document.body.style.overflow = isDrawerOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isDrawerOpen]);

  const headerClassName = useMemo(
    () => `site-header${isSolid ? " site-header--solid" : ""}`,
    [isSolid]
  );

  return (
    <>
      <header className={headerClassName}>
        <div className="site-header__desktop">
          <div className="site-header__left">{logo}</div>
          <nav className="site-header__nav" aria-label="Primary navigation">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} className="site-header__nav-link">
                {item.label}
              </a>
            ))}
          </nav>
          <div className="site-header__actions">
            <button
              type="button"
              className="site-header__icon-button"
              onClick={onSearchClick}
              aria-label="Search"
            >
              <SearchIcon />
            </button>
            <button
              type="button"
              className="site-header__icon-button site-header__cart-button"
              onClick={onCartClick}
              aria-label="Cart"
            >
              <CartIcon />
              {hasCartItems ? (
                <span className="site-header__badge" aria-label={`${cartItemCount} items in cart`}>
                  {cartItemCount}
                </span>
              ) : null}
            </button>
          </div>
        </div>

        <div className="site-header__mobile">
          <button
            type="button"
            className="site-header__icon-button"
            onClick={onSearchClick}
            aria-label="Search"
          >
            <SearchIcon />
          </button>
          <div className="site-header__mobile-logo">{logo}</div>
          <div className="site-header__mobile-right">
            <button
              type="button"
              className="site-header__icon-button site-header__cart-button"
              onClick={onCartClick}
              aria-label="Cart"
            >
              <CartIcon />
              {hasCartItems ? (
                <span className="site-header__badge" aria-label={`${cartItemCount} items in cart`}>
                  {cartItemCount}
                </span>
              ) : null}
            </button>
            <button
              type="button"
              className="site-header__icon-button"
              onClick={() => setIsDrawerOpen((value) => !value)}
              aria-expanded={isDrawerOpen}
              aria-controls="mobile-nav-drawer"
              aria-label="Menu"
            >
              <MenuIcon />
            </button>
          </div>
        </div>
      </header>

      <aside
        id="mobile-nav-drawer"
        className={`mobile-drawer${isDrawerOpen ? " mobile-drawer--open" : ""}`}
        aria-hidden={!isDrawerOpen}
      >
        <nav className="mobile-drawer__nav" aria-label="Mobile navigation">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="mobile-drawer__link"
              onClick={() => setIsDrawerOpen(false)}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </aside>

      {isDrawerOpen ? (
        <button
          type="button"
          className="mobile-drawer__backdrop"
          onClick={() => setIsDrawerOpen(false)}
          aria-label="Close menu"
        />
      ) : null}
    </>
  );
}

export type { HeaderProps, HeaderNavItem };
