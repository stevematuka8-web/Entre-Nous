"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Heart,
  LayoutGrid,
  MessageSquare,
  Package,
  Search,
  User,
  Users,
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { DashboardShell, type DashboardNavItem } from "@/components/dashboard/DashboardShell";
import { AcheteurOverview } from "@/components/dashboard/acheteur/AcheteurOverview";
import { MesFavoris } from "@/components/dashboard/acheteur/MesFavoris";
import { MesPrestataires } from "@/components/dashboard/acheteur/MesPrestataires";
import { DemoTable } from "@/components/dashboard/DemoTable";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/components/providers/AuthProvider";
import { getFavoriteIds, getServerFavoriteIds, subscribeToFavorites } from "@/lib/favorites-store";
import {
  getConversations,
  getServerConversations,
  subscribeToConversations,
} from "@/lib/messages-store";
import { getServiceById } from "@/lib/mock-data";

const nav: DashboardNavItem[] = [
  { key: "espace", label: "Mon espace", icon: LayoutGrid },
  { key: "recherches", label: "Mes recherches", icon: Search },
  { key: "favoris", label: "Mes favoris", icon: Heart },
  { key: "commandes", label: "Mes commandes", icon: Package },
  { key: "prestataires", label: "Mes prestataires", icon: Users },
  { key: "messagerie", label: "Ma messagerie", icon: MessageSquare },
  { key: "profil", label: "Mon profil", icon: User },
];

const recentSearches = [
  { terme: "Développeur IA", date: "30/10/2026" },
  { terme: "Identité visuelle", date: "27/10/2026" },
  { terme: "Mobilier design", date: "21/10/2026" },
];

const commandes = [
  { commande: "#EN-2051", prestataire: "Léa Kouadio", montant: "890 €", statut: "En cours" },
  { commande: "#EN-2048", prestataire: "Atelier Lune", montant: "68 €", statut: "Livrée" },
];

export default function AcheteurDashboardPage() {
  const { user, ready } = useAuth();
  const router = useRouter();
  const [active, setActive] = useState("espace");

  const favoriteIds = useSyncExternalStore(
    subscribeToFavorites,
    getFavoriteIds,
    getServerFavoriteIds
  );
  const favoriteServices = favoriteIds
    .map((id) => getServiceById(id))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));

  const conversations = useSyncExternalStore(
    subscribeToConversations,
    getConversations,
    getServerConversations
  );
  const providerContacts = conversations.filter((c) => c.id !== "conv-entre-nous-connect");

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
          Chargement de votre espace…
        </main>
        <Footer />
      </>
    );
  }

  if (!user.roles.includes("acheteur")) {
    return (
      <>
        <Navbar />
        <main className="flex-1 px-6 py-24 text-center">
          <p className="text-sm text-mist">
            Activez le rôle Acheteur depuis votre compte pour accéder à ce
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
          title="Tableau de bord Acheteur"
          subtitle="Vos favoris, vos échanges et vos prestataires, au même endroit."
          nav={nav}
          active={active}
          onSelect={setActive}
        >
          {active === "espace" && (
            <AcheteurOverview
              favoritesCount={favoriteServices.length}
              providersCount={providerContacts.length}
              conversationsCount={conversations.length}
              firstName={user.name.split(" ")[0]}
            />
          )}

          {active === "recherches" && (
            <DemoTable
              note="Données fictives — l'historique de recherche arrivera avec le moteur de recherche complet."
              columns={[
                { key: "terme", label: "Recherche" },
                { key: "date", label: "Date" },
              ]}
              rows={recentSearches}
            />
          )}

          {active === "favoris" && <MesFavoris favorites={favoriteServices} />}

          {active === "commandes" && (
            <DemoTable
              note="Données fictives — le suivi réel des commandes arrivera avec les paiements."
              columns={[
                { key: "commande", label: "Commande" },
                { key: "prestataire", label: "Prestataire" },
                { key: "montant", label: "Montant" },
                { key: "statut", label: "Statut" },
              ]}
              rows={commandes}
            />
          )}

          {active === "prestataires" && <MesPrestataires conversations={providerContacts} />}

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

          {active === "profil" && (
            <div className="glass-card flex flex-col items-center gap-3 rounded-2xl p-10 text-center">
              <User size={24} className="text-mist/40" />
              <p className="text-sm text-mist">
                Gérez vos informations et vos activités depuis votre compte.
              </p>
              <Link href="/compte">
                <Button variant="primary">Voir mon compte</Button>
              </Link>
            </div>
          )}
        </DashboardShell>
      </main>
      <Footer />
    </>
  );
}
