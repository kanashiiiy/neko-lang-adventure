import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useRef, useEffect } from "react";
import { ArrowLeft, Volume2, RotateCcw, Check } from "lucide-react";
import { ALPHABETS, ALPHABET_META, VOCAB, type AlphabetSystem } from "@/lib/alphabet";
import { speak } from "@/lib/speech";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/alfabeto/$system")({
  component: AlfabetoSystem,
});

type Tab = "table" | "write" | "vocab";

function AlfabetoSystem() {
  const { system } = Route.useParams();
  const sys = system as AlphabetSystem;
  const [tab, setTab] = useState<Tab>("table");
  const meta = ALPHABET_META[sys];

  if (!meta) {
    return (
      <div className="mobile-shell items-center justify-center px-6 text-center">
        <p>Sistema não encontrado.</p>
        <Link to="/alfabeto" className="btn-3d mt-4 rounded-2xl bg-primary px-6 py-3 font-bold text-primary-foreground">Voltar</Link>
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

      <div className="grid grid-cols-3 gap-1 border-b-2 border-border bg-card p-1">
        <TabButton active={tab === "table"} onClick={() => setTab("table")}>Tabela</TabButton>
        <TabButton active={tab === "write"} onClick={() => setTab("write")}>Escrever</TabButton>
        <TabButton active={tab === "vocab"} onClick={() => setTab("vocab")}>Vocabulário</TabButton>
      </div>

      <main className="flex-1 overflow-y-auto px-4 py-4">
        {tab === "table" && <TableTab system={sys} />}
        {tab === "write" && <WriteTab system={sys} />}
        {tab === "vocab" && <VocabTab system={sys} />}
      </main>
    </div>
  );
}

function TabButton({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button onClick={onClick}
      className={`rounded-xl py-2 text-sm font-bold transition ${active ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`}>
      {children}
    </button>
  );
}

function TableTab({ system }: { system: AlphabetSystem }) {
  const letters = ALPHABETS[system];
  const grouped: Record<string, typeof letters> = {};
  for (const l of letters) {
    (grouped[l.group] ??= []).push(l);
  }
  return (
    <div className="space-y-5">
      {Object.entries(grouped).map(([g, arr]) => (
        <div key={g}>
          <h3 className="mb-2 text-xs font-bold uppercase tracking-wide text-muted-foreground">Grupo {g}</h3>
          <div className="grid grid-cols-5 gap-2">
            {arr.map((l) => (
              <button key={l.char} onClick={() => speak(l.char, "ja-JP")}
                className="flex flex-col items-center gap-1 rounded-2xl bg-card p-3 shadow-card active:scale-95 transition">
                <span className="text-2xl font-black">{l.char}</span>
                <span className="text-[10px] font-bold text-muted-foreground uppercase">{l.romaji}</span>
              </button>
            ))}
          </div>
        </div>
      ))}
      <p className="text-center text-xs text-muted-foreground pt-2">Toque em uma letra para ouvir a pronúncia</p>
    </div>
  );
}

function WriteTab({ system }: { system: AlphabetSystem }) {
  const letters = ALPHABETS[system];
  const [idx, setIdx] = useState(0);
  const letter = letters[idx];
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawing = useRef(false);
  const [hasDrawn, setHasDrawn] = useState(false);

  useEffect(() => { clear(); /* reset on letter change */
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idx]);

  function clear() {
    const c = canvasRef.current; if (!c) return;
    const ctx = c.getContext("2d"); if (!ctx) return;
    ctx.clearRect(0, 0, c.width, c.height);
    setHasDrawn(false);
  }

  function pos(e: React.PointerEvent<HTMLCanvasElement>) {
    const c = canvasRef.current!; const r = c.getBoundingClientRect();
    return { x: ((e.clientX - r.left) / r.width) * c.width, y: ((e.clientY - r.top) / r.height) * c.height };
  }

  function start(e: React.PointerEvent<HTMLCanvasElement>) {
    drawing.current = true;
    const c = canvasRef.current!; const ctx = c.getContext("2d")!;
    ctx.strokeStyle = "#6C3EFF"; ctx.lineWidth = 8; ctx.lineCap = "round"; ctx.lineJoin = "round";
    const p = pos(e); ctx.beginPath(); ctx.moveTo(p.x, p.y);
    (e.target as Element).setPointerCapture?.(e.pointerId);
  }
  function move(e: React.PointerEvent<HTMLCanvasElement>) {
    if (!drawing.current) return;
    const ctx = canvasRef.current!.getContext("2d")!;
    const p = pos(e); ctx.lineTo(p.x, p.y); ctx.stroke();
    setHasDrawn(true);
  }
  function end() { drawing.current = false; }

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex items-center justify-between w-full">
        <button onClick={() => setIdx((i) => Math.max(0, i - 1))} disabled={idx === 0}
          className="rounded-full bg-muted px-3 py-1 text-sm font-bold disabled:opacity-40">← Anterior</button>
        <span className="text-xs font-bold uppercase text-muted-foreground">{idx + 1} / {letters.length}</span>
        <button onClick={() => setIdx((i) => Math.min(letters.length - 1, i + 1))} disabled={idx === letters.length - 1}
          className="rounded-full bg-muted px-3 py-1 text-sm font-bold disabled:opacity-40">Próxima →</button>
      </div>

      <div className="flex w-full flex-col items-center rounded-3xl bg-card p-4 shadow-card">
        <button onClick={() => speak(letter.char, "ja-JP")} className="text-primary mb-2">
          <Volume2 className="h-5 w-5" />
        </button>
        <div className="text-8xl font-black leading-none">{letter.char}</div>
        <div className="mt-2 text-sm font-bold uppercase text-muted-foreground">{letter.romaji}</div>
        <div className="mt-1 text-[10px] text-muted-foreground">Observe a letra e tente reproduzir abaixo</div>
      </div>

      <div className="w-full">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-xs font-bold uppercase text-muted-foreground">Desenhe aqui</span>
          <div className="flex gap-2">
            <button onClick={clear} className="flex items-center gap-1 rounded-full bg-muted px-3 py-1 text-xs font-bold">
              <RotateCcw className="h-3 w-3" /> Limpar
            </button>
            <button onClick={() => { toast.success(hasDrawn ? "Continue praticando! ✏️" : "Desenhe primeiro!"); if (hasDrawn) clear(); }}
              className="btn-3d flex items-center gap-1 rounded-full bg-primary px-3 py-1 text-xs font-bold text-primary-foreground">
              <Check className="h-3 w-3" /> Verificar
            </button>
          </div>
        </div>
        <canvas ref={canvasRef} width={600} height={600}
          onPointerDown={start} onPointerMove={move} onPointerUp={end} onPointerLeave={end}
          className="w-full aspect-square rounded-3xl border-2 border-dashed border-border bg-white touch-none" />
      </div>
    </div>
  );
}

function VocabTab({ system }: { system: AlphabetSystem }) {
  const words = VOCAB[system];
  return (
    <div className="space-y-2">
      {words.map((v) => (
        <button key={v.word} onClick={() => speak(v.word, "ja-JP")}
          className="flex w-full items-center gap-3 rounded-2xl bg-card p-4 text-left shadow-card active:scale-[0.99] transition">
          <div className="flex-1">
            <div className="text-xl font-black">{v.word}</div>
            {v.reading && <div className="text-xs text-muted-foreground">{v.reading}</div>}
            <div className="text-sm font-semibold text-primary">{v.translation}</div>
          </div>
          <Volume2 className="h-6 w-6 text-primary" />
        </button>
      ))}
      <p className="text-center text-xs text-muted-foreground pt-2">Toque em uma palavra para ouvir</p>
    </div>
  );
}
