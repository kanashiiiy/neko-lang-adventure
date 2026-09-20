import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/lib/neko-toast";
import { ArrowLeft, Users, Activity, Crown, Sparkles, UserPlus, BookOpen, Brain, Gem, Star } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { fetchProfile, updateProfile, addAdminTestXp, getLevelChestKey, isAdmin } from "@/lib/profile";
import { BottomNav } from "@/components/BottomNav";
import { useT, useTf } from "@/lib/i18n";

export const Route = createFileRoute("/_authenticated/admin")({
  component: AdminPage,
});

type Stats = {
  total_users: number;
  active_today: number;
  active_7d: number;
  active_30d: number;
  premium: number;
  premium_plus: number;
  signups_today: number;
  signups_7d: number;
  signups_30d: number;
  lessons_completed: number;
  signups_daily: { day: string; count: number }[];
};

function AdminPage() {
  const t = useT();
  const tf = useTf();
  const qc = useQueryClient();
  const navigate = useNavigate();
  const [xpAmount, setXpAmount] = useState("500");

  const { data: profile, isLoading: loadingProfile, error: profileError } = useQuery({
    queryKey: ["admin-profile"],
    queryFn: async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error) throw error;
      const user = data.session?.user;
      if (!user) return null;

      // Acesso ao painel é decidido pelo role real no backend, não por um
      // campo/cache do perfil. Isso evita bloquear administradores quando
      // outras colunas do perfil estiverem sendo atualizadas.
      const admin = await isAdmin(user.id);
      if (!admin) return { id: user.id, is_admin: false } as const;

      // O painel continua usando o perfil existente para suas ferramentas.
      const currentProfile = await fetchProfile(user.id);
      return currentProfile ? { ...currentProfile, is_admin: true } : { id: user.id, is_admin: true };
    },
  });

  const isAdminUser = Boolean(profile?.is_admin);

  const { data: stats } = useQuery({
    queryKey: ["admin-stats"],
    enabled: isAdminUser,
    queryFn: async () => {
      const { data, error } = await supabase.rpc("admin_app_stats");
      if (error) throw error;
      return data as unknown as Stats;
    },
  });

  if (loadingProfile) {
    return (
      <div className="mobile-shell">
        <main className="flex flex-1 items-center justify-center text-muted-foreground">{t("Carregando...")}</main>
        <BottomNav />
      </div>
    );
  }

  if (!isAdminUser) {
    return (
      <div className="mobile-shell">
        <main className="flex flex-1 flex-col items-center justify-center gap-4 px-8 text-center">
          <div className="text-4xl">🔒</div>
          <p className="font-bold">{t("Acesso restrito ao Administrador")}</p>
          <button onClick={() => navigate({ to: "/home" })}
            className="btn-3d rounded-2xl bg-primary px-5 py-3 font-bold text-primary-foreground">
            {t("Voltar")}
          </button>
        </main>
        <BottomNav />
      </div>
    );
  }

  if (profileError) {
    return (
      <div className="mobile-shell">
        <main className="flex flex-1 flex-col items-center justify-center gap-4 px-8 text-center">
          <div className="text-4xl">⚠️</div>
          <p className="font-bold">{t("Não foi possível carregar o perfil de administrador.")}</p>
          <button onClick={() => qc.invalidateQueries({ queryKey: ["admin-profile"] })}
            className="btn-3d rounded-2xl bg-primary px-5 py-3 font-bold text-primary-foreground">
            {t("Tentar novamente")}
          </button>
        </main>
        <BottomNav />
      </div>
    );
  }

  async function grant(patch: Record<string, unknown>, msg: string) {
    if (!profile) return;
    await updateProfile(profile.id, patch as never);
    qc.invalidateQueries({ queryKey: ["profile"] });
    toast.success(t(msg));
  }

  const monthAhead = () => {
    const d = new Date();
    d.setMonth(d.getMonth() + 1);
    return d.toISOString();
  };

  const maxDaily = Math.max(1, ...(stats?.signups_daily ?? []).map((d) => d.count));

  function queueAdminLevelChests(userId: string, levels: number[]) {
    try {
      const key = `nekoteach:level-chests:${userId}`;
      const current = JSON.parse(localStorage.getItem(key) ?? "[]") as number[];
      const merged = Array.from(new Set([...current, ...levels])).sort((a, b) => a - b);
      localStorage.setItem(key, JSON.stringify(merged));
      // Não marca nenhum baú como aberto: eles continuam disponíveis após fechar o app.
      levels.forEach((level) => localStorage.removeItem(getLevelChestKey(userId, level)));
    } catch {}
  }

  async function addXpForTest() {
    if (!profile?.id) return;
    const amount = Math.floor(Number(xpAmount));
    if (!Number.isFinite(amount) || amount <= 0) {
      toast.error(t("Digite uma quantidade de XP válida."));
      return;
    }
    const result = await addAdminTestXp(profile.id, amount);
    if (!result) {
      toast.error(t("Acesso não autorizado para esta ferramenta."));
      return;
    }
    if (result.crossedLevels.length) queueAdminLevelChests(profile.id, result.crossedLevels);
    qc.invalidateQueries({ queryKey: ["profile"] });
    toast.success(tf("{n} XP adicionados com sucesso.", { n: amount }));
  }

  return (
    <div className="mobile-shell">
      <header className="border-b-2 border-border bg-card px-6 py-4 flex items-center gap-3">
        <button onClick={() => navigate({ to: "/profile" })} aria-label={t("Voltar")}>
          <ArrowLeft className="h-5 w-5" />
        </button>
        <h1 className="text-2xl font-black">{t("Painel Admin")}</h1>
      </header>

      <main className="flex-1 space-y-5 px-4 py-5">
        <div className="grid grid-cols-2 gap-3">
          <StatCard icon={<Users className="h-5 w-5" />} label={t("Usuários")} value={stats?.total_users} />
          <StatCard icon={<Activity className="h-5 w-5" />} label={t("Ativos hoje")} value={stats?.active_today} />
          <StatCard icon={<Activity className="h-5 w-5" />} label={t("Ativos (7 dias)")} value={stats?.active_7d} />
          <StatCard icon={<Activity className="h-5 w-5" />} label={t("Ativos (30 dias)")} value={stats?.active_30d} />
          <StatCard icon={<Crown className="h-5 w-5" />} label={t("Premium")} value={stats?.premium} />
          <StatCard icon={<Sparkles className="h-5 w-5" />} label={t("Premium Plus")} value={stats?.premium_plus} />
          <StatCard icon={<UserPlus className="h-5 w-5" />} label={t("Cadastros hoje")} value={stats?.signups_today} />
          <StatCard icon={<UserPlus className="h-5 w-5" />} label={t("Cadastros (30 dias)")} value={stats?.signups_30d} />
          <StatCard icon={<BookOpen className="h-5 w-5" />} label={t("Lições concluídas")} value={stats?.lessons_completed} />
          <StatCard icon={<UserPlus className="h-5 w-5" />} label={t("Cadastros (7 dias)")} value={stats?.signups_7d} />
        </div>

        <div className="rounded-3xl bg-card p-5 shadow-card">
          <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-muted-foreground">
            {t("Cadastros nos últimos 14 dias")}
          </h2>
          <div className="flex h-28 items-end gap-1">
            {(stats?.signups_daily ?? []).map((d) => (
              <div key={d.day} className="flex flex-1 flex-col items-center gap-1">
                <div
                  className="w-full rounded-t-md bg-primary"
                  style={{ height: `${Math.max(4, (d.count / maxDaily) * 96)}px` }}
                  title={`${d.day}: ${d.count}`}
                />
                <span className="text-[9px] text-muted-foreground">{d.day.slice(8)}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl bg-card p-5 shadow-card">
          <h2 className="mb-1 text-sm font-bold uppercase tracking-wide text-muted-foreground">
            {t("Ferramentas de teste")}
          </h2>
          <p className="mb-3 text-xs text-muted-foreground">
            {t("Foco infinito já está ativo nesta conta de Administrador.")}
          </p>
          <div className="space-y-2">
            <ToolButton
              icon={<Crown className="h-4 w-4" />}
              label={t("Ativar Premium (1 mês)")}
              onClick={() => grant({ is_premium: true, premium_until: monthAhead() }, "Premium ativado")}
            />
            <ToolButton
              icon={<Sparkles className="h-4 w-4" />}
              label={t("Ativar Premium Plus (1 mês)")}
              onClick={() =>
                grant(
                  {
                    is_premium: true,
                    premium_until: monthAhead(),
                    is_premium_plus: true,
                    premium_plus_until: monthAhead(),
                  },
                  "Premium Plus ativado",
                )
              }
            />
            <ToolButton
              icon={<Brain className="h-4 w-4" />}
              label={t("Recarregar Foco (99)")}
              onClick={() => grant({ focus: 99 }, "Foco recarregado")}
            />
            <div className="rounded-2xl border-2 border-primary/20 bg-background p-4">
              <div className="flex items-center gap-2 font-black"><Star className="h-4 w-4 text-gold" /> {t("Adicionar XP")}</div>
              <p className="mt-1 text-xs text-muted-foreground">{t("Ferramenta de teste disponível somente nesta conta Admin.")}</p>
              <div className="mt-3 flex gap-2">
                <input
                  value={xpAmount}
                  onChange={(e) => setXpAmount(e.target.value.replace(/[^0-9]/g, ""))}
                  inputMode="numeric"
                  aria-label={t("Quantidade de XP")}
                  className="min-w-0 flex-1 rounded-2xl border-2 border-border bg-card px-4 py-3 font-bold outline-none focus:border-primary"
                />
                <button onClick={addXpForTest} className="btn-3d rounded-2xl bg-primary px-4 py-3 font-bold text-primary-foreground">
                  {t("Adicionar")}
                </button>
              </div>
            </div>
            <ToolButton
              icon={<Gem className="h-4 w-4" />}
              label={t("Adicionar 1000 diamantes")}
              onClick={() => grant({ gems: (profile?.gems ?? 0) + 1000 }, "Diamantes adicionados")}
            />
          </div>
        </div>
      </main>
      <BottomNav />
    </div>
  );
}

function StatCard({ icon, label, value }: { icon: React.ReactNode; label: string; value?: number }) {
  return (
    <div className="rounded-2xl bg-card p-4 shadow-card">
      <div className="flex items-center gap-2 text-primary">{icon}</div>
      <div className="mt-2 text-2xl font-black">{value ?? "—"}</div>
      <div className="text-xs text-muted-foreground">{label}</div>
    </div>
  );
}

function ToolButton({ icon, label, onClick }: { icon: React.ReactNode; label: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="btn-3d flex w-full items-center justify-center gap-2 rounded-2xl bg-primary py-3 text-sm font-bold text-primary-foreground"
    >
      {icon} {label}
    </button>
  );
}
