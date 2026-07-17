// Japanese alphabet data — hiragana, katakana, kanji (with categories/JLPT levels)
export type AlphabetSystem = "hiragana" | "katakana" | "kanji";

export interface Letter {
  char: string;
  romaji: string;
  group: string;
  // kanji-only optional fields
  onyomi?: string;
  kunyomi?: string;
  meaning?: string;
  examples?: { word: string; reading: string; translation: string }[];
}

export interface Vocab {
  word: string;
  reading?: string;
  translation: string;
}

// ---------- HIRAGANA ----------
const H_BASIC: [string, string, string][] = [
  ["あ","a","A"],["い","i","A"],["う","u","A"],["え","e","A"],["お","o","A"],
  ["か","ka","K"],["き","ki","K"],["く","ku","K"],["け","ke","K"],["こ","ko","K"],
  ["さ","sa","S"],["し","shi","S"],["す","su","S"],["せ","se","S"],["そ","so","S"],
  ["た","ta","T"],["ち","chi","T"],["つ","tsu","T"],["て","te","T"],["と","to","T"],
  ["な","na","N"],["に","ni","N"],["ぬ","nu","N"],["ね","ne","N"],["の","no","N"],
  ["は","ha","H"],["ひ","hi","H"],["ふ","fu","H"],["へ","he","H"],["ほ","ho","H"],
  ["ま","ma","M"],["み","mi","M"],["む","mu","M"],["め","me","M"],["も","mo","M"],
  ["や","ya","Y"],["ゆ","yu","Y"],["よ","yo","Y"],
  ["ら","ra","R"],["り","ri","R"],["る","ru","R"],["れ","re","R"],["ろ","ro","R"],
  ["わ","wa","W"],["を","wo","W"],["ん","n","N"],
];
const H_DAKUON: [string, string, string][] = [
  ["が","ga","G"],["ぎ","gi","G"],["ぐ","gu","G"],["げ","ge","G"],["ご","go","G"],
  ["ざ","za","Z"],["じ","ji","Z"],["ず","zu","Z"],["ぜ","ze","Z"],["ぞ","zo","Z"],
  ["だ","da","D"],["ぢ","ji","D"],["づ","zu","D"],["で","de","D"],["ど","do","D"],
  ["ば","ba","B"],["び","bi","B"],["ぶ","bu","B"],["べ","be","B"],["ぼ","bo","B"],
];
const H_HANDAKUON: [string, string, string][] = [
  ["ぱ","pa","P"],["ぴ","pi","P"],["ぷ","pu","P"],["ぺ","pe","P"],["ぽ","po","P"],
];
const H_YOON: [string, string, string][] = [
  ["きゃ","kya","KY"],["きゅ","kyu","KY"],["きょ","kyo","KY"],
  ["しゃ","sha","SH"],["しゅ","shu","SH"],["しょ","sho","SH"],
  ["ちゃ","cha","CH"],["ちゅ","chu","CH"],["ちょ","cho","CH"],
  ["にゃ","nya","NY"],["にゅ","nyu","NY"],["にょ","nyo","NY"],
  ["ひゃ","hya","HY"],["ひゅ","hyu","HY"],["ひょ","hyo","HY"],
  ["みゃ","mya","MY"],["みゅ","myu","MY"],["みょ","myo","MY"],
  ["りゃ","rya","RY"],["りゅ","ryu","RY"],["りょ","ryo","RY"],
  ["ぎゃ","gya","GY"],["ぎゅ","gyu","GY"],["ぎょ","gyo","GY"],
  ["じゃ","ja","JY"],["じゅ","ju","JY"],["じょ","jo","JY"],
  ["びゃ","bya","BY"],["びゅ","byu","BY"],["びょ","byo","BY"],
  ["ぴゃ","pya","PY"],["ぴゅ","pyu","PY"],["ぴょ","pyo","PY"],
];

// ---------- KATAKANA ----------
const K_BASIC: [string, string, string][] = [
  ["ア","a","A"],["イ","i","A"],["ウ","u","A"],["エ","e","A"],["オ","o","A"],
  ["カ","ka","K"],["キ","ki","K"],["ク","ku","K"],["ケ","ke","K"],["コ","ko","K"],
  ["サ","sa","S"],["シ","shi","S"],["ス","su","S"],["セ","se","S"],["ソ","so","S"],
  ["タ","ta","T"],["チ","chi","T"],["ツ","tsu","T"],["テ","te","T"],["ト","to","T"],
  ["ナ","na","N"],["ニ","ni","N"],["ヌ","nu","N"],["ネ","ne","N"],["ノ","no","N"],
  ["ハ","ha","H"],["ヒ","hi","H"],["フ","fu","H"],["ヘ","he","H"],["ホ","ho","H"],
  ["マ","ma","M"],["ミ","mi","M"],["ム","mu","M"],["メ","me","M"],["モ","mo","M"],
  ["ヤ","ya","Y"],["ユ","yu","Y"],["ヨ","yo","Y"],
  ["ラ","ra","R"],["リ","ri","R"],["ル","ru","R"],["レ","re","R"],["ロ","ro","R"],
  ["ワ","wa","W"],["ヲ","wo","W"],["ン","n","N"],
];
const K_DAKUON: [string, string, string][] = [
  ["ガ","ga","G"],["ギ","gi","G"],["グ","gu","G"],["ゲ","ge","G"],["ゴ","go","G"],
  ["ザ","za","Z"],["ジ","ji","Z"],["ズ","zu","Z"],["ゼ","ze","Z"],["ゾ","zo","Z"],
  ["ダ","da","D"],["ヂ","ji","D"],["ヅ","zu","D"],["デ","de","D"],["ド","do","D"],
  ["バ","ba","B"],["ビ","bi","B"],["ブ","bu","B"],["ベ","be","B"],["ボ","bo","B"],
];
const K_HANDAKUON: [string, string, string][] = [
  ["パ","pa","P"],["ピ","pi","P"],["プ","pu","P"],["ペ","pe","P"],["ポ","po","P"],
];
const K_YOON: [string, string, string][] = [
  ["キャ","kya","KY"],["キュ","kyu","KY"],["キョ","kyo","KY"],
  ["シャ","sha","SH"],["シュ","shu","SH"],["ショ","sho","SH"],
  ["チャ","cha","CH"],["チュ","chu","CH"],["チョ","cho","CH"],
  ["ニャ","nya","NY"],["ニュ","nyu","NY"],["ニョ","nyo","NY"],
  ["ヒャ","hya","HY"],["ヒュ","hyu","HY"],["ヒョ","hyo","HY"],
  ["ミャ","mya","MY"],["ミュ","myu","MY"],["ミョ","myo","MY"],
  ["リャ","rya","RY"],["リュ","ryu","RY"],["リョ","ryo","RY"],
  ["ギャ","gya","GY"],["ギュ","gyu","GY"],["ギョ","gyo","GY"],
  ["ジャ","ja","JY"],["ジュ","ju","JY"],["ジョ","jo","JY"],
  ["ビャ","bya","BY"],["ビュ","byu","BY"],["ビョ","byo","BY"],
  ["ピャ","pya","PY"],["ピュ","pyu","PY"],["ピョ","pyo","PY"],
];

const toLetters = (data: [string,string,string][]): Letter[] =>
  data.map(([c,r,g]) => ({ char: c, romaji: r, group: g }));

// ---------- KANJI (by JLPT level) ----------
type KanjiTuple = [string, string, string, string, string, [string,string,string][]];
// [char, onyomi, kunyomi, romaji, meaningPT, examples]

const KJ_N5: KanjiTuple[] = [
  ["日","nichi/jitsu","hi/-ka","hi / nichi","dia / sol",[["日本","nihon","Japão"],["日曜日","nichiyoubi","Domingo"]]],
  ["月","getsu/gatsu","tsuki","tsuki / getsu","lua / mês",[["月曜日","getsuyoubi","Segunda"],["一月","ichigatsu","Janeiro"]]],
  ["火","ka","hi","hi / ka","fogo",[["火曜日","kayoubi","Terça"],["火山","kazan","Vulcão"]]],
  ["水","sui","mizu","mizu / sui","água",[["水曜日","suiyoubi","Quarta"],["水","mizu","Água"]]],
  ["木","boku/moku","ki","ki / moku","árvore",[["木曜日","mokuyoubi","Quinta"],["木","ki","Árvore"]]],
  ["金","kin/kon","kane","kane / kin","ouro / dinheiro",[["金曜日","kinyoubi","Sexta"],["お金","okane","Dinheiro"]]],
  ["土","do/to","tsuchi","tsuchi / do","terra",[["土曜日","doyoubi","Sábado"]]],
  ["山","san","yama","yama","montanha",[["富士山","fujisan","Monte Fuji"]]],
  ["川","sen","kawa","kawa","rio",[["川","kawa","Rio"]]],
  ["人","jin/nin","hito","hito / jin","pessoa",[["日本人","nihonjin","Japonês"],["三人","sannin","Três pessoas"]]],
  ["口","kou","kuchi","kuchi","boca",[["入口","iriguchi","Entrada"]]],
  ["目","moku","me","me","olho",[["目","me","Olho"]]],
  ["手","shu","te","te","mão",[["手紙","tegami","Carta"]]],
  ["足","soku","ashi","ashi","pé / perna",[["足","ashi","Pé"]]],
  ["大","dai/tai","oo","dai / oo","grande",[["大学","daigaku","Universidade"]]],
  ["中","chuu","naka","chuu / naka","meio / dentro",[["中国","chuugoku","China"]]],
  ["小","shou","chii","shou / chii","pequeno",[["小学校","shougakkou","Escola primária"]]],
  ["上","jou","ue","ue / jou","acima",[["上","ue","Em cima"]]],
  ["下","ka/ge","shita","shita / ka","abaixo",[["下","shita","Embaixo"]]],
  ["一","ichi","hito","ichi","um",[["一","ichi","1"]]],
  ["二","ni","futa","ni","dois",[["二","ni","2"]]],
  ["三","san","mi","san","três",[["三","san","3"]]],
  ["四","shi","yon","shi / yon","quatro",[["四","yon","4"]]],
  ["五","go","itsu","go","cinco",[["五","go","5"]]],
  ["六","roku","mu","roku","seis",[["六","roku","6"]]],
  ["七","shichi","nana","shichi / nana","sete",[["七","nana","7"]]],
  ["八","hachi","ya","hachi","oito",[["八","hachi","8"]]],
  ["九","kyuu/ku","kokono","kyuu","nove",[["九","kyuu","9"]]],
  ["十","juu","too","juu","dez",[["十","juu","10"]]],
  ["百","hyaku","-","hyaku","cem",[["百","hyaku","100"]]],
  ["千","sen","chi","sen","mil",[["千","sen","1000"]]],
  ["万","man/ban","-","man","dez mil",[["一万","ichiman","10.000"]]],
  ["円","en","-","en","iene / círculo",[["百円","hyakuen","100 ienes"]]],
  ["時","ji","toki","ji","hora / tempo",[["時間","jikan","Tempo"]]],
  ["分","bun/fun","wa","fun / bun","minuto / parte",[["三分","sanpun","3 minutos"]]],
  ["年","nen","toshi","nen","ano",[["今年","kotoshi","Este ano"]]],
  ["今","kon","ima","ima","agora",[["今日","kyou","Hoje"]]],
  ["何","ka","nani","nani","o quê",[["何","nani","O quê"]]],
  ["前","zen","mae","mae","frente / antes",[["前","mae","Antes"]]],
  ["後","go/kou","ushiro","ato / ushiro","atrás / depois",[["午後","gogo","Tarde"]]],
  ["行","kou","i-ku","iku","ir",[["行く","iku","Ir"]]],
  ["来","rai","ku-ru","kuru","vir",[["来る","kuru","Vir"]]],
  ["食","shoku","ta-beru","taberu","comer",[["食べる","taberu","Comer"]]],
  ["飲","in","no-mu","nomu","beber",[["飲む","nomu","Beber"]]],
  ["見","ken","mi-ru","miru","ver",[["見る","miru","Ver"]]],
  ["聞","bun","ki-ku","kiku","ouvir / perguntar",[["聞く","kiku","Ouvir"]]],
];

const KJ_N4: KanjiTuple[] = [
  ["会","kai","a-u","au","encontrar",[["会う","au","Encontrar"],["会社","kaisha","Empresa"]]],
  ["社","sha","yashiro","sha","empresa / santuário",[["会社","kaisha","Empresa"]]],
  ["場","jou","ba","ba","lugar",[["場所","basho","Lugar"]]],
  ["家","ka","ie","ie / ka","casa",[["家","ie","Casa"]]],
  ["近","kin","chika","chikai","perto",[["近く","chikaku","Perto"]]],
  ["遠","en","too-i","tooi","longe",[["遠い","tooi","Longe"]]],
  ["自","ji","mizuka","ji","próprio",[["自分","jibun","Eu mesmo"]]],
  ["分","bun","wa-karu","wakaru","entender",[["分かる","wakaru","Entender"]]],
  ["買","bai","ka-u","kau","comprar",[["買う","kau","Comprar"]]],
  ["売","bai","u-ru","uru","vender",[["売る","uru","Vender"]]],
  ["読","doku","yo-mu","yomu","ler",[["読む","yomu","Ler"]]],
  ["書","sho","ka-ku","kaku","escrever",[["書く","kaku","Escrever"]]],
  ["話","wa","hana-su","hanasu","falar",[["話す","hanasu","Falar"]]],
  ["歩","ho","aru-ku","aruku","andar",[["歩く","aruku","Andar"]]],
  ["走","sou","hashi-ru","hashiru","correr",[["走る","hashiru","Correr"]]],
  ["立","ritsu","ta-tsu","tatsu","ficar em pé",[["立つ","tatsu","Ficar em pé"]]],
  ["起","ki","o-kiru","okiru","levantar",[["起きる","okiru","Levantar"]]],
  ["寝","shin","ne-ru","neru","dormir",[["寝る","neru","Dormir"]]],
  ["休","kyuu","yasu-mu","yasumu","descansar",[["休む","yasumu","Descansar"]]],
  ["働","dou","hatara-ku","hataraku","trabalhar",[["働く","hataraku","Trabalhar"]]],
  ["朝","chou","asa","asa","manhã",[["朝","asa","Manhã"]]],
  ["昼","chuu","hiru","hiru","meio-dia",[["昼","hiru","Almoço"]]],
  ["夜","ya","yoru","yoru","noite",[["夜","yoru","Noite"]]],
  ["春","shun","haru","haru","primavera",[["春","haru","Primavera"]]],
  ["夏","ka","natsu","natsu","verão",[["夏","natsu","Verão"]]],
  ["秋","shuu","aki","aki","outono",[["秋","aki","Outono"]]],
  ["冬","tou","fuyu","fuyu","inverno",[["冬","fuyu","Inverno"]]],
  ["兄","kei","ani","ani","irmão mais velho",[["兄","ani","Irmão"]]],
  ["姉","shi","ane","ane","irmã mais velha",[["姉","ane","Irmã"]]],
  ["弟","tei/dai","otouto","otouto","irmão mais novo",[["弟","otouto","Irmão menor"]]],
  ["妹","mai","imouto","imouto","irmã mais nova",[["妹","imouto","Irmã menor"]]],
  ["父","fu","chichi","chichi","pai",[["父","chichi","Pai"]]],
  ["母","bo","haha","haha","mãe",[["母","haha","Mãe"]]],
];

const KJ_N3: KanjiTuple[] = [
  ["政","sei","matsurigoto","sei","política",[["政治","seiji","Política"]]],
  ["治","chi/ji","osa-meru","chi","governar",[["政治","seiji","Política"]]],
  ["経","kei","he-ru","kei","passar / gerenciar",[["経済","keizai","Economia"]]],
  ["済","sai","su-mu","sai","concluir",[["経済","keizai","Economia"]]],
  ["社","sha","yashiro","sha","sociedade",[["社会","shakai","Sociedade"]]],
  ["会","kai","a-u","kai","reunião",[["社会","shakai","Sociedade"]]],
  ["歴","reki","-","reki","histórico",[["歴史","rekishi","História"]]],
  ["史","shi","-","shi","história",[["歴史","rekishi","História"]]],
  ["文","bun","fumi","bun","texto",[["文化","bunka","Cultura"]]],
  ["化","ka","ba-keru","ka","mudar",[["文化","bunka","Cultura"]]],
  ["科","ka","-","ka","ciência",[["科学","kagaku","Ciência"]]],
  ["学","gaku","mana-bu","gaku","estudar",[["学校","gakkou","Escola"]]],
  ["医","i","-","i","medicina",[["医者","isha","Médico"]]],
  ["者","sha","mono","sha","pessoa",[["医者","isha","Médico"]]],
  ["問","mon","to-u","mon","perguntar",[["問題","mondai","Problema"]]],
  ["題","dai","-","dai","tópico",[["問題","mondai","Problema"]]],
  ["答","tou","kota-eru","kotaeru","responder",[["答える","kotaeru","Responder"]]],
  ["説","setsu","to-ku","setsu","explicar",[["説明","setsumei","Explicação"]]],
  ["明","mei","aka-rui","mei","claro",[["説明","setsumei","Explicação"]]],
  ["感","kan","-","kan","sentir",[["感じる","kanjiru","Sentir"]]],
  ["情","jou","nasa-ke","jou","emoção",[["感情","kanjou","Emoção"]]],
  ["意","i","-","i","significado",[["意味","imi","Significado"]]],
  ["味","mi","aji","mi","sabor",[["意味","imi","Significado"]]],
  ["予","yo","-","yo","antes",[["予定","yotei","Programação"]]],
  ["定","tei","sada-meru","tei","fixar",[["予定","yotei","Programação"]]],
];

const KJ_N2: KanjiTuple[] = [
  ["普","fu","-","fu","comum",[["普通","futsuu","Normal"]]],
  ["通","tsuu","too-ru","tsuu","passar",[["普通","futsuu","Normal"]]],
  ["絶","zetsu","ta-eru","zetsu","cortar / absoluto",[["絶対","zettai","Absolutamente"]]],
  ["対","tai","-","tai","contra / par",[["絶対","zettai","Absolutamente"]]],
  ["確","kaku","tashi-ka","kaku","certo",[["確認","kakunin","Confirmação"]]],
  ["認","nin","mito-meru","nin","reconhecer",[["確認","kakunin","Confirmação"]]],
  ["環","kan","-","kan","circular",[["環境","kankyou","Ambiente"]]],
  ["境","kyou","sakai","kyou","fronteira",[["環境","kankyou","Ambiente"]]],
  ["政","sei","-","sei","governo",[["政府","seifu","Governo"]]],
  ["府","fu","-","fu","governo local",[["政府","seifu","Governo"]]],
  ["険","ken","-","ken","perigo",[["危険","kiken","Perigoso"]]],
  ["危","ki","abu-nai","ki","perigo",[["危険","kiken","Perigoso"]]],
  ["経","kei","-","kei","gerenciar",[["経営","keiei","Gestão"]]],
  ["営","ei","itona-mu","ei","operar",[["経営","keiei","Gestão"]]],
  ["努","do","tsuto-meru","do","esforçar-se",[["努力","doryoku","Esforço"]]],
  ["力","ryoku/riki","chikara","chikara","força",[["努力","doryoku","Esforço"]]],
];

const KJ_N1: KanjiTuple[] = [
  ["曖","ai","-","ai","obscuro",[["曖昧","aimai","Ambíguo"]]],
  ["昧","mai","-","mai","escuro",[["曖昧","aimai","Ambíguo"]]],
  ["矛","mu","hoko","mu","lança",[["矛盾","mujun","Contradição"]]],
  ["盾","jun","tate","jun","escudo",[["矛盾","mujun","Contradição"]]],
  ["妥","da","-","da","apropriado",[["妥協","dakyou","Compromisso"]]],
  ["協","kyou","-","kyou","cooperação",[["妥協","dakyou","Compromisso"]]],
  ["憂","yuu","ure-eru","yuu","preocupar",[["憂鬱","yuuutsu","Melancolia"]]],
  ["鬱","utsu","-","utsu","depressão",[["憂鬱","yuuutsu","Melancolia"]]],
  ["繊","sen","-","sen","fino",[["繊細","sensai","Delicado"]]],
  ["細","sai","hoso-i","sai","fino",[["繊細","sensai","Delicado"]]],
  ["崇","suu","aga-meru","suu","adorar",[["崇拝","suuhai","Adoração"]]],
  ["拝","hai","oga-mu","hai","reverenciar",[["崇拝","suuhai","Adoração"]]],
];

const kanjiFrom = (data: KanjiTuple[], group: string): Letter[] =>
  data.map(([c,on,kun,r,mean,ex]) => ({
    char: c, romaji: r, group,
    onyomi: on, kunyomi: kun, meaning: mean,
    examples: ex.map(([w,rd,tr]) => ({ word: w, reading: rd, translation: tr })),
  }));

// ---------- CATEGORIES ----------
export type CategoryId =
  | "basic" | "dakuon" | "handakuon" | "yoon"
  | "n5" | "n4" | "n3" | "n2" | "n1";

export interface Category {
  id: CategoryId;
  label: string;
  description: string;
  icon: string;
  letters: Letter[];
  minLevel: "iniciante" | "basico" | "intermediario" | "avancado";
}

export const CATEGORIES: Record<AlphabetSystem, Category[]> = {
  hiragana: [
    { id: "basic", label: "Hiragana Básico", description: "46 caracteres fundamentais", icon: "あ", letters: toLetters(H_BASIC), minLevel: "iniciante" },
    { id: "dakuon", label: "Dakuon", description: "が ぎ ぐ げ ご...", icon: "が", letters: toLetters(H_DAKUON), minLevel: "basico" },
    { id: "handakuon", label: "Handakuon", description: "ぱ ぴ ぷ ぺ ぽ", icon: "ぱ", letters: toLetters(H_HANDAKUON), minLevel: "basico" },
    { id: "yoon", label: "Yōon", description: "きゃ きゅ きょ...", icon: "きゃ", letters: toLetters(H_YOON), minLevel: "intermediario" },
  ],
  katakana: [
    { id: "basic", label: "Katakana Básico", description: "46 caracteres fundamentais", icon: "ア", letters: toLetters(K_BASIC), minLevel: "iniciante" },
    { id: "dakuon", label: "Dakuon", description: "ガ ギ グ ゲ ゴ...", icon: "ガ", letters: toLetters(K_DAKUON), minLevel: "basico" },
    { id: "handakuon", label: "Handakuon", description: "パ ピ プ ペ ポ", icon: "パ", letters: toLetters(K_HANDAKUON), minLevel: "basico" },
    { id: "yoon", label: "Yōon", description: "キャ キュ キョ...", icon: "キャ", letters: toLetters(K_YOON), minLevel: "intermediario" },
  ],
  kanji: [
    { id: "n5", label: "Kanji N5", description: "Nível iniciante JLPT", icon: "五", letters: kanjiFrom(KJ_N5, "N5"), minLevel: "iniciante" },
    { id: "n4", label: "Kanji N4", description: "Nível básico JLPT", icon: "四", letters: kanjiFrom(KJ_N4, "N4"), minLevel: "basico" },
    { id: "n3", label: "Kanji N3", description: "Nível intermediário JLPT", icon: "三", letters: kanjiFrom(KJ_N3, "N3"), minLevel: "intermediario" },
    { id: "n2", label: "Kanji N2", description: "Nível avançado JLPT", icon: "二", letters: kanjiFrom(KJ_N2, "N2"), minLevel: "avancado" },
    { id: "n1", label: "Kanji N1", description: "Nível máximo JLPT", icon: "一", letters: kanjiFrom(KJ_N1, "N1"), minLevel: "avancado" },
  ],
};

const LEVEL_ORDER = ["iniciante","basico","intermediario","avancado"] as const;
export function normalizeUserLevel(l: string | null | undefined): typeof LEVEL_ORDER[number] {
  const v = (l ?? "iniciante").toLowerCase();
  if (v.startsWith("bás") || v === "basico") return "basico";
  if (v.startsWith("int")) return "intermediario";
  if (v.startsWith("av")) return "avancado";
  return "iniciante";
}
export function categoriesForLevel(system: AlphabetSystem, userLevel: string | null | undefined): Category[] {
  const lv = normalizeUserLevel(userLevel);
  const idx = LEVEL_ORDER.indexOf(lv);
  return CATEGORIES[system].filter((c) => LEVEL_ORDER.indexOf(c.minLevel) <= idx);
}

// Backwards-compat: full letter list per system (used by lessons.ts etc.)
export const ALPHABETS: Record<AlphabetSystem, Letter[]> = {
  hiragana: CATEGORIES.hiragana.flatMap((c) => c.letters),
  katakana: CATEGORIES.katakana.flatMap((c) => c.letters),
  kanji: CATEGORIES.kanji.flatMap((c) => c.letters),
};

export const ALPHABET_META: Record<AlphabetSystem, { label: string; icon: string; description: string }> = {
  hiragana: { label: "Hiragana", icon: "あ", description: "Alfabeto fonético básico" },
  katakana: { label: "Katakana", icon: "ア", description: "Usado para palavras estrangeiras" },
  kanji: { label: "Kanji", icon: "漢", description: "Ideogramas de origem chinesa" },
};

export const VOCAB: Record<AlphabetSystem, Vocab[]> = {
  hiragana: [
    { word: "おはよう", reading: "ohayou", translation: "Bom dia" },
    { word: "こんにちは", reading: "konnichiwa", translation: "Olá" },
    { word: "こんばんは", reading: "konbanwa", translation: "Boa noite" },
    { word: "ありがとう", reading: "arigatou", translation: "Obrigado" },
    { word: "さようなら", reading: "sayounara", translation: "Tchau" },
    { word: "すみません", reading: "sumimasen", translation: "Desculpe" },
    { word: "ねこ", reading: "neko", translation: "Gato" },
    { word: "いぬ", reading: "inu", translation: "Cachorro" },
  ],
  katakana: [
    { word: "コーヒー", reading: "koohii", translation: "Café" },
    { word: "テレビ", reading: "terebi", translation: "TV" },
    { word: "パン", reading: "pan", translation: "Pão" },
    { word: "ホテル", reading: "hoteru", translation: "Hotel" },
    { word: "タクシー", reading: "takushii", translation: "Táxi" },
    { word: "アイス", reading: "aisu", translation: "Sorvete" },
    { word: "ジュース", reading: "juusu", translation: "Suco" },
    { word: "カメラ", reading: "kamera", translation: "Câmera" },
  ],
  kanji: [
    { word: "日本", reading: "nihon", translation: "Japão" },
    { word: "水", reading: "mizu", translation: "Água" },
    { word: "山", reading: "yama", translation: "Montanha" },
    { word: "川", reading: "kawa", translation: "Rio" },
    { word: "人", reading: "hito", translation: "Pessoa" },
    { word: "大人", reading: "otona", translation: "Adulto" },
    { word: "小学生", reading: "shougakusei", translation: "Aluno primário" },
    { word: "一日", reading: "ichinichi", translation: "Um dia" },
  ],
};
