import assert from "node:assert/strict";
import { createHmac } from "node:crypto";
import { afterEach, test } from "node:test";
import { verifyShopifyWebhook } from "./shopify.ts";

const originalSecret = process.env.SHOPIFY_WEBHOOK_SECRET;

afterEach(() => {
  if (originalSecret === undefined) {
    delete process.env.SHOPIFY_WEBHOOK_SECRET;
  } else {
    process.env.SHOPIFY_WEBHOOK_SECRET = originalSecret;
  }
});

function sign(body: string, secret: string): string {
  return createHmac("sha256", secret).update(body, "utf8").digest("base64");
}

test("rejects an empty secret", async () => {
  const body = '{"id":1}';
  const forged = sign(body, "");
  process.env.SHOPIFY_WEBHOOK_SECRET = "";

  assert.equal(await verifyShopifyWebhook(body, forged), false);
});

test("rejects an undefined secret", async () => {
  const body = '{"id":1}';
  const forged = sign(body, "");
  delete process.env.SHOPIFY_WEBHOOK_SECRET;

  assert.equal(await verifyShopifyWebhook(body, forged), false);
});

test("rejects a bad signature", async () => {
  const body = '{"id":1}';
  process.env.SHOPIFY_WEBHOOK_SECRET = "shpss_test_secret";
  const hmac = sign(body, "different-secret");

  assert.equal(await verifyShopifyWebhook(body, hmac), false);
});

test("accepts a valid signature", async () => {
  const secret = "shpss_test_secret";
  const body = '{"id":1}';
  process.env.SHOPIFY_WEBHOOK_SECRET = secret;
  const hmac = sign(body, secret);

  assert.equal(await verifyShopifyWebhook(body, hmac), true);
});
