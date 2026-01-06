import { useState } from 'react';
import { Camera, Bell, MapPin, Car, ChevronRight } from 'lucide-react';
import { Card } from './components/ui/card';
import { Badge } from './components/ui/badge';
import { LiveView } from './components/LiveView';
import { Notifications } from './components/Notifications';
import { GarageSearch } from './components/GarageSearch';
import { CarRegistration } from './components/CarRegistration';

type Screen = 'home' | 'liveView' | 'notifications' | 'garageSearch' | 'carRegistration';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [registeredCars] = useState([
    { id: '1', name: '2020 Honda Civic', plate: 'ABC-1234' },
    { id: '2', name: '2019 Toyota Camry', plate: 'XYZ-5678' },
  ]);

  const unreadNotifications = 2;

  if (currentScreen === 'liveView') {
    return <LiveView onBack={() => setCurrentScreen('home')} />;
  }

  if (currentScreen === 'notifications') {
    return <Notifications onBack={() => setCurrentScreen('home')} />;
  }

  if (currentScreen === 'garageSearch') {
    return <GarageSearch onBack={() => setCurrentScreen('home')} />;
  }

  if (currentScreen === 'carRegistration') {
    return <CarRegistration onBack={() => setCurrentScreen('home')} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-600 to-blue-800">
      {/* Header */}
      <div className="bg-blue-700 text-white p-6 shadow-lg">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-white mb-2">ParkEasy</h1>
          <p className="text-blue-100">Smart parking solutions at your fingertips</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6">
        {/* Main Features */}
        <div className="mb-8">
          <h2 className="text-white mb-4">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Live View Card */}
            <Card 
              className="p-6 cursor-pointer hover:shadow-xl transition-all transform hover:-translate-y-1"
              onClick={() => setCurrentScreen('liveView')}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="p-4 bg-blue-100 rounded-lg">
                  <Camera className="h-8 w-8 text-blue-600" />
                </div>
                <ChevronRight className="h-6 w-6 text-gray-400" />
              </div>
              <h3 className="mb-2">Live View</h3>
              <p className="text-gray-600 text-sm">
                Scan parking signs and detect prohibited parking areas in real-time
              </p>
            </Card>

            {/* Notifications Card */}
            <Card 
              className="p-6 cursor-pointer hover:shadow-xl transition-all transform hover:-translate-y-1 relative"
              onClick={() => setCurrentScreen('notifications')}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="p-4 bg-orange-100 rounded-lg relative">
                  <Bell className="h-8 w-8 text-orange-600" />
                  {unreadNotifications > 0 && (
                    <Badge 
                      variant="destructive" 
                      className="absolute -top-2 -right-2 h-6 w-6 flex items-center justify-center p-0 text-xs"
                    >
                      {unreadNotifications}
                    </Badge>
                  )}
                </div>
                <ChevronRight className="h-6 w-6 text-gray-400" />
              </div>
              <h3 className="mb-2">Notifications</h3>
              <p className="text-gray-600 text-sm">
                Stay updated with alerts from motion sensors and parking status
              </p>
            </Card>

            {/* Garage Search Card */}
            <Card 
              className="p-6 cursor-pointer hover:shadow-xl transition-all transform hover:-translate-y-1"
              onClick={() => setCurrentScreen('garageSearch')}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="p-4 bg-green-100 rounded-lg">
                  <MapPin className="h-8 w-8 text-green-600" />
                </div>
                <ChevronRight className="h-6 w-6 text-gray-400" />
              </div>
              <h3 className="mb-2">Garage Search</h3>
              <p className="text-gray-600 text-sm">
                Find available parking spots, garages, and street parking near you
              </p>
            </Card>
          </div>
        </div>

        {/* Vehicle Registration Section */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-white">My Vehicles</h2>
            <button
              onClick={() => setCurrentScreen('carRegistration')}
              className="text-blue-100 hover:text-white text-sm flex items-center gap-1"
            >
              Manage
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
          
          {registeredCars.length === 0 ? (
            <Card 
              className="p-8 text-center cursor-pointer hover:shadow-lg transition-all"
              onClick={() => setCurrentScreen('carRegistration')}
            >
              <Car className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="mb-2">No vehicles registered</h3>
              <p className="text-gray-600 text-sm">
                Add your vehicles to enable monitoring and alerts
              </p>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {registeredCars.map((car) => (
                <Card 
                  key={car.id} 
                  className="p-4 cursor-pointer hover:shadow-lg transition-all"
                  onClick={() => setCurrentScreen('carRegistration')}
                >
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-blue-100 rounded-full">
                      <Car className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-900">{car.name}</p>
                      <p className="text-xs text-gray-500 font-mono">{car.plate}</p>
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                  </div>
                </Card>
              ))}
              
              <Card 
                className="p-4 cursor-pointer hover:shadow-lg transition-all border-dashed border-2"
                onClick={() => setCurrentScreen('carRegistration')}
              >
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <div className="p-3 bg-gray-100 rounded-full inline-block mb-2">
                      <Car className="h-6 w-6 text-gray-400" />
                    </div>
                    <p className="text-sm text-gray-600">Add Vehicle</p>
                  </div>
                </div>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
