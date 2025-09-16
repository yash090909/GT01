
import React from 'react';
import type { RefuelRecord } from '../../../types';

interface HistoryListProps {
  records: RefuelRecord[];
}

// For large lists, this component could be virtualized using react-window
// by wrapping the `RecordItem` in a `FixedSizeList`.

const RecordItem: React.FC<{ record: RefuelRecord }> = ({ record }) => {
    const economy = record.distanceSinceLast > 0 && record.liters > 0 
        ? (record.distanceSinceLast / record.liters).toFixed(1)
        : 'N/A';
        
    return (
        <li className="py-3 px-2 border-b border-gray-700 last:border-b-0 hover:bg-gray-700/50 transition-colors duration-200 rounded-md">
            <div className="flex justify-between items-center">
                <div>
                    <p className="font-semibold text-white">{new Date(record.date).toLocaleDateString()}</p>
                    <p className="text-sm text-gray-400">{record.notes || `${record.liters.toFixed(2)} L for $${record.cost.toFixed(2)}`}</p>
                </div>
                <div className="text-right">
                    <p className="font-semibold text-cyan-400">{economy} km/L</p>
                    <p className="text-sm text-gray-400">{record.distanceSinceLast.toFixed(1)} km</p>
                </div>
            </div>
        </li>
    );
};

export const HistoryList: React.FC<HistoryListProps> = ({ records }) => {
  return (
    <ul className="space-y-2 max-h-96 overflow-y-auto">
      {records.map((record) => (
        <RecordItem key={record.id} record={record} />
      ))}
    </ul>
  );
};
