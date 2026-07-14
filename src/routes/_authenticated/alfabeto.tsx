import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { BottomNav } from "@/components/BottomNav";
import { ALPHABET_META, type AlphabetSystem } from "@/lib/alphabet";
import { EN_SECTION_META, type EnSection } from "@/lib/en-content";
import { PT_SECTION_META, type PtSection } from "@/lib/pt-content";
import { supabase } from "@/integrations/supabase/client";
import { fetchProfile } from "@/lib/profile";
import type { Language } from "@/lib/lessons";

export const Route = createFileRoute("/_authenticated/alfabeto")({
  component: AlfabetoPage,
});

const JA_SYSTEMS: AlphabetSystem[] = ["hiragana", "katakana", "kanji"];
const EN_SECTIONS: EnSection[] = ["alphabet", "to-be", "phrases"];
const PT_SECTIONS: PtSection[] = ["alphabet", "syllables", "phrases"];

function AlfabetoPage() {
  const { data: profile } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const { data } = await supabase.auth.getUser();
      if (!data.user) return null;
      return fetchProfile(data.user.id);
    },
  });
  const lang = (profile?.language ?? "ja") as Language;

  const title = lang === "ja" ? "Aprenda os sistemas de escrita japonesa"
    : lang === "en" ? "Aprenda a base do inglês"
    : "Aprenda a base do português";

  return (
    <div className="mobile-shell">
      <header className="border-b-2 border-border bg-card px-6 py-4">
        <h1 className="text-2xl font-black">Alfabeto</h1>
        <p className="text-xs text-muted-foreground">{title}</p>
      </header>

      <main className="flex-1 px-4 py-5 space-y-4">
        {lang === "ja" && JA_SYSTEMS.map((s) => {
          const meta = ALPHABET_META[s];
          return (
            <Link key={s} to="/alfabeto/$system" params={{ system: s }}
              className="btn-3d flex items-center gap-4 rounded-3xl bg-gradient-primary p-5 text-primary-foreground shadow-soft">
              <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-white/20 text-5xl font-black backdrop-blur">
                {meta.icon}
              </div>
              <div className="flex-1 text-left">
                <div className="text-xl font-black">{meta.label}</div>
                <div className="text-xs opacity-90">{meta.description}</div>
              </div>
            </Link>
          );
        })}

        {lang === "en" && EN_SECTIONS.map((s) => {
          const meta = EN_SECTION_META[s];
          return (
            <Link key={s} to="/alfabeto-en/$section" params={{ section: s }}
              className="btn-3d flex items-center gap-4 rounded-3xl bg-gradient-primary p-5 text-primary-foreground shadow-soft">
              <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-white/20 text-4xl font-black backdrop-blur">
                {meta.icon}
              </div>
              <div className="flex-1 text-left">
                <div className="text-xl font-black">{meta.label}</div>
                <div className="text-xs opacity-90">{meta.description}</div>
              </div>
            </Link>
          );
        })}

        {lang === "pt" && PT_SECTIONS.map((s) => {
          const meta = PT_SECTION_META[s];
          return (
            <Link key={s} to="/alfabeto-pt/$section" params={{ section: s }}
              className="btn-3d flex items-center gap-4 rounded-3xl bg-gradient-primary p-5 text-primary-foreground shadow-soft">
              <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-white/20 text-4xl font-black backdrop-blur">
                {meta.icon}
              </div>
              <div className="flex-1 text-left">
                <div className="text-xl font-black">{meta.label}</div>
                <div className="text-xs opacity-90">{meta.description}</div>
              </div>
            </Link>
          );
        })}
      </main>

      <BottomNav />
    </div>
  );
}
