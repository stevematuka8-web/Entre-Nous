"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AlertCircle, MailCheck } from "lucide-react";
import { AuthShell } from "@/components/auth/AuthShell";
import { RoleSelector } from "@/components/auth/RoleSelector";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/components/providers/AuthProvider";
import type { UserRole } from "@/lib/auth-store";

export default function InscriptionPage() {
  const router = useRouter();
  const { register } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [roles, setRoles] = useState<UserRole[]>(["acheteur"]);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [pendingConfirmation, setPendingConfirmation] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (name.trim().length < 2) {
      setError("Merci d'indiquer votre nom.");
      return;
    }
    if (!email.includes("@")) {
      setError("Adresse email invalide.");
      return;
    }
    if (password.length < 6) {
      setError("Le mot de passe doit contenir au moins 6 caractères.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }
    if (roles.length === 0) {
      setError("Sélectionnez au moins une activité.");
      return;
    }
    if (!acceptTerms) {
      setError("Vous devez accepter les conditions d'utilisation.");
      return;
    }

    setSubmitting(true);
    const result = await register({ name, email, password, roles });
    setSubmitting(false);

    if (!result.ok) {
      setError(result.error);
      return;
    }

    if (result.pendingConfirmation) {
      setPendingConfirmation(true);
      return;
    }

    router.push("/compte");
  };

  if (pendingConfirmation) {
    return (
      <AuthShell
        title="Vérifiez votre email"
        subtitle="Dernière étape avant de commencer."
        footer={
          <Link href="/connexion" className="font-medium text-violet-bright hover:text-orange">
            Retour à la connexion
          </Link>
        }
      >
        <div className="flex flex-col items-center gap-3 py-4 text-center">
          <MailCheck size={32} className="text-violet-bright" />
          <p className="text-sm text-mist">
            Un email de confirmation a été envoyé à <strong className="text-white">{email}</strong>.
            Cliquez sur le lien qu&apos;il contient pour activer votre compte,
            puis connectez-vous.
          </p>
        </div>
      </AuthShell>
    );
  }

  return (
    <AuthShell
      title="Créer votre compte"
      subtitle="Un seul compte pour vendre, acheter, ou mettre en relation — ENTRE-NOUS s'adapte à vos activités."
      footer={
        <span>
          Déjà un compte ?{" "}
          <Link href="/connexion" className="font-medium text-violet-bright hover:text-orange">
            Se connecter
          </Link>
        </span>
      }
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className="mb-1.5 block text-xs font-medium text-mist">
            Nom complet
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Léa Kouadio"
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-mist/50 focus:border-violet-bright/50 focus:outline-none"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-medium text-mist">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="vous@exemple.com"
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-mist/50 focus:border-violet-bright/50 focus:outline-none"
          />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-xs font-medium text-mist">
              Mot de passe
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-mist/50 focus:border-violet-bright/50 focus:outline-none"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium text-mist">
              Confirmer
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-mist/50 focus:border-violet-bright/50 focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="mb-2 block text-xs font-medium text-mist">
            Vos activités sur ENTRE-NOUS
          </label>
          <RoleSelector value={roles} onChange={setRoles} />
        </div>

        <label className="flex items-start gap-2 text-xs text-mist">
          <input
            type="checkbox"
            checked={acceptTerms}
            onChange={(e) => setAcceptTerms(e.target.checked)}
            className="mt-0.5 h-4 w-4 rounded border-white/20 bg-white/5 accent-violet"
          />
          J&apos;accepte les conditions d&apos;utilisation et la politique de
          confidentialité d&apos;ENTRE-NOUS.
        </label>

        {error && (
          <div className="flex items-start gap-2 rounded-xl border border-orange/30 bg-orange/10 p-3 text-xs text-orange-soft">
            <AlertCircle size={15} className="mt-0.5 shrink-0" />
            {error}
          </div>
        )}

        <Button type="submit" variant="primary" disabled={submitting} className="mt-2 w-full">
          {submitting ? "Création en cours…" : "Créer mon compte"}
        </Button>
      </form>
    </AuthShell>
  );
}
