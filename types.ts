export enum ViewState {
  DASHBOARD = 'DASHBOARD',
  INVENTORY = 'INVENTORY',
  SALES = 'SALES',
  REPORTS = 'REPORTS',
  SETTINGS = 'SETTINGS'
}

export type Language = 'en' | 'fr';
export type Theme = 'light' | 'dark';

export interface Product {
  id: string;
  name: string;
  sku: string;
  category: string;
  stock: number;
  price: number;
  status: 'In Stock' | 'Low Stock' | 'Out of Stock';
  lastUpdated: string;
}

export type OrderStatus = 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';

export interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  priceAtSale: number;
}

export interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  date: string;
  status: OrderStatus;
  items: OrderItem[];
  totalAmount: number;
}

export interface AppSettings {
  companyName: string;
  currency: string;
  taxRate: number;
  enableNotifications: boolean;
  emailAlerts: boolean;
}

export interface KPIData {
  title: string;
  value: string | number;
  trend: number;
  iconType: 'currency' | 'cart' | 'users' | 'activity';
}

export interface User {
  name: string;
  email: string;
  role: string;
  avatar: string;
}

export interface SalesDataPoint {
  name: string;
  value: number;
  previous: number;
}