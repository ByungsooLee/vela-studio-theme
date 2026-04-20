export type ShopifyMetafield = {
  key: string;
  value?: string | null;
};

export type ProductReference = {
  id: string;
  title: string;
  handle: string;
  featuredImage?: {
    url: string;
    altText?: string | null;
  } | null;
};

export type ShopifyProductDetail = {
  id: string;
  handle: string;
  title: string;
  metafields?: ShopifyMetafield[] | null;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export function getMetafieldValue(
  metafields: ShopifyMetafield[] | null | undefined,
  key: string
): string | null {
  const value = (metafields ?? []).find((item) => item.key === key)?.value?.trim();
  return value ? value : null;
}

export function getMetafieldList(
  metafields: ShopifyMetafield[] | null | undefined,
  key: string
): string[] {
  const rawValue = getMetafieldValue(metafields, key);
  if (!rawValue) {
    return [];
  }

  try {
    const parsed = JSON.parse(rawValue);
    if (Array.isArray(parsed)) {
      return parsed.map((item) => String(item).trim()).filter(Boolean);
    }
  } catch {
    // fallback to delimited text handling
  }

  return rawValue
    .split(/\n|,/)
    .map((item) => item.trim())
    .filter(Boolean);
}

export function getFaqItems(metafields: ShopifyMetafield[] | null | undefined): FaqItem[] {
  const rawValue = getMetafieldValue(metafields, "faq_items");
  if (!rawValue) {
    return [];
  }

  try {
    const parsed = JSON.parse(rawValue);
    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed
      .map((item) => ({
        question: String(item?.question ?? "").trim(),
        answer: String(item?.answer ?? "").trim(),
      }))
      .filter((item) => item.question && item.answer);
  } catch {
    return [];
  }
}

export type ShopifyPaymentSettings = {
  enabledPresentmentCurrencies?: string[] | null;
  acceptedCardBrands?: string[] | null;
  supportedDigitalWallets?: string[] | null;
};

const CARD_BRAND_MAP: Record<string, string> = {
  visa: "visa",
  mastercard: "mastercard",
  american_express: "amex",
  amex: "amex",
  jcb: "jcb",
  discover: "discover",
};

const WALLET_MAP: Record<string, string> = {
  apple_pay: "apple_pay",
  google_pay: "google_pay",
  shop_pay: "shop_pay",
  paypal: "paypal",
};

export function buildEnabledPaymentTypes(
  paymentSettings: ShopifyPaymentSettings | null | undefined,
  actualPaymentTypes: string[] | null | undefined
): string[] {
  const fromSettings = new Set<string>();

  (paymentSettings?.acceptedCardBrands ?? []).forEach((brand) => {
    const mapped = CARD_BRAND_MAP[brand.toLowerCase()];
    if (mapped) {
      fromSettings.add(mapped);
    }
  });

  (paymentSettings?.supportedDigitalWallets ?? []).forEach((wallet) => {
    const mapped = WALLET_MAP[wallet.toLowerCase()];
    if (mapped) {
      fromSettings.add(mapped);
    }
  });

  const actual = new Set((actualPaymentTypes ?? []).map((type) => type.trim().toLowerCase()));
  if (!actual.size) {
    return Array.from(fromSettings);
  }

  return Array.from(fromSettings).filter((type) => actual.has(type));
}
