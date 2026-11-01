import type { Metadata } from "next";
import { LegalPageShell } from "@/components/legal/LegalPageShell";

export const metadata: Metadata = {
  title: "À propos — ENTRE-NOUS",
  description:
    "Découvrez ENTRE-NOUS, la marketplace fintech qui connecte prestataires, acheteurs et apporteurs d'affaires dans le digital comme dans le business au quotidien.",
};

export default function AProposPage() {
  return (
    <LegalPageShell eyebrow="Entreprise" title="À propos d'ENTRE-NOUS">
      <p>
        ENTRE-NOUS est né d&apos;une idée simple : rassembler, au même
        endroit, celles et ceux qui proposent un service ou un produit et
        celles et ceux qui en cherchent — avec ou sans intermédiaire.
      </p>
      <p>
        La plateforme s&apos;organise autour de deux univers.{" "}
        <strong>ENTRE-NOUS DIGITAL</strong> réunit les services numériques :
        intelligence artificielle, développement web et mobile, solutions
        SaaS, transformation numérique, intégration d&apos;API et produits
        numériques. <strong>ENTRE-NOUS MARKETPLACE</strong> est plus
        généraliste : produits physiques ou numériques, services
        professionnels, commerce et artisanat.
      </p>
      <p>
        Trois rôles cohabitent sur un seul compte, sans jamais avoir besoin
        de se déconnecter : <strong>prestataire</strong> (vendre un service
        ou un produit), <strong>acheteur</strong> (trouver et contacter), et{" "}
        <strong>apporteur d&apos;affaires</strong> (mettre en relation et
        toucher une commission sur chaque affaire conclue).
      </p>

      <h2>Où en est le projet</h2>
      <p>
        ENTRE-NOUS est actuellement un <strong>prototype fonctionnel</strong>{" "}
        : l&apos;inscription, la connexion et les données de la plateforme
        (annonces, messages, favoris, mises en relation) sont réelles et
        persistées, mais le catalogue de services affiché est encore
        majoritairement fictif, et aucune transaction financière réelle
        n&apos;est traitée pour le moment. L&apos;objectif de cette étape est
        de valider l&apos;expérience avant de développer les fonctionnalités
        de production.
      </p>

      <h2>Nous contacter</h2>
      <p>
        Une question, une suggestion ? Écrivez-nous à{" "}
        <a
          href="mailto:contact@entre-nous.app"
          className="font-medium text-violet-bright hover:text-orange"
        >
          contact@entre-nous.app
        </a>
        .
      </p>
    </LegalPageShell>
  );
}
