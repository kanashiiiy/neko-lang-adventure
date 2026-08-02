// Vocabulary banks per goal, per language.
// Used by lessons.ts to customize examples by user goal.
import type { Language } from "@/lib/lessons";

export type Goal = "viajar" | "trabalhar" | "estudar" | "morar" | "hobby" | "outro";

// [target, translationPt, romajiOrEmpty]
export type GoalWord = [string, string, string];

type GoalBank = Record<Goal, GoalWord[]>;

const JA: GoalBank = {
  viajar: [
    ["空港", "Aeroporto", "kuukou"], ["ホテル", "Hotel", "hoteru"],
    ["レストラン", "Restaurante", "resutoran"], ["電車", "Trem", "densha"],
    ["切符", "Passagem", "kippu"], ["地図", "Mapa", "chizu"],
    ["タクシー", "Táxi", "takushii"], ["買い物", "Compras", "kaimono"],
  ],
  trabalhar: [
    ["会議", "Reunião", "kaigi"], ["面接", "Entrevista", "mensetsu"],
    ["メール", "E-mail", "meeru"], ["会社", "Empresa", "kaisha"],
    ["同僚", "Colega", "douryou"], ["契約", "Contrato", "keiyaku"],
    ["締切", "Prazo", "shimekiri"], ["名刺", "Cartão de visita", "meishi"],
  ],
  estudar: [
    ["学校", "Escola", "gakkou"], ["大学", "Universidade", "daigaku"],
    ["先生", "Professor", "sensei"], ["宿題", "Lição de casa", "shukudai"],
    ["本", "Livro", "hon"], ["試験", "Prova", "shiken"],
    ["文法", "Gramática", "bunpou"], ["作文", "Redação", "sakubun"],
  ],
  morar: [
    ["スーパー", "Mercado", "suupaa"], ["病院", "Hospital", "byouin"],
    ["銀行", "Banco", "ginkou"], ["家賃", "Aluguel", "yachin"],
    ["電気", "Eletricidade", "denki"], ["バス", "Ônibus", "basu"],
    ["郵便", "Correio", "yuubin"], ["鍵", "Chave", "kagi"],
  ],
  hobby: [
    ["アニメ", "Anime", "anime"], ["漫画", "Mangá", "manga"],
    ["映画", "Filme", "eiga"], ["音楽", "Música", "ongaku"],
    ["ゲーム", "Jogo", "geemu"], ["文化", "Cultura", "bunka"],
    ["祭り", "Festival", "matsuri"], ["歌", "Canção", "uta"],
  ],
  outro: [
    ["こんにちは", "Olá", "konnichiwa"], ["ありがとう", "Obrigado", "arigatou"],
    ["家族", "Família", "kazoku"], ["友達", "Amigo", "tomodachi"],
    ["時間", "Tempo", "jikan"], ["日本", "Japão", "nihon"],
    ["食べ物", "Comida", "tabemono"], ["水", "Água", "mizu"],
  ],
};

const EN: GoalBank = {
  viajar: [
    ["Airport", "Aeroporto", ""], ["Hotel", "Hotel", ""],
    ["Restaurant", "Restaurante", ""], ["Train", "Trem", ""],
    ["Ticket", "Passagem", ""], ["Map", "Mapa", ""],
    ["Taxi", "Táxi", ""], ["Shopping", "Compras", ""],
  ],
  trabalhar: [
    ["Meeting", "Reunião", ""], ["Interview", "Entrevista", ""],
    ["Email", "E-mail", ""], ["Company", "Empresa", ""],
    ["Colleague", "Colega", ""], ["Contract", "Contrato", ""],
    ["Deadline", "Prazo", ""], ["Office", "Escritório", ""],
  ],
  estudar: [
    ["School", "Escola", ""], ["University", "Universidade", ""],
    ["Teacher", "Professor", ""], ["Homework", "Lição", ""],
    ["Book", "Livro", ""], ["Exam", "Prova", ""],
    ["Grammar", "Gramática", ""], ["Essay", "Redação", ""],
  ],
  morar: [
    ["Market", "Mercado", ""], ["Hospital", "Hospital", ""],
    ["Bank", "Banco", ""], ["Rent", "Aluguel", ""],
    ["Electricity", "Eletricidade", ""], ["Bus", "Ônibus", ""],
    ["Mail", "Correio", ""], ["Key", "Chave", ""],
  ],
  hobby: [
    ["Anime", "Anime", ""], ["Movie", "Filme", ""],
    ["Music", "Música", ""], ["Game", "Jogo", ""],
    ["Culture", "Cultura", ""], ["Song", "Canção", ""],
    ["Festival", "Festival", ""], ["Book", "Livro", ""],
  ],
  outro: [
    ["Hello", "Olá", ""], ["Thank you", "Obrigado", ""],
    ["Family", "Família", ""], ["Friend", "Amigo", ""],
    ["Time", "Tempo", ""], ["Food", "Comida", ""],
    ["Water", "Água", ""], ["Love", "Amor", ""],
  ],
};

const PT: GoalBank = {
  viajar: [
    ["Aeroporto", "Aeroporto", ""], ["Hotel", "Hotel", ""],
    ["Restaurante", "Restaurante", ""], ["Trem", "Trem", ""],
    ["Passagem", "Passagem", ""], ["Mapa", "Mapa", ""],
    ["Táxi", "Táxi", ""], ["Compras", "Compras", ""],
  ],
  trabalhar: [
    ["Reunião", "Reunião", ""], ["Entrevista", "Entrevista", ""],
    ["E-mail", "E-mail", ""], ["Empresa", "Empresa", ""],
    ["Colega", "Colega", ""], ["Contrato", "Contrato", ""],
    ["Prazo", "Prazo", ""], ["Escritório", "Escritório", ""],
  ],
  estudar: [
    ["Escola", "Escola", ""], ["Universidade", "Universidade", ""],
    ["Professor", "Professor", ""], ["Lição", "Lição", ""],
    ["Livro", "Livro", ""], ["Prova", "Prova", ""],
    ["Gramática", "Gramática", ""], ["Redação", "Redação", ""],
  ],
  morar: [
    ["Mercado", "Mercado", ""], ["Hospital", "Hospital", ""],
    ["Banco", "Banco", ""], ["Aluguel", "Aluguel", ""],
    ["Ônibus", "Ônibus", ""], ["Correio", "Correio", ""],
    ["Chave", "Chave", ""], ["Eletricidade", "Eletricidade", ""],
  ],
  hobby: [
    ["Filme", "Filme", ""], ["Música", "Música", ""],
    ["Jogo", "Jogo", ""], ["Livro", "Livro", ""],
    ["Cultura", "Cultura", ""], ["Festa", "Festa", ""],
    ["Canção", "Canção", ""], ["Arte", "Arte", ""],
  ],
  outro: [
    ["Olá", "Olá", ""], ["Obrigado", "Obrigado", ""],
    ["Família", "Família", ""], ["Amigo", "Amigo", ""],
    ["Tempo", "Tempo", ""], ["Comida", "Comida", ""],
    ["Água", "Água", ""], ["Amor", "Amor", ""],
  ],
};


export const GOAL_WORDS: Record<Language, GoalBank> = { ja: JA, en: EN, pt: PT };

export function goalWordsFor(lang: Language, goal: string | null | undefined): GoalWord[] {
  const g = (goal ?? "outro") as Goal;
  return GOAL_WORDS[lang][g] ?? GOAL_WORDS[lang].outro;
}
