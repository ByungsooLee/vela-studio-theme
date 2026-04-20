import "./LifeUpgradeCategories.css";

type LifeUpgradeCategory = {
  label: string;
  image: {
    src: string;
    alt: string;
  };
  collectionHandle: string;
};

type LifeUpgradeCategoriesProps = {
  categories: LifeUpgradeCategory[];
};

export function LifeUpgradeCategories({ categories }: LifeUpgradeCategoriesProps) {
  if (!categories.length) {
    return null;
  }

  return (
    <section className="life-upgrade-categories" aria-label="Life upgrade categories">
      <div className="life-upgrade-categories__track">
        {categories.map((category) => (
          <a
            key={category.collectionHandle}
            className="life-upgrade-categories__card"
            href={`/collections/${category.collectionHandle}`}
          >
            <div className="life-upgrade-categories__image-wrap">
              <img
                className="life-upgrade-categories__image"
                src={category.image.src}
                alt={category.image.alt}
              />
            </div>
            <span className="life-upgrade-categories__label">{category.label}</span>
          </a>
        ))}
      </div>
    </section>
  );
}

export type { LifeUpgradeCategoriesProps, LifeUpgradeCategory };
