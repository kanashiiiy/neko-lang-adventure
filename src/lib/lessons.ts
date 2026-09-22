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

type GoalFamily = "travel" | "live" | "work" | "general";
type GoalRow = [en: string, pt: string, ja: string, romaji: string];

const GOAL_ROWS: Record<Exclude<GoalFamily, "general">, GoalRow[]> = {
  travel: [
    ["Hi","Olá","やあ","yaa"],["Thank you","Obrigado","ありがとう","arigatou"],["Sorry","Desculpe","すみません","sumimasen"],["Please","Por favor","お願いします","onegaishimasu"],
    ["Good morning","Bom dia","おはようございます","ohayou gozaimasu"],["Good afternoon","Boa tarde","こんにちは","konnichiwa"],["Good evening","Boa noite","こんばんは","konbanwa"],["Yes","Sim","はい","hai"],
    ["No","Não","いいえ","iie"],["Water","Água","水","mizu"],["Food","Comida","食べ物","tabemono"],["Bathroom","Banheiro","トイレ","toire"],
    ["Airport","Aeroporto","空港","kuukou"],["Hotel","Hotel","ホテル","hoteru"],["Train","Trem","電車","densha"],["Bus","Ônibus","バス","basu"],
    ["Where is it?","Onde fica?","どこですか","doko desu ka"],["How much is it?","Quanto custa?","いくらですか","ikura desu ka"],["Here","Aqui","ここです","koko desu"],["Help, please.","Ajuda, por favor.","助けてください","tasukete kudasai"],
    ["Water, please.","Água, por favor.","水をください","mizu o kudasai"],["The menu, please.","O cardápio, por favor.","メニューをください","menyuu o kudasai"],["A taxi, please.","Um táxi, por favor.","タクシーをお願いします","takushii o onegaishimasu"],["Check-in, please.","Check-in, por favor.","チェックインをお願いします","chekkuin o onegaishimasu"],
    ["Where is the bathroom?","Onde fica o banheiro?","トイレはどこですか","toire wa doko desu ka"],["Where is the station?","Onde fica a estação?","駅はどこですか","eki wa doko desu ka"],["Where is the airport?","Onde fica o aeroporto?","空港はどこですか","kuukou wa doko desu ka"],["Where is the hotel?","Onde fica o hotel?","ホテルはどこですか","hoteru wa doko desu ka"],
    ["How much is this?","Quanto custa isto?","これはいくらですか","kore wa ikura desu ka"],["I'll take this, please.","Quero este, por favor.","これをください","kore o kudasai"],["Can I pay by card?","Posso pagar com cartão?","カードで払えますか","kaado de haraemasu ka"],["What do you recommend?","O que você recomenda?","おすすめは何ですか","osusume wa nan desu ka"],
    ["I have a reservation.","Tenho uma reserva.","予約があります","yoyaku ga arimasu"],["I have luggage.","Tenho uma bagagem.","荷物があります","nimotsu ga arimasu"],["Do you speak English?","Você fala inglês?","英語を話せますか","eigo o hanasemasu ka"],["Please show me the way.","Pode me mostrar o caminho.","道を教えてください","michi o oshiete kudasai"],
    ["I don't understand.","Não entendo.","わかりません","wakarimasen"],["One more time, please.","Mais uma vez, por favor.","もう一度お願いします","mou ichido onegaishimasu"],["Please wait a moment.","Espere um pouco, por favor.","ちょっと待ってください","chotto matte kudasai"],["It's okay.","Tudo bem.","大丈夫です","daijoubu desu"],
  ],
  live: [
    ["Hello","Olá","こんにちは","konnichiwa"],["Thank you","Obrigado","ありがとう","arigatou"],["Sorry","Desculpe","すみません","sumimasen"],["Please","Por favor","お願いします","onegaishimasu"],
    ["Good morning","Bom dia","おはようございます","ohayou gozaimasu"],["Good evening","Boa noite","こんばんは","konbanwa"],["How are you?","Como você está?","元気ですか","genki desu ka"],["I'm fine.","Estou bem.","元気です","genki desu"],
    ["Yes","Sim","はい","hai"],["No","Não","いいえ","iie"],["Water","Água","水","mizu"],["Food","Comida","食べ物","tabemono"],
    ["Home","Casa","家","ie"],["Room","Quarto","部屋","heya"],["Supermarket","Supermercado","スーパー","suupaa"],["Station","Estação","駅","eki"],
    ["Bathroom","Banheiro","トイレ","toire"],["School","Escola","学校","gakkou"],["Hospital","Hospital","病院","byouin"],["How much is it?","Quanto custa?","いくらですか","ikura desu ka"],
    ["Water, please.","Água, por favor.","水をください","mizu o kudasai"],["I'll take this, please.","Quero este, por favor.","これをください","kore o kudasai"],["Can I pay by card?","Posso pagar com cartão?","カードで払えますか","kaado de haraemasu ka"],["Please help me.","Ajude-me, por favor.","助けてください","tasukete kudasai"],
    ["Where is the station?","Onde fica a estação?","駅はどこですか","eki wa doko desu ka"],["Where is the school?","Onde fica a escola?","学校はどこですか","gakkou wa doko desu ka"],["Where is the hospital?","Onde fica o hospital?","病院はどこですか","byouin wa doko desu ka"],["Where is the supermarket?","Onde fica o supermercado?","スーパーはどこですか","suupaa wa doko desu ka"],
    ["I live here.","Eu moro aqui.","ここに住んでいます","koko ni sunde imasu"],["I live nearby.","Eu moro perto daqui.","近くに住んでいます","chikaku ni sunde imasu"],["I have an appointment.","Tenho um compromisso.","予約があります","yoyaku ga arimasu"],["I need help.","Preciso de ajuda.","助けが必要です","tasuke ga hitsuyou desu"],
    ["I don't understand.","Não entendo.","わかりません","wakarimasen"],["One more time, please.","Mais uma vez, por favor.","もう一度お願いします","mou ichido onegaishimasu"],["I understand.","Entendi.","わかりました","wakarimashita"],["It's okay.","Tudo bem.","大丈夫です","daijoubu desu"],
  ],
  work: [
    ["Hello","Olá","こんにちは","konnichiwa"],["Good morning","Bom dia","おはようございます","ohayou gozaimasu"],["Thank you","Obrigado","ありがとうございます","arigatou gozaimasu"],["Excuse me","Com licença","すみません","sumimasen"],
    ["Nice to meet you.","Prazer em conhecer você.","はじめまして","hajimemashite"],["My name is...","Meu nome é...","私は___です","watashi wa ___ desu"],["I work here.","Eu trabalho aqui.","ここで働いています","koko de hataraite imasu"],["Yes","Sim","はい","hai"],
    ["No","Não","いいえ","iie"],["Today","Hoje","今日","kyou"],["Tomorrow","Amanhã","明日","ashita"],["Now","Agora","今","ima"],
    ["Work","Trabalho","仕事","shigoto"],["Company","Empresa","会社","kaisha"],["Meeting","Reunião","会議","kaigi"],["Schedule","Agenda","予定","yotei"],
    ["What time is it?","Que horas são?","何時ですか","nanji desu ka"],["What time does it start?","A partir de que horas?","何時からですか","nanji kara desu ka"],["Is now okay?","Agora pode ser?","今いいですか","ima ii desu ka"],["I understand.","Entendi.","わかりました","wakarimashita"],
    ["Please.","Por favor.","お願いします","onegaishimasu"],["One more time, please.","Mais uma vez, por favor.","もう一度お願いします","mou ichido onegaishimasu"],["Please help me.","Ajude-me, por favor.","手伝ってください","tetsudatte kudasai"],["Please wait a moment.","Espere um pouco, por favor.","ちょっと待ってください","chotto matte kudasai"],
    ["What is this?","O que é isto?","これは何ですか","kore wa nan desu ka"],["Where is it?","Onde é?","どこですか","doko desu ka"],["When is it?","Quando é?","いつですか","itsu desu ka"],["Who is it?","Quem é?","誰ですか","dare desu ka"],
    ["What time is the meeting?","Que horas é a reunião?","会議は何時ですか","kaigi wa nanji desu ka"],["I'll check the schedule.","Vou confirmar a agenda.","予定を確認します","yotei o kakunin shimasu"],["I'll check the email.","Vou verificar o e-mail.","メールを確認します","meeru o kakunin shimasu"],["Later, please.","Mais tarde, por favor.","後でお願いします","ato de onegaishimasu"],
    ["I can do it today.","Posso fazer hoje.","今日できます","kyou dekimasu"],["I can do it tomorrow.","Posso fazer amanhã.","明日できます","ashita dekimasu"],["I'm finished.","Terminei.","終わりました","owarimashita"],["Please check.","Por favor, verifique.","確認してください","kakunin shite kudasai"],
  ],
};

type Unit1Row = [pt:string,en:string,ja:string,romaji:string];
const UNIT1_ROWS: Unit1Row[][] = [[["Olá","Hello","こんにちは","konnichiwa"],["Oi","Hi","やあ","yaa"],["Bom dia","Good morning","おはようございます","ohayou gozaimasu"],["Boa tarde","Good afternoon","こんにちは","konnichiwa"]],[["Até logo","See you later","また後で","mata ato de"],["Até mais","See you","またね","mata ne"],["Obrigado(a)","Thank you","ありがとう","arigatou"],["De nada","You're welcome","どういたしまして","douitashimashite"],["Por favor","Please","お願いします","onegaishimasu"]],[["Qual é o seu nome?","What's your name?","お名前は何ですか","onamae wa nan desu ka"],["Como você se chama?","May I ask your name?","何という名前ですか","nan to iu namae desu ka"],["Meu nome é...","My name is...","私は...です","watashi wa desu"],["Eu sou...","I'm...","私の名前は...です","watashi no namae wa desu"]],[["Como você está?","How are you?","お元気ですか","ogenki desu ka"],["Estou bem.","I'm fine.","元気です","genki desu"],["Estou ótimo(a).","I'm great.","すごく元気です","sugoku genki desu"],["Estou muito bem.","I'm very well.","とても元気です","totemo genki desu"]],[["Prazer em conhecer você.","Nice to meet you.","はじめまして","hajimemashite"],["Muito prazer.","It's a pleasure to meet you.","どうぞよろしくお願いします","douzo yoroshiku onegaishimasu"],["É um prazer conhecer você.","It's nice to meet you.","お会いできてうれしいです","oai dekite ureshii desu"],["Prazer em conhecer você também.","Nice to meet you too.","よろしくお願いします","yoroshiku onegaishimasu"]],[["E você?","And you?","あなたは","anata wa"],["De onde você é?","Where are you from?","どこから来ましたか","doko kara kimashita ka"],["Eu sou do Brasil.","I'm from Brazil.","ブラジルから来ました","burajiru kara kimashita"],["Onde você mora?","Where do you live?","どこに住んでいますか","doko ni sunde imasu ka"]],[["Olá! Meu nome é...","Hello! My name is...","こんにちは！私は...です","konnichiwa watashi wa desu"],["Bom dia! Como você está?","Good morning! How are you?","おはようございます！元気ですか","ohayou gozaimasu genki desu ka"],["Estou bem. E você?","I'm fine. And you?","元気です。あなたは","genki desu anata wa"],["Prazer em conhecer você!","Nice to meet you!","はじめまして！","hajimemashite"],["Meu nome é...","My name is...","私の名前は...です","watashi no namae wa desu"]],[["Olá! Qual é o seu nome?","Hello! What's your name?","こんにちは！お名前は何ですか","konnichiwa onamae wa nan desu ka"],["Meu nome é... Prazer!","My name is... Nice to meet you!","私は...です。はじめまして","watashi wa desu hajimemashite"],["Oi! Como você está?","Hi! How are you?","やあ！元気ですか","yaa genki desu ka"],["Estou ótimo(a), obrigado(a).","I'm great, thank you.","すごく元気です。ありがとう","sugoku genki desu arigatou"],["Prazer em conhecer você também.","Nice to meet you too.","私もよろしくお願いします","watashi mo yoroshiku onegaishimasu"]],[["Bom dia! Meu nome é...","Good morning! My name is...","おはようございます！私は...です","ohayou gozaimasu watashi wa desu"],["Olá! Eu sou...","Hello! I'm...","こんにちは！私は...です","konnichiwa watashi wa desu"],["Como você está? Estou bem.","How are you? I'm fine.","お元気ですか。元気です","ogenki desu ka genki desu"],["De onde você é? Eu sou do Brasil.","Where are you from? I'm from Brazil.","どこから来ましたか。ブラジルから来ました","doko kara kimashita ka burajiru kara kimashita"]],[["Olá! Meu nome é... Prazer em conhecer você.","Hello! My name is... Nice to meet you.","こんにちは！私は...です。はじめまして","konnichiwa watashi wa desu hajimemashite"],["Bom dia! Como você está?","Good morning! How are you?","おはようございます！お元気ですか","ohayou gozaimasu ogenki desu ka"],["Estou muito bem. E você?","I'm very well. And you?","とても元気です。あなたは","totemo genki desu anata wa"],["De onde você é?","Where are you from?","どこから来ましたか","doko kara kimashita ka"],["Prazer! Até mais!","Nice to meet you! See you!","はじめまして！またね","hajimemashite mata ne"]]];
function unit1Curriculum(lang: Language): Curriculum {
  return UNIT1_ROWS.map(phase => phase.map(([pt,en,ja,romaji]) => lang==="ja" ? [romaji,pt,romaji] : lang==="en" ? [en,pt] : [pt,en]) as LessonItem[]);
}
const UNIT1: Record<Language,Curriculum> = { pt:unit1Curriculum("pt"), en:unit1Curriculum("en"), ja:unit1Curriculum("ja") };


function normalizeGoal(value: string | null | undefined): GoalFamily {
  const v = (value ?? "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  if (v.includes("trabalh") || v.includes("profiss")) return "work";
  if (v.includes("mor") || v.includes("viver") || v.includes("resid")) return "live";
  if (v.includes("viaj") || v.includes("turis") || v.includes("passeio") || v.includes("ferias")) return "travel";
  return "general";
}

function levelOffset(level: Level): number {
  if (level === "basico") return 1;
  if (level === "intermediario") return 2;
  if (level === "avancado") return 3;
  return 0;
}

const CURRICULUM: Record<Language, Curriculum> = {
  ja: GOAL_CURRICULUM.ja.general,
  en: GOAL_CURRICULUM.en.general,
  pt: GOAL_CURRICULUM.pt.general,
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

function cumulativePool(lang: Language, phaseIdx: number, goal: string | null | undefined, level: Level = "iniciante"): LessonItem[] {
  if (phaseIdx < 10) return uniqueByTarget(UNIT1[lang].slice(0, phaseIdx + 1).flat());
  const family = normalizeGoal(goal); const curriculum = GOAL_CURRICULUM[lang][family];
  const offset = levelOffset(level); const unlockedThrough = Math.min(curriculum.length - 1, phaseIdx + offset);
  return uniqueByTarget(curriculum.slice(0, unlockedThrough + 1).flat());
}


function japaneseHiragana(item: LessonItem): string {
  const romaji = item[2] ?? item[0];
  const digraphs: Record<string, string> = {
    kya: "きゃ", kyu: "きゅ", kyo: "きょ", sha: "しゃ", shu: "しゅ", sho: "しょ",
    cha: "ちゃ", chu: "ちゅ", cho: "ちょ", nya: "にゃ", nyu: "にゅ", nyo: "にょ",
    hya: "ひゃ", hyu: "ひゅ", hyo: "ひょ", mya: "みゃ", myu: "みゅ", myo: "みょ",
    rya: "りゃ", ryu: "りゅ", ryo: "りょ", gya: "ぎゃ", gyu: "ぎゅ", gyo: "ぎょ",
    bya: "びゃ", byu: "びゅ", byo: "びょ", pya: "ぴゃ", pyu: "ぴゅ", pyo: "ぴょ",
    ja: "じゃ", ju: "じゅ", jo: "じょ", che: "ちぇ", she: "しぇ", je: "じぇ",
    wi: "うぃ", we: "うぇ", wo: "を",
  };
  const syllables: Record<string, string> = {
    a:"あ", i:"い", u:"う", e:"え", o:"お",
    ka:"か",ki:"き",ku:"く",ke:"け",ko:"こ", ga:"が",gi:"ぎ",gu:"ぐ",ge:"げ",go:"ご",
    sa:"さ",shi:"し",su:"す",se:"せ",so:"そ", za:"ざ",ji:"じ",zu:"ず",ze:"ぜ",zo:"ぞ",
    ta:"た",chi:"ち",tsu:"つ",te:"て",to:"と", da:"だ",de:"で",do:"ど",
    na:"な",ni:"に",nu:"ぬ",ne:"ね",no:"の", ha:"は",hi:"ひ",fu:"ふ",he:"へ",ho:"ほ",
    ba:"ば",bi:"び",bu:"ぶ",be:"べ",bo:"ぼ", pa:"ぱ",pi:"ぴ",pu:"ぷ",pe:"ぺ",po:"ぽ",
    ma:"ま",mi:"み",mu:"む",me:"め",mo:"も", ya:"や",yu:"ゆ",yo:"よ",
    ra:"ら",ri:"り",ru:"る",re:"れ",ro:"ろ", wa:"わ", n:"ん",
  };
  const text = romaji.toLowerCase().trim();
  let out = "";
  for (let i = 0; i < text.length;) {
    if (text[i] === " ") { out += " "; i++; continue; }
    if (i + 1 < text.length && text[i] === text[i + 1] && /[bcdfghjklmpqrstvwxyz]/.test(text[i])) {
      out += "っ"; i++; continue;
    }
    if (text[i] === "n" && (i + 1 === text.length || !/[aiueoyn]/.test(text[i + 1]))) {
      out += "ん"; i++; continue;
    }
    let matched = false;
    for (const key of Object.keys(digraphs).sort((a, b) => b.length - a.length)) {
      if (text.startsWith(key, i)) { out += digraphs[key]; i += key.length; matched = true; break; }
    }
    if (matched) continue;
    for (const key of Object.keys(syllables).sort((a, b) => b.length - a.length)) {
      if (text.startsWith(key, i)) { out += syllables[key]; i += key.length; matched = true; break; }
    }
    if (!matched) { out += text[i]; i++; }
  }
  return out;
}

function targetText(lang: Language, item: LessonItem): string {
  return lang === "ja" ? (item[2] ?? item[0]) : item[0];
}

function meaningText(item: LessonItem, ui: UiLang): string {
  return translate(item[1], ui);
}

function maxOptionsForPhase(phaseIdx: number): number {
  // The first three phases already have enough learned content to show
  // four answer choices without introducing future vocabulary.
  if (phaseIdx <= 2) return 4;
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

function phaseKinds(lang: Language, phaseIdx: number): TaskKind[] {
  const patterns: TaskKind[][] = [["choose","choose","choose","choose","match","complete","choose","match","complete","choose","match","choose","complete","choose","match","complete","choose","choose","match","choose"],["choose","choose","listen","choose","match","complete","choose","listen","match","complete","choose","match","choose","complete","listen","choose","match","complete","choose","match"],["choose","listen","choose","match","complete","choose","listen","match","choose","complete","choose","match","listen","choose","complete","match","choose","listen","complete","match"],["choose","choose","listen","match","complete","choose","match","listen","choose","complete","build","choose","match","complete","listen","build","choose","match","complete","choose"],["choose","listen","match","complete","choose","build","listen","match","choose","complete","build","choose","listen","match","complete","build","choose","match","listen","choose"],["choose","match","listen","complete","build","choose","listen","match","complete","build","choose","listen","match","complete","build","choose","match","listen","complete","build"],["choose","listen","match","build","complete","choose","build","listen","match","complete","choose","match","build","listen","complete","choose","build","match","listen","complete"],["choose","match","listen","complete","build","choose","listen","build","match","complete","choose","match","listen","build","complete","choose","build","match","listen","complete"],["choose","listen","match","build","complete","choose","match","listen","build","complete","choose","build","match","listen","complete","build","choose","match","listen","complete"],["choose","match","listen","build","complete","choose","listen","match","build","complete","choose","match","listen","build","complete","choose","build","match","listen","complete"]];
  const pattern=patterns[Math.min(phaseIdx,9)];
  return lang==="ja" && phaseIdx<5 ? pattern.map(k=>k==="listen" ? "choose" : k) : pattern;
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
  const japanese = lang === "ja" && phaseIdx < 10 ? japaneseHiragana(item) : lang === "ja" ? item[0] : undefined;
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

  return {
    kind: "choose",
    // Normal recognition tasks show the learned meaning first and four
    // learned target options in the first three phases.
    prompt: meaning,
    answer: target,
    options: pickOptions(target, targetPool, optionsCount),
    translation: meaning,
    romaji,
    japanese,
  };
}

const UNIT1_TITLES = [
 ["Primeiros cumprimentos","First greetings","最初のあいさつ"],["Despedidas e educação","Goodbyes and politeness","別れと丁寧な表現"],["Nome e apresentação","Names and introductions","名前と自己紹介"],["Como você está?","How are you?","元気ですか"],["Prazer em conhecer","Nice to meet you","はじめまして"],["Perguntas simples","Simple questions","簡単な質問"],["Pequenas conversas","Short conversations","短い会話"],["Situações práticas","Practical situations","実践的な場面"],["Revisão e combinação","Review and combination","復習と組み合わせ"],["Desafio da unidade","Unit challenge","ユニットチャレンジ"],
] as const;

function buildPhase(
  lang: Language,
  phaseIdx: number,
  _level: Level,
  goal: string,
  ui: UiLang,
): Phase {
  const pool = cumulativePool(lang, phaseIdx, goal, _level);
  const unitPhase = UNIT1[lang][phaseIdx] ?? [];

  // Keep lesson generation safe even if a future curriculum phase is empty.
  // Falling back to the last unlocked content prevents an invalid question
  // from reaching the lesson route and breaking the preview at runtime.
  if (pool.length === 0) {
    return buildPhase(lang, Math.max(0, phaseIdx - 1), _level, goal, ui);
  }

  // The current phase may only draw from content unlocked up to this phase.
  // Nothing from a future phase can leak into questions or distractors.
  const pattern = phaseKinds(lang, phaseIdx);
  const questions: Question[] = Array.from({ length: 20 }, (_, index) => {
    const early = unitPhase[index % Math.max(1, unitPhase.length)] ?? pool[0];
    const cumulative = pool[(index * 2 + phaseIdx) % pool.length];
    const item = index < 5 ? early : index < 10 && index % 2 === 0 ? early : cumulative;
    const kind = pattern[index];

    // Build only after short expressions have been unlocked. Earlier phases
    // stay focused on individual words and very small recognition tasks.
    if (kind === "listen") {
      // Listening tasks stay beginner-friendly: only individual words or
      // short two-word expressions already unlocked in the cumulative pool.
      const reviewCurriculum = UNIT1[lang];
      const reviewPool = uniqueByTarget(reviewCurriculum.slice(0, 5).flat());
      const learnedPool = reviewPool.length > 0 ? reviewPool : pool;
      const shortPool = learnedPool.filter((entry) => isShortListenItem(lang, entry));
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
    title: UNIT1_TITLES[phaseIdx] ? (ui === "en" ? UNIT1_TITLES[phaseIdx][1] : ui === "ja" ? UNIT1_TITLES[phaseIdx][2] : UNIT1_TITLES[phaseIdx][0]) : translateVars("Fase {n}", { n: phaseIdx + 1 }, ui),
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
  const normalizedLevel = normalizeLevel(level);
  return Array.from({ length: 10 }, (_, index) => buildPhase(lang, index, normalizedLevel, goal ?? "outro", ui));
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
