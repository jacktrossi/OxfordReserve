import type { ShopifyPlan, SubscriptionStatus } from "./types";

const STORE_DOMAIN = process.env.SHOPIFY_STORE_DOMAIN || "";
const STOREFRONT_TOKEN = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN || "";
const ADMIN_TOKEN = process.env.SHOPIFY_ADMIN_ACCESS_TOKEN || "";

export const SUBSCRIPTION_PLANS: ShopifyPlan[] = [
  {
    id: "starter",
    name: "Starter",
    price: 49,
    variantId: process.env.NEXT_PUBLIC_SHOPIFY_PLAN_STARTER_VARIANT_ID || "",
    features: [
      "Listed on OxfordReserve",
      "Up to 50 reservations/month",
      "Basic analytics",
      "Email support",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    price: 99,
    variantId: process.env.NEXT_PUBLIC_SHOPIFY_PLAN_PRO_VARIANT_ID || "",
    highlighted: true,
    features: [
      "Everything in Starter",
      "Unlimited reservations",
      "Priority placement",
      "No-show protection",
      "Advanced analytics",
      "Phone support",
    ],
  },
  {
    id: "premium",
    name: "Premium",
    price: 149,
    variantId: process.env.NEXT_PUBLIC_SHOPIFY_PLAN_PREMIUM_VARIANT_ID || "",
    features: [
      "Everything in Pro",
      "Featured homepage placement",
      "Custom promotional campaigns",
      "Dedicated account manager",
      "Tock integration setup",
      "White-glove onboarding",
    ],
  },
];

async function storefrontFetch<T>(query: string, variables?: Record<string, unknown>): Promise<T> {
  const res = await fetch(`https://${STORE_DOMAIN}/api/2024-01/graphql.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": STOREFRONT_TOKEN,
    },
    body: JSON.stringify({ query, variables }),
  });

  if (!res.ok) {
    throw new Error(`Shopify Storefront API error: ${res.status}`);
  }

  const json = await res.json() as { data: T };
  return json.data;
}

async function adminFetch<T>(path: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(`https://${STORE_DOMAIN}/admin/api/2024-01/${path}`, {
    ...options,
    headers: {
      "X-Shopify-Access-Token": ADMIN_TOKEN,
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  if (!res.ok) {
    throw new Error(`Shopify Admin API error: ${res.status}`);
  }

  return res.json() as Promise<T>;
}

export async function createCheckoutSession(
  variantId: string,
  restaurantEmail: string,
  restaurantName: string,
  returnUrl: string
): Promise<string> {
  const query = `
    mutation cartCreate($input: CartInput!) {
      cartCreate(input: $input) {
        cart {
          checkoutUrl
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

  const data = await storefrontFetch<{
    cartCreate: { cart: { checkoutUrl: string }; userErrors: { field: string; message: string }[] };
  }>(query, {
    input: {
      lines: [{ merchandiseId: `gid://shopify/ProductVariant/${variantId}`, quantity: 1 }],
      buyerIdentity: { email: restaurantEmail },
      attributes: [
        { key: "restaurant_name", value: restaurantName },
        { key: "return_url", value: returnUrl },
      ],
    },
  });

  if (data.cartCreate.userErrors.length > 0) {
    throw new Error(data.cartCreate.userErrors[0].message);
  }

  return data.cartCreate.cart.checkoutUrl;
}

export async function getSubscriptionStatus(
  restaurantId: string
): Promise<SubscriptionStatus> {
  if (!ADMIN_TOKEN) {
    return { active: false };
  }

  try {
    const data = await adminFetch<{ orders: { edges: { node: { id: string; tags: string[]; created_at: string } }[] } }>(
      `orders.json?tag=restaurant_${restaurantId}&status=any&limit=1`
    );

    const order = data.orders?.edges?.[0]?.node;
    if (!order) return { active: false };

    const planTag = order.tags.find((t: string) => t.startsWith("plan_"));
    const planId = planTag?.replace("plan_", "");
    const plan = SUBSCRIPTION_PLANS.find((p) => p.id === planId);

    return {
      active: true,
      planId,
      planName: plan?.name,
      shopifyOrderId: order.id,
    };
  } catch {
    return { active: false };
  }
}

export function verifyShopifyWebhook(
  rawBody: string,
  hmacHeader: string
): boolean {
  const crypto = require("crypto");
  const webhookSecret = process.env.SHOPIFY_WEBHOOK_SECRET || "";
  const hash = crypto
    .createHmac("sha256", webhookSecret)
    .update(rawBody, "utf8")
    .digest("base64");
  return hash === hmacHeader;
}
