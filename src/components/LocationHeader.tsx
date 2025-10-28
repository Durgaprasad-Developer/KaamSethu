// components/LocationHeader.tsx
"use client";

import { useState } from 'react';
import { MapPin, ChevronDown } from 'lucide-react';
import { useUserLocation } from '@/hooks/useUserLocation';
import LocationPicker from './LocationPicker';
import { LocationData } from '@/lib/services/location';

interface LocationHeaderProps {
  className?: string;
  showPicker?: boolean;
}

export default function LocationHeader({ 
  className = "",
  showPicker = true 
}: LocationHeaderProps) {
  const { location, updateLocation } = useUserLocation();
  const [isPickerOpen, setIsPickerOpen] = useState(false);

  const handleLocationSelect = (newLocation: LocationData) => {
    updateLocation(newLocation);
    setIsPickerOpen(false);
  };

  const displayLocation = location?.address || 'Select location';
  const shortLocation = location?.area || location?.city || displayLocation;

  return (
    <div className={`relative ${className}`}>
      {/* Location Display */}
      <button
        onClick={() => showPicker && setIsPickerOpen(true)}
        className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
          showPicker 
            ? 'hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer' 
            : 'cursor-default'
        }`}
        disabled={!showPicker}
      >
        <MapPin className="w-4 h-4 text-gray-600 dark:text-gray-400" />
        <div className="text-left min-w-0 flex-1">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Current location
          </div>
          <div className="font-medium text-gray-900 dark:text-gray-100 truncate">
            {shortLocation}
          </div>
        </div>
        {showPicker && (
          <ChevronDown className="w-4 h-4 text-gray-400" />
        )}
      </button>

      {/* Location Picker Modal */}
      {isPickerOpen && showPicker && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setIsPickerOpen(false)}
          />
          
          {/* Modal */}
          <div className="fixed inset-x-4 top-20 z-50 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 max-w-md mx-auto">
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Change Location
              </h3>
              
              <LocationPicker
                value={location?.address}
                onLocationSelect={handleLocationSelect}
                placeholder="Search for your location"
                className="mb-4"
              />
              
              <div className="flex gap-2">
                <button
                  onClick={() => setIsPickerOpen(false)}
                  className="flex-1 px-4 py-2 text-gray-600 dark:text-gray-400 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}