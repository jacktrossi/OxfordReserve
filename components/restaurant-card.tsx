import Link from "next/link";
import Image from "next/image";
import { Star, MapPin, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { Restaurant } from "@/lib/types";

interface RestaurantCardProps {
  restaurant: Restaurant;
  variant?: "default" | "featured";
}

export function RestaurantCard({ restaurant, variant = "default" }: RestaurantCardProps) {
  const today = new Date().toLocaleDateString("en-US", { weekday: "long" });
  const todayHours = restaurant.hours[today];
  const isOpenToday = todayHours !== null && todayHours !== undefined;

  if (variant === "featured") {
    return (
      <Link href={`/restaurants/${restaurant.slug}`} className="group block">
        <div className="relative overflow-hidden rounded-2xl bg-secondary aspect-[4/5]">
          <Image
            src={restaurant.imageUrl}
            alt={restaurant.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-5">
            <div className="flex flex-wrap gap-1.5 mb-2">
              {restaurant.cuisine.slice(0, 2).map((c) => (
                <Badge key={c} variant="outline" className="border-white/30 text-white bg-white/10 backdrop-blur-sm text-xs">
                  {c}
                </Badge>
              ))}
            </div>
            <h3 className="text-white font-semibold text-xl leading-tight">{restaurant.name}</h3>
            <p className="text-white/70 text-sm mt-1">{restaurant.priceRange} · {restaurant.neighborhood}</p>
            <div className="flex items-center gap-1 mt-2">
              <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
              <span className="text-white text-sm font-medium">{restaurant.rating}</span>
              <span className="text-white/50 text-sm">({restaurant.reviewCount})</span>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link href={`/restaurants/${restaurant.slug}`} className="group block">
      <div className="flex gap-4 py-4 border-b border-border last:border-0 transition-colors hover:bg-secondary/30 rounded-xl px-3 -mx-3">
        <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-secondary">
          <Image
            src={restaurant.imageUrl}
            alt={restaurant.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="80px"
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-semibold text-foreground truncate">{restaurant.name}</h3>
            <div className="flex items-center gap-1 shrink-0">
              <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
              <span className="text-sm text-muted-foreground">{restaurant.rating}</span>
            </div>
          </div>
          <p className="text-sm text-muted-foreground mt-0.5">
            {restaurant.cuisine.slice(0, 2).join(" · ")} · {restaurant.priceRange}
          </p>
          <div className="flex items-center gap-3 mt-1.5">
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <MapPin className="h-3 w-3" />
              <span>{restaurant.neighborhood}</span>
            </div>
            <div className="flex items-center gap-1 text-xs">
              <Clock className="h-3 w-3 text-muted-foreground" />
              <span className={cn(isOpenToday ? "text-green-600" : "text-muted-foreground")}>
                {isOpenToday
                  ? `Open today · ${todayHours!.open}–${todayHours!.close}`
                  : "Closed today"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
