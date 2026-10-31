"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";
import { Clock, Handshake } from "lucide-react";
import { useAuth } from "@/components/providers/AuthProvider";
import { dealStatusLabels, getDeals, getServerDeals, subscribeToDeals } from "@/lib/business-store";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

export function MyDeals() {
  const { user } = useAuth();
  const deals = useSyncExternalStore(subscribeToDeals, getDeals, getServerDeals);

  if (!user) {
    return (
      <div className="glass-card rounded-2xl p-8 text-center text-sm text-mist">
        <Link href="/connexion" className="font-semibold text-violet-bright hover:text-orange">
          Connectez-vous
        </Link>{" "}
        pour suivre vos mises en relation et vos commissions.
      </div>
    );
  }

  if (deals.length === 0) {
    return (
      <div className="glass-card flex flex-col items-center gap-3 rounded-2xl p-10 text-center text-sm text-mist">
        <Handshake size={24} className="text-mist/40" />
        Vous n&apos;avez proposé aucune mise en relation pour le moment.
        <Link href="#opportunites" className="font-semibold text-violet-bright hover:text-orange">
          Parcourir les opportunités →
        </Link>
      </div>
    );
  }

  const validated = deals.filter((d) => d.status === "validee").length;

  return (
    <div>
      <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
        <div className="glass-card rounded-xl p-4">
          <div className="font-display text-xl font-bold text-white">{deals.length}</div>
          <div className="text-xs text-mist">Mises en relation</div>
        </div>
        <div className="glass-card rounded-xl p-4">
          <div className="font-display text-xl font-bold text-white">{validated}</div>
          <div className="text-xs text-mist">Commissions validées</div>
        </div>
        <div className="glass-card rounded-xl p-4">
          <div className="font-display text-xl font-bold text-white">
            {deals.length - validated}
          </div>
          <div className="text-xs text-mist">En attente</div>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        {deals.map((deal) => (
          <div
            key={deal.id}
            className="glass-card flex flex-col gap-2 rounded-2xl p-5 sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <Link
                href={deal.serviceHref}
                className="font-display text-sm font-semibold text-white hover:text-violet-bright"
              >
                {deal.serviceTitle}
              </Link>
              <div className="mt-1 text-xs text-mist">
                {deal.provider} · Commission {deal.commissionRate}
              </div>
              <div className="mt-1 flex items-center gap-1 text-[11px] text-mist/60">
                <Clock size={11} />
                Proposée le {formatDate(deal.createdAt)}
              </div>
            </div>

            <span
              className={`inline-flex w-fit items-center rounded-full px-3 py-1 text-xs font-semibold ${
                deal.status === "validee"
                  ? "bg-violet/15 text-violet-bright"
                  : "bg-white/5 text-mist"
              }`}
            >
              {dealStatusLabels[deal.status]}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
