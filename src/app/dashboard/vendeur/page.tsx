"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  BarChart3,
  FileText,
  LayoutGrid,
  MessageSquare,
  Package,
  PlusCircle,
  Settings,
  Store,
  Users,
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { DashboardShell, type DashboardNavItem } from "@/components/dashboard/DashboardShell";
import { VendeurOverview } from "@/components/dashboard/vendeur/VendeurOverview";
import { MaBoutique } from "@/components/dashboard/vendeur/MaBoutique";
import { PublierAnnonce } from "@/components/dashboard/vendeur/PublierAnnonce";
import { VendeurSettings } from "@/components/dashboard/vendeur/VendeurSettings";
import { DemoTable } from "@/components/dashboard/DemoTable";
import { MiniBarChart } from "@/components/dashboard/MiniBarChart";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/components/providers/AuthProvider";
import { getListings, getServerListings, subscribeToListings } from "@/lib/listings-store";

const nav: DashboardNavItem[] = [
  { key: "overview", label: "Vue d'ensemble", icon: LayoutGrid },
  { key: "boutique", label: "Ma boutique", icon: Store },
  { key: "publier", label: "Publier une annonce", icon: PlusCircle },
  { key: "commandes", label: "Mes commandes", icon: Package },
  { key: "clients", label: "Mes clients", icon: Users },
  { key: "devis", label: "Mes demandes de devis", icon: FileText },
  { key: "messagerie", label: "Messagerie", icon: MessageSquare },
  { key: "statistiques", label: "Statistiques", icon: BarChart3 },
  { key: "parametres", label: "Paramètres", icon: Settings },
];

const commandes = [
  { commande: "#EN-1042", client: "Marc Lefèvre", montant: "890 €", statut: "En cours", date: "28/10/2026" },
  { commande: "#EN-1039", client: "Société Aravel", montant: "1 400 €", statut: "Livrée", date: "22/10/2026" },
  { commande: "#EN-1031", client: "Inès Carton", montant: "650 €", statut: "En attente", date: "15/10/2026" },
  { commande: "#EN-1025", client: "Studio Belline", montant: "2 100 €", statut: "Livrée", date: "02/10/2026" },
];

const clients = [
  { client: "Marc Lefèvre", email: "m.lefevre@example.com", commandes: "2", contact: "28/10/2026" },
  { client: "Société Aravel", email: "contact@aravel.example", commandes: "1", contact: "22/10/2026" },
  { client: "Inès Carton", email: "ines.carton@example.com", commandes: "3", contact: "15/10/2026" },
];

const devis = [
  { demande: "Refonte tableau de bord", client: "Studio Belline", budget: "~2 000 €", statut: "À traiter" },
  { demande: "Agent IA FAQ", client: "Marc Lefèvre", budget: "~900 €", statut: "Envoyé" },
  { demande: "Intégration API paiement", client: "Société Aravel", budget: "~700 €", statut: "À traiter" },
];

const revenueByCategory = [
  { label: "IA", value: 890 },
  { label: "Web", value: 1400 },
  { label: "SaaS", value: 2100 },
  { label: "API", value: 650 },
];

export default function VendeurDashboardPage() {
  const { user, ready } = useAuth();
  const router = useRouter();
  const [active, setActive] = useState("overview");

  const listings = useSyncExternalStore(subscribeToListings, getListings, getServerListings);
  const myListings = user ? listings.filter((l) => l.ownerId === user.id) : [];

  useEffect(() => {
    if (ready && !user) {
      router.replace("/connexion");
    }
  }, [ready, user, router]);

  if (!ready || !user) {
    return (
      <>
        <Navbar />
        <main className="flex-1 px-6 py-24 text-center text-sm text-mist">
          Chargement de votre tableau de bord…
        </main>
        <Footer />
      </>
    );
  }

  if (!user.roles.includes("prestataire")) {
    return (
      <>
        <Navbar />
        <main className="flex-1 px-6 py-24 text-center">
          <p className="text-sm text-mist">
            Activez le rôle Prestataire depuis votre compte pour accéder à ce
            tableau de bord.
          </p>
          <Button href="/compte" variant="primary" className="mt-4">
            Aller à mon compte
          </Button>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="flex-1">
        <DashboardShell
          title="Tableau de bord Prestataire"
          subtitle={`Bienvenue ${user.name.split(" ")[0]}, gérez votre activité sur ENTRE-NOUS DIGITAL & MARKETPLACE.`}
          nav={nav}
          active={active}
          onSelect={setActive}
        >
          {active === "overview" && <VendeurOverview listingCount={myListings.length} />}

          {active === "boutique" && (
            <MaBoutique listings={myListings} onPublishClick={() => setActive("publier")} />
          )}

          {active === "publier" && (
            <PublierAnnonce ownerId={user.id} onPublished={() => setActive("boutique")} />
          )}

          {active === "commandes" && (
            <DemoTable
              note="Données fictives — le suivi réel des commandes arrivera avec les paiements."
              columns={[
                { key: "commande", label: "Commande" },
                { key: "client", label: "Client" },
                { key: "montant", label: "Montant" },
                { key: "statut", label: "Statut" },
                { key: "date", label: "Date" },
              ]}
              rows={commandes}
            />
          )}

          {active === "clients" && (
            <DemoTable
              note="Données fictives — votre liste de clients se construira au fil de vos ventes."
              columns={[
                { key: "client", label: "Client" },
                { key: "email", label: "Email" },
                { key: "commandes", label: "Commandes" },
                { key: "contact", label: "Dernier contact" },
              ]}
              rows={clients}
            />
          )}

          {active === "devis" && (
            <DemoTable
              note="Données fictives — vos vraies demandes de devis arriveront via Connect."
              columns={[
                { key: "demande", label: "Demande" },
                { key: "client", label: "Client" },
                { key: "budget", label: "Budget estimé" },
                { key: "statut", label: "Statut" },
              ]}
              rows={devis}
            />
          )}

          {active === "messagerie" && (
            <div className="glass-card flex flex-col items-center gap-3 rounded-2xl p-10 text-center">
              <MessageSquare size={24} className="text-mist/40" />
              <p className="text-sm text-mist">
                Toute votre messagerie se trouve sur ENTRE-NOUS CONNECT.
              </p>
              <Link href="/connect">
                <Button variant="primary">Ouvrir Connect</Button>
              </Link>
            </div>
          )}

          {active === "statistiques" && (
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              <MiniBarChart title="Chiffre d'affaires par catégorie (fictif)" data={revenueByCategory} />
              <MiniBarChart
                title="Demandes reçues sur 7 jours (fictif)"
                data={[
                  { label: "Lun", value: 2 },
                  { label: "Mar", value: 1 },
                  { label: "Mer", value: 3 },
                  { label: "Jeu", value: 1 },
                  { label: "Ven", value: 4 },
                  { label: "Sam", value: 0 },
                  { label: "Dim", value: 1 },
                ]}
              />
            </div>
          )}

          {active === "parametres" && <VendeurSettings shopName={user.name} />}
        </DashboardShell>
      </main>
      <Footer />
    </>
  );
}
