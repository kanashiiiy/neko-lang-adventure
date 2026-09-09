// Nomes de país usados nos exemplos dinâmicos dos Diálogos do Dia a Dia.
// O país vem do perfil do usuário (cadastro ou edição do perfil).

import type { LearnLang } from "@/lib/dialogs";

export interface CountryNames {
  flag: string;
  /** Nome do país em cada idioma de estudo. */
  name: Record<LearnLang, string>;
  /** Romanização japonesa do nome do país. */
  romaji: string;
  /** Forma com preposição em português: "do Brasil", "de Portugal"... */
  ptFrom: string;
}

export const COUNTRY_NAMES: Record<string, CountryNames> = {
  Brasil: {
    flag: "🇧🇷",
    name: { pt: "Brasil", en: "Brazil", ja: "ブラジル" },
    romaji: "Burajiru",
    ptFrom: "do Brasil",
  },
  Portugal: {
    flag: "🇵🇹",
    name: { pt: "Portugal", en: "Portugal", ja: "ポルトガル" },
    romaji: "Porutogaru",
    ptFrom: "de Portugal",
  },
  "Estados Unidos": {
    flag: "🇺🇸",
    name: { pt: "Estados Unidos", en: "the United States", ja: "アメリカ" },
    romaji: "Amerika",
    ptFrom: "dos Estados Unidos",
  },
  "Japão": {
    flag: "🇯🇵",
    name: { pt: "Japão", en: "Japan", ja: "日本" },
    romaji: "Nihon",
    ptFrom: "do Japão",
  },
  "Coreia do Sul": {
    flag: "🇰🇷",
    name: { pt: "Coreia do Sul", en: "South Korea", ja: "韓国" },
    romaji: "Kankoku",
    ptFrom: "da Coreia do Sul",
  },
  "França": {
    flag: "🇫🇷",
    name: { pt: "França", en: "France", ja: "フランス" },
    romaji: "Furansu",
    ptFrom: "da França",
  },
  Espanha: {
    flag: "🇪🇸",
    name: { pt: "Espanha", en: "Spain", ja: "スペイン" },
    romaji: "Supein",
    ptFrom: "da Espanha",
  },
};

/** Usado quando o perfil ainda não tem país ou escolheu "Outro". */
const FALLBACK: CountryNames = {
  flag: "🌎",
  name: { pt: "meu país", en: "my country", ja: "私の国" },
  romaji: "watashi no kuni",
  ptFrom: "do meu país",
};

export function countryNames(country?: string | null): CountryNames {
  if (!country) return FALLBACK;
  return COUNTRY_NAMES[country] ?? FALLBACK;
}

/**
 * Substitui os marcadores de país nos textos dos diálogos.
 * {PAIS} nome no idioma do texto, {PAIS_DE} forma com preposição (pt),
 * {PAIS_ROMAJI} romanização japonesa.
 */
export function applyCountry(text: string, lang: LearnLang, country?: string | null): string {
  const c = countryNames(country);
  return text
    .replaceAll("{PAIS_ROMAJI}", c.romaji)
    .replaceAll("{PAIS_DE}", c.ptFrom)
    .replaceAll("{PAIS}", c.name[lang]);
}

/** Versão para a linha de romanização (sempre romaji). */
export function applyCountryRomaji(text: string, country?: string | null): string {
  const c = countryNames(country);
  return text.replaceAll("{PAIS_ROMAJI}", c.romaji).replaceAll("{PAIS}", c.romaji).replaceAll("{PAIS_DE}", c.romaji);
}
