import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Language, Theme, Product, Order, AppSettings, OrderStatus } from './types';
import { translations } from './translations';
import { MOCK_PRODUCTS } from './constants';

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  theme: Theme;
  toggleTheme: () => void;
  t: (key: keyof typeof translations['en']) => string;
  
  // Product CRUD
  products: Product[];
  addProduct: (product: Omit<Product, 'id' | 'lastUpdated'>) => void;
  deleteProduct: (id: string) => void;
  updateProduct: (id: string, data: Partial<Product>) => void;

  // Order CRUD
  orders: Order[];
  addOrder: (order: Omit<Order, 'id' | 'date'>) => void;
  updateOrderStatus: (id: string, status: OrderStatus) => void;
  deleteOrder: (id: string) => void;

  // Settings
  settings: AppSettings;
  updateSettings: (settings: Partial<AppSettings>) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const DEFAULT_SETTINGS: AppSettings = {
  companyName: 'Ma Société',
  currency: 'EUR',
  taxRate: 20,
  enableNotifications: true,
  emailAlerts: false,
};

// Mock initial orders
const INITIAL_ORDERS: Order[] = [
  {
    id: 'ORD-001',
    customerName: 'Alice Dupont',
    customerEmail: 'alice@example.com',
    date: '2023-10-26',
    status: 'Delivered',
    items: [
       { productId: '1', productName: 'Ergonomic Office Chair', quantity: 1, priceAtSale: 199.00 }
    ],
    totalAmount: 199.00
  },
  {
    id: 'ORD-002',
    customerName: 'Bob Martin',
    customerEmail: 'bob@example.com',
    date: '2023-10-27',
    status: 'Processing',
    items: [
       { productId: '2', productName: 'Wireless Keyboard', quantity: 2, priceAtSale: 129.50 }
    ],
    totalAmount: 259.00
  }
];

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('fr');
  const [theme, setTheme] = useState<Theme>('light');
  
  // Data State
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [settings, setSettings] = useState<AppSettings>(DEFAULT_SETTINGS);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme;
    if (savedTheme) {
      setTheme(savedTheme);
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark');
    }
  }, []);

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const t = (key: keyof typeof translations['en']) => {
    return translations[language][key] || key;
  };

  // Product Actions
  const addProduct = (productData: Omit<Product, 'id' | 'lastUpdated'>) => {
    const newProduct: Product = {
      ...productData,
      id: Math.random().toString(36).substr(2, 9),
      lastUpdated: new Date().toISOString().split('T')[0]
    };
    setProducts([...products, newProduct]);
  };

  const deleteProduct = (id: string) => {
    setProducts(products.filter(p => p.id !== id));
  };

  const updateProduct = (id: string, data: Partial<Product>) => {
    setProducts(products.map(p => p.id === id ? { ...p, ...data } : p));
  };

  // Order Actions
  const addOrder = (orderData: Omit<Order, 'id' | 'date'>) => {
    const newOrder: Order = {
      ...orderData,
      id: `ORD-${Math.floor(Math.random() * 10000)}`,
      date: new Date().toISOString().split('T')[0]
    };
    setOrders([newOrder, ...orders]);
    
    // Update stock for each item
    orderData.items.forEach(item => {
       const product = products.find(p => p.id === item.productId);
       if (product) {
         updateProduct(product.id, { stock: Math.max(0, product.stock - item.quantity) });
       }
    });
  };

  const updateOrderStatus = (id: string, status: OrderStatus) => {
    setOrders(orders.map(o => o.id === id ? { ...o, status } : o));
  };

  const deleteOrder = (id: string) => {
    setOrders(orders.filter(o => o.id !== id));
  };

  // Settings Actions
  const updateSettings = (newSettings: Partial<AppSettings>) => {
    setSettings({ ...settings, ...newSettings });
  };

  return (
    <AppContext.Provider value={{ 
      language, setLanguage, theme, toggleTheme, t,
      products, addProduct, deleteProduct, updateProduct,
      orders, addOrder, updateOrderStatus, deleteOrder,
      settings, updateSettings
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};