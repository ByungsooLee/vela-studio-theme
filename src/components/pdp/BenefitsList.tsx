import { useMemo } from "react";
import "./BenefitsList.css";

type ProductMetafield = {
  key: string;
  value?: string | null;
};

type BenefitsListProps = {
  metafields?: ProductMetafield[] | null;
};

function parseList(value: string): string[] {
  const trimmed = value.trim();
  if (!trimmed) {
    return [];
  }

  try {
    const parsed = JSON.parse(trimmed);
    if (Array.isArray(parsed)) {
      return parsed.map((item) => String(item).trim()).filter(Boolean);
    }
  } catch {
    // Fallback for comma/newline-delimited values.
  }

  return trimmed
    .split(/\n|,/)
    .map((item) => item.trim())
    .filter(Boolean);
}

export function BenefitsList({ metafields }: BenefitsListProps) {
  const items = useMemo(() => {
    const map = new Map((metafields ?? []).map((field) => [field.key, field.value ?? ""]));
    const benefits = parseList(map.get("key_benefits") ?? "");
    const details = parseList(map.get("benefit_details") ?? "");
    return [...benefits, ...details];
  }, [metafields]);

  if (!items.length) {
    return null;
  }

  return (
    <section className="benefits-list" aria-label="Key benefits">
      <ul className="benefits-list__grid">
        {items.map((item) => (
          <li key={item} className="benefits-list__item">
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}

export type { BenefitsListProps, ProductMetafield };
