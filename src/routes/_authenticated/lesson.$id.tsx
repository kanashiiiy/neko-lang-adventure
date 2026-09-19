import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState, useMemo, useEffect, useRef } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/lib/neko-toast";
import { X, Brain, Volume2, Mic } from "lucide-react";
import { getLesson, normalizeLanguage } from "@/lib/lessons";
import { supabase } from "@/integrations/supabase/client";
import { fetchCurrentProfile, fetchProfile, addXpAndGems, saveLessonCompletion, spendFocus, isPremiumActive, getLevelProgress, getLevelsCrossed, getLevelChestKey, rollLevelChestFocus, updateProfile } from "@/lib/profile";
import { speakForLang, prepareSpeech, getRecognition, isRecognitionSupported, matchSpeech, normalize } from "@/lib/speech";
import { NekoMascot } from "@/components/NekoMascot";
import { useT, useTf, useUiLang } from "@/lib/i18n";
import { useRewardAnimation, type RewardAmount } from "@/components/RewardAnimation";
import { recordTask, recordLesson } from "@/lib/mission-stats";

export const Route = createFileRoute("/_authenticated/lesson/$id")({
  component: LessonPlayer,
});

function LessonPlayer() {
  const t = useT();
  const tf = useTf();
  const ui = useUiLang();
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const qc = useQueryClient();
  const { collectRewards } = useRewardAnimation();

  const { data: profile } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      return fetchCurrentProfile();
    },
  });

  const lang = normalizeLanguage(profile?.language);
  const lesson = useMemo(() => getLesson(lang, id, profile?.level, profile?.goal, ui), [lang, id, profile?.level, profile?.goal, ui]);
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const [buildPicked, setBuildPicked] = useState<string[]>([]);
  const [matchLeftPicked, setMatchLeftPicked] = useState<string | null>(null);
  const [matchPairsPicked, setMatchPairsPicked] = useState<Record<string, string>>({});
  const [typed, setTyped] = useState("");
  const [correct, setCorrect] = useState<boolean | null>(null);
  const [rights, setRights] = useState(0);
  const [streakInLesson, setStreakInLesson] = useState(0);
  const [bonusFocus, setBonusFocus] = useState(0);
  const [done, setDone] = useState(false);
  const [reviewQueue, setReviewQueue] = useState<number[]>([]);
  const [reviewIdx, setReviewIdx] = useState(0);
  const [reviewIntro, setReviewIntro] = useState(false);
  const [firstAttemptFinished, setFirstAttemptFinished] = useState(false);
  const [saving, setSaving] = useState(false);
  const [outOfFocus, setOutOfFocus] = useState(false);
  const [listening, setListening] = useState(false);
  const [heard, setHeard] = useState<string | null>(null);
  const [levelUp, setLevelUp] = useState<number | null>(null);
  const [chestLevel, setChestLevel] = useState<number | null>(null);
  const [chestReward, setChestReward] = useState<number | null>(null);
  const [chestOpening, setChestOpening] = useState(false);
  const spentRef = useRef(false);
  const [resumed, setResumed] = useState(false);
  const restoredRef = useRef(false);
  const progressKey = `nekoteach:lesson-progress:${id}`;

  useEffect(() => {
    prepareSpeech();
  }, []);
  useEffect(() => {
    if (!lesson) return;
    const active = reviewQueue.length > 0 ? reviewQueue[reviewIdx] ?? 0 : idx;
    const current = lesson.questions[active];
    // Em tarefas "ouvir e escolher", o áudio só toca quando o usuário
    // apertar o botão. Isso evita entregar a palavra visualmente/automaticamente.
    if (!current?.audio || current.kind === "listen") return;
    const timer = window.setTimeout(() => speakForLang(current.audio!, lang), 60);
    return () => window.clearTimeout(timer);
  }, [lesson, idx, reviewIdx, reviewQueue, lang]);



  // Retomar progresso salvo da lição
  useEffect(() => {
    if (restoredRef.current) return;
    restoredRef.current = true;
    try {
      const raw = localStorage.getItem(progressKey);
      if (!raw) {
        try { localStorage.removeItem(`nekoteach:lesson-errors:${id}`); } catch {}
        return;
      }
      const saved = JSON.parse(raw) as {
        idx?: number; rights?: number; streakInLesson?: number; bonusFocus?: number;
      };
      if (typeof saved.idx === "number" && saved.idx > 0) {
        setIdx(saved.idx);
        setRights(saved.rights ?? 0);
        setStreakInLesson(saved.streakInLesson ?? 0);
        setBonusFocus(saved.bonusFocus ?? 0);
        setResumed(true);
      }
    } catch { /* ignora progresso inválido */ }
  }, [progressKey]);

  // Salva o progresso atual
  useEffect(() => {
    if (!restoredRef.current || done) return;
    try {
      if (idx > 0) {
        localStorage.setItem(progressKey, JSON.stringify({ idx, rights, streakInLesson, bonusFocus }));
      }
    } catch { /* armazenamento indisponível */ }
  }, [progressKey, idx, rights, streakInLesson, bonusFocus, done]);

  // Baús de nível ficam persistidos localmente até serem abertos.
  useEffect(() => {
    if (!profile?.id) return;
    try {
      const raw = localStorage.getItem(`nekoteach:level-chests:${profile.id}`);
      const queue = raw ? JSON.parse(raw) as number[] : [];
      const next = queue.find((level) => localStorage.getItem(getLevelChestKey(profile.id, level)) !== "opened");
      if (typeof next === "number") setChestLevel(next);
    } catch {}
  }, [profile?.id]);

  function queueLevelChests(userId: string, levels: number[]) {
    try {
      const key = `nekoteach:level-chests:${userId}`;
      const current = JSON.parse(localStorage.getItem(key) ?? "[]") as number[];
      const merged = Array.from(new Set([...current, ...levels])).sort((a, b) => a - b);
      localStorage.setItem(key, JSON.stringify(merged));
    } catch {}
  }

  function markChestOpened(userId: string, level: number) {
    try {
      localStorage.setItem(getLevelChestKey(userId, level), "opened");
      const key = `nekoteach:level-chests:${userId}`;
      const current = JSON.parse(localStorage.getItem(key) ?? "[]") as number[];
      localStorage.setItem(key, JSON.stringify(current.filter((v) => v !== level)));
    } catch {}
  }

  async function openLevelChest() {
    if (!profile?.id || chestLevel === null || chestOpening || chestReward !== null) return;
    const level = chestLevel;
    const reward = rollLevelChestFocus();
    setChestOpening(true);
    setChestReward(reward);
    // Marca antes de creditar para impedir duplicação ao tocar várias vezes.
    try {
      const latest = await fetchProfile(profile.id);
      if (!latest) throw new Error("profile");
      await updateProfile(profile.id, { focus: latest.focus + reward });
      markChestOpened(profile.id, level);
      await collectRewards([{ type: "focus", amount: reward }]);
      qc.invalidateQueries({ queryKey: ["profile"] });
    } catch {
      setChestReward(null);
      toast.error(t("Não conseguimos salvar a recompensa."));
    }
    setChestOpening(false);
  }

  // Check focus before starting
  useEffect(() => {
    if (!profile) return;
    if (isPremiumActive(profile)) return;
    if (profile.focus <= 0) setOutOfFocus(true);
  }, [profile]);

  if (!lesson) {
    return (
      <div className="mobile-shell items-center justify-center px-6 text-center">
        <p>{t("Lição não encontrada.")}</p>
        <Link to="/home" className="btn-3d mt-4 rounded-2xl bg-primary px-6 py-3 font-bold text-primary-foreground">{t("Voltar")}</Link>
      </div>
    );
  }

  const total = lesson.questions.length;
  const activeIndex = reviewQueue.length > 0 ? reviewQueue[reviewIdx] ?? 0 : idx;
  const safeIdx = Math.min(activeIndex, total - 1);
  const q = lesson.questions[safeIdx];
  const isAudioMission = q.kind === "listen";
  const audioAnswered = isAudioMission && correct !== null;
  const inReview = reviewQueue.length > 0 && !done;

  async function ensureFocusSpent() {
    if (inReview) return true;
    if (spentRef.current || !profile) return true;
    if (isPremiumActive(profile)) { spentRef.current = true; return true; }
    spentRef.current = true;
    const res = await spendFocus(profile.id, 1);
    qc.invalidateQueries({ queryKey: ["profile"] });
    if (!res) { setOutOfFocus(true); return false; }
    return true;
  }

  async function check() {
    const answer = q.kind === "complete" ? typed.trim() : picked;
    if (q.kind === "match") {
      const expected = q.matchPairs ?? {};
      const keys = Object.keys(expected);
      if (Object.keys(matchPairsPicked).length !== keys.length) return;
      const isRight = keys.every((key) => matchPairsPicked[key] === expected[key]);
      if (!(await ensureFocusSpent())) return;
      applyResult(isRight);
      return;
    }
    if (q.kind === "build") {
      if (!q.buildAnswer?.length || buildPicked.length !== q.buildAnswer.length) return;
      const isRight = buildPicked.every((word, i) => normalize(word) === normalize(q.buildAnswer?.[i] ?? ""));
      if (!(await ensureFocusSpent())) return;
      applyResult(isRight);
      return;
    }
    if (!answer && q.kind !== "speak") return;
    if (!(await ensureFocusSpent())) return;
    const isRight = normalize(answer ?? "") === normalize(q.answer);
    applyResult(isRight);
  }

  function applyResult(isRight: boolean) {
    setCorrect(isRight);
    if (!inReview) {
      recordTask(q.kind, isRight);
      if (!isRight) {
        try {
          const key = `nekoteach:lesson-errors:${id}`;
          const current = JSON.parse(localStorage.getItem(key) ?? "[]") as number[];
          if (!current.includes(safeIdx)) localStorage.setItem(key, JSON.stringify([...current, safeIdx]));
        } catch {}
      }
    }
    if (isRight) {
      setRights((r) => r + 1);
      setStreakInLesson((s) => {
        const next = s + 1;
        if (next % 7 === 0) {
          // Fases 1–10: +4 Foco por 7 acertos seguidos.
          // Fase 11+: +3 Foco. A regra usa o número da fase atual para continuar funcionando em futuras fases.
          const phaseNumber = Number(lesson.id.match(/-phase-(\\d+)$/)?.[1] ?? 1);
          const focusReward = phaseNumber >= 11 ? 3 : 4;
          setBonusFocus((b) => b + focusReward);
          // O bônus de Foco é incluído na recompensa final da lição e coletado visualmente.
        }
        return next;
      });
    } else {
      setStreakInLesson(0);
    }
  }

  async function handleSpeak() {
    if (!isRecognitionSupported()) {
      toast.error(t("Seu navegador não suporta microfone. Toque em ✓ para pular."));
      return;
    }
    if (!(await ensureFocusSpent())) return;
    const langMap = { pt: "pt-BR", ja: "ja-JP", en: "en-US" } as const;
    const rec = getRecognition(langMap[lang]);
    if (!rec) return;
    setListening(true);
    setHeard(null);
    rec.onresult = (e) => {
      const results = Array.from(e.results[0] ?? []).map((r) => ({
        transcript: r.transcript, confidence: r.confidence,
      }));
      const first = results[0]?.transcript ?? "";
      setHeard(first);
      const ok = matchSpeech(q.answer, results);
      applyResult(ok);
      setListening(false);
    };
    rec.onerror = () => { setListening(false); toast.error(t("Não consegui ouvir. Tente de novo.")); };
    rec.onend = () => setListening(false);
    try { rec.start(); } catch { setListening(false); }
  }

  async function next() {
    setPicked(null); setTyped(""); setBuildPicked([]); setMatchLeftPicked(null); setMatchPairsPicked({}); setCorrect(null); setHeard(null);
    spentRef.current = false;
    if (inReview) {
      if (reviewIdx + 1 < reviewQueue.length) setReviewIdx((v) => v + 1);
      else {
        setReviewQueue([]);
        setReviewIdx(0);
        setDone(true);
      }
      return;
    }
    if (idx + 1 < total) setIdx(idx + 1);
    else await finish();
  }

  async function finish() {
    if (!lesson || !profile || firstAttemptFinished) return;
    setSaving(true);
    const wrongRaw = (() => {
      try {
        return JSON.parse(localStorage.getItem(`nekoteach:lesson-errors:${id}`) ?? "[]") as number[];
      } catch { return []; }
    })();
    const wrong = [...new Set(wrongRaw.filter((n) => n >= 0 && n < total))];
    const score = Math.round((rights / total) * 100);
    const xpEarned = Math.round((rights / total) * lesson.xp);
    const gemsEarned = rights === total ? 10 : Math.max(1, Math.floor(rights / 2));
    try {
      await saveLessonCompletion(profile.id, lang, lesson.id, score, xpEarned);
      recordLesson(wrong.length === 0);
      // Recompensa de conclusão da fase é fixa e independente da sequência.
      const phaseFocus = 3;
      const rewards: RewardAmount[] = [
        xpEarned > 0 ? { type: "xp", amount: xpEarned } : null,
        gemsEarned > 0 ? { type: "gems", amount: gemsEarned } : null,
        { type: "focus", amount: phaseFocus },
        bonusFocus > 0 ? { type: "focus", amount: bonusFocus } : null,
      ].filter((r): r is RewardAmount => Boolean(r));
      const beforeXp = profile.xp;
      const afterXp = beforeXp + xpEarned;
      const crossedLevels = getLevelsCrossed(beforeXp, afterXp);
      await collectRewards(rewards);
      // Fase (+3) e sequência (7 acertos) são recompensas independentes.
      await addXpAndGems(profile.id, xpEarned, gemsEarned, phaseFocus + bonusFocus);
      if (crossedLevels.length > 0) {
        queueLevelChests(profile.id, crossedLevels);
        setLevelUp(crossedLevels[0]);
        setTimeout(() => {
          setLevelUp(null);
          setChestLevel(crossedLevels[0]);
        }, 1200);
      }
      qc.invalidateQueries({ queryKey: ["profile"] });
      qc.invalidateQueries({ queryKey: ["completed", lang] });
      setFirstAttemptFinished(true);
      try { localStorage.removeItem(`nekoteach:lesson-errors:${id}`); } catch {}
      if (wrong.length > 0) {
        setReviewQueue(wrong);
        setReviewIdx(0);
        setReviewIntro(true);
      } else {
        setDone(true);
      }
    } catch {
      toast.error(t("Não conseguimos salvar seu progresso."));
    }
    setSaving(false);
    try { localStorage.removeItem(progressKey); } catch {}
  }

  const progressionOverlay = (
    <>
    {levelUp !== null && !chestReward && (
      <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/35 px-5">
        <div className="w-full max-w-sm rounded-3xl bg-card p-6 text-center shadow-card animate-bounce-in">
          <NekoMascot size={150} bounce float entrance />
          <div className="mt-2 text-3xl font-black">✨ NÍVEL {levelUp}! ✨</div>
          <p className="mt-2 text-sm font-semibold text-muted-foreground">{t("Você desbloqueou um baú de recompensa!")}</p>
        </div>
      </div>
    )}

    {chestLevel !== null && !levelUp && (
      <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/35 px-5">
        <div className="w-full max-w-sm rounded-3xl bg-card p-6 text-center shadow-card">
          {chestReward === null ? (
            <>
              <div className={`text-8xl transition-transform duration-500 ${chestOpening ? "scale-125 rotate-6" : "animate-bounce"}`}>🎁</div>
              <h2 className="mt-3 text-2xl font-black">🎁 {t("Baú de recompensa")}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{tf("Recompensa do Nível {n}", { n: chestLevel })}</p>
              <button onClick={openLevelChest} disabled={chestOpening} className="btn-3d mt-5 w-full rounded-2xl bg-gradient-gold py-3.5 font-black text-gold-foreground">
                {t("Abrir baú")}
              </button>
            </>
          ) : (
            <>
              <div className="text-7xl animate-bounce">⚡</div>
              <h2 className="mt-3 text-2xl font-black">⚡ +{chestReward} {t("Foco")}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{t("Recompensa adicionada ao seu Foco.")}</p>
              <button onClick={() => { try { const raw = localStorage.getItem(`nekoteach:level-chests:${profile?.id}`); const queue = raw ? JSON.parse(raw) as number[] : []; setChestReward(null); setChestLevel(queue[0] ?? null); } catch { setChestReward(null); setChestLevel(null); } }} className="btn-3d mt-5 w-full rounded-2xl bg-primary py-3.5 font-bold text-primary-foreground">
                {t("Continuar")}
              </button>
            </>
          )}
        </div>
      </div>
    )}
    </>
  );

  if (reviewIntro && !done) {
    return (
      <div className="mobile-shell items-center justify-center px-6 text-center">
        {progressionOverlay}
        <NekoMascot size={180} bounce float entrance />
        <h1 className="mt-4 text-3xl font-black">{t("Hora de revisar! 🐾")}</h1>
        <p className="mt-2 text-sm text-muted-foreground">{t("Você terminou a lição. Agora vamos revisar juntos as respostas que você errou.")}</p>
        <button onClick={() => setReviewIntro(false)} className="btn-3d mt-8 w-full rounded-2xl bg-primary py-3.5 font-bold text-primary-foreground">
          {t("Começar revisão")}
        </button>
      </div>
    );
  }

  if (outOfFocus && !done) {
    return (
      <div className="mobile-shell items-center justify-center px-6 text-center">
        {progressionOverlay}
        <NekoMascot size={160} entrance />
        <h1 className="mt-4 text-2xl font-black">{t("Sem Foco ⚡")}</h1>
        <p className="mt-1 text-sm text-muted-foreground">{t("Compre mais Foco na loja com seus diamantes.")}</p>
        <div className="mt-6 flex w-full flex-col gap-2">
          <Link to="/store" className="btn-3d rounded-2xl bg-primary py-3.5 font-bold text-primary-foreground">{t("Ir à loja")}</Link>
          <Link to="/home" className="text-sm font-semibold text-muted-foreground">{t("Voltar")}</Link>
        </div>
      </div>
    );
  }

  if (done) {
    const score = Math.round((rights / total) * 100);
    const xpEarned = Math.round((rights / total) * lesson.xp);
    return (
      <div className="mobile-shell items-center justify-center px-6 text-center">
        {progressionOverlay}
        <NekoMascot size={180} bounce float entrance />
        <h1 className="mt-4 text-3xl font-black">{t("Fase concluída! 🎉")}</h1>
        <p className="mt-1 text-muted-foreground">{tf("Você acertou {rights} de {total}", { rights, total })}</p>
        <div className="mt-6 grid w-full grid-cols-2 gap-3">
          <Reward label={t("XP")} value={`+${xpEarned}`} color="bg-gold text-gold-foreground" />
          <Reward label={t("Acerto")} value={`${score}%`} color="bg-success text-success-foreground" />
          <div className="rounded-2xl bg-primary p-3 text-primary-foreground">
            <div className="text-[10px] font-bold uppercase opacity-80">{t("Foco da fase")}</div>
            <div className="text-lg font-black">+3</div>
            <div className="mt-1 text-[9px] font-bold opacity-90">{t("Conclusão da fase")}</div>
          </div>
          {bonusFocus > 0 && (
            <div className="rounded-2xl bg-accent p-3 text-accent-foreground">
              <div className="text-[10px] font-bold uppercase opacity-80">{t("Bônus de sequência")}</div>
              <div className="text-lg font-black">+{bonusFocus}</div>
              <div className="mt-1 text-[9px] font-bold opacity-90">{t("7 acertos por sequência")}</div>
            </div>
          )}
        </div>
        <Link to="/home" className="btn-3d mt-8 w-full rounded-2xl bg-primary py-3.5 font-bold text-primary-foreground">
          {t("Continuar")}
        </Link>
      </div>
    );
  }

  return (
    <div className="mobile-shell px-4 pt-4 pb-6">
      {progressionOverlay}
      {resumed && (
        <div className="pointer-events-none fixed bottom-24 right-3 z-50 flex items-end gap-2">
          <div className="pointer-events-auto max-w-[62vw] rounded-2xl border-2 border-primary/20 bg-card p-3 text-xs font-semibold shadow-card animate-bubble-in">
            {t("Que bom que você voltou! Vamos continuar de onde paramos?")}
            <button onClick={() => setResumed(false)} className="mt-2 block text-[11px] font-black uppercase text-primary">
              {t("Continuar")}
            </button>
          </div>
          <NekoMascot size={84} entrance />
        </div>
      )}
      <header className="mb-6 flex items-center gap-3">
        <button onClick={() => navigate({ to: "/home" })} className="text-muted-foreground"><X className="h-6 w-6" /></button>
        <div className="flex-1 h-3 rounded-full bg-muted overflow-hidden">
          <div className="h-full bg-gradient-primary transition-all duration-500"
            style={{ width: `${((safeIdx + 1) / total) * 100}%` }} />
        </div>
        <div data-reward-counter="focus" className="flex items-center gap-1 font-bold text-yellow-600">
          <Brain className="h-5 w-5" /> {isPremiumActive(profile) ? "∞" : (profile?.focus ?? 0)}
        </div>
      </header>

      <div className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
        {tf("Tarefa {idx} de {total} · {kind}", {
          idx: safeIdx + 1,
          total,
          kind: q.kind === "listen" ? t("Ouvir") : q.kind === "speak" ? t("Falar") : q.kind === "complete" ? t("Escrever") : q.kind === "build" ? t("Montar") : q.kind === "match" ? t("Associar") : t("Escolher"),
        })}
      </div>
      <h2 className="mt-2 text-2xl font-black">{q.prompt}</h2>
      {/* Dados da resposta correta ficam ocultos até a tentativa ser verificada. */}
      {correct !== null && !isAudioMission && (q.japanese || q.kana || q.kanji || q.romaji || q.translation || q.audio) && (
        <div className="mt-4 rounded-3xl bg-card p-5 text-center shadow-card">
          {q.kanji && <div className="text-5xl font-black">{q.kanji}</div>}
          {q.romaji && <div className="mt-1 text-lg font-bold text-primary">{q.romaji}</div>}
          {q.kana && <div className={q.kanji ? "mt-1 text-2xl font-black" : "mt-1 text-4xl font-black"}>{q.kana}</div>}
          {q.japanese && !q.kana && <div className="mt-1 text-4xl font-black">{q.japanese}</div>}
          {q.translation && <div className="mt-1 text-base text-muted-foreground">{q.translation}</div>}
          {q.audio && <button onClick={() => speakForLang(q.audio!, lang)} className="mt-3 text-primary" aria-label={t("Ouvir")}><Volume2 className="h-6 w-6" /></button>}
        </div>
      )}

      {q.nekoMessage && (
        <div className="mt-4 flex items-end gap-2">
          <NekoMascot size={70} entrance />
          <div className="rounded-2xl border-2 border-primary/20 bg-card p-3 text-xs font-semibold shadow-card">{q.nekoMessage}</div>
        </div>
      )}

      {q.kind === "match" && correct === null && (
        <div className="mt-6 space-y-4">
          <div className="rounded-3xl bg-card p-4 shadow-card">
            <div className="mb-3 text-center text-xs font-black uppercase tracking-wide text-muted-foreground">{t("Toque em um item de cada coluna para formar os pares")}</div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                {(q.matchLeft ?? []).map((left) => {
                  const paired = matchPairsPicked[left];
                  return (
                    <button key={left} disabled={!!paired}
                      onClick={() => setMatchLeftPicked(left)}
                      className={`w-full rounded-2xl border-2 p-3 text-sm font-bold transition ${matchLeftPicked === left ? "border-primary bg-accent" : paired ? "border-success/40 bg-success/10 opacity-60" : "border-border bg-background"}`}>
                      {left}
                    </button>
                  );
                })}
              </div>
              <div className="space-y-2">
                {(q.matchRight ?? []).map((right) => {
                  const pairedLeft = Object.keys(matchPairsPicked).find((left) => matchPairsPicked[left] === right);
                  return (
                    <button key={right} disabled={!!pairedLeft || !matchLeftPicked}
                      onClick={() => {
                        if (!matchLeftPicked) return;
                        const expected = q.matchPairs?.[matchLeftPicked];
                        if (expected === right) {
                          setMatchPairsPicked((current) => ({ ...current, [matchLeftPicked]: right }));
                          setMatchLeftPicked(null);
                        } else {
                          toast.error(t("Esse par não corresponde. Tente novamente."));
                          setMatchLeftPicked(null);
                        }
                      }}
                      className={`w-full rounded-2xl border-2 p-3 text-sm font-bold transition ${pairedLeft ? "border-success/40 bg-success/10 opacity-60" : matchLeftPicked ? "border-primary/40 bg-card" : "border-border bg-background opacity-70"}`}>
                      {right}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {q.kind === "build" && correct === null && (
        <div className="mt-6 space-y-4">
          <button onClick={() => q.audio && speakForLang(q.audio, lang)}
            className="flex w-full items-center justify-center gap-3 rounded-3xl bg-primary py-8 text-primary-foreground shadow-soft">
            <Volume2 className="h-8 w-8" />
            <span className="text-lg font-black">{t("Ouvir")}</span>
          </button>
          <div className="min-h-14 rounded-2xl border-2 border-dashed border-primary/30 bg-card p-3">
            <div className="text-[10px] font-black uppercase text-muted-foreground">{t("Sua frase")}</div>
            <div className="mt-2 flex flex-wrap gap-2">
              {buildPicked.length ? buildPicked.map((word, i) => (
                <button key={word + i} onClick={() => setBuildPicked((current) => current.filter((_, index) => index !== i))}
                  className="rounded-xl bg-accent px-3 py-2 text-sm font-bold">{word}</button>
              )) : <span className="text-sm text-muted-foreground">{t("Escolha as palavras na ordem do áudio")}</span>}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {(q.buildOptions ?? q.options ?? []).map((word, optionIndex) => {
              const usedCount = buildPicked.filter((selected) => selected === word).length;
              const availableCount = (q.buildOptions ?? q.options ?? []).filter((option) => option === word).length;
              const used = usedCount >= availableCount;
              return <button key={word + optionIndex} disabled={used} onClick={() => setBuildPicked((current) => used ? current : [...current, word])}
                className="rounded-2xl border-2 border-border bg-card p-4 text-base font-bold transition active:scale-95 disabled:opacity-40">{word}</button>;
            })}
          </div>
        </div>
      )}

      {isAudioMission && !audioAnswered && (
        <div className="mt-6 space-y-4">
          {lang === "ja" && q.japanese && (
            <div className="flex items-center justify-center rounded-3xl bg-card p-6 shadow-card">
              <span className="text-5xl font-black">{q.japanese}</span>
            </div>
          )}
          <button onClick={() => q.audio && speakForLang(q.audio, lang)}
            className="flex w-full items-center justify-center gap-3 rounded-3xl bg-primary py-8 text-primary-foreground shadow-soft">
            <Volume2 className="h-8 w-8" />
            <span className="text-lg font-black">{t("Ouvir")}</span>
          </button>
        </div>
      )}

      {q.kind === "choose" && correct === null && (
        <div className="mt-6 flex items-center justify-center rounded-3xl bg-card p-6 shadow-card">
          <div className="flex flex-col items-center gap-3 text-center">
            {q.audio ? (
              <button onClick={() => speakForLang(q.audio!, lang)} className="rounded-2xl bg-primary p-4 text-primary-foreground" aria-label={t("Ouvir")}>
                <Volume2 className="h-7 w-7" />
              </button>
            ) : (
              <span className="text-sm font-semibold text-muted-foreground">{t("Escolha a resposta correta")}</span>
            )}
          </div>
        </div>
      )}


      {q.kind === "speak" && (
        <div className="mt-6 flex flex-col items-center gap-3 rounded-3xl bg-card p-8 shadow-card">
          <div className="text-sm font-bold text-muted-foreground">{t("Ouça e repita o áudio")}</div>
          <button onClick={() => q.audio && speakForLang(q.audio, lang)} className="rounded-2xl bg-primary p-4 text-primary-foreground" aria-label={t("Ouvir")}>
            <Volume2 className="h-7 w-7" />
          </button>
          <button onClick={handleSpeak} disabled={listening || correct !== null}
            className={`btn-3d mt-2 flex items-center gap-2 rounded-2xl px-6 py-3 font-bold text-primary-foreground ${listening ? "bg-destructive animate-pulse" : "bg-primary"}`}>
            <Mic className="h-5 w-5" />
            {listening ? t("Ouvindo...") : t("Falar")}
          </button>
          {heard && <div className="text-xs text-muted-foreground">{tf('Ouvi: "{heard}"', { heard })}</div>}
        </div>
      )}

      {!q.visualOptions && (q.kind === "choose" || q.kind === "listen") && q.options && (
        <div className="mt-6 grid grid-cols-2 gap-3">
          {q.options.map((opt) => {
            const isPicked = picked === opt;
            const showResult = correct !== null && isPicked;
            return (
              <button key={opt} disabled={correct !== null}
                onClick={() => setPicked(opt)}
                className={`rounded-2xl border-2 bg-card p-4 text-base font-bold transition ${
                  showResult && correct ? "border-success bg-success/10" :
                  showResult && !correct ? "border-destructive bg-destructive/10" :
                  isPicked ? "border-primary bg-accent" : "border-border"
                }`}>
                {opt}
              </button>
            );
          })}
        </div>
      )}

      {q.kind === "complete" && (
        <div className="mt-6 space-y-3">
          <button
            onClick={() => q.audio && speakForLang(q.audio, lang)}
            className="flex w-full items-center justify-center gap-3 rounded-3xl bg-primary py-6 text-primary-foreground shadow-soft"
            aria-label={t("Ouvir")}
          >
            <Volume2 className="h-7 w-7" />
            <span className="font-black">{t("Ouvir novamente")}</span>
          </button>
          <input value={typed} onChange={(e) => setTyped(e.target.value)} disabled={correct !== null}
            placeholder={t("Digite sua resposta")}
            className="w-full rounded-2xl border-2 border-border bg-card px-4 py-3.5 text-lg outline-none focus:border-primary" />
        </div>
      )}

      <div className="mt-auto pt-6">
        {correct === null ? (
          q.kind === "speak" ? null : (
            <button onClick={check} disabled={q.kind === "complete" ? !typed.trim() : q.kind === "build" ? buildPicked.length === 0 : q.kind === "match" ? Object.keys(matchPairsPicked).length !== (q.matchLeft?.length ?? 0) : !picked}
              className="btn-3d w-full rounded-2xl bg-primary py-3.5 font-bold text-primary-foreground disabled:opacity-50">
              {t("Verificar")}
            </button>
          )
        ) : (
          <div className={`rounded-2xl p-4 ${correct ? "bg-success/15 text-success" : "bg-destructive/15 text-destructive"}`}>
            <div className="text-sm font-black">{correct ? t("Muito bem! 🎉") : q.kind === "match" ? t("Alguns pares não correspondem. Veja as combinações corretas abaixo.") : `${t("Resposta certa:")} ${q.answer}`}</div>
            {q.kind === "match" ? (
              <div className="mt-2 grid grid-cols-1 gap-2 rounded-xl bg-background/60 p-3 text-left">
                {Object.entries(q.matchPairs ?? {}).map(([left, right]) => (
                  <div key={left} className="flex items-center justify-between gap-3 rounded-xl border border-border bg-card px-3 py-2 text-xs">
                    <span className="font-bold">{left}</span>
                    <span className="text-muted-foreground">→</span>
                    <span className="font-bold text-primary">{right}</span>
                  </div>
                ))}
              </div>
            ) : ((isAudioMission && audioAnswered && q.reveal) || (!isAudioMission && (q.translation || q.japanese || q.kana || q.kanji || q.romaji || q.audio))) && (
              <div className="mt-2 space-y-1 rounded-xl bg-background/60 p-3 text-left">
                {isAudioMission && audioAnswered && q.reveal ? (
                  <>
                    {q.reveal.translation && (
                      <div className="text-xs"><span className="font-black uppercase opacity-70">{t("Português:")}</span> <span className="font-bold text-foreground">{q.reveal.translation}</span></div>
                    )}
                    {(q.reveal.japanese || q.reveal.kana) && (
                      <div className="text-xs"><span className="font-black uppercase opacity-70">{t("Japonês:")}</span> <span className="font-bold text-foreground">{lang === "ja" ? (q.reveal.kana ?? q.reveal.japanese) : q.reveal.japanese}</span></div>
                    )}
                    {q.reveal.romaji && (
                      <div className="text-xs"><span className="font-black uppercase opacity-70">{t("Romaji:")}</span> <span className="font-bold text-foreground">{q.reveal.romaji}</span></div>
                    )}
                  </>
                ) : (
                  <>
                    {q.translation && (
                      <div className="text-xs"><span className="font-black uppercase opacity-70">{t("Português:")}</span> <span className="font-bold text-foreground">{q.translation}</span></div>
                    )}
                    {(q.japanese || q.kana) && (
                      <div className="text-xs"><span className="font-black uppercase opacity-70">{t("Japonês:")}</span> <span className="font-bold text-foreground">{lang === "ja" ? (q.kana ?? q.japanese) : q.japanese}</span></div>
                    )}
                    {q.romaji && (
                      <div className="text-xs"><span className="font-black uppercase opacity-70">{t("Romaji:")}</span> <span className="font-bold text-foreground">{q.romaji}</span></div>
                    )}
                  </>
                )}
              </div>
            )}
            <button onClick={next} disabled={saving}
              className="btn-3d mt-3 w-full rounded-2xl bg-current py-3 font-bold">
              <span className={correct ? "text-success-foreground" : "text-destructive-foreground"}>
                {saving ? t("Salvando...") : t("Continuar")}
              </span>
            </button>
          </div>
        )}

      </div>
    </div>
  );
}

function Reward({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div className={`rounded-2xl p-3 ${color}`}>
      <div className="text-[10px] font-bold uppercase opacity-80">{label}</div>
      <div className="text-lg font-black">{value}</div>
    </div>
  );
}
