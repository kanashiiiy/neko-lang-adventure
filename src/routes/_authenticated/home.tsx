import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Flame, Gem, ChevronDown, ChevronRight, Lock, Briefcase, Hand, UtensilsCrossed, Users } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { fetchProfile, fetchCompletedLessons } from "@/lib/profile";
import { LESSONS, LANGUAGES, type Language } from "@/lib/lessons";
import { BottomNav } from "@/components/BottomNav";

export const Route = createFileRoute("/_authenticated/home")({
  component: HomePage,
});

interface Category {
  key: string;
  title: string;
  progress?: string;
  icon: React.ReactNode;
  tint: string;
  lessonId?: string;
}

function HomePage() {
  const { data: profile } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const { data } = await supabase.auth.getUser();
      if (!data.user) return null;
      return fetchProfile(data.user.id);
    },
  });

  const lang = (profile?.language ?? "ja") as Language;
  const lessons = LESSONS[lang] ?? [];
  const langMeta = LANGUAGES.find((l) => l.code === lang);

  const { data: completed } = useQuery({
    queryKey: ["completed", lang],
    enabled: !!profile,
    queryFn: async () => {
      const { data } = await supabase.auth.getUser();
      if (!data.user) return new Set<string>();
      return fetchCompletedLessons(data.user.id, lang);
    },
  });

  const dailyLesson = lessons[0];
  const doneCount = lessons.filter((l) => completed?.has(l.id)).length;

  const categories: Category[] = [
    {
      key: "alfabeto",
      title: lang === "ja" ? "Hiragana" : "Básico",
      progress: `${doneCount * 7}/46`,
      icon: <Briefcase className="h-5 w-5" />,
      tint: "bg-primary/15 text-primary",
      lessonId: lessons[0]?.id,
    },
    {
      key: "sauda",
      title: "Saudações",
      icon: <Hand className="h-5 w-5" />,
      tint: "bg-gold/25 text-gold-foreground",
      lessonId: lessons[2]?.id,
    },
    {
      key: "comidas",
      title: "Comidas",
      icon: <UtensilsCrossed className="h-5 w-5" />,
      tint: "bg-orange-500/15 text-orange-500",
    },
    {
      key: "familia",
      title: "Família",
      icon: <Users className="h-5 w-5" />,
      tint: "bg-pink-500/15 text-pink-500",
    },
  ];

  return (
    <div className="mobile-shell bg-background">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b-2 border-border bg-card/95 px-4 py-3 backdrop-blur">
        <div className="flex items-center justify-between gap-3">
          <button className="flex min-w-0 items-center gap-2 rounded-full px-1 py-1 font-bold">
            <span className="text-xl">{langMeta?.flag}</span>
            <span className="truncate text-sm">{langMeta?.name}</span>
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          </button>
          <div className="flex shrink-0 items-center gap-3">
            <div className="flex items-center gap-1 text-sm font-black">
              <Flame className="h-5 w-5 text-orange-500" fill="currentColor" />
              <span>{profile?.streak ?? 0}</span>
            </div>
            <div className="flex items-center gap-1 text-sm font-black">
              <Gem className="h-5 w-5 text-primary" fill="currentColor" />
              <span>{profile?.gems ?? 0}</span>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 px-4 py-4">
        {/* Section title */}
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-2xl font-black">Hoje</h2>
          <span className="rounded-full bg-accent px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-accent-foreground">
            Meta diária
          </span>
        </div>

        {/* Lição do dia */}
        {dailyLesson && (
          <Link
            to="/lesson/$id"
            params={{ id: dailyLesson.id }}
            className="mb-5 block rounded-2xl border-2 border-border bg-card p-4 shadow-card transition active:scale-[0.99]"
          >
            <div className="flex items-start gap-3">
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-primary/15 text-primary">
                <Briefcase className="h-6 w-6" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-[11px] font-bold uppercase tracking-wide text-muted-foreground">
                  Lição do dia
                </div>
                <div className="truncate text-base font-black">{dailyLesson.title}</div>
                <div className="mt-2 flex items-center gap-2">
                  <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-gradient-primary transition-all"
                      style={{ width: completed?.has(dailyLesson.id) ? "100%" : "10%" }}
                    />
                  </div>
                  <span className="shrink-0 text-[11px] font-bold text-muted-foreground">
                    {completed?.has(dailyLesson.id) ? "5/5" : "0/5"}
                  </span>
                </div>
              </div>
            </div>
          </Link>
        )}

        {/* Categorias */}
        <div className="flex flex-col gap-3">
          {categories.map((c, i) => {
            const locked = !c.lessonId || (i > 0 && doneCount < i);
            const content = (
              <div
                className={`flex items-center gap-3 rounded-2xl border-2 border-border bg-card p-3 shadow-card transition ${
                  locked ? "opacity-60" : "active:scale-[0.99]"
                }`}
              >
                <div className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl ${c.tint}`}>
                  {c.icon}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-black">{c.title}</div>
                  {c.progress && !locked && (
                    <div className="text-xs font-bold text-muted-foreground">{c.progress}</div>
                  )}
                </div>
                {locked ? (
                  <Lock className="h-5 w-5 shrink-0 text-muted-foreground" />
                ) : (
                  <ChevronRight className="h-5 w-5 shrink-0 text-muted-foreground" />
                )}
              </div>
            );
            return locked || !c.lessonId ? (
              <div key={c.key}>{content}</div>
            ) : (
              <Link key={c.key} to="/lesson/$id" params={{ id: c.lessonId }}>
                {content}
              </Link>
            );
          })}
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
