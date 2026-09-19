import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { toast } from "@/lib/neko-toast";
import { ChevronRight, Moon, Sun, Bell, Lock, Info, HelpCircle, Globe } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { fetchCurrentProfile, updateProfile } from "@/lib/profile";
import { LANGUAGES } from "@/lib/lessons";
import { BottomNav } from "@/components/BottomNav";
import { useT } from "@/lib/i18n";

export const Route = createFileRoute("/_authenticated/settings")({
  component: SettingsPage,
});

function SettingsPage() {
  const t = useT();
  const qc = useQueryClient();
  const { data: profile } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      return fetchCurrentProfile();
    },
  });

  const [theme, setTheme] = useState(profile?.theme ?? "light");
  const [notif, setNotif] = useState(profile?.notifications_enabled ?? true);
  const [showPass, setShowPass] = useState(false);
  const [pass, setPass] = useState("");
  const [confirm, setConfirm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (profile) {
      setTheme(profile.theme);
      setNotif(profile.notifications_enabled);
    }
  }, [profile]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  async function save(patch: Record<string, unknown>) {
    const { data } = await supabase.auth.getUser();
    if (!data.user) return;
    await updateProfile(data.user.id, patch as never);
    qc.invalidateQueries({ queryKey: ["profile"] });
  }

  async function changeLanguage(code: string) {
    await save({ language: code });
    toast.success(t("Idioma atualizado!"));
  }

  async function updatePassword() {
    if (pass.length < 6) return toast.error(t("Mínimo 6 caracteres"));
    if (pass !== confirm) return toast.error(t("As senhas não coincidem"));
    const { error } = await supabase.auth.updateUser({ password: pass });
    if (error) return toast.error(error.message);
    toast.success(t("Senha atualizada!"));
    setShowPass(false); setPass(""); setConfirm("");
  }

  return (
    <div className="mobile-shell">
      <header className="border-b-2 border-border bg-card px-6 py-4">
        <h1 className="text-2xl font-black">{t("Configurações")}</h1>
      </header>

      <main className="flex-1 px-4 py-4 space-y-5">
        <Section title={t("Aparência")}>
          <Row icon={theme === "dark" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />} label={t("Tema")}>
            <div className="flex rounded-full bg-muted p-1">
              <ThemeBtn active={theme === "light"} onClick={() => { setTheme("light"); save({ theme: "light" }); }}>{t("Claro")}</ThemeBtn>
              <ThemeBtn active={theme === "dark"} onClick={() => { setTheme("dark"); save({ theme: "dark" }); }}>{t("Escuro")}</ThemeBtn>
            </div>
          </Row>
        </Section>

        <Section title={t("Aprendizado")}>
          <Row icon={<Globe className="h-5 w-5" />} label={t("Idioma")}>
            <select value={profile?.language ?? "ja"} onChange={(e) => changeLanguage(e.target.value)}
              className="rounded-lg bg-muted px-3 py-1.5 text-sm font-bold outline-none">
              {LANGUAGES.map((l) => <option key={l.code} value={l.code}>{l.flag} {l.name}</option>)}
            </select>
          </Row>
        </Section>

        <Section title={t("Notificações")}>
          <Row icon={<Bell className="h-5 w-5" />} label={t("Lembretes diários")}>
            <Switch checked={notif} onChange={(v) => { setNotif(v); save({ notifications_enabled: v }); }} />
          </Row>
        </Section>

        <Section title={t("Conta")}>
          <ClickRow icon={<Lock className="h-5 w-5" />} label={t("Alterar senha")} onClick={() => setShowPass(true)} />
          <ClickRow icon={<HelpCircle className="h-5 w-5" />} label={t("Ajuda")} onClick={() => toast.info(t("Em breve!"))} />
          <ClickRow icon={<Info className="h-5 w-5" />} label={t("Sobre o NEKOTeach")} onClick={() =>
            toast("NEKOTeach v1.0", { description: t("Feito com 💜 para você aprender idiomas") })} />
        </Section>

        {showPass && (
          <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 p-4 sm:items-center" onClick={() => setShowPass(false)}>
            <div className="w-full max-w-md rounded-3xl bg-card p-6 animate-bounce-in" onClick={(e) => e.stopPropagation()}>
              <h2 className="text-xl font-black">{t("Alterar senha")}</h2>
              <div className="mt-4 flex flex-col gap-3">
                <input type="password" placeholder={t("Nova senha")} value={pass} onChange={(e) => setPass(e.target.value)}
                  className="rounded-2xl border-2 border-border bg-card px-4 py-3 outline-none focus:border-primary" />
                <input type="password" placeholder={t("Confirmar senha")} value={confirm} onChange={(e) => setConfirm(e.target.value)}
                  className="rounded-2xl border-2 border-border bg-card px-4 py-3 outline-none focus:border-primary" />
                <div className="grid grid-cols-2 gap-3">
                  <button onClick={() => setShowPass(false)} className="rounded-2xl border-2 border-border py-3 font-bold">{t("Cancelar")}</button>
                  <button onClick={updatePassword} className="btn-3d rounded-2xl bg-primary py-3 font-bold text-primary-foreground">{t("Salvar")}</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <BottomNav />
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
      <span className="flex-1 font-semibold">{label}</span>
      {children}
    </div>
  );
}
function ClickRow({ icon, label, onClick }: { icon: React.ReactNode; label: string; onClick: () => void }) {
  return (
    <button onClick={onClick} className="flex w-full items-center gap-3 px-4 py-3 text-left">
      <span className="text-primary">{icon}</span>
      <span className="flex-1 font-semibold">{label}</span>
      <ChevronRight className="h-4 w-4 text-muted-foreground" />
    </button>
  );
}
function ThemeBtn({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button onClick={onClick} className={`rounded-full px-3 py-1 text-xs font-bold ${active ? "bg-card shadow-card" : "text-muted-foreground"}`}>
      {children}
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
