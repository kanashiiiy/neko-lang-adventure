import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Flame, Gem, Trophy, Zap } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { fetchProfile, fetchCompletedLessons } from "@/lib/profile";
import { buildPhases, LANGUAGES, type Language } from "@/lib/lessons";
import { BottomNav } from "@/components/BottomNav";
import { NekoMascot } from "@/components/NekoMascot";

export const Route = createFileRoute("/_authenticated/home")({
  component: HomePage,
});

function HomePage() {
  const { data: profile } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const { data } = await supabase.auth.getUser();
      if (!data.user) return null;
      return fetchProfile(data.user.id);
    },
  });

  const lang = (profile?.language ?? "ja") as Language;
  const phases = buildPhases(lang, profile?.level, profile?.goal);
  const langMeta = LANGUAGES.find((l) => l.code === lang);

  const { data: completed } = useQuery({
    queryKey: ["completed", lang],
    enabled: !!profile,
    queryFn: async () => {
      const { data } = await supabase.auth.getUser();
      if (!data.user) return new Set<string>();
      return fetchCompletedLessons(data.user.id, lang);
    },
  });

  return (
    <div className="mobile-shell bg-background">
      <header className="sticky top-0 z-10 border-b-2 border-border bg-card/95 px-4 py-3 backdrop-blur">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{langMeta?.flag}</span>
            <div>
              <div className="text-xs text-muted-foreground">Aprendendo</div>
              <div className="text-sm font-bold">{langMeta?.name}</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Stat icon={<Flame className="h-4 w-4 text-orange-500" />} value={profile?.streak ?? 0} />
            <Stat icon={<Gem className="h-4 w-4 text-primary" />} value={profile?.gems ?? 0} />
            <Stat icon={<Trophy className="h-4 w-4 text-gold" />} value={profile?.xp ?? 0} />
            <Stat icon={<Zap className="h-4 w-4 text-yellow-500" />} value={profile?.focus ?? 0} />
          </div>
        </div>
      </header>

      <main className="flex-1 px-4 py-5">
        <div className="mb-6 rounded-3xl bg-gradient-primary p-5 text-primary-foreground shadow-soft">
          <div className="flex items-center gap-3">
            <NekoMascot size={72} float />
            <div>
              <div className="text-xs opacity-90">Olá, {profile?.name ?? "amigo"}!</div>
              <div className="text-lg font-black">Vamos aprender hoje? 🔥</div>
              <div className="mt-1 text-xs opacity-90">Meta diária: 20 XP</div>
            </div>
          </div>
        </div>

        <h2 className="mb-3 px-1 text-sm font-bold uppercase tracking-wide text-muted-foreground">
          Fases · {langMeta?.name}
        </h2>

        <div className="relative flex flex-col items-center gap-4">
          {phases.map((l, i) => {
            const isDone = completed?.has(l.id);
            const prevDone = i === 0 || completed?.has(phases[i - 1].id);
            const locked = !prevDone && !isDone;
            const offset = i % 2 === 0 ? "translate-x-6" : "-translate-x-6";
            return (
              <div key={l.id} className={`${offset}`}>
                <Link
                  to="/lesson/$id"
                  params={{ id: l.id }}
                  disabled={locked}
                  className={`group flex flex-col items-center ${locked ? "pointer-events-none opacity-50" : ""}`}
                >
                  <div className={`btn-3d flex h-20 w-20 items-center justify-center rounded-full text-4xl transition ${
                    isDone ? "bg-success text-success-foreground"
                    : locked ? "bg-muted text-muted-foreground"
                    : "bg-gradient-primary text-primary-foreground"
                  }`}>
                    {isDone ? "✓" : locked ? "🔒" : l.icon}
                  </div>
                  <div className="mt-2 text-center">
                    <div className="text-sm font-bold">{l.title}</div>
                    <div className="text-[10px] uppercase tracking-wide text-muted-foreground">
                      +{l.xp} XP · {l.questions.length} tarefas
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </main>

      <BottomNav />
    </div>
  );
}

function Stat({ icon, value }: { icon: React.ReactNode; value: number }) {
  return (
    <div className="flex items-center gap-1 rounded-full bg-muted px-2 py-1 text-xs font-bold">
      {icon}
      <span>{value}</span>
    </div>
  );
}
