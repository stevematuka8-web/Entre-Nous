import { createClient } from "@/lib/supabase/client";

export interface ConversationMessage {
  id: string;
  from: "me" | "them";
  text: string;
  at: string;
}

export interface ConversationContext {
  label: string;
  href: string;
}

export interface Conversation {
  id: string;
  participantName: string;
  participantRole: string;
  context?: ConversationContext;
  messages: ConversationMessage[];
  updatedAt: string;
}

const listeners = new Set<() => void>();

function notify() {
  listeners.forEach((listener) => listener());
}

export function subscribeToConversations(callback: () => void) {
  listeners.add(callback);
  return () => listeners.delete(callback);
}

interface ConversationRow {
  id: string;
  participant_name: string;
  participant_role: string;
  context_label: string | null;
  context_href: string | null;
  updated_at: string;
}

interface MessageRow {
  id: string;
  conversation_id: string;
  from_me: boolean;
  body: string;
  created_at: string;
}

let cache: Conversation[] = [];

export function getConversations(): Conversation[] {
  return cache;
}

const emptyConversations: Conversation[] = [];

/** Stable empty-array reference for `useSyncExternalStore`'s server snapshot. */
export function getServerConversations(): Conversation[] {
  return emptyConversations;
}

export function getConversationById(id: string): Conversation | undefined {
  return cache.find((c) => c.id === id);
}

/** Loads the signed-in user's conversations and their messages from Supabase. */
export async function loadConversations(): Promise<void> {
  const supabase = createClient();
  const { data: conversations } = await supabase
    .from("conversations")
    .select("id, participant_name, participant_role, context_label, context_href, updated_at")
    .order("updated_at", { ascending: false });

  if (!conversations || conversations.length === 0) {
    cache = [];
    notify();
    return;
  }

  const { data: messages } = await supabase
    .from("messages")
    .select("id, conversation_id, from_me, body, created_at")
    .in(
      "conversation_id",
      (conversations as ConversationRow[]).map((c) => c.id)
    )
    .order("created_at", { ascending: true });

  const messagesByConversation = new Map<string, ConversationMessage[]>();
  for (const row of (messages ?? []) as MessageRow[]) {
    const list = messagesByConversation.get(row.conversation_id) ?? [];
    list.push({
      id: row.id,
      from: row.from_me ? "me" : "them",
      text: row.body,
      at: row.created_at,
    });
    messagesByConversation.set(row.conversation_id, list);
  }

  cache = (conversations as ConversationRow[]).map((row) => ({
    id: row.id,
    participantName: row.participant_name,
    participantRole: row.participant_role,
    context:
      row.context_label && row.context_href
        ? { label: row.context_label, href: row.context_href }
        : undefined,
    messages: messagesByConversation.get(row.id) ?? [],
    updatedAt: row.updated_at,
  }));
  notify();
}

export function clearConversations() {
  cache = [];
  notify();
}

export async function ensureConversation(
  ownerId: string,
  participantName: string,
  participantRole: string,
  context?: ConversationContext
): Promise<string> {
  const supabase = createClient();
  const now = new Date().toISOString();

  const { data, error } = await supabase
    .from("conversations")
    .upsert(
      {
        owner_id: ownerId,
        participant_name: participantName,
        participant_role: participantRole,
        context_label: context?.label ?? null,
        context_href: context?.href ?? null,
        updated_at: now,
      },
      { onConflict: "owner_id,participant_name" }
    )
    .select("id, participant_name, participant_role, context_label, context_href, updated_at")
    .single();

  if (error || !data) return "";

  const existing = cache.find((c) => c.id === data.id);
  const conversation: Conversation = {
    id: data.id,
    participantName: data.participant_name,
    participantRole: data.participant_role,
    context:
      data.context_label && data.context_href
        ? { label: data.context_label, href: data.context_href }
        : undefined,
    messages: existing?.messages ?? [],
    updatedAt: data.updated_at,
  };

  cache = [conversation, ...cache.filter((c) => c.id !== data.id)];
  notify();
  return data.id;
}

const autoReplies = [
  "Merci pour votre message, je reviens vers vous rapidement avec plus de détails.",
  "Bonjour ! Oui, c'est tout à fait possible — je vous propose un créneau cette semaine pour en discuter.",
  "Merci de votre intérêt. Pouvez-vous m'en dire un peu plus sur votre besoin ?",
  "Je viens de regarder votre demande, ça me semble tout à fait faisable, je vous envoie un devis rapidement.",
];

function appendMessage(conversationId: string, message: ConversationMessage, updatedAt: string) {
  cache = cache.map((c) =>
    c.id === conversationId
      ? { ...c, messages: [...c.messages, message], updatedAt }
      : c
  );
  notify();
}

export async function sendMessage(
  ownerId: string,
  conversationId: string,
  text: string
): Promise<void> {
  const trimmed = text.trim();
  if (!trimmed) return;

  const supabase = createClient();
  const now = new Date().toISOString();

  const { data } = await supabase
    .from("messages")
    .insert({ conversation_id: conversationId, owner_id: ownerId, from_me: true, body: trimmed })
    .select("id, created_at")
    .single();

  if (data) {
    appendMessage(conversationId, { id: data.id, from: "me", text: trimmed, at: data.created_at }, now);
    await supabase.from("conversations").update({ updated_at: now }).eq("id", conversationId);
  }

  if (typeof window === "undefined") return;
  window.setTimeout(
    async () => {
      const reply = autoReplies[Math.floor(Math.random() * autoReplies.length)];
      const replyAt = new Date().toISOString();
      const { data: replyRow } = await supabase
        .from("messages")
        .insert({ conversation_id: conversationId, owner_id: ownerId, from_me: false, body: reply })
        .select("id, created_at")
        .single();
      if (replyRow) {
        appendMessage(
          conversationId,
          { id: replyRow.id, from: "them", text: reply, at: replyRow.created_at },
          replyAt
        );
        await supabase.from("conversations").update({ updated_at: replyAt }).eq("id", conversationId);
      }
    },
    1200 + Math.random() * 900
  );
}

export async function seedDemoConversations(ownerId: string): Promise<void> {
  if (cache.length > 0) return;

  const supabase = createClient();
  const now = Date.now();

  const { data: lea } = await supabase
    .from("conversations")
    .upsert(
      {
        owner_id: ownerId,
        participant_name: "Léa Kouadio",
        participant_role: "Développeuse IA freelance",
        context_label: "Agent IA pour support client 24/7",
        context_href: "/digital/ia-agent-support",
        updated_at: new Date(now - 1000 * 60 * 60 * 25).toISOString(),
      },
      { onConflict: "owner_id,participant_name" }
    )
    .select("id")
    .single();

  if (lea) {
    await supabase.from("messages").insert([
      {
        conversation_id: lea.id,
        owner_id: ownerId,
        from_me: true,
        body: "Bonjour Léa, votre agent IA pour le support client m'intéresse. Est-ce compatible avec Zendesk ?",
        created_at: new Date(now - 1000 * 60 * 60 * 26).toISOString(),
      },
      {
        conversation_id: lea.id,
        owner_id: ownerId,
        from_me: false,
        body: "Bonjour ! Oui, l'intégration Zendesk est prise en charge nativement. Je peux vous envoyer un exemple de configuration si vous voulez.",
        created_at: new Date(now - 1000 * 60 * 60 * 25).toISOString(),
      },
    ]);
  }

  const { data: connect } = await supabase
    .from("conversations")
    .upsert(
      {
        owner_id: ownerId,
        participant_name: "ENTRE-NOUS Connect",
        participant_role: "Assistant de la plateforme",
        updated_at: new Date(now - 1000 * 60 * 5).toISOString(),
      },
      { onConflict: "owner_id,participant_name" }
    )
    .select("id")
    .single();

  if (connect) {
    await supabase.from("messages").insert({
      conversation_id: connect.id,
      owner_id: ownerId,
      from_me: false,
      body: "Bienvenue sur ENTRE-NOUS Connect ! Discutez directement avec les prestataires, acheteurs et apporteurs d'affaires depuis vos fiches service ou vos profils.",
      created_at: new Date(now - 1000 * 60 * 5).toISOString(),
    });
  }

  await loadConversations();
}
