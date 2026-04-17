import Link from "next/link";
import { CheckCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Welcome to OxfordReserve!" };

export default function SubscribeSuccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-md animate-fade-in">
        <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-6" />
        <h1 className="text-3xl font-semibold tracking-tight mb-3">
          Welcome to OxfordReserve!
        </h1>
        <p className="text-muted-foreground mb-6">
          Your subscription is active. Our team will reach out within 24 hours to complete your restaurant listing setup and Tock integration.
        </p>
        <div className="rounded-2xl border border-border bg-secondary p-5 text-sm text-left space-y-2 mb-6">
          <p className="font-medium">What happens next:</p>
          <ol className="space-y-1.5 text-muted-foreground list-decimal list-inside">
            <li>We&apos;ll email you a setup guide</li>
            <li>Schedule a 15-min onboarding call</li>
            <li>Your restaurant goes live within 48 hours</li>
          </ol>
        </div>
        <Button asChild>
          <Link href="/">
            Back to home <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
