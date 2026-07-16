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

export interface TenseItem {
  tense: string;
  label: string;
  translation: string;
  structure: string;
  example: string;
  exampleTranslation: string;
}

export const EN_TENSES: TenseItem[] = [
  { tense: "Present", label: "Presente", translation: "Ações habituais ou fatos",
    structure: "Subject + verb (s/es for he/she/it)",
    example: "I study English every day.", exampleTranslation: "Eu estudo inglês todos os dias." },
  { tense: "Present", label: "Presente Contínuo", translation: "Ações acontecendo agora",
    structure: "Subject + am/is/are + verb-ing",
    example: "She is reading a book.", exampleTranslation: "Ela está lendo um livro." },
  { tense: "Past", label: "Passado Simples", translation: "Ações concluídas no passado",
    structure: "Subject + verb (past) — regular: +ed",
    example: "They played soccer yesterday.", exampleTranslation: "Eles jogaram futebol ontem." },
  { tense: "Past", label: "Passado Contínuo", translation: "Ação em progresso no passado",
    structure: "Subject + was/were + verb-ing",
    example: "I was watching TV.", exampleTranslation: "Eu estava assistindo TV." },
  { tense: "Future", label: "Futuro com Will", translation: "Decisões e previsões",
    structure: "Subject + will + verb",
    example: "We will travel tomorrow.", exampleTranslation: "Nós viajaremos amanhã." },
  { tense: "Future", label: "Futuro com Going to", translation: "Planos e intenções",
    structure: "Subject + am/is/are + going to + verb",
    example: "He is going to study.", exampleTranslation: "Ele vai estudar." },
];

export const EN_SECTION_META = {
  alphabet: { label: "Alfabeto Inglês", icon: "🔤", description: "Letras A–Z, pronúncia e escrita" },
  "to-be": { label: "Verbo To Be", icon: "📘", description: "Affirmative, Negative, Interrogative" },
  tenses: { label: "Tempos Verbais", icon: "📅", description: "Present, Past, Future" },
  phrases: { label: "Frases Básicas", icon: "💬", description: "Comunicação do dia a dia" },
} as const;

export type EnSection = keyof typeof EN_SECTION_META;

