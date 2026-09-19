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


const JA_MORE_PHRASES: [string,string,string][] = [
  ["朝ご飯を食べます。","asagohan o tabemasu","Tomo café da manhã."],
  ["コーヒーを飲みます。","koohii o nomimasu","Tomo café."],
  ["水を買います。","mizu o kaimasu","Compro água."],
  ["パンを食べます。","pan o tabemasu","Como pão."],
  ["りんごを食べます。","ringo o tabemasu","Como uma maçã."],
  ["駅で会いましょう。","eki de aimashou","Vamos nos encontrar na estação."],
  ["ここはどこですか。","koko wa doko desu ka","Onde é aqui?"],
  ["これは何ですか。","kore wa nan desu ka","O que é isto?"],
  ["あれは何ですか。","are wa nan desu ka","O que é aquilo?"],
  ["いくらですか。","ikura desu ka","Quanto custa?"],
  ["少し高いです。","sukoshi takai desu","É um pouco caro."],
  ["安いですね。","yasui desu ne","É barato, não é?"],
  ["これをください。","kore o kudasai","Quero isto, por favor."],
  ["別の色はありますか。","betsu no iro wa arimasu ka","Tem outra cor?"],
  ["サイズはありますか。","saizu wa arimasu ka","Tem este tamanho?"],
  ["試着してもいいですか。","shichaku shite mo ii desu ka","Posso experimentar?"],
  ["これは便利です。","kore wa benri desu","Isto é prático."],
  ["とてもきれいです。","totemo kirei desu","É muito bonito."],
  ["この料理が好きです。","kono ryouri ga suki desu","Gosto desta comida."],
  ["辛い食べ物が好きです。","karai tabemono ga suki desu","Gosto de comida apimentada."],
  ["甘いものが好きです。","amai mono ga suki desu","Gosto de coisas doces."],
  ["水をもう一杯ください。","mizu o mou ippai kudasai","Mais um copo de água, por favor."],
  ["お会計をお願いします。","okaikei o onegaishimasu","A conta, por favor."],
  ["予約があります。","yoyaku ga arimasu","Tenho uma reserva."],
  ["予約を変更したいです。","yoyaku o henkou shitai desu","Quero alterar a reserva."],
  ["部屋を見せてください。","heya o misete kudasai","Mostre o quarto, por favor."],
  ["鍵をください。","kagi o kudasai","A chave, por favor."],
  ["チェックインします。","chekkuin shimasu","Vou fazer o check-in."],
  ["チェックアウトします。","chekkuauto shimasu","Vou fazer o check-out."],
  ["荷物を預けたいです。","nimotsu o azuketai desu","Quero deixar minha bagagem."],
  ["電車は何時ですか。","densha wa nanji desu ka","Que horas é o trem?"],
  ["次の駅で降ります。","tsugi no eki de orimasu","Desço na próxima estação."],
  ["ここで乗り換えます。","koko de norikaemasu","Faço a baldeação aqui."],
  ["この電車で行きます。","kono densha de ikimasu","Vou neste trem."],
  ["空港までお願いします。","kuukou made onegaishimasu","Até o aeroporto, por favor."],
  ["右側にあります。","migigawa ni arimasu","Fica do lado direito."],
  ["左にあります。","hidari ni arimasu","Fica à esquerda."],
  ["まっすぐ行ってください。","massugu itte kudasai","Siga reto, por favor."],
  ["ここから近いですか。","koko kara chikai desu ka","É perto daqui?"],
  ["歩いて行けます。","aruite ikemasu","Dá para ir a pé."],
  ["写真を見せてください。","shashin o misete kudasai","Mostre a foto, por favor."],
  ["日本語が少し話せます。","nihongo ga sukoshi hanasemasu","Consigo falar um pouco de japonês."],
  ["日本語がまだ苦手です。","nihongo ga mada nigate desu","Ainda tenho dificuldade com japonês."],
  ["もう少しゆっくりお願いします。","mou sukoshi yukkuri onegaishimasu","Um pouco mais devagar, por favor."],
  ["意味が分かりません。","imi ga wakarimasen","Não entendo o significado."],
  ["分かりました。","wakarimashita","Entendi."],
  ["大丈夫です。","daijoubu desu","Está tudo bem."],
  ["手伝ってください。","tetsudatte kudasai","Ajude-me, por favor."],
  ["ちょっと待ってください。","chotto matte kudasai","Espere um pouco, por favor."],
  ["今忙しいです。","ima isogashii desu","Estou ocupado agora."],
  ["あとで電話します。","ato de denwa shimasu","Ligo mais tarde."],
  ["明日会いましょう。","ashita aimashou","Vamos nos encontrar amanhã."],
  ["また明日。","mata ashita","Até amanhã."],
  ["楽しかったです。","tanoshikatta desu","Foi divertido."],
  ["今日は楽しいです。","kyou wa tanoshii desu","Hoje está divertido."],
  ["いい天気ですね。","ii tenki desu ne","Que tempo bom, não é?"],
  ["写真を撮りましょう。","shashin o torimashou","Vamos tirar uma foto."],
  ["一緒に行きましょう。","issho ni ikimashou","Vamos juntos."],
  ["ここに書いてください。","koko ni kaite kudasai","Escreva aqui, por favor."],
  ["名前を書きます。","namae o kakimasu","Escrevo o nome."],
  ["日本語で話してください。","nihongo de hanashite kudasai","Fale em japonês, por favor."]
];
const ALL_JA_PHRASES: [string,string,string][] = [...NEW_JA_PHRASES, ...JA_MORE_PHRASES];

function buildVariedJapanesePhase(phaseIdx: number, ui: UiLang): Phase {
  const start = (phaseIdx - 3) * 20;
  const slice = ALL_JA_PHRASES.slice(start, start + 20);
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

  const makeBuild = (i: number, source: [string,string,string]): Question => {
    const [target, romaji] = source;
    const words = romaji.trim().split(/\s+/).filter(Boolean);
    const other = ALL_JA_PHRASES[(start + i + 7) % ALL_JA_PHRASES.length][1].split(/\s+/).filter(Boolean);
    const distractors = other.filter((word) => !words.includes(word)).slice(0, Math.max(1, 5 - words.length));
    const options = shuffle([...words, ...distractors.filter((word) => !words.includes(word))]);
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
      const candidates = [
        slice[i],
        ...slice.slice(i + 1),
        ...slice.slice(0, i),
        ...ALL_JA_PHRASES,
      ];
      const source = candidates.find((entry) => entry[1].trim().split(/\s+/).filter(Boolean).length <= 5) ?? slice[i];
      return makeBuild(i, source);
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


const EN_VARIED_PHRASES: [string,string,string][] = [
  ["Hello, how are you?","Olá, como você está?","cumprimentos"],
  ["I am fine, thank you.","Estou bem, obrigado.","cumprimentos"],
  ["What is your name?","Qual é o seu nome?","apresentação"],
  ["My name is Neko.","Meu nome é Neko.","apresentação"],
  ["Nice to meet you.","Prazer em conhecer você.","apresentação"],
  ["Where is the station?","Onde fica a estação?","direções"],
  ["Where is the hotel?","Onde fica o hotel?","direções"],
  ["How much is this?","Quanto custa isto?","compras"],
  ["I would like some water.","Eu gostaria de água.","pedido"],
  ["Can I have a coffee, please?","Posso pedir um café, por favor?","pedido"],
  ["Please show me the menu.","Por favor, mostre o menu.","restaurante"],
  ["I would like some food.","Eu gostaria de comida.","restaurante"],
  ["The food is delicious.","A comida está deliciosa.","restaurante"],
  ["Can I pay by card?","Posso pagar com cartão?","pagamento"],
  ["I have a reservation.","Eu tenho uma reserva.","hotel"],
  ["I need a room for one night.","Preciso de um quarto por uma noite.","hotel"],
  ["What time is the train?","Que horas é o trem?","transporte"],
  ["I am going to the airport.","Vou para o aeroporto.","transporte"],
  ["Please call a taxi.","Por favor, chame um táxi.","transporte"],
  ["Turn right here.","Vire à direita aqui.","direções"],
  ["Go straight ahead.","Siga em frente.","direções"],
  ["Please wait a moment.","Por favor, espere um momento.","pedido"],
  ["Could you speak slowly?","Você poderia falar devagar?","conversa"],
  ["Could you repeat that?","Você poderia repetir isso?","conversa"],
  ["I do not understand.","Eu não entendo.","conversa"],
  ["I understand now.","Agora eu entendo.","conversa"],
  ["I speak a little English.","Eu falo um pouco de inglês.","idioma"],
  ["I am studying English.","Estou estudando inglês.","idioma"],
  ["What does this mean?","O que isto significa?","idioma"],
  ["Can you help me?","Você pode me ajudar?","ajuda"],
  ["I am a little tired.","Estou um pouco cansado.","estado"],
  ["I am hungry.","Estou com fome.","estado"],
  ["I am thirsty.","Estou com sede.","estado"],
  ["It is very hot today.","Está muito quente hoje.","tempo"],
  ["It is cold today.","Está frio hoje.","tempo"],
  ["It is raining now.","Está chovendo agora.","tempo"],
  ["I like this place.","Eu gosto deste lugar.","opinião"],
  ["I like listening to music.","Eu gosto de ouvir música.","preferência"],
  ["I want to travel.","Eu quero viajar.","viagem"],
  ["I am going home.","Estou indo para casa.","rotina"],
];

const PT_VARIED_PHRASES: [string,string,string][] = [
  ["Olá, como você está?","saudação"],
  ["Eu estou bem, obrigado.","resposta"],
  ["Qual é o seu nome?","apresentação"],
  ["Meu nome é Neko.","apresentação"],
  ["Prazer em conhecer você.","cumprimento"],
  ["Onde fica a estação?","direções"],
  ["Onde fica o hotel?","direções"],
  ["Quanto custa isto?","compras"],
  ["Eu quero água, por favor.","pedido"],
  ["Eu gostaria de um café.","pedido"],
  ["Mostre o menu, por favor.","restaurante"],
  ["Eu gostaria de comida.","restaurante"],
  ["A comida está deliciosa.","restaurante"],
  ["Posso pagar com cartão?","pagamento"],
  ["Eu tenho uma reserva.","hotel"],
  ["Preciso de um quarto por uma noite.","hotel"],
  ["Que horas é o trem?","transporte"],
  ["Vou para o aeroporto.","transporte"],
  ["Por favor, chame um táxi.","transporte"],
  ["Vire à direita aqui.","direções"],
  ["Siga em frente.","direções"],
  ["Por favor, espere um momento.","pedido"],
  ["Você pode falar devagar?","conversa"],
  ["Você pode repetir isso?","conversa"],
  ["Eu não entendo.","conversa"],
  ["Agora eu entendo.","conversa"],
  ["Eu falo um pouco de português.","idioma"],
  ["Estou estudando português.","idioma"],
  ["O que isto significa?","idioma"],
  ["Você pode me ajudar?","ajuda"],
  ["Estou um pouco cansado.","estado"],
  ["Estou com fome.","estado"],
  ["Estou com sede.","estado"],
  ["Está muito quente hoje.","tempo"],
  ["Está frio hoje.","tempo"],
  ["Está chovendo agora.","tempo"],
  ["Eu gosto deste lugar.","opinião"],
  ["Eu gosto de ouvir música.","preferência"],
  ["Eu quero viajar.","viagem"],
  ["Estou indo para casa.","rotina"],
];

const VARIED_PATTERNS: TaskKind[][] = [
  ["choose","listen","choose","complete","choose","listen","choose","complete","listen","choose","match","choose","complete","listen","choose","match","listen","choose","complete","choose"],
  ["listen","choose","complete","choose","listen","match","choose","complete","choose","listen","choose","match","complete","choose","listen","choose","complete","listen","match","choose"],
  ["choose","listen","match","complete","choose","listen","build","choose","complete","match","listen","choose","build","listen","choose","complete","match","choose","listen","build"],
  ["listen","choose","build","match","listen","complete","build","choose","listen","build","match","choose","complete","build","listen","choose","match","build","listen","complete"],
  ["build","listen","choose","match","build","choose","listen","build","complete","match","listen","choose","build","listen","match","choose","build","complete","listen","build"],
  ["choose","build","listen","match","build","listen","choose","build","match","complete","listen","build","choose","match","listen","build","complete","choose","build","listen"],
  ["build","listen","match","choose","build","complete","listen","build","choose","match","listen","build","complete","choose","build","listen","match","build","choose","listen"],
];

function buildVariedTextPhase(lang: "en" | "pt", phaseIdx: number, ui: UiLang): Phase {
  const bank = lang === "en" ? EN_VARIED_PHRASES : PT_VARIED_PHRASES;
  const start = (phaseIdx * 7) % bank.length;
  const slice = Array.from({ length: 20 }, (_, i) => bank[(start + i) % bank.length]);
  const pattern = VARIED_PATTERNS[phaseIdx % VARIED_PATTERNS.length];

  const tokenize = (text: string) => text
    .replace(/[.,!?;:]/g, "")
    .trim()
    .split(/\\s+/)
    .filter(Boolean);

  const makeBuild = (i: number, source: [string,string,string]): Question => {
    const [target] = source;
    const words = tokenize(target);
    const other = tokenize(bank[(start + i + 11) % bank.length][0]);
    const distractors = other.filter((word) => !words.some((w) => normalizeTextToken(w) === normalizeTextToken(word))).slice(0, Math.max(2, 5 - Math.min(words.length, 3)));
    const options = shuffle([...words, ...distractors]);
    const answer = words.join(" ");
    return {
      kind: "build",
      prompt: translate(lang === "en" ? "Ouça com atenção e monte a frase com as palavras em inglês" : "Ouça com atenção e monte a frase com as palavras em português", ui),
      audio: target,
      answer,
      options,
      buildOptions: options,
      buildAnswer: words,
      nekoMessage: i === 0 || i === 8 ? translate("Escuta com atenção! 👂 Agora monte o que você ouviu.", ui) : undefined,
    };
  };

  const questions: Question[] = slice.map((entry, i) => {
    const [target, meaning] = entry;
    const kind = pattern[i];
    const translatedMeaning = lang === "en" ? translate(meaning, ui) : translate(meaning, ui);

    if (kind === "build") return makeBuild(i, entry);

    if (kind === "listen") {
      return {
        kind: "listen",
        prompt: translate("Ouça o áudio e escolha a resposta correta", ui),
        audio: target,
        answer: translatedMeaning,
        options: pickOptions(translatedMeaning, slice.map((x) => translate(x[1], ui))),
        reveal: lang === "en" ? { translation: translatedMeaning } : undefined,
        nekoMessage: i === 0 ? translate("Ouça com atenção! 👂", ui) : undefined,
      } as Question;
    }

    if (kind === "match") {
      // Em português, a coluna da direita precisa ter quatro significados
      // diferentes; isso evita dois botões idênticos que não poderiam ser
      // associados separadamente pela interface.
      const group = lang === "pt"
        ? slice.filter((entry, n, arr) => arr.findIndex((x) => x[1] === entry[1]) === n).slice(i % 8, (i % 8) + 4)
        : Array.from({ length: 4 }, (_, offset) => slice[(i + offset) % slice.length]);
      const safeGroup = group.length === 4
        ? group
        : Array.from(new Map([...group, ...slice].map((entry) => [entry[0], entry])).values()).slice(0, 4);
      const left = safeGroup.map((x) => x[0]);
      const right = shuffle(safeGroup.map((x) => translate(x[1], ui)));
      const pairs: Record<string, string> = {};
      safeGroup.forEach((x) => { pairs[x[0]] = translate(x[1], ui); });
      return {
        kind: "match",
        prompt: translate("Associe cada frase ao significado correto", ui),
        answer: JSON.stringify(pairs),
        matchLeft: left,
        matchRight: right,
        matchPairs: pairs,
        nekoMessage: i % 2 === 0 ? translate("Combine os pares! 🧩", ui) : undefined,
      } as Question;
    }

    if (kind === "complete") {
      return {
        kind: "complete",
        prompt: translate(lang === "en" ? "Ouça e escreva a frase em inglês" : "Ouça e escreva a frase em português", ui),
        audio: target,
        answer: tokenize(target).join(" "),
      } as Question;
    }

    if (kind === "choose") {
      const useMeaning = i % 2 === 0;
      const meanings = slice.map((x) => translate(x[1], ui));
      return {
        kind: "choose",
        prompt: translate(useMeaning ? "Ouça e escolha o significado correto" : (lang === "en" ? "Ouça e escolha a frase correta em inglês" : "Ouça e escolha a frase correta em português"), ui),
        audio: target,
        answer: useMeaning ? translatedMeaning : target,
        options: useMeaning ? pickOptions(translatedMeaning, meanings) : pickOptions(target, slice.map((x) => x[0])),
      } as Question;
    }

    return {
      kind: "choose",
      prompt: translate(lang === "en" ? "Ouça e escolha a resposta correta em inglês" : "Ouça e escolha a resposta correta em português", ui),
      audio: target,
      answer: target,
      options: pickOptions(target, slice.map((x) => x[0])),
    } as Question;
  });

  return {
    id: `${lang}-phase-${phaseIdx + 1}`,
    title: translateVars("Fase {n}", { n: phaseIdx + 1 }, ui),
    icon: ICONS[lang][phaseIdx],
    xp: [18,20,22,24,26,28,30,32,35,38][phaseIdx] ?? 38,
    questions,
  };
}

function normalizeTextToken(value: string) {
  return value.toLowerCase().normalize("NFC").replace(/[.,!?;:]/g, "");
}

function buildPhase(lang: Language, phaseIdx: number, level: Level, goal: string, ui: UiLang): Phase {
  // As três línguas usam a mesma estrutura moderna de tarefas.
  // O conteúdo e a forma de montagem continuam específicos de cada idioma.
  if (lang === "ja") return buildVariedJapanesePhase(phaseIdx, ui);
  return buildVariedTextPhase(lang, phaseIdx, ui);
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
// Não gere todas as fases durante o carregamento do app.
// O routeTree importa este módulo mesmo antes de o usuário abrir uma lição.
// Gerar o conteúdo sob demanda evita que um problema no conteúdo de lições
// impeça a tela inicial/login de ser renderizada.
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
export function getLesson(lang: Language | string | null | undefined, id: string, level?: string | null, goal?: string | null, ui: UiLang = "pt"): Phase | undefined {
  return buildPhases(lang, level, goal, ui).find((l) => l.id === id);
}
