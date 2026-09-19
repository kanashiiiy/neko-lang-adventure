export type MissionStats = {
  answered: number;
  correct: number;
  words: number;
  listening: number;
  pronunciation: number;
  perfectLessons: number;
  lessons: number;
};

const KEY = "nekoteach:mission-stats";

function today() { return new Date().toISOString().slice(0, 10); }
function read(): { date: string; stats: MissionStats } {
  try {
    const raw = localStorage.getItem(KEY);
    const parsed = raw ? JSON.parse(raw) : null;
    if (parsed?.date === today() && parsed?.stats) return parsed;
  } catch {}
  return { date: today(), stats: { answered: 0, correct: 0, words: 0, listening: 0, pronunciation: 0, perfectLessons: 0, lessons: 0 } };
}
function write(data: { date: string; stats: MissionStats }) {
  try { localStorage.setItem(KEY, JSON.stringify(data)); } catch {}
}
export function getMissionStats(): MissionStats { return read().stats; }
export function recordTask(kind: "choose" | "listen" | "complete" | "speak", correct: boolean) {
  if (typeof window === "undefined") return;
  const data = read();
  data.stats.answered += 1;
  data.stats.words += 1;
  if (correct) data.stats.correct += 1;
  if (kind === "listen") data.stats.listening += 1;
  if (kind === "speak") data.stats.pronunciation += 1;
  write(data);
}
export function recordLesson(perfect: boolean) {
  if (typeof window === "undefined") return;
  const data = read();
  data.stats.lessons += 1;
  if (perfect) data.stats.perfectLessons += 1;
  write(data);
}
