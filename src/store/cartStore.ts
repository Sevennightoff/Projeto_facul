import { create } from 'zustand';
import { CartItem, Cupcake } from '../types';

interface CartState {
  items: CartItem[];
  addItem: (cupcake: Cupcake) => void;
  removeItem: (cupcakeId: number) => void;
  updateQuantity: (cupcakeId: number, quantity: number) => void;
  clearCart: () => void;
  total: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  addItem: (cupcake) => {
    const items = get().items;
    const existingItem = items.find((item) => item.cupcake.id === cupcake.id);
    
    if (existingItem) {
      set({
        items: items.map((item) =>
          item.cupcake.id === cupcake.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      });
    } else {
      set({ items: [...items, { cupcake, quantity: 1 }] });
    }
  },
  removeItem: (cupcakeId) => {
    set({ items: get().items.filter((item) => item.cupcake.id !== cupcakeId) });
  },
  updateQuantity: (cupcakeId, quantity) => {
    set({
      items: get().items.map((item) =>
        item.cupcake.id === cupcakeId ? { ...item, quantity } : item
      ),
    });
  },
  clearCart: () => set({ items: [] }),
  total: () => {
    return get().items.reduce(
      (total, item) => total + item.cupcake.price * item.quantity,
      0
    );
  },
}));