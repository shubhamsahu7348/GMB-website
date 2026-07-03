export interface ProductReview {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  avatar?: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number; // Base price for standard weight (e.g. 500g)
  discountPercent: number; // Discount rate e.g. 10 for 10%
  rating: number;
  ratingCount: number;
  stock: number;
  image: string;
  ingredients: string[];
  weightOptions: string[]; // e.g. ["250g", "500g", "1kg"]
  weightMultipliers: { [key: string]: number }; // e.g. { "250g": 0.55, "500g": 1.0, "1kg": 1.9 }
  tags: string[]; // ["Bestseller", "Festive", "Pure Ghee", "Sugar-Free", "New"]
  shelfLife: string; // e.g., "15 Days"
  reviews: ProductReview[];
}

export interface Category {
  id: string;
  name: string;
  description: string;
  iconName: string; // Lucide icon identifier
  image: string;
}

export interface CartItem {
  id: string; // combination of productId + selectedWeight
  product: Product;
  quantity: number;
  selectedWeight: string;
  priceAtSelection: number; // calculated price based on standard weight and multiplier
}

export interface ShippingAddress {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  items: CartItem[];
  totalAmount: number;
  discountAmount: number;
  finalAmount: number;
  couponApplied?: string;
  shippingAddress: ShippingAddress;
  status: 'Pending' | 'Preparing' | 'Dispatched' | 'Delivered' | 'Cancelled';
  date: string;
  paymentMethod: string;
  paymentId: string;
  invoiceNumber: string;
  loyaltyPointsEarned: number;
}

export interface UserProfile {
  id?: string;
  name: string;
  email: string;
  phone: string;
  address?: string;
  city?: string;
  state?: string;
  pincode?: string;
  loyaltyPoints?: number;
  role: 'customer' | 'admin';
}

export interface Coupon {
  code: string;
  discountPercent: number;
  maxDiscount: number;
  description: string;
  minOrderAmount: number;
  expiryDate: string;
  active: boolean;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  image: string;
  author: string;
  readTime: string;
  tags: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  comment: string;
  image: string;
  date: string;
}
