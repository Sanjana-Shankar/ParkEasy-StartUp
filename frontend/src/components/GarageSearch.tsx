import { useState } from 'react';
import { ArrowLeft, MapPin, Search, Navigation, Clock, DollarSign, Car } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Badge } from './ui/badge';

interface GarageSearchProps {
  onBack: () => void;
}

const mockParkingLocations = [
  {
    id: 1,
    name: 'Downtown Parking Garage',
    type: 'Garage',
    address: '123 Main St',
    distance: '0.3 mi',
    availableSpots: 45,
    totalSpots: 200,
    pricePerHour: 5,
    peakHours: '8AM-6PM weekdays',
    fullTimes: 'Usually full 9AM-5PM',
    coordinates: { lat: 40.7128, lng: -74.0060 },
  },
  {
    id: 2,
    name: 'City Center Lot',
    type: 'Parking Lot',
    address: '456 Oak Ave',
    distance: '0.5 mi',
    availableSpots: 12,
    totalSpots: 50,
    pricePerHour: 3,
    peakHours: '7AM-7PM daily',
    fullTimes: 'Usually full 10AM-2PM',
    coordinates: { lat: 40.7138, lng: -74.0070 },
  },
  {
    id: 3,
    name: 'Elm Street',
    type: 'Street Parking',
    address: 'Elm St between 5th & 6th',
    distance: '0.2 mi',
    availableSpots: 8,
    totalSpots: 15,
    pricePerHour: 0,
    peakHours: 'Free after 6PM',
    fullTimes: 'Usually full 11AM-3PM',
    coordinates: { lat: 40.7118, lng: -74.0050 },
  },
  {
    id: 4,
    name: 'Metro Plaza Garage',
    type: 'Garage',
    address: '789 Broadway',
    distance: '0.8 mi',
    availableSpots: 120,
    totalSpots: 300,
    pricePerHour: 4,
    peakHours: '24/7 available',
    fullTimes: 'Rarely full',
    coordinates: { lat: 40.7148, lng: -74.0080 },
  },
  {
    id: 5,
    name: 'Pine Street',
    type: 'Street Parking',
    address: 'Pine St near Central Park',
    distance: '1.1 mi',
    availableSpots: 3,
    totalSpots: 20,
    pricePerHour: 2,
    peakHours: '2 hour limit',
    fullTimes: 'Usually full 12PM-4PM',
    coordinates: { lat: 40.7108, lng: -74.0040 },
  },
];

export function GarageSearch({ onBack }: GarageSearchProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState<number | null>(null);

  const filteredLocations = mockParkingLocations.filter(location =>
    location.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    location.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
    location.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getAvailabilityColor = (available: number, total: number) => {
    const percentage = (available / total) * 100;
    if (percentage > 50) return 'text-green-600';
    if (percentage > 20) return 'text-orange-600';
    return 'text-red-600';
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="flex flex-col lg:flex-row h-screen">
        {/* Map View */}
        <div className="lg:w-1/2 bg-gray-200 relative h-64 lg:h-full">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <Navigation className="h-16 w-16 text-blue-600 mx-auto mb-4" />
              <p className="text-gray-600">Map View</p>
              <p className="text-sm text-gray-500">Interactive parking map</p>
            </div>
          </div>
          {/* Mock map pins */}
          <div className="absolute top-1/4 left-1/3">
            <MapPin className="h-8 w-8 text-green-600 drop-shadow-lg" />
          </div>
          <div className="absolute top-1/2 right-1/3">
            <MapPin className="h-8 w-8 text-orange-600 drop-shadow-lg" />
          </div>
          <div className="absolute bottom-1/3 left-1/2">
            <MapPin className="h-8 w-8 text-blue-600 drop-shadow-lg" />
          </div>
        </div>

        {/* List View */}
        <div className="lg:w-1/2 flex flex-col h-full">
          <div className="p-6 border-b bg-white">
            <div className="flex items-center gap-4 mb-4">
              <Button variant="ghost" size="icon" onClick={onBack}>
                <ArrowLeft className="h-6 w-6" />
              </Button>
              <h1>Garage Search</h1>
            </div>
            
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                placeholder="Search for parking locations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-6">
            <div className="space-y-4">
              {filteredLocations.map((location) => {
                const availabilityPercentage = (location.availableSpots / location.totalSpots) * 100;
                
                return (
                  <Card 
                    key={location.id} 
                    className={`p-4 cursor-pointer transition-all hover:shadow-lg ${
                      selectedLocation === location.id ? 'border-blue-500 border-2' : ''
                    }`}
                    onClick={() => setSelectedLocation(location.id)}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="mb-1">{location.name}</h3>
                        <p className="text-sm text-gray-600">{location.address}</p>
                      </div>
                      <Badge variant="outline">{location.type}</Badge>
                    </div>

                    <div className="grid grid-cols-2 gap-3 mb-3">
                      <div className="flex items-center gap-2">
                        <Car className="h-4 w-4 text-gray-500" />
                        <span className={`text-sm ${getAvailabilityColor(location.availableSpots, location.totalSpots)}`}>
                          {location.availableSpots}/{location.totalSpots} spots
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Navigation className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-gray-700">{location.distance}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-gray-700">
                          {location.pricePerHour === 0 ? 'Free' : `$${location.pricePerHour}/hr`}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-gray-700">{location.peakHours}</span>
                      </div>
                    </div>

                    <div className="bg-gray-50 p-2 rounded">
                      <p className="text-xs text-gray-600">
                        <strong>Typically full:</strong> {location.fullTimes}
                      </p>
                    </div>

                    {/* Availability bar */}
                    <div className="mt-3">
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className={`h-full transition-all ${
                            availabilityPercentage > 50 ? 'bg-green-500' :
                            availabilityPercentage > 20 ? 'bg-orange-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${availabilityPercentage}%` }}
                        />
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
