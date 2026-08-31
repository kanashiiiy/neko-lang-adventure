-- Roles enum
DO $$ BEGIN
  CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

CREATE TABLE IF NOT EXISTS public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "users can read own roles" ON public.user_roles;
CREATE POLICY "users can read own roles"
ON public.user_roles FOR SELECT TO authenticated
USING (auth.uid() = user_id);

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO authenticated;

-- Admin-only app statistics
CREATE OR REPLACE FUNCTION public.admin_app_stats()
RETURNS jsonb
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE result jsonb;
BEGIN
  IF NOT public.has_role(auth.uid(), 'admin') THEN
    RAISE EXCEPTION 'Forbidden';
  END IF;

  SELECT jsonb_build_object(
    'total_users', (SELECT count(*) FROM public.profiles),
    'active_today', (SELECT count(*) FROM public.profiles WHERE last_activity_date = current_date),
    'active_7d', (SELECT count(*) FROM public.profiles WHERE last_activity_date >= current_date - 7),
    'active_30d', (SELECT count(*) FROM public.profiles WHERE last_activity_date >= current_date - 30),
    'premium', (SELECT count(*) FROM public.profiles WHERE is_premium AND (premium_until IS NULL OR premium_until > now())),
    'premium_plus', (SELECT count(*) FROM public.profiles WHERE is_premium_plus AND (premium_plus_until IS NULL OR premium_plus_until > now())),
    'signups_today', (SELECT count(*) FROM public.profiles WHERE created_at >= current_date),
    'signups_7d', (SELECT count(*) FROM public.profiles WHERE created_at >= current_date - 7),
    'signups_30d', (SELECT count(*) FROM public.profiles WHERE created_at >= current_date - 30),
    'lessons_completed', (SELECT count(*) FROM public.lesson_progress WHERE completed),
    'signups_daily', (
      SELECT COALESCE(jsonb_agg(x ORDER BY x->>'day'), '[]'::jsonb) FROM (
        SELECT jsonb_build_object('day', to_char(d.day, 'YYYY-MM-DD'), 'count',
          (SELECT count(*) FROM public.profiles p WHERE p.created_at::date = d.day)) AS x
        FROM generate_series(current_date - 13, current_date, interval '1 day') AS d(day)
      ) s
    )
  ) INTO result;

  RETURN result;
END;
$$;

GRANT EXECUTE ON FUNCTION public.admin_app_stats() TO authenticated;

-- Grant admin to the currently signed-in account (no data changes)
INSERT INTO public.user_roles (user_id, role)
SELECT id, 'admin'::public.app_role FROM auth.users WHERE email = 'loidzx05@gmail.com'
ON CONFLICT (user_id, role) DO NOTHING;