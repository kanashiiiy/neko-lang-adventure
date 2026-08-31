import { useEffect } from "react";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { touchStreak, fetchProfile } from "@/lib/profile";
import { syncUiLangFromAccount } from "@/lib/i18n";

export const Route = createFileRoute("/_authenticated")({
  ssr: false,
  beforeLoad: async () => {
    const { data, error } = await supabase.auth.getUser();
    if (error || !data.user) throw redirect({ to: "/auth" });
    return { user: data.user };
  },
  component: AuthenticatedLayout,
});

function AuthenticatedLayout() {
  const qc = useQueryClient();

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const { data } = await supabase.auth.getUser();
        if (!data.user || !active) return;
        try {
          const profile = await fetchProfile(data.user.id);
          if (active) syncUiLangFromAccount(profile?.country);
        } catch {
          /* idioma da conta é opcional */
        }
        const updated = await touchStreak(data.user.id);
        if (updated && active) qc.invalidateQueries({ queryKey: ["profile"] });
      } catch {
        /* sequência não é crítica para a navegação */
      }
    })();
    return () => {
      active = false;
    };
  }, [qc]);


  return <Outlet />;
}
