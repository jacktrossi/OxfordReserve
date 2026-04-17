import Link from "next/link";
import { ArrowRight, MapPin, Clock, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RestaurantCard } from "@/components/restaurant-card";
import { getFeaturedRestaurants, OXFORD_RESTAURANTS } from "@/lib/restaurants";

export default function HomePage() {
  const featured = getFeaturedRestaurants();
  const allRestaurants = OXFORD_RESTAURANTS.slice(0, 4);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative px-4 pb-16 pt-24 text-center sm:px-6 sm:pt-32">
        <div className="mx-auto max-w-3xl animate-fade-in">
          <p className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-border bg-secondary px-3 py-1 text-xs font-medium text-muted-foreground">
            <MapPin className="h-3 w-3" />
            Oxford, Mississippi
          </p>
          <h1 className="text-balance text-5xl font-semibold tracking-tight text-foreground sm:text-6xl lg:text-7xl">
            Dine well in
            <br />
            <span className="text-muted-foreground font-light">the Square City</span>
          </h1>
          <p className="mt-6 text-lg text-muted-foreground text-balance max-w-xl mx-auto">
            Reserve tables at Oxford&apos;s best restaurants. Fast, simple, no-hassle booking powered by Tock.
          </p>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Button asChild size="xl">
              <Link href="/restaurants">
                Find a table <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="ghost" size="xl">
              <Link href="/for-restaurants">List your restaurant</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured */}
      <section className="px-4 py-12 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="flex items-end justify-between mb-6">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">Featured restaurants</h2>
              <p className="text-sm text-muted-foreground mt-1">Hand-picked Oxford dining experiences</p>
            </div>
            <Link
              href="/restaurants"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
            >
              See all <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((restaurant) => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} variant="featured" />
            ))}
          </div>
        </div>
      </section>

      {/* All restaurants list */}
      <section className="px-4 py-12 sm:px-6">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-2xl font-semibold tracking-tight mb-6">All Oxford restaurants</h2>
          <div>
            {allRestaurants.map((restaurant) => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))}
          </div>
          <div className="mt-6 text-center">
            <Button asChild variant="outline">
              <Link href="/restaurants">
                View all {OXFORD_RESTAURANTS.length} restaurants
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="px-4 py-16 sm:px-6 bg-secondary/50">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-semibold tracking-tight">How it works</h2>
            <p className="text-muted-foreground mt-2">Reservations in under 60 seconds</p>
          </div>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            {[
              {
                icon: MapPin,
                step: "01",
                title: "Browse",
                description: "Explore Oxford's best restaurants, filtered by cuisine, price, and neighborhood.",
              },
              {
                icon: Clock,
                step: "02",
                title: "Pick a time",
                description: "See real-time availability and choose the perfect date and time slot.",
              },
              {
                icon: Shield,
                step: "03",
                title: "Book instantly",
                description: "Confirm your reservation in one tap. Get email confirmation immediately.",
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary mb-4">
                  <item.icon className="h-5 w-5 text-primary-foreground" />
                </div>
                <p className="text-xs font-medium text-muted-foreground mb-1">{item.step}</p>
                <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA for restaurants */}
      <section className="px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight">Own a restaurant in Oxford?</h2>
          <p className="mt-3 text-muted-foreground">
            Join OxfordReserve and connect with thousands of hungry diners.
            Plans start at $49/month — no commissions, no surprises.
          </p>
          <Button asChild size="lg" className="mt-6">
            <Link href="/for-restaurants">
              Get started for free <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border px-4 py-8 sm:px-6">
        <div className="mx-auto max-w-6xl flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p className="font-medium text-foreground">OxfordReserve</p>
          <div className="flex gap-6">
            <Link href="/restaurants" className="hover:text-foreground transition-colors">Restaurants</Link>
            <Link href="/for-restaurants" className="hover:text-foreground transition-colors">For Restaurants</Link>
            <Link href="/privacy" className="hover:text-foreground transition-colors">Privacy</Link>
          </div>
          <p>© {new Date().getFullYear()} OxfordReserve</p>
        </div>
      </footer>
    </div>
  );
}
