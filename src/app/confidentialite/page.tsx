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
        <li>Nous ne vendons pas vos données personnelles.</li>
        <li>Nous ne traitons aucune donnée bancaire ou de paiement : aucune transaction financière réelle n&apos;a lieu sur la plateforme à ce stade.</li>
      </ul>

      <h2>Cookies</h2>
      <p>
        Lors de votre première visite, un bandeau vous permet d&apos;accepter
        ou de refuser les cookies non essentiels. Vous pouvez changer d&apos;avis
        à tout moment via le lien <strong>« Gérer les cookies »</strong> en
        bas de chaque page.
      </p>
      <ul>
        <li>
          <strong>Essentiels (toujours actifs)</strong> — un cookie de
          session déposé par Supabase Auth pour vous garder connecté·e.
          Indispensable au fonctionnement du site, il n&apos;exige pas de
          consentement préalable.
        </li>
        <li>
          <strong>Mesure d&apos;audience</strong> — si vous l&apos;acceptez,
          Google Analytics nous aide à comprendre l&apos;usage du site
          (pages visitées, provenance), de façon anonymisée.
        </li>
        <li>
          <strong>Publicité</strong> — si vous l&apos;acceptez, des
          annonces peuvent être affichées via Google AdSense, qui peut
          utiliser des cookies pour personnaliser les publicités
          présentées.
        </li>
      </ul>
      <p>
        Nous utilisons également Vercel Analytics, un outil de mesure
        agrégée qui ne dépose pas de cookie et ne nécessite pas de
        consentement.
      </p>

      <h2>Assistant de conversation</h2>
      <p>
        Le petit assistant disponible en bas à droite du site est propulsé
        par l&apos;API Gemini de Google. Les messages que vous lui envoyez
        sont transmis à Google pour générer une réponse, mais ne sont pas
        conservés par ENTRE-NOUS ni réutilisés à d&apos;autres fins. Évitez
        d&apos;y partager des informations sensibles.
      </p>

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
