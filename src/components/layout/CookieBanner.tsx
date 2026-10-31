"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";
import { Cookie } from "lucide-react";
import { Button } from "@/components/ui/Button";

const STORAGE_KEY = "entre-nous:cookies-acknowledged";

const listeners = new Set<() => void>();

function getSnapshot(): boolean {
  try {
    return window.localStorage.getItem(STORAGE_KEY) === "1";
  } catch {
    return false;
  }
}

function getServerSnapshot(): boolean {
  return false;
}

function subscribe(callback: () => void) {
  listeners.add(callback);
  return () => listeners.delete(callback);
}

function acknowledge() {
  try {
    window.localStorage.setItem(STORAGE_KEY, "1");
  } catch {
    // ignore — the banner will just reappear next visit
  }
  listeners.forEach((listener) => listener());
}

export function CookieBanner() {
  const dismissed = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  if (dismissed) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[60] px-4 pb-4 sm:px-6">
      <div className="glass-card-strong neon-ring mx-auto flex max-w-3xl flex-col items-start gap-3 rounded-2xl p-5 sm:flex-row sm:items-center">
        <Cookie size={20} className="hidden shrink-0 text-violet-bright sm:block" />
        <p className="flex-1 text-xs leading-relaxed text-mist sm:text-sm">
          ENTRE-NOUS utilise uniquement des cookies{" "}
          <strong className="text-white">essentiels</strong> à votre
          connexion (session Supabase). Aucun cookie publicitaire ou de
          suivi n&apos;est utilisé.{" "}
          <Link
            href="/confidentialite"
            className="font-semibold text-violet-bright hover:text-orange"
          >
            En savoir plus
          </Link>
        </p>
        <Button variant="primary" onClick={acknowledge} className="w-full shrink-0 sm:w-auto">
          J&apos;ai compris
        </Button>
      </div>
    </div>
  );
}
