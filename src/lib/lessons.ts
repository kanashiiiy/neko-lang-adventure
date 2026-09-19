// Lesson content for NEKOTeach — progressive, vocabulary-safe lessons for 3 languages.
import { translate, translateVars, type UiLang } from "@/lib/i18n";

export type Language = "pt" | "ja" | "en";
export type Level = "iniciante" | "basico" | "intermediario" | "avancado";

export const LANGUAGES: { code: Language; name: string; flag: string; nativeName: string }[] = [
  { code: "pt", name: "Português", nativeName: "Português", flag: "🇧🇷" },
  { code: "ja", name: "Japonês", nativeName: "日本語", flag: "🇯🇵" },
  { code: "en", name: "Inglês", nativeName: "English", flag: "🇺🇸" },
];

export type TaskKind = "choose" | "listen" | "complete" | "speak" | "build" | "match";

export interface VisualOption { label: string; emoji: string; }

export interface Question {
  kind: TaskKind;
  prompt: string;
  audio?: string;
  answer: string;
  options?: string[];
  visualOptions?: VisualOption[];
  hint?: string;
  translation?: string;
  romaji?: string;
  japanese?: string;
  kana?: string;
  kanji?: string;
  buildOptions?: string[];
  buildAnswer?: string[];
  matchLeft?: string[];
  matchRight?: string[];
  matchPairs?: Record<string, string>;
  nekoMessage?: string;
  reveal?: {
    translation?: string;
    romaji?: string;
    japanese?: string;
    kana?: string;
    kanji?: string;
  };
}

export interface Phase {
  id: string;
  title: string;
  icon: string;
  xp: number;
  questions: Question[];
}

type LessonItem = [target: string, meaning: string, romaji?: string];
type Curriculum = LessonItem[][];

const JA_WORDS: LessonItem[] = [
  ["こんにちは", "Olá", "konnichiwa"],
  ["おはよう", "Bom dia", "ohayou"],
  ["みず", "Água", "mizu"],
  ["おちゃ", "Chá", "ocha"],
  ["コーヒー", "Café", "koohii"],
  ["ぎゅうにゅう", "Leite", "gyuu nyuu"],
  ["ください", "Por favor", "kudasai"],
  ["ありがとう", "Obrigado", "arigatou"],
  ["さようなら", "Tchau", "sayounara"],
  ["はい", "Sim", "hai"],
  ["いいえ", "Não", "iie"],
  ["ねこ", "Gato", "neko"],
  ["いぬ", "Cachorro", "inu"],
  ["ほん", "Livro", "hon"],
  ["すみません", "Desculpe", "sumimasen"],
  ["こんばんは", "Boa noite", "konbanwa"],
];

const JA_PHRASES: LessonItem[] = [
  ["みず ください", "Água, por favor.", "mizu kudasai"],
  ["おちゃ ください", "Chá, por favor.", "ocha kudasai"],
  ["コーヒー ください", "Café, por favor.", "koohii kudasai"],
  ["ぎゅうにゅう ください", "Leite, por favor.", "gyuu nyuu kudasai"],
  ["こんにちは ありがとう", "Olá, obrigado.", "konnichiwa arigatou"],
  ["おはよう ありがとう", "Bom dia, obrigado.", "ohayou arigatou"],
  ["はい ください", "Sim, por favor.", "hai kudasai"],
  ["いいえ ありがとう", "Não, obrigado.", "iie arigatou"],
  ["さようなら ありがとう", "Tchau, obrigado.", "sayounara arigatou"],
  ["こんにちは おはよう", "Olá, bom dia.", "konnichiwa ohayou"],
  ["ねこ ください", "Gato, por favor.", "neko kudasai"],
  ["ほん ください", "Livro, por favor.", "hon kudasai"],
];

const EN_WORDS: LessonItem[] = [
  ["Hello", "Olá"],
  ["Good morning", "Bom dia"],
  ["Water", "Água"],
  ["Tea", "Chá"],
  ["Coffee", "Café"],
  ["Milk", "Leite"],
  ["Please", "Por favor"],
  ["Thank you", "Obrigado"],
  ["Goodbye", "Tchau"],
  ["Yes", "Sim"],
  ["No", "Não"],
  ["Cat", "Gato"],
  ["Dog", "Cachorro"],
  ["Book", "Livro"],
  ["Sorry", "Desculpe"],
  ["Good night", "Boa noite"],
];

const EN_PHRASES: LessonItem[] = [
  ["Water, please.", "Água, por favor."],
  ["Coffee, please.", "Café, por favor."],
  ["Tea, please.", "Chá, por favor."],
  ["Milk, please.", "Leite, por favor."],
  ["Hello, thank you.", "Olá, obrigado."],
  ["Good morning, thank you.", "Bom dia, obrigado."],
  ["Yes, please.", "Sim, por favor."],
  ["No, thank you.", "Não, obrigado."],
  ["Goodbye, thank you.", "Tchau, obrigado."],
  ["Hello, good morning.", "Olá, bom dia."],
  ["Cat, please.", "Gato, por favor."],
  ["Book, please.", "Livro, por favor."],
  ["Hello, good morning, thank you.", "Olá, bom dia, obrigado."],
  ["Good morning, thank you, please.", "Bom dia, obrigado, por favor."],
];

const PT_WORDS: LessonItem[] = [
  ["Olá", "Hello"],
  ["Bom dia", "Good morning"],
  ["Água", "Water"],
  ["Chá", "Tea"],
  ["Café", "Coffee"],
  ["Leite", "Milk"],
  ["Por favor", "Please"],
  ["Obrigado", "Thank you"],
  ["Tchau", "Goodbye"],
  ["Sim", "Yes"],
  ["Não", "No"],
  ["Gato", "Cat"],
  ["Cachorro", "Dog"],
  ["Livro", "Book"],
  ["Desculpe", "Sorry"],
  ["Boa noite", "Good night"],
];

const PT_PHRASES: LessonItem[] = [
  ["Água, por favor.", "Water, please."],
  ["Café, por favor.", "Coffee, please."],
  ["Chá, por favor.", "Tea, please."],
  ["Leite, por favor.", "Milk, please."],
  ["Olá, obrigado.", "Hello, thank you."],
  ["Bom dia, obrigado.", "Good morning, thank you."],
  ["Sim, por favor.", "Yes, please."],
  ["Não, obrigado.", "No, thank you."],
  ["Tchau, obrigado.", "Goodbye, thank you."],
  ["Olá, bom dia.", "Hello, good morning."],
  ["Gato, por favor.", "Cat, please."],
  ["Livro, por favor.", "Book, please."],
  ["Olá, bom dia, obrigado.", "Hello, good morning, thank you."],
  ["Bom dia, obrigado, por favor.", "Good morning, thank you, please."],
];

const CURRICULUM: Record<Language, Curriculum> = {
  ja: [
    JA_WORDS.slice(0, 4),
    JA_WORDS.slice(4, 8),
    JA_WORDS.slice(8, 12),
    JA_WORDS.slice(12, 16),
    JA_PHRASES.slice(0, 4),
    JA_PHRASES.slice(4, 8),
    JA_PHRASES.slice(8, 10),
    JA_PHRASES.slice(10, 12),
    [],
    [],
  ],
  en: [
    EN_WORDS.slice(0, 4),
    EN_WORDS.slice(4, 8),
    EN_WORDS.slice(8, 12),
    EN_WORDS.slice(12, 16),
    EN_PHRASES.slice(0, 4),
    EN_PHRASES.slice(4, 8),
    EN_PHRASES.slice(8, 10),
    EN_PHRASES.slice(10, 12),
    EN_PHRASES.slice(12, 14),
    [],
  ],
  pt: [
    PT_WORDS.slice(0, 4),
    PT_WORDS.slice(4, 8),
    PT_WORDS.slice(8, 12),
    PT_WORDS.slice(12, 16),
    PT_PHRASES.slice(0, 4),
    PT_PHRASES.slice(4, 8),
    PT_PHRASES.slice(8, 10),
    PT_PHRASES.slice(10, 12),
    PT_PHRASES.slice(12, 14),
    [],
  ],
};

const ICONS: Record<Language, string[]> = {
  ja: ["🌸", "🍵", "🐱", "📖", "🧩", "🎧", "🗣️", "✍️", "🌟", "🏆"],
  en: ["👋", "☕", "🐱", "📖", "🧩", "🎧", "🗣️", "✍️", "🌟", "🏆"],
  pt: ["👋", "☕", "🐱", "📖", "🧩", "🎧", "🗣️", "✍️", "🌟", "🏆"],
};

const PHASE_XP = [18, 20, 22, 24, 26, 28, 30, 32, 35, 38];

function shuffle<T>(items: T[]): T[] {
  return [...items].sort(() => Math.random() - 0.5);
}

function uniqueByTarget(items: LessonItem[]): LessonItem[] {
  return Array.from(new Map(items.map((item) => [item[0], item])).values());
}

function cumulativePool(lang: Language, phaseIdx: number): LessonItem[] {
  const curriculum = CURRICULUM[lang];
  const unlocked = curriculum.slice(0, phaseIdx + 1).flat();
  return uniqueByTarget(unlocked);
}

function targetText(lang: Language, item: LessonItem): string {
  return lang === "ja" ? (item[2] ?? item[0]) : item[0];
}

function meaningText(item: LessonItem, ui: UiLang): string {
  return translate(item[1], ui);
}

function maxOptionsForPhase(phaseIdx: number): number {
  if (phaseIdx <= 1) return 3;
  if (phaseIdx <= 4) return 3;
  return 4;
}

function pickOptions<T>(correct: T, pool: T[], count: number): T[] {
  const unique = Array.from(new Set(pool));
  const others = unique.filter((value) => value !== correct);
  return shuffle([correct, ...shuffle(others).slice(0, Math.max(0, count - 1))]);
}

function tokenizeBuild(text: string): string[] {
  return text
    .replace(/[.,!?;:]/g, "")
    .trim()
    .split(/\s+/)
    .filter(Boolean);
}

function normalizeToken(value: string): string {
  return value.toLowerCase().normalize("NFC").replace(/[.,!?;:]/g, "").trim();
}

function isShortListenItem(lang: Language, item: LessonItem): boolean {
  return tokenizeBuild(targetText(lang, item)).length <= 2;
}

function phaseKinds(phaseIdx: number): TaskKind[] {
  if (phaseIdx === 0) return ["choose", "listen", "choose", "listen"];
  if (phaseIdx === 1) return ["choose", "listen", "choose", "match"];
  if (phaseIdx === 2) return ["choose", "listen", "complete", "match"];
  if (phaseIdx === 3) return ["choose", "listen", "complete", "match", "choose"];
  return ["choose", "listen", "match", "complete", "build", "choose"];
}

function buildOptionsFromLearnedPool(
  target: string,
  pool: LessonItem[],
  lang: Language,
): string[] {
  const answerTokens = tokenizeBuild(target);
  if (answerTokens.length === 0 || answerTokens.length > 5) return [];

  const learnedTokens = pool.flatMap((item) => tokenizeBuild(targetText(lang, item)));
  const distractors = shuffle(
    Array.from(new Set(learnedTokens)).filter(
      (token) => !answerTokens.some((answer) => normalizeToken(answer) === normalizeToken(token)),
    ),
  ).slice(0, Math.max(1, Math.min(3, 5 - answerTokens.length)));

  // No future vocabulary is ever introduced here: every distractor comes from
  // the cumulative pool unlocked by the current phase.
  return shuffle([...answerTokens, ...distractors]);
}

function makeBuildQuestion(
  lang: Language,
  item: LessonItem,
  pool: LessonItem[],
  phaseIdx: number,
  ui: UiLang,
): Question {
  const target = targetText(lang, item);
  const words = tokenizeBuild(target);
  const options = buildOptionsFromLearnedPool(target, pool, lang);
  return {
    kind: "build",
    prompt: translate(
      lang === "ja"
        ? "Ouça e monte a expressão usando as palavras em Romaji"
        : lang === "en"
          ? "Ouça e monte a expressão usando as palavras em inglês"
          : "Ouça e monte a expressão usando as palavras em português",
      ui,
    ),
    audio: item[0],
    answer: words.join(" "),
    options,
    buildOptions: options,
    buildAnswer: words,
    translation: meaningText(item, ui),
  };
}

function makeQuestion(
  lang: Language,
  item: LessonItem,
  kind: TaskKind,
  phaseIdx: number,
  pool: LessonItem[],
  ui: UiLang,
  index: number,
): Question {
  const target = targetText(lang, item);
  const meaning = meaningText(item, ui);
  const optionsCount = maxOptionsForPhase(phaseIdx);
  const targetPool = pool.map((entry) => targetText(lang, entry));
  const meaningPool = pool.map((entry) => meaningText(entry, ui));
  const japanese = lang === "ja" ? item[0] : undefined;
  const romaji = lang === "ja" ? item[2] : undefined;

  if (kind === "listen") {
    return {
      kind: "listen",
      prompt: translate("Ouça o áudio e escolha o significado correto", ui),
      audio: item[0],
      answer: meaning,
      options: pickOptions(meaning, meaningPool, optionsCount),
      japanese,
      romaji,
      reveal: { translation: meaning, romaji, japanese },
      nekoMessage: index === 0 ? translate("Ouça com atenção! 👂", ui) : undefined,
    };
  }

  if (kind === "match") {
    const start = (index + phaseIdx) % Math.max(1, pool.length - Math.min(optionsCount, pool.length) + 1);
    const size = Math.min(optionsCount, pool.length);
    const group = pool.slice(start, start + size);
    const safe = group.length >= 2 ? group : pool.slice(0, Math.min(optionsCount, pool.length));
    const left = safe.map((entry) => targetText(lang, entry));
    const right = shuffle(safe.map((entry) => meaningText(entry, ui)));
    const pairs: Record<string, string> = {};
    safe.forEach((entry) => { pairs[targetText(lang, entry)] = meaningText(entry, ui); });

    return {
      kind: "match",
      prompt: translate("Associe cada palavra ou expressão ao significado correto", ui),
      answer: JSON.stringify(pairs),
      matchLeft: left,
      matchRight: right,
      matchPairs: pairs,
      nekoMessage: index % 2 === 0 ? translate("Combine os pares! 🧩", ui) : undefined,
    };
  }

  if (kind === "complete") {
    const label = lang === "ja" ? translate("romaji", ui) : translate(langName(lang), ui);
    return {
      kind: "complete",
      prompt: translateVars(
        lang === "ja" ? "Escreva em {lang}: o que você ouviu" : "Escreva em {lang}: o que você ouviu",
        { lang: label },
        ui,
      ),
      audio: item[0],
      answer: target,
      translation: meaning,
      romaji,
      japanese,
      hint: phaseIdx <= 2 ? target : undefined,
    };
  }

  if (kind === "build") {
    return makeBuildQuestion(lang, item, pool, phaseIdx, ui);
  }

  if (kind === "speak") {
    return {
      kind: "speak",
      prompt: translateVars("Fale: {w}", { w: target }, ui),
      audio: item[0],
      answer: item[0],
      translation: meaning,
      romaji,
      japanese,
    };
  }

  const useMeaning = index % 2 === 0;
  return {
    kind: "choose",
    prompt: translate(
      useMeaning
        ? "Ouça e escolha o significado correto"
        : lang === "ja"
          ? "Escolha a resposta correta em Romaji"
          : lang === "en"
            ? "Escolha a palavra ou expressão correta em inglês"
            : "Escolha a palavra ou expressão correta em português",
      ui,
    ),
    audio: item[0],
    answer: useMeaning ? meaning : target,
    options: useMeaning
      ? pickOptions(meaning, meaningPool, optionsCount)
      : pickOptions(target, targetPool, optionsCount),
    translation: meaning,
    romaji,
    japanese,
  };
}

function buildPhase(
  lang: Language,
  phaseIdx: number,
  _level: Level,
  _goal: string,
  ui: UiLang,
): Phase {
  const pool = cumulativePool(lang, phaseIdx);

  // The current phase may only draw from content unlocked up to this phase.
  // Nothing from a future phase can leak into questions or distractors.
  const pattern = phaseKinds(phaseIdx);
  const questions: Question[] = Array.from({ length: 20 }, (_, index) => {
    const item = pool[(phaseIdx * 3 + index) % pool.length];
    const kind = pattern[index % pattern.length];

    // Build only after short expressions have been unlocked. Earlier phases
    // stay focused on individual words and very small recognition tasks.
    if (kind === "listen") {
      // Listening tasks stay beginner-friendly: only individual words or
      // short two-word expressions already unlocked in the cumulative pool.
      const shortPool = pool.filter((entry) => isShortListenItem(lang, entry));
      const listenItem = shortPool.length > 0
        ? shortPool[index % shortPool.length]
        : item;
      return makeQuestion(lang, listenItem, "listen", phaseIdx, pool, ui, index);
    }

    if (kind === "build" && phaseIdx < 4) {
      return makeQuestion(lang, item, "choose", phaseIdx, pool, ui, index);
    }

    // Never force a build on a one-token item. When a phase has expressions,
    // select a short expression (maximum five tokens) from already unlocked content.
    if (kind === "build") {
      const buildable = pool.filter((entry) => tokenizeBuild(targetText(lang, entry)).length >= 2 && tokenizeBuild(targetText(lang, entry)).length <= 5);
      const buildItem = buildable.length > 0 ? buildable[(index + phaseIdx) % buildable.length] : item;
      return makeQuestion(lang, buildItem, "build", phaseIdx, pool, ui, index);
    }

    return makeQuestion(lang, item, kind, phaseIdx, pool, ui, index);
  });

  return {
    id: `${lang}-phase-${phaseIdx + 1}`,
    title: translateVars("Fase {n}", { n: phaseIdx + 1 }, ui),
    icon: ICONS[lang][phaseIdx],
    xp: PHASE_XP[phaseIdx] ?? PHASE_XP[PHASE_XP.length - 1],
    questions,
  };
}

function langName(lang: Language): string {
  return lang === "ja" ? "japonês" : lang === "en" ? "inglês" : "português";
}

function normalizeLevel(value: string | null | undefined): Level {
  const v = (value ?? "iniciante").toLowerCase();
  if (v.startsWith("bás") || v === "basico") return "basico";
  if (v.startsWith("int")) return "intermediario";
  if (v.startsWith("av")) return "avancado";
  return "iniciante";
}

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
  const level = normalizeLevel(level);
  return Array.from({ length: 10 }, (_, index) => buildPhase(lang, index, level, goal ?? "outro", ui));
}

// Lazy cache prevents lesson generation from affecting startup/login rendering.
const defaultPhaseCache: Partial<Record<Language, Phase[]>> = {};

function getDefaultPhases(lang: Language): Phase[] {
  return defaultPhaseCache[lang] ??= buildPhases(lang, "iniciante", "outro");
}

export const PHASES: Record<Language, Phase[]> = {
  get ja() { return getDefaultPhases("ja"); },
  get en() { return getDefaultPhases("en"); },
  get pt() { return getDefaultPhases("pt"); },
};

export const LESSONS = PHASES;

export function getLesson(
  lang: Language | string | null | undefined,
  id: string,
  level?: string | null,
  goal?: string | null,
  ui: UiLang = "pt",
): Phase | undefined {
  return buildPhases(lang, level, goal, ui).find((lesson) => lesson.id === id);
}
