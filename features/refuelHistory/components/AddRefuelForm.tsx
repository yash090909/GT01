
import React, { useState } from 'react';
import { useAppStore } from '../../../store/AppStore';
import { parseRefuelLog } from '../../../services/geminiService';
import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';

export const AddRefuelForm: React.FC = () => {
  const [logText, setLogText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { addRefuelRecord, tripState, resetTrip } = useAppStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!logText.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      const distanceSinceLast = tripState.distance;
      const parsedData = await parseRefuelLog(logText, distanceSinceLast);
      
      addRefuelRecord({
        ...parsedData,
        date: new Date().toISOString(),
      });
      
      resetTrip(); // Reset trip distance after refuel
      setLogText('');

    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <h2 className="text-lg font-semibold mb-2 text-gray-200">Add Refuel Log</h2>
      <p className="text-sm text-gray-400 mb-4">
        Use natural language! Try: "Filled up 12.5L for $28.60"
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={logText}
          onChange={(e) => setLogText(e.target.value)}
          placeholder="e.g., spent 25.50 for 10 liters"
          className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          disabled={isLoading}
        />
        {error && <p className="text-red-400 text-sm">{error}</p>}
        <Button type="submit" disabled={isLoading || !logText.trim()} className="w-full">
          {isLoading ? 'Parsing with AI...' : 'Add Log'}
        </Button>
      </form>
    </Card>
  );
};
