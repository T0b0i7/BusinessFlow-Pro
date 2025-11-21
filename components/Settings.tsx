import React, { useState } from 'react';
import { Save } from 'lucide-react';
import { Button } from './Button';
import { useApp } from '../context';

export const Settings: React.FC = () => {
  const { t, settings, updateSettings } = useApp();
  const [localSettings, setLocalSettings] = useState(settings);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(localSettings);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <div className="max-w-3xl mx-auto animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{t('settingsTitle')}</h1>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* General Settings */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
           <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 pb-2 border-b border-gray-100 dark:border-gray-700">
             {t('generalSettings')}
           </h2>
           
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div>
               <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t('companyName')}</label>
               <input 
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-primary-500"
                  value={localSettings.companyName}
                  onChange={e => setLocalSettings({...localSettings, companyName: e.target.value})}
                  title="Company name"
                  aria-label="Company name"
                  placeholder="Company name"
               />
             </div>
             <div>
               <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t('currency')}</label>
               <select 
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-primary-500"
                  value={localSettings.currency}
                  onChange={e => setLocalSettings({...localSettings, currency: e.target.value})}
                  title="Currency"
                  aria-label="Currency"
               >
                 <option value="EUR">EUR (€)</option>
                 <option value="USD">USD ($)</option>
                 <option value="GBP">GBP (£)</option>
               </select>
             </div>
             <div>
               <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t('taxRate')}</label>
               <input 
                  type="number"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-primary-500"
                  value={localSettings.taxRate}
                  onChange={e => setLocalSettings({...localSettings, taxRate: Number(e.target.value)})}
                  title="Tax rate"
                  aria-label="Tax rate"
                  placeholder="Tax rate %"
               />
             </div>
           </div>
        </div>

        {/* Notifications */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
           <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 pb-2 border-b border-gray-100 dark:border-gray-700">
             {t('notifications')}
           </h2>
           
           <div className="space-y-4">
             <div className="flex items-center justify-between">
               <span className="text-gray-700 dark:text-gray-300">{t('enablePush')}</span>
               <label className="relative inline-flex items-center cursor-pointer">
                 <input 
                   type="checkbox" 
                   className="sr-only peer" 
                   checked={localSettings.enableNotifications}
                   onChange={e => setLocalSettings({...localSettings, enableNotifications: e.target.checked})}
                   title="Enable push notifications"
                   aria-label="Enable push notifications"
                 />
                 <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600"></div>
               </label>
             </div>
             
             <div className="flex items-center justify-between">
               <span className="text-gray-700 dark:text-gray-300">{t('enableEmail')}</span>
               <label className="relative inline-flex items-center cursor-pointer">
                 <input 
                   type="checkbox" 
                   className="sr-only peer" 
                   checked={localSettings.emailAlerts}
                   onChange={e => setLocalSettings({...localSettings, emailAlerts: e.target.checked})}
                   title="Enable email alerts"
                   aria-label="Enable email alerts"
                 />
                 <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600"></div>
               </label>
             </div>
           </div>
        </div>

        <div className="flex items-center justify-end gap-4">
          {showSuccess && <span className="text-emerald-600 text-sm font-medium animate-fade-in">{t('settingsSaved')}</span>}
          <Button type="submit" icon={<Save size={18} />}>
             {t('saveSettings')}
          </Button>
        </div>
      </form>
    </div>
  );
};