
import { useState, useEffect, useCallback } from 'react';
import type { GeolocationData } from '../types';

// TODO: Integrate a Kalman Filter for GPS smoothing for more accurate readings.

export const useGeolocation = (isActive: boolean): GeolocationData => {
  const [speed, setSpeed] = useState(0);
  const [distanceIncrement, setDistanceIncrement] = useState(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isActive) {
      setSpeed(0);
      setDistanceIncrement(0);
      return;
    }

    // This is a mock implementation. A real implementation would use:
    // navigator.geolocation.watchPosition(...)
    // For this demo, we simulate data changes.
    
    setError(null); // Assuming permission is granted for demo.
    
    const intervalId = setInterval(() => {
      // Simulate speed fluctuations
      const randomFactor = (Math.random() - 0.4) * 10;
      const newSpeed = Math.max(0, Math.min(120, speed + randomFactor));
      setSpeed(newSpeed);

      // Calculate distance increment based on new speed over the interval (2 seconds)
      // Distance = speed (km/h) * time (h)
      const timeIntervalHours = 2 / 3600;
      const newDistanceIncrement = newSpeed * timeIntervalHours;
      setDistanceIncrement(newDistanceIncrement);
    }, 2000);

    return () => clearInterval(intervalId);
  }, [isActive, speed]);

  return { speed, distanceIncrement, error };
};
