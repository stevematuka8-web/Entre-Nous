"use client";

import { useState, useSyncExternalStore } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { CheckCircle2, Handshake, Percent } from "lucide-react";
import type { Service } from "@/lib/mock-data";
import { useAuth } from "@/components/providers/AuthProvider";
import {
  getDeals,
  getServerDeals,
  hasProposedDeal,
  proposeDeal,
  subscribeToDeals,
} from "@/lib/business-store";

export function OpportunityCard({ service, index = 0 }: { service: Service; index?: number }) {
  const { user } = useAuth();
  // Subscribed so the button updates live once this exact deal is proposed.
  useSyncExternalStore(subscribeToDeals, getDeals, getServerDeals);
  const [justProposed, setJustProposed] = useState(false);

  const proposed = hasProposedDeal(service.id);

  const handlePropose = () => {
    if (!user) return;
    proposeDeal(user.id, service);
    setJustProposed(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: (index % 6) * 0.06 }}
      whileHover={{ y: -6 }}
      className="group glass-card overflow-hidden rounded-2xl transition-shadow duration-300 hover:neon-ring-orange"
    >
      <Link href={`/${service.space}/${service.id}`} className="block">
        <div className="h-28 w-full" style={{ background: service.cover }} />
        <div className="px-5 pt-5">
          <span className="text-[11px] font-semibold uppercase tracking-wide text-violet-bright">
            {service.category}
          </span>
          <h3 className="mt-2 font-display text-base font-semibold leading-snug text-white">
            {service.title}
          </h3>
          <p className="mt-1 text-xs text-mist">{service.provider}</p>
        </div>
      </Link>

      <div className="px-5 pb-5 pt-4">
        <div className="flex items-center justify-between border-t border-white/10 pt-4">
          <span className="flex items-center gap-1 text-xs font-semibold text-orange-soft">
            <Percent size={12} />
            Commission {service.commissionRate ?? "à définir"}
          </span>
          <span className="text-xs text-mist">{service.price}</span>
        </div>

        {!user ? (
          <Link
            href="/connexion"
            className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/10 px-4 py-2 text-xs font-semibold text-mist hover:border-orange/50 hover:text-white"
          >
            Connectez-vous pour proposer
          </Link>
        ) : proposed ? (
          <div className="mt-3 flex items-center justify-center gap-2 rounded-full border border-violet-bright/30 bg-violet/10 px-4 py-2 text-xs font-semibold text-violet-bright">
            <CheckCircle2 size={14} />
            {justProposed ? "Proposition envoyée" : "Déjà proposée"}
          </div>
        ) : (
          <button
            onClick={handlePropose}
            className="btn-glow mt-3 inline-flex w-full items-center justify-center gap-2 rounded-full px-4 py-2 text-xs font-semibold text-white transition-transform hover:scale-[1.02]"
          >
            <Handshake size={14} />
            Proposer cette mise en relation
          </button>
        )}
      </div>
    </motion.div>
  );
}
