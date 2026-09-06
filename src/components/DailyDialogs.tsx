import { useEffect, useState } from "react";
import { ArrowLeft, Volume2, Mic, Heart, ChevronRight, Lightbulb } from "lucide-react";
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
function translationFor(phrase: Pick<Phrase, "text">, uiLang: UiLang) {
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

  /** Abre a frase e já reproduz o áudio no idioma estudado. */
  function openPhrase(p: Phrase) {
    setPhraseId(p.id);
    setFeedback(null);
    speakForLang(p.text[learnLang], learnLang);
  }

  const category = catId ? categoryById(catId) : null;
  const phrase = category && phraseId ? category.phrases.find((p) => p.id === phraseId) ?? null : null;

  // ---------- Tela da frase ----------
  if (category && phrase) {
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
        {/* Cabeçalho da frase */}
        <div className="mb-3 flex items-center gap-2">
          <button onClick={() => setPhraseId(null)} aria-label={t("Voltar")}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-muted">
            <ArrowLeft className="h-4 w-4" />
          </button>
          <h2 className="flex-1 break-words text-center text-lg font-black">{t(category.name)}</h2>
          <button onClick={() => toggleFav(phrase.id)} aria-label={t("Favoritar")}
            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${
              fav ? "bg-gold text-gold-foreground" : "bg-muted text-muted-foreground"
            }`}>
            <Heart className={`h-4 w-4 ${fav ? "fill-current" : ""}`} />
          </button>
        </div>

        {/* Ilustração da situação */}
        <div className="relative flex h-44 items-center justify-center rounded-3xl bg-gradient-primary shadow-soft">
          <span aria-hidden className="text-7xl">{category.emoji}</span>
          <div className="absolute bottom-3 right-3 max-w-[60%] rounded-2xl bg-card px-3 py-2 shadow-card">
            <div className="break-words text-sm font-black leading-tight">{phrase.text[learnLang]}</div>
            {learnLang === "ja" && <div className="break-words text-xs italic leading-snug text-primary">{phrase.romaji}</div>}
          </div>
        </div>

        {/* Cartão principal */}
        <div className="mt-4 rounded-3xl bg-card p-5 shadow-card">
          <div className="flex items-start gap-3">
            <div className="min-w-0 flex-1">
              <div className="break-words text-2xl font-black leading-snug">{phrase.text[learnLang]}</div>
              {learnLang === "ja" && <div className="mt-1 break-words text-base italic leading-snug text-primary">{phrase.romaji}</div>}
              <div className="mt-1 break-words text-base leading-snug text-muted-foreground">{translationFor(phrase, uiLang)}</div>
            </div>
            <button onClick={() => speakForLang(phrase.text[learnLang], learnLang)} aria-label={t("Ouvir")}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Volume2 className="h-5 w-5" />
            </button>
          </div>

          <div className="mt-4 rounded-2xl bg-muted p-3">
            <div className="flex items-center gap-2 text-sm font-bold text-primary">
              <Lightbulb className="h-4 w-4" /> {t("Quando usar")}
            </div>
            <p className="mt-1 break-words text-sm leading-snug text-muted-foreground">{t(USE_TEXT[phrase.use])}</p>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-2">
            <button onClick={() => speakForLang(phrase.text[learnLang], learnLang)}
              className="flex items-center justify-center gap-1.5 rounded-2xl border-2 border-border bg-background px-2 py-2.5 text-sm font-bold">
              <Volume2 className="h-4 w-4 text-primary" /> {t("Ouvir")}
            </button>
            <button onClick={practice}
              className="flex items-center justify-center gap-1.5 rounded-2xl border-2 border-border bg-background px-2 py-2.5 text-sm font-bold">
              <Mic className="h-4 w-4 text-primary" /> {listening ? t("Ouvindo...") : t("Praticar")}
            </button>
            <button onClick={() => toggleFav(phrase.id)}
              className={`flex items-center justify-center gap-1.5 rounded-2xl border-2 px-2 py-2.5 text-sm font-bold ${
                fav ? "border-gold bg-gold text-gold-foreground" : "border-border bg-background"
              }`}>
              <Heart className={`h-4 w-4 ${fav ? "fill-current" : "text-primary"}`} /> {t("Favoritar")}
            </button>
          </div>

          {feedback && <div className="mt-3 text-sm font-bold text-primary">{feedback}</div>}
        </div>

        {/* Exemplos de uso */}
        <div className="mt-5 mb-6">
          <h3 className="mb-2 text-lg font-black">{t("Exemplo em diálogo")}</h3>
          <div className="space-y-2">
            {phrase.examples.map((ex) => (
              <div key={ex.id} className="flex items-start gap-3 rounded-2xl bg-card p-4 shadow-card">
                <div className="min-w-0 flex-1">
                  <div className="break-words font-bold leading-snug">{ex.text[learnLang]}</div>
                  {learnLang === "ja" && <div className="break-words text-xs italic leading-snug text-muted-foreground">{ex.romaji}</div>}
                  <div className="break-words text-sm leading-snug text-muted-foreground">{translationFor(ex, uiLang)}</div>
                </div>
                <button onClick={() => speakForLang(ex.text[learnLang], learnLang)} aria-label={t("Ouvir")}
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Volume2 className="h-4 w-4" />
                </button>
              </div>
            ))}
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
            <button key={p.id} onClick={() => openPhrase(p)}
              className="flex w-full items-start justify-between gap-3 rounded-2xl bg-card p-4 text-left shadow-card">
              <span className="min-w-0 flex-1">
                <span className="block break-words font-bold leading-snug">{p.text[learnLang]}</span>
                {learnLang === "ja" && <span className="block break-words text-xs italic leading-snug text-muted-foreground">{p.romaji}</span>}
                <span className="block break-words text-xs leading-snug text-muted-foreground">{translationFor(p, uiLang)}</span>
              </span>
              <ChevronRight className="mt-1 h-4 w-4 shrink-0 text-muted-foreground" />
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
      <div className="space-y-2 pb-4">
        {DIALOG_CATEGORIES.map((c) => (
          <button key={c.id} onClick={() => setCatId(c.id)}
            className="flex w-full items-center gap-3 rounded-2xl bg-card p-4 text-left shadow-card">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-muted text-2xl" aria-hidden>
              {c.emoji}
            </span>
            <span className="min-w-0 flex-1">
              <span className="block font-black leading-tight">{t(c.name)}</span>
              <span className="block break-words text-xs leading-snug text-muted-foreground">
                {c.phrases[0] ? translationFor(c.phrases[0], uiLang) : `${c.phrases.length} ${t("frases")}`}
              </span>
            </span>
            <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" />
          </button>
        ))}
      </div>
    </div>
  );
}
