import { createFileRoute } from "@tanstack/react-router";
import { useState, useRef, useEffect, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { Send, ImagePlus, X } from "lucide-react";
import { BottomNav } from "@/components/BottomNav";
import { NekoMascot } from "@/components/NekoMascot";
import { DailyDialogs } from "@/components/DailyDialogs";
import { supabase } from "@/integrations/supabase/client";
import { fetchProfile, isPremiumPlusActive, isPremiumActive } from "@/lib/profile";
import { normalizeLanguage } from "@/lib/lessons";
import { useT, useUiLang } from "@/lib/i18n";

export const Route = createFileRoute("/_authenticated/neko-ai")({
  component: NekoAIPage,
  ssr: false,
});

interface Msg { role: "user" | "assistant"; content: string; image?: string }

interface PhotoUsage {
  plan: string;
  unlimited: boolean;
  used: number;
  limit: number | null;
  remaining: number | null;
}

async function authHeaders() {
  const { data } = await supabase.auth.getSession();
  const token = data.session?.access_token;
  return token ? { Authorization: `Bearer ${token}` } : {};
}

// Reduz a foto para no máximo 1024px e converte para JPEG (envio leve)
function fileToCompressedDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("read-error"));
    reader.onload = () => {
      const img = new Image();
      img.onerror = () => reject(new Error("img-error"));
      img.onload = () => {
        const max = 1024;
        const scale = Math.min(1, max / Math.max(img.width, img.height));
        const canvas = document.createElement("canvas");
        canvas.width = Math.round(img.width * scale);
        canvas.height = Math.round(img.height * scale);
        const ctx = canvas.getContext("2d");
        if (!ctx) return reject(new Error("ctx-error"));
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL("image/jpeg", 0.82));
      };
      img.src = String(reader.result);
    };
    reader.readAsDataURL(file);
  });
}

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
  const hasPremium = isPremiumActive(profile);
  const [messages, setMessages] = useState<Msg[]>([
    { role: "assistant", content: "Oi! Eu sou o Neko 🐾 Posso explicar palavras, traduzir frases, corrigir sua gramática e te ajudar com as lições. Como posso ajudar hoje?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [photo, setPhoto] = useState<string | null>(null);
  const [usage, setUsage] = useState<PhotoUsage | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const loadUsage = useCallback(async () => {
    try {
      const res = await fetch("/api/neko-vision", { headers: await authHeaders() });
      if (res.ok) setUsage((await res.json()) as PhotoUsage);
    } catch {
      /* ignora */
    }
  }, []);

  useEffect(() => {
    if (hasPremium || hasPlus) void loadUsage();
  }, [hasPremium, hasPlus, loadUsage]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  async function onPickFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    try {
      setPhoto(await fileToCompressedDataUrl(file));
    } catch {
      setPhoto(null);
    }
  }

  async function sendPhoto() {
    if (!photo || loading) return;
    const note = input.trim();
    const image = photo;
    setPhoto(null);
    setInput("");
    const next: Msg[] = [...messages, { role: "user", content: note || t("Analise esta foto do meu estudo"), image }];
    setMessages(next);
    setLoading(true);
    try {
      const res = await fetch("/api/neko-vision", {
        method: "POST",
        headers: { "Content-Type": "application/json", ...(await authHeaders()) },
        body: JSON.stringify({
          image,
          note,
          uiLang,
          learnLang: normalizeLanguage(profile?.language),
        }),
      });
      if (!res.ok) throw new Error(await res.text());
      const data = (await res.json()) as { reply?: string; blocked?: boolean; usage?: PhotoUsage };
      if (data.usage) setUsage(data.usage);
      if (data.blocked) {
        setMessages([
          ...next,
          {
            role: "assistant",
            content: t("Você já usou suas 10 análises de fotos de hoje 🐾 Novas análises estarão disponíveis amanhã!"),
          },
        ]);
      } else {
        setMessages([...next, { role: "assistant", content: data.reply ?? "Miau!" }]);
      }
    } catch {
      setMessages([...next, { role: "assistant", content: t("Não consegui responder agora. Tente de novo em instantes 🐾") }]);
    } finally {
      setLoading(false);
    }
  }


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
            <div className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm whitespace-pre-wrap ${
              m.role === "user" ? "bg-primary text-primary-foreground" : "bg-card shadow-card"
            }`}>
              {m.image && (
                <img src={m.image} alt={t("Foto enviada para o Neko AI")}
                  className="mb-2 max-h-56 w-full rounded-xl object-cover" />
              )}
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
        {(hasPlus || hasPremium) && usage && (
          <div className="mb-1.5 px-1 text-[11px] font-bold text-muted-foreground">
            {usage.unlimited
              ? `♾️ ${t("Análises de fotos ilimitadas")}`
              : `📷 ${t("Análises de fotos")}: ${usage.remaining ?? 0}/${usage.limit ?? 10} ${t("disponíveis hoje")}`}
          </div>
        )}

        {photo && (
          <div className="relative mb-2 inline-block">
            <img src={photo} alt={t("Foto selecionada")}
              className="max-h-32 rounded-xl border-2 border-border object-cover" />
            <button type="button" onClick={() => setPhoto(null)}
              className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-foreground text-background">
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        )}

        <form onSubmit={(e) => { e.preventDefault(); if (photo) void sendPhoto(); else void send(); }} className="flex items-center gap-2">
          <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={onPickFile} />
          <button type="button" aria-label={t("Analisar foto")} onClick={openPhotoPicker} disabled={loading}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 border-border bg-background text-primary disabled:opacity-50">
            <ImagePlus className="h-5 w-5" />
          </button>
          <input value={input} onChange={(e) => setInput(e.target.value)}
            placeholder={photo ? t("Escreva algo sobre a foto (opcional)") : t("Pergunte algo ao Neko...")}
            className="flex-1 rounded-full border-2 border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-primary" />
          <button type="submit" disabled={(!input.trim() && !photo) || loading}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground disabled:opacity-50">
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
