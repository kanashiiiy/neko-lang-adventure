import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState, useEffect, useRef } from "react";
import { toast } from "@/lib/neko-toast";
import {
  Flame, Gem, Trophy, Edit3, Lock, Globe, MapPin, Bell, Moon, Shield, LogOut,
  ChevronRight, Camera, ArrowLeft, Palette, Check
} from "lucide-react";
import { ProfileAvatar, fileToAvatarDataUrl } from "@/components/ProfileAvatar";
import { supabase } from "@/integrations/supabase/client";
import { fetchCurrentProfile, updateProfile, isPremiumActive, isPremiumPlusActive, getLevelProgress, type Profile } from "@/lib/profile";
import { LANGUAGES } from "@/lib/lessons";
import { BottomNav } from "@/components/BottomNav";
import { useT, useTf, setUiLangFromCountry } from "@/lib/i18n";

export const Route = createFileRoute("/_authenticated/profile")({ component: ProfilePage });

const COUNTRIES = ["Brasil", "Portugal", "Estados Unidos", "Japão", "Coreia do Sul", "França", "Espanha", "Outro"];

type Plan = "free" | "premium" | "plus";
type Category = "frames" | "backgrounds" | "effects" | "badges";

type Cosmetic = {
  id: string;
  name: string;
  plan: Plan;
  emoji: string;
  className: string;
};

const FRAMES: Cosmetic[] = [
  { id:"frame-default", name:"Padrão", plan:"free", emoji:"🟣", className:"ring-4 ring-white/80" },
  { id:"frame-gold", name:"Dourada", plan:"premium", emoji:"✨", className:"ring-4 ring-yellow-400" },
  { id:"frame-sakura", name:"Flores de Cerejeira", plan:"premium", emoji:"🌸", className:"ring-4 ring-pink-300" },
  { id:"frame-galaxy", name:"Galáxia", plan:"premium", emoji:"🌌", className:"ring-4 ring-violet-400" },
  { id:"frame-neko-ears", name:"Orelhas de Neko", plan:"premium", emoji:"🐱", className:"ring-4 ring-purple-300" },
  { id:"frame-hearts", name:"Corações", plan:"premium", emoji:"💗", className:"ring-4 ring-pink-400" },
  { id:"frame-winter", name:"Inverno", plan:"premium", emoji:"❄️", className:"ring-4 ring-sky-300" },
  { id:"frame-demon", name:"Demônio", plan:"plus", emoji:"😈", className:"ring-4 ring-red-500" },
  { id:"frame-samurai", name:"Neko Samurai", plan:"plus", emoji:"⚔️", className:"ring-4 ring-red-300" },
  { id:"frame-star", name:"Estrela Dourada", plan:"plus", emoji:"🌟", className:"ring-4 ring-yellow-300" },
  { id:"frame-summer", name:"Verão", plan:"plus", emoji:"☀️", className:"ring-4 ring-orange-300" },
  { id:"frame-halloween", name:"Halloween", plan:"plus", emoji:"🎃", className:"ring-4 ring-orange-500" },
  { id:"frame-birthday", name:"Aniversário", plan:"plus", emoji:"🎂", className:"ring-4 ring-fuchsia-300" },
  { id:"frame-dark-purple", name:"Roxo Sombrio", plan:"plus", emoji:"🌑", className:"ring-4 ring-purple-950" },
  { id:"frame-space-neko", name:"Neko Espacial", plan:"plus", emoji:"🚀", className:"ring-4 ring-cyan-300" },
  { id:"frame-royal-gold", name:"Ouro Real", plan:"plus", emoji:"👑", className:"ring-4 ring-amber-400" },
];

const BACKGROUNDS: Cosmetic[] = [
  { id:"bg-default", name:"Padrão", plan:"free", emoji:"🟣", className:"bg-gradient-to-br from-violet-950 via-purple-800 to-fuchsia-900" },
  { id:"bg-night", name:"Noite Tranquila", plan:"free", emoji:"🌙", className:"bg-gradient-to-br from-slate-950 via-indigo-950 to-violet-900" },
  { id:"bg-purple-sky", name:"Céu Roxo", plan:"premium", emoji:"☁️", className:"bg-gradient-to-br from-purple-950 via-violet-700 to-fuchsia-500" },
  { id:"bg-sunset", name:"Pôr do Sol", plan:"premium", emoji:"🌅", className:"bg-gradient-to-br from-orange-500 via-pink-500 to-purple-800" },
  { id:"bg-magic-forest", name:"Floresta Mágica", plan:"premium", emoji:"🌲", className:"bg-gradient-to-br from-emerald-950 via-teal-800 to-purple-900" },
  { id:"bg-neon-city", name:"Cidade Neon", plan:"premium", emoji:"🌃", className:"bg-gradient-to-br from-slate-950 via-fuchsia-900 to-cyan-700" },
  { id:"bg-japanese-temple", name:"Templo Japonês", plan:"premium", emoji:"⛩️", className:"bg-gradient-to-br from-red-950 via-purple-900 to-slate-950" },
  { id:"bg-beach", name:"Praia", plan:"premium", emoji:"🏝️", className:"bg-gradient-to-br from-cyan-500 via-sky-400 to-amber-200" },
  { id:"bg-winter", name:"Inverno", plan:"premium", emoji:"❄️", className:"bg-gradient-to-br from-slate-800 via-sky-700 to-white" },
  { id:"bg-kitsune", name:"Kitsune", plan:"premium", emoji:"🦊", className:"bg-gradient-to-br from-orange-700 via-red-700 to-violet-950" },
  { id:"bg-space", name:"Espaço", plan:"plus", emoji:"🌌", className:"bg-gradient-to-br from-black via-indigo-950 to-purple-950" },
  { id:"bg-dreams", name:"Sonhos", plan:"plus", emoji:"💫", className:"bg-gradient-to-br from-fuchsia-900 via-purple-700 to-sky-500" },
  { id:"bg-aurora", name:"Aurora", plan:"plus", emoji:"🌈", className:"bg-gradient-to-br from-emerald-800 via-cyan-700 to-violet-900" },
  { id:"bg-halloween", name:"Halloween", plan:"plus", emoji:"🎃", className:"bg-gradient-to-br from-black via-orange-950 to-purple-950" },
  { id:"bg-festival", name:"Festival", plan:"plus", emoji:"🎆", className:"bg-gradient-to-br from-indigo-950 via-pink-700 to-amber-500" },
  { id:"bg-summer", name:"Verão", plan:"plus", emoji:"☀️", className:"bg-gradient-to-br from-sky-400 via-cyan-400 to-yellow-300" },
  { id:"bg-gold", name:"Dourado", plan:"plus", emoji:"✨", className:"bg-gradient-to-br from-amber-950 via-yellow-700 to-orange-300" },
];

const EFFECTS: Cosmetic[] = [
  { id:"effect-none", name:"Nenhum", plan:"free", emoji:"○", className:"" },
  { id:"effect-basic", name:"Brilho Básico", plan:"free", emoji:"✨", className:"animate-pulse" },
  { id:"effect-sakura", name:"Pétalas de Sakura", plan:"premium", emoji:"🌸", className:"animate-bounce" },
  { id:"effect-stars", name:"Estrelas Mágicas", plan:"premium", emoji:"⭐", className:"animate-pulse" },
  { id:"effect-gold-aura", name:"Aura Dourada", plan:"premium", emoji:"💛", className:"animate-pulse" },
  { id:"effect-butterflies", name:"Borboletas", plan:"premium", emoji:"🦋", className:"animate-bounce" },
  { id:"effect-blue-flames", name:"Chamas Azuis", plan:"premium", emoji:"🔥", className:"animate-pulse" },
  { id:"effect-neko-ears", name:"Orelhas de Neko", plan:"premium", emoji:"🐱", className:"animate-pulse" },
  { id:"effect-snow", name:"Neve", plan:"plus", emoji:"❄️", className:"animate-bounce" },
  { id:"effect-space", name:"Espaço", plan:"plus", emoji:"🌌", className:"animate-spin" },
  { id:"effect-hearts", name:"Corações", plan:"plus", emoji:"💖", className:"animate-bounce" },
  { id:"effect-royal-aura", name:"Aura Real", plan:"plus", emoji:"👑", className:"animate-pulse" },
];

const BADGES: Cosmetic[] = [
  { id:"badge-beginner", name:"Iniciante", plan:"free", emoji:"🌱", className:"" },
  { id:"badge-student", name:"Estudioso", plan:"free", emoji:"📚", className:"" },
  { id:"badge-explorer", name:"Explorador", plan:"free", emoji:"🧭", className:"" },
  { id:"badge-focus", name:"Foco", plan:"free", emoji:"🧠", className:"" },
  { id:"badge-streak", name:"Sequência", plan:"free", emoji:"🔥", className:"" },
  { id:"badge-diamond", name:"Diamante", plan:"premium", emoji:"💎", className:"" },
  { id:"badge-master", name:"Mestre", plan:"premium", emoji:"🏅", className:"" },
  { id:"badge-legend", name:"Lenda", plan:"premium", emoji:"🏆", className:"" },
  { id:"badge-samurai", name:"Neko Samurai", plan:"premium", emoji:"⚔️", className:"" },
  { id:"badge-gold", name:"Ouro Real", plan:"premium", emoji:"🥇", className:"" },
  { id:"badge-dark-purple", name:"Roxo Sombrio", plan:"plus", emoji:"🟣", className:"" },
  { id:"badge-moon", name:"Lua Crescente", plan:"plus", emoji:"🌙", className:"" },
  { id:"badge-shooting-star", name:"Estrela Cadente", plan:"plus", emoji:"🌠", className:"" },
  { id:"badge-kitsune", name:"Kitsune", plan:"plus", emoji:"🦊", className:"" },
  { id:"badge-halloween", name:"Halloween", plan:"plus", emoji:"🎃", className:"" },
  { id:"badge-summer", name:"Verão", plan:"plus", emoji:"☀️", className:"" },
  { id:"badge-winter", name:"Inverno", plan:"plus", emoji:"❄️", className:"" },
  { id:"badge-galaxy", name:"Galáxia", plan:"plus", emoji:"🌌", className:"" },
  { id:"badge-heart", name:"Coração", plan:"plus", emoji:"❤️", className:"" },
  { id:"badge-emperor", name:"Imperador", plan:"plus", emoji:"👑", className:"" },
];

const CATALOG: Record<Category, Cosmetic[]> = { frames: FRAMES, backgrounds: BACKGROUNDS, effects: EFFECTS, badges: BADGES };
const CATEGORY_LABELS: Record<Category, string> = { frames:"Molduras", backgrounds:"Fundos", effects:"Efeitos", badges:"Emblemas" };

const ACHIEVEMENT_META: Record<string, { name: string; emoji: string }> = {
  first_lesson: { name:"Primeira lição", emoji:"🌱" },
  streak_3: { name:"3 dias seguidos", emoji:"🔥" },
  streak_7: { name:"7 dias seguidos", emoji:"🔥" },
  level_5: { name:"Nível 5", emoji:"⭐" },
  level_10: { name:"Nível 10", emoji:"🏆" },
  first_phase: { name:"Primeira fase", emoji:"🎓" },
};

function ProfilePage() {
  const t = useT();
  const tf = useTf();
  const qc = useQueryClient();
  const navigate = useNavigate();
  const { data: profile } = useQuery({ queryKey:["profile"], queryFn: fetchCurrentProfile });
  const { data: achievements = [] } = useQuery({
    queryKey:["profile-achievements", profile?.id],
    enabled: Boolean(profile?.id),
    queryFn: async () => {
      const { data, error } = await supabase.from("achievements").select("code, unlocked_at").eq("user_id", profile!.id).order("unlocked_at", { ascending:true });
      if (error) throw error;
      return data ?? [];
    },
  });

  const [modal, setModal] = useState<null | "name" | "password" | "language" | "country">(null);
  const [name, setName] = useState("");
  const [pass, setPass] = useState(""); const [confirm, setConfirm] = useState("");
  const [customizing, setCustomizing] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (profile) document.documentElement.classList.toggle("dark", profile.theme === "dark");
  }, [profile]);

  async function save(patch: Record<string, unknown>) {
    if (!profile) throw new Error("Perfil não carregado.");
    const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
    if (sessionError) throw sessionError;
    if (sessionData.session?.user?.id !== profile.id) {
      throw new Error("Sua sessão expirou. Entre novamente para salvar a personalização.");
    }
    await updateProfile(profile.id, patch as Partial<Profile>);
    await qc.invalidateQueries({ queryKey:["profile"] });
    await qc.refetchQueries({ queryKey:["profile"], type:"active" });
  }

  async function onPickPhoto(e: React.ChangeEvent<HTMLInputElement>) {
    const file=e.target.files?.[0]; e.target.value="";
    if (!file) return;
    if (!file.type.startsWith("image/")) return toast.error(t("Escolha uma imagem"));
    setUploading(true);
    try { await save({ avatar_url: await fileToAvatarDataUrl(file) }); toast.success(t("Foto atualizada!")); }
    catch { toast.error(t("Não foi possível salvar a foto")); }
    finally { setUploading(false); }
  }

  async function saveName() {
    if (name.trim().length < 2) return toast.error(t("Nome muito curto"));
    await save({ name:name.trim() }); toast.success(t("Nome atualizado!")); setModal(null);
  }
  async function savePass() {
    if (pass.length < 6) return toast.error(t("Mínimo 6 caracteres"));
    if (pass !== confirm) return toast.error(t("As senhas não coincidem"));
    const { error }=await supabase.auth.updateUser({password:pass});
    if (error) return toast.error(error.message);
    toast.success(t("Senha atualizada!")); setPass(""); setConfirm(""); setModal(null);
  }
  async function toggleTheme() { const next=profile?.theme==="dark"?"light":"dark"; document.documentElement.classList.toggle("dark",next==="dark"); await save({theme:next}); }
  async function toggleNotif() { await save({notifications_enabled:!profile?.notifications_enabled}); }
  async function logout() {
    await qc.cancelQueries(); qc.clear(); await supabase.auth.signOut(); navigate({to:"/auth",replace:true});
  }

  if (!profile) return <div className="mobile-shell items-center justify-center">{t("Carregando...")}</div>;

  const level = getLevelProgress(profile.xp);
  const premium = isPremiumActive(profile);
  const plus = isPremiumPlusActive(profile);
  const plan: Plan = plus ? "plus" : premium ? "premium" : "free";
  const frame = FRAMES.find(x=>x.id===profile.profile_frame) ?? FRAMES[0];
  const background = BACKGROUNDS.find(x=>x.id===profile.profile_background) ?? BACKGROUNDS[0];
  const effect = EFFECTS.find(x=>x.id===profile.profile_effect) ?? EFFECTS[0];
  const badge = BADGES.find(x=>x.id===profile.profile_badge) ?? BADGES[0];
  const langMeta=LANGUAGES.find(l=>l.code===profile.language);

  return (
    <div className="mobile-shell">
      <header className="border-b-2 border-border bg-card px-4 py-3">
        <button onClick={()=>window.history.back()} className="flex items-center gap-2 font-bold"><ArrowLeft className="h-5 w-5"/>{t("Voltar")}</button>
      </header>

      <main className="flex-1 space-y-5 overflow-y-auto px-4 py-4 pb-24">
        <ProfileHero profile={profile} level={level} frame={frame} background={background} effect={effect} badge={badge} premium={premium} plus={plus} />
        <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-violet-950 via-purple-900 to-fuchsia-950 p-5 text-white shadow-soft">
          <div className="flex items-center justify-between">
            <span className="font-black">{t("Nível")} {level.level}</span><span className="text-sm font-bold">{level.xpIntoLevel} / {level.xpForNextLevel} XP</span>
          </div>
          <div className="mt-3 h-3 overflow-hidden rounded-full bg-white/20"><div className="h-full rounded-full bg-gradient-to-r from-fuchsia-400 to-yellow-300 transition-all" style={{width:`${level.progressPercent}%`}}/></div>
        </div>

        <div className="grid grid-cols-4 gap-2">
          <StatCard icon={<Flame/>} label={t("Sequência")} value={profile.streak}/>
          <StatCard icon={<Gem/>} label={t("Diamantes")} value={profile.gems}/>
          <StatCard icon={<span className="font-black">XP</span>} label={t("XP")} value={profile.xp}/>
          <StatCard icon={<Trophy/>} label={t("Conquistas")} value={achievements.length}/>
        </div>

        <Section title={t("Conquistas")}>
          <div className="grid grid-cols-3 gap-2 p-3">
            {achievements.length ? achievements.map(a => {
              const meta=ACHIEVEMENT_META[a.code] ?? {name:a.code,emoji:"🏅"};
              return <div key={a.code} className="rounded-2xl border border-gold/30 bg-gradient-to-br from-yellow-500/10 to-purple-500/10 p-3 text-center"><div className="text-2xl">{meta.emoji}</div><div className="mt-1 text-[11px] font-black">{meta.name}</div></div>;
            }) : <div className="col-span-3 py-4 text-center text-sm text-muted-foreground">{t("Nenhuma conquista desbloqueada ainda.")}</div>}
            {achievements.length < 3 && [0,1,2].slice(0,3-achievements.length).map(i => <div key={`locked-${i}`} className="rounded-2xl border border-border bg-muted/30 p-3 text-center opacity-60"><Lock className="mx-auto h-5 w-5"/><div className="mt-1 text-[11px] font-bold">{t("Bloqueada")}</div></div>)}
          </div>
        </Section>

        <button onClick={()=>setCustomizing(true)} className="btn-3d flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-violet-700 to-fuchsia-600 py-4 font-black text-white shadow-soft"><Palette className="h-5 w-5"/>{t("Personalizar perfil")}</button>

        {(premium || plus) && <div className="flex justify-center">{plus ? <span className="rounded-full border border-yellow-300/40 bg-gradient-to-r from-yellow-500/20 to-fuchsia-500/20 px-4 py-2 text-sm font-black text-yellow-200">💎 PREMIUM PLUS</span> : <span className="rounded-full border border-yellow-300/40 bg-yellow-500/15 px-4 py-2 text-sm font-black text-yellow-200">👑 PREMIUM</span>}</div>}

        <Section title={t("Conta")}>
          <ClickRow icon={<Camera/>} label={uploading?t("Salvando..."):t("Alterar foto")} onClick={()=>fileRef.current?.click()}/>
          <ClickRow icon={<Edit3/>} label={t("Editar nome")} onClick={()=>{setName(profile.name??"");setModal("name");}}/>
          <ClickRow icon={<Lock/>} label={t("Alterar senha")} onClick={()=>setModal("password")}/>
        </Section>
        <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={onPickPhoto}/>

        <Section title={t("Preferências")}>
          <ClickRow icon={<Globe/>} label={tf("Idioma: {flag} {name}",{flag:langMeta?.flag??"",name:langMeta?.name??""})} onClick={()=>setModal("language")}/>
          <ClickRow icon={<MapPin/>} label={tf("País: {country}",{country:profile.country??t("Não definido")})} onClick={()=>setModal("country")}/>
          <Row icon={<Bell/>} label={t("Notificações")}><Switch checked={profile.notifications_enabled} onChange={toggleNotif}/></Row>
          <Row icon={<Moon/>} label={t("Modo escuro")}><Switch checked={profile.theme==="dark"} onChange={toggleTheme}/></Row>
          {profile.is_admin && <ClickRow icon={<Shield/>} label={t("Painel Admin")} onClick={()=>navigate({to:"/admin"})}/>}
        </Section>
        <button onClick={logout} className="btn-3d flex w-full items-center justify-center gap-2 rounded-2xl bg-destructive py-3.5 font-bold text-destructive-foreground"><LogOut className="h-5 w-5"/>{t("Sair da conta")}</button>
      </main>

      <BottomNav/>

      {customizing && <Customizer profile={profile} plan={plan} frame={frame} background={background} effect={effect} badge={badge} onClose={()=>setCustomizing(false)} onSave={async patch=>{await save(patch);setCustomizing(false);toast.success(t("Personalização salva!"));}}/>}

      {modal && <AccountModal modal={modal} profile={profile} name={name} setName={setName} pass={pass} setPass={setPass} confirm={confirm} setConfirm={setConfirm} setModal={setModal} saveName={saveName} savePass={savePass} save={save} t={t} langMeta={langMeta}/>}
    </div>
  );
}

function ProfileHero({profile,level,frame,background,effect,badge,premium,plus}:{profile:Profile;level:ReturnType<typeof getLevelProgress>;frame:Cosmetic;background:Cosmetic;effect:Cosmetic;badge:Cosmetic;premium:boolean;plus:boolean}) {
  const displayName=profile.name??"Neko";
  const username=profile.username || displayName.toLowerCase().replace(/[^a-z0-9]+/g,"").slice(0,24) || "nekouser";
  return <div className="relative overflow-hidden rounded-[2rem] border border-fuchsia-300/20 bg-[#120b35] text-white shadow-[0_0_35px_rgba(124,58,237,.22)]">
    <BackgroundArt item={background} large/>
    <div className="absolute inset-0 bg-gradient-to-b from-[#08051d]/15 via-transparent to-[#08051d]/70"/>
    <div className="relative flex flex-col items-center px-4 pb-5 pt-6 text-center">
      <div className="relative flex h-40 w-40 items-center justify-center">
        <EffectArt item={effect} large/>
        <FrameArt item={frame} large/>
        <div className="relative z-20 rounded-full p-1.5">
          <ProfileAvatar name={profile.name} url={profile.avatar_url} size={112}/>
        </div>
        <div className="absolute -bottom-1 -right-1 z-30 flex h-12 w-12 items-center justify-center rounded-full border-2 border-white/40 bg-[#24104f]/95 text-2xl shadow-[0_0_18px_rgba(217,70,239,.55)]">{badge.emoji}</div>
      </div>
      <div className="mt-3 text-2xl font-black drop-shadow-lg">{displayName}</div>
      <div className="text-sm font-bold text-white/75">@{username}</div>
      <div className="mt-2 flex items-center gap-2">
        <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-black">Nível {level.level}</span>
        {plus&&<span className="rounded-full border border-fuchsia-300/30 bg-fuchsia-500/20 px-2.5 py-1 text-xs font-black text-fuchsia-100">💎 PLUS</span>}
        {premium&&!plus&&<span className="rounded-full border border-yellow-300/30 bg-yellow-500/15 px-2.5 py-1 text-xs font-black text-yellow-100">👑 PREMIUM</span>}
      </div>
    </div>
  </div>;
}

function FrameArt({item,large=false}:{item:Cosmetic;large?:boolean}) {
  const symbols:Record<string,string[]> = {
    "frame-default":["✦","✦"],
    "frame-gold":["✦","◆","✦","◆"],
    "frame-sakura":["🌸","🌸","🌸","🌸","🌸","🌸"],
    "frame-galaxy":["✦","·","✧","·","✦","·"],
    "frame-neko-ears":["🐾","🐾","✦"],
    "frame-hearts":["♥","♡","♥","♡","♥","♡"],
    "frame-winter":["❄","✧","❄","✧","❄","✧"],
    "frame-demon":["♠","◆","♠","◆","♠"],
    "frame-samurai":["⚔","◆","⚔","◆"],
    "frame-star":["★","✦","★","✦","★"],
    "frame-summer":["☀","✿","☀","✿"],
    "frame-halloween":["🎃","🕸","🎃","🕸"],
    "frame-birthday":["🎂","🎈","🎂","🎈"],
    "frame-dark-purple":["✦","☾","✦","☾","✦"],
    "frame-space-neko":["🚀","✦","🪐","✦"],
    "frame-royal-gold":["♛","✦","♛","✦"]
  };
  const list=symbols[item.id]??["✦","✦","✦"];
  const size=large?156:82;
  return <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center" style={{width:size,height:size,left:"50%",top:"50%",transform:"translate(-50%,-50%)"}}>
    <div className={`absolute inset-[5%] rounded-full border-[3px] ${item.id==="frame-gold"||item.id==="frame-star"||item.id==="frame-royal-gold"?"border-yellow-300 shadow-[0_0_12px_rgba(250,204,21,.9)]":item.id==="frame-sakura"||item.id==="frame-hearts"||item.id==="frame-birthday"?"border-pink-300 shadow-[0_0_12px_rgba(244,114,182,.8)]":item.id==="frame-winter"?"border-sky-200 shadow-[0_0_12px_rgba(125,211,252,.8)]":"border-violet-300 shadow-[0_0_14px_rgba(168,85,247,.75)]"}`}/>
    <div className="absolute inset-[10%] rounded-full border border-white/35"/>
    {list.map((s,i)=>{
      const angle=(360/list.length)*i-90;
      return <span key={i} className="absolute text-[12px] drop-shadow-[0_0_5px_rgba(255,255,255,.8)] sm:text-base" style={{left:`${50+43*Math.cos(angle*Math.PI/180)}%`,top:`${50+43*Math.sin(angle*Math.PI/180)}%`,transform:"translate(-50%,-50%)"}}>{s}</span>;
    })}
  </div>;
}


function BackgroundArt({item,large=false}:{item:Cosmetic;large?:boolean}) {
  const scenes:Record<string,{bg:string;accent:string;type:string}> = {
    "bg-default":{bg:"#24104f",accent:"#b78cff",type:"night"},
    "bg-night":{bg:"#08152f",accent:"#8e7dff",type:"night"},
    "bg-purple-sky":{bg:"#3a176c",accent:"#d79cff",type:"sky"},
    "bg-sunset":{bg:"#7c285d",accent:"#ffb45e",type:"sunset"},
    "bg-magic-forest":{bg:"#0b3b38",accent:"#79d99a",type:"forest"},
    "bg-neon-city":{bg:"#10143d",accent:"#35e7ff",type:"city"},
    "bg-japanese-temple":{bg:"#32152c",accent:"#ff8b9d",type:"temple"},
    "bg-beach":{bg:"#1683a0",accent:"#ffe07a",type:"beach"},
    "bg-winter":{bg:"#527e9d",accent:"#e9f8ff",type:"winter"},
    "bg-kitsune":{bg:"#6d2b3d",accent:"#ffb04d",type:"kitsune"},
    "bg-space":{bg:"#090b2b",accent:"#9e7cff",type:"space"},
    "bg-dreams":{bg:"#633d86",accent:"#f3a6ff",type:"dreams"},
    "bg-aurora":{bg:"#0b5961",accent:"#7dffcf",type:"aurora"},
    "bg-halloween":{bg:"#24132b",accent:"#ff9d3d",type:"halloween"},
    "bg-festival":{bg:"#4a1e62",accent:"#ffd166",type:"festival"},
    "bg-summer":{bg:"#1490a8",accent:"#ffe46b",type:"summer"},
    "bg-gold":{bg:"#5b3a0b",accent:"#ffe08a",type:"gold"}
  };
  const scene=scenes[item.id] ?? scenes["bg-default"];
  const rect=(x:number,y:number,w:number,h:number,fill:string,rx=0)=>"<rect x="+x+" y="+y+" width="+w+" height="+h+" rx="+rx+" fill=\""+fill+"\"/>";
  const circle=(cx:number,cy:number,r:number,fill:string)=>"<circle cx="+cx+" cy="+cy+" r="+r+" fill=\""+fill+"\"/>";
  const path=(d:string,fill:string,stroke="",sw=0)=>"<path d=\""+d+"\" fill=\""+fill+"\""+(stroke?" stroke=\""+stroke+"\" stroke-width=\""+sw+"\"":"")+"/>";
  const line=(x1:number,y1:number,x2:number,y2:number,stroke:string,sw:number)=>"<line x1="+x1+" y1="+y1+" x2="+x2+" y2="+y2+" stroke=\""+stroke+"\" stroke-width=\""+sw+"\"/>";
  const star=(x:number,y:number,s:number,color=scene.accent)=>path("M"+x+" "+(y-s)+" L"+(x+s*.22)+" "+(y-s*.22)+" L"+(x+s)+" "+y+" L"+(x+s*.22)+" "+(y+s*.22)+" L"+x+" "+(y+s)+" L"+(x-s*.22)+" "+(y+s*.22)+" L"+(x-s)+" "+y+" L"+(x-s*.22)+" "+(y-s*.22)+"Z",color);
  const tree=(x:number,y:number,s:number,color:string)=>rect(x-s*.08,y+s*.15,s*.16,s*.7,"#33251c",3)+path("M"+x+" "+(y-s*.65)+" L"+(x-s*.45)+" "+y+" H"+(x-s*.18)+" L"+(x-s*.55)+" "+(y+s*.38)+" H"+(x+s*.55)+" L"+(x+s*.18)+" "+y+" H"+(x+s*.45)+"Z",color);

  let art=rect(0,0,400,300,scene.bg);
  switch(scene.type){
    case "night":
      art+=circle(292,70,32,"#fff1b8")+circle(307,60,30,scene.bg);
      art+=star(55,48,5)+star(100,88,3)+star(160,43,4)+star(225,100,3)+star(350,42,5)+star(365,120,3);
      art+=path("M0 174 Q80 120 150 168 T300 156 T400 168 V300 H0Z","#111936")+path("M0 220 Q100 185 190 220 T400 210 V300 H0Z","#080d22");
      art+=rect(30,214,64,38,"#251b4c",4)+line(45,218,45,252,"#6b4aa0",3)+line(78,218,78,252,"#6b4aa0",3);
      break;
    case "sky":
      art+=circle(82,68,30,"#ffd77a")+path("M0 165 Q55 120 112 160 T220 152 T330 165 T400 148 V300 H0Z","#6d3d91")+path("M0 205 Q80 176 160 207 T310 198 T400 205 V300 H0Z","#29194e");
      art+=path("M42 96 q20-22 40 0 q20-22 40 0 q-8 18-40 18 q-32 0-40-18Z","#f0d9ff")+path("M230 72 q18-20 36 0 q18-20 36 0 q-7 16-36 16 q-29 0-36-16Z","#ffffff");
      art+=star(340,75,5)+star(190,52,4);
      break;
    case "sunset":
      art+=circle(200,138,47,"#ffd36b")+path("M0 174 Q80 145 160 176 T320 166 T400 174 V300 H0Z","#472052")+path("M0 205 Q90 180 180 208 T350 200 T400 205 V300 H0Z","#1b1231");
      art+=path("M65 175 q25-35 50 0 v75 H65Z","#26162f")+line(75,190,105,190,"#a25d78",3)+line(75,208,105,208,"#a25d78",3)+line(75,226,105,226,"#a25d78",3);
      art+=star(50,65,4,"#ffe9a3")+star(335,72,5,"#ffe9a3");
      break;
    case "forest":
      art+=circle(305,70,35,"#d5ffb8")+tree(65,142,85,"#0e654d")+tree(135,128,110,"#157a58")+tree(220,145,90,"#0c5a49")+tree(320,125,115,"#1a7655")+tree(380,150,80,"#0b5545");
      art+=path("M0 215 Q100 180 200 215 T400 205 V300 H0Z","#082c2d")+path("M170 300 Q190 235 205 190 Q220 235 245 300Z","#142a28");
      art+=star(40,65,4)+star(255,48,4)+star(355,95,3);
      break;
    case "city":
      art+=circle(330,55,28,"#c7f6ff")+rect(20,115,55,135,"#1d2455",3)+rect(86,82,70,168,"#1d2455",3)+rect(168,128,48,122,"#1d2455",3)+rect(225,65,72,185,"#1d2455",3)+rect(307,105,65,145,"#1d2455",3);
      [[35,135],[60,135],[100,105],[127,105],[100,130],[127,130],[240,92],[267,92],[240,120],[321,130],[347,130]].forEach(([x,y])=>art+=rect(x,y,10,8,scene.accent,1));
      art+=rect(0,248,400,52,"#070918")+line(0,270,400,270,scene.accent,3)+star(50,55,4);
      break;
    case "temple":
      art+=circle(310,58,30,"#ffdca8")+path("M35 125 L200 60 L365 125Z","#15101d")+rect(20,125,360,17,"#b43e4f")+line(45,112,355,112,"#f08b70",7);
      art+=line(72,125,72,225,"#d85a62",12)+line(120,125,120,225,"#d85a62",12)+line(280,125,280,225,"#d85a62",12)+line(328,125,328,225,"#d85a62",12);
      art+=path("M95 220 V145 Q200 92 305 145 V220Z","#211427","#e06b65",8)+path("M55 230 Q200 190 345 230 V300 H55Z","#17101b");
      art+=circle(78,158,7,"#ffb35c")+circle(322,158,7,"#ffb35c")+star(170,45,4);
      break;
    case "beach":
      art+=circle(80,70,38,"#ffe27a")+path("M0 175 Q80 145 160 175 T320 170 T400 180 V300 H0Z","#d6b35f")+path("M0 208 Q90 180 180 208 T400 200 V300 H0Z","#08758c")+path("M0 226 Q90 205 180 226 T400 218","none","#8fe5e4",7);
      art+=path("M315 92 q-18-32-8-52 q22 27 15 52 q20-28 32-35 q3 30-24 44Z","#1b704f")+rect(326,90,8,100,"#79512d");
      art+=path("M30 105 q20-18 40 0 q20-18 40 0","none","#fff",4);
      break;
    case "winter":
      art+=circle(310,62,34,"#eefaff")+path("M0 200 L75 105 L145 200 L215 82 L315 200 L365 125 L430 205 V300 H0Z","#d9eff8")+path("M0 228 Q100 200 200 230 T400 220 V300 H0Z","#9fc8df")+path("M0 258 Q100 238 200 260 T400 250 V300 H0Z","#eaf8ff");
      art+=star(45,55,4,"#fff")+star(115,90,3,"#fff")+star(200,48,4,"#fff")+star(355,100,4,"#fff");
      art+=line(55,238,67,193,"#244e60",7)+line(67,238,79,193,"#244e60",7)+line(345,240,355,202,"#244e60",7)+line(355,240,365,202,"#244e60",7);
      break;
    case "kitsune":
      art+=circle(300,65,32,"#ffd7a0")+path("M0 205 Q80 175 150 205 T300 200 T400 210 V300 H0Z","#34162d")+path("M70 225 L130 130 L190 225Z","#1d1326")+path("M80 210 L130 155 L180 210","none","#d85a43",10)+line(105,225,105,300,"#8d3b3d",12)+line(155,225,155,300,"#8d3b3d",12);
      art+=path("M250 180 Q220 140 245 105 Q270 140 260 170 Q290 145 310 150 Q295 185 270 188Z","#ff8b3d")+path("M20 70 Q40 45 60 70 M60 70 Q80 45 100 70","none","#f6b0a4",4);
      break;
    case "space":
      art+=circle(315,75,40,"#e8ddff")+circle(300,65,40,scene.bg)+circle(115,165,30,"#6b58c9")+path("M53 165 Q115 140 177 165 Q115 190 53 165Z","none",scene.accent,7)+path("M40 165 Q115 138 190 165 Q115 192 40 165Z","none","#d7caff",2);
      art+=star(45,50,5)+star(180,50,4)+star(235,115,3)+star(350,140,5)+star(270,215,4)+star(65,220,3)+circle(345,210,18,"#9c72e8");
      break;
    case "dreams":
      art+=path("M0 195 Q70 145 140 195 T280 190 T400 200 V300 H0Z","#392b61")+path("M58 105 q22-28 44 0 q22-28 44 0 q-8 24-44 24 q-36 0-44-24Z","#f5d8ff")+path("M235 82 q20-25 40 0 q20-25 40 0 q-7 21-40 21 q-33 0-40-21Z","#f5d8ff");
      art+=path("M200 155 l10 25 27 2-21 17 7 26-23-14-23 14 7-26-21-17 27-2Z",scene.accent)+circle(105,55,18,"#ffd66b")+star(330,55,5)+star(165,80,3);
      break;
    case "aurora":
      art+=path("M0 125 Q70 45 140 125 T280 120 T400 125 L400 0 H0Z","#0d6f70")+path("M40 160 Q110 35 180 160 T320 150 T400 170","none","#77ffd3",22)+path("M80 155 Q150 55 220 155 T360 150","none","#b7a0ff",15);
      art+=tree(65,175,90,"#0a3538")+tree(155,165,105,"#0a3035")+tree(330,172,95,"#0a3437")+path("M0 230 Q100 200 200 230 T400 220 V300 H0Z","#061f2b")+star(280,48,4);
      break;
    case "halloween":
      art+=circle(310,65,34,"#ffd36e")+path("M0 205 Q100 175 200 205 T400 200 V300 H0Z","#120b18")+path("M65 205 C45 160 70 125 105 110 C140 125 155 165 135 205Z","#1d111e")+path("M82 165 l23-35 23 35","none","#ff873d",5)+line(84,178,94,178,"#ffbd57",5)+line(113,178,123,178,"#ffbd57",5)+path("M210 180 q25-45 50 0 q25-45 50 0","none","#e0a1ff",5)+star(50,65,5,"#ff9d3d");
      break;
    case "festival":
      art+=path("M0 120 Q200 165 400 120","none","#f8b6df",4)+path("M35 125 l18 30 18-30 M115 138 l18 30 18-30 M295 138 l18 30 18-30 M355 125 l18 30 18-30","none","#ffd166",4);
      art+=rect(70,190,50,80,"#261235")+rect(280,180,50,90,"#261235")+path("M65 190 L95 165 L125 190Z","#e35b78")+path("M275 180 L305 150 L335 180Z","#e35b78")+circle(200,105,22,"#ffdc72")+star(45,55,5)+star(355,65,5);
      break;
    case "summer":
      art+=circle(82,65,38,"#ffe36f")+path("M0 185 Q100 155 200 185 T400 178 V300 H0Z","#d5b35c")+path("M0 210 Q100 190 200 212 T400 205 V300 H0Z","#08758c")+path("M305 100 q-22-40-10-60 q28 32 17 60 q26-30 40-34 q0 34-29 48Z","#23865e")+rect(320,90,9,115,"#79512d")+path("M25 115 q22-20 44 0 q22-20 44 0","none","#fff",4);
      break;
    case "gold":
      art+=circle(200,112,64,"#ffd86a")+circle(200,112,38,"#fff0a3")+path("M0 210 Q100 175 200 210 T400 205 V300 H0Z","#321b09")+path("M115 210 L200 155 L285 210","none","#f5c34f",12)+line(145,210,145,270,"#d49a2e",12)+line(255,210,255,270,"#d49a2e",12)+star(55,70,6)+star(340,65,7)+star(85,145,4)+star(320,150,4);
      break;
  }

  const svg="<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 400 300\" preserveAspectRatio=\"xMidYMid slice\">"+art+"</svg>";
  const src="data:image/svg+xml;charset=UTF-8,"+encodeURIComponent(svg);
  return <img src={src} alt="" aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full object-cover"/>;
}
function EffectArt({item,large=false}:{item:Cosmetic;large?:boolean}) {
  if(item.id==="effect-none") return null;
  const symbols:Record<string,string[]> = {
    "effect-basic":["✦","✧","✦"],
    "effect-sakura":["🌸","🌸","🌸","🌸","🌸"],
    "effect-stars":["⭐","✦","✧","⭐","✦"],
    "effect-gold-aura":["✨","💛","✨","💛"],
    "effect-butterflies":["🦋","🦋","🦋"],
    "effect-blue-flames":["🔥","🔥","🔥"],
    "effect-neko-ears":["🐾","🐾"],
    "effect-snow":["❄️","❄️","❄️","❄️","❄️"],
    "effect-space":["🪐","✦","🌌","✧"],
    "effect-hearts":["💖","💗","💕","💖"],
    "effect-royal-aura":["👑","✨","👑","✨"]
  };
  const list=symbols[item.id]??["✦","✦"];
  return <div className={`pointer-events-none absolute inset-0 z-25 ${large?"":"scale-[.82]"}`}>
    <div className={`absolute left-1/2 top-1/2 h-[88%] w-[88%] -translate-x-1/2 -translate-y-1/2 rounded-full border ${item.id.includes("gold")||item.id.includes("royal")?"border-yellow-300/60 shadow-[0_0_28px_rgba(250,204,21,.35)]":"border-fuchsia-300/30 shadow-[0_0_24px_rgba(217,70,239,.3)]"} animate-pulse`}/>
    {list.map((s,i)=>{const angle=(360/list.length)*i-90;return <span key={i} className={`absolute drop-shadow-[0_0_10px_rgba(255,255,255,.9)] ${large?"text-3xl sm:text-4xl":"text-lg sm:text-2xl"}`} style={{left:`${50+48*Math.cos(angle*Math.PI/180)}%`,top:`${50+48*Math.sin(angle*Math.PI/180)}%`,transform:"translate(-50%,-50%)"}}>{s}</span>})}
  </div>;
}

function Customizer({profile,plan,frame,background,effect,badge,onClose,onSave}:{profile:Profile;plan:Plan;frame:Cosmetic;background:Cosmetic;effect:Cosmetic;badge:Cosmetic;onClose:()=>void;onSave:(patch:Record<string,string>)=>Promise<void>}) {
  const [category,setCategory]=useState<Category>("frames");
  const [filter,setFilter]=useState<"all"|Plan>("all");
  const [selected,setSelected]=useState({frames:frame.id,backgrounds:background.id,effects:effect.id,badges:badge.id});
  const [saving,setSaving]=useState(false);
  const [saveError,setSaveError]=useState<string | null>(null);

  async function handleApply() {
    if (saving) return;
    setSaving(true);
    setSaveError(null);
    try {
      await onSave({
        profile_frame:selected.frames,
        profile_background:selected.backgrounds,
        profile_effect:selected.effects,
        profile_badge:selected.badges,
      });
    } catch (error) {
      const message=error instanceof Error ? error.message : "Não foi possível salvar a personalização.";
      setSaveError(message);
      toast.error(message);
    } finally {
      setSaving(false);
    }
  }

  const currentFrame=FRAMES.find(x=>x.id===selected.frames) ?? FRAMES[0];
  const currentBackground=BACKGROUNDS.find(x=>x.id===selected.backgrounds) ?? BACKGROUNDS[0];
  const currentEffect=EFFECTS.find(x=>x.id===selected.effects) ?? EFFECTS[0];
  const currentBadge=BADGES.find(x=>x.id===selected.badges) ?? BADGES[0];

  const canUse=(item:Cosmetic)=>
    item.plan==="free" ||
    (item.plan==="premium" && plan!=="free") ||
    (item.plan==="plus" && plan==="plus");

  const items=CATALOG[category].filter(x=>filter==="all"||x.plan===filter);
  const planLabel=(p:Plan)=>p==="free"?"Grátis":p==="premium"?"Premium":"Premium Plus";
  const planIcon=(p:Plan)=>p==="free"?"":p==="premium"?"👑":"💎";

  return (
    <div className="fixed inset-0 z-[70] flex min-h-0 flex-col overflow-hidden bg-[#08081a] text-white">
      <header className="shrink-0 border-b border-violet-500/30 bg-[#090922]/95 px-3 py-3 backdrop-blur">
        <div className="mx-auto flex w-full max-w-7xl items-center gap-3">
          <button onClick={onClose} className="flex shrink-0 items-center gap-2 rounded-xl px-2 py-2 font-black text-white hover:bg-white/10">
            <ArrowLeft className="h-5 w-5"/> <span>Voltar</span>
          </button>
          <div className="flex min-w-0 flex-1 items-center gap-2">
            <span className="text-xl">🐾</span>
            <h2 className="truncate text-base font-black sm:text-lg">Personalizar perfil</h2>
          </div>
          {plan==="plus" && <span className="hidden rounded-full border border-yellow-300/50 bg-gradient-to-r from-yellow-500/20 to-fuchsia-500/20 px-3 py-1 text-xs font-black text-yellow-200 sm:inline-flex">👑 Premium Plus</span>}
          <button type="button" onClick={handleApply} disabled={saving}
            className="shrink-0 rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-500 px-4 py-2.5 font-black shadow-[0_0_22px_rgba(168,85,247,.35)] disabled:cursor-wait disabled:opacity-70">
            <Check className="mr-1 inline h-4 w-4"/>{saving ? "Salvando..." : "Aplicar"}
          </button>
        </div>
      </header>

      <div className="min-h-0 flex-1 overflow-y-auto">
        <div className="mx-auto grid w-full max-w-7xl gap-3 p-3 sm:p-4 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-4">
          <aside className="lg:sticky lg:top-4 lg:self-start">
            <div className="rounded-3xl border border-violet-500/40 bg-gradient-to-br from-[#170d42] via-[#29105d] to-[#4b126d] p-3 shadow-[0_0_30px_rgba(124,58,237,.18)]">
              <ProfileHero
                profile={profile}
                level={getLevelProgress(profile.xp)}
                frame={currentFrame}
                background={currentBackground}
                effect={currentEffect}
                badge={currentBadge}
                premium={plan!=="free"}
                plus={plan==="plus"}
              />
              <div className="mt-3 rounded-2xl border border-white/10 bg-black/20 px-3 py-2.5 text-center backdrop-blur">
                <div className="flex items-center justify-between text-xs font-black">
                  <span>{getLevelProgress(profile.xp).xpIntoLevel} XP</span>
                  <span>{getLevelProgress(profile.xp).xpForNextLevel} XP</span>
                </div>
                <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-white/15">
                  <div className="h-full rounded-full bg-gradient-to-r from-violet-400 via-fuchsia-400 to-yellow-300" style={{width:`${getLevelProgress(profile.xp).progressPercent}%`}}/>
                </div>
              </div>
              <div className="mt-3 grid grid-cols-3 gap-1.5">
                <MiniStat icon="🔥" value={profile.streak} label="Sequência"/>
                <MiniStat icon="💎" value={profile.gems} label="Diamantes"/>
                <MiniStat icon="🏆" value="—" label="Conquistas"/>
              </div>
              {(plan==="plus" || plan==="premium") && (
                <div className="mt-3 rounded-2xl border border-yellow-300/30 bg-gradient-to-r from-yellow-500/15 to-fuchsia-500/15 py-2 text-center text-xs font-black text-yellow-100">
                  {plan==="plus"?"👑 Premium Plus":"👑 Premium"}
                </div>
              )}
            </div>
          </aside>

          <section className="min-w-0 rounded-3xl border border-violet-500/30 bg-[#0c0c22] p-2.5 shadow-[0_0_30px_rgba(76,29,149,.12)] sm:p-4">
            <div className="grid grid-cols-4 gap-1.5 sm:gap-2">
              {(["frames","backgrounds","effects","badges"] as Category[]).map(c=>{
                const active=category===c;
                return <button key={c} onClick={()=>{setCategory(c);setFilter("all")}}
                  className={`flex min-w-0 items-center justify-center gap-1 rounded-xl border px-2 py-2.5 text-[10px] font-black transition sm:gap-2 sm:text-xs ${active?"border-fuchsia-400 bg-gradient-to-r from-violet-600 to-fuchsia-500 shadow-[0_0_18px_rgba(168,85,247,.35)]":"border-violet-500/20 bg-[#15152f] text-white/80"}`}>
                  <span>{c==="frames"?"◉":c==="backgrounds"?"🖼️":c==="effects"?"✨":"🏅"}</span>
                  <span className="truncate">{CATEGORY_LABELS[c]}</span>
                </button>;
              })}
            </div>

            <div className="mt-3 flex gap-1.5 overflow-x-auto pb-1">
              {(["all","free","premium","plus"] as const).map(x=>
                <button key={x} onClick={()=>setFilter(x)}
                  className={`shrink-0 rounded-full border px-3 py-1.5 text-[10px] font-black sm:text-xs ${filter===x?"border-violet-400 bg-violet-500 text-white":"border-violet-500/20 bg-[#17172f] text-white/75"}`}>
                  {x==="all"?"Todas":x==="free"?"Grátis":x==="premium"?"Premium":"Premium Plus"}
                </button>
              )}
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4">
              {items.map(item=>{
                const unlocked=canUse(item);
                const selectedNow=selected[category]===item.id;
                return (
                  <button key={item.id} disabled={!unlocked} onClick={()=>setSelected(s=>({...s,[category]:item.id}))}
                    className={`group relative min-w-0 overflow-hidden rounded-2xl border p-1.5 text-left transition-all ${selectedNow?"border-cyan-300 bg-cyan-400/10 shadow-[0_0_18px_rgba(34,211,238,.22)]":"border-violet-500/20 bg-[#11112b] hover:border-violet-400/60"} ${!unlocked?"opacity-60":""}`}>
                    <CosmeticThumbnail item={item} category={category} selected={selectedNow}/>
                    <div className="px-1.5 pb-1 pt-2">
                      <div className="truncate text-[11px] font-black sm:text-xs">{item.name}</div>
                      <div className={`mt-1 inline-flex max-w-full items-center gap-1 rounded-full px-1.5 py-0.5 text-[8px] font-black sm:text-[9px] ${item.plan==="free"?"bg-emerald-500/15 text-emerald-200":item.plan==="premium"?"bg-yellow-500/15 text-yellow-200":"bg-fuchsia-500/15 text-fuchsia-200"}`}>
                        {planIcon(item.plan)} {planLabel(item.plan)}
                      </div>
                    </div>
                    {!unlocked && <span className="absolute right-2 top-2 rounded-full bg-black/70 p-1.5 text-white"><Lock className="h-3.5 w-3.5"/></span>}
                  </button>
                );
              })}
            </div>

            <button type="button" onClick={handleApply} disabled={saving}
              className="mt-4 hidden w-full rounded-2xl bg-gradient-to-r from-violet-600 via-fuchsia-500 to-violet-600 py-3.5 font-black shadow-[0_0_24px_rgba(168,85,247,.3)] disabled:cursor-wait disabled:opacity-70 sm:block">
              <Check className="mr-1 inline h-4 w-4"/>{saving ? "Salvando..." : "Aplicar"}
            </button>
            {saveError && <p className="mt-2 text-center text-xs font-bold text-red-300">{saveError}</p>}
          </section>
        </div>
      </div>
    </div>
  );
}

function CosmeticThumbnail({item,category,selected}:{item:Cosmetic;category:Category;selected:boolean}) {
  return <div className={category==="backgrounds" ? "relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-violet-300/20 bg-[#08081d] shadow-[inset_0_0_22px_rgba(139,92,246,.12)]" : "relative h-[148px] overflow-hidden rounded-xl border border-violet-300/20 bg-[#08081d] shadow-[inset_0_0_22px_rgba(139,92,246,.12)] sm:h-[158px]"}>
    {category==="backgrounds" && <><BackgroundArt item={item} large/><div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-black/70 to-transparent"/><div className="absolute inset-x-2 bottom-2 rounded-lg border border-white/15 bg-black/25 px-2 py-1 text-center text-[9px] font-black text-white/90 backdrop-blur-sm">CENÁRIO</div></></>}
    {category === "frames" && (
      <div className="absolute inset-0 flex items-center justify-center bg-[radial-gradient(circle_at_center,rgba(139,92,246,.22),transparent_62%)]">
        <div className="relative h-36 w-36 sm:h-40 sm:w-40">
          <div className="absolute inset-[18%] z-0 flex items-center justify-center overflow-hidden rounded-full border border-white/10 bg-[#09071a] text-5xl shadow-[0_0_24px_rgba(139,92,246,.35)]">
            {item.id === "frame-neko-ears" ? "🐱" : "🐾"}
          </div>
          <FrameArt item={item} large/>
        </div>
      </div>
    )}
    {category === "effects" && (
      <>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(168,85,247,.28),transparent_58%)]"/>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-5xl drop-shadow-[0_0_14px_rgba(255,255,255,.55)]">
            {item.id === "effect-none" ? "∅" : "🐱"}
          </span>
          <EffectArt item={item} large/>
        </div>
      </>
    )}
    {category==="badges" && <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#171044] to-[#070719]"><div className="flex h-20 w-20 items-center justify-center rounded-full border border-fuchsia-300/30 bg-gradient-to-br from-violet-700/50 to-fuchsia-500/20 text-4xl shadow-[0_0_22px_rgba(168,85,247,.3)]">{item.emoji}</div><div className="absolute inset-3 rounded-full border border-yellow-300/20"/></div>}
    {selected && <span className="absolute right-2 top-2 z-40 rounded-full bg-cyan-300 p-1 text-slate-950 shadow-[0_0_12px_rgba(34,211,238,.8)]"><Check className="h-3 w-3"/></span>}
  </div>;
}


function MiniStat({icon,value,label}:{icon:string;value:number|string;label:string}) {
  return <div className="rounded-xl border border-white/10 bg-black/20 p-1.5 text-center">
    <div className="text-sm">{icon}</div><div className="text-xs font-black">{value}</div><div className="truncate text-[7px] font-bold text-white/60">{label}</div>
  </div>;
}

function AccountModal({modal,profile,name,setName,pass,setPass,confirm,setConfirm,setModal,saveName,savePass,save,t,langMeta}:{modal:string;profile:Profile;name:string;setName:(v:string)=>void;pass:string;setPass:(v:string)=>void;confirm:string;setConfirm:(v:string)=>void;setModal:(v:null|"name"|"password"|"language"|"country")=>void;saveName:()=>Promise<void>;savePass:()=>Promise<void>;save:(p:Record<string,unknown>)=>Promise<void>;t:(s:string)=>string;langMeta:any}) {
  return <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 p-4 sm:items-center" onClick={()=>setModal(null)}><div className="w-full max-w-md rounded-3xl bg-card p-6 animate-bounce-in" onClick={e=>e.stopPropagation()}>
    {modal==="name"&&<><h2 className="text-xl font-black">{t("Editar nome")}</h2><input value={name} onChange={e=>setName(e.target.value)} className="mt-4 w-full rounded-2xl border-2 border-border bg-card px-4 py-3"/><ModalActions onCancel={()=>setModal(null)} onSave={saveName}/></>}
    {modal==="password"&&<><h2 className="text-xl font-black">{t("Alterar senha")}</h2><div className="mt-4 flex flex-col gap-3"><input type="password" placeholder={t("Nova senha")} value={pass} onChange={e=>setPass(e.target.value)} className="rounded-2xl border-2 border-border bg-card px-4 py-3"/><input type="password" placeholder={t("Confirmar senha")} value={confirm} onChange={e=>setConfirm(e.target.value)} className="rounded-2xl border-2 border-border bg-card px-4 py-3"/></div><ModalActions onCancel={()=>setModal(null)} onSave={savePass}/></>}
    {modal==="language"&&<><h2 className="text-xl font-black">{t("Idioma")}</h2><div className="mt-4 flex flex-col gap-2">{LANGUAGES.map(l=><button key={l.code} onClick={async()=>{await save({language:l.code});setModal(null)}} className={`flex items-center gap-3 rounded-2xl border-2 p-3 text-left ${profile.language===l.code?"border-primary bg-accent":"border-border"}`}><span className="text-2xl">{l.flag}</span><span className="flex-1 font-bold">{l.name}</span>{profile.language===l.code&&<Check className="text-primary"/>}</button>)}</div></>}
    {modal==="country"&&<><h2 className="text-xl font-black">{t("País")}</h2><div className="mt-4 flex max-h-80 flex-col gap-2 overflow-y-auto">{COUNTRIES.map(c=><button key={c} onClick={async()=>{await save({country:c});setUiLangFromCountry(c);setModal(null)}} className={`flex items-center gap-3 rounded-2xl border-2 p-3 text-left ${profile.country===c?"border-primary bg-accent":"border-border"}`}><span className="flex-1 font-bold">{t(c)}</span>{profile.country===c&&<Check className="text-primary"/>}</button>)}</div></>}
  </div></div>;
}

function StatCard({icon,label,value}:{icon:React.ReactNode;label:string;value:number|string}){return <div className="rounded-2xl border border-border bg-card p-2 text-center shadow-card"><div className="flex justify-center text-primary [&>svg]:h-4 [&>svg]:w-4">{icon}</div><div className="mt-1 text-lg font-black">{value}</div><div className="text-[9px] font-bold uppercase text-muted-foreground">{label}</div></div>}
function Section({title,children}:{title:string;children:React.ReactNode}){return <div><h3 className="mb-2 px-2 text-xs font-bold uppercase tracking-wide text-muted-foreground">{title}</h3><div className="divide-y divide-border rounded-2xl bg-card shadow-card">{children}</div></div>}
function Row({icon,label,children}:{icon:React.ReactNode;label:string;children:React.ReactNode}){return <div className="flex items-center gap-3 px-4 py-3"><span className="text-primary">{icon}</span><span className="flex-1 text-sm font-semibold">{label}</span>{children}</div>}
function ClickRow({icon,label,onClick}:{icon:React.ReactNode;label:string;onClick:()=>void}){return <button onClick={onClick} className="flex w-full items-center gap-3 px-4 py-3 text-left"><span className="text-primary">{icon}</span><span className="flex-1 text-sm font-semibold">{label}</span><ChevronRight className="h-4 w-4 text-muted-foreground"/></button>}
function Switch({checked,onChange}:{checked:boolean;onChange:(v:boolean)=>void}){return <button onClick={()=>onChange(!checked)} className={`relative h-6 w-11 rounded-full transition ${checked?"bg-primary":"bg-muted"}`}><span className={`absolute top-0.5 h-5 w-5 rounded-full bg-card shadow transition ${checked?"left-5":"left-0.5"}`}/></button>}
function ModalActions({onCancel,onSave}:{onCancel:()=>void;onSave:()=>Promise<void>}){const t=useT();return <div className="mt-4 grid grid-cols-2 gap-3"><button onClick={onCancel} className="rounded-2xl border-2 border-border py-3 font-bold">{t("Cancelar")}</button><button onClick={onSave} className="btn-3d rounded-2xl bg-primary py-3 font-bold text-primary-foreground">{t("Salvar")}</button></div>}

