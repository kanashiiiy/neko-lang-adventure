import type { LearnLang } from "@/lib/dialogs";

export interface DialogueExample {
  id: string;
  text: Record<LearnLang, string>;
  romaji: string;
}

// Every selectable phrase owns an independent, explicit set of three dialogue lines.
// There are no fallback lists or shared arrays between phrases or categories.
export const DIALOG_EXAMPLES: Record<string, Record<string, DialogueExample[]>> = {
  "bom-dia": {
    "bom-dia-0": [
      {
        "id": "bom-dia-0-example-1",
        "text": {
          "pt": "Sim, como uma pedra. Nem me lembro de ter sonhado.",
          "en": "Yes, like a log. I don't even remember dreaming.",
          "ja": "はい、ぐっすり眠れました。夢を見た記憶もありません。"
        },
        "romaji": "Hai, gussuri nemuremashita. Yume o mita kioku mo arimasen."
      },
      {
        "id": "bom-dia-0-example-2",
        "text": {
          "pt": "Que bom! Eu já não posso dizer o mesmo, virei a noite assistindo a uma série.",
          "en": "Good for you! I can't say the same, I stayed up all night watching a series.",
          "ja": "よかったですね！私は一晩中ドラマを見ていて、あまり眠れませんでした。"
        },
        "romaji": "Yokatta desu ne! Watashi wa hitobanjū dorama o mite ite, amari nemuremasen deshita."
      },
      {
        "id": "bom-dia-0-example-3",
        "text": {
          "pt": "Ah, é por isso que você está com uma cara de sono.",
          "en": "Oh, so that's why you look so sleepy.",
          "ja": "ああ、だからそんなに眠そうな顔をしているんですね。"
        },
        "romaji": "Ā, dakara sonna ni nemusō na kao o shite iru n desu ne."
      }
    ],
    "bom-dia-1": [
      {
        "id": "bom-dia-1-example-1",
        "text": {
          "pt": "Eu também! Tive que pular da cama quando vi as horas.",
          "en": "Me too! I had to jump out of bed when I saw the time.",
          "ja": "私もです！時間を見て飛び起きました。"
        },
        "romaji": "Watashi mo desu! Jikan o mite tobiokimashita."
      },
      {
        "id": "bom-dia-1-example-2",
        "text": {
          "pt": "Parece que a noite foi bem tranquila para nós dois.",
          "en": "It seems last night was very peaceful for both of us.",
          "ja": "お互い、昨夜はとても穏やかな夜だったみたいですね。"
        },
        "romaji": "Otagai, yūbe wa totemo odayakana yoru datta mitai desu ne."
      },
      {
        "id": "bom-dia-1-example-3",
        "text": {
          "pt": "Com certeza. Um sono reparador era tudo de que eu precisava.",
          "en": "Absolutely. A restorative sleep was exactly what I needed.",
          "ja": "本当に。質の良い睡眠が何より必要でした。"
        },
        "romaji": "Hontō ni. Shitsu no yoi suimin ga nani yori hitsuyō deshita."
      }
    ],
    "bom-dia-2": [
      {
        "id": "bom-dia-2-example-1",
        "text": {
          "pt": "Que delícia! O cheiro de café fresco é o melhor despertador.",
          "en": "How lovely! The smell of fresh coffee is the best alarm clock.",
          "ja": "いいですね！淹れたてのコーヒーの香りは最高の目覚ましです。"
        },
        "romaji": "Ī desu ne! Iretate no kōhī no kaori wa saikō no mezamashi desu."
      },
      {
        "id": "bom-dia-2-example-2",
        "text": {
          "pt": "Quer que eu prepare algo para comer também?",
          "en": "Would you like me to prepare something to eat as well?",
          "ja": "何か食べるものも用意しましょうか？"
        },
        "romaji": "Nanika taberu mono mo yōi shimashō ka?"
      },
      {
        "id": "bom-dia-2-example-3",
        "text": {
          "pt": "Obrigado, mas já comi uma fruta. Só um café já está ótimo.",
          "en": "Thanks, but I've already had a piece of fruit. Just coffee is fine.",
          "ja": "ありがとう、でも果物はもう食べました。コーヒーだけで大丈夫です。"
        },
        "romaji": "Arigatō, demo kudamono wa mō tabemashita. Kōhī dake de daijōbu desu."
      }
    ],
    "bom-dia-3": [
      {
        "id": "bom-dia-3-example-1",
        "text": {
          "pt": "Claro, com açúcar ou adoçante?",
          "en": "Of course, with sugar or sweetener?",
          "ja": "はい、砂糖と甘味料どちらにしますか？"
        },
        "romaji": "Hai, satō to kanmiryō dochira ni shimasu ka?"
      },
      {
        "id": "bom-dia-3-example-2",
        "text": {
          "pt": "Com açúcar, por favor. Quero começar o dia com uma nota doce.",
          "en": "With sugar, please. I want to start the day on a sweet note.",
          "ja": "砂糖でお願いします。朝は甘いものが欲しくなるので。"
        },
        "romaji": "Satō de onegai shimasu. Asa wa amai mono ga hoshiku naru node."
      },
      {
        "id": "bom-dia-3-example-3",
        "text": {
          "pt": "Prontinho! Seu café está na mesa, bem quente.",
          "en": "Here you go! Your coffee is on the table, nice and hot.",
          "ja": "はい、どうぞ。テーブルに置きました。熱々ですよ。"
        },
        "romaji": "Hai, dōzo. Tēburu ni okimashita. Atsuatsu desu yo."
      }
    ],
    "bom-dia-4": [
      {
        "id": "bom-dia-4-example-1",
        "text": {
          "pt": "Por quê? Tem algum compromisso especial?",
          "en": "Oh, why is that? Do you have a special appointment?",
          "ja": "どうしてですか？何か特別な予定でもあるんですか？"
        },
        "romaji": "Dōshite desu ka? Nanika tokubetsu na yotei de mo aru n desu ka?"
      },
      {
        "id": "bom-dia-4-example-2",
        "text": {
          "pt": "Sim, tenho que estar no escritório antes das oito.",
          "en": "Yes, I have to be at the office before eight o'clock.",
          "ja": "ええ、8時前に出社しないといけないんです。"
        },
        "romaji": "Ē, hachiji mae ni shussha shinai to ikenai n desu."
      },
      {
        "id": "bom-dia-4-example-3",
        "text": {
          "pt": "Entendi. Então, descanse bem esta noite.",
          "en": "I see. Well, I hope you get a good rest tonight.",
          "ja": "なるほど。では、今夜はゆっくり休んでくださいね。"
        },
        "romaji": "Naruhodo. Dewa, kon'ya wa yukkuri yasunde kudasai ne."
      }
    ],
    "bom-dia-5": [
      {
        "id": "bom-dia-5-example-1",
        "text": {
          "pt": "Você tem toda a razão! Vou desligar tudo e ir para a cama agora mesmo.",
          "en": "You're absolutely right! I'll turn everything off and go to bed right now.",
          "ja": "本当にその通りですね。もう色々やめて寝ることにします。"
        },
        "romaji": "Hontō ni sono tōri desu ne. Mō iroiro yamete neru koto ni shimasu."
      },
      {
        "id": "bom-dia-5-example-2",
        "text": {
          "pt": "É um sacrifício, mas vale a pena para ter energia no dia seguinte.",
          "en": "It's a sacrifice, but it's worth it to have energy the next day.",
          "ja": "辛いところですが、明日のためにその価値はありますね。"
        },
        "romaji": "Tsurai tokoro desu ga, ashita no tame ni sono kachi wa arimasu ne."
      },
      {
        "id": "bom-dia-5-example-3",
        "text": {
          "pt": "Exatamente. Boa noite e tenha bons sonhos!",
          "en": "Exactly. Good night and sweet dreams!",
          "ja": "その通りです。おやすみなさい、ゆっくり休んでください。"
        },
        "romaji": "Sono tōri desu. Oyasuminasai, yukkuri yasunde kudasai."
      }
    ],
    "bom-dia-6": [
      {
        "id": "bom-dia-6-example-1",
        "text": {
          "pt": "Pois é! Preciso comprar cortinas blackout para o quarto.",
          "en": "I know! I need to buy blackout curtains for the bedroom.",
          "ja": "本当ですね。寝室に遮光カーテンを買わないといけません。"
        },
        "romaji": "Hontō desu ne. Shinshitsu ni shakō kāten o kawanai to ikemasen."
      },
      {
        "id": "bom-dia-6-example-2",
        "text": {
          "pt": "Acho que o sol já está bem alto.",
          "en": "I think the sun is already quite high up.",
          "ja": "もう太陽はかなり高く昇っているみたいですね。"
        },
        "romaji": "Mō taiyō wa kanari takaku nobotte iru mitai desu ne."
      },
      {
        "id": "bom-dia-6-example-3",
        "text": {
          "pt": "Verdade. Acho que dormi demais de novo.",
          "en": "True. I think I overslept again.",
          "ja": "本当だ。今日もまた寝過ごしたみたいです。"
        },
        "romaji": "Hontō da. Kyō mo mata nesugoshita mitai desu."
      }
    ],
    "bom-dia-7": [
      {
        "id": "bom-dia-7-example-1",
        "text": {
          "pt": "Ah, é mesmo! Que bom que me lembrou. Vou abrir agora.",
          "en": "Oh, right! I'm glad you reminded me. I'll open it now.",
          "ja": "あ、そうでした！教えてくれてありがとう。今すぐ開けます。"
        },
        "romaji": "A, sō deshita! Oshiete kurete arigatō. Ima sugu akemasu."
      },
      {
        "id": "bom-dia-7-example-2",
        "text": {
          "pt": "Que delícia! Sinto o cheiro de flores vindo de fora.",
          "en": "How wonderful! I can smell flowers from outside.",
          "ja": "気持ちいい！外から花の香りがしますね。"
        },
        "romaji": "Kimochi ii! Soto kara hana no kaori ga shimasu ne."
      },
      {
        "id": "bom-dia-7-example-3",
        "text": {
          "pt": "É perfeito para começar o dia com esta brisa fresca.",
          "en": "It's perfect for starting the day with this cool breeze.",
          "ja": "この涼しいそよ風で一日を始めるのは最高ですね。"
        },
        "romaji": "Kono suzushii soyokaze de ichinichi o hajimeru no wa saikō desu ne."
      }
    ],
    "bom-dia-8": [
      {
        "id": "bom-dia-8-example-1",
        "text": {
          "pt": "Obrigado! Para você também, que seu dia seja produtivo.",
          "en": "Thanks! You too, I hope you have a productive day.",
          "ja": "ありがとう！あなたの一日も実り多いものになりますように。"
        },
        "romaji": "Arigatō! Anata no ichinichi mo minoriōi mono ni narimasu yō ni."
      },
      {
        "id": "bom-dia-8-example-2",
        "text": {
          "pt": "Estou de saída. Não se atrase para o nosso jantar!",
          "en": "I'm heading out. Don't be late for our dinner!",
          "ja": "もう行きますね。夕食に遅れないでください！"
        },
        "romaji": "Mō ikimasu ne. Yūshoku ni okurenai de kudasai!"
      },
      {
        "id": "bom-dia-8-example-3",
        "text": {
          "pt": "Pode deixar. Estarei em casa na hora combinada.",
          "en": "Don't worry. I'll be home at the agreed-upon time.",
          "ja": "心配しないで。約束の時間には帰りますから。"
        },
        "romaji": "Shinpai shinaide. Yakusoku no jikan ni wa kaerimasu kara."
      }
    ],
    "bom-dia-9": [
      {
        "id": "bom-dia-9-example-1",
        "text": {
          "pt": "Espere, você esqueceu sua marmita na geladeira!",
          "en": "Wait, you forgot your lunchbox in the fridge!",
          "ja": "待って、お弁当を冷蔵庫に忘れていますよ！"
        },
        "romaji": "Matte, obentō o reizōko ni wasurete imasu yo!"
      },
      {
        "id": "bom-dia-9-example-2",
        "text": {
          "pt": "Nossa, é mesmo! Que cabeça a minha. Pode pegar para mim?",
          "en": "Oh, no! How absent-minded of me. Could you grab it for me?",
          "ja": "あ、しまった！なんてうっかりしてたんだろう。取ってくれる？"
        },
        "romaji": "A, shimatta! Nante ukkari shitetan darō. Totte kureru?"
      },
      {
        "id": "bom-dia-9-example-3",
        "text": {
          "pt": "Claro, aqui está. Tenha um bom dia!",
          "en": "Of course, here you go. Have a good day!",
          "ja": "もちろん、はいどうぞ。お仕事頑張ってね！"
        },
        "romaji": "Mochiron, hai dōzo. Oshigoto ganbatte ne!"
      }
    ]
  },
  "boa-tarde": {
    "boa-tarde-0": [
      {
        "id": "boa-tarde-0-example-1",
        "text": {
          "pt": "Acabei de comer a sobremesa.",
          "en": "I just finished dessert.",
          "ja": "デザートを食べ終わったところです。"
        },
        "romaji": "Dezāto o tabeowatta tokoro desu."
      },
      {
        "id": "boa-tarde-0-example-2",
        "text": {
          "pt": "Ah, que bom! O que você comeu hoje?",
          "en": "Oh, that's good! What did you eat today?",
          "ja": "ああ、よかった！今日は何を食べましたか？"
        },
        "romaji": "Ā, yokatta! Kyō wa nani o tabemashita ka?"
      },
      {
        "id": "boa-tarde-0-example-3",
        "text": {
          "pt": "Arroz, feijão e um bife delicioso.",
          "en": "Rice, beans, and a delicious steak.",
          "ja": "ご飯と豆料理と、美味しいステーキでしたよ。"
        },
        "romaji": "Gohan to mameryōri to, oishii sutēki deshita yo."
      }
    ],
    "boa-tarde-1": [
      {
        "id": "boa-tarde-1-example-1",
        "text": {
          "pt": "Nem consegui apreciar o sabor direito.",
          "en": "I couldn't even properly enjoy the taste.",
          "ja": "味をしっかり味わえませんでした。"
        },
        "romaji": "Aji o shikkari ajiwaemasen deshita."
      },
      {
        "id": "boa-tarde-1-example-2",
        "text": {
          "pt": "Que pena! Onde você tinha que ir?",
          "en": "What a shame! Where did you have to go?",
          "ja": "それは残念ですね。どこか行く用事があったんですか？"
        },
        "romaji": "Sore wa zannen desu ne. Doko ka iku yōji ga attan desu ka?"
      },
      {
        "id": "boa-tarde-1-example-3",
        "text": {
          "pt": "Tinha que entregar uns documentos importantes no escritório.",
          "en": "I had to deliver some important documents to the office.",
          "ja": "事務所に大事な書類を届けないといけなかったんです。"
        },
        "romaji": "Jimusho ni daiji na shorui o todokenai to ikenakattan desu."
      }
    ],
    "boa-tarde-2": [
      {
        "id": "boa-tarde-2-example-1",
        "text": {
          "pt": "Com quem será que é dessa vez?",
          "en": "I wonder who it's with this time.",
          "ja": "今回は誰となんでしょう？"
        },
        "romaji": "Konkai wa dare to nan deshō?"
      },
      {
        "id": "boa-tarde-2-example-2",
        "text": {
          "pt": "Pelo que soube, é com o pessoal do marketing.",
          "en": "From what I heard, it's with the marketing team.",
          "ja": "聞いたところによると、マーケティング部の人たちとだそうです。"
        },
        "romaji": "Kiita tokoro ni yoru to, māketingu-bu no hitotachi to da sō desu."
      },
      {
        "id": "boa-tarde-2-example-3",
        "text": {
          "pt": "Entendi. Boa sorte com os novos planos!",
          "en": "I see. Good luck with the new plans!",
          "ja": "なるほど。では新しい計画、頑張ってください！"
        },
        "romaji": "Naruhodo. Dewa atarashii keikaku, ganbatte kudasai!"
      }
    ],
    "boa-tarde-3": [
      {
        "id": "boa-tarde-3-example-1",
        "text": {
          "pt": "Vou te mandar uma mensagem com os detalhes.",
          "en": "I'll send you a message with the details.",
          "ja": "詳細をメッセージで送りますね。"
        },
        "romaji": "Shōsai o messēji de okurimasu ne."
      },
      {
        "id": "boa-tarde-3-example-2",
        "text": {
          "pt": "Combinado. Qualquer coisa, me liga.",
          "en": "Sounds good. If anything comes up, call me.",
          "ja": "了解です。何かあれば電話してください。"
        },
        "romaji": "Ryōkai desu. Nani ka areba denwa shite kudasai."
      },
      {
        "id": "boa-tarde-3-example-3",
        "text": {
          "pt": "Ok, pode deixar que eu aviso.",
          "en": "Okay, I'll be sure to let you know.",
          "ja": "はい、必ず連絡しますね。"
        },
        "romaji": "Hai, kanarazu renraku shimasu ne."
      }
    ],
    "boa-tarde-4": [
      {
        "id": "boa-tarde-4-example-1",
        "text": {
          "pt": "Já são quase quatro horas!",
          "en": "It's almost four o'clock already!",
          "ja": "もうすぐ四時ですね！"
        },
        "romaji": "Mō sugu yoji desu ne!"
      },
      {
        "id": "boa-tarde-4-example-2",
        "text": {
          "pt": "Parece que o tempo voa quando estamos ocupados.",
          "en": "Time seems to fly when we're busy.",
          "ja": "忙しいと時間が経つのが早いものですね。"
        },
        "romaji": "Isogashii to jikan ga tatsu no ga hayai mono desu ne."
      },
      {
        "id": "boa-tarde-4-example-3",
        "text": {
          "pt": "Nem me fale, ainda tenho tanta coisa pra fazer.",
          "en": "Tell me about it, I still have so much to do.",
          "ja": "本当ですね、まだやることがたくさん残っています。"
        },
        "romaji": "Hontō desu ne, mada yaru koto ga takusan nokotte imasu."
      }
    ],
    "boa-tarde-5": [
      {
        "id": "boa-tarde-5-example-1",
        "text": {
          "pt": "Precisamos nos apressar para terminar tudo.",
          "en": "We need to hurry to finish everything.",
          "ja": "全部終わらせるために、急がないとですね。"
        },
        "romaji": "Zenbu owaraseru tame ni, isoganai to desu ne."
      },
      {
        "id": "boa-tarde-5-example-2",
        "text": {
          "pt": "Ainda mais que a semana está no fim.",
          "en": "Especially since the week is almost over.",
          "ja": "特に今週ももう終わりですしね。"
        },
        "romaji": "Tokuni konshū mo mō owari desu shi ne."
      },
      {
        "id": "boa-tarde-5-example-3",
        "text": {
          "pt": "Vamos focar para não ter que fazer hora extra.",
          "en": "Let's focus so we don't have to work overtime.",
          "ja": "残業しなくて済むように集中しましょう。"
        },
        "romaji": "Zangyō shinakute sumu yō ni shūchū shimashō."
      }
    ],
    "boa-tarde-6": [
      {
        "id": "boa-tarde-6-example-1",
        "text": {
          "pt": "Não dá nem para pensar em sair agora.",
          "en": "We can't even think about going out now.",
          "ja": "今は外出なんて考えられませんね。"
        },
        "romaji": "Ima wa gaishutsu nante kangaeraremasen ne."
      },
      {
        "id": "boa-tarde-6-example-2",
        "text": {
          "pt": "Seria loucura tentar dar uma caminhada.",
          "en": "It would be crazy to try to take a walk.",
          "ja": "散歩に出ようとするなんて無謀ですよ。"
        },
        "romaji": "Sanpo ni deyō to suru nante mubō desu yo."
      },
      {
        "id": "boa-tarde-6-example-3",
        "text": {
          "pt": "Melhor deixar para o fim da tarde, quando o sol baixar.",
          "en": "Better to leave it for the late afternoon, when the sun is lower.",
          "ja": "夕方、日差しが和らいでからにしましょうか。"
        },
        "romaji": "Yūgata, hizashi ga yawaraide kara ni shimashō ka."
      }
    ],
    "boa-tarde-7": [
      {
        "id": "boa-tarde-7-example-1",
        "text": {
          "pt": "Que tal irmos para debaixo daquela árvore?",
          "en": "How about we go under that tree?",
          "ja": "あの木の下に行きませんか？"
        },
        "romaji": "Ano ki no shita ni ikimasen ka?"
      },
      {
        "id": "boa-tarde-7-example-2",
        "text": {
          "pt": "Boa ideia, lá parece bem mais fresco.",
          "en": "Good idea, it looks much cooler over there.",
          "ja": "いいですね、あちらはずっと涼しそうです。"
        },
        "romaji": "Ii desu ne, achira wa zutto suzushisō desu."
      },
      {
        "id": "boa-tarde-7-example-3",
        "text": {
          "pt": "Podemos tomar uma água gelada também.",
          "en": "We could have some cold water, too.",
          "ja": "冷たいお水も飲めますしね。"
        },
        "romaji": "Tsumetai o-mizu mo nomemasu shi ne."
      }
    ],
    "boa-tarde-8": [
      {
        "id": "boa-tarde-8-example-1",
        "text": {
          "pt": "Minha cabeça está a mil com tanto trabalho.",
          "en": "My head is spinning with so much work.",
          "ja": "仕事が多すぎて頭がパンクしそうです。"
        },
        "romaji": "Shigoto ga ōsusugite atama ga panku shisō desu."
      },
      {
        "id": "boa-tarde-8-example-2",
        "text": {
          "pt": "Você parece realmente exausto.",
          "en": "You look really exhausted.",
          "ja": "本当に疲れているようですね。"
        },
        "romaji": "Hontō ni tsukarete iru yō desu ne."
      },
      {
        "id": "boa-tarde-8-example-3",
        "text": {
          "pt": "Vou tomar um café e respirar um pouco.",
          "en": "I'm going to grab a coffee and take a breather.",
          "ja": "コーヒーを飲んで少し息抜きしてきます。"
        },
        "romaji": "Kōhī o nonde sukoshi ikinuki shite kimasu."
      }
    ],
    "boa-tarde-9": [
      {
        "id": "boa-tarde-9-example-1",
        "text": {
          "pt": "Não se preocupe com nada por aqui.",
          "en": "Don't worry about a thing here.",
          "ja": "ここのことは何も心配いりませんよ。"
        },
        "romaji": "Koko no koto wa nani mo shinpai irimasen yo."
      },
      {
        "id": "boa-tarde-9-example-2",
        "text": {
          "pt": "Muito obrigado pela ajuda!",
          "en": "Thank you so much for your help!",
          "ja": "助かります、本当にありがとうございます！"
        },
        "romaji": "Tasukarimasu, hontō ni arigatō gozaimasu!"
      },
      {
        "id": "boa-tarde-9-example-3",
        "text": {
          "pt": "Disponha! Vá descansar um pouco.",
          "en": "You're welcome! Go get some rest.",
          "ja": "どういたしまして！少し休んできてください。"
        },
        "romaji": "Dō itashimashite! Sukoshi yasunde kite kudasai."
      }
    ]
  },
  "boa-noite": {
    "boa-noite-0": [
      {
        "id": "boa-noite-0-example-1",
        "text": {
          "pt": "Sim, não tenho planos para sair hoje à noite.",
          "en": "Yes, I don't have any plans to go out tonight.",
          "ja": "はい、今夜は出かける予定はありません。"
        },
        "romaji": "Hai, kon'ya wa dekakeru yotei wa arimasen."
      },
      {
        "id": "boa-noite-0-example-2",
        "text": {
          "pt": "Ótimo! Que tal pedirmos uma pizza então?",
          "en": "Great! How about we order a pizza then?",
          "ja": "よかった！じゃあ、ピザでも頼みましょうか。"
        },
        "romaji": "Yokatta! Jaa, piza demo tanomimashō ka."
      },
      {
        "id": "boa-noite-0-example-3",
        "text": {
          "pt": "Parece um ótimo plano para a noite.",
          "en": "That sounds like a great plan for tonight.",
          "ja": "それは今夜にぴったりの名案ですね。"
        },
        "romaji": "Sore wa kon'ya ni pittari no meian desu ne."
      }
    ],
    "boa-noite-1": [
      {
        "id": "boa-noite-1-example-1",
        "text": {
          "pt": "Eu entendo, o dia no trabalho foi exaustivo.",
          "en": "I understand, the day at work was exhausting.",
          "ja": "わかります、今日の仕事は本当に疲れましたね。"
        },
        "romaji": "Wakarimasu, kyō no shigoto wa hontō ni tsukaremashita ne."
      },
      {
        "id": "boa-noite-1-example-2",
        "text": {
          "pt": "Preciso mesmo recarregar as energias para amanhã.",
          "en": "I really need to recharge for tomorrow.",
          "ja": "明日に向けてしっかりエネルギーを充電しないと。"
        },
        "romaji": "Ashita ni mukete shikkari enerugī o jūden shinai to."
      },
      {
        "id": "boa-noite-1-example-3",
        "text": {
          "pt": "Descanse bem, você merece.",
          "en": "Get plenty of rest, you deserve it.",
          "ja": "たくさん休んでください。頑張ったんですから。"
        },
        "romaji": "Takusan yasunde kudasai. Ganbattan desu kara."
      }
    ],
    "boa-noite-2": [
      {
        "id": "boa-noite-2-example-1",
        "text": {
          "pt": "Depois, vou vestir um pijama bem confortável.",
          "en": "Afterwards, I'll put on some very comfortable pajamas.",
          "ja": "その後は、着心地のいいパジャマに着替えます。"
        },
        "romaji": "Sono ato wa, kigokochi no ii pajama ni kigaemasu."
      },
      {
        "id": "boa-noite-2-example-2",
        "text": {
          "pt": "Não se esqueça da sua playlist de relaxamento.",
          "en": "Don't forget your relaxation playlist.",
          "ja": "お気に入りのプレイリストを忘れないでね。"
        },
        "romaji": "Okiniiri no pureirisuto o wasurenai de ne."
      },
      {
        "id": "boa-noite-2-example-3",
        "text": {
          "pt": "Obrigado por me lembrar, vou colocá-la agora.",
          "en": "Thanks for reminding me, I'll put it on now.",
          "ja": "思い出させてくれてありがとう、今かけますね。"
        },
        "romaji": "Omoidasasete kurete arigatō, ima kakemasu ne."
      }
    ],
    "boa-noite-3": [
      {
        "id": "boa-noite-3-example-1",
        "text": {
          "pt": "Que ótimo, o banho está pronto.",
          "en": "How wonderful, the bath is ready.",
          "ja": "素晴らしい、お風呂の準備ができたんですね。"
        },
        "romaji": "Subarashii, ofuro no junbi ga dekita n desu ne."
      },
      {
        "id": "boa-noite-3-example-2",
        "text": {
          "pt": "Assim posso entrar na banheira imediatamente.",
          "en": "This way I can get in the tub immediately.",
          "ja": "これで、すぐに湯船に浸かれますね。"
        },
        "romaji": "Kore de, sugu ni yubune ni tsukaremasu ne."
      },
      {
        "id": "boa-noite-3-example-3",
        "text": {
          "pt": "Aproveite este momento de relaxamento.",
          "en": "Enjoy this relaxing moment.",
          "ja": "このくつろぎの時間を存分に楽しんでください。"
        },
        "romaji": "Kono kutsurogi no jikan o zonbun ni tanoshinde kudasai."
      }
    ],
    "boa-noite-4": [
      {
        "id": "boa-noite-4-example-1",
        "text": {
          "pt": "Estava pensando em um suspense com muitas reviravoltas.",
          "en": "I was thinking of a thriller with a lot of twists.",
          "ja": "どんでん返しが多いサスペンスものを考えていました。"
        },
        "romaji": "Dondengaeshi ga ōi sasupensu-mono o kangaete imashita."
      },
      {
        "id": "boa-noite-4-example-2",
        "text": {
          "pt": "É uma excelente escolha para uma noite de sábado.",
          "en": "That's an excellent choice for a Saturday night.",
          "ja": "土曜の夜にはうってつけの選択ですね。"
        },
        "romaji": "Doyō no yoru ni wa uttetsuke no sentaku desu ne."
      },
      {
        "id": "boa-noite-4-example-3",
        "text": {
          "pt": "Vou pegar a pipoca e algo para beber.",
          "en": "I'll get the popcorn and something to drink.",
          "ja": "ポップコーンと何か飲み物を用意しますね。"
        },
        "romaji": "Poppukōn to nanika nomimono o yōi shimasu ne."
      }
    ],
    "boa-noite-5": [
      {
        "id": "boa-noite-5-example-1",
        "text": {
          "pt": "Ah, um clássico! Qual o nome do filme?",
          "en": "Ah, a classic! What's the name of the film?",
          "ja": "へえ、名作ですか！タイトルは何というのですか？"
        },
        "romaji": "Hee, meisaku desu ka! Taitoru wa nan to iu no desu ka?"
      },
      {
        "id": "boa-noite-5-example-2",
        "text": {
          "pt": "É um filme japonês chamado 'Contos da Lua Vaga'.",
          "en": "It's a Japanese film called 'Ugetsu'.",
          "ja": "『雨月物語』という日本の映画です。"
        },
        "romaji": "Ugetsu Monogatari to iu Nihon no eiga desu."
      },
      {
        "id": "boa-noite-5-example-3",
        "text": {
          "pt": "Que interessante! Parece uma ótima escolha.",
          "en": "How interesting! Sounds like a great pick.",
          "ja": "へえ、面白そうですね。観るのが楽しみです。"
        },
        "romaji": "Hee, omoshirosō desu ne. Miru no ga tanoshimi desu."
      }
    ],
    "boa-noite-6": [
      {
        "id": "boa-noite-6-example-1",
        "text": {
          "pt": "Vou deixar a luz da cozinha acesa também.",
          "en": "I'll leave the kitchen light on as well.",
          "ja": "台所の電気もつけたままにしておきます。"
        },
        "romaji": "Daidokoro no denki mo tsuketa mama ni shite okimasu."
      },
      {
        "id": "boa-noite-6-example-2",
        "text": {
          "pt": "Dessa forma, a casa não fica totalmente escura.",
          "en": "That way, the house isn't completely dark.",
          "ja": "そうすれば、家が真っ暗にはなりませんからね。"
        },
        "romaji": "Sō sureba, ie ga makkura ni wa narimasen kara ne."
      },
      {
        "id": "boa-noite-6-example-3",
        "text": {
          "pt": "Perfeito, caso alguém acorde durante a noite.",
          "en": "Perfect, in case someone wakes up during the night.",
          "ja": "誰かが夜中に起きてもこれなら安心ですね。"
        },
        "romaji": "Dareka ga yonaka ni okite mo kore nara anshin desu ne."
      }
    ],
    "boa-noite-7": [
      {
        "id": "boa-noite-7-example-1",
        "text": {
          "pt": "Obrigado por ser tão cuidadoso.",
          "en": "Thank you for being so thorough.",
          "ja": "そこまで気を配ってくれてありがとう。"
        },
        "romaji": "Soko made ki o kubatte kurete arigatō."
      },
      {
        "id": "boa-noite-7-example-2",
        "text": {
          "pt": "Eu também verifiquei todas as janelas.",
          "en": "I checked all the windows, too.",
          "ja": "窓も全部確認しておきましたよ。"
        },
        "romaji": "Mado mo zenbu kakunin shite okimashita yo."
      },
      {
        "id": "boa-noite-7-example-3",
        "text": {
          "pt": "Agora podemos dormir tranquilos e seguros.",
          "en": "Now we can sleep soundly and safely.",
          "ja": "これで安心してぐっすり眠れますね。"
        },
        "romaji": "Kore de anshin shite gussuri nemuremasu ne."
      }
    ],
    "boa-noite-8": [
      {
        "id": "boa-noite-8-example-1",
        "text": {
          "pt": "Para você também, tenha uma noite tranquila.",
          "en": "You too, have a peaceful night.",
          "ja": "あなたも、穏やかな夜を過ごしてください。"
        },
        "romaji": "Anata mo, odayaka na yoru o sugoshite kudasai."
      },
      {
        "id": "boa-noite-8-example-2",
        "text": {
          "pt": "Que você tenha sonhos maravilhosos.",
          "en": "May you have wonderful dreams.",
          "ja": "素敵な夢が見られますように。"
        },
        "romaji": "Suteki na yume ga miraremasu yō ni."
      },
      {
        "id": "boa-noite-8-example-3",
        "text": {
          "pt": "Obrigado. Boa noite para você também.",
          "en": "Thank you. Good night to you too.",
          "ja": "ありがとう。あなたも、おやすみなさい。"
        },
        "romaji": "Arigatō. Anata mo, oyasuminasai."
      }
    ],
    "boa-noite-9": [
      {
        "id": "boa-noite-9-example-1",
        "text": {
          "pt": "Ok, já estou na cama.",
          "en": "Okay, I'm already in bed.",
          "ja": "はい、もうベッドの中です。"
        },
        "romaji": "Hai, mō beddo no naka desu."
      },
      {
        "id": "boa-noite-9-example-2",
        "text": {
          "pt": "Ótimo. A escuridão ajuda a dormir melhor.",
          "en": "Great. Darkness helps you sleep better.",
          "ja": "よかった。暗い方がよく眠れますからね。"
        },
        "romaji": "Yokatta. Kurai hō ga yoku nemuremasu kara ne."
      },
      {
        "id": "boa-noite-9-example-3",
        "text": {
          "pt": "É verdade. Boa noite.",
          "en": "That's true. Good night.",
          "ja": "そうですね。おやすみなさい。"
        },
        "romaji": "Sō desu ne. Oyasuminasai."
      }
    ]
  },
  "cumprimentos": {
    "cumprimentos-0": [
      {
        "id": "cumprimentos-0-example-1",
        "text": {
          "pt": "Nossa, quanto tempo! Nem acredito que é você!",
          "en": "Wow, long time! I can't believe it's you!",
          "ja": "わあ、お久しぶりです！あなただなんて信じられません！"
        },
        "romaji": "Wā, ohisashiburi desu! Anata da nante shinjiraremasen!"
      },
      {
        "id": "cumprimentos-0-example-2",
        "text": {
          "pt": "Pois é, a vida nos levou para caminhos diferentes.",
          "en": "I know, life took us on different paths.",
          "ja": "本当ですね、お互い色々ありましたから。"
        },
        "romaji": "Hontō desu ne, otagai iroiro arimashita kara."
      },
      {
        "id": "cumprimentos-0-example-3",
        "text": {
          "pt": "Mas que bom que nossos caminhos se cruzaram de novo.",
          "en": "But it's great that our paths have crossed again.",
          "ja": "でも、またお会いできて本当に嬉しいです。"
        },
        "romaji": "Demo, mata oai dekite hontō ni ureshī desu."
      }
    ],
    "cumprimentos-1": [
      {
        "id": "cumprimentos-1-example-1",
        "text": {
          "pt": "Faz tanto tempo! Desde a formatura, talvez?",
          "en": "It's been so long! Since graduation, maybe?",
          "ja": "本当にお久しぶりです！卒業以来でしょうか？"
        },
        "romaji": "Hontō ni ohisashiburi desu! Sotsugyō irai deshō ka?"
      },
      {
        "id": "cumprimentos-1-example-2",
        "text": {
          "pt": "Acho que faz até mais, já perdi a conta.",
          "en": "I think it's been even longer, I've lost count.",
          "ja": "もっと経っている気がします。もう何年か分かりませんね。"
        },
        "romaji": "Motto tatte iru ki ga shimasu. Mō nannen ka wakarimasen ne."
      },
      {
        "id": "cumprimentos-1-example-3",
        "text": {
          "pt": "O tempo voa mesmo! Como você tem estado?",
          "en": "Time really does fly! How have you been?",
          "ja": "月日が経つのは早いものですね。お元気でしたか？"
        },
        "romaji": "Tsukihi ga tatsu no wa hayai mono desu ne. Ogenki deshita ka?"
      }
    ],
    "cumprimentos-2": [
      {
        "id": "cumprimentos-2-example-1",
        "text": {
          "pt": "Que coincidência incrível te encontrar neste lugar!",
          "en": "What an incredible coincidence to find you here!",
          "ja": "こんな所でお会いするなんて、すごい偶然ですね！"
        },
        "romaji": "Konna tokoro de oai suru nante, sugoi gūzen desu ne!"
      },
      {
        "id": "cumprimentos-2-example-2",
        "text": {
          "pt": "Verdade, nunca imaginei que você frequentasse aqui.",
          "en": "Right, I never imagined you'd come here.",
          "ja": "ええ、まさかあなたが来るとは思ってもみませんでした。"
        },
        "romaji": "Ē, masaka anata ga kuru to wa omotte mo mimasen deshita."
      },
      {
        "id": "cumprimentos-2-example-3",
        "text": {
          "pt": "O mundo é pequeno, não é mesmo?",
          "en": "It's a small world, isn't it?",
          "ja": "世間は狭いものですね。"
        },
        "romaji": "Seken wa semai mono desu ne."
      }
    ],
    "cumprimentos-3": [
      {
        "id": "cumprimentos-3-example-1",
        "text": {
          "pt": "Olha só quem está aqui! Que bom te ver.",
          "en": "Look who's here! Good to see you.",
          "ja": "おや、奇遇ですね！お会いできて嬉しいです。"
        },
        "romaji": "Oya, kigū desu ne! Oai dekite ureshī desu."
      },
      {
        "id": "cumprimentos-3-example-2",
        "text": {
          "pt": "Eu sempre passo por aqui para caminhar.",
          "en": "I always come through here for a walk.",
          "ja": "私はいつも散歩でこの辺りを通るんです。"
        },
        "romaji": "Watashi wa itsumo sanpo de kono atari o tōru n desu."
      },
      {
        "id": "cumprimentos-3-example-3",
        "text": {
          "pt": "Então, talvez a gente se encontre mais vezes.",
          "en": "Then maybe we'll run into each other more often.",
          "ja": "では、またお会いする機会が増えるかもしれませんね。"
        },
        "romaji": "Dewa, mata oai suru kikai ga fueru kamo shiremasen ne."
      }
    ],
    "cumprimentos-4": [
      {
        "id": "cumprimentos-4-example-1",
        "text": {
          "pt": "Seja muito bem-vindo à nossa casa.",
          "en": "A very warm welcome to our home.",
          "ja": "我が家へようこそお越しくださいました。"
        },
        "romaji": "Wagaya e yōkoso okoshi kudasaimashita."
      },
      {
        "id": "cumprimentos-4-example-2",
        "text": {
          "pt": "Com licença, e muito obrigado pelo convite.",
          "en": "Excuse me, and thank you so much for the invitation.",
          "ja": "お邪魔します。ご招待いただきありがとうございます。"
        },
        "romaji": "Ojama shimasu. Goshōtai itadaki arigatō gozaimasu."
      },
      {
        "id": "cumprimentos-4-example-3",
        "text": {
          "pt": "Fique à vontade, a casa é sua.",
          "en": "Please make yourself comfortable.",
          "ja": "どうぞ、おくつろぎください。"
        },
        "romaji": "Dōzo, okutsurogi kudasai."
      }
    ],
    "cumprimentos-5": [
      {
        "id": "cumprimentos-5-example-1",
        "text": {
          "pt": "Que bom que você pôde vir ao nosso jantar.",
          "en": "I'm so glad you could make it to our dinner.",
          "ja": "夕食会にお越しいただけて、とても嬉しいです。"
        },
        "romaji": "Yūshokukai ni okoshi itadakete, totemo ureshī desu."
      },
      {
        "id": "cumprimentos-5-example-2",
        "text": {
          "pt": "Eu que agradeço. É sempre um prazer estar com vocês.",
          "en": "The pleasure is mine. It's always lovely to be with you all.",
          "ja": "こちらこそ。皆さんとご一緒できていつも楽しいです。"
        },
        "romaji": "Kochira koso. Minasan to goissho dekite itsumo tanoshī desu."
      },
      {
        "id": "cumprimentos-5-example-3",
        "text": {
          "pt": "A comida está maravilhosa, meus parabéns!",
          "en": "The food is wonderful, my compliments to the chef!",
          "ja": "このお料理、本当に美味しいですね。"
        },
        "romaji": "Kono oryōri, hontō ni oishii desu ne."
      }
    ],
    "cumprimentos-6": [
      {
        "id": "cumprimentos-6-example-1",
        "text": {
          "pt": "Bom, eu já vou indo. Preciso ir para casa.",
          "en": "Well, I'm heading out. I need to get home.",
          "ja": "では、そろそろ失礼します。家に帰らないと。"
        },
        "romaji": "Dewa, sorosoro shitsurei shimasu. Ie ni kaeranai to."
      },
      {
        "id": "cumprimentos-6-example-2",
        "text": {
          "pt": "Claro, sem problemas. Diga um oi para o seu irmão.",
          "en": "Of course, no problem. Say hi to your brother for me.",
          "ja": "はい、承知しました。弟さんによろしくお伝えください。"
        },
        "romaji": "Hai, shōchi shimashita. Otōto-san ni yoroshiku otsutae kudasai."
      },
      {
        "id": "cumprimentos-6-example-3",
        "text": {
          "pt": "Pode deixar, ele vai gostar de saber que você lembrou.",
          "en": "Will do, he'll be happy you remembered him.",
          "ja": "承知しました。彼も喜ぶと思います。"
        },
        "romaji": "Shōchi shimashita. Kare mo yorokobu to omoimasu."
      }
    ],
    "cumprimentos-7": [
      {
        "id": "cumprimentos-7-example-1",
        "text": {
          "pt": "Ah, encontrei a Maria e ela te mandou um abraço.",
          "en": "Oh, I ran into Maria and she sends her regards.",
          "ja": "ああ、マリアさんに会ったら、あなたによろしくとのことでした。"
        },
        "romaji": "Ā, Maria-san ni attara, anata ni yoroshiku to no koto deshita."
      },
      {
        "id": "cumprimentos-7-example-2",
        "text": {
          "pt": "Que legal! Mande um abraço de volta para ela, por favor.",
          "en": "How nice! Please send my best back to her.",
          "ja": "まあ、嬉しいです！彼女にもよろしくお伝えください。"
        },
        "romaji": "Mā, ureshī desu! Kanojo ni mo yoroshiku otsutae kudasai."
      },
      {
        "id": "cumprimentos-7-example-3",
        "text": {
          "pt": "Com certeza, vou falar com ela.",
          "en": "Absolutely, I'll be sure to tell her.",
          "ja": "はい、必ずそう伝えますね。"
        },
        "romaji": "Hai, kanarazu sō tsutaemasu ne."
      }
    ],
    "cumprimentos-8": [
      {
        "id": "cumprimentos-8-example-1",
        "text": {
          "pt": "Preciso ir agora, tenho um compromisso.",
          "en": "I have to go now, I have an appointment.",
          "ja": "もう行かなくては。約束があるんです。"
        },
        "romaji": "Mō ikanakute wa. Yakusoku ga aru n desu."
      },
      {
        "id": "cumprimentos-8-example-2",
        "text": {
          "pt": "Tudo bem, foi ótimo te ver.",
          "en": "Alright, it was great seeing you.",
          "ja": "そうですか。お会いできてよかったです。"
        },
        "romaji": "Sō desu ka. Oai dekite yokatta desu."
      },
      {
        "id": "cumprimentos-8-example-3",
        "text": {
          "pt": "Igualmente! Tenha uma boa noite.",
          "en": "You too! Have a good night.",
          "ja": "こちらこそ！良い夜をお過ごしください。"
        },
        "romaji": "Kochira koso! Yoi yoru o osugoshi kudasai."
      }
    ],
    "cumprimentos-9": [
      {
        "id": "cumprimentos-9-example-1",
        "text": {
          "pt": "Adorei nosso papo, mas preciso mesmo ir.",
          "en": "I loved our chat, but I really must be going.",
          "ja": "お話できて楽しかったですけど、そろそろ行かないと。"
        },
        "romaji": "Ohanashi dekite tanoshikatta desu kedo, sorosoro ikanai to."
      },
      {
        "id": "cumprimentos-9-example-2",
        "text": {
          "pt": "Que pena! Espero te ver de novo em breve.",
          "en": "What a shame! I hope to see you again soon.",
          "ja": "残念です。また近いうちにお会いしたいですね。"
        },
        "romaji": "Zannen desu. Mata chikai uchi ni oai shitai desu ne."
      },
      {
        "id": "cumprimentos-9-example-3",
        "text": {
          "pt": "Com certeza! Que tal um café na próxima semana?",
          "en": "Definitely! How about coffee next week?",
          "ja": "ええ、ぜひ！来週、一緒にお茶でもどうですか？"
        },
        "romaji": "Ē, zehi! Raishū, issho ni ocha demo dō desu ka?"
      }
    ]
  },
  "apresentacao": {
    "apresentacao-0": [
      {
        "id": "apresentacao-0-example-1",
        "text": {
          "pt": "É um prazer conhecê-la também, Ana.",
          "en": "It's a pleasure to meet you too, Ana.",
          "ja": "アナさん、私もお会いできて嬉しいです。"
        },
        "romaji": "Ana-san, watashi mo o-ai dekite ureshii desu."
      },
      {
        "id": "apresentacao-0-example-2",
        "text": {
          "pt": "Espero que possamos trabalhar bem juntos.",
          "en": "I hope we can work well together.",
          "ja": "一緒にうまく仕事ができるといいですね。"
        },
        "romaji": "Issho ni umaku shigoto ga dekiru to ii desu ne."
      },
      {
        "id": "apresentacao-0-example-3",
        "text": {
          "pt": "Com certeza! Mal posso esperar para começar.",
          "en": "Absolutely! I can't wait to get started.",
          "ja": "もちろんです！始めるのが楽しみです。"
        },
        "romaji": "Mochiron desu! Hajimeru no ga tanoshimi desu."
      }
    ],
    "apresentacao-1": [
      {
        "id": "apresentacao-1-example-1",
        "text": {
          "pt": "Que bom, Kenji! Bem-vindo à equipe.",
          "en": "Great, Kenji! Welcome to the team.",
          "ja": "健二さん、よろしくお願いします。チームへようこそ。"
        },
        "romaji": "Kenji-san, yoroshiku onegai shimasu. Chīmu e yōkoso."
      },
      {
        "id": "apresentacao-1-example-2",
        "text": {
          "pt": "Estou animado para esta nova colaboração.",
          "en": "I'm looking forward to this new collaboration.",
          "ja": "この新しいコラボレーション、楽しみにしています。"
        },
        "romaji": "Kono atarashii koraborēshon, tanoshimi ni shite imasu."
      },
      {
        "id": "apresentacao-1-example-3",
        "text": {
          "pt": "Nós também. O futuro parece promissor.",
          "en": "Us too. We're looking forward to what's to come.",
          "ja": "私たちもです。これからが楽しみですね。"
        },
        "romaji": "Watashitachi mo desu. Korekara ga tanoshimi desu ne."
      }
    ],
    "apresentacao-2": [
      {
        "id": "apresentacao-2-example-1",
        "text": {
          "pt": "Ah, {PAIS}! Ouvi dizer que a culinária de lá é maravilhosa.",
          "en": "Ah, {PAIS}! I hear the food there is wonderful.",
          "ja": "ああ、{PAIS}ですか！料理がとても素晴らしいそうですね。"
        },
        "romaji": "Ā, {PAIS_ROMAJI} desu ka! Ryōri ga totemo subarashii sō desu ne."
      },
      {
        "id": "apresentacao-2-example-2",
        "text": {
          "pt": "É verdade, a comida de lá é inesquecível.",
          "en": "That's true, the food there is unforgettable.",
          "ja": "本当です、そこの食べ物は忘れられないですよ。"
        },
        "romaji": "Hontō desu, soko no tabemono wa wasurerarenai desu yo."
      },
      {
        "id": "apresentacao-2-example-3",
        "text": {
          "pt": "Um dia preciso ir lá para experimentar.",
          "en": "Someday I need to go and try it.",
          "ja": "いつか行って、食べてみたいですね。"
        },
        "romaji": "Itsuka itte, tabete mitai desu ne."
      }
    ],
    "apresentacao-3": [
      {
        "id": "apresentacao-3-example-1",
        "text": {
          "pt": "Sim, é um lugar com muita natureza.",
          "en": "Yes, it's a place with a lot of nature.",
          "ja": "はい、自然が豊かな場所です。"
        },
        "romaji": "Hai, shizen ga yutaka na basho desu."
      },
      {
        "id": "apresentacao-3-example-2",
        "text": {
          "pt": "As florestas e os rios são de tirar o fôlego.",
          "en": "The forests and rivers are breathtaking.",
          "ja": "森と川は息をのむほど美しいです。"
        },
        "romaji": "Mori to kawa wa iki o nomu hodo utsukushii desu."
      },
      {
        "id": "apresentacao-3-example-3",
        "text": {
          "pt": "Isso me dá ainda mais vontade de ir!",
          "en": "That makes me want to go even more!",
          "ja": "それを聞くとますます行きたくなりますね！"
        },
        "romaji": "Sore o kiku to masumasu ikitaku narimasu ne!"
      }
    ],
    "apresentacao-4": [
      {
        "id": "apresentacao-4-example-1",
        "text": {
          "pt": "Nossa, então você tem bastante experiência.",
          "en": "Wow, so you're very experienced.",
          "ja": "わあ、じゃあ経験豊富なんですね。"
        },
        "romaji": "Wā, jā keiken hōfu nan desu ne."
      },
      {
        "id": "apresentacao-4-example-2",
        "text": {
          "pt": "Sim, aprendi muito e adoro o que faço.",
          "en": "Yes, I've learned a lot and I love what I do.",
          "ja": "はい、多くのことを学びましたし、自分の仕事が大好きです。"
        },
        "romaji": "Hai, ōku no koto o manabimashita shi, jibun no shigoto ga daisuki desu."
      },
      {
        "id": "apresentacao-4-example-3",
        "text": {
          "pt": "Que ótimo! Que tipo de projetos você costuma fazer?",
          "en": "That's great! What kind of projects do you usually work on?",
          "ja": "それは素晴らしいですね。普段はどんなプロジェクトを手がけていますか？"
        },
        "romaji": "Sore wa subarashii desu ne. Fudan wa donna purojekuto o tegakete imasu ka?"
      }
    ],
    "apresentacao-5": [
      {
        "id": "apresentacao-5-example-1",
        "text": {
          "pt": "Vim para participar de um projeto colaborativo.",
          "en": "I came to participate in a collaborative project here.",
          "ja": "こちらの共同プロジェクトに参加するために参りました。"
        },
        "romaji": "Kochira no kyōdō purojekuto ni sanka suru tame ni mairimashita."
      },
      {
        "id": "apresentacao-5-example-2",
        "text": {
          "pt": "Entendi! É a sua primeira vez nesta área?",
          "en": "I see! Is this field new to you?",
          "ja": "そうなんですね！この分野は初めてですか？"
        },
        "romaji": "Sō nan desu ne! Kono bun'ya wa hajimete desu ka?"
      },
      {
        "id": "apresentacao-5-example-3",
        "text": {
          "pt": "É uma área nova para mim, então estou bem empolgado.",
          "en": "It's a new field for me, so I'm very excited.",
          "ja": "私にとっては新しい分野なので、とてもワクワクしています。"
        },
        "romaji": "Watashi ni totte wa atarashii bun'ya na node, totemo wakuwaku shite imasu."
      }
    ],
    "apresentacao-6": [
      {
        "id": "apresentacao-6-example-1",
        "text": {
          "pt": "Tudo bem, Ana. Sem problemas.",
          "en": "Alright, Ana. No problem.",
          "ja": "分かりました、アナさん。大丈夫ですよ。"
        },
        "romaji": "Wakarimashita, Ana-san. Daijōbu desu yo."
      },
      {
        "id": "apresentacao-6-example-2",
        "text": {
          "pt": "Fica mais fácil para todo mundo assim.",
          "en": "It's easier for everyone that way.",
          "ja": "その方がみんなにとって楽ですよね。"
        },
        "romaji": "Sono hō ga minna ni totte raku desu yo ne."
      },
      {
        "id": "apresentacao-6-example-3",
        "text": {
          "pt": "Concordo. Também me sinto mais à vontade.",
          "en": "I agree. I also feel more at ease that way.",
          "ja": "そうですね。私もその方が気楽です。"
        },
        "romaji": "Sō desu ne. Watashi mo sono hō ga kiraku desu."
      }
    ],
    "apresentacao-7": [
      {
        "id": "apresentacao-7-example-1",
        "text": {
          "pt": "Sim, assim é mais fácil para interagirmos.",
          "en": "Yes, it's easier for us to talk to each other this way.",
          "ja": "ええ、その方がお互い話しやすいですよね。"
        },
        "romaji": "Ee, sono hō ga o-tagai hanashi yasui desu yo ne."
      },
      {
        "id": "apresentacao-7-example-2",
        "text": {
          "pt": "Fico feliz que pense assim.",
          "en": "I'm glad you think so.",
          "ja": "そう言っていただけると嬉しいです。"
        },
        "romaji": "Sō itte itadakeru to ureshii desu."
      },
      {
        "id": "apresentacao-7-example-3",
        "text": {
          "pt": "Sim, o melhor é que todos possam conversar com tranquilidade.",
          "en": "Yes, it's best if everyone can talk casually.",
          "ja": "ええ、皆さんが気楽に話せるのが一番ですから。"
        },
        "romaji": "Ee, minasan ga kigaru ni hanaseru no ga ichiban desu kara."
      }
    ],
    "apresentacao-8": [
      {
        "id": "apresentacao-8-example-1",
        "text": {
          "pt": "Muito obrigado! Já vou adicionar.",
          "en": "Thank you very much! I'll add you right away.",
          "ja": "ありがとうございます。早速登録させていただきます。"
        },
        "romaji": "Arigatō gozaimasu. Sassoku tōroku sasete itadakimasu."
      },
      {
        "id": "apresentacao-8-example-2",
        "text": {
          "pt": "Sinta-se à vontade para me contatar a qualquer momento.",
          "en": "Feel free to contact me anytime.",
          "ja": "いつでもお気軽にご連絡ください。"
        },
        "romaji": "Itsu demo o-kigaru ni go-renraku kudasai."
      },
      {
        "id": "apresentacao-8-example-3",
        "text": {
          "pt": "Com certeza! Manteremos contato.",
          "en": "Definitely! I look forward to keeping in touch.",
          "ja": "はい、ぜひ！今後ともよろしくお願いします。"
        },
        "romaji": "Hai, zehi! Kongo tomo yoroshiku onegai shimasu."
      }
    ],
    "apresentacao-9": [
      {
        "id": "apresentacao-9-example-1",
        "text": {
          "pt": "Foi um prazer conhecê-lo. Tenha um ótimo dia.",
          "en": "It was good to meet you. Have a great day.",
          "ja": "お会いできてよかったです。良い一日を。"
        },
        "romaji": "O-ai dekite yokatta desu. Yoi ichinichi o."
      },
      {
        "id": "apresentacao-9-example-2",
        "text": {
          "pt": "Igualmente! Então, até a próxima reunião.",
          "en": "You too! Well then, see you at the next meeting.",
          "ja": "こちらこそ。では、また次の会議で。"
        },
        "romaji": "Kochira koso. Dewa, mata tsugi no kaigi de."
      },
      {
        "id": "apresentacao-9-example-3",
        "text": {
          "pt": "Certo. Até mais!",
          "en": "Right. See you later!",
          "ja": "はい。では、また。"
        },
        "romaji": "Hai. Dewa, mata."
      }
    ]
  },
  "como-esta": {
    "como-esta-0": [
      {
        "id": "como-esta-0-example-1",
        "text": {
          "pt": "Espero que as coisas estejam indo bem para você.",
          "en": "I hope things are going well for you.",
          "ja": "万事うまくいっているといいのですが。"
        },
        "romaji": "Banji umaku itte iru to ii no desu ga."
      },
      {
        "id": "como-esta-0-example-2",
        "text": {
          "pt": "Na verdade, passei por algumas mudanças no trabalho.",
          "en": "Actually, I've had some changes at work.",
          "ja": "実は、仕事でいくつか変化がありました。"
        },
        "romaji": "Jitsu wa, shigoto de ikutsuka henka ga arimashita."
      },
      {
        "id": "como-esta-0-example-3",
        "text": {
          "pt": "Ah, me conte mais sobre isso quando tiver um tempo.",
          "en": "Oh, tell me more about it when you have time.",
          "ja": "そうですか。時間がある時に詳しく教えてください。"
        },
        "romaji": "Sō desu ka. Jikan ga aru toki ni kuwashiku oshiete kudasai."
      }
    ],
    "como-esta-1": [
      {
        "id": "como-esta-1-example-1",
        "text": {
          "pt": "Entendo, a vida de estudante pode ser bem exigente.",
          "en": "I understand, student life can be quite demanding.",
          "ja": "わかります。学生生活はかなり大変なこともありますよね。"
        },
        "romaji": "Wakarimasu. Gakusei seikatsu wa kanari taihen na koto mo arimasu yo ne."
      },
      {
        "id": "como-esta-1-example-2",
        "text": {
          "pt": "Sim, tenho muitas provas e trabalhos para entregar.",
          "en": "Yes, I have many exams and assignments due.",
          "ja": "はい、試験や提出課題がたくさんあるんです。"
        },
        "romaji": "Hai, shiken ya teishutsu kadai ga takusan arun desu."
      },
      {
        "id": "como-esta-1-example-3",
        "text": {
          "pt": "Não se esforce demais, lembre-se de descansar também.",
          "en": "Don't overdo it, remember to rest too.",
          "ja": "無理しすぎず、休むことも忘れないでくださいね。"
        },
        "romaji": "Muri shisugizu, yasumu koto mo wasurenai de kudasai ne."
      }
    ],
    "como-esta-2": [
      {
        "id": "como-esta-2-example-1",
        "text": {
          "pt": "Pois é, não consegui pregar o olho a noite toda.",
          "en": "I know, I couldn't sleep a wink all night.",
          "ja": "ええ、昨夜は一睡もできなかったんです。"
        },
        "romaji": "Ee, sakuya wa issui mo dekinakattan desu."
      },
      {
        "id": "como-esta-2-example-2",
        "text": {
          "pt": "Talvez você precise de um café bem forte?",
          "en": "Perhaps you're in need of a really strong coffee?",
          "ja": "もしかして、濃いコーヒーでもいかがですか？"
        },
        "romaji": "Moshikashite, koi kōhī demo ikaga desu ka?"
      },
      {
        "id": "como-esta-2-example-3",
        "text": {
          "pt": "Boa ideia, vou pegar um agora mesmo.",
          "en": "Good idea, I'll go get one right now.",
          "ja": "いい考えですね。今すぐ買ってきます。"
        },
        "romaji": "Ii kangae desu ne. Ima sugu katte kimasu."
      }
    ],
    "como-esta-3": [
      {
        "id": "como-esta-3-example-1",
        "text": {
          "pt": "Que bom que você se sente melhor! Fico feliz em saber.",
          "en": "It's great you're feeling better! I'm happy to hear that.",
          "ja": "気分が良くなったのなら何よりです！それを聞いて安心しました。"
        },
        "romaji": "Kibun ga yoku natta no nara nani yori desu! Sore o kiite anshin shimashita."
      },
      {
        "id": "como-esta-3-example-2",
        "text": {
          "pt": "Um banho quente e um bom café da manhã ajudaram bastante.",
          "en": "A warm shower and a good breakfast helped a lot.",
          "ja": "温かいシャワーとちゃんとした朝食がとても効きました。"
        },
        "romaji": "Atatakai shawā to chanto shita chōshoku ga totemo kikimashita."
      },
      {
        "id": "como-esta-3-example-3",
        "text": {
          "pt": "Isso é ótimo. Cuide-se para não acontecer de novo.",
          "en": "That's great. Take care so it doesn't happen again.",
          "ja": "それは良かったですね。またそうならないようにお気をつけください。"
        },
        "romaji": "Sore wa yokatta desu ne. Mata sō naranai yō ni oki o tsuke kudasai."
      }
    ],
    "como-esta-4": [
      {
        "id": "como-esta-4-example-1",
        "text": {
          "pt": "Sim, todos estão ótimos, obrigado pela preocupação.",
          "en": "Yes, everyone is great, thank you for your concern.",
          "ja": "はい、おかげさまで皆元気です。お気遣いありがとうございます。"
        },
        "romaji": "Hai, okagesama de minna genki desu. Okizukai arigatō gozaimasu."
      },
      {
        "id": "como-esta-4-example-2",
        "text": {
          "pt": "Que notícia maravilhosa! Fico aliviado.",
          "en": "What wonderful news! I'm relieved.",
          "ja": "それは素晴らしい知らせですね！安心しました。"
        },
        "romaji": "Sore wa subarashii shirase desu ne! Anshin shimashita."
      },
      {
        "id": "como-esta-4-example-3",
        "text": {
          "pt": "E a sua, como está? Tudo em ordem por lá?",
          "en": "And your family? Is everything in order on your end?",
          "ja": "そちらのご家族はいかがですか？皆さんお変わりありませんか？"
        },
        "romaji": "Sochira no gokazoku wa ikaga desu ka? Minasan okawari arimasen ka?"
      }
    ],
    "como-esta-5": [
      {
        "id": "como-esta-5-example-1",
        "text": {
          "pt": "Que bom! É sempre bom ouvir notícias positivas.",
          "en": "That's great! It's always good to hear positive news.",
          "ja": "それは良かったです！良い知らせを聞くと嬉しい気持ちになりますね。"
        },
        "romaji": "Sore wa yokatta desu! Yoi shirase o kiku to ureshii kimochi ni narimasu ne."
      },
      {
        "id": "como-esta-5-example-2",
        "text": {
          "pt": "Sim, tivemos um final de semana bem tranquilo e divertido.",
          "en": "Yes, we had a very peaceful and fun weekend.",
          "ja": "はい、とても穏やかで楽しい週末を過ごしました。"
        },
        "romaji": "Hai, totemo odayaka de tanoshii shūmatsu o sugoshimashita."
      },
      {
        "id": "como-esta-5-example-3",
        "text": {
          "pt": "Perfeito! Mande meus cumprimentos a todos.",
          "en": "Perfect! Send my regards to everyone.",
          "ja": "それは何よりです！皆さんによろしくお伝えください。"
        },
        "romaji": "Sore wa nani yori desu! Minasan ni yoroshiku otsutae kudasai."
      }
    ],
    "como-esta-6": [
      {
        "id": "como-esta-6-example-1",
        "text": {
          "pt": "Nossa, que chato. Posso ajudar em algo?",
          "en": "Oh, that's rough. Is there anything I can do?",
          "ja": "それは大変ですね。何か私にできることはありますか？"
        },
        "romaji": "Sore wa taihen desu ne. Nani ka watashi ni dekiru koto wa arimasu ka?"
      },
      {
        "id": "como-esta-6-example-2",
        "text": {
          "pt": "Acho que só preciso de um pouco de descanso.",
          "en": "I think I just need a little rest.",
          "ja": "いえ、少し休めば大丈夫だと思います。"
        },
        "romaji": "Ie, sukoshi yasumeba daijōbu da to omoimasu."
      },
      {
        "id": "como-esta-6-example-3",
        "text": {
          "pt": "Entendi. Tente relaxar um pouco neste fim de semana.",
          "en": "I see. Try to relax a bit this weekend.",
          "ja": "そうですか。今週末は少しリラックスしてくださいね。"
        },
        "romaji": "Sō desu ka. Konshūmatsu wa sukoshi rirakkusu shite kudasai ne."
      }
    ],
    "como-esta-7": [
      {
        "id": "como-esta-7-example-1",
        "text": {
          "pt": "Agradeço muito sua gentileza e preocupação.",
          "en": "I really appreciate your kindness and concern.",
          "ja": "そのお気持ちだけで嬉しいです。ありがとうございます。"
        },
        "romaji": "Sono o-kimochi dake de ureshii desu. Arigatō gozaimasu."
      },
      {
        "id": "como-esta-7-example-2",
        "text": {
          "pt": "Sério, qualquer coisa que precisar, é só me chamar.",
          "en": "Seriously, anything you need, just give me a call.",
          "ja": "本当ですよ。何か必要なことがあれば、いつでも声をかけてください。"
        },
        "romaji": "Hontō desu yo. Nani ka hitsuyō na koto ga areba, itsudemo koe o kakete kudasai."
      },
      {
        "id": "como-esta-7-example-3",
        "text": {
          "pt": "Vou ter isso em mente, obrigado de novo.",
          "en": "I'll keep that in mind, thanks again.",
          "ja": "心に留めておきます。重ねてありがとうございます。"
        },
        "romaji": "Kokoro ni tomete okimasu. Kasanete arigatō gozaimasu."
      }
    ],
    "como-esta-8": [
      {
        "id": "como-esta-8-example-1",
        "text": {
          "pt": "Sim, felizmente as coisas se acalmaram bastante.",
          "en": "Yes, thankfully things have calmed down a lot.",
          "ja": "はい、幸いなことに、状況はかなり落ち着きました。"
        },
        "romaji": "Hai, saiwai na koto ni, jōkyō wa kanari ochitsukimashita."
      },
      {
        "id": "como-esta-8-example-2",
        "text": {
          "pt": "Fico muito feliz em ouvir isso.",
          "en": "I'm very happy to hear that.",
          "ja": "それを聞いて本当に嬉しいです。"
        },
        "romaji": "Sore o kiite hontō ni ureshii desu."
      },
      {
        "id": "como-esta-8-example-3",
        "text": {
          "pt": "O que você fez para resolver tudo tão rapidamente?",
          "en": "What did you do to resolve everything so quickly?",
          "ja": "どうやってそんなに早くすべてを解決できたのですか？"
        },
        "romaji": "Dō yatte sonna ni hayaku subete o kaiketsu dekita no desu ka?"
      }
    ],
    "como-esta-9": [
      {
        "id": "como-esta-9-example-1",
        "text": {
          "pt": "Uau, que alívio! Parabéns pela agilidade.",
          "en": "Wow, what a relief! Congrats on the quick work.",
          "ja": "わあ、それは何よりです！素早い対応でしたね。"
        },
        "romaji": "Wā, sore wa nani yori desu! Subayai taiō deshita ne."
      },
      {
        "id": "como-esta-9-example-2",
        "text": {
          "pt": "Foi um período bem intenso, mas valeu a pena o esforço.",
          "en": "It was a very intense period, but the effort was worth it.",
          "ja": "とても大変な時期でしたが、頑張った甲斐がありました。"
        },
        "romaji": "Totemo taihen na jiki deshita ga, ganbatta kai ga arimashita."
      },
      {
        "id": "como-esta-9-example-3",
        "text": {
          "pt": "Agora você pode relaxar e aproveitar o tempo livre.",
          "en": "Now you can relax and enjoy your free time.",
          "ja": "これでリラックスして自由な時間を楽しめますね。"
        },
        "romaji": "Kore de rirakkusu shite jiyū na jikan o tanoshimemasu ne."
      }
    ]
  },
  "cafeteria": {
    "cafeteria-0": [
      {
        "id": "cafeteria-0-example-1",
        "text": {
          "pt": "Olá, o que vai querer?",
          "en": "Hi, what can I get for you?",
          "ja": "こんにちは、ご注文は何になさいますか？"
        },
        "romaji": "Konnichiwa, gochūmon wa nani ni nasaimasu ka?"
      },
      {
        "id": "cafeteria-0-example-2",
        "text": {
          "pt": "Vou querer um café com leite médio, por favor.",
          "en": "I'll have a medium latte, please.",
          "ja": "カフェラテをMサイズでお願いします。"
        },
        "romaji": "Kafe rate o emu saizu de onegai shimasu."
      },
      {
        "id": "cafeteria-0-example-3",
        "text": {
          "pt": "Um café com leite médio. Algo mais?",
          "en": "One medium latte. Anything else for you?",
          "ja": "カフェラテのMサイズですね。他にご注文はございますか？"
        },
        "romaji": "Kafe rate no emu saizu desu ne. Hoka ni gochūmon wa gozaimasu ka?"
      }
    ],
    "cafeteria-1": [
      {
        "id": "cafeteria-1-example-1",
        "text": {
          "pt": "Um cappuccino, por favor.",
          "en": "One cappuccino, please.",
          "ja": "カプチーノを一つお願いします。"
        },
        "romaji": "Kapuchīno o hitotsu onegai shimasu."
      },
      {
        "id": "cafeteria-1-example-2",
        "text": {
          "pt": "Será para tomar aqui ou para levar?",
          "en": "Will that be for here or to go?",
          "ja": "こちらでお召し上がりですか、それともお持ち帰りになさいますか？"
        },
        "romaji": "Kochira de omeshiagarimasu ka, soretomo omochikaeri ni nasaimasu ka?"
      },
      {
        "id": "cafeteria-1-example-3",
        "text": {
          "pt": "Para levar, por favor.",
          "en": "To go, please.",
          "ja": "持ち帰りでお願いします。"
        },
        "romaji": "Mochikaeri de onegai shimasu."
      }
    ],
    "cafeteria-2": [
      {
        "id": "cafeteria-2-example-1",
        "text": {
          "pt": "Que tipo de leite gostaria no seu café?",
          "en": "What kind of milk would you like in your coffee?",
          "ja": "コーヒーに入れるミルクはどちらにいたしますか？"
        },
        "romaji": "Kōhī ni ireru miruku wa dochira ni itashimasu ka?"
      },
      {
        "id": "cafeteria-2-example-2",
        "text": {
          "pt": "Por acaso vocês teriam leite de aveia?",
          "en": "By any chance, do you have oat milk?",
          "ja": "もしかして、オーツミルクはありますか？"
        },
        "romaji": "Moshikashite, ōtsu miruku wa arimasu ka?"
      },
      {
        "id": "cafeteria-2-example-3",
        "text": {
          "pt": "Sim, temos. Também temos leite de soja e de amêndoas.",
          "en": "Yes, we do. We also have soy and almond milk.",
          "ja": "はい、ございます。豆乳やアーモンドミルクもご用意しております。"
        },
        "romaji": "Hai, gozaimasu. Tōnyū ya āmondo miruku mo goyōi shite orimasu."
      }
    ],
    "cafeteria-3": [
      {
        "id": "cafeteria-3-example-1",
        "text": {
          "pt": "Posso pedir meu café com leite de aveia em vez do leite normal?",
          "en": "Can I get my latte with oat milk instead of regular milk?",
          "ja": "ラテを普通の牛乳の代わりにオーツミルクにできますか？"
        },
        "romaji": "Rate o futsū no gyūnyū no kawari ni ōtsu miruku ni dekimasu ka?"
      },
      {
        "id": "cafeteria-3-example-2",
        "text": {
          "pt": "Claro, mas o leite de aveia tem um pequeno custo adicional. Tudo bem?",
          "en": "Of course, but there's a small extra charge for oat milk. Is that okay?",
          "ja": "もちろんです。ただ、オーツミルクは少し追加料金がかかりますが、よろしいでしょうか？"
        },
        "romaji": "Mochiron desu. Tada, ōtsu miruku wa sukoshi tsuika ryōkin ga kakarimasu ga, yoroshii deshō ka?"
      },
      {
        "id": "cafeteria-3-example-3",
        "text": {
          "pt": "Sem problemas, obrigado.",
          "en": "That's fine, thank you.",
          "ja": "はい、大丈夫です。ありがとうございます。"
        },
        "romaji": "Hai, daijōbu desu. Arigatō gozaimasu."
      }
    ],
    "cafeteria-4": [
      {
        "id": "cafeteria-4-example-1",
        "text": {
          "pt": "Eu gostaria de um Americano gelado, por favor.",
          "en": "I'd like an iced Americano, please.",
          "ja": "アイスアメリカーノを一杯お願いします。"
        },
        "romaji": "Aisu amerikāno o ippai onegai shimasu."
      },
      {
        "id": "cafeteria-4-example-2",
        "text": {
          "pt": "Claro. Normalmente adicionamos um pouco de xarope. Você prefere sem?",
          "en": "Sure. We usually add a pump of syrup. Would you prefer it without?",
          "ja": "かしこまりました。通常シロップをお入れしますが、なしにしますか？"
        },
        "romaji": "Kashikomarimashita. Tsūjō shiroppu o oire shimasu ga, nashi ni shimasu ka?"
      },
      {
        "id": "cafeteria-4-example-3",
        "text": {
          "pt": "Sim, por favor, pode fazer sem açúcar nenhum?",
          "en": "Yes, please, could you make it with no sugar at all?",
          "ja": "はい、砂糖は全くなしにしてもらえますか？"
        },
        "romaji": "Hai, satō wa mattaku nashi ni shite moraemasu ka?"
      }
    ],
    "cafeteria-5": [
      {
        "id": "cafeteria-5-example-1",
        "text": {
          "pt": "Um chá preto, por favor. Sem açúcar.",
          "en": "A black tea, please. No sugar.",
          "ja": "紅茶をください。砂糖は入れないでください。"
        },
        "romaji": "Kōcha o kudasai. Satō wa irenaide kudasai."
      },
      {
        "id": "cafeteria-5-example-2",
        "text": {
          "pt": "Ok, um chá preto, sem açúcar. Anotado.",
          "en": "Okay, one black tea, no sugar. Got it.",
          "ja": "はい、紅茶お一つ、砂糖なしですね。承知いたしました。"
        },
        "romaji": "Hai, kōcha o hitotsu, satō nashi desu ne. Shōchi itashimashita."
      },
      {
        "id": "cafeteria-5-example-3",
        "text": {
          "pt": "Perfeito, muito obrigado.",
          "en": "Perfect, thank you very much.",
          "ja": "はい、それでお願いします。"
        },
        "romaji": "Hai, sore de onegai shimasu."
      }
    ],
    "cafeteria-6": [
      {
        "id": "cafeteria-6-example-1",
        "text": {
          "pt": "Estou procurando algo para acompanhar meu café.",
          "en": "I'm looking for a little something to go with my coffee.",
          "ja": "コーヒーに合うちょっとしたものを探しています。"
        },
        "romaji": "Kōhī ni au chottoshita mono o sagashite imasu."
      },
      {
        "id": "cafeteria-6-example-2",
        "text": {
          "pt": "Olha só. Aquele bolo de limão na vitrine parece delicioso.",
          "en": "Oh, look. That lemon cake in the display looks delicious.",
          "ja": "あ、見て。ショーケースのあのレモンケーキ、おいしそう。"
        },
        "romaji": "A, mite. Shōkēsu no ano remon kēki, oishisō."
      },
      {
        "id": "cafeteria-6-example-3",
        "text": {
          "pt": "Ele foi assado hoje de manhã!",
          "en": "It was freshly baked this morning!",
          "ja": "今朝焼きたてですよ！"
        },
        "romaji": "Kesa yakitate desu yo!"
      }
    ],
    "cafeteria-7": [
      {
        "id": "cafeteria-7-example-1",
        "text": {
          "pt": "Tudo parece tão bom! O que você recomenda?",
          "en": "Everything looks so good! What do you recommend?",
          "ja": "どれも美味しそうですね。おすすめは何ですか？"
        },
        "romaji": "Dore mo oishisō desu ne. Osusume wa nan desu ka?"
      },
      {
        "id": "cafeteria-7-example-2",
        "text": {
          "pt": "O cheesecake é o nosso item mais popular. Os clientes adoram.",
          "en": "The cheesecake is our most popular item. Customers love it.",
          "ja": "チーズケーキが一番の人気商品です。お客様に大変好評ですよ。"
        },
        "romaji": "Chīzukēki ga ichiban no ninki shōhin desu. Okyakusama ni taihen kōhyō desu yo."
      },
      {
        "id": "cafeteria-7-example-3",
        "text": {
          "pt": "Nesse caso, vou querer uma fatia do cheesecake.",
          "en": "In that case, I'll have a slice of the cheesecake.",
          "ja": "それでしたら、チーズケーキを一切れお願いします。"
        },
        "romaji": "Sore deshitara, chīzukēki o hitokire onegai shimasu."
      }
    ],
    "cafeteria-8": [
      {
        "id": "cafeteria-8-example-1",
        "text": {
          "pt": "Com licença, vocês oferecem Wi-Fi gratuito para os clientes?",
          "en": "Excuse me, do you offer free Wi-Fi for customers?",
          "ja": "すみません、お客さん用に無料のWi-Fiはありますか？"
        },
        "romaji": "Sumimasen, okyakusan-yō ni muryō no Waifai wa arimasu ka?"
      },
      {
        "id": "cafeteria-8-example-2",
        "text": {
          "pt": "Sim, oferecemos. O nome da rede é 'CafeNet'.",
          "en": "Yes, we do. The network name is 'CafeNet'.",
          "ja": "はい、ございます。ネットワーク名は「CafeNet」です。"
        },
        "romaji": "Hai, gozaimasu. Nettowāku-mei wa 'CafeNet' desu."
      },
      {
        "id": "cafeteria-8-example-3",
        "text": {
          "pt": "Ótimo, obrigado. E a senha está afixada no balcão?",
          "en": "Great, thanks. And is the password posted at the counter?",
          "ja": "ありがとうございます。それで、パスワードはカウンターに貼ってありますか？"
        },
        "romaji": "Arigatō gozaimasu. Sorede, pasuwādo wa kauntā ni hatte arimasu ka?"
      }
    ],
    "cafeteria-9": [
      {
        "id": "cafeteria-9-example-1",
        "text": {
          "pt": "Estou tentando me conectar ao Wi-Fi. Qual é a senha?",
          "en": "I'm trying to connect to the Wi-Fi. What's the password?",
          "ja": "Wi-Fiに接続しようとしているのですが、パスワードは何ですか？"
        },
        "romaji": "Waifai ni setsuzoku shiyō to shite iru no desu ga, pasuwādo wa nan desu ka?"
      },
      {
        "id": "cafeteria-9-example-2",
        "text": {
          "pt": "Você pode encontrar a senha do Wi-Fi impressa na parte inferior do seu recibo.",
          "en": "You can find the Wi-Fi password printed at the bottom of your receipt.",
          "ja": "Wi-Fiのパスワードはレシートの下部に印刷されています。"
        },
        "romaji": "Waifai no pasuwādo wa reshīto no kabu ni insatsu sarete imasu."
      },
      {
        "id": "cafeteria-9-example-3",
        "text": {
          "pt": "Ah, estou vendo agora. Obrigado!",
          "en": "Oh, I see it now. Thank you!",
          "ja": "ああ、今見つけました。どうもありがとう！"
        },
        "romaji": "Ā, ima mitsukemashita. Dōmo arigatō!"
      }
    ]
  },
  "restaurante": {
    "restaurante-0": [
      {
        "id": "restaurante-0-example-1",
        "text": {
          "pt": "Boa noite, tenho uma mesa reservada em nome de Silva.",
          "en": "Good evening, I have a table reserved under the name Silva.",
          "ja": "こんばんは。シルバの名で席を予約しています。"
        },
        "romaji": "Konbanwa. Shiruba no na de seki o yoyaku shite imasu."
      },
      {
        "id": "restaurante-0-example-2",
        "text": {
          "pt": "Qual o horário da sua reserva?",
          "en": "What time is your reservation for?",
          "ja": "ご予約は何時でいらっしゃいますか？"
        },
        "romaji": "Goyoyaku wa nanji de irasshaimasu ka?"
      },
      {
        "id": "restaurante-0-example-3",
        "text": {
          "pt": "A reserva é para as sete da noite.",
          "en": "The reservation is for seven o'clock this evening.",
          "ja": "夜7時で予約をお願いしています。"
        },
        "romaji": "Yoru shichiji de yoyaku o onegai shite imasu."
      }
    ],
    "restaurante-1": [
      {
        "id": "restaurante-1-example-1",
        "text": {
          "pt": "Sua mesa já está pronta. Acompanhem-me, por favor.",
          "en": "Your table is ready. Please follow me.",
          "ja": "お席の準備ができました。ご案内いたします。"
        },
        "romaji": "Oseki no junbi ga dekimashita. Goannai itashimasu."
      },
      {
        "id": "restaurante-1-example-2",
        "text": {
          "pt": "É um ótimo lugar, muito obrigada!",
          "en": "This is a great spot, thank you very much!",
          "ja": "素敵な席ですね、どうもありがとうございます。"
        },
        "romaji": "Suteki na seki desu ne, dōmo arigatō gozaimasu."
      },
      {
        "id": "restaurante-1-example-3",
        "text": {
          "pt": "De nada, espero que aproveitem a refeição.",
          "en": "You're welcome. I hope you enjoy your meal.",
          "ja": "どういたしまして。どうぞごゆっくりお食事をお楽しみください。"
        },
        "romaji": "Dō itashimashite. Dōzo goyukkuri oshokuji o otanoshimi kudasai."
      }
    ],
    "restaurante-2": [
      {
        "id": "restaurante-2-example-1",
        "text": {
          "pt": "Poderia nos falar sobre as sugestões do dia?",
          "en": "Could you tell us about today's specials?",
          "ja": "本日の特別料理について教えていただけますか？"
        },
        "romaji": "Honjitsu no tokubetsu ryōri ni tsuite oshiete itadakemasu ka?"
      },
      {
        "id": "restaurante-2-example-2",
        "text": {
          "pt": "Nosso chef preparou um risoto de cogumelos selvagens.",
          "en": "Our chef has prepared a wild mushroom risotto.",
          "ja": "本日は、シェフ特製の天然きのこのリゾットをご用意しております。"
        },
        "romaji": "Honjitsu wa, shefu tokusei no ten'nen kinoko no rizotto o goyōi shite orimasu."
      },
      {
        "id": "restaurante-2-example-3",
        "text": {
          "pt": "Que interessante! Parece uma excelente escolha.",
          "en": "How interesting! That sounds like an excellent choice.",
          "ja": "それは魅力的ですね。とても美味しそうです。"
        },
        "romaji": "Sore wa miryokuteki desu ne. Totemo oishisō desu."
      }
    ],
    "restaurante-3": [
      {
        "id": "restaurante-3-example-1",
        "text": {
          "pt": "Este salmão grelhado está perfeitamente temperado.",
          "en": "This grilled salmon is seasoned perfectly.",
          "ja": "この鮭のグリル、味付けが完璧ですね。"
        },
        "romaji": "Kono sake no guriru, ajitsuke ga kanpeki desu ne."
      },
      {
        "id": "restaurante-3-example-2",
        "text": {
          "pt": "Concordo, o peixe está suculento e no ponto certo.",
          "en": "I agree, the fish is juicy and cooked just right.",
          "ja": "ええ、身がジューシーで焼き加減も絶妙です。"
        },
        "romaji": "Ee, mi ga jūshī de yakikagen mo zetsumyō desu."
      },
      {
        "id": "restaurante-3-example-3",
        "text": {
          "pt": "Definitivamente um dos melhores que já comi.",
          "en": "Definitely one of the best I've ever had.",
          "ja": "間違いなく、今まで食べた中で一番美味しいです。"
        },
        "romaji": "Machigainaku, ima made tabeta naka de ichiban oishii desu."
      }
    ],
    "restaurante-4": [
      {
        "id": "restaurante-4-example-1",
        "text": {
          "pt": "Existe alguma opção sem frutos do mar no cardápio?",
          "en": "Are there any options without seafood on the menu?",
          "ja": "魚介類が入っていない料理はありますか？"
        },
        "romaji": "Gyokairui ga haitte inai ryōri wa arimasu ka?"
      },
      {
        "id": "restaurante-4-example-2",
        "text": {
          "pt": "Sim, temos várias alternativas, como o bife ou a massa vegetariana.",
          "en": "Yes, we have several alternatives, such as the steak or the vegetarian pasta.",
          "ja": "はい、ステーキやベジタリアン向けのパスタなど、いくつか選択肢がございます。"
        },
        "romaji": "Hai, sutēki ya bejitarian-muke no pasuta nado, ikutsuka sentakushi ga gozaimasu."
      },
      {
        "id": "restaurante-4-example-3",
        "text": {
          "pt": "Ótimo, preciso ter certeza de que não há nenhum traço de frutos do mar.",
          "en": "Great, I need to be sure there's no trace of seafood.",
          "ja": "良かったです。魚介類が一切含まれていないか、ご確認をお願いします。"
        },
        "romaji": "Yokatta desu. Gyokairui ga issai fukumarete inai ka, go-kakunin o onegai shimasu."
      }
    ],
    "restaurante-5": [
      {
        "id": "restaurante-5-example-1",
        "text": {
          "pt": "Posso pedir para prepararem meu prato sem glúten?",
          "en": "Can I ask for my dish to be prepared gluten-free?",
          "ja": "私の料理をグルテンフリーにしてもらうことは可能ですか？"
        },
        "romaji": "Watashi no ryōri o guruten furī ni shite morau koto wa kanō desu ka?"
      },
      {
        "id": "restaurante-5-example-2",
        "text": {
          "pt": "Com certeza, vou comunicar seu pedido ao chef imediatamente.",
          "en": "Certainly, I'll pass your request to the chef right away.",
          "ja": "もちろんです。すぐにシェフにそのご要望を伝えます。"
        },
        "romaji": "Mochiron desu. Sugu ni shefu ni sono goyōbō o tsutaemasu."
      },
      {
        "id": "restaurante-5-example-3",
        "text": {
          "pt": "Agradeço muito sua consideração.",
          "en": "I really appreciate you being so accommodating.",
          "ja": "ご配慮いただき大変感謝いたします。"
        },
        "romaji": "Gohairyō itadaki taihen kansha itashimasu."
      }
    ],
    "restaurante-6": [
      {
        "id": "restaurante-6-example-1",
        "text": {
          "pt": "Com licença, nossa jarra de água está quase vazia.",
          "en": "Excuse me, our water pitcher is almost empty.",
          "ja": "すみません、お水のピッチャーがほとんど空です。"
        },
        "romaji": "Sumimasen, omizu no picchā ga hotondo kara desu."
      },
      {
        "id": "restaurante-6-example-2",
        "text": {
          "pt": "Gostaríamos de um pouco mais de água, por favor.",
          "en": "We'd like a little more water, please.",
          "ja": "お水のお代わりをお願いできますか？"
        },
        "romaji": "Omizu no okawari o onegai dekimasu ka?"
      },
      {
        "id": "restaurante-6-example-3",
        "text": {
          "pt": "Seria possível encher nossos copos novamente?",
          "en": "Would it be possible to refill our glasses?",
          "ja": "グラスにお水を注ぎ足していただけますか？"
        },
        "romaji": "Gurasu ni omizu o sosogitashite itadakemasu ka?"
      }
    ],
    "restaurante-7": [
      {
        "id": "restaurante-7-example-1",
        "text": {
          "pt": "Gostariam de mais pão para a mesa?",
          "en": "Would you like more bread for the table?",
          "ja": "パンのお代わりはいかがですか？"
        },
        "romaji": "Pan no okawari wa ikaga desu ka?"
      },
      {
        "id": "restaurante-7-example-2",
        "text": {
          "pt": "Sim, por favor! Seria ótimo.",
          "en": "Yes, please! That would be great.",
          "ja": "はい、お願いします！そうしていただけると嬉しいです。"
        },
        "romaji": "Hai, onegai shimasu! Sō shite itadakeru to ureshī desu."
      },
      {
        "id": "restaurante-7-example-3",
        "text": {
          "pt": "Seu pedido já está a caminho, não se preocupe.",
          "en": "Your request is on its way, don't worry.",
          "ja": "ただいまお持ちしますので、ご安心ください。"
        },
        "romaji": "Tadaima omochi shimasu node, goanshin kudasai."
      }
    ],
    "restaurante-8": [
      {
        "id": "restaurante-8-example-1",
        "text": {
          "pt": "Poderia nos trazer a conta, por favor?",
          "en": "Could you bring us the check, please?",
          "ja": "お勘定をお願いできますか？"
        },
        "romaji": "Okanjō o onegai dekimasu ka?"
      },
      {
        "id": "restaurante-8-example-2",
        "text": {
          "pt": "Cada um de nós vai pagar a sua parte.",
          "en": "Each of us will pay our own share.",
          "ja": "支払いは、それぞれ個別でお願いします。"
        },
        "romaji": "Shiharai wa, sorezore kobetsu de onegai shimasu."
      },
      {
        "id": "restaurante-8-example-3",
        "text": {
          "pt": "Você poderia dividir a conta em três?",
          "en": "Could you split the bill three ways?",
          "ja": "お会計を3つに分けていただけますか？"
        },
        "romaji": "Okaikei o mittsu ni wakete itadakemasu ka?"
      }
    ],
    "restaurante-9": [
      {
        "id": "restaurante-9-example-1",
        "text": {
          "pt": "Nossa refeição foi excelente, muito obrigado.",
          "en": "Our meal was excellent, thank you very much.",
          "ja": "食事がとても素晴らしかったです。ありがとうございました。"
        },
        "romaji": "Shokuji ga totemo subarashikatta desu. Arigatō gozaimashita."
      },
      {
        "id": "restaurante-9-example-2",
        "text": {
          "pt": "Transmitirei seus elogios à equipe da cozinha.",
          "en": "I will pass your compliments on to the kitchen staff.",
          "ja": "お客様からのお褒めの言葉、厨房に伝えておきます。"
        },
        "romaji": "Okyakusama kara no ohome no kotoba, chūbō ni tsutaete okimasu."
      },
      {
        "id": "restaurante-9-example-3",
        "text": {
          "pt": "Com certeza voltaremos em breve.",
          "en": "We'll definitely be back soon.",
          "ja": "また近いうちに是非お伺いしたいと思います。"
        },
        "romaji": "Mata chikauchi ni zehi oukagai shitai to omoimasu."
      }
    ]
  },
  "compras": {
    "compras-0": [
      {
        "id": "compras-0-example-1",
        "text": {
          "pt": "Achei esta peça linda, mas está um pouco apertada.",
          "en": "This piece is lovely, but it's a bit tight.",
          "ja": "この服は素敵ですが、少しきついです。"
        },
        "romaji": "Kono fuku wa suteki desu ga, sukoshi kitsui desu."
      },
      {
        "id": "compras-0-example-2",
        "text": {
          "pt": "Hum, então a senhora gostaria de um tamanho G, talvez?",
          "en": "Hmm, so you'd like a size Large, perhaps?",
          "ja": "ええと、では、Lサイズをご希望ですか？"
        },
        "romaji": "Ēto, de wa, Eru-saizu o go-kibō desu ka?"
      },
      {
        "id": "compras-0-example-3",
        "text": {
          "pt": "Isso, por favor! Seria perfeito se coubesse.",
          "en": "Yes, please! It would be perfect if it fit.",
          "ja": "はい、お願いします！ぴったりだったら最高です。"
        },
        "romaji": "Hai, onegai shimasu! Pittari dattara saikō desu."
      }
    ],
    "compras-1": [
      {
        "id": "compras-1-example-1",
        "text": {
          "pt": "Ah, essa cor não está na prateleira.",
          "en": "Oh, that color isn't on the shelf.",
          "ja": "あっ、その色は棚にありませんね。"
        },
        "romaji": "Ā, sono iro wa tana ni arimasen ne."
      },
      {
        "id": "compras-1-example-2",
        "text": {
          "pt": "Poderia esperar um momento? O estoque fica lá nos fundos.",
          "en": "Could you wait a moment? The stockroom is in the back.",
          "ja": "少々お待ちいただけますか？倉庫は奥にありますので。"
        },
        "romaji": "Shōshō omachi itadakemasu ka? Sōko wa oku ni arimasu node."
      },
      {
        "id": "compras-1-example-3",
        "text": {
          "pt": "Claro, sem problemas. Fico aguardando aqui.",
          "en": "Of course, no problem. I'll wait here.",
          "ja": "はい、大丈夫です。ここで待っています。"
        },
        "romaji": "Hai, daijōbu desu. Koko de matte imasu."
      }
    ],
    "compras-2": [
      {
        "id": "compras-2-example-1",
        "text": {
          "pt": "Adorei este vestido azul.",
          "en": "I love this blue dress.",
          "ja": "この青いワンピース、とても気に入りました。"
        },
        "romaji": "Kono aoi wanpīsu, totemo ki ni irimashita."
      },
      {
        "id": "compras-2-example-2",
        "text": {
          "pt": "Gostaria de ver como ele fica em mim.",
          "en": "I'd like to see how it looks on me.",
          "ja": "着た感じを見てみたいです。"
        },
        "romaji": "Kita kanji o mite mitai desu."
      },
      {
        "id": "compras-2-example-3",
        "text": {
          "pt": "Claro, o provador está livre.",
          "en": "Certainly, the fitting room is free.",
          "ja": "もちろんです、試着室は空いていますよ。"
        },
        "romaji": "Mochiron desu, shichakushitsu wa aite imasu yo."
      }
    ],
    "compras-3": [
      {
        "id": "compras-3-example-1",
        "text": {
          "pt": "Onde posso provar estas calças?",
          "en": "Where can I try on these pants?",
          "ja": "このズボンはどこで試着できますか？"
        },
        "romaji": "Kono zubon wa doko de shichaku dekimasu ka?"
      },
      {
        "id": "compras-3-example-2",
        "text": {
          "pt": "Siga reto até o final do corredor e vire à direita.",
          "en": "Go straight to the end of the aisle and turn right.",
          "ja": "通路の奥までまっすぐ進んで、右に曲がってください。"
        },
        "romaji": "Tsūro no oku made massugu susunde, migi ni magatte kudasai."
      },
      {
        "id": "compras-3-example-3",
        "text": {
          "pt": "Ah, entendi! Obrigada.",
          "en": "Ah, I see! Thank you.",
          "ja": "ああ、分かりました！ありがとうございます。"
        },
        "romaji": "Ā, wakarimashita! Arigatō gozaimasu."
      }
    ],
    "compras-4": [
      {
        "id": "compras-4-example-1",
        "text": {
          "pt": "Estou de olho neste relógio.",
          "en": "I've got my eye on this watch.",
          "ja": "この時計が気になっています。"
        },
        "romaji": "Kono tokei ga ki ni natte imasu."
      },
      {
        "id": "compras-4-example-2",
        "text": {
          "pt": "O preço na etiqueta é o valor final?",
          "en": "Is the price on the tag the final price?",
          "ja": "タグの値段が最終価格ですか？"
        },
        "romaji": "Tagu no nedan ga saishū kakaku desu ka?"
      },
      {
        "id": "compras-4-example-3",
        "text": {
          "pt": "Sim, a menos que haja uma etiqueta de desconto.",
          "en": "Yes, unless there's a discount sticker.",
          "ja": "はい、割引の表示がなければそうです。"
        },
        "romaji": "Hai, waribiki no hyōji ga nakereba sō desu."
      }
    ],
    "compras-5": [
      {
        "id": "compras-5-example-1",
        "text": {
          "pt": "Que ótimo! Então o preço original foi remarcado.",
          "en": "That's great! So the original price has been marked down.",
          "ja": "それはいいですね！元の価格から値引きされたんですね。"
        },
        "romaji": "Sore wa ii desu ne! Moto no kakaku kara nebiki sareta n desu ne."
      },
      {
        "id": "compras-5-example-2",
        "text": {
          "pt": "Exatamente, é uma oferta por tempo limitado.",
          "en": "Exactly, it's a limited-time offer.",
          "ja": "その通りです、期間限定の特別価格です。"
        },
        "romaji": "Sono tōri desu, kikan gentei no tokubetsu kakaku desu."
      },
      {
        "id": "compras-5-example-3",
        "text": {
          "pt": "Excelente, vou levar! É um ótimo negócio.",
          "en": "Excellent, I'll take it! It's a great deal.",
          "ja": "では、これにします！良い買い物ですね。"
        },
        "romaji": "De wa, kore ni shimasu! Yoi kaimono desu ne."
      }
    ],
    "compras-6": [
      {
        "id": "compras-6-example-1",
        "text": {
          "pt": "Quais são as formas de pagamento?",
          "en": "What are the payment options?",
          "ja": "お支払い方法は何がありますか？"
        },
        "romaji": "O-shiharai hōhō wa nani ga arimasu ka?"
      },
      {
        "id": "compras-6-example-2",
        "text": {
          "pt": "Posso usar meu cartão de débito?",
          "en": "Can I use my debit card?",
          "ja": "デビットカードは使えますか？"
        },
        "romaji": "Debitto kādo wa tsukaemasu ka?"
      },
      {
        "id": "compras-6-example-3",
        "text": {
          "pt": "Sim, aceitamos as principais bandeiras de cartão.",
          "en": "Yes, we accept all major card brands.",
          "ja": "はい、主要なカード会社はほとんど使えますよ。"
        },
        "romaji": "Hai, shuyō na kādo-gaisha wa hotondo tsukaemasu yo."
      }
    ],
    "compras-7": [
      {
        "id": "compras-7-example-1",
        "text": {
          "pt": "Além de dinheiro, que outras formas de pagamento vocês têm?",
          "en": "Besides cash, what other forms of payment do you take?",
          "ja": "現金以外に、どんな支払い方法がありますか？"
        },
        "romaji": "Genkin igai ni, donna shiharai hōhō ga arimasu ka?"
      },
      {
        "id": "compras-7-example-2",
        "text": {
          "pt": "Você pode pagar com seu smartphone também.",
          "en": "You can pay with your smartphone as well.",
          "ja": "スマートフォンでもお支払いいただけますよ。"
        },
        "romaji": "Sumātofon demo o-shiharai itadakemasu yo."
      },
      {
        "id": "compras-7-example-3",
        "text": {
          "pt": "Que prático! Vou usar meu celular, então.",
          "en": "How convenient! I'll use my phone then.",
          "ja": "へえ、そうなんですね！じゃあ、スマホでお願いします。"
        },
        "romaji": "Hē, sō nan desu ne! Jā, sumaho de onegai shimasu."
      }
    ],
    "compras-8": [
      {
        "id": "compras-8-example-1",
        "text": {
          "pt": "Estou comprando esta caneca para o aniversário da minha irmã.",
          "en": "I'm buying this mug for my sister's birthday.",
          "ja": "妹の誕生日プレゼントにこのマグカップを買います。"
        },
        "romaji": "Imōto no tanjōbi purezento ni kono magukappu o kaimasu."
      },
      {
        "id": "compras-8-example-2",
        "text": {
          "pt": "Gostaria que viesse em um embrulho de presente.",
          "en": "I'd like it to be gift-wrapped.",
          "ja": "プレゼント用にきれいに包んでほしいのですが。"
        },
        "romaji": "Purezento-yō ni kirei ni tsutsunde hoshii no desu ga."
      },
      {
        "id": "compras-8-example-3",
        "text": {
          "pt": "Claro, temos vários papéis de presente e fitas aqui.",
          "en": "Of course, we have various wrapping papers and ribbons here.",
          "ja": "もちろんです、こちらに色々な包装紙とリボンがございます。"
        },
        "romaji": "Mochiron desu, kochira ni iroiro na hōsōshi to ribon ga gozaimasu."
      }
    ],
    "compras-9": [
      {
        "id": "compras-9-example-1",
        "text": {
          "pt": "E se eu precisar trocar o produto depois?",
          "en": "What if I need to exchange the product later?",
          "ja": "もし後で交換したくなったら、どうすればいいですか？"
        },
        "romaji": "Moshi ato de kōkan shitaku nattara, dō sureba ii desu ka?"
      },
      {
        "id": "compras-9-example-2",
        "text": {
          "pt": "Você vai precisar apresentar a nota fiscal.",
          "en": "You will need to present the receipt.",
          "ja": "交換にはレシートが必要になります。"
        },
        "romaji": "Kōkan ni wa reshīto ga hitsuyō ni narimasu."
      },
      {
        "id": "compras-9-example-3",
        "text": {
          "pt": "Entendi, vou guardar com cuidado, por via das dúvidas.",
          "en": "Got it, I'll keep it safe, just in case.",
          "ja": "分かりました、念のため、ちゃんと取っておきます。"
        },
        "romaji": "Wakarimashita, nen no tame, chanto totte okimasu."
      }
    ]
  },
  "transporte": {
    "transporte-0": [
      {
        "id": "transporte-0-example-1",
        "text": {
          "pt": "Para o centro da cidade, qual via devo pegar?",
          "en": "To get to the city center, which track should I take?",
          "ja": "市街地へ行くには、何番線に乗ればいいですか？"
        },
        "romaji": "Shigai-chi e iku ni wa, nanban-sen ni noreba ii desu ka?"
      },
      {
        "id": "transporte-0-example-2",
        "text": {
          "pt": "É no lado oposto. Aquela plataforma ali.",
          "en": "It's on the opposite side. That platform over there.",
          "ja": "反対側ですね。あちらのホームです。"
        },
        "romaji": "Hantai-gawa desu ne. Achira no hōmu desu."
      },
      {
        "id": "transporte-0-example-3",
        "text": {
          "pt": "Ah, entendi! Então é aquela com os letreiros verdes?",
          "en": "Oh, I see! So it's the one with the green signs?",
          "ja": "ああ、分かりました！では、緑の案内表示がある方ですね？"
        },
        "romaji": "Aa, wakarimashita! Dewa, midori no annai hyōji ga aru hō desu ne?"
      }
    ],
    "transporte-1": [
      {
        "id": "transporte-1-example-1",
        "text": {
          "pt": "O trem para o aeroporto sairá em breve?",
          "en": "Will the train to the airport depart soon?",
          "ja": "空港行きの電車はまもなく出発しますか？"
        },
        "romaji": "Kūkō-yuki no densha wa mamonaku shuppatsu shimasu ka?"
      },
      {
        "id": "transporte-1-example-2",
        "text": {
          "pt": "Está na linha dois e parte em sete minutos.",
          "en": "It's on track two and leaves in seven minutes.",
          "ja": "二番線です。七分後に出発します。"
        },
        "romaji": "Niban-sen desu. Nanafun-go ni shuppatsu shimasu."
      },
      {
        "id": "transporte-1-example-3",
        "text": {
          "pt": "Ótimo, tenho tempo de comprar um café.",
          "en": "Great, I have time to grab a coffee.",
          "ja": "良かった、コーヒーを買う時間がありますね。"
        },
        "romaji": "Yokatta, kōhī o kau jikan ga arimasu ne."
      }
    ],
    "transporte-2": [
      {
        "id": "transporte-2-example-1",
        "text": {
          "pt": "Para chegar à praia, preciso fazer baldeação?",
          "en": "To get to the beach, do I need to transfer?",
          "ja": "ビーチに行くには、乗り換えが必要ですか？"
        },
        "romaji": "Bīchi ni iku ni wa, norikae ga hitsuyō desu ka?"
      },
      {
        "id": "transporte-2-example-2",
        "text": {
          "pt": "Sim, você precisa trocar de ônibus depois de três paradas.",
          "en": "Yes, you need to change buses after three stops.",
          "ja": "はい、三つ目の停留所でバスを乗り換えてください。"
        },
        "romaji": "Hai, mittsume no teiryūjo de basu o norikaete kudasai."
      },
      {
        "id": "transporte-2-example-3",
        "text": {
          "pt": "Entendi, então não é uma linha direta. Obrigado.",
          "en": "Got it, so it's not a direct line. Thanks.",
          "ja": "分かりました、直通ではないんですね、ありがとう。"
        },
        "romaji": "Wakarimashita, chokutsū de wa nai n desu ne, arigatō."
      }
    ],
    "transporte-3": [
      {
        "id": "transporte-3-example-1",
        "text": {
          "pt": "Como faço para chegar ao museu partindo daqui?",
          "en": "How do I get to the museum from here?",
          "ja": "ここから美術館へはどうやって行きますか？"
        },
        "romaji": "Koko kara bijutsukan e wa dō yatte ikimasu ka?"
      },
      {
        "id": "transporte-3-example-2",
        "text": {
          "pt": "Desça na estação do parque e pegue a linha azul.",
          "en": "Get off at the park station and take the blue line.",
          "ja": "公園駅で降りて、ブルーラインに乗り換えてください。"
        },
        "romaji": "Kōen eki de orite, burū rain ni norikaete kudasai."
      },
      {
        "id": "transporte-3-example-3",
        "text": {
          "pt": "Ah, então o metrô não vai direto. Obrigado pela informação.",
          "en": "Oh, so the subway doesn't go direct. Thanks for the information.",
          "ja": "ああ、地下鉄は直通じゃないんですね。教えてくれてありがとう。"
        },
        "romaji": "Aa, chikatetsu wa chokutsū ja nai n desu ne. Oshiete kurete arigatō."
      }
    ],
    "transporte-4": [
      {
        "id": "transporte-4-example-1",
        "text": {
          "pt": "Meu passe de ônibus está sem crédito. Onde posso recarregar?",
          "en": "My bus pass has no credit. Where can I top it up?",
          "ja": "バスカードの残高がなくなりました。どこでチャージできますか？"
        },
        "romaji": "Basu kādo no zandaka ga naku narimashita. Doko de chāji dekimasu ka?"
      },
      {
        "id": "transporte-4-example-2",
        "text": {
          "pt": "Há uma máquina de recarga na entrada.",
          "en": "There's a top-up machine at the entrance.",
          "ja": "入り口にチャージ機がありますよ。"
        },
        "romaji": "Iriguchi ni chāji-ki ga arimasu yo."
      },
      {
        "id": "transporte-4-example-3",
        "text": {
          "pt": "Perfeito, vou lá antes de embarcar.",
          "en": "Perfect, I'll go there before boarding.",
          "ja": "分かりました。乗車する前に行ってきます。"
        },
        "romaji": "Wakarimashita. Jōsha suru mae ni itte kimasu."
      }
    ],
    "transporte-5": [
      {
        "id": "transporte-5-example-1",
        "text": {
          "pt": "Onde posso recarregar meu bilhete único?",
          "en": "Where can I add money to my transit pass?",
          "ja": "このICカードはどこでチャージできますか？"
        },
        "romaji": "Kono IC kādo wa doko de chāji dekimasu ka?"
      },
      {
        "id": "transporte-5-example-2",
        "text": {
          "pt": "Use os totens de autoatendimento perto da bilheteria.",
          "en": "Use the self-service kiosks near the ticket office.",
          "ja": "切符売り場の近くにあるチャージ機をご利用ください。"
        },
        "romaji": "Kippu-uriba no chikaku ni aru chāji-ki o go-riyō kudasai."
      },
      {
        "id": "transporte-5-example-3",
        "text": {
          "pt": "Obrigado, eu estava procurando um guichê.",
          "en": "Thanks, I was looking for a ticket window.",
          "ja": "ありがとう、窓口を探していました。"
        },
        "romaji": "Arigatō, madoguchi o sagashite imashita."
      }
    ],
    "transporte-6": [
      {
        "id": "transporte-6-example-1",
        "text": {
          "pt": "Com licença, posso me sentar aqui?",
          "en": "Excuse me, may I sit here?",
          "ja": "ここに座ってもよろしいですか？"
        },
        "romaji": "Koko ni suwatte mo yoroshii desu ka?"
      },
      {
        "id": "transporte-6-example-2",
        "text": {
          "pt": "Claro, fique à vontade.",
          "en": "Of course, be my guest.",
          "ja": "ええ、どうぞお座りください。"
        },
        "romaji": "Ee, dōzo o-suwari kudasai."
      },
      {
        "id": "transporte-6-example-3",
        "text": {
          "pt": "Muito obrigado, meus pés estão me matando.",
          "en": "Thank you so much, my feet are killing me.",
          "ja": "どうもありがとう、足が痛いんです。"
        },
        "romaji": "Dōmo arigatō, ashi ga itai n desu."
      }
    ],
    "transporte-7": [
      {
        "id": "transporte-7-example-1",
        "text": {
          "pt": "Este lugar está ocupado?",
          "en": "Is this spot taken?",
          "ja": "すみません、ここ誰かいますか？"
        },
        "romaji": "Sumimasen, koko dareka imasu ka?"
      },
      {
        "id": "transporte-7-example-2",
        "text": {
          "pt": "Não, pode sentar.",
          "en": "No, it's free.",
          "ja": "いいえ、空いてますよ。どうぞ。"
        },
        "romaji": "Iie, aitemasu yo. Dōzo."
      },
      {
        "id": "transporte-7-example-3",
        "text": {
          "pt": "Que bom, já estava cansado de ficar em pé.",
          "en": "That's good, I was tired of standing.",
          "ja": "良かった、もう立ちっぱなしで疲れていました。"
        },
        "romaji": "Yokatta, mō tachi-ppanashi de tsukarete imashita."
      }
    ],
    "transporte-8": [
      {
        "id": "transporte-8-example-1",
        "text": {
          "pt": "Este trem deveria ter chegado há meia hora.",
          "en": "This train was supposed to arrive half an hour ago.",
          "ja": "この電車、30分以上も遅れてますね。"
        },
        "romaji": "Kono densha, sanjuppun ijō mo okuretemasu ne."
      },
      {
        "id": "transporte-8-example-2",
        "text": {
          "pt": "Sim, e não houve nenhum aviso sobre o atraso.",
          "en": "Yes, and there was no announcement about the delay.",
          "ja": "ええ、しかも遅延に関するアナウンスもありませんね。"
        },
        "romaji": "Ee, shikamo chien ni kansuru anaunsu mo arimasen ne."
      },
      {
        "id": "transporte-8-example-3",
        "text": {
          "pt": "Que frustrante, vou me atrasar para o trabalho.",
          "en": "How frustrating, I'm going to be late for work.",
          "ja": "困りますね、これでは仕事に遅刻してしまいます。"
        },
        "romaji": "Komarimasu ne, kore de wa shigoto ni chikoku shite shimaimasu."
      }
    ],
    "transporte-9": [
      {
        "id": "transporte-9-example-1",
        "text": {
          "pt": "Por que o trânsito está tão parado hoje?",
          "en": "Why is traffic at a standstill today?",
          "ja": "今日はどうしてこんなに渋滞しているのですか？"
        },
        "romaji": "Kyō wa dōshite konna ni jūtai shite iru no desu ka?"
      },
      {
        "id": "transporte-9-example-2",
        "text": {
          "pt": "Parece que um carro bateu perto do viaduto.",
          "en": "Apparently, a car crashed near the overpass.",
          "ja": "陸橋の近くで事故があったみたいですよ。"
        },
        "romaji": "Rikkyō no chikaku de jiko ga atta mitai desu yo."
      },
      {
        "id": "transporte-9-example-3",
        "text": {
          "pt": "Ah, entendi. É por isso que está este engarrafamento.",
          "en": "Ah, I see. That explains the traffic jam.",
          "ja": "ああ、なるほど。それで渋滞しているんですね。"
        },
        "romaji": "Aa, naruhodo. Sore de jūtai shite iru n desu ne."
      }
    ]
  },
  "viagem": {
    "viagem-0": [
      {
        "id": "viagem-0-example-1",
        "text": {
          "pt": "Qual será o seu próximo destino?",
          "en": "What will be your next destination?",
          "ja": "この後はどちらへ行かれるのですか？"
        },
        "romaji": "Kono ato wa dochira e ikareru no desu ka?"
      },
      {
        "id": "viagem-0-example-2",
        "text": {
          "pt": "Minha conexão é para Sydney, na Austrália.",
          "en": "My connecting flight is to Sydney, Australia.",
          "ja": "乗り継ぎ便はオーストラリアのシドニー行きです。"
        },
        "romaji": "Noritsugibin wa Ōsutoraria no Shidonī-iki desu."
      },
      {
        "id": "viagem-0-example-3",
        "text": {
          "pt": "Entendi. É uma longa jornada!",
          "en": "I see. That's a long journey!",
          "ja": "なるほど。長い旅ですね！"
        },
        "romaji": "Naruhodo. Nagai tabi desu ne!"
      }
    ],
    "viagem-1": [
      {
        "id": "viagem-1-example-1",
        "text": {
          "pt": "Meu próximo voo parte daqui a cinco horas.",
          "en": "My next flight departs in five hours.",
          "ja": "次のフライトは五時間後に出発します。"
        },
        "romaji": "Tsugi no furaito wa gojikan-go ni shuppatsu shimasu."
      },
      {
        "id": "viagem-1-example-2",
        "text": {
          "pt": "Então você pode dar uma volta na cidade.",
          "en": "So you can go sightseeing in the city for a bit.",
          "ja": "では、少し街を観光できますね。"
        },
        "romaji": "Dewa, sukoshi machi o kankō dekimasu ne."
      },
      {
        "id": "viagem-1-example-3",
        "text": {
          "pt": "Sim, pretendo dar uma olhada rápida nos arredores.",
          "en": "Yes, I'm planning to have a quick look around.",
          "ja": "はい、手早く見て回ろうと思っています。"
        },
        "romaji": "Hai, tebayaku mite mawarō to omotte imasu."
      }
    ],
    "viagem-2": [
      {
        "id": "viagem-2-example-1",
        "text": {
          "pt": "É uma mochila bem grande. Será que pode?",
          "en": "It's a rather large backpack. Will it be allowed?",
          "ja": "これは大きめのリュックサックですね。大丈夫でしょうか？"
        },
        "romaji": "Kore wa ōkime no ryukkusakku desu ne. Daijōbu deshō ka?"
      },
      {
        "id": "viagem-2-example-2",
        "text": {
          "pt": "Sim, contanto que caiba no compartimento superior.",
          "en": "Yes, as long as it fits in the overhead compartment.",
          "ja": "はい、頭上の収納棚に収まれば問題ありません。"
        },
        "romaji": "Hai, zujō no shūnōdana ni osamareba mondai arimasen."
      },
      {
        "id": "viagem-2-example-3",
        "text": {
          "pt": "Ótimo, assim não preciso despachá-la.",
          "en": "Great, so I don't need to check it in.",
          "ja": "良かったです。それなら預けなくて済みますね。"
        },
        "romaji": "Yokatta desu. Sore nara azukenakute sumimasu ne."
      }
    ],
    "viagem-3": [
      {
        "id": "viagem-3-example-1",
        "text": {
          "pt": "Esta caixa parece um pouco grande.",
          "en": "This box looks a bit bulky.",
          "ja": "この箱は少しかさばるように見えますね。"
        },
        "romaji": "Kono hako wa sukoshi kasabaru yō ni miemasu ne."
      },
      {
        "id": "viagem-3-example-2",
        "text": {
          "pt": "Por favor, teste no medidor para confirmar.",
          "en": "Please test it in the sizer to confirm.",
          "ja": "確認のため、そちらで試してみてください。"
        },
        "romaji": "Kakunin no tame, sochira de tameshite mite kudasai."
      },
      {
        "id": "viagem-3-example-3",
        "text": {
          "pt": "Ah, não coube. Terei que pagar uma taxa extra.",
          "en": "Oh, it didn't fit. I'll have to pay an extra fee.",
          "ja": "あ、入りませんでした。追加料金を払う必要がありますね。"
        },
        "romaji": "A, hairimasen deshita. Tsuika ryōkin o harau hitsuyō ga arimasu ne."
      }
    ],
    "viagem-4": [
      {
        "id": "viagem-4-example-1",
        "text": {
          "pt": "Que legal! Já tem algum roteiro?",
          "en": "How nice! Do you have an itinerary in mind?",
          "ja": "いいですね！何かご予定はありますか？"
        },
        "romaji": "Ii desu ne! Nanika goyotei wa arimasu ka?"
      },
      {
        "id": "viagem-4-example-2",
        "text": {
          "pt": "Vou visitar as praias e alguns museus.",
          "en": "I'm going to visit the beaches and some museums.",
          "ja": "ビーチといくつかの美術館を訪れる予定です。"
        },
        "romaji": "Bīchi to ikutsuka no bijutsukan o otozureru yotei desu."
      },
      {
        "id": "viagem-4-example-3",
        "text": {
          "pt": "Espero que aproveite muito sua visita!",
          "en": "I hope you really enjoy your visit!",
          "ja": "ご旅行を存分に楽しんでくださいね！"
        },
        "romaji": "Goryokō o zonbun ni tanoshinde kudasai ne!"
      }
    ],
    "viagem-5": [
      {
        "id": "viagem-5-example-1",
        "text": {
          "pt": "Muito obrigado! Estou ansioso para conhecer o lugar.",
          "en": "Thank you very much! I'm looking forward to exploring.",
          "ja": "ありがとうございます。見て回るのが楽しみです。"
        },
        "romaji": "Arigatō gozaimasu. Mite mawaru no ga tanoshimi desu."
      },
      {
        "id": "viagem-5-example-2",
        "text": {
          "pt": "Se tiver qualquer problema, não hesite em perguntar.",
          "en": "If you have any trouble, please don't hesitate to ask.",
          "ja": "何かお困りのことがあれば、遠慮なく聞いてください。"
        },
        "romaji": "Nanika okomari no koto ga areba, enryo naku kiite kudasai."
      },
      {
        "id": "viagem-5-example-3",
        "text": {
          "pt": "Entendido, agradeço sua gentileza.",
          "en": "Okay, I appreciate the kindness.",
          "ja": "分かりました、ご親切に感謝します。"
        },
        "romaji": "Wakarimashita, goshinsetsu ni kansha shimasu."
      }
    ],
    "viagem-6": [
      {
        "id": "viagem-6-example-1",
        "text": {
          "pt": "Acabei de desembarcar e não encontro minha mala.",
          "en": "I just disembarked and I can't find my suitcase.",
          "ja": "ちょうど飛行機を降りたのですが、スーツケースが見当たりません。"
        },
        "romaji": "Chōdo hikōki o orita no desu ga, sūtsukēsu ga miatarimasen."
      },
      {
        "id": "viagem-6-example-2",
        "text": {
          "pt": "Fica no térreo, perto da saída.",
          "en": "It's on the ground floor, near the exit.",
          "ja": "一階、出口の近くにありますよ。"
        },
        "romaji": "Ikkai, deguchi no chikaku ni arimasu yo."
      },
      {
        "id": "viagem-6-example-3",
        "text": {
          "pt": "Ah, obrigado! Vou procurar por lá.",
          "en": "Oh, thanks! I'll look there.",
          "ja": "ああ、ありがとうございます！そちらを探してみます。"
        },
        "romaji": "Ā, arigatō gozaimasu! Sochira o sagashite mimasu."
      }
    ],
    "viagem-7": [
      {
        "id": "viagem-7-example-1",
        "text": {
          "pt": "Então é no andar de baixo?",
          "en": "So, it's on the floor below?",
          "ja": "では、下の階ですね？"
        },
        "romaji": "Dewa, shita no kai desu ne?"
      },
      {
        "id": "viagem-7-example-2",
        "text": {
          "pt": "Exato. Não tem como errar.",
          "en": "Exactly. You can't miss it.",
          "ja": "その通りです。迷うことはないでしょう。"
        },
        "romaji": "Sono tōri desu. Mayou koto wa nai deshō."
      },
      {
        "id": "viagem-7-example-3",
        "text": {
          "pt": "Perfeito, muito obrigado pela ajuda.",
          "en": "Perfect, thank you very much for the help.",
          "ja": "よく分かりました、情報ありがとうございます。"
        },
        "romaji": "Yoku wakarimashita, jōhō arigatō gozaimasu."
      }
    ],
    "viagem-8": [
      {
        "id": "viagem-8-example-1",
        "text": {
          "pt": "Onde posso fazer isso antes de sair do aeroporto?",
          "en": "Where can I do that before leaving the airport?",
          "ja": "空港を出る前にどこで両替できますか？"
        },
        "romaji": "Kūkō o deru mae ni doko de ryōgae dekimasu ka?"
      },
      {
        "id": "viagem-8-example-2",
        "text": {
          "pt": "Há um guichê de câmbio no saguão principal.",
          "en": "There's a currency exchange counter in the main lobby.",
          "ja": "メインロビーに両替所がありますよ。"
        },
        "romaji": "Mein robī ni ryōgaejo ga arimasu yo."
      },
      {
        "id": "viagem-8-example-3",
        "text": {
          "pt": "Vou até lá então.",
          "en": "I'll head over there then.",
          "ja": "では、そちらへ行ってみます。"
        },
        "romaji": "Dewa, sochira e itte mimasu."
      }
    ],
    "viagem-9": [
      {
        "id": "viagem-9-example-1",
        "text": {
          "pt": "É um pouco cedo para ir lá agora, não é?",
          "en": "It's a bit early to go there now, isn't it?",
          "ja": "そこに着くには少し早いですよね？"
        },
        "romaji": "Soko ni tsuku ni wa sukoshi hayai desu yo ne?"
      },
      {
        "id": "viagem-9-example-2",
        "text": {
          "pt": "Sim, somente às sete da manhã.",
          "en": "Yes, not until seven in the morning.",
          "ja": "はい、朝の七時からです。"
        },
        "romaji": "Hai, asa no shichiji kara desu."
      },
      {
        "id": "viagem-9-example-3",
        "text": {
          "pt": "Vou esperar em uma cafeteria, então.",
          "en": "I'll wait in a coffee shop, then.",
          "ja": "では、カフェで待つことにします。"
        },
        "romaji": "Dewa, kafe de matsu koto ni shimasu."
      }
    ]
  },
  "hotel": {
    "hotel-0": [
      {
        "id": "hotel-0-example-1",
        "text": {
          "pt": "Boa tarde, tenho uma reserva no nome de Silva.",
          "en": "Good afternoon, I have a reservation under the name Silva.",
          "ja": "こんにちは、シルバで予約しています。"
        },
        "romaji": "Konnichiwa, Shiruba de yoyaku shite imasu."
      },
      {
        "id": "hotel-0-example-2",
        "text": {
          "pt": "Poderia preencher este formulário de registro, por favor?",
          "en": "Could you please fill out this registration form?",
          "ja": "こちらの登録用紙にご記入いただけますか？"
        },
        "romaji": "Kochira no tōroku yōshi ni gokinyū itadakemasu ka?"
      },
      {
        "id": "hotel-0-example-3",
        "text": {
          "pt": "Claro, sem problemas. Aqui está.",
          "en": "Of course, no problem. Here you go.",
          "ja": "もちろんです。はい、どうぞ。"
        },
        "romaji": "Mochiron desu. Hai, dōzo."
      }
    ],
    "hotel-1": [
      {
        "id": "hotel-1-example-1",
        "text": {
          "pt": "Posso ver seu passaporte, por favor?",
          "en": "May I see your passport, please?",
          "ja": "パスポートを見せていただけますか？"
        },
        "romaji": "Pasupōto o misete itadakemasu ka?"
      },
      {
        "id": "hotel-1-example-2",
        "text": {
          "pt": "Está aqui. Minha carteira de motorista também serve?",
          "en": "Here it is. Does my driver's license also work?",
          "ja": "はい、どうぞ。運転免許証でもいいですか？"
        },
        "romaji": "Hai, dōzo. Unten menkyoshō demo ii desu ka?"
      },
      {
        "id": "hotel-1-example-3",
        "text": {
          "pt": "Sim, qualquer um dos dois é suficiente para o registro.",
          "en": "Yes, either one is sufficient for registration.",
          "ja": "はい、どちらか一方で登録できます。"
        },
        "romaji": "Hai, dochira ka ippō de tōroku dekimasu."
      }
    ],
    "hotel-2": [
      {
        "id": "hotel-2-example-1",
        "text": {
          "pt": "Sobre as refeições, onde posso comer de manhã?",
          "en": "Regarding meals, where can I eat in the morning?",
          "ja": "食事についてですが、朝はどこで食べられますか？"
        },
        "romaji": "Shokuji ni tsuite desu ga, asa wa doko de taberaremasu ka?"
      },
      {
        "id": "hotel-2-example-2",
        "text": {
          "pt": "A tarifa do meu quarto já inclui o café da manhã?",
          "en": "Does my room rate already include breakfast?",
          "ja": "私の部屋の料金に朝食は含まれていますか？"
        },
        "romaji": "Watashi no heya no ryōkin ni chōshoku wa fukumarete imasu ka?"
      },
      {
        "id": "hotel-2-example-3",
        "text": {
          "pt": "Vou verificar os detalhes da sua reserva agora.",
          "en": "I'll check your reservation details now.",
          "ja": "今すぐお客様のご予約内容を確認いたします。"
        },
        "romaji": "Ima sugu okyakusama no goyoyaku naiyō o kakunin itashimasu."
      }
    ],
    "hotel-3": [
      {
        "id": "hotel-3-example-1",
        "text": {
          "pt": "Onde é servido o buffet de café da manhã?",
          "en": "Where is the breakfast buffet served?",
          "ja": "朝食のビュッフェはどこで提供されますか？"
        },
        "romaji": "Chōshoku no byuffe wa doko de teikyō saremasu ka?"
      },
      {
        "id": "hotel-3-example-2",
        "text": {
          "pt": "No restaurante principal. Fica aberto das 7h às 10h.",
          "en": "In the main restaurant. It's open from 7 AM to 10 AM.",
          "ja": "メインレストランです。午前7時から10時まで営業しております。"
        },
        "romaji": "Mein resutoran desu. Gozen shichiji kara jūji made eigyō shite orimasu."
      },
      {
        "id": "hotel-3-example-3",
        "text": {
          "pt": "Ótimo, muito obrigado pela informação.",
          "en": "Great, thank you very much for the information.",
          "ja": "分かりました、情報ありがとうございます。"
        },
        "romaji": "Wakarimashita, jōhō arigatō gozaimasu."
      }
    ],
    "hotel-4": [
      {
        "id": "hotel-4-example-1",
        "text": {
          "pt": "O ar-condicionado do quarto 305 não está funcionando.",
          "en": "The air conditioner in room 305 isn't working.",
          "ja": "305号室のエアコンが動きません。"
        },
        "romaji": "Sanbyakugogōshitsu no eakon ga ugokimasen."
      },
      {
        "id": "hotel-4-example-2",
        "text": {
          "pt": "Ele não está respondendo ao controle remoto.",
          "en": "It's not responding to the remote control.",
          "ja": "リモコンを操作しても反応がありません。"
        },
        "romaji": "Rimokon o sōsa shite mo hannō ga arimasen."
      },
      {
        "id": "hotel-4-example-3",
        "text": {
          "pt": "Entendido. Enviaremos alguém para verificar imediatamente.",
          "en": "Understood. We'll send someone to check it right away.",
          "ja": "承知いたしました。すぐに確認のため係の者を伺わせます。"
        },
        "romaji": "Shōchi itashimashita. Sugu ni kakunin no tame kakari no mono o ukagawasemasu."
      }
    ],
    "hotel-5": [
      {
        "id": "hotel-5-example-1",
        "text": {
          "pt": "Meu chuveiro está com um vazamento.",
          "en": "My shower is leaking.",
          "ja": "シャワーから水漏れしています。"
        },
        "romaji": "Shawā kara mizumore shite imasu."
      },
      {
        "id": "hotel-5-example-2",
        "text": {
          "pt": "Um técnico irá ao seu quarto em instantes.",
          "en": "A technician will be at your room shortly.",
          "ja": "すぐに技術者がお部屋に伺います。"
        },
        "romaji": "Sugu ni gijutsusha ga oheya ni ukagaimasu."
      },
      {
        "id": "hotel-5-example-3",
        "text": {
          "pt": "Agradeço muito a agilidade.",
          "en": "I really appreciate the quick response.",
          "ja": "迅速な対応に大変感謝いたします。"
        },
        "romaji": "Jinsoku na taiō ni taihen kansha itashimasu."
      }
    ],
    "hotel-6": [
      {
        "id": "hotel-6-example-1",
        "text": {
          "pt": "Meu voo é só à noite, posso deixar minha bagagem aqui?",
          "en": "My flight isn't until tonight; can I leave my luggage here?",
          "ja": "フライトが夜なので、荷物を預かってもらえますか？"
        },
        "romaji": "Furaito ga yoru nanode, nimotsu o azukatte moraemasu ka?"
      },
      {
        "id": "hotel-6-example-2",
        "text": {
          "pt": "Precisarei pegá-la por volta das 17h.",
          "en": "I'll need to pick it up around 5 PM.",
          "ja": "午後5時頃に取りに戻ります。"
        },
        "romaji": "Gogo goji goro ni tori ni modorimasu."
      },
      {
        "id": "hotel-6-example-3",
        "text": {
          "pt": "Sim, temos um serviço de guarda-volumes gratuito.",
          "en": "Yes, we have a complimentary luggage storage service.",
          "ja": "はい、無料の手荷物預かりサービスがございます。"
        },
        "romaji": "Hai, muryō no tenimotsu azukari sābisu ga gozaimasu."
      }
    ],
    "hotel-7": [
      {
        "id": "hotel-7-example-1",
        "text": {
          "pt": "É possível deixar minhas sacolas de compras aqui por algumas hours?",
          "en": "Is it possible to leave my shopping bags here for a few hours?",
          "ja": "この買い物袋を数時間預かっていただくことは可能ですか？"
        },
        "romaji": "Kono kaimono-bukuro o sūjikan azukatte itadaku koto wa kanō desu ka?"
      },
      {
        "id": "hotel-7-example-2",
        "text": {
          "pt": "Claro. Por favor, apresente este comprovante na retirada.",
          "en": "Certainly. Please present this receipt upon pickup.",
          "ja": "かしこまりました。お引き取りの際にこの控えをご提示ください。"
        },
        "romaji": "Kashikomarimashita. Ohikitori no sai ni kono hikae o goteiji kudasai."
      },
      {
        "id": "hotel-7-example-3",
        "text": {
          "pt": "Entendido. Muito obrigado pela ajuda.",
          "en": "Understood. Thank you so much for your help.",
          "ja": "承知しました。大変助かります。"
        },
        "romaji": "Shōchi shimashita. Taihen tasukarimasu."
      }
    ],
    "hotel-8": [
      {
        "id": "hotel-8-example-1",
        "text": {
          "pt": "Qual é o horário para desocupar o quarto amanhã?",
          "en": "What time do I need to vacate the room by tomorrow?",
          "ja": "明日は何時までに部屋を空ける必要がありますか？"
        },
        "romaji": "Ashita wa nanji made ni heya o akeru hitsuyō ga arimasu ka?"
      },
      {
        "id": "hotel-8-example-2",
        "text": {
          "pt": "Preciso devolver a chave antes do meio-dia?",
          "en": "Do I have to return the key before noon?",
          "ja": "正午までに鍵を返却する必要がありますか？"
        },
        "romaji": "Shōgo made ni kagi o henkyaku suru hitsuyō ga arimasu ka?"
      },
      {
        "id": "hotel-8-example-3",
        "text": {
          "pt": "Sim, esse é o nosso horário de check-out padrão.",
          "en": "Yes, that's our standard checkout time.",
          "ja": "はい、それが通常のチェックアウト時間でございます。"
        },
        "romaji": "Hai, sore ga tsūjō no chekkuauto jikan de gozaimasu."
      }
    ],
    "hotel-9": [
      {
        "id": "hotel-9-example-1",
        "text": {
          "pt": "Posso fazer o check-out um pouco mais tarde?",
          "en": "Is it possible to check out a little later?",
          "ja": "チェックアウトを少し遅らせることはできますか？"
        },
        "romaji": "Chekkuauto o sukoshi okuraseru koto wa dekimasu ka?"
      },
      {
        "id": "hotel-9-example-2",
        "text": {
          "pt": "Se precisar de uma saída tardia, haverá custos adicionais.",
          "en": "If you need a late checkout, there are additional charges.",
          "ja": "もしチェックアウトが遅れる場合は、追加料金が発生します。"
        },
        "romaji": "Moshi chekkuauto ga okureru baai wa, tsuika ryōkin ga hassei shimasu."
      },
      {
        "id": "hotel-9-example-3",
        "text": {
          "pt": "Entendi, vou me programar para sair no horário.",
          "en": "I see, I'll plan to leave on time then.",
          "ja": "承知しました。では、時間通りにチェックアウトするようにします。"
        },
        "romaji": "Shōchi shimashita. Dewa, jikan dōri ni chekkuauto suru yō ni shimasu."
      }
    ]
  },
  "escola": {
    "escola-0": [
      {
        "id": "escola-0-example-1",
        "text": {
          "pt": "Ela aborda apenas o conteúdo visto em sala?",
          "en": "Does it only cover the content we saw in class?",
          "ja": "授業で習った内容だけですか？"
        },
        "romaji": "Jugyō de naratta naiyō dake desu ka?"
      },
      {
        "id": "escola-0-example-2",
        "text": {
          "pt": "Sim, a professora confirmou que não haverá surpresas.",
          "en": "Yes, the teacher confirmed there won't be any surprises.",
          "ja": "ええ、先生がサプライズはないと確認しました。"
        },
        "romaji": "Ē, sensei ga sapuraizu wa nai to kakunin shimashita."
      },
      {
        "id": "escola-0-example-3",
        "text": {
          "pt": "Ótimo, então só preciso revisar meus apontamentos.",
          "en": "Great, then I just need to review my notes.",
          "ja": "良かったです、では自分のメモを見直すだけですね。"
        },
        "romaji": "Yokatta desu, de wa jibun no memo o minaosu dake desu ne."
      }
    ],
    "escola-1": [
      {
        "id": "escola-1-example-1",
        "text": {
          "pt": "Precisamos ler todos os textos complementares?",
          "en": "Do we need to read all the supplementary texts?",
          "ja": "補足のテキストも全部読む必要がありますか？"
        },
        "romaji": "Hosoku no tekisuto mo zenbu yomu hitsuyō ga arimasu ka?"
      },
      {
        "id": "escola-1-example-2",
        "text": {
          "pt": "Acredito que sim, para ter uma visão completa.",
          "en": "I believe so, to have a complete overview.",
          "ja": "ええ、全体像を把握するためには必要だと思います。"
        },
        "romaji": "Ē, zentaizō o haaku suru tame ni wa hitsuyō da to omoimasu."
      },
      {
        "id": "escola-1-example-3",
        "text": {
          "pt": "Ah, entendi. É bom saber antes de começar a estudar.",
          "en": "Oh, I see. Good to know before I start studying.",
          "ja": "ああ、なるほど。勉強を始める前に知れてよかったです。"
        },
        "romaji": "Ā, naruhodo. Benkyō o hajimeru mae ni shirete yokatta desu."
      }
    ],
    "escola-2": [
      {
        "id": "escola-2-example-1",
        "text": {
          "pt": "Estou com dificuldades para entender o tema da aula passada.",
          "en": "I'm having trouble understanding last class's topic.",
          "ja": "前回の授業のテーマがよく理解できません。"
        },
        "romaji": "Zenjikai no jugyō no tēma ga yoku rikai dekimasen."
      },
      {
        "id": "escola-2-example-2",
        "text": {
          "pt": "Claro, posso compartilhar o que anotei.",
          "en": "Of course, I can share what I wrote down.",
          "ja": "もちろん、私が書き留めたものなら貸せますよ。"
        },
        "romaji": "Mochiron, watashi ga kakitometamono nara kasemasu yo."
      },
      {
        "id": "escola-2-example-3",
        "text": {
          "pt": "Muito obrigado! Isso me ajudaria muito para a revisão.",
          "en": "Thank you so much! That would help me a lot with reviewing.",
          "ja": "本当にありがとうございます！復習にとても役立ちます。"
        },
        "romaji": "Hontō ni arigatō gozaimasu! Fukushū ni totemo yakudachimasu."
      }
    ],
    "escola-3": [
      {
        "id": "escola-3-example-1",
        "text": {
          "pt": "Você conseguiu organizar o material que me prometeu?",
          "en": "Did you manage to organize the material you promised me?",
          "ja": "約束してくれた資料、整理できましたか？"
        },
        "romaji": "Yakusoku shite kureta shiryō, seiri dekimashita ka?"
      },
      {
        "id": "escola-3-example-2",
        "text": {
          "pt": "Sim, está tudo pronto. Não se preocupe.",
          "en": "Yes, it's all ready. Don't worry.",
          "ja": "はい、全て準備できました。心配しないでください。"
        },
        "romaji": "Hai, subete junbi dekimashita. Shinpai shinaide kudasai."
      },
      {
        "id": "escola-3-example-3",
        "text": {
          "pt": "Maravilha! Assim consigo estudar para a prova antes da aula.",
          "en": "Wonderful! That way I can study for the test before class.",
          "ja": "素晴らしい！そうすれば授業の前にテスト勉強ができます。"
        },
        "romaji": "Subarashii! Sō sureba jugyō no mae ni tesuto benkyō ga dekimasu."
      }
    ],
    "escola-4": [
      {
        "id": "escola-4-example-1",
        "text": {
          "pt": "O problema de matemática parece ser bem complexo, não é?",
          "en": "The math problem seems quite complex, doesn't it?",
          "ja": "この数学の問題、かなり複雑そうですね？"
        },
        "romaji": "Kono sūgaku no mondai, kanari fukuzatsusō desu ne?"
      },
      {
        "id": "escola-4-example-2",
        "text": {
          "pt": "Sim, eu não consegui resolver a última parte.",
          "en": "Yes, I couldn't solve the last part.",
          "ja": "ええ、最後の部分がどうしても解けませんでした。"
        },
        "romaji": "Ē, saigo no bubun ga dōshitemo tokemasen deshita."
      },
      {
        "id": "escola-4-example-3",
        "text": {
          "pt": "Podíamos pedir uma explicação adicional depois.",
          "en": "We could ask for an additional explanation later.",
          "ja": "後で追加の説明を頼んでみましょうか。"
        },
        "romaji": "Ato de tsuika no setsumei o tanonde mimashō ka?"
      }
    ],
    "escola-5": [
      {
        "id": "escola-5-example-1",
        "text": {
          "pt": "Fiquei com uma dúvida sobre a nova matéria de física.",
          "en": "I had a question about the new physics material.",
          "ja": "新しい物理の教材について疑問があります。"
        },
        "romaji": "Atarashii butsurigaku no kyōzai ni tsuite gimon ga arimasu."
      },
      {
        "id": "escola-5-example-2",
        "text": {
          "pt": "Ela sempre está disposta a esclarecer pontos.",
          "en": "She's always willing to clarify points.",
          "ja": "彼女はいつも不明な点を明確にしてくれますよ。"
        },
        "romaji": "Kanojo wa itsumo fumeina ten o meikaku ni shite kuremasu yo."
      },
      {
        "id": "escola-5-example-3",
        "text": {
          "pt": "Ótimo, farei isso então. Obrigado pela dica.",
          "en": "Great, I'll do that then. Thanks for the tip.",
          "ja": "よし、そうしますね。アドバイスありがとうございます。"
        },
        "romaji": "Yoshi, sō shimasu ne. Adobaisu arigatō gozaimasu."
      }
    ],
    "escola-6": [
      {
        "id": "escola-6-example-1",
        "text": {
          "pt": "A data limite para entregar o projeto é esta semana?",
          "en": "Is the deadline for handing in the project this week?",
          "ja": "プロジェクトの提出期限は今週ですか？"
        },
        "romaji": "Purojekuto no teishutsu kigen wa konshū desu ka?"
      },
      {
        "id": "escola-6-example-2",
        "text": {
          "pt": "Isso mesmo, então temos que correr com a pesquisa.",
          "en": "That's right, so we have to hurry with the research.",
          "ja": "その通りです、だから研究を急がなければなりません。"
        },
        "romaji": "Sono tōri desu, dakara kenkyū o isoganakereba narimasen."
      },
      {
        "id": "escola-6-example-3",
        "text": {
          "pt": "Certo, vou focar em finalizar a minha parte hoje.",
          "en": "Okay, I'll focus on finishing my part today.",
          "ja": "分かりました、今日は自分の部分を終わらせることに集中します。"
        },
        "romaji": "Wakarimashita, kyō wa jibun no bubun o owaraseru koto ni shūchū shimasu."
      }
    ],
    "escola-7": [
      {
        "id": "escola-7-example-1",
        "text": {
          "pt": "Você já pensou sobre o que vai escrever no seu ensaio?",
          "en": "Have you thought about what you're going to write about in your essay?",
          "ja": "エッセイで何について書くか、もう考えましたか？"
        },
        "romaji": "Essei de nani ni tsuite kaku ka, mō kangaemashita ka?"
      },
      {
        "id": "escola-7-example-2",
        "text": {
          "pt": "Nada em mente ainda. Está sendo mais difícil do que pensei.",
          "en": "Nothing in mind yet. It's proving harder than I thought.",
          "ja": "まだ何も決まっていません。思ったより難しいです。"
        },
        "romaji": "Mada nani mo kimatte imasen. Omotta yori muzukashii desu."
      },
      {
        "id": "escola-7-example-3",
        "text": {
          "pt": "Talvez possamos trocar ideias no almoço de hoje.",
          "en": "Maybe we can bounce ideas off each other at lunch today.",
          "ja": "今日のランチで一緒にアイデアを出し合いませんか？"
        },
        "romaji": "Kyō no ranchi de issho ni aidea o dashi aimasen ka?"
      }
    ],
    "escola-8": [
      {
        "id": "escola-8-example-1",
        "text": {
          "pt": "Tenho que revisar para a prova de química de amanhã.",
          "en": "I have to review for tomorrow's chemistry test.",
          "ja": "明日の化学のテストのために復習しなくちゃ。"
        },
        "romaji": "Ashita no kagaku no tesuto no tame ni fukushū shinakucha."
      },
      {
        "id": "escola-8-example-2",
        "text": {
          "pt": "É uma boa ideia. O ambiente é mais tranquilo lá.",
          "en": "That's a good idea. The environment there is quieter.",
          "ja": "いい考えですね。あそこは環境がもっと静かです。"
        },
        "romaji": "Ī kangae desu ne. Asoko wa kankyō ga motto shizuka desu."
      },
      {
        "id": "escola-8-example-3",
        "text": {
          "pt": "Perfeito! Posso encontrar você depois da aula de história?",
          "en": "Perfect! Can I meet you after history class?",
          "ja": "完璧！歴史の授業の後で会えますか？"
        },
        "romaji": "Kanpeki! Rekishi no jugyō no ato de aemasu ka?"
      }
    ],
    "escola-9": [
      {
        "id": "escola-9-example-1",
        "text": {
          "pt": "Então nos encontramos na entrada principal?",
          "en": "So, we'll meet at the main entrance?",
          "ja": "じゃあ、正門で待ち合わせですね？"
        },
        "romaji": "Jā, seimon de machiawase desu ne?"
      },
      {
        "id": "escola-9-example-2",
        "text": {
          "pt": "Sim, estarei lá assim que o sinal tocar.",
          "en": "Yes, I'll be there as soon as the bell rings.",
          "ja": "はい、チャイムが鳴ったらすぐにそこに行きます。"
        },
        "romaji": "Hai, chaimu ga nattara sugu ni soko ni ikimasu."
      },
      {
        "id": "escola-9-example-3",
        "text": {
          "pt": "Certo, levarei meus livros e um lanche.",
          "en": "Okay, I'll bring my books and a snack.",
          "ja": "分かりました、本と軽食を持っていきます。"
        },
        "romaji": "Wakarimashita, hon to keishoku o motte ikimasu."
      }
    ]
  },
  "trabalho": {
    "trabalho-0": [
      {
        "id": "trabalho-0-example-1",
        "text": {
          "pt": "Você pode olhar os dados financeiros para mim?",
          "en": "Could you look over the financial data for me?",
          "ja": "財務データを確認していただけますか？"
        },
        "romaji": "Zaimu dēta o kakunin shite itadakemasu ka?"
      },
      {
        "id": "trabalho-0-example-2",
        "text": {
          "pt": "Sim, tenho um tempo livre agora.",
          "en": "Yes, I have some free time right now.",
          "ja": "はい、今なら少し時間があります。"
        },
        "romaji": "Hai, ima nara sukoshi jikan ga arimasu."
      },
      {
        "id": "trabalho-0-example-3",
        "text": {
          "pt": "Ótimo, o prazo final é no fim da tarde.",
          "en": "Great, the final deadline is late this afternoon.",
          "ja": "素晴らしい。最終締め切りは今日の午後遅くです。"
        },
        "romaji": "Subarashī. Saishū shimekiri wa kyō no gogo osoku desu."
      }
    ],
    "trabalho-1": [
      {
        "id": "trabalho-1-example-1",
        "text": {
          "pt": "Vou finalizar o documento agora mesmo.",
          "en": "I will finalize the document right now.",
          "ja": "今すぐ書類を仕上げます。"
        },
        "romaji": "Ima sugu shorui o shiagemasu."
      },
      {
        "id": "trabalho-1-example-2",
        "text": {
          "pt": "Perfeito. Já espero o rascunho em meu e-mail.",
          "en": "Perfect. I'll await the draft in my email.",
          "ja": "完璧です。ドラフトをメールで待っています。"
        },
        "romaji": "Kanpeki desu. Dorafuto o mēru de matte imasu."
      },
      {
        "id": "trabalho-1-example-3",
        "text": {
          "pt": "Mando antes do almoço para você revisar.",
          "en": "I'll send it before lunch for you to review.",
          "ja": "お昼までに送りますので、確認してください。"
        },
        "romaji": "Ohiru made ni okurimasu node, kakunin shite kudasai."
      }
    ],
    "trabalho-2": [
      {
        "id": "trabalho-2-example-1",
        "text": {
          "pt": "Acabei de receber o aviso por e-mail.",
          "en": "I just received the notification by email.",
          "ja": "たった今、メールで通知を受け取りました。"
        },
        "romaji": "Tatta ima, mēru de tsūchi o uketorimashita."
      },
      {
        "id": "trabalho-2-example-2",
        "text": {
          "pt": "Ufa, que alívio! Estava preocupado com o cronograma.",
          "en": "Phew, what a relief! I was worried about the schedule.",
          "ja": "やれやれ、助かった！スケジュールが心配でした。"
        },
        "romaji": "Yareyare, tasukatta! Sukejūru ga shinpai deshita."
      },
      {
        "id": "trabalho-2-example-3",
        "text": {
          "pt": "Agora temos mais uma semana para concluir.",
          "en": "Now we have one more week to complete it.",
          "ja": "これで完成まであと一週間ありますね。"
        },
        "romaji": "Kore de kansei made ato isshūkan arimasu ne."
      }
    ],
    "trabalho-3": [
      {
        "id": "trabalho-3-example-1",
        "text": {
          "pt": "Com a nova data, conseguimos respirar.",
          "en": "With the new date, we can breathe a little.",
          "ja": "新しい日程で、少し息がつけます。"
        },
        "romaji": "Atarashī nittei de, sukoshi iki ga tsukemasu."
      },
      {
        "id": "trabalho-3-example-2",
        "text": {
          "pt": "Exato, não precisaremos mais de horas extras.",
          "en": "Exactly, we won't need overtime anymore.",
          "ja": "その通り、もう残業する必要はありません。"
        },
        "romaji": "Sono tōri, mō zangyō suru hitsuyō wa arimasen."
      },
      {
        "id": "trabalho-3-example-3",
        "text": {
          "pt": "E poderemos revisar tudo com mais calma.",
          "en": "And we'll be able to review everything more calmly.",
          "ja": "それに、すべてをもっと落ち着いて見直せますね。"
        },
        "romaji": "Sore ni, subete o motto ochitsuite minaosimasu ne."
      }
    ],
    "trabalho-4": [
      {
        "id": "trabalho-4-example-1",
        "text": {
          "pt": "Meu computador está com problemas de conexão.",
          "en": "My computer is having connection issues.",
          "ja": "私のパソコンは接続に問題があります。"
        },
        "romaji": "Watashi no pasokon wa setsuzoku ni mondai ga arimasu."
      },
      {
        "id": "trabalho-4-example-2",
        "text": {
          "pt": "Sem problemas, o link já está no chat.",
          "en": "No problem, the link is already in the chat.",
          "ja": "問題ありません。リンクはもうチャットにあります。"
        },
        "romaji": "Mondai arimasen. Rinku wa mō chatto ni arimasu."
      },
      {
        "id": "trabalho-4-example-3",
        "text": {
          "pt": "Apenas um momento enquanto me conecto pelo aplicativo.",
          "en": "Just a moment while I connect through the app.",
          "ja": "アプリから接続しますので、少々お待ちください。"
        },
        "romaji": "Apuri kara setsuzoku shimasu node, shōshō omachi kudasai."
      }
    ],
    "trabalho-5": [
      {
        "id": "trabalho-5-example-1",
        "text": {
          "pt": "Temos muitos participantes nesta chamada.",
          "en": "We have many participants on this call.",
          "ja": "この会議には多くの参加者がいます。"
        },
        "romaji": "Kono kaigi ni wa ōku no sankasha ga imasu."
      },
      {
        "id": "trabalho-5-example-2",
        "text": {
          "pt": "Sim, para evitar eco, por favor, siga a regra.",
          "en": "Yes, to avoid echo, please follow the rule.",
          "ja": "はい、エコーを避けるため、ルールに従ってください。"
        },
        "romaji": "Hai, ekō o sakeru tame, rūru ni shitagatte kudasai."
      },
      {
        "id": "trabalho-5-example-3",
        "text": {
          "pt": "Compreendido. Ficarei em silêncio até a minha vez.",
          "en": "Understood. I will remain silent until it's my turn.",
          "ja": "承知しました。自分の番まではミュートにします。"
        },
        "romaji": "Shōchi shimashita. Jibun no ban made wa myūto ni shimasu."
      }
    ],
    "trabalho-6": [
      {
        "id": "trabalho-6-example-1",
        "text": {
          "pt": "Gostaria de solicitar um dia de folga no próximo mês.",
          "en": "I'd like to request a day off next month.",
          "ja": "来月、一日休みを申請したいです。"
        },
        "romaji": "Raigetsu, ichinichi yasumi o shinsei shitai desu."
      },
      {
        "id": "trabalho-6-example-2",
        "text": {
          "pt": "Qual seria a data específica, por favor?",
          "en": "What would be the specific date, please?",
          "ja": "具体的な日付はいつですか？"
        },
        "romaji": "Gutaiteki na hizuke wa itsu desu ka?"
      },
      {
        "id": "trabalho-6-example-3",
        "text": {
          "pt": "Pensei na segunda-feira, dia 15.",
          "en": "I was thinking Monday, the 15th.",
          "ja": "15日の月曜日を考えていました。"
        },
        "romaji": "Jūgonichi no getsuyōbi o kangaete imashita."
      }
    ],
    "trabalho-7": [
      {
        "id": "trabalho-7-example-1",
        "text": {
          "pt": "Você já preencheu seu pedido de férias?",
          "en": "Have you already filled out your vacation request?",
          "ja": "休暇申請書はもう記入しましたか？"
        },
        "romaji": "Kyūka shinseisho wa mō kinyū shimashita ka?"
      },
      {
        "id": "trabalho-7-example-2",
        "text": {
          "pt": "Ainda não, esqueci de fazer isso.",
          "en": "Not yet, I forgot to do that.",
          "ja": "まだです、うっかりしていました。"
        },
        "romaji": "Mada desu, ukkari shite imashita."
      },
      {
        "id": "trabalho-7-example-3",
        "text": {
          "pt": "É importante que esteja lá o quanto antes.",
          "en": "It's important that it's there as soon as possible.",
          "ja": "できるだけ早く提出することが重要です。"
        },
        "romaji": "Dekiru dake hayaku teishutsu suru koto ga jūyō desu."
      }
    ],
    "trabalho-8": [
      {
        "id": "trabalho-8-example-1",
        "text": {
          "pt": "Terminamos o projeto a tempo!",
          "en": "We finished the project on time!",
          "ja": "プロジェクト、時間通りに終わりましたね！"
        },
        "romaji": "Purojekuto, jikan dōri ni owarimashita ne!"
      },
      {
        "id": "trabalho-8-example-2",
        "text": {
          "pt": "Parabéns a todos por este grande trabalho.",
          "en": "Congratulations everyone on this great work.",
          "ja": "皆さん、素晴らしい仕事に拍手です。"
        },
        "romaji": "Minasan, subarashī shigoto ni hakushu desu."
      },
      {
        "id": "trabalho-8-example-3",
        "text": {
          "pt": "Podemos ir para casa com a sensação de dever cumprido.",
          "en": "We can go home with a sense of accomplishment.",
          "ja": "これで達成感を持って帰れますね。"
        },
        "romaji": "Kore de tasseikan o motte kaeremasu ne."
      }
    ],
    "trabalho-9": [
      {
        "id": "trabalho-9-example-1",
        "text": {
          "pt": "Conseguimos avançar bastante hoje, não é?",
          "en": "We made a lot of progress today, didn't we?",
          "ja": "今日はかなり進みましたね？"
        },
        "romaji": "Kyō wa kanari susumimashita ne?"
      },
      {
        "id": "trabalho-9-example-2",
        "text": {
          "pt": "Sim, foi um dia muito produtivo para a equipe.",
          "en": "Yes, it was a very productive day for the team.",
          "ja": "はい、チームにとって非常に生産的な一日でした。"
        },
        "romaji": "Hai, chīmu ni totte hijō ni seisan-teki na ichinichi deshita."
      },
      {
        "id": "trabalho-9-example-3",
        "text": {
          "pt": "Então nos vemos amanhã para finalizar o resto.",
          "en": "So we'll see each other tomorrow to finish the rest.",
          "ja": "では、残りを仕上げるために明日また会いましょう。"
        },
        "romaji": "Dewa, nokori o shiageru tame ni ashita mata aimashō."
      }
    ]
  },
  "familia": {
    "familia-0": [
      {
        "id": "familia-0-example-1",
        "text": {
          "pt": "Uau, que notícia maravilhosa!",
          "en": "Wow, what wonderful news!",
          "ja": "わあ、なんて素晴らしいニュースでしょう！"
        },
        "romaji": "Waa, nante subarashii nyūsu deshō!"
      },
      {
        "id": "familia-0-example-2",
        "text": {
          "pt": "Sim, ele está muito feliz com a aprovação.",
          "en": "Yes, he's very happy about getting in.",
          "ja": "はい、彼は合格してとても喜んでいますよ。"
        },
        "romaji": "Hai, kare wa gōkaku shite totemo yorokonde imasu yo."
      },
      {
        "id": "familia-0-example-3",
        "text": {
          "pt": "Ele vai fazer engenharia, certo?",
          "en": "He's going to study engineering, right?",
          "ja": "彼は工学を専攻するんですよね？"
        },
        "romaji": "Kare wa kōgaku o senkō suru n desu yo ne?"
      }
    ],
    "familia-1": [
      {
        "id": "familia-1-example-1",
        "text": {
          "pt": "Ele passava noites estudando para o vestibular.",
          "en": "He spent nights studying for the entrance exam.",
          "ja": "彼は受験のために夜遅くまで勉強していました。"
        },
        "romaji": "Kare wa juken no tame ni yoru osoku made benkyō shite imashita."
      },
      {
        "id": "familia-1-example-2",
        "text": {
          "pt": "É um grande esforço que valeu a pena.",
          "en": "It's a great effort that paid off.",
          "ja": "努力が報われたんですね。"
        },
        "romaji": "Doryoku ga mukuwareta n desu ne."
      },
      {
        "id": "familia-1-example-3",
        "text": {
          "pt": "Mal posso esperar para ver o que ele vai conquistar.",
          "en": "I can't wait to see what he will achieve.",
          "ja": "彼が何を達成するか、見るのが待ちきれません。"
        },
        "romaji": "Kare ga nani o tassei suru ka, miru no ga machikiremasen."
      }
    ],
    "familia-2": [
      {
        "id": "familia-2-example-1",
        "text": {
          "pt": "Que bom, estava com saudades dela!",
          "en": "Great, I was missing her!",
          "ja": "やった、おばあちゃんに会いたかった！"
        },
        "romaji": "Yatta, obāchan ni aitakatta!"
      },
      {
        "id": "familia-2-example-2",
        "text": {
          "pt": "Ela disse que vai fazer aquele bolo de fubá que você adora.",
          "en": "She said she's going to make that cornmeal cake you love.",
          "ja": "おばあちゃんが、あなたが大好きなあのとうもろこし粉のケーキを作るって。"
        },
        "romaji": "Obāchan ga, anata ga daisuki na ano tōmorokoshiko no kēki o tsukuru tte."
      },
      {
        "id": "familia-2-example-3",
        "text": {
          "pt": "Perfeito! Mal posso esperar.",
          "en": "Perfect! I can hardly wait.",
          "ja": "最高！待ちきれないよ。"
        },
        "romaji": "Saikō! Machikirenai yo."
      }
    ],
    "familia-3": [
      {
        "id": "familia-3-example-1",
        "text": {
          "pt": "Certo, o que você vai levar?",
          "en": "Okay, what are you going to bring?",
          "ja": "わかりました、何を持ってきてくれますか？"
        },
        "romaji": "Wakarimashita, nani o motte kite kuremasu ka?"
      },
      {
        "id": "familia-3-example-2",
        "text": {
          "pt": "Pensei em fazer um pudim de leite condensado.",
          "en": "I was thinking of making a condensed milk pudding.",
          "ja": "コンデンスミルクのプリンを作ろうかと思っています。"
        },
        "romaji": "Kondensu miruku no purin o tsukurō ka to omotte imasu."
      },
      {
        "id": "familia-3-example-3",
        "text": {
          "pt": "Que delícia! Tenho certeza que todos vão adorar.",
          "en": "How delicious! I'm sure everyone will love it.",
          "ja": "なんておいしそう！きっとみんな喜ぶでしょうね。"
        },
        "romaji": "Nante oishisō! Kitto minna yorokobu deshō ne."
      }
    ],
    "familia-4": [
      {
        "id": "familia-4-example-1",
        "text": {
          "pt": "Isso deve ser difícil, sentir saudades de casa.",
          "en": "That must be hard, feeling homesick.",
          "ja": "それは大変でしょう、ホームシックになりませんか。"
        },
        "romaji": "Sore wa taihen deshō, hōmushikku ni narimasen ka."
      },
      {
        "id": "familia-4-example-2",
        "text": {
          "pt": "Às vezes sim, mas a gente se fala por vídeo.",
          "en": "Sometimes, but we talk via video calls.",
          "ja": "時々ね、でもビデオ通話で話しているよ。"
        },
        "romaji": "Tokidoki ne, demo bideo tsūwa de hanashite iru yo."
      },
      {
        "id": "familia-4-example-3",
        "text": {
          "pt": "É bom ter essa tecnologia para manter contato.",
          "en": "It's good to have that technology to keep in touch.",
          "ja": "連絡を取り合うために、そういう技術があるのはいいことですね。"
        },
        "romaji": "Renraku o toriau tame ni, sōiu gijutsu ga aru no wa ī koto desu ne."
      }
    ],
    "familia-5": [
      {
        "id": "familia-5-example-1",
        "text": {
          "pt": "Sempre que consigo uma folga, eu viajo para lá.",
          "en": "Whenever I get a day off, I travel there.",
          "ja": "休みが取れる時はいつも、そこへ旅行します。"
        },
        "romaji": "Yasumi ga toreru toki wa itsumo, soko e ryokō shimasu."
      },
      {
        "id": "familia-5-example-2",
        "text": {
          "pt": "Eles devem ficar muito felizes quando você aparece.",
          "en": "They must be very happy when you show up.",
          "ja": "あなたが顔を見せると、彼らはとても喜ぶでしょうね。"
        },
        "romaji": "Anata ga kao o miseru to, karera wa totemo yorokobu deshō ne."
      },
      {
        "id": "familia-5-example-3",
        "text": {
          "pt": "Sim, e eu também adoro passar um tempo com eles.",
          "en": "Yes, and I also love spending time with them.",
          "ja": "ええ、私も彼らと過ごすのが大好きなんです。"
        },
        "romaji": "Ē, watashi mo karera to sugosu no ga daisuki nan desu."
      }
    ],
    "familia-6": [
      {
        "id": "familia-6-example-1",
        "text": {
          "pt": "Que marco importante na vida dela!",
          "en": "What an important milestone in her life!",
          "ja": "彼女の人生における重要な節目ですね！"
        },
        "romaji": "Kanojo no jinsei ni okeru jūyō na fushime desu ne!"
      },
      {
        "id": "familia-6-example-2",
        "text": {
          "pt": "Ela estava tão orgulhosa de si mesma.",
          "en": "She was so proud of herself.",
          "ja": "彼女は自分自身をとても誇りに思っていました。"
        },
        "romaji": "Kanojo wa jibun jishin o totemo hokori ni omotte imashita."
      },
      {
        "id": "familia-6-example-3",
        "text": {
          "pt": "Agora a fada do dente vai visitá-la!",
          "en": "Now the tooth fairy will visit her!",
          "ja": "これで歯の妖精が彼女のところへやって来ますね！"
        },
        "romaji": "Kore de ha no yōsei ga kanojo no tokoro e yatte kimasu ne!"
      }
    ],
    "familia-7": [
      {
        "id": "familia-7-example-1",
        "text": {
          "pt": "Ela não parava de sorrir o dia todo.",
          "en": "She couldn't stop smiling all day.",
          "ja": "彼女は一日中、笑顔が止まりませんでした。"
        },
        "romaji": "Kanojo wa ichinichijū, egao ga tomarimasen deshta."
      },
      {
        "id": "familia-7-example-2",
        "text": {
          "pt": "É uma fase tão fofa da infância.",
          "en": "It's such a cute stage of childhood.",
          "ja": "子供時代のかわいい時期ですね。"
        },
        "romaji": "Kodomo jidai no kawaii jiki desu ne."
      },
      {
        "id": "familia-7-example-3",
        "text": {
          "pt": "Sim, e ela já está esperando o próximo dente cair.",
          "en": "Yes, and she's already waiting for the next tooth to fall out.",
          "ja": "ええ、もう次の歯が抜けるのを待っていますよ。"
        },
        "romaji": "Ē, mō tsugi no ha ga nukeru no o matte imasu yo."
      }
    ],
    "familia-8": [
      {
        "id": "familia-8-example-1",
        "text": {
          "pt": "Faz tempo que não temos uma boa foto de família.",
          "en": "It's been a while since we had a good family photo.",
          "ja": "家族の良い写真を撮るのは久しぶりですね。"
        },
        "romaji": "Kazoku no yoi shashin o toru no wa hisashiburi desu ne."
      },
      {
        "id": "familia-8-example-2",
        "text": {
          "pt": "Quem sabe a gente faz uma pose engraçada?",
          "en": "Maybe we can strike a funny pose?",
          "ja": "変なポーズを取ってみるのはどうでしょう？"
        },
        "romaji": "Hen na pōzu o totte miru no wa dō deshō?"
      },
      {
        "id": "familia-8-example-3",
        "text": {
          "pt": "Ótima ideia! Vai ficar divertido.",
          "en": "Great idea! It will be fun.",
          "ja": "いい考え！面白くなりそう。"
        },
        "romaji": "Ī kangae! Omoshironarisō."
      }
    ],
    "familia-9": [
      {
        "id": "familia-9-example-1",
        "text": {
          "pt": "Perfeito, então todos se posicionem!",
          "en": "Perfect, everyone get into position then!",
          "ja": "よし、じゃあみんな位置について！"
        },
        "romaji": "Yoshi, jā minna ichi ni tsuite!"
      },
      {
        "id": "familia-9-example-2",
        "text": {
          "pt": "Sorriam bem grande para a câmera!",
          "en": "Smile widely for the camera!",
          "ja": "カメラに向かって大きく笑って！"
        },
        "romaji": "Kamera ni mukatte Ōkiku waratte!"
      },
      {
        "id": "familia-9-example-3",
        "text": {
          "pt": "Um, dois, três... clique!",
          "en": "One, two, three... click!",
          "ja": "いち、に、さん…カシャ！"
        },
        "romaji": "Ichi, ni, san… kasha!"
      }
    ]
  },
  "amigos": {
    "amigos-0": [
      {
        "id": "amigos-0-example-1",
        "text": {
          "pt": "Que horas a gente se encontra lá?",
          "en": "What time should we meet there?",
          "ja": "何時にそこで会う？"
        },
        "romaji": "Nanji ni soko de au?"
      },
      {
        "id": "amigos-0-example-2",
        "text": {
          "pt": "Sugiro às dez da manhã, antes que fique muito quente.",
          "en": "I suggest 10 AM, before it gets too hot.",
          "ja": "午前10時がいいね、暑くなる前に。"
        },
        "romaji": "Gozen jūji ga ii ne, atsuku naru mae ni."
      },
      {
        "id": "amigos-0-example-3",
        "text": {
          "pt": "Perfeito! Vou avisar o pessoal para levar água.",
          "en": "Perfect! I'll tell everyone to bring water.",
          "ja": "完璧！みんなに水を持ってくるように伝えるよ。"
        },
        "romaji": "Kanpeki! Minna ni mizu o motte kuru yō ni tsutaeru yo."
      }
    ],
    "amigos-1": [
      {
        "id": "amigos-1-example-1",
        "text": {
          "pt": "Manda uma mensagem pra ver quem pode ir.",
          "en": "Send a message to see who can make it.",
          "ja": "誰が行けるかメッセージ送ってみて。"
        },
        "romaji": "Dare ga ikeru ka messēji okutte mite."
      },
      {
        "id": "amigos-1-example-2",
        "text": {
          "pt": "Já mandei! Parece que a maioria topou.",
          "en": "Already sent! Looks like most are in.",
          "ja": "もう送ったよ！ほとんどの人が賛成みたい。"
        },
        "romaji": "Mō okutta yo! Hotondo no hito ga sansei mitai."
      },
      {
        "id": "amigos-1-example-3",
        "text": {
          "pt": "Ótimo! Quanto mais gente, mais divertida a partida.",
          "en": "Great! The more people, the more fun the game.",
          "ja": "いいね！人数が多いほど試合も楽しい。"
        },
        "romaji": "Ii ne! Ninzū ga ooi hodo shiai mo tanoshī."
      }
    ],
    "amigos-2": [
      {
        "id": "amigos-2-example-1",
        "text": {
          "pt": "Era aquele do gatinho escalando a árvore?",
          "en": "Was it the one with the kitten climbing the tree?",
          "ja": "木登りしてる子猫のやつ？"
        },
        "romaji": "Kinobori shiteru koneko no yatsu?"
      },
      {
        "id": "amigos-2-example-2",
        "text": {
          "pt": "Não, o outro, daquele cachorrinho surfista.",
          "en": "No, the other one, about that surfing puppy.",
          "ja": "違うよ、サーフィンする子犬のやつ。"
        },
        "romaji": "Chigau yo, sāfin suru koinu no yatsu."
      },
      {
        "id": "amigos-2-example-3",
        "text": {
          "pt": "Ah, sim! Que fofo! Compartilhei com a minha mãe.",
          "en": "Oh, right! How cute! I shared it with my mom.",
          "ja": "ああ、あれね！可愛い！お母さんにもシェアしたよ。"
        },
        "romaji": "Ā, are ne! Kawaii! Okāsan ni mo shea shita yo."
      }
    ],
    "amigos-3": [
      {
        "id": "amigos-3-example-1",
        "text": {
          "pt": "Ele também achou super engraçado, aposto.",
          "en": "He also found it super funny, I bet.",
          "ja": "彼もすごく面白いと思ったに違いないね。"
        },
        "romaji": "Kare mo sugoku omoshiroi to omotta ni chigainai ne."
      },
      {
        "id": "amigos-3-example-2",
        "text": {
          "pt": "Sim, ele disse que era o melhor vídeo do ano.",
          "en": "Yes, he said it was the best video of the year.",
          "ja": "うん、今年一番の動画だって言ってたよ。"
        },
        "romaji": "Un, kotoshi ichiban no dōga datte itteta yo."
      },
      {
        "id": "amigos-3-example-3",
        "text": {
          "pt": "Que bom que gostaram! Tenho mais alguns na fila.",
          "en": "Glad you liked it! I have a few more lined up.",
          "ja": "気に入ってくれてよかった！他にもいくつかあるよ。"
        },
        "romaji": "Ki ni itte kurete yokatta! Hoka ni mo ikutsuka aru yo."
      }
    ],
    "amigos-4": [
      {
        "id": "amigos-4-example-1",
        "text": {
          "pt": "Chegou há pouco ou está desde cedo parado?",
          "en": "Did it just start or has it been stuck for a while?",
          "ja": "さっき始まったばかりなの、それともずっと止まってるの？"
        },
        "romaji": "Sakki hajimatta bakari nano, sore tomo zutto tomatteru no?"
      },
      {
        "id": "amigos-4-example-2",
        "text": {
          "pt": "Fiquei uns vinte minutos parado na avenida principal.",
          "en": "I was stuck for about twenty minutes on the main avenue.",
          "ja": "大通りで20分くらい動かなかったんだ。"
        },
        "romaji": "Ōdōri de nijū-pun kurai ugokanakatta n'da."
      },
      {
        "id": "amigos-4-example-3",
        "text": {
          "pt": "Ainda bem que você chegou seguro, isso que importa.",
          "en": "Good thing you arrived safely, that's what matters.",
          "ja": "無事に着いてよかった、それが一番大事だよ。"
        },
        "romaji": "Buji ni tsuite yokatta, sore ga ichiban daiji da yo."
      }
    ],
    "amigos-5": [
      {
        "id": "amigos-5-example-1",
        "text": {
          "pt": "Sem problema nenhum, estamos esperando um amigo ainda.",
          "en": "No problem at all, we're still waiting for a friend.",
          "ja": "全然大丈夫、まだ友達を待ってるんだ。"
        },
        "romaji": "Zenzen daijōbu, mada tomodachi o matteru n'da."
      },
      {
        "id": "amigos-5-example-2",
        "text": {
          "pt": "Ufa, que alívio! Achei que tinha perdido tudo.",
          "en": "Phew, what a relief! I thought I'd missed everything.",
          "ja": "ふぅ、安心した！全部見逃したかと思ったよ。"
        },
        "romaji": "Fū, anshin shita! Zenbu minogashita ka to omotta yo."
      },
      {
        "id": "amigos-5-example-3",
        "text": {
          "pt": "De jeito nenhum! Acabei de pedir as bebidas.",
          "en": "No way! I just ordered the drinks.",
          "ja": "とんでもない！今飲み物を注文したばかりだよ。"
        },
        "romaji": "Tondemonai! Ima nomimono o chūmon shita bakari da yo."
      }
    ],
    "amigos-6": [
      {
        "id": "amigos-6-example-1",
        "text": {
          "pt": "Ou cada um paga o que consumiu, como preferir.",
          "en": "Or each person pays for what they consumed, whatever you prefer.",
          "ja": "それとも各自で食べた分を払う、どっちでもいいよ。"
        },
        "romaji": "Sore tomo kakuji de tabeta bun o harau, docchi demo ii yo."
      },
      {
        "id": "amigos-6-example-2",
        "text": {
          "pt": "Acho melhor fazer isso, pedi mais coisas que você.",
          "en": "I think that's better, I ordered more things than you.",
          "ja": "それがいいな、君より多く頼んだから。"
        },
        "romaji": "Sore ga ii na, kimi yori ooku tanonda kara."
      },
      {
        "id": "amigos-6-example-3",
        "text": {
          "pt": "Ok, então vamos somar o valor de cada um separadamente.",
          "en": "Okay, then let's add up each person's amount separately.",
          "ja": "わかった、じゃあ各自の金額を別に計算しよう。"
        },
        "romaji": "Wakatta, jaa kakuji no kingaku o betsu ni keisan shiyō."
      }
    ],
    "amigos-7": [
      {
        "id": "amigos-7-example-1",
        "text": {
          "pt": "Tem certeza? Não precisa se incomodar.",
          "en": "Are you sure? You don't have to bother.",
          "ja": "本当に？気を使わなくてもいいのに。"
        },
        "romaji": "Hontō ni? Ki o tsukawanakute mo ii no ni."
      },
      {
        "id": "amigos-7-example-2",
        "text": {
          "pt": "Claro que sim! Considera um agrado meu para você.",
          "en": "Of course! Consider it a treat from me to you.",
          "ja": "もちろん！僕からのご褒美だと思って。"
        },
        "romaji": "Mochiron! Boku kara no gohōbi da to omotte."
      },
      {
        "id": "amigos-7-example-3",
        "text": {
          "pt": "Ah, então muito obrigado! Aceito de coração.",
          "en": "Oh, well thank you very much! I accept wholeheartedly.",
          "ja": "あぁ、じゃあ本当にありがとう！喜んでいただくよ。"
        },
        "romaji": "Ā, jaa hontō ni arigatō! Yorokonde itadaku yo."
      }
    ],
    "amigos-8": [
      {
        "id": "amigos-8-example-1",
        "text": {
          "pt": "Perto da janela, como você gosta.",
          "en": "Near the window, just how you like it.",
          "ja": "窓際だよ、君の好きなように。"
        },
        "romaji": "Madogiwa da yo, kimi no suki na yō ni."
      },
      {
        "id": "amigos-8-example-2",
        "text": {
          "pt": "Que bom! Estava preocupado que estivesse cheio.",
          "en": "That's great! I was worried it would be crowded.",
          "ja": "よかった！混んでるんじゃないかと心配してたんだ。"
        },
        "romaji": "Yokatta! Konderu n'janai ka to shinpai shiteta n'da."
      },
      {
        "id": "amigos-8-example-3",
        "text": {
          "pt": "Pode vir tranquilo, está perfeito para nós.",
          "en": "You can come, it's perfect for us.",
          "ja": "安心して来て、僕たちには完璧な場所だよ。"
        },
        "romaji": "Anshin shite kite, bokutachi ni wa kanpeki na basho da yo."
      }
    ],
    "amigos-9": [
      {
        "id": "amigos-9-example-1",
        "text": {
          "pt": "Sério, não sei o que faria sem a sua ajuda.",
          "en": "Seriously, I don't know what I'd do without your help.",
          "ja": "本当に、君の助けがなかったらどうなっていたことか。"
        },
        "romaji": "Hontō ni, kimi no tasuke ga nakattara dō natte ita koto ka."
      },
      {
        "id": "amigos-9-example-2",
        "text": {
          "pt": "Disponha! Para isso que servem os amigos.",
          "en": "Anytime! That's what friends are for.",
          "ja": "どういたしまして！友達ってそういうものだからね。"
        },
        "romaji": "Dō itashimashite! Tomodachi tte sō iu mono dakara ne."
      },
      {
        "id": "amigos-9-example-3",
        "text": {
          "pt": "Com certeza! Mal posso esperar para retribuir.",
          "en": "Absolutely! I can't wait to return the favor.",
          "ja": "本当に！早くお返ししたいな。"
        },
        "romaji": "Hontō ni! Hayaku okaeshi shitai na."
      }
    ]
  },
  "hospital": {
    "hospital-0": [
      {
        "id": "hospital-0-example-1",
        "text": {
          "pt": "Qual médico você prefere ver?",
          "en": "Which doctor would you prefer to see?",
          "ja": "どの先生をご希望ですか？"
        },
        "romaji": "Dono sensei o kibo desu ka?"
      },
      {
        "id": "hospital-0-example-2",
        "text": {
          "pt": "Pode ser qualquer um que tenha horário livre logo.",
          "en": "Any doctor with an open slot soon is fine.",
          "ja": "すぐに空いている先生なら誰でも構いません。"
        },
        "romaji": "Sugu ni aite iru sensei nara dare demo kamaimasen."
      },
      {
        "id": "hospital-0-example-3",
        "text": {
          "pt": "Entendido. Vou verificar a disponibilidade para você.",
          "en": "Understood. I'll check availability for you.",
          "ja": "かしこまりました。空き状況を確認いたします。"
        },
        "romaji": "Kashikomarimashita. Aki jōkyō o kakunin itashimasu."
      }
    ],
    "hospital-1": [
      {
        "id": "hospital-1-example-1",
        "text": {
          "pt": "Seria para que tipo de consulta?",
          "en": "What kind of appointment would that be for?",
          "ja": "どのようなご用件でしょうか？"
        },
        "romaji": "Donoyō na goyōken deshō ka?"
      },
      {
        "id": "hospital-1-example-2",
        "text": {
          "pt": "É para um retorno com o Dr. Silva.",
          "en": "It's for a follow-up with Dr. Silva.",
          "ja": "シルバ先生の再診です。"
        },
        "romaji": "Shiruba sensei no saishin desu."
      },
      {
        "id": "hospital-1-example-3",
        "text": {
          "pt": "Ótimo. Posso agendar para as dez horas?",
          "en": "Great. Can I schedule it for ten o'clock?",
          "ja": "承知いたしました。午前十時でよろしいでしょうか？"
        },
        "romaji": "Shōchi itashimashita. Gozen jūji de yoroshī deshō ka?"
      }
    ],
    "hospital-2": [
      {
        "id": "hospital-2-example-1",
        "text": {
          "pt": "Você tem febre ou dificuldade para engolir?",
          "en": "Do you have a fever or difficulty swallowing?",
          "ja": "熱や飲み込みにくさはありますか？"
        },
        "romaji": "Netsu ya nomikomi nikusa wa arimasu ka?"
      },
      {
        "id": "hospital-2-example-2",
        "text": {
          "pt": "Sim, a febre começou ontem e está difícil de engolir.",
          "en": "Yes, the fever started yesterday and it's hard to swallow.",
          "ja": "はい、昨日から熱が出て、飲み込むのがつらいです。"
        },
        "romaji": "Hai, kinō kara netsu ga dete, nomikomu no ga tsurai desu."
      },
      {
        "id": "hospital-2-example-3",
        "text": {
          "pt": "Por favor, venha até a sala de exames.",
          "en": "Please come to the examination room.",
          "ja": "では診察室へお入りください。"
        },
        "romaji": "Dewa shinsatsushitsu e o-hairi kudasai."
      }
    ],
    "hospital-3": [
      {
        "id": "hospital-3-example-1",
        "text": {
          "pt": "Abra bem a boca e diga 'Aaaah'.",
          "en": "Open your mouth wide and say 'Aaaah'.",
          "ja": "大きく口を開けて「あー」と言ってください。"
        },
        "romaji": "Ōkiku kuchi o akete 'Ā' to itte kudasai."
      },
      {
        "id": "hospital-3-example-2",
        "text": {
          "pt": "Aaaah.",
          "en": "Aaaah.",
          "ja": "あー。"
        },
        "romaji": "Ā."
      },
      {
        "id": "hospital-3-example-3",
        "text": {
          "pt": "Parece um pouco avermelhada. Você sente dor ao engolir?",
          "en": "It looks a little red. Do you feel pain when swallowing?",
          "ja": "少し赤くなっていますね。飲み込む時に痛みを感じますか？"
        },
        "romaji": "Sukoshi akaku natte imasu ne. Nomikomu toki ni itami o kanjimasu ka?"
      }
    ],
    "hospital-4": [
      {
        "id": "hospital-4-example-1",
        "text": {
          "pt": "Você se lembra do nome do medicamento?",
          "en": "Do you remember the name of the medication?",
          "ja": "お薬の名前は覚えていますか？"
        },
        "romaji": "Okusuri no namae wa oboete imasu ka?"
      },
      {
        "id": "hospital-4-example-2",
        "text": {
          "pt": "Não, mas é um comprimido pequeno e branco.",
          "en": "No, but it's a small, white pill.",
          "ja": "いいえ、でも小さい白い錠剤です。"
        },
        "romaji": "Īe, demo chiisai shiroi jōzai desu."
      },
      {
        "id": "hospital-4-example-3",
        "text": {
          "pt": "Certo. Tem tomado todos os dias conforme prescrito?",
          "en": "Okay. Have you been taking it daily as prescribed?",
          "ja": "分かりました。毎日指示通りに服用していますか？"
        },
        "romaji": "Wakarimashita. Mainichi shiji dōri ni fukuyō shite imasu ka?"
      }
    ],
    "hospital-5": [
      {
        "id": "hospital-5-example-1",
        "text": {
          "pt": "Sim, da próxima vez não vou esquecer.",
          "en": "Yes, next time I won't forget.",
          "ja": "はい、次回は忘れません。"
        },
        "romaji": "Hai, jikai wa wasuremasen."
      },
      {
        "id": "hospital-5-example-2",
        "text": {
          "pt": "Assim podemos verificar a dosagem corretamente.",
          "en": "That way we can check the dosage correctly.",
          "ja": "そうすれば、正確な服用量を確認できます。"
        },
        "romaji": "Sō sureba, seikaku na fukuyō-ryō o kakunin dekimasu."
      },
      {
        "id": "hospital-5-example-3",
        "text": {
          "pt": "Entendido. Ajudaria se eu trouxesse todos os medicamentos?",
          "en": "Understood. Would it help if I brought all my medications?",
          "ja": "わかりました。持っている薬を全て持参した方がいいですか？"
        },
        "romaji": "Wakarimashita. Motte iru kusuri o subete jisan shita hō ga ii desu ka?"
      }
    ],
    "hospital-6": [
      {
        "id": "hospital-6-example-1",
        "text": {
          "pt": "Qual o período de afastamento que você precisa?",
          "en": "What period of absence do you need?",
          "ja": "どのくらいの期間の休職が必要ですか？"
        },
        "romaji": "Donokurai no kikan no kyūshoku ga hitsuyō desu ka?"
      },
      {
        "id": "hospital-6-example-2",
        "text": {
          "pt": "Acho que dois dias seriam suficientes.",
          "en": "I think two days would be enough.",
          "ja": "二日間あれば十分だと思います。"
        },
        "romaji": "Futsukakan areba jūbun da to omoimasu."
      },
      {
        "id": "hospital-6-example-3",
        "text": {
          "pt": "Certo. Vou preparar o documento para você.",
          "en": "Okay. I'll prepare the document for you.",
          "ja": "承知いたしました。書類を作成します。"
        },
        "romaji": "Shōchi itashimashita. Shorui o sakusei shimasu."
      }
    ],
    "hospital-7": [
      {
        "id": "hospital-7-example-1",
        "text": {
          "pt": "Certo, volto para buscar mais tarde então.",
          "en": "Okay, I'll come back to pick it up later then.",
          "ja": "承知いたしました、では後で取りに戻ります。"
        },
        "romaji": "Shōchi itashimashita, dewa ato de tori ni modorimasu."
      },
      {
        "id": "hospital-7-example-2",
        "text": {
          "pt": "Não se esqueça de trazer seu documento de identificação.",
          "en": "Don't forget to bring your ID.",
          "ja": "身分証明書をお忘れなくお持ちください。"
        },
        "romaji": "Mibun shōmeisho o o-wasure naku o-mochi kudasai."
      },
      {
        "id": "hospital-7-example-3",
        "text": {
          "pt": "Está bem, obrigado pela informação.",
          "en": "Alright, thank you for the information.",
          "ja": "はい、情報ありがとうございます。"
        },
        "romaji": "Hai, jōhō arigatō gozaimasu."
      }
    ],
    "hospital-8": [
      {
        "id": "hospital-8-example-1",
        "text": {
          "pt": "Preciso pegar alguns medicamentos após a consulta.",
          "en": "I need to pick up some medication after the consultation.",
          "ja": "診察後、薬を受け取りたいのですが。"
        },
        "romaji": "Shinsatsu-go, kusuri o uketoritai no desu ga."
      },
      {
        "id": "hospital-8-example-2",
        "text": {
          "pt": "Você tem a receita do médico?",
          "en": "Do you have the doctor's prescription?",
          "ja": "先生の処方箋はお持ちですか？"
        },
        "romaji": "Sensei no shohōsen wa o-mochi desu ka?"
      },
      {
        "id": "hospital-8-example-3",
        "text": {
          "pt": "Sim, acabei de receber. Onde devo ir?",
          "en": "Yes, I just received it. Where should I go?",
          "ja": "はい、今受け取ったばかりです。どちらへ行けばいいですか？"
        },
        "romaji": "Hai, ima uketotta bakari desu. Dochira e ikeba ii desu ka?"
      }
    ],
    "hospital-9": [
      {
        "id": "hospital-9-example-1",
        "text": {
          "pt": "Há alguma placa indicando?",
          "en": "Are there any signs indicating it?",
          "ja": "何か表示はありますか？"
        },
        "romaji": "Nanika hyōji wa arimasu ka?"
      },
      {
        "id": "hospital-9-example-2",
        "text": {
          "pt": "Sim, é só seguir as setas verdes.",
          "en": "Yes, just follow the green arrows.",
          "ja": "はい、緑色の矢印に沿ってお進みください。"
        },
        "romaji": "Hai, midori-iro no yajirushi ni sotte o-susumi kudasai."
      },
      {
        "id": "hospital-9-example-3",
        "text": {
          "pt": "Agora já sei onde buscar os remédios prescritos.",
          "en": "Now I know where to pick up the prescribed medicine.",
          "ja": "これで処方された薬をどこで受け取るか分かりました。"
        },
        "romaji": "Kore de shohō sareta kusuri o doko de uketoru ka wakarimashita."
      }
    ]
  },
  "emergencia": {
    "emergencia-0": [
      {
        "id": "emergencia-0-example-1",
        "text": {
          "pt": "Ele está com muita dor e não consegue se mexer.",
          "en": "He's in a lot of pain and can't move.",
          "ja": "彼はとても痛がっていて、動けません。"
        },
        "romaji": "Kare wa totemo itagatte ite, ugokemasen."
      },
      {
        "id": "emergencia-0-example-2",
        "text": {
          "pt": "Certo, qual é o endereço exato agora?",
          "en": "Okay, what's the exact address right now?",
          "ja": "分かりました、今すぐ正確な住所は何ですか？"
        },
        "romaji": "Wakarimashita, ima sugu seikaku na jūsho wa nan desu ka?"
      },
      {
        "id": "emergencia-0-example-3",
        "text": {
          "pt": "Estamos na Rua das Flores, número cinquenta e dois.",
          "en": "We are on Flowers Street, number fifty-two.",
          "ja": "私たちは花の通りの52番地にいます。"
        },
        "romaji": "Watashitachi wa Hana no Tōri no gojūni-banchi ni imasu."
      }
    ],
    "emergencia-1": [
      {
        "id": "emergencia-1-example-1",
        "text": {
          "pt": "Respire fundo, os paramédicos estão a caminho.",
          "en": "Take a deep breath, the paramedics are on their way.",
          "ja": "深呼吸してください、救急隊員が向かっています。"
        },
        "romaji": "Shinkokyū shite kudasai, kyūkyūtaiin ga mukatte imasu."
      },
      {
        "id": "emergencia-1-example-2",
        "text": {
          "pt": "Eu não consigo, está doendo muito aqui.",
          "en": "I can't, it hurts so much here.",
          "ja": "できません、ここがとても痛いです。"
        },
        "romaji": "Dekimasen, koko ga totemo itai desu."
      },
      {
        "id": "emergencia-1-example-3",
        "text": {
          "pt": "Olhe para mim, tente se concentrar na minha voz.",
          "en": "Look at me, try to focus on my voice.",
          "ja": "私を見て、私の声に集中してみてください。"
        },
        "romaji": "Watashi o mite, watashi no koe ni shūchū shite mite kudasai."
      }
    ],
    "emergencia-2": [
      {
        "id": "emergencia-2-example-1",
        "text": {
          "pt": "Dois carros bateram forte ali, parece bem grave.",
          "en": "Two cars crashed hard there, it looks pretty serious.",
          "ja": "そこで車が2台激しく衝突しました、かなり深刻に見えます。"
        },
        "romaji": "Soko de kuruma ga nidai hageshiku shōtotsu shimashita, kanari shinkoku ni miemasu."
      },
      {
        "id": "emergencia-2-example-2",
        "text": {
          "pt": "Já avisou a polícia ou a equipe de resgate?",
          "en": "Have you already notified the police or the rescue team?",
          "ja": "もう警察か救助隊に連絡しましたか？"
        },
        "romaji": "Mō keisatsu ka kyūjotai ni renraku shimashita ka?"
      },
      {
        "id": "emergencia-2-example-3",
        "text": {
          "pt": "Ainda não, eu vi agora mesmo e corri para te contar.",
          "en": "Not yet, I just saw it and ran to tell you.",
          "ja": "まだです、今見たばかりで、あなたに伝えに走ってきました。"
        },
        "romaji": "Mada desu, ima mita bakari de, anata ni tsutae ni hashitte kimashita."
      }
    ],
    "emergencia-3": [
      {
        "id": "emergencia-3-example-1",
        "text": {
          "pt": "Sim, um motociclista está caído na rua.",
          "en": "Yes, a motorcyclist is lying on the street.",
          "ja": "はい、バイクの運転手が道に倒れています。"
        },
        "romaji": "Hai, baiku no untenshu ga michi ni taorete imasu."
      },
      {
        "id": "emergencia-3-example-2",
        "text": {
          "pt": "Ele parece estar consciente ou inconsciente?",
          "en": "Does he seem conscious or unconscious?",
          "ja": "彼は意識があるように見えますか、それとも意識不明ですか？"
        },
        "romaji": "Kare wa ishiki ga aru yō ni miemasu ka, sore tomo ishiki fumei desu ka?"
      },
      {
        "id": "emergencia-3-example-3",
        "text": {
          "pt": "Está gemendo um pouco, mas não responde.",
          "en": "He's groaning a little, but not responding.",
          "ja": "少しうめき声を上げていますが、返事をしません。"
        },
        "romaji": "Sukoshi umekigoe o agete imasu ga, henji o shimasen."
      }
    ],
    "emergencia-4": [
      {
        "id": "emergencia-4-example-1",
        "text": {
          "pt": "Eu a coloquei no bolso de trás da calça, deve ter caído.",
          "en": "I put it in my back pants pocket, it must have fallen out.",
          "ja": "ズボンの後ろのポケットに入れたのですが、きっと落ちました。"
        },
        "romaji": "Zubon no ushiro no poketto ni ireta no desu ga, kitto ochimashita."
      },
      {
        "id": "emergencia-4-example-2",
        "text": {
          "pt": "Você se lembra de onde desceu?",
          "en": "Do you remember where you got off?",
          "ja": "どこで降りたか覚えていますか？"
        },
        "romaji": "Doko de orita ka oboete imasu ka?"
      },
      {
        "id": "emergencia-4-example-3",
        "text": {
          "pt": "Na estação central, mas não senti nada.",
          "en": "At the central station, but I didn't feel a thing.",
          "ja": "中央駅で、でも何も感じませんでした。"
        },
        "romaji": "Chūōeki de, demo nani mo kanjimasen deshita."
      }
    ],
    "emergencia-5": [
      {
        "id": "emergencia-5-example-1",
        "text": {
          "pt": "Preciso fazer isso imediatamente?",
          "en": "Do I need to do this immediately?",
          "ja": "すぐにこれをしなければなりませんか？"
        },
        "romaji": "Sugu ni kore o shinakereba narimasen ka?"
      },
      {
        "id": "emergencia-5-example-2",
        "text": {
          "pt": "Sim, quanto antes você for, melhor.",
          "en": "Yes, the sooner you go, the better.",
          "ja": "はい、早ければ早いほど良いです。"
        },
        "romaji": "Hai, hayakereba hayai hodo ii desu."
      },
      {
        "id": "emergencia-5-example-3",
        "text": {
          "pt": "Obrigado pela orientação, estou indo para lá agora.",
          "en": "Thanks for the guidance, I'm heading there now.",
          "ja": "ご案内ありがとうございます、今すぐそこへ向かいます。"
        },
        "romaji": "Go annai arigatō gozaimasu, ima sugu soko e mukaemasu."
      }
    ],
    "emergencia-6": [
      {
        "id": "emergencia-6-example-1",
        "text": {
          "pt": "É um cheiro bem forte, como de gás de cozinha.",
          "en": "It's a very strong smell, like cooking gas.",
          "ja": "とても強い匂いです、調理ガスのような。"
        },
        "romaji": "Totemo tsuyoi nioi desu, chōri gasu no yō na."
      },
      {
        "id": "emergencia-6-example-2",
        "text": {
          "pt": "Você já verificou se o fogão está desligado?",
          "en": "Have you already checked if the stove is off?",
          "ja": "もうコンロの火が消えているか確認しましたか？"
        },
        "romaji": "Mō konro no hi ga kiete iru ka kakunin shimashita ka?"
      },
      {
        "id": "emergencia-6-example-3",
        "text": {
          "pt": "Sim, está tudo fechado e desligado.",
          "en": "Yes, everything is closed and off.",
          "ja": "はい、すべて閉まっていて、消えています。"
        },
        "romaji": "Hai, subete shimatte ite, kiete imasu."
      }
    ],
    "emergencia-7": [
      {
        "id": "emergencia-7-example-1",
        "text": {
          "pt": "O alarme de incêndio acabou de tocar.",
          "en": "The fire alarm just went off.",
          "ja": "火災警報器が今鳴りました。"
        },
        "romaji": "Kasai keihōki ga ima narimashita."
      },
      {
        "id": "emergencia-7-example-2",
        "text": {
          "pt": "Devemos usar as escadas de emergência?",
          "en": "Should we use the emergency stairs?",
          "ja": "非常階段を使うべきですか？"
        },
        "romaji": "Hijō kaidan o tsukau beki desu ka?"
      },
      {
        "id": "emergencia-7-example-3",
        "text": {
          "pt": "Sim, os elevadores não são seguros agora.",
          "en": "Yes, the elevators are not safe now.",
          "ja": "はい、エレベーターは今安全ではありません。"
        },
        "romaji": "Hai, erebētā wa ima anzen dewa arimasen."
      }
    ],
    "emergencia-8": [
      {
        "id": "emergencia-8-example-1",
        "text": {
          "pt": "Não sei onde estou ou como voltar para casa.",
          "en": "I don't know where I am or how to get home.",
          "ja": "自分がどこにいるのか、どうやって家に帰るのか分かりません。"
        },
        "romaji": "Jibun ga doko ni iru no ka, dō yatte ie ni kaeru no ka wakarimasen."
      },
      {
        "id": "emergencia-8-example-2",
        "text": {
          "pt": "Você tem o endereço de algum parente ou amigo?",
          "en": "Do you have the address of any relative or friend?",
          "ja": "親戚や友人の住所を知っていますか？"
        },
        "romaji": "Shinseki ya yūjin no jūsho o shitte imasu ka?"
      },
      {
        "id": "emergencia-8-example-3",
        "text": {
          "pt": "Lembro do número da minha irmã, mas não da rua dela.",
          "en": "I remember my sister's number, but not her street.",
          "ja": "妹の電話番号は覚えていますが、彼女の通りは覚えていません。"
        },
        "romaji": "Imōto no denwa bangō wa oboete imasu ga, kanojo no tōri wa oboete imasen."
      }
    ],
    "emergencia-9": [
      {
        "id": "emergencia-9-example-1",
        "text": {
          "pt": "Preciso ligar para minha família agora mesmo.",
          "en": "I need to call my family right now.",
          "ja": "今すぐ家族に電話しなければなりません。"
        },
        "romaji": "Ima sugu kazoku ni denwa shinakereba narimasen."
      },
      {
        "id": "emergencia-9-example-2",
        "text": {
          "pt": "Pode discar o número que precisar.",
          "en": "You can dial any number you need.",
          "ja": "必要な番号にダイヤルできます。"
        },
        "romaji": "Hitsuyō na bangō ni daiyaru dekimasu."
      },
      {
        "id": "emergencia-9-example-3",
        "text": {
          "pt": "Muito obrigado pela sua gentileza.",
          "en": "Thank you very much for your kindness.",
          "ja": "ご親切に本当にありがとうございます。"
        },
        "romaji": "Goshinsetsu ni hontō ni arigatō gozaimasu."
      }
    ]
  },
  "perguntas": {
    "perguntas-0": [
      {
        "id": "perguntas-0-example-1",
        "text": {
          "pt": "Não entendi bem o nome daquela cidade.",
          "en": "I didn't quite catch the name of that city.",
          "ja": "その街の名前がよくわかりませんでした。"
        },
        "romaji": "Sono machi no namae ga yoku wakarimasen deshita."
      },
      {
        "id": "perguntas-0-example-2",
        "text": {
          "pt": "Ah, você quer saber a grafia do lugar?",
          "en": "Oh, you want to know the spelling of the place?",
          "ja": "ああ、その場所のつづりが知りたいですか？"
        },
        "romaji": "Ā, sono basho no tsuzuri ga shiritai desu ka?"
      },
      {
        "id": "perguntas-0-example-3",
        "text": {
          "pt": "Sim, como eu deveria registrar isso?",
          "en": "Yes, how should I write it down?",
          "ja": "はい、どうメモすればいいでしょう？"
        },
        "romaji": "Hai, dō memo sureba ii deshō?"
      }
    ],
    "perguntas-1": [
      {
        "id": "perguntas-1-example-1",
        "text": {
          "pt": "O nome da rua é 'Passarela'.",
          "en": "The street name is 'Passarela'.",
          "ja": "通りの名前は「パッサレラ」です。"
        },
        "romaji": "Tōri no namae wa 'Passarera' desu."
      },
      {
        "id": "perguntas-1-example-2",
        "text": {
          "pt": "É com um S ou dois?",
          "en": "Is it with one S or two?",
          "ja": "エスは一つですか、それとも二つですか？"
        },
        "romaji": "Esu wa hitotsu desu ka, sore tomo futatsu desu ka?"
      },
      {
        "id": "perguntas-1-example-3",
        "text": {
          "pt": "São duas letras S no meio.",
          "en": "It has two S letters in the middle.",
          "ja": "真ん中にエスが二つあります。"
        },
        "romaji": "Mannaka ni esu ga futatsu arimasu."
      }
    ],
    "perguntas-2": [
      {
        "id": "perguntas-2-example-1",
        "text": {
          "pt": "Então, clique no ícone, selecione 'Configurações' e depois 'Privacidade'.",
          "en": "So, click on the icon, select 'Settings', and then 'Privacy'.",
          "ja": "では、アイコンをクリックして、「設定」を選んでから、「プライバシー」です。"
        },
        "romaji": "Dewa, aikon o kurikku shite, 'Settei' o erande kara, 'Puraibashī' desu."
      },
      {
        "id": "perguntas-2-example-2",
        "text": {
          "pt": "Desculpe, não peguei a segunda etapa.",
          "en": "Sorry, I didn't catch the second step.",
          "ja": "すみません、二番目の手順が聞き取れませんでした。"
        },
        "romaji": "Sumimasen, nibanme no tejun ga kikitoremasen deshita."
      },
      {
        "id": "perguntas-2-example-3",
        "text": {
          "pt": "Poderia repetir mais pausadamente para eu anotar?",
          "en": "Could you repeat that more deliberately so I can write it down?",
          "ja": "メモできるように、もっとゆっくり繰り返していただけますか？"
        },
        "romaji": "Memo dekiru yō ni, motto yukkuri kurikaeshite itadakemasu ka?"
      }
    ],
    "perguntas-3": [
      {
        "id": "perguntas-3-example-1",
        "text": {
          "pt": "Por favor, explique o procedimento novamente.",
          "en": "Please explain the procedure again.",
          "ja": "もう一度手順を説明してください。"
        },
        "romaji": "Mō ichido tejun o setsumei shite kudasai."
      },
      {
        "id": "perguntas-3-example-2",
        "text": {
          "pt": "Minhas desculpas, acho que acelerei um pouco.",
          "en": "My apologies, I think I sped up a bit.",
          "ja": "申し訳ありません、少し早口だったようです。"
        },
        "romaji": "Mōshiwake arimasen, sukoshi hayakuchi datta yō desu."
      },
      {
        "id": "perguntas-3-example-3",
        "text": {
          "pt": "Não se preocupe, acontece.",
          "en": "No worries, it happens.",
          "ja": "気にしないでください、よくあることです。"
        },
        "romaji": "Ki ni shinaide kudasai, yoku aru koto desu."
      }
    ],
    "perguntas-4": [
      {
        "id": "perguntas-4-example-1",
        "text": {
          "pt": "Em japonês, dizemos 'Itadakimasu' antes de comer.",
          "en": "In Japanese, we say 'Itadakimasu' before eating.",
          "ja": "日本語では、食事の前に「いただきます」と言います。"
        },
        "romaji": "Nihongo de wa, shokuji no mae ni 'Itadakimasu' to iimasu."
      },
      {
        "id": "perguntas-4-example-2",
        "text": {
          "pt": "Interessante! E qual o significado dessa expressão?",
          "en": "Interesting! And what's the meaning of that expression?",
          "ja": "面白いですね！その表現はどういう意味ですか？"
        },
        "romaji": "Omoshiroi desu ne! Sono hyōgen wa dō iu imi desu ka?"
      },
      {
        "id": "perguntas-4-example-3",
        "text": {
          "pt": "É uma forma de gratidão pela comida e por quem a preparou.",
          "en": "It's a form of gratitude for the food and those who prepared it.",
          "ja": "食べ物や作ってくれた人への感謝の気持ちを表すものです。"
        },
        "romaji": "Tabemono ya tsukutte kureta hito e no kansha no kimochi o arawasu mono desu."
      }
    ],
    "perguntas-5": [
      {
        "id": "perguntas-5-example-1",
        "text": {
          "pt": "Você já ouviu falar da palavra 'Gaman'?",
          "en": "Have you heard of the word 'Gaman'?",
          "ja": "「我慢」という言葉を聞いたことがありますか？"
        },
        "romaji": "'Gaman' to iu kotoba o kiita koto ga arimasu ka?"
      },
      {
        "id": "perguntas-5-example-2",
        "text": {
          "pt": "Acho que sim. É sobre paciência, certo?",
          "en": "I think so. It's about patience, right?",
          "ja": "あると思います。忍耐のことですよね？"
        },
        "romaji": "Aru to omoimasu. Nintai no koto desu yo ne?"
      },
      {
        "id": "perguntas-5-example-3",
        "text": {
          "pt": "Sim, é um conceito que envolve resistir com dignidade.",
          "en": "Yes, it's a concept that involves enduring with dignity.",
          "ja": "はい、それは尊厳を持って耐え忍ぶことに関わる概念です。"
        },
        "romaji": "Hai, sore wa songen o motte taeshinobu koto ni kakawaru gainen desu."
      }
    ],
    "perguntas-6": [
      {
        "id": "perguntas-6-example-1",
        "text": {
          "pt": "Estou no centro da cidade, preciso chegar ao museu.",
          "en": "I'm in the city center, I need to get to the museum.",
          "ja": "街の中心にいます、美術館に行きたいのですが。"
        },
        "romaji": "Machi no chūshin ni imasu, bijutsukan ni ikitai no desu ga."
      },
      {
        "id": "perguntas-6-example-2",
        "text": {
          "pt": "O museu não é muito longe daqui.",
          "en": "The museum isn't too far from here.",
          "ja": "美術館はここからそれほど遠くありません。"
        },
        "romaji": "Bijutsukan wa koko kara sore hodo tōku arimasen."
      },
      {
        "id": "perguntas-6-example-3",
        "text": {
          "pt": "Qual seria o tempo de viagem a pé até lá?",
          "en": "What would be the travel time on foot to get there?",
          "ja": "歩いてあそこまでどのくらいの移動時間になりますか？"
        },
        "romaji": "Aruite asoko made dono kurai no idō jikan ni narimasu ka?"
      }
    ],
    "perguntas-7": [
      {
        "id": "perguntas-7-example-1",
        "text": {
          "pt": "Onde fica a padaria mais próxima?",
          "en": "Where is the nearest bakery?",
          "ja": "一番近いパン屋はどこですか？"
        },
        "romaji": "Ichiban chikai pan'ya wa doko desu ka?"
      },
      {
        "id": "perguntas-7-example-2",
        "text": {
          "pt": "É na próxima esquina, depois do semáforo.",
          "en": "It's on the next corner, after the traffic light.",
          "ja": "次の角、信号を過ぎたところにあります。"
        },
        "romaji": "Tsugi no kado, shingō o sugita tokoro ni arimasu."
      },
      {
        "id": "perguntas-7-example-3",
        "text": {
          "pt": "Dá pra ir em uns cinco minutos andando.",
          "en": "You can get there in about five minutes walking.",
          "ja": "歩いて五分くらいで行けますよ。"
        },
        "romaji": "Aruite gofun kurai de ikemasu yo."
      }
    ],
    "perguntas-8": [
      {
        "id": "perguntas-8-example-1",
        "text": {
          "pt": "Estou em dúvida sobre a conjugação verbal aqui.",
          "en": "I'm uncertain about the verb conjugation here.",
          "ja": "ここでの動詞の活用について迷っています。"
        },
        "romaji": "Koko de no dōshi no katsuyō ni tsuite mayotte imasu."
      },
      {
        "id": "perguntas-8-example-2",
        "text": {
          "pt": "A gramática japonesa tem suas peculiaridades.",
          "en": "Japanese grammar has its peculiarities.",
          "ja": "日本語の文法には独特の点があります。"
        },
        "romaji": "Nihongo no bunpō ni wa dokutoku no ten ga arimasu."
      },
      {
        "id": "perguntas-8-example-3",
        "text": {
          "pt": "Existe uma norma específica para essa situação?",
          "en": "Is there a specific standard for this situation?",
          "ja": "この状況に対する特定の規範はありますか？"
        },
        "romaji": "Kono jōkyō ni tai suru tokutei no kihan wa arimasu ka?"
      }
    ],
    "perguntas-9": [
      {
        "id": "perguntas-9-example-1",
        "text": {
          "pt": "Como faço para usar o 'da' em frases negativas?",
          "en": "How do I use 'da' in negative sentences?",
          "ja": "否定文で「だ」をどう使えばいいですか？"
        },
        "romaji": "Hiteibun de 'da' o dō tsukaeba ii desu ka?"
      },
      {
        "id": "perguntas-9-example-2",
        "text": {
          "pt": "Normalmente você usa 'janai', mas há casos especiais.",
          "en": "Normally you use 'janai', but there are special cases.",
          "ja": "通常は「じゃない」を使いますが、特別な場合もあります。"
        },
        "romaji": "Tsūjō wa 'janai' o tsukaimasu ga, tokubetsu na baai mo arimasu."
      },
      {
        "id": "perguntas-9-example-3",
        "text": {
          "pt": "É uma dessas situações que não segue a lógica padrão.",
          "en": "It's one of those situations that doesn't follow standard logic.",
          "ja": "それは標準的な論理に従わない状況の一つです。"
        },
        "romaji": "Sore wa hyōjun-teki na ronri ni shitagawanai jōkyō no hitotsu desu."
      }
    ]
  },
  "casual": {
    "casual-0": [
      {
        "id": "casual-0-example-1",
        "text": {
          "pt": "Sim, comecei uma com detetives numa cidade antiga. É bem envolvente.",
          "en": "Yes, I started one about detectives in an old city. It's quite engaging.",
          "ja": "はい、古い町が舞台の刑事ドラマを見始めました。とても引き込まれます。"
        },
        "romaji": "Hai, furui machi ga butai no keiji dorama o mihajimemashita. Totemo hikikomaremasu."
      },
      {
        "id": "casual-0-example-2",
        "text": {
          "pt": "Ah, qual o nome dela? Estou precisando de algo novo pra maratonar.",
          "en": "Oh, what's its name? I need something new to binge-watch.",
          "ja": "へえ、なんていうタイトルですか？何か新しいものを一気見したいです。"
        },
        "romaji": "Hē, nante iu taitoru desu ka? Nanika atarashī mono o ikkimiya shitai desu."
      },
      {
        "id": "casual-0-example-3",
        "text": {
          "pt": "Chama 'Sombras da Cidadela'. Te aviso se valer a pena depois de uns capítulos.",
          "en": "It's called 'Shadows of the Citadel'. I'll let you know if it's worth it after a few episodes.",
          "ja": "「城塞の影」って言います。何話か見てから、おすすめできるかまた連絡しますね。"
        },
        "romaji": "「Jōsai no Kage」tte iimasu. Nan wa ka mite kara, osusume dekiru ka mata renraku shimasu ne."
      }
    ],
    "casual-1": [
      {
        "id": "casual-1-example-1",
        "text": {
          "pt": "É sobre naves espaciais e viagens no tempo, com um pouco de drama político.",
          "en": "It's about spaceships and time travel, with a bit of political drama.",
          "ja": "宇宙船とタイムトラベルがテーマで、政治的なドラマも少しあります。"
        },
        "romaji": "Uchūsen to taimu toraberu ga tēma de, seijiteki na dorama mo sukoshi arimasu."
      },
      {
        "id": "casual-1-example-2",
        "text": {
          "pt": "Interessante! Já estou cansado das séries de fantasia de sempre.",
          "en": "Interesting! I'm already tired of the usual fantasy series.",
          "ja": "面白そう！いつも同じファンタジーシリーズはもう飽きてしまいました。"
        },
        "romaji": "Omoshirosō! Itsumo onaji fantajī shirīzu wa mō akite shimaimashita."
      },
      {
        "id": "casual-1-example-3",
        "text": {
          "pt": "Vale a pena dar uma olhada. Os efeitos especiais são incríveis.",
          "en": "It's worth checking out. The special effects are incredible.",
          "ja": "一見の価値はありますよ。特殊効果がすごいんです。"
        },
        "romaji": "Ikken no kachi wa arimasu yo. Tokushu kōka ga sugoi n desu."
      }
    ],
    "casual-2": [
      {
        "id": "casual-2-example-1",
        "text": {
          "pt": "Minhas pontas dos dedos estão doendo, mas estou gostando muito.",
          "en": "My fingertips are hurting, but I'm really enjoying it.",
          "ja": "指先が痛いけど、すごく楽しいです。"
        },
        "romaji": "Yubisaki ga itai kedo, sugoku tanoshī desu."
      },
      {
        "id": "casual-2-example-2",
        "text": {
          "pt": "Isso é normal no começo. Com o tempo, seus dedos vão ficar mais fortes.",
          "en": "That's normal at first. Your fingers will get stronger over time.",
          "ja": "最初はよくあることです。時間が経てば指も強くなりますよ。"
        },
        "romaji": "Saisho wa yoku aru koto desu. Jikan ga tateba yubi mo tsuyoku narimasu yo."
      },
      {
        "id": "casual-2-example-3",
        "text": {
          "pt": "Espero que sim! Mal posso esperar pra tocar minhas músicas favoritas.",
          "en": "I hope so! I can't wait to play my favorite songs.",
          "ja": "そうだといいな！お気に入りの曲を弾くのが待ち遠しいです。"
        },
        "romaji": "Sō da to ī na! Okiniiri no kyoku o hiku no ga machidōshī desu."
      }
    ],
    "casual-3": [
      {
        "id": "casual-3-example-1",
        "text": {
          "pt": "Ainda não uma completa, mas consigo fazer a melodia de 'Parabéns pra Você'.",
          "en": "Not a complete one yet, but I can play the melody of 'Happy Birthday'.",
          "ja": "まだ一曲全部は無理ですが、「ハッピーバースデー」のメロディなら弾けます。"
        },
        "romaji": "Mada ikkyoku zenbu wa muri desu ga, 'Happī Bāsudē' no merodi nara hikemasu."
      },
      {
        "id": "casual-3-example-2",
        "text": {
          "pt": "Isso já é um ótimo começo! A prática leva à perfeição, sabe?",
          "en": "That's already a great start! Practice makes perfect, you know?",
          "ja": "それはもう素晴らしいスタートですね！習うより慣れろ、って言いますし。"
        },
        "romaji": "Sore wa mō subarashī sutāto desu ne! Narau yori narero, tte iimasu shi."
      },
      {
        "id": "casual-3-example-3",
        "text": {
          "pt": "Sim, estou praticando todos os dias um pouquinho. Em breve, serei um guitarrista!",
          "en": "Yes, I'm practicing a little bit every day. Soon, I'll be a guitarist!",
          "ja": "はい、毎日少しずつ練習しています。すぐにギタリストになりますよ！"
        },
        "romaji": "Hai, mainichi sukoshizutsu renshū shite imasu. Suguni gitarisuto ni narimasu yo!"
      }
    ],
    "casual-4": [
      {
        "id": "casual-4-example-1",
        "text": {
          "pt": "Eu saí de casa com um sol lindo e agora está caindo o mundo lá fora.",
          "en": "I left home with beautiful sunshine and now it's pouring outside.",
          "ja": "家を出た時は快晴だったのに、今では外は土砂降りです。"
        },
        "romaji": "Ie o deta toki wa kaisei datta noni, ima de wa soto wa doshaburi desu."
      },
      {
        "id": "casual-4-example-2",
        "text": {
          "pt": "Pois é! E a previsão não era de chuva. Que surpresa desagradável.",
          "en": "Exactly! And the forecast wasn't for rain. What an unpleasant surprise.",
          "ja": "ですよね！しかも天気予報では雨じゃなかったはず。嫌な驚きです。"
        },
        "romaji": "Desu yo ne! Shikamo tenki yohō de wa ame ja nakatta hazu. Iya na odoroki desu."
      },
      {
        "id": "casual-4-example-3",
        "text": {
          "pt": "Vou ter que esperar um pouco antes de sair de novo. Não quero me molhar.",
          "en": "I'll have to wait a bit before going out again. I don't want to get wet.",
          "ja": "また出かける前に少し待たないと。濡れたくないですからね。"
        },
        "romaji": "Mata dekakeru mae ni sukoshi matanai to. Nuretakunai desu kara ne."
      }
    ],
    "casual-5": [
      {
        "id": "casual-5-example-1",
        "text": {
          "pt": "Estava tão bom para um passeio, mas agora o céu está todo cinza.",
          "en": "It was so nice for a walk, but now the sky is all gray.",
          "ja": "散歩に最適だったのに、今では空はすっかり灰色です。"
        },
        "romaji": "Sanpo ni saiteki datta noni, ima de wa sora wa sukkari haiiro desu."
      },
      {
        "id": "casual-5-example-2",
        "text": {
          "pt": "Sim, até coloquei uma roupa mais leve. Agora estou com um pouco de frio.",
          "en": "Yeah, I even put on lighter clothes. Now I'm a little cold.",
          "ja": "ええ、薄着にしてしまったんですよ。今、少し肌寒いです。"
        },
        "romaji": "Ē, usugi ni shite shimatta n desu yo. Ima, sukoshi hadasamui desu."
      },
      {
        "id": "casual-5-example-3",
        "text": {
          "pt": "É bom ter um agasalho por perto, nunca se sabe como o tempo vai virar.",
          "en": "It's good to have a jacket handy, you never know how the weather will turn.",
          "ja": "上着を一枚持っておくといいですよ、天気がどう変わるか分からないですからね。"
        },
        "romaji": "Uwagi o ichi mai motte oku to ii desu yo, tenki ga dō kawaru ka wakaranai desu kara ne."
      }
    ],
    "casual-6": [
      {
        "id": "casual-6-example-1",
        "text": {
          "pt": "Eles vendem cerâmica, bijuterias feitas à mão e até doces caseiros.",
          "en": "They sell ceramics, handmade jewelry, and even homemade sweets.",
          "ja": "陶器や手作りのアクセサリー、それに自家製のお菓子まで売っているんです。"
        },
        "romaji": "Tōki ya tezukuri no akusesarī, sore ni jikasei no okashi made utte iru n desu."
      },
      {
        "id": "casual-6-example-2",
        "text": {
          "pt": "Que legal! Gosto muito de produtos artesanais. Fica perto daqui?",
          "en": "How cool! I really like handmade products. Is it close by?",
          "ja": "それは素敵！手作りの品が大好きなんです。ここから近いですか？"
        },
        "romaji": "Sore wa suteki! Tezukuri no shina ga daisuki nan desu. Koko kara chikai desu ka?"
      },
      {
        "id": "casual-6-example-3",
        "text": {
          "pt": "Fica a umas duas quadras da praça principal. Fácil de chegar a pé.",
          "en": "It's about two blocks from the main square. Easy to get to on foot.",
          "ja": "メイン広場から2ブロックくらいです。歩いてすぐ行けますよ。"
        },
        "romaji": "Mein hiroba kara ni burokku kurai desu. Aruite sugu ikemasu yo."
      }
    ],
    "casual-7": [
      {
        "id": "casual-7-example-1",
        "text": {
          "pt": "Perfeito! Eu estou precisando de um presente especial para minha irmã.",
          "en": "Perfect! I need a special gift for my sister.",
          "ja": "ちょうどいい！妹に特別なプレゼントが必要なんです。"
        },
        "romaji": "Chōdo ii! Imōto ni tokubetsu na purezento ga hitsuyō nan desu."
      },
      {
        "id": "casual-7-example-2",
        "text": {
          "pt": "Tenho certeza de que você vai encontrar algo único por lá.",
          "en": "I'm sure you'll find something unique there.",
          "ja": "きっとそこで何かユニークなものが見つかりますよ。"
        },
        "romaji": "Kitto soko de nanika yunīku na mono ga mitsukarimasu yo."
      },
      {
        "id": "casual-7-example-3",
        "text": {
          "pt": "Obrigada pela dica! Que horas você pensa em ir, pra gente se encontrar?",
          "en": "Thanks for the tip! What time are you planning to go, so we can meet up?",
          "ja": "情報ありがとう！何時くらいに行くつもりですか？一緒に行きませんか？"
        },
        "romaji": "Jōhō arigatō! Nanji kurai ni iku tsumori desu ka? Issho ni ikimasen ka?"
      }
    ],
    "casual-8": [
      {
        "id": "casual-8-example-1",
        "text": {
          "pt": "Tenho um compromisso daqui a pouco. Mas foi um prazer te encontrar!",
          "en": "I have an appointment soon. But it was a pleasure to meet you!",
          "ja": "もうすぐ約束があるんです。でも、お会いできて嬉しかったです！"
        },
        "romaji": "Mō sugu yakusoku ga aru n desu. Demo, o-ai dekite ureshikatta desu!"
      },
      {
        "id": "casual-8-example-2",
        "text": {
          "pt": "Digo o mesmo! Espero que a gente se veja de novo em breve.",
          "en": "Same here! I hope we see each other again soon.",
          "ja": "私もです！近いうちにまた会えるといいですね。"
        },
        "romaji": "Watashi mo desu! Chikauchi ni mata aeru to ii desu ne."
      },
      {
        "id": "casual-8-example-3",
        "text": {
          "pt": "Até mais! Cuide-se e tenha um bom dia.",
          "en": "See you! Take care and have a good day.",
          "ja": "またね！お元気で、良い一日を。"
        },
        "romaji": "Mata ne! O-genki de, yoi ichinichi o."
      }
    ],
    "casual-9": [
      {
        "id": "casual-9-example-1",
        "text": {
          "pt": "Claro, estou adorando saber mais sobre seus planos de viagem.",
          "en": "Sure, I'm loving hearing more about your travel plans.",
          "ja": "もちろん、あなたの旅行計画についてもっと聞きたいです。"
        },
        "romaji": "Mochiron, anata no ryokō keikaku ni tsuite motto kikitai desu."
      },
      {
        "id": "casual-9-example-2",
        "text": {
          "pt": "Combinado! Talvez a gente possa tomar um café na semana que vem.",
          "en": "Agreed! Maybe we can grab a coffee next week.",
          "ja": "いいですね！来週コーヒーでもどうですか。"
        },
        "romaji": "Ii desu ne! Raishū kōhī demo dō desu ka."
      },
      {
        "id": "casual-9-example-3",
        "text": {
          "pt": "Ótima ideia! Me manda uma mensagem quando tiver um tempinho.",
          "en": "Great idea! Send me a message when you have some free time.",
          "ja": "素晴らしいアイデアです！時間がある時にメッセージくださいね。"
        },
        "romaji": "Subarashī aidea desu! Jikan ga aru toki ni messēji kudasai ne."
      }
    ]
  }
};
