// Diálogos do Dia a Dia — conteúdo Premium Plus.
// Cada frase guarda o texto nos três idiomas de aprendizado (pt/en/ja) + romaji.
// A interface (categorias, botões, explicações) é traduzida pelo i18n normal.

export type LearnLang = "pt" | "en" | "ja";

/** [pt, en, ja, romaji, chave de uso, índice da resposta no diálogo de exemplo] */
type Row = [string, string, string, string, UseKey, number];

export type UseKey =
  | "informal"
  | "formal"
  | "abrir"
  | "fechar"
  | "pedir"
  | "agradecer"
  | "informacao"
  | "apresentar"
  | "urgente"
  | "comum";

export const USE_TEXT: Record<UseKey, string> = {
  informal: "Use em situações informais, com amigos e família.",
  formal: "Use em situações formais ou com pessoas que você não conhece.",
  abrir: "Use para iniciar uma conversa.",
  fechar: "Use para encerrar uma conversa.",
  pedir: "Use para pedir algo com educação.",
  agradecer: "Use para agradecer.",
  informacao: "Use para pedir uma informação.",
  apresentar: "Use para se apresentar.",
  urgente: "Use em emergências ou situações urgentes.",
  comum: "Use no dia a dia, em praticamente qualquer situação.",
};

export interface Phrase {
  id: string;
  text: Record<LearnLang, string>;
  romaji: string;
  use: UseKey;
  reply: number;
}

export interface DialogCategory {
  id: string;
  emoji: string;
  /** Nome em português — passa pelo i18n para virar o idioma da interface. */
  name: string;
  phrases: Phrase[];
}

const CATS: { id: string; emoji: string; name: string; rows: Row[] }[] = [
  {
    id: "bom-dia", emoji: "🌅", name: "Bom dia",
    rows: [
      ["Bom dia.", "Good morning.", "おはようございます。", "Ohayō gozaimasu.", "formal", 1],
      ["Bom dia! Tudo bem?", "Good morning! How are you?", "おはよう！元気？", "Ohayō! Genki?", "informal", 2],
      ["Dormiu bem?", "Did you sleep well?", "よく眠れましたか？", "Yoku nemuremashita ka?", "informal", 3],
      ["Dormi muito bem, obrigado.", "I slept very well, thank you.", "よく眠れました、ありがとう。", "Yoku nemuremashita, arigatō.", "comum", 2],
      ["Vamos tomar café?", "Shall we have breakfast?", "朝ごはんを食べませんか？", "Asagohan o tabemasen ka?", "informal", 5],
      ["Estou com fome.", "I'm hungry.", "お腹が空きました。", "Onaka ga sukimashita.", "comum", 4],
      ["Quero tomar um café.", "I want to have a coffee.", "コーヒーが飲みたいです。", "Kōhī ga nomitai desu.", "comum", 4],
      ["Acordei cedo hoje.", "I woke up early today.", "今日は早く起きました。", "Kyō wa hayaku okimashita.", "comum", 0],
      ["Tenha um ótimo dia.", "Have a great day.", "良い一日を。", "Yoi ichinichi o.", "fechar", 9],
      ["Até mais.", "See you later.", "またね。", "Mata ne.", "fechar", 8],
    ],
  },
  {
    id: "boa-tarde", emoji: "☀️", name: "Boa tarde",
    rows: [
      ["Boa tarde.", "Good afternoon.", "こんにちは。", "Konnichiwa.", "formal", 1],
      ["Boa tarde! Como vai o dia?", "Good afternoon! How's your day?", "こんにちは！今日はどうですか？", "Konnichiwa! Kyō wa dō desu ka?", "informal", 2],
      ["Está sendo um dia corrido.", "It's been a busy day.", "忙しい一日です。", "Isogashii ichinichi desu.", "comum", 1],
      ["Já almoçou?", "Have you had lunch?", "お昼は食べましたか？", "Ohiru wa tabemashita ka?", "informal", 4],
      ["Ainda não almocei.", "I haven't had lunch yet.", "まだ食べていません。", "Mada tabete imasen.", "comum", 5],
      ["Vamos almoçar juntos?", "Shall we have lunch together?", "一緒にお昼を食べませんか？", "Issho ni ohiru o tabemasen ka?", "informal", 6],
      ["Boa ideia!", "Good idea!", "いいですね！", "Ii desu ne!", "comum", 5],
      ["Está calor hoje.", "It's hot today.", "今日は暑いですね。", "Kyō wa atsui desu ne.", "comum", 8],
      ["Sim, muito calor.", "Yes, very hot.", "はい、とても暑いです。", "Hai, totemo atsui desu.", "comum", 7],
      ["Boa tarde e bom trabalho.", "Good afternoon and enjoy your work.", "こんにちは、お仕事頑張ってください。", "Konnichiwa, oshigoto ganbatte kudasai.", "fechar", 0],
    ],
  },
  {
    id: "boa-noite", emoji: "🌙", name: "Boa noite",
    rows: [
      ["Boa noite.", "Good evening.", "こんばんは。", "Konbanwa.", "formal", 1],
      ["Boa noite! Como foi seu dia?", "Good evening! How was your day?", "こんばんは！今日はどうでしたか？", "Konbanwa! Kyō wa dō deshita ka?", "informal", 2],
      ["Foi um bom dia.", "It was a good day.", "良い一日でした。", "Yoi ichinichi deshita.", "comum", 1],
      ["Estou cansado.", "I'm tired.", "疲れました。", "Tsukaremashita.", "comum", 4],
      ["Vou dormir agora.", "I'm going to sleep now.", "もう寝ます。", "Mō nemasu.", "comum", 5],
      ["Durma bem.", "Sleep well.", "ゆっくり休んでね。", "Yukkuri yasunde ne.", "fechar", 6],
      ["Bons sonhos.", "Sweet dreams.", "良い夢を。", "Yoi yume o.", "fechar", 5],
      ["Até amanhã.", "See you tomorrow.", "また明日。", "Mata ashita.", "fechar", 8],
      ["Vou ler um pouco antes de dormir.", "I'll read a bit before bed.", "寝る前に少し読書します。", "Neru mae ni sukoshi dokusho shimasu.", "comum", 5],
      ["Amanhã eu começo cedo.", "I have an early start tomorrow.", "明日は朝が早いです。", "Ashita wa asa ga hayai desu.", "comum", 4],
    ],
  },
  {
    id: "cumprimentos", emoji: "👋", name: "Cumprimentos",
    rows: [
      ["Olá!", "Hello!", "どうも！", "Dōmo!", "comum", 1],
      ["Oi, tudo bem?", "Hi, how's it going?", "やあ、元気？", "Yā, genki?", "informal", 2],
      ["Tudo bem, e você?", "I'm fine, and you?", "元気です、あなたは？", "Genki desu, anata wa?", "comum", 1],
      ["Quanto tempo!", "Long time no see!", "久しぶり！", "Hisashiburi!", "informal", 4],
      ["Que bom te ver!", "It's good to see you!", "会えて嬉しいです！", "Aete ureshii desu!", "comum", 3],
      ["Prazer em conhecer.", "Nice to meet you.", "はじめまして。", "Hajimemashite.", "formal", 6],
      ["O prazer é meu.", "The pleasure is mine.", "こちらこそ。", "Kochira koso.", "formal", 5],
      ["Bem-vindo!", "Welcome!", "ようこそ！", "Yōkoso!", "comum", 8],
      ["Obrigado por me receber.", "Thank you for having me.", "お招きありがとうございます。", "Omaneki arigatō gozaimasu.", "agradecer", 7],
      ["Tchau!", "Bye!", "じゃあね！", "Jā ne!", "fechar", 0],
    ],
  },
  {
    id: "apresentacao", emoji: "🙋", name: "Apresentação",
    rows: [
      ["Meu nome é...", "My name is...", "私の名前は…です。", "Watashi no namae wa ... desu.", "apresentar", 1],
      ["Qual é o seu nome?", "What's your name?", "お名前は何ですか？", "Onamae wa nan desu ka?", "apresentar", 0],
      ["Sou do Brasil.", "I'm from Brazil.", "ブラジルから来ました。", "Burajiru kara kimashita.", "apresentar", 3],
      ["De onde você é?", "Where are you from?", "どこから来ましたか？", "Doko kara kimashita ka?", "informacao", 2],
      ["Tenho vinte anos.", "I'm twenty years old.", "二十歳です。", "Hatachi desu.", "apresentar", 5],
      ["Quantos anos você tem?", "How old are you?", "何歳ですか？", "Nansai desu ka?", "informacao", 4],
      ["Sou estudante.", "I'm a student.", "学生です。", "Gakusei desu.", "apresentar", 7],
      ["No que você trabalha?", "What do you do for work?", "お仕事は何ですか？", "Oshigoto wa nan desu ka?", "informacao", 6],
      ["Estou aprendendo esse idioma.", "I'm learning this language.", "この言語を勉強しています。", "Kono gengo o benkyō shite imasu.", "comum", 9],
      ["Que legal!", "That's cool!", "すごいですね！", "Sugoi desu ne!", "informal", 8],
    ],
  },
  {
    id: "como-esta", emoji: "😊", name: "Como você está?",
    rows: [
      ["Como você está?", "How are you?", "お元気ですか？", "Ogenki desu ka?", "abrir", 1],
      ["Estou bem, obrigado.", "I'm fine, thank you.", "元気です、ありがとう。", "Genki desu, arigatō.", "comum", 0],
      ["Mais ou menos.", "So-so.", "まあまあです。", "Māmā desu.", "informal", 3],
      ["O que aconteceu?", "What happened?", "どうしましたか？", "Dō shimashita ka?", "informacao", 2],
      ["Estou muito feliz hoje.", "I'm very happy today.", "今日はとても嬉しいです。", "Kyō wa totemo ureshii desu.", "comum", 5],
      ["Fico feliz por você!", "I'm happy for you!", "よかったですね！", "Yokatta desu ne!", "informal", 4],
      ["Estou um pouco cansado.", "I'm a little tired.", "少し疲れています。", "Sukoshi tsukarete imasu.", "comum", 7],
      ["Quer conversar sobre isso?", "Do you want to talk about it?", "話してみませんか？", "Hanashite mimasen ka?", "comum", 6],
      ["Não estou me sentindo bem.", "I'm not feeling well.", "気分が良くないです。", "Kibun ga yokunai desu.", "comum", 9],
      ["Precisa de ajuda?", "Do you need help?", "手伝いましょうか？", "Tetsudaimashō ka?", "comum", 8],
    ],
  },
  {
    id: "cafeteria", emoji: "☕", name: "Cafeteria",
    rows: [
      ["Um café, por favor.", "A coffee, please.", "コーヒーを一つください。", "Kōhī o hitotsu kudasai.", "pedir", 1],
      ["Para viagem ou para comer aqui?", "To go or for here?", "お持ち帰りですか、店内ですか？", "Omochikaeri desu ka, tennai desu ka?", "informacao", 0],
      ["Para viagem, por favor.", "To go, please.", "持ち帰りでお願いします。", "Mochikaeri de onegaishimasu.", "pedir", 1],
      ["Com leite, por favor.", "With milk, please.", "ミルクを入れてください。", "Miruku o irete kudasai.", "pedir", 4],
      ["Sem açúcar, por favor.", "No sugar, please.", "砂糖なしでお願いします。", "Satō nashi de onegaishimasu.", "pedir", 3],
      ["Quanto custa?", "How much is it?", "いくらですか？", "Ikura desu ka?", "informacao", 6],
      ["Tem tamanho grande?", "Do you have a large size?", "Lサイズはありますか？", "Eru saizu wa arimasu ka?", "informacao", 5],
      ["Tem algo sem lactose?", "Do you have anything lactose-free?", "乳製品なしのものはありますか？", "Nyūseihin nashi no mono wa arimasu ka?", "informacao", 8],
      ["Tem wi-fi aqui?", "Is there Wi-Fi here?", "ここにWi-Fiはありますか？", "Koko ni Wi-Fi wa arimasu ka?", "informacao", 7],
      ["Obrigado, estava ótimo.", "Thank you, it was great.", "ごちそうさまでした。", "Gochisōsama deshita.", "agradecer", 0],
    ],
  },
  {
    id: "restaurante", emoji: "🍽️", name: "Restaurante",
    rows: [
      ["Mesa para dois, por favor.", "A table for two, please.", "二人です、お願いします。", "Futari desu, onegaishimasu.", "pedir", 1],
      ["Por aqui, por favor.", "This way, please.", "こちらへどうぞ。", "Kochira e dōzo.", "formal", 0],
      ["O cardápio, por favor.", "The menu, please.", "メニューをお願いします。", "Menyū o onegaishimasu.", "pedir", 3],
      ["O que você recomenda?", "What do you recommend?", "おすすめは何ですか？", "Osusume wa nan desu ka?", "informacao", 2],
      ["Vou querer este prato.", "I'll have this dish.", "これをお願いします。", "Kore o onegaishimasu.", "pedir", 3],
      ["Sou vegetariano.", "I'm vegetarian.", "ベジタリアンです。", "Bejitarian desu.", "comum", 6],
      ["Tem opções sem carne?", "Do you have meatless options?", "肉なしの料理はありますか？", "Niku nashi no ryōri wa arimasu ka?", "informacao", 5],
      ["Estava delicioso!", "It was delicious!", "とても美味しかったです！", "Totemo oishikatta desu!", "comum", 9],
      ["A conta, por favor.", "The bill, please.", "お会計をお願いします。", "Okaikei o onegaishimasu.", "pedir", 0],
      ["Podemos pagar separado?", "Can we pay separately?", "別々で払えますか？", "Betsubetsu de haraemasu ka?", "pedir", 8],
    ],
  },
  {
    id: "compras", emoji: "🛒", name: "Compras",
    rows: [
      ["Estou só olhando.", "I'm just looking.", "見ているだけです。", "Mite iru dake desu.", "comum", 1],
      ["Posso ajudar?", "Can I help you?", "何かお探しですか？", "Nanika osagashi desu ka?", "formal", 0],
      ["Quanto custa isto?", "How much is this?", "これはいくらですか？", "Kore wa ikura desu ka?", "informacao", 3],
      ["Está muito caro.", "It's too expensive.", "高すぎます。", "Takasugimasu.", "comum", 2],
      ["Tem em outro tamanho?", "Do you have another size?", "他のサイズはありますか？", "Hoka no saizu wa arimasu ka?", "informacao", 5],
      ["Posso experimentar?", "Can I try it on?", "試着できますか？", "Shichaku dekimasu ka?", "pedir", 4],
      ["Isto está em promoção?", "Is this on sale?", "これはセール中ですか？", "Kore wa sēru-chū desu ka?", "informacao", 7],
      ["Vou levar este.", "I'll take this one.", "これにします。", "Kore ni shimasu.", "comum", 6],
      ["Onde fica o caixa?", "Where is the checkout?", "レジはどこですか？", "Reji wa doko desu ka?", "informacao", 9],
      ["Aceita cartão?", "Do you accept card?", "カードで払えますか？", "Kādo de haraemasu ka?", "informacao", 8],
    ],
  },
  {
    id: "transporte", emoji: "🚆", name: "Transporte",
    rows: [
      ["Onde fica o ponto de ônibus?", "Where is the bus stop?", "バス停はどこですか？", "Basutei wa doko desu ka?", "informacao", 1],
      ["Fica logo ali.", "It's right over there.", "すぐそこです。", "Sugu soko desu.", "comum", 0],
      ["Que horas passa o próximo trem?", "What time is the next train?", "次の電車は何時ですか？", "Tsugi no densha wa nanji desu ka?", "informacao", 3],
      ["Em dez minutos.", "In ten minutes.", "十分後です。", "Juppun go desu.", "comum", 2],
      ["Uma passagem, por favor.", "One ticket, please.", "切符を一枚ください。", "Kippu o ichimai kudasai.", "pedir", 5],
      ["Quanto custa a passagem?", "How much is the ticket?", "切符はいくらですか？", "Kippu wa ikura desu ka?", "informacao", 4],
      ["Este trem vai para o centro?", "Does this train go downtown?", "この電車は中心街に行きますか？", "Kono densha wa chūshingai ni ikimasu ka?", "informacao", 7],
      ["Sim, é este mesmo.", "Yes, this is the one.", "はい、この電車です。", "Hai, kono densha desu.", "comum", 6],
      ["Preciso trocar de linha?", "Do I need to change lines?", "乗り換えが必要ですか？", "Norikae ga hitsuyō desu ka?", "informacao", 9],
      ["Desço na próxima parada.", "I get off at the next stop.", "次の駅で降ります。", "Tsugi no eki de orimasu.", "comum", 8],
    ],
  },
  {
    id: "viagem", emoji: "✈️", name: "Viagem",
    rows: [
      ["Estou viajando a turismo.", "I'm traveling for tourism.", "観光で来ました。", "Kankō de kimashita.", "comum", 1],
      ["Quanto tempo vai ficar?", "How long will you stay?", "どのくらい滞在しますか？", "Dono kurai taizai shimasu ka?", "informacao", 0],
      ["Fico uma semana.", "I'm staying one week.", "一週間います。", "Isshūkan imasu.", "comum", 1],
      ["Onde fica o portão de embarque?", "Where is the boarding gate?", "搭乗ゲートはどこですか？", "Tōjō gēto wa doko desu ka?", "informacao", 5],
      ["Perdi minha mala.", "I lost my suitcase.", "スーツケースをなくしました。", "Sūtsukēsu o nakushimashita.", "urgente", 5],
      ["Pode me ajudar, por favor?", "Can you help me, please?", "手伝ってもらえますか？", "Tetsudatte moraemasu ka?", "pedir", 4],
      ["Tem um mapa da cidade?", "Do you have a city map?", "市内の地図はありますか？", "Shinai no chizu wa arimasu ka?", "informacao", 7],
      ["O que vale a pena visitar?", "What is worth visiting?", "おすすめの観光地はどこですか？", "Osusume no kankōchi wa doko desu ka?", "informacao", 6],
      ["Estou perdido.", "I'm lost.", "道に迷いました。", "Michi ni mayoimashita.", "urgente", 9],
      ["Pode me mostrar no mapa?", "Can you show me on the map?", "地図で教えてもらえますか？", "Chizu de oshiete moraemasu ka?", "pedir", 8],
    ],
  },
  {
    id: "hotel", emoji: "🏨", name: "Hotel",
    rows: [
      ["Tenho uma reserva.", "I have a reservation.", "予約しています。", "Yoyaku shite imasu.", "formal", 1],
      ["Seu nome, por favor.", "Your name, please.", "お名前をお願いします。", "Onamae o onegaishimasu.", "formal", 0],
      ["Que horas é o check-in?", "What time is check-in?", "チェックインは何時ですか？", "Chekkuin wa nanji desu ka?", "informacao", 3],
      ["A partir das duas.", "From two o'clock.", "二時からです。", "Niji kara desu.", "comum", 2],
      ["O café da manhã está incluído?", "Is breakfast included?", "朝食は含まれていますか？", "Chōshoku wa fukumarete imasu ka?", "informacao", 5],
      ["Sim, está incluído.", "Yes, it's included.", "はい、含まれています。", "Hai, fukumarete imasu.", "comum", 4],
      ["A senha do wi-fi, por favor.", "The Wi-Fi password, please.", "Wi-Fiのパスワードをお願いします。", "Wi-Fi no pasuwādo o onegaishimasu.", "pedir", 7],
      ["O ar-condicionado não funciona.", "The air conditioning isn't working.", "エアコンが動きません。", "Eakon ga ugokimasen.", "comum", 6],
      ["Posso deixar minha mala aqui?", "Can I leave my luggage here?", "荷物を預けられますか？", "Nimotsu o azukeraremasu ka?", "pedir", 9],
      ["Vou fazer o check-out.", "I'd like to check out.", "チェックアウトお願いします。", "Chekkuauto onegaishimasu.", "comum", 8],
    ],
  },
  {
    id: "escola", emoji: "🏫", name: "Escola",
    rows: [
      ["Que horas começa a aula?", "What time does class start?", "授業は何時に始まりますか？", "Jugyō wa nanji ni hajimarimasu ka?", "informacao", 1],
      ["Começa às oito.", "It starts at eight.", "八時に始まります。", "Hachiji ni hajimarimasu.", "comum", 0],
      ["Não entendi.", "I didn't understand.", "分かりませんでした。", "Wakarimasen deshita.", "comum", 3],
      ["Pode repetir, por favor?", "Can you repeat, please?", "もう一度お願いします。", "Mō ichido onegaishimasu.", "pedir", 2],
      ["Como se diz isso?", "How do you say this?", "これは何と言いますか？", "Kore wa nan to iimasu ka?", "informacao", 5],
      ["O que significa esta palavra?", "What does this word mean?", "この言葉はどういう意味ですか？", "Kono kotoba wa dō iu imi desu ka?", "informacao", 4],
      ["Tenho uma pergunta.", "I have a question.", "質問があります。", "Shitsumon ga arimasu.", "comum", 7],
      ["Qual é a lição de casa?", "What's the homework?", "宿題は何ですか？", "Shukudai wa nan desu ka?", "informacao", 6],
      ["Estou estudando muito.", "I'm studying a lot.", "たくさん勉強しています。", "Takusan benkyō shite imasu.", "comum", 9],
      ["Boa sorte na prova!", "Good luck on the test!", "テスト頑張ってね！", "Tesuto ganbatte ne!", "informal", 8],
    ],
  },
  {
    id: "trabalho", emoji: "💼", name: "Trabalho",
    rows: [
      ["Bom trabalho hoje.", "Good work today.", "お疲れ様でした。", "Otsukaresama deshita.", "formal", 1],
      ["Obrigado, você também.", "Thank you, you too.", "ありがとうございます、そちらも。", "Arigatō gozaimasu, sochira mo.", "formal", 0],
      ["Tenho uma reunião agora.", "I have a meeting now.", "今から会議があります。", "Ima kara kaigi ga arimasu.", "comum", 3],
      ["Que horas é a reunião?", "What time is the meeting?", "会議は何時ですか？", "Kaigi wa nanji desu ka?", "informacao", 2],
      ["Vou enviar o e-mail.", "I'll send the email.", "メールを送ります。", "Mēru o okurimasu.", "comum", 5],
      ["Pode me enviar o arquivo?", "Can you send me the file?", "ファイルを送ってもらえますか？", "Fairu o okutte moraemasu ka?", "pedir", 4],
      ["Estou ocupado agora.", "I'm busy right now.", "今忙しいです。", "Ima isogashii desu.", "comum", 7],
      ["Podemos falar depois?", "Can we talk later?", "後で話せますか？", "Ato de hanasemasu ka?", "pedir", 6],
      ["Preciso de mais tempo.", "I need more time.", "もう少し時間が必要です。", "Mō sukoshi jikan ga hitsuyō desu.", "comum", 9],
      ["Sem problema.", "No problem.", "問題ありません。", "Mondai arimasen.", "comum", 8],
    ],
  },
  {
    id: "familia", emoji: "👨‍👩‍👧", name: "Família",
    rows: [
      ["Esta é minha família.", "This is my family.", "これが私の家族です。", "Kore ga watashi no kazoku desu.", "apresentar", 1],
      ["Quantos irmãos você tem?", "How many siblings do you have?", "兄弟は何人いますか？", "Kyōdai wa nannin imasu ka?", "informacao", 2],
      ["Tenho um irmão e uma irmã.", "I have one brother and one sister.", "兄が一人と姉が一人います。", "Ani ga hitori to ane ga hitori imasu.", "comum", 1],
      ["Moro com meus pais.", "I live with my parents.", "両親と住んでいます。", "Ryōshin to sunde imasu.", "comum", 4],
      ["Você é casado?", "Are you married?", "結婚していますか？", "Kekkon shite imasu ka?", "informacao", 3],
      ["Sinto saudades deles.", "I miss them.", "彼らが恋しいです。", "Karera ga koishii desu.", "comum", 6],
      ["Vamos visitar a vovó.", "Let's visit grandma.", "おばあちゃんに会いに行こう。", "Obāchan ni ai ni ikō.", "informal", 5],
      ["Minha mãe cozinha muito bem.", "My mom cooks very well.", "母は料理が上手です。", "Haha wa ryōri ga jōzu desu.", "comum", 8],
      ["Que família bonita!", "What a lovely family!", "素敵な家族ですね！", "Suteki na kazoku desu ne!", "comum", 7],
      ["Mande um abraço para todos.", "Send everyone my regards.", "みんなによろしく伝えてください。", "Minna ni yoroshiku tsutaete kudasai.", "fechar", 0],
    ],
  },
  {
    id: "amigos", emoji: "👥", name: "Amigos",
    rows: [
      ["Vamos sair hoje?", "Shall we go out today?", "今日、遊びに行かない？", "Kyō, asobi ni ikanai?", "informal", 1],
      ["Claro, vamos!", "Sure, let's go!", "もちろん、行こう！", "Mochiron, ikō!", "informal", 0],
      ["Que horas nos encontramos?", "What time shall we meet?", "何時に会う？", "Nanji ni au?", "informacao", 3],
      ["Às sete está bom?", "Is seven okay?", "七時でいい？", "Shichiji de ii?", "informal", 2],
      ["Estou a caminho.", "I'm on my way.", "今向かっています。", "Ima mukatte imasu.", "comum", 5],
      ["Vou me atrasar um pouco.", "I'll be a little late.", "少し遅れます。", "Sukoshi okuremasu.", "comum", 4],
      ["Foi muito divertido!", "That was so much fun!", "とても楽しかった！", "Totemo tanoshikatta!", "informal", 7],
      ["Vamos repetir!", "Let's do it again!", "また行こうね！", "Mata ikō ne!", "informal", 6],
      ["Obrigado por hoje.", "Thanks for today.", "今日はありがとう。", "Kyō wa arigatō.", "agradecer", 9],
      ["Nos falamos depois.", "Talk to you later.", "また後で話そう。", "Mata ato de hanasō.", "fechar", 8],
    ],
  },
  {
    id: "hospital", emoji: "🏥", name: "Hospital",
    rows: [
      ["Não estou bem.", "I'm not well.", "具合が悪いです。", "Guai ga warui desu.", "urgente", 1],
      ["O que você está sentindo?", "What are your symptoms?", "どんな症状ですか？", "Donna shōjō desu ka?", "informacao", 0],
      ["Estou com dor de cabeça.", "I have a headache.", "頭が痛いです。", "Atama ga itai desu.", "comum", 1],
      ["Estou com febre.", "I have a fever.", "熱があります。", "Netsu ga arimasu.", "comum", 1],
      ["Preciso de um médico.", "I need a doctor.", "医者が必要です。", "Isha ga hitsuyō desu.", "urgente", 5],
      ["Vou chamar o médico.", "I'll call the doctor.", "医者を呼びます。", "Isha o yobimasu.", "comum", 4],
      ["Sou alérgico a este remédio.", "I'm allergic to this medicine.", "この薬にアレルギーがあります。", "Kono kusuri ni arerugī ga arimasu.", "urgente", 7],
      ["Tome este remédio duas vezes ao dia.", "Take this medicine twice a day.", "この薬を一日二回飲んでください。", "Kono kusuri o ichinichi nikai nonde kudasai.", "formal", 6],
      ["Onde fica a farmácia?", "Where is the pharmacy?", "薬局はどこですか？", "Yakkyoku wa doko desu ka?", "informacao", 9],
      ["Melhoras!", "Get well soon!", "お大事に！", "Odaiji ni!", "fechar", 8],
    ],
  },
  {
    id: "emergencia", emoji: "🚔", name: "Emergência",
    rows: [
      ["Socorro!", "Help!", "助けて！", "Tasukete!", "urgente", 1],
      ["Chame a polícia!", "Call the police!", "警察を呼んでください！", "Keisatsu o yonde kudasai!", "urgente", 0],
      ["Chame uma ambulância!", "Call an ambulance!", "救急車を呼んでください！", "Kyūkyūsha o yonde kudasai!", "urgente", 0],
      ["Houve um acidente.", "There's been an accident.", "事故がありました。", "Jiko ga arimashita.", "urgente", 5],
      ["Perdi meus documentos.", "I lost my documents.", "書類をなくしました。", "Shorui o nakushimashita.", "urgente", 5],
      ["Fique calmo, já vem ajuda.", "Stay calm, help is coming.", "落ち着いてください、すぐ助けが来ます。", "Ochitsuite kudasai, sugu tasuke ga kimasu.", "comum", 4],
      ["Roubaram minha bolsa.", "My bag was stolen.", "バッグを盗まれました。", "Baggu o nusumaremashita.", "urgente", 5],
      ["Preciso ligar para a embaixada.", "I need to call the embassy.", "大使館に電話したいです。", "Taishikan ni denwa shitai desu.", "urgente", 8],
      ["Não falo bem este idioma.", "I don't speak this language well.", "この言語はあまり話せません。", "Kono gengo wa amari hanasemasen.", "comum", 7],
      ["É uma emergência.", "It's an emergency.", "緊急です。", "Kinkyū desu.", "urgente", 0],
    ],
  },
  {
    id: "perguntas", emoji: "❓", name: "Perguntas comuns",
    rows: [
      ["Onde fica o banheiro?", "Where is the bathroom?", "トイレはどこですか？", "Toire wa doko desu ka?", "informacao", 1],
      ["Fica no fim do corredor.", "It's at the end of the hall.", "廊下の突き当たりです。", "Rōka no tsukiatari desu.", "comum", 0],
      ["Que horas são?", "What time is it?", "今何時ですか？", "Ima nanji desu ka?", "informacao", 3],
      ["São três horas.", "It's three o'clock.", "三時です。", "Sanji desu.", "comum", 2],
      ["Pode falar mais devagar?", "Can you speak more slowly?", "もっとゆっくり話してもらえますか？", "Motto yukkuri hanashite moraemasu ka?", "pedir", 5],
      ["Claro, com prazer.", "Sure, with pleasure.", "はい、喜んで。", "Hai, yorokonde.", "comum", 4],
      ["Você fala inglês?", "Do you speak English?", "英語を話せますか？", "Eigo o hanasemasu ka?", "informacao", 7],
      ["Um pouquinho.", "A little bit.", "少しだけ。", "Sukoshi dake.", "comum", 6],
      ["Como chego lá?", "How do I get there?", "そこへはどう行きますか？", "Soko e wa dō ikimasu ka?", "informacao", 9],
      ["Fica longe daqui?", "Is it far from here?", "ここから遠いですか？", "Koko kara tōi desu ka?", "informacao", 8],
    ],
  },
  {
    id: "casual", emoji: "💬", name: "Conversas casuais",
    rows: [
      ["Que tempo bom hoje!", "What nice weather today!", "今日はいい天気ですね！", "Kyō wa ii tenki desu ne!", "abrir", 1],
      ["Sim, está perfeito.", "Yes, it's perfect.", "はい、最高ですね。", "Hai, saikō desu ne.", "comum", 0],
      ["Do que você gosta de fazer?", "What do you like to do?", "趣味は何ですか？", "Shumi wa nan desu ka?", "informacao", 3],
      ["Gosto de ouvir música.", "I like listening to music.", "音楽を聴くのが好きです。", "Ongaku o kiku no ga suki desu.", "comum", 2],
      ["Você viu esse filme?", "Have you seen this movie?", "この映画を見ましたか？", "Kono eiga o mimashita ka?", "informal", 5],
      ["Ainda não, mas quero ver.", "Not yet, but I want to.", "まだですが、見たいです。", "Mada desu ga, mitai desu.", "comum", 4],
      ["Concordo com você.", "I agree with you.", "そう思います。", "Sō omoimasu.", "comum", 7],
      ["Não tenho certeza.", "I'm not sure.", "よく分かりません。", "Yoku wakarimasen.", "comum", 6],
      ["Foi bom conversar com você.", "It was nice talking to you.", "話せてよかったです。", "Hanasete yokatta desu.", "fechar", 9],
      ["Até a próxima!", "Until next time!", "また今度！", "Mata kondo!", "fechar", 8],
    ],
  },
];

export const DIALOG_CATEGORIES: DialogCategory[] = CATS.map((c) => ({
  id: c.id,
  emoji: c.emoji,
  name: c.name,
  phrases: c.rows.map((r, i) => ({
    id: `${c.id}-${i}`,
    text: { pt: r[0], en: r[1], ja: r[2] },
    romaji: r[3],
    use: r[4],
    reply: r[5],
  })),
}));

export function categoryById(id: string) {
  return DIALOG_CATEGORIES.find((c) => c.id === id) ?? null;
}

/** Idioma estudado -> código de voz para o TTS. */
export const SPEECH_LANG: Record<LearnLang, "pt" | "en" | "ja"> = { pt: "pt", en: "en", ja: "ja" };
