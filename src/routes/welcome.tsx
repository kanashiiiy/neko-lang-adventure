import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import entryArtwork from "@/assets/nekoteach-entry-final.png.asset.json";
import { supabase } from "@/integrations/supabase/client";

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
    <main className="grid min-h-dvh place-items-center overflow-hidden bg-background">
      <div className="relative aspect-[2/3] h-auto max-h-dvh w-full max-w-[calc(100dvh*2/3)]">
        <img
          src={entryArtwork.url}
          alt="NEKOTeach — aprenda idiomas de forma divertida com a Neko"
          className="absolute inset-0 size-full object-contain"
        />
        <Button
          type="button"
          aria-label="Já tenho uma conta"
          onClick={() => navigate({ to: "/auth", search: { mode: "login" } })}
          className="absolute left-[8%] top-[68.2%] h-[7.8%] w-[84%] border-0 bg-transparent p-0 text-transparent shadow-none hover:bg-transparent focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          <span className="sr-only">Já tenho uma conta</span>
        </Button>
        <Button
          type="button"
          aria-label="Sou novo"
          onClick={() => navigate({ to: "/start" })}
          className="absolute left-[8%] top-[77%] h-[7.8%] w-[84%] border-0 bg-transparent p-0 text-transparent shadow-none hover:bg-transparent focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          <span className="sr-only">Sou novo</span>
        </Button>
      </div>
    </main>
  );
}
