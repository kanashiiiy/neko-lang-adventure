// Browser Web Speech API helpers — low-latency TTS with voice warm-up/cache
const voiceCache = new Map<string, SpeechSynthesisVoice>();
let voicesReady = false;

function loadVoices() {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
  const voices = window.speechSynthesis.getVoices();
  if (!voices.length) return;
  voicesReady = true;
  for (const v of voices) {
    const base = v.lang.split("-")[0].toLowerCase();
    if (!voiceCache.has(v.lang)) voiceCache.set(v.lang, v);
    if (!voiceCache.has(base)) voiceCache.set(base, v);
  }
}

function ensureVoices() {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
  loadVoices();
  if (!voicesReady) window.speechSynthesis.addEventListener("voiceschanged", loadVoices, { once: true });
}

export function prepareSpeech() {
  ensureVoices();
}

export function speak(text: string, lang = "ja-JP") {
  if (typeof window === "undefined" || !("speechSynthesis" in window) || !text.trim()) return;
  try {
    ensureVoices();
    const synth = window.speechSynthesis;
    synth.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = lang;
    u.rate = 0.95;
    u.pitch = 1;
    const voice = voiceCache.get(lang) ?? voiceCache.get(lang.split("-")[0].toLowerCase());
    if (voice) u.voice = voice;
    // Queue immediately after cancel; a microtask avoids browsers that ignore
    // speak() when called in the same task as cancel().
    queueMicrotask(() => {
      try { synth.speak(u); } catch { /* ignore */ }
    });
  } catch {
    // ignore
  }
}

export function speakForLang(text: string, code: "pt" | "ja" | "en") {
  const map = { pt: "pt-BR", ja: "ja-JP", en: "en-US" } as const;
  speak(text, map[code]);
}

if (typeof window !== "undefined") {
  ensureVoices();
  window.addEventListener("pointerdown", prepareSpeech, { once: true, passive: true });
}

interface RecognitionResult { transcript: string; confidence: number }

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
