// Lesson content for NEKOTeach — 3 languages, 10 phases × 10 tasks, customized by level+goal.
import { goalWordsFor } from "@/lib/goals";

export type Language = "pt" | "ja" | "en";
export type Level = "iniciante" | "basico" | "intermediario" | "avancado";

export const LANGUAGES: { code: Language; name: string; flag: string; nativeName: string }[] = [
  { code: "pt", name: "Português", nativeName: "Português", flag: "🇧🇷" },
  { code: "ja", name: "Japonês", nativeName: "日本語", flag: "🇯🇵" },
  { code: "en", name: "Inglês", nativeName: "English", flag: "🇺🇸" },
];

export type TaskKind = "choose" | "listen" | "complete" | "speak";

export interface Question {
  kind: TaskKind;
  prompt: string;
  audio?: string;
  answer: string;
  options?: string[];
  hint?: string;
  translation?: string;
  romaji?: string;
}

export interface Phase {
  id: string;
  title: string;
  icon: string;
  xp: number;
  questions: Question[];
}

// Base words (target, translationPt, romajiOrEmpty)
const JA_CORE: [string, string, string][] = [
  ["こんにちは", "Olá", "konnichiwa"], ["おはよう", "Bom dia", "ohayou"],
  ["こんばんは", "Boa noite", "konbanwa"], ["ありがとう", "Obrigado", "arigatou"],
  ["さようなら", "Tchau", "sayounara"], ["すみません", "Desculpe", "sumimasen"],
  ["はい", "Sim", "hai"], ["いいえ", "Não", "iie"],
  ["ねこ", "Gato", "neko"], ["いぬ", "Cachorro", "inu"],
  ["みず", "Água", "mizu"], ["ほん", "Livro", "hon"],
];

const EN_CORE: [string, string, string][] = [
  ["Hello", "Olá", ""], ["Good morning", "Bom dia", ""],
  ["Thank you", "Obrigado", ""], ["Goodbye", "Tchau", ""],
  ["Yes", "Sim", ""], ["No", "Não", ""],
  ["Cat", "Gato", ""], ["Dog", "Cachorro", ""],
  ["Water", "Água", ""], ["Book", "Livro", ""],
];

const PT_CORE: [string, string, string][] = [
  ["Olá", "Hello", ""], ["Bom dia", "Good morning", ""],
  ["Obrigado", "Thank you", ""], ["Tchau", "Goodbye", ""],
  ["Sim", "Yes", ""], ["Não", "No", ""],
  ["Gato", "Cat", ""], ["Cachorro", "Dog", ""],
  ["Água", "Water", ""], ["Livro", "Book", ""],
];

const CORE: Record<Language, [string, string, string][]> = { ja: JA_CORE, en: EN_CORE, pt: PT_CORE };

const ICONS: Record<Language, string[]> = {
  ja: ["🌸","⛩️","🍣","🗾","🎋","🍜","🎌","🌊","🗻","🎎"],
  en: ["👋","🏫","🍔","🎬","⚽","🌎","🗽","🎵","🚀","🏆"],
  pt: ["🇧🇷","☀️","🥥","⚽","🎉","🌴","🎶","🏖️","🐆","🦜"],
};

function shuffle<T>(a: T[]): T[] { return [...a].sort(() => Math.random() - 0.5); }
function pickOptions<T>(correct: T, all: T[], n = 4): T[] {
  const pool = all.filter((x) => x !== correct);
  return shuffle([correct, ...shuffle(pool).slice(0, n - 1)]);
}

function kindsForLevel(level: Level): TaskKind[] {
  switch (level) {
    case "iniciante": return ["choose", "listen", "choose", "choose"];
    case "basico": return ["choose", "listen", "complete", "choose"];
    case "intermediario": return ["choose", "listen", "complete", "speak"];
    case "avancado": return ["complete", "speak", "listen", "speak"];
  }
}

function buildPhase(lang: Language, phaseIdx: number, level: Level, goal: string): Phase {
  const goalWords = goalWordsFor(lang, goal);
  const core = CORE[lang];
  // Blend: 60% goal words + 40% core basics
  const mixed = [...goalWords, ...core];
  const start = (phaseIdx * 2) % mixed.length;
  const words = Array.from({ length: 10 }, (_, i) => mixed[(start + i) % mixed.length]);
  const allTargets = mixed.map((w) => w[0]);
  const allPt = mixed.map((w) => w[1]);
  const kinds = kindsForLevel(level);

  const questions: Question[] = words.map((w, i) => {
    const [target, ptTr, romaji] = w;
    const kind = kinds[(phaseIdx + i) % kinds.length];
    const base: Partial<Question> = { audio: target, translation: ptTr, romaji: romaji || undefined };

    if (kind === "choose") {
      // Alternate direction: to-target vs to-pt
      if (i % 2 === 0) {
        return { ...base, kind: "choose", prompt: `Traduza: "${ptTr}"`, answer: target,
          options: pickOptions(target, allTargets) } as Question;
      }
      return { ...base, kind: "choose", prompt: `O que significa "${target}"?`, answer: ptTr,
        options: pickOptions(ptTr, allPt) } as Question;
    }
    if (kind === "listen") {
      return { ...base, kind: "listen", prompt: "Ouça e escolha", answer: target,
        options: pickOptions(target, allTargets) } as Question;
    }
    if (kind === "complete") {
      return { ...base, kind: "complete", prompt: `Escreva em ${langName(lang)}: "${ptTr}"`, answer: target,
        hint: level === "iniciante" ? target : undefined } as Question;
    }
    return { ...base, kind: "speak", prompt: `Fale: "${target}"`, answer: target } as Question;
  });

  return {
    id: `${lang}-phase-${phaseIdx + 1}`,
    title: `Fase ${phaseIdx + 1}`,
    icon: ICONS[lang][phaseIdx],
    xp: 20 + phaseIdx * 5,
    questions,
  };
}

function langName(l: Language) {
  return l === "ja" ? "japonês" : l === "en" ? "inglês" : "português";
}

function normalizeLevel(l: string | null | undefined): Level {
  const v = (l ?? "iniciante").toLowerCase();
  if (v.startsWith("bás") || v === "basico") return "basico";
  if (v.startsWith("int")) return "intermediario";
  if (v.startsWith("av")) return "avancado";
  return "iniciante";
}

export function buildPhases(lang: Language, level: string | null | undefined, goal: string | null | undefined): Phase[] {
  const lv = normalizeLevel(level);
  return Array.from({ length: 10 }, (_, i) => buildPhase(lang, i, lv, goal ?? "outro"));
}

// Default banks (used when no profile info yet — objetivo "outro", nível iniciante).
export const PHASES: Record<Language, Phase[]> = {
  ja: buildPhases("ja", "iniciante", "outro"),
  en: buildPhases("en", "iniciante", "outro"),
  pt: buildPhases("pt", "iniciante", "outro"),
};

export const LESSONS = PHASES;

export function getLesson(lang: Language, id: string, level?: string | null, goal?: string | null): Phase | undefined {
  const phases = level || goal ? buildPhases(lang, level, goal) : PHASES[lang];
  return phases?.find((l) => l.id === id);
}
