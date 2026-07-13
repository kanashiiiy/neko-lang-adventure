
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS focus integer NOT NULL DEFAULT 20,
  ADD COLUMN IF NOT EXISTS last_focus_refill timestamptz;

ALTER TABLE public.profiles ALTER COLUMN gems SET DEFAULT 0;
ALTER TABLE public.profiles ALTER COLUMN streak SET DEFAULT 1;

-- Backfill existing accounts to the new starting values so displayed stats match spec
UPDATE public.profiles SET gems = 0 WHERE gems = 50 AND xp = 0;
UPDATE public.profiles SET streak = 1 WHERE streak = 0;
