import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { Inventory } from './components/Inventory';
import { Sales } from './components/Sales';
import { Reports } from './components/Reports';
import { Settings } from './components/Settings';
import { Login } from './components/Login';
import { ViewState } from './types';
import { Menu, Bell, Search, ChevronDown } from 'lucide-react';
import { AppProvider, useApp } from './context';

const AppContent: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentView, setCurrentView] = useState<ViewState>(ViewState.DASHBOARD);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { t } = useApp();

  const renderView = () => {
    switch (currentView) {
      case ViewState.DASHBOARD:
        return <Dashboard />;
      case ViewState.INVENTORY:
        return <Inventory />;
      case ViewState.SALES:
        return <Sales />;
      case ViewState.REPORTS:
        return <Reports />;
      case ViewState.SETTINGS:
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  if (!isAuthenticated) {
    return <Login onLogin={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900 font-sans transition-colors duration-300">
      <Sidebar 
        currentView={currentView} 
        onChangeView={setCurrentView}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        onLogout={() => setIsAuthenticated(false)}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="h-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between px-4 sm:px-6 lg:px-8 z-10 transition-colors duration-300">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
              title="Open menu"
              aria-label="Open menu"
            >
              <Menu size={24} />
            </button>
            
            {/* Global Search (Hidden on small mobile) */}
            <div className="hidden md:flex items-center relative">
              <Search className="absolute left-3 text-gray-400" size={18} />
              <input 
                type="text" 
                placeholder={t('globalSearch')} 
                className="pl-10 pr-4 py-1.5 border border-gray-200 dark:border-gray-600 rounded-full text-sm w-64 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            <button 
              className="p-2 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 relative"
              title="Notifications"
              aria-label="Notifications"
            >
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white dark:ring-gray-800"></span>
            </button>
            
            <div className="h-8 w-px bg-gray-200 dark:bg-gray-700 mx-1"></div>

            <div className="flex items-center gap-3 cursor-pointer p-1 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
              <img 
                src="https://picsum.photos/200" 
                alt="User Avatar" 
                className="h-8 w-8 rounded-full object-cover ring-2 ring-white dark:ring-gray-700 shadow-sm"
              />
              <div className="hidden sm:block text-left">
                <div className="text-sm font-medium text-gray-700 dark:text-gray-200">Jane Doe</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">{t('admin')}</div>
              </div>
              <ChevronDown size={16} className="text-gray-400 hidden sm:block" />
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-auto p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {renderView()}
          </div>
        </main>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
};

export default App;