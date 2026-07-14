// Portuguese content for the Alfabeto section when learning Portuguese.
export const PT_ALPHABET: { char: string; phonetic: string }[] = [
  { char: "A", phonetic: "á" }, { char: "B", phonetic: "bê" },
  { char: "C", phonetic: "cê" }, { char: "D", phonetic: "dê" },
  { char: "E", phonetic: "ê" }, { char: "F", phonetic: "efe" },
  { char: "G", phonetic: "gê" }, { char: "H", phonetic: "agá" },
  { char: "I", phonetic: "i" }, { char: "J", phonetic: "jota" },
  { char: "K", phonetic: "cá" }, { char: "L", phonetic: "ele" },
  { char: "M", phonetic: "eme" }, { char: "N", phonetic: "ene" },
  { char: "O", phonetic: "ó" }, { char: "P", phonetic: "pê" },
  { char: "Q", phonetic: "quê" }, { char: "R", phonetic: "erre" },
  { char: "S", phonetic: "esse" }, { char: "T", phonetic: "tê" },
  { char: "U", phonetic: "u" }, { char: "V", phonetic: "vê" },
  { char: "W", phonetic: "dáblio" }, { char: "X", phonetic: "xis" },
  { char: "Y", phonetic: "ípsilon" }, { char: "Z", phonetic: "zê" },
];

export const PT_SYLLABLES: { group: string; syllables: string[] }[] = [
  { group: "B", syllables: ["BA", "BE", "BI", "BO", "BU"] },
  { group: "C", syllables: ["CA", "CE", "CI", "CO", "CU"] },
  { group: "D", syllables: ["DA", "DE", "DI", "DO", "DU"] },
  { group: "F", syllables: ["FA", "FE", "FI", "FO", "FU"] },
  { group: "G", syllables: ["GA", "GE", "GI", "GO", "GU"] },
  { group: "L", syllables: ["LA", "LE", "LI", "LO", "LU"] },
  { group: "M", syllables: ["MA", "ME", "MI", "MO", "MU"] },
  { group: "N", syllables: ["NA", "NE", "NI", "NO", "NU"] },
  { group: "P", syllables: ["PA", "PE", "PI", "PO", "PU"] },
  { group: "R", syllables: ["RA", "RE", "RI", "RO", "RU"] },
  { group: "S", syllables: ["SA", "SE", "SI", "SO", "SU"] },
  { group: "T", syllables: ["TA", "TE", "TI", "TO", "TU"] },
  { group: "V", syllables: ["VA", "VE", "VI", "VO", "VU"] },
];

export const PT_PHRASES: { text: string; translation: string }[] = [
  { text: "Olá", translation: "Hello" },
  { text: "Bom dia", translation: "Good morning" },
  { text: "Boa tarde", translation: "Good afternoon" },
  { text: "Boa noite", translation: "Good night" },
  { text: "Obrigado", translation: "Thank you" },
  { text: "Por favor", translation: "Please" },
  { text: "De nada", translation: "You're welcome" },
  { text: "Com licença", translation: "Excuse me" },
  { text: "Desculpe", translation: "Sorry" },
  { text: "Como você está?", translation: "How are you?" },
  { text: "Tudo bem?", translation: "Everything ok?" },
  { text: "Até logo", translation: "See you later" },
];

export const PT_SECTION_META = {
  alphabet: { label: "Alfabeto", icon: "🔤", description: "As letras do português" },
  syllables: { label: "Sílabas", icon: "🔡", description: "Sílabas básicas" },
  phrases: { label: "Palavras e Frases", icon: "💬", description: "Comunicação do dia a dia" },
} as const;

export type PtSection = keyof typeof PT_SECTION_META;
