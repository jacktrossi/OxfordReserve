import { type NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { createCheckoutSession, SUBSCRIPTION_PLANS } from "@/lib/shopify";

export const runtime = "edge";

export async function POST(request: NextRequest) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json() as {
    planId: string;
    variantId: string;
    restaurantName: string;
    restaurantEmail: string;
    returnUrl: string;
  };

  const { planId, restaurantName, restaurantEmail, returnUrl } = body;

  const plan = SUBSCRIPTION_PLANS.find((p) => p.id === planId);
  if (!plan) {
    return NextResponse.json({ error: "Invalid plan" }, { status: 400 });
  }

  if (!plan.variantId) {
    return NextResponse.json(
      { error: "Shopify variant ID not configured for this plan" },
      { status: 500 }
    );
  }

  try {
    const checkoutUrl = await createCheckoutSession(
      plan.variantId,
      restaurantEmail,
      restaurantName,
      returnUrl
    );
    return NextResponse.json({ checkoutUrl });
  } catch (err) {
    console.error("Shopify checkout error:", err);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
