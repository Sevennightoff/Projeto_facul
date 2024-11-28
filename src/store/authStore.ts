import { create } from 'zustand';
import { User } from '../types';

interface AuthState {
  user: User | null;
  users: User[];
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  updateUser: (userId: string, data: Partial<User>) => Promise<void>;
  deleteUser: (userId: string) => Promise<void>;
  fetchUsers: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  users: [],
  login: async (email: string, password: string) => {
    // Simulate API call
    const user = { 
      id: '1', 
      email, 
      name: email.split('@')[0],
      role: email.includes('admin') ? 'admin' : 'user' as const
    };
    set({ user });
  },
  register: async (email: string, password: string, name: string) => {
    // Simulate API call
    const user = { 
      id: '1', 
      email, 
      name,
      role: 'user' as const
    };
    set({ user });
  },
  logout: () => set({ user: null }),
  updateUser: async (userId: string, data: Partial<User>) => {
    const users = get().users.map(user =>
      user.id === userId ? { ...user, ...data } : user
    );
    set({ users });
  },
  deleteUser: async (userId: string) => {
    const users = get().users.filter(user => user.id !== userId);
    set({ users });
  },
  fetchUsers: async () => {
    // Simulate API call
    const users: User[] = [
      { id: '1', email: 'admin@example.com', name: 'Admin', role: 'admin' },
      { id: '2', email: 'user@example.com', name: 'User', role: 'user' },
    ];
    set({ users });
  },
}));