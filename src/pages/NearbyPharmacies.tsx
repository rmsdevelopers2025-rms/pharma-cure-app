
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Navigation, Clock, Phone } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/Header';

const NearbyPharmacies = () => {
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [pharmacies, setPharmacies] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const { t } = useLanguage();

  const getLocation = () => {
    setLoading(true);
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
          loadNearbyPharmacies();
        },
        (error) => {
          console.error('Error getting location:', error);
          // Load mock data even if location fails
          loadNearbyPharmacies();
        }
      );
    } else {
      loadNearbyPharmacies();
    }
  };

  const loadNearbyPharmacies = () => {
    // Mock pharmacy data
    setTimeout(() => {
      setPharmacies([
        {
          name: 'Apollo Pharmacy',
          address: '123 Main Street, City Center',
          distance: '0.5 km',
          phone: '+1 234-567-8901',
          hours: '24/7',
          rating: 4.5
        },
        {
          name: 'MedPlus Pharmacy',
          address: '456 Oak Avenue, Downtown',
          distance: '1.2 km',
          phone: '+1 234-567-8902',
          hours: '8:00 AM - 10:00 PM',
          rating: 4.3
        },
        {
          name: 'Guardian Pharmacy',
          address: '789 Pine Road, Mall Complex',
          distance: '1.8 km',
          phone: '+1 234-567-8903',
          hours: '9:00 AM - 9:00 PM',
          rating: 4.2
        },
        {
          name: 'Wellness Pharmacy',
          address: '321 Elm Street, Residential Area',
          distance: '2.1 km',
          phone: '+1 234-567-8904',
          hours: '7:00 AM - 11:00 PM',
          rating: 4.4
        }
      ]);
      setLoading(false);
    }, 2000);
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
                {t('nearbyPharmacies')}
              </CardTitle>
              <p className="text-center text-gray-600">
                Find pharmacies near your location
              </p>
            </CardHeader>
            
            <CardContent className="p-6">
              <div className="text-center">
                <Button 
                  onClick={getLocation}
                  disabled={loading}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                >
                  <MapPin className="w-4 h-4 mr-2" />
                  {loading ? 'Finding Pharmacies...' : 'Find Nearby Pharmacies'}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Pharmacy List */}
          {pharmacies.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold mb-4">
                Found {pharmacies.length} pharmacies near you
              </h2>
              
              {pharmacies.map((pharmacy, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold mb-2">{pharmacy.name}</h3>
                        
                        <div className="space-y-2 text-sm text-gray-600">
                          <div className="flex items-center">
                            <MapPin className="w-4 h-4 mr-2 text-blue-500" />
                            {pharmacy.address}
                          </div>
                          
                          <div className="flex items-center">
                            <Navigation className="w-4 h-4 mr-2 text-green-500" />
                            {pharmacy.distance} away
                          </div>
                          
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-2 text-orange-500" />
                            {pharmacy.hours}
                          </div>
                          
                          <div className="flex items-center">
                            <Phone className="w-4 h-4 mr-2 text-purple-500" />
                            {pharmacy.phone}
                          </div>
                        </div>
                        
                        <div className="flex items-center mt-3">
                          <div className="flex text-yellow-400">
                            {[...Array(5)].map((_, i) => (
                              <span key={i} className={i < Math.floor(pharmacy.rating) ? 'text-yellow-400' : 'text-gray-300'}>
                                ★
                              </span>
                            ))}
                          </div>
                          <span className="ml-2 text-sm text-gray-600">
                            {pharmacy.rating}/5
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex flex-col space-y-2">
                        <Button
                          onClick={() => getDirections(pharmacy.address)}
                          variant="outline"
                          size="sm"
                          className="bg-blue-50 text-blue-600 border-blue-200 hover:bg-blue-100"
                        >
                          <Navigation className="w-4 h-4 mr-1" />
                          Directions
                        </Button>
                        
                        <Button
                          onClick={() => window.open(`tel:${pharmacy.phone}`, '_self')}
                          variant="outline"
                          size="sm"
                          className="bg-green-50 text-green-600 border-green-200 hover:bg-green-100"
                        >
                          <Phone className="w-4 h-4 mr-1" />
                          Call
                        </Button>
                      </div>
                    </div>
                  </CardContent>
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
