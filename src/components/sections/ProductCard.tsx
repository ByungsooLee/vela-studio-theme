import { useMemo, useState } from "react";
import "./ProductCard.css";

type ProductImage = {
  url: string;
  altText?: string | null;
};

type ProductMoney = {
  amount: string;
  currencyCode: string;
};

type ProductMetafield = {
  key: string;
  value?: string | null;
};

type ProductCardNode = {
  handle: string;
  title: string;
  featuredImage?: ProductImage | null;
  images?: {
    nodes: ProductImage[];
  };
  priceRange?: {
    minVariantPrice: ProductMoney;
  };
  metafields?: ProductMetafield[] | null;
  tags?: string[];
};

type ProductCardProps = {
  product: ProductCardNode;
};

const BADGE_PRIORITY = [
  { label: "Staff pick", tag: "staff-pick" },
  { label: "Best seller", tag: "best-seller" },
  { label: "New", tag: "new" },
] as const;

function formatMoney(money?: ProductMoney) {
  if (!money) {
    return "";
  }

  return new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: money.currencyCode,
    maximumFractionDigits: 0,
  }).format(Number(money.amount));
}

export function ProductCard({ product }: ProductCardProps) {
  const [hovered, setHovered] = useState(false);

  const imageNodes = product.images?.nodes ?? [];
  const primaryImage = product.featuredImage ?? imageNodes[0] ?? null;
  const secondaryImage = imageNodes[1] ?? null;
  const activeImage = hovered && secondaryImage ? secondaryImage : primaryImage;

  const badge = useMemo(() => {
    const normalizedTags = (product.tags ?? []).map((tag) => tag.toLowerCase());
    return BADGE_PRIORITY.find((item) => normalizedTags.includes(item.tag))?.label ?? null;
  }, [product.tags]);

  const benefitLine = useMemo(() => {
    const metafield = (product.metafields ?? []).find(
      (item) => item.key === "benefit_line" || item.key === "short_value_prop"
    );
    return metafield?.value?.trim() ?? "";
  }, [product.metafields]);

  const price = formatMoney(product.priceRange?.minVariantPrice);

  if (!primaryImage) {
    return null;
  }

  return (
    <article className="product-card">
      <a
        href={`/products/${product.handle}`}
        className="product-card__link"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onFocus={() => setHovered(true)}
        onBlur={() => setHovered(false)}
      >
        <div className="product-card__media">
          {badge ? <span className="product-card__badge">{badge}</span> : null}
          <img
            className="product-card__image"
            src={activeImage?.url}
            alt={activeImage?.altText || product.title}
          />
        </div>
        <h3 className="product-card__title">{product.title}</h3>
        {benefitLine ? <p className="product-card__benefit">{benefitLine}</p> : null}
        {price ? <p className="product-card__price">{price}</p> : null}
      </a>
    </article>
  );
}

export type { ProductCardProps, ProductCardNode };
