import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { NekoMascot } from "@/components/NekoMascot";
import { supabase } from "@/integrations/supabase/client";
import { fetchProfile } from "@/lib/profile";
import { useT } from "@/lib/i18n";


export const Route = createFileRoute("/")({
  component: SplashScreen,
  ssr: false,
});

function SplashScreen() {
  const navigate = useNavigate();
  const t = useT();
  const [ready, setReady] = useState(false);


  useEffect(() => {
    let cancelled = false;
    const timer = setTimeout(() => setReady(true), 1400);
    (async () => {
      const { data } = await supabase.auth.getSession();
      await new Promise((r) => setTimeout(r, 1400));
      if (cancelled) return;
      if (!data.session) {
        navigate({ to: "/welcome", replace: true });
        return;
      }
      try {
        const profile = await fetchProfile(data.session.user.id);
        if (!profile?.onboarding_complete || !profile?.name) {
          navigate({ to: "/onboarding", replace: true });
        } else {
          navigate({ to: "/home", replace: true });
        }
      } catch {
        navigate({ to: "/onboarding", replace: true });
      }
    })();
    return () => { cancelled = true; clearTimeout(timer); };
  }, [navigate]);

  return (
    <div className="mobile-shell items-center justify-center bg-gradient-primary text-primary-foreground">
      <div className="flex flex-col items-center gap-6 animate-bounce-in">
        <NekoMascot size={200} float />
        <div className="text-center">
          <h1 className="text-4xl font-black tracking-tight">
            NEKO<span className="text-gold">Teach</span>
          </h1>
          <p className="mt-2 text-sm opacity-90">{t("Aprenda idiomas com o Neko")}</p>
        </div>
        <div className="mt-6 h-2 w-40 overflow-hidden rounded-full bg-white/25">
          <div
            className="h-full rounded-full bg-gold transition-all duration-1000 ease-out"
            style={{ width: ready ? "100%" : "35%" }}
          />
        </div>
      </div>
    </div>
  );
}
