import { Logo } from "@/components/ui/Logo";

const columns = [
  {
    title: "Plateforme",
    links: ["Digital", "Marketplace", "Business", "Connect"],
  },
  {
    title: "Ressources",
    links: ["Centre d'aide", "Devenir vendeur", "Devenir apporteur d'affaires"],
  },
  {
    title: "Entreprise",
    links: ["À propos", "Confidentialité", "Conditions d'utilisation"],
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
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-mist transition-colors hover:text-orange"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-6 text-xs text-mist/70 md:flex-row">
          <span>© 2026 ENTRE-NOUS SaaS. Prototype — données fictives.</span>
          <span>Fait avec violet, orange et un peu de néon.</span>
        </div>
      </div>
    </footer>
  );
}
