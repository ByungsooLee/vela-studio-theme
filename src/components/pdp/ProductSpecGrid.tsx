import { useMemo } from "react";
import "./ProductSpecGrid.css";

type ProductMetafield = {
  key: string;
  value?: string | null;
};

type ProductSpecGridProps = {
  metafields?: ProductMetafield[] | null;
};

const SPEC_KEYS = [
  { key: "materials", label: "Materials" },
  { key: "dimensions", label: "Dimensions" },
  { key: "care_instructions", label: "Care instructions" },
  { key: "scent_notes", label: "Scent notes" },
  { key: "certifications", label: "Certifications" },
] as const;

export function ProductSpecGrid({ metafields }: ProductSpecGridProps) {
  const specs = useMemo(() => {
    const map = new Map((metafields ?? []).map((field) => [field.key, field.value?.trim() ?? ""]));
    return SPEC_KEYS.map((item) => ({
      label: item.label,
      value: map.get(item.key) ?? "",
    })).filter((item) => item.value);
  }, [metafields]);

  if (!specs.length) {
    return null;
  }

  return (
    <dl className="product-spec-grid" aria-label="Product specifications">
      {specs.map((spec) => (
        <div key={spec.label} className="product-spec-grid__row">
          <dt className="product-spec-grid__label">{spec.label}</dt>
          <dd className="product-spec-grid__value">{spec.value}</dd>
        </div>
      ))}
    </dl>
  );
}

export type { ProductSpecGridProps, ProductMetafield };
