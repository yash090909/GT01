
import React from 'react';
import { useBikeData } from '../../hooks/useBikeData';
import { Speedometer } from './components/Speedometer';
import { FuelGauge } from './components/FuelGauge';
import { Odometer } from './components/Odometer';
import { TripInfo } from './components/TripInfo';
import { Card } from '../../components/ui/Card';

const DashboardPage: React.FC = () => {
  const { speed, fuelLevel, distance, duration, estimatedRange, geolocationError } = useBikeData();

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-center text-cyan-400">Smart Dashboard</h1>
      
      {geolocationError && (
        <Card className="border-red-500 bg-red-900/50">
          <p className="text-red-300 text-center font-semibold">{geolocationError}</p>
        </Card>
      )}

      <div className="grid grid-cols-2 gap-4">
        <Speedometer speed={speed} />
        <FuelGauge fuelLevel={fuelLevel} />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Odometer distance={distance} label="Trip" />
        <Card className="flex flex-col items-center justify-center">
          <span className="text-sm text-gray-400">Est. Range</span>
          <p className="text-3xl font-bold text-cyan-400">{estimatedRange.toFixed(0)} <span className="text-lg">km</span></p>
        </Card>
      </div>

      <TripInfo duration={duration} />
    </div>
  );
};

export default DashboardPage;
