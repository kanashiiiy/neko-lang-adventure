import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { KeyRound, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EntranceBrand, EntranceFrame } from "@/components/EntranceVisual";
import { supabase } from "@/integrations/supabase/client";
import { useT } from "@/lib/i18n";

export const Route = createFileRoute("/welcome")({
  component: WelcomePage,
  ssr: false,
  head: () => ({
    meta: [
      { title: "Boas-vindas | NEKOTeach" },
      { name: "description", content: "Comece sua jornada de idiomas com o Neko no NEKOTeach." },
      { property: "og:title", content: "Boas-vindas | NEKOTeach" },
      { property: "og:description", content: "Comece sua jornada de idiomas com o Neko no NEKOTeach." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
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
    <EntranceFrame>
      <section className="entrance-hero flex flex-1 flex-col items-center justify-center px-6 pb-3 pt-8 text-center">
        <EntranceBrand greeting={t("Olá!")} />
        <h2 className="mt-4 text-[1.35rem] font-black text-foreground">{t("Bem-vindo ao NEKOTeach!")}</h2>
        <p className="mt-1.5 max-w-xs text-sm font-semibold leading-relaxed text-muted-foreground">
          {t("Aprenda idiomas de forma divertida com a Neko.")}
        </p>
      </section>

      <div className="px-6 pb-8 pt-4">
        <div className="flex flex-col gap-4">
        <Button
          onClick={() => navigate({ to: "/auth", search: { mode: "login" } })}
          className="entrance-primary-button h-14 rounded-3xl bg-gradient-primary text-base font-black uppercase text-primary-foreground hover:opacity-95"
        >
          <KeyRound className="size-5 text-gold" /> {t("Já tenho uma conta")}
        </Button>
        <Button
          variant="outline"
          onClick={() => navigate({ to: "/start" })}
          className="h-14 rounded-3xl border-2 border-primary bg-card text-base font-black uppercase text-primary hover:bg-accent"
        >
          <Sparkles className="size-5 text-gold" /> {t("Sou novo")}
        </Button>
        </div>
        <div className="mt-7 flex items-center justify-center gap-3 text-primary/35" aria-hidden="true">
          <span className="h-px w-12 bg-primary/20" />
          <span className="text-xl">🐾</span>
          <span className="h-px w-12 bg-primary/20" />
        </div>
      </div>
    </EntranceFrame>
  );
}
