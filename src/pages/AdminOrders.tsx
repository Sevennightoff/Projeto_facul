import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useOrderStore } from '../store/orderStore';
import { useAuthStore } from '../store/authStore';
import { Clock, Package, CheckCircle, Truck } from 'lucide-react';

export function AdminOrders() {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { orders, fetchOrders, updateOrderStatus } = useOrderStore();

  useEffect(() => {
    if (user?.role === 'admin') {
      fetchOrders();
    }
  }, [user]);

  if (!user || user.role !== 'admin') {
    navigate('/');
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Gerenciar Pedidos</h1>
      <div className="space-y-6">
        {orders.map((order) => (
          <div key={order.id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-lg font-semibold text-gray-800">
                  Pedido #{order.id}
                </h2>
                <p className="text-sm text-gray-600">
                  {new Date(order.createdAt).toLocaleDateString('pt-BR')}
                </p>
              </div>
              <select
                value={order.status}
                onChange={(e) => updateOrderStatus(order.id, e.target.value as any)}
                className="border rounded-md px-3 py-1"
              >
                <option value="pending">Pendente</option>
                <option value="preparing">Preparando</option>
                <option value="ready">Pronto</option>
                <option value="delivered">Entregue</option>
              </select>
            </div>
            <div className="space-y-2">
              {order.items.map((item) => (
                <div
                  key={item.cupcake.id}
                  className="flex justify-between text-gray-700"
                >
                  <span>
                    {item.quantity}x {item.cupcake.name}
                  </span>
                  <span>
                    R$ {(item.quantity * item.cupcake.price).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
            <div className="border-t mt-4 pt-4 flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-600">
                  Pagamento: {order.paymentMethod}
                </p>
              </div>
              <p className="font-bold text-lg">
                Total: R$ {order.total.toFixed(2)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}