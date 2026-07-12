import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { NekoMascot, NekoBubble } from "@/components/NekoMascot";
import { LANGUAGES } from "@/lib/lessons";
import { updateProfile } from "@/lib/profile";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated/onboarding")({
  component: OnboardingFlow,
});

const COUNTRIES = ["Brasil", "Portugal", "Estados Unidos", "Japão", "Coreia do Sul", "França", "Espanha", "Outro"];
const GOALS = [
  { id: "viajar", label: "Para viajar", icon: "✈️" },
  { id: "trabalhar", label: "Para trabalho", icon: "💼" },
  { id: "estudar", label: "Para estudar", icon: "📚" },
  { id: "morar", label: "Para morar fora", icon: "🏡" },
  { id: "hobby", label: "Por hobby", icon: "❤️" },
  { id: "outro", label: "Outro motivo", icon: "✨" },
];
const LEVELS = [
  { id: "iniciante", label: "Iniciante", desc: "Nunca estudei antes" },
  { id: "basico", label: "Básico", desc: "Sei algumas palavras" },
  { id: "intermediario", label: "Intermediário", desc: "Consigo conversar um pouco" },
  { id: "avancado", label: "Avançado", desc: "Quero aprimorar" },
];

function OnboardingFlow() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState({
    language: "ja",
    country: "Brasil",
    age: 16,
    goal: "viajar",
    level: "iniciante",
    name: "",
  });
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  async function finish() {
    setSaving(true);
    const { data: userData } = await supabase.auth.getUser();
    if (!userData.user) { setSaving(false); return; }
    try {
      await updateProfile(userData.user.id, { ...data, onboarding_complete: true });
      navigate({ to: "/home", replace: true });
    } catch (e) {
      toast.error("Não conseguimos salvar. Tente novamente.");
    } finally {
      setSaving(false);
    }
  }

  const stepTitles = [
    "Escolha o idioma",
    "Selecione seu país",
    "Qual é a sua idade?",
    "Qual é o seu objetivo?",
    "Qual é o seu nível atual?",
    "Como podemos te chamar?",
    "",
  ];

  const steps = [
    <StepChoice key="l" title="Qual idioma você quer aprender?" value={data.language}
      onChange={(v) => setData({ ...data, language: v })}
      options={LANGUAGES.map((l) => ({ id: l.code, label: l.name, icon: l.flag }))} />,
    <StepChoice key="c" title="De qual país você é? Isso vai nos ajudar a personalizar tudo!" value={data.country}
      onChange={(v) => setData({ ...data, country: v })}
      options={COUNTRIES.map((c) => ({ id: c, label: c, icon: "🌍" }))} />,
    <div key="a" className="flex flex-col gap-6">
      <NekoBubble>Que ótimo! Agora me conta... Qual é a sua idade?</NekoBubble>
      <div className="text-center">
        <div className="text-6xl font-black text-primary transition-all">{data.age}</div>
        <input type="range" min={8} max={99} value={data.age}
          onChange={(e) => setData({ ...data, age: Number(e.target.value) })}
          className="mt-6 w-full accent-primary" />
      </div>
    </div>,
    <StepChoice key="g" title="Entendi! E para que você quer aprender esse idioma?" value={data.goal}
      onChange={(v) => setData({ ...data, goal: v })}
      options={GOALS.map((g) => ({ id: g.id, label: g.label, icon: g.icon }))} />,
    <StepChoice key="v" title="Legal! Assim posso personalizar suas lições para você!" value={data.level}
      onChange={(v) => setData({ ...data, level: v })}
      options={LEVELS.map((l) => ({ id: l.id, label: l.label, sub: l.desc, icon: "📊" }))} />,
    <div key="n" className="flex flex-col gap-6">
      <NekoBubble>Perfeito! Vamos criar sua conta para salvar seu progresso!</NekoBubble>
      <input
        type="text"
        placeholder="Seu nome"
        value={data.name}
        onChange={(e) => setData({ ...data, name: e.target.value })}
        className="rounded-2xl border-2 border-border bg-card px-4 py-3.5 text-base outline-none focus:border-primary"
      />
    </div>,
    <CelebrationStep key="done" />,
  ];

  const isLast = step === steps.length - 1;
  const title = stepTitles[step];
  const nameOk = step !== 5 || data.name.trim().length > 0;

  return (
    <div className="mobile-shell px-6 pt-6 pb-8">
      <div className="mb-6 flex items-center gap-2">
        {step > 0 && !isLast && (
          <button onClick={() => setStep(step - 1)} className="text-2xl">←</button>
        )}
        <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
          <div className="h-full bg-gradient-primary transition-all duration-300"
            style={{ width: `${((step + 1) / steps.length) * 100}%` }} />
        </div>
      </div>
      <div key={step} className="flex-1 animate-fade-in">
        {steps[step]}
        {title && step !== 2 && step !== 5 && (
          <h2 className="mt-6 text-center text-xl font-black">{title}</h2>
        )}
      </div>
      <button
        disabled={saving || !nameOk}
        onClick={() => (isLast ? finish() : setStep(step + 1))}
        className="btn-3d mt-8 rounded-2xl bg-primary py-3.5 font-bold text-primary-foreground disabled:opacity-50"
      >
        {saving ? "Salvando..." : isLast ? "Começar a aprender" : "Continuar"}
      </button>
    </div>
  );
}

interface Option { id: string; label: string; sub?: string; icon?: string }
function StepChoice({ title, options, value, onChange }: {
  title: string; options: Option[]; value: string; onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-col gap-4">
      <NekoBubble>{title}</NekoBubble>
      <div className="flex flex-col gap-2.5">
        {options.map((o) => (
          <button key={o.id} onClick={() => onChange(o.id)}
            className={`flex items-center gap-3 rounded-2xl border-2 bg-card p-4 text-left transition ${
              value === o.id ? "border-primary bg-accent shadow-soft" : "border-border"
            }`}>
            {o.icon && <span className="text-2xl">{o.icon}</span>}
            <div className="flex-1">
              <div className="font-bold">{o.label}</div>
              {o.sub && <div className="text-xs text-muted-foreground">{o.sub}</div>}
            </div>
            {value === o.id && <span className="text-primary">✓</span>}
          </button>
        ))}
      </div>
    </div>
  );
}

const CONFETTI_COLORS = ["#6C3EFF", "#FFD54A", "#22c55e", "#ec4899", "#38bdf8", "#f97316"];

function CelebrationStep() {
  const pieces = Array.from({ length: 40 });
  return (
    <div className="relative flex flex-col items-center gap-6 pt-2">
      {/* Confetti layer */}
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

      <NekoBubble>Tudo pronto! Você está preparado para começar essa jornada! 🎉</NekoBubble>

      <div className="relative mt-4 flex flex-col items-center">
        <div className="animate-medal-celebrate">
          <Medal />
        </div>
        <h2 className="mt-6 text-3xl font-black">Vamos nessa!</h2>
        <p className="mt-1 text-sm text-muted-foreground">Bons estudos!</p>
      </div>
    </div>
  );
}

function Medal() {
  return (
    <svg width="140" height="160" viewBox="0 0 140 160" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Ribbons */}
      <path d="M42 90 L28 155 L55 138 L70 150 L70 92 Z" fill="#ef4444" />
      <path d="M98 90 L112 155 L85 138 L70 150 L70 92 Z" fill="#dc2626" />
      {/* Outer gold circle */}
      <circle cx="70" cy="60" r="52" fill="url(#gold)" stroke="#b8860b" strokeWidth="3" />
      <circle cx="70" cy="60" r="40" fill="#fde68a" stroke="#f59e0b" strokeWidth="2" />
      {/* Star */}
      <path
        d="M70 32 L77 52 L98 52 L81 65 L88 85 L70 73 L52 85 L59 65 L42 52 L63 52 Z"
        fill="#f59e0b"
        stroke="#b45309"
        strokeWidth="2"
        strokeLinejoin="round"
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
