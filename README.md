# VELA STUDIO Theme

Shopify Online Store 2.0 theme for VELA STUDIO.

All commands below are intended to be run from the repository root:

```bash
cd "/Users/byungsoolee/Desktop/vela-studio-theme"
```

## Development

Start a local theme preview:

```bash
shopify theme dev
```

Run a theme check:

```bash
shopify theme check --path .
```

## Environment Variables

This repo expects Shopify credentials in `.env`.

Typical variables used by local commands and deploy scripts:

- `SHOPIFY_STORE`
- `SHOPIFY_CLI_THEME_TOKEN`
- `SHOPIFY_THEME_ID_STAGING`
- `SHOPIFY_THEME_ID_PRODUCTION`
- `SHOPIFY_ALLOW_LIVE_PRODUCTION`

Load the variables into your current shell:

```bash
set -a
source .env
set +a
```

## Push To Staging

Push the current theme to the staging theme ID from `.env`:

```bash
set -a
source .env
set +a

shopify theme push \
  --store "$SHOPIFY_STORE" \
  --password "$SHOPIFY_CLI_THEME_TOKEN" \
  --theme "$SHOPIFY_THEME_ID_STAGING" \
  --path . \
  --nodelete
```

## Preview Staging

After a successful push, open the staging preview:

```bash
set -a
source .env
set +a

shopify theme open \
  --store "$SHOPIFY_STORE" \
  --theme "$SHOPIFY_THEME_ID_STAGING"
```

## Deploy To Production

Production deploy is handled through GitHub Actions:

```bash
gh workflow run "Deploy Shopify Theme" \
  -f target=production \
  -f confirm_production=true
```

Watch the workflow:

```bash
gh run list --workflow "Deploy Shopify Theme" --limit 3
gh run watch
```

## Product Page Scent Switching

The scent switcher on product pages is implemented as linked products, not native Shopify variants.

Required product metafields:

- `custom.linked_products`
  - type: `list.product_reference`
- `custom.fragrance_name`
  - type: `single_line_text_field`
  - optional, used as the chip label

Behavior:

- Add all related scent products to `custom.linked_products`
- The product page renders those linked products as pill-style options
- Clicking a pill opens the selected product URL
- Native Shopify variants on the same product still work normally

## Product Import: Return Period Field

The perfume product page supports a per-product return period text.

Metafield used by the theme:

- `custom.return_period`
  - type: `single_line_text_field`
  - example: `商品到着後7日以内にご連絡ください。`

Theme behavior:

- If `custom.return_period` exists on the product, that text is displayed.
- If it is empty, the section default `return_period_text` is used.

Instructions for the product registration/import repository:

1. Add an import column named `return_period`.
2. Map `return_period` to Shopify metafield:
   - namespace: `custom`
   - key: `return_period`
   - type: `single_line_text_field`
3. During import, write this metafield for each product that needs custom return period copy.
4. If your import pipeline already sends metafields JSON, include:

```json
{
  "namespace": "custom",
  "key": "return_period",
  "type": "single_line_text_field",
  "value": "商品到着後7日以内にご連絡ください。"
}
```

