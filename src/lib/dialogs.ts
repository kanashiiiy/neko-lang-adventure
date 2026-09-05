// Diálogos do Dia a Dia — conteúdo Premium Plus.
// Cada frase guarda o texto nos três idiomas de aprendizado (pt/en/ja) + romaji.
// A interface (categorias, botões, explicações) é traduzida pelo i18n normal.
// REGRA: nenhuma frase se repete entre categorias; cada par (0-1, 2-3, ...) forma
// um mini-diálogo exclusivo da situação da categoria.

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
      ["Você conseguiu dormir bem?", "Did you sleep well?", "よく眠れましたか？", "Yoku nemuremashita ka?", "informal", 1],
      ["Dormi profundamente, nem ouvi o despertador.", "I slept deeply, I didn't even hear the alarm.", "ぐっすり寝て、目覚ましも聞こえませんでした。", "Gussuri nete, mezamashi mo kikoemasen deshita.", "informal", 0],
      ["Vou preparar o café antes de sair.", "I'll make coffee before I leave.", "出かける前にコーヒーを淹れます。", "Dekakeru mae ni kōhī o iremasu.", "comum", 3],
      ["Coloca uma xícara para mim também?", "Could you pour a cup for me too?", "私の分も入れてくれますか？", "Watashi no bun mo irete kuremasu ka?", "pedir", 2],
      ["Preciso acordar cedo amanhã também.", "I need to get up early tomorrow as well.", "明日も早く起きないといけません。", "Ashita mo hayaku okinai to ikemasen.", "comum", 5],
      ["Então é melhor não dormir tarde hoje.", "Then you'd better not stay up late tonight.", "じゃあ、今夜は夜更かししない方がいいですね。", "Jā, kon'ya wa yofukashi shinai hō ga ii desu ne.", "informal", 4],
      ["As cortinas estão deixando o quarto claro.", "The curtains are letting the room get bright.", "カーテンから朝日が入っていますね。", "Kāten kara asahi ga haitte imasu ne.", "informal", 7],
      ["Abre a janela, o ar da manhã é gostoso.", "Open the window, the morning air feels nice.", "窓を開けて、朝の空気は気持ちいいですよ。", "Mado o akete, asa no kūki wa kimochi ii desu yo.", "informal", 6],
      ["Bom trabalho hoje, nos vemos à noite.", "Have a good day at work, see you tonight.", "今日もお仕事頑張ってね、夜にまた。", "Kyō mo oshigoto ganbatte ne, yoru ni mata.", "fechar", 9],
      ["Vou sair correndo, o ônibus já está vindo.", "I have to run, the bus is already coming.", "バスが来るので急いで出ます。", "Basu ga kuru node isoide demasu.", "comum", 8],
    ],
  },
  {
    id: "boa-tarde", emoji: "☀️", name: "Boa tarde",
    rows: [
      ["Você já terminou o almoço?", "Have you finished lunch yet?", "お昼はもう済みましたか？", "Ohiru wa mō sumimashita ka?", "informacao", 1],
      ["Comi rápido porque estava atrasado.", "I ate quickly because I was running late.", "遅れていたので急いで食べました。", "Okurete ita node isoide tabemashita.", "informal", 0],
      ["Tenho uma reunião daqui a pouco.", "I have a meeting in a little while.", "もうすぐ打ち合わせがあります。", "Mō sugu uchiawase ga arimasu.", "comum", 3],
      ["Depois me conta como foi.", "Tell me how it went afterwards.", "終わったらどうだったか教えてください。", "Owattara dō datta ka oshiete kudasai.", "informal", 2],
      ["A tarde está passando muito rápido.", "The afternoon is going by so fast.", "午後があっという間に過ぎますね。", "Gogo ga atto iu ma ni sugimasu ne.", "informal", 5],
      ["Verdade, ainda tenho metade da lista.", "True, I still have half my list left.", "本当に、まだ半分も残っています。", "Hontō ni, mada hanbun mo nokotte imasu.", "informal", 4],
      ["O sol está forte demais lá fora.", "The sun is way too strong outside.", "外は日差しが強すぎます。", "Soto wa hizashi ga tsuyosugimasu.", "comum", 7],
      ["Vamos ficar na sombra até esfriar.", "Let's stay in the shade until it cools down.", "涼しくなるまで日陰にいましょう。", "Suzushiku naru made hikage ni imashō.", "informal", 6],
      ["Preciso de uma pausa de quinze minutos.", "I need a fifteen-minute break.", "十五分だけ休憩したいです。", "Jūgo-fun dake kyūkei shitai desu.", "pedir", 9],
      ["Aproveite, eu cuido de tudo aqui.", "Go ahead, I'll handle things here.", "どうぞ、こちらは任せてください。", "Dōzo, kochira wa makasete kudasai.", "informal", 8],
    ],
  },
  {
    id: "boa-noite", emoji: "🌙", name: "Boa noite",
    rows: [
      ["Você vai ficar em casa esta noite?", "Are you staying home tonight?", "今夜は家にいますか？", "Kon'ya wa ie ni imasu ka?", "informacao", 1],
      ["Sim, quero descansar depois do dia longo.", "Yes, I want to rest after a long day.", "はい、長い一日だったので休みたいです。", "Hai, nagai ichinichi datta node yasumitai desu.", "informal", 0],
      ["Vou tomar um banho e relaxar.", "I'm going to take a bath and relax.", "お風呂に入ってのんびりします。", "Ofuro ni haitte nonbiri shimasu.", "comum", 3],
      ["A água já está quente.", "The water is already hot.", "お湯はもう沸いていますよ。", "Oyu wa mō waite imasu yo.", "informal", 2],
      ["Que filme você pretende assistir?", "Which movie are you planning to watch?", "どの映画を見るつもりですか？", "Dono eiga o miru tsumori desu ka?", "informacao", 5],
      ["Um drama antigo que baixei ontem.", "An old drama I downloaded yesterday.", "昨日ダウンロードした古いドラマです。", "Kinō daunrōdo shita furui dorama desu.", "informal", 4],
      ["Deixe uma luz acesa no corredor.", "Leave a light on in the hallway.", "廊下の電気をつけておいてください。", "Rōka no denki o tsukete oite kudasai.", "pedir", 7],
      ["Já deixei, e tranquei a porta.", "I already did, and I locked the door.", "つけました。鍵もかけましたよ。", "Tsukemashita. Kagi mo kakemashita yo.", "informal", 6],
      ["Durma bem e sonhe com coisas boas.", "Sleep well and have sweet dreams.", "ゆっくり寝て、いい夢を見てね。", "Yukkuri nete, ii yume o mite ne.", "fechar", 9],
      ["Vou apagar a luz agora.", "I'm turning off the light now.", "もう電気を消しますね。", "Mō denki o keshimasu ne.", "informal", 8],
    ],
  },
  {
    id: "cumprimentos", emoji: "👋", name: "Cumprimentos",
    rows: [
      ["Quanto tempo sem te ver!", "Long time no see!", "お久しぶりです！", "Ohisashiburi desu!", "abrir", 1],
      ["Nossa, deve fazer uns dois anos.", "Wow, it must be about two years.", "わあ、二年ぶりくらいですね。", "Wā, ninen-buri kurai desu ne.", "informal", 0],
      ["Que surpresa encontrar você aqui.", "What a surprise to run into you here.", "ここで会うなんて驚きました。", "Koko de au nante odorokimashita.", "informal", 3],
      ["Eu venho por aqui toda semana.", "I come around here every week.", "毎週この辺に来ているんです。", "Maishū kono hen ni kite iru n desu.", "informal", 2],
      ["Seja bem-vindo, entre por favor.", "Welcome, please come in.", "ようこそ、どうぞお入りください。", "Yōkoso, dōzo ohairi kudasai.", "formal", 5],
      ["Obrigado por me receber.", "Thank you for having me.", "お招きありがとうございます。", "Omaneki arigatō gozaimasu.", "agradecer", 4],
      ["Manda um abraço para a sua irmã.", "Say hi to your sister for me.", "お姉さんによろしく伝えてください。", "Onēsan ni yoroshiku tsutaete kudasai.", "informal", 7],
      ["Pode deixar, ela vai gostar de saber.", "Sure, she'll be glad to hear it.", "はい、喜ぶと思います。", "Hai, yorokobu to omoimasu.", "informal", 6],
      ["Até a próxima, se cuide.", "Until next time, take care.", "また今度、気をつけてね。", "Mata kondo, ki o tsukete ne.", "fechar", 9],
      ["Vamos marcar algo em breve.", "Let's set something up soon.", "近いうちに予定を決めましょう。", "Chikai uchi ni yotei o kimemashō.", "fechar", 8],
    ],
  },
  {
    id: "apresentacao", emoji: "🙋", name: "Apresentação",
    rows: [
      ["Meu nome é Ana, prazer.", "My name is Ana, nice to meet you.", "アナと申します。よろしくお願いします。", "Ana to mōshimasu. Yoroshiku onegai shimasu.", "apresentar", 1],
      ["O prazer é meu, sou o Kenji.", "The pleasure is mine, I'm Kenji.", "こちらこそ、健二です。", "Kochira koso, Kenji desu.", "apresentar", 0],
      ["Sou do Brasil, da cidade de Belém.", "I'm from Brazil, from the city of Belém.", "ブラジルのベレン出身です。", "Burajiru no Beren shusshin desu.", "apresentar", 3],
      ["Nunca estive lá, deve ser lindo.", "I've never been there, it must be beautiful.", "行ったことがありません。きれいでしょうね。", "Itta koto ga arimasen. Kirei deshō ne.", "informal", 2],
      ["Trabalho como designer há cinco anos.", "I've worked as a designer for five years.", "デザイナーとして五年働いています。", "Dezainā to shite gonen hataraite imasu.", "apresentar", 5],
      ["Interessante, e o que te trouxe aqui?", "Interesting, and what brought you here?", "面白いですね。何がきっかけで来たんですか？", "Omoshiroi desu ne. Nani ga kikkake de kita n desu ka?", "informacao", 4],
      ["Pode me chamar apenas de Ana.", "You can just call me Ana.", "アナと呼んでください。", "Ana to yonde kudasai.", "apresentar", 7],
      ["Combinado, sem formalidade então.", "Got it, no formalities then.", "分かりました、では気軽に。", "Wakarimashita, dewa kigaru ni.", "informal", 6],
      ["Aqui está meu cartão de contato.", "Here is my contact card.", "こちらが私の名刺です。", "Kochira ga watashi no meishi desu.", "formal", 9],
      ["Vou guardar, obrigado pela apresentação.", "I'll keep it, thanks for introducing yourself.", "いただきます。ご挨拶ありがとうございます。", "Itadakimasu. Goaisatsu arigatō gozaimasu.", "agradecer", 8],
    ],
  },
  {
    id: "como-esta", emoji: "😊", name: "Como você está?",
    rows: [
      ["Como você tem passado ultimamente?", "How have you been lately?", "最近どう過ごしていますか？", "Saikin dō sugoshite imasu ka?", "abrir", 1],
      ["Bem, só um pouco ocupado com estudos.", "Fine, just a bit busy with studies.", "元気です。勉強で少し忙しいだけです。", "Genki desu. Benkyō de sukoshi isogashii dake desu.", "informal", 0],
      ["Você parece cansado hoje.", "You look tired today.", "今日は疲れているみたいですね。", "Kyō wa tsukarete iru mitai desu ne.", "informal", 3],
      ["Dormi pouco, mas já estou melhor.", "I didn't sleep much, but I feel better now.", "あまり寝ていませんが、もう大丈夫です。", "Amari nete imasen ga, mō daijōbu desu.", "informal", 2],
      ["Está tudo certo com a sua família?", "Is everything alright with your family?", "ご家族はお変わりありませんか？", "Gokazoku wa okawari arimasen ka?", "formal", 5],
      ["Todos bem, obrigado por perguntar.", "Everyone's well, thanks for asking.", "みんな元気です。ご心配ありがとうございます。", "Minna genki desu. Goshinpai arigatō gozaimasu.", "agradecer", 4],
      ["Ando um pouco estressado esta semana.", "I've been a bit stressed this week.", "今週は少しストレスがたまっています。", "Konshū wa sukoshi sutoresu ga tamatte imasu.", "informal", 7],
      ["Se precisar conversar, estou por perto.", "If you need to talk, I'm around.", "話したくなったらいつでも言ってください。", "Hanashitaku nattara itsudemo itte kudasai.", "informal", 6],
      ["Melhorou depois daquele problema?", "Did things get better after that problem?", "あの件のあと、良くなりましたか？", "Ano ken no ato, yoku narimashita ka?", "informacao", 9],
      ["Resolvi tudo na semana passada.", "I sorted it all out last week.", "先週すべて解決しました。", "Senshū subete kaiketsu shimashita.", "comum", 8],
    ],
  },
  {
    id: "cafeteria", emoji: "☕", name: "Cafeteria",
    rows: [
      ["Um café com leite médio, por favor.", "A medium latte, please.", "カフェラテのMサイズをお願いします。", "Kafe rate no emu saizu o onegai shimasu.", "pedir", 1],
      ["Para viagem ou para tomar aqui?", "To go or for here?", "お持ち帰りですか、店内ですか？", "Omochikaeri desu ka, tennai desu ka?", "informacao", 0],
      ["Vocês têm leite de aveia?", "Do you have oat milk?", "オーツミルクはありますか？", "Ōtsu miruku wa arimasu ka?", "informacao", 3],
      ["Temos, custa um pouco mais.", "We do, it costs a little extra.", "ございます。少し追加料金がかかります。", "Gozaimasu. Sukoshi tsuika ryōkin ga kakarimasu.", "informacao", 2],
      ["Pode tirar o açúcar do meu pedido?", "Could you leave the sugar out of my order?", "砂糖なしにしてもらえますか？", "Satō nashi ni shite moraemasu ka?", "pedir", 5],
      ["Sem açúcar, anotado.", "No sugar, noted.", "砂糖なしですね、承知しました。", "Satō nashi desu ne, shōchi shimashita.", "formal", 4],
      ["Aquele bolo de limão parece ótimo.", "That lemon cake looks great.", "あのレモンケーキ、おいしそうですね。", "Ano remon kēki, oishisō desu ne.", "informal", 7],
      ["É o mais pedido da casa.", "It's our most popular one.", "当店で一番人気です。", "Tōten de ichiban ninki desu.", "informacao", 6],
      ["A senha do wi-fi está no balcão?", "Is the wi-fi password at the counter?", "Wi-Fiのパスワードはカウンターにありますか？", "Waifai no pasuwādo wa kauntā ni arimasu ka?", "informacao", 9],
      ["Está impressa no seu recibo.", "It's printed on your receipt.", "レシートに印刷されています。", "Reshīto ni insatsu sarete imasu.", "informacao", 8],
    ],
  },
  {
    id: "restaurante", emoji: "🍽️", name: "Restaurante",
    rows: [
      ["Tenho reserva para duas pessoas.", "I have a reservation for two.", "二名で予約しています。", "Nimei de yoyaku shite imasu.", "formal", 1],
      ["Por aqui, sua mesa é perto da janela.", "This way, your table is by the window.", "こちらへどうぞ。窓際のお席です。", "Kochira e dōzo. Madogiwa no oseki desu.", "formal", 0],
      ["Qual prato o chef recomenda hoje?", "What does the chef recommend today?", "本日のおすすめは何ですか？", "Honjitsu no osusume wa nan desu ka?", "informacao", 3],
      ["O peixe grelhado está excelente.", "The grilled fish is excellent.", "焼き魚がとてもおいしいです。", "Yakizakana ga totemo oishii desu.", "informacao", 2],
      ["Sou alérgico a camarão.", "I'm allergic to shrimp.", "エビのアレルギーがあります。", "Ebi no arerugī ga arimasu.", "urgente", 5],
      ["Vou avisar a cozinha imediatamente.", "I'll inform the kitchen right away.", "すぐに厨房に伝えます。", "Sugu ni chūbō ni tsutaemasu.", "formal", 4],
      ["Pode trazer mais um pouco de água?", "Could you bring a bit more water?", "お水をもう少しいただけますか？", "Omizu o mō sukoshi itadakemasu ka?", "pedir", 7],
      ["Claro, trago em um instante.", "Of course, right away.", "はい、すぐにお持ちします。", "Hai, sugu ni omochi shimasu.", "formal", 6],
      ["A conta, por favor, vamos dividir.", "The bill, please, we'll split it.", "お会計をお願いします。割り勘で。", "Okaikei o onegai shimasu. Warikan de.", "pedir", 9],
      ["Estava tudo delicioso, parabéns.", "Everything was delicious, well done.", "全部おいしかったです。ごちそうさまでした。", "Zenbu oishikatta desu. Gochisōsama deshita.", "agradecer", 8],
    ],
  },
  {
    id: "compras", emoji: "🛒", name: "Compras",
    rows: [
      ["Vocês têm esta blusa em tamanho maior?", "Do you have this blouse in a bigger size?", "このブラウスの大きいサイズはありますか？", "Kono burausu no ōkii saizu wa arimasu ka?", "informacao", 1],
      ["Vou verificar no estoque para você.", "I'll check the stockroom for you.", "在庫を確認してきます。", "Zaiko o kakunin shite kimasu.", "formal", 0],
      ["Posso experimentar antes de levar?", "Can I try it on before buying?", "試着してもいいですか？", "Shichaku shite mo ii desu ka?", "pedir", 3],
      ["O provador fica no fundo à direita.", "The fitting room is at the back on the right.", "試着室は奥の右側です。", "Shichakushitsu wa oku no migigawa desu.", "informacao", 2],
      ["Este produto está em promoção?", "Is this item on sale?", "この商品はセール中ですか？", "Kono shōhin wa sēru-chū desu ka?", "informacao", 5],
      ["Sim, trinta por cento de desconto.", "Yes, thirty percent off.", "はい、三十パーセント引きです。", "Hai, sanjuppāsento-biki desu.", "informacao", 4],
      ["Aceitam cartão ou só dinheiro?", "Do you take card or only cash?", "カードは使えますか、現金だけですか？", "Kādo wa tsukaemasu ka, genkin dake desu ka?", "informacao", 7],
      ["Aceitamos cartão e pagamento por aplicativo.", "We take cards and app payments.", "カードとアプリ決済が使えます。", "Kādo to apuri kessai ga tsukaemasu.", "informacao", 6],
      ["Pode embrulhar para presente?", "Could you gift wrap it?", "プレゼント用に包んでもらえますか？", "Purezento-yō ni tsutsunde moraemasu ka?", "pedir", 9],
      ["Guarde a nota para trocas.", "Keep the receipt for exchanges.", "交換の際はレシートが必要です。", "Kōkan no sai wa reshīto ga hitsuyō desu.", "informacao", 8],
    ],
  },
  {
    id: "transporte", emoji: "🚆", name: "Transporte",
    rows: [
      ["Qual plataforma vai para o centro?", "Which platform goes downtown?", "都心行きは何番ホームですか？", "Toshin-yuki wa nanban hōmu desu ka?", "informacao", 1],
      ["Plataforma três, o próximo sai em cinco minutos.", "Platform three, the next one leaves in five minutes.", "三番ホームです。次は五分後に出ます。", "Sanban hōmu desu. Tsugi wa gofun-go ni demasu.", "informacao", 0],
      ["Preciso trocar de linha em algum lugar?", "Do I need to change lines anywhere?", "どこかで乗り換えが必要ですか？", "Dokoka de norikae ga hitsuyō desu ka?", "informacao", 3],
      ["Troque na terceira estação.", "Change at the third station.", "三つ目の駅で乗り換えてください。", "Mittsume no eki de norikaete kudasai.", "informacao", 2],
      ["Onde recarrego meu cartão de transporte?", "Where can I top up my transit card?", "交通カードはどこでチャージできますか？", "Kōtsū kādo wa doko de chāji dekimasu ka?", "informacao", 5],
      ["Nas máquinas amarelas ao lado da catraca.", "At the yellow machines next to the gate.", "改札の横の黄色い機械でできます。", "Kaisatsu no yoko no kiiroi kikai de dekimasu.", "informacao", 4],
      ["Este assento está livre?", "Is this seat free?", "この席は空いていますか？", "Kono seki wa aite imasu ka?", "pedir", 7],
      ["Está sim, pode sentar.", "It is, please sit down.", "空いていますよ、どうぞ。", "Aite imasu yo, dōzo.", "informal", 6],
      ["O ônibus está muito atrasado hoje.", "The bus is very late today.", "今日はバスがかなり遅れています。", "Kyō wa basu ga kanari okurete imasu.", "comum", 9],
      ["Houve um acidente na avenida.", "There was an accident on the avenue.", "大通りで事故があったそうです。", "Ōdōri de jiko ga atta sō desu.", "informacao", 8],
    ],
  },
  {
    id: "viagem", emoji: "✈️", name: "Viagem",
    rows: [
      ["Meu voo faz escala em Tóquio.", "My flight has a layover in Tokyo.", "私の便は東京で乗り継ぎがあります。", "Watashi no bin wa Tōkyō de noritsugi ga arimasu.", "comum", 1],
      ["Quantas horas você espera lá?", "How many hours do you wait there?", "そこで何時間待ちますか？", "Soko de nanjikan machimasu ka?", "informacao", 0],
      ["Posso levar esta mala como bagagem de mão?", "Can I take this bag as carry-on?", "このかばんは機内持ち込みできますか？", "Kono kaban wa kinai mochikomi dekimasu ka?", "informacao", 3],
      ["Precisa caber no medidor ali.", "It has to fit in that sizer over there.", "あちらのサイズ枠に入れば大丈夫です。", "Achira no saizu waku ni haireba daijōbu desu.", "informacao", 2],
      ["Vim a passeio, fico dez dias.", "I'm here for tourism, staying ten days.", "観光で来ました。十日間滞在します。", "Kankō de kimashita. Tōkakan taizai shimasu.", "formal", 5],
      ["Tenha uma boa estadia no país.", "Enjoy your stay in the country.", "滞在を楽しんでください。", "Taizai o tanoshinde kudasai.", "formal", 4],
      ["Onde fica a esteira de bagagem?", "Where is the baggage claim?", "手荷物受取所はどこですか？", "Tenimotsu uketorijo wa doko desu ka?", "informacao", 7],
      ["Descendo a escada, à esquerda.", "Down the stairs, on the left.", "階段を下りて左側です。", "Kaidan o orite hidarigawa desu.", "informacao", 6],
      ["Preciso trocar dinheiro no aeroporto.", "I need to exchange money at the airport.", "空港で両替したいです。", "Kūkō de ryōgae shitai desu.", "comum", 9],
      ["A casa de câmbio abre às sete.", "The exchange counter opens at seven.", "両替所は七時に開きます。", "Ryōgaejo wa shichiji ni akimasu.", "informacao", 8],
    ],
  },
  {
    id: "hotel", emoji: "🏨", name: "Hotel",
    rows: [
      ["Gostaria de fazer o check-in.", "I'd like to check in.", "チェックインをお願いします。", "Chekkuin o onegai shimasu.", "formal", 1],
      ["Seu documento, por gentileza.", "Your ID, please.", "身分証明書をお願いします。", "Mibun shōmeisho o onegai shimasu.", "formal", 0],
      ["O café da manhã está incluído?", "Is breakfast included?", "朝食は含まれていますか？", "Chōshoku wa fukumarete imasu ka?", "informacao", 3],
      ["Sim, no salão do segundo andar.", "Yes, in the hall on the second floor.", "はい、二階の会場でどうぞ。", "Hai, nikai no kaijō de dōzo.", "informacao", 2],
      ["O ar-condicionado do quarto não liga.", "The air conditioner in my room won't turn on.", "部屋のエアコンがつきません。", "Heya no eakon ga tsukimasen.", "urgente", 5],
      ["Mando a manutenção agora mesmo.", "I'll send maintenance right now.", "すぐに係の者を向かわせます。", "Sugu ni kakari no mono o mukawasemasu.", "formal", 4],
      ["Podem guardar minha mala até a tarde?", "Can you store my suitcase until the afternoon?", "午後まで荷物を預かってもらえますか？", "Gogo made nimotsu o azukatte moraemasu ka?", "pedir", 7],
      ["Sem problemas, aqui está sua etiqueta.", "No problem, here's your tag.", "大丈夫です。こちらが引換札です。", "Daijōbu desu. Kochira ga hikikaefuda desu.", "formal", 6],
      ["A que horas é a saída do quarto?", "What time is checkout?", "チェックアウトは何時ですか？", "Chekkuauto wa nanji desu ka?", "informacao", 9],
      ["Até as onze, com atraso pago à parte.", "Until eleven, late checkout costs extra.", "十一時までです。延長は別料金です。", "Jūichiji made desu. Enchō wa betsu ryōkin desu.", "informacao", 8],
    ],
  },
  {
    id: "escola", emoji: "🏫", name: "Escola",
    rows: [
      ["A prova cai em qual capítulo?", "Which chapter does the test cover?", "テストはどの章から出ますか？", "Tesuto wa dono shō kara demasu ka?", "informacao", 1],
      ["Do quinto ao sétimo, disse a professora.", "From five to seven, the teacher said.", "五章から七章までだと先生が言っていました。", "Goshō kara nanashō made da to sensei ga itte imashita.", "informacao", 0],
      ["Você pode me emprestar suas anotações?", "Could you lend me your notes?", "ノートを貸してもらえますか？", "Nōto o kashite moraemasu ka?", "pedir", 3],
      ["Levo amanhã para a sala.", "I'll bring them to class tomorrow.", "明日、教室に持っていきます。", "Ashita, kyōshitsu ni motte ikimasu.", "informal", 2],
      ["Não entendi o exercício da lousa.", "I didn't understand the exercise on the board.", "黒板の問題が分かりませんでした。", "Kokuban no mondai ga wakarimasen deshita.", "comum", 5],
      ["Pergunte no intervalo, ela explica de novo.", "Ask during the break, she'll explain again.", "休み時間に聞けば、また説明してくれますよ。", "Yasumi jikan ni kikeba, mata setsumei shite kuremasu yo.", "informal", 4],
      ["A entrega do trabalho é na sexta.", "The assignment is due on Friday.", "レポートの提出は金曜日です。", "Repōto no teishutsu wa kin'yōbi desu.", "informacao", 7],
      ["Ainda nem escolhi o tema.", "I haven't even picked a topic yet.", "まだテーマも決めていません。", "Mada tēma mo kimete imasen.", "informal", 6],
      ["Vamos estudar juntos na biblioteca?", "Shall we study together at the library?", "図書館で一緒に勉強しませんか？", "Toshokan de issho ni benkyō shimasen ka?", "informal", 9],
      ["Combinado, depois da última aula.", "Deal, after the last class.", "いいですね、最後の授業のあとで。", "Ii desu ne, saigo no jugyō no ato de.", "informal", 8],
    ],
  },
  {
    id: "trabalho", emoji: "💼", name: "Trabalho",
    rows: [
      ["Consegue revisar este relatório hoje?", "Can you review this report today?", "この報告書を今日中に確認できますか？", "Kono hōkokusho o kyōjū ni kakunin dekimasu ka?", "pedir", 1],
      ["Consigo, mando os comentários à tarde.", "I can, I'll send comments in the afternoon.", "できます。午後にコメントを送ります。", "Dekimasu. Gogo ni komento o okurimasu.", "formal", 0],
      ["O prazo do projeto foi adiado.", "The project deadline was postponed.", "プロジェクトの締め切りが延びました。", "Purojekuto no shimekiri ga nobimashita.", "informacao", 3],
      ["Isso alivia bastante a equipe.", "That takes a lot of pressure off the team.", "チームはかなり助かりますね。", "Chīmu wa kanari tasukarimasu ne.", "comum", 2],
      ["Vou entrar na reunião pelo celular.", "I'll join the meeting from my phone.", "会議にはスマホから参加します。", "Kaigi ni wa sumaho kara sanka shimasu.", "comum", 5],
      ["Ative o microfone só na sua parte.", "Turn on your mic only for your part.", "自分の番だけマイクをオンにしてください。", "Jibun no ban dake maiku o on ni shite kudasai.", "pedir", 4],
      ["Preciso tirar folga na próxima terça.", "I need a day off next Tuesday.", "来週の火曜日に休みを取りたいです。", "Raishū no kayōbi ni yasumi o toritai desu.", "formal", 7],
      ["Registre no sistema até amanhã.", "Register it in the system by tomorrow.", "明日までにシステムに申請してください。", "Ashita made ni shisutemu ni shinsei shite kudasai.", "formal", 6],
      ["Obrigado pelo esforço de hoje.", "Thank you for your hard work today.", "今日もお疲れ様でした。", "Kyō mo otsukaresama deshita.", "agradecer", 9],
      ["Amanhã continuamos do ponto que paramos.", "Tomorrow we continue where we left off.", "明日は続きからやりましょう。", "Ashita wa tsuzuki kara yarimashō.", "fechar", 8],
    ],
  },
  {
    id: "familia", emoji: "👨‍👩‍👧", name: "Família",
    rows: [
      ["Meu irmão mais novo entrou na faculdade.", "My younger brother started university.", "弟が大学に入りました。", "Otōto ga daigaku ni hairimashita.", "informal", 1],
      ["Que orgulho, ele estudou muito.", "How proud, he studied so hard.", "すごいですね、よく頑張りました。", "Sugoi desu ne, yoku ganbarimashita.", "informal", 0],
      ["Vamos almoçar na casa da vovó domingo.", "We're having lunch at grandma's on Sunday.", "日曜日はおばあちゃんの家でお昼です。", "Nichiyōbi wa obāchan no ie de ohiru desu.", "informal", 3],
      ["Levo a sobremesa então.", "I'll bring dessert then.", "じゃあ、デザートを持っていきます。", "Jā, dezāto o motte ikimasu.", "informal", 2],
      ["Meus pais moram em outra cidade.", "My parents live in another city.", "両親は別の町に住んでいます。", "Ryōshin wa betsu no machi ni sunde imasu.", "comum", 5],
      ["Você os visita com frequência?", "Do you visit them often?", "よく会いに行きますか？", "Yoku ai ni ikimasu ka?", "informacao", 4],
      ["A minha filha perdeu o primeiro dente.", "My daughter lost her first tooth.", "娘の乳歯が初めて抜けました。", "Musume no nyūshi ga hajimete nukemashita.", "informal", 7],
      ["Ela deve estar animada com isso.", "She must be excited about that.", "きっと大喜びでしょうね。", "Kitto ōyorokobi deshō ne.", "informal", 6],
      ["Precisamos tirar uma foto de todos juntos.", "We need to take a photo of everyone together.", "みんなで집集写真を撮りましょう。", "Minna de shūgō shashin o torimashō.", "informal", 9],
      ["Coloco o celular no timer.", "I'll set the phone timer.", "スマホのタイマーをセットします。", "Sumaho no taimā o setto shimasu.", "informal", 8],
    ],
  },
  {
    id: "amigos", emoji: "👥", name: "Amigos",
    rows: [
      ["Bora jogar bola no sábado?", "Wanna play soccer on Saturday?", "土曜日にサッカーしない？", "Doyōbi ni sakkā shinai?", "informal", 1],
      ["Topo, chamo o pessoal do grupo.", "I'm in, I'll invite the group.", "いいね、グループのみんなを誘うよ。", "Ii ne, gurūpu no minna o sasou yo.", "informal", 0],
      ["Você viu o vídeo que te mandei?", "Did you see the video I sent you?", "送った動画、見た？", "Okutta dōga, mita?", "informal", 3],
      ["Vi e ri muito, mandei pro meu primo.", "I saw it and laughed a lot, sent it to my cousin.", "見たよ、めっちゃ笑って従兄弟にも送った。", "Mita yo, meccha waratte itoko ni mo okutta.", "informal", 2],
      ["Desculpa o atraso, o trânsito travou.", "Sorry I'm late, traffic was stuck.", "遅れてごめん、渋滞にはまってた。", "Okurete gomen, jūtai ni hamatteta.", "informal", 5],
      ["Relaxa, acabamos de chegar também.", "Relax, we just got here too.", "大丈夫、こっちも今来たところ。", "Daijōbu, kocchi mo ima kita tokoro.", "informal", 4],
      ["Podemos rachar a conta do lanche.", "We can split the snack bill.", "軽食代は割り勘にしよう。", "Keishoku-dai wa warikan ni shiyō.", "informal", 7],
      ["Eu pago hoje, você paga da próxima.", "I'll pay today, you pay next time.", "今日は僕が払うよ、次は君ね。", "Kyō wa boku ga harau yo, tsugi wa kimi ne.", "informal", 6],
      ["Guardei um lugar para você aqui.", "I saved a spot for you here.", "ここに席を取っておいたよ。", "Koko ni seki o totte oita yo.", "informal", 9],
      ["Valeu, você é o melhor.", "Thanks, you're the best.", "ありがとう、最高だね。", "Arigatō, saikō da ne.", "agradecer", 8],
    ],
  },
  {
    id: "hospital", emoji: "🏥", name: "Hospital",
    rows: [
      ["Quero marcar uma consulta com o clínico.", "I'd like to book an appointment with a physician.", "内科の予約を取りたいです。", "Naika no yoyaku o toritai desu.", "formal", 1],
      ["Há uma vaga na quinta de manhã.", "There's an opening Thursday morning.", "木曜日の午前に空きがあります。", "Mokuyōbi no gozen ni aki ga arimasu.", "informacao", 0],
      ["Estou com dor de garganta há três dias.", "I've had a sore throat for three days.", "三日前から喉が痛いです。", "Mikka mae kara nodo ga itai desu.", "comum", 3],
      ["Vou examinar sua garganta agora.", "I'll examine your throat now.", "では喉を診てみましょう。", "Dewa nodo o mite mimashō.", "formal", 2],
      ["Tomo remédio para pressão alta.", "I take medication for high blood pressure.", "血圧の薬を飲んでいます。", "Ketsuatsu no kusuri o nonde imasu.", "informacao", 5],
      ["Traga a caixa na próxima visita.", "Bring the box on your next visit.", "次回、薬の箱を持ってきてください。", "Jikai, kusuri no hako o motte kite kudasai.", "pedir", 4],
      ["Preciso de um atestado para o trabalho.", "I need a medical note for work.", "職場用の診断書が必要です。", "Shokuba-yō no shindansho ga hitsuyō desu.", "pedir", 7],
      ["Retire na recepção em uma hora.", "Pick it up at reception in an hour.", "一時間後に受付でお受け取りください。", "Ichijikan-go ni uketsuke de ouketori kudasai.", "formal", 6],
      ["A farmácia do hospital fica onde?", "Where is the hospital pharmacy?", "院内の薬局はどこですか？", "Innai no yakkyoku wa doko desu ka?", "informacao", 9],
      ["No térreo, ao lado da saída.", "On the ground floor, next to the exit.", "一階の出口の隣です。", "Ikkai no deguchi no tonari desu.", "informacao", 8],
    ],
  },
  {
    id: "emergencia", emoji: "🚨", name: "Emergência",
    rows: [
      ["Chame uma ambulância, por favor!", "Please call an ambulance!", "救急車を呼んでください！", "Kyūkyūsha o yonde kudasai!", "urgente", 1],
      ["Já estou ligando, fique calmo.", "I'm calling now, stay calm.", "今かけています。落ち着いてください。", "Ima kakete imasu. Ochitsuite kudasai.", "urgente", 0],
      ["Houve um acidente na esquina.", "There's been an accident at the corner.", "角で事故が起きました。", "Kado de jiko ga okimashita.", "urgente", 3],
      ["Alguém está ferido?", "Is anyone injured?", "けが人はいますか？", "Keganin wa imasu ka?", "urgente", 2],
      ["Roubaram minha carteira no metrô.", "My wallet was stolen on the subway.", "地下鉄で財布を盗まれました。", "Chikatetsu de saifu o nusumaremashita.", "urgente", 5],
      ["Vá à delegacia mais próxima e registre.", "Go to the nearest police station and report it.", "近くの交番で届け出てください。", "Chikaku no kōban de todokedete kudasai.", "urgente", 4],
      ["Estou sentindo cheiro de gás aqui.", "I smell gas in here.", "ここでガスの匂いがします。", "Koko de gasu no nioi ga shimasu.", "urgente", 7],
      ["Saia do prédio imediatamente.", "Leave the building immediately.", "すぐに建物から出てください。", "Sugu ni tatemono kara dete kudasai.", "urgente", 6],
      ["Me perdi e meu celular descarregou.", "I'm lost and my phone died.", "道に迷って、スマホの電池も切れました。", "Michi ni mayotte, sumaho no denchi mo kiremashita.", "urgente", 9],
      ["Use meu telefone para avisar alguém.", "Use my phone to let someone know.", "私の電話で連絡してください。", "Watashi no denwa de renraku shite kudasai.", "pedir", 8],
    ],
  },
  {
    id: "perguntas", emoji: "❓", name: "Perguntas comuns",
    rows: [
      ["Como se escreve essa palavra?", "How do you spell that word?", "その単語はどう書きますか？", "Sono tango wa dō kakimasu ka?", "informacao", 1],
      ["Escreve-se com dois esses.", "It's written with two s's.", "エスを二つ重ねて書きます。", "Esu o futatsu kasanete kakimasu.", "informacao", 0],
      ["Pode repetir mais devagar?", "Could you repeat that more slowly?", "もう少しゆっくり言ってもらえますか？", "Mō sukoshi yukkuri itte moraemasu ka?", "pedir", 3],
      ["Claro, falei rápido demais.", "Sure, I spoke too fast.", "はい、早口すぎましたね。", "Hai, hayakuchi sugimashita ne.", "informal", 2],
      ["O que significa isso na sua língua?", "What does that mean in your language?", "それはあなたの言葉で何という意味ですか？", "Sore wa anata no kotoba de nan to iu imi desu ka?", "informacao", 5],
      ["Significa algo parecido com saudade.", "It means something close to longing.", "「懐かしさ」に近い意味です。", "\"Natsukashisa\" ni chikai imi desu.", "informacao", 4],
      ["Quanto tempo leva daqui até lá?", "How long does it take from here to there?", "ここからそこまでどのくらいかかりますか？", "Koko kara soko made dono kurai kakarimasu ka?", "informacao", 7],
      ["Uns vinte minutos a pé.", "About twenty minutes on foot.", "歩いて二十分ほどです。", "Aruite nijuppun hodo desu.", "informacao", 6],
      ["Existe alguma regra para esse caso?", "Is there any rule for this case?", "この場合に決まりはありますか？", "Kono baai ni kimari wa arimasu ka?", "informacao", 9],
      ["Há uma exceção que você vai decorar.", "There's an exception you'll just memorize.", "覚えるしかない例外があります。", "Oboeru shika nai reigai ga arimasu.", "informacao", 8],
    ],
  },
  {
    id: "casual", emoji: "💬", name: "Conversas casuais",
    rows: [
      ["Você tem visto alguma série boa?", "Have you been watching any good series?", "何か面白いドラマ見ていますか？", "Nanika omoshiroi dorama mite imasu ka?", "abrir", 1],
      ["Comecei uma de ficção científica ontem.", "I started a sci-fi one yesterday.", "昨日SFのを見始めました。", "Kinō esu-efu no o mihajimemashita.", "informal", 0],
      ["Estou aprendendo a tocar violão.", "I'm learning to play the guitar.", "ギターを習っています。", "Gitā o naratte imasu.", "comum", 3],
      ["Que legal, já sabe alguma música?", "Nice, can you play a song yet?", "いいですね、もう一曲弾けますか？", "Ii desu ne, mō ikkyoku hikemasu ka?", "informal", 2],
      ["O tempo mudou de repente hoje.", "The weather changed suddenly today.", "今日は急に天気が変わりましたね。", "Kyō wa kyū ni tenki ga kawarimashita ne.", "abrir", 5],
      ["De manhã estava um céu limpo.", "This morning the sky was clear.", "朝は快晴だったのに。", "Asa wa kaisei datta noni.", "informal", 4],
      ["Descobri uma feira de artesanato no bairro.", "I found a craft fair in the neighborhood.", "近所で手作り市を見つけました。", "Kinjo de tezukuri-ichi o mitsukemashita.", "informal", 7],
      ["Vamos dar uma volta lá no domingo.", "Let's walk around there on Sunday.", "日曜日に見に行きましょう。", "Nichiyōbi ni mi ni ikimashō.", "informal", 6],
      ["Preciso ir andando, foi bom conversar.", "I should get going, it was nice talking.", "そろそろ行きますね、話せてよかったです。", "Sorosoro ikimasu ne, hanasete yokatta desu.", "fechar", 9],
      ["Continuamos essa conversa outro dia.", "Let's continue this chat another day.", "この続きはまた今度話しましょう。", "Kono tsuzuki wa mata kondo hanashimashō.", "fechar", 8],
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
