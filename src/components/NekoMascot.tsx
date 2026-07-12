import nekoImg from "@/assets/neko.png";
import { cn } from "@/lib/utils";

interface NekoMascotProps {
  size?: number;
  className?: string;
  float?: boolean;
  bounce?: boolean;
  entrance?: boolean;
}

export function NekoMascot({
  size = 160,
  className,
  float = true,
  bounce = false,
  entrance = true,
}: NekoMascotProps) {
  return (
    <div
      className={cn(
        "inline-block",
        entrance && "animate-neko-enter",
      )}
      style={{ width: size, height: size }}
    >
      <img
        src={nekoImg}
        alt="Neko, o mascote do NEKOTeach"
        width={size}
        height={size}
        style={{ width: size, height: size }}
        className={cn(
          "select-none pointer-events-none drop-shadow-[0_10px_20px_rgba(108,62,255,0.25)]",
          float && "animate-float",
          bounce && "animate-bounce-in",
          className,
        )}
        loading="eager"
      />
    </div>
  );
}

interface NekoBubbleProps {
  children: React.ReactNode;
  size?: number;
  side?: "right" | "left";
}

export function NekoBubble({ children, size = 110, side = "right" }: NekoBubbleProps) {
  return (
    <div className={cn("flex items-end gap-3", side === "left" && "flex-row-reverse")}>
      <NekoMascot size={size} float entrance />
      <div className="relative flex-1 rounded-2xl border-2 border-primary/20 bg-card p-4 shadow-card animate-bubble-in">
        <div className="text-sm leading-relaxed">{children}</div>
      </div>
    </div>
  );
}
