
import React from 'react';
import { useAppStore } from '../../../store/AppStore';
import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';

interface TripInfoProps {
  duration: number; // in seconds
}

export const TripInfo: React.FC<TripInfoProps> = React.memo(({ duration }) => {
    const { resetTrip } = useAppStore();
    
  const formatDuration = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = Math.floor(totalSeconds % 60);

    const pad = (num: number) => num.toString().padStart(2, '0');

    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
  };

  return (
    <Card>
      <div className="flex justify-between items-center">
        <div>
          <p className="text-sm text-gray-400">Trip Duration</p>
          <p className="text-2xl font-semibold">{formatDuration(duration)}</p>
        </div>
        <Button onClick={resetTrip} variant="secondary">Reset Trip</Button>
      </div>
    </Card>
  );
});
