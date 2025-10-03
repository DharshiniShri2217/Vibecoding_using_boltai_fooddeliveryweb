import { FoodItem, Order } from '../types';
import { foodItems } from '../data/foodItems';
import FoodCard from '../components/FoodCard';
import { useAuth } from '../context/AuthContext';
import { Sparkles } from 'lucide-react';

export default function Offers() {
  const { user } = useAuth();
  const offerItems = foodItems.filter((item) => item.isSpecialOffer);

  const handleOrder = (item: FoodItem) => {
    const orders: Order[] = JSON.parse(localStorage.getItem('orders') || '[]');

    const newOrder: Order = {
      id: crypto.randomUUID(),
      userId: user!.id,
      items: [{ foodItem: item, quantity: 1 }],
      totalAmount: item.price - (item.price * item.discountPercentage) / 100,
      status: 'pending',
      deliveryAddress: user!.district,
      createdAt: new Date(),
    };

    orders.push(newOrder);
    localStorage.setItem('orders', JSON.stringify(orders));

    alert(`${item.name} ordered successfully with ${item.discountPercentage}% discount!`);
  };

  return (
    <div className="pb-20 md:pb-8">
      <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center space-x-3 mb-2">
            <Sparkles className="w-8 h-8" />
            <h1 className="text-4xl font-bold">Special Offers</h1>
          </div>
          <p className="text-lg opacity-90">
            Grab amazing deals on your favorite dishes!
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {offerItems.length > 0 ? (
          <>
            <div className="bg-orange-50 border border-orange-200 rounded-xl p-6 mb-8">
              <h2 className="text-xl font-bold text-orange-900 mb-2">
                Limited Time Offers
              </h2>
              <p className="text-orange-700">
                Save up to {Math.max(...offerItems.map(item => item.discountPercentage))}% on selected items.
                Order now before these deals expire!
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {offerItems.map((item) => (
                <FoodCard key={item.id} item={item} onOrder={handleOrder} />
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-4">
              <Sparkles className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No Active Offers
            </h3>
            <p className="text-gray-500">
              Check back later for exciting deals and discounts!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
