"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, CheckCircle2, MessageCircle, Send } from "lucide-react";
import type { Service } from "@/lib/mock-data";
import { useAuth } from "@/components/providers/AuthProvider";
import { ensureConversation, sendMessage } from "@/lib/messages-store";
import { proposeDeal } from "@/lib/business-store";

type ActionKind = "contact" | "devis" | "apporteur";

const confirmations: Record<ActionKind, string> = {
  contact: "Votre message a été envoyé au prestataire.",
  devis: "Votre demande de devis a été transmise.",
  apporteur: "Votre mise en relation a été enregistrée.",
};

export function ContactPanel({ service }: { service: Service }) {
  const { user } = useAuth();
  const [sent, setSent] = useState<ActionKind | null>(null);
  const [conversationId, setConversationId] = useState<string | null>(null);

  const handleContactAction = async (kind: "contact" | "devis") => {
    setSent(kind);

    if (!user) {
      setConversationId(null);
      return;
    }

    const text =
      kind === "contact"
        ? `Bonjour, je suis intéressé(e) par votre service « ${service.title} ». Pouvons-nous en discuter ?`
        : `Bonjour, pourriez-vous me faire un devis pour « ${service.title} » ?`;

    const id = await ensureConversation(user.id, service.provider, service.providerRole, {
      label: service.title,
      href: `/${service.space}/${service.id}`,
    });
    await sendMessage(user.id, id, text);
    setConversationId(id);
  };

  const handleProposeDeal = () => {
    setSent("apporteur");
    if (user) proposeDeal(user.id, service);
  };

  return (
    <div className="glass-card-strong neon-ring sticky top-24 rounded-2xl p-6">
      <div className="text-xs font-medium uppercase tracking-wide text-mist">
        Tarif
      </div>
      <div className="mt-1 font-display text-2xl font-bold text-white">
        {service.price}
      </div>
      {service.deliveryTime && (
        <div className="mt-1 text-xs text-mist">
          Délai estimé : {service.deliveryTime}
        </div>
      )}

      <div className="mt-6 flex flex-col gap-3">
        <button
          onClick={() => handleContactAction("contact")}
          className="btn-glow inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-white transition-transform hover:scale-[1.02]"
        >
          <MessageCircle size={16} />
          Contacter
        </button>
        <button
          onClick={() => handleContactAction("devis")}
          className="inline-flex items-center justify-center gap-2 rounded-full border border-violet-bright/40 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:border-orange hover:bg-white/5"
        >
          <Send size={16} />
          Demander un devis
        </button>
      </div>

      <AnimatePresence mode="wait">
        {sent && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="mt-4 flex items-start gap-2 rounded-xl border border-violet-bright/20 bg-violet/10 p-3 text-xs text-mist">
              <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-violet-bright" />
              <div>
                <span>{confirmations[sent]}</span>
                {sent === "apporteur" ? (
                  <Link
                    href={user ? "/business" : "/connexion"}
                    className="mt-1 block font-semibold text-violet-bright hover:text-orange"
                  >
                    {user
                      ? "Voir dans Business →"
                      : "Connectez-vous pour suivre votre commission →"}
                  </Link>
                ) : conversationId ? (
                  <Link
                    href={`/connect?c=${conversationId}`}
                    className="mt-1 block font-semibold text-violet-bright hover:text-orange"
                  >
                    Voir dans Connect →
                  </Link>
                ) : (
                  <Link
                    href="/connexion"
                    className="mt-1 block font-semibold text-violet-bright hover:text-orange"
                  >
                    Connectez-vous pour suivre la conversation →
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-6 border-t border-white/10 pt-5">
        <div className="flex items-center gap-2 text-sm font-semibold text-white">
          <Briefcase size={16} className="text-orange-soft" />
          Apporteur d&apos;affaires
        </div>
        <p className="mt-2 text-xs leading-relaxed text-mist">
          Mettez ce service en relation avec un acheteur et touchez une
          commission {service.commissionRate ? `(${service.commissionRate})` : ""} sur
          chaque affaire conclue.
        </p>
        <button
          onClick={handleProposeDeal}
          className="mt-3 text-xs font-semibold text-violet-bright transition-colors hover:text-orange"
        >
          Proposer ce service en tant qu&apos;apporteur d&apos;affaires →
        </button>
      </div>
    </div>
  );
}
