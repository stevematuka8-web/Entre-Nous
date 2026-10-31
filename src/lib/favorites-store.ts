import { createClient } from "@/lib/supabase/client";

const listeners = new Set<() => void>();

function notify() {
  listeners.forEach((listener) => listener());
}

export function subscribeToFavorites(callback: () => void) {
  listeners.add(callback);
  return () => listeners.delete(callback);
}

let cache: string[] = [];

export function getFavoriteIds(): string[] {
  return cache;
}

const emptyFavoriteIds: string[] = [];

/** Stable empty-array reference for `useSyncExternalStore`'s server snapshot. */
export function getServerFavoriteIds(): string[] {
  return emptyFavoriteIds;
}

export function isFavorite(serviceId: string): boolean {
  return cache.includes(serviceId);
}

/** Loads the signed-in user's favorites from Supabase into the local cache. */
export async function loadFavorites(): Promise<void> {
  const supabase = createClient();
  const { data } = await supabase.from("favorites").select("service_id");
  cache = (data ?? []).map((row) => row.service_id as string);
  notify();
}

export function clearFavorites() {
  cache = [];
  notify();
}

export async function toggleFavorite(userId: string, serviceId: string): Promise<void> {
  const supabase = createClient();

  if (cache.includes(serviceId)) {
    cache = cache.filter((id) => id !== serviceId);
    notify();
    await supabase.from("favorites").delete().eq("user_id", userId).eq("service_id", serviceId);
  } else {
    cache = [serviceId, ...cache];
    notify();
    await supabase.from("favorites").insert({ user_id: userId, service_id: serviceId });
  }
}
