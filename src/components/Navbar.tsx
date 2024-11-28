import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, User, Package, Users } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { useCartStore } from '../store/cartStore';

export function Navbar() {
  const { user, logout } = useAuthStore();
  const items = useCartStore((state) => state.items);
  const itemCount = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <nav className="bg-pink-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          Cupcake Shop
        </Link>
        <div className="flex items-center gap-6">
          {user && (
            <Link to="/orders" className="hover:text-pink-200">
              <Package className="w-6 h-6" />
            </Link>
          )}
          <Link to="/cart" className="relative">
            <ShoppingCart className="w-6 h-6" />
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-white text-pink-600 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                {itemCount}
              </span>
            )}
          </Link>
          {user ? (
            <div className="flex items-center gap-4">
              {user.role === 'admin' && (
                <>
                  <Link to="/admin/orders" className="hover:text-pink-200">
                    <Package className="w-6 h-6" />
                  </Link>
                  <Link to="/admin/users" className="hover:text-pink-200">
                    <Users className="w-6 h-6" />
                  </Link>
                </>
              )}
              <Link to="/account">
                <User className="w-6 h-6" />
              </Link>
              <button
                onClick={logout}
                className="text-sm font-semibold hover:text-pink-200"
              >
                Sair
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="text-sm font-semibold hover:text-pink-200"
            >
              Entrar
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}