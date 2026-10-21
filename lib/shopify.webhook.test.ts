import assert from "node:assert/strict";
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

async function sign(body: string, secret: string): Promise<string> {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const mac = new Uint8Array(
    await crypto.subtle.sign("HMAC", key, encoder.encode(body))
  );
  let binary = "";
  for (const byte of mac) {
    binary += String.fromCharCode(byte);
  }
  return btoa(binary);
}

test("rejects an empty secret", async () => {
  const body = '{"id":1}';
  const forged = await sign(body, "");
  process.env.SHOPIFY_WEBHOOK_SECRET = "";

  assert.equal(await verifyShopifyWebhook(body, forged), false);
});

test("rejects an undefined secret", async () => {
  const body = '{"id":1}';
  const forged = await sign(body, "");
  delete process.env.SHOPIFY_WEBHOOK_SECRET;

  assert.equal(await verifyShopifyWebhook(body, forged), false);
});

test("rejects a bad signature", async () => {
  const body = '{"id":1}';
  process.env.SHOPIFY_WEBHOOK_SECRET = "shpss_test_secret";
  const hmac = await sign(body, "different-secret");

  assert.equal(await verifyShopifyWebhook(body, hmac), false);
});

test("accepts a valid signature", async () => {
  const secret = "shpss_test_secret";
  const body = '{"id":1}';
  process.env.SHOPIFY_WEBHOOK_SECRET = secret;
  const hmac = await sign(body, secret);

  assert.equal(await verifyShopifyWebhook(body, hmac), true);
});
