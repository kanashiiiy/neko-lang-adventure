ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS is_premium_plus boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS premium_plus_until timestamptz;