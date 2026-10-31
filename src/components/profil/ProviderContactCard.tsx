"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, MessageCircle } from "lucide-react";
import type { ProviderProfile } from "@/lib/mock-data";
import { useAuth } from "@/components/providers/AuthProvider";
import { ensureConversation, sendMessage } from "@/lib/messages-store";

export function ProviderContactCard({ provider }: { provider: ProviderProfile }) {
  const { user } = useAuth();
  const [sent, setSent] = useState(false);
  const [conversationId, setConversationId] = useState<string | null>(null);

  const handleSend = async () => {
    setSent(true);

    if (!user) {
      setConversationId(null);
      return;
    }

    const id = await ensureConversation(user.id, provider.name, provider.role);
    await sendMessage(
      user.id,
      id,
      `Bonjour ${provider.name}, je suis tombé(e) sur votre profil ENTRE-NOUS et j'aimerais en savoir plus sur vos services.`
    );
    setConversationId(id);
  };

  return (
    <div className="glass-card-strong neon-ring sticky top-24 rounded-2xl p-6">
      <div className="text-sm font-semibold text-white">
        Contacter {provider.name}
      </div>
      <p className="mt-2 text-xs leading-relaxed text-mist">
        Envoyez un message directement au prestataire pour discuter de votre
        projet, avant de passer par une fiche service précise.
      </p>

      <button
        onClick={handleSend}
        className="btn-glow mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-white transition-transform hover:scale-[1.02]"
      >
        <MessageCircle size={16} />
        Envoyer un message
      </button>

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
                <span>Votre message a été envoyé à {provider.name}.</span>
                {conversationId ? (
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
    </div>
  );
}
