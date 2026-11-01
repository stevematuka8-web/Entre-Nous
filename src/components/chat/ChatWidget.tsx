"use client";

import { useEffect, useRef, useState, useSyncExternalStore, type FormEvent } from "react";
import { clsx } from "clsx";
import { MessageCircle, Send, Sparkles, X } from "lucide-react";
import { getConsent, getServerConsent, subscribeToConsent } from "@/lib/consent-store";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

const welcomeMessage: ChatMessage = {
  role: "assistant",
  content:
    "Bonjour 👋 Je suis l'assistant ENTRE-NOUS. Je peux vous aider à trouver un service, comprendre les rôles (prestataire, acheteur, apporteur d'affaires) ou naviguer sur la plateforme. Que puis-je faire pour vous ?",
};

export function ChatWidget() {
  const consent = useSyncExternalStore(subscribeToConsent, getConsent, getServerConsent);
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([welcomeMessage]);
  const [draft, setDraft] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length, loading]);

  const handleSend = async (e: FormEvent) => {
    e.preventDefault();
    const text = draft.trim();
    if (!text || loading) return;

    const next = [...messages, { role: "user" as const, content: text }];
    setMessages(next);
    setDraft("");
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Une erreur est survenue.");
      } else {
        setMessages((m) => [...m, { role: "assistant", content: data.reply }]);
      }
    } catch {
      setError("Connexion impossible — réessayez.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={clsx(
        "fixed right-4 z-50 sm:right-6",
        consent.answered ? "bottom-6" : "bottom-28 sm:bottom-32"
      )}
    >
      {open && (
        <div className="glass-card-strong neon-ring mb-3 flex h-[32rem] w-[22rem] max-w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-2xl">
          <div className="flex items-center justify-between gap-2 border-b border-white/10 px-4 py-3">
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-full btn-glow">
                <Sparkles size={15} className="text-white" />
              </span>
              <div>
                <div className="text-sm font-semibold text-white">Assistant ENTRE-NOUS</div>
                <div className="text-[11px] text-mist">Propulsé par Gemini</div>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="Fermer"
              className="text-mist hover:text-white"
            >
              <X size={18} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-4">
            <div className="flex flex-col gap-3">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={clsx(
                    "max-w-[85%] rounded-2xl px-3.5 py-2 text-xs leading-relaxed sm:text-sm",
                    m.role === "user" ? "btn-glow ml-auto text-white" : "glass-card text-mist"
                  )}
                >
                  {m.content}
                </div>
              ))}
              {loading && (
                <div className="glass-card max-w-[85%] rounded-2xl px-3.5 py-2 text-xs text-mist">
                  …
                </div>
              )}
              {error && (
                <div className="rounded-xl border border-orange/30 bg-orange/10 px-3 py-2 text-xs text-orange-soft">
                  {error}
                </div>
              )}
              <div ref={bottomRef} />
            </div>
          </div>

          <form
            onSubmit={handleSend}
            className="flex items-center gap-2 border-t border-white/10 px-3 py-3"
          >
            <input
              type="text"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="Posez votre question…"
              className="flex-1 rounded-full border border-white/10 bg-white/5 px-3.5 py-2 text-xs text-white placeholder:text-mist/50 focus:border-violet-bright/50 focus:outline-none sm:text-sm"
            />
            <button
              type="submit"
              disabled={!draft.trim() || loading}
              aria-label="Envoyer"
              className="btn-glow flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-white transition-transform hover:scale-105 disabled:opacity-40 disabled:hover:scale-100"
            >
              <Send size={15} />
            </button>
          </form>
        </div>
      )}

      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Fermer l'assistant" : "Ouvrir l'assistant"}
        className="btn-glow flex h-14 w-14 items-center justify-center rounded-full text-white shadow-lg transition-transform hover:scale-105"
      >
        {open ? <X size={22} /> : <MessageCircle size={22} />}
      </button>
    </div>
  );
}
