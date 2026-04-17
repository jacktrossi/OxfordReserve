import type { Restaurant } from "./types";

export const OXFORD_RESTAURANTS: Restaurant[] = [
  {
    id: "city-grocery",
    slug: "city-grocery",
    name: "City Grocery",
    tagline: "The cornerstone of Oxford dining since 1992",
    description:
      "Chef John Currence's flagship restaurant on the Square. Southern-inspired New American cuisine in an elegant, storied setting. James Beard Award-winning kitchen.",
    cuisine: ["New American", "Southern"],
    priceRange: "$$$",
    address: "152 Courthouse Square, Oxford, MS 38655",
    phone: "(662) 232-8080",
    website: "https://citygroceryonline.com",
    imageUrl:
      "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800&q=80",
      "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&q=80",
    ],
    hours: {
      Monday: null,
      Tuesday: { open: "11:30", close: "22:00" },
      Wednesday: { open: "11:30", close: "22:00" },
      Thursday: { open: "11:30", close: "22:00" },
      Friday: { open: "11:30", close: "23:00" },
      Saturday: { open: "10:30", close: "23:00" },
      Sunday: { open: "10:30", close: "21:00" },
    },
    tockVenueId: "city-grocery-oxford",
    features: ["Full Bar", "Outdoor Seating", "Private Dining", "Live Music"],
    rating: 4.7,
    reviewCount: 1240,
    neighborhood: "The Square",
    isActive: true,
    planTier: "premium",
  },
  {
    id: "big-bad-breakfast",
    slug: "big-bad-breakfast",
    name: "Big Bad Breakfast",
    tagline: "Breakfast done right, all day long",
    description:
      "John Currence's beloved breakfast spot serving Southern breakfast classics with quality ingredients. Expect lines on weekends — worth every minute.",
    cuisine: ["Brunch", "Southern", "American"],
    priceRange: "$$",
    address: "719 N Lamar Blvd, Oxford, MS 38655",
    phone: "(662) 236-2666",
    website: "https://bigbadbreakfast.com",
    imageUrl:
      "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?w=800&q=80",
    ],
    hours: {
      Monday: { open: "07:00", close: "14:00" },
      Tuesday: { open: "07:00", close: "14:00" },
      Wednesday: { open: "07:00", close: "14:00" },
      Thursday: { open: "07:00", close: "14:00" },
      Friday: { open: "07:00", close: "14:00" },
      Saturday: { open: "07:00", close: "14:00" },
      Sunday: { open: "08:00", close: "14:00" },
    },
    tockVenueId: "big-bad-breakfast-oxford",
    features: ["Vegetarian Options", "Kid-Friendly"],
    rating: 4.5,
    reviewCount: 980,
    neighborhood: "Midtown",
    isActive: true,
    planTier: "pro",
  },
  {
    id: "snackbar",
    slug: "snackbar",
    name: "Snackbar",
    tagline: "Modern bistro, Oxford's hidden gem",
    description:
      "A lively bistro from the City Grocery family with creative small plates, craft cocktails, and a buzzing atmosphere. Perfect for groups and late-night dining.",
    cuisine: ["New American", "American"],
    priceRange: "$$$",
    address: "721 N Lamar Blvd, Oxford, MS 38655",
    phone: "(662) 236-6363",
    imageUrl:
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80",
    ],
    hours: {
      Monday: null,
      Tuesday: { open: "17:00", close: "22:00" },
      Wednesday: { open: "17:00", close: "22:00" },
      Thursday: { open: "17:00", close: "23:00" },
      Friday: { open: "17:00", close: "23:00" },
      Saturday: { open: "17:00", close: "23:00" },
      Sunday: null,
    },
    tockVenueId: "snackbar-oxford",
    features: ["Full Bar", "Late Night", "Small Plates"],
    rating: 4.4,
    reviewCount: 620,
    neighborhood: "Midtown",
    isActive: true,
    planTier: "pro",
  },
  {
    id: "boure",
    slug: "boure",
    name: "Bouré",
    tagline: "Cajun soul meets Mississippi warmth",
    description:
      "Lively Cajun-inspired restaurant on the Square with bold flavors, strong cocktails, and a festive atmosphere. Great for groups and game days.",
    cuisine: ["Cajun", "Southern", "American"],
    priceRange: "$$",
    address: "110 Courthouse Square, Oxford, MS 38655",
    phone: "(662) 234-4700",
    imageUrl:
      "https://images.unsplash.com/photo-1567521464027-f127ff144326?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1567521464027-f127ff144326?w=800&q=80",
    ],
    hours: {
      Monday: { open: "11:00", close: "22:00" },
      Tuesday: { open: "11:00", close: "22:00" },
      Wednesday: { open: "11:00", close: "22:00" },
      Thursday: { open: "11:00", close: "23:00" },
      Friday: { open: "11:00", close: "23:00" },
      Saturday: { open: "11:00", close: "23:00" },
      Sunday: { open: "11:00", close: "21:00" },
    },
    tockVenueId: "boure-oxford",
    features: ["Full Bar", "Outdoor Seating", "Sports TVs", "Happy Hour"],
    rating: 4.3,
    reviewCount: 880,
    neighborhood: "The Square",
    isActive: true,
    planTier: "starter",
  },
  {
    id: "ravine",
    slug: "ravine",
    name: "Ravine",
    tagline: "Farm-to-table in a stunning natural setting",
    description:
      "Nestled in a wooded ravine, this intimate restaurant offers seasonal New American cuisine with locally sourced ingredients. A truly special dining experience.",
    cuisine: ["New American", "Southern"],
    priceRange: "$$$",
    address: "53 County Rd 321, Oxford, MS 38655",
    phone: "(662) 234-4555",
    imageUrl:
      "https://images.unsplash.com/photo-1550966871-3ed3cbe818b5?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1550966871-3ed3cbe818b5?w=800&q=80",
    ],
    hours: {
      Monday: null,
      Tuesday: null,
      Wednesday: { open: "17:30", close: "21:00" },
      Thursday: { open: "17:30", close: "21:00" },
      Friday: { open: "17:30", close: "21:30" },
      Saturday: { open: "17:30", close: "21:30" },
      Sunday: null,
    },
    tockVenueId: "ravine-oxford",
    features: ["Outdoor Seating", "Private Events", "Seasonal Menu"],
    rating: 4.8,
    reviewCount: 340,
    neighborhood: "South Oxford",
    isActive: true,
    planTier: "premium",
  },
  {
    id: "ajax-diner",
    slug: "ajax-diner",
    name: "Ajax Diner",
    tagline: "Classic Southern comfort, no frills needed",
    description:
      "Oxford's quintessential meat-and-three diner. Legendary fried catfish, turnip greens, and cornbread. A pilgrimage for any Southern food lover.",
    cuisine: ["Southern", "American"],
    priceRange: "$",
    address: "118 Courthouse Square, Oxford, MS 38655",
    phone: "(662) 232-8880",
    imageUrl:
      "https://images.unsplash.com/photo-1600891964092-4316c288032e?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1600891964092-4316c288032e?w=800&q=80",
    ],
    hours: {
      Monday: { open: "11:00", close: "21:00" },
      Tuesday: { open: "11:00", close: "21:00" },
      Wednesday: { open: "11:00", close: "21:00" },
      Thursday: { open: "11:00", close: "21:00" },
      Friday: { open: "11:00", close: "21:00" },
      Saturday: { open: "11:00", close: "21:00" },
      Sunday: null,
    },
    features: ["Cash Friendly", "Kid-Friendly", "Daily Specials"],
    rating: 4.5,
    reviewCount: 760,
    neighborhood: "The Square",
    isActive: true,
    planTier: "starter",
  },
  {
    id: "proud-larrys",
    slug: "proud-larrys",
    name: "Proud Larry's",
    tagline: "Live music, great food, Oxford's living room",
    description:
      "Oxford's favorite live music venue with a full food menu. From burgers to po'boys, enjoy great eats while discovering local and touring artists.",
    cuisine: ["American", "Bar & Grill"],
    priceRange: "$$",
    address: "211 S Lamar Blvd, Oxford, MS 38655",
    phone: "(662) 236-0050",
    imageUrl:
      "https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=800&q=80",
    ],
    hours: {
      Monday: { open: "11:00", close: "02:00" },
      Tuesday: { open: "11:00", close: "02:00" },
      Wednesday: { open: "11:00", close: "02:00" },
      Thursday: { open: "11:00", close: "02:00" },
      Friday: { open: "11:00", close: "02:00" },
      Saturday: { open: "11:00", close: "02:00" },
      Sunday: { open: "11:00", close: "00:00" },
    },
    features: ["Live Music", "Full Bar", "Late Night", "Outdoor Patio"],
    rating: 4.4,
    reviewCount: 1100,
    neighborhood: "Midtown",
    isActive: true,
    planTier: "starter",
  },
  {
    id: "mcewens",
    slug: "mcewens",
    name: "McEwen's",
    tagline: "Upscale Southern dining reimagined",
    description:
      "Sophisticated Southern cuisine in an elegant setting. McEwen's offers an extensive wine list, thoughtful cocktails, and refined takes on classic Mississippi dishes.",
    cuisine: ["Southern", "New American"],
    priceRange: "$$$",
    address: "148 Courthouse Square, Oxford, MS 38655",
    phone: "(662) 234-FOOD",
    imageUrl:
      "https://images.unsplash.com/photo-1578474846511-04ba529f0b88?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1578474846511-04ba529f0b88?w=800&q=80",
    ],
    hours: {
      Monday: null,
      Tuesday: { open: "17:00", close: "22:00" },
      Wednesday: { open: "17:00", close: "22:00" },
      Thursday: { open: "17:00", close: "22:00" },
      Friday: { open: "11:30", close: "23:00" },
      Saturday: { open: "11:30", close: "23:00" },
      Sunday: { open: "10:30", close: "21:00" },
    },
    tockVenueId: "mcewens-oxford",
    features: ["Wine Bar", "Private Dining", "Brunch", "Outdoor Seating"],
    rating: 4.6,
    reviewCount: 490,
    neighborhood: "The Square",
    isActive: true,
    planTier: "pro",
  },
  {
    id: "handy-andy",
    slug: "handy-andy",
    name: "Handy Andy",
    tagline: "Soul food and BBQ done the Mississippi way",
    description:
      "A beloved local institution serving slow-smoked BBQ, soul food plates, and homemade sides. Family recipes passed down through generations.",
    cuisine: ["BBQ", "Southern"],
    priceRange: "$",
    address: "407 N Lamar Blvd, Oxford, MS 38655",
    phone: "(662) 234-2285",
    imageUrl:
      "https://images.unsplash.com/photo-1544025162-d76538879714?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1544025162-d76538879714?w=800&q=80",
    ],
    hours: {
      Monday: { open: "10:00", close: "20:00" },
      Tuesday: { open: "10:00", close: "20:00" },
      Wednesday: { open: "10:00", close: "20:00" },
      Thursday: { open: "10:00", close: "20:00" },
      Friday: { open: "10:00", close: "21:00" },
      Saturday: { open: "10:00", close: "21:00" },
      Sunday: null,
    },
    features: ["Takeout", "Catering"],
    rating: 4.6,
    reviewCount: 430,
    neighborhood: "North Oxford",
    isActive: true,
    planTier: "starter",
  },
  {
    id: "the-powerhouse",
    slug: "the-powerhouse",
    name: "The Powerhouse",
    tagline: "Historic venue, unforgettable meals",
    description:
      "Set in a converted 1920s power plant, this distinctive restaurant serves New American cuisine with Mississippi flair. The venue itself is worth the visit.",
    cuisine: ["American", "New American"],
    priceRange: "$$",
    address: "200 S Lamar Blvd, Oxford, MS 38655",
    phone: "(662) 236-4734",
    imageUrl:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80",
    ],
    hours: {
      Monday: null,
      Tuesday: { open: "11:00", close: "22:00" },
      Wednesday: { open: "11:00", close: "22:00" },
      Thursday: { open: "11:00", close: "22:00" },
      Friday: { open: "11:00", close: "23:00" },
      Saturday: { open: "11:00", close: "23:00" },
      Sunday: { open: "10:00", close: "21:00" },
    },
    features: ["Historic Building", "Full Bar", "Events Space"],
    rating: 4.3,
    reviewCount: 380,
    neighborhood: "Midtown",
    isActive: true,
    planTier: "pro",
  },
];

export function getRestaurantBySlug(slug: string): Restaurant | undefined {
  return OXFORD_RESTAURANTS.find((r) => r.slug === slug);
}

export function getFeaturedRestaurants(): Restaurant[] {
  return OXFORD_RESTAURANTS.filter(
    (r) => r.planTier === "premium" || r.planTier === "pro"
  ).slice(0, 6);
}

export function searchRestaurants(query: string): Restaurant[] {
  const q = query.toLowerCase();
  return OXFORD_RESTAURANTS.filter(
    (r) =>
      r.name.toLowerCase().includes(q) ||
      r.cuisine.some((c) => c.toLowerCase().includes(q)) ||
      r.neighborhood.toLowerCase().includes(q)
  );
}
