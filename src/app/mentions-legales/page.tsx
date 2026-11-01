import type { Metadata } from "next";
import { LegalPageShell } from "@/components/legal/LegalPageShell";

export const metadata: Metadata = {
  title: "Mentions légales — ENTRE-NOUS",
  description: "Mentions légales d'ENTRE-NOUS : éditeur, hébergement et propriété intellectuelle.",
};

export default function MentionsLegalesPage() {
  return (
    <LegalPageShell
      eyebrow="Entreprise"
      title="Mentions légales"
      updatedAt="1 novembre 2026"
    >
      <h2>1. Éditeur du site</h2>
      <p>ENTRE-NOUS est un produit en développement de M2K Fintech, édité par :</p>
      <ul>
        <li>Nom commercial : M2K Fintech — Nom et prénom de l&apos;exploitant : Steve Matuka Matsanza</li>
        <li>Forme juridique : Entreprise individuelle (entrepreneur individuel)</li>
        <li>SIRET : 132 185 406 00015 — SIREN : 132 185 406 (immatriculé au Registre National des Entreprises)</li>
        <li>Siège social : 21 avenue Pierre Point, 77127 Lieusaint, France</li>
        <li>
          Adresse e-mail de contact :{" "}
          <a
            href="mailto:service.commercial@m2k-fintech.fr"
            className="font-medium text-violet-bright hover:text-orange"
          >
            service.commercial@m2k-fintech.fr
          </a>
        </li>
        <li>Téléphone : +33 6 99 88 20 87</li>
        <li>
          Site de la maison mère :{" "}
          <a
            href="https://www.m2k-fintech.com"
            target="_blank"
            rel="noreferrer"
            className="font-medium text-violet-bright hover:text-orange"
          >
            m2k-fintech.com
          </a>
        </li>
      </ul>

      <h2>2. Directeur de la publication</h2>
      <p>
        S&apos;agissant d&apos;une entreprise individuelle, le directeur de la
        publication est l&apos;exploitant lui-même : Steve Matuka Matsanza.
      </p>

      <h2>3. Hébergement</h2>
      <p>Le site est hébergé par :</p>
      <ul>
        <li>Raison sociale : Vercel Inc. — 440 N Barranca Avenue #4133, Covina, CA 91723, États-Unis — <a href="https://vercel.com/legal" target="_blank" rel="noreferrer" className="font-medium text-violet-bright hover:text-orange">vercel.com</a></li>
      </ul>
      <p>
        Les données applicatives (comptes, annonces, messages) sont stockées
        via Supabase Inc., 970 Toa Payoh North #07-04, Singapour —{" "}
        <a
          href="https://supabase.com/legal"
          target="_blank"
          rel="noreferrer"
          className="font-medium text-violet-bright hover:text-orange"
        >
          supabase.com
        </a>
        . Le détail des données traitées est précisé dans notre{" "}
        <a href="/confidentialite" className="font-medium text-violet-bright hover:text-orange">
          politique de confidentialité
        </a>
        .
      </p>

      <h2>4. Activité réglementée</h2>
      <p>
        À la date de publication de ce site, ENTRE-NOUS est un prototype qui
        ne traite aucune transaction financière réelle. M2K Fintech
        n&apos;est titulaire d&apos;aucun agrément délivré par l&apos;Autorité
        de contrôle prudentiel et de résolution (ACPR) ou l&apos;Autorité des
        marchés financiers (AMF) pour ce produit, et n&apos;est enregistrée
        auprès d&apos;aucun registre réglementaire (ORIAS, REGAFI) à ce
        titre. Cette mention sera mise à jour dès lors qu&apos;un service
        financier soumis à agrément serait effectivement proposé.
      </p>

      <h2>5. Propriété intellectuelle</h2>
      <p>
        L&apos;ensemble des contenus présents sur ce site (textes, images,
        logos, marques, graphismes, structure du site) sont, sauf mention
        contraire, la propriété exclusive de M2K Fintech (Steve Matuka
        Matsanza, entreprise individuelle) ou de ses partenaires, et sont
        protégés par le droit de la propriété intellectuelle. Toute
        reproduction, représentation, modification ou exploitation, totale ou
        partielle, de ces éléments, sans autorisation écrite préalable, est
        interdite et susceptible de constituer une contrefaçon.
      </p>

      <h2>6. Données personnelles</h2>
      <p>
        Le traitement des données personnelles collectées sur ce site est
        détaillé dans notre{" "}
        <a href="/confidentialite" className="font-medium text-violet-bright hover:text-orange">
          politique de confidentialité
        </a>
        .
      </p>

      <h2>7. Cookies</h2>
      <p>
        Ce site dépose des cookies essentiels ainsi que, sous réserve de
        votre consentement, des cookies de mesure d&apos;audience et de
        publicité. Vous pouvez gérer vos préférences à tout moment via le
        lien « Gérer les cookies » en bas de page.
      </p>

      <h2>8. Limitation de responsabilité</h2>
      <p>
        M2K Fintech (Steve Matuka Matsanza) s&apos;efforce d&apos;assurer
        l&apos;exactitude des informations diffusées sur ce site, sans
        pouvoir en garantir l&apos;exhaustivité. ENTRE-NOUS étant un
        prototype, le service est fourni « en l&apos;état », sans garantie de
        disponibilité continue.
      </p>
    </LegalPageShell>
  );
}
