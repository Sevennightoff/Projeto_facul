import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Trash2 } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import { useAuthStore } from '../store/authStore';

export function Cart() {
  const navigate = useNavigate();
  const { items, removeItem, updateQuantity, total } = useCartStore();
  const { user } = useAuthStore();

  const handleCheckout = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    navigate('/checkout');
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Seu carrinho está vazio
        </h1>
        <button
          onClick={() => navigate('/')}
          className="bg-pink-600 text-white px-6 py-2 rounded-md hover:bg-pink-700 transition-colors"
        >
          Voltar às compras
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Seu Carrinho</h1>
      <div className="bg-white rounded-lg shadow-md p-6">
        {items.map((item) => (
          <div
            key={item.cupcake.id}
            className="flex items-center py-4 border-b last:border-b-0"
          >
            <img
              src={item.cupcake.image}
              alt={item.cupcake.name}
              className="w-24 h-24 object-cover rounded-md"
            />
            <div className="flex-1 ml-4">
              <h2 className="text-lg font-semibold text-gray-800">
                {item.cupcake.name}
              </h2>
              <p className="text-gray-600">
                R$ {item.cupcake.price.toFixed(2)} cada
              </p>
            </div>
            <div className="flex items-center gap-4">
              <select
                value={item.quantity}
                onChange={(e) =>
                  updateQuantity(item.cupcake.id, Number(e.target.value))
                }
                className="border rounded-md px-2 py-1"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>
              <button
                onClick={() => removeItem(item.cupcake.id)}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
        <div className="mt-6 flex justify-between items-center">
          <div className="text-xl font-bold text-gray-800">
            Total: R$ {total().toFixed(2)}
          </div>
          <button
            onClick={handleCheckout}
            className="bg-pink-600 text-white px-8 py-3 rounded-md hover:bg-pink-700 transition-colors"
          >
            Finalizar Pedido
          </button>
        </div>
      </div>
    </div>
  );
}