# 🐾 PawLux — Premium Pet Store Design System
## Cursor向け完全実装仕様書

---

## 1. ブランドアイデンティティ

### ブランドコンセプト
**"Luxury meets Love"** — ペットへの愛情を、洗練されたデザインで表現する。
Appleのミニマリズム × 高級ファッションブランドの質感 × ペットの温かさ

### ブランド名
**PawLux** (案) or あなたのブランド名に置き換え

---

## 2. デザイントークン（CSS Variables）

```css
:root {
  /* ─── Primary Palette ─── */
  --color-bg:           #FAFAF8;      /* オフホワイト：温かみのある白 */
  --color-bg-secondary: #F2F0EB;      /* クリーム：セクション背景 */
  --color-surface:      #FFFFFF;      /* カード・モーダル背景 */
  --color-ink:          #1A1814;      /* ほぼ黒：メインテキスト */
  --color-ink-muted:    #6B6560;      /* グレー：サブテキスト */
  --color-ink-subtle:   #B8B3AE;      /* 薄グレー：プレースホルダー */

  /* ─── Accent ─── */
  --color-accent:       #C8956C;      /* テラコッタ：CTAボタン・ハイライト */
  --color-accent-light: #E8C9B0;      /* 薄テラコッタ：ホバー背景 */
  --color-accent-dark:  #A0714A;      /* 濃テラコッタ：ホバーボタン */

  /* ─── Status ─── */
  --color-success:      #4A7C59;
  --color-error:        #C0392B;
  --color-badge:        #E8F4F0;      /* 在庫ありバッジ背景 */

  /* ─── Typography ─── */
  --font-display:       'Cormorant Garamond', serif;   /* 見出し：高級感 */
  --font-body:          'DM Sans', sans-serif;          /* 本文：読みやすさ */
  --font-accent:        'DM Mono', monospace;           /* 価格・ラベル */

  /* ─── Type Scale ─── */
  --text-xs:    0.75rem;    /* 12px */
  --text-sm:    0.875rem;   /* 14px */
  --text-base:  1rem;       /* 16px */
  --text-lg:    1.125rem;   /* 18px */
  --text-xl:    1.25rem;    /* 20px */
  --text-2xl:   1.5rem;     /* 24px */
  --text-3xl:   2rem;       /* 32px */
  --text-4xl:   2.75rem;    /* 44px */
  --text-5xl:   3.75rem;    /* 60px */
  --text-hero:  5.5rem;     /* 88px */

  /* ─── Spacing ─── */
  --space-1:  4px;
  --space-2:  8px;
  --space-3:  12px;
  --space-4:  16px;
  --space-5:  20px;
  --space-6:  24px;
  --space-8:  32px;
  --space-10: 40px;
  --space-12: 48px;
  --space-16: 64px;
  --space-20: 80px;
  --space-24: 96px;
  --space-32: 128px;

  /* ─── Border Radius ─── */
  --radius-sm:   4px;
  --radius-md:   8px;
  --radius-lg:   16px;
  --radius-xl:   24px;
  --radius-full: 9999px;

  /* ─── Shadows ─── */
  --shadow-sm:  0 1px 3px rgba(26,24,20,0.08);
  --shadow-md:  0 4px 16px rgba(26,24,20,0.10);
  --shadow-lg:  0 12px 40px rgba(26,24,20,0.12);
  --shadow-xl:  0 24px 64px rgba(26,24,20,0.14);

  /* ─── Transitions ─── */
  --ease-out:   cubic-bezier(0.16, 1, 0.3, 1);
  --ease-in:    cubic-bezier(0.7, 0, 0.84, 0);
  --duration-fast:   150ms;
  --duration-base:   300ms;
  --duration-slow:   600ms;
  --duration-slower: 1000ms;
}
```

---

## 3. Google Fonts インポート

```html
<!-- layout/theme.liquid の <head> に追加 -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&family=DM+Mono:wght@300;400&display=swap" rel="stylesheet">
```

---

## 4. ヘッダー / ナビゲーション

### デザイン仕様
- **高さ**: 72px（スクロール後64px）
- **背景**: `rgba(250,250,248,0.92)` + `backdrop-filter: blur(20px)`
- **スクロール時**: 細いボーダーボトム `1px solid rgba(26,24,20,0.08)` が出現
- **ロゴ**: Cormorant Garamond 600, letter-spacing: 0.15em, 大文字

### HTML構造
```liquid
<header class="site-header" id="site-header">
  <div class="header-inner container">

    <!-- Left: Nav -->
    <nav class="header-nav">
      <a href="/collections/carriers" class="nav-link">Carriers</a>
      <a href="/collections/collars" class="nav-link">Collars</a>
      <a href="/collections/travel" class="nav-link">Travel</a>
      <a href="/collections/all" class="nav-link">All Products</a>
    </nav>

    <!-- Center: Logo -->
    <a href="/" class="header-logo">
      PAWLUX
    </a>

    <!-- Right: Actions -->
    <div class="header-actions">
      <button class="icon-btn" aria-label="Search">
        <!-- SVG search icon -->
      </button>
      <a href="/account" class="icon-btn" aria-label="Account">
        <!-- SVG user icon -->
      </a>
      <button class="cart-btn" id="cart-toggle">
        <span class="cart-icon"><!-- SVG bag --></span>
        <span class="cart-count" id="cart-count">0</span>
      </button>
    </div>

  </div>
</header>
```

### CSS
```css
.site-header {
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 1000;
  height: 72px;
  background: rgba(250, 250, 248, 0.92);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  transition: all var(--duration-base) var(--ease-out);
}

.site-header.scrolled {
  height: 64px;
  border-bottom: 1px solid rgba(26, 24, 20, 0.08);
}

.header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 var(--space-8);
}

.header-logo {
  font-family: var(--font-display);
  font-size: var(--text-xl);
  font-weight: 600;
  letter-spacing: 0.2em;
  color: var(--color-ink);
  text-decoration: none;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}

.nav-link {
  font-family: var(--font-body);
  font-size: var(--text-sm);
  font-weight: 400;
  letter-spacing: 0.04em;
  color: var(--color-ink-muted);
  text-decoration: none;
  padding: var(--space-2) var(--space-3);
  transition: color var(--duration-fast);
}

.nav-link:hover { color: var(--color-ink); }

.icon-btn {
  width: 40px; height: 40px;
  display: flex; align-items: center; justify-content: center;
  border: none; background: none; cursor: pointer;
  border-radius: var(--radius-full);
  color: var(--color-ink);
  transition: background var(--duration-fast);
}

.icon-btn:hover { background: var(--color-bg-secondary); }

.cart-btn {
  display: flex; align-items: center; gap: var(--space-2);
  padding: var(--space-2) var(--space-4);
  background: var(--color-ink);
  color: var(--color-bg);
  border: none; border-radius: var(--radius-full);
  cursor: pointer; font-family: var(--font-body);
  font-size: var(--text-sm); font-weight: 500;
  transition: all var(--duration-fast);
}

.cart-btn:hover {
  background: var(--color-accent);
  transform: translateY(-1px);
}

.cart-count {
  background: var(--color-accent);
  color: white;
  font-size: 10px;
  font-family: var(--font-accent);
  width: 18px; height: 18px;
  border-radius: var(--radius-full);
  display: flex; align-items: center; justify-content: center;
  transition: transform var(--duration-fast);
}

/* Cart count bounce animation on add */
.cart-count.bump {
  animation: cartBump 0.4s var(--ease-out);
}

@keyframes cartBump {
  0%   { transform: scale(1); }
  40%  { transform: scale(1.5); }
  100% { transform: scale(1); }
}
```

### JavaScript（スクロール検知）
```javascript
// assets/header.js
const header = document.getElementById('site-header');
const scrollThreshold = 50;

window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > scrollThreshold);
}, { passive: true });
```

---

## 5. ヒーローセクション（トップページ）

### デザインコンセプト
- **全画面**: `100vh` 
- **左: テキスト（60%）** / **右: 商品画像（40%）** — asymmetric split
- テキストは左下から上へスタッガーアニメーション
- 背景に極薄のテクスチャ（SVGノイズ）

### HTML構造
```liquid
<section class="hero">
  <div class="hero-inner container">

    <div class="hero-content">
      <!-- タグライン -->
      <p class="hero-eyebrow">
        <span class="eyebrow-line"></span>
        Premium Pet Lifestyle
      </p>

      <!-- メイン見出し -->
      <h1 class="hero-title">
        <span class="hero-title-line">Every</span>
        <span class="hero-title-line hero-title-line--italic">adventure</span>
        <span class="hero-title-line">together.</span>
      </h1>

      <!-- サブコピー -->
      <p class="hero-subtitle">
        Handpicked gear for pets who live life to the fullest.
        Free worldwide shipping on all orders.
      </p>

      <!-- CTA -->
      <div class="hero-ctas">
        <a href="/collections/all" class="btn btn--primary">
          Shop Collection
          <svg width="16" height="16" viewBox="0 0 16 16">
            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round"/>
          </svg>
        </a>
        <a href="#bestsellers" class="btn btn--ghost">
          View Bestsellers
        </a>
      </div>

      <!-- Trust signals -->
      <div class="hero-trust">
        <span>⭐ 4.9 / 5.0</span>
        <span class="divider">·</span>
        <span>2,000+ Happy Pets</span>
        <span class="divider">·</span>
        <span>Free Returns</span>
      </div>
    </div>

    <!-- 右: フローティング商品カード -->
    <div class="hero-visual">
      <div class="hero-product-card">
        <div class="hero-image-wrapper">
          {{ section.settings.hero_image | image_url: width: 600 | image_tag: loading: 'eager' }}
        </div>
        <div class="hero-product-info">
          <span class="hero-product-label">Bestseller</span>
          <p class="hero-product-name">AstroPet™ Space Capsule Backpack</p>
          <p class="hero-product-price">$79.00</p>
        </div>
      </div>

      <!-- デコレーション: 浮遊する小要素 -->
      <div class="hero-deco hero-deco--star" aria-hidden="true">✦</div>
      <div class="hero-deco hero-deco--dot" aria-hidden="true"></div>
    </div>

  </div>

  <!-- 背景テクスチャ -->
  <div class="hero-bg-texture" aria-hidden="true"></div>
</section>
```

### CSS
```css
.hero {
  min-height: 100vh;
  padding-top: 72px; /* ヘッダー分 */
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
  background: var(--color-bg);
}

.hero-bg-texture {
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E");
  pointer-events: none;
}

.hero-inner {
  display: grid;
  grid-template-columns: 1fr 480px;
  gap: var(--space-16);
  align-items: center;
  padding: var(--space-20) var(--space-8);
  max-width: 1280px;
  margin: 0 auto;
  width: 100%;
}

/* ─── Hero Text ─── */
.hero-eyebrow {
  display: flex;
  align-items: center;
  gap: var(--space-4);
  font-family: var(--font-accent);
  font-size: var(--text-xs);
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--color-ink-muted);
  margin-bottom: var(--space-6);
  opacity: 0;
  transform: translateY(20px);
  animation: fadeUp 0.8s var(--ease-out) 0.1s forwards;
}

.eyebrow-line {
  display: block;
  width: 40px; height: 1px;
  background: var(--color-accent);
}

.hero-title {
  font-family: var(--font-display);
  font-size: var(--text-hero);
  font-weight: 300;
  line-height: 1.0;
  letter-spacing: -0.02em;
  color: var(--color-ink);
  margin-bottom: var(--space-6);
}

.hero-title-line {
  display: block;
  opacity: 0;
  transform: translateY(40px);
}

.hero-title-line:nth-child(1) { animation: fadeUp 0.9s var(--ease-out) 0.2s forwards; }
.hero-title-line:nth-child(2) { animation: fadeUp 0.9s var(--ease-out) 0.35s forwards; }
.hero-title-line:nth-child(3) { animation: fadeUp 0.9s var(--ease-out) 0.5s forwards; }

.hero-title-line--italic {
  font-style: italic;
  color: var(--color-accent);
}

.hero-subtitle {
  font-family: var(--font-body);
  font-size: var(--text-lg);
  font-weight: 300;
  line-height: 1.6;
  color: var(--color-ink-muted);
  max-width: 480px;
  margin-bottom: var(--space-10);
  opacity: 0;
  animation: fadeUp 0.8s var(--ease-out) 0.65s forwards;
}

.hero-ctas {
  display: flex;
  gap: var(--space-4);
  margin-bottom: var(--space-10);
  opacity: 0;
  animation: fadeUp 0.8s var(--ease-out) 0.75s forwards;
}

.hero-trust {
  display: flex;
  gap: var(--space-4);
  align-items: center;
  font-family: var(--font-body);
  font-size: var(--text-sm);
  color: var(--color-ink-muted);
  opacity: 0;
  animation: fadeUp 0.8s var(--ease-out) 0.85s forwards;
}

.hero-trust .divider { opacity: 0.4; }

/* ─── Hero Visual ─── */
.hero-visual {
  position: relative;
  opacity: 0;
  animation: fadeUp 1s var(--ease-out) 0.4s forwards;
}

.hero-product-card {
  background: var(--color-surface);
  border-radius: var(--radius-xl);
  overflow: hidden;
  box-shadow: var(--shadow-xl);
  transition: transform var(--duration-slow) var(--ease-out);
}

.hero-product-card:hover {
  transform: translateY(-8px) rotate(1deg);
}

.hero-image-wrapper {
  aspect-ratio: 4/5;
  overflow: hidden;
}

.hero-image-wrapper img {
  width: 100%; height: 100%;
  object-fit: cover;
  transition: transform var(--duration-slower) var(--ease-out);
}

.hero-product-card:hover .hero-image-wrapper img {
  transform: scale(1.04);
}

.hero-product-info {
  padding: var(--space-6);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.hero-product-label {
  font-family: var(--font-accent);
  font-size: var(--text-xs);
  letter-spacing: 0.1em;
  text-transform: uppercase;
  background: var(--color-accent-light);
  color: var(--color-accent-dark);
  padding: var(--space-1) var(--space-3);
  border-radius: var(--radius-full);
}

.hero-product-name {
  font-family: var(--font-body);
  font-size: var(--text-sm);
  font-weight: 500;
  color: var(--color-ink);
}

.hero-product-price {
  font-family: var(--font-accent);
  font-size: var(--text-base);
  color: var(--color-ink);
}

/* Floating decorations */
.hero-deco {
  position: absolute;
  pointer-events: none;
}

.hero-deco--star {
  top: -20px; right: -10px;
  font-size: 2rem;
  color: var(--color-accent);
  opacity: 0.6;
  animation: spin 20s linear infinite;
}

.hero-deco--dot {
  bottom: 60px; left: -20px;
  width: 80px; height: 80px;
  border-radius: var(--radius-full);
  background: var(--color-accent-light);
  opacity: 0.5;
  animation: float 6s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50%       { transform: translateY(-16px); }
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

@keyframes fadeUp {
  to { opacity: 1; transform: translateY(0); }
}

/* ─── Responsive ─── */
@media (max-width: 1024px) {
  .hero-title { font-size: var(--text-5xl); }
  .hero-inner { grid-template-columns: 1fr; }
  .hero-visual { max-width: 400px; margin: 0 auto; }
}

@media (max-width: 768px) {
  .hero-title { font-size: var(--text-4xl); }
  .hero-ctas { flex-direction: column; }
}
```

---

## 6. ボタンコンポーネント

```css
/* ─── Base Button ─── */
.btn {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-4) var(--space-8);
  font-family: var(--font-body);
  font-size: var(--text-sm);
  font-weight: 500;
  letter-spacing: 0.02em;
  border-radius: var(--radius-full);
  border: 1.5px solid transparent;
  cursor: pointer;
  text-decoration: none;
  transition: all var(--duration-base) var(--ease-out);
  white-space: nowrap;
}

/* Primary */
.btn--primary {
  background: var(--color-ink);
  color: var(--color-bg);
  border-color: var(--color-ink);
}

.btn--primary:hover {
  background: var(--color-accent);
  border-color: var(--color-accent);
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(200, 149, 108, 0.35);
}

/* Ghost */
.btn--ghost {
  background: transparent;
  color: var(--color-ink);
  border-color: rgba(26, 24, 20, 0.2);
}

.btn--ghost:hover {
  background: var(--color-bg-secondary);
  border-color: var(--color-ink);
}

/* CTA (Accent filled) */
.btn--cta {
  background: var(--color-accent);
  color: white;
  border-color: var(--color-accent);
  padding: var(--space-5) var(--space-10);
  font-size: var(--text-base);
}

.btn--cta:hover {
  background: var(--color-accent-dark);
  border-color: var(--color-accent-dark);
  transform: translateY(-2px);
  box-shadow: 0 12px 32px rgba(200, 149, 108, 0.4);
}

/* Large */
.btn--lg {
  padding: var(--space-5) var(--space-12);
  font-size: var(--text-base);
}

/* Icon Button */
.btn--icon {
  width: 48px; height: 48px;
  padding: 0;
  border-radius: var(--radius-full);
  justify-content: center;
}
```

---

## 7. プロダクトカード

```html
<!-- Product Card Component -->
<article class="product-card" data-product-id="{{ product.id }}">

  <!-- 画像エリア -->
  <div class="product-card__media">
    <a href="{{ product.url }}" class="product-card__image-link">
      <img
        src="{{ product.featured_image | image_url: width: 600 }}"
        alt="{{ product.title }}"
        class="product-card__image product-card__image--primary"
        loading="lazy"
        width="600" height="750"
      >
      {% if product.images[1] %}
      <img
        src="{{ product.images[1] | image_url: width: 600 }}"
        alt="{{ product.title }}"
        class="product-card__image product-card__image--secondary"
        loading="lazy"
        width="600" height="750"
      >
      {% endif %}
    </a>

    <!-- バッジ -->
    {% if product.compare_at_price > product.price %}
    <span class="product-card__badge product-card__badge--sale">
      Save {{ product.compare_at_price | minus: product.price | times: 100 | divided_by: product.compare_at_price }}%
    </span>
    {% endif %}

    <!-- ウィッシュリスト -->
    <button class="product-card__wishlist" aria-label="Add to wishlist">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
      </svg>
    </button>

    <!-- クイックAdd -->
    <div class="product-card__quick-add">
      <button class="btn btn--primary product-card__add-btn" data-product-id="{{ product.id }}">
        Quick Add — {{ product.price | money }}
      </button>
    </div>
  </div>

  <!-- テキストエリア -->
  <div class="product-card__info">
    <div class="product-card__meta">
      <span class="product-card__vendor">{{ product.vendor }}</span>
    </div>
    <h3 class="product-card__title">
      <a href="{{ product.url }}">{{ product.title }}</a>
    </h3>
    <div class="product-card__pricing">
      <span class="product-card__price">{{ product.price | money }}</span>
      {% if product.compare_at_price > product.price %}
      <span class="product-card__compare">{{ product.compare_at_price | money }}</span>
      {% endif %}
    </div>
    <!-- Stars -->
    <div class="product-card__stars" aria-label="4.9 out of 5 stars">
      <span class="stars-visual">★★★★★</span>
      <span class="stars-count">({{ product.metafields.reviews.count | default: '128' }})</span>
    </div>
  </div>

</article>
```

### CSS
```css
.product-card {
  position: relative;
  background: var(--color-surface);
  border-radius: var(--radius-lg);
  overflow: hidden;
  transition: box-shadow var(--duration-base) var(--ease-out);
}

.product-card:hover {
  box-shadow: var(--shadow-lg);
}

/* ─── Media ─── */
.product-card__media {
  position: relative;
  aspect-ratio: 4/5;
  overflow: hidden;
  background: var(--color-bg-secondary);
}

.product-card__image {
  position: absolute;
  inset: 0;
  width: 100%; height: 100%;
  object-fit: cover;
  transition: all var(--duration-slower) var(--ease-out);
}

.product-card__image--secondary {
  opacity: 0;
}

.product-card:hover .product-card__image--primary {
  opacity: 0;
  transform: scale(1.04);
}

.product-card:hover .product-card__image--secondary {
  opacity: 1;
  transform: scale(1.02);
}

/* ─── Badge ─── */
.product-card__badge {
  position: absolute;
  top: var(--space-4);
  left: var(--space-4);
  padding: var(--space-1) var(--space-3);
  border-radius: var(--radius-full);
  font-family: var(--font-accent);
  font-size: var(--text-xs);
  letter-spacing: 0.05em;
  z-index: 2;
}

.product-card__badge--sale {
  background: var(--color-ink);
  color: white;
}

/* ─── Wishlist Button ─── */
.product-card__wishlist {
  position: absolute;
  top: var(--space-4);
  right: var(--space-4);
  width: 36px; height: 36px;
  background: white;
  border: none;
  border-radius: var(--radius-full);
  display: flex; align-items: center; justify-content: center;
  cursor: pointer;
  color: var(--color-ink-muted);
  box-shadow: var(--shadow-sm);
  opacity: 0;
  transform: translateY(-4px);
  transition: all var(--duration-base) var(--ease-out);
  z-index: 2;
}

.product-card:hover .product-card__wishlist {
  opacity: 1;
  transform: translateY(0);
}

.product-card__wishlist:hover {
  color: #E74C3C;
  background: #FEF2F2;
}

/* ─── Quick Add ─── */
.product-card__quick-add {
  position: absolute;
  bottom: 0; left: 0; right: 0;
  padding: var(--space-4);
  background: linear-gradient(to top, rgba(26,24,20,0.6) 0%, transparent 100%);
  transform: translateY(100%);
  transition: transform var(--duration-base) var(--ease-out);
  z-index: 2;
}

.product-card:hover .product-card__quick-add {
  transform: translateY(0);
}

.product-card__add-btn {
  width: 100%;
  justify-content: center;
  background: white;
  color: var(--color-ink);
  border-color: white;
}

.product-card__add-btn:hover {
  background: var(--color-accent);
  color: white;
  border-color: var(--color-accent);
  transform: none;
}

/* ─── Info ─── */
.product-card__info {
  padding: var(--space-4) var(--space-5) var(--space-5);
}

.product-card__vendor {
  font-family: var(--font-accent);
  font-size: var(--text-xs);
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-ink-subtle);
}

.product-card__title {
  font-family: var(--font-body);
  font-size: var(--text-base);
  font-weight: 500;
  line-height: 1.4;
  margin: var(--space-1) 0 var(--space-2);
}

.product-card__title a {
  color: var(--color-ink);
  text-decoration: none;
  transition: color var(--duration-fast);
}

.product-card__title a:hover { color: var(--color-accent); }

.product-card__pricing {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  margin-bottom: var(--space-2);
}

.product-card__price {
  font-family: var(--font-accent);
  font-size: var(--text-base);
  font-weight: 400;
  color: var(--color-ink);
}

.product-card__compare {
  font-family: var(--font-accent);
  font-size: var(--text-sm);
  color: var(--color-ink-subtle);
  text-decoration: line-through;
}

.product-card__stars {
  display: flex;
  align-items: center;
  gap: var(--space-1);
}

.stars-visual { color: #F4B940; font-size: var(--text-sm); }

.stars-count {
  font-size: var(--text-xs);
  color: var(--color-ink-muted);
  font-family: var(--font-body);
}
```

---

## 8. プロダクトグリッド（コレクションページ）

```css
/* ─── Collection Grid ─── */
.product-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-6);
}

@media (max-width: 1024px) {
  .product-grid { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 640px) {
  .product-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: var(--space-3);
  }
}

/* Scroll reveal for grid items */
.product-card {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.6s var(--ease-out), transform 0.6s var(--ease-out), box-shadow var(--duration-base);
}

.product-card.visible {
  opacity: 1;
  transform: translateY(0);
}

/* Stagger: JS adds delay via style attribute */
```

```javascript
// assets/scroll-reveal.js
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      const delay = entry.target.dataset.delay || 0;
      setTimeout(() => entry.target.classList.add('visible'), delay);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.product-card').forEach((card, i) => {
  card.dataset.delay = i * 80;
  observer.observe(card);
});
```

---

## 9. 商品詳細ページ（Product Page）

### レイアウト
```
┌──────────────────────────────────────────────┐
│  ← Back to Collection                        │
│                                              │
│  ┌─────────────────┐  ┌────────────────────┐ │
│  │                 │  │ Vendor / Category  │ │
│  │   Main Image    │  │                    │ │
│  │   (sticky)      │  │ H1: Product Title  │ │
│  │                 │  │                    │ │
│  │                 │  │ ★★★★★ (128)       │ │
│  │                 │  │                    │ │
│  │                 │  │ $79.00  ~~$149.00~~ │ │
│  └─────────────────┘  │                    │ │
│  [thumb] [thumb] [th] │ ──────────────────  │ │
│                       │ Color / Variant     │ │
│                       │                    │ │
│                       │ [Add to Cart ──→]  │ │
│                       │                    │ │
│                       │ [Buy it Now]       │ │
│                       │                    │ │
│                       │ ✓ Free Shipping    │ │
│                       │ ✓ 30-Day Returns   │ │
│                       │ ✓ Secure Checkout  │ │
│                       └────────────────────┘ │
└──────────────────────────────────────────────┘
```

### Product Page CSS
```css
.product-page {
  padding-top: 72px;
}

.product-page__inner {
  display: grid;
  grid-template-columns: 1fr 480px;
  gap: var(--space-16);
  max-width: 1280px;
  margin: 0 auto;
  padding: var(--space-12) var(--space-8);
  align-items: start;
}

/* ─── Gallery ─── */
.product-gallery {
  position: sticky;
  top: calc(72px + var(--space-8));
}

.product-gallery__main {
  aspect-ratio: 1/1;
  border-radius: var(--radius-xl);
  overflow: hidden;
  background: var(--color-bg-secondary);
  margin-bottom: var(--space-4);
}

.product-gallery__main img {
  width: 100%; height: 100%;
  object-fit: cover;
  transition: transform var(--duration-slow) var(--ease-out);
  cursor: zoom-in;
}

.product-gallery__main:hover img { transform: scale(1.05); }

.product-gallery__thumbs {
  display: flex;
  gap: var(--space-3);
  overflow-x: auto;
  scrollbar-width: none;
}

.product-gallery__thumb {
  flex-shrink: 0;
  width: 72px; height: 72px;
  border-radius: var(--radius-md);
  overflow: hidden;
  cursor: pointer;
  border: 2px solid transparent;
  transition: border-color var(--duration-fast);
}

.product-gallery__thumb.active {
  border-color: var(--color-accent);
}

.product-gallery__thumb img {
  width: 100%; height: 100%;
  object-fit: cover;
}

/* ─── Product Info ─── */
.product-info__vendor {
  font-family: var(--font-accent);
  font-size: var(--text-xs);
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--color-ink-muted);
  margin-bottom: var(--space-2);
}

.product-info__title {
  font-family: var(--font-display);
  font-size: var(--text-4xl);
  font-weight: 400;
  line-height: 1.1;
  color: var(--color-ink);
  margin-bottom: var(--space-4);
}

.product-info__rating {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  margin-bottom: var(--space-6);
}

.product-info__price-block {
  display: flex;
  align-items: baseline;
  gap: var(--space-3);
  margin-bottom: var(--space-6);
  padding-bottom: var(--space-6);
  border-bottom: 1px solid rgba(26, 24, 20, 0.08);
}

.product-info__price {
  font-family: var(--font-display);
  font-size: var(--text-3xl);
  font-weight: 500;
  color: var(--color-ink);
}

.product-info__compare {
  font-family: var(--font-accent);
  font-size: var(--text-lg);
  color: var(--color-ink-subtle);
  text-decoration: line-through;
}

.product-info__save {
  font-family: var(--font-accent);
  font-size: var(--text-sm);
  background: #FEF3E2;
  color: var(--color-accent-dark);
  padding: var(--space-1) var(--space-3);
  border-radius: var(--radius-full);
}

/* ─── Variants ─── */
.variant-label {
  font-family: var(--font-body);
  font-size: var(--text-sm);
  font-weight: 500;
  color: var(--color-ink);
  margin-bottom: var(--space-3);
}

.variant-options {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
  margin-bottom: var(--space-6);
}

.variant-btn {
  padding: var(--space-2) var(--space-4);
  border: 1.5px solid rgba(26, 24, 20, 0.15);
  border-radius: var(--radius-full);
  background: transparent;
  font-family: var(--font-body);
  font-size: var(--text-sm);
  cursor: pointer;
  transition: all var(--duration-fast);
  color: var(--color-ink);
}

.variant-btn:hover {
  border-color: var(--color-ink);
}

.variant-btn.active {
  background: var(--color-ink);
  color: white;
  border-color: var(--color-ink);
}

/* ─── CTA Buttons ─── */
.product-cta {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  margin-bottom: var(--space-8);
}

.btn--add-to-cart {
  width: 100%;
  justify-content: center;
  padding: var(--space-5);
  background: var(--color-ink);
  color: white;
  border-radius: var(--radius-lg);
  font-size: var(--text-base);
  font-weight: 500;
  border: none;
  cursor: pointer;
  transition: all var(--duration-base) var(--ease-out);
}

.btn--add-to-cart:hover {
  background: var(--color-accent);
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(200, 149, 108, 0.35);
}

.btn--buy-now {
  width: 100%;
  justify-content: center;
  padding: var(--space-5);
  background: transparent;
  color: var(--color-ink);
  border: 1.5px solid rgba(26, 24, 20, 0.2);
  border-radius: var(--radius-lg);
  font-size: var(--text-base);
  cursor: pointer;
  transition: all var(--duration-fast);
}

.btn--buy-now:hover {
  border-color: var(--color-ink);
  background: var(--color-bg-secondary);
}

/* ─── Trust Badges ─── */
.trust-badges {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-4);
  padding: var(--space-6);
  background: var(--color-bg-secondary);
  border-radius: var(--radius-lg);
}

.trust-badge {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-2);
  text-align: center;
}

.trust-badge__icon {
  font-size: 1.5rem;
}

.trust-badge__text {
  font-family: var(--font-body);
  font-size: var(--text-xs);
  color: var(--color-ink-muted);
  line-height: 1.4;
}

/* ─── Accordion (Product Details) ─── */
.accordion-item {
  border-bottom: 1px solid rgba(26, 24, 20, 0.08);
}

.accordion-btn {
  width: 100%;
  padding: var(--space-5) 0;
  background: none;
  border: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  font-family: var(--font-body);
  font-size: var(--text-base);
  font-weight: 500;
  color: var(--color-ink);
}

.accordion-icon {
  transition: transform var(--duration-fast);
}

.accordion-btn[aria-expanded="true"] .accordion-icon {
  transform: rotate(45deg);
}

.accordion-body {
  max-height: 0;
  overflow: hidden;
  transition: max-height var(--duration-slow) var(--ease-out);
}

.accordion-body.open {
  max-height: 500px;
}

.accordion-body__inner {
  padding-bottom: var(--space-5);
  font-family: var(--font-body);
  font-size: var(--text-base);
  line-height: 1.7;
  color: var(--color-ink-muted);
}
```

---

## 10. カートドロワー（スライドイン）

```html
<!-- Slide-in Cart Drawer -->
<div class="cart-drawer" id="cart-drawer" role="dialog" aria-modal="true">
  <div class="cart-drawer__overlay" id="cart-overlay"></div>

  <div class="cart-drawer__panel">
    <!-- Header -->
    <div class="cart-drawer__header">
      <h2 class="cart-drawer__title">Your Bag</h2>
      <span class="cart-drawer__count" id="drawer-count">0 items</span>
      <button class="cart-drawer__close" id="cart-close" aria-label="Close cart">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M15 5L5 15M5 5l10 10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
        </svg>
      </button>
    </div>

    <!-- Items -->
    <div class="cart-drawer__items" id="cart-items">
      <!-- Dynamic cart items here -->
    </div>

    <!-- Footer -->
    <div class="cart-drawer__footer">
      <div class="cart-subtotal">
        <span>Subtotal</span>
        <span id="cart-subtotal">$0.00</span>
      </div>
      <p class="cart-shipping-note">
        Shipping & taxes calculated at checkout
      </p>
      <a href="/checkout" class="btn btn--cta" style="width:100%;justify-content:center;">
        Checkout — Secure & Fast
      </a>
      <a href="/cart" class="btn btn--ghost" style="width:100%;justify-content:center;margin-top:var(--space-3)">
        View Full Cart
      </a>
    </div>
  </div>
</div>
```

```css
.cart-drawer {
  position: fixed;
  inset: 0;
  z-index: 2000;
  pointer-events: none;
}

.cart-drawer.open {
  pointer-events: all;
}

.cart-drawer__overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(4px);
  opacity: 0;
  transition: opacity var(--duration-base);
}

.cart-drawer.open .cart-drawer__overlay {
  opacity: 1;
}

.cart-drawer__panel {
  position: absolute;
  top: 0; right: 0; bottom: 0;
  width: 400px;
  max-width: 100vw;
  background: var(--color-bg);
  display: flex;
  flex-direction: column;
  transform: translateX(100%);
  transition: transform var(--duration-slow) var(--ease-out);
  box-shadow: -20px 0 60px rgba(0,0,0,0.12);
}

.cart-drawer.open .cart-drawer__panel {
  transform: translateX(0);
}

.cart-drawer__header {
  display: flex;
  align-items: center;
  padding: var(--space-6) var(--space-6) var(--space-5);
  border-bottom: 1px solid rgba(26, 24, 20, 0.08);
}

.cart-drawer__title {
  font-family: var(--font-display);
  font-size: var(--text-2xl);
  font-weight: 400;
  flex: 1;
}

.cart-drawer__count {
  font-family: var(--font-accent);
  font-size: var(--text-xs);
  color: var(--color-ink-muted);
  margin-right: var(--space-4);
}

.cart-drawer__items {
  flex: 1;
  overflow-y: auto;
  padding: var(--space-6);
}

.cart-drawer__footer {
  padding: var(--space-6);
  border-top: 1px solid rgba(26, 24, 20, 0.08);
}

.cart-subtotal {
  display: flex;
  justify-content: space-between;
  font-family: var(--font-body);
  font-size: var(--text-lg);
  font-weight: 500;
  margin-bottom: var(--space-2);
}

.cart-shipping-note {
  font-size: var(--text-xs);
  color: var(--color-ink-muted);
  text-align: center;
  margin-bottom: var(--space-5);
}
```

---

## 11. フッター

```html
<footer class="site-footer">
  <div class="footer-inner container">

    <!-- Brand Column -->
    <div class="footer-brand">
      <p class="footer-logo">PAWLUX</p>
      <p class="footer-tagline">Luxury gear for pets<br>who live life to the fullest.</p>
      <div class="footer-social">
        <a href="https://instagram.com/pawlux" class="social-link" aria-label="Instagram">
          <!-- Instagram SVG -->
        </a>
        <a href="https://tiktok.com/@pawlux" class="social-link" aria-label="TikTok">
          <!-- TikTok SVG -->
        </a>
      </div>
    </div>

    <!-- Links -->
    <div class="footer-links">
      <div class="footer-col">
        <p class="footer-col__title">Shop</p>
        <a href="/collections/carriers">Pet Carriers</a>
        <a href="/collections/collars">Collars & Harnesses</a>
        <a href="/collections/travel">Travel Gear</a>
        <a href="/collections/all">All Products</a>
      </div>
      <div class="footer-col">
        <p class="footer-col__title">Support</p>
        <a href="/pages/faq">FAQ</a>
        <a href="/pages/shipping">Shipping Info</a>
        <a href="/pages/returns">Returns</a>
        <a href="/pages/contact">Contact Us</a>
      </div>
    </div>

    <!-- Newsletter -->
    <div class="footer-newsletter">
      <p class="footer-newsletter__title">Join the Pack</p>
      <p class="footer-newsletter__sub">Get 10% off your first order + exclusive pet tips.</p>
      <form class="newsletter-form">
        <input type="email" placeholder="your@email.com" class="newsletter-input">
        <button type="submit" class="btn btn--primary">Subscribe</button>
      </form>
    </div>

  </div>

  <!-- Bottom Bar -->
  <div class="footer-bottom">
    <div class="container">
      <p>© 2025 PawLux. All rights reserved.</p>
      <div class="footer-legal">
        <a href="/policies/privacy-policy">Privacy</a>
        <a href="/policies/terms-of-service">Terms</a>
      </div>
      <!-- Payment icons -->
      <div class="footer-payments">
        <!-- Visa, Mastercard, PayPal SVGs -->
      </div>
    </div>
  </div>
</footer>
```

```css
.site-footer {
  background: var(--color-ink);
  color: rgba(250, 250, 248, 0.85);
  margin-top: var(--space-32);
}

.footer-inner {
  display: grid;
  grid-template-columns: 1.5fr 2fr 1.5fr;
  gap: var(--space-16);
  padding: var(--space-20) var(--space-8);
  max-width: 1280px;
  margin: 0 auto;
}

.footer-logo {
  font-family: var(--font-display);
  font-size: var(--text-2xl);
  font-weight: 600;
  letter-spacing: 0.2em;
  color: white;
  margin-bottom: var(--space-4);
}

.footer-tagline {
  font-size: var(--text-sm);
  line-height: 1.6;
  opacity: 0.6;
  margin-bottom: var(--space-6);
}

.footer-social {
  display: flex;
  gap: var(--space-4);
}

.social-link {
  width: 40px; height: 40px;
  border: 1px solid rgba(250, 250, 248, 0.2);
  border-radius: var(--radius-full);
  display: flex; align-items: center; justify-content: center;
  color: rgba(250, 250, 248, 0.7);
  transition: all var(--duration-fast);
}

.social-link:hover {
  border-color: var(--color-accent);
  color: var(--color-accent);
  background: rgba(200, 149, 108, 0.1);
}

.footer-links {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-8);
}

.footer-col__title {
  font-family: var(--font-accent);
  font-size: var(--text-xs);
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: white;
  margin-bottom: var(--space-5);
}

.footer-col a {
  display: block;
  font-size: var(--text-sm);
  color: rgba(250, 250, 248, 0.6);
  text-decoration: none;
  margin-bottom: var(--space-3);
  transition: color var(--duration-fast);
}

.footer-col a:hover { color: white; }

.newsletter-input {
  width: 100%;
  padding: var(--space-4) var(--space-5);
  background: rgba(250, 250, 248, 0.08);
  border: 1px solid rgba(250, 250, 248, 0.15);
  border-radius: var(--radius-lg);
  color: white;
  font-family: var(--font-body);
  font-size: var(--text-sm);
  margin-bottom: var(--space-3);
  transition: border-color var(--duration-fast);
}

.newsletter-input::placeholder { color: rgba(250, 250, 248, 0.3); }
.newsletter-input:focus {
  outline: none;
  border-color: var(--color-accent);
}

.footer-bottom {
  border-top: 1px solid rgba(250, 250, 248, 0.08);
  padding: var(--space-6) var(--space-8);
}

.footer-bottom .container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1280px;
  margin: 0 auto;
  font-size: var(--text-xs);
  color: rgba(250, 250, 248, 0.4);
}

.footer-legal {
  display: flex;
  gap: var(--space-6);
}

.footer-legal a {
  color: rgba(250, 250, 248, 0.4);
  text-decoration: none;
  transition: color var(--duration-fast);
}

.footer-legal a:hover { color: white; }
```

---

## 12. Cursor向け実装手順

### ファイル構造
```
vela-studio-theme/
├── assets/
│   ├── theme.css          ← 上記CSSをすべてここに集約
│   ├── header.js          ← スクロール検知
│   ├── cart-drawer.js     ← カートドロワー開閉
│   ├── scroll-reveal.js   ← スクロールアニメーション
│   └── product-gallery.js ← サムネイルギャラリー
├── layout/
│   └── theme.liquid       ← Fontsインポート、JS読み込み
├── sections/
│   ├── header.liquid
│   ├── hero.liquid
│   ├── product-grid.liquid
│   └── footer.liquid
└── snippets/
    ├── product-card.liquid
    └── cart-drawer.liquid
```

### Cursorへの指示テンプレート
```
「上記のCSS変数・フォント設定を assets/theme.css に追加して。
 既存のスタイルと衝突しないよう :root セレクタに変数を定義する。
 次に sections/header.liquid を上記HTMLに書き換えて、
 assets/header.js のスクロール検知スクリプトを追加して」
```

---

## 13. モバイルファースト対応チェックリスト

```
□ ヘッダー：ハンバーガーメニュー実装（768px以下）
□ ヒーロー：テキストとビジュアルを縦並びに
□ 商品グリッド：2カラムに変更
□ 商品詳細：ギャラリーとInfoを縦並びに
□ カートドロワー：100vwに変更
□ フッター：1カラムに変更
□ 全タッチターゲット：min 44×44px確保
□ フォントサイズ：最小16px（iOSズーム防止）
```

---

## 14. パフォーマンス最適化

```liquid
<!-- 画像は必ずwidthパラメータ付きで -->
{{ product.featured_image | image_url: width: 600 | image_tag: loading: 'lazy' }}

<!-- Above the foldはeagerで -->
{{ section.settings.hero_image | image_url: width: 1200 | image_tag: loading: 'eager' }}
```

```css
/* Critical CSSはインラインに、残りは非同期読み込み */
/* Webフォントはpreloadで先読み */
```

---

*このドキュメントをCursorのコンテキストに貼り付けて実装してください。*
*質問があれば各セクション番号を指定してください。*
