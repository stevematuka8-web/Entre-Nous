import { createClient } from "@/lib/supabase/client";

export type ListingSpace = "digital" | "marketplace";

export interface UserListing {
  id: string;
  ownerId: string;
  title: string;
  category: string;
  space: ListingSpace;
  price: string;
  description: string;
  cover: string;
  createdAt: string;
}

const coverPalette = [
  "linear-gradient(135deg,#8b5cf6,#5b21b6)",
  "linear-gradient(135deg,#fb7a2a,#8b5cf6)",
  "linear-gradient(135deg,#5b21b6,#fb7a2a)",
  "linear-gradient(135deg,#a78bfa,#fb7a2a)",
  "linear-gradient(135deg,#fb7a2a,#ffb37a)",
];

const listeners = new Set<() => void>();

function notify() {
  listeners.forEach((listener) => listener());
}

export function subscribeToListings(callback: () => void) {
  listeners.add(callback);
  return () => listeners.delete(callback);
}

interface ListingRow {
  id: string;
  owner_id: string;
  title: string;
  category: string;
  space: ListingSpace;
  price: string;
  description: string;
  cover: string;
  created_at: string;
}

function toUserListing(row: ListingRow): UserListing {
  return {
    id: row.id,
    ownerId: row.owner_id,
    title: row.title,
    category: row.category,
    space: row.space,
    price: row.price,
    description: row.description,
    cover: row.cover,
    createdAt: row.created_at,
  };
}

let cache: UserListing[] = [];

export function getListings(): UserListing[] {
  return cache;
}

const emptyListings: UserListing[] = [];

/** Stable empty-array reference for `useSyncExternalStore`'s server snapshot. */
export function getServerListings(): UserListing[] {
  return emptyListings;
}

export function getListingsByOwner(ownerId: string): UserListing[] {
  return cache.filter((l) => l.ownerId === ownerId);
}

/** Loads every listing visible under RLS (public — everyone's listings). */
export async function loadListings(): Promise<void> {
  const supabase = createClient();
  const { data } = await supabase
    .from("listings")
    .select("id, owner_id, title, category, space, price, description, cover, created_at")
    .order("created_at", { ascending: false });
  cache = (data ?? []).map(toUserListing);
  notify();
}

export function clearListings() {
  cache = [];
  notify();
}

export interface CreateListingInput {
  title: string;
  category: string;
  space: ListingSpace;
  price: string;
  description: string;
}

export async function createListing(
  ownerId: string,
  input: CreateListingInput
): Promise<UserListing | null> {
  const supabase = createClient();
  const cover = coverPalette[Math.floor(Math.random() * coverPalette.length)];
  const { data, error } = await supabase
    .from("listings")
    .insert({ owner_id: ownerId, cover, ...input })
    .select("id, owner_id, title, category, space, price, description, cover, created_at")
    .single();

  if (error || !data) return null;

  const listing = toUserListing(data);
  cache = [listing, ...cache];
  notify();
  return listing;
}

export async function deleteListing(id: string): Promise<void> {
  const supabase = createClient();
  cache = cache.filter((l) => l.id !== id);
  notify();
  await supabase.from("listings").delete().eq("id", id);
}
