import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Target, Gem, Trophy, Zap, Check } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { fetchProfile, updateProfile } from "@/lib/profile";
import { BottomNav } from "@/components/BottomNav";
import { NekoMascot } from "@/components/NekoMascot";

export const Route = createFileRoute("/_authenticated/missoes")({
  component: MissoesPage,
});

interface Mission {
  id: string;
  title: string;
  desc: string;
  target: number;
  progress: (p: { xp: number; streak: number; focus: number; gems: number }) => number;
  reward: { xp?: number; gems?: number; focus?: number };
}

const MISSIONS: Mission[] = [
  { id: "daily-xp-20", title: "Meta diária", desc: "Ganhe 20 XP hoje", target: 20,
    progress: (p) => Math.min(p.xp, 20),
    reward: { gems: 10, focus: 2 } },
  { id: "streak-3", title: "Sequência de 3 dias", desc: "Estude 3 dias seguidos", target: 3,
    progress: (p) => Math.min(p.streak, 3),
    reward: { gems: 20 } },
  { id: "streak-7", title: "Sequência de 7 dias", desc: "Estude 7 dias seguidos", target: 7,
    progress: (p) => Math.min(p.streak, 7),
    reward: { gems: 50, xp: 30 } },
  { id: "xp-100", title: "Estudioso", desc: "Acumule 100 XP no total", target: 100,
    progress: (p) => Math.min(p.xp, 100),
    reward: { gems: 25, focus: 5 } },
  { id: "xp-500", title: "Dedicado", desc: "Acumule 500 XP no total", target: 500,
    progress: (p) => Math.min(p.xp, 500),
    reward: { gems: 100, focus: 10 } },
];

const CLAIMED_KEY = "nekoteach:missions-claimed";

function getClaimed(): Set<string> {
  if (typeof window === "undefined") return new Set();
  try {
    const raw = localStorage.getItem(CLAIMED_KEY);
    return new Set(raw ? JSON.parse(raw) : []);
  } catch { return new Set(); }
}
function setClaimed(s: Set<string>) {
  try { localStorage.setItem(CLAIMED_KEY, JSON.stringify([...s])); } catch { /* ignore */ }
}

function MissoesPage() {
  const qc = useQueryClient();
  const { data: profile } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const { data } = await supabase.auth.getUser();
      if (!data.user) return null;
      return fetchProfile(data.user.id);
    },
  });

  async function claim(m: Mission) {
    if (!profile) return;
    const claimed = getClaimed();
    if (claimed.has(m.id)) return;
    claimed.add(m.id);
    setClaimed(claimed);
    await updateProfile(profile.id, {
      xp: profile.xp + (m.reward.xp ?? 0),
      gems: profile.gems + (m.reward.gems ?? 0),
      focus: profile.focus + (m.reward.focus ?? 0),
    });
    qc.invalidateQueries({ queryKey: ["profile"] });
    toast.success("Recompensa recebida! 🎉");
  }

  const claimed = getClaimed();
  const p = profile ? { xp: profile.xp, streak: profile.streak, focus: profile.focus, gems: profile.gems } : null;

  return (
    <div className="mobile-shell">
      <header className="border-b-2 border-border bg-card px-6 py-4 flex items-center gap-3">
        <Target className="h-6 w-6 text-primary" />
        <h1 className="text-2xl font-black">Missões</h1>
      </header>

      <main className="flex-1 px-4 py-5 space-y-4">
        <div className="rounded-3xl bg-gradient-primary p-5 text-primary-foreground shadow-soft flex items-center gap-3">
          <NekoMascot size={72} float />
          <div>
            <div className="text-lg font-black">Complete missões e ganhe recompensas!</div>
            <div className="text-xs opacity-90">Diamantes, XP e Foco te esperam</div>
          </div>
        </div>

        {p && MISSIONS.map((m) => {
          const progress = m.progress(p);
          const complete = progress >= m.target;
          const already = claimed.has(m.id);
          return (
            <div key={m.id} className="rounded-2xl bg-card p-4 shadow-card">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="font-black">{m.title}</div>
                  <div className="text-xs text-muted-foreground">{m.desc}</div>
                </div>
                <div className="flex items-center gap-2 text-xs font-bold">
                  {m.reward.xp && <span className="flex items-center gap-1 text-gold"><Trophy className="h-3 w-3" />{m.reward.xp}</span>}
                  {m.reward.gems && <span className="flex items-center gap-1 text-primary"><Gem className="h-3 w-3" />{m.reward.gems}</span>}
                  {m.reward.focus && <span className="flex items-center gap-1 text-yellow-500"><Zap className="h-3 w-3" />{m.reward.focus}</span>}
                </div>
              </div>
              <div className="mt-3 h-2 rounded-full bg-muted overflow-hidden">
                <div className="h-full bg-gradient-primary transition-all"
                  style={{ width: `${Math.min(100, (progress / m.target) * 100)}%` }} />
              </div>
              <div className="mt-2 flex items-center justify-between">
                <span className="text-xs text-muted-foreground">{progress} / {m.target}</span>
                {already ? (
                  <span className="flex items-center gap-1 text-xs font-bold text-success"><Check className="h-3 w-3" /> Recebido</span>
                ) : complete ? (
                  <button onClick={() => claim(m)} className="btn-3d rounded-full bg-primary px-4 py-1.5 text-xs font-bold text-primary-foreground">Coletar</button>
                ) : (
                  <span className="text-xs text-muted-foreground">Em progresso</span>
                )}
              </div>
            </div>
          );
        })}
      </main>

      <BottomNav />
    </div>
  );
}
