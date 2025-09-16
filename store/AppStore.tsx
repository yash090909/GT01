
import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import type { TripState, Settings, RefuelRecord } from '../types';

const initialTripState: TripState = {
  speed: 0,
  distance: 0,
  duration: 0,
  fuelLevel: 85,
};

const defaultSettings: Settings = {
  units: 'metric',
  tankCapacity: 15,
  userName: 'Rider',
};

interface AppState {
  tripState: TripState;
  settings: Settings;
  history: RefuelRecord[];
  setTripState: (update: Partial<TripState>) => void;
  updateSettings: (update: Partial<Settings>) => void;
  addRefuelRecord: (record: Omit<RefuelRecord, 'id'>) => void;
  resetTrip: () => void;
}

const AppContext = createContext<AppState | undefined>(undefined);

// Fix: Updated the hook to correctly type the setter function to accept a value or an updater function.
const useLocalStorage = <T,>(key: string, initialValue: T): [T, (value: T | ((prevState: T) => T)) => void] => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = (value: T | ((prevState: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
};

export const AppStoreProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [tripState, setTripStateInternal] = useState<TripState>(initialTripState);
  const [settings, setSettings] = useLocalStorage<Settings>('bike_settings', defaultSettings);
  const [history, setHistory] = useLocalStorage<RefuelRecord[]>('bike_history', []);

  const setTripState = useCallback((update: Partial<TripState>) => {
    setTripStateInternal(prev => ({ ...prev, ...update }));
  }, []);

  const updateSettings = useCallback((update: Partial<Settings>) => {
    setSettings(prev => ({ ...prev, ...update }));
  }, [setSettings]);

  const addRefuelRecord = useCallback((record: Omit<RefuelRecord, 'id'>) => {
    const newRecord: RefuelRecord = {
      ...record,
      id: new Date().toISOString(),
    };
    setHistory(prev => [newRecord, ...prev]);
  }, [setHistory]);
  
  const resetTrip = useCallback(() => {
    setTripStateInternal(prev => ({
        ...prev,
        distance: 0,
        duration: 0,
    }));
  }, []);

  const value = {
    tripState,
    settings,
    history,
    setTripState,
    updateSettings,
    addRefuelRecord,
    resetTrip,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppStore = (): AppState => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppStore must be used within an AppStoreProvider');
  }
  return context;
};
