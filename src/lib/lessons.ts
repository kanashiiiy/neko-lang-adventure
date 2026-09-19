// Lesson content for NEKOTeach — 3 languages, 10 phases × 20 tasks, customized by level+goal.
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
  /** Informações liberadas somente depois que uma missão de áudio for respondida. */
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

const JA_CORE: [string, string, string][] = [
  ["こんにちは", "Olá", "konnichiwa"], ["おはよう", "Bom dia", "ohayou"],
  ["みず", "Água", "mizu"], ["こんばんは", "Boa noite", "konbanwa"],
  ["ありがとう", "Obrigado", "arigatou"], ["さようなら", "Tchau", "sayounara"],
  ["すみません", "Desculpe", "sumimasen"], ["はい", "Sim", "hai"],
  ["いいえ", "Não", "iie"], ["ねこ", "Gato", "neko"],
  ["いぬ", "Cachorro", "inu"], ["ほん", "Livro", "hon"],
];
const EN_CORE: [string, string, string][] = [
  ["Hello", "Olá", ""], ["Good morning", "Bom dia", ""],
  ["Thank you", "Obrigado", ""], ["Goodbye", "Tchau", ""],
  ["Yes", "Sim", ""], ["No", "Não", ""],
  ["Cat", "Gato", ""], ["Dog", "Cachorro", ""],
  ["Water", "Água", ""], ["Book", "Livro", ""],
];
const EN_EXTRA: [string, string, string][] = [
  ["Please", "Por favor", ""], ["Sorry", "Desculpe", ""],
];
const PT_CORE: [string, string, string][] = [
  ["Olá", "Olá", ""], ["Bom dia", "Bom dia", ""],
  ["Obrigado", "Obrigado", ""], ["Tchau", "Tchau", ""],
  ["Sim", "Sim", ""], ["Não", "Não", ""],
  ["Gato", "Gato", ""], ["Cachorro", "Cachorro", ""],
  ["Água", "Água", ""], ["Livro", "Livro", ""],
];
const PT_EXTRA: [string, string, string][] = [
  ["Por favor", "Por favor", ""], ["Desculpe", "Desculpe", ""],
];
const CORE: Record<Language, [string, string, string][]> = { ja: JA_CORE, en: EN_CORE, pt: PT_CORE };
const EXTRA_CORE: Record<Language, [string, string, string][]> = {
  ja: [["おいしい", "Delicioso", "oishii"], ["きれい", "Bonito", "kirei"]],
  en: EN_EXTRA,
  pt: PT_EXTRA,
};

const JA_KANJI: Record<string, string> = {
  "みず": "水", "ほん": "本", "ねこ": "猫", "いぬ": "犬",
  "本": "本", "水": "水",
  "空港": "空港", "ホテル": "ホテル", "レストラン": "レストラン", "電車": "電車",
  "切符": "切符", "地図": "地図", "タクシー": "タクシー", "買い物": "買い物",
  "会議": "会議", "面接": "面接", "メール": "メール", "会社": "会社",
  "同僚": "同僚", "契約": "契約", "締切": "締切", "名刺": "名刺",
  "学校": "学校", "大学": "大学", "先生": "先生", "宿題": "宿題", "試験": "試験",
  "文法": "文法", "作文": "作文", "スーパー": "スーパー", "病院": "病院",
  "銀行": "銀行", "家賃": "家賃", "電気": "電気", "バス": "バス", "郵便": "郵便", "鍵": "鍵",
  "アニメ": "アニメ", "漫画": "漫画", "映画": "映画", "音楽": "音楽", "ゲーム": "ゲーム",
  "文化": "文化", "祭り": "祭り", "歌": "歌", "家族": "家族", "友達": "友達",
  "時間": "時間", "日本": "日本", "食べ物": "食べ物",
};

const JA_KANA: Record<string, string> = {
  "空港": "くうこう", "ホテル": "ホテル", "レストラン": "レストラン", "電車": "でんしゃ",
  "切符": "きっぷ", "地図": "ちず", "タクシー": "タクシー", "買い物": "かいもの",
  "会議": "かいぎ", "面接": "めんせつ", "メール": "メール", "会社": "かいしゃ",
  "同僚": "どうりょう", "契約": "けいやく", "締切": "しめきり", "名刺": "めいし",
  "学校": "がっこう", "大学": "だいがく", "先生": "せんせい", "宿題": "しゅくだい",
  "本": "ほん", "試験": "しけん", "文法": "ぶんぽう", "作文": "さくぶん",
  "スーパー": "スーパー", "病院": "びょういん", "銀行": "ぎんこう", "家賃": "やちん",
  "電気": "でんき", "バス": "バス", "郵便": "ゆうびん", "鍵": "かぎ",
  "アニメ": "アニメ", "漫画": "まんが", "映画": "えいが", "音楽": "おんがく",
  "ゲーム": "ゲーム", "文化": "ぶんか", "祭り": "まつり", "歌": "うた",
  "家族": "かぞく", "友達": "ともだち", "時間": "じかん", "日本": "にほん",
  "食べ物": "たべもの", "水": "みず",
};
const VISUALS: Record<string, VisualOption[]> = {
  "Água": [{label:"Água",emoji:"🥛"},{label:"Leite",emoji:"🍼"},{label:"Café",emoji:"☕"},{label:"Chá",emoji:"🍵"}],
  "Gato": [{label:"Gato",emoji:"🐱"},{label:"Cachorro",emoji:"🐶"},{label:"Peixe",emoji:"🐟"},{label:"Pássaro",emoji:"🐦"}],
  "Cachorro": [{label:"Cachorro",emoji:"🐶"},{label:"Gato",emoji:"🐱"},{label:"Coelho",emoji:"🐰"},{label:"Raposa",emoji:"🦊"}],
  "Livro": [{label:"Livro",emoji:"📖"},{label:"Caneta",emoji:"🖊️"},{label:"Celular",emoji:"📱"},{label:"Caderno",emoji:"📓"}],
  "Café": [{label:"Café",emoji:"☕"},{label:"Chá",emoji:"🍵"},{label:"Água",emoji:"🥛"},{label:"Suco",emoji:"🧃"}],
  "Chá": [{label:"Chá",emoji:"🍵"},{label:"Café",emoji:"☕"},{label:"Leite",emoji:"🍼"},{label:"Água",emoji:"🥛"}],
  "Carro": [{label:"Carro",emoji:"🚗"},{label:"Bicicleta",emoji:"🚲"},{label:"Trem",emoji:"🚆"},{label:"Avião",emoji:"✈️"}],
  "Comida": [{label:"Comida",emoji:"🍱"},{label:"Bebida",emoji:"🥤"},{label:"Livro",emoji:"📖"},{label:"Casa",emoji:"🏠"}],
};
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
function japaneseForms(target: string, romaji: string, level: Level) {
  const displayKana = JA_KANA[target] ?? target;
  const kanji = JA_KANJI[target] ?? (JA_KANA[target] ? target : undefined);
  if (level === "iniciante") return { displayRomaji: romaji, displayKana, displayKanji: undefined };
  if (level === "basico") return { displayRomaji: romaji, displayKana, displayKanji: undefined };
  if (level === "intermediario") return { displayRomaji: romaji, displayKana, displayKanji: undefined };
  return { displayRomaji: romaji, displayKana, displayKanji: kanji };
}

function buildPhase(lang: Language, phaseIdx: number, level: Level, goal: string, ui: UiLang): Phase {
  const goalWords = goalWordsFor(lang, goal);
  const core = CORE[lang];
  const extraCore = EXTRA_CORE[lang];
  // Os 10 primeiros itens continuam seguindo exatamente a lógica anterior.
  // Os 10 seguintes são adicionados ao final para completar 20 tarefas por fase.
  const legacyMixed = [...goalWords, ...core];
  const expandedMixed = [...goalWords, ...core, ...extraCore];
  const start = (phaseIdx * 2) % legacyMixed.length;
  const legacyWords = Array.from({ length: 10 }, (_, i) => legacyMixed[(start + i) % legacyMixed.length]);
  const additionalWords = Array.from({ length: 10 }, (_, i) => expandedMixed[(start + 10 + i) % expandedMixed.length]);
  const words = [...legacyWords, ...additionalWords];
  const isJa = lang === "ja";
  const allAnswers = expandedMixed.map((w) => (isJa ? (w[2] || w[0]) : w[0]));
  const allMeanings = expandedMixed.map((w) => translate(w[1], ui));
  const kinds = kindsForLevel(level);
  const uiLangName = translate(langName(lang), ui);

  const questions: Question[] = words.map((w, i) => {
    const [target, ptTr, romaji] = w;
    const meaning = translate(ptTr, ui);
    const answerText = isJa ? (romaji || target) : target;
    const forms = isJa ? japaneseForms(target, romaji, level) : null;
    const kind = kinds[(phaseIdx + i) % kinds.length];
    const base: Partial<Question> = {
      audio: target, translation: meaning, romaji: romaji || undefined,
      japanese: isJa ? target : undefined, kana: isJa ? forms?.displayKana : undefined,
      kanji: isJa ? forms?.displayKanji : undefined,
    };

    if (kind === "choose") {
      const rawVisual = phaseIdx < 2 ? VISUALS[ptTr] : undefined;
      const visual = rawVisual?.map((v) => ({ ...v, label: translate(v.label, ui) }));
      return { ...base, kind: "choose",
        prompt: visual
          ? translate("Ouça o Neko e escolha a imagem correta", ui)
          : translateVars('Como se diz "{w}" em {lang}?', { w: meaning, lang: uiLangName }, ui),
        answer: visual ? meaning : answerText,
        options: pickOptions(answerText, allAnswers),
        visualOptions: visual,
      } as Question;
    }
    if (kind === "listen") {
      // MISSÃO DE ÁUDIO:
      // Não colocamos tradução, romaji, japonês, kana ou kanji nos campos
      // normais da pergunta. Eles ficam exclusivamente em "reveal", que a
      // tela só renderiza depois da resposta.
      return {
        kind: "listen",
        prompt: translate("Ouça a palavra e escolha a resposta correta", ui),
        audio: target,
        answer: meaning,
        options: pickOptions(meaning, allMeanings),
        // Na missão de áudio, o único conteúdo da palavra liberado antes da resposta é o japonês em kana.
        japanese: isJa ? forms?.displayKana : undefined,
        reveal: {
          translation: meaning,
          romaji: romaji || undefined,
          japanese: isJa ? forms?.displayKana : undefined,
          kana: isJa ? forms?.displayKana : undefined,
          kanji: isJa ? forms?.displayKanji : undefined,
        },
      } as Question;
    }
    if (kind === "complete") {
      const label = isJa ? translate("romaji", ui) : uiLangName;
      return { ...base, kind: "complete",
        prompt: translateVars('Escreva em {lang}: "{w}"', { lang: label, w: meaning }, ui),
        answer: answerText, hint: level === "iniciante" ? answerText : undefined } as Question;
    }
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
function langName(l: Language) { return l === "ja" ? "japonês" : l === "en" ? "inglês" : "português"; }
function normalizeLevel(l: string | null | undefined): Level {
  const v = (l ?? "iniciante").toLowerCase();
  if (v.startsWith("bás") || v === "basico") return "basico";
  if (v.startsWith("int")) return "intermediario";
  if (v.startsWith("av")) return "avancado";
  return "iniciante";
}
export function normalizeLanguage(lang: string | null | undefined): Language {
  return lang === "ja" || lang === "en" || lang === "pt" ? lang : "en";
}
export function buildPhases(langInput: Language | string | null | undefined, level: string | null | undefined, goal: string | null | undefined, ui: UiLang = "pt"): Phase[] {
  const lang = normalizeLanguage(langInput); const lv = normalizeLevel(level);
  return Array.from({ length: 10 }, (_, i) => buildPhase(lang, i, lv, goal ?? "outro", ui));
}
export const PHASES: Record<Language, Phase[]> = {
  ja: buildPhases("ja", "iniciante", "outro"),
  en: buildPhases("en", "iniciante", "outro"),
  pt: buildPhases("pt", "iniciante", "outro"),
};
export const LESSONS = PHASES;
export function getLesson(lang: Language | string | null | undefined, id: string, level?: string | null, goal?: string | null, ui: UiLang = "pt"): Phase | undefined {
  return buildPhases(lang, level, goal, ui).find((l) => l.id === id);
}
