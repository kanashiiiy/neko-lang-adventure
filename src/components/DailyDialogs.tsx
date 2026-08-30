import { useEffect, useState } from "react";
import { ArrowLeft, Volume2, Mic, Star, ChevronRight } from "lucide-react";
import { DIALOG_CATEGORIES, USE_TEXT, categoryById, type LearnLang, type Phrase } from "@/lib/dialogs";
import { useT, useUiLang, type UiLang } from "@/lib/i18n";
import { speakForLang, getRecognition, matchSpeech, isRecognitionSupported } from "@/lib/speech";

const FAV_KEY = "nekoteach:dialog-favs";

function readFavs(): string[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(FAV_KEY) ?? "[]") as string[];
  } catch {
    return [];
  }
}

/** Tradução da frase: idioma da interface quando disponível, senão inglês. */
function translationFor(phrase: Phrase, uiLang: UiLang) {
  if (uiLang === "pt" || uiLang === "en" || uiLang === "ja") return phrase.text[uiLang];
  return phrase.text.en;
}

export function DailyDialogs({ learnLang }: { learnLang: LearnLang }) {
  const t = useT();
  const uiLang = useUiLang();
  const [catId, setCatId] = useState<string | null>(null);
  const [phraseId, setPhraseId] = useState<string | null>(null);
  const [favs, setFavs] = useState<string[]>([]);
  const [listening, setListening] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  useEffect(() => setFavs(readFavs()), []);

  function toggleFav(id: string) {
    setFavs((prev) => {
      const next = prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id];
      try {
        localStorage.setItem(FAV_KEY, JSON.stringify(next));
      } catch {
        /* ignore */
      }
      return next;
    });
  }

  const category = catId ? categoryById(catId) : null;
  const phrase = category && phraseId ? category.phrases.find((p) => p.id === phraseId) ?? null : null;

  // ---------- Tela da frase ----------
  if (category && phrase) {
    const reply = category.phrases[phrase.reply] ?? category.phrases[0];
    const fav = favs.includes(phrase.id);

    function practice() {
      if (!isRecognitionSupported()) {
        setFeedback(t("Seu navegador não suporta microfone."));
        return;
      }
      const map = { pt: "pt-BR", en: "en-US", ja: "ja-JP" } as const;
      const rec = getRecognition(map[learnLang]);
      if (!rec) return;
      setFeedback(null);
      setListening(true);
      rec.onresult = (e) => {
        const alts = Array.from(e.results[0] ?? []).map((r) => ({
          transcript: r.transcript,
          confidence: r.confidence,
        }));
        setFeedback(matchSpeech(phrase!.text[learnLang], alts) ? t("Muito bem! 🎉") : t("Quase lá, tente de novo."));
      };
      rec.onerror = () => setFeedback(t("Quase lá, tente de novo."));
      rec.onend = () => setListening(false);
      rec.start();
    }

    return (
      <div className="flex-1 overflow-y-auto px-4 py-4">
        <button onClick={() => setPhraseId(null)} className="mb-3 flex items-center gap-1 text-sm font-bold text-muted-foreground">
          <ArrowLeft className="h-4 w-4" /> {t(category.name)}
        </button>

        {/* Ilustração da situação */}
        <div className="flex h-40 items-center justify-center rounded-3xl bg-gradient-primary text-7xl shadow-soft">
          <span aria-hidden>{category.emoji}</span>
        </div>

        <div className="mt-4 rounded-3xl bg-card p-5 shadow-card">
          <div className="text-[11px] font-bold uppercase tracking-wide text-muted-foreground">{t("Frase")}</div>
          <div className="mt-1 text-2xl font-black leading-snug">{phrase.text[learnLang]}</div>

          <div className="mt-3 text-[11px] font-bold uppercase tracking-wide text-muted-foreground">{t("Tradução")}</div>
          <div className="text-base">{translationFor(phrase, uiLang)}</div>

          {learnLang === "ja" && (
            <>
              <div className="mt-3 text-[11px] font-bold uppercase tracking-wide text-muted-foreground">{t("Pronúncia")}</div>
              <div className="text-base italic text-primary">{phrase.romaji}</div>
            </>
          )}

          <div className="mt-4 flex flex-wrap gap-2">
            <button onClick={() => speakForLang(phrase.text[learnLang], learnLang)}
              className="flex items-center gap-2 rounded-full bg-primary px-4 py-2.5 text-sm font-bold text-primary-foreground">
              <Volume2 className="h-4 w-4" /> {t("Ouvir")}
            </button>
            <button onClick={practice}
              className="flex items-center gap-2 rounded-full bg-muted px-4 py-2.5 text-sm font-bold">
              <Mic className="h-4 w-4" /> {listening ? t("Ouvindo...") : t("Praticar")}
            </button>
            <button onClick={() => toggleFav(phrase.id)}
              className={`flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-bold ${
                fav ? "bg-gold text-gold-foreground" : "bg-muted"
              }`}>
              <Star className={`h-4 w-4 ${fav ? "fill-current" : ""}`} /> {fav ? t("Favorito") : t("Favoritar")}
            </button>
          </div>

          {feedback && <div className="mt-3 text-sm font-bold text-primary">{feedback}</div>}
        </div>

        <div className="mt-4 rounded-3xl bg-card p-5 shadow-card">
          <div className="text-[11px] font-bold uppercase tracking-wide text-muted-foreground">{t("Quando usar")}</div>
          <p className="mt-1 text-sm">{t(USE_TEXT[phrase.use])}</p>
        </div>

        <div className="mt-4 mb-6 rounded-3xl bg-card p-5 shadow-card">
          <div className="text-[11px] font-bold uppercase tracking-wide text-muted-foreground">{t("Exemplo em diálogo")}</div>
          <div className="mt-2 space-y-2 text-sm">
            <div className="rounded-2xl bg-muted px-3 py-2">
              <div className="font-bold">A: {phrase.text[learnLang]}</div>
              <div className="text-muted-foreground">{translationFor(phrase, uiLang)}</div>
            </div>
            <div className="rounded-2xl bg-muted px-3 py-2">
              <div className="font-bold">B: {reply.text[learnLang]}</div>
              <div className="text-muted-foreground">{translationFor(reply, uiLang)}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ---------- Lista de frases da categoria ----------
  if (category) {
    return (
      <div className="flex-1 overflow-y-auto px-4 py-4">
        <button onClick={() => setCatId(null)} className="mb-3 flex items-center gap-1 text-sm font-bold text-muted-foreground">
          <ArrowLeft className="h-4 w-4" /> {t("Escolha uma categoria")}
        </button>
        <h2 className="mb-3 text-xl font-black">
          <span aria-hidden className="mr-2">{category.emoji}</span>
          {t(category.name)}
        </h2>
        <div className="space-y-2 pb-4">
          {category.phrases.map((p) => (
            <button key={p.id} onClick={() => { setPhraseId(p.id); setFeedback(null); }}
              className="flex w-full items-center justify-between gap-3 rounded-2xl bg-card p-4 text-left shadow-card">
              <span>
                <span className="block font-bold">{p.text[learnLang]}</span>
                <span className="block text-xs text-muted-foreground">{translationFor(p, uiLang)}</span>
              </span>
              <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" />
            </button>
          ))}
        </div>
      </div>
    );
  }

  // ---------- Categorias ----------
  return (
    <div className="flex-1 overflow-y-auto px-4 py-4">
      <p className="mb-3 text-sm text-muted-foreground">{t("Escolha uma categoria")}</p>
      <div className="grid grid-cols-2 gap-3 pb-4">
        {DIALOG_CATEGORIES.map((c) => (
          <button key={c.id} onClick={() => setCatId(c.id)}
            className="rounded-2xl bg-card p-4 text-left shadow-card">
            <div className="text-3xl" aria-hidden>{c.emoji}</div>
            <div className="mt-1 font-bold leading-tight">{t(c.name)}</div>
            <div className="text-xs text-muted-foreground">{c.phrases.length} {t("frases")}</div>
          </button>
        ))}
      </div>
    </div>
  );
}
