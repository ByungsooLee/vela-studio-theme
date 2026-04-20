export const PRODUCT_DETAIL_FIELDS_FRAGMENT = `
fragment ProductDetailFields on Product {
  metafields(
    identifiers: [
      { namespace: "product_details", key: "short_value_prop" }
      { namespace: "product_details", key: "key_benefits" }
      { namespace: "product_details", key: "benefit_details" }
      { namespace: "product_details", key: "materials" }
      { namespace: "product_details", key: "dimensions" }
      { namespace: "product_details", key: "care_instructions" }
      { namespace: "product_details", key: "faq_items" }
      { namespace: "product_details", key: "scent_notes" }
      { namespace: "product_details", key: "certifications" }
      { namespace: "product_details", key: "shipping_note" }
      { namespace: "product_details", key: "complementary_products" }
    ]
  ) {
    key
    value
    references(first: 10) {
      nodes {
        ... on Product {
          id
          title
          handle
          featuredImage {
            url
            altText
          }
        }
      }
    }
  }
}
`;

export const PRODUCT_DETAIL_QUERY = `
${PRODUCT_DETAIL_FIELDS_FRAGMENT}

query ProductDetailQuery($handle: String!) {
  product(handle: $handle) {
    id
    handle
    title
    description
    featuredImage {
      id
      url
      altText
    }
    images(first: 10) {
      nodes {
        id
        url
        altText
      }
    }
    tags
    variants(first: 20) {
      nodes {
        id
        title
        availableForSale
        image {
          id
          url
          altText
        }
        price {
          amount
          currencyCode
        }
        compareAtPrice {
          amount
          currencyCode
        }
      }
    }
    priceRange {
      minVariantPrice {
        amount
        currencyCode
      }
    }
    ...ProductDetailFields
  }
  shop {
    paymentSettings {
      enabledPresentmentCurrencies
      acceptedCardBrands
      supportedDigitalWallets
    }
  }
}
`;
