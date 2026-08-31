import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, Volume2 } from "lucide-react";
import { speakForLang } from "@/lib/speech";
import { PT_ALPHABET, PT_SYLLABLES, PT_PHRASES, PT_SECTION_META, type PtSection } from "@/lib/pt-content";

import { useT, useTf } from "@/lib/i18n";

export const Route = createFileRoute("/_authenticated/alfabeto-pt/$section")({
  component: AlfabetoPt,
});

function AlfabetoPt() {
  const t = useT();
  const { section } = Route.useParams();
  const sec = section as PtSection;
  const meta = PT_SECTION_META[sec];
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
        {sec === "syllables" && <SyllablesTab />}
        {sec === "phrases" && <PhrasesTab />}
      </main>
    </div>
  );
}

function AlphabetTab() {
  const [idx, setIdx] = useState(0);
  const letter = PT_ALPHABET[idx];
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-5 gap-2">
        {PT_ALPHABET.map((l, i) => (
          <button key={l.char} onClick={() => { setIdx(i); speakForLang(l.char, "pt"); }}
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

function SyllablesTab() {
  const t = useT();
  const tf = useTf();
  const [current, setCurrent] = useState(PT_SYLLABLES[0].syllables[0]);
  return (
    <div className="space-y-5">
      {PT_SYLLABLES.map((row) => (
        <div key={row.group}>
          <h3 className="mb-2 text-xs font-bold uppercase tracking-wide text-muted-foreground">{tf("Grupo {g}", { g: row.group })}</h3>
          <div className="grid grid-cols-5 gap-2">
            {row.syllables.map((s) => (
              <button key={s} onClick={() => { setCurrent(s); speakForLang(s, "pt"); }}
                className={`rounded-2xl p-3 text-center shadow-card active:scale-95 transition ${
                  current === s ? "bg-primary text-primary-foreground" : "bg-card"
                }`}>
                <span className="text-lg font-black">{s}</span>
              </button>
            ))}
          </div>
        </div>
      ))}
      <p className="text-center text-xs text-muted-foreground">{t("Toque em uma sílaba para ouvir")}</p>
    </div>
  );
}

function PhrasesTab() {
  const [idx, setIdx] = useState(0);
  const p = PT_PHRASES[idx];
  return (
    <div className="space-y-3">
      {PT_PHRASES.map((ph, i) => (
        <button key={ph.text} onClick={() => { setIdx(i); speakForLang(ph.text, "pt"); }}
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
