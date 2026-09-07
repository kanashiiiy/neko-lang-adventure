REVOKE ALL ON FUNCTION public.photo_analysis_status(uuid) FROM PUBLIC, anon;
REVOKE ALL ON FUNCTION public.consume_photo_analysis(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.photo_analysis_status(uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION public.consume_photo_analysis(uuid) TO authenticated, service_role;