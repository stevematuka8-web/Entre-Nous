import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { ManageCookiesButton } from "@/components/layout/ManageCookiesButton";

const columns = [
  {
    title: "Plateforme",
    links: [
      { label: "Digital", href: "/digital" },
      { label: "Marketplace", href: "/marketplace" },
      { label: "Business", href: "/business" },
      { label: "Connect", href: "/connect" },
    ],
  },
  {
    title: "Ressources",
    links: [
      { label: "Centre d'aide", href: "/aide" },
      { label: "Devenir vendeur", href: "/inscription" },
      { label: "Devenir apporteur d'affaires", href: "/business" },
    ],
  },
  {
    title: "Entreprise",
    links: [
      { label: "À propos", href: "/a-propos" },
      { label: "Confidentialité", href: "/confidentialite" },
      { label: "Conditions d'utilisation", href: "/conditions" },
      { label: "Mentions légales", href: "/mentions-legales" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-nuit-soft/60">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-sm text-mist">
              La marketplace qui met en relation prestataires, acheteurs et
              apporteurs d&apos;affaires, dans le digital comme au quotidien.
            </p>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="font-display text-sm font-semibold text-white">
                {col.title}
              </h4>
              <ul className="mt-4 space-y-2">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-mist transition-colors hover:text-orange"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
                {col.title === "Entreprise" && (
                  <li>
                    <ManageCookiesButton />
                  </li>
                )}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-6 text-xs text-mist/70 md:flex-row">
          <span>
            © 2026 ENTRE-NOUS — un produit{" "}
            <a
              href="https://www.m2k-fintech.com"
              target="_blank"
              rel="noreferrer"
              className="font-medium hover:text-orange"
            >
              M2K Fintech
            </a>
            . Prototype — données fictives.
          </span>
          <span>Fait avec violet, orange et un peu de néon.</span>
        </div>
      </div>
    </footer>
  );
}
