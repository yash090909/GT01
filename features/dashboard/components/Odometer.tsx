
import React from 'react';
import { Card } from '../../../components/ui/Card';

interface OdometerProps {
  distance: number;
  label: string;
}

export const Odometer: React.FC<OdometerProps> = React.memo(({ distance, label }) => {
  return (
    <Card className="flex flex-col items-center justify-center">
      <span className="text-sm text-gray-400">{label}</span>
      <p className="text-3xl font-bold text-cyan-400">{distance.toFixed(1)} <span className="text-lg">km</span></p>
    </Card>
  );
});
