// lib/services/location.ts
export interface LocationData {
  address: string;
  latitude: number;
  longitude: number;
  city?: string;
  area?: string;
}

export interface LocationError {
  code: number;
  message: string;
}

// Get user's current location using browser geolocation API
export async function getCurrentLocation(): Promise<LocationData> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject({
        code: 0,
        message: 'Geolocation is not supported by this browser.'
      });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const address = await reverseGeocode(latitude, longitude);
          resolve({
            address,
            latitude,
            longitude
          });
        } catch (error) {
          reject({
            code: 4,
            message: 'Failed to get address from coordinates'
          });
        }
      },
      (error) => {
        let message: string;
        switch (error.code) {
          case error.PERMISSION_DENIED:
            message = 'Location access denied by user.';
            break;
          case error.POSITION_UNAVAILABLE:
            message = 'Location information is unavailable.';
            break;
          case error.TIMEOUT:
            message = 'Location request timed out.';
            break;
          default:
            message = 'An unknown error occurred.';
            break;
        }
        reject({
          code: error.code,
          message
        });
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000 // 5 minutes
      }
    );
  });
}

// Reverse geocoding using OpenStreetMap Nominatim API (free alternative to Google)
export async function reverseGeocode(lat: number, lon: number): Promise<string> {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&addressdetails=1`
    );
    
    if (!response.ok) {
      throw new Error('Geocoding request failed');
    }

    const data = await response.json();
    
    // Extract meaningful address components
    const address = data.address;
    const area = address.suburb || address.neighbourhood || address.quarter || '';
    const city = address.city || address.town || address.village || '';
    const state = address.state || '';
    
    // Format address nicely
    let formattedAddress = '';
    if (area) formattedAddress += area;
    if (city && area) formattedAddress += ', ';
    if (city) formattedAddress += city;
    if (state && (area || city)) formattedAddress += ', ';
    if (state) formattedAddress += state;
    
    return formattedAddress || data.display_name || 'Unknown location';
  } catch (error) {
    throw new Error('Failed to reverse geocode location');
  }
}

// Forward geocoding - convert address to coordinates
export async function geocodeAddress(address: string): Promise<LocationData> {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}&limit=1&addressdetails=1`
    );
    
    if (!response.ok) {
      throw new Error('Geocoding request failed');
    }

    const data = await response.json();
    
    if (!data || data.length === 0) {
      throw new Error('No results found for the given address');
    }

    const result = data[0];
    return {
      address: result.display_name,
      latitude: parseFloat(result.lat),
      longitude: parseFloat(result.lon),
      city: result.address?.city || result.address?.town,
      area: result.address?.suburb || result.address?.neighbourhood
    };
  } catch (error) {
    throw new Error('Failed to geocode address');
  }
}

// Search for locations/places
export async function searchLocations(query: string): Promise<LocationData[]> {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=5&addressdetails=1&countrycodes=in`
    );
    
    if (!response.ok) {
      throw new Error('Location search failed');
    }

    const data = await response.json();
    
    return data.map((item: any) => ({
      address: item.display_name,
      latitude: parseFloat(item.lat),
      longitude: parseFloat(item.lon),
      city: item.address?.city || item.address?.town,
      area: item.address?.suburb || item.address?.neighbourhood
    }));
  } catch (error) {
    throw new Error('Failed to search locations');
  }
}

// Calculate distance between two coordinates (in kilometers)
export function calculateDistance(
  lat1: number, 
  lon1: number, 
  lat2: number, 
  lon2: number
): number {
  const R = 6371; // Earth's radius in kilometers
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

// Format distance for display
export function formatDistance(distanceKm: number): string {
  if (distanceKm < 1) {
    return `${Math.round(distanceKm * 1000)}m away`;
  } else if (distanceKm < 10) {
    return `${distanceKm.toFixed(1)} km away`;
  } else {
    return `${Math.round(distanceKm)} km away`;
  }
}