import { Product, SalesDataPoint } from "./types";

export const MOCK_PRODUCTS: Product[] = [
  { id: '1', name: 'Ergonomic Office Chair', sku: 'FUR-001', category: 'Furniture', stock: 45, price: 199.00, status: 'In Stock', lastUpdated: '2023-10-25' },
  { id: '2', name: 'Wireless Mechanical Keyboard', sku: 'TEC-002', category: 'Electronics', stock: 12, price: 129.50, status: 'Low Stock', lastUpdated: '2023-10-24' },
  { id: '3', name: '27" 4K Monitor', sku: 'TEC-003', category: 'Electronics', stock: 0, price: 349.00, status: 'Out of Stock', lastUpdated: '2023-10-20' },
  { id: '4', name: 'Standing Desk Converter', sku: 'FUR-004', category: 'Furniture', stock: 28, price: 149.99, status: 'In Stock', lastUpdated: '2023-10-26' },
  { id: '5', name: 'USB-C Docking Station', sku: 'TEC-005', category: 'Electronics', stock: 85, price: 89.99, status: 'In Stock', lastUpdated: '2023-10-26' },
  { id: '6', name: 'Noise Cancelling Headphones', sku: 'AUD-006', category: 'Audio', stock: 5, price: 299.00, status: 'Low Stock', lastUpdated: '2023-10-22' },
  { id: '7', name: 'Webcam HD 1080p', sku: 'TEC-007', category: 'Electronics', stock: 110, price: 59.00, status: 'In Stock', lastUpdated: '2023-10-21' },
];

export const SALES_DATA: SalesDataPoint[] = [
  { name: 'Mon', value: 4000, previous: 2400 },
  { name: 'Tue', value: 3000, previous: 1398 },
  { name: 'Wed', value: 2000, previous: 9800 },
  { name: 'Thu', value: 2780, previous: 3908 },
  { name: 'Fri', value: 1890, previous: 4800 },
  { name: 'Sat', value: 2390, previous: 3800 },
  { name: 'Sun', value: 3490, previous: 4300 },
];