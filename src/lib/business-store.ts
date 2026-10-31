import { createClient } from "@/lib/supabase/client";
import type { Service } from "@/lib/mock-data";

export type DealStatus = "en_attente" | "validee";

export const dealStatusLabels: Record<DealStatus, string> = {
  en_attente: "En attente",
  validee: "Validée",
};

export interface Deal {
  id: string;
  proposerId: string;
  serviceId: string;
  serviceTitle: string;
  serviceHref: string;
  provider: string;
  commissionRate: string;
  status: DealStatus;
  createdAt: string;
}

interface DealRow {
  id: string;
  proposer_id: string;
  service_id: string;
  service_title: string;
  service_href: string;
  provider: string;
  commission_rate: string;
  status: DealStatus;
  created_at: string;
}

function toDeal(row: DealRow): Deal {
  return {
    id: row.id,
    proposerId: row.proposer_id,
    serviceId: row.service_id,
    serviceTitle: row.service_title,
    serviceHref: row.service_href,
    provider: row.provider,
    commissionRate: row.commission_rate,
    status: row.status,
    createdAt: row.created_at,
  };
}

const listeners = new Set<() => void>();

function notify() {
  listeners.forEach((listener) => listener());
}

export function subscribeToDeals(callback: () => void) {
  listeners.add(callback);
  return () => listeners.delete(callback);
}

let cache: Deal[] = [];

export function getDeals(): Deal[] {
  return cache;
}

const emptyDeals: Deal[] = [];

/** Stable empty-array reference for `useSyncExternalStore`'s server snapshot. */
export function getServerDeals(): Deal[] {
  return emptyDeals;
}

export function hasProposedDeal(serviceId: string): boolean {
  return cache.some((d) => d.serviceId === serviceId);
}

/**
 * Loads every deal visible under RLS: the signed-in user's own deals, or —
 * for the platform admin — every deal on the platform.
 */
export async function loadDeals(): Promise<void> {
  const supabase = createClient();
  const { data } = await supabase
    .from("deals")
    .select(
      "id, proposer_id, service_id, service_title, service_href, provider, commission_rate, status, created_at"
    )
    .order("created_at", { ascending: false });
  cache = (data ?? []).map(toDeal);
  notify();
}

export function clearDeals() {
  cache = [];
  notify();
}

export async function proposeDeal(proposerId: string, service: Service): Promise<string> {
  const existing = cache.find((d) => d.serviceId === service.id);
  if (existing) return existing.id;

  const supabase = createClient();
  const { data, error } = await supabase
    .from("deals")
    .upsert(
      {
        proposer_id: proposerId,
        service_id: service.id,
        service_title: service.title,
        service_href: `/${service.space}/${service.id}`,
        provider: service.provider,
        commission_rate: service.commissionRate ?? "à définir avec le prestataire",
        status: "en_attente",
      },
      { onConflict: "proposer_id,service_id" }
    )
    .select(
      "id, proposer_id, service_id, service_title, service_href, provider, commission_rate, status, created_at"
    )
    .single();

  if (error || !data) return "";

  const deal = toDeal(data);
  cache = [deal, ...cache.filter((d) => d.id !== deal.id)];
  notify();

  if (typeof window !== "undefined") {
    window.setTimeout(
      async () => {
        const { data: updated } = await supabase
          .from("deals")
          .update({ status: "validee" })
          .eq("id", deal.id)
          .eq("status", "en_attente")
          .select("id")
          .maybeSingle();
        if (updated) {
          cache = cache.map((d) => (d.id === deal.id ? { ...d, status: "validee" } : d));
          notify();
        }
      },
      4500 + Math.random() * 2000
    );
  }

  return deal.id;
}
