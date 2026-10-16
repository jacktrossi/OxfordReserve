import assert from "node:assert/strict";
import { createHmac } from "node:crypto";
import test from "node:test";
import { verifyShopifyWebhook } from "./shopify.ts";

function shopifyHmac(secret: string, rawBody: string): string {
  return createHmac("sha256", secret).update(rawBody, "utf8").digest("base64");
}

test("verifyShopifyWebhook accepts a Shopify HMAC-SHA256 signature", async () => {
  const secret = "shpss_test_secret";
  const rawBody = JSON.stringify({ id: 1, email: "owner@example.com" });
  process.env.SHOPIFY_WEBHOOK_SECRET = secret;

  assert.equal(await verifyShopifyWebhook(rawBody, shopifyHmac(secret, rawBody)), true);
});

test("verifyShopifyWebhook rejects a tampered body", async () => {
  const secret = "shpss_test_secret";
  const rawBody = JSON.stringify({ id: 1 });
  process.env.SHOPIFY_WEBHOOK_SECRET = secret;

  assert.equal(await verifyShopifyWebhook(`${rawBody} `, shopifyHmac(secret, rawBody)), false);
});

test("verifyShopifyWebhook rejects a missing secret or signature", async () => {
  const rawBody = "{}";
  process.env.SHOPIFY_WEBHOOK_SECRET = "";

  assert.equal(await verifyShopifyWebhook(rawBody, shopifyHmac("secret", rawBody)), false);

  process.env.SHOPIFY_WEBHOOK_SECRET = "shpss_test_secret";
  assert.equal(await verifyShopifyWebhook(rawBody, ""), false);
});
