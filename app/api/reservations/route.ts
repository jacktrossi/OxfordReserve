import { type NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { createReservation } from "@/lib/tock";
import { generateConfirmationCode } from "@/lib/utils";

export const runtime = "edge";

export async function POST(request: NextRequest) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json() as {
    restaurantId: string;
    restaurantName: string;
    tockVenueId?: string;
    date: string;
    time: string;
    partySize: number;
    guestName: string;
    guestEmail: string;
    guestPhone: string;
    specialRequests?: string;
  };

  const {
    restaurantId,
    restaurantName,
    tockVenueId,
    date,
    time,
    partySize,
    guestName,
    guestEmail,
    guestPhone,
    specialRequests,
  } = body;

  if (!restaurantId || !date || !time || !partySize || !guestName || !guestEmail || !guestPhone) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  try {
    const { tockReservationId, confirmationCode } = await createReservation({
      venueId: tockVenueId ?? restaurantId,
      date,
      time,
      partySize,
      guestName,
      guestEmail,
      guestPhone,
      specialRequests,
    });

    const reservation = {
      id: crypto.randomUUID(),
      userId,
      restaurantId,
      restaurantName,
      date,
      time,
      partySize,
      guestName,
      guestEmail,
      guestPhone,
      specialRequests,
      status: "confirmed",
      confirmationCode,
      tockReservationId,
      createdAt: new Date().toISOString(),
    };

    // TODO: Persist to Cloudflare KV or D1
    // await env.RESERVATIONS.put(`reservation:${reservation.id}`, JSON.stringify(reservation));

    return NextResponse.json({ success: true, confirmationCode, reservationId: reservation.id });
  } catch (err) {
    console.error("Reservation error:", err);
    return NextResponse.json(
      { error: "Failed to create reservation" },
      { status: 500 }
    );
  }
}
