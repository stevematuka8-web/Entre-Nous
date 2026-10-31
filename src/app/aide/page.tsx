import type { Metadata } from "next";
import Link from "next/link";
import { LegalPageShell } from "@/components/legal/LegalPageShell";

export const metadata: Metadata = {
  title: "Centre d'aide — ENTRE-NOUS",
};

const faqs = [
  {
    q: "Comment créer un compte ?",
    a: "Cliquez sur « S'inscrire », renseignez vos informations et choisissez une ou plusieurs activités (Prestataire, Acheteur, Apporteur d'affaires). Vous pourrez les modifier à tout moment depuis votre compte.",
  },
  {
    q: "Puis-je cumuler plusieurs rôles ?",
    a: "Oui — c'est le principe du compte intelligent ENTRE-NOUS. Un même compte peut vendre, acheter et mettre en relation, sans avoir besoin de se déconnecter pour changer d'espace.",
  },
  {
    q: "Comment publier une annonce ?",
    a: "Activez le rôle Prestataire depuis votre compte, puis rendez-vous dans votre tableau de bord, section « Publier une annonce ».",
  },
  {
    q: "Comment contacter un prestataire ?",
    a: "Depuis une fiche service ou un profil, utilisez le bouton « Contacter » ou « Envoyer un message ». La conversation apparaît ensuite dans ENTRE-NOUS CONNECT.",
  },
  {
    q: "Qu'est-ce qu'un apporteur d'affaires ?",
    a: "Un apporteur d'affaires met en relation un prestataire et un acheteur, et touche une commission si l'affaire aboutit. Retrouvez les opportunités disponibles sur ENTRE-NOUS BUSINESS.",
  },
  {
    q: "Puis-je payer directement sur la plateforme ?",
    a: "Pas pour le moment : ENTRE-NOUS est en phase de prototype et ne traite aucune transaction financière réelle.",
  },
];

export default function AidePage() {
  return (
    <LegalPageShell eyebrow="Ressources" title="Centre d'aide">
      <div className="space-y-6">
        {faqs.map((item) => (
          <div key={item.q}>
            <h2 className="font-display text-base font-semibold text-white">
              {item.q}
            </h2>
            <p className="mt-1.5">{item.a}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 border-t border-white/10 pt-6 text-sm">
        Une autre question ?{" "}
        <a
          href="mailto:contact@entre-nous.app"
          className="font-medium text-violet-bright hover:text-orange"
        >
          contact@entre-nous.app
        </a>{" "}
        — ou explorez{" "}
        <Link href="/digital" className="font-medium text-violet-bright hover:text-orange">
          ENTRE-NOUS DIGITAL
        </Link>{" "}
        et{" "}
        <Link href="/marketplace" className="font-medium text-violet-bright hover:text-orange">
          MARKETPLACE
        </Link>
        .
      </div>
    </LegalPageShell>
  );
}
