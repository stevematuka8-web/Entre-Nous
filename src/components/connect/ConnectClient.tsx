"use client";

import { useEffect, useRef, useState, useSyncExternalStore, type FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { clsx } from "clsx";
import { ArrowLeft, MessageSquare, Send } from "lucide-react";
import { useAuth } from "@/components/providers/AuthProvider";
import {
  getConversations,
  getServerConversations,
  seedDemoConversations,
  sendMessage,
  subscribeToConversations,
} from "@/lib/messages-store";

function initialsOf(name: string) {
  return name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function formatTime(iso: string) {
  return new Date(iso).toLocaleString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function ConnectClient() {
  const { user, ready } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedId = searchParams.get("c");

  const conversations = useSyncExternalStore(
    subscribeToConversations,
    getConversations,
    getServerConversations
  );
  const selected = conversations.find((c) => c.id === selectedId) ?? null;

  const [draft, setDraft] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ready && !user) {
      router.replace("/connexion");
    }
  }, [ready, user, router]);

  useEffect(() => {
    if (user) seedDemoConversations(user.id);
  }, [user]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [selected?.messages.length]);

  if (!ready || !user) {
    return (
      <div className="flex-1 px-6 py-24 text-center text-sm text-mist">
        Chargement de votre messagerie…
      </div>
    );
  }

  const handleSend = (e: FormEvent) => {
    e.preventDefault();
    if (!selected || !draft.trim()) return;
    sendMessage(user.id, selected.id, draft);
    setDraft("");
  };

  return (
    <div className="mx-auto flex h-[calc(100vh-4rem)] max-w-6xl">
      <aside
        className={clsx(
          "w-full shrink-0 overflow-y-auto border-r border-white/5 md:block md:w-80",
          selectedId && "hidden"
        )}
      >
        <div className="px-5 pb-3 pt-6">
          <h1 className="font-display text-lg font-semibold text-white">
            ENTRE-NOUS CONNECT
          </h1>
          <p className="mt-1 text-xs text-mist">
            Vos échanges avec prestataires, acheteurs et apporteurs d&apos;affaires.
          </p>
        </div>

        <div className="flex flex-col">
          {conversations.length === 0 && (
            <p className="px-5 py-6 text-sm text-mist">
              Aucune conversation pour le moment.
            </p>
          )}
          {conversations.map((c) => {
            const lastMessage = c.messages[c.messages.length - 1];
            return (
              <Link
                key={c.id}
                href={`/connect?c=${c.id}`}
                scroll={false}
                className={clsx(
                  "flex items-start gap-3 border-b border-white/5 px-5 py-4 transition-colors hover:bg-white/5",
                  c.id === selectedId && "bg-violet/10"
                )}
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full btn-glow text-xs font-bold text-white">
                  {initialsOf(c.participantName)}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="truncate text-sm font-semibold text-white">
                      {c.participantName}
                    </span>
                    {lastMessage && (
                      <span className="shrink-0 text-[10px] text-mist/60">
                        {formatTime(lastMessage.at)}
                      </span>
                    )}
                  </div>
                  <p className="mt-0.5 truncate text-xs text-mist">
                    {lastMessage ? lastMessage.text : "Nouvelle conversation"}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </aside>

      <section
        className={clsx(
          "flex w-full flex-1 flex-col",
          !selectedId && "hidden md:flex"
        )}
      >
        {!selected ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 text-center text-sm text-mist">
            <MessageSquare size={28} className="text-mist/40" />
            Sélectionnez une conversation pour commencer.
          </div>
        ) : (
          <>
            <div className="flex items-center gap-3 border-b border-white/5 px-6 py-4">
              <Link href="/connect" className="text-mist hover:text-white md:hidden">
                <ArrowLeft size={18} />
              </Link>
              <span className="flex h-10 w-10 items-center justify-center rounded-full btn-glow text-xs font-bold text-white">
                {initialsOf(selected.participantName)}
              </span>
              <div>
                <div className="text-sm font-semibold text-white">
                  {selected.participantName}
                </div>
                <div className="text-xs text-mist">{selected.participantRole}</div>
              </div>
              {selected.context && (
                <Link
                  href={selected.context.href}
                  className="ml-auto hidden text-xs font-medium text-violet-bright hover:text-orange sm:block"
                >
                  {selected.context.label} →
                </Link>
              )}
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-6">
              <div className="flex flex-col gap-3">
                {selected.messages.length === 0 && (
                  <p className="text-center text-xs text-mist">
                    Envoyez le premier message de cette conversation.
                  </p>
                )}
                {selected.messages.map((m) => (
                  <div
                    key={m.id}
                    className={clsx(
                      "max-w-[75%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed",
                      m.from === "me"
                        ? "btn-glow ml-auto text-white"
                        : "glass-card text-mist"
                    )}
                  >
                    {m.text}
                    <div
                      className={clsx(
                        "mt-1 text-[10px]",
                        m.from === "me" ? "text-white/70" : "text-mist/50"
                      )}
                    >
                      {formatTime(m.at)}
                    </div>
                  </div>
                ))}
                <div ref={bottomRef} />
              </div>
            </div>

            <form
              onSubmit={handleSend}
              className="flex items-center gap-3 border-t border-white/5 px-6 py-4"
            >
              <input
                type="text"
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder="Écrivez votre message…"
                className="flex-1 rounded-full border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-mist/50 focus:border-violet-bright/50 focus:outline-none"
              />
              <button
                type="submit"
                disabled={!draft.trim()}
                className="btn-glow flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-white transition-transform hover:scale-105 disabled:opacity-40 disabled:hover:scale-100"
                aria-label="Envoyer"
              >
                <Send size={16} />
              </button>
            </form>
          </>
        )}
      </section>
    </div>
  );
}
