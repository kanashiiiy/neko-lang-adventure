import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useRef, useEffect } from "react";
import { ArrowLeft, Volume2, RotateCcw, Check } from "lucide-react";
import { toast } from "sonner";
import { speakForLang } from "@/lib/speech";
import { EN_ALPHABET, EN_TO_BE, EN_PHRASES, EN_TENSES, EN_SECTION_META, type EnSection } from "@/lib/en-content";
import { useT, useTf } from "@/lib/i18n";

export const Route = createFileRoute("/_authenticated/alfabeto-en/$section")({
  component: AlfabetoEn,
});

function AlfabetoEn() {
  const t = useT();
  const { section } = Route.useParams();
  const sec = section as EnSection;
  const meta = EN_SECTION_META[sec];
  if (!meta) {
    return (
      <div className="mobile-shell items-center justify-center px-6 text-center">
        <p>{t("Seção não encontrada.")}</p>
        <Link to="/alfabeto" className="btn-3d mt-4 rounded-2xl bg-primary px-6 py-3 font-bold text-primary-foreground">{t("Voltar")}</Link>
      </div>
    );
  }
  return (
    <div className="mobile-shell">
      <header className="border-b-2 border-border bg-card px-4 py-3 flex items-center gap-3">
        <Link to="/alfabeto" className="text-muted-foreground"><ArrowLeft className="h-6 w-6" /></Link>
        <div className="flex-1">
          <div className="text-xs uppercase text-muted-foreground font-bold">{meta.description}</div>
          <div className="text-lg font-black">{meta.icon} {meta.label}</div>
        </div>
      </header>
      <main className="flex-1 overflow-y-auto px-4 py-4">
        {sec === "alphabet" && <AlphabetTab />}
        {sec === "to-be" && <ToBeTab />}
        {sec === "tenses" && <TensesTab />}
        {sec === "phrases" && <PhrasesTab />}
      </main>
    </div>
  );
}

function AlphabetTab() {
  const [idx, setIdx] = useState(0);
  const letter = EN_ALPHABET[idx];
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-5 gap-2">
        {EN_ALPHABET.map((l, i) => (
          <button key={l.char} onClick={() => { setIdx(i); speakForLang(l.char, "en"); }}
            className={`flex flex-col items-center gap-1 rounded-2xl p-3 shadow-card active:scale-95 transition ${
              i === idx ? "bg-primary text-primary-foreground" : "bg-card"
            }`}>
            <span className="text-2xl font-black">{l.char}</span>
            <span className="text-[10px] font-bold uppercase opacity-80">{l.phonetic}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function ToBeTab() {
  const t = useT();
  const [i, setI] = useState(0);
  const step = EN_TO_BE[i];
  const [answered, setAnswered] = useState<null | boolean>(null);
  const options = shuffleOptions(step.form, ["am", "are", "is"]);

  function pick(opt: string) {
    if (answered !== null) return;
    setAnswered(opt === step.form);
  }
  function next() {
    setAnswered(null);
    setI((v) => Math.min(EN_TO_BE.length - 1, v + 1));
  }
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <button onClick={() => { setAnswered(null); setI((v) => Math.max(0, v - 1)); }} disabled={i === 0}
          className="rounded-full bg-muted px-3 py-1 text-sm font-bold disabled:opacity-40">← {t("Anterior")}</button>
        <span className="text-xs font-bold uppercase text-muted-foreground">{i + 1} / {EN_TO_BE.length}</span>
        <button onClick={next} disabled={i === EN_TO_BE.length - 1}
          className="rounded-full bg-muted px-3 py-1 text-sm font-bold disabled:opacity-40">{t("Próximo")} →</button>
      </div>

      <div className="rounded-3xl bg-gradient-primary p-6 text-primary-foreground shadow-soft">
        <div className="text-xs uppercase opacity-90">{t("Passo")} {i + 1}</div>
        <div className="mt-1 text-4xl font-black">{step.full}</div>
        <div className="mt-1 text-sm opacity-90">{step.translation}</div>
        <button onClick={() => speakForLang(step.full, "en")}
          className="mt-3 inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-1.5 text-xs font-bold backdrop-blur">
          <Volume2 className="h-4 w-4" /> {t("Ouvir")}
        </button>
      </div>

      <div className="rounded-2xl bg-card p-4 shadow-card">
        <div className="text-xs font-bold uppercase text-muted-foreground">{t("Exemplo")}</div>
        <div className="mt-1 text-lg font-black">{step.example}</div>
        <div className="text-xs text-muted-foreground">{step.exampleTranslation}</div>
        <button onClick={() => speakForLang(step.example, "en")} className="mt-2 text-primary">
          <Volume2 className="h-5 w-5" />
        </button>
      </div>

      <div className="rounded-2xl bg-card p-4 shadow-card">
        <div className="text-xs font-bold uppercase text-muted-foreground">{t("Complete:")} {step.pronoun} ___</div>
        <div className="mt-3 grid grid-cols-3 gap-2">
          {options.map((opt) => {
            const isPick = answered !== null && opt === step.form;
            const wrong = answered === false && opt !== step.form;
            return (
              <button key={opt} onClick={() => pick(opt)}
                className={`rounded-2xl border-2 py-3 font-black transition ${
                  isPick ? "border-success bg-success/10 text-success" :
                  wrong ? "border-border" : "border-border bg-card"
                }`}>{opt}</button>
            );
          })}
        </div>
        {answered !== null && (
          <div className={`mt-3 rounded-2xl p-3 text-sm font-bold ${answered ? "bg-success/15 text-success" : "bg-destructive/15 text-destructive"}`}>
            {answered ? t("Perfeito! 🎉") : `${t("Correto:")} ${step.pronoun} ${step.form}`}
          </div>
        )}
      </div>

    </div>
  );
}

function PhrasesTab() {
  const [idx, setIdx] = useState(0);
  const p = EN_PHRASES[idx];
  return (
    <div className="space-y-3">
      {EN_PHRASES.map((ph, i) => (
        <button key={ph.text} onClick={() => { setIdx(i); speakForLang(ph.text, "en"); }}
          className={`flex w-full items-center gap-3 rounded-2xl p-4 text-left shadow-card active:scale-[0.99] transition ${
            i === idx ? "bg-primary text-primary-foreground" : "bg-card"
          }`}>
          <div className="flex-1">
            <div className="text-lg font-black">{ph.text}</div>
            <div className={`text-xs ${i === idx ? "opacity-90" : "text-muted-foreground"}`}>{ph.translation}</div>
          </div>
          <Volume2 className="h-6 w-6" />
        </button>
      ))}
    </div>
  );
}

function TensesTab() {
  const t = useT();
  const [idx, setIdx] = useState(0);
  const tenseStep = EN_TENSES[idx];
  const [answered, setAnswered] = useState<null | boolean>(null);
  const options = ["Present", "Past", "Future"];

  function pick(opt: string) {
    if (answered !== null) return;
    setAnswered(opt === tenseStep.tense);
  }
  function next() {
    setAnswered(null);
    setIdx((v) => Math.min(EN_TENSES.length - 1, v + 1));
  }
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <button onClick={() => { setAnswered(null); setIdx((v) => Math.max(0, v - 1)); }} disabled={idx === 0}
          className="rounded-full bg-muted px-3 py-1 text-sm font-bold disabled:opacity-40">← {t("Anterior")}</button>
        <span className="text-xs font-bold uppercase text-muted-foreground">{idx + 1} / {EN_TENSES.length}</span>
        <button onClick={next} disabled={idx === EN_TENSES.length - 1}
          className="rounded-full bg-muted px-3 py-1 text-sm font-bold disabled:opacity-40">{t("Próximo")} →</button>
      </div>

      <div className="rounded-3xl bg-gradient-primary p-6 text-primary-foreground shadow-soft">
        <div className="text-xs uppercase opacity-90">{tenseStep.tense}</div>
        <div className="mt-1 text-2xl font-black">{tenseStep.label}</div>
        <div className="mt-1 text-sm opacity-90">{tenseStep.translation}</div>
        <div className="mt-3 rounded-2xl bg-white/20 p-3 text-xs font-bold backdrop-blur">
          {t("Estrutura:")} {tenseStep.structure}
        </div>
      </div>

      <div className="rounded-2xl bg-card p-4 shadow-card">
        <div className="text-xs font-bold uppercase text-muted-foreground">{t("Exemplo")}</div>
        <div className="mt-1 text-lg font-black">{tenseStep.example}</div>
        <div className="text-xs text-muted-foreground">{tenseStep.exampleTranslation}</div>
        <button onClick={() => speakForLang(tenseStep.example, "en")} className="mt-2 text-primary">
          <Volume2 className="h-5 w-5" />
        </button>
      </div>

      <div className="rounded-2xl bg-card p-4 shadow-card">
        <div className="text-xs font-bold uppercase text-muted-foreground">{t("A qual tempo pertence?")}</div>
        <div className="mt-3 grid grid-cols-3 gap-2">
          {options.map((opt) => {
            const isPick = answered !== null && opt === tenseStep.tense;
            const wrong = answered === false && opt !== tenseStep.tense;
            return (
              <button key={opt} onClick={() => pick(opt)}
                className={`rounded-2xl border-2 py-3 font-black transition ${
                  isPick ? "border-success bg-success/10 text-success" :
                  wrong ? "border-border" : "border-border bg-card"
                }`}>{opt}</button>
            );
          })}
        </div>
        {answered !== null && (
          <div className={`mt-3 rounded-2xl p-3 text-sm font-bold ${answered ? "bg-success/15 text-success" : "bg-destructive/15 text-destructive"}`}>
            {answered ? t("Perfeito! 🎉") : `${t("Correto:")} ${tenseStep.tense}`}
          </div>
        )}
      </div>

    </div>
  );
}

function shuffleOptions(correct: string, all: string[]) {
  const rest = all.filter((x) => x !== correct);
  return [correct, ...rest].sort(() => Math.random() - 0.5);
}

// Shared write practice — used across languages.
export function WritePractice({ target, lang, phonetic }: { target: string; lang: "en" | "pt" | "ja"; phonetic?: string }) {
  const t = useT();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawing = useRef(false);
  const [hasDrawn, setHasDrawn] = useState(false);

  useEffect(() => { clear(); /* reset on target change */
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target]);

  function clear() {
    const c = canvasRef.current; if (!c) return;
    const ctx = c.getContext("2d"); if (!ctx) return;
    ctx.clearRect(0, 0, c.width, c.height); setHasDrawn(false);
  }
  function pos(e: React.PointerEvent<HTMLCanvasElement>) {
    const c = canvasRef.current!; const r = c.getBoundingClientRect();
    return { x: ((e.clientX - r.left) / r.width) * c.width, y: ((e.clientY - r.top) / r.height) * c.height };
  }
  function start(e: React.PointerEvent<HTMLCanvasElement>) {
    drawing.current = true;
    const ctx = canvasRef.current!.getContext("2d")!;
    ctx.strokeStyle = "#6C3EFF"; ctx.lineWidth = 8; ctx.lineCap = "round"; ctx.lineJoin = "round";
    const p = pos(e); ctx.beginPath(); ctx.moveTo(p.x, p.y);
    (e.target as Element).setPointerCapture?.(e.pointerId);
  }
  function move(e: React.PointerEvent<HTMLCanvasElement>) {
    if (!drawing.current) return;
    const ctx = canvasRef.current!.getContext("2d")!;
    const p = pos(e); ctx.lineTo(p.x, p.y); ctx.stroke(); setHasDrawn(true);
  }
  function end() { drawing.current = false; }

  return (
    <div className="rounded-3xl bg-card p-4 shadow-card">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-xs font-bold uppercase text-muted-foreground">{t("Pratique escrevendo")}</div>
          <div className="text-3xl font-black leading-tight">{target}</div>
          {phonetic && <div className="text-xs text-muted-foreground">{phonetic}</div>}
        </div>
        <button onClick={() => speakForLang(target, lang)} className="text-primary">
          <Volume2 className="h-6 w-6" />
        </button>
      </div>
      <div className="relative mt-3">
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center text-[9rem] font-black text-muted-foreground/15 select-none animate-stroke-guide">
          {target.length <= 3 ? target : ""}
        </div>
        <canvas ref={canvasRef} width={600} height={600}
          onPointerDown={start} onPointerMove={move} onPointerUp={end} onPointerLeave={end}
          className="w-full aspect-square rounded-3xl border-2 border-dashed border-border bg-white touch-none" />
      </div>
      <div className="mt-3 flex gap-2 justify-end">
        <button onClick={clear} className="flex items-center gap-1 rounded-full bg-muted px-3 py-1.5 text-xs font-bold">
          <RotateCcw className="h-3 w-3" /> {t("Limpar")}
        </button>
        <button onClick={() => { toast.success(hasDrawn ? t("Ótimo trabalho! ✏️") : t("Desenhe primeiro!")); if (hasDrawn) clear(); }}
          className="btn-3d flex items-center gap-1 rounded-full bg-primary px-3 py-1.5 text-xs font-bold text-primary-foreground">
          <Check className="h-3 w-3" /> {t("Verificar")}
        </button>
      </div>
    </div>
  );
}
