import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useOrderStore } from '../store/orderStore';
import { useAuthStore } from '../store/authStore';
import { Clock, Package, CheckCircle, Truck } from 'lucide-react';

const statusIcons = {
  pending: Clock,
  preparing: Package,
  ready: CheckCircle,
  delivered: Truck,
};

const statusColors = {
  pending: 'text-yellow-500',
  preparing: 'text-blue-500',
  ready: 'text-green-500',
  delivered: 'text-gray-500',
};

export function Orders() {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { orders, fetchUserOrders, updateOrderStatus } = useOrderStore();

  useEffect(() => {
    if (user) {
      fetchUserOrders(user.id);
    }
  }, [user]);

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Meus Pedidos</h1>
      <div className="space-y-6">
        {orders.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-600">Você ainda não fez nenhum pedido.</p>
            <button
              onClick={() => navigate('/')}
              className="mt-4 bg-pink-600 text-white px-6 py-2 rounded-md hover:bg-pink-700 transition-colors"
            >
              Fazer Pedido
            </button>
          </div>
        ) : (
          orders.map((order) => {
            const StatusIcon = statusIcons[order.status];
            return (
              <div
                key={order.id}
                className="bg-white rounded-lg shadow-md p-6"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-800">
                      Pedido #{order.id}
                    </h2>
                    <p className="text-sm text-gray-600">
                      {new Date(order.createdAt).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                  <div className={`flex items-center gap-2 ${statusColors[order.status]}`}>
                    <StatusIcon className="w-5 h-5" />
                    <span className="font-medium">
                      {order.status === 'pending' && 'Pendente'}
                      {order.status === 'preparing' && 'Preparando'}
                      {order.status === 'ready' && 'Pronto'}
                      {order.status === 'delivered' && 'Entregue'}
                    </span>
                  </div>
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
            );
          })
        )}
      </div>
    </div>
  );
}