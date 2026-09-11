import { toast as sonner } from "sonner";

type Kind = "success" | "error" | "info";

// Detecta um emoji no início da mensagem para usá-lo como ícone do cartão
const LEADING_EMOJI =
  /^([\p{Extended_Pictographic}\u{1F1E6}-\u{1F1FF}][\u{FE0F}\u{200D}\p{Extended_Pictographic}]*)\s*/u;

function splitIcon(message: string, kind: Kind) {
  const match = message.match(LEADING_EMOJI);
  if (match) return { icon: match[1], text: message.slice(match[0].length).trim() || message };
  const fallback = kind === "error" ? "😿" : kind === "info" ? "✨" : "🎉";
  return { icon: fallback, text: message };
}

function NekoToastCard({
  message,
  description,
  kind,
}: {
  message: string;
  description?: string;
  kind: Kind;
}) {
  const { icon, text } = splitIcon(message, kind);
  return (
    <div
      className="pointer-events-auto flex w-[min(92vw,22rem)] items-center gap-3 rounded-2xl border border-gold/40 bg-gradient-to-br from-[oklch(0.28_0.09_292)] to-[oklch(0.20_0.06_292)] px-4 py-3 shadow-[0_10px_30px_-8px_oklch(0.2_0.08_292/0.7)] backdrop-blur"
      role="status"
    >
      <span
        className={
          "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-xl " +
          (kind === "error" ? "bg-white/10" : "bg-gold/20")
        }
      >
        {icon}
      </span>
      <div className="min-w-0 flex-1">
        <div className="text-sm font-black leading-snug text-white break-words">{text}</div>
        {description && (
          <div className="mt-0.5 text-xs leading-snug text-white/70 break-words">{description}</div>
        )}
      </div>
      <span
        className={
          "h-8 w-1 shrink-0 rounded-full " + (kind === "error" ? "bg-white/30" : "bg-gold")
        }
      />
    </div>
  );
}

type Opts = { description?: string; duration?: number };

function show(message: string, kind: Kind, opts?: Opts) {
  return sonner.custom(
    () => <NekoToastCard message={message} description={opts?.description} kind={kind} />,
    { duration: opts?.duration ?? (kind === "error" ? 3500 : 2800) },
  );
}

export const toast = Object.assign(
  (message: string, opts?: Opts) => show(message, "info", opts),
  {
    success: (message: string, opts?: Opts) => show(message, "success", opts),
    error: (message: string, opts?: Opts) => show(message, "error", opts),
    info: (message: string, opts?: Opts) => show(message, "info", opts),
    message: (message: string, opts?: Opts) => show(message, "info", opts),
    dismiss: sonner.dismiss,
    custom: sonner.custom,
  },
);
