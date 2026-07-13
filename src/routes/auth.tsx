import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { NekoMascot } from "@/components/NekoMascot";

export const Route = createFileRoute("/auth")({
  component: AuthPage,
  ssr: false,
});

const signupSchema = z.object({
  email: z.string().trim().email("E-mail inválido").max(255),
  password: z.string().min(6, "Mínimo 6 caracteres").max(72),
  confirm: z.string(),
  accept: z.boolean(),
}).refine((d) => d.password === d.confirm, { message: "As senhas não coincidem", path: ["confirm"] })
  .refine((d) => d.accept, { message: "Aceite os termos para continuar", path: ["accept"] });

const loginSchema = z.object({
  email: z.string().trim().email("E-mail inválido"),
  password: z.string().min(1, "Digite sua senha"),
});

function AuthPage() {
  const [mode, setMode] = useState<"login" | "signup" | "forgot">("signup");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const parsed = loginSchema.safeParse({ email: fd.get("email"), password: fd.get("password") });
    if (!parsed.success) return toast.error(parsed.error.issues[0].message);
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword(parsed.data);
    setLoading(false);
    if (error) return toast.error(error.message);
    toast.success("Bem-vindo de volta!");
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
    const { error } = await supabase.auth.signUp({
      email: parsed.data.email,
      password: parsed.data.password,
      options: { emailRedirectTo: `${window.location.origin}/` },
    });
    setLoading(false);
    if (error) return toast.error(error.message);
    toast.success("Conta criada! Vamos começar 🎉");
    navigate({ to: "/", replace: true });
  }

  async function handleForgot(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const email = String(fd.get("email") ?? "");
    if (!z.string().email().safeParse(email).success) return toast.error("E-mail inválido");
    setLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    setLoading(false);
    if (error) return toast.error(error.message);
    toast.success("Enviamos um link para o seu e-mail.");
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
          {mode === "signup" ? "Crie sua conta grátis" : mode === "forgot" ? "Recupere sua senha" : "Entre para continuar"}
        </p>
      </div>

      {mode !== "forgot" && (
        <div className="mt-6 grid grid-cols-2 gap-1 rounded-2xl bg-muted p-1">
          <button
            onClick={() => setMode("login")}
            className={`rounded-xl py-2 text-sm font-bold transition ${mode === "login" ? "bg-card shadow-card text-foreground" : "text-muted-foreground"}`}
          >Entrar</button>
          <button
            onClick={() => setMode("signup")}
            className={`rounded-xl py-2 text-sm font-bold transition ${mode === "signup" ? "bg-card shadow-card text-foreground" : "text-muted-foreground"}`}
          >Cadastrar</button>
        </div>
      )}

      {mode === "login" && (
        <form onSubmit={handleLogin} className="mt-6 flex flex-col gap-3">
          <Field name="email" type="email" placeholder="seu@email.com" label="E-mail" autoComplete="email" />
          <Field name="password" type="password" placeholder="Sua senha" label="Senha" autoComplete="current-password" />
          <button type="button" onClick={() => setMode("forgot")} className="self-end text-xs font-semibold text-primary">
            Esqueci minha senha
          </button>
          <PrimaryButton loading={loading}>Entrar</PrimaryButton>
        </form>
      )}

      {mode === "signup" && (
        <form onSubmit={handleSignup} className="mt-6 flex flex-col gap-3">
          <Field name="email" type="email" placeholder="seu@email.com" label="E-mail" autoComplete="email" />
          <Field name="password" type="password" placeholder="Mínimo 6 caracteres" label="Senha" autoComplete="new-password" />
          <Field name="confirm" type="password" placeholder="Repita a senha" label="Confirmar senha" autoComplete="new-password" />
          <label className="mt-1 flex items-start gap-2 text-xs text-muted-foreground">
            <input name="accept" type="checkbox" className="mt-0.5 h-4 w-4 accent-primary" />
            <span>Concordo com os <a className="text-primary font-semibold">Termos de Uso</a> e a <a className="text-primary font-semibold">Política de Privacidade</a>.</span>
          </label>
          <PrimaryButton loading={loading}>Criar conta</PrimaryButton>
        </form>
      )}

      {mode === "forgot" && (
        <form onSubmit={handleForgot} className="mt-6 flex flex-col gap-3">
          <p className="text-sm text-muted-foreground">Enviaremos um link de redefinição para o seu e-mail.</p>
          <Field name="email" type="email" placeholder="seu@email.com" label="E-mail" autoComplete="email" />
          <PrimaryButton loading={loading}>Enviar link</PrimaryButton>
          <button type="button" onClick={() => setMode("login")} className="text-sm font-semibold text-primary">
            Voltar ao login
          </button>
        </form>
      )}

      <p className="mt-8 text-center text-xs text-muted-foreground">
        Ao continuar você aceita nossos termos.
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

function PrimaryButton({ children, loading }: { children: React.ReactNode; loading?: boolean }) {
  return (
    <button
      disabled={loading}
      className="btn-3d mt-2 rounded-2xl bg-primary py-3.5 text-primary-foreground disabled:opacity-70"
    >
      {loading ? "Aguarde..." : children}
    </button>
  );
}
