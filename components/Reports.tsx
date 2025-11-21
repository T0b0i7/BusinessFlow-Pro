import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { useApp } from '../context';

export const Reports: React.FC = () => {
  const { t, orders, theme } = useApp();

  // 1. Revenue by Date
  const revenueData = orders.reduce((acc: any[], order) => {
    const existing = acc.find(d => d.date === order.date);
    if (existing) {
      existing.amount += order.totalAmount;
    } else {
      acc.push({ date: order.date, amount: order.totalAmount });
    }
    return acc;
  }, []).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  // 2. Status Distribution
  const statusData = [
    { name: 'Pending', value: orders.filter(o => o.status === 'Pending').length },
    { name: 'Delivered', value: orders.filter(o => o.status === 'Delivered').length },
    { name: 'Processing', value: orders.filter(o => o.status === 'Processing').length },
    { name: 'Cancelled', value: orders.filter(o => o.status === 'Cancelled').length },
  ].filter(d => d.value > 0);

  const COLORS = ['#f59e0b', '#10b981', '#3b82f6', '#ef4444'];
  const chartTextColor = theme === 'dark' ? '#9ca3af' : '#374151';
  const chartGridColor = theme === 'dark' ? '#374151' : '#f3f4f6';
  const tooltipBg = theme === 'dark' ? '#1f2937' : '#fff';
  const tooltipText = theme === 'dark' ? '#fff' : '#000';

  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{t('reportsOverview')}</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Revenue Chart */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">{t('salesPerformance')}</h3>
          <div className="h-80">
            {revenueData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={chartGridColor} />
                  <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fill: chartTextColor, fontSize: 12}} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: chartTextColor, fontSize: 12}} />
                  <Tooltip 
                    cursor={{fill: 'transparent'}}
                    contentStyle={{ backgroundColor: tooltipBg, borderRadius: '8px', border: 'none', color: tooltipText }} 
                  />
                  <Bar dataKey="amount" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-gray-400">{t('noOrders')}</div>
            )}
          </div>
        </div>

        {/* Status Pie Chart */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">{t('orderStatusDist')}</h3>
          <div className="h-80">
            {statusData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={statusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: tooltipBg, borderRadius: '8px', border: 'none', color: tooltipText }} />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-gray-400">{t('noOrders')}</div>
            )}
          </div>
          <div className="flex flex-wrap gap-4 justify-center mt-4">
             {statusData.map((entry, index) => {
               const colorClasses = [
                 'bg-amber-500',
                 'bg-emerald-500',
                 'bg-blue-500',
                 'bg-red-500'
               ];
               const colorClass = colorClasses[index % colorClasses.length];
               return (
                 <div key={entry.name} className="flex items-center text-xs">
                   <span className={`w-3 h-3 rounded-full mr-2 ${colorClass}`}></span>
                   <span className="text-gray-600 dark:text-gray-300">{t(entry.name.toLowerCase() as any)} ({entry.value})</span>
                 </div>
               );
             })}
          </div>
        </div>
      </div>
    </div>
  );
};