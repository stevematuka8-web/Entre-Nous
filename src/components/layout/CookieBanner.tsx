"use client";

import { useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { Cookie } from "lucide-react";
import { Button } from "@/components/ui/Button";
import {
  getConsent,
  getServerConsent,
  setConsent,
  subscribeToConsent,
} from "@/lib/consent-store";

export function CookieBanner() {
  const consent = useSyncExternalStore(subscribeToConsent, getConsent, getServerConsent);
  const [customizing, setCustomizing] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [ads, setAds] = useState(false);

  if (consent.answered) return null;

  const acceptAll = () => setConsent({ analytics: true, ads: true });
  const rejectAll = () => setConsent({ analytics: false, ads: false });
  const saveCustom = () => setConsent({ analytics, ads });

  return (
    <div className="fixed inset-x-0 bottom-0 z-[60] px-4 pb-4 sm:px-6">
      <div className="glass-card-strong neon-ring mx-auto max-w-3xl rounded-2xl p-5">
        <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center">
          <Cookie size={20} className="hidden shrink-0 text-violet-bright sm:block" />
          <p className="flex-1 text-xs leading-relaxed text-mist sm:text-sm">
            ENTRE-NOUS utilise des cookies{" "}
            <strong className="text-white">essentiels</strong> (toujours
            actifs) et, si vous l&apos;acceptez, des cookies de{" "}
            <strong className="text-white">mesure d&apos;audience</strong> et
            de <strong className="text-white">publicité</strong>.{" "}
            <Link
              href="/confidentialite"
              className="font-semibold text-violet-bright hover:text-orange"
            >
              En savoir plus
            </Link>
          </p>
        </div>

        {customizing && (
          <div className="mt-4 flex flex-col gap-3 border-t border-white/10 pt-4">
            <label className="flex items-center justify-between gap-4 text-xs text-mist sm:text-sm">
              <span>Mesure d&apos;audience (Google Analytics)</span>
              <input
                type="checkbox"
                checked={analytics}
                onChange={(e) => setAnalytics(e.target.checked)}
                className="h-4 w-4 rounded border-white/20 bg-white/5 accent-violet"
              />
            </label>
            <label className="flex items-center justify-between gap-4 text-xs text-mist sm:text-sm">
              <span>Publicité personnalisée</span>
              <input
                type="checkbox"
                checked={ads}
                onChange={(e) => setAds(e.target.checked)}
                className="h-4 w-4 rounded border-white/20 bg-white/5 accent-violet"
              />
            </label>
          </div>
        )}

        <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:justify-end">
          {!customizing && (
            <Button variant="ghost" onClick={() => setCustomizing(true)}>
              Personnaliser
            </Button>
          )}
          {customizing ? (
            <Button variant="primary" onClick={saveCustom}>
              Enregistrer mes choix
            </Button>
          ) : (
            <>
              <Button variant="outline" onClick={rejectAll}>
                Refuser
              </Button>
              <Button variant="primary" onClick={acceptAll}>
                Accepter tout
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
