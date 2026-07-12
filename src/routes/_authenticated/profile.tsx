import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import { Flame, Gem, Trophy, LogOut, Pencil } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { fetchProfile, updateProfile } from "@/lib/profile";
import { LANGUAGES } from "@/lib/lessons";
import { BottomNav } from "@/components/BottomNav";
import { NekoMascot } from "@/components/NekoMascot";

export const Route = createFileRoute("/_authenticated/profile")({
  component: ProfilePage,
});

function ProfilePage() {
  const qc = useQueryClient();
  const navigate = useNavigate();
  const { data: profile } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const { data } = await supabase.auth.getUser();
      if (!data.user) return null;
      return fetchProfile(data.user.id);
    },
  });

  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(profile?.name ?? "");
  const [confirmLogout, setConfirmLogout] = useState(false);

  async function save() {
    const { data } = await supabase.auth.getUser();
    if (!data.user) return;
    await updateProfile(data.user.id, { name });
    qc.invalidateQueries({ queryKey: ["profile"] });
    setEditing(false);
    toast.success("Perfil atualizado!");
  }

  async function logout() {
    await qc.cancelQueries();
    qc.clear();
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  }

  const langMeta = LANGUAGES.find((l) => l.code === profile?.language);

  return (
    <div className="mobile-shell">
      <header className="bg-gradient-primary px-6 pt-8 pb-6 text-primary-foreground">
        <div className="flex items-center gap-4">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-card/20 border-4 border-card/40">
            <NekoMascot size={60} float={false} />
          </div>
          <div className="flex-1">
            {editing ? (
              <input value={name} onChange={(e) => setName(e.target.value)}
                className="w-full rounded-lg bg-card/20 px-2 py-1 font-bold" autoFocus />
            ) : (
              <h1 className="text-2xl font-black">{profile?.name ?? "Aluno"}</h1>
            )}
            <p className="text-sm opacity-90">{profile?.email}</p>
          </div>
          <button onClick={() => (editing ? save() : (setName(profile?.name ?? ""), setEditing(true)))}
            className="rounded-full bg-card/20 p-2">
            {editing ? "✓" : <Pencil className="h-4 w-4" />}
          </button>
        </div>
      </header>

      <main className="flex-1 px-6 py-6 flex flex-col gap-4">
        <div className="grid grid-cols-3 gap-3">
          <StatCard icon={<Trophy className="h-6 w-6 text-gold" />} label="XP" value={profile?.xp ?? 0} />
          <StatCard icon={<Gem className="h-6 w-6 text-primary" />} label="Gemas" value={profile?.gems ?? 0} />
          <StatCard icon={<Flame className="h-6 w-6 text-orange-500" />} label="Sequência" value={profile?.streak ?? 0} />
        </div>

        <InfoRow label="Idioma" value={`${langMeta?.flag ?? ""} ${langMeta?.name ?? "—"}`} />
        <InfoRow label="Nível" value={profile?.level ?? "—"} />
        <InfoRow label="País" value={profile?.country ?? "—"} />
        <InfoRow label="Plano" value={profile?.is_premium ? "Premium ✨" : "Gratuito"} />

        <button onClick={() => setConfirmLogout(true)}
          className="mt-4 flex items-center justify-center gap-2 rounded-2xl border-2 border-destructive/30 py-3 font-bold text-destructive">
          <LogOut className="h-4 w-4" /> Sair da conta
        </button>

        {confirmLogout && (
          <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 p-4 sm:items-center" onClick={() => setConfirmLogout(false)}>
            <div className="w-full max-w-md rounded-3xl bg-card p-6 shadow-soft animate-bounce-in" onClick={(e) => e.stopPropagation()}>
              <NekoMascot size={90} float className="mx-auto" />
              <h2 className="mt-4 text-center text-xl font-black">Deseja realmente sair da conta?</h2>
              <p className="mt-2 text-center text-sm text-muted-foreground">
                Seu progresso continua salvo. Você pode voltar quando quiser!
              </p>
              <div className="mt-6 grid grid-cols-2 gap-3">
                <button onClick={() => setConfirmLogout(false)}
                  className="rounded-2xl border-2 border-border py-3 font-bold">Cancelar</button>
                <button onClick={logout}
                  className="btn-3d rounded-2xl bg-destructive py-3 font-bold text-destructive-foreground">Sair</button>
              </div>
            </div>
          </div>
        )}
      </main>

      <BottomNav />
    </div>
  );
}

function StatCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: number }) {
  return (
    <div className="flex flex-col items-center rounded-2xl bg-card p-3 shadow-card">
      {icon}
      <div className="mt-1 text-xl font-black">{value}</div>
      <div className="text-[10px] uppercase tracking-wide text-muted-foreground">{label}</div>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between rounded-2xl bg-card px-4 py-3 shadow-card">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="font-bold">{value}</span>
    </div>
  );
}
