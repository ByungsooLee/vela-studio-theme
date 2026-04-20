import { type ReactNode, useMemo } from "react";
import { PaymentIcons } from "../ui/PaymentIcons";
import "./ProductInfo.css";

type BreadcrumbItem = {
  label: string;
  href: string;
};

type ProductMetafield = {
  key: string;
  value?: string | null;
};

type ProductVariant = {
  id: string;
  title: string;
  availableForSale?: boolean;
};

type ProductInfoProps = {
  breadcrumbs: BreadcrumbItem[];
  title: string;
  ratingValue?: number;
  reviewCount?: number;
  price: number;
  compareAtPrice?: number | null;
  currencyCode: string;
  metafields?: ProductMetafield[] | null;
  variants: ProductVariant[];
  selectedVariantId: string;
  quantity: number;
  onVariantChange: (variantId: string) => void;
  onQuantityChange: (quantity: number) => void;
  onAddToCart: () => void;
  onBuyNow: () => void;
  acceleratedCheckout?: ReactNode;
  enabledPaymentTypes: string[];
  trustSignals: { label: string; iconSvg: string }[];
};

function formatMoney(value: number, currencyCode: string) {
  return new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: currencyCode,
  }).format(value);
}

function StarIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="m12 3.5 2.7 5.48 6.04.88-4.37 4.26 1.03 6.01L12 17.3l-5.4 2.84 1.03-6.01-4.37-4.26 6.04-.88L12 3.5Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function ProductInfo({
  breadcrumbs,
  title,
  ratingValue = 0,
  reviewCount = 0,
  price,
  compareAtPrice,
  currencyCode,
  metafields,
  variants,
  selectedVariantId,
  quantity,
  onVariantChange,
  onQuantityChange,
  onAddToCart,
  onBuyNow,
  acceleratedCheckout,
  enabledPaymentTypes,
  trustSignals,
}: ProductInfoProps) {
  const shortValueProp = useMemo(() => {
    const field = (metafields ?? []).find((item) => item.key === "short_value_prop");
    return field?.value?.trim() ?? "";
  }, [metafields]);

  const hasDiscount =
    typeof compareAtPrice === "number" && Number.isFinite(compareAtPrice) && compareAtPrice > price;

  return (
    <section className="product-info" aria-label="Product details">
      <nav className="product-info__breadcrumb" aria-label="Breadcrumb">
        {breadcrumbs.map((item, index) => (
          <span key={item.href} className="product-info__breadcrumb-item">
            <a href={item.href}>{item.label}</a>
            {index < breadcrumbs.length - 1 ? " / " : ""}
          </span>
        ))}
      </nav>

      <h1 className="product-info__title">{title}</h1>

      <a className="product-info__reviews" href="#reviews">
        <StarIcon />
        <span>{ratingValue.toFixed(1)}</span>
        <span>({reviewCount} reviews)</span>
      </a>

      <div className="product-info__price-wrap">
        <span className="product-info__price">{formatMoney(price, currencyCode)}</span>
        {hasDiscount ? (
          <span className="product-info__compare-price">{formatMoney(compareAtPrice, currencyCode)}</span>
        ) : null}
      </div>

      {shortValueProp ? <p className="product-info__value-prop">{shortValueProp}</p> : null}

      <fieldset className="product-info__variants">
        <legend>Variant</legend>
        <div className="product-info__variant-options">
          {variants.map((variant) => (
            <button
              key={variant.id}
              type="button"
              className={`product-info__variant-button${
                variant.id === selectedVariantId ? " is-active" : ""
              }`}
              disabled={variant.availableForSale === false}
              onClick={() => onVariantChange(variant.id)}
            >
              {variant.title}
            </button>
          ))}
        </div>
      </fieldset>

      <div className="product-info__quantity">
        <label htmlFor="product-qty">Quantity</label>
        <input
          id="product-qty"
          type="number"
          min={1}
          value={quantity}
          onChange={(event) => onQuantityChange(Math.max(1, Number(event.target.value) || 1))}
        />
      </div>

      <button
        type="button"
        className="product-info__cta product-info__cta--atc"
        data-main-atc="true"
        onClick={onAddToCart}
      >
        Add to Cart
      </button>

      <button type="button" className="product-info__cta product-info__cta--buy-now" onClick={onBuyNow}>
        Buy Now
      </button>

      {acceleratedCheckout ? <div className="product-info__accelerated">{acceleratedCheckout}</div> : null}

      <div className="product-info__trust-cluster">
        <div className="product-info__trust-signals" aria-label="Trust signals">
          {trustSignals.slice(0, 3).map((item) => (
            <span key={item.label} className="product-info__trust-item">
              <span
                className="product-info__trust-icon"
                aria-hidden="true"
                dangerouslySetInnerHTML={{ __html: item.iconSvg }}
              />
              {item.label}
            </span>
          ))}
        </div>
        <PaymentIcons enabledPaymentTypes={enabledPaymentTypes} />
      </div>
    </section>
  );
}

export type { ProductInfoProps, ProductVariant, ProductMetafield, BreadcrumbItem };
