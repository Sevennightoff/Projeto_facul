export interface Cupcake {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'user';
}

export interface CartItem {
  cupcake: Cupcake;
  quantity: number;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'preparing' | 'ready' | 'delivered';
  createdAt: string;
  paymentMethod: string;
}