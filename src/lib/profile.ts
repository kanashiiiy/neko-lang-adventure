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
  streak: number;
  last_activity_date: string | null;
  is_premium: boolean;
  onboarding_complete: boolean;
  theme: string;
  notifications_enabled: boolean;
}

export async function fetchProfile(userId: string): Promise<Profile | null> {
  const { data, error } = await supabase.from("profiles").select("*").eq("id", userId).maybeSingle();
  if (error) throw error;
  return data as Profile | null;
}

export async function updateProfile(userId: string, patch: Partial<Profile>) {
  const { data, error } = await supabase
    .from("profiles")
    .update(patch)
    .eq("id", userId)
    .select()
    .maybeSingle();
  if (error) throw error;
  return data as Profile;
}

export async function addXpAndGems(userId: string, xpDelta: number, gemsDelta: number) {
  const profile = await fetchProfile(userId);
  if (!profile) return null;
  const today = new Date().toISOString().slice(0, 10);
  let streak = profile.streak;
  if (profile.last_activity_date !== today) {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const y = yesterday.toISOString().slice(0, 10);
    streak = profile.last_activity_date === y ? streak + 1 : 1;
  }
  return updateProfile(userId, {
    xp: profile.xp + xpDelta,
    gems: profile.gems + gemsDelta,
    streak,
    last_activity_date: today,
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
