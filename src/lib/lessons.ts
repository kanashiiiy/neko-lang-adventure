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

type LessonItem = [target: string, meaning: string, romaji?: string, japanese?: string];
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

function rowsToCurriculum(rows: GoalRow[], lang: Language): Curriculum {
  const items = rows.map(([en, pt, _ja, romaji]) =>
    lang === "ja"
      ? ([romaji, pt, romaji] satisfies LessonItem)
      : lang === "en"
        ? ([en, pt] satisfies LessonItem)
        : ([pt, en] satisfies LessonItem)
  );
  return Array.from(
    { length: Math.ceil(items.length / 4) },
    (_, index) => items.slice(index * 4, index * 4 + 4),
  );
}

const GENERAL_GOAL_ROWS: GoalRow[] = [
  ...GOAL_ROWS.travel,
  ...GOAL_ROWS.live,
  ...GOAL_ROWS.work,
];

const GOAL_CURRICULUM: Record<Language, Record<GoalFamily, Curriculum>> = {
  pt: {
    travel: rowsToCurriculum(GOAL_ROWS.travel, "pt"),
    live: rowsToCurriculum(GOAL_ROWS.live, "pt"),
    work: rowsToCurriculum(GOAL_ROWS.work, "pt"),
    general: rowsToCurriculum(GENERAL_GOAL_ROWS, "pt"),
  },
  en: {
    travel: rowsToCurriculum(GOAL_ROWS.travel, "en"),
    live: rowsToCurriculum(GOAL_ROWS.live, "en"),
    work: rowsToCurriculum(GOAL_ROWS.work, "en"),
    general: rowsToCurriculum(GENERAL_GOAL_ROWS, "en"),
  },
  ja: {
    travel: rowsToCurriculum(GOAL_ROWS.travel, "ja"),
    live: rowsToCurriculum(GOAL_ROWS.live, "ja"),
    work: rowsToCurriculum(GOAL_ROWS.work, "ja"),
    general: rowsToCurriculum(GENERAL_GOAL_ROWS, "ja"),
  },
};

type Unit1Row = [pt:string,en:string,ja:string,romaji:string];
const UNIT1_ROWS: Unit1Row[][] = [
  [
    ["Oi", "Hi", "やあ", "yaa"],
    ["Bom dia", "Good morning", "おはようございます", "ohayou gozaimasu"],
    ["Boa tarde", "Good afternoon", "こんにちは", "konnichiwa"],
    ["Boa noite", "Good evening", "こんばんは", "konbanwa"],
    ["Até logo", "See you later", "またね", "mata ne"],
  ],
  [
    ["Obrigado", "Thank you", "ありがとう", "arigatou"],
    ["Muito obrigado", "Thank you very much", "どうもありがとうございます", "doumo arigatou gozaimasu"],
    ["De nada", "You're welcome", "どういたしまして", "douitashimashite"],
  ],
  [
    ["Desculpa", "Sorry", "ごめん", "gomen"],
    ["Desculpe", "I'm sorry", "すみません", "sumimasen"],
    ["Com licença", "Excuse me", "失礼します", "shitsurei shimasu"],
  ],
  [
    ["Tudo bem?", "How are you?", "元気ですか", "genki desu ka"],
    ["Como vai?", "How's it going?", "お元気ですか", "ogenki desu ka"],
    ["Estou bem.", "I'm fine.", "元気です", "genki desu"],
    ["E você?", "And you?", "あなたは？", "anata wa"],
  ],
  [
    ["Eu sou...", "I'm...", "私は...です", "watashi wa ... desu"],
    ["Meu nome é...", "My name is...", "私の名前は...です", "watashi no namae wa ... desu"],
    ["Prazer.", "Nice to meet you.", "はじめまして", "hajimemashite"],
    ["Prazer em conhecer.", "Nice to meet you.", "よろしくお願いします", "yoroshiku onegaishimasu"],
  ],
  [
    ["Tchau", "Bye", "バイバイ", "baibai"],
    ["Até logo", "See you later", "またね", "mata ne"],
    ["Até amanhã", "See you tomorrow", "また明日", "mata ashita"],
  ],
  [
    ["Oi", "Hi", "やあ", "yaa"],
    ["Tudo bem?", "How are you?", "元気ですか", "genki desu ka"],
    ["Estou bem.", "I'm fine.", "元気です", "genki desu"],
    ["Eu sou...", "I'm...", "私は...です", "watashi wa ... desu"],
    ["Meu nome é...", "My name is...", "私の名前は...です", "watashi no namae wa ... desu"],
    ["Prazer.", "Nice to meet you.", "はじめまして", "hajimemashite"],
    ["Obrigado", "Thank you", "ありがとう", "arigatou"],
    ["Desculpa", "Sorry", "ごめん", "gomen"],
    ["Com licença", "Excuse me", "失礼します", "shitsurei shimasu"],
    ["Tchau", "Bye", "バイバイ", "baibai"],
    ["Até logo", "See you later", "またね", "mata ne"],
    ["Até amanhã", "See you tomorrow", "また明日", "mata ashita"],
  ],
];

function unit1Curriculum(lang: Language): Curriculum {
  return UNIT1_ROWS.map(phase => phase.map(([pt,en,ja,romaji]) =>
    lang==="ja" ? [romaji,pt,romaji,ja] : lang==="en" ? [en,pt] : [pt,en]
  ) as LessonItem[]);
}
const UNIT1: Record<Language,Curriculum> = { pt:unit1Curriculum("pt"), en:unit1Curriculum("en"), ja:unit1Curriculum("ja") };


type Unit2Row = [pt:string,en:string,ja:string,romaji:string];
const UNIT2_ROWS: Unit2Row[][] = [
  [["Meu nome é...","My name is...","私の名前は...です","watashi no namae wa ... desu"],["Qual é o seu nome?","What's your name?","お名前は何ですか","onamae wa nan desu ka"],["Eu sou...","I'm...","私は...です","watashi wa ... desu"],["Prazer em conhecer você.","Nice to meet you.","はじめまして","hajimemashite"],["Prazer!","Nice to meet you!","よろしくお願いします","yoroshiku onegaishimasu"]],
  [["Eu sou do Brasil.","I'm from Brazil.","ブラジル出身です","burajiru shusshin desu"],["De onde você é?","Where are you from?","どこの出身ですか","doko no shusshin desu ka"],["Eu moro em...","I live in...","...に住んでいます","... ni sunde imasu"],["Onde você mora?","Where do you live?","どこに住んでいますか","doko ni sunde imasu ka"],["Eu moro aqui.","I live here.","ここに住んでいます","koko ni sunde imasu"]],
  [["Eu tenho 17 anos.","I'm 17 years old.","17歳です","juunanasai desu"],["Quantos anos você tem?","How old are you?","何歳ですか","nansai desu ka"],["Hoje tenho aula.","I have class today.","今日は授業があります","kyou wa jugyou ga arimasu"],["Eu estudo.","I study.","勉強しています","benkyou shite imasu"],["Você estuda?","Do you study?","勉強していますか","benkyou shite imasu ka"]],
  [["Eu trabalho.","I work.","働いています","hataraite imasu"],["Onde você trabalha?","Where do you work?","どこで働いていますか","doko de hataraite imasu ka"],["Eu trabalho em...","I work at...","...で働いています","... de hataraite imasu"],["Eu estudo e trabalho.","I study and work.","勉強と仕事をしています","benkyou to shigoto o shite imasu"],["O que você faz?","What do you do?","何をしていますか","nani o shite imasu ka"]],
  [["Minha família.","My family.","私の家族です","watashi no kazoku desu"],["Eu tenho um irmão.","I have a brother.","兄弟が一人います","kyoudai ga hitori imasu"],["Você tem irmãos?","Do you have siblings?","兄弟がいますか","kyoudai ga imasu ka"],["Minha mãe.","My mother.","私の母です","watashi no haha desu"],["Meu pai.","My father.","私の父です","watashi no chichi desu"]],
  [["Eu gosto de música.","I like music.","音楽が好きです","ongaku ga suki desu"],["Eu gosto de jogos.","I like games.","ゲームが好きです","geemu ga suki desu"],["O que você gosta?","What do you like?","何が好きですか","nani ga suki desu ka"],["Eu não gosto de...","I don't like...","...が好きではありません","... ga suki dewa arimasen"],["Meu hobby é...","My hobby is...","趣味は...です","shumi wa ... desu"]],
  [["Eu gosto de anime.","I like anime.","アニメが好きです","anime ga suki desu"],["Eu gosto de música e jogos.","I like music and games.","音楽とゲームが好きです","ongaku to geemu ga suki desu"],["O que você faz no tempo livre?","What do you do in your free time?","暇なときは何をしますか","hima na toki wa nani o shimasu ka"],["Eu assisto anime.","I watch anime.","アニメを見ます","anime o mimasu"],["Eu jogo.","I play games.","ゲームをします","geemu o shimasu"]],
  [["Esta é minha família.","This is my family.","これは私の家族です","kore wa watashi no kazoku desu"],["Este é meu amigo.","This is my friend.","これは私の友達です","kore wa watashi no tomodachi desu"],["Vou apresentar meu amigo.","I'll introduce my friend.","友達を紹介します","tomodachi o shoukai shimasu"],["Ele é meu amigo.","He is my friend.","彼は私の友達です","kare wa watashi no tomodachi desu"],["Ela é minha amiga.","She is my friend.","彼女は私の友達です","kanojo wa watashi no tomodachi desu"]],
  [["De onde você é e onde mora?","Where are you from and where do you live?","どこの出身で、どこに住んでいますか","doko no shusshin de doko ni sunde imasu ka"],["O que você gosta?","What do you like?","何が好きですか","nani ga suki desu ka"],["Você estuda ou trabalha?","Do you study or work?","勉強していますか、働いていますか","benkyou shite imasu ka hataraite imasu ka"],["Eu estudo e gosto de música.","I study and like music.","勉強していて、音楽が好きです","benkyou shite ite ongaku ga suki desu"],["Prazer em conhecer você. Até mais!","Nice to meet you. See you!","はじめまして。またね","hajimemashite mata ne"]],
  [["Olá! Meu nome é...","Hello! My name is...","こんにちは！私の名前は...です","konnichiwa watashi no namae wa ... desu"],["Eu sou do Brasil e moro em...","I'm from Brazil and I live in...","ブラジル出身で、...に住んでいます","burajiru shusshin de ... ni sunde imasu"],["Eu estudo e gosto de jogos.","I study and like games.","勉強していて、ゲームが好きです","benkyou shite ite geemu ga suki desu"],["Este é meu amigo. Prazer em conhecer você.","This is my friend. Nice to meet you.","これは私の友達です。はじめまして","kore wa watashi no tomodachi desu hajimemashite"],["Conte sobre você.","Tell me about yourself.","あなたについて話してください","anata ni tsuite hanashite kudasai"]]
];

function unit2Curriculum(lang: Language): Curriculum {
  return UNIT2_ROWS.map(phase => phase.map(([pt,en,ja,romaji]) =>
    lang === "ja" ? [romaji,pt,romaji] : lang === "en" ? [en,pt] : [pt,en]
  ) as LessonItem[]);
}
const UNIT2: Record<Language,Curriculum> = {
  pt: unit2Curriculum("pt"),
  en: unit2Curriculum("en"),
  ja: unit2Curriculum("ja"),
};

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
  ja: ["🌸","🍵","🐱","📖","🧩","🎧","🗣️","📚","🏠","❓","🛍️","🚆","💬","🔎","🎯"],
  en: ["👋","☕","🐱","📖","🧩","🎧","🗣️","📚","🏠","❓","🛍️","🚆","💬","🔎","🎯"],
  pt: ["👋","☕","🐱","📖","🧩","🎧","🗣️","📚","🏠","❓","🛍️","🚆","💬","🔎","🎯"],
};

const PHASE_XP = [18,20,22,24,26,28,30,32,35,38,40,42,44,46,48,50,52,54,56,60];

function shuffle<T>(items: T[]): T[] {
  return [...items].sort(() => Math.random() - 0.5);
}

function uniqueByTarget(items: LessonItem[]): LessonItem[] {
  return Array.from(new Map(items.map((item) => [item[0], item])).values());
}

function cumulativePool(lang: Language, phaseIdx: number, goal: string | null | undefined, level: Level = "iniciante"): LessonItem[] {
  if (phaseIdx < 7) return uniqueByTarget(UNIT1[lang][phaseIdx] ?? []);
  const section2Phase = phaseIdx - 7;
  const offset = levelOffset(level);
  const unit2Through = Math.min(
    UNIT2[lang].length - 1,
    section2Phase + Math.min(2, offset),
  );
  const section2Pool = UNIT2[lang].slice(0, unit2Through + 1);
  return uniqueByTarget(section2Pool.flat());
}


function japaneseHiragana(item: LessonItem): string {
  if (item[3]) return item[3];
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

function audioText(lang: Language, item: LessonItem): string {
  return lang === "ja" ? (item[3] ?? item[0]) : item[0];
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

function phaseKinds(_lang: Language, _phaseIdx: number): TaskKind[] {
  const normal: TaskKind[] = [
    "choose", "listen", "choose", "match", "complete",
    "choose", "listen", "match", "choose", "complete", "listen",
  ];
  const harderByPhase: TaskKind[][] = [
    ["choose", "listen", "match", "build"],
    ["choose", "listen", "build", "match"],
    ["choose", "listen", "match", "build"],
    ["choose", "listen", "match", "build"],
    ["choose", "listen", "match", "build"],
    ["choose", "listen", "match", "build"],
    ["choose", "listen", "match", "build"],
  ];
  const hard = harderByPhase[Math.min(_phaseIdx, harderByPhase.length - 1)];
  return [...normal, ...hard];
}

function buildHardPrompt(phaseIdx: number, kind: TaskKind, ui: UiLang): string {
  const prompts = [
    "Agora aplique os cumprimentos em uma situação.",
    "Agora escolha a expressão certa para agradecer.",
    "Agora escolha a expressão certa para pedir desculpas ou licença.",
    "Agora combine as expressões em uma interação curta.",
    "Agora use a apresentação em uma situação simples.",
    "Agora escolha a despedida que combina com a situação.",
    "Agora combine o que você aprendeu em uma pequena conversa.",
  ];
  const base = translate(prompts[Math.min(phaseIdx, prompts.length - 1)], ui);
  if (kind === "listen") return translate("Ouça e identifique a expressão na situação.", ui);
  if (kind === "match") return translate("Associe as expressões às situações corretas.", ui);
  if (kind === "build") return translate("Monte a expressão correta com o que você aprendeu.", ui);
  return base;
}

function buildPhase(
  lang: Language,
  phaseIdx: number,
  _level: Level,
  goal: string,
  ui: UiLang,
): Phase {
  const pool = cumulativePool(lang, phaseIdx, goal, _level);
  const unitPhase = phaseIdx < 7
    ? (UNIT1[lang][phaseIdx] ?? [])
    : (UNIT2[lang][phaseIdx - 7] ?? []);

  if (pool.length === 0) {
    return buildPhase(lang, Math.max(0, phaseIdx - 1), _level, goal, ui);
  }

  const pattern = phaseKinds(lang, phaseIdx);
  const questions: Question[] = Array.from({ length: 15 }, (_, index) => {
    const isHard = index >= 11;
    const currentItem = unitPhase[index % Math.max(1, unitPhase.length)] ?? pool[0];
    const cumulative = pool[(index * 3 + phaseIdx) % pool.length];
    const item = phaseIdx === 6
      ? (index < unitPhase.length ? currentItem : cumulative)
      : currentItem;
    const kind = pattern[index];

    const question = (() => {
      if (kind === "listen") {
        const maxWords = phaseIdx <= 1 ? 3 : phaseIdx <= 5 ? 5 : 7;
        const shortPool = pool.filter((entry) => tokenizeBuild(targetText(lang, entry)).length <= maxWords);
        const listenItem = shortPool.length > 0
          ? shortPool[(index + phaseIdx) % shortPool.length]
          : item;
        return makeQuestion(lang, listenItem, "listen", phaseIdx, pool, ui, index);
      }

      if (kind === "build") {
        const buildable = pool.filter((entry) => {
          const words = tokenizeBuild(targetText(lang, entry));
          return words.length >= 2 && words.length <= 5;
        });
        const buildItem = buildable.length > 0
          ? buildable[(index + phaseIdx) % buildable.length]
          : item;
        return makeQuestion(lang, buildItem, "build", phaseIdx, pool, ui, index);
      }

      return makeQuestion(lang, item, kind, phaseIdx, pool, ui, index);
    })();

    if (isHard) {
      question.prompt = buildHardPrompt(phaseIdx, kind, ui);
    }

    return question;
  });

  return {
    id: `${lang}-phase-${phaseIdx + 1}`,
    title: (phaseIdx < 7 ? UNIT1_TITLES[phaseIdx] : SECTION2_TITLES[phaseIdx - 7])
      ? (ui === "en"
        ? (phaseIdx < 7 ? UNIT1_TITLES[phaseIdx][1] : SECTION2_TITLES[phaseIdx - 7][1])
        : ui === "ja"
          ? (phaseIdx < 7 ? UNIT1_TITLES[phaseIdx][2] : SECTION2_TITLES[phaseIdx - 7][2])
          : (phaseIdx < 7 ? UNIT1_TITLES[phaseIdx][0] : SECTION2_TITLES[phaseIdx - 7][0]))
      : translateVars("Fase {n}", { n: phaseIdx + 1 }, ui),
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
  return Array.from({ length: 15 }, (_, index) => buildPhase(lang, index, normalizedLevel, goal ?? "outro", ui));
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
