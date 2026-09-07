import { createFileRoute } from "@tanstack/react-router";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";

const LANG_NAME: Record<string, string> = {
  pt: "português brasileiro",
  en: "English",
  ja: "日本語 (japonês)",
  fr: "français",
  es: "español",
  ko: "한국어 (coreano)",
};

const LEARN_NAME: Record<string, string> = {
  pt: "português",
  en: "inglês",
  ja: "japonês",
  fr: "francês",
  es: "espanhol",
  ko: "coreano",
};

function userClient(token: string) {
  const url = process.env["SUPABASE_URL"]!;
  const key = process.env["SUPABASE_PUBLISHABLE_KEY"]!;
  return createClient<Database>(url, key, {
    auth: { storage: undefined, persistSession: false, autoRefreshToken: false },
    global: { headers: { Authorization: `Bearer ${token}` } },
  });
}

export const Route = createFileRoute("/api/neko-vision")({
  server: {
    handlers: {
      // Retorna o status do limite diário do usuário
      GET: async ({ request }) => {
        const token = request.headers.get("authorization")?.replace(/^Bearer\s+/i, "");
        if (!token) return new Response("Unauthorized", { status: 401 });
        const supabase = userClient(token);
        const { data, error } = await supabase.rpc("photo_analysis_status", {});
        if (error) return new Response(error.message, { status: 400 });
        return Response.json(data);
      },

      POST: async ({ request }) => {
        const token = request.headers.get("authorization")?.replace(/^Bearer\s+/i, "");
        if (!token) return new Response("Unauthorized", { status: 401 });

        const body = (await request.json()) as {
          image?: string;
          note?: string;
          uiLang?: string;
          learnLang?: string;
        };
        if (!body.image || !body.image.startsWith("data:image/")) {
          return new Response("Imagem inválida", { status: 400 });
        }

        const supabase = userClient(token);
        const { data: consumed, error: rpcError } = await supabase.rpc("consume_photo_analysis", {});
        if (rpcError) return new Response(rpcError.message, { status: 400 });
        const usage = consumed as unknown as {
          allowed: boolean;
          unlimited: boolean;
          used: number;
          limit: number | null;
          remaining: number | null;
          plan: string;
        };
        if (!usage?.allowed) {
          return Response.json({ blocked: true, usage }, { status: 200 });
        }

        const key = process.env["LOVABLE_API_KEY"];
        if (!key) return new Response(JSON.stringify({ reply: "Neko AI ainda não está configurado." }), { status: 500 });

        const ui = LANG_NAME[body.uiLang ?? "pt"] ?? "português brasileiro";
        const learn = LEARN_NAME[body.learnLang ?? "ja"] ?? "japonês";

        const systemPrompt = `Você é o Neko, um gato preto simpático e tutor de idiomas do app NEKOTeach.
O usuário enviou uma FOTO com anotações, exercícios, palavras ou frases do estudo de ${learn}.
Responda SEMPRE no idioma da interface: ${ui}.
Analise a imagem e ajude: verifique a escrita das palavras, avalie as frases, aponte erros, explique de forma simples e amigável, mostre como corrigir, explique o significado das palavras e dê sugestões de melhoria.
Seja positivo e incentivador. Se a imagem não tiver conteúdo de idioma legível, diga isso com gentileza.
Responda EXATAMENTE neste formato (traduzido para o idioma da interface):

[uma frase curta de incentivo]

✅ Correto:
- ...

⚠️ Pode melhorar:
- ...

💡 Sugestão:
- ...`;

        const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${key}` },
          body: JSON.stringify({
            model: "google/gemini-2.5-flash",
            messages: [
              { role: "system", content: systemPrompt },
              {
                role: "user",
                content: [
                  {
                    type: "text",
                    text: body.note?.trim()
                      ? body.note.trim()
                      : "Analise esta foto do meu estudo e me ajude.",
                  },
                  { type: "image_url", image_url: { url: body.image } },
                ],
              },
            ],
          }),
        });

        if (!res.ok) {
          const t = await res.text();
          console.error("AI gateway vision error", res.status, t);
          if (res.status === 429) return Response.json({ reply: "Muitas mensagens! Espere um pouco 🐾", usage });
          if (res.status === 402) return Response.json({ reply: "Créditos de IA esgotados.", usage });
          return Response.json({ reply: "Não consegui analisar a foto agora. Tente de novo!", usage });
        }

        const data = await res.json();
        const reply = data?.choices?.[0]?.message?.content ?? "Miau!";
        return Response.json({ reply, usage });
      },
    },
  },
});
