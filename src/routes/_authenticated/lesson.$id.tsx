import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { X, Heart } from "lucide-react";
import { getLesson, type Language } from "@/lib/lessons";
import { supabase } from "@/integrations/supabase/client";
import { fetchProfile, addXpAndGems, saveLessonCompletion } from "@/lib/profile";
import { NekoMascot } from "@/components/NekoMascot";

export const Route = createFileRoute("/_authenticated/lesson/$id")({
  component: LessonPlayer,
});

function LessonPlayer() {
  const { id } = Route.useParams();
  const navigate = useNavigate();

  const { data: profile } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const { data } = await supabase.auth.getUser();
      if (!data.user) return null;
      return fetchProfile(data.user.id);
    },
  });

  const lang = (profile?.language ?? "ja") as Language;
  const lesson = useMemo(() => getLesson(lang, id), [lang, id]);
  const [idx, setIdx] = useState(0);
  const [hearts, setHearts] = useState(3);
  const [picked, setPicked] = useState<string | null>(null);
  const [correct, setCorrect] = useState<boolean | null>(null);
  const [rights, setRights] = useState(0);
  const [done, setDone] = useState(false);
  const [saving, setSaving] = useState(false);

  if (!lesson) {
    return (
      <div className="mobile-shell items-center justify-center px-6 text-center">
        <p>Lição não encontrada.</p>
        <Link to="/home" className="btn-3d mt-4 rounded-2xl bg-primary px-6 py-3 font-bold text-primary-foreground">Voltar</Link>
      </div>
    );
  }

  const q = lesson.questions[idx];
  const total = lesson.questions.length;

  function check() {
    if (!picked) return;
    const isRight = picked === q.answer;
    setCorrect(isRight);
    if (isRight) setRights((r) => r + 1);
    else setHearts((h) => Math.max(0, h - 1));
  }

  async function next() {
    setPicked(null);
    setCorrect(null);
    if (idx + 1 < total && hearts > 0) {
      setIdx(idx + 1);
    } else {
      await finish();
    }
  }

  async function finish() {
    setSaving(true);
    const { data } = await supabase.auth.getUser();
    if (!data.user) return;
    const score = Math.round((rights / total) * 100);
    const xpEarned = Math.round((rights / total) * lesson.xp);
    const gemsEarned = rights === total ? 5 : 2;
    try {
      await saveLessonCompletion(data.user.id, lang, lesson.id, score, xpEarned);
      await addXpAndGems(data.user.id, xpEarned, gemsEarned);
    } catch (e) {
      toast.error("Não conseguimos salvar seu progresso.");
    }
    setSaving(false);
    setDone(true);
  }

  if (done) {
    const score = Math.round((rights / total) * 100);
    return (
      <div className="mobile-shell items-center justify-center px-6 text-center">
        <NekoMascot size={180} bounce float />
        <h1 className="mt-4 text-3xl font-black">Lição concluída! 🎉</h1>
        <p className="mt-1 text-muted-foreground">Você acertou {rights} de {total}</p>
        <div className="mt-6 grid w-full grid-cols-3 gap-3">
          <Reward label="XP" value={`+${Math.round((rights / total) * lesson.xp)}`} color="bg-gold text-gold-foreground" />
          <Reward label="Acerto" value={`${score}%`} color="bg-success text-success-foreground" />
          <Reward label="Gemas" value={rights === total ? "+5" : "+2"} color="bg-primary text-primary-foreground" />
        </div>
        <Link to="/home" className="btn-3d mt-8 w-full rounded-2xl bg-primary py-3.5 font-bold text-primary-foreground">
          Continuar
        </Link>
      </div>
    );
  }

  if (hearts <= 0) {
    return (
      <div className="mobile-shell items-center justify-center px-6 text-center">
        <NekoMascot size={160} />
        <h1 className="mt-4 text-2xl font-black">Sem vidas 💔</h1>
        <p className="mt-1 text-sm text-muted-foreground">Tente de novo, você consegue!</p>
        <div className="mt-6 flex w-full flex-col gap-2">
          <button onClick={() => { setIdx(0); setHearts(3); setRights(0); }}
            className="btn-3d rounded-2xl bg-primary py-3.5 font-bold text-primary-foreground">Recomeçar</button>
          <Link to="/home" className="text-sm font-semibold text-muted-foreground">Voltar ao mapa</Link>
        </div>
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
        <div className="flex items-center gap-1 text-destructive font-bold">
          <Heart className="h-5 w-5 fill-current" /> {hearts}
        </div>
      </header>

      <div className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
        Pergunta {idx + 1} de {total}
      </div>
      <h2 className="mt-2 text-2xl font-black">Escolha a tradução</h2>

      <div className="mt-6 flex items-center justify-center rounded-3xl bg-card p-8 shadow-card">
        <span className="text-6xl font-black">{q.prompt}</span>
      </div>

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

      <div className="mt-auto pt-6">
        {correct === null ? (
          <button onClick={check} disabled={!picked}
            className="btn-3d w-full rounded-2xl bg-primary py-3.5 font-bold text-primary-foreground disabled:opacity-50">
            Verificar
          </button>
        ) : (
          <div className={`rounded-2xl p-4 ${correct ? "bg-success/15 text-success" : "bg-destructive/15 text-destructive"}`}>
            <div className="text-sm font-black">{correct ? "Muito bem! 🎉" : `Resposta certa: ${q.answer}`}</div>
            <button onClick={next} disabled={saving}
              className="btn-3d mt-3 w-full rounded-2xl bg-current py-3 font-bold">
              <span className={correct ? "text-success-foreground" : "text-destructive-foreground"}>
                {saving ? "Salvando..." : "Continuar"}
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
