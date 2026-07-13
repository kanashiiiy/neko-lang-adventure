import { createFileRoute, Link } from "@tanstack/react-router";
import { BottomNav } from "@/components/BottomNav";
import { ALPHABET_META, type AlphabetSystem } from "@/lib/alphabet";

export const Route = createFileRoute("/_authenticated/alfabeto")({
  component: AlfabetoPage,
});

const SYSTEMS: AlphabetSystem[] = ["hiragana", "katakana", "kanji"];

function AlfabetoPage() {
  return (
    <div className="mobile-shell">
      <header className="border-b-2 border-border bg-card px-6 py-4">
        <h1 className="text-2xl font-black">Alfabeto</h1>
        <p className="text-xs text-muted-foreground">Aprenda os sistemas de escrita japonesa</p>
      </header>

      <main className="flex-1 px-4 py-5 space-y-4">
        {SYSTEMS.map((s) => {
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
      </main>

      <BottomNav />
    </div>
  );
}
