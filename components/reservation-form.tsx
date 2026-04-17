"use client";

import { useState } from "react";
import { useUser, SignInButton } from "@clerk/nextjs";
import { format, addDays, startOfToday } from "date-fns";
import { Calendar, Users, Clock, ChevronRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { formatTime } from "@/lib/utils";
import type { Restaurant, TimeSlot } from "@/lib/types";

interface ReservationFormProps {
  restaurant: Restaurant;
}

type Step = "datetime" | "details" | "confirmed";

export function ReservationForm({ restaurant }: ReservationFormProps) {
  const { isSignedIn, user } = useUser();
  const { toast } = useToast();

  const [step, setStep] = useState<Step>("datetime");
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [partySize, setPartySize] = useState<string>("2");
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [slots, setSlots] = useState<TimeSlot[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [loading, setLoading] = useState(false);
  const [confirmationCode, setConfirmationCode] = useState<string>("");

  const [guestName, setGuestName] = useState(
    user ? `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim() : ""
  );
  const [guestEmail, setGuestEmail] = useState(
    user?.primaryEmailAddress?.emailAddress ?? ""
  );
  const [guestPhone, setGuestPhone] = useState("");
  const [specialRequests, setSpecialRequests] = useState("");

  const dates = Array.from({ length: 14 }, (_, i) => {
    const d = addDays(startOfToday(), i);
    return { value: format(d, "yyyy-MM-dd"), label: format(d, "EEE, MMM d") };
  });

  async function fetchSlots(date: string, size: string) {
    setLoadingSlots(true);
    setSlots([]);
    setSelectedTime("");
    try {
      const res = await fetch(
        `/api/availability?restaurantId=${restaurant.id}&date=${date}&partySize=${size}`
      );
      const data = await res.json() as { slots: TimeSlot[] };
      setSlots(data.slots ?? []);
    } catch {
      toast({ title: "Could not load availability", variant: "destructive" });
    } finally {
      setLoadingSlots(false);
    }
  }

  function handleDateChange(date: string) {
    setSelectedDate(date);
    fetchSlots(date, partySize);
  }

  function handlePartySizeChange(size: string) {
    setPartySize(size);
    if (selectedDate) fetchSlots(selectedDate, size);
  }

  async function handleConfirm() {
    if (!guestName || !guestEmail || !guestPhone) {
      toast({ title: "Please fill in all required fields", variant: "destructive" });
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          restaurantId: restaurant.id,
          restaurantName: restaurant.name,
          tockVenueId: restaurant.tockVenueId,
          date: selectedDate,
          time: selectedTime,
          partySize: parseInt(partySize),
          guestName,
          guestEmail,
          guestPhone,
          specialRequests,
        }),
      });

      const data = await res.json() as { confirmationCode?: string; error?: string };

      if (!res.ok) throw new Error(data.error ?? "Reservation failed");

      setConfirmationCode(data.confirmationCode ?? "");
      setStep("confirmed");
    } catch (err) {
      toast({
        title: "Reservation failed",
        description: err instanceof Error ? err.message : "Please try again",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }

  if (step === "confirmed") {
    return (
      <div className="text-center py-8">
        <CheckCircle className="h-14 w-14 text-green-500 mx-auto mb-4" />
        <h3 className="text-xl font-semibold mb-1">You&apos;re confirmed!</h3>
        <p className="text-muted-foreground text-sm mb-4">
          Confirmation #{confirmationCode}
        </p>
        <div className="bg-secondary rounded-2xl p-4 text-sm space-y-1 text-left">
          <p><span className="text-muted-foreground">Restaurant</span> · {restaurant.name}</p>
          <p><span className="text-muted-foreground">Date</span> · {selectedDate}</p>
          <p><span className="text-muted-foreground">Time</span> · {formatTime(selectedTime)}</p>
          <p><span className="text-muted-foreground">Party</span> · {partySize} guests</p>
        </div>
        <p className="text-xs text-muted-foreground mt-4">
          A confirmation email has been sent to {guestEmail}
        </p>
      </div>
    );
  }

  if (step === "details") {
    return (
      <div className="space-y-4">
        <div className="bg-secondary rounded-2xl p-3 text-sm flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Calendar className="h-3.5 w-3.5" />
            <span>{selectedDate}</span>
          </div>
          <span className="text-border">·</span>
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Clock className="h-3.5 w-3.5" />
            <span>{formatTime(selectedTime)}</span>
          </div>
          <span className="text-border">·</span>
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Users className="h-3.5 w-3.5" />
            <span>{partySize} guests</span>
          </div>
          <button
            onClick={() => setStep("datetime")}
            className="ml-auto text-xs underline text-muted-foreground hover:text-foreground"
          >
            Change
          </button>
        </div>

        <div className="space-y-3">
          <div>
            <Label htmlFor="name" className="text-xs text-muted-foreground mb-1.5 block">Full name *</Label>
            <Input
              id="name"
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
              placeholder="John Smith"
            />
          </div>
          <div>
            <Label htmlFor="email" className="text-xs text-muted-foreground mb-1.5 block">Email *</Label>
            <Input
              id="email"
              type="email"
              value={guestEmail}
              onChange={(e) => setGuestEmail(e.target.value)}
              placeholder="john@example.com"
            />
          </div>
          <div>
            <Label htmlFor="phone" className="text-xs text-muted-foreground mb-1.5 block">Phone *</Label>
            <Input
              id="phone"
              type="tel"
              value={guestPhone}
              onChange={(e) => setGuestPhone(e.target.value)}
              placeholder="(662) 555-0100"
            />
          </div>
          <div>
            <Label htmlFor="requests" className="text-xs text-muted-foreground mb-1.5 block">Special requests</Label>
            <Input
              id="requests"
              value={specialRequests}
              onChange={(e) => setSpecialRequests(e.target.value)}
              placeholder="Allergies, celebrations, accessibility needs…"
            />
          </div>
        </div>

        <Button onClick={handleConfirm} disabled={loading} className="w-full" size="lg">
          {loading ? "Confirming…" : "Confirm reservation"}
          {!loading && <ChevronRight className="h-4 w-4" />}
        </Button>

        <p className="text-xs text-center text-muted-foreground">
          Free cancellation up to 2 hours before your reservation
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label className="text-xs text-muted-foreground mb-1.5 block">Date</Label>
          <Select value={selectedDate} onValueChange={handleDateChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select date" />
            </SelectTrigger>
            <SelectContent>
              {dates.map((d) => (
                <SelectItem key={d.value} value={d.value}>
                  {d.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label className="text-xs text-muted-foreground mb-1.5 block">Party size</Label>
          <Select value={partySize} onValueChange={handlePartySizeChange}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                <SelectItem key={n} value={String(n)}>
                  {n} {n === 1 ? "guest" : "guests"}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {selectedDate && (
        <div>
          <Label className="text-xs text-muted-foreground mb-2 block">Available times</Label>
          {loadingSlots ? (
            <div className="grid grid-cols-3 gap-2">
              {[...Array(9)].map((_, i) => (
                <div key={i} className="h-10 rounded-xl bg-secondary animate-pulse" />
              ))}
            </div>
          ) : slots.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-6">
              No availability for this date
            </p>
          ) : (
            <div className="grid grid-cols-3 gap-2">
              {slots
                .filter((s) => s.available)
                .map((slot) => (
                  <button
                    key={slot.time}
                    onClick={() => setSelectedTime(slot.time)}
                    className={`h-10 rounded-xl text-sm font-medium transition-all duration-150 ${
                      selectedTime === slot.time
                        ? "bg-foreground text-background"
                        : "bg-secondary hover:bg-secondary/80 text-foreground"
                    }`}
                  >
                    {formatTime(slot.time)}
                  </button>
                ))}
            </div>
          )}
        </div>
      )}

      {selectedTime ? (
        isSignedIn ? (
          <Button
            onClick={() => setStep("details")}
            className="w-full"
            size="lg"
          >
            Continue <ChevronRight className="h-4 w-4" />
          </Button>
        ) : (
          <SignInButton mode="modal">
            <Button className="w-full" size="lg">
              Sign in to book <ChevronRight className="h-4 w-4" />
            </Button>
          </SignInButton>
        )
      ) : (
        <Button disabled className="w-full" size="lg" variant="secondary">
          Select a time to continue
        </Button>
      )}
    </div>
  );
}
