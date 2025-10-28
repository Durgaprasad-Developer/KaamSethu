// components/LocationPicker.tsx
"use client";

import { useState, useEffect } from 'react';
import { MapPin, Loader2, Search, Navigation, X } from 'lucide-react';
import { 
  getCurrentLocation, 
  searchLocations, 
  LocationData, 
  LocationError 
} from '@/lib/services/location';

interface LocationPickerProps {
  value?: string;
  onLocationSelect: (location: LocationData) => void;
  placeholder?: string;
  className?: string;
}

export default function LocationPicker({ 
  value, 
  onLocationSelect, 
  placeholder = "Enter your location",
  className = ""
}: LocationPickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(value || '');
  const [searchResults, setSearchResults] = useState<LocationData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDetecting, setIsDetecting] = useState(false);
  const [error, setError] = useState<string>('');

  // Auto-detect current location
  const handleDetectLocation = async () => {
    setIsDetecting(true);
    setError('');
    
    try {
      const location = await getCurrentLocation();
      setSearchQuery(location.address);
      onLocationSelect(location);
      setIsOpen(false);
    } catch (err) {
      const locationError = err as LocationError;
      setError(locationError.message);
    } finally {
      setIsDetecting(false);
    }
  };

  // Search for locations
  const handleSearch = async (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    setIsLoading(true);
    setError('');
    
    try {
      const results = await searchLocations(query);
      setSearchResults(results);
    } catch (err) {
      setError('Failed to search locations. Please try again.');
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle search input change with debouncing
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchQuery.length > 2) {
        handleSearch(searchQuery);
      } else {
        setSearchResults([]);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  // Handle location selection
  const handleLocationSelect = (location: LocationData) => {
    setSearchQuery(location.address);
    onLocationSelect(location);
    setIsOpen(false);
    setSearchResults([]);
  };

  return (
    <div className={`relative ${className}`}>
      {/* Input Field */}
      <div className="relative">
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
          <MapPin className="w-5 h-5 text-gray-400" />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder={placeholder}
          className="w-full pl-10 pr-12 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
        />
        {searchQuery && (
          <button
            onClick={() => {
              setSearchQuery('');
              setSearchResults([]);
              setIsOpen(false);
            }}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50 max-h-80 overflow-y-auto">
          
          {/* Auto-detect option */}
          <button
            onClick={handleDetectLocation}
            disabled={isDetecting}
            className="w-full flex items-center gap-3 p-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 border-b border-gray-100 dark:border-gray-600 disabled:opacity-50"
          >
            {isDetecting ? (
              <Loader2 className="w-5 h-5 text-blue-500 animate-spin" />
            ) : (
              <Navigation className="w-5 h-5 text-blue-500" />
            )}
            <div>
              <div className="font-medium text-gray-900 dark:text-gray-100">
                {isDetecting ? 'Detecting location...' : 'Use current location'}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Auto-detect using GPS
              </div>
            </div>
          </button>

          {/* Error message */}
          {error && (
            <div className="p-3 text-red-600 dark:text-red-400 text-sm border-b border-gray-100 dark:border-gray-600">
              {error}
            </div>
          )}

          {/* Loading state */}
          {isLoading && (
            <div className="flex items-center justify-center p-4">
              <Loader2 className="w-5 h-5 animate-spin text-gray-400" />
              <span className="ml-2 text-gray-500 dark:text-gray-400">Searching...</span>
            </div>
          )}

          {/* Search results */}
          {!isLoading && searchResults.length > 0 && (
            <div className="border-b border-gray-100 dark:border-gray-600">
              <div className="px-3 py-2 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Search Results
              </div>
              {searchResults.map((location, index) => (
                <button
                  key={index}
                  onClick={() => handleLocationSelect(location)}
                  className="w-full flex items-start gap-3 p-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <MapPin className="w-4 h-4 text-gray-400 mt-1 shrink-0" />
                  <div className="min-w-0 flex-1">
                    <div className="font-medium text-gray-900 dark:text-gray-100 truncate">
                      {location.area || location.city || 'Unknown Area'}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400 truncate">
                      {location.address}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* No results */}
          {!isLoading && searchQuery.length > 2 && searchResults.length === 0 && !error && (
            <div className="p-4 text-center text-gray-500 dark:text-gray-400">
              <Search className="w-8 h-8 mx-auto mb-2 text-gray-300 dark:text-gray-600" />
              <div className="text-sm">No locations found</div>
              <div className="text-xs">Try a different search term</div>
            </div>
          )}

          {/* Instructions */}
          {!isLoading && !searchQuery && (
            <div className="p-4 text-center text-gray-500 dark:text-gray-400">
              <div className="text-sm">Start typing to search for locations</div>
              <div className="text-xs mt-1">or use current location</div>
            </div>
          )}
        </div>
      )}

      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}