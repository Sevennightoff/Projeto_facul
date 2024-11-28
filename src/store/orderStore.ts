import { create } from 'zustand';
import { Order, CartItem } from '../types';

interface OrderState {
  orders: Order[];
  createOrder: (userId: string, items: CartItem[], total: number, paymentMethod: string) => Promise<void>;
  updateOrderStatus: (orderId: string, status: Order['status']) => Promise<void>;
  fetchOrders: () => Promise<void>;
  fetchUserOrders: (userId: string) => Promise<void>;
}

export const useOrderStore = create<OrderState>((set, get) => ({
  orders: [],
  createOrder: async (userId: string, items: CartItem[], total: number, paymentMethod: string) => {
    const newOrder: Order = {
      id: Math.random().toString(36).substr(2, 9),
      userId,
      items,
      total,
      status: 'pending',
      createdAt: new Date().toISOString(),
      paymentMethod,
    };
    set({ orders: [...get().orders, newOrder] });
  },
  updateOrderStatus: async (orderId: string, status: Order['status']) => {
    const orders = get().orders.map(order =>
      order.id === orderId ? { ...order, status } : order
    );
    set({ orders });
  },
  fetchOrders: async () => {
    // Simulate API call
    const orders: Order[] = [];
    set({ orders });
  },
  fetchUserOrders: async (userId: string) => {
    await get().fetchOrders();
    const orders = get().orders.filter(order => order.userId === userId);
    set({ orders });
  },
}));