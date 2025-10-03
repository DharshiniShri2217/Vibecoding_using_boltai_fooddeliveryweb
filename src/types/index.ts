export interface User {
  id: string;
  email?: string;
  phone?: string;
  fullName: string;
  district: string;
}

export interface FoodItem {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  isSpecialOffer: boolean;
  discountPercentage: number;
  available: boolean;
}

export interface OrderItem {
  foodItem: FoodItem;
  quantity: number;
}

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'delivered' | 'cancelled';
  deliveryAddress: string;
  createdAt: Date;
}
