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
  const scenes:Record<string,{sky:string;ground:string;objects:string[]}> = {
    "bg-default":{sky:"from-[#391078] via-[#6416a1] to-[#15052f]",ground:"from-[#220743] to-[#09051b]",objects:["✦","✧","🌙"]},
    "bg-night":{sky:"from-[#07122e] via-[#17145a] to-[#2b0d56]",ground:"from-[#0b102b] to-[#050817]",objects:["🌙","✦","✦","☁️"]},
    "bg-purple-sky":{sky:"from-[#1b145d] via-[#6522a9] to-[#e052cf]",ground:"from-[#35105f] to-[#12082c]",objects:["☁️","☁️","✦","✧"]},
    "bg-sunset":{sky:"from-[#ff7a45] via-[#df3f83] to-[#4b187f]",ground:"from-[#6b1e58] to-[#16082d]",objects:["☀️","☁️","✦"]},
    "bg-magic-forest":{sky:"from-[#071d2b] via-[#164f55] to-[#402067]",ground:"from-[#061f24] to-[#120821]",objects:["🌲","🌲","✨","🌿"]},
    "bg-neon-city":{sky:"from-[#080c25] via-[#3a105d] to-[#091e55]",ground:"from-[#060817] to-[#12082e]",objects:["🌃","▥","▥","✦"]},
    "bg-japanese-temple":{sky:"from-[#160d35] via-[#54143e] to-[#110a25]",ground:"from-[#160c22] to-[#05050f]",objects:["⛩️","🌸","🏮","🌙"]},
    "bg-beach":{sky:"from-[#25c8ed] via-[#54e3df] to-[#f8c76b]",ground:"from-[#087c9c] to-[#174d6a]",objects:["☀️","🌴","🌊","🏝️"]},
    "bg-winter":{sky:"from-[#193c66] via-[#6bbbe4] to-[#e7f7ff]",ground:"from-[#aacfe8] to-[#526d94]",objects:["❄️","❄️","🏔️","✧"]},
    "bg-kitsune":{sky:"from-[#351044] via-[#a52d45] to-[#f28a35]",ground:"from-[#42172d] to-[#13081e]",objects:["🦊","⛩️","🌙","🔥"]},
    "bg-space":{sky:"from-[#02020b] via-[#111044] to-[#2a0c55]",ground:"from-[#03030c] to-[#0c0622]",objects:["🪐","🌌","✦","✧"]},
    "bg-dreams":{sky:"from-[#4b126c] via-[#b342b5] to-[#49a9dd]",ground:"from-[#35104d] to-[#0b1731]",objects:["☁️","💫","🌙","✦"]},
    "bg-aurora":{sky:"from-[#063f46] via-[#087b83] to-[#4a247f]",ground:"from-[#05252f] to-[#12072b]",objects:["🌈","✦","🌲","✧"]},
    "bg-halloween":{sky:"from-[#050509] via-[#3c1035] to-[#8c2b16]",ground:"from-[#12050d] to-[#050307]",objects:["🎃","🕸","🌙","🦇"]},
    "bg-festival":{sky:"from-[#16114f] via-[#a52972] to-[#f0a33c]",ground:"from-[#24103c] to-[#100719]",objects:["🎆","🏮","✨","🎇"]},
    "bg-summer":{sky:"from-[#4bd7ff] via-[#39cfe2] to-[#ffd84f]",ground:"from-[#05758e] to-[#0b526d]",objects:["☀️","🌴","🌊","🕊️"]},
    "bg-gold":{sky:"from-[#3b1d05] via-[#b27612] to-[#ffe59a]",ground:"from-[#4b2607] to-[#120a03]",objects:["✨","👑","💎","✦"]}
  };
  const scene=scenes[item.id]??scenes["bg-default"];
  return <div className={`pointer-events-none absolute inset-0 overflow-hidden bg-gradient-to-br ${scene.sky}`}>
    <div className={`absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t ${scene.ground}`}/>
    <div className="absolute -left-10 top-1/4 h-24 w-32 rounded-full bg-white/10 blur-2xl"/>
    {scene.objects.map((o,i)=><span key={i} className={`absolute opacity-95 drop-shadow-[0_2px_10px_rgba(255,255,255,.45)] ${large?"text-4xl sm:text-5xl":"text-2xl"}`} style={{left:`${8+(i*23)%80}%`,top:`${8+(i*19)%68}%`,transform:`translate(-50%,-50%) rotate(${(i%2===0?-1:1)*(4+i*3)}deg)`}}>{o}</span>)}
    <div className="absolute inset-0 opacity-30" style={{backgroundImage:"radial-gradient(circle,rgba(255,255,255,.7) 1px,transparent 1px)",backgroundSize:"20px 20px"}}/><div className="absolute inset-x-0 bottom-0 h-[42%] bg-[linear-gradient(to_top,rgba(3,3,15,.82),transparent)]"/><div className="absolute inset-x-3 bottom-3 h-2 rounded-full bg-white/10 blur-md"/>
  </div>;
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
  return <div className="relative h-[148px] overflow-hidden rounded-xl border border-violet-300/20 bg-[#08081d] shadow-[inset_0_0_22px_rgba(139,92,246,.12)] sm:h-[158px]">
    {category==="backgrounds" && <><BackgroundArt item={item} large/><div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-black/70 to-transparent"/><div className="absolute inset-x-2 bottom-2 rounded-lg border border-white/15 bg-black/25 px-2 py-1 text-center text-[9px] font-black text-white/90 backdrop-blur-sm">CENÁRIO</div></></>}
    {category==="frames" && <div className="absolute inset-0 flex items-center justify-center bg-[radial-gradient(circle_at_center,rgba(139,92,246,.22),transparent_62%)]"><div className="relative h-36 w-36 sm:h-40 sm:w-40"><div className="absolute inset-[18%] z-0 flex items-center justify-center overflow-hidden rounded-full border border-white/10 bg-[#09071a] text-5xl shadow-[0_0_24px_rgba(139,92,246,.35)]">{item.id==="frame-neko-ears"?"🐱":"🐾"}</div><FrameArt item={item} large/></div></div>}
    {category==="effects" && <><div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(168,85,247,.28),transparent_58%)]"/><div className="absolute inset-0 flex items-center justify-center"><span className="text-5xl drop-shadow-[0_0_14px_rgba(255,255,255,.55)]">{item.id==="effect-none"?"∅":"🐱"}</span><EffectArt item={item} large/></div></>}
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

