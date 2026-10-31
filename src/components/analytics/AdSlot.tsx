"use client";

import { useEffect, useSyncExternalStore } from "react";
import { getConsent, getServerConsent, subscribeToConsent } from "@/lib/consent-store";

const ADSENSE_CLIENT_ID = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

/**
 * A single AdSense ad unit. Renders nothing until both the publisher ID is
 * configured (`NEXT_PUBLIC_ADSENSE_CLIENT_ID`) and the visitor has
 * consented to advertising cookies.
 */
export function AdSlot({ slot, className }: { slot: string; className?: string }) {
  const consent = useSyncExternalStore(subscribeToConsent, getConsent, getServerConsent);
  const ready = Boolean(ADSENSE_CLIENT_ID) && consent.ads;

  useEffect(() => {
    if (!ready) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      // ignore — the AdSense script may still be loading
    }
  }, [ready]);

  if (!ready) return null;

  return (
    <ins
      className={`adsbygoogle block ${className ?? ""}`}
      style={{ display: "block" }}
      data-ad-client={ADSENSE_CLIENT_ID}
      data-ad-slot={slot}
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  );
}
