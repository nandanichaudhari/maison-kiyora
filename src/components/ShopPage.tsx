import React, { useState, useMemo } from 'react';
import { Product, ProductCategory, OlfactoryFamily, ProductSize } from '../types';
import { ProductCard } from './ProductCard';
import { SlidersHorizontal, X, ChevronDown, Check } from 'lucide-react';

interface ShopPageProps {
  products: Product[];
  wishlistIds: string[];
  onToggleWishlist: (product: Product) => void;
  onQuickAdd: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
  onNavigateHome: () => void;
}

type SortOption = 'featured' | 'newest' | 'price-asc' | 'price-desc' | 'rating';

export const ShopPage: React.FC<ShopPageProps> = ({
  products,
  wishlistIds,
  onToggleWishlist,
  onQuickAdd,
  onSelectProduct,
  onNavigateHome,
}) => {
  // Filter States
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedFamilies, setSelectedFamilies] = useState<OlfactoryFamily[]>([]);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<ProductSize[]>([]);
  const [selectedAvailability, setSelectedAvailability] = useState<string>('all');
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Available filter options
  const categories: (ProductCategory | 'All')[] = ['All', 'Perfume', 'Discovery Set', 'Gift Set'];
  const families: OlfactoryFamily[] = [
    'Woody',
    'Floral',
    'Citrus',
    'Fruity',
    'Fresh',
    'Spicy',
    'Oriental',
  ];
  const priceRanges = [
    { label: 'Under ₹2,999', id: 'under-3000' },
    { label: '₹3,000–₹4,999', id: '3000-4999' },
    { label: '₹5,000+', id: '5000-plus' },
  ];
  const sizes: ProductSize[] = ['30ml', '50ml', '100ml'];

  const toggleFamily = (fam: OlfactoryFamily) => {
    setSelectedFamilies((prev) =>
      prev.includes(fam) ? prev.filter((f) => f !== fam) : [...prev, fam]
    );
  };

  const togglePriceRange = (rangeId: string) => {
    setSelectedPriceRanges((prev) =>
      prev.includes(rangeId) ? prev.filter((r) => r !== rangeId) : [...prev, rangeId]
    );
  };

  const toggleSize = (size: ProductSize) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const clearAllFilters = () => {
    setSelectedCategory('All');
    setSelectedFamilies([]);
    setSelectedPriceRanges([]);
    setSelectedSizes([]);
    setSelectedAvailability('all');
  };

  const hasActiveFilters =
    selectedCategory !== 'All' ||
    selectedFamilies.length > 0 ||
    selectedPriceRanges.length > 0 ||
    selectedSizes.length > 0 ||
    selectedAvailability !== 'all';

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Category
      if (selectedCategory !== 'All' && p.category !== selectedCategory) {
        return false;
      }
      // Fragrance family
      if (selectedFamilies.length > 0 && !selectedFamilies.includes(p.family)) {
        return false;
      }
      // Price range
      if (selectedPriceRanges.length > 0) {
        const matchesPrice = selectedPriceRanges.some((range) => {
          if (range === 'under-3000') return p.price < 3000;
          if (range === '3000-4999') return p.price >= 3000 && p.price <= 4999;
          if (range === '5000-plus') return p.price >= 5000;
          return false;
        });
        if (!matchesPrice) return false;
      }
      // Size
      if (selectedSizes.length > 0) {
        const hasSize = p.variants.some((v) => selectedSizes.includes(v.size));
        if (!hasSize) return false;
      }
      // Availability
      if (selectedAvailability === 'in-stock' && !p.inStock) return false;
      if (selectedAvailability === 'out-of-stock' && p.inStock) return false;

      return true;
    });
  }, [
    products,
    selectedCategory,
    selectedFamilies,
    selectedPriceRanges,
    selectedSizes,
    selectedAvailability,
  ]);

  const sortedProducts = useMemo(() => {
    const list = [...filteredProducts];
    switch (sortBy) {
      case 'newest':
        return list.sort((a, b) => (b.badge === 'NEW' ? 1 : 0) - (a.badge === 'NEW' ? 1 : 0));
      case 'price-asc':
        return list.sort((a, b) => a.price - b.price);
      case 'price-desc':
        return list.sort((a, b) => b.price - a.price);
      case 'rating':
        return list.sort((a, b) => b.rating - a.rating);
      default:
        // Featured: bestsellers first
        return list.sort((a, b) => (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0));
    }
  }, [filteredProducts, sortBy]);

  // Filter Sidebar Content (shared between desktop and mobile)
  const FilterPanel = () => (
    <div className="space-y-7 text-xs font-sans text-[#211C19]">
      {/* Category */}
      <div>
        <h4 className="text-[11px] font-sans font-semibold tracking-[0.2em] uppercase text-[#8C8175] mb-3">
          CATEGORY
        </h4>
        <div className="space-y-2">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`block w-full text-left py-1 transition-colors cursor-pointer ${
                selectedCategory === cat
                  ? 'text-[#211C19] font-medium'
                  : 'text-[#8C8175] hover:text-[#211C19]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="h-[1px] bg-[#D8C9B5]/40" />

      {/* Fragrance Family */}
      <div>
        <h4 className="text-[11px] font-sans font-semibold tracking-[0.2em] uppercase text-[#8C8175] mb-3">
          FRAGRANCE FAMILY
        </h4>
        <div className="space-y-2">
          {families.map((fam) => {
            const isChecked = selectedFamilies.includes(fam);
            return (
              <label
                key={fam}
                className="flex items-center gap-2.5 cursor-pointer text-[#312A26] hover:text-[#211C19]"
              >
                <div
                  className={`w-3.5 h-3.5 rounded-2xs border flex items-center justify-center transition-colors ${
                    isChecked
                      ? 'bg-[#211C19] border-[#211C19] text-[#F5F0E8]'
                      : 'border-[#D8C9B5] bg-white/60'
                  }`}
                >
                  {isChecked && <Check size={10} strokeWidth={3} />}
                </div>
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={isChecked}
                  onChange={() => toggleFamily(fam)}
                />
                <span className="text-xs">{fam}</span>
              </label>
            );
          })}
        </div>
      </div>

      <div className="h-[1px] bg-[#D8C9B5]/40" />

      {/* Price */}
      <div>
        <h4 className="text-[11px] font-sans font-semibold tracking-[0.2em] uppercase text-[#8C8175] mb-3">
          PRICE
        </h4>
        <div className="space-y-2">
          {priceRanges.map((range) => {
            const isChecked = selectedPriceRanges.includes(range.id);
            return (
              <label
                key={range.id}
                className="flex items-center gap-2.5 cursor-pointer text-[#312A26] hover:text-[#211C19]"
              >
                <div
                  className={`w-3.5 h-3.5 rounded-2xs border flex items-center justify-center transition-colors ${
                    isChecked
                      ? 'bg-[#211C19] border-[#211C19] text-[#F5F0E8]'
                      : 'border-[#D8C9B5] bg-white/60'
                  }`}
                >
                  {isChecked && <Check size={10} strokeWidth={3} />}
                </div>
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={isChecked}
                  onChange={() => togglePriceRange(range.id)}
                />
                <span className="text-xs">{range.label}</span>
              </label>
            );
          })}
        </div>
      </div>

      <div className="h-[1px] bg-[#D8C9B5]/40" />

      {/* Size */}
      <div>
        <h4 className="text-[11px] font-sans font-semibold tracking-[0.2em] uppercase text-[#8C8175] mb-3">
          SIZE
        </h4>
        <div className="flex flex-wrap gap-2">
          {sizes.map((sz) => {
            const isSelected = selectedSizes.includes(sz);
            return (
              <button
                key={sz}
                type="button"
                onClick={() => toggleSize(sz)}
                className={`px-3 py-1 text-xs uppercase tracking-wider rounded-xs border transition-colors cursor-pointer ${
                  isSelected
                    ? 'bg-[#211C19] text-[#F5F0E8] border-[#211C19]'
                    : 'bg-white/50 text-[#312A26] border-[#D8C9B5] hover:border-[#211C19]'
                }`}
              >
                {sz}
              </button>
            );
          })}
        </div>
      </div>

      <div className="h-[1px] bg-[#D8C9B5]/40" />

      {/* Availability */}
      <div>
        <h4 className="text-[11px] font-sans font-semibold tracking-[0.2em] uppercase text-[#8C8175] mb-3">
          AVAILABILITY
        </h4>
        <div className="space-y-2">
          {[
            { id: 'all', label: 'All Items' },
            { id: 'in-stock', label: 'In Stock' },
            { id: 'out-of-stock', label: 'Out of Stock' },
          ].map((item) => (
            <label
              key={item.id}
              className="flex items-center gap-2.5 cursor-pointer text-[#312A26] hover:text-[#211C19]"
            >
              <input
                type="radio"
                name="availability"
                checked={selectedAvailability === item.id}
                onChange={() => setSelectedAvailability(item.id)}
                className="accent-[#211C19]"
              />
              <span className="text-xs">{item.label}</span>
            </label>
          ))}
        </div>
      </div>

      {hasActiveFilters && (
        <button
          type="button"
          onClick={clearAllFilters}
          className="text-xs font-sans text-[#942b41] hover:underline pt-2 cursor-pointer block"
        >
          Reset All Filters
        </button>
      )}
    </div>
  );

  return (
    <div className="pt-28 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-in fade-in duration-300">
      {/* 1. Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs font-sans tracking-[0.16em] uppercase text-[#8C8175] mb-4">
        <button
          type="button"
          onClick={onNavigateHome}
          className="hover:text-[#211C19] transition-colors cursor-pointer"
        >
          HOME
        </button>
        <span>/</span>
        <span className="text-[#211C19] font-medium">SHOP</span>
      </nav>

      {/* Top Heading Section */}
      <div className="mb-10 pb-6 border-b border-[#D8C9B5]/40">
        <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal text-[#211C19] tracking-tight mb-2">
          THE COLLECTION
        </h1>
        <p className="text-sm sm:text-base text-[#8C8175] font-light max-w-md">
          Discover Maison Kiyora fragrances.
        </p>
      </div>

      {/* Action Bar (Filter button on mobile, product count, sort dropdown) */}
      <div className="flex items-center justify-between gap-4 pb-6 mb-8 border-b border-[#D8C9B5]/30">
        <div className="flex items-center gap-4">
          {/* Mobile Filter Toggle */}
          <button
            type="button"
            onClick={() => setMobileFiltersOpen(true)}
            className="lg:hidden flex items-center gap-2 px-3 py-2 text-xs font-sans uppercase tracking-widest bg-white border border-[#D8C9B5] rounded-xs text-[#211C19]"
          >
            <SlidersHorizontal size={14} />
            <span>Filters</span>
            {hasActiveFilters && (
              <span className="w-1.5 h-1.5 rounded-full bg-[#B69A69]" />
            )}
          </button>

          <span className="text-xs font-sans text-[#8C8175] tabular-nums">
            Showing {sortedProducts.length} {sortedProducts.length === 1 ? 'creation' : 'creations'}
          </span>
        </div>

        {/* Sort By Dropdown */}
        <div className="flex items-center gap-2 text-xs font-sans">
          <span className="hidden sm:inline uppercase tracking-widest text-[#8C8175]">
            SORT BY:
          </span>
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="appearance-none bg-white/70 backdrop-blur-sm border border-[#D8C9B5] hover:border-[#211C19] text-[#211C19] text-xs font-sans py-2 pl-3 pr-8 rounded-xs cursor-pointer focus:outline-hidden"
            >
              <option value="featured">Featured</option>
              <option value="newest">Newest</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Customer Rating</option>
            </select>
            <ChevronDown
              size={14}
              className="absolute right-2.5 top-1/2 transform -translate-y-1/2 pointer-events-none text-[#8C8175]"
            />
          </div>
        </div>
      </div>

      {/* Main Layout: Desktop Sidebar Filters + Product Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Left Desktop Compact Filter Panel */}
        <aside className="hidden lg:block lg:col-span-3 pr-4 border-r border-[#D8C9B5]/40">
          <FilterPanel />
        </aside>

        {/* Right Product Grid */}
        <main className="lg:col-span-9">
          {sortedProducts.length === 0 ? (
            <div className="py-24 text-center flex flex-col items-center">
              <h3 className="font-serif text-2xl text-[#211C19] mb-2">
                No matching creations
              </h3>
              <p className="text-xs text-[#8C8175] font-light max-w-sm mb-6">
                Try adjusting your filters or price range to explore other Maison Kiyora fragrances.
              </p>
              <button
                type="button"
                onClick={clearAllFilters}
                className="btn-luxury-outline text-xs py-2.5 px-6 cursor-pointer"
              >
                RESET ALL FILTERS
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {sortedProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  isWishlisted={wishlistIds.includes(product.id)}
                  onToggleWishlist={onToggleWishlist}
                  onQuickAdd={onQuickAdd}
                  onSelectProduct={onSelectProduct}
                />
              ))}
            </div>
          )}
        </main>
      </div>

      {/* Mobile Filters Slide-Out Drawer */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden bg-[#211C19]/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="absolute inset-y-0 right-0 w-4/5 max-w-xs bg-[#F5F0E8] p-6 overflow-y-auto shadow-2xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[#D8C9B5]/50 mb-6">
                <span className="font-serif text-lg text-[#211C19]">Filters</span>
                <button
                  type="button"
                  onClick={() => setMobileFiltersOpen(false)}
                  className="p-1 text-[#8C8175] hover:text-[#211C19]"
                >
                  <X size={20} />
                </button>
              </div>

              <FilterPanel />
            </div>

            <div className="pt-6 border-t border-[#D8C9B5]/50 mt-6">
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(false)}
                className="w-full btn-luxury-primary text-xs py-3"
              >
                SHOW {sortedProducts.length} CREATIONS
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
