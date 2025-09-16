
import { useEffect, useMemo } from 'react';
import { useAppStore } from '../store/AppStore';
import { useGeolocation } from './useGeolocation';

// Simulates a bike computer that is always on when the app is active
export const useBikeData = () => {
  const { tripState, setTripState, settings } = useAppStore();
  const { speed, distanceIncrement, error } = useGeolocation(true); // Always active

  // Fuel consumption calculation (example: liters per 100km)
  // This is a simplified model. A real one would be much more complex.
  const fuelConsumptionRate = useMemo(() => {
      if (speed < 10) return 5 / 100; // high consumption at low speed
      if (speed < 80) return 4 / 100; // optimal
      return 6.5 / 100; // high consumption at high speed
  }, [speed]);

  useEffect(() => {
    const fuelUsed = distanceIncrement * fuelConsumptionRate;
    const fuelPercentageUsed = (fuelUsed / settings.tankCapacity) * 100;

    setTripState({
      speed: speed,
      distance: tripState.distance + distanceIncrement,
      duration: tripState.duration + 2, // Corresponds to the 2s interval in useGeolocation
      fuelLevel: Math.max(0, tripState.fuelLevel - fuelPercentageUsed),
    });
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [speed, distanceIncrement]); // Dependency array carefully chosen to avoid loops

  const estimatedRange = useMemo(() => {
    const currentFuelLiters = (tripState.fuelLevel / 100) * settings.tankCapacity;
    // Using an average consumption rate for range estimate
    const averageConsumption = 5 / 100; // L/km
    return currentFuelLiters / averageConsumption;
  }, [tripState.fuelLevel, settings.tankCapacity]);


  return { ...tripState, estimatedRange, geolocationError: error };
};
