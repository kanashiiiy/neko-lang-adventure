import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState, useRef, useEffect, useMemo } from "react";
import { ArrowLeft, Volume2, RotateCcw, Check, ChevronRight } from "lucide-react";
import { CATEGORIES, ALPHABET_META, categoriesForLevel, type AlphabetSystem, type Category, type Letter } from "@/lib/alphabet";
import { speak } from "@/lib/speech";
import { supabase } from "@/integrations/supabase/client";
import { fetchProfile } from "@/lib/profile";
import { toast } from "@/lib/neko-toast";
import { useT, useTf } from "@/lib/i18n";

export const Route = createFileRoute("/_authenticated/alfabeto/$system")({
  component: AlfabetoSystem,
});

type Tab = "table" | "write" | "vocab" | "exercise" | "review";

function AlfabetoSystem() {
  const t = useT();
  const tf = useTf();
  const { system } = Route.useParams();
  const sys = system as AlphabetSystem;
  const meta = ALPHABET_META[sys];
  const [categoryId, setCategoryId] = useState<string | null>(null);
  const [tab, setTab] = useState<Tab>("table");

  const { data: profile } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const { data } = await supabase.auth.getUser();
      if (!data.user) return null;
      return fetchProfile(data.user.id);
    },
  });

  const cats = useMemo(
    () => (meta ? categoriesForLevel(sys, profile?.level) : []),
    [meta, sys, profile?.level],
  );

  if (!meta) {
    return (
      <div className="mobile-shell items-center justify-center px-6 text-center">
        <p>{t("Sistema não encontrado.")}</p>
        <Link to="/alfabeto" className="btn-3d mt-4 rounded-2xl bg-primary px-6 py-3 font-bold text-primary-foreground">{t("Voltar")}</Link>
      </div>
    );
  }

  const category = cats.find((c) => c.id === categoryId) ?? null;

  return (
    <div className="mobile-shell">
      <header className="border-b-2 border-border bg-card px-4 py-3 flex items-center gap-3">
        <button
          onClick={() => (category ? setCategoryId(null) : window.history.back())}
          className="text-muted-foreground"
          aria-label={t("Voltar")}
        >
          <ArrowLeft className="h-6 w-6" />
        </button>
        <div className="flex-1">
          <div className="text-xs uppercase text-muted-foreground font-bold">
            {category ? meta.label : meta.description}
          </div>
          <div className="text-lg font-black">
            {category ? `${category.icon} ${category.label}` : `${meta.icon} ${meta.label}`}
          </div>
        </div>
      </header>

      {!category && (
        <main className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
          <p className="text-xs text-muted-foreground px-1">{t("Escolha uma categoria para começar")}</p>
          {cats.map((c) => (
            <button
              key={c.id}
              onClick={() => { setCategoryId(c.id); setTab("table"); }}
              className="btn-3d flex w-full items-center gap-4 rounded-3xl bg-card p-4 shadow-card text-left active:scale-[0.99] transition"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-3xl font-black text-primary">
                {c.icon}
              </div>
              <div className="flex-1">
                <div className="text-lg font-black">{c.label}</div>
                <div className="text-xs text-muted-foreground">{c.description}</div>
                <div className="text-[10px] font-bold uppercase text-primary mt-1">{tf("{n} itens", { n: c.letters.length })}</div>
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </button>
          ))}
          {cats.length === 0 && (
            <p className="text-center text-sm text-muted-foreground pt-8">
              {t("Nenhuma categoria disponível para o seu nível.")}
            </p>
          )}
        </main>
      )}

      {category && (
        <>
          <div className="grid grid-cols-5 gap-1 border-b-2 border-border bg-card p-1">
            <TabButton active={tab === "table"} onClick={() => setTab("table")}>{t("Alfabeto")}</TabButton>
            <TabButton active={tab === "write"} onClick={() => setTab("write")}>{t("Escrever")}</TabButton>
            <TabButton active={tab === "vocab"} onClick={() => setTab("vocab")}>{t("Palavras")}</TabButton>
            <TabButton active={tab === "exercise"} onClick={() => setTab("exercise")}>{t("Exerc.")}</TabButton>
            <TabButton active={tab === "review"} onClick={() => setTab("review")}>{t("Revisão")}</TabButton>
          </div>

          <main className="flex-1 overflow-y-auto px-4 py-4">
            {tab === "table" && <TableTab system={sys} category={category} />}
            {tab === "write" && <WriteTab category={category} />}
            {tab === "vocab" && <VocabTab category={category} system={sys} />}
            {tab === "exercise" && <ExerciseTab category={category} />}
            {tab === "review" && <ReviewTab category={category} />}
          </main>
        </>
      )}
    </div>
  );
}

function TabButton({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button onClick={onClick}
      className={`rounded-xl py-2 text-xs font-bold transition ${active ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`}>
      {children}
    </button>
  );
}

function TableTab({ system, category }: { system: AlphabetSystem; category: Category }) {
  const t = useT();
  const tf = useTf();
  const grouped: Record<string, Letter[]> = {};
  for (const l of category.letters) (grouped[l.group] ??= []).push(l);
  const isKanji = system === "kanji";

  if (isKanji) {
    return (
      <div className="space-y-3">
        {category.letters.map((l) => (
          <div key={l.char} className="rounded-2xl bg-card p-4 shadow-card">
            <div className="flex items-start gap-4">
              <button onClick={() => speak(l.char, "ja-JP")}
                className="flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10 text-5xl font-black text-primary active:scale-95">
                {l.char}
              </button>
              <div className="flex-1 space-y-1">
                <div className="text-sm"><span className="font-bold text-muted-foreground">{t("Onyomi:")}</span> {l.onyomi}</div>
                <div className="text-sm"><span className="font-bold text-muted-foreground">{t("Kunyomi:")}</span> {l.kunyomi}</div>
                <div className="text-sm"><span className="font-bold text-muted-foreground">{t("Romaji:")}</span> {l.romaji}</div>
                <div className="text-sm font-semibold text-primary">{l.meaning}</div>
              </div>
              <button onClick={() => speak(l.char, "ja-JP")} className="text-primary">
                <Volume2 className="h-5 w-5" />
              </button>
            </div>
            {l.examples && l.examples.length > 0 && (
              <div className="mt-3 border-t border-border pt-2 space-y-1">
                <div className="text-[10px] font-bold uppercase text-muted-foreground">{t("Exemplos")}</div>
                {l.examples.map((ex) => (
                  <button key={ex.word} onClick={() => speak(ex.word, "ja-JP")}
                    className="flex w-full items-center justify-between rounded-xl bg-muted/40 px-3 py-2 text-left active:scale-[0.99]">
                    <div>
                      <div className="text-sm font-bold">{ex.word} <span className="text-xs font-normal text-muted-foreground">({ex.reading})</span></div>
                      <div className="text-xs text-primary">{ex.translation}</div>
                    </div>
                    <Volume2 className="h-4 w-4 text-primary" />
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
        <p className="text-center text-xs text-muted-foreground pt-2">{t("Toque no kanji ou nos exemplos para ouvir")}</p>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {Object.entries(grouped).map(([g, arr]) => (
        <div key={g}>
          <h3 className="mb-2 text-xs font-bold uppercase tracking-wide text-muted-foreground">{tf("Grupo {g}", { g })}</h3>
          <div className="grid grid-cols-5 gap-2">
            {arr.map((l) => (
              <button key={l.char + l.romaji} onClick={() => speak(l.char, "ja-JP")}
                className="flex flex-col items-center gap-1 rounded-2xl bg-card p-3 shadow-card active:scale-95 transition">
                <span className="text-2xl font-black">{l.char}</span>
                <span className="text-[10px] font-bold text-muted-foreground uppercase">{l.romaji}</span>
              </button>
            ))}
          </div>
        </div>
      ))}
      <p className="text-center text-xs text-muted-foreground pt-2">{t("Toque em uma letra para ouvir a pronúncia")}</p>
    </div>
  );
}

function WriteTab({ category }: { category: Category }) {
  const t = useT();
  const letters = category.letters;
  const [idx, setIdx] = useState(0);
  const letter = letters[idx];
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawing = useRef(false);
  const [hasDrawn, setHasDrawn] = useState(false);
  const [replayKey, setReplayKey] = useState(0);

  useEffect(() => { clear(); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idx, category.id]);
  useEffect(() => { setIdx(0); }, [category.id]);

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
    ctx.strokeStyle = "#6C3EFF"; ctx.lineWidth = 24; ctx.lineCap = "round"; ctx.lineJoin = "round";
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

  function buildMask(getImage: (ctx: CanvasRenderingContext2D) => void, size = 64) {
    const off = document.createElement("canvas");
    off.width = size; off.height = size;
    const ctx = off.getContext("2d")!;
    ctx.fillStyle = "#fff"; ctx.fillRect(0, 0, size, size);
    getImage(ctx);
    const data = ctx.getImageData(0, 0, size, size).data;
    const mask = new Uint8Array(size * size);
    let count = 0;
    for (let i = 0; i < mask.length; i++) {
      const r = data[i * 4], g = data[i * 4 + 1], b = data[i * 4 + 2];
      if ((r + g + b) / 3 < 200) { mask[i] = 1; count++; }
    }
    return { mask, size, count };
  }
  function dilate(mask: Uint8Array, size: number, radius: number) {
    const out = new Uint8Array(mask.length);
    for (let y = 0; y < size; y++) for (let x = 0; x < size; x++) {
      if (!mask[y * size + x]) continue;
      for (let dy = -radius; dy <= radius; dy++) for (let dx = -radius; dx <= radius; dx++) {
        const nx = x + dx, ny = y + dy;
        if (nx < 0 || ny < 0 || nx >= size || ny >= size) continue;
        out[ny * size + nx] = 1;
      }
    }
    return out;
  }

  function verify() {
    if (!hasDrawn) { toast.error(t("Desenhe a letra primeiro!")); return; }
    const c = canvasRef.current!;
    const SIZE = 64;
    const user = buildMask((ctx) => { ctx.drawImage(c, 0, 0, SIZE, SIZE); }, SIZE);
    const target = buildMask((ctx) => {
      ctx.fillStyle = "#000"; ctx.textAlign = "center"; ctx.textBaseline = "middle";
      ctx.font = `900 ${SIZE * 0.78}px system-ui, "Noto Sans JP", sans-serif`;
      ctx.fillText(letter.char, SIZE / 2, SIZE / 2);
    }, SIZE);

    if (user.count < 25) { toast.error(t("Desenho muito pequeno. Tente novamente.")); setReplayKey((k) => k + 1); return; }
    if (target.count === 0) { toast.success(t("Parabéns! Você acertou. 🎉")); clear(); return; }

    const targetDilated = dilate(target.mask, SIZE, 8);
    const userDilated = dilate(user.mask, SIZE, 8);
    let hit = 0; for (let i = 0; i < target.mask.length; i++) if (target.mask[i] && userDilated[i]) hit++;
    const completeness = hit / target.count;
    let onTarget = 0; for (let i = 0; i < user.mask.length; i++) if (user.mask[i] && targetDilated[i]) onTarget++;
    const precision = onTarget / user.count;
    const ratio = user.count / target.count;
    const ok = completeness >= 0.28 && precision >= 0.35 && ratio >= 0.2 && ratio <= 4.5;

    if (ok) { toast.success(t("Parabéns! Você acertou. 🎉")); clear(); }
    else { toast.error(t("Tente novamente")); setReplayKey((k) => k + 1); }
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex items-center justify-between w-full">
        <button onClick={() => setIdx((i) => Math.max(0, i - 1))} disabled={idx === 0}
          className="rounded-full bg-muted px-3 py-1 text-sm font-bold disabled:opacity-40">← {t("Anterior")}</button>
        <span className="text-xs font-bold uppercase text-muted-foreground">{idx + 1} / {letters.length}</span>
        <button onClick={() => setIdx((i) => Math.min(letters.length - 1, i + 1))} disabled={idx === letters.length - 1}
          className="rounded-full bg-muted px-3 py-1 text-sm font-bold disabled:opacity-40">{t("Próxima")} →</button>
      </div>

      <div className="flex w-full flex-col items-center rounded-3xl bg-card p-4 shadow-card">
        <button onClick={() => speak(letter.char, "ja-JP")} className="text-primary mb-2">
          <Volume2 className="h-5 w-5" />
        </button>
        <div key={`${letter.char}-${replayKey}`} className="relative text-8xl font-black leading-none animate-stroke-guide">
          {letter.char}
        </div>
        <div className="mt-2 text-sm font-bold uppercase text-muted-foreground">{letter.romaji}</div>
        {letter.meaning && <div className="text-xs text-primary font-semibold">{letter.meaning}</div>}
        <div className="mt-1 text-[10px] text-muted-foreground">{t("Observe a ordem dos traços e reproduza abaixo")}</div>
      </div>

      <div className="w-full">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-xs font-bold uppercase text-muted-foreground">{t("Desenhe aqui")}</span>
          <div className="flex gap-2">
            <button onClick={clear} className="flex items-center gap-1 rounded-full bg-muted px-3 py-1 text-xs font-bold">
              <RotateCcw className="h-3 w-3" /> {t("Limpar")}
            </button>
            <button onClick={verify}
              className="btn-3d flex items-center gap-1 rounded-full bg-primary px-3 py-1 text-xs font-bold text-primary-foreground">
              <Check className="h-3 w-3" /> {t("Verificar")}
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

function VocabTab({ category, system }: { category: Category; system: AlphabetSystem }) {
  const t = useT();
  const tf = useTf();
  // For kanji: build a vocab list from examples across the category.
  if (system === "kanji") {
    const words = category.letters.flatMap((l) => l.examples ?? []);
    return (
      <div className="space-y-2">
        {words.map((v, i) => (
          <button key={v.word + i} onClick={() => speak(v.word, "ja-JP")}
            className="flex w-full items-center gap-3 rounded-2xl bg-card p-4 text-left shadow-card active:scale-[0.99] transition">
            <div className="flex-1">
              <div className="text-xl font-black">{v.word}</div>
              <div className="text-xs text-muted-foreground">{v.reading}</div>
              <div className="text-sm font-semibold text-primary">{v.translation}</div>
            </div>
            <Volume2 className="h-6 w-6 text-primary" />
          </button>
        ))}
        {words.length === 0 && <p className="text-center text-sm text-muted-foreground">{t("Sem palavras nesta categoria.")}</p>}
      </div>
    );
  }
  // For kana: sample words that use characters of this category (fallback: category letters themselves).
  const items = category.letters.slice(0, 20).map((l) => ({
    word: l.char, reading: l.romaji, translation: tf('Som "{r}"', { r: l.romaji }),
  }));
  return (
    <div className="space-y-2">
      {items.map((v) => (
        <button key={v.word} onClick={() => speak(v.word, "ja-JP")}
          className="flex w-full items-center gap-3 rounded-2xl bg-card p-4 text-left shadow-card active:scale-[0.99]">
          <div className="flex-1">
            <div className="text-xl font-black">{v.word}</div>
            <div className="text-xs text-muted-foreground">{v.reading}</div>
            <div className="text-sm font-semibold text-primary">{v.translation}</div>
          </div>
          <Volume2 className="h-6 w-6 text-primary" />
        </button>
      ))}
      <p className="text-center text-xs text-muted-foreground pt-2">{t("Toque para ouvir")}</p>
    </div>
  );
}

function shuffle<T>(a: T[]): T[] { return [...a].sort(() => Math.random() - 0.5); }

function ExerciseTab({ category }: { category: Category }) {
  const t = useT();
  const tf = useTf();
  const pool = category.letters;
  const [seed, setSeed] = useState(0);
  const questions = useMemo(() => {
    const items = shuffle(pool).slice(0, Math.min(10, pool.length));
    return items.map((it) => {
      const distractors = shuffle(pool.filter((x) => x.romaji !== it.romaji)).slice(0, 3);
      const options = shuffle([it, ...distractors]).map((x) => x.romaji);
      return { char: it.char, answer: it.romaji, meaning: it.meaning, options };
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category.id, seed]);
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const [score, setScore] = useState(0);

  useEffect(() => { setI(0); setPicked(null); setScore(0); }, [category.id, seed]);

  if (pool.length === 0) return <p className="text-center text-muted-foreground">{t("Sem itens.")}</p>;

  if (i >= questions.length) {
    return (
      <div className="flex flex-col items-center gap-4 pt-8">
        <div className="text-6xl">🎉</div>
        <h2 className="text-2xl font-black">{t("Exercício concluído!")}</h2>
        <p className="text-muted-foreground">{tf("{score} / {total} acertos", { score, total: questions.length })}</p>
        <button onClick={() => setSeed((s) => s + 1)}
          className="btn-3d rounded-full bg-primary px-6 py-3 font-bold text-primary-foreground">{t("Repetir")}</button>
      </div>
    );
  }

  const q = questions[i];
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="text-xs font-bold uppercase text-muted-foreground">{tf("Questão {n} / {total}", { n: i + 1, total: questions.length })}</div>
      <div className="rounded-3xl bg-card p-8 shadow-card">
        <div className="text-7xl font-black text-center">{q.char}</div>
      </div>
      <div className="text-sm text-muted-foreground">{t("Qual é o romaji?")}</div>
      <div className="grid grid-cols-2 gap-2 w-full">
        {q.options.map((opt) => {
          const isPicked = picked === opt;
          const isRight = opt === q.answer;
          const cls = picked
            ? isRight ? "bg-green-500 text-white" : isPicked ? "bg-red-500 text-white" : "bg-muted"
            : "bg-card";
          return (
            <button key={opt} disabled={!!picked} onClick={() => {
              setPicked(opt);
              if (opt === q.answer) setScore((s) => s + 1);
              setTimeout(() => { setPicked(null); setI((x) => x + 1); }, 900);
            }}
              className={`rounded-2xl p-4 font-bold shadow-card ${cls} active:scale-95 transition`}>
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function ReviewTab({ category }: { category: Category }) {
  const t = useT();
  const tf = useTf();
  const [i, setI] = useState(0);
  const [flip, setFlip] = useState(false);
  const letters = category.letters;
  useEffect(() => { setI(0); setFlip(false); }, [category.id]);
  if (letters.length === 0) return <p className="text-center text-muted-foreground">{t("Sem itens.")}</p>;
  const l = letters[i];

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="text-xs font-bold uppercase text-muted-foreground">{tf("Revisão {n} / {total}", { n: i + 1, total: letters.length })}</div>
      <button onClick={() => setFlip((f) => !f)}
        className="btn-3d w-full max-w-sm aspect-square rounded-3xl bg-card p-6 shadow-card flex flex-col items-center justify-center active:scale-[0.98]">
        {!flip ? (
          <div className="text-8xl font-black">{l.char}</div>
        ) : (
          <div className="text-center space-y-2">
            <div className="text-4xl font-black text-primary">{l.romaji}</div>
            {l.meaning && <div className="text-lg font-bold">{l.meaning}</div>}
            {l.onyomi && <div className="text-xs text-muted-foreground">{t("On:")} {l.onyomi}</div>}
            {l.kunyomi && <div className="text-xs text-muted-foreground">{t("Kun:")} {l.kunyomi}</div>}
          </div>
        )}
        <div className="mt-4 text-[10px] font-bold uppercase text-muted-foreground">{t("Toque para virar")}</div>
      </button>
      <div className="flex items-center gap-2">
        <button onClick={() => speak(l.char, "ja-JP")}
          className="flex items-center gap-1 rounded-full bg-muted px-4 py-2 text-sm font-bold">
          <Volume2 className="h-4 w-4" /> {t("Ouvir")}
        </button>
      </div>
      <div className="flex items-center justify-between w-full">
        <button onClick={() => { setI((x) => Math.max(0, x - 1)); setFlip(false); }} disabled={i === 0}
          className="rounded-full bg-muted px-4 py-2 text-sm font-bold disabled:opacity-40">← {t("Anterior")}</button>
        <button onClick={() => { setI((x) => Math.min(letters.length - 1, x + 1)); setFlip(false); }} disabled={i === letters.length - 1}
          className="rounded-full bg-primary px-4 py-2 text-sm font-bold text-primary-foreground disabled:opacity-40">{t("Próxima")} →</button>
      </div>
    </div>
  );
}
