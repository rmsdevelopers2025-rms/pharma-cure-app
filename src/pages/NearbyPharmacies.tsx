import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Navigation, Clock, Phone } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/Header';
import { getNearbyPharmacies, calculateDistance, type Pharmacy } from '@/services/pharmacyService';
import { useToast } from '@/components/ui/use-toast';

const NearbyPharmacies = () => {
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [pharmacies, setPharmacies] = useState<Array<Pharmacy & { distance?: number }>>([]);
  const [loading, setLoading] = useState(false);
  const { t } = useLanguage();
  const { toast } = useToast();

  const getLocation = () => {
    setLoading(true);
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setLocation(location);
          loadNearbyPharmacies(location);
        },
        (error) => {
          console.error('Error getting location:', error);
          toast({
            title: "Location Error",
            description: "Could not get your location. Showing all pharmacies.",
            variant: "destructive"
          });
          // Load pharmacies without location-based sorting
          loadNearbyPharmacies(null);
        },
      );
    } else {
      toast({
        title: "Location Not Supported",
        description: "Your browser doesn't support geolocation.",
        variant: "destructive"
      });
      loadNearbyPharmacies(null);
    }
  };

  const loadNearbyPharmacies = async (userLocation: { lat: number; lng: number } | null) => {
    try {
      const data = await getNearbyPharmacies();
      
      // Calculate distances and add to pharmacy objects if user location is available
      const pharmaciesWithDistance = data.map(pharmacy => {
        if (userLocation && pharmacy.latitude !== null && pharmacy.longitude !== null) {
          const distance = calculateDistance(
            userLocation.lat,
            userLocation.lng,
            pharmacy.latitude,
            pharmacy.longitude
          );
          return { ...pharmacy, distance };
        }
        return pharmacy;
      });

      // Sort by distance if user location is available
      const sortedPharmacies = pharmaciesWithDistance.sort((a, b) => {
        // TypeScript typing workaround - check if distance property exists
        const aDistance = 'distance' in a && typeof a.distance === 'number' ? a.distance : Number.MAX_VALUE;
        const bDistance = 'distance' in b && typeof b.distance === 'number' ? b.distance : Number.MAX_VALUE;
        return aDistance - bDistance;
      });

      setPharmacies(sortedPharmacies);
    } catch (error) {
      console.error('Error loading pharmacies:', error);
      toast({
        title: "Error",
        description: "Failed to load pharmacies. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  const getDirections = (address: string) => {
    const encodedAddress = encodeURIComponent(address);
    const url = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Card className="mb-8">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50">
              <CardTitle className="text-2xl text-center flex items-center justify-center">
                <MapPin className="w-8 h-8 mr-2" />
                {t('nearbyPharmacies') || 'Nearby Pharmacies'}
              </CardTitle>
              <p className="text-center text-gray-600 mt-2">
                {t('findPharmaciesNearYou') || 'Find pharmacies near your location'}
              </p>
            </CardHeader>
            
            <div className="p-6">
              <div className="text-center">
                <Button 
                  onClick={getLocation}
                  disabled={loading}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                >
                  <MapPin className="w-4 h-4 mr-2" />
                  {loading ? (t('findingPharmacies') || 'Finding Pharmacies...') : (t('findPharmacies') || 'Find Pharmacies')}
                </Button>
              </div>
            </div>
          </Card>

          {/* Pharmacies List */}
          {pharmacies.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold mb-4">
                {t('foundPharmacies') || `Found ${pharmacies.length} ${pharmacies.length === 1 ? 'pharmacy' : 'pharmacies'}`}
              </h2>
              
              {pharmacies.map((pharmacy) => (
                <Card key={pharmacy.id} className="hover:shadow-lg transition-shadow">
                  <div className="p-6">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold mb-2">{pharmacy.name}</h3>
                        
                        <div className="space-y-2 text-sm text-gray-600">
                          <div className="flex items-center">
                            <MapPin className="w-4 h-4 mr-2 text-blue-500" />
                            {pharmacy.address}
                          </div>
                          
                          {'distance' in pharmacy && pharmacy.distance !== undefined && (
                            <div className="flex items-center">
                              <Navigation className="w-4 h-4 mr-2 text-green-500" />
                              {pharmacy.distance.toFixed(2)} km away
                            </div>
                          )}
                          
                          {pharmacy.operating_hours && (
                            <div className="flex items-center">
                              <Clock className="w-4 h-4 mr-2 text-orange-500" />
                              {typeof pharmacy.operating_hours === 'string' 
                                ? pharmacy.operating_hours 
                                : (pharmacy.operating_hours as any).hours || 'Hours not available'}
                            </div>
                          )}
                          
                          {pharmacy.phone_number && (
                            <div className="flex items-center">
                              <Phone className="w-4 h-4 mr-2 text-purple-500" />
                              {pharmacy.phone_number}
                            </div>
                          )}
                        </div>
                        
                        {pharmacy.rating && (
                          <div className="flex items-center mt-3">
                            <div className="flex text-yellow-400">
                              {[...Array(5)].map((_, i) => (
                                <span key={i} className={i < Math.floor(Number(pharmacy.rating)) ? 'text-yellow-400' : 'text-gray-300'}>
                                  ★
                                </span>
                              ))}
                            </div>
                            <span className="ml-2 text-sm text-gray-600">
                              {Number(pharmacy.rating).toFixed(1)}/5
                            </span>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex flex-col space-y-2 ml-4">
                        <Button
                          onClick={() => getDirections(pharmacy.address)}
                          variant="outline"
                          size="sm"
                          className="bg-blue-50 text-blue-600 border-blue-200 hover:bg-blue-100"
                        >
                          <Navigation className="w-4 h-4 mr-1" />
                          {t('directions') || 'Directions'}
                        </Button>
                        
                        {pharmacy.phone_number && (
                          <Button
                            onClick={() => window.open(`tel:${pharmacy.phone_number}`, '_self')}
                            variant="outline"
                            size="sm"
                            className="bg-green-50 text-green-600 border-green-200 hover:bg-green-100"
                          >
                            <Phone className="w-4 h-4 mr-1" />
                            {t('call') || 'Call'}
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NearbyPharmacies;
