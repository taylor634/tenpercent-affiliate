
-- Drop existing INSERT policy on headshots bucket
DROP POLICY IF EXISTS "Users can upload headshots" ON storage.objects;
DROP POLICY IF EXISTS "Users can upload own headshots" ON storage.objects;

-- Create restricted INSERT policy enforcing folder ownership
CREATE POLICY "Users can upload own headshots"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'headshots'
  AND (auth.uid())::text = (storage.foldername(name))[1]
);
