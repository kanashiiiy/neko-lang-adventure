CREATE TABLE IF NOT EXISTS public.photo_analysis_usage (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  day date NOT NULL DEFAULT current_date,
  count integer NOT NULL DEFAULT 0,
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, day)
);

GRANT SELECT ON public.photo_analysis_usage TO authenticated;
GRANT ALL ON public.photo_analysis_usage TO service_role;

ALTER TABLE public.photo_analysis_usage ENABLE ROW LEVEL SECURITY;

CREATE POLICY "own_photo_usage_select" ON public.photo_analysis_usage
  FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE OR REPLACE FUNCTION public.photo_analysis_status(_user_id uuid DEFAULT auth.uid())
RETURNS jsonb
LANGUAGE plpgsql
STABLE SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  is_plus boolean;
  is_prem boolean;
  is_adm boolean;
  used int;
BEGIN
  IF _user_id IS NULL THEN RAISE EXCEPTION 'Unauthenticated'; END IF;

  SELECT (p.is_premium_plus AND (p.premium_plus_until IS NULL OR p.premium_plus_until > now())),
         (p.is_premium AND (p.premium_until IS NULL OR p.premium_until > now()))
    INTO is_plus, is_prem
  FROM public.profiles p WHERE p.id = _user_id;

  is_adm := public.has_role(_user_id, 'admin');
  SELECT COALESCE(u.count, 0) INTO used
  FROM public.photo_analysis_usage u WHERE u.user_id = _user_id AND u.day = current_date;
  used := COALESCE(used, 0);

  IF COALESCE(is_plus, false) OR is_adm THEN
    RETURN jsonb_build_object('plan', 'plus', 'unlimited', true, 'used', used, 'limit', null, 'remaining', null);
  ELSIF COALESCE(is_prem, false) THEN
    RETURN jsonb_build_object('plan', 'premium', 'unlimited', false, 'used', used, 'limit', 10, 'remaining', GREATEST(0, 10 - used));
  ELSE
    RETURN jsonb_build_object('plan', 'free', 'unlimited', false, 'used', used, 'limit', 0, 'remaining', 0);
  END IF;
END;
$$;

CREATE OR REPLACE FUNCTION public.consume_photo_analysis(_user_id uuid DEFAULT auth.uid())
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  st jsonb;
  used int;
BEGIN
  st := public.photo_analysis_status(_user_id);

  IF (st->>'unlimited')::boolean THEN
    INSERT INTO public.photo_analysis_usage (user_id, day, count)
    VALUES (_user_id, current_date, 1)
    ON CONFLICT (user_id, day) DO UPDATE SET count = public.photo_analysis_usage.count + 1, updated_at = now()
    RETURNING count INTO used;
    RETURN jsonb_build_object('allowed', true, 'plan', 'plus', 'unlimited', true, 'used', used, 'limit', null, 'remaining', null);
  END IF;

  IF (st->>'remaining')::int <= 0 THEN
    RETURN st || jsonb_build_object('allowed', false);
  END IF;

  INSERT INTO public.photo_analysis_usage (user_id, day, count)
  VALUES (_user_id, current_date, 1)
  ON CONFLICT (user_id, day) DO UPDATE SET count = public.photo_analysis_usage.count + 1, updated_at = now()
  RETURNING count INTO used;

  RETURN jsonb_build_object('allowed', true, 'plan', st->>'plan', 'unlimited', false, 'used', used,
    'limit', (st->>'limit')::int, 'remaining', GREATEST(0, (st->>'limit')::int - used));
END;
$$;

GRANT EXECUTE ON FUNCTION public.photo_analysis_status(uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION public.consume_photo_analysis(uuid) TO authenticated;