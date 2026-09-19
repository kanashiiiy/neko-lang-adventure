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
  buildOptions?: string[];
  buildAnswer?: string[];
  matchLeft?: string[];
  matchRight?: string[];
  matchPairs?: Record<string, string>;
  nekoMessage?: string;
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

function buildLegacyPhase(lang: Language, phaseIdx: number, level: Level, goal: string, ui: UiLang): Phase {
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
      return {
        kind: "listen",
        prompt: translate("Ouça a palavra e escolha a resposta correta", ui),
        audio: target,
        answer: meaning,
        options: pickOptions(meaning, allMeanings),
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

  // XP de conclusão é deliberadamente moderado e cresce apenas um pouco
  // conforme a fase avança, para evitar acúmulo rápido sem deixar a recompensa baixa.
  const phaseXp = [18, 20, 22, 24, 26, 28, 30, 32, 35, 38][phaseIdx] ?? 38;

  return {
    id: `${lang}-phase-${phaseIdx + 1}`,
    title: translateVars("Fase {n}", { n: phaseIdx + 1 }, ui),
    icon: ICONS[lang][phaseIdx],
    xp: phaseXp,
    questions,
  };
}

const NEW_JA_PHRASES: [string,string,string][] = [["コーヒーをください。","koohii o kudasai","Quero café, por favor."],["水をください。","mizu o kudasai","Quero água, por favor."],["お茶をください。","ocha o kudasai","Quero chá, por favor."],["駅はどこですか。","eki wa doko desu ka","Onde fica a estação?"],["ホテルはどこですか。","hoteru wa doko desu ka","Onde fica o hotel?"],["トイレはどこですか。","toire wa doko desu ka","Onde fica o banheiro?"],["これはいくらですか。","kore wa ikura desu ka","Quanto custa isto?"],["これをお願いします。","kore o onegaishimasu","Quero este, por favor."],["メニューを見せてください。","menyuu o misete kudasai","Mostre o menu, por favor."],["英語を話せますか。","eigo o hanasemasu ka","Você fala inglês?"],["日本語を話します。","nihongo o hanashimasu","Eu falo japonês."],["ゆっくり話してください。","yukkuri hanashite kudasai","Fale devagar, por favor."],["もう一度お願いします。","mou ichido onegaishimasu","Mais uma vez, por favor."],["写真を撮ってもいいですか。","shashin o totte mo ii desu ka","Posso tirar uma foto?"],["ここに座ってもいいですか。","koko ni suwatte mo ii desu ka","Posso sentar aqui?"],["カードで払えますか。","kaado de haraemasu ka","Posso pagar com cartão?"],["現金を持っています。","genkin o motteimasu","Eu tenho dinheiro em espécie."],["駅まで歩きます。","eki made arukimasu","Vou andando até a estação."],["明日ホテルに行きます。","ashita hoteru ni ikimasu","Amanhã vou ao hotel."],["今日は家で休みます。","kyou wa ie de yasumimasu","Hoje vou descansar em casa."],["朝にコーヒーを飲みます。","asa ni koohii o nomimasu","Bebo café de manhã."],["毎日水を飲みます。","mainichi mizu o nomimasu","Bebo água todos os dias."],["昼にご飯を食べます。","hiru ni gohan o tabemasu","Como arroz no almoço."],["夜に映画を見ます。","yoru ni eiga o mimasu","Vejo um filme à noite."],["友達と映画を見ます。","tomodachi to eiga o mimasu","Vejo um filme com um amigo."],["家族と旅行します。","kazoku to ryokou shimasu","Viajo com a família."],["日本へ旅行したいです。","nihon e ryokou shitai desu","Quero viajar para o Japão."],["東京に行きたいです。","toukyou ni ikitai desu","Quero ir para Tóquio."],["電車に乗ります。","densha ni norimasu","Vou de trem."],["切符を買います。","kippu o kaimasu","Compro a passagem."],["地図を見ます。","chizu o mimasu","Olho o mapa."],["タクシーを呼びます。","takushii o yobimasu","Chamo um táxi."],["ホテルを予約します。","hoteru o yoyaku shimasu","Reservo um hotel."],["部屋を確認します。","heya o kakunin shimasu","Confiro o quarto."],["荷物を持っています。","nimotsu o motteimasu","Estou com a bagagem."],["空港へ行きます。","kuukou e ikimasu","Vou para o aeroporto."],["飛行機に乗ります。","hikouki ni norimasu","Vou de avião."],["出口はあちらです。","deguchi wa achira desu","A saída é ali."],["入口はここです。","iriguchi wa koko desu","A entrada é aqui."],["道を教えてください。","michi o oshiete kudasai","Mostre o caminho, por favor."],["今日は忙しいです。","kyou wa isogashii desu","Hoje estou ocupado."],["今日は暇です。","kyou wa hima desu","Hoje estou livre."],["少し疲れています。","sukoshi tsukareteimasu","Estou um pouco cansado."],["元気です。","genki desu","Estou bem."],["お腹がすいています。","onaka ga suiteimasu","Estou com fome."],["喉が渇いています。","nodo ga kawaiteimasu","Estou com sede."],["この料理はおいしいです。","kono ryouri wa oishii desu","Esta comida está deliciosa."],["この店は静かです。","kono mise wa shizuka desu","Esta loja é tranquila."],["この場所はきれいです。","kono basho wa kirei desu","Este lugar é bonito."],["今日は暑いです。","kyou wa atsui desu","Hoje está quente."],["今日は寒いです。","kyou wa samui desu","Hoje está frio."],["雨が降っています。","ame ga futteimasu","Está chovendo."],["明日は晴れます。","ashita wa haremasu","Amanhã fará sol."],["今何時ですか。","ima nanji desu ka","Que horas são agora?"],["今は三時です。","ima wa sanji desu","Agora são três horas."],["今日は月曜日です。","kyou wa getsuyoubi desu","Hoje é segunda-feira."],["明日は休みです。","ashita wa yasumi desu","Amanhã é folga."],["週末に買い物します。","shuumatsu ni kaimono shimasu","Faço compras no fim de semana."],["新しい本を買います。","atarashii hon o kaimasu","Compro um livro novo."],["音楽を聞くのが好きです。","ongaku o kiku no ga suki desu","Gosto de ouvir música."],["学校へ行きます。","gakkou e ikimasu","Vou para a escola."],["先生に質問します。","sensei ni shitsumon shimasu","Faço uma pergunta ao professor."],["宿題をします。","shukudai o shimasu","Faço a lição de casa."],["日本語を勉強しています。","nihongo o benkyou shiteimasu","Estou estudando japonês."],["新しい言葉を覚えます。","atarashii kotoba o oboemasu","Aprendo palavras novas."],["毎朝早く起きます。","maiasa hayaku okimasu","Acordo cedo todas as manhãs."],["夜は本を読みます。","yoru wa hon o yomimasu","Leio um livro à noite."],["週末は友達に会います。","shuumatsu wa tomodachi ni aimasu","Encontro um amigo no fim de semana."],["一緒に昼ご飯を食べませんか。","issho ni hirugohan o tabemasen ka","Vamos almoçar juntos?"],["明日一緒に行きませんか。","ashita issho ni ikimasen ka","Vamos juntos amanhã?"],["少し待ってください。","sukoshi matte kudasai","Espere um pouco, por favor."],["ここで待ちます。","koko de machimasu","Vou esperar aqui."],["電話をかけます。","denwa o kakemasu","Vou telefonar."],["メールを送ります。","meeru o okurimasu","Vou enviar um e-mail."],["仕事が終わりました。","shigoto ga owarimashita","O trabalho terminou."],["明日の予定があります。","ashita no yotei ga arimasu","Tenho planos para amanhã."],["一緒に写真を撮りましょう。","issho ni shashin o torimashou","Vamos tirar uma foto juntos."],["ここで写真を撮ります。","koko de shashin o torimasu","Vou tirar uma foto aqui."],["この道をまっすぐ行きます。","kono michi o massugu ikimasu","Sigo reto por esta rua."],["右に曲がってください。","migi ni magatte kudasai","Vire à direita, por favor."]];

function buildVariedJapanesePhase(phaseIdx: number, ui: UiLang): Phase {
  const start = (phaseIdx - 3) * 20;
  const slice = NEW_JA_PHRASES.slice(start, start + 20);
  const meanings = slice.map((x) => translate(x[2], ui));
  const phasePatterns: TaskKind[][] = [
    ["choose","listen","choose","choose","complete","listen","choose","match","choose","complete","listen","choose","choose","match","listen","choose","complete","choose","listen","choose"],
    ["listen","choose","complete","choose","listen","match","choose","complete","listen","choose","match","choose","listen","complete","choose","listen","choose","match","complete","choose"],
    ["choose","listen","match","complete","choose","listen","build","choose","complete","match","listen","choose","build","listen","choose","complete","match","choose","listen","build"],
    ["listen","choose","build","match","listen","complete","build","choose","listen","build","match","choose","complete","build","listen","choose","match","build","listen","complete"],
    ["build","listen","choose","match","build","choose","listen","build","complete","match","listen","choose","build","listen","match","choose","build","complete","listen","build"],
    ["choose","build","listen","match","build","listen","choose","build","match","complete","listen","build","choose","match","listen","build","complete","choose","build","listen"],
    ["build","listen","match","choose","build","complete","listen","build","choose","match","listen","build","complete","choose","build","listen","match","build","choose","listen"],
  ];
  const pattern = phasePatterns[Math.min(phaseIdx - 3, phasePatterns.length - 1)];

  const makeBuild = (i: number, target: string, romaji: string): Question => {
    const words = romaji.trim().split(/\s+/).filter(Boolean);
    const other = NEW_JA_PHRASES[(start + i + 7) % NEW_JA_PHRASES.length][1].split(/\s+/).filter(Boolean);
    const distractors = other.filter((word) => !words.includes(word)).slice(0, Math.max(1, 5 - words.length));
    const options = shuffle(Array.from(new Set([...words, ...distractors])));
    return {
      kind: "build",
      prompt: translate("Ouça com atenção e monte a frase com as palavras em Romaji", ui),
      audio: target,
      answer: words.join(" "),
      options,
      buildOptions: options,
      buildAnswer: words,
      nekoMessage: i === 0 || i === 8
        ? translate("Escuta com atenção! 👂 Agora monte o que você ouviu.", ui)
        : undefined,
    };
  };

  const questions: Question[] = slice.map((w, i) => {
    const [target, romaji, pt] = w;
    const meaning = translate(pt, ui);
    const kind = pattern[i];
    const otherMeanings = meanings.filter((_, n) => n !== i);
    const base = {
      audio: target,
      translation: meaning,
      romaji,
      japanese: target,
    };

    if (kind === "build") {
      const words = romaji.trim().split(/\s+/).filter(Boolean);
      if (words.length <= 5) return makeBuild(i, target, romaji);
      const fallback = words.slice(0, 5).join(" ");
      return makeBuild(i, target, fallback);
    }

    if (kind === "listen") {
      return {
        kind: "listen",
        prompt: translate("Ouça o áudio e escolha o significado", ui),
        audio: target,
        answer: meaning,
        options: pickOptions(meaning, meanings),
        reveal: { translation: meaning, romaji, japanese: target },
        nekoMessage: i === 0 ? translate("Ouça com atenção! 👂", ui) : undefined,
      } as Question;
    }

    if (kind === "match") {
      const group = Array.from({ length: 4 }, (_, offset) => {
        const n = (i + offset) % slice.length;
        return slice[n];
      });
      const left = group.map((x) => x[1]);
      const right = shuffle(group.map((x) => translate(x[2], ui)));
      const pairs: Record<string,string> = {};
      group.forEach((x) => { pairs[x[1]] = translate(x[2], ui); });
      return {
        kind: "match",
        prompt: translate("Associe cada expressão ao significado correto", ui),
        answer: JSON.stringify(pairs),
        matchLeft: left,
        matchRight: right,
        matchPairs: pairs,
        nekoMessage: i % 2 === 0 ? translate("Combine os pares! 🧩", ui) : undefined,
      } as Question;
    }

    if (kind === "complete") {
      return {
        ...base,
        kind: "complete",
        prompt: translate("Complete a frase usando o Romaji aprendido", ui),
        answer: romaji,
      } as Question;
    }

    if (kind === "choose") {
      const useTranslation = i % 2 === 0;
      return {
        ...base,
        kind: "choose",
        prompt: useTranslation
          ? translate("Escolha a tradução correta", ui)
          : translate("Escolha a frase correta em Romaji", ui),
        answer: useTranslation ? meaning : romaji,
        options: useTranslation
          ? pickOptions(meaning, meanings)
          : pickOptions(romaji, slice.map((x) => x[1])),
      } as Question;
    }

    return {
      ...base,
      kind: "choose",
      prompt: translate("Qual opção corresponde à situação?", ui),
      answer: meaning,
      options: pickOptions(meaning, [meaning, ...otherMeanings]),
    } as Question;
  });

  return {
    id: "ja-phase-" + (phaseIdx + 1),
    title: translateVars("Fase {n}", { n: phaseIdx + 1 }, ui),
    icon: ICONS.ja[phaseIdx],
    xp: [24,26,28,30,32,35,38][phaseIdx - 3] ?? 38,
    questions,
  };
}

function buildPhase(lang: Language, phaseIdx: number, level: Level, goal: string, ui: UiLang): Phase {
  if (phaseIdx < 3) return buildLegacyPhase(lang, phaseIdx, level, goal, ui);
  if (lang === "ja") return buildVariedJapanesePhase(phaseIdx, ui);
  return buildLegacyPhase(lang, phaseIdx, level, goal, ui);
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
