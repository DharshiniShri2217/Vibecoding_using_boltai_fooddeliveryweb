import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Order } from '../types';
import { ShoppingBag, Package, CheckCircle, XCircle, Clock } from 'lucide-react';

export default function Orders() {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const allOrders: Order[] = JSON.parse(localStorage.getItem('orders') || '[]');
    const userOrders = allOrders
      .filter((order) => order.userId === user?.id)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    setOrders(userOrders);
  }, [user]);

  const getStatusIcon = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'confirmed':
        return <Package className="w-5 h-5 text-blue-500" />;
      case 'delivered':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'cancelled':
        return <XCircle className="w-5 h-5 text-red-500" />;
    }
  };

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'confirmed':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'delivered':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200';
    }
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="pb-20 md:pb-8">
      <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center space-x-3 mb-2">
            <ShoppingBag className="w-8 h-8" />
            <h1 className="text-4xl font-bold">My Orders</h1>
          </div>
          <p className="text-lg opacity-90">View your order history and track deliveries</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8">
        {orders.length > 0 ? (
          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="text-sm font-semibold text-gray-500">
                          Order #{order.id.slice(0, 8)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500">{formatDate(order.createdAt)}</p>
                    </div>
                    <div
                      className={`flex items-center space-x-2 px-3 py-1 rounded-full border ${getStatusColor(
                        order.status
                      )}`}
                    >
                      {getStatusIcon(order.status)}
                      <span className="text-sm font-semibold capitalize">{order.status}</span>
                    </div>
                  </div>

                  <div className="border-t border-gray-100 pt-4">
                    {order.items.map((orderItem, index) => (
                      <div key={index} className="flex items-center space-x-4 mb-3">
                        <img
                          src={orderItem.foodItem.imageUrl}
                          alt={orderItem.foodItem.name}
                          className="w-16 h-16 rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900">
                            {orderItem.foodItem.name}
                          </h4>
                          <p className="text-sm text-gray-500">Quantity: {orderItem.quantity}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">
                            ₹
                            {orderItem.foodItem.isSpecialOffer
                              ? (
                                  orderItem.foodItem.price -
                                  (orderItem.foodItem.price *
                                    orderItem.foodItem.discountPercentage) /
                                    100
                                ).toFixed(0)
                              : orderItem.foodItem.price}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-gray-100 pt-4 mt-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Delivery Address</p>
                        <p className="font-medium text-gray-900">{order.deliveryAddress}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-500 mb-1">Total Amount</p>
                        <p className="text-2xl font-bold text-orange-500">
                          ₹{order.totalAmount.toFixed(0)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-4">
              <ShoppingBag className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Orders Yet</h3>
            <p className="text-gray-500 mb-6">
              Start ordering delicious food from our menu!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
