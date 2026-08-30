import { createFileRoute } from "@tanstack/react-router";
import { useState, useRef, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Send } from "lucide-react";
import { BottomNav } from "@/components/BottomNav";
import { NekoMascot } from "@/components/NekoMascot";
import { DailyDialogs } from "@/components/DailyDialogs";
import { supabase } from "@/integrations/supabase/client";
import { fetchProfile, isPremiumPlusActive } from "@/lib/profile";
import { normalizeLanguage } from "@/lib/lessons";
import { useT, useUiLang } from "@/lib/i18n";

export const Route = createFileRoute("/_authenticated/neko-ai")({
  component: NekoAIPage,
  ssr: false,
});

interface Msg { role: "user" | "assistant"; content: string }

function NekoAIPage() {
  const t = useT();
  const uiLang = useUiLang();
  const [tab, setTab] = useState<"chat" | "dialogs">("chat");
  const { data: profile } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const { data } = await supabase.auth.getUser();
      if (!data.user) return null;
      return fetchProfile(data.user.id);
    },
  });
  const hasPlus = isPremiumPlusActive(profile);
  const [messages, setMessages] = useState<Msg[]>([
    { role: "assistant", content: "Oi! Eu sou o Neko 🐾 Posso explicar palavras, traduzir frases, corrigir sua gramática e te ajudar com as lições. Como posso ajudar hoje?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  async function send() {
    const text = input.trim();
    if (!text || loading) return;
    setInput("");
    const next = [...messages, { role: "user" as const, content: text }];
    setMessages(next);
    setLoading(true);
    try {
      const res = await fetch("/api/neko-ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next, uiLang }),
      });
      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();
      setMessages([...next, { role: "assistant", content: data.reply }]);
    } catch {
      setMessages([...next, { role: "assistant", content: t("Não consegui responder agora. Tente de novo em instantes 🐾") }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mobile-shell">
      <header className="flex items-center gap-3 border-b-2 border-border bg-card px-4 py-3">
        <NekoMascot size={44} float={false} />
        <div>
          <div className="font-black">Neko AI</div>
          <div className="text-xs text-muted-foreground">{t("Seu tutor inteligente")}</div>
        </div>
      </header>

      {hasPlus && (
        <div className="flex gap-2 border-b-2 border-border bg-card px-3 py-2">
          <button onClick={() => setTab("chat")}
            className={`flex-1 rounded-full px-3 py-2 text-sm font-bold ${
              tab === "chat" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
            }`}>
            💬 Neko AI
          </button>
          <button onClick={() => setTab("dialogs")}
            className={`flex-1 rounded-full px-3 py-2 text-sm font-bold ${
              tab === "dialogs" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
            }`}>
            🗣️ {t("Diálogos do Dia a Dia")}
          </button>
        </div>
      )}

      {hasPlus && tab === "dialogs" ? (
        <>
          <DailyDialogs learnLang={normalizeLanguage(profile?.language)} />
          <BottomNav />
        </>
      ) : (
      <>
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm ${
              m.role === "user" ? "bg-primary text-primary-foreground" : "bg-card shadow-card"
            }`}>
              {m.role === "assistant" ? t(m.content) : m.content}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="rounded-2xl bg-card px-4 py-2.5 text-sm shadow-card">
              <span className="inline-flex gap-1">
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-primary" />
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-primary" style={{ animationDelay: "0.15s" }} />
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-primary" style={{ animationDelay: "0.3s" }} />
              </span>
            </div>
          </div>
        )}
      </div>

      <div className="border-t-2 border-border bg-card px-3 py-2">
        <form onSubmit={(e) => { e.preventDefault(); send(); }} className="flex items-center gap-2">
          <input value={input} onChange={(e) => setInput(e.target.value)}
            placeholder={t("Pergunte algo ao Neko...")}
            className="flex-1 rounded-full border-2 border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-primary" />
          <button type="submit" disabled={!input.trim() || loading}
            className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-primary-foreground disabled:opacity-50">
            <Send className="h-5 w-5" />
          </button>
        </form>
      </div>
      <BottomNav />
      </>
      )}
    </div>
  );
}
