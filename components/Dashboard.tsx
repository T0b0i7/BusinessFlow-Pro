import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { ArrowUpRight, ArrowDownRight, DollarSign, ShoppingCart, Users, Activity } from 'lucide-react';
import { SALES_DATA } from '../constants';
import { KPIData } from '../types';
import { useApp } from '../context';

const KPIWidget: React.FC<{ data: KPIData }> = ({ data }) => {
  const { t } = useApp();
  const isPositive = data.trend >= 0;
  
  const getIcon = () => {
    switch (data.iconType) {
      case 'currency': return <DollarSign className="text-emerald-600 dark:text-emerald-400" size={24} />;
      case 'cart': return <ShoppingCart className="text-blue-600 dark:text-blue-400" size={24} />;
      case 'users': return <Users className="text-purple-600 dark:text-purple-400" size={24} />;
      case 'activity': return <Activity className="text-orange-600 dark:text-orange-400" size={24} />;
    }
  };

  const getBgColor = () => {
    switch (data.iconType) {
      case 'currency': return 'bg-emerald-100 dark:bg-emerald-900/30';
      case 'cart': return 'bg-blue-100 dark:bg-blue-900/30';
      case 'users': return 'bg-purple-100 dark:bg-purple-900/30';
      case 'activity': return 'bg-orange-100 dark:bg-orange-900/30';
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all duration-300">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">{data.title}</p>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{data.value}</h3>
        </div>
        <div className={`p-2 rounded-lg ${getBgColor()}`}>
          {getIcon()}
        </div>
      </div>
      <div className="mt-4 flex items-center text-sm">
        <span className={`flex items-center font-medium ${isPositive ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'}`}>
          {isPositive ? <ArrowUpRight size={16} className="mr-1" /> : <ArrowDownRight size={16} className="mr-1" />}
          {Math.abs(data.trend)}%
        </span>
        <span className="text-gray-400 dark:text-gray-500 ml-2">{t('vsLastMonth')}</span>
      </div>
    </div>
  );
};

export const Dashboard: React.FC = () => {
  const { t, theme } = useApp();

  const kpiStats: KPIData[] = [
    { title: t('totalRevenue'), value: "$54,230", trend: 12.5, iconType: 'currency' },
    { title: t('activeOrders'), value: "45", trend: -2.4, iconType: 'cart' },
    { title: t('newCustomers'), value: "128", trend: 8.2, iconType: 'users' },
    { title: t('stockValue'), value: "$12,450", trend: 4.1, iconType: 'activity' },
  ];

  const chartTextColor = theme === 'dark' ? '#9ca3af' : '#9ca3af';
  const chartGridColor = theme === 'dark' ? '#374151' : '#f3f4f6';
  const tooltipBgColor = theme === 'dark' ? '#1f2937' : '#ffffff';
  const tooltipTextColor = theme === 'dark' ? '#f3f4f6' : '#111827';

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{t('dashboardOverview')}</h1>
        <div className="text-sm text-gray-500 dark:text-gray-400">{t('lastUpdated')}</div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiStats.map((stat, idx) => (
          <KPIWidget key={idx} data={stat} />
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">{t('revenueAnalytics')}</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={SALES_DATA}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={chartGridColor} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: chartTextColor, fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: chartTextColor, fontSize: 12}} />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: tooltipBgColor,
                    borderRadius: '8px', 
                    border: 'none', 
                    color: tooltipTextColor,
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                  }} 
                />
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#3b82f6" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorValue)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Comparison Chart */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">{t('weeklyComparison')}</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={SALES_DATA}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={chartGridColor} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: chartTextColor, fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: chartTextColor, fontSize: 12}} />
                <Tooltip 
                  cursor={{fill: 'transparent'}}
                  contentStyle={{
                    backgroundColor: tooltipBgColor,
                    borderRadius: '8px', 
                    border: 'none', 
                    color: tooltipTextColor,
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                  }} 
                />
                <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} maxBarSize={40} />
                <Bar dataKey="previous" fill={theme === 'dark' ? '#4b5563' : '#e5e7eb'} radius={[4, 4, 0, 0]} maxBarSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};