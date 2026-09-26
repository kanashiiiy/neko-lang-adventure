import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { fetchProfile } from "@/lib/profile";
import entryArtwork from "@/assets/nekoteach-entry-final.png.asset.json";


export const Route = createFileRoute("/")({
  component: SplashScreen,
  ssr: false,
  head: () => ({
    meta: [
      { title: "NEKOTeach — Aprenda idiomas com o Neko" },
      { name: "description", content: "Aprenda idiomas de forma divertida com o Neko." },
      { property: "og:title", content: "NEKOTeach — Aprenda idiomas com o Neko" },
      { property: "og:description", content: "Aprenda idiomas de forma divertida com o Neko." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

function SplashScreen() {
  const navigate = useNavigate();
  const [ready, setReady] = useState(false);


  useEffect(() => {
    let cancelled = false;
    const timer = setTimeout(() => setReady(true), 1400);

    (async () => {
      // A recuperação da sessão nunca pode bloquear a entrada no app para sempre.
      // Isso é especialmente importante no preview do Lovable, onde o storage de
      // autenticação pode depender de uma resposta assíncrona do editor.
      let session = null;
      try {
        const result = await Promise.race([
          supabase.auth.getSession(),
          new Promise<never>((_, reject) =>
            window.setTimeout(() => reject(new Error("SESSION_RECOVERY_TIMEOUT")), 6000),
          ),
        ]);
        session = result.data.session;
      } catch (error) {
        console.error("[NEKOTeach] Falha ao recuperar a sessão inicial:", error);
      }

      await new Promise((r) => setTimeout(r, 1400));
      if (cancelled) return;

      if (!session) {
        navigate({ to: "/welcome", replace: true });
        return;
      }

      try {
        const profile = await fetchProfile(session.user.id);
        if (!profile?.onboarding_complete || !profile?.name) {
          navigate({ to: "/onboarding", replace: true });
        } else {
          navigate({ to: "/home", replace: true });
        }
      } catch (error) {
        console.error("[NEKOTeach] Falha ao carregar o perfil inicial:", error);
        navigate({ to: "/onboarding", replace: true });
      }
    })();

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [navigate]);

  return (
    <main className="relative h-dvh w-full overflow-hidden bg-background">
      <div className="welcome-artboard absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <img
          src={entryArtwork.url}
          alt="NEKOTeach — aprenda idiomas de forma divertida com a Neko"
          className="absolute inset-0 size-full object-fill"
        />
        <div className="absolute bottom-[5.5%] left-1/2 h-2 w-40 -translate-x-1/2 overflow-hidden rounded-full bg-primary/20 shadow-soft">
          <div
            className="h-full rounded-full bg-gold transition-all duration-1000 ease-out"
            style={{ width: ready ? "100%" : "35%" }}
          />
        </div>
      </div>
    </main>
  );
}
