# VELA STUDIO テーマ

VELA STUDIO 向けの Shopify Online Store 2.0 テーマです。

以下のコマンドはすべてリポジトリのルートで実行します。

```bash
cd "/Users/byungsoolee/Desktop/vela-studio-theme"
```

## 開発

ローカルのテーマプレビューを起動:

```bash
shopify theme dev
```

テーマチェックを実行:

```bash
shopify theme check --path .
```

## 環境変数

このリポジトリは `.env` に Shopify 認証情報がある前提です。

ローカルコマンドやデプロイスクリプトで一般的に使う変数:

- `SHOPIFY_STORE`
- `SHOPIFY_CLI_THEME_TOKEN`
- `SHOPIFY_THEME_ID_STAGING`
- `SHOPIFY_THEME_ID_PRODUCTION`
- `SHOPIFY_ALLOW_LIVE_PRODUCTION`

現在のシェルに環境変数を読み込む:

```bash
set -a
source .env
set +a
```

## ステージングへ反映

`.env` のステージングテーマIDへ現在のテーマを反映:

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

## ステージングをプレビュー

反映が成功したら、ステージングプレビューを開く:

```bash
set -a
source .env
set +a

shopify theme open \
  --store "$SHOPIFY_STORE" \
  --theme "$SHOPIFY_THEME_ID_STAGING"
```

## 本番デプロイ

本番デプロイは GitHub Actions で実行:

```bash
gh workflow run "Deploy Shopify Theme" \
  -f target=production \
  -f confirm_production=true
```

ワークフローを確認:

```bash
gh run list --workflow "Deploy Shopify Theme" --limit 3
gh run watch
```

