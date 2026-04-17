import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Calendar, Clock, Users, CheckCircle, XCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const metadata = {
  title: "My Reservations",
};

// In production this would fetch from Cloudflare KV/D1
async function getReservations(userId: string) {
  return [] as Array<{
    id: string;
    restaurantName: string;
    restaurantSlug: string;
    date: string;
    time: string;
    partySize: number;
    status: "confirmed" | "cancelled" | "pending";
    confirmationCode: string;
  }>;
}

export default async function ReservationsPage() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const user = await currentUser();
  const reservations = await getReservations(userId);

  const upcoming = reservations.filter(
    (r) => r.status !== "cancelled" && new Date(`${r.date} ${r.time}`) >= new Date()
  );
  const past = reservations.filter(
    (r) => r.status === "cancelled" || new Date(`${r.date} ${r.time}`) < new Date()
  );

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight">My Reservations</h1>
          <p className="text-muted-foreground mt-1">
            Welcome back, {user?.firstName ?? "there"}
          </p>
        </div>

        {reservations.length === 0 ? (
          <div className="text-center py-20">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-secondary mb-4">
              <Calendar className="h-7 w-7 text-muted-foreground" />
            </div>
            <h2 className="text-xl font-semibold mb-2">No reservations yet</h2>
            <p className="text-muted-foreground mb-6">
              Find a table at one of Oxford&apos;s best restaurants
            </p>
            <Button asChild>
              <Link href="/restaurants">Browse restaurants</Link>
            </Button>
          </div>
        ) : (
          <div className="space-y-8">
            {upcoming.length > 0 && (
              <div>
                <h2 className="text-lg font-semibold mb-4">Upcoming</h2>
                <div className="space-y-3">
                  {upcoming.map((r) => (
                    <ReservationCard key={r.id} reservation={r} />
                  ))}
                </div>
              </div>
            )}
            {past.length > 0 && (
              <div>
                <h2 className="text-lg font-semibold mb-4 text-muted-foreground">Past</h2>
                <div className="space-y-3 opacity-60">
                  {past.map((r) => (
                    <ReservationCard key={r.id} reservation={r} />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function ReservationCard({
  reservation,
}: {
  reservation: {
    id: string;
    restaurantName: string;
    restaurantSlug: string;
    date: string;
    time: string;
    partySize: number;
    status: "confirmed" | "cancelled" | "pending";
    confirmationCode: string;
  };
}) {
  const statusConfig = {
    confirmed: { label: "Confirmed", variant: "default" as const, icon: CheckCircle, color: "text-green-600" },
    pending: { label: "Pending", variant: "secondary" as const, icon: Clock, color: "text-amber-600" },
    cancelled: { label: "Cancelled", variant: "outline" as const, icon: XCircle, color: "text-muted-foreground" },
  };
  const s = statusConfig[reservation.status];

  return (
    <Link href={`/restaurants/${reservation.restaurantSlug}`}>
      <div className="rounded-2xl border border-border bg-card p-5 hover:border-foreground/20 transition-colors">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-semibold">{reservation.restaurantName}</h3>
            <p className="text-xs text-muted-foreground mt-0.5">#{reservation.confirmationCode}</p>
          </div>
          <Badge variant={s.variant}>{s.label}</Badge>
        </div>
        <div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5" />
            {reservation.date}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" />
            {reservation.time}
          </span>
          <span className="flex items-center gap-1.5">
            <Users className="h-3.5 w-3.5" />
            {reservation.partySize}
          </span>
        </div>
      </div>
    </Link>
  );
}
