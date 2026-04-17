import { type NextRequest, NextResponse } from "next/server";
import { verifyShopifyWebhook } from "@/lib/shopify";

export const runtime = "edge";

export async function POST(request: NextRequest) {
  const rawBody = await request.text();
  const hmac = request.headers.get("x-shopify-hmac-sha256") ?? "";
  const topic = request.headers.get("x-shopify-topic") ?? "";

  if (!verifyShopifyWebhook(rawBody, hmac)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const payload = JSON.parse(rawBody);

  switch (topic) {
    case "orders/paid": {
      const { id: orderId, email, tags, line_items } = payload as {
        id: string;
        email: string;
        tags: string;
        line_items: { title: string }[];
      };

      const restaurantName = tags.split(",")
        .find((t: string) => t.trim().startsWith("restaurant_"))
        ?.replace("restaurant_", "")
        .trim();

      console.log(`New subscription: ${restaurantName} (${email}) - Order ${orderId}`);
      // TODO: Store in Cloudflare KV, send welcome email
      break;
    }

    case "orders/cancelled": {
      const { id: orderId, email } = payload as { id: string; email: string };
      console.log(`Subscription cancelled: ${email} - Order ${orderId}`);
      // TODO: Update restaurant status in Cloudflare KV
      break;
    }

    case "subscription_contracts/create":
    case "subscription_contracts/update": {
      console.log("Subscription contract event:", topic, payload);
      break;
    }
  }

  return NextResponse.json({ received: true });
}
