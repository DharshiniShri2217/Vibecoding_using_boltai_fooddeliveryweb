import { FoodItem } from '../types';
import { ShoppingCart, Tag } from 'lucide-react';

interface FoodCardProps {
  item: FoodItem;
  onOrder: (item: FoodItem) => void;
}

export default function FoodCard({ item, onOrder }: FoodCardProps) {
  const discountedPrice = item.isSpecialOffer
    ? item.price - (item.price * item.discountPercentage) / 100
    : item.price;

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden transition-transform hover:scale-105 hover:shadow-xl">
      <div className="relative h-48 overflow-hidden">
        <img
          src={item.imageUrl}
          alt={item.name}
          className="w-full h-full object-cover"
        />
        {item.isSpecialOffer && (
          <div className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center space-x-1">
            <Tag className="w-4 h-4" />
            <span>{item.discountPercentage}% OFF</span>
          </div>
        )}
        <div className="absolute bottom-2 left-2 bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
          {item.category}
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-900 mb-1">{item.name}</h3>
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{item.description}</p>

        <div className="flex items-center justify-between">
          <div className="flex items-baseline space-x-2">
            {item.isSpecialOffer ? (
              <>
                <span className="text-xl font-bold text-orange-500">
                  ₹{discountedPrice.toFixed(0)}
                </span>
                <span className="text-sm text-gray-400 line-through">
                  ₹{item.price}
                </span>
              </>
            ) : (
              <span className="text-xl font-bold text-gray-900">
                ₹{item.price}
              </span>
            )}
          </div>

          <button
            onClick={() => onOrder(item)}
            className="bg-orange-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-orange-600 transition-colors flex items-center space-x-2"
          >
            <ShoppingCart className="w-4 h-4" />
            <span>Order</span>
          </button>
        </div>
      </div>
    </div>
  );
}
