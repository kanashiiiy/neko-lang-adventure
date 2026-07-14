// English content for the Alfabeto section when learning English.
export const EN_ALPHABET: { char: string; phonetic: string }[] = [
  { char: "A", phonetic: "ei" }, { char: "B", phonetic: "bi" },
  { char: "C", phonetic: "si" }, { char: "D", phonetic: "di" },
  { char: "E", phonetic: "i" }, { char: "F", phonetic: "ef" },
  { char: "G", phonetic: "dji" }, { char: "H", phonetic: "eitch" },
  { char: "I", phonetic: "ai" }, { char: "J", phonetic: "djei" },
  { char: "K", phonetic: "kei" }, { char: "L", phonetic: "el" },
  { char: "M", phonetic: "em" }, { char: "N", phonetic: "en" },
  { char: "O", phonetic: "ou" }, { char: "P", phonetic: "pi" },
  { char: "Q", phonetic: "kiu" }, { char: "R", phonetic: "ar" },
  { char: "S", phonetic: "es" }, { char: "T", phonetic: "ti" },
  { char: "U", phonetic: "iu" }, { char: "V", phonetic: "vi" },
  { char: "W", phonetic: "dâbliu" }, { char: "X", phonetic: "eks" },
  { char: "Y", phonetic: "uai" }, { char: "Z", phonetic: "zi" },
];

export interface ToBeStep {
  pronoun: string;
  form: string;
  full: string;
  translation: string;
  example: string;
  exampleTranslation: string;
}

export const EN_TO_BE: ToBeStep[] = [
  { pronoun: "I", form: "am", full: "I am", translation: "Eu sou / estou",
    example: "I am a student.", exampleTranslation: "Eu sou um estudante." },
  { pronoun: "You", form: "are", full: "You are", translation: "Você é / está",
    example: "You are my friend.", exampleTranslation: "Você é meu amigo." },
  { pronoun: "He", form: "is", full: "He is", translation: "Ele é / está",
    example: "He is happy.", exampleTranslation: "Ele está feliz." },
  { pronoun: "She", form: "is", full: "She is", translation: "Ela é / está",
    example: "She is a teacher.", exampleTranslation: "Ela é professora." },
  { pronoun: "It", form: "is", full: "It is", translation: "Isso / ele / ela é",
    example: "It is a cat.", exampleTranslation: "É um gato." },
  { pronoun: "We", form: "are", full: "We are", translation: "Nós somos / estamos",
    example: "We are ready.", exampleTranslation: "Estamos prontos." },
  { pronoun: "They", form: "are", full: "They are", translation: "Eles/elas são / estão",
    example: "They are friends.", exampleTranslation: "Eles são amigos." },
];

export interface Phrase { text: string; translation: string }

export const EN_PHRASES: Phrase[] = [
  { text: "Hello", translation: "Olá" },
  { text: "Hi", translation: "Oi" },
  { text: "Good morning", translation: "Bom dia" },
  { text: "Good afternoon", translation: "Boa tarde" },
  { text: "Good evening", translation: "Boa noite (chegando)" },
  { text: "Good night", translation: "Boa noite (dormir)" },
  { text: "Thank you", translation: "Obrigado" },
  { text: "Please", translation: "Por favor" },
  { text: "You're welcome", translation: "De nada" },
  { text: "Excuse me", translation: "Com licença" },
  { text: "Sorry", translation: "Desculpe" },
  { text: "How are you?", translation: "Como você está?" },
];

export const EN_SECTION_META = {
  alphabet: { label: "Alfabeto", icon: "🔤", description: "As 26 letras" },
  "to-be": { label: "Verb To Be", icon: "📚", description: "I am, You are, He is..." },
  phrases: { label: "Frases Básicas", icon: "💬", description: "Comunicação do dia a dia" },
} as const;

export type EnSection = keyof typeof EN_SECTION_META;
