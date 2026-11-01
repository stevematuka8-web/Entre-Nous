"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { AuthShell } from "@/components/auth/AuthShell";
import { Button } from "@/components/ui/Button";
import { updatePassword } from "@/lib/auth-store";
import { createClient } from "@/lib/supabase/client";

export default function ReinitialiserMotDePassePage() {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [validLink, setValidLink] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const supabase = createClient();

    const { data: subscription } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY") {
        setValidLink(true);
        setReady(true);
      }
    });

    // The recovery link may have already been consumed by the time this
    // effect runs, so also check for an existing session directly.
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) setValidLink(true);
      setReady(true);
    });

    return () => subscription.subscription.unsubscribe();
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password.length < 6) {
      setError("Le mot de passe doit contenir au moins 6 caractères.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Les deux mots de passe ne correspondent pas.");
      return;
    }

    setSubmitting(true);
    const result = await updatePassword(password);
    setSubmitting(false);

    if (!result.ok) {
      setError(result.error);
      return;
    }
    setDone(true);
    setTimeout(() => router.push("/compte"), 1500);
  };

  if (!ready) {
    return (
      <AuthShell
        title="Vérification du lien…"
        subtitle="Un instant."
        footer={<span />}
      >
        <div className="py-4" />
      </AuthShell>
    );
  }

  if (!validLink) {
    return (
      <AuthShell
        title="Lien invalide ou expiré"
        subtitle="Les liens de réinitialisation ne sont valables qu'une heure et à usage unique."
        footer={
          <Link
            href="/mot-de-passe-oublie"
            className="font-medium text-violet-bright hover:text-orange"
          >
            Demander un nouveau lien
          </Link>
        }
      >
        <div className="py-2" />
      </AuthShell>
    );
  }

  if (done) {
    return (
      <AuthShell
        title="Mot de passe mis à jour"
        subtitle="Redirection vers votre compte…"
        footer={<span />}
      >
        <div className="flex flex-col items-center gap-3 py-4 text-center text-sm text-mist">
          <CheckCircle2 size={32} className="text-violet-bright" />
        </div>
      </AuthShell>
    );
  }

  return (
    <AuthShell
      title="Choisissez un nouveau mot de passe"
      subtitle="Au moins 6 caractères."
      footer={<span />}
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className="mb-1.5 block text-xs font-medium text-mist">
            Nouveau mot de passe
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
            Confirmer le mot de passe
          </label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-mist/50 focus:border-violet-bright/50 focus:outline-none"
          />
        </div>

        {error && (
          <div className="flex items-start gap-2 rounded-xl border border-orange/30 bg-orange/10 p-3 text-xs text-orange-soft">
            <AlertCircle size={15} className="mt-0.5 shrink-0" />
            {error}
          </div>
        )}

        <Button type="submit" variant="primary" disabled={submitting} className="mt-2 w-full">
          {submitting ? "Mise à jour…" : "Mettre à jour le mot de passe"}
        </Button>
      </form>
    </AuthShell>
  );
}
