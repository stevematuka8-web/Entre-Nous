"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut, Menu, ShieldCheck, User, X } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/components/providers/AuthProvider";

const links = [
  { label: "Accueil", href: "/" },
  { label: "Digital", href: "/digital" },
  { label: "Marketplace", href: "/marketplace" },
  { label: "Business", href: "/business" },
  { label: "Connect", href: "/connect" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout, ready, isAdmin } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    setOpen(false);
    router.push("/");
  };

  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-nuit/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Logo />

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-mist transition-colors hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          {!ready ? null : user ? (
            <div className="relative">
              <button
                onClick={() => setMenuOpen((v) => !v)}
                className="flex items-center gap-2 rounded-full border border-white/10 py-1.5 pl-1.5 pr-3 transition-colors hover:border-violet-bright/40"
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-full btn-glow text-xs font-bold text-white">
                  {user.name.slice(0, 1).toUpperCase()}
                </span>
                <span className="text-sm font-medium text-white">
                  {user.name.split(" ")[0]}
                </span>
              </button>

              {menuOpen && (
                <div className="glass-card-strong absolute right-0 top-12 w-48 rounded-xl p-2">
                  <a
                    href="/compte"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-mist transition-colors hover:bg-white/5 hover:text-white"
                  >
                    <User size={15} />
                    Mon compte
                  </a>
                  {isAdmin && (
                    <a
                      href="/admin"
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-mist transition-colors hover:bg-white/5 hover:text-white"
                    >
                      <ShieldCheck size={15} />
                      Administration
                    </a>
                  )}
                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-mist transition-colors hover:bg-white/5 hover:text-orange-soft"
                  >
                    <LogOut size={15} />
                    Déconnexion
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Button href="/connexion" variant="ghost">
                Connexion
              </Button>
              <Button href="/inscription" variant="primary">
                S&apos;inscrire
              </Button>
            </>
          )}
        </div>

        <button
          className="text-white md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Ouvrir le menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="border-t border-white/5 px-6 py-4 md:hidden">
          <nav className="flex flex-col gap-4">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-mist hover:text-white"
              >
                {link.label}
              </a>
            ))}
            <div className="mt-2 flex flex-col gap-3">
              {user ? (
                <>
                  <a
                    href="/compte"
                    className="flex items-center gap-2 text-sm font-medium text-mist hover:text-white"
                  >
                    <User size={15} />
                    Mon compte ({user.name.split(" ")[0]})
                  </a>
                  {isAdmin && (
                    <a
                      href="/admin"
                      className="flex items-center gap-2 text-sm font-medium text-mist hover:text-white"
                    >
                      <ShieldCheck size={15} />
                      Administration
                    </a>
                  )}
                  <Button variant="outline" onClick={handleLogout}>
                    Déconnexion
                  </Button>
                </>
              ) : (
                <>
                  <Button href="/connexion" variant="outline">
                    Connexion
                  </Button>
                  <Button href="/inscription" variant="primary">
                    S&apos;inscrire
                  </Button>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
