import React, { useState, useEffect } from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { PRODUCTS } from './data/products';
import {
  Product,
  CartItem,
  ProductSize,
  PageRoute,
  Order,
} from './types';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { TrustBar } from './components/TrustBar';
import { Bestsellers } from './components/Bestsellers';
import { CollectionFeature } from './components/CollectionFeature';
import { ScentFinder } from './components/ScentFinder';
import { FragranceNotes } from './components/FragranceNotes';
import { GiftingSection } from './components/GiftingSection';
import { BrandStoryPreview } from './components/BrandStoryPreview';
import { LuxuryQuote } from './components/LuxuryQuote';
import { Newsletter } from './components/Newsletter';
import { Footer } from './components/Footer';

// Part 2 Components
import { ShopPage } from './components/ShopPage';
import { ProductDetailPage } from './components/ProductDetailPage';
import { CartPage } from './components/CartPage';
import { CheckoutPage } from './components/CheckoutPage';
import { OrderConfirmationPage } from './components/OrderConfirmationPage';
import { TrackOrderPage } from './components/TrackOrderPage';
import { WishlistPage } from './components/WishlistPage';
import { AccountPage } from './components/AccountPage';
import { CartDrawer } from './components/CartDrawer';
import { QuickAddModal } from './components/QuickAddModal';
import { SearchModal } from './components/SearchModal';
import { StoryModal } from './components/StoryModal';
import { CustomerCareModal } from './components/CustomerCareModal';
import { ToastContainer, ToastItem } from './components/Toast';

// Part 3 Admin Components
import { AdminLogin } from './components/admin/AdminLogin';
import { AdminConsole } from './components/admin/AdminConsole';

function AppContent() {
  const { products, orders, placeCustomerOrder } = useStore();

  // Navigation Route State
  const [currentPage, setCurrentPage] = useState<PageRoute>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product>(products[0] || PRODUCTS[0]);
  const [trackOrderIdParam, setTrackOrderIdParam] = useState<string>('MK-2026-8924');

  // Initial cart with Oody Raspberry (100ml)
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      product: products[0] || PRODUCTS[0],
      quantity: 1,
      size: '100ml',
      unitPrice: 4999,
    },
  ]);

  // Initial Wishlist
  const [wishlistIds, setWishlistIds] = useState<string[]>(['santal-blanc']);

  // Recently viewed
  const [recentlyViewed, setRecentlyViewed] = useState<Product[]>([
    products[1] || PRODUCTS[1],
    products[2] || PRODUCTS[2],
  ]);

  const [activePlacedOrder, setActivePlacedOrder] = useState<Order | null>(orders[0] || null);

  // Modals & Drawers state
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isScentFinderOpen, setIsScentFinderOpen] = useState(false);
  const [isStoryModalOpen, setIsStoryModalOpen] = useState(false);
  const [quickAddProduct, setQuickAddProduct] = useState<Product | null>(null);
  const [customerCareTopic, setCustomerCareTopic] = useState<string | null>(null);

  // Toast Notification System (Section 35)
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const addToast = (message: string, type: ToastItem['type'] = 'info') => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3200);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Synchronize URL hash with page state for clean history and deep linking
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '').trim();
      if (!hash || hash === 'home') {
        setCurrentPage('home');
      } else if (hash === 'shop') {
        setCurrentPage('shop');
      } else if (hash.startsWith('product/')) {
        const slug = hash.replace('product/', '');
        const p = products.find((prod) => prod.slug === slug || prod.id === slug) || PRODUCTS.find((prod) => prod.slug === slug || prod.id === slug);
        if (p) {
          setSelectedProduct(p);
          setCurrentPage('product');
        }
      } else if (hash === 'cart') {
        setCurrentPage('cart');
      } else if (hash === 'checkout') {
        setCurrentPage('checkout');
      } else if (hash === 'order-confirmed') {
        setCurrentPage('order-confirmed');
      } else if (hash.startsWith('track-order')) {
        setCurrentPage('track-order');
      } else if (hash === 'wishlist') {
        setCurrentPage('wishlist');
      } else if (hash === 'account') {
        setCurrentPage('account');
      } else if (hash === 'admin/login') {
        setCurrentPage('admin/login');
      } else if (hash === 'admin' || hash === 'admin/dashboard') {
        setCurrentPage('admin/dashboard');
      } else if (hash.startsWith('admin/')) {
        setCurrentPage(hash as PageRoute);
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, [products]);

  // Set document title dynamically for SEO
  useEffect(() => {
    if (currentPage.startsWith('admin')) {
      document.title = 'Atelier Operations Console — MAISON KIYORA';
      return;
    }

    switch (currentPage) {
      case 'shop':
        document.title = 'The Collection — MAISON KIYORA';
        break;
      case 'product':
        document.title = `${selectedProduct.name} — MAISON KIYORA`;
        break;
      case 'cart':
        document.title = 'Your Bag — MAISON KIYORA';
        break;
      case 'checkout':
        document.title = 'Secure Checkout — MAISON KIYORA';
        break;
      case 'order-confirmed':
        document.title = 'Order Confirmed — MAISON KIYORA';
        break;
      case 'track-order':
        document.title = 'Track Order — MAISON KIYORA';
        break;
      case 'wishlist':
        document.title = 'Your Wishlist — MAISON KIYORA';
        break;
      case 'account':
        document.title = 'My Account — MAISON KIYORA';
        break;
      default:
        document.title = 'MAISON KIYORA — Haute Parfumerie';
    }
  }, [currentPage, selectedProduct]);

  // Navigate helper with smooth scroll-to-top
  const navigateTo = (page: PageRoute, hash?: string) => {
    setCurrentPage(page);
    window.location.hash = hash || page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Product Selection handler
  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    setRecentlyViewed((prev) => {
      const filtered = prev.filter((p) => p.id !== product.id);
      return [product, ...filtered].slice(0, 6);
    });
    navigateTo('product', `product/${product.slug}`);
  };

  // Cart operations
  const handleAddToBag = (
    product: Product,
    size: ProductSize = '100ml',
    quantity: number = 1
  ) => {
    const variant = product.variants.find((v) => v.size === size);
    const unitPrice = variant ? variant.price : product.price;

    setCartItems((prev) => {
      const existing = prev.find(
        (item) => item.product.id === product.id && item.size === size
      );
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id && item.size === size
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity, size, unitPrice }];
    });

    addToast(`Added ${product.name} (${size}) to Bag`, 'bag');
  };

  const handleUpdateQuantity = (productId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveFromCart = (productId: string) => {
    const item = cartItems.find((i) => i.product.id === productId);
    setCartItems((prev) => prev.filter((i) => i.product.id !== productId));
    if (item) {
      addToast(`Removed ${item.product.name} from Bag`, 'remove');
    }
  };

  // Wishlist operations
  const handleToggleWishlist = (product: Product) => {
    setWishlistIds((prev) => {
      if (prev.includes(product.id)) {
        addToast(`Removed ${product.name} from Wishlist`, 'wishlist');
        return prev.filter((id) => id !== product.id);
      } else {
        addToast(`Saved ${product.name} to Wishlist`, 'wishlist');
        return [...prev, product.id];
      }
    });
  };

  // Order placement handler connected to StoreContext
  const handleOrderPlaced = (newOrder: Order) => {
    placeCustomerOrder(newOrder);
    setActivePlacedOrder(newOrder);
    setCartItems([]);
    navigateTo('order-confirmed');
  };

  const handleTrackOrderFromId = (orderId: string) => {
    setTrackOrderIdParam(orderId);
    navigateTo('track-order', `track-order?id=${orderId}`);
  };

  const totalCartCount = cartItems.reduce((acc, i) => acc + i.quantity, 0);
  const isAdminPage = currentPage.startsWith('admin');

  return (
    <div className="min-h-screen bg-[#F5F0E8] text-[#211C19] selection:bg-[#B69A69]/30 relative font-sans">
      {/* 35. Glass Toast Notifications Container */}
      <ToastContainer toasts={toasts} onDismiss={removeToast} />

      {/* Floating Transparent Navigation Header (hidden on checkout and admin pages) */}
      {!isAdminPage && currentPage !== 'checkout' && (
        <Header
          onNavigateHome={() => navigateTo('home')}
          onNavigateShop={() => navigateTo('shop')}
          onOpenSearch={() => setIsSearchOpen(true)}
          onOpenBag={() => setIsCartDrawerOpen(true)}
          onOpenWishlist={() => navigateTo('wishlist')}
          onOpenScentFinder={() => setIsScentFinderOpen(true)}
          onOpenStory={() => setIsStoryModalOpen(true)}
          onOpenAccount={() => navigateTo('account')}
          onNavigateTrackOrder={() => navigateTo('track-order')}
          cartCount={totalCartCount}
          wishlistCount={wishlistIds.length}
        />
      )}

      {/* Main Page Content Router */}
      <main>
        {/* ============================================================== */}
        {/* PART 3: ADMIN SYSTEM */}
        {/* ============================================================== */}
        {currentPage === 'admin/login' && (
          <AdminLogin
            onLoginSuccess={() => navigateTo('admin/dashboard', 'admin/dashboard')}
            onNavigateStore={() => navigateTo('home')}
          />
        )}

        {isAdminPage && currentPage !== 'admin/login' && (
          <AdminConsole
            initialTab={currentPage.replace('admin/', '') || 'dashboard'}
            onNavigateStore={() => navigateTo('home')}
            onUpdateHash={(hash) => navigateTo(hash as PageRoute, hash)}
          />
        )}

        {/* ============================================================== */}
        {/* 1. HOME PAGE */}
        {/* ============================================================== */}
        {currentPage === 'home' && (
          <>
            <Hero
              onDiscover={() => navigateTo('shop')}
              onOurStory={() => setIsStoryModalOpen(true)}
              onExploreProduct={(id) => {
                const p = products.find((prod) => prod.id === id) || PRODUCTS.find((prod) => prod.id === id);
                if (p) handleSelectProduct(p);
              }}
            />

            <TrustBar />

            <Bestsellers
              products={products}
              wishlistIds={wishlistIds}
              onToggleWishlist={handleToggleWishlist}
              onQuickAdd={(p) => setQuickAddProduct(p)}
              onSelectProduct={handleSelectProduct}
              onViewAll={() => navigateTo('shop')}
            />

            <CollectionFeature
              products={products}
              onShopCollection={() => navigateTo('shop')}
              onSelectProduct={handleSelectProduct}
              onAddToBag={(p) => handleAddToBag(p, '100ml', 1)}
            />

            <ScentFinder
              products={products}
              isOpen={isScentFinderOpen}
              onClose={() => setIsScentFinderOpen(false)}
              onOpen={() => setIsScentFinderOpen(true)}
              onAddToBag={(p) => handleAddToBag(p, '100ml', 1)}
              onViewProduct={handleSelectProduct}
            />

            <FragranceNotes />

            <GiftingSection
              onAddGiftWrapToCart={() => {
                addToast('Artisanal Gift Box & Calligraphy added to order', 'promo');
              }}
            />

            <BrandStoryPreview onOpenStory={() => setIsStoryModalOpen(true)} />

            <LuxuryQuote />

            <Newsletter />
          </>
        )}

        {/* ============================================================== */}
        {/* 2. DEDICATED SHOP PAGE */}
        {/* ============================================================== */}
        {currentPage === 'shop' && (
          <ShopPage
            products={products}
            wishlistIds={wishlistIds}
            onToggleWishlist={handleToggleWishlist}
            onQuickAdd={(p) => setQuickAddProduct(p)}
            onSelectProduct={handleSelectProduct}
            onNavigateHome={() => navigateTo('home')}
          />
        )}

        {/* ============================================================== */}
        {/* 3. DEDICATED PRODUCT DETAIL PAGE */}
        {/* ============================================================== */}
        {currentPage === 'product' && (
          <ProductDetailPage
            product={selectedProduct}
            allProducts={products}
            recentlyViewed={recentlyViewed.filter((p) => p.id !== selectedProduct.id)}
            wishlistIds={wishlistIds}
            onToggleWishlist={handleToggleWishlist}
            onAddToBag={handleAddToBag}
            onSelectProduct={handleSelectProduct}
            onNavigateShop={() => navigateTo('shop')}
            onNavigateHome={() => navigateTo('home')}
          />
        )}

        {/* ============================================================== */}
        {/* 4. DEDICATED FULL CART PAGE */}
        {/* ============================================================== */}
        {currentPage === 'cart' && (
          <CartPage
            items={cartItems}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveFromCart}
            onProceedToCheckout={() => navigateTo('checkout')}
            onContinueShopping={() => navigateTo('shop')}
          />
        )}

        {/* ============================================================== */}
        {/* 5. STREAMLINED CHECKOUT PAGE */}
        {/* ============================================================== */}
        {currentPage === 'checkout' && (
          <CheckoutPage
            items={cartItems}
            appliedPromo="KIYORA10"
            onOrderPlaced={handleOrderPlaced}
            onReturnToCart={() => navigateTo('cart')}
            onNavigateHome={() => navigateTo('home')}
          />
        )}

        {/* ============================================================== */}
        {/* 6. ORDER CONFIRMATION PAGE */}
        {/* ============================================================== */}
        {currentPage === 'order-confirmed' && (
          <OrderConfirmationPage
            order={activePlacedOrder}
            onTrackOrder={handleTrackOrderFromId}
            onContinueShopping={() => navigateTo('shop')}
          />
        )}

        {/* ============================================================== */}
        {/* 7. ORDER TRACKING PAGE */}
        {/* ============================================================== */}
        {currentPage === 'track-order' && (
          <TrackOrderPage
            orders={orders}
            initialOrderId={trackOrderIdParam}
            onContinueShopping={() => navigateTo('shop')}
          />
        )}

        {/* ============================================================== */}
        {/* 8. DEDICATED WISHLIST PAGE */}
        {/* ============================================================== */}
        {currentPage === 'wishlist' && (
          <WishlistPage
            products={products}
            wishlistIds={wishlistIds}
            onRemoveFromWishlist={handleToggleWishlist}
            onAddToBag={(p) => handleAddToBag(p, '100ml', 1)}
            onSelectProduct={handleSelectProduct}
            onExploreCollection={() => navigateTo('shop')}
            onNavigateHome={() => navigateTo('home')}
          />
        )}

        {/* ============================================================== */}
        {/* 9. CUSTOMER ACCOUNT & DASHBOARD */}
        {/* ============================================================== */}
        {currentPage === 'account' && (
          <AccountPage
            orders={orders}
            wishlistProducts={products.filter((p) => wishlistIds.includes(p.id))}
            onTrackOrder={handleTrackOrderFromId}
            onExploreCollection={() => navigateTo('shop')}
            onNavigateHome={() => navigateTo('home')}
            onSelectProduct={handleSelectProduct}
          />
        )}
      </main>

      {/* Dark Espresso Footer (hidden on checkout and admin for distraction-free flow) */}
      {!isAdminPage && currentPage !== 'checkout' && (
        <Footer
          onNavigateHome={() => navigateTo('home')}
          onNavigateShop={() => navigateTo('shop')}
          onNavigateWishlist={() => navigateTo('wishlist')}
          onNavigateAccount={() => navigateTo('account')}
          onNavigateTrackOrder={() => navigateTo('track-order')}
          onOpenStory={() => setIsStoryModalOpen(true)}
          onOpenScentFinder={() => setIsScentFinderOpen(true)}
          onOpenCustomerCare={(topic) => setCustomerCareTopic(topic)}
          onNavigateAdmin={() => navigateTo('admin/dashboard', 'admin/dashboard')}
        />
      )}

      {/* 22. Translucent Right-Side Cart Drawer (hidden on admin pages) */}
      {!isAdminPage && (
        <CartDrawer
          isOpen={isCartDrawerOpen}
          onClose={() => setIsCartDrawerOpen(false)}
          items={cartItems}
          onUpdateQuantity={handleUpdateQuantity}
          onRemoveItem={handleRemoveFromCart}
          onViewCart={() => navigateTo('cart')}
          onCheckout={() => navigateTo('checkout')}
          freeShippingThreshold={6000}
        />
      )}

      {/* 5. Quick Add Glass Modal */}
      {!isAdminPage && (
        <QuickAddModal
          product={quickAddProduct}
          isOpen={!!quickAddProduct}
          onClose={() => setQuickAddProduct(null)}
          onAddToBag={handleAddToBag}
        />
      )}

      {/* Global Search Modal */}
      {!isAdminPage && (
        <SearchModal
          isOpen={isSearchOpen}
          onClose={() => setIsSearchOpen(false)}
          products={products}
          onSelectProduct={handleSelectProduct}
        />
      )}

      {/* Brand Story Dialog Modal */}
      {!isAdminPage && (
        <StoryModal
          isOpen={isStoryModalOpen}
          onClose={() => setIsStoryModalOpen(false)}
          onShop={() => navigateTo('shop')}
        />
      )}

      {/* Customer Care Modal (Shipping, Returns, FAQ, Privacy, Terms, Contact) */}
      {!isAdminPage && (
        <CustomerCareModal
          isOpen={!!customerCareTopic}
          topic={customerCareTopic || ''}
          onClose={() => setCustomerCareTopic(null)}
        />
      )}
    </div>
  );
}

export default function App() {
  return (
    <StoreProvider>
      <AppContent />
    </StoreProvider>
  );
}
