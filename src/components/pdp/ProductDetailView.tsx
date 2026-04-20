"use client";

import { useState } from "react";
import { BenefitsList } from "./BenefitsList";
import { FaqAccordion } from "./FaqAccordion";
import { ProductGallery } from "./ProductGallery";
import { ProductInfo } from "./ProductInfo";
import { ProductSpecGrid } from "./ProductSpecGrid";
import { StickyMobileATC } from "./StickyMobileATC";
import {
  buildEnabledPaymentTypes,
  getFaqItems,
  type ShopifyMetafield,
  type ShopifyPaymentSettings,
} from "../../lib/shopify/productDetail";
import "./ProductDetailView.css";

type Money = {
  amount: string;
  currencyCode: string;
};

type ProductVariant = {
  id: string;
  title: string;
  availableForSale?: boolean;
  image?: {
    id: string;
    url: string;
    altText?: string | null;
  } | null;
  price: Money;
  compareAtPrice?: Money | null;
};

type ProductDetailViewProps = {
  product: {
    id: string;
    handle: string;
    title: string;
    images?: { nodes: { id: string; url: string; altText?: string | null }[] };
    featuredImage?: { id: string; url: string; altText?: string | null } | null;
    metafields?: ShopifyMetafield[] | null;
    variants: { nodes: ProductVariant[] };
    priceRange?: { minVariantPrice: Money };
  };
  paymentSettings?: ShopifyPaymentSettings | null;
  actualPaymentTypes?: string[] | null;
  breadcrumbs: { label: string; href: string }[];
  trustSignals: { label: string; iconSvg: string }[];
};

function moneyToNumber(money: Money | null | undefined): number {
  if (!money?.amount) {
    return 0;
  }
  return Number(money.amount);
}

function formatMoney(money: Money): string {
  return new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: money.currencyCode,
  }).format(moneyToNumber(money));
}

export function ProductDetailView({
  product,
  paymentSettings,
  actualPaymentTypes,
  breadcrumbs,
  trustSignals,
}: ProductDetailViewProps) {
  const variants = product.variants.nodes;
  const [selectedVariantId, setSelectedVariantId] = useState(variants[0]?.id ?? "");
  const [quantity, setQuantity] = useState(1);

  const selectedVariant = variants.find((item) => item.id === selectedVariantId) ?? variants[0];
  const selectedImageId = selectedVariant?.image?.id ?? null;
  const enabledPaymentTypes = buildEnabledPaymentTypes(paymentSettings, actualPaymentTypes);
  const faqItems = getFaqItems(product.metafields);

  if (!selectedVariant) {
    return null;
  }

  return (
    <section className="product-detail-view">
      <div className="product-detail-view__layout">
        <ProductGallery
          images={product.images?.nodes ?? (product.featuredImage ? [product.featuredImage] : [])}
          selectedVariantImageId={selectedImageId}
        />
        <ProductInfo
          breadcrumbs={breadcrumbs}
          title={product.title}
          ratingValue={5}
          reviewCount={0}
          price={moneyToNumber(selectedVariant.price)}
          compareAtPrice={moneyToNumber(selectedVariant.compareAtPrice)}
          currencyCode={selectedVariant.price.currencyCode}
          metafields={product.metafields}
          variants={variants}
          selectedVariantId={selectedVariant.id}
          quantity={quantity}
          onVariantChange={setSelectedVariantId}
          onQuantityChange={setQuantity}
          onAddToCart={() => {
            // Integration point: wire this callback to the storefront cart mutation.
          }}
          onBuyNow={() => {
            // Integration point: wire this callback to direct checkout flow.
          }}
          enabledPaymentTypes={enabledPaymentTypes}
          trustSignals={trustSignals}
        />
      </div>

      <ProductSpecGrid metafields={product.metafields} />

      <BenefitsList metafields={product.metafields} />

      <FaqAccordion items={faqItems} />

      <StickyMobileATC
        variantTitle={selectedVariant.title}
        price={formatMoney(selectedVariant.price)}
        onAddToCart={() => {
          // Integration point: wire this callback to the storefront cart mutation.
        }}
      />
    </section>
  );
}

export type { ProductDetailViewProps };
