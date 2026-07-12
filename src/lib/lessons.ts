// Lesson content for NEKOTeach
export type Language = "ja" | "en" | "ko" | "fr" | "es";

export const LANGUAGES: { code: Language; name: string; flag: string }[] = [
  { code: "ja", name: "Japonês", flag: "🇯🇵" },
  { code: "en", name: "Inglês", flag: "🇬🇧" },
  { code: "ko", name: "Coreano", flag: "🇰🇷" },
  { code: "fr", name: "Francês", flag: "🇫🇷" },
  { code: "es", name: "Espanhol", flag: "🇪🇸" },
];

export interface Question {
  prompt: string;
  answer: string;
  options: string[];
  hint?: string;
}

export interface Lesson {
  id: string;
  title: string;
  icon: string;
  category: "alfabeto" | "vocabulario" | "frases" | "quiz";
  xp: number;
  questions: Question[];
}

const shuffle = <T,>(a: T[]) => a;

const jaHiragana: Question[] = [
  { prompt: "あ", answer: "a", options: ["a", "i", "u", "e"] },
  { prompt: "い", answer: "i", options: ["a", "i", "o", "u"] },
  { prompt: "う", answer: "u", options: ["e", "u", "a", "o"] },
  { prompt: "え", answer: "e", options: ["e", "i", "o", "a"] },
  { prompt: "お", answer: "o", options: ["u", "o", "a", "e"] },
  { prompt: "か", answer: "ka", options: ["ka", "ki", "ku", "ke"] },
  { prompt: "さ", answer: "sa", options: ["sa", "shi", "su", "so"] },
];

const jaGreetings: Question[] = [
  { prompt: 'Como se diz "Olá" em japonês?', answer: "こんにちは", options: ["こんにちは", "さようなら", "ありがとう", "おはよう"] },
  { prompt: 'Como se diz "Obrigado"?', answer: "ありがとう", options: ["おはよう", "ありがとう", "すみません", "こんばんは"] },
  { prompt: '"Bom dia" é...', answer: "おはよう", options: ["こんばんは", "こんにちは", "おはよう", "さようなら"] },
  { prompt: '"Tchau" é...', answer: "さようなら", options: ["おやすみ", "さようなら", "こんにちは", "ありがとう"] },
];

const enBasics: Question[] = [
  { prompt: 'Traduza: "Olá"', answer: "Hello", options: ["Hello", "Goodbye", "Please", "Sorry"] },
  { prompt: 'Traduza: "Obrigado"', answer: "Thank you", options: ["You're welcome", "Thank you", "Please", "Sorry"] },
  { prompt: 'Traduza: "Bom dia"', answer: "Good morning", options: ["Good night", "Good morning", "Good evening", "Goodbye"] },
  { prompt: 'Traduza: "Sim"', answer: "Yes", options: ["No", "Maybe", "Yes", "Please"] },
];

const koBasics: Question[] = [
  { prompt: '"Olá" em coreano', answer: "안녕하세요", options: ["안녕하세요", "감사합니다", "미안해요", "안녕히"] },
  { prompt: '"Obrigado" em coreano', answer: "감사합니다", options: ["안녕", "감사합니다", "죄송합니다", "네"] },
];

const frBasics: Question[] = [
  { prompt: 'Traduza: "Olá"', answer: "Bonjour", options: ["Bonjour", "Merci", "Au revoir", "S'il vous plaît"] },
  { prompt: 'Traduza: "Obrigado"', answer: "Merci", options: ["Merci", "Bonjour", "Pardon", "Oui"] },
];

const esBasics: Question[] = [
  { prompt: 'Traduza: "Olá"', answer: "Hola", options: ["Hola", "Gracias", "Adiós", "Por favor"] },
  { prompt: 'Traduza: "Obrigado"', answer: "Gracias", options: ["Hola", "Gracias", "Perdón", "Sí"] },
];

export const LESSONS: Record<Language, Lesson[]> = {
  ja: [
    { id: "ja-hiragana-1", title: "Hiragana: Vogais", icon: "あ", category: "alfabeto", xp: 15, questions: shuffle(jaHiragana.slice(0, 5)) },
    { id: "ja-hiragana-2", title: "Hiragana: K & S", icon: "か", category: "alfabeto", xp: 15, questions: shuffle(jaHiragana.slice(5)) },
    { id: "ja-greetings", title: "Saudações", icon: "👋", category: "vocabulario", xp: 20, questions: jaGreetings },
    { id: "ja-quiz-1", title: "Revisão", icon: "🎯", category: "quiz", xp: 30, questions: [...jaHiragana.slice(0, 3), ...jaGreetings.slice(0, 2)] },
  ],
  en: [
    { id: "en-basics-1", title: "Básico 1", icon: "👋", category: "vocabulario", xp: 15, questions: enBasics.slice(0, 2) },
    { id: "en-basics-2", title: "Básico 2", icon: "💬", category: "frases", xp: 15, questions: enBasics.slice(2) },
    { id: "en-quiz-1", title: "Revisão", icon: "🎯", category: "quiz", xp: 30, questions: enBasics },
  ],
  ko: [
    { id: "ko-basics-1", title: "Saudações", icon: "👋", category: "vocabulario", xp: 15, questions: koBasics },
  ],
  fr: [
    { id: "fr-basics-1", title: "Bonjour!", icon: "👋", category: "vocabulario", xp: 15, questions: frBasics },
  ],
  es: [
    { id: "es-basics-1", title: "¡Hola!", icon: "👋", category: "vocabulario", xp: 15, questions: esBasics },
  ],
};

export function getLesson(lang: Language, id: string): Lesson | undefined {
  return LESSONS[lang]?.find((l) => l.id === id);
}
