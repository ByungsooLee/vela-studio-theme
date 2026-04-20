"use client";

import { useEffect, useMemo, useState } from "react";
import "./ProductGallery.css";

type GalleryImage = {
  id: string;
  url: string;
  altText?: string | null;
};

type ProductGalleryProps = {
  images: GalleryImage[];
  selectedVariantImageId?: string | null;
};

export function ProductGallery({ images, selectedVariantImageId }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [zoomed, setZoomed] = useState(false);

  const variantIndex = useMemo(() => {
    if (!selectedVariantImageId) {
      return -1;
    }
    return images.findIndex((image) => image.id === selectedVariantImageId);
  }, [images, selectedVariantImageId]);

  useEffect(() => {
    if (variantIndex >= 0) {
      setActiveIndex(variantIndex);
    }
  }, [variantIndex]);

  if (!images.length) {
    return null;
  }

  const activeImage = images[Math.min(activeIndex, images.length - 1)];

  return (
    <section className="product-gallery" aria-label="Product gallery">
      <div className="product-gallery__desktop-thumbs" aria-label="Gallery thumbnails">
        {images.map((image, index) => (
          <button
            key={image.id}
            type="button"
            className={`product-gallery__thumb${index === activeIndex ? " is-active" : ""}`}
            onClick={() => setActiveIndex(index)}
            aria-label={`View image ${index + 1}`}
          >
            <img src={image.url} alt={image.altText ?? `Thumbnail ${index + 1}`} />
          </button>
        ))}
      </div>

      <button
        type="button"
        className="product-gallery__main"
        onClick={() => setZoomed(true)}
        aria-label="Open zoom view"
      >
        <img src={activeImage.url} alt={activeImage.altText ?? "Product image"} />
      </button>

      <div className="product-gallery__mobile-dots" aria-label="Image dots">
        {images.map((image, index) => (
          <button
            key={image.id}
            type="button"
            className={`product-gallery__dot${index === activeIndex ? " is-active" : ""}`}
            onClick={() => setActiveIndex(index)}
            aria-label={`Go to image ${index + 1}`}
          />
        ))}
      </div>

      {zoomed ? (
        <div className="product-gallery__zoom" role="dialog" aria-modal="true" aria-label="Zoomed image">
          <button
            type="button"
            className="product-gallery__zoom-close"
            onClick={() => setZoomed(false)}
            aria-label="Close zoom"
          >
            Close
          </button>
          <img src={activeImage.url} alt={activeImage.altText ?? "Zoomed product image"} />
        </div>
      ) : null}
    </section>
  );
}

export type { ProductGalleryProps, GalleryImage };
