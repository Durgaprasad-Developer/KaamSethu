// hooks/useUserLocation.ts
"use client";

import { useState } from 'react';
import { LocationData } from '@/lib/services/location';

const LOCATION_STORAGE_KEY = 'userLocation';

interface UserLocationState {
  location: LocationData | null;
  isLoading: boolean;
  error: string | null;
}

export function useUserLocation() {
  const [state, setState] = useState<UserLocationState>(() => {
    // Initialize with saved location if available
    if (typeof window !== 'undefined') {
      const savedLocation = localStorage.getItem(LOCATION_STORAGE_KEY);
      if (savedLocation) {
        try {
          const location = JSON.parse(savedLocation) as LocationData;
          return { location, isLoading: false, error: null };
        } catch {
          // Invalid stored location, remove it
          localStorage.removeItem(LOCATION_STORAGE_KEY);
        }
      }
    }
    return { location: null, isLoading: false, error: null };
  });

  // Update location
  const updateLocation = (location: LocationData) => {
    setState(prev => ({ ...prev, location, error: null }));
    localStorage.setItem(LOCATION_STORAGE_KEY, JSON.stringify(location));
  };

  // Clear location
  const clearLocation = () => {
    setState(prev => ({ ...prev, location: null, error: null }));
    localStorage.removeItem(LOCATION_STORAGE_KEY);
  };

  // Set loading state
  const setLoading = (isLoading: boolean) => {
    setState(prev => ({ ...prev, isLoading }));
  };

  // Set error
  const setError = (error: string | null) => {
    setState(prev => ({ ...prev, error }));
  };

  return {
    location: state.location,
    isLoading: state.isLoading,
    error: state.error,
    updateLocation,
    clearLocation,
    setLoading,
    setError
  };
}