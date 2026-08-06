import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Target, Gem, Trophy, Zap, Check } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { fetchProfile, updateProfile } from "@/lib/profile";
import { BottomNav } from "@/components/BottomNav";
import { NekoMascot } from "@/components/NekoMascot";
import { useT } from "@/lib/i18n";


export const Route = createFileRoute("/_authenticated/missoes")({
  component: MissoesPage,
});

interface MissionCtx { xp: number; streak: number; focus: number; gems: number; xpToday: number; loggedToday: boolean }

interface Mission {
  id: string;
  title: string;
  desc: string;
  target: number;
  progress: (p: MissionCtx) => number;
  reward: { xp?: number; gems?: number; focus?: number };
}

// Missão permanente: nunca é substituída (mantém a sequência diária)
const LOGIN_MISSION: Mission = {
  id: "daily-login", title: "Login diário", desc: "Entre no app hoje", target: 1,
  progress: (p) => (p.loggedToday ? 1 : 0),
  reward: { gems: 5, xp: 5 },
};

// Pool de missões diárias — sorteadas a cada novo dia
const DAILY_POOL: Mission[] = [
  { id: "daily-xp-20", title: "Meta diária", desc: "Ganhe 20 XP hoje", target: 20,
    progress: (p) => Math.min(p.xpToday, 20),
    reward: { gems: 10, focus: 2 } },
  { id: "daily-xp-40", title: "Dobro de esforço", desc: "Ganhe 40 XP hoje", target: 40,
    progress: (p) => Math.min(p.xpToday, 40),
    reward: { gems: 20, focus: 3 } },
  { id: "daily-xp-60", title: "Maratona do dia", desc: "Ganhe 60 XP hoje", target: 60,
    progress: (p) => Math.min(p.xpToday, 60),
    reward: { gems: 30, xp: 10 } },
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
  { id: "gems-100", title: "Colecionador", desc: "Tenha 100 diamantes", target: 100,
    progress: (p) => Math.min(p.gems, 100),
    reward: { xp: 40, focus: 3 } },
];

const DAILY_COUNT = 3;
const CLAIMED_KEY = "nekoteach:missions-claimed";
const DAY_XP_KEY = "nekoteach:day-xp";

function today() {
  return new Date().toISOString().slice(0, 10);
}

function hashDate(d: string) {
  let h = 0;
  for (let i = 0; i < d.length; i++) h = (h * 31 + d.charCodeAt(i)) >>> 0;
  return h;
}

// Seleção determinística por dia: muda automaticamente a cada novo dia
function dailyMissions(day: string): Mission[] {
  const pool = [...DAILY_POOL];
  const picked: Mission[] = [];
  let seed = hashDate(day) || 1;
  for (let i = 0; i < DAILY_COUNT && pool.length; i++) {
    seed = (seed * 1103515245 + 12345) >>> 0;
    picked.push(pool.splice(seed % pool.length, 1)[0]);
  }
  return picked;
}

function getClaimed(): Set<string> {
  if (typeof window === "undefined") return new Set();
  try {
    const raw = localStorage.getItem(CLAIMED_KEY);
    const all: string[] = raw ? JSON.parse(raw) : [];
    // mantém apenas as recompensas coletadas hoje (missões renovam diariamente)
    return new Set(all.filter((k) => k.endsWith(`:${today()}`)));
  } catch { return new Set(); }
}
function setClaimed(s: Set<string>) {
  try { localStorage.setItem(CLAIMED_KEY, JSON.stringify([...s])); } catch { /* ignore */ }
}

function dayBaselineXp(xp: number) {
  if (typeof window === "undefined") return xp;
  try {
    const raw = localStorage.getItem(DAY_XP_KEY);
    const parsed = raw ? JSON.parse(raw) as { date: string; xp: number } : null;
    if (parsed && parsed.date === today()) return parsed.xp;
    localStorage.setItem(DAY_XP_KEY, JSON.stringify({ date: today(), xp }));
    return xp;
  } catch { return xp; }
}

function MissoesPage() {
  const qc = useQueryClient();
  const t = useT();
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
    const key = `${m.id}:${today()}`;
    const claimed = getClaimed();
    if (claimed.has(key)) return;
    claimed.add(key);
    setClaimed(claimed);
    await updateProfile(profile.id, {
      xp: profile.xp + (m.reward.xp ?? 0),
      gems: profile.gems + (m.reward.gems ?? 0),
      focus: profile.focus + (m.reward.focus ?? 0),
    });
    qc.invalidateQueries({ queryKey: ["profile"] });
    toast.success(t("Recompensa recebida! 🎉"));
  }

  const claimed = getClaimed();
  const missions = [LOGIN_MISSION, ...dailyMissions(today())];
  const p: MissionCtx | null = profile
    ? {
        xp: profile.xp,
        streak: profile.streak,
        focus: profile.focus,
        gems: profile.gems,
        xpToday: Math.max(0, profile.xp - dayBaselineXp(profile.xp)),
        loggedToday: true,
      }
    : null;

  return (
    <div className="mobile-shell">
      <header className="border-b-2 border-border bg-card px-6 py-4 flex items-center gap-3">
        <Target className="h-6 w-6 text-primary" />
        <h1 className="text-2xl font-black">{t("Missões")}</h1>
      </header>

      <main className="flex-1 px-4 py-5 space-y-4">
        <div className="rounded-3xl bg-gradient-primary p-5 text-primary-foreground shadow-soft flex items-center gap-3">
          <NekoMascot size={72} float />
          <div>
            <div className="text-lg font-black">{t("Complete missões e ganhe recompensas!")}</div>
            <div className="text-xs opacity-90">{t("Diamantes, XP e Foco te esperam")}</div>
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
                  <div className="font-black">{t(m.title)}</div>
                  <div className="text-xs text-muted-foreground">{t(m.desc)}</div>
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
                  <span className="flex items-center gap-1 text-xs font-bold text-success"><Check className="h-3 w-3" /> {t("Recebido")}</span>
                ) : complete ? (
                  <button onClick={() => claim(m)} className="btn-3d rounded-full bg-primary px-4 py-1.5 text-xs font-bold text-primary-foreground">{t("Coletar")}</button>
                ) : (
                  <span className="text-xs text-muted-foreground">{t("Em progresso")}</span>
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
