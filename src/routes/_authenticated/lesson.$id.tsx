import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState, useMemo, useEffect, useRef } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { X, Brain, Volume2, Mic } from "lucide-react";
import { getLesson, normalizeLanguage } from "@/lib/lessons";
import { supabase } from "@/integrations/supabase/client";
import { fetchProfile, addXpAndGems, saveLessonCompletion, spendFocus, isPremiumActive } from "@/lib/profile";
import { speakForLang, getRecognition, isRecognitionSupported, matchSpeech, normalize } from "@/lib/speech";
import { NekoMascot } from "@/components/NekoMascot";
import { useT, useTf, useUiLang } from "@/lib/i18n";

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

  const { data: profile } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const { data } = await supabase.auth.getUser();
      if (!data.user) return null;
      return fetchProfile(data.user.id);
    },
  });

  const lang = normalizeLanguage(profile?.language);
  const lesson = useMemo(() => getLesson(lang, id, profile?.level, profile?.goal, ui), [lang, id, profile?.level, profile?.goal, ui]);
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const [typed, setTyped] = useState("");
  const [correct, setCorrect] = useState<boolean | null>(null);
  const [rights, setRights] = useState(0);
  const [streakInLesson, setStreakInLesson] = useState(0);
  const [bonusFocus, setBonusFocus] = useState(0);
  const [done, setDone] = useState(false);
  const [saving, setSaving] = useState(false);
  const [outOfFocus, setOutOfFocus] = useState(false);
  const [listening, setListening] = useState(false);
  const [heard, setHeard] = useState<string | null>(null);
  const spentRef = useRef(false);
  const [resumed, setResumed] = useState(false);
  const restoredRef = useRef(false);
  const progressKey = `nekoteach:lesson-progress:${id}`;

  // Retomar progresso salvo da lição
  useEffect(() => {
    if (restoredRef.current) return;
    restoredRef.current = true;
    try {
      const raw = localStorage.getItem(progressKey);
      if (!raw) return;
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
  const safeIdx = Math.min(idx, total - 1);
  const q = lesson.questions[safeIdx];

  async function ensureFocusSpent() {
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
    if (!answer && q.kind !== "speak") return;
    if (!(await ensureFocusSpent())) return;
    const isRight = normalize(answer ?? "") === normalize(q.answer);
    applyResult(isRight);
  }

  function applyResult(isRight: boolean) {
    setCorrect(isRight);
    if (isRight) {
      setRights((r) => r + 1);
      setStreakInLesson((s) => {
        const next = s + 1;
        if (next % 7 === 0) {
          setBonusFocus((b) => b + 2);
          toast.success(t("🔥 7 acertos seguidos! +2 Foco"));
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
    setPicked(null); setTyped(""); setCorrect(null); setHeard(null);
    spentRef.current = false;
    if (idx + 1 < total) setIdx(idx + 1);
    else await finish();
  }

  async function finish() {
    if (!lesson || !profile) return;
    setSaving(true);
    const score = Math.round((rights / total) * 100);
    const xpEarned = Math.round((rights / total) * lesson.xp);
    const gemsEarned = rights === total ? 10 : Math.max(1, Math.floor(rights / 2));
    try {
      await saveLessonCompletion(profile.id, lang, lesson.id, score, xpEarned);
      await addXpAndGems(profile.id, xpEarned, gemsEarned, bonusFocus);
      qc.invalidateQueries({ queryKey: ["profile"] });
      qc.invalidateQueries({ queryKey: ["completed", lang] });
    } catch {
      toast.error(t("Não conseguimos salvar seu progresso."));
    }
    setSaving(false);
    setDone(true);
  }

  if (outOfFocus && !done) {
    return (
      <div className="mobile-shell items-center justify-center px-6 text-center">
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
        <NekoMascot size={180} bounce float entrance />
        <h1 className="mt-4 text-3xl font-black">{t("Fase concluída! 🎉")}</h1>
        <p className="mt-1 text-muted-foreground">{tf("Você acertou {rights} de {total}", { rights, total })}</p>
        <div className="mt-6 grid w-full grid-cols-3 gap-3">
          <Reward label={t("XP")} value={`+${xpEarned}`} color="bg-gold text-gold-foreground" />
          <Reward label={t("Acerto")} value={`${score}%`} color="bg-success text-success-foreground" />
          <Reward label={t("Foco")} value={bonusFocus > 0 ? `+${bonusFocus}` : "0"} color="bg-primary text-primary-foreground" />
        </div>
        <Link to="/home" className="btn-3d mt-8 w-full rounded-2xl bg-primary py-3.5 font-bold text-primary-foreground">
          {t("Continuar")}
        </Link>
      </div>
    );
  }

  return (
    <div className="mobile-shell px-4 pt-4 pb-6">
      <header className="mb-6 flex items-center gap-3">
        <button onClick={() => navigate({ to: "/home" })} className="text-muted-foreground"><X className="h-6 w-6" /></button>
        <div className="flex-1 h-3 rounded-full bg-muted overflow-hidden">
          <div className="h-full bg-gradient-primary transition-all duration-500"
            style={{ width: `${((idx + 1) / total) * 100}%` }} />
        </div>
        <div className="flex items-center gap-1 font-bold text-yellow-600">
          <Brain className="h-5 w-5" /> {isPremiumActive(profile) ? "∞" : (profile?.focus ?? 0)}
        </div>
      </header>

      <div className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
        {tf("Tarefa {idx} de {total} · {kind}", {
          idx: idx + 1,
          total,
          kind: q.kind === "listen" ? t("Ouvir") : q.kind === "speak" ? t("Falar") : q.kind === "complete" ? t("Escrever") : t("Escolher"),
        })}
      </div>
      <h2 className="mt-2 text-2xl font-black">{q.prompt}</h2>

      {(q.kind === "listen") && (
        <button onClick={() => q.audio && speakForLang(q.audio, lang)}
          className="mt-6 flex w-full items-center justify-center gap-3 rounded-3xl bg-primary py-8 text-primary-foreground shadow-soft">
          <Volume2 className="h-8 w-8" />
          <span className="text-lg font-black">{t("Tocar áudio")}</span>
        </button>
      )}

      {q.kind === "choose" && (
        <div className="mt-6 flex items-center justify-center rounded-3xl bg-card p-8 shadow-card">
          <div className="flex flex-col items-center gap-2 text-center">
            <span className="text-5xl font-black">{q.prompt.match(/"([^"]+)"/)?.[1] ?? ""}</span>
          </div>
        </div>
      )}


      {q.kind === "speak" && (
        <div className="mt-6 flex flex-col items-center gap-2 rounded-3xl bg-card p-8 shadow-card">
          <span className="text-5xl font-black">{q.answer}</span>
          {lang === "ja" && q.romaji && <span className="text-sm font-bold uppercase text-muted-foreground">{q.romaji}</span>}
          {q.translation && <span className="text-xs text-muted-foreground">{q.translation}</span>}
          <button onClick={() => speakForLang(q.answer, lang)} className="text-primary mt-2">
            <Volume2 className="h-6 w-6" />
          </button>
          <button onClick={handleSpeak} disabled={listening || correct !== null}
            className={`btn-3d mt-2 flex items-center gap-2 rounded-2xl px-6 py-3 font-bold text-primary-foreground ${listening ? "bg-destructive animate-pulse" : "bg-primary"}`}>
            <Mic className="h-5 w-5" />
            {listening ? t("Ouvindo...") : t("Falar")}
          </button>
          {heard && <div className="text-xs text-muted-foreground">{tf('Ouvi: "{heard}"', { heard })}</div>}
        </div>
      )}

      {(q.kind === "choose" || q.kind === "listen") && q.options && (
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
        <input value={typed} onChange={(e) => setTyped(e.target.value)} disabled={correct !== null}
          placeholder={t("Digite sua resposta")}
          className="mt-6 w-full rounded-2xl border-2 border-border bg-card px-4 py-3.5 text-lg outline-none focus:border-primary" />
      )}

      <div className="mt-auto pt-6">
        {correct === null ? (
          q.kind === "speak" ? null : (
            <button onClick={check} disabled={q.kind === "complete" ? !typed.trim() : !picked}
              className="btn-3d w-full rounded-2xl bg-primary py-3.5 font-bold text-primary-foreground disabled:opacity-50">
              {t("Verificar")}
            </button>
          )
        ) : (
          <div className={`rounded-2xl p-4 ${correct ? "bg-success/15 text-success" : "bg-destructive/15 text-destructive"}`}>
            <div className="text-sm font-black">{correct ? t("Muito bem! 🎉") : `${t("Resposta certa:")} ${q.answer}`}</div>
            {(q.translation || q.japanese || q.romaji) && (
              <div className="mt-2 space-y-1 rounded-xl bg-background/60 p-3 text-left">
                {q.translation && (
                  <div className="text-xs"><span className="font-black uppercase opacity-70">{t("Português:")}</span> <span className="font-bold text-foreground">{q.translation}</span></div>
                )}
                {q.japanese && (
                  <div className="text-xs"><span className="font-black uppercase opacity-70">{t("Japonês:")}</span> <span className="font-bold text-foreground">{q.japanese}</span></div>
                )}
                {q.romaji && (
                  <div className="text-xs"><span className="font-black uppercase opacity-70">{t("Romaji:")}</span> <span className="font-bold text-foreground">{q.romaji}</span></div>
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
