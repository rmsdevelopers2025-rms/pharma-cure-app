-- Enable RLS on wrappers_fdw_stats table to fix security issue
-- This table contains system statistics and should not be publicly accessible

ALTER TABLE public.wrappers_fdw_stats ENABLE ROW LEVEL SECURITY;

-- Create a restrictive policy that prevents public access to system statistics
-- Only service role can access this data (no user access needed)
CREATE POLICY "Restrict access to system statistics" 
ON public.wrappers_fdw_stats 
FOR ALL 
USING (false);