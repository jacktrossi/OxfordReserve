"use client";

import { useState, useMemo } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RestaurantCard } from "@/components/restaurant-card";
import { OXFORD_RESTAURANTS } from "@/lib/restaurants";
import type { Cuisine, PriceRange } from "@/lib/types";
import { cn } from "@/lib/utils";

const CUISINES: Cuisine[] = [
  "Southern", "New American", "American", "Brunch",
  "BBQ", "Cajun", "Bar & Grill",
];

const PRICE_RANGES: PriceRange[] = ["$", "$$", "$$$", "$$$$"];

const NEIGHBORHOODS = [
  "The Square", "Midtown", "North Oxford", "South Oxford",
];

export default function RestaurantsPage() {
  const [query, setQuery] = useState("");
  const [selectedCuisines, setSelectedCuisines] = useState<Cuisine[]>([]);
  const [selectedPrices, setSelectedPrices] = useState<PriceRange[]>([]);
  const [selectedNeighborhood, setSelectedNeighborhood] = useState<string>("");
  const [showFilters, setShowFilters] = useState(false);

  function toggleCuisine(c: Cuisine) {
    setSelectedCuisines((prev) =>
      prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]
    );
  }

  function togglePrice(p: PriceRange) {
    setSelectedPrices((prev) =>
      prev.includes(p) ? prev.filter((x) => x !== p) : [...prev, p]
    );
  }

  const filtered = useMemo(() => {
    return OXFORD_RESTAURANTS.filter((r) => {
      if (query && !r.name.toLowerCase().includes(query.toLowerCase()) &&
        !r.cuisine.some((c) => c.toLowerCase().includes(query.toLowerCase())) &&
        !r.neighborhood.toLowerCase().includes(query.toLowerCase())) {
        return false;
      }
      if (selectedCuisines.length && !r.cuisine.some((c) => selectedCuisines.includes(c))) {
        return false;
      }
      if (selectedPrices.length && !selectedPrices.includes(r.priceRange)) {
        return false;
      }
      if (selectedNeighborhood && r.neighborhood !== selectedNeighborhood) {
        return false;
      }
      return true;
    });
  }, [query, selectedCuisines, selectedPrices, selectedNeighborhood]);

  const hasFilters = selectedCuisines.length > 0 || selectedPrices.length > 0 || selectedNeighborhood;

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="border-b border-border bg-background sticky top-14 z-40">
        <div className="mx-auto max-w-4xl px-4 py-4 sm:px-6">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search restaurants, cuisine, neighborhood…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Button
              variant={showFilters ? "default" : "outline"}
              size="icon"
              onClick={() => setShowFilters((p) => !p)}
              className="rounded-xl shrink-0"
            >
              <SlidersHorizontal className="h-4 w-4" />
            </Button>
          </div>

          {showFilters && (
            <div className="mt-3 space-y-3 animate-fade-in">
              <div>
                <p className="text-xs font-medium text-muted-foreground mb-2">Cuisine</p>
                <div className="flex flex-wrap gap-2">
                  {CUISINES.map((c) => (
                    <button
                      key={c}
                      onClick={() => toggleCuisine(c)}
                      className={cn(
                        "rounded-full px-3 py-1 text-xs font-medium transition-colors",
                        selectedCuisines.includes(c)
                          ? "bg-foreground text-background"
                          : "bg-secondary text-muted-foreground hover:text-foreground"
                      )}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex gap-4">
                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-2">Price</p>
                  <div className="flex gap-2">
                    {PRICE_RANGES.map((p) => (
                      <button
                        key={p}
                        onClick={() => togglePrice(p)}
                        className={cn(
                          "rounded-full px-3 py-1 text-xs font-medium transition-colors",
                          selectedPrices.includes(p)
                            ? "bg-foreground text-background"
                            : "bg-secondary text-muted-foreground hover:text-foreground"
                        )}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-2">Neighborhood</p>
                  <div className="flex flex-wrap gap-2">
                    {NEIGHBORHOODS.map((n) => (
                      <button
                        key={n}
                        onClick={() => setSelectedNeighborhood((prev) => prev === n ? "" : n)}
                        className={cn(
                          "rounded-full px-3 py-1 text-xs font-medium transition-colors",
                          selectedNeighborhood === n
                            ? "bg-foreground text-background"
                            : "bg-secondary text-muted-foreground hover:text-foreground"
                        )}
                      >
                        {n}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              {hasFilters && (
                <button
                  onClick={() => {
                    setSelectedCuisines([]);
                    setSelectedPrices([]);
                    setSelectedNeighborhood("");
                  }}
                  className="text-xs text-muted-foreground underline"
                >
                  Clear filters
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Results */}
      <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6">
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-muted-foreground">
            {filtered.length} restaurant{filtered.length !== 1 ? "s" : ""} in Oxford
          </p>
          {hasFilters && (
            <div className="flex gap-2 flex-wrap">
              {selectedCuisines.map((c) => (
                <Badge key={c} variant="secondary" className="cursor-pointer" onClick={() => toggleCuisine(c)}>
                  {c} ×
                </Badge>
              ))}
              {selectedPrices.map((p) => (
                <Badge key={p} variant="secondary" className="cursor-pointer" onClick={() => togglePrice(p)}>
                  {p} ×
                </Badge>
              ))}
              {selectedNeighborhood && (
                <Badge variant="secondary" className="cursor-pointer" onClick={() => setSelectedNeighborhood("")}>
                  {selectedNeighborhood} ×
                </Badge>
              )}
            </div>
          )}
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-muted-foreground">No restaurants match your search</p>
            <button
              onClick={() => { setQuery(""); setSelectedCuisines([]); setSelectedPrices([]); setSelectedNeighborhood(""); }}
              className="mt-3 text-sm underline text-muted-foreground"
            >
              Clear all filters
            </button>
          </div>
        ) : (
          <div className="divide-y-0">
            {filtered.map((restaurant) => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
