import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Product,
  Order,
  Customer,
  Coupon,
  GiftCard,
  ProductCollection,
  HomepageContentConfig,
  Banner,
  AdminNotification,
  AuditLogItem,
  AdminUser,
  StoreSettings,
  OrderStatus,
  ProductReview,
} from '../types';
import {
  INITIAL_PRODUCTS,
  INITIAL_COLLECTIONS,
  INITIAL_ORDERS,
  INITIAL_CUSTOMERS,
  INITIAL_COUPONS,
  INITIAL_GIFT_CARDS,
  INITIAL_HOMEPAGE_CONFIG,
  INITIAL_BANNERS,
  INITIAL_ADMIN_USERS,
  INITIAL_NOTIFICATIONS,
  INITIAL_AUDIT_LOG,
  INITIAL_SETTINGS,
} from '../data/initialStoreState';

interface StoreContextType {
  // Store Data
  products: Product[];
  orders: Order[];
  customers: Customer[];
  collections: ProductCollection[];
  coupons: Coupon[];
  giftCards: GiftCard[];
  homepageConfig: HomepageContentConfig;
  banners: Banner[];
  notifications: AdminNotification[];
  auditLog: AuditLogItem[];
  settings: StoreSettings;
  adminUser: AdminUser | null;
  isAdminAuthenticated: boolean;

  // Admin Auth
  loginAdmin: (email: string, pass: string) => boolean;
  logoutAdmin: () => void;

  // Product Operations
  addProduct: (product: Product) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;
  updateStock: (productId: string, newStock: number) => void;

  // Order Operations
  placeCustomerOrder: (order: Order) => { success: boolean; error?: string };
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  updateOrderTracking: (
    orderId: string,
    courier: string,
    trackingNumber: string,
    estimatedDelivery: string
  ) => void;

  // Review Operations
  approveReview: (reviewId: string) => void;
  rejectReview: (reviewId: string) => void;
  deleteReview: (reviewId: string) => void;
  submitCustomerReview: (review: Omit<ProductReview, 'id' | 'status'>) => void;

  // Collection Operations
  addCollection: (col: ProductCollection) => void;
  updateCollection: (col: ProductCollection) => void;
  deleteCollection: (id: string) => void;

  // Coupon & Gift Card Operations
  addCoupon: (coupon: Coupon) => void;
  updateCoupon: (coupon: Coupon) => void;
  deleteCoupon: (code: string) => void;
  validateCoupon: (code: string, cartTotal: number) => { valid: boolean; discount: number; message: string };
  addGiftCard: (giftCard: GiftCard) => void;
  redeemGiftCard: (code: string, amount: number) => { valid: boolean; appliedAmount: number; message: string };

  // Content Operations
  updateHomepageConfig: (newConfig: Partial<HomepageContentConfig>) => void;
  addBanner: (banner: Banner) => void;
  toggleBanner: (id: string) => void;

  // Settings & Notifications
  updateSettings: (newSettings: Partial<StoreSettings>) => void;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  logAuditAction: (action: string, details: string) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [customers, setCustomers] = useState<Customer[]>(INITIAL_CUSTOMERS);
  const [collections, setCollections] = useState<ProductCollection[]>(INITIAL_COLLECTIONS);
  const [coupons, setCoupons] = useState<Coupon[]>(INITIAL_COUPONS);
  const [giftCards, setGiftCards] = useState<GiftCard[]>(INITIAL_GIFT_CARDS);
  const [homepageConfig, setHomepageConfig] = useState<HomepageContentConfig>(INITIAL_HOMEPAGE_CONFIG);
  const [banners, setBanners] = useState<Banner[]>(INITIAL_BANNERS);
  const [notifications, setNotifications] = useState<AdminNotification[]>(INITIAL_NOTIFICATIONS);
  const [auditLog, setAuditLog] = useState<AuditLogItem[]>(INITIAL_AUDIT_LOG);
  const [settings, setSettings] = useState<StoreSettings>(INITIAL_SETTINGS);

  // Admin Auth State (Default logged in for seamless demo/testing)
  const [adminUser, setAdminUser] = useState<AdminUser | null>(INITIAL_ADMIN_USERS[0]);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(true);

  const logAuditAction = (action: string, details: string) => {
    const newEntry: AuditLogItem = {
      id: `log-${Date.now()}`,
      user: adminUser ? adminUser.name : 'System',
      role: adminUser ? adminUser.role : 'SYSTEM',
      action,
      details,
      timestamp: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
    };
    setAuditLog((prev) => [newEntry, ...prev.slice(0, 49)]);
  };

  const loginAdmin = (email: string, pass: string): boolean => {
    if (email && pass) {
      setAdminUser(INITIAL_ADMIN_USERS[0]);
      setIsAdminAuthenticated(true);
      logAuditAction('Admin Login', `Admin signed in successfully as ${email}`);
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    logAuditAction('Admin Logout', 'Admin signed out of session');
    setIsAdminAuthenticated(false);
    setAdminUser(null);
  };

  // Product Operations
  const addProduct = (newProduct: Product) => {
    setProducts((prev) => [newProduct, ...prev]);
    logAuditAction('Created Product', `Published new creation: ${newProduct.name} (${newProduct.sku})`);
  };

  const updateProduct = (updated: Product) => {
    setProducts((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
    logAuditAction('Updated Product', `Modified specification for ${updated.name}`);
  };

  const deleteProduct = (id: string) => {
    const target = products.find((p) => p.id === id);
    setProducts((prev) => prev.filter((p) => p.id !== id));
    logAuditAction('Deleted Product', `Archived creation: ${target?.name || id}`);
  };

  const updateStock = (productId: string, newStock: number) => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === productId) {
          const inStock = newStock > 0;
          return {
            ...p,
            stock: newStock,
            inStock,
            variants: p.variants.map((v) => ({ ...v, stock: newStock, inStock })),
          };
        }
        return p;
      })
    );
    const p = products.find((prod) => prod.id === productId);
    logAuditAction('Stock Adjusted', `Stock for ${p?.name} set to ${newStock} units`);

    if (newStock < 10 && newStock > 0) {
      const newNotif: AdminNotification = {
        id: `notif-${Date.now()}`,
        type: 'low_stock',
        title: 'Critical Stock Level',
        message: `${p?.name} now has only ${newStock} units left in atelier vault.`,
        date: 'Just now',
        read: false,
        link: '#admin/inventory',
      };
      setNotifications((prev) => [newNotif, ...prev]);
    }
  };

  // Order Operations
  const placeCustomerOrder = (newOrder: Order): { success: boolean; error?: string } => {
    // 55. Stock verification
    for (const item of newOrder.items) {
      const liveProduct = products.find((p) => p.id === item.product.id);
      if (!liveProduct || liveProduct.stock < item.quantity) {
        return {
          success: false,
          error: `Insufficient inventory for ${item.product.name}. Available: ${liveProduct?.stock || 0}`,
        };
      }
    }

    // Decrement inventory
    setProducts((prev) =>
      prev.map((p) => {
        const matchingItem = newOrder.items.find((i) => i.product.id === p.id);
        if (matchingItem) {
          const updatedStock = Math.max(0, p.stock - matchingItem.quantity);
          return {
            ...p,
            stock: updatedStock,
            inStock: updatedStock > 0,
            variants: p.variants.map((v) => ({
              ...v,
              stock: updatedStock,
              inStock: updatedStock > 0,
            })),
          };
        }
        return p;
      })
    );

    // Save order
    setOrders((prev) => [newOrder, ...prev]);

    // Update or add customer record
    setCustomers((prev) => {
      const existing = prev.find(
        (c) => c.email.toLowerCase() === newOrder.shippingAddress.email.toLowerCase()
      );
      if (existing) {
        return prev.map((c) =>
          c.id === existing.id
            ? {
                ...c,
                totalOrders: c.totalOrders + 1,
                totalSpend: c.totalSpend + newOrder.total,
                lastOrderDate: newOrder.createdAt,
              }
            : c
        );
      } else {
        const newCust: Customer = {
          id: `cust-${Date.now()}`,
          name: `${newOrder.shippingAddress.firstName} ${newOrder.shippingAddress.lastName}`,
          email: newOrder.shippingAddress.email,
          phone: newOrder.shippingAddress.phone,
          totalOrders: 1,
          totalSpend: newOrder.total,
          lastOrderDate: newOrder.createdAt,
          joinedDate: newOrder.createdAt,
          tier: 'Connoisseur',
          addresses: [newOrder.shippingAddress],
        };
        return [newCust, ...prev];
      }
    });

    // Create Admin notification
    const newNotif: AdminNotification = {
      id: `notif-${Date.now()}`,
      type: 'order',
      title: 'New Haute Parfumerie Order',
      message: `Order #${newOrder.orderId} placed for ₹${newOrder.total.toLocaleString('en-IN')}`,
      date: 'Just now',
      read: false,
      link: `#admin/orders`,
    };
    setNotifications((prev) => [newNotif, ...prev]);
    logAuditAction('New Order Received', `Order #${newOrder.orderId} confirmed for ${newOrder.shippingAddress.firstName}`);

    return { success: true };
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.orderId === orderId ? { ...o, orderStatus: status } : o))
    );
    logAuditAction('Order Status Changed', `Order #${orderId} marked as ${status}`);
  };

  const updateOrderTracking = (
    orderId: string,
    courier: string,
    trackingNumber: string,
    estimatedDelivery: string
  ) => {
    setOrders((prev) =>
      prev.map((o) =>
        o.orderId === orderId
          ? {
              ...o,
              courier,
              trackingNumber,
              estimatedDelivery,
              orderStatus: 'Shipped',
            }
          : o
      )
    );
    logAuditAction(
      'Dispatched Order Tracking',
      `Assigned tracking ${trackingNumber} via ${courier} to #${orderId}`
    );
  };

  // Review Operations
  const approveReview = (reviewId: string) => {
    setProducts((prev) =>
      prev.map((p) => ({
        ...p,
        reviews: p.reviews.map((r) =>
          r.id === reviewId ? { ...r, status: 'Approved' } : r
        ),
      }))
    );
    logAuditAction('Approved Review', `Review ${reviewId} made public on boutique`);
  };

  const rejectReview = (reviewId: string) => {
    setProducts((prev) =>
      prev.map((p) => ({
        ...p,
        reviews: p.reviews.map((r) =>
          r.id === reviewId ? { ...r, status: 'Rejected' } : r
        ),
      }))
    );
    logAuditAction('Rejected Review', `Review ${reviewId} hidden from storefront`);
  };

  const deleteReview = (reviewId: string) => {
    setProducts((prev) =>
      prev.map((p) => ({
        ...p,
        reviews: p.reviews.filter((r) => r.id !== reviewId),
      }))
    );
    logAuditAction('Deleted Review', `Permanently removed review ${reviewId}`);
  };

  const submitCustomerReview = (review: Omit<ProductReview, 'id' | 'status'>) => {
    const newRev: ProductReview = {
      ...review,
      id: `rev-${Date.now()}`,
      status: 'Pending', // Pending moderation
    };
    setProducts((prev) =>
      prev.map((p) =>
        p.id === review.productId ? { ...p, reviews: [newRev, ...p.reviews] } : p
      )
    );
    const newNotif: AdminNotification = {
      id: `notif-${Date.now()}`,
      type: 'review',
      title: 'Review Awaiting Approval',
      message: `${review.author} submitted a review for ${review.productName}.`,
      date: 'Just now',
      read: false,
      link: '#admin/reviews',
    };
    setNotifications((prev) => [newNotif, ...prev]);
  };

  // Collection Operations
  const addCollection = (col: ProductCollection) => {
    setCollections((prev) => [...prev, col]);
    logAuditAction('Created Collection', `Added collection ${col.name}`);
  };

  const updateCollection = (col: ProductCollection) => {
    setCollections((prev) => prev.map((c) => (c.id === col.id ? col : c)));
    logAuditAction('Updated Collection', `Edited collection ${col.name}`);
  };

  const deleteCollection = (id: string) => {
    setCollections((prev) => prev.filter((c) => c.id !== id));
    logAuditAction('Deleted Collection', `Removed collection ${id}`);
  };

  // Coupon Operations
  const addCoupon = (coupon: Coupon) => {
    setCoupons((prev) => [coupon, ...prev]);
    logAuditAction('Created Coupon', `Created privilege voucher ${coupon.code}`);
  };

  const updateCoupon = (coupon: Coupon) => {
    setCoupons((prev) => prev.map((c) => (c.code === coupon.code ? coupon : c)));
  };

  const deleteCoupon = (code: string) => {
    setCoupons((prev) => prev.filter((c) => c.code !== code));
    logAuditAction('Deleted Coupon', `Removed voucher ${code}`);
  };

  const validateCoupon = (
    code: string,
    cartTotal: number
  ): { valid: boolean; discount: number; message: string } => {
    const found = coupons.find(
      (c) => c.code.toUpperCase() === code.trim().toUpperCase() && c.active
    );
    if (!found) {
      return { valid: false, discount: 0, message: 'Invalid or inactive privilege code.' };
    }
    if (cartTotal < found.minCartValue) {
      return {
        valid: false,
        discount: 0,
        message: `Minimum order value of ₹${found.minCartValue.toLocaleString('en-IN')} required.`,
      };
    }
    let discount = 0;
    if (found.type === 'percentage') {
      discount = Math.round((cartTotal * found.value) / 100);
      if (found.maxDiscount && discount > found.maxDiscount) {
        discount = found.maxDiscount;
      }
    } else {
      discount = found.value;
    }
    return {
      valid: true,
      discount: Math.min(cartTotal, discount),
      message: `${found.value}${found.type === 'percentage' ? '%' : '₹'} Privilege Discount Applied`,
    };
  };

  // Gift Card Operations
  const addGiftCard = (gc: GiftCard) => {
    setGiftCards((prev) => [gc, ...prev]);
    logAuditAction('Issued Gift Card', `Generated gift card ${gc.code} for ${gc.recipientName}`);
  };

  const redeemGiftCard = (
    code: string,
    amount: number
  ): { valid: boolean; appliedAmount: number; message: string } => {
    const card = giftCards.find(
      (g) => g.code.toUpperCase() === code.trim().toUpperCase() && g.status === 'Active'
    );
    if (!card) {
      return { valid: false, appliedAmount: 0, message: 'Invalid or expired Gift Card code.' };
    }
    const appliedAmount = Math.min(card.currentBalance, amount);
    return {
      valid: true,
      appliedAmount,
      message: `Gift card applied. ₹${appliedAmount.toLocaleString('en-IN')} deducted from total.`,
    };
  };

  // Content Operations
  const updateHomepageConfig = (newConfig: Partial<HomepageContentConfig>) => {
    setHomepageConfig((prev) => ({ ...prev, ...newConfig }));
    logAuditAction('Homepage Updated', 'Modified boutique hero or section presentation');
  };

  const addBanner = (banner: Banner) => {
    setBanners((prev) => [banner, ...prev]);
  };

  const toggleBanner = (id: string) => {
    setBanners((prev) =>
      prev.map((b) => (b.id === id ? { ...b, active: !b.active } : b))
    );
  };

  // Settings & Notifications
  const updateSettings = (newSettings: Partial<StoreSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
    logAuditAction('Store Settings Updated', 'Modified configuration, shipping, or taxes');
  };

  const markNotificationRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        orders,
        customers,
        collections,
        coupons,
        giftCards,
        homepageConfig,
        banners,
        notifications,
        auditLog,
        settings,
        adminUser,
        isAdminAuthenticated,
        loginAdmin,
        logoutAdmin,
        addProduct,
        updateProduct,
        deleteProduct,
        updateStock,
        placeCustomerOrder,
        updateOrderStatus,
        updateOrderTracking,
        approveReview,
        rejectReview,
        deleteReview,
        submitCustomerReview,
        addCollection,
        updateCollection,
        deleteCollection,
        addCoupon,
        updateCoupon,
        deleteCoupon,
        validateCoupon,
        addGiftCard,
        redeemGiftCard,
        updateHomepageConfig,
        addBanner,
        toggleBanner,
        updateSettings,
        markNotificationRead,
        markAllNotificationsRead,
        logAuditAction,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = (): StoreContextType => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
