
import React, { useState, Suspense, lazy } from 'react';
import { AppTab } from './types';
import { DashboardIcon, HistoryIcon, SettingsIcon } from './components/icons/NavigationIcons';
import { AppStoreProvider } from './store/AppStore';

const DashboardPage = lazy(() => import('./features/dashboard/DashboardPage'));
const RefuelHistoryPage = lazy(() => import('./features/refuelHistory/RefuelHistoryPage'));
const SettingsPage = lazy(() => import('./features/settings/SettingsPage'));

const Spinner = () => (
    <div className="flex justify-center items-center h-full">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-cyan-500"></div>
    </div>
);

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<AppTab>(AppTab.Dashboard);

  const renderContent = () => {
    switch (activeTab) {
      case AppTab.Dashboard:
        return <DashboardPage />;
      case AppTab.History:
        return <RefuelHistoryPage />;
      case AppTab.Settings:
        return <SettingsPage />;
      default:
        return <DashboardPage />;
    }
  };

  // Fix: Used React.ReactNode which is a more robust type for component props.
  const NavItem = ({ tab, icon, label }: { tab: AppTab; icon: React.ReactNode; label: string }) => (
    <button
      onClick={() => setActiveTab(tab)}
      className={`flex-1 flex flex-col items-center justify-center p-3 transition-colors duration-300 ${
        activeTab === tab ? 'text-cyan-400' : 'text-gray-400 hover:text-cyan-300'
      }`}
    >
      {icon}
      <span className="text-xs font-medium mt-1">{label}</span>
    </button>
  );

  return (
    <AppStoreProvider>
      <div className="min-h-screen bg-gray-900 font-sans flex flex-col">
        <main className="flex-grow p-4 pb-24">
            <Suspense fallback={<Spinner />}>
                {renderContent()}
            </Suspense>
        </main>
        <footer className="fixed bottom-0 left-0 right-0 bg-gray-800/80 backdrop-blur-sm border-t border-gray-700 shadow-lg">
          <nav className="flex justify-around max-w-lg mx-auto">
            <NavItem tab={AppTab.Dashboard} icon={<DashboardIcon />} label="Dashboard" />
            <NavItem tab={AppTab.History} icon={<HistoryIcon />} label="History" />
            <NavItem tab={AppTab.Settings} icon={<SettingsIcon />} label="Settings" />
          </nav>
        </footer>
      </div>
    </AppStoreProvider>
  );
};

export default App;
