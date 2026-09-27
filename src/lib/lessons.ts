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
  [["Oi","Hi","こんにちは","konnichiwa"],["Bom dia","Good morning","おはようございます","ohayou gozaimasu"],["Boa tarde","Good afternoon","こんにちは","konnichiwa"],["Boa noite","Good evening","こんばんは","konbanwa"],["Até logo","See you later","また後で","mata ato"]],
  [["Obrigado","Thank you","ありがとう","arigatou"],["Muito obrigado","Thank you very much","どうもありがとうございます","doumo arigatou gozaimasu"],["De nada","You're welcome","どういたしまして","douitashimashite"]],
  [["Desculpa","Sorry","ごめんなさい","gomennasai"],["Desculpe","I'm sorry","すみません","sumimasen"],["Com licença","Excuse me","失礼します","shitsurei shimasu"]],
  [["Tudo bem?","Are you okay?","大丈夫ですか","daijoubu desu ka"],["Como vai?","How are you?","お元気ですか","ogenki desu ka"],["Estou bem.","I'm fine.","元気です","genki desu"],["E você?","And you?","あなたは？","anata wa"]],
  [["Eu sou...","I'm...","私は…です","watashi wa ... desu"],["Meu nome é...","My name is...","私の名前は…です","watashi no namae wa ... desu"],["Prazer.","Nice to meet you.","はじめまして","hajimemashite"],["Prazer em conhecer.","Nice to meet you.","お会いできてうれしいです","oai dekite ureshii desu"]],
  [["Tchau","Bye","じゃあね","jaa ne"],["Até logo","See you later","また後で","mata ato"],["Até amanhã","See you tomorrow","また明日","mata ashita"]],
  [["Oi","Hi","こんにちは","konnichiwa"],["Como você está?","How are you?","お元気ですか","ogenki desu ka"],["Estou bem.","I'm fine.","元気です","genki desu"],["Meu nome é...","My name is...","私の名前は…です","watashi no namae wa ... desu"],["Obrigado","Thank you","ありがとう","arigatou"],["De nada","You're welcome","どういたしまして","douitashimashite"],["Até logo","See you later","また後で","mata ato"],["Tchau","Bye","じゃあね","jaa ne"]],
];

function unit1Curriculum(lang: Language): Curriculum {
  return UNIT1_ROWS.map((phase) => phase.map(([pt,en,ja,romaji]) =>
    lang === "ja" ? [romaji,pt,romaji,ja] : lang === "en" ? [en,pt] : [pt,en]
  ) as LessonItem[]);
}
const UNIT1: Record<Language,Curriculum> = { pt:unit1Curriculum("pt"), en:unit1Curriculum("en"), ja:unit1Curriculum("ja") };
const SECTION1_ROWS = UNIT1_ROWS;
const SECTION1: Record<Language,Curriculum> = UNIT1;

const SECTION2_ROWS: Unit1Row[][] = [
  // Unidade 2 — Sobre você e apresentação pessoal
  [
    ["Meu nome é Ana.","My name is Ana.","私はアナです","watashi wa ana desu"],
    ["Eu sou o Leo.","I'm Leo.","レオです","reo desu"],
    ["Qual é o seu nome?","What's your name?","お名前は何ですか","onamae wa nan desu ka"],
    ["Como você se chama?","What's your name?","お名前は？","onamae wa"],
    ["Prazer em conhecer você.","Nice to meet you.","はじめまして","hajimemashite"],
    ["Igualmente.","Likewise.","こちらこそ","kochira koso"],
    ["Este é o Ken.","This is Ken.","こちらはケンです","kochira wa ken desu"],
    ["Esta é a Ana.","This is Ana.","こちらはアナです","kochira wa ana desu"],
  ],
  [
    ["Eu sou do Brasil.","I'm from Brazil.","ブラジル出身です","burajiru shusshin desu"],
    ["De onde você é?","Where are you from?","どちらの出身ですか","dochira no shusshin desu ka"],
    ["Eu sou do Japão.","I'm from Japan.","日本出身です","nihon shusshin desu"],
    ["Você é do Brasil?","Are you from Brazil?","ブラジル出身ですか","burajiru shusshin desu ka"],
    ["Eu sou de Portugal.","I'm from Portugal.","ポルトガル出身です","porutogaru shusshin desu"],
    ["De que país você é?","Which country are you from?","どこの国の出身ですか","doko no kuni no shusshin desu ka"],
    ["Sou brasileiro(a).","I'm Brazilian.","ブラジル人です","burajirujin desu"],
    ["Sou japonês/japonesa.","I'm Japanese.","日本人です","nihonjin desu"],
  ],
  [
    ["Eu moro em Belém.","I live in Belém.","ベレンに住んでいます","beren ni sunde imasu"],
    ["Onde você mora?","Where do you live?","どこに住んでいますか","doko ni sunde imasu ka"],
    ["Eu moro no Brasil.","I live in Brazil.","ブラジルに住んでいます","burajiru ni sunde imasu"],
    ["Eu moro em Tóquio.","I live in Tokyo.","東京に住んでいます","toukyou ni sunde imasu"],
    ["Qual cidade você mora?","Which city do you live in?","どの町に住んでいますか","dono machi ni sunde imasu ka"],
    ["Minha cidade é pequena.","My city is small.","私の町は小さいです","watashi no machi wa chiisai desu"],
    ["Minha cidade é grande.","My city is big.","私の町は大きいです","watashi no machi wa ookii desu"],
    ["Eu moro perto da escola.","I live near the school.","学校の近くに住んでいます","gakkou no chikaku ni sunde imasu"],
  ],
  [
    ["Eu tenho 17 anos.","I'm 17 years old.","17歳です","juunana sai desu"],
    ["Quantos anos você tem?","How old are you?","何歳ですか","nan sai desu ka"],
    ["Eu tenho 20 anos.","I'm 20 years old.","20歳です","hatachi desu"],
    ["Ela tem 18 anos.","She is 18 years old.","彼女は18歳です","kanojo wa juuhassai desu"],
    ["Ele tem 21 anos.","He is 21 years old.","彼は21歳です","kare wa nijuuissai desu"],
    ["Minha idade é 20 anos.","My age is 20.","私の年齢は20歳です","watashi no nenrei wa hatachi desu"],
    ["Você tem quantos anos?","How old are you?","あなたは何歳ですか","anata wa nan sai desu ka"],
    ["Tenho 18 anos.","I'm 18 years old.","18歳です","juuhassai desu"],
  ],
  [
    ["Eu tenho uma irmã.","I have a sister.","妹がいます","imouto ga imasu"],
    ["Você tem irmãos?","Do you have siblings?","きょうだいがいますか","kyoudai ga imasu ka"],
    ["Eu tenho um irmão.","I have a brother.","兄がいます","ani ga imasu"],
    ["Tenho dois irmãos.","I have two siblings.","きょうだいが二人います","kyoudai ga futari imasu"],
    ["Minha família é pequena.","My family is small.","私の家族は小さいです","watashi no kazoku wa chiisai desu"],
    ["Minha família é grande.","My family is big.","私の家族は大きいです","watashi no kazoku wa ookii desu"],
    ["Esta é minha mãe.","This is my mother.","こちらは母です","kochira wa haha desu"],
    ["Este é meu pai.","This is my father.","こちらは父です","kochira wa chichi desu"],
  ],
  [
    ["Eu sou estudante.","I'm a student.","学生です","gakusei desu"],
    ["Você é estudante?","Are you a student?","学生ですか","gakusei desu ka"],
    ["Eu estudo na escola.","I study at school.","学校で勉強しています","gakkou de benkyou shite imasu"],
    ["O que você estuda?","What do you study?","何を勉強していますか","nani o benkyou shite imasu ka"],
    ["Eu estudo inglês.","I study English.","英語を勉強しています","eigo o benkyou shite imasu"],
    ["Eu estudo japonês.","I study Japanese.","日本語を勉強しています","nihongo o benkyou shite imasu"],
    ["Eu trabalho aqui.","I work here.","ここで働いています","koko de hataraite imasu"],
    ["Você trabalha?","Do you work?","働いていますか","hataraite imasu ka"],
  ],
  [
    ["Eu gosto de música.","I like music.","音楽が好きです","ongaku ga suki desu"],
    ["Você gosta de música?","Do you like music?","音楽が好きですか","ongaku ga suki desu ka"],
    ["Eu gosto de jogos.","I like games.","ゲームが好きです","geemu ga suki desu"],
    ["Eu gosto de anime.","I like anime.","アニメが好きです","anime ga suki desu"],
    ["Eu não gosto de café.","I don't like coffee.","コーヒーが好きではありません","koohii ga suki dewa arimasen"],
    ["Do que você gosta?","What do you like?","何が好きですか","nani ga suki desu ka"],
    ["Eu gosto de ler.","I like reading.","読むことが好きです","yomu koto ga suki desu"],
    ["Eu gosto de ouvir música.","I like listening to music.","音楽を聞くことが好きです","ongaku o kiku koto ga suki desu"],
  ],
  [
    ["Meu hobby é jogar.","My hobby is playing games.","趣味はゲームをすることです","shumi wa geemu o suru koto desu"],
    ["Qual é o seu hobby?","What is your hobby?","趣味は何ですか","shumi wa nan desu ka"],
    ["Eu gosto de desenhar.","I like drawing.","絵を描くことが好きです","e o kaku koto ga suki desu"],
    ["Eu gosto de assistir anime.","I like watching anime.","アニメを見ることが好きです","anime o miru koto ga suki desu"],
    ["Eu jogo nas horas vagas.","I play games in my free time.","暇なときにゲームをします","hima na toki ni geemu o shimasu"],
    ["O que você faz no tempo livre?","What do you do in your free time?","暇なときは何をしますか","hima na toki wa nani o shimasu ka"],
    ["Eu estudo e ouço música.","I study and listen to music.","勉強して、音楽を聞きます","benkyou shite ongaku o kikimasu"],
    ["Eu gosto de filmes e jogos.","I like movies and games.","映画とゲームが好きです","eiga to geemu ga suki desu"],
  ],
  [
    ["Olá, meu nome é Ana.","Hello, my name is Ana.","こんにちは、私はアナです","konnichiwa watashi wa ana desu"],
    ["Eu sou do Brasil e moro em Belém.","I'm from Brazil and live in Belém.","ブラジル出身で、ベレンに住んでいます","burajiru shusshin de beren ni sunde imasu"],
    ["Eu tenho 20 anos e sou estudante.","I'm 20 years old and a student.","20歳で、学生です","hatachi de gakusei desu"],
    ["Eu gosto de música e jogos.","I like music and games.","音楽とゲームが好きです","ongaku to geemu ga suki desu"],
    ["Este é meu amigo Ken.","This is my friend Ken.","こちらは友達のケンです","kochira wa tomodachi no ken desu"],
    ["Ele é do Japão e mora em Tóquio.","He is from Japan and lives in Tokyo.","彼は日本出身で、東京に住んでいます","kare wa nihon shusshin de toukyou ni sunde imasu"],
    ["Ele gosta de anime.","He likes anime.","彼はアニメが好きです","kare wa anime ga suki desu"],
    ["Prazer em conhecer vocês.","Nice to meet you both.","お二人にお会いできてうれしいです","ofutari ni oai dekite ureshii desu"],
  ],
  [
    ["— Qual é o seu nome? — Meu nome é Ana.","— What's your name? — My name is Ana.","— お名前は何ですか。— 私はアナです。","— onamae wa nan desu ka — watashi wa ana desu"],
    ["— De onde você é? — Sou do Brasil.","— Where are you from? — I'm from Brazil.","— どちらの出身ですか。— ブラジル出身です。","— dochira no shusshin desu ka — burajiru shusshin desu"],
    ["— Onde você mora? — Moro em Belém.","— Where do you live? — I live in Belém.","— どこに住んでいますか。— ベレンに住んでいます。","— doko ni sunde imasu ka — beren ni sunde imasu"],
    ["— Você estuda? — Sim, eu estudo japonês.","— Do you study? — Yes, I study Japanese.","— 勉強していますか。— はい、日本語を勉強しています。","— benkyou shite imasu ka — hai nihongo o benkyou shite imasu"],
    ["— Do que você gosta? — Gosto de música.","— What do you like? — I like music.","— 何が好きですか。— 音楽が好きです。","— nani ga suki desu ka — ongaku ga suki desu"],
    ["— Você tem irmãos? — Sim, tenho uma irmã.","— Do you have siblings? — Yes, I have a sister.","— きょうだいがいますか。— はい、妹がいます。","— kyoudai ga imasu ka — hai imouto ga imasu"],
    ["— Qual é o seu hobby? — Gosto de desenhar.","— What's your hobby? — I like drawing.","— 趣味は何ですか。— 絵を描くことが好きです。","— shumi wa nan desu ka — e o kaku koto ga suki desu"],
    ["Foi bom conversar com você.","It was nice talking with you.","お話しできてよかったです","ohanashi dekite yokatta desu"],
  ],
];

const SECTION2: Record<Language, Curriculum> = {
  pt: SECTION2_ROWS.map(phase => phase.map(([pt,en]) => [pt,en] as LessonItem)),
  en: SECTION2_ROWS.map(phase => phase.map(([pt,en]) => [en,pt] as LessonItem)),
  ja: SECTION2_ROWS.map(phase => phase.map(([pt,en,ja,romaji]) => [romaji,pt,romaji,ja] as LessonItem)),
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
  ja: ["🌸","🍵","🐱","📖","🧩","🎧","🗣️","✍️","🌟","🏆","📚","🏠","❓","🛍️","🚆","💬","🔎","📝","🔗","🎯"],
  en: ["👋","☕","🐱","📖","🧩","🎧","🗣️","✍️","🌟","🏆","📚","🏠","❓","🛍️","🚆","💬","🔎","📝","🔗","🎯"],
  pt: ["👋","☕","🐱","📖","🧩","🎧","🗣️","✍️","🌟","🏆","📚","🏠","❓","🛍️","🚆","💬","🔎","📝","🔗","🎯"],
};

const PHASE_XP = [18,20,22,24,26,28,30,32,35,38,40,42,44,46,48,50,52,54,56,60];

function shuffle<T>(items: T[]): T[] {
  return [...items].sort(() => Math.random() - 0.5);
}

function uniqueByTarget(items: LessonItem[]): LessonItem[] {
  return Array.from(new Map(items.map((item) => [item[0], item])).values());
}

function cumulativePool(lang: Language, phaseIdx: number, goal: string | null | undefined, level: Level = "iniciante"): LessonItem[] {
  if (phaseIdx < 7) return uniqueByTarget(SECTION1[lang][phaseIdx] ?? []);
  const family = normalizeGoal(goal);
  const curriculum = [...SECTION2[lang], ...GOAL_CURRICULUM[lang][family]];
  const section2Phase = phaseIdx - 7;
  const offset = levelOffset(level);
  const unlockedThrough = Math.min(curriculum.length - 1, (section2Phase + 1) * 4 - 1 + offset);
  return uniqueByTarget(curriculum.slice(0, unlockedThrough + 1).flat());
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

const UNIT1_PHASE_KINDS: TaskKind[][] = [
 ["choose","listen","choose","match","complete","choose","listen","match","choose","complete","listen","listen","match","choose","complete"],
 ["choose","listen","match","choose","complete","listen","choose","match","complete","choose","listen","match","choose","complete","listen"],
 ["choose","listen","match","complete","choose","listen","match","choose","complete","listen","choose","match","complete","choose","listen"],
 ["choose","listen","match","complete","choose","speak","listen","match","complete","choose","listen","match","complete","choose","speak"],
 ["choose","listen","match","complete","choose","speak","listen","match","choose","complete","listen","match","choose","complete","speak"],
 ["choose","listen","match","complete","build","choose","listen","match","complete","choose","build","listen","match","complete","choose"],
 ["choose","listen","match","complete","build","speak","listen","match","complete","build","choose","listen","match","complete","speak"],
];
function phaseKinds(lang: Language, phaseIdx: number): TaskKind[] {
  if (phaseIdx < 7) return UNIT1_PHASE_KINDS[phaseIdx] ?? UNIT1_PHASE_KINDS[0];
  const patterns: TaskKind[][] = [
    ["choose","choose","listen","match","complete","choose","listen","match","choose","complete","choose","listen","match","complete","choose","match","listen","choose","complete","match"],
    ["choose","listen","choose","match","complete","choose","listen","match","choose","complete","speak","match","listen","choose","complete","choose","match","listen","complete","speak"],
    ["choose","listen","match","complete","choose","speak","listen","match","choose","complete","build","choose","match","listen","complete","speak","choose","build","match","complete"],
    ["choose","listen","match","complete","speak","choose","match","listen","build","complete","choose","speak","match","complete","listen","build","choose","match","complete","listen"],
    ["choose","listen","match","complete","build","speak","listen","match","choose","complete","build","choose","listen","match","complete","speak","choose","build","listen","match"],
    ["choose","match","listen","complete","build","speak","listen","match","complete","build","choose","listen","match","speak","build","choose","match","listen","complete","build"],
    ["choose","listen","match","build","complete","speak","build","listen","match","complete","choose","match","build","listen","complete","speak","build","match","listen","complete"],
    ["choose","match","listen","complete","build","speak","listen","build","match","complete","choose","match","listen","build","complete","speak","build","match","listen","complete"],
    ["choose","listen","match","build","complete","speak","match","listen","build","complete","choose","build","match","listen","complete","speak","choose","match","listen","build"],
    ["choose","match","listen","build","complete","speak","listen","match","build","complete","choose","match","listen","build","complete","speak","build","match","listen","complete"],
  ];
  return patterns[Math.min(phaseIdx - 7, 9)];
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
    audio: audioText(lang, item),
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
  const japanese = lang === "ja" && phaseIdx >= 7 ? item[0] : undefined;
  const romaji = lang === "ja" ? item[2] : undefined;

  if (kind === "listen") {
    return {
      kind: "listen",
      prompt: translate("Ouça o áudio e escolha o significado correto", ui),
      audio: audioText(lang, item),
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
      audio: audioText(lang, item),
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
      audio: audioText(lang, item),
      answer: audioText(lang, item),
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
 ["Cumprimentos","Greetings","あいさつ"],
 ["Agradecimentos","Thanks","感謝"],
 ["Desculpas e licença","Apologies and excuse me","謝罪と許可"],
 ["Como você está?","How are you?","元気ですか"],
 ["Apresentação simples","Simple introduction","簡単な自己紹介"],
 ["Despedidas","Goodbyes","別れのあいさつ"],
 ["Primeira conversa","First conversation","はじめての会話"],
] as const;

const SECTION2_TITLES = [
  ["Sobre você e seu nome","About you and your name","あなたと名前"],
  ["Origem e país","Origin and country","出身と国"],
  ["Cidade e onde você mora","City and where you live","町と住んでいる場所"],
  ["Idade","Age","年齢"],
  ["Família","Family","家族"],
  ["Estudos e trabalho","Studies and work","勉強と仕事"],
  ["Gostos e preferências","Likes and preferences","好きなものと好み"],
  ["Hobbies e interesses","Hobbies and interests","趣味と興味"],
  ["Pequenas apresentações","Short introductions","簡単な自己紹介"],
  ["Conversas sobre você","Conversations about you","あなたについての会話"],
] as const;

function makeDifficultyQuestion(lang: Language, phaseIdx: number, challengeIndex: number, item: LessonItem, pool: LessonItem[], ui: UiLang): Question {
  const target = targetText(lang, item);
  const meaning = meaningText(item, ui);
  const targetPool = pool.map((entry) => targetText(lang, entry));
  const meaningPool = pool.map((entry) => meaningText(entry, ui));
  const contexts = [
    [
      "🌅 Você encontra alguém pela manhã. Qual cumprimento combina com a situação?",
      "🔊 Qual expressão você ouviu?",
      "👋 Você terminou a conversa e está indo embora. Qual expressão combina?",
      "🌅 Você encontra seu amigo pela manhã. Depois vocês terminam a conversa e você vai embora.",
    ],
    [
      "🙏 Alguém ajudou você. Qual expressão você usa para agradecer?",
      "🔊 Qual expressão de agradecimento você ouviu?",
      "😊 Alguém diz que não há problema depois que você agradece. Qual resposta combina?",
      "🙏 Você agradece a alguém e a pessoa responde de forma educada.",
    ],
    [
      "🙇 Você cometeu um pequeno erro. Qual expressão combina com a situação?",
      "🔊 Qual expressão de desculpa você ouviu?",
      "🚶 Você precisa chamar a atenção de alguém com educação. Qual expressão combina?",
      "🙇 Você precisa pedir desculpa e depois pedir licença.",
    ],
    [
      "🙂 Você encontra alguém e quer perguntar se está tudo bem. Qual expressão combina?",
      "🔊 Qual pergunta sobre como alguém está você ouviu?",
      "😊 A pessoa pergunta como você está e você responde que está bem.",
      "🙂 Você pergunta como a pessoa está e depois responde que está bem.",
    ],
    [
      "👋 Você acabou de conhecer alguém. Qual expressão de apresentação combina?",
      "🔊 Qual expressão de apresentação você ouviu?",
      "🤝 Você acabou de conhecer alguém e quer dizer que foi um prazer.",
      "👋 Você se apresenta e depois diz que foi um prazer conhecer a pessoa.",
    ],
    [
      "👋 Você terminou uma conversa. Qual despedida combina?",
      "🔊 Qual despedida você ouviu?",
      "🌙 Você vai se despedir e sabe que verá a pessoa amanhã. Qual expressão combina?",
      "👋 Você se despede agora e diz que verá a pessoa amanhã.",
    ],
    [
      "🗣️ Você encontra alguém, cumprimenta e pergunta como está. Qual sequência combina?",
      "🔊 Qual expressão desta pequena conversa você ouviu?",
      "👋 A conversa terminou. Qual despedida combina?",
      "🗣️ Você cumprimenta, pergunta como a pessoa está, agradece e se despede.",
    ],
  ][phaseIdx];

  if (challengeIndex === 1) {
    return {
      kind: "listen",
      prompt: translate(contexts[1], ui),
      audio: audioText(lang, item),
      answer: meaning,
      options: pickOptions(meaning, meaningPool, 4),
      translation: meaning,
      romaji: lang === "ja" ? item[2] : undefined,
      reveal: { translation: meaning, romaji: lang === "ja" ? item[2] : undefined, japanese: lang === "ja" ? (item[3] ?? item[0]) : undefined },
    };
  }

  if (challengeIndex === 3) {
    const sequences = [
      ["ohayou gozaimasu → mata ato", "Good morning → See you later", "Bom dia → Até logo"],
      ["arigatou → douitashimashite", "Thank you → You're welcome", "Obrigado → De nada"],
      ["gomennasai → sumimasen", "Sorry → Excuse me", "Desculpa → Com licença"],
      ["daijoubu desu ka → genki desu", "Are you okay? → I'm fine.", "Tudo bem? → Estou bem."],
      ["watashi wa ... desu → hajimemashite", "I'm... → Nice to meet you.", "Eu sou... → Prazer."],
      ["jaa ne → mata ashita", "Bye → See you tomorrow", "Tchau → Até amanhã"],
      ["konnichiwa → ogenki desu ka → arigatou → jaa ne", "Hi → How are you? → Thank you → Bye", "Oi → Como você está? → Obrigado → Tchau"],
    ][phaseIdx];
    const answer = lang === "ja" ? sequences[0] : lang === "en" ? sequences[1] : sequences[2];
    const distractors = targetPool.filter((value) => value !== answer).slice(0, 3);
    return {
      kind: "choose",
      prompt: translate(contexts[3], ui),
      answer,
      options: shuffle([answer, ...distractors]).slice(0, 4),
      translation: meaning,
      romaji: lang === "ja" ? item[2] : undefined,
    };
  }

  const preferred = phaseIdx === 0 && challengeIndex === 0 ? "ohayou gozaimasu"
    : phaseIdx === 0 && challengeIndex === 2 ? "mata ato"
    : target;
  return {
    kind: "choose",
    prompt: translate(challengeIndex === 0 ? contexts[0] : contexts[2], ui),
    answer: preferred,
    options: pickOptions(preferred, targetPool, 4),
    translation: meaning,
    romaji: lang === "ja" ? item[2] : undefined,
  };
}

function buildPhase(
  lang: Language,
  phaseIdx: number,
  _level: Level,
  goal: string,
  ui: UiLang,
): Phase {
  const isUnit1 = phaseIdx < 7;
  const pool = cumulativePool(lang, phaseIdx, goal, _level);
  const unitPhase = isUnit1 ? (SECTION1[lang][phaseIdx] ?? []) : (SECTION2[lang][phaseIdx - 7] ?? []);
  const pattern = phaseKinds(lang, phaseIdx);
  const totalQuestions = isUnit1 ? 15 : 20;
  if (pool.length === 0 || unitPhase.length === 0) throw new Error("Currículo vazio para a fase " + (phaseIdx + 1));

  const questions: Question[] = Array.from({ length: totalQuestions }, (_, index) => {
    const currentItem = unitPhase[index % unitPhase.length] ?? pool[0];
    const isDifficulty = isUnit1 && index >= 11;
    const item = isUnit1 ? currentItem : index < unitPhase.length ? currentItem : (index - unitPhase.length) % 2 === 0 ? currentItem : pool[(index * 3 + phaseIdx) % pool.length];
    if (isDifficulty) return makeDifficultyQuestion(lang, phaseIdx, index - 11, item, unitPhase, ui);

    let kind = pattern[index];

    if (kind === "listen") {
      const maxWords = isUnit1 ? 4 : phaseIdx <= 8 ? 3 : phaseIdx <= 11 ? 5 : phaseIdx <= 14 ? 7 : 12;
      const shortPool = pool.filter((entry) => tokenizeBuild(targetText(lang, entry)).length <= maxWords);
      const listenItem = shortPool.length ? shortPool[(index + phaseIdx) % shortPool.length] : item;
      const question = makeQuestion(lang, listenItem, "listen", phaseIdx, pool, ui, index);
      if (isDifficulty) question.prompt = translate(lang === "en" ? "Which expression did you hear?" : "Qual expressão você ouviu?", ui);
      return question;
    }
    if (kind === "build" && isUnit1 && phaseIdx < 5) kind = "choose";
    if (kind === "build") {
      const buildable = pool.filter((entry) => {
        const count = tokenizeBuild(targetText(lang, entry)).length;
        return count >= 2 && count <= 5;
      });
      const buildItem = buildable.length ? buildable[(index + phaseIdx) % buildable.length] : item;
      return makeQuestion(lang, buildItem, "build", phaseIdx, pool, ui, index);
    }
    return makeQuestion(lang, item, kind, phaseIdx, pool, ui, index);
  });

  return {
    id: `${lang}-phase-${phaseIdx + 1}`,
    title: (() => {
      const row = isUnit1 ? UNIT1_TITLES[phaseIdx] : SECTION2_TITLES[phaseIdx - 7];
      return row ? (ui === "en" ? row[1] : ui === "ja" ? row[2] : row[0]) : translateVars("Fase {n}", { n: phaseIdx + 1 }, ui);
    })(),
    icon: isUnit1 ? ICONS[lang][phaseIdx] : ICONS[lang][phaseIdx + 3],
    xp: isUnit1 ? PHASE_XP[phaseIdx] : PHASE_XP[phaseIdx + 3],
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
  return Array.from({ length: 17 }, (_, index) => buildPhase(lang, index, normalizedLevel, goal ?? "outro", ui));
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
