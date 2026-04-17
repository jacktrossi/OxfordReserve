import type { AvailabilityResponse, Reservation, TimeSlot } from "./types";

const TOCK_BASE_URL =
  process.env.TOCK_API_BASE_URL || "https://www.exploretock.com/api/v1";
const TOCK_API_KEY = process.env.TOCK_API_KEY || "";

async function tockFetch(path: string, options: RequestInit = {}) {
  const res = await fetch(`${TOCK_BASE_URL}${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${TOCK_API_KEY}`,
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  if (!res.ok) {
    throw new Error(`Tock API error: ${res.status} ${res.statusText}`);
  }

  return res.json();
}

export async function getAvailability(
  venueId: string,
  date: string,
  partySize: number
): Promise<AvailabilityResponse> {
  if (!TOCK_API_KEY) {
    return getMockAvailability(venueId, date, partySize);
  }

  try {
    const data = await tockFetch(
      `/venues/${venueId}/availability?date=${date}&party_size=${partySize}`
    );
    return {
      date,
      venueId,
      slots: data.timeslots.map(
        (slot: { time: string; available: boolean }) => ({
          time: slot.time,
          available: slot.available,
          partySize,
        })
      ),
    };
  } catch {
    return getMockAvailability(venueId, date, partySize);
  }
}

export async function createReservation(params: {
  venueId: string;
  date: string;
  time: string;
  partySize: number;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  specialRequests?: string;
}): Promise<{ tockReservationId: string; confirmationCode: string }> {
  if (!TOCK_API_KEY) {
    return {
      tockReservationId: `mock-${Date.now()}`,
      confirmationCode: Math.random().toString(36).substring(2, 9).toUpperCase(),
    };
  }

  const data = await tockFetch(`/venues/${params.venueId}/reservations`, {
    method: "POST",
    body: JSON.stringify({
      date: params.date,
      time: params.time,
      party_size: params.partySize,
      guest: {
        name: params.guestName,
        email: params.guestEmail,
        phone: params.guestPhone,
      },
      special_requests: params.specialRequests,
    }),
  });

  return {
    tockReservationId: data.id,
    confirmationCode: data.confirmation_code,
  };
}

export async function cancelReservation(
  venueId: string,
  reservationId: string
): Promise<void> {
  if (!TOCK_API_KEY) return;

  await tockFetch(
    `/venues/${venueId}/reservations/${reservationId}/cancel`,
    { method: "POST" }
  );
}

function getMockAvailability(
  venueId: string,
  date: string,
  partySize: number
): AvailabilityResponse {
  const slots: TimeSlot[] = [];
  const times = [
    "11:30", "12:00", "12:30", "13:00", "17:30", "18:00",
    "18:30", "19:00", "19:30", "20:00", "20:30", "21:00",
  ];

  for (const time of times) {
    slots.push({
      time,
      available: Math.random() > 0.3,
      partySize,
    });
  }

  return { date, venueId, slots };
}
