import { createContext, useCallback, useContext, useMemo, useState, type CSSProperties, type ReactNode } from "react";

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
  targetType: RewardType;
}

const RewardAnimationContext = createContext<RewardAnimationContextValue | null>(null);

const ICONS: Record<RewardType, string> = {
  focus: "⚡",
  gems: "💎",
  xp: "⭐",
  special: "🏆",
};

function getTarget(type: RewardType) {
  const el = document.querySelector<HTMLElement>(`[data-reward-counter="${type}"]`);
  if (!el) return null;
  const r = el.getBoundingClientRect();
  return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
}

function getStart(source?: HTMLElement | null) {
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
          className="reward-flight absolute flex h-10 w-10 items-center justify-center rounded-full bg-card text-2xl shadow-card ring-2 ring-gold/40"
          style={{
            left: item.startX - 20,
            top: item.startY - 20,
            "--reward-x": `${item.targetX - item.startX}px`,
            "--reward-y": `${item.targetY - item.startY}px`,
            "--reward-delay": `${item.index * 45}ms`,
          } as CSSProperties}
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
    if (typeof window === "undefined") return Promise.resolve();

    const valid = rewards.filter((r) => r.amount > 0);
    if (!valid.length) return Promise.resolve();

    const start = getStart(source);
    const next: FlyingReward[] = [];
    let id = Date.now();

    for (const reward of valid) {
      const target = getTarget(reward.type);
      if (!target) continue;

      // One visible icon represents one unit of the earned reward.
      const count = Math.max(1, Math.floor(reward.amount));
      for (let i = 0; i < count; i++) {
        next.push({
          ...reward,
          id: id++,
          index: next.length,
          startX: start.x + (Math.random() - 0.5) * 110,
          startY: start.y + (Math.random() - 0.5) * 80,
          targetX: target.x,
          targetY: target.y,
          targetType: reward.type,
        });
      }
    }

    if (!next.length) return Promise.resolve();

    setItems(next);

    const lastDelay = (next.length - 1) * 45;
    const duration = 180 + 850;
    const total = lastDelay + duration + 80;

    return new Promise<void>((resolve) => {
      window.setTimeout(() => {
        setItems([]);

        const targetTypes = new Set(next.map((item) => item.targetType));
        targetTypes.forEach((type) => {
          const el = document.querySelector<HTMLElement>(`[data-reward-counter="${type}"]`);
          if (!el) return;
          el.classList.remove("reward-counter-pulse");
          void el.offsetWidth;
          el.classList.add("reward-counter-pulse");
        });

        resolve();
      }, total);
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
