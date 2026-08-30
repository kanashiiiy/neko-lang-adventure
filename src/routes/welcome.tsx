import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { NekoMascot } from "@/components/NekoMascot";
import { supabase } from "@/integrations/supabase/client";
import { useT } from "@/lib/i18n";

export const Route = createFileRoute("/welcome")({
  component: WelcomePage,
  ssr: false,
});

function WelcomePage() {
  const navigate = useNavigate();
  const t = useT();

  // Sessão salva? entra direto, sem passar pelo login.
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


  return (
    <div className="mobile-shell px-6 pt-12 pb-8">
      <div className="flex flex-1 flex-col items-center justify-center text-center">
        <NekoMascot size={180} float />
        <h1 className="mt-4 text-4xl font-black tracking-tight">
          NEKO<span className="text-primary">Teach</span>
        </h1>
        <h2 className="mt-4 text-xl font-bold">{t("Bem-vindo ao NEKOTeach!")}</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          {t("Aprenda idiomas de forma divertida com a Neko.")}
        </p>
      </div>

      <div className="mt-8 flex flex-col gap-3">
        <button
          onClick={() => navigate({ to: "/auth", search: { mode: "login" } })}
          className="btn-3d rounded-2xl bg-primary py-4 text-base font-bold text-primary-foreground"
        >
          🔑 {t("Já tenho uma conta")}
        </button>
        <button
          onClick={() => navigate({ to: "/start" })}
          className="btn-3d rounded-2xl border-2 border-primary bg-card py-4 text-base font-bold text-primary"
        >
          ✨ {t("Sou novo")}
        </button>
      </div>
    </div>
  );
}
