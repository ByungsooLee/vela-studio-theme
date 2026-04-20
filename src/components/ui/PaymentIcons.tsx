import "./PaymentIcons.css";

type PaymentIconType =
  | "visa"
  | "mastercard"
  | "amex"
  | "jcb"
  | "discover"
  | "paypal"
  | "apple_pay"
  | "google_pay"
  | "shop_pay";

type PaymentIconsProps = {
  enabledPaymentTypes: string[];
};

const SUPPORTED_ICONS: Record<PaymentIconType, string> = {
  visa: "VISA",
  mastercard: "Mastercard",
  amex: "AmEx",
  jcb: "JCB",
  discover: "Discover",
  paypal: "PayPal",
  apple_pay: "Apple Pay",
  google_pay: "Google Pay",
  shop_pay: "Shop Pay",
};

const PAYMENT_ORDER: PaymentIconType[] = [
  "visa",
  "mastercard",
  "amex",
  "jcb",
  "discover",
  "paypal",
  "apple_pay",
  "google_pay",
  "shop_pay",
];

function normalizeType(value: string): string {
  return value.trim().toLowerCase().replace(/\s+/g, "_");
}

function CardIcon({ label }: { label: string }) {
  return (
    <svg viewBox="0 0 64 24" role="img" aria-label={label}>
      <rect x="1" y="1" width="62" height="22" rx="4" fill="none" stroke="currentColor" />
      <text x="32" y="16" textAnchor="middle" fontSize="9" fontFamily="sans-serif" fill="currentColor">
        {label}
      </text>
    </svg>
  );
}

export function PaymentIcons({ enabledPaymentTypes }: PaymentIconsProps) {
  const normalized = new Set(enabledPaymentTypes.map(normalizeType));
  const activeTypes = PAYMENT_ORDER.filter((type) => normalized.has(type));

  if (!activeTypes.length) {
    return null;
  }

  return (
    <div className="payment-icons" aria-label="Accepted payment methods">
      {activeTypes.map((type) => (
        <span key={type} className="payment-icons__item">
          <CardIcon label={SUPPORTED_ICONS[type]} />
        </span>
      ))}
    </div>
  );
}

export type { PaymentIconsProps, PaymentIconType };
