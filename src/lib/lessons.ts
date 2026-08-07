// Lesson content for NEKOTeach — 3 languages, 10 phases × 10 tasks, customized by level+goal.
import { goalWordsFor } from "@/lib/goals";
import { translate, translateVars, type UiLang } from "@/lib/i18n";


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
  japanese?: string;
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
  ["Olá", "Olá", ""], ["Bom dia", "Bom dia", ""],
  ["Obrigado", "Obrigado", ""], ["Tchau", "Tchau", ""],
  ["Sim", "Sim", ""], ["Não", "Não", ""],
  ["Gato", "Gato", ""], ["Cachorro", "Cachorro", ""],
  ["Água", "Água", ""], ["Livro", "Livro", ""],
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

function buildPhase(lang: Language, phaseIdx: number, level: Level, goal: string, ui: UiLang): Phase {
  const goalWords = goalWordsFor(lang, goal);
  const core = CORE[lang];
  // Blend: 60% goal words + 40% core basics
  const mixed = [...goalWords, ...core];
  const start = (phaseIdx * 2) % mixed.length;
  const words = Array.from({ length: 10 }, (_, i) => mixed[(start + i) % mixed.length]);
  const isJa = lang === "ja";
  // For Japanese, answers/options must always be in romaji (never kana/kanji).
  const allAnswers = mixed.map((w) => (isJa ? (w[2] || w[0]) : w[0]));
  const kinds = kindsForLevel(level);
  const uiLangName = translate(langName(lang), ui);

  const questions: Question[] = words.map((w, i) => {
    const [target, ptTr, romaji] = w;
    const meaning = translate(ptTr, ui);
    const answerText = isJa ? (romaji || target) : target;
    const kind = kinds[(phaseIdx + i) % kinds.length];
    const base: Partial<Question> = {
      audio: target,
      translation: meaning,
      romaji: romaji || undefined,
      japanese: isJa ? target : undefined,
    };

    if (kind === "choose") {
      // Always meaning → target-language (romaji for JA) to keep alternatives readable for beginners.
      return { ...base, kind: "choose",
        prompt: translateVars('Como se diz "{w}" em {lang}?', { w: meaning, lang: uiLangName }, ui),
        answer: answerText,
        options: pickOptions(answerText, allAnswers) } as Question;
    }
    if (kind === "listen") {
      return { ...base, kind: "listen", prompt: translate("Ouça e escolha", ui), answer: answerText,
        options: pickOptions(answerText, allAnswers) } as Question;
    }
    if (kind === "complete") {
      const label = isJa ? translate("romaji", ui) : uiLangName;
      return { ...base, kind: "complete",
        prompt: translateVars('Escreva em {lang}: "{w}"', { lang: label, w: meaning }, ui),
        answer: answerText,
        hint: level === "iniciante" ? answerText : undefined } as Question;
    }
    // speak: match against native pronunciation (kana for JA), but display romaji as reference.
    return { ...base, kind: "speak", prompt: translateVars('Fale: "{w}"', { w: target }, ui), answer: target } as Question;
  });

  return {
    id: `${lang}-phase-${phaseIdx + 1}`,
    title: translateVars("Fase {n}", { n: phaseIdx + 1 }, ui),
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

// Perfis antigos podem ter idiomas que não existem mais (ko, fr, es).
// Sem essa normalização os bancos indexados por idioma retornam undefined.
export function normalizeLanguage(lang: string | null | undefined): Language {
  return lang === "ja" || lang === "en" || lang === "pt" ? lang : "en";
}

export function buildPhases(
  langInput: Language | string | null | undefined,
  level: string | null | undefined,
  goal: string | null | undefined,
  ui: UiLang = "pt",
): Phase[] {
  const lang = normalizeLanguage(langInput);
  const lv = normalizeLevel(level);
  return Array.from({ length: 10 }, (_, i) => buildPhase(lang, i, lv, goal ?? "outro", ui));
}

// Default banks (used when no profile info yet — objetivo "outro", nível iniciante).
export const PHASES: Record<Language, Phase[]> = {
  ja: buildPhases("ja", "iniciante", "outro"),
  en: buildPhases("en", "iniciante", "outro"),
  pt: buildPhases("pt", "iniciante", "outro"),
};

export const LESSONS = PHASES;

export function getLesson(
  lang: Language,
  id: string,
  level?: string | null,
  goal?: string | null,
  ui: UiLang = "pt",
): Phase | undefined {
  const phases = buildPhases(lang, level, goal, ui);
  return phases?.find((l) => l.id === id);
}

