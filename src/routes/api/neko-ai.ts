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

function cleanReply(value: string) {
  return value
    .replace(/```[a-z]*\n?/gi, "")
    .replace(/```/g, "")
    .replace(/^\s{0,3}#{1,6}\s*/gm, "")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/__([^_]+)__/g, "$1")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/^\s*[-*]\s+/gm, "• ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

export const Route = createFileRoute("/api/neko-ai")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const body = (await request.json()) as { messages?: ChatMsg[]; uiLang?: string; learnLang?: string };
        const userMessages = Array.isArray(body.messages) ? body.messages : [];
        const key = process.env.LOVABLE_API_KEY;
        if (!key) return new Response(JSON.stringify({ reply: "Neko AI ainda não está configurado." }), { status: 500 });

        const nowIso = new Date().toISOString();
        const nowText = new Intl.DateTimeFormat("pt-BR", {
          dateStyle: "full",
          timeStyle: "short",
          timeZone: "UTC",
        }).format(new Date());

        const systemPrompt = `Você é o Neko, um gato preto simpático que é tutor de idiomas no app NEKOTeach.
CONTEXTO TEMPORAL (fonte da verdade): agora é ${nowText} (UTC, ISO ${nowIso}).
Use SEMPRE essa data para responder sobre ano atual, data, dia da semana, mês ou qualquer pergunta sobre "hoje"/"atualmente".
Nunca afirme que o ano atual ainda está no futuro e nunca contradiga o usuário sobre a data atual.
Diferencie claramente informações antigas, atuais e futuras.
Seu conhecimento treinado pode estar desatualizado: para notícias, eventos, animes, jogos ou tecnologia recentes, seja honesto e diga que não consegue confirmar novidades após seu treinamento, em vez de inventar ou apresentar dados antigos como atuais.
Seu foco principal é educação e aprendizado de idiomas: explique palavras, traduza frases, corrija gramática e dê dicas de pronúncia.
Sempre que possível, mantenha uma abordagem educativa e útil.
Também pode conversar e responder perguntas gerais seguras, como curiosidades, animes, mangás, jogos, tecnologia e conhecimentos gerais.
Não diga que só pode falar sobre idiomas ou estudos quando a pergunta for segura, apropriada e respeitosa.
Responda SEMPRE no idioma da interface do usuário: ${LANG_NAME[body.uiLang ?? "pt"] ?? "português brasileiro"}.
Seja caloroso, claro, curto e divertido.
Use ocasionalmente emojis como 🐾 ✨. Não invente respostas: quando não souber, diga com sinceridade.

Organize a resposta para leitura fácil no celular:
- Nunca use Markdown nem mostre símbolos de formatação como **, ##, #, __ ou crases.
- Use títulos curtos, linhas em branco e listas com o caractere •.
- Evite parágrafos longos. Coloque cada palavra ou conceito em seu próprio parágrafo ou item.
- Para uma explicação de idioma, use esta ordem, traduzindo os rótulos para o idioma da interface:

📖 Frase
[frase estudada]

Pronúncia
[pronúncia ou romanização]

🇧🇷 Tradução
[tradução; troque a bandeira quando o idioma da interface não for português]

📚 Explicação
• [palavra ou parte]: [explicação curta]
• [palavra ou parte]: [explicação curta]

📝 Resumo
[conclusão simples]

Adapte a estrutura ao pedido: não inclua seções vazias ou irrelevantes.`;

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
        const reply = cleanReply(data?.choices?.[0]?.message?.content ?? "Miau!");
        return Response.json({ reply });
      },
    },
  },
});
