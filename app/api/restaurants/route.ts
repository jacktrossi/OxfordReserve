import { type NextRequest, NextResponse } from "next/server";
import { OXFORD_RESTAURANTS, searchRestaurants } from "@/lib/restaurants";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q");
  const cuisine = searchParams.get("cuisine");
  const price = searchParams.get("price");
  const neighborhood = searchParams.get("neighborhood");

  let restaurants = query ? searchRestaurants(query) : OXFORD_RESTAURANTS;

  if (cuisine) {
    restaurants = restaurants.filter((r) =>
      r.cuisine.some((c) => c.toLowerCase() === cuisine.toLowerCase())
    );
  }

  if (price) {
    restaurants = restaurants.filter((r) => r.priceRange === price);
  }

  if (neighborhood) {
    restaurants = restaurants.filter((r) =>
      r.neighborhood.toLowerCase() === neighborhood.toLowerCase()
    );
  }

  return NextResponse.json({ restaurants });
}
