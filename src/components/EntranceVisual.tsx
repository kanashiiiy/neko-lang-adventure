import type { ReactNode } from "react";
import { PawPrint, Sparkles } from "lucide-react";

import { NekoMascot } from "@/components/NekoMascot";
import { cn } from "@/lib/utils";

export function EntranceFrame({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <main className={cn("entrance-shell mobile-shell relative isolate overflow-hidden", className)}>
      <div className="entrance-blob entrance-blob-left" aria-hidden="true" />
      <div className="entrance-blob entrance-blob-right" aria-hidden="true" />
      <div className="entrance-blob entrance-blob-bottom" aria-hidden="true" />
      <PawPrint className="entrance-paw entrance-paw-left" aria-hidden="true" />
      <PawPrint className="entrance-paw entrance-paw-right" aria-hidden="true" />
      <Sparkles className="entrance-spark entrance-spark-left" aria-hidden="true" />
      <Sparkles className="entrance-spark entrance-spark-right" aria-hidden="true" />
      <div className="relative z-10 flex min-h-dvh flex-col">{children}</div>
    </main>
  );
}

export function EntranceBrand({
  compact = false,
  greeting,
}: {
  compact?: boolean;
  greeting?: string;
}) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className={cn("relative", compact ? "h-28 w-36" : "h-52 w-64")}>
        {greeting && (
          <div className="entrance-greeting absolute right-0 top-0 z-10" aria-label={greeting}>
            {greeting}
          </div>
        )}
        <div className={cn("absolute bottom-0 left-1/2 -translate-x-1/2", compact ? "scale-[0.72]" : "scale-100")}>
          <NekoMascot size={compact ? 150 : 210} float />
        </div>
      </div>
      <h1 className={cn("font-black leading-none", compact ? "text-[2rem]" : "text-[2.65rem]")}>
        <span className="text-foreground">NEKO</span><span className="entrance-logo-gradient">Teach</span>
      </h1>
      <div className="mt-2 flex items-center gap-2 text-primary/45" aria-hidden="true">
        <span className="h-px w-8 bg-primary/25" />
        <PawPrint className="size-4 fill-primary/20" />
        <span className="h-px w-8 bg-primary/25" />
      </div>
    </div>
  );
}