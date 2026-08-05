export type WelcomeLang = "en" | "ja" | "fr" | "es" | "ko";

export const WELCOME_EXTRA: Record<WelcomeLang, Record<string, string>> = {
  en: {
    "Bem-vindo ao NEKOTeach!": "Welcome to NEKOTeach!",
    "Aprenda idiomas de forma divertida com a Neko.": "Learn languages in a fun way with Neko.",
    "Já tenho uma conta": "I already have an account",
    "Sou novo": "I'm new here",
  },
  ja: {
    "Bem-vindo ao NEKOTeach!": "NEKOTeachへようこそ！",
    "Aprenda idiomas de forma divertida com a Neko.": "ネコと一緒に楽しく語学を学ぼう。",
    "Já tenho uma conta": "アカウントを持っています",
    "Sou novo": "はじめての方",
  },
  fr: {
    "Bem-vindo ao NEKOTeach!": "Bienvenue sur NEKOTeach !",
    "Aprenda idiomas de forma divertida com a Neko.": "Apprends les langues en t'amusant avec Neko.",
    "Já tenho uma conta": "J'ai déjà un compte",
    "Sou novo": "Je suis nouveau",
  },
  es: {
    "Bem-vindo ao NEKOTeach!": "¡Bienvenido a NEKOTeach!",
    "Aprenda idiomas de forma divertida com a Neko.": "Aprende idiomas de forma divertida con Neko.",
    "Já tenho uma conta": "Ya tengo una cuenta",
    "Sou novo": "Soy nuevo",
  },
  ko: {
    "Bem-vindo ao NEKOTeach!": "NEKOTeach에 오신 것을 환영해요!",
    "Aprenda idiomas de forma divertida com a Neko.": "네코와 함께 즐겁게 언어를 배워요.",
    "Já tenho uma conta": "이미 계정이 있어요",
    "Sou novo": "처음이에요",
  },
};
