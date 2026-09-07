CREATE OR REPLACE FUNCTION public.photo_analysis_status(_user_id uuid DEFAULT auth.uid())
RETURNS jsonb LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path = public AS $$
DECLARE p record; used int; lim int; unlimited boolean; plan text;
BEGIN
  IF _user_id IS NULL THEN RAISE EXCEPTION 'Unauthorized'; END IF;
  IF auth.uid() IS NOT NULL AND _user_id <> auth.uid() THEN RAISE EXCEPTION 'Forbidden'; END IF;

  SELECT * INTO p FROM public.profiles WHERE id = _user_id;
  unlimited := COALESCE(public.has_role(_user_id,'admin'), false)
    OR (COALESCE(p.is_premium_plus,false) AND (p.premium_plus_until IS NULL OR p.premium_plus_until > now()));
  IF unlimited THEN plan := 'plus'; lim := NULL;
  ELSIF COALESCE(p.is_premium,false) AND (p.premium_until IS NULL OR p.premium_until > now()) THEN plan := 'premium'; lim := 10;
  ELSE plan := 'free'; lim := 0; END IF;

  SELECT COALESCE(count,0) INTO used FROM public.photo_analysis_usage WHERE user_id = _user_id AND day = current_date;
  used := COALESCE(used,0);

  RETURN jsonb_build_object('plan',plan,'unlimited',unlimited,'used',used,'limit',lim,
    'remaining', CASE WHEN unlimited THEN NULL ELSE GREATEST(0, COALESCE(lim,0) - used) END);
END; $$;

CREATE OR REPLACE FUNCTION public.consume_photo_analysis(_user_id uuid DEFAULT auth.uid())
RETURNS jsonb LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE st jsonb; newcount int;
BEGIN
  IF _user_id IS NULL THEN RAISE EXCEPTION 'Unauthorized'; END IF;
  IF auth.uid() IS NOT NULL AND _user_id <> auth.uid() THEN RAISE EXCEPTION 'Forbidden'; END IF;

  st := public.photo_analysis_status(_user_id);
  IF (st->>'unlimited')::boolean IS NOT TRUE AND COALESCE((st->>'remaining')::int,0) <= 0 THEN
    RETURN st || jsonb_build_object('allowed', false);
  END IF;

  INSERT INTO public.photo_analysis_usage (user_id, day, count)
  VALUES (_user_id, current_date, 1)
  ON CONFLICT (user_id, day) DO UPDATE SET count = public.photo_analysis_usage.count + 1, updated_at = now()
  RETURNING count INTO newcount;

  RETURN jsonb_build_object(
    'allowed', true,
    'plan', st->>'plan',
    'unlimited', (st->>'unlimited')::boolean,
    'used', newcount,
    'limit', CASE WHEN st->>'limit' IS NULL THEN NULL ELSE (st->>'limit')::int END,
    'remaining', CASE WHEN (st->>'unlimited')::boolean THEN NULL ELSE GREATEST(0, (st->>'limit')::int - newcount) END
  );
END; $$;

REVOKE EXECUTE ON FUNCTION public.photo_analysis_status(uuid) FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION public.consume_photo_analysis(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.photo_analysis_status(uuid) TO authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.consume_photo_analysis(uuid) TO authenticated, service_role;