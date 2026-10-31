export interface ConsentState {
  answered: boolean;
  analytics: boolean;
  ads: boolean;
}

const STORAGE_KEY = "entre-nous:cookie-consent";

const defaultConsent: ConsentState = {
  answered: false,
  analytics: false,
  ads: false,
};

const listeners = new Set<() => void>();

function notify() {
  listeners.forEach((listener) => listener());
}

export function subscribeToConsent(callback: () => void) {
  listeners.add(callback);
  return () => listeners.delete(callback);
}

// Cache the parsed snapshot so `useSyncExternalStore` gets a stable reference
// when the underlying storage hasn't actually changed.
let cachedRaw: string | null | undefined;
let cachedConsent: ConsentState = defaultConsent;

export function getConsent(): ConsentState {
  if (typeof window === "undefined") return defaultConsent;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw === cachedRaw) return cachedConsent;
    cachedRaw = raw;
    cachedConsent = raw ? { ...defaultConsent, ...JSON.parse(raw) } : defaultConsent;
    return cachedConsent;
  } catch {
    cachedRaw = null;
    cachedConsent = defaultConsent;
    return defaultConsent;
  }
}

export function getServerConsent(): ConsentState {
  return defaultConsent;
}

export function setConsent(next: Omit<ConsentState, "answered">) {
  const value: ConsentState = { ...next, answered: true };
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
  } catch {
    // ignore — the banner will just reappear next visit
  }
  notify();
}

/** Reopens the consent banner so the visitor can change their choice. */
export function resetConsent() {
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
  notify();
}
