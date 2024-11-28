import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '../store/cartStore';
import { useAuthStore } from '../store/authStore';
import { useOrderStore } from '../store/orderStore';

export function Checkout() {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { items, total, clearCart } = useCartStore();
  const { createOrder } = useOrderStore();
  const [paymentMethod, setPaymentMethod] = useState('credit');
  const [processing, setProcessing] = useState(false);

  if (!user) {
    navigate('/login');
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);
    
    try {
      await createOrder(user.id, items, total(), paymentMethod);
      clearCart();
      navigate('/success');
    } catch (error) {
      console.error('Error creating order:', error);
      setProcessing(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Checkout</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Resumo do Pedido</h2>
          {items.map((item) => (
            <div key={item.cupcake.id} className="flex justify-between py-2">
              <span>
                {item.quantity}x {item.cupcake.name}
              </span>
              <span>R$ {(item.quantity * item.cupcake.price).toFixed(2)}</span>
            </div>
          ))}
          <div className="border-t mt-4 pt-4">
            <div className="flex justify-between font-bold">
              <span>Total</span>
              <span>R$ {total().toFixed(2)}</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Pagamento</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Método de Pagamento
              </label>
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="w-full border rounded-md p-2"
              >
                <option value="credit">Cartão de Crédito</option>
                <option value="debit">Cartão de Débito</option>
                <option value="pix">PIX</option>
              </select>
            </div>

            {paymentMethod === 'credit' || paymentMethod === 'debit' ? (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Número do Cartão
                  </label>
                  <input
                    type="text"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Validade
                    </label>
                    <input
                      type="text"
                      placeholder="MM/AA"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      CVV
                    </label>
                    <input
                      type="text"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                      required
                    />
                  </div>
                </div>
              </>
            ) : (
              <div className="bg-gray-100 p-4 rounded-md">
                <p className="text-center">
                  Chave PIX: cupcake@shop.com.br
                </p>
              </div>
            )}

            <button
              type="submit"
              disabled={processing}
              className="w-full bg-pink-600 text-white py-3 rounded-md hover:bg-pink-700 transition-colors disabled:bg-pink-400"
            >
              {processing ? 'Processando...' : 'Finalizar Compra'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}