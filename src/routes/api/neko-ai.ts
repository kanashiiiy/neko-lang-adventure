import { createFileRoute } from "@tanstack/react-router";

const LANG_NAME: Record<string, string> = {
  pt: "português brasileiro",
  en: "English",
  ja: "日本語 (japonês)",
  fr: "français",
  es: "español",
  ko: "한국어 (coreano)",
};

interface ChatMsg { role: "user" | "assistant" | "system"; content: string }

export const Route = createFileRoute("/api/neko-ai")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const body = (await request.json()) as { messages?: ChatMsg[]; uiLang?: string };
        const userMessages = Array.isArray(body.messages) ? body.messages : [];
        const key = process.env.LOVABLE_API_KEY;
        if (!key) return new Response(JSON.stringify({ reply: "Neko AI ainda não está configurado." }), { status: 500 });

        const systemPrompt = `Você é o Neko, um gato preto simpático que é tutor de idiomas no app NEKOTeach.
Responda SEMPRE no idioma da interface do usuário: ${LANG_NAME[body.uiLang ?? "pt"] ?? "português brasileiro"}.
Seja caloroso, curto e divertido (2-4 frases).
Ajude com: explicar palavras, traduzir frases, corrigir gramática, dar dicas de pronúncia.
Use ocasionalmente emojis como 🐾 ✨. Não invente respostas: quando não souber, diga com sinceridade.`;

        const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${key}` },
          body: JSON.stringify({
            model: "google/gemini-2.5-flash",
            messages: [{ role: "system", content: systemPrompt }, ...userMessages],
          }),
        });

        if (!res.ok) {
          const t = await res.text();
          console.error("AI gateway error", res.status, t);
          if (res.status === 429) return Response.json({ reply: "Muitas mensagens! Espere um pouco 🐾" });
          if (res.status === 402) return Response.json({ reply: "Créditos de IA esgotados." });
          return Response.json({ reply: "Deu um probleminha. Tente de novo!" });
        }
        const data = await res.json();
        const reply = data?.choices?.[0]?.message?.content ?? "Miau!";
        return Response.json({ reply });
      },
    },
  },
});
