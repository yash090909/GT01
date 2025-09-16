
import React from 'react';
import { Card } from '../../../components/ui/Card';

interface SpeedometerProps {
  speed: number;
}

const MAX_SPEED = 200; // km/h

export const Speedometer: React.FC<SpeedometerProps> = React.memo(({ speed }) => {
  const percentage = Math.min(speed / MAX_SPEED, 1);
  const rotation = -135 + percentage * 270; // -135 to 135 degrees

  return (
    <Card className="aspect-square flex flex-col items-center justify-center relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 bottom-0">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <path
            d="M 20 80 A 40 40 0 1 1 80 80"
            fill="none"
            stroke="rgba(255, 255, 255, 0.1)"
            strokeWidth="8"
            strokeLinecap="round"
          />
          <path
            d="M 20 80 A 40 40 0 1 1 80 80"
            fill="none"
            stroke="url(#speedGradient)"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={`${percentage * 235.6}, 235.6`}
            className="transition-all duration-500 ease-in-out"
          />
          <defs>
            <linearGradient id="speedGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#22d3ee" />
              <stop offset="100%" stopColor="#f43f5e" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <div className="z-10 text-center">
        <p className="text-5xl font-extrabold tracking-tighter text-white">{Math.round(speed)}</p>
        <p className="text-sm text-gray-400">km/h</p>
      </div>
    </Card>
  );
});
