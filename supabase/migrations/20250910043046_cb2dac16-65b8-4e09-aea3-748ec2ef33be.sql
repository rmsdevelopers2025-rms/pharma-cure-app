-- Enable RLS on wrappers_fdw_stats table
ALTER TABLE public.wrappers_fdw_stats ENABLE ROW LEVEL SECURITY;

-- Create a policy for wrappers_fdw_stats (system table, should only be readable by authenticated users)
CREATE POLICY "FDW stats are readable by authenticated users" 
ON public.wrappers_fdw_stats 
FOR SELECT 
USING (auth.role() = 'authenticated');