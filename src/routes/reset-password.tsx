import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { NekoMascot } from "@/components/NekoMascot";

export const Route = createFileRoute("/reset-password")({
  component: ResetPassword,
  ssr: false,
});

function ResetPassword() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const pass = String(fd.get("password") ?? "");
    const confirm = String(fd.get("confirm") ?? "");
    const parsed = z.string().min(6, "Mínimo 6 caracteres").safeParse(pass);
    if (!parsed.success) return toast.error(parsed.error.issues[0].message);
    if (pass !== confirm) return toast.error("As senhas não coincidem");
    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password: pass });
    setLoading(false);
    if (error) return toast.error(error.message);
    toast.success("Senha atualizada!");
    navigate({ to: "/", replace: true });
  }

  return (
    <div className="mobile-shell px-6 pt-10">
      <div className="flex flex-col items-center text-center">
        <NekoMascot size={130} float />
        <h1 className="mt-2 text-2xl font-black">Nova senha</h1>
        <p className="text-sm text-muted-foreground">Escolha uma senha forte que você lembre.</p>
      </div>
      <form onSubmit={onSubmit} className="mt-6 flex flex-col gap-3">
        <label className="flex flex-col gap-1.5">
          <span className="text-xs font-bold uppercase tracking-wide text-muted-foreground">Nova senha</span>
          <input name="password" type="password" className="rounded-2xl border-2 border-border bg-card px-4 py-3 outline-none focus:border-primary" />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className="text-xs font-bold uppercase tracking-wide text-muted-foreground">Confirmar</span>
          <input name="confirm" type="password" className="rounded-2xl border-2 border-border bg-card px-4 py-3 outline-none focus:border-primary" />
        </label>
        <button disabled={loading} className="btn-3d mt-2 rounded-2xl bg-primary py-3.5 font-bold text-primary-foreground">
          {loading ? "Salvando..." : "Atualizar senha"}
        </button>
      </form>
    </div>
  );
}
