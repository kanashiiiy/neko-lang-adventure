import nekoImg from "@/assets/neko.png";
import { cn } from "@/lib/utils";

interface NekoMascotProps {
  size?: number;
  className?: string;
  float?: boolean;
  bounce?: boolean;
}

export function NekoMascot({ size = 160, className, float = true, bounce = false }: NekoMascotProps) {
  return (
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
      <NekoMascot size={size} float bounce />
      <div className="relative flex-1 rounded-2xl border-2 border-primary/20 bg-card p-4 shadow-card">
        <div className="text-sm leading-relaxed">{children}</div>
      </div>
    </div>
  );
}
