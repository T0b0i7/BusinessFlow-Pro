import React, { useState } from 'react';
import { Plus, Search, ShoppingCart, Trash2, ChevronDown, Check, X } from 'lucide-react';
import { Button } from './Button';
import { useApp } from '../context';
import { OrderStatus } from '../types';

export const Sales: React.FC = () => {
  const { t, orders, products, addOrder, updateOrderStatus, deleteOrder, settings } = useApp();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // New Order State
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [selectedItems, setSelectedItems] = useState<{productId: string, qty: number}[]>([]);

  const filteredOrders = orders.filter(o => 
    o.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    o.customerName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddItem = () => {
    if (products.length > 0) {
      setSelectedItems([...selectedItems, { productId: products[0].id, qty: 1 }]);
    }
  };

  const handleUpdateItem = (index: number, field: 'productId' | 'qty', value: string | number) => {
    const newItems = [...selectedItems];
    // @ts-ignore
    newItems[index][field] = value;
    setSelectedItems(newItems);
  };

  const handleRemoveItem = (index: number) => {
    setSelectedItems(selectedItems.filter((_, i) => i !== index));
  };

  const calculateTotal = () => {
    return selectedItems.reduce((acc, item) => {
      const product = products.find(p => p.id === item.productId);
      return acc + (product ? product.price * item.qty : 0);
    }, 0);
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedItems.length === 0) return;

    const orderItems = selectedItems.map(item => {
      const product = products.find(p => p.id === item.productId);
      return {
        productId: item.productId,
        productName: product?.name || 'Unknown',
        quantity: item.qty,
        priceAtSale: product?.price || 0
      };
    });

    addOrder({
      customerName,
      customerEmail,
      status: 'Pending',
      items: orderItems,
      totalAmount: calculateTotal()
    });

    // Reset and close
    setIsModalOpen(false);
    setCustomerName('');
    setCustomerEmail('');
    setSelectedItems([]);
  };

  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case 'Pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'Processing': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
      case 'Shipped': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400';
      case 'Delivered': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'Cancelled': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{t('salesModule')}</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">{t('revenueAnalytics')}</p>
        </div>
        <Button icon={<Plus size={18} />} onClick={() => setIsModalOpen(true)}>{t('newOrder')}</Button>
      </div>

      {/* Search Bar */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder={t('searchPlaceholder')}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-shadow bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Orders List */}
      <div className="grid grid-cols-1 gap-4">
        {filteredOrders.length === 0 ? (
          <div className="text-center py-12 text-gray-500 dark:text-gray-400">{t('noOrders')}</div>
        ) : (
          filteredOrders.map((order) => (
            <div key={order.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 hover:shadow-md transition-shadow">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="text-lg font-bold text-gray-900 dark:text-white">#{order.id}</span>
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                      {t(order.status.toLowerCase() as any)}
                    </span>
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {order.date} • {order.customerName} ({order.customerEmail})
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xl font-bold text-gray-900 dark:text-white">
                    {order.totalAmount.toFixed(2)} {settings.currency}
                  </span>
                  <div className="relative group">
                    <button 
                      className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full text-gray-500"
                      title="Change order status"
                      aria-label="Change order status"
                    >
                      <ChevronDown size={20} />
                    </button>
                    {/* Simple Status Dropdown */}
                    <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-600 hidden group-hover:block z-10">
                       {['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'].map((s) => (
                         <button 
                           key={s}
                           onClick={() => updateOrderStatus(order.id, s as OrderStatus)}
                           className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200"
                         >
                           {t(s.toLowerCase() as any)}
                         </button>
                       ))}
                    </div>
                  </div>
                  <button 
                    onClick={() => { if(confirm(t('confirmDelete'))) deleteOrder(order.id) }}
                    className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full"
                    title="Delete order"
                    aria-label="Delete order"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
              
              {/* Order Items Details */}
              <div className="border-t border-gray-100 dark:border-gray-700 pt-4">
                 <h4 className="text-xs font-semibold text-gray-500 uppercase mb-2">{t('items')}</h4>
                 <div className="space-y-2">
                   {order.items.map((item, idx) => (
                     <div key={idx} className="flex justify-between text-sm">
                       <span className="text-gray-700 dark:text-gray-300">
                         {item.quantity}x {item.productName}
                       </span>
                       <span className="text-gray-900 dark:text-white font-medium">
                         {(item.priceAtSale * item.quantity).toFixed(2)} {settings.currency}
                       </span>
                     </div>
                   ))}
                 </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Create Order Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-fade-in">
             <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center sticky top-0 bg-white dark:bg-gray-800">
               <h3 className="text-lg font-bold text-gray-900 dark:text-white">{t('newOrder')}</h3>
               <button 
                 onClick={() => setIsModalOpen(false)}
                 title="Close modal"
                 aria-label="Close modal"
               >
                 <X className="text-gray-400 hover:text-gray-600" />
               </button>
             </div>
             
             <form onSubmit={handleSubmitOrder} className="p-6 space-y-6">
                {/* Customer Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                   <div>
                     <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t('customer')}</label>
                     <input 
                        required
                        type="text" 
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none"
                        value={customerName}
                        onChange={e => setCustomerName(e.target.value)}
                        placeholder="John Doe"
                     />
                   </div>
                   <div>
                     <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                     <input 
                        required
                        type="email" 
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none"
                        value={customerEmail}
                        onChange={e => setCustomerEmail(e.target.value)}
                        placeholder="john@example.com"
                     />
                   </div>
                </div>

                {/* Items Selection */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('items')}</label>
                    <Button type="button" size="sm" variant="outline" onClick={handleAddItem} icon={<Plus size={14}/>}>{t('addItem')}</Button>
                  </div>
                  
                  <div className="space-y-3">
                    {selectedItems.length === 0 && (
                      <p className="text-sm text-gray-500 italic text-center py-4 border border-dashed border-gray-300 dark:border-gray-700 rounded-lg">
                        {t('fillAllFields')}
                      </p>
                    )}
                    {selectedItems.map((item, idx) => (
                      <div key={idx} className="flex gap-2 items-center">
                        <select 
                          className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white outline-none"
                          value={item.productId}
                          onChange={e => handleUpdateItem(idx, 'productId', e.target.value)}
                          title="Select product"
                          aria-label="Select product"
                        >
                          {products.map(p => (
                            <option key={p.id} value={p.id}>{p.name} (${p.price})</option>
                          ))}
                        </select>
                        <input 
                          type="number" 
                          min="1"
                          className="w-20 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white outline-none"
                          value={item.qty}
                          onChange={e => handleUpdateItem(idx, 'qty', parseInt(e.target.value))}
                          title="Quantity"
                          aria-label="Quantity"
                          placeholder="Qty"
                        />
                        <button 
                          type="button" 
                          onClick={() => handleRemoveItem(idx)} 
                          className="text-red-500 hover:bg-red-50 p-2 rounded-lg"
                          title="Remove item"
                          aria-label="Remove item"
                        >
                           <Trash2 size={18} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Summary */}
                <div className="bg-gray-50 dark:bg-gray-700/30 p-4 rounded-lg flex justify-between items-center">
                   <span className="font-medium text-gray-900 dark:text-white">{t('total')}</span>
                   <span className="text-xl font-bold text-primary-600">{calculateTotal().toFixed(2)} {settings.currency}</span>
                </div>

                <div className="flex justify-end gap-3">
                  <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)}>{t('cancel')}</Button>
                  <Button type="submit">{t('createOrder')}</Button>
                </div>
             </form>
          </div>
        </div>
      )}
    </div>
  );
};