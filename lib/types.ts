export type PriceRange = "$" | "$$" | "$$$" | "$$$$";

export type Cuisine =
  | "Southern"
  | "American"
  | "Seafood"
  | "Italian"
  | "Mexican"
  | "Asian"
  | "BBQ"
  | "Brunch"
  | "Bar & Grill"
  | "New American"
  | "Cajun";

export interface Restaurant {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  cuisine: Cuisine[];
  priceRange: PriceRange;
  address: string;
  phone: string;
  website?: string;
  imageUrl: string;
  images: string[];
  hours: {
    [day: string]: { open: string; close: string } | null;
  };
  tockVenueId?: string;
  features: string[];
  rating: number;
  reviewCount: number;
  neighborhood: string;
  isActive: boolean;
  planTier?: "starter" | "pro" | "premium";
}

export interface TimeSlot {
  time: string;
  available: boolean;
  partySize: number;
}

export interface AvailabilityResponse {
  date: string;
  slots: TimeSlot[];
  venueId: string;
}

export interface Reservation {
  id: string;
  restaurantId: string;
  restaurantName: string;
  date: string;
  time: string;
  partySize: number;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  specialRequests?: string;
  status: "confirmed" | "pending" | "cancelled";
  confirmationCode: string;
  tockReservationId?: string;
  createdAt: string;
}

export interface ShopifyPlan {
  id: string;
  name: string;
  price: number;
  variantId: string;
  features: string[];
  highlighted?: boolean;
}

export interface SubscriptionStatus {
  active: boolean;
  planId?: string;
  planName?: string;
  currentPeriodEnd?: string;
  shopifyOrderId?: string;
}
