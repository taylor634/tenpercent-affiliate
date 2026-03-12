
-- Drop the broken restrictive policies
DROP POLICY IF EXISTS "Users can view own profile" ON public.affiliate_profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.affiliate_profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON public.affiliate_profiles;
DROP POLICY IF EXISTS "Admins can view all profiles" ON public.affiliate_profiles;
DROP POLICY IF EXISTS "Admins can update all profiles" ON public.affiliate_profiles;
DROP POLICY IF EXISTS "Admins can delete profiles" ON public.affiliate_profiles;

-- Recreate as PERMISSIVE (default) so they are OR'd together
CREATE POLICY "Users can view own profile" ON public.affiliate_profiles
  FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "Users can update own profile" ON public.affiliate_profiles
  FOR UPDATE TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own profile" ON public.affiliate_profiles
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can view all profiles" ON public.affiliate_profiles
  FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update all profiles" ON public.affiliate_profiles
  FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete profiles" ON public.affiliate_profiles
  FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
