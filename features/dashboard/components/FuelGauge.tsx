
import React from 'react';
import { Card } from '../../../components/ui/Card';

interface FuelGaugeProps {
  fuelLevel: number;
}

export const FuelGauge: React.FC<FuelGaugeProps> = React.memo(({ fuelLevel }) => {
  const percentage = fuelLevel / 100;
  const circumference = 2 * Math.PI * 40; // 2 * pi * radius
  const strokeDashoffset = circumference * (1 - percentage);

  const getStrokeColor = () => {
    if (fuelLevel < 15) return 'stroke-red-500';
    if (fuelLevel < 40) return 'stroke-yellow-500';
    return 'stroke-green-500';
  };

  return (
    <Card className="aspect-square flex flex-col items-center justify-center relative">
      <svg viewBox="0 0 100 100" className="w-full h-full absolute top-0 left-0 -rotate-90">
        <circle cx="50" cy="50" r="40" stroke="rgba(255, 255, 255, 0.1)" strokeWidth="8" fill="transparent" />
        <circle
          cx="50"
          cy="50"
          r="40"
          className={`transition-all duration-500 ease-in-out ${getStrokeColor()}`}
          strokeWidth="8"
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
        />
      </svg>
      <div className="z-10 text-center">
        <p className="text-5xl font-extrabold tracking-tighter text-white">{fuelLevel.toFixed(0)}<span className="text-2xl">%</span></p>
        <p className="text-sm text-gray-400">Fuel</p>
      </div>
    </Card>
  );
});
