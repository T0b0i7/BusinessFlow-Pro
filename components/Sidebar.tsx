import React from 'react';
import { LayoutDashboard, Package, ShoppingCart, PieChart, Settings, X, LogOut, Moon, Sun, Languages } from 'lucide-react';
import { ViewState } from '../types';
import { useApp } from '../context';

interface SidebarProps {
  currentView: ViewState;
  onChangeView: (view: ViewState) => void;
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ 
  currentView, 
  onChangeView, 
  isOpen, 
  onClose,
  onLogout
}) => {
  const { t, theme, toggleTheme, language, setLanguage } = useApp();

  const menuItems = [
    { id: ViewState.DASHBOARD, label: t('dashboard'), icon: <LayoutDashboard size={20} /> },
    { id: ViewState.INVENTORY, label: t('inventory'), icon: <Package size={20} /> },
    { id: ViewState.SALES, label: t('sales'), icon: <ShoppingCart size={20} /> },
    { id: ViewState.REPORTS, label: t('reports'), icon: <PieChart size={20} /> },
    { id: ViewState.SETTINGS, label: t('settings'), icon: <Settings size={20} /> },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-gray-800 bg-opacity-50 z-20 lg:hidden backdrop-blur-sm transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Sidebar Container */}
      <div className={`
        fixed top-0 left-0 z-30 h-full w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 transform transition-transform duration-300 ease-in-out
        lg:translate-x-0 lg:static lg:h-screen
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="h-16 flex items-center justify-between px-6 border-b border-gray-100 dark:border-gray-800">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-primary-500/30">
                B
              </div>
              <span className="font-bold text-xl text-gray-900 dark:text-white tracking-tight">BusinessFlow</span>
            </div>
            <button 
              onClick={onClose} 
              className="lg:hidden text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-white"
              title="Close menu"
              aria-label="Close menu"
            >
              <X size={20} />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onChangeView(item.id);
                  if (window.innerWidth < 1024) onClose();
                }}
                className={`
                  w-full flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-colors duration-200
                  ${currentView === item.id 
                    ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-400' 
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'}
                `}
              >
                <span className={`${currentView === item.id ? 'text-primary-600 dark:text-primary-400' : 'text-gray-400 dark:text-gray-500'} mr-3`}>
                  {item.icon}
                </span>
                {item.label}
              </button>
            ))}
          </nav>

          {/* Settings & Logout */}
          <div className="p-4 border-t border-gray-100 dark:border-gray-800 space-y-2">
            
            {/* Theme & Language Toggles */}
            <div className="flex items-center gap-2 mb-4">
              <button 
                onClick={toggleTheme}
                className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                title={theme === 'light' ? 'Dark Mode' : 'Light Mode'}
              >
                {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
                <span>{theme === 'light' ? 'Dark' : 'Light'}</span>
              </button>

              <button 
                onClick={() => setLanguage(language === 'en' ? 'fr' : 'en')}
                className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                <Languages size={16} />
                <span>{language.toUpperCase()}</span>
              </button>
            </div>

            <button 
              onClick={onLogout}
              className="w-full flex items-center px-3 py-2.5 text-sm font-medium text-gray-600 dark:text-gray-400 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400 transition-colors"
            >
              <LogOut size={20} className="mr-3" />
              {t('signOut')}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};