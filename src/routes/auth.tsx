import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { NekoMascot } from "@/components/NekoMascot";
import { useT } from "@/lib/i18n";

export const Route = createFileRoute("/auth")({
  component: AuthPage,
  ssr: false,
  validateSearch: (search: Record<string, unknown>): { mode?: "login" } =>
    search.mode === "login" ? { mode: "login" } : {},
});

function AuthPage() {
  const { mode: initialMode } = Route.useSearch();
  // Veio por "Já tenho uma conta": mostra SOMENTE o formulário de login.
  const loginOnly = initialMode === "login";
  const [mode, setMode] = useState<"login" | "signup" | "forgot">(initialMode ?? "signup");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const t = useT();

  // Já existe sessão salva? entra direto na conta.
  useEffect(() => {
    let cancelled = false;
    (async () => {
      const { data } = await supabase.auth.getSession();
      if (!cancelled && data.session) navigate({ to: "/", replace: true });
    })();
    return () => {
      cancelled = true;
    };
  }, [navigate]);



  const signupSchema = z.object({
    email: z.string().trim().email(t("E-mail inválido")).max(255),
    password: z.string().min(6, t("Mínimo 6 caracteres")).max(72),
    confirm: z.string(),
    accept: z.boolean(),
  }).refine((d) => d.password === d.confirm, { message: t("As senhas não coincidem"), path: ["confirm"] })
    .refine((d) => d.accept, { message: t("Aceite os termos para continuar"), path: ["accept"] });

  const loginSchema = z.object({
    email: z.string().trim().email(t("E-mail inválido")),
    password: z.string().min(1, t("Digite sua senha")),
  });

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const parsed = loginSchema.safeParse({ email: fd.get("email"), password: fd.get("password") });
    if (!parsed.success) return toast.error(parsed.error.issues[0].message);
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword(parsed.data);
    setLoading(false);
    if (error) return toast.error(error.message);
    toast.success(t("Bem-vindo de volta!"));
    navigate({ to: "/", replace: true });
  }

  async function handleSignup(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const parsed = signupSchema.safeParse({
      email: fd.get("email"),
      password: fd.get("password"),
      confirm: fd.get("confirm"),
      accept: fd.get("accept") === "on",
    });
    if (!parsed.success) return toast.error(parsed.error.issues[0].message);
    setLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email: parsed.data.email,
      password: parsed.data.password,
      options: { emailRedirectTo: `${window.location.origin}/` },
    });
    setLoading(false);
    if (error) {
      if (error.message.toLowerCase().includes("already registered")) {
        toast.error(t("Este e-mail já tem conta. Faça login."));
        setMode("login");
        return;
      }
      return toast.error(error.message);
    }
    if (!data.session) {
      toast.success(t("Enviamos um link para o seu e-mail."));
      setMode("login");
      return;
    }
    toast.success(t("Conta criada! Vamos começar 🎉"));
    navigate({ to: "/", replace: true });
  }

  async function handleForgot(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const email = String(fd.get("email") ?? "");
    if (!z.string().email().safeParse(email).success) return toast.error(t("E-mail inválido"));
    setLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    setLoading(false);
    if (error) return toast.error(error.message);
    toast.success(t("Enviamos um link para o seu e-mail."));
    setMode("login");
  }

  return (
    <div className="mobile-shell px-6 pt-10 pb-8">
      <div className="flex flex-col items-center text-center">
        <NekoMascot size={120} float />
        <h1 className="mt-2 text-3xl font-black">
          NEKO<span className="text-primary">Teach</span>
        </h1>
        <p className="text-sm text-muted-foreground">
          {mode === "signup" ? t("Crie sua conta grátis") : mode === "forgot" ? t("Recupere sua senha") : t("Entre para continuar")}
        </p>
      </div>

      {mode !== "forgot" && (
      {!loginOnly && (
        <div className="mt-6 grid grid-cols-2 gap-1 rounded-2xl bg-muted p-1">
          <button
            onClick={() => setMode("login")}
            className={`rounded-xl py-2 text-sm font-bold transition ${mode === "login" ? "bg-card shadow-card text-foreground" : "text-muted-foreground"}`}
          >{t("Entrar")}</button>
          <button
            onClick={() => setMode("signup")}
            className={`rounded-xl py-2 text-sm font-bold transition ${mode === "signup" ? "bg-card shadow-card text-foreground" : "text-muted-foreground"}`}
          >{t("Cadastrar")}</button>
        </div>
      )}
      )}

      {mode === "login" && (
        <form onSubmit={handleLogin} className="mt-6 flex flex-col gap-3">
          <Field name="email" type="email" placeholder="seu@email.com" label={t("E-mail")} autoComplete="email" />
          <Field name="password" type="password" placeholder={t("Sua senha")} label={t("Senha")} autoComplete="current-password" />
          <button type="button" onClick={() => setMode("forgot")} className="self-end text-xs font-semibold text-primary">
            {t("Esqueci minha senha")}
          </button>
          <PrimaryButton loading={loading} loadingLabel={t("Aguarde...")}>{t("Entrar")}</PrimaryButton>
        </form>
      )}

      {mode === "signup" && (
        <form onSubmit={handleSignup} className="mt-6 flex flex-col gap-3">
          <Field name="email" type="email" placeholder="seu@email.com" label={t("E-mail")} autoComplete="email" />
          <Field name="password" type="password" placeholder={t("Mínimo 6 caracteres")} label={t("Senha")} autoComplete="new-password" />
          <Field name="confirm" type="password" placeholder={t("Repita a senha")} label={t("Confirmar senha")} autoComplete="new-password" />
          <label className="mt-1 flex items-start gap-2 text-xs text-muted-foreground">
            <input name="accept" type="checkbox" className="mt-0.5 h-4 w-4 accent-primary" />
            <span>{t("Concordo com os")} <a className="text-primary font-semibold">{t("Termos de Uso")}</a> {t("e a")} <a className="text-primary font-semibold">{t("Política de Privacidade")}</a>.</span>
          </label>
          <PrimaryButton loading={loading} loadingLabel={t("Aguarde...")}>{t("Criar conta")}</PrimaryButton>
        </form>
      )}

      {mode === "forgot" && (
        <form onSubmit={handleForgot} className="mt-6 flex flex-col gap-3">
          <p className="text-sm text-muted-foreground">{t("Enviaremos um link de redefinição para o seu e-mail.")}</p>
          <Field name="email" type="email" placeholder="seu@email.com" label={t("E-mail")} autoComplete="email" />
          <PrimaryButton loading={loading} loadingLabel={t("Aguarde...")}>{t("Enviar link")}</PrimaryButton>
          <button type="button" onClick={() => setMode("login")} className="text-sm font-semibold text-primary">
            {t("Voltar ao login")}
          </button>
        </form>
      )}

      <p className="mt-8 text-center text-xs text-muted-foreground">
        {t("Ao continuar você aceita nossos termos.")}
      </p>
    </div>
  );
}

function Field({ label, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-xs font-bold uppercase tracking-wide text-muted-foreground">{label}</span>
      <input
        {...props}
        className="rounded-2xl border-2 border-border bg-card px-4 py-3 text-base outline-none transition focus:border-primary"
      />
    </label>
  );
}

function PrimaryButton({ children, loading, loadingLabel }: { children: React.ReactNode; loading?: boolean; loadingLabel: string }) {
  return (
    <button
      disabled={loading}
      className="btn-3d mt-2 rounded-2xl bg-primary py-3.5 text-primary-foreground disabled:opacity-70"
    >
      {loading ? loadingLabel : children}
    </button>
  );
}
