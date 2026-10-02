export type OlfactoryFamily =
  | 'Woody'
  | 'Floral'
  | 'Citrus'
  | 'Fruity'
  | 'Fresh'
  | 'Spicy'
  | 'Oriental'
  | 'Leather'
  | 'Powdery';

export type ProductCategory = 'Perfume' | 'Discovery Set' | 'Gift Set';

export type ProductSize = '30ml' | '50ml' | '100ml';

export type ProductPublishStatus = 'Published' | 'Draft' | 'Archived';

export interface FragranceNoteDetail {
  name: string;
  category: 'Top' | 'Heart' | 'Base';
  origin: string;
  description: string;
  iconType: 'berry' | 'wood' | 'flower' | 'spice' | 'vanilla' | 'citrus' | 'amber' | 'musk';
}

export interface ProductReview {
  id: string;
  productId?: string;
  productName?: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verified: boolean;
  status?: 'Pending' | 'Approved' | 'Rejected';
  location?: string;
}

export interface ProductVariant {
  size: ProductSize;
  price: number;
  compareAtPrice?: number;
  originalPrice?: number;
  costPrice?: number;
  sku?: string;
  stock?: number;
  inStock: boolean;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  classification: string;
  family: OlfactoryFamily;
  category: ProductCategory;
  price: number; // default price (usually 100ml or base)
  compareAtPrice?: number;
  costPrice?: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  volume?: string;
  sizes?: ProductSize[];
  liquidColor: string; // CSS gradient/color for flacon
  liquidHighlight: string;
  capColor?: string;
  topNotes: string[];
  heartNotes: string[];
  baseNotes: string[];
  description: string;
  inspiration?: string;
  howItSmells?: string;
  howToWear?: string;
  details?: string;
  longevity?: string;
  sillage?: string;
  season?: string;
  stock: number;
  lowStockThreshold?: number;
  inStock: boolean;
  status?: ProductPublishStatus;
  badge?: 'NEW' | 'BESTSELLER' | 'LIMITED';
  isBestseller?: boolean;
  featured?: boolean;
  sku: string;
  variants: ProductVariant[];
  reviews: ProductReview[];
}

export interface ProductCollection {
  id: string;
  name: string;
  slug: string;
  description: string;
  coverImage?: string;
  productIds: string[];
  displayOrder: number;
  status: 'Published' | 'Draft';
}

export interface CartItem {
  product: Product;
  quantity: number;
  size: ProductSize;
  unitPrice: number;
  engraving?: string;
}

export interface ShippingAddress {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  apartment?: string;
  city: string;
  state: string;
  pinCode: string;
}

export type PaymentMethod = 'upi' | 'card' | 'netbanking' | 'wallets' | 'cod';

export type OrderStatus =
  | 'Pending'
  | 'Confirmed'
  | 'Processing'
  | 'Packed'
  | 'Shipped'
  | 'Out for Delivery'
  | 'Delivered'
  | 'Cancelled'
  | 'Refunded';

export interface Order {
  orderId: string;
  items: CartItem[];
  shippingAddress: ShippingAddress;
  paymentMethod: PaymentMethod;
  paymentStatus: 'Paid' | 'Pending' | 'COD Confirmed' | 'Refunded';
  orderStatus: OrderStatus;
  subtotal: number;
  discount: number;
  shipping: number;
  giftWrap: number;
  total: number;
  promoCode?: string;
  createdAt: string;
  estimatedDelivery: string;
  trackingNumber: string;
  courier: string;
  notes?: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  totalOrders: number;
  totalSpend: number;
  lastOrderDate: string;
  joinedDate: string;
  addresses: ShippingAddress[];
  tier: 'Connoisseur' | 'Patron' | 'VIP';
}

export interface Coupon {
  code: string;
  type: 'percentage' | 'fixed';
  value: number;
  minCartValue: number;
  maxDiscount?: number;
  usageLimit: number;
  usedCount: number;
  startDate: string;
  endDate: string;
  applicableCollections?: string[];
  active: boolean;
}

export interface GiftCard {
  id: string;
  code: string;
  initialBalance: number;
  currentBalance: number;
  recipientEmail: string;
  recipientName: string;
  expiryDate: string;
  status: 'Active' | 'Used' | 'Expired' | 'Disabled';
  createdAt: string;
}

export interface HomepageContentConfig {
  heroEyebrow: string;
  heroHeading: string;
  heroDescription: string;
  heroCtaText: string;
  heroCtaLink: string;
  heroSecondaryCtaText: string;
  heroSecondaryCtaLink: string;
  heroActive: boolean;
  bestsellersHeading: string;
  bestsellersSubheading: string;
  collectionHeading: string;
  collectionSubheading: string;
  newsletterHeading: string;
  newsletterSubheading: string;
}

export interface Banner {
  id: string;
  title: string;
  text: string;
  ctaText?: string;
  ctaLink?: string;
  active: boolean;
}

export interface AdminNotification {
  id: string;
  type: 'order' | 'payment_failed' | 'low_stock' | 'review' | 'refund';
  title: string;
  message: string;
  date: string;
  read: boolean;
  link?: string;
}

export interface AuditLogItem {
  id: string;
  user: string;
  role: string;
  action: string;
  details: string;
  timestamp: string;
}

export type AdminRole = 'OWNER' | 'ADMIN' | 'MANAGER' | 'CONTENT MANAGER';

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: AdminRole;
  avatarInitials: string;
  lastLogin: string;
}

export interface StoreSettings {
  storeName: string;
  supportEmail: string;
  phone: string;
  currency: string;
  country: string;
  timezone: string;
  freeShippingThreshold: number;
  standardShippingFee: number;
  taxEnabled: boolean;
  taxPercentage: number;
  pricesIncludeTax: boolean;
  enabledPayments: {
    upi: boolean;
    card: boolean;
    netbanking: boolean;
    wallets: boolean;
    cod: boolean;
  };
  notificationPreferences: {
    newOrder: boolean;
    lowStock: boolean;
    newReview: boolean;
    customerJoined: boolean;
  };
}

export interface QuizAnswer {
  mood?: string;
  intensity?: string;
  notePreference?: string;
}

export type PageRoute =
  | 'home'
  | 'shop'
  | 'product'
  | 'cart'
  | 'checkout'
  | 'order-confirmed'
  | 'track-order'
  | 'wishlist'
  | 'account'
  | 'admin/login'
  | 'admin/dashboard'
  | 'admin/orders'
  | 'admin/products'
  | 'admin/inventory'
  | 'admin/collections'
  | 'admin/customers'
  | 'admin/reviews'
  | 'admin/coupons'
  | 'admin/gift-cards'
  | 'admin/content'
  | 'admin/analytics'
  | 'admin/settings';


