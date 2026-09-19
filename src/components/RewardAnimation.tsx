import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";

export type RewardType = "focus" | "gems" | "xp" | "special";

export interface RewardAmount {
  type: RewardType;
  amount: number;
}

interface RewardAnimationContextValue {
  collectRewards: (rewards: RewardAmount[], source?: HTMLElement | null) => Promise<void>;
}

interface FlyingReward extends RewardAmount {
  id: number;
  index: number;
  startX: number;
  startY: number;
  targetX: number;
  targetY: number;
}

const RewardAnimationContext = createContext<RewardAnimationContextValue | null>(null);

const ICONS: Record<RewardType, string> = {
  focus: "⚡",
  gems: "💎",
  xp: "⭐",
  special: "🏆",
};

function targetFor(type: RewardType) {
  const el = document.querySelector<HTMLElement>(`[data-reward-counter="${type}"]`);
  if (!el) return { x: window.innerWidth / 2, y: 54 };
  const r = el.getBoundingClientRect();
  return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
}

function sourceFor(source?: HTMLElement | null) {
  if (source) {
    const r = source.getBoundingClientRect();
    return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
  }
  return { x: window.innerWidth / 2, y: window.innerHeight * 0.42 };
}

function RewardLayer({ items }: { items: FlyingReward[] }) {
  return (
    <div className="pointer-events-none fixed inset-0 z-[100] overflow-hidden" aria-hidden="true">
      {items.map((item) => (
        <span
          key={item.id}
          className="reward-flight absolute flex h-11 w-11 items-center justify-center rounded-full bg-card text-2xl shadow-card ring-2 ring-gold/30"
          style={{
            left: item.startX - 22,
            top: item.startY - 22,
            "--reward-x": `${item.targetX - item.startX}px`,
            "--reward-y": `${item.targetY - item.startY}px`,
            "--reward-delay": `${item.index * 55}ms`,
          } as React.CSSProperties}
        >
          {ICONS[item.type]}
        </span>
      ))}
    </div>
  );
}

export function RewardAnimationProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<FlyingReward[]>([]);

  const collectRewards = useCallback((rewards: RewardAmount[], source?: HTMLElement | null) => {
    const valid = rewards.filter((r) => r.amount > 0);
    if (!valid.length || typeof window === "undefined") return Promise.resolve();

    const start = sourceFor(source);
    const next: FlyingReward[] = [];
    let id = Date.now();
    valid.forEach((reward) => {
      const count = Math.min(Math.max(Math.ceil(reward.amount / 2), 1), 12);
      const target = targetFor(reward.type);
      for (let i = 0; i < count; i++) {
        next.push({
          ...reward,
          id: id++,
          index: next.length,
          startX: start.x + (Math.random() - 0.5) * 90,
          startY: start.y + (Math.random() - 0.5) * 70,
          targetX: target.x,
          targetY: target.y,
        });
      }
    });

    setItems(next);
    return new Promise<void>((resolve) => {
      window.setTimeout(() => {
        setItems([]);
        document.querySelectorAll<HTMLElement>("[data-reward-counter]").forEach((el) => {
          el.classList.remove("reward-counter-pulse");
          void el.offsetWidth;
          el.classList.add("reward-counter-pulse");
        });
        resolve();
      }, 1050);
    });
  }, []);

  const value = useMemo(() => ({ collectRewards }), [collectRewards]);

  return (
    <RewardAnimationContext.Provider value={value}>
      {children}
      <RewardLayer items={items} />
    </RewardAnimationContext.Provider>
  );
}

export function useRewardAnimation() {
  const ctx = useContext(RewardAnimationContext);
  if (!ctx) throw new Error("useRewardAnimation must be used inside RewardAnimationProvider");
  return ctx;
}
