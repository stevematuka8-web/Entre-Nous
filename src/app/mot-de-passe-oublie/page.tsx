"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { AlertCircle, MailCheck } from "lucide-react";
import { AuthShell } from "@/components/auth/AuthShell";
import { Button } from "@/components/ui/Button";
import { requestPasswordReset } from "@/lib/auth-store";

export default function MotDePasseOubliePage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email.includes("@")) {
      setError("Merci de renseigner un email valide.");
      return;
    }

    setSubmitting(true);
    const result = await requestPasswordReset(email);
    setSubmitting(false);

    // Always show success, even if the email isn't registered — this avoids
    // revealing which emails have an account.
    if (!result.ok) {
      setError(result.error);
      return;
    }
    setSent(true);
  };

  if (sent) {
    return (
      <AuthShell
        title="Vérifiez votre boîte mail"
        subtitle="Si un compte existe avec cet email, un lien de réinitialisation vient de vous être envoyé."
        footer={
          <Link href="/connexion" className="font-medium text-violet-bright hover:text-orange">
            Retour à la connexion
          </Link>
        }
      >
        <div className="flex flex-col items-center gap-3 py-4 text-center text-sm text-mist">
          <MailCheck size={32} className="text-violet-bright" />
          <p>
            Le lien est valable une heure. Pensez à vérifier vos spams si vous
            ne le voyez pas arriver.
          </p>
        </div>
      </AuthShell>
    );
  }

  return (
    <AuthShell
      title="Mot de passe oublié"
      subtitle="Entrez votre email, nous vous envoyons un lien pour en choisir un nouveau."
      footer={
        <Link href="/connexion" className="font-medium text-violet-bright hover:text-orange">
          Retour à la connexion
        </Link>
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

        {error && (
          <div className="flex items-start gap-2 rounded-xl border border-orange/30 bg-orange/10 p-3 text-xs text-orange-soft">
            <AlertCircle size={15} className="mt-0.5 shrink-0" />
            {error}
          </div>
        )}

        <Button type="submit" variant="primary" disabled={submitting} className="mt-2 w-full">
          {submitting ? "Envoi…" : "Envoyer le lien"}
        </Button>
      </form>
    </AuthShell>
  );
}
