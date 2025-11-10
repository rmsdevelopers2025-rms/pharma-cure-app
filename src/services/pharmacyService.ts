import { API_ENDPOINTS } from '@/config/api';

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
  try {
    const response = await fetch(API_ENDPOINTS.PHARMACIES);
    
    if (!response.ok) {
      throw new Error('Failed to fetch pharmacies');
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching pharmacies:', error);
    throw error;
  }
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
