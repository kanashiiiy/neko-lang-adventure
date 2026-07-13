// Japanese alphabet data — hiragana, katakana, kanji
export type AlphabetSystem = "hiragana" | "katakana" | "kanji";

export interface Letter {
  char: string;
  romaji: string;
  group: string; // "A", "K", "S", etc
}

export interface Vocab {
  word: string;
  reading?: string;
  translation: string;
}

const HIRAGANA_DATA: [string, string, string][] = [
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

const KATAKANA_DATA: [string, string, string][] = [
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

const KANJI_DATA: [string, string, string][] = [
  ["日","hi / nichi","Básico"],["月","tsuki / getsu","Básico"],["火","hi / ka","Básico"],
  ["水","mizu / sui","Básico"],["木","ki / moku","Básico"],["金","kane / kin","Básico"],
  ["土","tsuchi / do","Básico"],["山","yama","Natureza"],["川","kawa","Natureza"],
  ["田","ta","Natureza"],["人","hito / jin","Pessoas"],["口","kuchi","Pessoas"],
  ["目","me","Pessoas"],["手","te","Pessoas"],["足","ashi","Pessoas"],
  ["大","dai / oo","Tamanho"],["中","naka / chuu","Tamanho"],["小","chii / shou","Tamanho"],
  ["上","ue / jou","Posição"],["下","shita / ka","Posição"],["左","hidari","Posição"],
  ["右","migi","Posição"],["前","mae","Posição"],["後","ushiro","Posição"],
  ["一","ichi","Números"],["二","ni","Números"],["三","san","Números"],
  ["四","shi","Números"],["五","go","Números"],["六","roku","Números"],
  ["七","shichi","Números"],["八","hachi","Números"],["九","kyuu","Números"],
  ["十","juu","Números"],["百","hyaku","Números"],["千","sen","Números"],
];

export const ALPHABETS: Record<AlphabetSystem, Letter[]> = {
  hiragana: HIRAGANA_DATA.map(([c, r, g]) => ({ char: c, romaji: r, group: g })),
  katakana: KATAKANA_DATA.map(([c, r, g]) => ({ char: c, romaji: r, group: g })),
  kanji: KANJI_DATA.map(([c, r, g]) => ({ char: c, romaji: r, group: g })),
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
