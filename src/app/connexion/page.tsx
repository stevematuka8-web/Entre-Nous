"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AlertCircle } from "lucide-react";
import { AuthShell } from "@/components/auth/AuthShell";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/components/providers/AuthProvider";

export default function ConnexionPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email.includes("@") || password.length === 0) {
      setError("Merci de renseigner un email et un mot de passe valides.");
      return;
    }

    setSubmitting(true);
    const result = await login(email, password);
    setSubmitting(false);

    if (!result.ok) {
      setError(result.error);
      return;
    }

    router.push("/compte");
  };

  return (
    <AuthShell
      title="Bon retour parmi nous"
      subtitle="Connectez-vous pour retrouver vos activités, vos messages et vos opportunités."
      footer={
        <span>
          Pas encore de compte ?{" "}
          <Link href="/inscription" className="font-medium text-violet-bright hover:text-orange">
            S&apos;inscrire
          </Link>
        </span>
      }
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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

        <div className="flex items-center justify-between text-xs text-mist">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
              className="h-4 w-4 rounded border-white/20 bg-white/5 accent-violet"
            />
            Se souvenir de moi
          </label>
          <span className="cursor-not-allowed text-mist/50">Mot de passe oublié ?</span>
        </div>

        {error && (
          <div className="flex items-start gap-2 rounded-xl border border-orange/30 bg-orange/10 p-3 text-xs text-orange-soft">
            <AlertCircle size={15} className="mt-0.5 shrink-0" />
            {error}
          </div>
        )}

        <Button type="submit" variant="primary" disabled={submitting} className="mt-2 w-full">
          {submitting ? "Connexion…" : "Se connecter"}
        </Button>
      </form>
    </AuthShell>
  );
}
