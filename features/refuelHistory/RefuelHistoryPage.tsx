
import React from 'react';
import { useAppStore } from '../../store/AppStore';
import { AddRefuelForm } from './components/AddRefuelForm';
import { HistoryList } from './components/HistoryList';
import { Card } from '../../components/ui/Card';

const RefuelHistoryPage: React.FC = () => {
    const { history } = useAppStore();

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-center text-cyan-400">Refuel History</h1>
            <AddRefuelForm />
            <Card>
                <h2 className="text-lg font-semibold mb-4 text-gray-200">Recent Logs</h2>
                {history.length > 0 ? (
                    <HistoryList records={history} />
                ) : (
                    <p className="text-center text-gray-400 py-4">No refuel history yet. Add your first log above!</p>
                )}
            </Card>
        </div>
    );
};

export default RefuelHistoryPage;
