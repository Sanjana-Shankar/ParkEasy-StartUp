import { ArrowLeft, Bell, Activity, AlertCircle, Car } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';

interface NotificationsProps {
  onBack: () => void;
}

const mockNotifications = [
  {
    id: 1,
    type: 'motion',
    title: 'Motion Detected',
    message: 'Movement detected near your vehicle (Honda Civic)',
    time: '5 minutes ago',
    read: false,
    icon: Activity,
    color: 'text-blue-500',
    bgColor: 'bg-blue-50',
  },
  {
    id: 2,
    type: 'alert',
    title: 'Parking Expiring Soon',
    message: 'Your parking spot expires in 15 minutes',
    time: '10 minutes ago',
    read: false,
    icon: AlertCircle,
    color: 'text-orange-500',
    bgColor: 'bg-orange-50',
  },
  {
    id: 3,
    type: 'vehicle',
    title: 'Vehicle Moved',
    message: 'Your Toyota Camry was moved from its parking location',
    time: '1 hour ago',
    read: true,
    icon: Car,
    color: 'text-purple-500',
    bgColor: 'bg-purple-50',
  },
  {
    id: 4,
    type: 'motion',
    title: 'Motion Detected',
    message: 'Movement detected near your vehicle (Toyota Camry)',
    time: '2 hours ago',
    read: true,
    icon: Activity,
    color: 'text-blue-500',
    bgColor: 'bg-blue-50',
  },
  {
    id: 5,
    type: 'alert',
    title: 'Parking Violation Warning',
    message: 'You are parked in a restricted zone',
    time: '3 hours ago',
    read: true,
    icon: AlertCircle,
    color: 'text-red-500',
    bgColor: 'bg-red-50',
  },
];

export function Notifications({ onBack }: NotificationsProps) {
  const unreadCount = mockNotifications.filter(n => !n.read).length;

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft className="h-6 w-6" />
          </Button>
          <div className="flex-1">
            <h1>Notifications</h1>
          </div>
          {unreadCount > 0 && (
            <Badge variant="destructive">{unreadCount} new</Badge>
          )}
        </div>

        <div className="space-y-3">
          {mockNotifications.map((notification) => {
            const Icon = notification.icon;
            return (
              <Card 
                key={notification.id} 
                className={`p-4 ${!notification.read ? 'border-l-4 border-l-blue-500' : ''}`}
              >
                <div className="flex gap-4">
                  <div className={`p-3 rounded-full ${notification.bgColor} flex-shrink-0`}>
                    <Icon className={`h-6 w-6 ${notification.color}`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h3>{notification.title}</h3>
                      {!notification.read && (
                        <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-2" />
                      )}
                    </div>
                    <p className="text-gray-700 mb-2">{notification.message}</p>
                    <p className="text-sm text-gray-500">{notification.time}</p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {mockNotifications.length === 0 && (
          <Card className="p-8 text-center">
            <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No notifications yet</p>
          </Card>
        )}
      </div>
    </div>
  );
}
