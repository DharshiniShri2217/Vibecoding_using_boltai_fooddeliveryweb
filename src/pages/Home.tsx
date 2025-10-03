import { useState } from 'react';
import { Search } from 'lucide-react';
import { FoodItem, Order } from '../types';
import { foodItems } from '../data/foodItems';
import FoodCard from '../components/FoodCard';
import { useAuth } from '../context/AuthContext';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const { user } = useAuth();

  const filteredItems = foodItems.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleOrder = (item: FoodItem) => {
    const orders: Order[] = JSON.parse(localStorage.getItem('orders') || '[]');

    const newOrder: Order = {
      id: crypto.randomUUID(),
      userId: user!.id,
      items: [{ foodItem: item, quantity: 1 }],
      totalAmount: item.isSpecialOffer
        ? item.price - (item.price * item.discountPercentage) / 100
        : item.price,
      status: 'pending',
      deliveryAddress: user!.district,
      createdAt: new Date(),
    };

    orders.push(newOrder);
    localStorage.setItem('orders', JSON.stringify(orders));

    alert(`${item.name} ordered successfully!`);
  };

  return (
    <div className="pb-20 md:pb-8">
      <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-2">Welcome to FoodExpress</h1>
          <p className="text-lg opacity-90">
            Delicious food delivered to your doorstep in {user?.district}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="relative max-w-2xl mx-auto">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent shadow-sm text-lg"
              placeholder="Search for food items..."
            />
          </div>
        </div>

        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-900">Special Offers</h2>
            <span className="text-orange-500 font-semibold">Limited Time!</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {foodItems
              .filter((item) => item.isSpecialOffer)
              .slice(0, 4)
              .map((item) => (
                <FoodCard key={item.id} item={item} onOrder={handleOrder} />
              ))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {searchQuery ? 'Search Results' : 'All Items'}
          </h2>
          {filteredItems.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredItems.map((item) => (
                <FoodCard key={item.id} item={item} onOrder={handleOrder} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No items found matching your search.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
