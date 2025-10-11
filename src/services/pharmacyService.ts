import { supabase } from '@/integrations/supabase/client';

export interface Pharmacy {
  id: string;
  name: string;
  address: string;
  phone_number: string | null;
  latitude: number | null;
  longitude: number | null;
  rating: number | null;
  operating_hours: any;
  services: any;
}

export const getNearbyPharmacies = async () => {
  const { data, error } = await supabase
    .from('nearby_pharmacies')
    .select('*')
    .order('name');
  
  if (error) {
    console.error('Error fetching pharmacies:', error);
    throw error;
  }
  
  return data;
};

// Calculate distance between two coordinates in kilometers
export const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
  const R = 6371; // Earth's radius in kilometers
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};
