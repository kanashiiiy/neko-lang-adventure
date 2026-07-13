// Lesson content for NEKOTeach — 3 languages, 10 phases × 10 tasks
export type Language = "pt" | "ja" | "en";

export const LANGUAGES: { code: Language; name: string; flag: string; nativeName: string }[] = [
  { code: "pt", name: "Português", nativeName: "Português", flag: "🇧🇷" },
  { code: "ja", name: "Japonês", nativeName: "日本語", flag: "🇯🇵" },
  { code: "en", name: "Inglês", nativeName: "English", flag: "🇺🇸" },
];

export type TaskKind = "choose" | "listen" | "complete" | "speak";

export interface Question {
  kind: TaskKind;
  prompt: string;       // shown to user (or listen: TTS target)
  audio?: string;       // string to speak via TTS
  answer: string;       // correct answer
  options?: string[];   // for 'choose' / 'listen'
  hint?: string;
  translation?: string;
}

export interface Phase {
  id: string;
  title: string;
  icon: string;
  xp: number;
  questions: Question[];
}

// ---------- Content generators ----------

const JA_WORDS: [string, string, string][] = [
  ["こんにちは", "Olá", "konnichiwa"],
  ["おはよう", "Bom dia", "ohayou"],
  ["こんばんは", "Boa noite", "konbanwa"],
  ["ありがとう", "Obrigado", "arigatou"],
  ["さようなら", "Tchau", "sayounara"],
  ["すみません", "Desculpe", "sumimasen"],
  ["はい", "Sim", "hai"],
  ["いいえ", "Não", "iie"],
  ["ねこ", "Gato", "neko"],
  ["いぬ", "Cachorro", "inu"],
  ["みず", "Água", "mizu"],
  ["ほん", "Livro", "hon"],
  ["がっこう", "Escola", "gakkou"],
  ["せんせい", "Professor", "sensei"],
  ["ともだち", "Amigo", "tomodachi"],
  ["いち", "Um", "ichi"],
  ["に", "Dois", "ni"],
  ["さん", "Três", "san"],
  ["よん", "Quatro", "yon"],
  ["ご", "Cinco", "go"],
];

const EN_WORDS: [string, string][] = [
  ["Hello", "Olá"], ["Good morning", "Bom dia"], ["Good night", "Boa noite"],
  ["Thank you", "Obrigado"], ["Goodbye", "Tchau"], ["Sorry", "Desculpe"],
  ["Yes", "Sim"], ["No", "Não"], ["Cat", "Gato"], ["Dog", "Cachorro"],
  ["Water", "Água"], ["Book", "Livro"], ["School", "Escola"], ["Teacher", "Professor"],
  ["Friend", "Amigo"], ["One", "Um"], ["Two", "Dois"], ["Three", "Três"],
  ["Four", "Quatro"], ["Five", "Cinco"], ["House", "Casa"], ["Car", "Carro"],
  ["Food", "Comida"], ["Love", "Amor"], ["Work", "Trabalho"],
];

const PT_WORDS: [string, string][] = [
  ["Olá", "Hello"], ["Bom dia", "Good morning"], ["Boa noite", "Good night"],
  ["Obrigado", "Thank you"], ["Tchau", "Goodbye"], ["Desculpe", "Sorry"],
  ["Sim", "Yes"], ["Não", "No"], ["Gato", "Cat"], ["Cachorro", "Dog"],
  ["Água", "Water"], ["Livro", "Book"], ["Escola", "School"], ["Professor", "Teacher"],
  ["Amigo", "Friend"], ["Um", "One"], ["Dois", "Two"], ["Três", "Three"],
  ["Quatro", "Four"], ["Cinco", "Five"], ["Casa", "House"], ["Carro", "Car"],
  ["Comida", "Food"], ["Amor", "Love"], ["Trabalho", "Work"],
];

function shuffle<T>(a: T[]): T[] { return [...a].sort(() => Math.random() - 0.5); }
function pickOptions<T>(correct: T, all: T[], n = 4): T[] {
  const pool = all.filter((x) => x !== correct);
  return shuffle([correct, ...shuffle(pool).slice(0, n - 1)]);
}

function buildJaPhase(phaseIdx: number): Phase {
  const start = (phaseIdx * 2) % JA_WORDS.length;
  const words = Array.from({ length: 10 }, (_, i) => JA_WORDS[(start + i) % JA_WORDS.length]);
  const allTargets = JA_WORDS.map((w) => w[0]);
  const allPt = JA_WORDS.map((w) => w[1]);
  const questions: Question[] = words.map((w, i) => {
    const [jp, pt] = w;
    const mod = (phaseIdx + i) % 4;
    if (mod === 0) return { kind: "choose", prompt: `Traduza: "${pt}"`, answer: jp, options: pickOptions(jp, allTargets), audio: jp, translation: pt };
    if (mod === 1) return { kind: "listen", prompt: "Ouça e escolha", audio: jp, answer: jp, options: pickOptions(jp, allTargets), translation: pt };
    if (mod === 2) return { kind: "choose", prompt: `O que significa "${jp}"?`, answer: pt, options: pickOptions(pt, allPt), audio: jp };
    return { kind: "speak", prompt: `Fale: "${jp}"`, answer: jp, audio: jp, translation: pt };
  });
  return {
    id: `ja-phase-${phaseIdx + 1}`,
    title: `Fase ${phaseIdx + 1}`,
    icon: ["🌸","⛩️","🍣","🗾","🎋","🍜","🎌","🌊","🗻","🎎"][phaseIdx],
    xp: 20 + phaseIdx * 5,
    questions,
  };
}

function buildEnPhase(phaseIdx: number): Phase {
  const start = (phaseIdx * 2) % EN_WORDS.length;
  const words = Array.from({ length: 10 }, (_, i) => EN_WORDS[(start + i) % EN_WORDS.length]);
  const allEn = EN_WORDS.map((w) => w[0]);
  const allPt = EN_WORDS.map((w) => w[1]);
  const questions: Question[] = words.map((w, i) => {
    const [en, pt] = w;
    const mod = (phaseIdx + i) % 4;
    if (mod === 0) return { kind: "choose", prompt: `Traduza: "${pt}"`, answer: en, options: pickOptions(en, allEn), audio: en };
    if (mod === 1) return { kind: "listen", prompt: "Ouça e escolha", audio: en, answer: en, options: pickOptions(en, allEn), translation: pt };
    if (mod === 2) return { kind: "choose", prompt: `O que significa "${en}"?`, answer: pt, options: pickOptions(pt, allPt), audio: en };
    return { kind: "speak", prompt: `Fale: "${en}"`, answer: en, audio: en, translation: pt };
  });
  return {
    id: `en-phase-${phaseIdx + 1}`,
    title: `Fase ${phaseIdx + 1}`,
    icon: ["👋","🏫","🍔","🎬","⚽","🌎","🗽","🎵","🚀","🏆"][phaseIdx],
    xp: 20 + phaseIdx * 5,
    questions,
  };
}

function buildPtPhase(phaseIdx: number): Phase {
  const start = (phaseIdx * 2) % PT_WORDS.length;
  const words = Array.from({ length: 10 }, (_, i) => PT_WORDS[(start + i) % PT_WORDS.length]);
  const allPt = PT_WORDS.map((w) => w[0]);
  const allEn = PT_WORDS.map((w) => w[1]);
  const questions: Question[] = words.map((w, i) => {
    const [pt, en] = w;
    const mod = (phaseIdx + i) % 4;
    if (mod === 0) return { kind: "choose", prompt: `Como se diz em português: "${en}"?`, answer: pt, options: pickOptions(pt, allPt), audio: pt };
    if (mod === 1) return { kind: "listen", prompt: "Ouça e escolha", audio: pt, answer: pt, options: pickOptions(pt, allPt), translation: en };
    if (mod === 2) return { kind: "choose", prompt: `O que significa "${pt}" em inglês?`, answer: en, options: pickOptions(en, allEn), audio: pt };
    return { kind: "speak", prompt: `Fale: "${pt}"`, answer: pt, audio: pt, translation: en };
  });
  return {
    id: `pt-phase-${phaseIdx + 1}`,
    title: `Fase ${phaseIdx + 1}`,
    icon: ["🇧🇷","☀️","🥥","⚽","🎉","🌴","🎶","🏖️","🐆","🦜"][phaseIdx],
    xp: 20 + phaseIdx * 5,
    questions,
  };
}

export const PHASES: Record<Language, Phase[]> = {
  ja: Array.from({ length: 10 }, (_, i) => buildJaPhase(i)),
  en: Array.from({ length: 10 }, (_, i) => buildEnPhase(i)),
  pt: Array.from({ length: 10 }, (_, i) => buildPtPhase(i)),
};

// Legacy alias (kept for any older imports)
export const LESSONS = PHASES;

export function getLesson(lang: Language, id: string): Phase | undefined {
  return PHASES[lang]?.find((l) => l.id === id);
}
