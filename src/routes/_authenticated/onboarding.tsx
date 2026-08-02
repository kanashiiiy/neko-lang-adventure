import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { NekoBubble } from "@/components/NekoMascot";
import { updateProfile } from "@/lib/profile";
import { supabase } from "@/integrations/supabase/client";
import { PRE_ONBOARDING_KEY } from "@/routes/start";
import { useT } from "@/lib/i18n";

export const Route = createFileRoute("/_authenticated/onboarding")({
  component: OnboardingFinal,
});

function OnboardingFinal() {
  const [name, setName] = useState("");
  const [step, setStep] = useState<"name" | "done">("name");
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();
  const t = useT();

  async function finish() {
    if (name.trim().length < 2) return toast.error(t("Digite seu nome"));

    setSaving(true);
    const { data: userData } = await supabase.auth.getUser();
    if (!userData.user) { setSaving(false); return; }
    let pre: Record<string, unknown> = {};
    try {
      const raw = localStorage.getItem(PRE_ONBOARDING_KEY);
      if (raw) pre = JSON.parse(raw);
    } catch { /* ignore */ }
    try {
      const today = new Date().toISOString().slice(0, 10);
      await updateProfile(userData.user.id, {
        name: name.trim(),
        ...(pre as Record<string, unknown>),
        onboarding_complete: true,
        streak: 1,
        focus: 20,
        gems: 0,
        xp: 0,
        last_activity_date: today,
      } as never);
      localStorage.removeItem(PRE_ONBOARDING_KEY);
      setStep("done");
    } catch {
      toast.error(t("Não conseguimos salvar. Tente novamente."));
    } finally {
      setSaving(false);
    }
  }

  if (step === "done") return <CelebrationStep onContinue={() => navigate({ to: "/home", replace: true })} />;

  return (
    <div className="mobile-shell px-6 pt-10 pb-8">
      <div className="mb-6 h-2 rounded-full bg-muted overflow-hidden">
        <div className="h-full bg-gradient-primary" style={{ width: "100%" }} />
      </div>
      <div className="flex flex-col gap-6">
        <NekoBubble>{t("Bem-vindo(a)! Como posso te chamar?")}</NekoBubble>
        <input
          type="text"
          placeholder={t("Seu nome")}

          value={name}
          onChange={(e) => setName(e.target.value)}
          maxLength={40}
          className="rounded-2xl border-2 border-border bg-card px-4 py-3.5 text-base outline-none focus:border-primary"
        />
      </div>
      <button
        disabled={saving || name.trim().length < 2}
        onClick={finish}
        className="btn-3d mt-8 rounded-2xl bg-primary py-3.5 font-bold text-primary-foreground disabled:opacity-50"
      >
        {saving ? t("Salvando...") : t("Continuar")}
      </button>
    </div>
  );
}

const CONFETTI_COLORS = ["#6C3EFF", "#FFD54A", "#22c55e", "#ec4899", "#38bdf8", "#f97316"];

function CelebrationStep({ onContinue }: { onContinue: () => void }) {
  const t = useT();
  const pieces = Array.from({ length: 40 });

  return (
    <div className="mobile-shell relative flex flex-col items-center justify-center px-6 pt-2 pb-8">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[70vh] overflow-hidden">
        {pieces.map((_, i) => {
          const left = Math.random() * 100;
          const xEnd = (Math.random() - 0.5) * 200;
          const delay = Math.random() * 1.2;
          const duration = 2.4 + Math.random() * 1.8;
          const size = 6 + Math.random() * 8;
          const color = CONFETTI_COLORS[i % CONFETTI_COLORS.length];
          const rounded = Math.random() > 0.5;
          return (
            <span
              key={i}
              style={{
                position: "absolute",
                top: 0,
                left: `${left}%`,
                width: size,
                height: size * (rounded ? 1 : 0.5),
                background: color,
                borderRadius: rounded ? "50%" : "2px",
                animation: `confetti-fall ${duration}s linear ${delay}s infinite`,
                // @ts-expect-error CSS var
                "--x-end": `${xEnd}px`,
              }}
            />
          );
        })}
      </div>

      <NekoBubble>{t("Tudo pronto! Você está preparado para começar essa jornada! 🎉")}</NekoBubble>

      <div className="relative mt-6 flex flex-col items-center">
        <div className="animate-medal-celebrate">
          <Medal />
        </div>
        <h2 className="mt-6 text-3xl font-black">{t("Vamos nessa!")}</h2>
        <p className="mt-1 text-sm text-muted-foreground">{t("Bons estudos!")}</p>
      </div>

      <button
        onClick={onContinue}
        className="btn-3d mt-8 w-full rounded-2xl bg-primary py-3.5 font-bold text-primary-foreground"
      >
        {t("Começar a aprender")}
      </button>

    </div>
  );
}

function Medal() {
  return (
    <svg width="140" height="160" viewBox="0 0 140 160" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M42 90 L28 155 L55 138 L70 150 L70 92 Z" fill="#ef4444" />
      <path d="M98 90 L112 155 L85 138 L70 150 L70 92 Z" fill="#dc2626" />
      <circle cx="70" cy="60" r="52" fill="url(#gold)" stroke="#b8860b" strokeWidth="3" />
      <circle cx="70" cy="60" r="40" fill="#fde68a" stroke="#f59e0b" strokeWidth="2" />
      <path
        d="M70 32 L77 52 L98 52 L81 65 L88 85 L70 73 L52 85 L59 65 L42 52 L63 52 Z"
        fill="#f59e0b" stroke="#b45309" strokeWidth="2" strokeLinejoin="round"
      />
      <defs>
        <linearGradient id="gold" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fde047" />
          <stop offset="100%" stopColor="#f59e0b" />
        </linearGradient>
      </defs>
    </svg>
  );
}
