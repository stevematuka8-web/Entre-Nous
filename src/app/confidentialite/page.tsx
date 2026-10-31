import type { Metadata } from "next";
import { LegalPageShell } from "@/components/legal/LegalPageShell";

export const metadata: Metadata = {
  title: "Politique de confidentialité — ENTRE-NOUS",
};

export default function ConfidentialitePage() {
  return (
    <LegalPageShell
      eyebrow="Entreprise"
      title="Politique de confidentialité"
      updatedAt="31 octobre 2026"
    >
      <p>
        ENTRE-NOUS est actuellement un <strong>prototype</strong>. Cette
        politique décrit honnêtement comment vos données sont traitées à ce
        stade — merci de ne pas utiliser un mot de passe que vous utilisez
        ailleurs.
      </p>

      <h2>Quelles données nous collectons</h2>
      <p>Lorsque vous créez un compte, nous enregistrons :</p>
      <ul>
        <li>Votre nom, votre email et votre mot de passe (géré par Supabase Auth, jamais stocké en clair par nos soins) ;</li>
        <li>Les activités que vous choisissez (prestataire, acheteur, apporteur d&apos;affaires) ;</li>
        <li>Les annonces que vous publiez, vos favoris, vos messages et vos mises en relation.</li>
      </ul>

      <h2>Qui peut voir ces données</h2>
      <p>
        Votre nom, votre email et vos activités sont visibles par
        l&apos;administrateur de la plateforme (à ce stade, le premier
        compte inscrit) depuis le tableau de bord d&apos;administration.
        Vos messages, favoris et mises en relation restent privés, sauf vos
        mises en relation en tant qu&apos;apporteur d&apos;affaires,
        également visibles par l&apos;administrateur à des fins de suivi des
        commissions. Les annonces que vous publiez sont publiques.
      </p>

      <h2>Où sont hébergées vos données</h2>
      <p>
        Les comptes et les données de la plateforme sont hébergés chez{" "}
        <a
          href="https://supabase.com"
          target="_blank"
          rel="noreferrer"
          className="font-medium text-violet-bright hover:text-orange"
        >
          Supabase
        </a>
        , un fournisseur tiers d&apos;infrastructure (base de données
        PostgreSQL et authentification).
      </p>

      <h2>Ce que nous ne faisons pas</h2>
      <ul>
        <li>Nous ne vendons ni ne partageons vos données avec des tiers à des fins publicitaires.</li>
        <li>Nous ne traitons aucune donnée bancaire ou de paiement : aucune transaction financière réelle n&apos;a lieu sur la plateforme à ce stade.</li>
      </ul>

      <h2>Vos droits</h2>
      <p>
        Vous pouvez demander l&apos;accès, la correction ou la suppression de
        vos données à tout moment en nous écrivant à{" "}
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
