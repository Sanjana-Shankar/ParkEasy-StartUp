import { useState, useEffect } from 'react';
import { Camera, AlertTriangle, CheckCircle, ArrowLeft, ScanSearch } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';

interface LiveViewProps {
  onBack: () => void;
}

export function LiveView({ onBack }: LiveViewProps) {
  const [isScanning, setIsScanning] = useState(false);
  const [detectedSigns, setDetectedSigns] = useState<Array<{
    type: 'warning' | 'safe';
    message: string;
    time: string;
  }>>([]);

  useEffect(() => {
    if (isScanning) {
      // Simulate sign detection
      const timer = setTimeout(() => {
        const mockDetections = [
          { type: 'warning' as const, message: 'No Parking 8AM-6PM', time: new Date().toLocaleTimeString() },
          { type: 'safe' as const, message: 'Free Parking After 6PM', time: new Date().toLocaleTimeString() },
        ];
        setDetectedSigns(prev => [...mockDetections, ...prev].slice(0, 10));
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isScanning, detectedSigns.length]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft className="h-6 w-6" />
          </Button>
          <h1>Live View Scanner</h1>
        </div>

        {/* Camera View */}
        <Card className="p-6 mb-6">
          <div className="relative bg-gray-900 rounded-lg overflow-hidden aspect-video mb-4">
            <div className="absolute inset-0 flex items-center justify-center">
              {isScanning ? (
                <div className="text-center">
                  <ScanSearch className="h-16 w-16 text-blue-500 mx-auto mb-2 animate-pulse" />
                  <p className="text-white">Scanning for signs...</p>
                </div>
              ) : (
                <Camera className="h-16 w-16 text-gray-600" />
              )}
            </div>
            {isScanning && (
              <div className="absolute inset-0 border-4 border-blue-500 animate-pulse" />
            )}
          </div>

          <Button 
            onClick={() => setIsScanning(!isScanning)} 
            className="w-full"
            variant={isScanning ? "destructive" : "default"}
          >
            {isScanning ? 'Stop Scanning' : 'Start Scanning'}
          </Button>
        </Card>

        {/* Detected Signs */}
        <div>
          <h2 className="mb-4">Detected Signs</h2>
          {detectedSigns.length === 0 ? (
            <Card className="p-8 text-center text-gray-500">
              <p>No signs detected yet. Start scanning to detect parking signs.</p>
            </Card>
          ) : (
            <div className="space-y-3">
              {detectedSigns.map((sign, index) => (
                <Card key={index} className="p-4">
                  <div className="flex items-start gap-3">
                    {sign.type === 'warning' ? (
                      <AlertTriangle className="h-6 w-6 text-orange-500 flex-shrink-0" />
                    ) : (
                      <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0" />
                    )}
                    <div className="flex-1">
                      <p className={sign.type === 'warning' ? 'text-orange-900' : 'text-green-900'}>
                        {sign.message}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">{sign.time}</p>
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
}
