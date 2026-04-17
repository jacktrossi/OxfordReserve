import Link from "next/link";
import { Check, ArrowRight, TrendingUp, Shield, Zap, BarChart3, Star, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SUBSCRIPTION_PLANS } from "@/lib/shopify";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "For Restaurants — Join OxfordReserve",
  description:
    "Get your Oxford restaurant on OxfordReserve. Reach thousands of diners with commission-free reservations.",
};

const BENEFITS = [
  {
    icon: Zap,
    title: "Zero commission per cover",
    description:
      "Unlike OpenTable's $1–4 per diner fee, we charge a flat monthly rate. Your revenue stays yours.",
  },
  {
    icon: Shield,
    title: "No-show protection",
    description:
      "Credit card holds and automated reminders dramatically reduce no-shows on Pro and Premium plans.",
  },
  {
    icon: BarChart3,
    title: "Real-time analytics",
    description:
      "Understand your diners: peak times, party sizes, repeat customers, and revenue trends.",
  },
  {
    icon: TrendingUp,
    title: "Tock-powered bookings",
    description:
      "Built on Tock's industry-leading reservation infrastructure — the platform trusted by the world's top restaurants.",
  },
  {
    icon: Users,
    title: "Oxford-focused audience",
    description:
      "Reach locals, Ole Miss visitors, and tourists actively looking to dine in Oxford — not a national platform where you get lost.",
  },
  {
    icon: Star,
    title: "Priority placement",
    description:
      "Pro and Premium restaurants are featured prominently on the homepage and in search results.",
  },
];

const TESTIMONIAL = {
  quote:
    "OxfordReserve filled 40% of our seats on what used to be our slowest Tuesday nights. The analytics alone are worth the subscription.",
  author: "Chef Marcus W.",
  restaurant: "A Local Oxford Restaurant",
};

export default function ForRestaurantsPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="px-4 py-24 text-center sm:px-6 sm:py-32">
        <div className="mx-auto max-w-3xl animate-fade-in">
          <p className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-border bg-secondary px-3 py-1 text-xs font-medium text-muted-foreground">
            For restaurant owners
          </p>
          <h1 className="text-balance text-5xl font-semibold tracking-tight sm:text-6xl">
            Grow your Oxford
            <br />
            <span className="text-muted-foreground font-light">restaurant</span>
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-xl mx-auto text-balance">
            Join Oxford&apos;s only dedicated reservation platform. Flat monthly pricing,
            no per-cover commissions, powered by Tock.
          </p>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Button asChild size="xl">
              <Link href="#plans">
                View plans <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="ghost" size="xl">
              <Link href="mailto:hello@oxfordreserve.com">Talk to us first</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="px-4 py-16 sm:px-6 bg-secondary/30">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-semibold tracking-tight">Why OxfordReserve</h2>
            <p className="text-muted-foreground mt-2">
              Built specifically for Oxford — not retrofitted from a national platform
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {BENEFITS.map((b) => (
              <div key={b.title} className="rounded-2xl bg-background border border-border p-5">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-secondary mb-3">
                  <b.icon className="h-4.5 w-4.5 h-5 w-5 text-foreground" />
                </div>
                <h3 className="font-semibold mb-1.5">{b.title}</h3>
                <p className="text-sm text-muted-foreground">{b.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison vs OpenTable */}
      <section className="px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl font-semibold tracking-tight text-center mb-10">
            Stop paying per cover
          </h2>
          <div className="overflow-hidden rounded-2xl border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-secondary">
                  <th className="text-left p-4 font-semibold">Feature</th>
                  <th className="text-center p-4 font-semibold">OxfordReserve</th>
                  <th className="text-center p-4 font-medium text-muted-foreground">OpenTable</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {[
                  ["Pricing model", "Flat monthly", "$449+/mo + per cover"],
                  ["Per-cover fee", "$0", "$1–4 per diner"],
                  ["Local Oxford focus", "✓", "✗"],
                  ["Tock integration", "✓", "✗"],
                  ["No-show protection", "✓ (Pro+)", "✓"],
                  ["Analytics", "✓", "✓"],
                  ["Contract", "Month-to-month", "Annual"],
                ].map(([feature, ours, theirs]) => (
                  <tr key={feature as string}>
                    <td className="p-4 text-muted-foreground">{feature}</td>
                    <td className="p-4 text-center font-medium text-foreground">{ours}</td>
                    <td className="p-4 text-center text-muted-foreground">{theirs}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-muted-foreground text-center mt-3">
            OpenTable pricing estimates based on publicly available information.
          </p>
        </div>
      </section>

      {/* Pricing */}
      <section id="plans" className="px-4 py-16 sm:px-6 bg-secondary/30">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-semibold tracking-tight">Simple, flat-rate pricing</h2>
            <p className="text-muted-foreground mt-2">
              Month-to-month. No contracts. No surprise fees.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {SUBSCRIPTION_PLANS.map((plan) => (
              <div
                key={plan.id}
                className={`relative rounded-2xl border p-6 ${
                  plan.highlighted
                    ? "border-foreground bg-foreground text-background shadow-xl"
                    : "border-border bg-background"
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="rounded-full bg-foreground border border-background px-3 py-0.5 text-xs font-medium text-background shadow">
                      Most popular
                    </span>
                  </div>
                )}
                <h3 className="font-semibold text-lg">{plan.name}</h3>
                <div className="mt-3 mb-5">
                  <span className="text-4xl font-semibold">${plan.price}</span>
                  <span className={`text-sm ml-1 ${plan.highlighted ? "text-background/60" : "text-muted-foreground"}`}>
                    /month
                  </span>
                </div>
                <ul className="space-y-2.5 mb-6">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm">
                      <Check className={`h-4 w-4 shrink-0 mt-0.5 ${plan.highlighted ? "text-background" : "text-foreground"}`} />
                      <span className={plan.highlighted ? "text-background/90" : "text-muted-foreground"}>{f}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  asChild
                  variant={plan.highlighted ? "secondary" : "outline"}
                  className="w-full"
                >
                  <Link href={`/for-restaurants/subscribe?plan=${plan.id}`}>
                    Get started
                  </Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <blockquote className="text-2xl font-light tracking-tight text-balance">
            &ldquo;{TESTIMONIAL.quote}&rdquo;
          </blockquote>
          <div className="mt-6">
            <p className="font-semibold">{TESTIMONIAL.author}</p>
            <p className="text-sm text-muted-foreground">{TESTIMONIAL.restaurant}</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 py-16 sm:px-6 bg-foreground text-background">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight">Ready to fill more tables?</h2>
          <p className="mt-3 text-background/70">
            Get listed on OxfordReserve today. Setup takes less than 10 minutes.
          </p>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Button asChild size="xl" variant="secondary">
              <Link href="#plans">
                Choose a plan <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="ghost" size="xl" className="text-background hover:text-background hover:bg-background/10">
              <Link href="mailto:hello@oxfordreserve.com">Contact us</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
