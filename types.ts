
export enum AppTab {
  Dashboard = 'DASHBOARD',
  History = 'HISTORY',
  Settings = 'SETTINGS',
}

export interface TripState {
  speed: number; // in km/h
  distance: number; // in km
  duration: number; // in seconds
  fuelLevel: number; // percentage
}

export interface RefuelRecord {
  id: string;
  date: string;
  liters: number;
  cost: number;
  distanceSinceLast: number; // km
  notes?: string;
}

export interface Settings {
  units: 'metric' | 'imperial';
  tankCapacity: number; // in liters
  userName: string;
}

export interface GeolocationData {
  speed: number; // km/h
  distanceIncrement: number; // km
  error: string | null;
}
