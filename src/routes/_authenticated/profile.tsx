import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Flame, Gem, Trophy, Zap, Edit3, Lock, Globe, MapPin, Bell, Moon, Shield, LogOut, ChevronRight, Award } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { fetchProfile, updateProfile } from "@/lib/profile";
import { LANGUAGES } from "@/lib/lessons";
import { BottomNav } from "@/components/BottomNav";

export const Route = createFileRoute("/_authenticated/profile")({
  component: ProfilePage,
});

const COUNTRIES = ["Brasil", "Portugal", "Estados Unidos", "Japão", "Coreia do Sul", "França", "Espanha", "Outro"];

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

  const [modal, setModal] = useState<null | "name" | "password" | "language" | "country">(null);
  const [name, setName] = useState("");
  const [pass, setPass] = useState(""); const [confirm, setConfirm] = useState("");

  useEffect(() => {
    if (profile) document.documentElement.classList.toggle("dark", profile.theme === "dark");
  }, [profile]);

  async function save(patch: Record<string, unknown>) {
    if (!profile) return;
    await updateProfile(profile.id, patch as never);
    qc.invalidateQueries({ queryKey: ["profile"] });
  }

  async function saveName() {
    if (name.trim().length < 2) return toast.error("Nome muito curto");
    await save({ name: name.trim() });
    toast.success("Nome atualizado!");
    setModal(null);
  }

  async function savePass() {
    if (pass.length < 6) return toast.error("Mínimo 6 caracteres");
    if (pass !== confirm) return toast.error("As senhas não coincidem");
    const { error } = await supabase.auth.updateUser({ password: pass });
    if (error) return toast.error(error.message);
    toast.success("Senha atualizada!");
    setPass(""); setConfirm(""); setModal(null);
  }

  async function toggleTheme() {
    const next = profile?.theme === "dark" ? "light" : "dark";
    document.documentElement.classList.toggle("dark", next === "dark");
    await save({ theme: next });
  }

  async function toggleNotif() {
    await save({ notifications_enabled: !profile?.notifications_enabled });
  }

  async function logout() {
    await qc.cancelQueries();
    qc.clear();
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  }

  if (!profile) return <div className="mobile-shell items-center justify-center">Carregando...</div>;

  const langMeta = LANGUAGES.find((l) => l.code === profile.language);

  return (
    <div className="mobile-shell">
      <header className="border-b-2 border-border bg-card px-6 py-4">
        <h1 className="text-2xl font-black">Perfil</h1>
      </header>

      <main className="flex-1 px-4 py-4 space-y-5">
        {/* Header card */}
        <div className="flex flex-col items-center rounded-3xl bg-gradient-primary p-6 text-primary-foreground shadow-soft">
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-white/20 text-4xl font-black backdrop-blur">
            {profile.name?.[0]?.toUpperCase() ?? "?"}
          </div>
          <div className="mt-3 text-2xl font-black">{profile.name}</div>
          <div className="text-xs opacity-90">{profile.email}</div>
          <div className="mt-1 text-xs font-bold uppercase tracking-wide opacity-90">Nível {profile.level}</div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-2">
          <StatCard icon={<Trophy className="h-4 w-4" />} label="XP" value={profile.xp} color="text-gold" />
          <StatCard icon={<Gem className="h-4 w-4" />} label="Diamantes" value={profile.gems} color="text-primary" />
          <StatCard icon={<Flame className="h-4 w-4" />} label="Sequência" value={profile.streak} color="text-orange-500" />
          <StatCard icon={<Zap className="h-4 w-4" />} label="Foco" value={profile.focus} color="text-yellow-500" />
        </div>

        <Section title="Conquistas">
          <div className="flex items-center gap-3 px-4 py-3">
            <Award className="h-6 w-6 text-gold" />
            <div className="flex-1 text-sm">
              <div className="font-bold">Sua jornada começou!</div>
              <div className="text-xs text-muted-foreground">Conclua mais fases para desbloquear mais conquistas</div>
            </div>
          </div>
        </Section>

        <Section title="Conta">
          <ClickRow icon={<Edit3 className="h-5 w-5" />} label="Editar nome" onClick={() => { setName(profile.name ?? ""); setModal("name"); }} />
          <ClickRow icon={<Lock className="h-5 w-5" />} label="Alterar senha" onClick={() => setModal("password")} />
        </Section>

        <Section title="Preferências">
          <ClickRow icon={<Globe className="h-5 w-5" />} label={`Idioma: ${langMeta?.flag} ${langMeta?.name}`} onClick={() => setModal("language")} />
          <ClickRow icon={<MapPin className="h-5 w-5" />} label={`País: ${profile.country ?? "Não definido"}`} onClick={() => setModal("country")} />
          <Row icon={<Bell className="h-5 w-5" />} label="Notificações">
            <Switch checked={profile.notifications_enabled} onChange={toggleNotif} />
          </Row>
          <Row icon={<Moon className="h-5 w-5" />} label="Modo escuro">
            <Switch checked={profile.theme === "dark"} onChange={toggleTheme} />
          </Row>
          <ClickRow icon={<Shield className="h-5 w-5" />} label="Privacidade" onClick={() => toast.info("Em breve!")} />
        </Section>

        <button onClick={logout}
          className="btn-3d flex w-full items-center justify-center gap-2 rounded-2xl bg-destructive py-3.5 font-bold text-destructive-foreground">
          <LogOut className="h-5 w-5" /> Sair da conta
        </button>
      </main>

      {modal && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 p-4 sm:items-center" onClick={() => setModal(null)}>
          <div className="w-full max-w-md rounded-3xl bg-card p-6 animate-bounce-in" onClick={(e) => e.stopPropagation()}>
            {modal === "name" && (
              <>
                <h2 className="text-xl font-black">Editar nome</h2>
                <input value={name} onChange={(e) => setName(e.target.value)}
                  className="mt-4 w-full rounded-2xl border-2 border-border bg-card px-4 py-3 outline-none focus:border-primary" />
                <ModalActions onCancel={() => setModal(null)} onSave={saveName} />
              </>
            )}
            {modal === "password" && (
              <>
                <h2 className="text-xl font-black">Alterar senha</h2>
                <div className="mt-4 flex flex-col gap-3">
                  <input type="password" placeholder="Nova senha" value={pass} onChange={(e) => setPass(e.target.value)}
                    className="rounded-2xl border-2 border-border bg-card px-4 py-3 outline-none focus:border-primary" />
                  <input type="password" placeholder="Confirmar" value={confirm} onChange={(e) => setConfirm(e.target.value)}
                    className="rounded-2xl border-2 border-border bg-card px-4 py-3 outline-none focus:border-primary" />
                </div>
                <ModalActions onCancel={() => setModal(null)} onSave={savePass} />
              </>
            )}
            {modal === "language" && (
              <>
                <h2 className="text-xl font-black">Idioma</h2>
                <div className="mt-4 flex flex-col gap-2">
                  {LANGUAGES.map((l) => (
                    <button key={l.code} onClick={async () => { await save({ language: l.code }); setModal(null); toast.success("Idioma atualizado"); }}
                      className={`flex items-center gap-3 rounded-2xl border-2 p-3 text-left ${profile.language === l.code ? "border-primary bg-accent" : "border-border"}`}>
                      <span className="text-2xl">{l.flag}</span>
                      <span className="flex-1 font-bold">{l.name}</span>
                      {profile.language === l.code && <span className="text-primary">✓</span>}
                    </button>
                  ))}
                </div>
              </>
            )}
            {modal === "country" && (
              <>
                <h2 className="text-xl font-black">País</h2>
                <div className="mt-4 flex max-h-80 flex-col gap-2 overflow-y-auto">
                  {COUNTRIES.map((c) => (
                    <button key={c} onClick={async () => { await save({ country: c }); setModal(null); }}
                      className={`flex items-center gap-3 rounded-2xl border-2 p-3 text-left ${profile.country === c ? "border-primary bg-accent" : "border-border"}`}>
                      <span className="flex-1 font-bold">{c}</span>
                      {profile.country === c && <span className="text-primary">✓</span>}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      )}

      <BottomNav />
    </div>
  );
}

function StatCard({ icon, label, value, color }: { icon: React.ReactNode; label: string; value: number; color: string }) {
  return (
    <div className="rounded-2xl bg-card p-2 text-center shadow-card">
      <div className={`flex justify-center ${color}`}>{icon}</div>
      <div className="mt-1 text-lg font-black">{value}</div>
      <div className="text-[9px] font-bold uppercase text-muted-foreground">{label}</div>
    </div>
  );
}
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="mb-2 px-2 text-xs font-bold uppercase tracking-wide text-muted-foreground">{title}</h3>
      <div className="rounded-2xl bg-card shadow-card divide-y divide-border">{children}</div>
    </div>
  );
}
function Row({ icon, label, children }: { icon: React.ReactNode; label: string; children?: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 px-4 py-3">
      <span className="text-primary">{icon}</span>
      <span className="flex-1 font-semibold text-sm">{label}</span>
      {children}
    </div>
  );
}
function ClickRow({ icon, label, onClick }: { icon: React.ReactNode; label: string; onClick: () => void }) {
  return (
    <button onClick={onClick} className="flex w-full items-center gap-3 px-4 py-3 text-left">
      <span className="text-primary">{icon}</span>
      <span className="flex-1 font-semibold text-sm">{label}</span>
      <ChevronRight className="h-4 w-4 text-muted-foreground" />
    </button>
  );
}
function Switch({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button onClick={() => onChange(!checked)}
      className={`relative h-6 w-11 rounded-full transition ${checked ? "bg-primary" : "bg-muted"}`}>
      <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-card shadow transition ${checked ? "left-5" : "left-0.5"}`} />
    </button>
  );
}
function ModalActions({ onCancel, onSave }: { onCancel: () => void; onSave: () => void }) {
  return (
    <div className="mt-4 grid grid-cols-2 gap-3">
      <button onClick={onCancel} className="rounded-2xl border-2 border-border py-3 font-bold">Cancelar</button>
      <button onClick={onSave} className="btn-3d rounded-2xl bg-primary py-3 font-bold text-primary-foreground">Salvar</button>
    </div>
  );
}
