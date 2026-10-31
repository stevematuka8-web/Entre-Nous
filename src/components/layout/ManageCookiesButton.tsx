"use client";

import { resetConsent } from "@/lib/consent-store";

export function ManageCookiesButton() {
  return (
    <button
      onClick={resetConsent}
      className="text-sm text-mist transition-colors hover:text-orange"
    >
      Gérer les cookies
    </button>
  );
}
