import { type NextRequest, NextResponse } from "next/server";
import { getAvailability } from "@/lib/tock";
import { OXFORD_RESTAURANTS } from "@/lib/restaurants";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const restaurantId = searchParams.get("restaurantId");
  const date = searchParams.get("date");
  const partySize = searchParams.get("partySize");

  if (!restaurantId || !date || !partySize) {
    return NextResponse.json({ error: "Missing required parameters" }, { status: 400 });
  }

  const restaurant = OXFORD_RESTAURANTS.find((r) => r.id === restaurantId);
  if (!restaurant) {
    return NextResponse.json({ error: "Restaurant not found" }, { status: 404 });
  }

  try {
    const availability = await getAvailability(
      restaurant.tockVenueId ?? restaurant.id,
      date,
      parseInt(partySize)
    );
    return NextResponse.json(availability);
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to fetch availability" },
      { status: 500 }
    );
  }
}
