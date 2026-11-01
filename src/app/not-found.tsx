import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="flex flex-1 items-center justify-center px-6 py-24">
        <div className="mx-auto max-w-md text-center">
          <span className="font-display text-sm font-semibold uppercase tracking-widest text-orange">
            Erreur 404
          </span>
          <h1 className="mt-3 font-display text-3xl font-bold text-white sm:text-4xl">
            Cette page n&apos;existe pas
          </h1>
          <p className="mt-4 text-sm text-mist">
            Le lien est peut-être incorrect, ou la page a été déplacée.
            Repartez de l&apos;accueil pour retrouver votre chemin.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button href="/">Retour à l&apos;accueil</Button>
            <Link
              href="/aide"
              className="text-sm font-medium text-mist transition-colors hover:text-orange"
            >
              Centre d&apos;aide
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
