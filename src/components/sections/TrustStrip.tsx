import "./TrustStrip.css";

type TrustStripItem = {
  iconSvg: string;
  headline: string;
  subtext: string;
};

type TrustStripProps = {
  items: TrustStripItem[];
};

export function TrustStrip({ items }: TrustStripProps) {
  if (!items.length) {
    return null;
  }

  return (
    <section className="trust-strip" aria-label="Trust signals">
      <div className="trust-strip__grid">
        {items.map((item) => (
          <div key={item.headline} className="trust-strip__item">
            <span
              className="trust-strip__icon"
              aria-hidden="true"
              dangerouslySetInnerHTML={{ __html: item.iconSvg }}
            />
            <h3 className="trust-strip__headline">{item.headline}</h3>
            <p className="trust-strip__subtext">{item.subtext}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export type { TrustStripProps, TrustStripItem };
