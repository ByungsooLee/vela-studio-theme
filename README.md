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

