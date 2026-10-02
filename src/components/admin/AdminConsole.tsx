import React, { useState, useEffect } from 'react';
import { useStore } from '../../context/StoreContext';
import { AdminLayout } from './AdminLayout';
import { AdminDashboard } from './AdminDashboard';
import { AdminOrders } from './AdminOrders';
import { AdminProducts } from './AdminProducts';
import { AdminCollections } from './AdminCollections';
import { AdminInventory } from './AdminInventory';
import { AdminCustomers } from './AdminCustomers';
import { AdminReviews } from './AdminReviews';
import { AdminCoupons } from './AdminCoupons';
import { AdminGiftCards } from './AdminGiftCards';
import { AdminContent } from './AdminContent';
import { AdminAnalytics } from './AdminAnalytics';
import { AdminSettings } from './AdminSettings';

interface AdminConsoleProps {
  initialTab?: string;
  onNavigateStore: () => void;
  onUpdateHash?: (newHash: string) => void;
}

export const AdminConsole: React.FC<AdminConsoleProps> = ({
  initialTab = 'dashboard',
  onNavigateStore,
  onUpdateHash,
}) => {
  const [currentTab, setCurrentTab] = useState<string>(initialTab);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);

  useEffect(() => {
    if (initialTab) {
      setCurrentTab(initialTab);
    }
  }, [initialTab]);

  const handleSelectTab = (tab: string) => {
    setCurrentTab(tab);
    onUpdateHash?.(`admin/${tab}`);
  };

  const handleSelectOrderFromAnywhere = (orderId: string) => {
    setSelectedOrderId(orderId);
    setCurrentTab('orders');
    onUpdateHash?.('admin/orders');
  };

  const handleOpenProductEditor = (productId?: string) => {
    setSelectedProductId(productId || null);
    setCurrentTab('products');
    onUpdateHash?.('admin/products');
  };

  return (
    <AdminLayout
      currentTab={currentTab}
      onSelectTab={handleSelectTab}
      onNavigateStore={onNavigateStore}
    >
      {currentTab === 'dashboard' && (
        <AdminDashboard
          onNavigateTab={handleSelectTab}
          onSelectOrder={handleSelectOrderFromAnywhere}
          onOpenProductEditor={handleOpenProductEditor}
        />
      )}

      {currentTab === 'orders' && (
        <AdminOrders
          initialSelectedOrderId={selectedOrderId}
          onClearInitialSelected={() => setSelectedOrderId(null)}
        />
      )}

      {currentTab === 'products' && (
        <AdminProducts
          initialEditProductId={selectedProductId}
          onClearInitialEdit={() => setSelectedProductId(null)}
        />
      )}

      {currentTab === 'collections' && <AdminCollections />}

      {currentTab === 'inventory' && <AdminInventory />}

      {currentTab === 'customers' && (
        <AdminCustomers onSelectOrder={handleSelectOrderFromAnywhere} />
      )}

      {currentTab === 'reviews' && <AdminReviews />}

      {currentTab === 'coupons' && <AdminCoupons />}

      {currentTab === 'gift-cards' && <AdminGiftCards />}

      {currentTab === 'content' && <AdminContent />}

      {currentTab === 'analytics' && <AdminAnalytics />}

      {currentTab === 'settings' && <AdminSettings />}
    </AdminLayout>
  );
};
