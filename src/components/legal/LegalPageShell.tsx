import type { ReactNode } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export function LegalPageShell({
  eyebrow,
  title,
  updatedAt,
  children,
}: {
  eyebrow: string;
  title: string;
  updatedAt?: string;
  children: ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="flex-1 px-6 py-16">
        <div className="mx-auto max-w-3xl">
          <span className="text-xs font-semibold uppercase tracking-widest text-orange">
            {eyebrow}
          </span>
          <h1 className="mt-2 font-display text-3xl font-bold text-white sm:text-4xl">
            {title}
          </h1>
          {updatedAt && (
            <p className="mt-2 text-xs text-mist/60">Dernière mise à jour : {updatedAt}</p>
          )}

          <div className="glass-card mt-8 space-y-6 rounded-3xl p-6 text-sm leading-relaxed text-mist sm:p-8 [&_h2]:font-display [&_h2]:text-lg [&_h2]:font-semibold [&_h2]:text-white [&_p+h2]:mt-8 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1.5 [&_strong]:text-white">
            {children}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
