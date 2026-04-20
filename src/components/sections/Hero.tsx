import "./Hero.css";

type HeroAction = {
  label: string;
  href: string;
};

type HeroImage = {
  src: string;
  alt: string;
};

type HeroProps = {
  headline: string;
  supportingCopy: string;
  primaryCta: HeroAction;
  secondaryCta?: HeroAction;
  image: HeroImage;
};

export function Hero({
  headline,
  supportingCopy,
  primaryCta,
  secondaryCta,
  image,
}: HeroProps) {
  return (
    <section className="hero" data-hero="true" aria-label="Hero section">
      <div className="hero__media">
        <img className="hero__image" src={image.src} alt={image.alt} />
      </div>
      <div className="hero__content">
        <h1 className="hero__headline">{headline}</h1>
        <p className="hero__copy">{supportingCopy}</p>
        <div className="hero__actions">
          <a className="hero__cta hero__cta--primary" href={primaryCta.href}>
            {primaryCta.label}
          </a>
          {secondaryCta ? (
            <a className="hero__cta hero__cta--secondary" href={secondaryCta.href}>
              {secondaryCta.label}
            </a>
          ) : null}
        </div>
      </div>
    </section>
  );
}

export type { HeroProps, HeroAction, HeroImage };
