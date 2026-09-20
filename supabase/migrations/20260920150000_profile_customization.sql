-- NEKOTeach profile customization
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS username TEXT,
  ADD COLUMN IF NOT EXISTS profile_frame TEXT NOT NULL DEFAULT 'frame-default',
  ADD COLUMN IF NOT EXISTS profile_background TEXT NOT NULL DEFAULT 'bg-default',
  ADD COLUMN IF NOT EXISTS profile_effect TEXT NOT NULL DEFAULT 'effect-none',
  ADD COLUMN IF NOT EXISTS profile_badge TEXT NOT NULL DEFAULT 'badge-beginner';

CREATE UNIQUE INDEX IF NOT EXISTS profiles_username_unique
  ON public.profiles (lower(username))
  WHERE username IS NOT NULL;

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  base_username TEXT;
BEGIN
  base_username := lower(regexp_replace(
    COALESCE(NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1), 'nekouser'),
    '[^a-zA-Z0-9_]+', '', 'g'
  ));
  IF base_username = '' THEN base_username := 'nekouser'; END IF;

  INSERT INTO public.profiles (id, email, name, username)
  VALUES (NEW.id, NEW.email, COALESCE(NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1)), base_username)
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;
