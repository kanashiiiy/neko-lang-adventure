import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowLeft, LogIn, Sparkles } from "lucide-react";
import { z } from "zod";
import { toast } from "@/lib/neko-toast";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { EntranceBrand, EntranceFrame } from "@/components/EntranceVisual";
import { useT } from "@/lib/i18n";

export const Route = createFileRoute("/auth")({
  component: AuthPage,
  ssr: false,
  validateSearch: (search: Record<string, unknown>): { mode?: "login" } =>
    search.mode === "login" ? { mode: "login" } : {},
  head: () => ({
    meta: [
      { title: "Entrar ou criar conta | NEKOTeach" },
      { name: "description", content: "Entre no NEKOTeach ou crie sua conta para aprender idiomas com o Neko." },
      { property: "og:title", content: "Entrar ou criar conta | NEKOTeach" },
      { property: "og:description", content: "Entre no NEKOTeach ou crie sua conta para aprender idiomas com o Neko." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
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

  // Mensagens amigáveis: nunca mostrar "Failed to fetch" ao usuário.
  function friendlyError(message: string) {
    const m = (message || "").toLowerCase();
    if (m.includes("failed to fetch") || m.includes("network") || m.includes("fetch")) {
      return t("O servidor do NEKOTeach está temporariamente indisponível. Tente novamente em instantes.");
    }
    if (m.includes("invalid login credentials")) return t("E-mail ou senha incorretos.");
    return message;
  }

  async function withNetworkGuard<T>(fn: () => Promise<T>): Promise<T | null> {
    try {
      return await fn();
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err ?? "Erro desconhecido");
      console.error("[NEKOTeach Auth] Falha na requisição de autenticação:", err);
      toast.error(friendlyError(message));
      return null;
    }
  }

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
    const res = await withNetworkGuard(() => supabase.auth.signInWithPassword(parsed.data));
    setLoading(false);
    if (!res) return;
    if (res.error) return toast.error(friendlyError(res.error.message));
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
    const res = await withNetworkGuard(() =>
      supabase.auth.signUp({
        email: parsed.data.email,
        password: parsed.data.password,
        options: { emailRedirectTo: `${window.location.origin}/` },
      }),
    );
    setLoading(false);
    if (!res) return;
    const { data, error } = res;
    if (error) {
      if (error.message.toLowerCase().includes("already registered")) {
        toast.error(t("Este e-mail já tem conta. Faça login."));
        setMode("login");
        return;
      }
      return toast.error(friendlyError(error.message));
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
    const res = await withNetworkGuard(() =>
      supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      }),
    );
    setLoading(false);
    if (!res) return;
    if (res.error) return toast.error(friendlyError(res.error.message));
    toast.success(t("Enviamos um link para o seu e-mail."));
    setMode("login");
  }

  return (
    <EntranceFrame className="w-full max-w-none">
      <div className="mx-auto w-full max-w-md px-5 pb-8 pt-4">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          aria-label={t("Voltar")}
          onClick={() => mode === "forgot" ? setMode("login") : navigate({ to: "/welcome" })}
          className="relative z-20 rounded-full text-primary hover:bg-accent"
        >
          <ArrowLeft className="size-5" />
        </Button>

        <div className="entrance-hero -mt-4">
          <EntranceBrand compact greeting={mode === "signup" ? t("Olá!") : undefined} />
        </div>
        <div className="mt-1 text-center">
          <h2 className="text-xl font-black text-foreground">
            {mode === "signup" ? t("Crie sua conta grátis") : mode === "forgot" ? t("Recupere sua senha") : t("Bem-vindo de volta!")}
          </h2>
          <p className="mt-1 text-sm font-semibold text-muted-foreground">
            {mode === "signup" ? t("Aprenda idiomas de forma divertida com a Neko.") : mode === "forgot" ? t("Enviaremos um link de redefinição para o seu e-mail.") : t("Entre para continuar")}
        </p>
      </div>

      {!loginOnly && mode !== "forgot" && (
        <div className="mt-5 grid grid-cols-2 gap-1 rounded-2xl border border-primary/10 bg-muted p-1">
          <Button
            type="button"
            variant="ghost"
            onClick={() => setMode("login")}
            className={`h-10 rounded-xl text-sm font-black transition ${mode === "login" ? "bg-card shadow-card text-primary hover:bg-card" : "text-muted-foreground"}`}
          >{t("Entrar")}</Button>
          <Button
            type="button"
            variant="ghost"
            onClick={() => setMode("signup")}
            className={`h-10 rounded-xl text-sm font-black transition ${mode === "signup" ? "bg-card shadow-card text-primary hover:bg-card" : "text-muted-foreground"}`}
          >{t("Cadastrar")}</Button>
        </div>
      )}

      {mode === "login" && (
        <form onSubmit={handleLogin} className="mt-6 flex flex-col gap-3">
          <Field name="email" type="email" placeholder="seu@email.com" label={t("E-mail")} autoComplete="email" />
          <Field name="password" type="password" placeholder={t("Sua senha")} label={t("Senha")} autoComplete="current-password" />
          <Button type="button" variant="link" onClick={() => setMode("forgot")} className="h-auto self-end p-0 text-xs font-bold text-primary">
            {t("Esqueci minha senha")}
          </Button>
          <PrimaryButton loading={loading} loadingLabel={t("Aguarde...")} icon="login">{t("Entrar")}</PrimaryButton>
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
          <PrimaryButton loading={loading} loadingLabel={t("Aguarde...")} icon="signup">{t("Criar conta")}</PrimaryButton>
        </form>
      )}

      {mode === "forgot" && (
        <form onSubmit={handleForgot} className="mt-6 flex flex-col gap-3">
          <Field name="email" type="email" placeholder="seu@email.com" label={t("E-mail")} autoComplete="email" />
          <PrimaryButton loading={loading} loadingLabel={t("Aguarde...")}>{t("Enviar link")}</PrimaryButton>
          <Button type="button" variant="link" onClick={() => setMode("login")} className="text-sm font-bold text-primary">
            {t("Voltar ao login")}
          </Button>
        </form>
      )}

      <p className="mt-7 text-center text-xs text-muted-foreground">
        {t("Ao continuar você aceita nossos termos.")}
      </p>
      </div>
    </EntranceFrame>
  );
}

function Field({ label, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-xs font-bold uppercase tracking-wide text-muted-foreground">{label}</span>
      <input
        {...props}
        className="rounded-2xl border-2 border-primary/15 bg-card px-4 py-3 text-base shadow-card outline-none transition placeholder:text-muted-foreground/65 focus:border-primary focus:ring-2 focus:ring-primary/10"
      />
    </label>
  );
}

function PrimaryButton({ children, loading, loadingLabel, icon }: { children: React.ReactNode; loading?: boolean; loadingLabel: string; icon?: "login" | "signup" }) {
  return (
    <Button
      disabled={loading}
      className="entrance-primary-button mt-2 h-13 rounded-2xl bg-gradient-primary font-black uppercase text-primary-foreground hover:opacity-95 disabled:opacity-70"
    >
      {!loading && icon === "login" && <LogIn className="size-5 text-gold" />}
      {!loading && icon === "signup" && <Sparkles className="size-5 text-gold" />}
      {loading ? loadingLabel : children}
    </Button>
  );
}
