import { supabase } from "@/integrations/supabase/client";

export interface Profile {
  id: string;
  name: string | null;
  email: string | null;
  avatar_url: string | null;
  language: string;
  country: string | null;
  age: number | null;
  goal: string | null;
  level: string;
  xp: number;
  gems: number;
  focus: number;
  streak: number;
  last_activity_date: string | null;
  last_focus_refill: string | null;
  is_premium: boolean;
  premium_until: string | null;
  is_premium_plus: boolean;
  premium_plus_until: string | null;
  onboarding_complete: boolean;
  theme: string;
  notifications_enabled: boolean;
  /** Somente leitura no cliente: derivado da função de Administrador no backend */
  is_admin?: boolean;
}

export function isPremiumActive(
  profile: (Pick<Profile, "is_premium" | "premium_until"> & { is_admin?: boolean }) | null | undefined,
) {
  if (profile?.is_admin) return true;
  if (!profile?.is_premium) return false;
  if (!profile.premium_until) return true;
  return new Date(profile.premium_until).getTime() > Date.now();
}

export function isPremiumPlusActive(
  profile:
    | (Pick<Profile, "is_premium_plus" | "premium_plus_until"> & { is_admin?: boolean })
    | null
    | undefined,
) {
  if (profile?.is_admin) return true;
  if (!profile?.is_premium_plus) return false;
  if (!profile.premium_plus_until) return true;
  return new Date(profile.premium_plus_until).getTime() > Date.now();
}

export async function isAdmin(userId: string): Promise<boolean> {
  try {
    const { data, error } = await supabase.rpc("has_role", { _user_id: userId, _role: "admin" });
    if (error) return false;
    return Boolean(data);
  } catch {
    return false;
  }
}

export async function fetchProfile(userId: string): Promise<Profile | null> {
  const { data, error } = await supabase.from("profiles").select("*").eq("id", userId).maybeSingle();
  if (error) throw error;
  const raw = data as Profile | null;
  const admin = raw ? await isAdmin(userId) : false;
  const profile = raw ? ({ ...raw, is_admin: admin } as Profile) : null;
  // Premium/trial expirou -> volta automaticamente ao Foco normal
  if (!admin && profile?.is_premium && profile.premium_until && !isPremiumActive({ ...profile, is_admin: false })) {
    const updated = await updateProfile(userId, { is_premium: false });
    return { ...updated, is_admin: admin };
  }
  // Premium Plus expirado -> volta ao plano normal
  if (
    !admin &&
    profile?.is_premium_plus &&
    profile.premium_plus_until &&
    !isPremiumPlusActive({ ...profile, is_admin: false })
  ) {
    const updated = await updateProfile(userId, { is_premium_plus: false });
    return { ...updated, is_admin: admin };
  }
  return profile;
}

export async function updateProfile(userId: string, patch: Partial<Profile>) {
  const { data, error } = await supabase
    .from("profiles")
    .update(patch as never)
    .eq("id", userId)
    .select()
    .maybeSingle();
  if (error) throw error;
  return data as Profile;
}

// Data local (YYYY-MM-DD) — a sequência conta dias do calendário do usuário
function localDay(offsetDays = 0) {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

// Regra: 1º dia = 1; dia seguinte consecutivo = +1; pulou um dia = volta a 1;
// várias entradas no mesmo dia não alteram nada.
export function nextStreak(lastDate: string | null | undefined, current: number) {
  const today = localDay();
  if (lastDate === today) return current > 0 ? current : 1;
  if (lastDate === localDay(-1)) return current + 1;
  return 1;
}

// Chamado ao abrir o app (uma vez por dia efetivamente)
export async function touchStreak(userId: string) {
  const profile = await fetchProfile(userId);
  if (!profile) return null;
  const today = localDay();
  if (profile.last_activity_date === today && profile.streak > 0) return profile;
  return updateProfile(userId, {
    streak: nextStreak(profile.last_activity_date, profile.streak),
    last_activity_date: today,
  });
}

export async function addXpAndGems(
  userId: string,
  xpDelta: number,
  gemsDelta: number,
  focusDelta = 0,
) {
  const profile = await fetchProfile(userId);
  if (!profile) return null;
  const today = localDay();
  const streak =
    profile.last_activity_date === today
      ? Math.max(1, profile.streak)
      : nextStreak(profile.last_activity_date, profile.streak);
  return updateProfile(userId, {
    xp: profile.xp + xpDelta,
    gems: profile.gems + gemsDelta,
    focus: Math.max(0, profile.focus + focusDelta),
    streak,
    last_activity_date: today,
  });
}


export async function spendFocus(userId: string, amount = 1) {
  const profile = await fetchProfile(userId);
  if (!profile) return null;
  if (isPremiumActive(profile)) return profile; // Foco infinito
  if (profile.focus < amount) return null;
  return updateProfile(userId, { focus: profile.focus - amount });
}

export async function buyFocus(userId: string, focusAmount: number, gemCost: number) {
  const profile = await fetchProfile(userId);
  if (!profile) return null;
  if (profile.gems < gemCost) return null;
  return updateProfile(userId, {
    focus: profile.focus + focusAmount,
    gems: profile.gems - gemCost,
  });
}

export async function saveLessonCompletion(
  userId: string,
  language: string,
  lessonId: string,
  score: number,
  xpEarned: number,
) {
  const { error } = await supabase.from("lesson_progress").upsert(
    {
      user_id: userId,
      language,
      lesson_id: lessonId,
      completed: true,
      score,
      xp_earned: xpEarned,
      completed_at: new Date().toISOString(),
    },
    { onConflict: "user_id,language,lesson_id" },
  );
  if (error) throw error;
}

export async function fetchCompletedLessons(userId: string, language: string) {
  const { data, error } = await supabase
    .from("lesson_progress")
    .select("lesson_id, completed")
    .eq("user_id", userId)
    .eq("language", language)
    .eq("completed", true);
  if (error) throw error;
  return new Set((data ?? []).map((r) => r.lesson_id));
}
