-- Create RLS policies for prescriptions storage bucket

-- Allow authenticated users to upload their own prescription files
CREATE POLICY "Users can upload their own prescriptions"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'prescriptions' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

-- Allow authenticated users to view their own prescription files
CREATE POLICY "Users can view their own prescriptions"
ON storage.objects
FOR SELECT
TO authenticated
USING (
  bucket_id = 'prescriptions' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

-- Allow authenticated users to delete their own prescription files
CREATE POLICY "Users can delete their own prescriptions"
ON storage.objects
FOR DELETE
TO authenticated
USING (
  bucket_id = 'prescriptions' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);