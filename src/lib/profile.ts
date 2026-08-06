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
  onboarding_complete: boolean;
  theme: string;
  notifications_enabled: boolean;
}

export function isPremiumActive(profile: Pick<Profile, "is_premium" | "premium_until"> | null | undefined) {
  if (!profile?.is_premium) return false;
  if (!profile.premium_until) return true;
  return new Date(profile.premium_until).getTime() > Date.now();
}

export async function fetchProfile(userId: string): Promise<Profile | null> {
  const { data, error } = await supabase.from("profiles").select("*").eq("id", userId).maybeSingle();
  if (error) throw error;
  const profile = data as Profile | null;
  // Premium/trial expirou -> volta automaticamente ao Foco normal
  if (profile?.is_premium && profile.premium_until && !isPremiumActive(profile)) {
    return await updateProfile(userId, { is_premium: false });
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

export async function addXpAndGems(
  userId: string,
  xpDelta: number,
  gemsDelta: number,
  focusDelta = 0,
) {
  const profile = await fetchProfile(userId);
  if (!profile) return null;
  const today = new Date().toISOString().slice(0, 10);
  let streak = profile.streak;
  if (profile.last_activity_date !== today) {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const y = yesterday.toISOString().slice(0, 10);
    streak = profile.last_activity_date === y ? streak + 1 : Math.max(1, streak);
  }
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
