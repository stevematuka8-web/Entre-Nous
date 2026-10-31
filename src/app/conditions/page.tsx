import type { Metadata } from "next";
import { LegalPageShell } from "@/components/legal/LegalPageShell";

export const metadata: Metadata = {
  title: "Conditions d'utilisation — ENTRE-NOUS",
};

export default function ConditionsPage() {
  return (
    <LegalPageShell
      eyebrow="Entreprise"
      title="Conditions d'utilisation"
      updatedAt="31 octobre 2026"
    >
      <p>
        En créant un compte sur ENTRE-NOUS, vous acceptez les conditions
        décrites ci-dessous. ENTRE-NOUS est un <strong>prototype</strong> :
        ces conditions seront complétées avant tout lancement commercial.
      </p>

      <h2>Votre compte</h2>
      <p>
        Vous êtes responsable de la confidentialité de votre mot de passe et
        de toute activité effectuée depuis votre compte. Un seul compte peut
        cumuler plusieurs rôles (prestataire, acheteur, apporteur
        d&apos;affaires).
      </p>

      <h2>Utilisation de la plateforme</h2>
      <p>
        Vous vous engagez à ne publier que des annonces et des messages
        licites, à ne pas usurper l&apos;identité d&apos;un tiers, et à ne
        pas tenter de perturber le fonctionnement de la plateforme.
      </p>

      <h2>Aucune transaction réelle</h2>
      <p>
        À ce stade du projet, ENTRE-NOUS ne traite aucun paiement ni aucune
        transaction financière réelle. Les mises en relation, commissions et
        commandes affichées sur la plateforme sont données à titre
        illustratif, dans le cadre d&apos;un prototype en cours de
        validation.
      </p>

      <h2>Disponibilité du service</h2>
      <p>
        Le service est fourni « en l&apos;état », sans garantie de
        disponibilité continue. Des interruptions ou des évolutions peuvent
        survenir sans préavis pendant cette phase de prototype.
      </p>

      <h2>Résiliation</h2>
      <p>
        Vous pouvez cesser d&apos;utiliser ENTRE-NOUS à tout moment. Nous
        nous réservons le droit de suspendre un compte en cas
        d&apos;utilisation abusive de la plateforme.
      </p>

      <h2>Modifications</h2>
      <p>
        Ces conditions peuvent évoluer à mesure que le projet avance. La
        date de dernière mise à jour est indiquée en haut de cette page.
      </p>

      <h2>Contact</h2>
      <p>
        Pour toute question :{" "}
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
