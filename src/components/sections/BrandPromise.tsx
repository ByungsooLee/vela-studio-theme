import "./BrandPromise.css";

type BrandPromiseProps = {
  headline: string;
  body: string;
};

export function BrandPromise({ headline, body }: BrandPromiseProps) {
  return (
    <section className="brand-promise" aria-label="Brand promise">
      <div className="brand-promise__inner">
        <h2 className="brand-promise__headline">{headline}</h2>
        <p className="brand-promise__body">{body}</p>
      </div>
    </section>
  );
}

export type { BrandPromiseProps };
