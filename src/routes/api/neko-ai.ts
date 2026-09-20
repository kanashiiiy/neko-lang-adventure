import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/neko-ai")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const body = await request.json();

          const res = await fetch(
            "https://rwaakywcx...supabase.co/functions/v1/neko-ai",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(body),
            },
          );

          const data = await res.text();

          return new Response(data, {
            status: res.status,
            headers: {
              "Content-Type": "application/json",
            },
          });
        } catch (error) {
          console.error("Neko AI proxy error", error);

          return Response.json(
            { reply: "Deu um probleminha. Tente de novo!" },
            { status: 500 },
          );
        }
      },
    },
  },
});
