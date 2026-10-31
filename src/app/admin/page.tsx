"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";
import { Handshake, LayoutGrid, Settings, ShieldAlert, Store, Users } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { DashboardShell, type DashboardNavItem } from "@/components/dashboard/DashboardShell";
import { AdminOverview } from "@/components/dashboard/admin/AdminOverview";
import { AdminUsers } from "@/components/dashboard/admin/AdminUsers";
import { AdminListings } from "@/components/dashboard/admin/AdminListings";
import { AdminDeals } from "@/components/dashboard/admin/AdminDeals";
import { AdminSettings } from "@/components/dashboard/admin/AdminSettings";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/components/providers/AuthProvider";
import { fetchAllProfiles, type UserProfile } from "@/lib/auth-store";
import { getListings, getServerListings, subscribeToListings } from "@/lib/listings-store";
import { getDeals, getServerDeals, subscribeToDeals } from "@/lib/business-store";
import { digitalServices, marketplaceServices } from "@/lib/mock-data";

const nav: DashboardNavItem[] = [
  { key: "overview", label: "Vue d'ensemble", icon: LayoutGrid },
  { key: "utilisateurs", label: "Utilisateurs", icon: Users },
  { key: "annonces", label: "Annonces & boutiques", icon: Store },
  { key: "commissions", label: "Mises en relation & commissions", icon: Handshake },
  { key: "parametres", label: "Paramètres", icon: Settings },
];

export default function AdminPage() {
  const { user, ready, isAdmin } = useAuth();
  const router = useRouter();
  const [active, setActive] = useState("overview");
  const [users, setUsers] = useState<UserProfile[]>([]);

  const listings = useSyncExternalStore(subscribeToListings, getListings, getServerListings);
  const deals = useSyncExternalStore(subscribeToDeals, getDeals, getServerDeals);

  useEffect(() => {
    if (ready && !user) {
      router.replace("/connexion");
    }
  }, [ready, user, router]);

  useEffect(() => {
    if (!isAdmin) return;
    let ignore = false;
    fetchAllProfiles().then((profiles) => {
      if (!ignore) setUsers(profiles);
    });
    return () => {
      ignore = true;
    };
  }, [isAdmin]);

  if (!ready || !user) {
    return (
      <>
        <Navbar />
        <main className="flex-1 px-6 py-24 text-center text-sm text-mist">
          Chargement…
        </main>
        <Footer />
      </>
    );
  }

  if (!isAdmin) {
    return (
      <>
        <Navbar />
        <main className="flex-1 px-6 py-24 text-center">
          <ShieldAlert size={28} className="mx-auto text-mist/40" />
          <p className="mt-4 text-sm text-mist">
            ENTRE-NOUS ADMIN est réservé à l&apos;administrateur de la
            plateforme.
          </p>
          <Button href="/compte" variant="primary" className="mt-4">
            Retour à mon compte
          </Button>
        </main>
        <Footer />
      </>
    );
  }

  const ownerNames = Object.fromEntries(users.map((u) => [u.id, u.name]));
  const catalogueCount = digitalServices.length + marketplaceServices.length;
  const dealsValidated = deals.filter((d) => d.status === "validee").length;

  return (
    <>
      <Navbar />
      <main className="flex-1">
        <DashboardShell
          title="ENTRE-NOUS ADMIN"
          subtitle="Centre de pilotage de la plateforme — administration simple et épurée."
          nav={nav}
          active={active}
          onSelect={setActive}
        >
          {active === "overview" && (
            <AdminOverview
              users={users}
              listingsCount={listings.length}
              catalogueCount={catalogueCount}
              dealsValidated={dealsValidated}
              dealsPending={deals.length - dealsValidated}
            />
          )}

          {active === "utilisateurs" && <AdminUsers users={users} adminId={user.id} />}

          {active === "annonces" && (
            <AdminListings listings={listings} ownerNames={ownerNames} />
          )}

          {active === "commissions" && (
            <AdminDeals deals={deals} proposerNames={ownerNames} />
          )}

          {active === "parametres" && <AdminSettings />}
        </DashboardShell>
      </main>
      <Footer />
    </>
  );
}
