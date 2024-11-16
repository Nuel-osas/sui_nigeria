import { useState, useEffect } from 'react';

const useGeolocation = (targetLocation) => {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const [isWithinRange, setIsWithinRange] = useState(false);

  // Calculate distance using Haversine formula for more accurate results
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    // Convert to numbers and fix precision to 6 decimal places
    lat1 = Number(lat1.toFixed(6));
    lon1 = Number(lon1.toFixed(6));
    lat2 = Number(lat2.toFixed(6));
    lon2 = Number(lon2.toFixed(6));

    const R = 6371; // Earth's radius in kilometers
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    
    const a = 
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * 
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distanceInKm = R * c;
    
    return distanceInKm;
  };

  useEffect(() => {
    // Validate targetLocation prop
    if (!targetLocation || !targetLocation.latitude || !targetLocation.longitude || !targetLocation.radius) {
      setError('Invalid target location provided');
      return;
    }

    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      return;
    }

    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude, accuracy } = position.coords;
        setLocation({ latitude, longitude, accuracy });

        const distance = calculateDistance(
          latitude,
          longitude,
          targetLocation.latitude,
          targetLocation.longitude
        );

        // Convert radius from meters to kilometers for comparison
        const radiusInKm = targetLocation.radius / 1000;
        setIsWithinRange(distance <= radiusInKm);

        // Clear any previous errors
        setError(null);
      },
      (error) => {
        setError(error.message);
        setLocation(null);
        setIsWithinRange(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, [targetLocation]);

  return { location, error, isWithinRange };
};

export default useGeolocation;