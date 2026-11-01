import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

// Gemini responses can take 20-40s; Vercel's default serverless timeout
// (10s on Hobby) would otherwise kill the function before it replies.
export const maxDuration = 60;

const SYSTEM_INSTRUCTION = `Tu es l'assistant virtuel d'ENTRE-NOUS, une marketplace fintech qui met en relation prestataires, acheteurs et apporteurs d'affaires.

Structure de la plateforme :
- ENTRE-NOUS DIGITAL (/digital) : services numériques — IA, développement web/mobile, solutions SaaS, transformation numérique, intégration API, produits numériques.
- ENTRE-NOUS MARKETPLACE (/marketplace) : produits physiques/numériques, services professionnels, commerce, artisanat.
- Un compte peut cumuler 3 rôles sans se déconnecter : Prestataire (vendre, publier des annonces via le tableau de bord /dashboard/vendeur), Acheteur (chercher, contacter, favoris via /dashboard/acheteur), Apporteur d'affaires (mettre en relation et toucher une commission via /business).
- ENTRE-NOUS CONNECT (/connect) : messagerie entre utilisateurs et prestataires.
- Inscription : /inscription. Connexion : /connexion. Compte : /compte (permet d'activer/désactiver ses rôles).

Important : ENTRE-NOUS est actuellement un PROTOTYPE. Aucune transaction financière réelle n'est traitée sur la plateforme à ce stade.

Réponds en français, de façon brève, chaleureuse et utile. Si une question sort du cadre d'ENTRE-NOUS (ou touche à des sujets sensibles, médicaux, juridiques, financiers personnels), décline poliment et recentre sur ce que tu peux faire : aider à utiliser ENTRE-NOUS. N'invente jamais de fonctionnalité qui n'existe pas sur la plateforme. Réponds en texte brut uniquement, sans Markdown (pas d'astérisques, de tirets de liste ni de liens entre crochets) : écris des phrases normales.`;

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export async function POST(request: Request) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Le chatbot n'est pas encore configuré." },
      { status: 503 }
    );
  }

  let messages: ChatMessage[];
  try {
    const body = await request.json();
    messages = Array.isArray(body?.messages) ? body.messages : [];
  } catch {
    return NextResponse.json({ error: "Requête invalide." }, { status: 400 });
  }

  if (messages.length === 0) {
    return NextResponse.json({ error: "Aucun message fourni." }, { status: 400 });
  }

  // Keep the request small and bounded — this runs on a free API tier.
  const recent = messages.slice(-12).map((m) => ({
    text: String(m.content ?? "").slice(0, 2000),
  }));

  const contents = messages.slice(-12).map((m, i) => ({
    role: m.role === "assistant" ? "model" : "user",
    parts: [recent[i]],
  }));

  try {
    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: "gemini-flash-latest",
      contents,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        maxOutputTokens: 400,
        // Disable extended "thinking" — this is a quick FAQ assistant, and
        // thinking mode added ~40s of latency for no benefit here.
        thinkingConfig: { thinkingBudget: 0 },
      },
    });

    const text = response.text?.trim();
    if (!text) {
      return NextResponse.json(
        { error: "Je n'ai pas pu générer de réponse, réessayez." },
        { status: 502 }
      );
    }

    return NextResponse.json({ reply: text });
  } catch (error) {
    console.error("Gemini chat error:", error);
    return NextResponse.json(
      { error: "Le service est momentanément indisponible, réessayez dans un instant." },
      { status: 502 }
    );
  }
}
