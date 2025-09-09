-- Create nearby_pharmacies table
CREATE TABLE public.nearby_pharmacies (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  address TEXT NOT NULL,
  phone_number TEXT,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  operating_hours JSONB DEFAULT '{}',
  services JSONB DEFAULT '[]',
  rating DECIMAL(3, 2) DEFAULT 0.0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.nearby_pharmacies ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access (pharmacies are public information)
CREATE POLICY "Pharmacies are publicly readable" 
ON public.nearby_pharmacies 
FOR SELECT 
USING (true);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_nearby_pharmacies_updated_at
BEFORE UPDATE ON public.nearby_pharmacies
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();