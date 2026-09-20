import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useRef, useEffect, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { Send, ImagePlus, X, Menu, Plus, Trash2 } from "lucide-react";
import { BottomNav } from "@/components/BottomNav";
import { NekoMascot } from "@/components/NekoMascot";
import { DailyDialogs } from "@/components/DailyDialogs";
import { supabase } from "@/integrations/supabase/client";
import { fetchCurrentProfile, isPremiumPlusActive, isPremiumActive } from "@/lib/profile";
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

const SECTION_PREFIXES = ["📖", "📚", "📝", "✅", "⚠️", "💡"];

function AssistantReply({ content }: { content: string }) {
  const clean = content
    .replace(/^\s{0,3}#{1,6}\s*/gm, "")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/__([^_]+)__/g, "$1")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/^\s*[-*]\s+/gm, "• ")
    .trim();
  const lines = clean.split("\n");

  return (
    <div className="space-y-2.5 break-words leading-relaxed">
      {lines.map((line, index) => {
        const text = line.trim();
        if (!text) return <div key={index} className="h-1" aria-hidden="true" />;
        const isSection = SECTION_PREFIXES.some((prefix) => text.startsWith(prefix));
        const isLabel = /^(Pronúncia|Pronunciation|発音|Prononciation|Pronunciación|발음)$/i.test(text);
        if (isSection) {
          return <div key={index} className="pt-1 text-[15px] font-black text-foreground">{text}</div>;
        }
        if (isLabel) {
          return <div key={index} className="text-xs font-extrabold text-muted-foreground">{text}</div>;
        }
        if (text.startsWith("•")) {
          return <div key={index} className="pl-1">{text}</div>;
        }
        return <p key={index}>{text}</p>;
      })}
    </div>
  );
}

async function authHeaders(): Promise<Record<string, string>> {
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

const GREETING: Msg = {
  role: "assistant",
  content: "Oi! Eu sou o Neko 🐾 Posso explicar palavras, traduzir frases, corrigir sua gramática e te ajudar com as lições. Como posso ajudar hoje?",
};

interface Thread { id: string; title: string; updatedAt: number; messages: Msg[] }

const THREADS_KEY = "nekoteach:neko-threads";
const ACTIVE_KEY = "nekoteach:neko-thread-active";

function newThread(): Thread {
  return { id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`, title: "", updatedAt: Date.now(), messages: [GREETING] };
}

function autoTitle(messages: Msg[]): string {
  const first = messages.find((m) => m.role === "user");
  if (!first) return "";
  const text = first.content.replace(/\s+/g, " ").trim();
  return text.length > 38 ? `${text.slice(0, 38)}…` : text;
}

function loadThreads(): Thread[] {
  try {
    const raw = localStorage.getItem(THREADS_KEY);
    const parsed = raw ? (JSON.parse(raw) as Thread[]) : [];
    return Array.isArray(parsed) ? parsed.filter((t) => t && Array.isArray(t.messages)) : [];
  } catch {
    return [];
  }
}

function saveThreads(threads: Thread[]) {
  try {
    localStorage.setItem(THREADS_KEY, JSON.stringify(threads.slice(0, 60)));
  } catch {
    /* ignora */
  }
}

function NekoAIPage() {
  const t = useT();
  const uiLang = useUiLang();
  const navigate = useNavigate();
  const [tab, setTab] = useState<"chat" | "dialogs">("chat");
  const { data: profile } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      return fetchCurrentProfile();
    },
  });
  const hasPlus = isPremiumPlusActive(profile);
  const hasPremium = isPremiumActive(profile);
  const [messages, setMessages] = useState<Msg[]>([GREETING]);
  const [threads, setThreads] = useState<Thread[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const hydrated = useRef(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [photo, setPhoto] = useState<string | null>(null);
  const [usage, setUsage] = useState<PhotoUsage | null>(null);
  const [photoLimitReached, setPhotoLimitReached] = useState(false);
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

  // Carrega o histórico salvo e reabre a última conversa usada
  useEffect(() => {
    if (hydrated.current) return;
    const saved = loadThreads();
    const storedActive = localStorage.getItem(ACTIVE_KEY);
    const list = saved.length > 0 ? saved : [newThread()];
    const active = list.find((thread) => thread.id === storedActive) ?? list[0]!;
    setThreads(list);
    setActiveId(active.id);
    setMessages(active.messages.length > 0 ? active.messages : [GREETING]);
    saveThreads(list);
    localStorage.setItem(ACTIVE_KEY, active.id);
    hydrated.current = true;
  }, []);

  // Salva automaticamente a conversa atual
  useEffect(() => {
    if (!hydrated.current || !activeId) return;
    setThreads((prev) => {
      const next = prev.map((thread) =>
        thread.id === activeId
          ? { ...thread, messages, updatedAt: Date.now(), title: thread.title || autoTitle(messages) }
          : thread,
      );
      saveThreads(next);
      return next;
    });
    localStorage.setItem(ACTIVE_KEY, activeId);
  }, [messages, activeId]);

  function openThread(id: string) {
    const thread = threads.find((item) => item.id === id);
    if (!thread) return;
    setActiveId(id);
    setMessages(thread.messages.length > 0 ? thread.messages : [GREETING]);
    setPhoto(null);
    setInput("");
    setMenuOpen(false);
  }

  function startNewThread() {
    const thread = newThread();
    const next = [thread, ...threads];
    setThreads(next);
    saveThreads(next);
    setActiveId(thread.id);
    setMessages(thread.messages);
    setPhoto(null);
    setInput("");
    setMenuOpen(false);
  }

  function confirmDelete() {
    if (!deleteId) return;
    const remaining = threads.filter((thread) => thread.id !== deleteId);
    const list = remaining.length > 0 ? remaining : [newThread()];
    setThreads(list);
    saveThreads(list);
    if (deleteId === activeId) {
      const next = list[0]!;
      setActiveId(next.id);
      setMessages(next.messages.length > 0 ? next.messages : [GREETING]);
      localStorage.setItem(ACTIVE_KEY, next.id);
    }
    setDeleteId(null);
  }

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

  function openPhotoPicker() {
    if (!hasPremium && !hasPlus) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: t("A análise de fotos é exclusiva do Premium e do Premium Plus 🐾 Assine para eu corrigir suas anotações!"),
        },
      ]);
      return;
    }
    if (usage && !usage.unlimited && (usage.remaining ?? 0) <= 0) {
      setPhotoLimitReached(true);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: t("Você atingiu o limite de análises de fotos do seu plano hoje 🐾"),
        },
      ]);
      return;
    }
    fileRef.current?.click();
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
        setPhotoLimitReached(true);
        setMessages([
          ...next,
          {
            role: "assistant",
            content: t("Você atingiu o limite de análises de fotos do seu plano hoje 🐾"),
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
          body: JSON.stringify({ messages: next, uiLang, learnLang: normalizeLanguage(profile?.language) }),
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
        <button type="button" aria-label={t("Conversas")} onClick={() => setMenuOpen(true)}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-border bg-background text-primary">
          <Menu className="h-5 w-5" />
        </button>
        <NekoMascot size={44} float={false} />
        <div>
          <div className="font-black">Neko AI</div>
          <div className="text-xs text-muted-foreground">{t("Seu tutor inteligente")}</div>
        </div>
      </header>

      {menuOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-foreground/40" onClick={() => setMenuOpen(false)} />
          <aside className="relative flex h-full w-[82%] max-w-xs flex-col border-r-2 border-border bg-card shadow-xl">
            <div className="flex items-center justify-between border-b-2 border-border px-4 py-3">
              <div className="font-black">💬 {t("Conversas")}</div>
              <button type="button" aria-label={t("Fechar")} onClick={() => setMenuOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-muted-foreground">
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="px-3 py-3">
              <button type="button" onClick={startNewThread}
                className="flex w-full items-center gap-2 rounded-2xl bg-primary px-4 py-3 text-sm font-bold text-primary-foreground">
                <Plus className="h-4 w-4" /> {t("Nova conversa")}
              </button>
            </div>

            <div className="px-4 pb-1 text-[11px] font-extrabold uppercase tracking-wide text-muted-foreground">
              📚 {t("Conversas recentes")}
            </div>

            <div className="flex-1 space-y-2 overflow-y-auto px-3 py-2">
              {[...threads].sort((a, b) => b.updatedAt - a.updatedAt).map((thread) => (
                <div key={thread.id}
                  className={`flex items-center gap-2 rounded-2xl border-2 px-3 py-2.5 ${
                    thread.id === activeId ? "border-primary bg-primary/10" : "border-border bg-background"
                  }`}>
                  <button type="button" onClick={() => openThread(thread.id)}
                    className="min-w-0 flex-1 text-left text-sm font-bold break-words">
                    {thread.title || autoTitle(thread.messages) || t("Nova conversa")}
                  </button>
                  <button type="button" aria-label={t("Excluir conversa")} onClick={() => setDeleteId(thread.id)}
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-muted-foreground">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </aside>
        </div>
      )}

      {deleteId && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center px-6">
          <div className="absolute inset-0 bg-foreground/50" onClick={() => setDeleteId(null)} />
          <div className="relative w-full max-w-xs rounded-3xl border-2 border-border bg-card p-5 text-center shadow-xl">
            <div className="mb-4 text-sm font-bold">{t("Tem certeza que deseja excluir esta conversa?")}</div>
            <div className="flex gap-2">
              <button type="button" onClick={() => setDeleteId(null)}
                className="flex-1 rounded-full bg-muted px-4 py-2.5 text-sm font-bold text-muted-foreground">
                {t("Cancelar")}
              </button>
              <button type="button" onClick={confirmDelete}
                className="flex-1 rounded-full bg-destructive px-4 py-2.5 text-sm font-bold text-destructive-foreground">
                {t("Excluir")}
              </button>
            </div>
          </div>
        </div>
      )}

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
          <DailyDialogs learnLang={normalizeLanguage(profile?.language)} country={profile?.country ?? null} />
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
              {m.role === "assistant" ? <AssistantReply content={t(m.content)} /> : m.content}
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

      {photoLimitReached && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-foreground/40 px-5">
          <div className="w-full max-w-sm rounded-3xl border-2 border-border bg-card p-5 shadow-xl">
            <div className="text-center">
              <div className="text-4xl">📷</div>
              <h2 className="mt-2 text-xl font-black">{t("Limite de fotos atingido")}</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                {t("Você atingiu o limite de fotos do seu plano atual. Escolha uma opção para continuar usando fotos.")}
              </p>
            </div>

            <div className="mt-4 space-y-3">
              <button
                type="button"
                onClick={() => { setPhotoLimitReached(false); navigate({ to: "/store" }); }}
                className="w-full rounded-2xl border-2 border-border bg-background p-4 text-left"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="font-black">✨ {t("Premium")}</div>
                  <div className="text-sm font-black text-primary">R$ 19,90/mês</div>
                </div>
                <div className="mt-1 text-sm text-muted-foreground">
                  📷 {t("10 análises de fotos por dia")}
                </div>
                <div className="mt-1 text-xs text-muted-foreground">
                  {t("Foco infinito, sem anúncios e prioridade nas respostas do Neko AI.")}
                </div>
              </button>

              <button
                type="button"
                onClick={() => { setPhotoLimitReached(false); navigate({ to: "/store" }); }}
                className="w-full rounded-2xl border-2 border-primary bg-primary/10 p-4 text-left"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="font-black">💎 {t("Premium Plus")}</div>
                  <div className="text-sm font-black text-primary">R$ 49,90/mês</div>
                </div>
                <div className="mt-1 text-sm font-black text-primary">
                  ♾️ {t("Análises de fotos ilimitadas")}
                </div>
                <div className="mt-1 text-xs text-muted-foreground">
                  {t("Tudo do Premium + mais liberdade no Neko AI e Diálogos do Dia a Dia.")}
                </div>
              </button>
            </div>

            <button
              type="button"
              onClick={() => setPhotoLimitReached(false)}
              className="mt-4 w-full rounded-2xl bg-muted py-3 text-sm font-bold text-muted-foreground"
            >
              {t("Agora não")}
            </button>
          </div>
        </div>
      )}

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
