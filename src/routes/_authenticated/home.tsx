import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Flame, Gem, Trophy, Brain } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { fetchCurrentProfile, fetchCompletedLessons, isPremiumActive, getLevelProgress } from "@/lib/profile";
import { buildPhases, LANGUAGES, normalizeLanguage } from "@/lib/lessons";
import { BottomNav } from "@/components/BottomNav";
import { NekoMascot } from "@/components/NekoMascot";
import { useT, useTf, useUiLang } from "@/lib/i18n";

export const Route = createFileRoute("/_authenticated/home")({ component: HomePage });

function HomePage() {
  const t = useT(); const tf = useTf(); const ui = useUiLang();
  const [showLevelPanel, setShowLevelPanel] = useState(false);
  const { data: profile } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => { return fetchCurrentProfile(); },
  });
  const lang = normalizeLanguage(profile?.language);
  const levelProgress = getLevelProgress(profile?.xp ?? 0);
  const phases = buildPhases(lang, profile?.level, profile?.goal, ui);
  const langMeta = LANGUAGES.find((l) => l.code === lang);
  const { data: completed } = useQuery({
    queryKey: ["completed", lang], enabled: !!profile,
    queryFn: async () => { const { data } = await supabase.auth.getSession(); return data.session?.user ? fetchCompletedLessons(data.session.user.id, lang) : new Set<string>(); },
  });
  return (
    <div className="mobile-shell bg-background">
      <header className="sticky top-0 z-10 border-b-2 border-border bg-card/95 px-4 py-3 backdrop-blur">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2"><span className="text-2xl">{langMeta?.flag}</span><div><div className="text-xs text-muted-foreground">{t("Aprendendo")}</div><div className="text-sm font-bold">{t(langMeta?.name ?? "")}</div></div></div>
          <div className="flex items-center gap-2">
            <Stat icon={<Flame className="h-4 w-4 text-orange-500" />} value={profile?.streak ?? 0} />
            <Stat icon={<Gem className="h-4 w-4 text-primary" />} value={profile?.gems ?? 0} rewardType="gems" />
            <button type="button" onClick={() => setShowLevelPanel(true)} aria-label={t("Ver progresso de nível")} className="rounded-full text-left focus:outline-none focus:ring-2 focus:ring-primary"><LevelStat progress={levelProgress} /></button>
            <Stat icon={<Brain className="h-4 w-4 text-yellow-500" />} value={isPremiumActive(profile) ? "∞" : (profile?.focus ?? 0)} rewardType="focus" />
          </div>
        </div>
      </header>
      {showLevelPanel && (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/30 px-4 pt-20" onClick={() => setShowLevelPanel(false)}>
          <div role="dialog" aria-modal="true" className="w-full max-w-sm rounded-3xl bg-card p-5 shadow-card" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-black">🏆 {tf("Nível {n}", { n: levelProgress.level })}</h2>
              <button onClick={() => setShowLevelPanel(false)} className="rounded-full px-3 py-1 text-xl font-bold text-muted-foreground">×</button>
            </div>
            <div className="mt-4 text-center text-2xl font-black">{levelProgress.xpIntoLevel} / {levelProgress.xpForNextLevel} XP</div>
            <div className="mt-3 h-3 overflow-hidden rounded-full bg-muted">
              <div className="h-full rounded-full bg-gradient-primary transition-all duration-700" style={{ width: `${levelProgress.progressPercent}%` }} />
            </div>
            <p className="mt-3 text-center text-sm font-semibold text-muted-foreground">
              {tf("Faltam {n} XP para o Nível {next}.", { n: levelProgress.remainingXp, next: levelProgress.level + 1 })}
            </p>
            <div className="mt-4 rounded-2xl bg-accent p-4 text-center">
              <div className="text-2xl">🎁</div>
              <div className="font-black">{t("Próxima recompensa")}</div>
              <div className="mt-1 text-sm text-muted-foreground">{t("Baú de recompensa ao subir de nível")}</div>
            </div>
          </div>
        </div>
      )}
      <main className="flex-1 px-4 py-5">
        <div className="mb-6 rounded-3xl bg-gradient-primary p-5 text-primary-foreground shadow-soft"><div className="flex items-center gap-3"><NekoMascot size={72} float /><div><div className="text-xs opacity-90">{tf("Olá, {name}!", { name: profile?.name ?? t("amigo") })}</div><div className="text-lg font-black">{t("Vamos aprender hoje? 🔥")}</div><div className="mt-1 text-xs opacity-90">{t("Meta diária: 20 XP")}</div></div></div></div>
        <div className="mb-5 rounded-3xl border border-primary/15 bg-card/80 px-4 py-4 shadow-soft">
          <div className="text-xs font-black uppercase tracking-[0.16em] text-primary">SEÇÃO 1 — UNIDADE 1</div>
          <div className="mt-1 text-lg font-black text-foreground">👋 Apresentação e cumprimentos</div>
          <div className="mt-1 text-xs font-semibold text-muted-foreground">{t("Fases")} · {t(langMeta?.name ?? "")} · 20 tarefas por fase</div>
        </div>
        <div className="relative flex flex-col items-center gap-4">
          {phases.map((l, i) => {
            const isDone = completed?.has(l.id); const prevDone = i === 0 || completed?.has(phases[i - 1].id); const locked = !prevDone && !isDone; const offset = i % 2 === 0 ? "translate-x-6" : "-translate-x-6";
            return <div key={l.id} className={offset}><Link to="/lesson/$id" params={{ id: l.id }} disabled={locked} className={`group flex flex-col items-center ${locked ? "pointer-events-none opacity-50" : ""}`}><div className={`btn-3d flex h-20 w-20 items-center justify-center rounded-full text-4xl transition ${isDone ? "bg-success text-success-foreground" : locked ? "bg-muted text-muted-foreground" : "bg-gradient-primary text-primary-foreground"}`}>{isDone ? "✓" : locked ? "🔒" : l.icon}</div><div className="mt-2 text-center"><div className="text-sm font-bold">{l.title}</div><div className="text-[10px] uppercase tracking-wide text-muted-foreground">+{l.xp} XP · {tf("{n} tarefas", { n: l.questions.length })}</div></div></Link></div>;
          })}
        </div>
      </main><BottomNav />
    </div>
  );
}
function LevelStat({ progress }: { progress: ReturnType<typeof getLevelProgress> }) {
  return <div data-reward-counter="xp" className="min-w-[96px] rounded-full bg-muted px-2 py-1 text-[10px] font-bold">
    <div className="flex items-center gap-1"><Trophy className="h-4 w-4 text-gold" /><span>Nível {progress.level}</span><span>· {progress.xpIntoLevel}/{progress.xpForNextLevel} XP</span></div>
    <div className="mt-1 h-1 overflow-hidden rounded-full bg-background"><div className="h-full rounded-full bg-gold transition-all duration-700" style={{ width: `${progress.progressPercent}%` }} /></div>
  </div>;
}

function Stat({ icon, value, rewardType }: { icon: React.ReactNode; value: number | string; rewardType?: "gems" | "focus" }) {
  return <div data-reward-counter={rewardType} className="flex items-center gap-1 rounded-full bg-muted px-2 py-1 text-xs font-bold">{icon}<span>{value}</span></div>;
}
