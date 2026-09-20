import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState, useEffect, useRef } from "react";
import { toast } from "@/lib/neko-toast";
import {
  Flame, Gem, Trophy, Edit3, Lock, Globe, MapPin, Bell, Moon, Shield, LogOut,
  ChevronRight, Award, Camera, ArrowLeft, Palette, Sparkles, Check, Crown,
  Image as ImageIcon, Medal
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
    if (!profile) return;
    await updateProfile(profile.id, patch as Partial<Profile>);
    await qc.invalidateQueries({ queryKey:["profile"] });
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
  return <div className={`relative overflow-hidden rounded-[2rem] p-5 text-white shadow-soft ${background.className}`}>
    <div className="absolute inset-0 bg-black/15"/>
    <div className="relative flex flex-col items-center text-center">
      <div className="relative flex h-36 w-36 items-center justify-center">
        <div className={`absolute inset-1 rounded-full ${frame.className} ${frame.id==="frame-default"?"border-2 border-white/50":""}`}/>
        <div className={`absolute inset-0 flex items-center justify-center text-3xl ${effect.className}`}>{effect.emoji}</div>
        <div className="relative z-10 rounded-full"><ProfileAvatar name={profile.name} url={profile.avatar_url} size={104}/></div>
        <div className="absolute -bottom-1 -right-1 z-20 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/30 bg-black/35 text-2xl backdrop-blur">{badge.emoji}</div>
      </div>
      <div className="mt-3 text-2xl font-black">{displayName}</div>
      <div className="text-sm font-bold opacity-80">@{profile.username || displayName.toLowerCase().replace(/[^a-z0-9]+/g,"").slice(0,24) || "nekouser"}</div>
      <div className="mt-2 flex items-center gap-2"><span className="rounded-full bg-white/15 px-3 py-1 text-xs font-black">Nível {level.level}</span>{plus&&<span className="rounded-full bg-yellow-400/20 px-2 py-1 text-xs">💎 PLUS</span>}{premium&&!plus&&<span className="rounded-full bg-yellow-400/20 px-2 py-1 text-xs">👑 PREMIUM</span>}</div>
    </div>
  </div>;
}

function Customizer({profile,plan,frame,background,effect,badge,onClose,onSave}:{profile:Profile;plan:Plan;frame:Cosmetic;background:Cosmetic;effect:Cosmetic;badge:Cosmetic;onClose:()=>void;onSave:(patch:Record<string,string>)=>Promise<void>}) {
  const [category,setCategory]=useState<Category>("frames");
  const [filter,setFilter]=useState<"all"|Plan>("all");
  const [selected,setSelected]=useState({frames:frame.id,backgrounds:background.id,effects:effect.id,badges:badge.id});
  const preview=(id:string)=>({frame:FRAMES.find(x=>x.id===id)??FRAMES[0],background:BACKGROUNDS.find(x=>x.id===selected.backgrounds)??BACKGROUNDS[0],effect:EFFECTS.find(x=>x.id===selected.effects)??EFFECTS[0],badge:BADGES.find(x=>x.id===selected.badges)??BADGES[0]});
  const p=preview(selected.frames);
  const canUse=(item:Cosmetic)=>item.plan==="free" || (item.plan==="premium" && plan!=="free") || (item.plan==="plus" && plan==="plus");
  const items=CATALOG[category].filter(x=>filter==="all"||x.plan===filter);
  return <div className="fixed inset-0 z-[70] flex flex-col bg-background">
    <header className="flex items-center justify-between border-b border-border bg-card px-4 py-3"><button onClick={onClose} className="flex items-center gap-2 font-black"><ArrowLeft className="h-5 w-5"/>Voltar</button><h2 className="font-black">Personalizar perfil</h2><button onClick={()=>onSave({profile_frame:selected.frames,profile_background:selected.backgrounds,profile_effect:selected.effects,profile_badge:selected.badges})} className="rounded-xl bg-primary px-4 py-2 font-black text-primary-foreground"><Check className="mr-1 inline h-4 w-4"/>Aplicar</button></header>
    <div className={`shrink-0 border-b border-white/10 p-4 text-white ${p.background.className}`}>
      <div className="mx-auto max-w-sm"><ProfileHero profile={profile} level={getLevelProgress(profile.xp)} frame={p.frame} background={p.background} effect={p.effect} badge={p.badge} premium={plan!=="free"} plus={plan==="plus"}/></div>
    </div>
    <div className="flex gap-2 overflow-x-auto border-b border-border bg-card p-3">{(["frames","backgrounds","effects","badges"] as Category[]).map(c=><button key={c} onClick={()=>{setCategory(c);setFilter("all")}} className={`whitespace-nowrap rounded-xl px-3 py-2 text-xs font-black ${category===c?"bg-primary text-primary-foreground":"bg-muted"}`}>{c==="frames"?"🟣":c==="backgrounds"?"🖼️":c==="effects"?"✨":"🏅"} {CATEGORY_LABELS[c]}</button>)}</div>
    <div className="flex gap-2 overflow-x-auto px-4 py-3"><button onClick={()=>setFilter("all")} className={`rounded-full px-3 py-1.5 text-xs font-bold ${filter==="all"?"bg-primary text-primary-foreground":"bg-muted"}`}>Todos</button>{(["free","premium","plus"] as Plan[]).map(x=><button key={x} onClick={()=>setFilter(x)} className={`rounded-full px-3 py-1.5 text-xs font-bold ${filter===x?"bg-primary text-primary-foreground":"bg-muted"}`}>{x==="free"?"Grátis":x==="premium"?"Premium":"Premium Plus"}</button>)}</div>
    <div className="grid flex-1 grid-cols-2 gap-3 overflow-y-auto p-4 sm:grid-cols-3">
      {items.map(item=>{const unlocked=canUse(item);const selectedNow=selected[category]===item.id;return <button key={item.id} disabled={!unlocked} onClick={()=>setSelected(s=>({...s,[category]:item.id}))} className={`relative overflow-hidden rounded-2xl border-2 p-3 text-left transition ${selectedNow?"border-primary ring-2 ring-primary/20":"border-border"} ${!unlocked?"opacity-55":""}`}>
        <div className={`mb-3 flex h-24 items-center justify-center rounded-xl text-4xl ${category==="backgrounds"?item.className:"bg-muted"} `}>{item.emoji}</div>
        <div className="font-black text-sm">{item.name}</div>
        <div className="mt-1 text-[10px] font-bold uppercase text-muted-foreground">{item.plan==="free"?"Grátis":item.plan==="premium"?"Premium":"Premium Plus"}</div>
        {!unlocked&&<div className="absolute right-2 top-2 rounded-full bg-black/60 p-1 text-white"><Lock className="h-4 w-4"/></div>}
        {selectedNow&&<div className="absolute right-2 bottom-2 rounded-full bg-primary p-1 text-primary-foreground"><Check className="h-4 w-4"/></div>}
      </button>})}
    </div>
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

