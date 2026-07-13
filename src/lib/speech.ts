// Browser Web Speech API helpers — TTS + speech recognition
export function speak(text: string, lang = "ja-JP") {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
  try {
    const synth = window.speechSynthesis;
    synth.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = lang;
    u.rate = 0.9;
    u.pitch = 1;
    synth.speak(u);
  } catch {
    // ignore
  }
}

export function speakForLang(text: string, code: "pt" | "ja" | "en") {
  const map = { pt: "pt-BR", ja: "ja-JP", en: "en-US" } as const;
  speak(text, map[code]);
}

interface RecognitionResult { transcript: string; confidence: number }

// Minimal type surface for the browser SpeechRecognition
type RecognitionCtor = new () => {
  lang: string;
  interimResults: boolean;
  maxAlternatives: number;
  continuous: boolean;
  onresult: ((e: { results: ArrayLike<ArrayLike<{ transcript: string; confidence: number }>> }) => void) | null;
  onerror: ((e: unknown) => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
  abort: () => void;
};

export function getRecognition(lang = "ja-JP") {
  if (typeof window === "undefined") return null;
  const w = window as unknown as { SpeechRecognition?: RecognitionCtor; webkitSpeechRecognition?: RecognitionCtor };
  const Ctor = w.SpeechRecognition || w.webkitSpeechRecognition;
  if (!Ctor) return null;
  const rec = new Ctor();
  rec.lang = lang;
  rec.interimResults = false;
  rec.maxAlternatives = 3;
  rec.continuous = false;
  return rec;
}

export function isRecognitionSupported() {
  if (typeof window === "undefined") return false;
  const w = window as unknown as { SpeechRecognition?: unknown; webkitSpeechRecognition?: unknown };
  return !!(w.SpeechRecognition || w.webkitSpeechRecognition);
}

export function normalize(s: string) {
  return s.toLowerCase().normalize("NFC").replace(/[\s\p{P}]/gu, "").trim();
}

export function matchSpeech(expected: string, results: RecognitionResult[]) {
  const target = normalize(expected);
  return results.some((r) => {
    const t = normalize(r.transcript);
    return t === target || t.includes(target) || target.includes(t);
  });
}
