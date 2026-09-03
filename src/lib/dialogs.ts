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
      ["O despertador tocou cedo hoje.", "The alarm went off early today.", "今日は目覚ましが早く鳴りました。", "Kyō wa mezamashi ga hayaku narimashita.", "informal", 0],
      ["Acordei antes do sol nascer.", "I woke up before sunrise.", "日の出前に起きました。", "Hinode mae ni okimashita.", "comum", 3],
      ["Ainda estou com sono.", "I'm still sleepy.", "まだ眠いです。", "Mada nemui desu.", "informal", 4],
      ["Vou tomar um banho rápido.", "I'm going to take a quick shower.", "さっとシャワーを浴びます。", "Satto shawā o abimasu.", "comum", 5],
      ["O café da manhã está pronto.", "Breakfast is ready.", "朝ごはんができましたよ。", "Asagohan ga dekimashita yo.", "informal", 6],
      ["Que cheiro bom de pão fresco!", "What a nice smell of fresh bread!", "焼きたてのパンのいい匂いですね！", "Yakitate no pan no ii nioi desu ne!", "informal", 5],
      ["Tenho que sair em dez minutos.", "I have to leave in ten minutes.", "あと十分で出ないといけません。", "Ato juppun de denai to ikemasen.", "comum", 8],
      ["Bom trabalho hoje!", "Have a good day at work!", "今日もお仕事頑張ってね！", "Kyō mo oshigoto ganbatte ne!", "informal", 9],
      ["Obrigado, você também.", "Thanks, you too.", "ありがとう、そちらこそ。", "Arigatō, sochira koso.", "agradecer", 8],
    ],
  },
  {
    id: "boa-tarde", emoji: "☀️", name: "Boa tarde",
    rows: [
      ["Boa tarde.", "Good afternoon.", "こんにちは。", "Konnichiwa.", "formal", 1],
      ["A tarde está passando rápido.", "The afternoon is going by fast.", "午後があっという間ですね。", "Gogo ga attoiuma desu ne.", "comum", 0],
      ["Já almoçou?", "Have you had lunch yet?", "もうお昼を食べましたか？", "Mō ohiru o tabemashita ka?", "informal", 3],
      ["Comi um sanduíche no caminho.", "I had a sandwich on the way.", "途中でサンドイッチを食べました。", "Tochū de sandoitchi o tabemashita.", "comum", 2],
      ["Está muito quente lá fora.", "It's very hot outside.", "外はとても暑いです。", "Soto wa totemo atsui desu.", "comum", 5],
      ["Vou aproveitar a sombra.", "I'll stay in the shade.", "日陰にいます。", "Hikage ni imasu.", "informal", 4],
      ["Preciso de uma pausa.", "I need a break.", "少し休憩が必要です。", "Sukoshi kyūkei ga hitsuyō desu.", "comum", 7],
      ["Vamos caminhar um pouco?", "Shall we walk a bit?", "少し歩きませんか？", "Sukoshi arukimasen ka?", "informal", 6],
      ["Nos vemos mais tarde.", "See you later this afternoon.", "また後でね。", "Mata ato de ne.", "fechar", 9],
      ["Boa tarde para você também.", "Good afternoon to you too.", "そちらもよい午後を。", "Sochira mo yoi gogo o.", "fechar", 8],
    ],
  },
  {
    id: "boa-noite", emoji: "🌙", name: "Boa noite",
    rows: [
      ["Boa noite.", "Good evening.", "こんばんは。", "Konbanwa.", "formal", 1],
      ["A lua está linda hoje.", "The moon looks beautiful tonight.", "今夜は月がきれいですね。", "Kon'ya wa tsuki ga kirei desu ne.", "informal", 0],
      ["Vou dormir cedo hoje.", "I'm going to bed early tonight.", "今夜は早く寝ます。", "Kon'ya wa hayaku nemasu.", "comum", 3],
      ["Durma bem.", "Sleep well.", "ゆっくり休んでね。", "Yukkuri yasunde ne.", "informal", 2],
      ["Bons sonhos.", "Sweet dreams.", "いい夢を。", "Ii yume o.", "fechar", 5],
      ["Vou apagar a luz.", "I'll turn off the light.", "電気を消しますね。", "Denki o keshimasu ne.", "comum", 4],
      ["O dia foi longo.", "It was a long day.", "長い一日でしたね。", "Nagai ichinichi deshita ne.", "comum", 7],
      ["Descanse bastante.", "Get plenty of rest.", "しっかり休んでください。", "Shikkari yasunde kudasai.", "formal", 6],
      ["Até amanhã de manhã.", "See you tomorrow morning.", "また明日の朝ね。", "Mata ashita no asa ne.", "fechar", 9],
      ["Vou colocar o despertador.", "I'll set the alarm.", "目覚ましをセットします。", "Mezamashi o setto shimasu.", "comum", 8],
    ],
  },
  {
    id: "cumprimentos", emoji: "👋", name: "Cumprimentos",
    rows: [
      ["Olá!", "Hello!", "やあ！", "Yā!", "abrir", 1],
      ["Oi, que surpresa!", "Hi, what a surprise!", "あ、びっくりした！", "A, bikkuri shita!", "informal", 0],
      ["Quanto tempo!", "Long time no see!", "お久しぶりです！", "Ohisashiburi desu!", "informal", 3],
      ["Pois é, faz meses.", "Right, it's been months.", "そうですね、数か月ぶりです。", "Sō desu ne, sūkagetsu buri desu.", "comum", 2],
      ["Seja bem-vindo.", "Welcome.", "ようこそ。", "Yōkoso.", "formal", 5],
      ["Obrigado por me receber.", "Thank you for having me.", "お招きありがとうございます。", "Omaneki arigatō gozaimasu.", "agradecer", 4],
      ["Aperto de mão ou aceno?", "A handshake or a wave?", "握手にしますか、手を振りますか？", "Akushu ni shimasu ka, te o furimasu ka?", "informal", 7],
      ["Aqui costumamos fazer uma reverência.", "Here we usually bow.", "ここではお辞儀をします。", "Koko de wa ojigi o shimasu.", "informacao", 6],
      ["Mande lembranças à sua mãe.", "Say hi to your mother for me.", "お母さんによろしく伝えてください。", "Okāsan ni yoroshiku tsutaete kudasai.", "fechar", 9],
      ["Pode deixar, eu falo com ela.", "Sure, I'll tell her.", "はい、伝えておきます。", "Hai, tsutaete okimasu.", "comum", 8],
    ],
  },
  {
    id: "apresentacao", emoji: "🙋", name: "Apresentação",
    rows: [
      ["Meu nome é Lucas.", "My name is Lucas.", "私の名前はルーカスです。", "Watashi no namae wa Rūkasu desu.", "apresentar", 1],
      ["Prazer em conhecê-lo.", "Pleased to meet you.", "はじめまして、どうぞよろしく。", "Hajimemashite, dōzo yoroshiku.", "formal", 0],
      ["Sou do Brasil.", "I'm from Brazil.", "ブラジル出身です。", "Burajiru shusshin desu.", "apresentar", 3],
      ["Em que cidade você nasceu?", "Which city were you born in?", "どの街で生まれましたか？", "Dono machi de umaremashita ka?", "informacao", 2],
      ["Tenho vinte e cinco anos.", "I'm twenty-five years old.", "二十五歳です。", "Nijūgo sai desu.", "apresentar", 5],
      ["Estudo design gráfico.", "I study graphic design.", "グラフィックデザインを勉強しています。", "Gurafikku dezain o benkyō shite imasu.", "apresentar", 4],
      ["Este é meu cartão de visita.", "This is my business card.", "こちらが私の名刺です。", "Kochira ga watashi no meishi desu.", "formal", 7],
      ["Pode me chamar de Lu.", "You can call me Lu.", "ルーと呼んでください。", "Rū to yonde kudasai.", "informal", 6],
      ["Como se escreve seu nome?", "How do you spell your name?", "お名前はどう書きますか？", "Onamae wa dō kakimasu ka?", "informacao", 9],
      ["Escreve-se com dois efes.", "It's spelled with two f's.", "エフを二つ書きます。", "Efu o futatsu kakimasu.", "comum", 8],
    ],
  },
  {
    id: "como-esta", emoji: "😊", name: "Como você está?",
    rows: [
      ["Como vai você?", "How are you doing?", "調子はどうですか？", "Chōshi wa dō desu ka?", "abrir", 1],
      ["Vou indo, aos poucos.", "I'm getting by, little by little.", "まあまあです、少しずつですね。", "Māmā desu, sukoshi zutsu desu ne.", "comum", 0],
      ["Você parece cansado.", "You look tired.", "疲れているみたいですね。", "Tsukarete iru mitai desu ne.", "informal", 3],
      ["Andei dormindo pouco.", "I haven't been sleeping much.", "最近あまり寝ていません。", "Saikin amari nete imasen.", "comum", 2],
      ["Estou animado com a semana.", "I'm excited about this week.", "今週が楽しみです。", "Konshū ga tanoshimi desu.", "informal", 5],
      ["Que bom ouvir isso!", "Glad to hear that!", "それはよかったです！", "Sore wa yokatta desu!", "comum", 4],
      ["Ando meio estressado.", "I've been a bit stressed.", "ちょっとストレスがたまっています。", "Chotto sutoresu ga tamatte imasu.", "informal", 7],
      ["Se quiser conversar, me chame.", "If you want to talk, let me know.", "話したくなったら言ってくださいね。", "Hanashitaku nattara itte kudasai ne.", "comum", 6],
      ["E a sua família, vai bem?", "And your family, are they well?", "ご家族はお元気ですか？", "Gokazoku wa ogenki desu ka?", "formal", 9],
      ["Todos com saúde, felizmente.", "Everyone's healthy, thankfully.", "おかげさまで皆元気です。", "Okagesama de mina genki desu.", "comum", 8],
    ],
  },
  {
    id: "cafeteria", emoji: "☕", name: "Cafeteria",
    rows: [
      ["Um café sem açúcar, por favor.", "One coffee with no sugar, please.", "砂糖なしのコーヒーをお願いします。", "Satō nashi no kōhī o onegai shimasu.", "pedir", 1],
      ["Para viagem ou para tomar aqui?", "To go or for here?", "お持ち帰りですか、店内ですか？", "Omochikaeri desu ka, tennai desu ka?", "formal", 0],
      ["Posso ver o cardápio de bebidas?", "May I see the drinks menu?", "ドリンクのメニューを見せてもらえますか？", "Dorinku no menyū o misete moraemasu ka?", "pedir", 3],
      ["Qual é o especial de hoje?", "What's today's special?", "今日のおすすめは何ですか？", "Kyō no osusume wa nan desu ka?", "informacao", 2],
      ["Quanto tempo demora o pedido?", "How long does the order take?", "注文はどのくらいかかりますか？", "Chūmon wa dono kurai kakarimasu ka?", "informacao", 5],
      ["Sai em cinco minutos.", "It'll be ready in five minutes.", "五分でご用意します。", "Gofun de goyōi shimasu.", "comum", 4],
      ["Pode aquecer o croissant?", "Could you warm up the croissant?", "クロワッサンを温めてもらえますか？", "Kurowassan o atatamete moraemasu ka?", "pedir", 7],
      ["Tem leite vegetal?", "Do you have plant-based milk?", "植物性ミルクはありますか？", "Shokubutsusei miruku wa arimasu ka?", "informacao", 6],
      ["A senha do wi-fi, por gentileza.", "The wi-fi password, please.", "Wi-Fiのパスワードをお願いします。", "Waifai no pasuwādo o onegai shimasu.", "pedir", 9],
      ["Está no verso do recibo.", "It's on the back of the receipt.", "レシートの裏に書いてあります。", "Reshīto no ura ni kaite arimasu.", "comum", 8],
    ],
  },
  {
    id: "restaurante", emoji: "🍽️", name: "Restaurante",
    rows: [
      ["Mesa para duas pessoas, por favor.", "A table for two, please.", "二名でお願いします。", "Nimei de onegai shimasu.", "pedir", 1],
      ["Tem reserva no seu nome?", "Do you have a reservation?", "ご予約はございますか？", "Goyoyaku wa gozaimasu ka?", "formal", 0],
      ["Qual prato você recomenda?", "Which dish do you recommend?", "どの料理がおすすめですか？", "Dono ryōri ga osusume desu ka?", "informacao", 3],
      ["O peixe grelhado é famoso aqui.", "The grilled fish is famous here.", "焼き魚が名物です。", "Yakizakana ga meibutsu desu.", "comum", 2],
      ["Este prato leva pimenta?", "Does this dish have chili in it?", "この料理は辛いですか？", "Kono ryōri wa karai desu ka?", "informacao", 5],
      ["Só um pouquinho, é suave.", "Just a little, it's mild.", "少しだけです、マイルドですよ。", "Sukoshi dake desu, mairudo desu yo.", "comum", 4],
      ["Estava delicioso, parabéns ao chef.", "It was delicious, compliments to the chef.", "とても美味しかったです、シェフに感謝を。", "Totemo oishikatta desu, shefu ni kansha o.", "agradecer", 7],
      ["Pode embalar o que sobrou?", "Could you pack the leftovers?", "残りを包んでもらえますか？", "Nokori o tsutsunde moraemasu ka?", "pedir", 6],
      ["A conta, por favor.", "The bill, please.", "お会計をお願いします。", "Okaikei o onegai shimasu.", "pedir", 9],
      ["Vamos dividir a conta.", "Let's split the bill.", "割り勘にしましょう。", "Warikan ni shimashō.", "informal", 8],
    ],
  },
  {
    id: "compras", emoji: "🛒", name: "Compras",
    rows: [
      ["Você tem este produto em outra cor?", "Do you have this in another color?", "これの別の色はありますか？", "Kore no betsu no iro wa arimasu ka?", "informacao", 1],
      ["Temos em azul e em verde.", "We have it in blue and green.", "青と緑がございます。", "Ao to midori ga gozaimasu.", "comum", 0],
      ["Onde ficam os provadores?", "Where are the fitting rooms?", "試着室はどこですか？", "Shichakushitsu wa doko desu ka?", "informacao", 3],
      ["Ficou apertado na cintura.", "It's tight around the waist.", "ウエストがきついです。", "Uesuto ga kitsui desu.", "comum", 2],
      ["Tem um tamanho maior?", "Do you have a bigger size?", "もっと大きいサイズはありますか？", "Motto ōkii saizu wa arimasu ka?", "informacao", 5],
      ["Vou verificar no estoque.", "I'll check the stockroom.", "在庫を確認してきます。", "Zaiko o kakunin shite kimasu.", "formal", 4],
      ["Posso pagar com cartão?", "Can I pay by card?", "カードで払えますか？", "Kādo de haraemasu ka?", "pedir", 7],
      ["Aceitamos cartão e pagamento por aplicativo.", "We take cards and app payments.", "カードとアプリ決済が使えます。", "Kādo to apuri kessai ga tsukaemasu.", "comum", 6],
      ["Este item está em promoção?", "Is this item on sale?", "これはセール品ですか？", "Kore wa sēruhin desu ka?", "informacao", 9],
      ["Posso trocar se não servir?", "Can I exchange it if it doesn't fit?", "サイズが合わなければ交換できますか？", "Saizu ga awanakereba kōkan dekimasu ka?", "informacao", 8],
    ],
  },
  {
    id: "transporte", emoji: "🚆", name: "Transporte",
    rows: [
      ["Qual plataforma vai para o centro?", "Which platform goes downtown?", "中心街へは何番ホームですか？", "Chūshingai e wa nanban hōmu desu ka?", "informacao", 1],
      ["Plataforma três, à direita.", "Platform three, on the right.", "三番ホーム、右側です。", "Sanban hōmu, migigawa desu.", "comum", 0],
      ["Este trem para em todas as estações?", "Does this train stop at every station?", "この電車は各駅に停まりますか？", "Kono densha wa kakueki ni tomarimasu ka?", "informacao", 3],
      ["Não, é o expresso.", "No, it's the express.", "いいえ、急行です。", "Iie, kyūkō desu.", "comum", 2],
      ["Preciso recarregar meu cartão.", "I need to top up my card.", "カードにチャージしたいです。", "Kādo にチャージしたいです。", "comum", 5],
      ["A máquina fica ao lado da catraca.", "The machine is next to the gate.", "券売機は改札の横にあります。", "Kenbaiki wa kaisatsu no yoko ni arimasu.", "informacao", 4],
      ["Perdi a última condução.", "I missed the last ride.", "終電を逃しました。", "Shūden o nogashimashita.", "comum", 7],
      ["Podemos chamar um táxi.", "We can call a taxi.", "タクシーを呼びましょう。", "Takushī o yobimashō.", "comum", 6],
      ["Desço na próxima parada.", "I get off at the next stop.", "次の停留所で降ります。", "Tsugi no teiryūjo de orimasu.", "comum", 9],
      ["Com licença, posso passar?", "Excuse me, may I get through?", "すみません、通してください。", "Sumimasen, tōshite kudasai.", "pedir", 8],
    ],
  },
  {
    id: "viagem", emoji: "✈️", name: "Viagem",
    rows: [
      ["Meu voo sai às sete da manhã.", "My flight leaves at seven a.m.", "私のフライトは朝七時発です。", "Watashi no furaito wa asa shichiji hatsu desu.", "comum", 1],
      ["O embarque começa daqui a pouco.", "Boarding starts shortly.", "まもなく搭乗が始まります。", "Mamonaku tōjō ga hajimarimasu.", "formal", 0],
      ["Quero despachar esta mala.", "I'd like to check this suitcase.", "このスーツケースを預けたいです。", "Kono sūtsukēsu o azuketai desu.", "pedir", 3],
      ["Sua bagagem passou do peso.", "Your baggage is overweight.", "手荷物が重量超過です。", "Tenimotsu ga jūryō chōka desu.", "formal", 2],
      ["Estou aqui a turismo.", "I'm here as a tourist.", "観光で来ました。", "Kankō de kimashita.", "comum", 5],
      ["Quanto tempo vai ficar no país?", "How long will you stay in the country?", "この国にはどのくらい滞在しますか？", "Kono kuni ni wa dono kurai taizai shimasu ka?", "formal", 4],
      ["Onde troco dinheiro?", "Where can I exchange money?", "両替はどこでできますか？", "Ryōgae wa doko de dekimasu ka?", "informacao", 7],
      ["Há um balcão depois da alfândega.", "There's a counter after customs.", "税関の先にカウンターがあります。", "Zeikan no saki ni kauntā ga arimasu.", "informacao", 6],
      ["Qual passeio vale a pena?", "Which tour is worth it?", "どのツアーがおすすめですか？", "Dono tsuā ga osusume desu ka?", "informacao", 9],
      ["Comprei um chip de internet.", "I bought a data SIM card.", "データ用のSIMカードを買いました。", "Dēta yō no shimu kādo o kaimashita.", "comum", 8],
    ],
  },
  {
    id: "hotel", emoji: "🏨", name: "Hotel",
    rows: [
      ["Fiz uma reserva pela internet.", "I booked online.", "ネットで予約しました。", "Netto de yoyaku shimashita.", "comum", 1],
      ["Seu quarto fica no quinto andar.", "Your room is on the fifth floor.", "お部屋は五階でございます。", "Oheya wa gokai de gozaimasu.", "formal", 0],
      ["A que horas é o check-out?", "What time is check-out?", "チェックアウトは何時ですか？", "Chekkuauto wa nanji desu ka?", "informacao", 3],
      ["Até as onze da manhã.", "By eleven in the morning.", "午前十一時までです。", "Gozen jūichiji made desu.", "comum", 2],
      ["O ar-condicionado não liga.", "The air conditioner won't turn on.", "エアコンがつきません。", "Eakon ga tsukimasen.", "comum", 5],
      ["Mando alguém subir agora.", "I'll send someone up right away.", "すぐに係の者を向かわせます。", "Sugu ni kakari no mono o mukawasemasu.", "formal", 4],
      ["Pode guardar minha mala até a tarde?", "Could you store my luggage until the afternoon?", "午後まで荷物を預かってもらえますか？", "Gogo made nimotsu o azukatte moraemasu ka?", "pedir", 7],
      ["Preciso de mais toalhas.", "I need more towels.", "タオルを追加でお願いします。", "Taoru o tsuika de onegai shimasu.", "pedir", 6],
      ["O café da manhã está incluso?", "Is breakfast included?", "朝食は込みですか？", "Chōshoku wa komi desu ka?", "informacao", 9],
      ["Serve das seis às dez.", "It's served from six to ten.", "六時から十時までです。", "Rokuji kara jūji made desu.", "comum", 8],
    ],
  },
  {
    id: "escola", emoji: "🏫", name: "Escola",
    rows: [
      ["A aula começa às oito.", "Class starts at eight.", "授業は八時に始まります。", "Jugyō wa hachiji ni hajimarimasu.", "comum", 1],
      ["Esqueci o caderno em casa.", "I left my notebook at home.", "ノートを家に忘れました。", "Nōto o ie ni wasuremashita.", "informal", 0],
      ["Professor, tenho uma dúvida.", "Teacher, I have a question.", "先生、質問があります。", "Sensei, shitsumon ga arimasu.", "formal", 3],
      ["Pode repetir a explicação?", "Could you repeat the explanation?", "説明をもう一度お願いできますか？", "Setsumei o mō ichido onegai dekimasu ka?", "pedir", 2],
      ["A prova é na sexta-feira.", "The test is on Friday.", "テストは金曜日です。", "Tesuto wa kin'yōbi desu.", "informacao", 5],
      ["Vamos estudar juntos na biblioteca?", "Shall we study together at the library?", "図書館で一緒に勉強しませんか？", "Toshokan de issho ni benkyō shimasen ka?", "informal", 4],
      ["Preciso entregar o trabalho amanhã.", "I have to hand in the assignment tomorrow.", "明日レポートを提出しないといけません。", "Ashita repōto o teishutsu shinai to ikemasen.", "comum", 7],
      ["Tirei uma boa nota!", "I got a good grade!", "いい点が取れました！", "Ii ten ga toremashita!", "informal", 6],
      ["Qual é sua matéria favorita?", "What's your favorite subject?", "好きな科目は何ですか？", "Sukina kamoku wa nan desu ka?", "informacao", 9],
      ["Gosto de história e ciências.", "I like history and science.", "歴史と理科が好きです。", "Rekishi to rika ga suki desu.", "comum", 8],
    ],
  },
  {
    id: "trabalho", emoji: "💼", name: "Trabalho",
    rows: [
      ["A reunião foi adiada para as três.", "The meeting was moved to three.", "会議は三時に延期されました。", "Kaigi wa sanji ni enki saremashita.", "comum", 1],
      ["Vou avisar a equipe.", "I'll let the team know.", "チームに伝えておきます。", "Chīmu ni tsutaete okimasu.", "comum", 0],
      ["Pode me enviar o relatório?", "Could you send me the report?", "報告書を送っていただけますか？", "Hōkokusho o okutte itadakemasu ka?", "pedir", 3],
      ["Envio ainda hoje.", "I'll send it before the end of the day.", "今日中に送ります。", "Kyōjū ni okurimasu.", "formal", 2],
      ["Estou em uma ligação agora.", "I'm on a call right now.", "今、電話中です。", "Ima, denwachū desu.", "comum", 5],
      ["Falo com você depois.", "I'll talk to you afterwards.", "後ほどお話しします。", "Nochihodo ohanashi shimasu.", "formal", 4],
      ["Preciso de mais um prazo.", "I need an extension on the deadline.", "締め切りを延ばしていただきたいです。", "Shimekiri o nobashite itadakitai desu.", "pedir", 7],
      ["Tudo bem, até quarta-feira.", "That's fine, until Wednesday.", "大丈夫です、水曜日までに。", "Daijōbu desu, suiyōbi made ni.", "comum", 6],
      ["Bom trabalho, equipe!", "Great job, team!", "お疲れさまでした、皆さん！", "Otsukaresama deshita, minasan!", "fechar", 9],
      ["Vou sair mais cedo hoje.", "I'm leaving earlier today.", "今日は早めに失礼します。", "Kyō wa hayame ni shitsurei shimasu.", "formal", 8],
    ],
  },
  {
    id: "familia", emoji: "👨‍👩‍👧", name: "Família",
    rows: [
      ["Tenho dois irmãos mais novos.", "I have two younger brothers.", "弟が二人います。", "Otōto ga futari imasu.", "apresentar", 1],
      ["Vocês se parecem muito.", "You look a lot alike.", "とてもよく似ていますね。", "Totemo yoku nite imasu ne.", "informal", 0],
      ["Meus avós moram no interior.", "My grandparents live in the countryside.", "祖父母は田舎に住んでいます。", "Sofubo wa inaka ni sunde imasu.", "comum", 3],
      ["Você os visita com frequência?", "Do you visit them often?", "よく会いに行きますか？", "Yoku ai ni ikimasu ka?", "informacao", 2],
      ["Vamos almoçar todos juntos no domingo.", "We're all having lunch together on Sunday.", "日曜日に家族全員で昼food会をします。", "Nichiyōbi ni kazoku zen'in de hirugohan o shimasu.", "informal", 5],
      ["Levo a sobremesa.", "I'll bring dessert.", "デザートを持っていきます。", "Dezāto o motte ikimasu.", "comum", 4],
      ["Minha filha começou a andar.", "My daughter started walking.", "娘が歩き始めました。", "Musume ga arukihajimemashita.", "informal", 7],
      ["Cresce tão rápido!", "They grow up so fast!", "成長が早いですね！", "Seichō ga hayai desu ne!", "comum", 6],
      ["Vou ligar para meus pais.", "I'm going to call my parents.", "両親に電話します。", "Ryōshin ni denwa shimasu.", "comum", 9],
      ["Dê um abraço neles por mim.", "Give them a hug for me.", "私の代わりにハグしてね。", "Watashi no kawari ni hagu shite ne.", "informal", 8],
    ],
  },
  {
    id: "amigos", emoji: "👥", name: "Amigos",
    rows: [
      ["Bora sair no sábado?", "Want to hang out on Saturday?", "土曜日に遊びに行かない？", "Doyōbi ni asobi ni ikanai?", "informal", 1],
      ["Topo! Que horas?", "I'm in! What time?", "いいね！何時？", "Ii ne! Nanji?", "informal", 0],
      ["Chamei mais duas pessoas.", "I invited two more people.", "もう二人誘ったよ。", "Mō futari sasotta yo.", "informal", 3],
      ["Quanto mais, melhor.", "The more the merrier.", "多いほど楽しいね。", "Ōi hodo tanoshii ne.", "informal", 2],
      ["Estou a caminho, atrasei um pouco.", "I'm on my way, running a bit late.", "今向かってる、少し遅れそう。", "Ima mukatteru, sukoshi okuresō.", "informal", 5],
      ["Sem pressa, te espero.", "No rush, I'll wait.", "急がなくていいよ、待ってる。", "Isoganakute ii yo, matteru.", "informal", 4],
      ["Você me salvou ontem.", "You saved me yesterday.", "昨日は本当に助かったよ。", "Kinō wa hontō ni tasukatta yo.", "agradecer", 7],
      ["Conte comigo sempre.", "You can always count on me.", "いつでも頼ってね。", "Itsudemo tayotte ne.", "informal", 6],
      ["Vamos combinar direitinho depois.", "Let's sort out the details later.", "後でちゃんと決めよう。", "Ato de chanto kimeyō.", "informal", 9],
      ["Te mando mensagem hoje à noite.", "I'll text you tonight.", "今夜メッセージ送るね。", "Kon'ya messēji okuru ne.", "informal", 8],
    ],
  },
  {
    id: "hospital", emoji: "🏥", name: "Hospital",
    rows: [
      ["Gostaria de marcar uma consulta.", "I'd like to make an appointment.", "診察の予約をしたいです。", "Shinsatsu no yoyaku o shitai desu.", "pedir", 1],
      ["Trouxe seu cartão do seguro?", "Did you bring your insurance card?", "保険証はお持ちですか？", "Hokenshō wa omochi desu ka?", "formal", 0],
      ["Estou com febre desde ontem.", "I've had a fever since yesterday.", "昨日から熱があります。", "Kinō kara netsu ga arimasu.", "comum", 3],
      ["Vou medir sua temperatura.", "I'll take your temperature.", "体温を測りますね。", "Taion o hakarimasu ne.", "formal", 2],
      ["Dói quando eu respiro fundo.", "It hurts when I breathe deeply.", "深呼吸すると痛みます。", "Shinkokyū suru to itamimasu.", "comum", 5],
      ["Vamos fazer um exame de sangue.", "Let's run a blood test.", "血液検査をしましょう。", "Ketsueki kensa o shimashō.", "formal", 4],
      ["Sou alérgico a penicilina.", "I'm allergic to penicillin.", "ペニシリンにアレルギーがあります。", "Penishirin ni arerugī ga arimasu.", "urgente", 7],
      ["Tome um comprimido após as refeições.", "Take one tablet after meals.", "食後に一錠飲んでください。", "Shokugo ni ichijō nonde kudasai.", "formal", 6],
      ["Onde retiro o medicamento?", "Where do I pick up the medicine?", "薬はどこで受け取りますか？", "Kusuri wa doko de uketorimasu ka?", "informacao", 9],
      ["Melhoras, cuide-se bem.", "Get well soon, take care.", "お大事にしてください。", "Odaiji ni shite kudasai.", "fechar", 8],
    ],
  },
  {
    id: "emergencia", emoji: "🚔", name: "Emergência",
    rows: [
      ["Socorro, preciso de ajuda!", "Help, I need assistance!", "助けてください！", "Tasukete kudasai!", "urgente", 1],
      ["Já acionei o resgate.", "I've already called the rescue team.", "もう救助を呼びました。", "Mō kyūjo o yobimashita.", "urgente", 0],
      ["Houve um acidente na esquina.", "There's been an accident on the corner.", "角で事故がありました。", "Kado de jiko ga arimashita.", "urgente", 3],
      ["Alguém está ferido?", "Is anyone injured?", "けが人はいますか？", "Keganin wa imasu ka?", "urgente", 2],
      ["Sinto cheiro de gás.", "I smell gas.", "ガスの匂いがします。", "Gasu no nioi ga shimasu.", "urgente", 5],
      ["Saiam do prédio imediatamente.", "Leave the building immediately.", "すぐに建物から出てください。", "Sugu ni tatemono kara dete kudasai.", "urgente", 4],
      ["Roubaram minha carteira no metrô.", "My wallet was stolen on the subway.", "地下鉄で財布を盗まれました。", "Chikatetsu de saifu o nusumaremashita.", "urgente", 7],
      ["Precisamos registrar um boletim.", "We need to file a police report.", "被害届を出す必要があります。", "Higaitodoke o dasu hitsuyō ga arimasu.", "formal", 6],
      ["Perdi minha criança de vista.", "I lost sight of my child.", "子どもとはぐれてしまいました。", "Kodomo to hagurete shimaimashita.", "urgente", 9],
      ["Fique aqui, vou procurar ajuda.", "Stay here, I'll go find help.", "ここにいてください、助けを呼んできます。", "Koko ni ite kudasai, tasuke o yonde kimasu.", "urgente", 8],
    ],
  },
  {
    id: "perguntas", emoji: "❓", name: "Perguntas comuns",
    rows: [
      ["Como se diz isto no seu idioma?", "How do you say this in your language?", "これはあなたの言葉で何と言いますか？", "Kore wa anata no kotoba de nan to iimasu ka?", "informacao", 1],
      ["Dizemos assim, repita comigo.", "We say it like this, repeat after me.", "こう言います、一緒に言ってみて。", "Kō iimasu, issho ni itte mite.", "comum", 0],
      ["O que significa esta palavra?", "What does this word mean?", "この単語はどういう意味ですか？", "Kono tango wa dō iu imi desu ka?", "informacao", 3],
      ["Significa algo parecido com 'começar'.", "It means something like 'to begin'.", "「始める」に近い意味です。", "'Hajimeru' ni chikai imi desu.", "comum", 2],
      ["Pode escrever aqui, por favor?", "Could you write it down here, please?", "ここに書いてもらえますか？", "Koko ni kaite moraemasu ka?", "pedir", 5],
      ["Claro, com letra grande.", "Sure, in big letters.", "はい、大きな字で書きますね。", "Hai, ōkina ji de kakimasu ne.", "comum", 4],
      ["Quanto custa isto?", "How much does this cost?", "これはいくらですか？", "Kore wa ikura desu ka?", "informacao", 7],
      ["Custa mil e quinhentos.", "It costs one thousand five hundred.", "千五百円です。", "Sen gohyaku en desu.", "comum", 6],
      ["Estou no caminho certo?", "Am I going the right way?", "この道で合っていますか？", "Kono michi de atte imasu ka?", "informacao", 9],
      ["Siga em frente e vire à esquerda.", "Go straight ahead and turn left.", "まっすぐ行って左に曲がってください。", "Massugu itte hidari ni magatte kudasai.", "informacao", 8],
    ],
  },
  {
    id: "casual", emoji: "💬", name: "Conversas casuais",
    rows: [
      ["Parece que vai chover à tarde.", "Looks like it'll rain in the afternoon.", "午後は雨になりそうですね。", "Gogo wa ame ni narisō desu ne.", "abrir", 1],
      ["Trouxe guarda-chuva por precaução.", "I brought an umbrella just in case.", "念のため傘を持ってきました。", "Nen no tame kasa o motte kimashita.", "comum", 0],
      ["Você acompanha algum esporte?", "Do you follow any sport?", "何かスポーツを見ますか？", "Nanika supōtsu o mimasu ka?", "informacao", 3],
      ["Assisto vôlei nos fins de semana.", "I watch volleyball on weekends.", "週末はバレーボールを見ます。", "Shūmatsu wa barēbōru o mimasu.", "comum", 2],
      ["Descobri um restaurante novo perto daqui.", "I found a new restaurant near here.", "近くに新しいお店を見つけました。", "Chikaku ni atarashii omise o mitsukemashita.", "informal", 5],
      ["Precisamos experimentar qualquer dia.", "We should try it sometime.", "いつか行ってみましょう。", "Itsuka itte mimashō.", "informal", 4],
      ["Estou aprendendo a tocar violão.", "I'm learning to play the guitar.", "ギターを習っています。", "Gitā o naratte imasu.", "comum", 7],
      ["Que legal, faz tempo?", "That's cool, for long?", "いいですね、長くやっていますか？", "Ii desu ne, nagaku yatte imasu ka?", "informal", 6],
      ["Preciso ir andando.", "I should get going.", "そろそろ行きますね。", "Sorosoro ikimasu ne.", "fechar", 9],
      ["Foi ótimo te encontrar.", "It was great running into you.", "会えてよかったです。", "Aete yokatta desu.", "fechar", 8],
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
