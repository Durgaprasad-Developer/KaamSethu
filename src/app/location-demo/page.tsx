// app/location-demo/page.tsx
"use client";

import { useState } from 'react';
import LocationPicker from '@/components/LocationPicker';
import LocationHeader from '@/components/LocationHeader';
import { useUserLocation } from '@/hooks/useUserLocation';
import { LocationData } from '@/lib/services/location';

export default function LocationDemoPage() {
  const { location, updateLocation } = useUserLocation();
  const [demoLocation, setDemoLocation] = useState<LocationData | null>(null);

  const handleLocationSelect = (newLocation: LocationData) => {
    setDemoLocation(newLocation);
    updateLocation(newLocation);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-2xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Location Features Demo
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Test location detection and selection features
          </p>
        </div>

        {/* Location Header Component */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Location Header Component
          </h2>
          <LocationHeader />
        </div>

        {/* Location Picker Component */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Location Picker Component
          </h2>
          <LocationPicker
            value={demoLocation?.address}
            onLocationSelect={handleLocationSelect}
            placeholder="Search for a location..."
          />
        </div>

        {/* Current Location Display */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Current Location Data
          </h2>
          {location ? (
            <div className="space-y-2 text-sm">
              <div className="grid grid-cols-1 gap-2">
                <div>
                  <span className="font-medium text-gray-600 dark:text-gray-300">Address:</span>
                  <div className="text-gray-900 dark:text-white">{location.address}</div>
                </div>
                <div>
                  <span className="font-medium text-gray-600 dark:text-gray-300">Coordinates:</span>
                  <div className="text-gray-900 dark:text-white">
                    {location.latitude.toFixed(6)}, {location.longitude.toFixed(6)}
                  </div>
                </div>
                {location.city && (
                  <div>
                    <span className="font-medium text-gray-600 dark:text-gray-300">City:</span>
                    <div className="text-gray-900 dark:text-white">{location.city}</div>
                  </div>
                )}
                {location.area && (
                  <div>
                    <span className="font-medium text-gray-600 dark:text-gray-300">Area:</span>
                    <div className="text-gray-900 dark:text-white">{location.area}</div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <p className="text-gray-500 dark:text-gray-400">
              No location selected. Use the components above to set a location.
            </p>
          )}
        </div>

        {/* Instructions */}
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">
            How to Use Location Features
          </h3>
          <ul className="space-y-2 text-blue-800 dark:text-blue-200 text-sm">
            <li>• <strong>Auto-detect:</strong> Click "Use current location" to get GPS location</li>
            <li>• <strong>Search:</strong> Type to search for places and addresses</li>
            <li>• <strong>Store:</strong> Selected locations are saved in localStorage</li>
            <li>• <strong>Display:</strong> Use LocationHeader to show current location anywhere</li>
          </ul>
        </div>

      </div>
    </div>
  );
}