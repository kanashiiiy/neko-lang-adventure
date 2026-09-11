import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import { Toaster } from "sonner";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { supabase } from "@/integrations/supabase/client";
import { UiLangTransition } from "@/components/UiLangTransition";

function NotFoundComponent() {
  return (
    <div className="mobile-shell items-center justify-center px-6 text-center">
      <div className="text-7xl">🐾</div>
      <h1 className="mt-4 text-2xl font-extrabold">Página não encontrada</h1>
      <p className="mt-2 text-sm text-muted-foreground">Neko procurou mas não achou esta página.</p>
      <Link to="/" className="btn-3d mt-6 rounded-2xl bg-primary px-6 py-3 text-primary-foreground">
        Voltar ao início
      </Link>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);
  return (
    <div className="mobile-shell items-center justify-center px-6 text-center">
      <h1 className="text-xl font-bold">Algo deu errado</h1>
      <p className="mt-2 text-sm text-muted-foreground">Tente novamente em instantes.</p>
      <button
        onClick={() => { router.invalidate(); reset(); }}
        className="btn-3d mt-6 rounded-2xl bg-primary px-6 py-3 font-bold text-primary-foreground"
      >
        Tentar novamente
      </button>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover, user-scalable=no" },
      { name: "theme-color", content: "#6C3EFF" },
      { name: "mobile-web-app-capable", content: "yes" },
      { name: "apple-mobile-web-app-capable", content: "yes" },
      { name: "apple-mobile-web-app-status-bar-style", content: "black-translucent" },
      { name: "apple-mobile-web-app-title", content: "NEKOTeach" },
      { title: "NEKOTeach — Aprenda idiomas com o Neko" },
      { name: "description", content: "Aprenda japonês, inglês, coreano, francês e espanhol com lições curtas, XP, gemas e o mascote Neko. Divertido, gamificado e feito para o seu ritmo." },
      { name: "author", content: "NEKOTeach" },
      { property: "og:title", content: "NEKOTeach — Aprenda idiomas com o Neko" },
      { property: "og:description", content: "Aprenda japonês, inglês, coreano, francês e espanhol com lições curtas, XP, gemas e o mascote Neko. Divertido, gamificado e feito para o seu ritmo." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "NEKOTeach — Aprenda idiomas com o Neko" },
      { name: "twitter:description", content: "Aprenda japonês, inglês, coreano, francês e espanhol com lições curtas, XP, gemas e o mascote Neko. Divertido, gamificado e feito para o seu ritmo." },
      { property: "og:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/2mWMxtxtjTTZd3iwjiOy96IvMTL2/social-images/social-1784319667419-3135.webp" },
      { name: "twitter:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/2mWMxtxtjTTZd3iwjiOy96IvMTL2/social-images/social-1784319667419-3135.webp" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.png", type: "image/png" },
      { rel: "apple-touch-icon", href: "/icon-192.png" },
      { rel: "manifest", href: "/manifest.webmanifest" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&display=swap" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head><HeadContent /></head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const router = useRouter();

  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((event) => {
      if (event !== "SIGNED_IN" && event !== "SIGNED_OUT" && event !== "USER_UPDATED") return;
      router.invalidate();
      if (event !== "SIGNED_OUT") queryClient.invalidateQueries();
    });
    return () => sub.subscription.unsubscribe();
  }, [router, queryClient]);

  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
      <UiLangTransition />
      <Toaster position="top-center" offset={12} gap={8} />
    </QueryClientProvider>
  );
}
