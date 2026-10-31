import Link from "next/link";
import { MessageCircle, Users } from "lucide-react";
import type { Conversation } from "@/lib/messages-store";
import { slugifyProviderName } from "@/lib/mock-data";

export function MesPrestataires({ conversations }: { conversations: Conversation[] }) {
  const contacts = conversations.filter((c) => c.id !== "conv-entre-nous-connect");

  if (contacts.length === 0) {
    return (
      <div className="glass-card flex flex-col items-center gap-3 rounded-2xl p-12 text-center">
        <Users size={28} className="text-mist/40" />
        <h3 className="font-display text-base font-semibold text-white">
          Aucun prestataire contacté pour le moment
        </h3>
        <p className="max-w-sm text-sm text-mist">
          Contactez un prestataire depuis une fiche service ou son profil
          pour le retrouver ici.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {contacts.map((c) => {
        const initials = c.participantName
          .split(" ")
          .map((w) => w[0])
          .slice(0, 2)
          .join("")
          .toUpperCase();

        return (
          <div key={c.id} className="glass-card rounded-2xl p-5">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full btn-glow text-xs font-bold text-white">
                {initials}
              </span>
              <div>
                <div className="text-sm font-semibold text-white">{c.participantName}</div>
                <div className="text-xs text-mist">{c.participantRole}</div>
              </div>
            </div>

            <div className="mt-4 flex gap-3 border-t border-white/10 pt-4 text-xs">
              <Link
                href={`/profil/${slugifyProviderName(c.participantName)}`}
                className="font-semibold text-violet-bright hover:text-orange"
              >
                Voir le profil
              </Link>
              <Link
                href={`/connect?c=${c.id}`}
                className="flex items-center gap-1 font-semibold text-mist hover:text-white"
              >
                <MessageCircle size={13} />
                Message
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
}
