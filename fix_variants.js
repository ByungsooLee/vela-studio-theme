const axios = require("axios");

const SHOP_DOMAIN = "pawluxlab.myshopify.com";
const API_VERSION = "2024-01";
const PRODUCT_HANDLE =
  "puppy-go-out-portable-shoulder-handbag-dog-bag-pet-cat-chihuahua-yorkshire-dog-supplies-suitable-for-small-dogs-dog-carrier";

const ACCESS_TOKEN = process.env.SHOPIFY_ACCESS_TOKEN;

if (!ACCESS_TOKEN) {
  console.error("Error: 環境変数 SHOPIFY_ACCESS_TOKEN が設定されていません。");
  process.exit(1);
}

const client = axios.create({
  baseURL: `https://${SHOP_DOMAIN}/admin/api/${API_VERSION}`,
  headers: {
    "X-Shopify-Access-Token": ACCESS_TOKEN,
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  timeout: 30000,
});

function escapeRegExp(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function transformVariantTitle(originalTitle) {
  let title = originalTitle;

  const mappings = [
    ["bag strap mat", "バッグ＋ストラップ＋マット"],
    ["bag and mat", "バッグ＋マット"],
    ["bag pillow", "バッグ＋クッション"],
    ["strap pillow", "ストラップ＋クッション"],
    ["pillow suit", "クッションセット"],
    ["beige", "ベージュ"],
    ["gray", "グレー"],
  ];

  for (const [from, to] of mappings) {
    const regex = new RegExp(escapeRegExp(from), "gi");
    title = title.replace(regex, to);
  }

  title = title.replace(/\s*\/\s*S\b/gi, "／Sサイズ");
  title = title.replace(/\s*\/\s*M\b/gi, "／Mサイズ");

  // 「China Mainland」をすべて削除
  title = title.replace(/\s*\/?\s*China Mainland\b/gi, "");

  // 余分な区切りや空白を調整
  title = title.replace(/\s{2,}/g, " ").trim();
  title = title.replace(/^\/+\s*/, "").replace(/\s*\/+$/, "");

  return title;
}

async function fetchProductByHandle(handle) {
  const response = await client.get("/products.json", {
    params: { handle, limit: 1 },
  });

  const products = response.data?.products || [];
  return products[0] || null;
}

async function updateVariantTitle(variantId, newTitle) {
  return client.put(`/variants/${variantId}.json`, {
    variant: {
      id: variantId,
      title: newTitle,
    },
  });
}

async function main() {
  console.log(`対象商品を取得中... handle=${PRODUCT_HANDLE}`);
  const product = await fetchProductByHandle(PRODUCT_HANDLE);

  if (!product) {
    console.error("対象商品が見つかりませんでした。handle を確認してください。");
    process.exit(1);
  }

  const variants = product.variants || [];
  if (variants.length === 0) {
    console.log("バリエーションが存在しません。処理を終了します。");
    return;
  }

  console.log(`商品: ${product.title}`);
  console.log(`バリエーション数: ${variants.length}`);

  let successCount = 0;
  let failCount = 0;
  let skipCount = 0;

  for (const variant of variants) {
    const oldTitle = variant.title || "";
    const newTitle = transformVariantTitle(oldTitle);

    if (oldTitle === newTitle) {
      console.log(`- SKIP [${variant.id}] 変更なし: "${oldTitle}"`);
      skipCount += 1;
      continue;
    }

    try {
      await updateVariantTitle(variant.id, newTitle);
      console.log(`- OK   [${variant.id}] "${oldTitle}" -> "${newTitle}"`);
      successCount += 1;
    } catch (error) {
      const message =
        error.response?.data
          ? JSON.stringify(error.response.data)
          : error.message;
      console.error(`- FAIL [${variant.id}] "${oldTitle}" -> "${newTitle}"`);
      console.error(`       ${message}`);
      failCount += 1;
    }
  }

  console.log("\n=== 処理結果 ===");
  console.log(`成功: ${successCount}`);
  console.log(`失敗: ${failCount}`);
  console.log(`スキップ: ${skipCount}`);
}

main().catch((error) => {
  const message = error.response?.data
    ? JSON.stringify(error.response.data)
    : error.message;
  console.error("実行中にエラーが発生しました:", message);
  process.exit(1);
});
