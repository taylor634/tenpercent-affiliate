
-- Fix 1: Restrict headshot uploads to user's own folder
DROP POLICY IF EXISTS "Authenticated users can upload headshots" ON storage.objects;
CREATE POLICY "Authenticated users can upload headshots"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'headshots'
  AND (auth.uid())::text = (storage.foldername(name))[1]
);

-- Fix 2: Change user_roles SELECT policies from public to authenticated
DROP POLICY IF EXISTS "Users can read own roles" ON public.user_roles;
CREATE POLICY "Users can read own roles"
ON public.user_roles FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Admins can read all roles" ON public.user_roles;
CREATE POLICY "Admins can read all roles"
ON public.user_roles FOR SELECT
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

-- Fix 3: Tighten storage policies from public to authenticated where applicable
DROP POLICY IF EXISTS "Users can delete own headshots" ON storage.objects;
CREATE POLICY "Users can delete own headshots"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'headshots' AND (auth.uid())::text = (storage.foldername(name))[1]);

DROP POLICY IF EXISTS "Users can update own headshots" ON storage.objects;
CREATE POLICY "Users can update own headshots"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'headshots' AND (auth.uid())::text = (storage.foldername(name))[1]);
