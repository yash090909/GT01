
import React from 'react';
import { useAppStore } from '../../store/AppStore';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';

const SettingsPage: React.FC = () => {
  const { settings, updateSettings } = useAppStore();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateSettings({ [name]: name === 'tankCapacity' ? Number(value) : value });
  };

  const handleSave = () => {
    // In this implementation, settings are saved on change.
    // This function can be used for explicit save actions if needed.
    alert("Settings saved!");
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-center text-cyan-400">Settings</h1>
      <Card>
        <form className="space-y-4">
          <div>
            <label htmlFor="userName" className="block text-sm font-medium text-gray-300 mb-1">
              Rider Name
            </label>
            <input
              type="text"
              id="userName"
              name="userName"
              value={settings.userName}
              onChange={handleInputChange}
              className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>
          <div>
            <label htmlFor="tankCapacity" className="block text-sm font-medium text-gray-300 mb-1">
              Fuel Tank Capacity (Liters)
            </label>
            <input
              type="number"
              id="tankCapacity"
              name="tankCapacity"
              value={settings.tankCapacity}
              onChange={handleInputChange}
              step="0.1"
              className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>
          <Button type="button" onClick={handleSave} className="w-full">
            Save Settings
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default SettingsPage;
