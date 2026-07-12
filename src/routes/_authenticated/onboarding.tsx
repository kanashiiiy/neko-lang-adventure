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
  { id: "viajar", label: "Viajar", icon: "✈️" },
  { id: "estudar", label: "Estudar", icon: "📚" },
  { id: "trabalhar", label: "Trabalhar", icon: "💼" },
  { id: "morar", label: "Morar fora", icon: "🏡" },
  { id: "hobby", label: "Hobby", icon: "🎨" },
  { id: "outro", label: "Outro", icon: "✨" },
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
    age: 20,
    goal: "hobby",
    level: "iniciante",
  });
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  async function finish() {
    setSaving(true);
    const { data: userData } = await supabase.auth.getUser();
    if (!userData.user) { setSaving(false); return; }
    try {
      await updateProfile(userData.user.id, { ...data, onboarding_complete: true });
      toast.success("Tudo pronto! Bora aprender 🎉");
      navigate({ to: "/home", replace: true });
    } catch (e) {
      toast.error("Não conseguimos salvar. Tente novamente.");
    } finally {
      setSaving(false);
    }
  }

  const steps = [
    // Welcome
    <div key="w" className="flex flex-col items-center gap-6">
      <NekoMascot size={180} float bounce />
      <div className="text-center">
        <h1 className="text-3xl font-black">Oi! Eu sou o Neko 🐾</h1>
        <p className="mt-2 text-muted-foreground">Vou te ajudar a aprender um novo idioma de um jeito divertido!</p>
      </div>
    </div>,
    // Language
    <StepChoice key="l" title="Qual idioma quer aprender?" value={data.language}
      onChange={(v) => setData({ ...data, language: v })}
      options={LANGUAGES.map((l) => ({ id: l.code, label: l.name, icon: l.flag }))} />,
    // Country
    <StepChoice key="c" title="De onde você é?" value={data.country}
      onChange={(v) => setData({ ...data, country: v })}
      options={COUNTRIES.map((c) => ({ id: c, label: c, icon: "🌍" }))} />,
    // Age
    <div key="a" className="flex flex-col gap-6">
      <NekoBubble>Quantos aninhos você tem?</NekoBubble>
      <div className="text-center">
        <div className="text-6xl font-black text-primary">{data.age}</div>
        <input type="range" min={8} max={99} value={data.age}
          onChange={(e) => setData({ ...data, age: Number(e.target.value) })}
          className="mt-6 w-full accent-primary" />
      </div>
    </div>,
    // Goal
    <StepChoice key="g" title="Qual é o seu objetivo?" value={data.goal}
      onChange={(v) => setData({ ...data, goal: v })}
      options={GOALS.map((g) => ({ id: g.id, label: g.label, icon: g.icon }))} />,
    // Level
    <StepChoice key="v" title="Qual é o seu nível?" value={data.level}
      onChange={(v) => setData({ ...data, level: v })}
      options={LEVELS.map((l) => ({ id: l.id, label: l.label, sub: l.desc, icon: "⭐" }))} />,
  ];

  const isLast = step === steps.length - 1;

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
      <div className="flex-1">{steps[step]}</div>
      <button
        disabled={saving}
        onClick={() => (isLast ? finish() : setStep(step + 1))}
        className="btn-3d mt-8 rounded-2xl bg-primary py-3.5 font-bold text-primary-foreground disabled:opacity-70"
      >
        {saving ? "Salvando..." : isLast ? "Começar!" : "Continuar"}
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
