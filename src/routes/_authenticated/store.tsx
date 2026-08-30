import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Check, Sparkles, Brain, Gem } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { fetchProfile, updateProfile, buyFocus, isPremiumPlusActive } from "@/lib/profile";
import { BottomNav } from "@/components/BottomNav";
import { NekoMascot } from "@/components/NekoMascot";
import { useT, useTf } from "@/lib/i18n";

export const Route = createFileRoute("/_authenticated/store")({
  component: StorePage,
});

const BENEFITS = [
  "Todas as fases desbloqueadas",
  "Neko AI ilimitado",
  "Sem anúncios",
  "Foco infinito",
  "Conteúdo exclusivo semanal",
];

const FOCUS_PACKS: { id: string; focus: number; cost: number; label: string; badge?: string }[] = [
  { id: "starter", focus: 20, cost: 400, label: "Oferta iniciante", badge: "MELHOR" },
  { id: "small", focus: 5, cost: 150, label: "Pequeno" },
  { id: "medium", focus: 10, cost: 300, label: "Médio" },
];

function StorePage() {
  const qc = useQueryClient();
  const t = useT();
  const tf = useTf();
  const { data: profile } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const { data } = await supabase.auth.getUser();
      if (!data.user) return null;
      return fetchProfile(data.user.id);
    },
  });

  async function startTrial() {
    if (!profile) return;
    const until = new Date();
    until.setDate(until.getDate() + 3);
    await updateProfile(profile.id, { is_premium: true, premium_until: until.toISOString() } as never);
    qc.invalidateQueries({ queryKey: ["profile"] });
    toast.success(t("🎉 3 dias grátis ativados!"));
  }

  async function subscribePlus() {
    if (!profile) return;
    const until = new Date();
    until.setMonth(until.getMonth() + 1);
    await updateProfile(profile.id, {
      is_premium: true,
      premium_until: until.toISOString(),
      is_premium_plus: true,
      premium_plus_until: until.toISOString(),
    } as never);
    qc.invalidateQueries({ queryKey: ["profile"] });
    toast.success(t("🎉 Premium Plus ativado!"));
  }

  async function purchase(focus: number, cost: number) {
    if (!profile) return;
    if (profile.gems < cost) return toast.error(t("Diamantes insuficientes 💎"));
    const res = await buyFocus(profile.id, focus, cost);
    if (!res) return toast.error(t("Não foi possível comprar"));
    qc.invalidateQueries({ queryKey: ["profile"] });
    toast.success(tf("+{n} Foco adicionados! ⚡", { n: focus }));
  }

  return (
    <div className="mobile-shell">
      <header className="border-b-2 border-border bg-card px-6 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-black">{t("Premium")}</h1>
        <div className="flex items-center gap-1 rounded-full bg-muted px-3 py-1 text-sm font-bold text-primary">
          <Gem className="h-4 w-4" /> {profile?.gems ?? 0}
        </div>
      </header>
      <main className="flex-1 px-4 py-5 space-y-5">
        <div className="rounded-3xl bg-gradient-primary p-6 text-primary-foreground shadow-soft">
          <div className="flex items-center gap-3">
            <NekoMascot size={90} float />
            <div>
              <div className="flex items-center gap-1 text-xs font-bold uppercase tracking-wide">
                <Sparkles className="h-3.5 w-3.5" /> {t("Premium")}
              </div>
              <div className="text-2xl font-black">NEKOTeach Plus</div>
              <div className="text-xs opacity-90">{t("Aprenda sem limites")}</div>
            </div>
          </div>

          <div className="mt-5 rounded-2xl bg-white/15 p-4 backdrop-blur">
            <div className="text-4xl font-black">R$ 20<span className="text-lg opacity-80">{t("/mês")}</span></div>
            <div className="text-xs opacity-90">{t("Cancele quando quiser")}</div>
          </div>

          <ul className="mt-4 space-y-2">
            {BENEFITS.map((b) => (
              <li key={b} className="flex items-center gap-2 text-sm">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gold text-gold-foreground">
                  <Check className="h-3 w-3" />
                </span>
                {t(b)}
              </li>
            ))}
          </ul>

          {profile?.is_premium ? (
            <div className="btn-3d-gold mt-5 rounded-2xl bg-gold py-3.5 text-center font-black text-gold-foreground">
              {t("✨ Você é Premium")}
            </div>
          ) : (
            <>
              <button onClick={startTrial}
                className="btn-3d-gold mt-5 w-full rounded-2xl bg-gold py-3.5 font-black text-gold-foreground">
                {t("Começar 3 dias grátis")}
              </button>
              <p className="mt-2 text-center text-[11px] opacity-90">{t("Depois, R$ 20/mês. Renovação automática.")}</p>
            </>
          )}
        </div>

        <div className="rounded-3xl bg-card p-5 shadow-card">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-primary">
            <Sparkles className="h-3.5 w-3.5" /> {t("Premium Plus")}
          </div>
          <div className="mt-1 text-lg font-black">{t("Diálogos do dia a dia em todas as situações")}</div>
          <p className="mt-1 text-sm text-muted-foreground">{t("Tudo do Premium + Diálogos do Dia a Dia")}</p>
          {isPremiumPlusActive(profile) ? (
            <div className="mt-4 rounded-2xl bg-muted py-3 text-center font-black text-primary">
              {t("✨ Você é Premium Plus")}
            </div>
          ) : (
            <button onClick={subscribePlus}
              className="btn-3d-gold mt-4 w-full rounded-2xl bg-gold py-3.5 font-black text-gold-foreground">
              {t("Assine o Premium Plus")}
            </button>
          )}
        </div>

        <div>
          <h2 className="mb-3 px-1 text-sm font-bold uppercase tracking-wide text-muted-foreground">{t("Comprar Foco")}</h2>
          <div className="space-y-2">
            {FOCUS_PACKS.map((p) => (
              <div key={p.id} className="flex items-center gap-3 rounded-2xl bg-card p-4 shadow-card">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-yellow-100 text-yellow-600">
                  <Brain className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-black">{tf("+{n} Foco", { n: p.focus })}</span>
                    {p.badge && <span className="rounded-full bg-gold px-2 py-0.5 text-[10px] font-bold text-gold-foreground">{t(p.badge)}</span>}
                  </div>
                  <div className="text-xs text-muted-foreground">{t(p.label)}</div>
                </div>
                <button onClick={() => purchase(p.focus, p.cost)}
                  className="btn-3d flex items-center gap-1 rounded-2xl bg-primary px-3 py-2 text-sm font-bold text-primary-foreground">
                  <Gem className="h-3.5 w-3.5" /> {p.cost}
                </button>
              </div>
            ))}
          </div>
        </div>
      </main>
      <BottomNav />
    </div>
  );
}
