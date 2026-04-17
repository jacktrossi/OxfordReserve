import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Phone, Globe, Star, Clock, ChevronLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ReservationForm } from "@/components/reservation-form";
import { getRestaurantBySlug, OXFORD_RESTAURANTS } from "@/lib/restaurants";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return OXFORD_RESTAURANTS.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const restaurant = getRestaurantBySlug(slug);
  if (!restaurant) return {};
  return {
    title: restaurant.name,
    description: restaurant.description,
  };
}

const DAY_ORDER = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export default async function RestaurantPage({ params }: PageProps) {
  const { slug } = await params;
  const restaurant = getRestaurantBySlug(slug);

  if (!restaurant) notFound();

  const today = new Date().toLocaleDateString("en-US", { weekday: "long" });

  return (
    <div className="min-h-screen">
      {/* Hero image */}
      <div className="relative h-64 sm:h-80 lg:h-96 overflow-hidden bg-secondary">
        <Image
          src={restaurant.imageUrl}
          alt={restaurant.name}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        <Link
          href="/restaurants"
          className="absolute top-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-black/30 px-3 py-1.5 text-sm text-white backdrop-blur-sm hover:bg-black/50 transition-colors"
        >
          <ChevronLeft className="h-3.5 w-3.5" />
          Back
        </Link>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Left: Restaurant info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header */}
            <div>
              <div className="flex flex-wrap gap-2 mb-3">
                {restaurant.cuisine.map((c) => (
                  <Badge key={c} variant="secondary">{c}</Badge>
                ))}
                <Badge variant="outline">{restaurant.priceRange}</Badge>
              </div>
              <h1 className="text-3xl font-semibold tracking-tight">{restaurant.name}</h1>
              <p className="text-muted-foreground mt-1">{restaurant.tagline}</p>
              <div className="flex items-center gap-3 mt-3">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                  <span className="font-semibold">{restaurant.rating}</span>
                  <span className="text-muted-foreground text-sm">({restaurant.reviewCount} reviews)</span>
                </div>
                <span className="text-border">·</span>
                <span className="text-sm text-muted-foreground">{restaurant.neighborhood}</span>
              </div>
            </div>

            <Separator />

            {/* Description */}
            <div>
              <h2 className="font-semibold mb-2">About</h2>
              <p className="text-muted-foreground leading-relaxed">{restaurant.description}</p>
            </div>

            {/* Features */}
            {restaurant.features.length > 0 && (
              <div>
                <h2 className="font-semibold mb-3">Features</h2>
                <div className="flex flex-wrap gap-2">
                  {restaurant.features.map((f) => (
                    <span key={f} className="rounded-full bg-secondary px-3 py-1 text-sm text-muted-foreground">
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <Separator />

            {/* Hours */}
            <div>
              <h2 className="font-semibold mb-3 flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Hours
              </h2>
              <div className="space-y-1.5">
                {DAY_ORDER.map((day) => {
                  const hours = restaurant.hours[day];
                  const isToday = day === today;
                  return (
                    <div
                      key={day}
                      className={`flex justify-between text-sm ${isToday ? "font-medium text-foreground" : "text-muted-foreground"}`}
                    >
                      <span>{day}</span>
                      <span>{hours ? `${hours.open} – ${hours.close}` : "Closed"}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <Separator />

            {/* Contact */}
            <div>
              <h2 className="font-semibold mb-3">Location &amp; contact</h2>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-4 w-4 shrink-0" />
                  <span>{restaurant.address}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Phone className="h-4 w-4 shrink-0" />
                  <a href={`tel:${restaurant.phone}`} className="hover:text-foreground transition-colors">
                    {restaurant.phone}
                  </a>
                </div>
                {restaurant.website && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Globe className="h-4 w-4 shrink-0" />
                    <a
                      href={restaurant.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-foreground transition-colors"
                    >
                      {restaurant.website.replace("https://", "")}
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right: Reservation widget */}
          <div className="lg:col-span-1">
            <div className="sticky top-20 rounded-2xl border border-border bg-card p-5 shadow-sm">
              <h2 className="font-semibold text-lg mb-1">Make a reservation</h2>
              <p className="text-sm text-muted-foreground mb-5">Book your table instantly</p>
              <ReservationForm restaurant={restaurant} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
