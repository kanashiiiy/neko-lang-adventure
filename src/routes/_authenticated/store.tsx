import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Check, Sparkles } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { fetchProfile, updateProfile } from "@/lib/profile";
import { BottomNav } from "@/components/BottomNav";
import { NekoMascot } from "@/components/NekoMascot";

export const Route = createFileRoute("/_authenticated/store")({
  component: StorePage,
});

const BENEFITS = [
  "Todas as lições desbloqueadas",
  "Neko AI ilimitado",
  "Sem anúncios",
  "Conteúdo exclusivo semanal",
  "Vidas infinitas",
  "Modo offline",
];

function StorePage() {
  const qc = useQueryClient();
  const { data: profile } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const { data } = await supabase.auth.getUser();
      if (!data.user) return null;
      return fetchProfile(data.user.id);
    },
  });

  async function startTrial() {
    const { data } = await supabase.auth.getUser();
    if (!data.user) return;
    const until = new Date();
    until.setDate(until.getDate() + 3);
    await updateProfile(data.user.id, { is_premium: true, premium_until: until.toISOString() } as never);
    qc.invalidateQueries({ queryKey: ["profile"] });
    toast.success("🎉 3 dias grátis ativados!");
  }

  return (
    <div className="mobile-shell">
      <header className="border-b-2 border-border bg-card px-6 py-4">
        <h1 className="text-2xl font-black">Loja</h1>
      </header>
      <main className="flex-1 px-4 py-5">
        <div className="rounded-3xl bg-gradient-primary p-6 text-primary-foreground shadow-soft">
          <div className="flex items-center gap-3">
            <NekoMascot size={90} float />
            <div>
              <div className="flex items-center gap-1 text-xs font-bold uppercase tracking-wide">
                <Sparkles className="h-3.5 w-3.5" /> Premium
              </div>
              <div className="text-2xl font-black">NEKOTeach Plus</div>
              <div className="text-xs opacity-90">Aprenda sem limites</div>
            </div>
          </div>

          <div className="mt-5 rounded-2xl bg-white/15 p-4 backdrop-blur">
            <div className="text-4xl font-black">R$ 20<span className="text-lg opacity-80">/mês</span></div>
            <div className="text-xs opacity-90">Cancele quando quiser</div>
          </div>

          <ul className="mt-4 space-y-2">
            {BENEFITS.map((b) => (
              <li key={b} className="flex items-center gap-2 text-sm">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gold text-gold-foreground">
                  <Check className="h-3 w-3" />
                </span>
                {b}
              </li>
            ))}
          </ul>

          {profile?.is_premium ? (
            <div className="btn-3d-gold mt-5 rounded-2xl bg-gold py-3.5 text-center font-black text-gold-foreground">
              ✨ Você é Premium
            </div>
          ) : (
            <>
              <button onClick={startTrial}
                className="btn-3d-gold mt-5 w-full rounded-2xl bg-gold py-3.5 font-black text-gold-foreground">
                Começar 3 dias grátis
              </button>
              <p className="mt-2 text-center text-[11px] opacity-90">
                Depois, R$ 20/mês. Renovação automática.
              </p>
            </>
          )}
        </div>

        <p className="mt-4 text-center text-xs text-muted-foreground">
          O processamento de pagamento real será ativado em breve.
        </p>
      </main>
      <BottomNav />
    </div>
  );
}
