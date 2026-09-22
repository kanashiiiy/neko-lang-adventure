function phaseKinds(lang: Language, phaseIdx: number): TaskKind[] {
  // Only Japanese phases 1-5 remove audio-response tasks.
  // Other languages keep their existing task distribution.
  if (lang !== "ja") {
    if (phaseIdx === 0) return ["choose", "choose", "choose", "choose", "listen", "match"];
    if (phaseIdx === 1) return ["choose", "choose", "match", "choose", "listen", "complete"];
    if (phaseIdx === 2) return ["choose", "listen", "choose", "match", "complete", "choose"];
    if (phaseIdx === 3) return ["choose", "choose", "listen", "match", "complete", "choose"];
    if (phaseIdx === 4) return ["choose", "listen", "match", "complete", "choose", "choose"];
  }

  // Japanese phases 1-5 stay visual/written.
  if (phaseIdx === 0) return ["choose", "choose", "choose", "choose", "match", "complete"];
  if (phaseIdx === 1) return ["choose", "choose", "match", "choose", "complete", "choose"];
  if (phaseIdx === 2) return ["choose", "choose", "choose", "match", "complete", "choose"];
  if (phaseIdx === 3) return ["choose", "choose", "match", "complete", "choose", "choose"];
  if (phaseIdx === 4) return ["choose", "match", "complete", "choose", "choose", "choose"];

  // Japanese phases 6-10 use listening only as review of previously learned content.
  if (phaseIdx === 5) return ["choose", "match", "listen", "complete", "build", "choose"];
  if (phaseIdx === 6) return ["choose", "listen", "match", "build", "complete", "choose"];
  if (phaseIdx === 7) return ["choose", "match", "listen", "complete", "build", "choose"];
  if (phaseIdx === 8) return ["choose", "listen", "match", "complete", "build", "choose"];
  return ["choose", "match", "listen", "complete", "build", "choose", "listen"];
}
function phaseKinds(lang: Language, phaseIdx: number): TaskKind[] {
  const base: TaskKind[][] = [
    ["choose","choose","choose","choose","match","complete","choose","match","complete","choose","match","choose","complete","choose","match","complete","choose","choose","match","choose"],
    ["choose","choose","listen","choose","match","complete","choose","listen","match","complete","choose","match","choose","complete","listen","choose","match","complete","choose","match"],
    ["choose","listen","choose","match","complete","choose","listen","match","choose","complete","choose","match","listen","choose","complete","match","choose","listen","complete","match"],
    ["choose","choose","listen","match","complete","choose","match","listen","choose","complete","build","choose","match","complete","listen","build","choose","match","complete","choose"],
    ["choose","listen","match","complete","choose","build","listen","match","choose","complete","build","choose","listen","match","complete","build","choose","match","listen","choose"],
    ["choose","match","listen","complete","build","choose","listen","match","complete","build","choose","listen","match","complete","build","choose","match","listen","complete","build"],
    ["choose","listen","match","build","complete","choose","build","listen","match","complete","choose","match","build","listen","complete","choose","build","match","listen","complete"],
    ["choose","match","listen","complete","build","choose","listen","build","match","complete","choose","match","listen","build","complete","choose","build","match","listen","complete"],
    ["choose","listen","match","build","complete","choose","match","listen","build","complete","choose","build","match","listen","complete","build","choose","match","listen","complete"],
    ["choose","match","listen","build","complete","choose","listen","match","build","complete","choose","match","listen","build","complete","choose","build","match","listen","complete"],
  ];
  const pattern = base[Math.min(phaseIdx, base.length - 1)];
  if (lang === "ja" && phaseIdx < 5) {
    return pattern.map((kind) => kind === "listen" ? "choose" : kind);
  }
  return pattern;
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
    audio: item[0],
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
  const japanese = lang === "ja" && phaseIdx < 10 ? japaneseHiragana(item) : lang === "ja" ? item[0] : undefined;
  const romaji = lang === "ja" ? item[2] : undefined;

  if (kind === "listen") {
    return {
      kind: "listen",
      prompt: translate("Ouça o áudio e escolha o significado correto", ui),
      audio: item[0],
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
      audio: item[0],
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
      audio: item[0],
      answer: item[0],
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
  ["Primeiros cumprimentos","First greetings","最初のあいさつ"],
  ["Despedidas e educação","Goodbyes and politeness","別れと丁寧な表現"],
  ["Nome e apresentação","Names and introductions","名前と自己紹介"],
  ["Como você está?","How are you?","元気ですか"],
  ["Prazer em conhecer","Nice to meet you","はじめまして"],
  ["Perguntas simples","Simple questions","簡単な質問"],
  ["Pequenas conversas","Short conversations","短い会話"],
  ["Situações práticas","Practical situations","実践的な場面"],
  ["Revisão e combinação","Review and combination","復習と組み合わせ"],
  ["Desafio da unidade","Unit challenge","ユニットチャレンジ"],
] as const;

function buildPhase(
  lang: Language,
  phaseIdx: number,
  _level: Level,
  goal: string,
  ui: UiLang,
): Phase {
  const pool = cumulativePool(lang, phaseIdx, goal, _level);
  const unitPhase = UNIT1[lang][phaseIdx] ?? [];

  // Keep lesson generation safe even if a future curriculum phase is empty.
  // Falling back to the last unlocked content prevents an invalid question
  // from reaching the lesson route and breaking the preview at runtime.
  if (pool.length === 0) {
    return buildPhase(lang, Math.max(0, phaseIdx - 1), _level, goal, ui);
  }

  // The current phase may only draw from content unlocked up to this phase.
  // Nothing from a future phase can leak into questions or distractors.
  const pattern = phaseKinds(lang, phaseIdx);
  const questions: Question[] = Array.from({ length: 20 }, (_, index) => {
    const newCount = unitPhase.length;
    const early = unitPhase.length ? unitPhase[index % newCount] : pool[0];
    const cumulative = pool[(index * 2 + phaseIdx) % pool.length];
    const item = index < 5 ? early : index < 10 ? (index % 2 === 0 ? early : cumulative) : cumulative;
    const kind = pattern[index];

    // Build only after short expressions have been unlocked. Earlier phases
    // stay focused on individual words and very small recognition tasks.
    if (kind === "listen") {
      // Listening tasks stay beginner-friendly: only individual words or
      // short two-word expressions already unlocked in the cumulative pool.
      const reviewCurriculum = UNIT1[lang];
      const reviewPool = uniqueByTarget(reviewCurriculum.slice(0, 5).flat());
      const learnedPool = reviewPool.length > 0 ? reviewPool : pool;
      const shortPool = learnedPool.filter((entry) => isShortListenItem(lang, entry));
      const listenItem = shortPool.length > 0
        ? shortPool[index % shortPool.length]
        : item;
      return makeQuestion(lang, listenItem, "listen", phaseIdx, pool, ui, index);
    }

    if (kind === "build" && phaseIdx < 4) {
      return makeQuestion(lang, item, "choose", phaseIdx, pool, ui, index);
    }

    // Never force a build on a one-token item. When a phase has expressions,
    // select a short expression (maximum five tokens) from already unlocked content.
    if (kind === "build") {
      const buildable = pool.filter((entry) => tokenizeBuild(targetText(lang, entry)).length >= 2 && tokenizeBuild(targetText(lang, entry)).length <= 5);
      const buildItem = buildable.length > 0 ? buildable[(index + phaseIdx) % buildable.length] : item;
      return makeQuestion(lang, buildItem, "build", phaseIdx, pool, ui, index);
    }

    return makeQuestion(lang, item, kind, phaseIdx, pool, ui, index);
  });

  return {
    id: `${lang}-phase-${phaseIdx + 1}`,
    title: UNIT1_TITLES[phaseIdx] ? (ui === "en" ? UNIT1_TITLES[phaseIdx][1] : ui === "ja" ? UNIT1_TITLES[phaseIdx][2] : UNIT1_TITLES[phaseIdx][0]) : translateVars("Fase {n}", { n: phaseIdx + 1 }, ui),
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
  return Array.from({ length: 10 }, (_, index) => buildPhase(lang, index, normalizedLevel, goal ?? "outro", ui));
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
