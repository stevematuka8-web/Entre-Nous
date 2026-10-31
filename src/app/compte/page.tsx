"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowUpRight, Briefcase, Calendar, Mail, ShoppingBag, Users } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { RoleSelector } from "@/components/auth/RoleSelector";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/components/providers/AuthProvider";
import { roleLabels, type UserRole } from "@/lib/auth-store";

const roleCardIcons: Record<UserRole, typeof ShoppingBag> = {
  prestataire: ShoppingBag,
  acheteur: Users,
  apporteur: Briefcase,
};

const roleCardConfig: Record<UserRole, { href: string; description: string }> = {
  prestataire: {
    href: "/dashboard/vendeur",
    description:
      "Gérez votre boutique, publiez vos annonces et suivez votre activité.",
  },
  acheteur: {
    href: "/dashboard/acheteur",
    description:
      "Retrouvez vos favoris, vos prestataires contactés et vos commandes.",
  },
  apporteur: {
    href: "/business",
    description:
      "Parcourez les opportunités et suivez vos mises en relation sur ENTRE-NOUS BUSINESS.",
  },
};

export default function ComptePage() {
  const { user, ready, setRoles, logout } = useAuth();
  const router = useRouter();
  const [draftRoles, setDraftRoles] = useState<UserRole[]>([]);
  const [saved, setSaved] = useState(false);
  const [syncedUserId, setSyncedUserId] = useState<string | null>(null);

  useEffect(() => {
    if (ready && !user) {
      router.replace("/connexion");
    }
  }, [ready, user, router]);

  // Adjust local draft state when the signed-in user changes, computed
  // during render rather than in an effect (see react.dev/learn/you-might-not-need-an-effect).
  if (user && user.id !== syncedUserId) {
    setSyncedUserId(user.id);
    setDraftRoles(user.roles);
  }

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

  const memberSince = new Date(user.createdAt).toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const handleSaveRoles = async () => {
    await setRoles(draftRoles);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <>
      <Navbar />
      <main className="flex-1 px-6 py-16">
        <div className="mx-auto max-w-4xl">
          <div className="glass-card-strong rounded-3xl p-8">
            <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4">
                <span className="flex h-16 w-16 items-center justify-center rounded-full btn-glow font-display text-xl font-bold text-white">
                  {user.name.slice(0, 1).toUpperCase()}
                </span>
                <div>
                  <h1 className="font-display text-2xl font-bold text-white">
                    {user.name}
                  </h1>
                  <div className="mt-1 flex items-center gap-1.5 text-xs text-mist">
                    <Mail size={13} />
                    {user.email}
                  </div>
                  <div className="mt-1 flex items-center gap-1.5 text-xs text-mist">
                    <Calendar size={13} />
                    Membre depuis le {memberSince}
                  </div>
                </div>
              </div>
              <Button variant="outline" onClick={logout}>
                Déconnexion
              </Button>
            </div>
          </div>

          <div className="mt-8 glass-card rounded-3xl p-8">
            <h2 className="font-display text-lg font-semibold text-white">
              Compte intelligent — vos activités
            </h2>
            <p className="mt-1 text-sm text-mist">
              Activez ou désactivez vos rôles à tout moment, sans jamais vous
              déconnecter.
            </p>

            <div className="mt-5">
              <RoleSelector value={draftRoles} onChange={setDraftRoles} />
            </div>

            <div className="mt-5 flex items-center gap-4">
              <Button variant="primary" onClick={handleSaveRoles}>
                Enregistrer mes activités
              </Button>
              {saved && (
                <span className="text-xs text-violet-bright">
                  Activités mises à jour ✓
                </span>
              )}
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-3">
            {user.roles.length === 0 && (
              <p className="text-sm text-mist sm:col-span-3">
                Activez au moins une activité ci-dessus pour accéder à votre
                tableau de bord.
              </p>
            )}
            {user.roles.map((role) => {
              const Icon = roleCardIcons[role];
              const config = roleCardConfig[role];
              return (
                <Link
                  key={role}
                  href={config.href}
                  className="group glass-card rounded-2xl p-6 transition-colors hover:border-orange/30"
                >
                  <div className="flex items-start justify-between">
                    <Icon size={20} className="text-violet-bright" />
                    <ArrowUpRight
                      size={16}
                      className="text-mist transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-orange-soft"
                    />
                  </div>
                  <h3 className="mt-3 font-display text-base font-semibold text-white">
                    Espace {roleLabels[role]}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-mist">
                    {config.description}
                  </p>
                  <span className="mt-3 inline-block rounded-full border border-violet-bright/30 bg-violet/10 px-3 py-1 text-[11px] text-violet-bright">
                    Disponible
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
