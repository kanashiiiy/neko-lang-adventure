import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { NekoBubble } from "@/components/NekoMascot";
import { LANGUAGES } from "@/lib/lessons";
import { setUiLangFromCountry, useT } from "@/lib/i18n";


export const Route = createFileRoute("/start")({
  component: StartPage,
  ssr: false,
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

export const PRE_ONBOARDING_KEY = "nekoteach:pre-onboarding";

function StartPage() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState({ language: "ja", country: "Brasil", age: 16, goal: "viajar", level: "iniciante" });
  const navigate = useNavigate();
  const t = useT();

  const steps = [
    <StepChoice key="l" title={t("Qual idioma você quer aprender?")} value={data.language}
      onChange={(v) => setData({ ...data, language: v })}
      options={LANGUAGES.map((l) => ({ id: l.code, label: t(l.name), icon: l.flag }))} />,
    <StepChoice key="c" title={t("De qual país você é? Isso vai nos ajudar a personalizar tudo!")} value={data.country}
      onChange={(v) => { setUiLangFromCountry(v); setData({ ...data, country: v }); }}
      options={COUNTRIES.map((c) => ({ id: c, label: t(c), icon: "🌍" }))} />,
    <div key="a" className="flex flex-col gap-6">
      <NekoBubble>{t("Que ótimo! Agora me conta... Qual é a sua idade?")}</NekoBubble>
      <div className="text-center">
        <div className="text-6xl font-black text-primary">{data.age}</div>
        <input type="range" min={8} max={99} value={data.age}
          onChange={(e) => setData({ ...data, age: Number(e.target.value) })}
          className="mt-6 w-full accent-primary" />
      </div>
    </div>,
    <StepChoice key="g" title={t("Entendi! E para que você quer aprender esse idioma?")} value={data.goal}
      onChange={(v) => setData({ ...data, goal: v })}
      options={GOALS.map((g) => ({ id: g.id, label: t(g.label), icon: g.icon }))} />,
    <StepChoice key="v" title={t("Legal! Assim posso personalizar suas lições para você!")} value={data.level}
      onChange={(v) => setData({ ...data, level: v })}
      options={LEVELS.map((l) => ({ id: l.id, label: t(l.label), sub: t(l.desc), icon: "📊" }))} />,
  ];


  const isLast = step === steps.length - 1;

  function next() {
    if (!isLast) return setStep(step + 1);
    try { localStorage.setItem(PRE_ONBOARDING_KEY, JSON.stringify(data)); } catch { /* ignore */ }
    navigate({ to: "/auth", replace: true });
  }

  return (
    <div className="mobile-shell px-6 pt-6 pb-8">
      <div className="mb-6 flex items-center gap-2">
        {step > 0 && (
          <button onClick={() => setStep(step - 1)} className="text-2xl">←</button>
        )}
        <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
          <div className="h-full bg-gradient-primary transition-all duration-300"
            style={{ width: `${((step + 1) / steps.length) * 100}%` }} />
        </div>
      </div>
      <div key={step} className="flex-1 animate-fade-in">
        {steps[step]}
      </div>
      <button
        onClick={next}
        className="btn-3d mt-8 rounded-2xl bg-primary py-3.5 font-bold text-primary-foreground"
      >
        {isLast ? t("Criar minha conta") : t("Continuar")}
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
