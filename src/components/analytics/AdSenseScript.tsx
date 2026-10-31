"use client";

import { useSyncExternalStore } from "react";
import Script from "next/script";
import { getConsent, getServerConsent, subscribeToConsent } from "@/lib/consent-store";

const ADSENSE_CLIENT_ID = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;

/** Loads the site-wide AdSense script once ads are both configured and consented to. */
export function AdSenseScript() {
  const consent = useSyncExternalStore(subscribeToConsent, getConsent, getServerConsent);

  if (!ADSENSE_CLIENT_ID || !consent.ads) return null;

  return (
    <Script
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT_ID}`}
      crossOrigin="anonymous"
      strategy="afterInteractive"
    />
  );
}
