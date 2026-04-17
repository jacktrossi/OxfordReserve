"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useUser, SignInButton } from "@clerk/nextjs";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SUBSCRIPTION_PLANS } from "@/lib/shopify";

function SubscribeForm() {
  const searchParams = useSearchParams();
  const { isSignedIn, user } = useUser();
  const planId = searchParams.get("plan") ?? "pro";

  const plan = SUBSCRIPTION_PLANS.find((p) => p.id === planId) ?? SUBSCRIPTION_PLANS[1];

  const [restaurantName, setRestaurantName] = useState("");
  const [restaurantEmail, setRestaurantEmail] = useState(
    user?.primaryEmailAddress?.emailAddress ?? ""
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (user?.primaryEmailAddress?.emailAddress) {
      setRestaurantEmail(user.primaryEmailAddress.emailAddress);
    }
  }, [user]);

  async function handleSubscribe() {
    if (!restaurantName || !restaurantEmail) {
      setError("Please fill in all fields.");
      return;
    }
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/shopify/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          planId: plan.id,
          variantId: plan.variantId,
          restaurantName,
          restaurantEmail,
          returnUrl: `${window.location.origin}/for-restaurants/success`,
        }),
      });

      const data = await res.json() as { checkoutUrl?: string; error?: string };

      if (!res.ok || !data.checkoutUrl) {
        throw new Error(data.error ?? "Failed to create checkout session");
      }

      window.location.href = data.checkoutUrl;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-semibold tracking-tight">Get started</h1>
          <p className="text-muted-foreground mt-2">
            You&apos;re one step away from reaching more Oxford diners
          </p>
        </div>

        {/* Plan summary */}
        <div className="rounded-2xl border border-border bg-secondary p-5 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Selected plan</p>
              <p className="font-semibold text-lg">{plan.name}</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-semibold">${plan.price}</p>
              <p className="text-xs text-muted-foreground">/month</p>
            </div>
          </div>
          <ul className="mt-4 space-y-1.5">
            {plan.features.slice(0, 3).map((f) => (
              <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                <Check className="h-3.5 w-3.5 text-foreground shrink-0" />
                {f}
              </li>
            ))}
          </ul>
        </div>

        {!isSignedIn ? (
          <div className="text-center space-y-4">
            <p className="text-muted-foreground text-sm">
              Create an account to subscribe
            </p>
            <SignInButton mode="modal">
              <Button size="lg" className="w-full">
                Sign up to continue <ArrowRight className="h-4 w-4" />
              </Button>
            </SignInButton>
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <Label htmlFor="name" className="text-xs text-muted-foreground mb-1.5 block">
                Restaurant name *
              </Label>
              <Input
                id="name"
                value={restaurantName}
                onChange={(e) => setRestaurantName(e.target.value)}
                placeholder="City Grocery"
              />
            </div>
            <div>
              <Label htmlFor="email" className="text-xs text-muted-foreground mb-1.5 block">
                Billing email *
              </Label>
              <Input
                id="email"
                type="email"
                value={restaurantEmail}
                onChange={(e) => setRestaurantEmail(e.target.value)}
                placeholder="owner@myrestaurant.com"
              />
            </div>

            {error && <p className="text-sm text-destructive">{error}</p>}

            <Button
              onClick={handleSubscribe}
              disabled={loading}
              className="w-full"
              size="lg"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Redirecting to checkout…
                </>
              ) : (
                <>
                  Continue to payment <ArrowRight className="h-4 w-4" />
                </>
              )}
            </Button>

            <p className="text-xs text-center text-muted-foreground">
              You&apos;ll be redirected to our secure Shopify checkout.
              Cancel anytime — no contracts.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function SubscribePage() {
  return (
    <Suspense>
      <SubscribeForm />
    </Suspense>
  );
}
