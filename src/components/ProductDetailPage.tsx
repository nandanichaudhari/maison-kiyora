import React, { useState, useRef } from 'react';
import { Product, ProductSize, ProductReview } from '../types';
import { PerfumeBottleVisual } from './PerfumeBottleVisual';
import { ProductCard } from './ProductCard';
import { calculateDeliveryDate } from '../data/products';
import {
  Heart,
  Star,
  Plus,
  Minus,
  Check,
  ChevronDown,
  Sparkles,
  ShieldCheck,
  Truck,
  RotateCcw,
  X,
  SearchCheck,
  Info,
} from 'lucide-react';

interface ProductDetailPageProps {
  product: Product;
  allProducts: Product[];
  recentlyViewed: Product[];
  wishlistIds: string[];
  onToggleWishlist: (product: Product) => void;
  onAddToBag: (product: Product, size: ProductSize, quantity: number) => void;
  onSelectProduct: (product: Product) => void;
  onNavigateShop: () => void;
  onNavigateHome: () => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  product,
  allProducts,
  recentlyViewed,
  wishlistIds,
  onToggleWishlist,
  onAddToBag,
  onSelectProduct,
  onNavigateShop,
  onNavigateHome,
}) => {
  // Selected size and variant
  const [selectedSize, setSelectedSize] = useState<ProductSize>('100ml');
  const [quantity, setQuantity] = useState<number>(1);
  const [activeGalleryView, setActiveGalleryView] = useState<'main' | 'angle' | 'packaging' | 'lifestyle'>('main');

  // Interactive Zoom
  const [isZooming, setIsZooming] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
  const galleryRef = useRef<HTMLDivElement>(null);

  // Delivery Checker State
  const [pinCode, setPinCode] = useState('');
  const [deliveryResult, setDeliveryResult] = useState<{
    checked: boolean;
    valid: boolean;
    message: string;
    estimatedDate: string;
    city: string;
  } | null>(null);

  // Accordion State
  const [expandedSection, setExpandedSection] = useState<string | null>('desc');

  // Note Modal State
  const [selectedNoteInfo, setSelectedNoteInfo] = useState<{
    name: string;
    category: string;
    description: string;
  } | null>(null);

  // Reviews state & filters
  const [selectedStarFilter, setSelectedStarFilter] = useState<number | 'all'>('all');
  const [writeReviewModalOpen, setWriteReviewModalOpen] = useState(false);
  const [reviewsList, setReviewsList] = useState<ProductReview[]>(product.reviews);
  const [newReviewAuthor, setNewReviewAuthor] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewTitle, setNewReviewTitle] = useState('');
  const [newReviewComment, setNewReviewComment] = useState('');

  const isWishlisted = wishlistIds.includes(product.id);

  // Compute pricing from variant
  const currentVariant =
    product.variants.find((v) => v.size === selectedSize) ||
    product.variants[0] || { price: product.price, inStock: product.inStock };
  const currentPrice = currentVariant.price;
  const currentCompareAt = currentVariant.compareAtPrice || product.compareAtPrice;

  // Zoom mouse move handler
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!galleryRef.current) return;
    const { left, top, width, height } = galleryRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(100, ((e.clientX - left) / width) * 100));
    const y = Math.max(0, Math.min(100, ((e.clientY - top) / height) * 100));
    setZoomPos({ x, y });
  };

  // Delivery check handler
  const handleCheckDelivery = (e: React.FormEvent) => {
    e.preventDefault();
    const result = calculateDeliveryDate(pinCode);
    setDeliveryResult({ checked: true, ...result });
  };

  // Submit review handler
  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewAuthor || !newReviewComment) return;

    const newRev: ProductReview = {
      id: `rev-${Date.now()}`,
      author: newReviewAuthor,
      rating: newReviewRating,
      title: newReviewTitle || 'Magnificent Experience',
      comment: newReviewComment,
      verified: true,
      date: 'Just now',
      location: 'India',
    };

    setReviewsList([newRev, ...reviewsList]);
    setWriteReviewModalOpen(false);
    setNewReviewAuthor('');
    setNewReviewTitle('');
    setNewReviewComment('');
  };

  // Filter reviews
  const filteredReviews =
    selectedStarFilter === 'all'
      ? reviewsList
      : reviewsList.filter((r) => r.rating === selectedStarFilter);

  // Related products (4 products excluding current)
  const relatedProducts = allProducts
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  // Note click dictionary
  const getNoteDescription = (noteName: string): string => {
    const lower = noteName.toLowerCase();
    if (lower.includes('raspberry')) return 'Bright, juicy and subtly sweet with vibrant morning effervescence.';
    if (lower.includes('saffron')) return 'Golden bittersweet threads providing aristocratic spice and warm radiance.';
    if (lower.includes('rose')) return 'Regal velvet petals harvested at sunrise, honeyed and deeply romantic.';
    if (lower.includes('oud')) return 'Smoky, aged resinous Cambodian heartwood with dark balsams and endless depth.';
    if (lower.includes('sandalwood')) return 'Silky, creamy Australian wood with radiant milky warmth.';
    if (lower.includes('vanilla')) return 'Dark Madagascan bourbon pod extract with warm balsamic richness.';
    if (lower.includes('orris') || lower.includes('iris')) return 'Rare Florentine root aged 3 years for peerless buttery elegance.';
    if (lower.includes('bergamot') || lower.includes('citrus')) return 'Cold-pressed Italian peel delivering sparkling sunlight and fresh zest.';
    if (lower.includes('leather')) return 'Supple burnished hide with dark birch tar and tobacco nuances.';
    if (lower.includes('cardamom')) return 'Crisp green pod spice with cooling warmth and refined complexity.';
    return 'Artisanal natural essence selected for olfactory tenacity and skin harmony.';
  };

  return (
    <div className="pt-28 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-in fade-in duration-300">
      {/* 1. Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs font-sans tracking-[0.16em] uppercase text-[#8C8175] mb-8">
        <button
          type="button"
          onClick={onNavigateHome}
          className="hover:text-[#211C19] transition-colors cursor-pointer"
        >
          HOME
        </button>
        <span>/</span>
        <button
          type="button"
          onClick={onNavigateShop}
          className="hover:text-[#211C19] transition-colors cursor-pointer"
        >
          SHOP
        </button>
        <span>/</span>
        <span className="text-[#211C19] font-medium truncate max-w-[200px] sm:max-w-none">
          {product.name}
        </span>
      </nav>

      {/* Main PDP Grid: Left Gallery + Right Information Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-24">
        {/* ============================================================== */}
        {/* LEFT: LARGE PRODUCT IMAGE GALLERY WITH ZOOM */}
        {/* ============================================================== */}
        <div className="lg:col-span-7 flex flex-col-reverse md:flex-row gap-6 sticky top-28">
          {/* Thumbnails Column */}
          <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-visible pb-2 md:pb-0 shrink-0">
            {[
              { id: 'main', label: 'Main Flacon' },
              { id: 'angle', label: 'Architectural Angle' },
              { id: 'packaging', label: 'Artisanal Box' },
              { id: 'lifestyle', label: 'Studio Setting' },
            ].map((thumb) => {
              const isActive = activeGalleryView === thumb.id;
              return (
                <button
                  key={thumb.id}
                  type="button"
                  onClick={() => setActiveGalleryView(thumb.id as any)}
                  className={`w-16 h-20 sm:w-20 sm:h-24 rounded-xs border p-1 transition-all cursor-pointer relative bg-white/60 flex flex-col items-center justify-center shrink-0 ${
                    isActive
                      ? 'border-[#211C19] ring-1 ring-[#211C19]'
                      : 'border-[#D8C9B5] hover:border-[#B69A69]'
                  }`}
                  aria-label={thumb.label}
                >
                  <PerfumeBottleVisual
                    name={product.name}
                    size="sm"
                    className="w-10 h-14"
                    interactive={false}
                  />
                  <span className="text-[8px] font-sans tracking-tight text-[#8C8175] mt-1 text-center truncate w-full px-0.5">
                    {thumb.label}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Large Main Image Display with Interactive Zoom */}
          <div
            ref={galleryRef}
            onMouseEnter={() => setIsZooming(true)}
            onMouseLeave={() => setIsZooming(false)}
            onMouseMove={handleMouseMove}
            className="flex-1 min-h-[420px] sm:min-h-[540px] bg-gradient-to-b from-white/60 via-[#F5F0E8]/70 to-[#EEE7DC]/50 rounded-xs border border-[#D8C9B5]/60 flex items-center justify-center relative overflow-hidden shadow-xs cursor-crosshair select-none"
          >
            {/* View specific rendering */}
            <div
              className={`transition-transform duration-200 w-full h-full flex items-center justify-center ${
                isZooming ? 'scale-[1.8]' : 'scale-100'
              }`}
              style={
                isZooming
                  ? {
                      transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
                    }
                  : undefined
              }
            >
              {activeGalleryView === 'packaging' ? (
                // Packaging View Composition
                <div className="relative flex flex-col items-center justify-center">
                  <div className="w-56 h-72 sm:w-64 sm:h-80 bg-[#FAF7F2] rounded-xs border border-[#B69A69] shadow-xl p-6 flex flex-col justify-between items-center text-center">
                    <span className="text-[9px] font-sans tracking-[0.25em] text-[#8C8175] uppercase">
                      HAUTE PARFUMERIE · PARIS
                    </span>
                    <div className="my-auto">
                      <p className="font-serif text-lg tracking-[0.2em] text-[#211C19] font-medium">
                        MAISON KIYORA
                      </p>
                      <div className="w-12 h-[1px] bg-[#B69A69] mx-auto my-2" />
                      <p className="font-serif text-sm tracking-widest text-[#211C19]">
                        {product.name}
                      </p>
                      <p className="text-[10px] font-sans text-[#8C8175] mt-1">
                        EXTRAIT DE PARFUM · 100 ML
                      </p>
                    </div>
                    <div className="w-8 h-8 rounded-full border border-[#B69A69]/40 flex items-center justify-center text-[#B69A69] text-xs font-serif">
                      MK
                    </div>
                  </div>
                </div>
              ) : activeGalleryView === 'lifestyle' ? (
                // Lifestyle Warm Setting
                <div className="relative flex items-center justify-center">
                  <div className="absolute inset-0 bg-radial from-[#E3D7C7] to-transparent opacity-80 blur-2xl" />
                  <PerfumeBottleVisual
                    name={product.name}
                    size="hero"
                    className="max-h-[460px]"
                    interactive={false}
                  />
                </div>
              ) : (
                // Main / Alternate Angle
                <PerfumeBottleVisual
                  name={product.name}
                  size="hero"
                  className="max-h-[460px]"
                  interactive={false}
                />
              )}
            </div>

            {/* Hover Zoom Hint */}
            <div className="absolute bottom-4 right-4 bg-white/70 backdrop-blur-md px-2.5 py-1 rounded-xs border border-[#D8C9B5]/60 text-[10px] font-sans tracking-widest text-[#8C8175] pointer-events-none uppercase flex items-center gap-1.5">
              <Sparkles size={11} className="text-[#B69A69]" />
              <span>Hover to Zoom</span>
            </div>

            {/* Badge overlay if present */}
            {product.badge && (
              <div className="absolute top-4 left-4">
                <span className="text-[10px] font-sans font-semibold tracking-[0.2em] uppercase px-2.5 py-1 rounded-xs bg-[#211C19] text-[#F5F0E8]">
                  {product.badge}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* ============================================================== */}
        {/* RIGHT: PRODUCT INFORMATION PANEL */}
        {/* ============================================================== */}
        <div className="lg:col-span-5 flex flex-col">
          {/* Classification & Scent family */}
          <div className="flex items-center gap-2 mb-2">
            <span className="w-4 h-[1px] bg-[#B69A69]" />
            <span className="text-[11px] font-sans tracking-[0.24em] uppercase text-[#8C8175] font-medium">
              {product.classification}
            </span>
          </div>

          {/* Product Name */}
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-[42px] font-normal tracking-tight text-[#211C19] leading-tight mb-3">
            {product.name}
          </h1>

          {/* Star Rating & Review Anchor */}
          <div className="flex items-center gap-3 pb-5 border-b border-[#D8C9B5]/40 mb-5">
            <div className="flex items-center text-[#B69A69]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={14} fill="currentColor" strokeWidth={0} />
              ))}
            </div>
            <a
              href="#customer-reviews"
              className="text-xs font-sans text-[#8C8175] hover:text-[#211C19] underline transition-colors"
            >
              {product.rating} ({product.reviewCount} Reviews)
            </a>
            <span className="text-[#D8C9B5]">·</span>
            <span className="text-xs font-sans text-[#3b5e39] font-medium">
              Verified Fragrance
            </span>
          </div>

          {/* Price Block */}
          <div className="mb-6">
            <div className="flex items-baseline gap-3">
              <span className="font-sans text-2xl sm:text-3xl font-medium text-[#211C19] tabular-nums tracking-tight">
                ₹{currentPrice.toLocaleString('en-IN')}
              </span>
              {currentCompareAt && currentCompareAt > currentPrice && (
                <span className="text-sm font-sans text-[#8C8175] line-through tabular-nums">
                  MRP ₹{currentCompareAt.toLocaleString('en-IN')}
                </span>
              )}
            </div>
            <p className="text-[11px] font-sans text-[#8C8175] font-light mt-1">
              Inclusive of all taxes · Complimentary express insured courier
            </p>
          </div>

          {/* Size Selector */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-[11px] font-sans tracking-[0.2em] uppercase font-semibold text-[#211C19]">
                SELECT SIZE
              </span>
              <span className="text-[11px] font-sans text-[#8C8175]">
                Extrait de Parfum 28%
              </span>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {product.variants.map((v) => {
                const isSelected = selectedSize === v.size;
                return (
                  <button
                    key={v.size}
                    type="button"
                    onClick={() => setSelectedSize(v.size)}
                    className={`py-3 px-2 rounded-xs border text-center transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#211C19] text-[#F5F0E8] border-[#211C19] shadow-sm font-medium'
                        : 'bg-white/60 text-[#211C19] border-[#D8C9B5] hover:border-[#211C19]'
                    }`}
                  >
                    <span className="block text-xs font-sans uppercase font-medium">
                      {v.size}
                    </span>
                    <span
                      className={`text-[10px] tabular-nums block mt-0.5 ${
                        isSelected ? 'text-[#D8C9B5]' : 'text-[#8C8175]'
                      }`}
                    >
                      ₹{v.price.toLocaleString('en-IN')}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Product Availability */}
          <div className="flex items-center gap-2 mb-6 text-xs font-sans">
            {currentVariant.inStock ? (
              <>
                <span className="text-[#3b5e39] font-medium flex items-center gap-1">
                  <Check size={14} strokeWidth={2.5} />
                  <span>IN STOCK</span>
                </span>
                <span className="text-[#8C8175]">· Ready to ship within 24h</span>
              </>
            ) : (
              <span className="text-[#942b41] font-medium">OUT OF STOCK</span>
            )}
          </div>

          {/* Quantity Selector + Add to Bag CTA */}
          <div className="space-y-3 mb-8">
            <div className="flex items-stretch gap-3">
              {/* Minimal Quantity Stepper */}
              <div className="flex items-center border border-[#D8C9B5] rounded-xs bg-white text-xs shrink-0">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-3 text-[#211C19] hover:bg-[#F5F0E8] cursor-pointer"
                  aria-label="Decrease quantity"
                >
                  <Minus size={13} />
                </button>
                <span className="px-3 font-sans font-medium text-[#211C19] tabular-nums">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-3 text-[#211C19] hover:bg-[#F5F0E8] cursor-pointer"
                  aria-label="Increase quantity"
                >
                  <Plus size={13} />
                </button>
              </div>

              {/* Add to Bag Primary CTA */}
              <button
                type="button"
                onClick={() => onAddToBag(product, selectedSize, quantity)}
                className="flex-1 btn-luxury-primary text-xs py-3.5 tracking-[0.2em] cursor-pointer"
              >
                ADD TO BAG · ₹{(currentPrice * quantity).toLocaleString('en-IN')}
              </button>
            </div>

            {/* Add to Wishlist Secondary Action */}
            <button
              type="button"
              onClick={() => onToggleWishlist(product)}
              className="w-full py-3 text-xs font-sans tracking-[0.2em] uppercase border border-[#D8C9B5] hover:border-[#211C19] bg-transparent text-[#211C19] rounded-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <Heart
                size={14}
                fill={isWishlisted ? 'currentColor' : 'none'}
                strokeWidth={1.75}
                className={isWishlisted ? 'text-[#942b41]' : 'text-[#211C19]'}
              />
              <span>{isWishlisted ? 'IN YOUR WISHLIST' : 'ADD TO WISHLIST'}</span>
            </button>
          </div>

          {/* Delivery Checker */}
          <div className="p-4 rounded-xs bg-white/50 border border-[#D8C9B5]/50 mb-8">
            <span className="text-[11px] font-sans font-semibold tracking-[0.2em] uppercase text-[#211C19] block mb-2">
              CHECK DELIVERY
            </span>
            <form onSubmit={handleCheckDelivery} className="flex gap-2">
              <input
                type="text"
                maxLength={6}
                value={pinCode}
                onChange={(e) => setPinCode(e.target.value.replace(/\D/g, ''))}
                placeholder="Enter 6-digit PIN code"
                className="flex-1 px-3 py-2 text-xs font-sans bg-white border border-[#D8C9B5] focus:border-[#211C19] rounded-xs focus:outline-hidden"
              />
              <button
                type="submit"
                className="px-5 py-2 text-xs font-sans tracking-wider uppercase bg-[#211C19] text-[#F5F0E8] rounded-xs cursor-pointer hover:bg-[#312A26]"
              >
                CHECK
              </button>
            </form>

            {deliveryResult?.checked && (
              <div
                className={`mt-3 text-xs font-sans p-2 rounded-xs border ${
                  deliveryResult.valid
                    ? 'bg-[#3b5e39]/10 border-[#3b5e39]/30 text-[#211C19]'
                    : 'bg-[#942b41]/10 border-[#942b41]/30 text-[#942b41]'
                }`}
              >
                {deliveryResult.valid ? (
                  <div>
                    <p className="font-medium text-[#3b5e39] flex items-center gap-1.5">
                      <Truck size={13} />
                      <span>{deliveryResult.message}</span>
                    </p>
                    <p className="text-[11px] text-[#8C8175] mt-0.5">
                      Estimated delivery: <strong className="text-[#211C19]">{deliveryResult.estimatedDate}</strong>
                    </p>
                  </div>
                ) : (
                  <p>{deliveryResult.message}</p>
                )}
              </div>
            )}
          </div>

          {/* Collapsible Accordion Areas */}
          <div className="border-t border-[#D8C9B5]/50 divide-y divide-[#D8C9B5]/40 text-xs font-sans">
            {/* Description */}
            <div className="py-3.5">
              <button
                type="button"
                onClick={() =>
                  setExpandedSection(expandedSection === 'desc' ? null : 'desc')
                }
                className="w-full flex items-center justify-between text-left uppercase tracking-widest text-[#211C19] font-medium cursor-pointer"
              >
                <span>DESCRIPTION</span>
                <ChevronDown
                  size={14}
                  className={`transition-transform duration-200 ${
                    expandedSection === 'desc' ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {expandedSection === 'desc' && (
                <div className="pt-3 text-[#312A26] font-light leading-relaxed space-y-2 animate-in fade-in">
                  <p>{product.description}</p>
                  <p className="text-[#8C8175] italic">"{product.inspiration}"</p>
                </div>
              )}
            </div>

            {/* Fragrance Notes Accordion */}
            <div className="py-3.5">
              <button
                type="button"
                onClick={() =>
                  setExpandedSection(expandedSection === 'notes' ? null : 'notes')
                }
                className="w-full flex items-center justify-between text-left uppercase tracking-widest text-[#211C19] font-medium cursor-pointer"
              >
                <span>FRAGRANCE NOTES PYRAMID</span>
                <ChevronDown
                  size={14}
                  className={`transition-transform duration-200 ${
                    expandedSection === 'notes' ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {expandedSection === 'notes' && (
                <div className="pt-3 text-[#312A26] space-y-2 animate-in fade-in">
                  <div className="flex gap-2">
                    <span className="font-semibold text-[#211C19] w-16">TOP:</span>
                    <span className="text-[#8C8175]">{product.topNotes.join(' · ')}</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="font-semibold text-[#211C19] w-16">HEART:</span>
                    <span className="text-[#8C8175]">{product.heartNotes.join(' · ')}</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="font-semibold text-[#211C19] w-16">BASE:</span>
                    <span className="text-[#8C8175]">{product.baseNotes.join(' · ')}</span>
                  </div>
                </div>
              )}
            </div>

            {/* How It Smells */}
            <div className="py-3.5">
              <button
                type="button"
                onClick={() =>
                  setExpandedSection(expandedSection === 'smells' ? null : 'smells')
                }
                className="w-full flex items-center justify-between text-left uppercase tracking-widest text-[#211C19] font-medium cursor-pointer"
              >
                <span>HOW IT SMELLS</span>
                <ChevronDown
                  size={14}
                  className={`transition-transform duration-200 ${
                    expandedSection === 'smells' ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {expandedSection === 'smells' && (
                <div className="pt-3 text-[#312A26] font-light leading-relaxed animate-in fade-in">
                  <p>{product.howItSmells}</p>
                </div>
              )}
            </div>

            {/* How to Wear */}
            <div className="py-3.5">
              <button
                type="button"
                onClick={() =>
                  setExpandedSection(expandedSection === 'wear' ? null : 'wear')
                }
                className="w-full flex items-center justify-between text-left uppercase tracking-widest text-[#211C19] font-medium cursor-pointer"
              >
                <span>HOW TO WEAR</span>
                <ChevronDown
                  size={14}
                  className={`transition-transform duration-200 ${
                    expandedSection === 'wear' ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {expandedSection === 'wear' && (
                <div className="pt-3 text-[#312A26] font-light leading-relaxed animate-in fade-in">
                  <p>{product.howToWear}</p>
                </div>
              )}
            </div>

            {/* Details */}
            <div className="py-3.5">
              <button
                type="button"
                onClick={() =>
                  setExpandedSection(expandedSection === 'details' ? null : 'details')
                }
                className="w-full flex items-center justify-between text-left uppercase tracking-widest text-[#211C19] font-medium cursor-pointer"
              >
                <span>DETAILS & SPECIFICATIONS</span>
                <ChevronDown
                  size={14}
                  className={`transition-transform duration-200 ${
                    expandedSection === 'details' ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {expandedSection === 'details' && (
                <div className="pt-3 text-[#312A26] font-light leading-relaxed space-y-1.5 animate-in fade-in">
                  <p>{product.details}</p>
                  <p><strong>Longevity:</strong> {product.longevity}</p>
                  <p><strong>Sillage:</strong> {product.sillage}</p>
                  <p><strong>Recommended Season:</strong> {product.season}</p>
                  <p><strong>SKU:</strong> {product.sku}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* 13. FRAGRANCE NOTES 3-STAGE VISUAL WITH INTERACTIVE MODAL */}
      {/* ============================================================== */}
      <section className="mb-24 pt-12 border-t border-[#D8C9B5]/50">
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-[10px] font-sans tracking-[0.24em] uppercase text-[#8C8175] font-semibold">
            THREE-STAGE ARCHITECTURE
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#211C19] mt-1 mb-2">
            The Olfactory Journey
          </h2>
          <p className="text-xs text-[#8C8175] font-light">
            Click on any note to explore its character and botanical origin.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Stage 1: TOP NOTES */}
          <div className="p-6 rounded-xs bg-[#FAF7F2] border border-[#D8C9B5]/60 flex flex-col items-center text-center">
            <span className="text-[10px] font-sans tracking-[0.24em] uppercase text-[#B69A69] font-semibold mb-1">
              FIRST 15 MINUTES
            </span>
            <h3 className="font-serif text-xl text-[#211C19] mb-4">Top Notes</h3>
            <div className="w-full space-y-2">
              {product.topNotes.map((note) => (
                <button
                  key={note}
                  type="button"
                  onClick={() =>
                    setSelectedNoteInfo({
                      name: note,
                      category: 'Top Note',
                      description: getNoteDescription(note),
                    })
                  }
                  className="w-full py-2 px-3 text-xs font-sans rounded-xs bg-white border border-[#D8C9B5]/40 hover:border-[#B69A69] text-[#211C19] transition-colors cursor-pointer flex items-center justify-between"
                >
                  <span>{note}</span>
                  <Info size={13} className="text-[#8C8175]" />
                </button>
              ))}
            </div>
          </div>

          {/* Stage 2: HEART NOTES */}
          <div className="p-6 rounded-xs bg-[#FAF7F2] border border-[#D8C9B5]/60 flex flex-col items-center text-center">
            <span className="text-[10px] font-sans tracking-[0.24em] uppercase text-[#B69A69] font-semibold mb-1">
              2 TO 4 HOURS
            </span>
            <h3 className="font-serif text-xl text-[#211C19] mb-4">Heart Notes</h3>
            <div className="w-full space-y-2">
              {product.heartNotes.map((note) => (
                <button
                  key={note}
                  type="button"
                  onClick={() =>
                    setSelectedNoteInfo({
                      name: note,
                      category: 'Heart Note',
                      description: getNoteDescription(note),
                    })
                  }
                  className="w-full py-2 px-3 text-xs font-sans rounded-xs bg-white border border-[#D8C9B5]/40 hover:border-[#B69A69] text-[#211C19] transition-colors cursor-pointer flex items-center justify-between"
                >
                  <span>{note}</span>
                  <Info size={13} className="text-[#8C8175]" />
                </button>
              ))}
            </div>
          </div>

          {/* Stage 3: BASE NOTES */}
          <div className="p-6 rounded-xs bg-[#FAF7F2] border border-[#D8C9B5]/60 flex flex-col items-center text-center">
            <span className="text-[10px] font-sans tracking-[0.24em] uppercase text-[#B69A69] font-semibold mb-1">
              UP TO 12+ HOURS
            </span>
            <h3 className="font-serif text-xl text-[#211C19] mb-4">Base Notes</h3>
            <div className="w-full space-y-2">
              {product.baseNotes.map((note) => (
                <button
                  key={note}
                  type="button"
                  onClick={() =>
                    setSelectedNoteInfo({
                      name: note,
                      category: 'Base Note',
                      description: getNoteDescription(note),
                    })
                  }
                  className="w-full py-2 px-3 text-xs font-sans rounded-xs bg-white border border-[#D8C9B5]/40 hover:border-[#B69A69] text-[#211C19] transition-colors cursor-pointer flex items-center justify-between"
                >
                  <span>{note}</span>
                  <Info size={13} className="text-[#8C8175]" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 15 & 16. CUSTOMER REVIEWS & FILTERS */}
      {/* ============================================================== */}
      <section id="customer-reviews" className="mb-24 pt-12 border-t border-[#D8C9B5]/50">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6 border-b border-[#D8C9B5]/40">
          <div>
            <span className="text-[10px] font-sans tracking-[0.24em] uppercase text-[#8C8175] font-semibold">
              VERIFIED CONNOISSEURS
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#211C19] mt-1">
              CUSTOMER REVIEWS
            </h2>
          </div>

          <button
            type="button"
            onClick={() => setWriteReviewModalOpen(true)}
            className="btn-luxury-outline text-xs py-3 px-6 cursor-pointer"
          >
            WRITE A REVIEW
          </button>
        </div>

        {/* Review Breakdown Scoreboard */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center p-8 bg-white/50 rounded-xs border border-[#D8C9B5]/50 mb-10">
          {/* Overall Rating */}
          <div className="md:col-span-4 flex flex-col items-center md:items-start text-center md:text-left border-b md:border-b-0 md:border-r border-[#D8C9B5]/50 pb-6 md:pb-0 md:pr-6">
            <span className="font-sans text-5xl font-light text-[#211C19] tabular-nums">
              {product.rating}
            </span>
            <div className="flex items-center text-[#B69A69] my-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} fill="currentColor" strokeWidth={0} />
              ))}
            </div>
            <p className="text-xs text-[#8C8175]">
              Based on {reviewsList.length} verified reviews
            </p>
          </div>

          {/* Star Distribution */}
          <div className="md:col-span-8 space-y-1.5 text-xs font-sans">
            {[5, 4, 3, 2, 1].map((stars) => {
              const count = reviewsList.filter((r) => r.rating === stars).length;
              const percent = (count / (reviewsList.length || 1)) * 100;
              return (
                <div key={stars} className="flex items-center gap-3">
                  <span className="w-12 text-[#8C8175] flex items-center gap-1">
                    {stars} <Star size={10} className="text-[#B69A69]" fill="currentColor" strokeWidth={0} />
                  </span>
                  <div className="flex-1 bg-[#D8C9B5]/40 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-[#B69A69] h-full transition-all duration-300"
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                  <span className="w-8 text-right text-[#8C8175] tabular-nums">
                    {count}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Review Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 text-xs font-sans">
          <span className="uppercase tracking-widest text-[#8C8175] text-[11px] mr-2">
            FILTER:
          </span>
          <button
            type="button"
            onClick={() => setSelectedStarFilter('all')}
            className={`px-3 py-1 rounded-xs border transition-colors cursor-pointer ${
              selectedStarFilter === 'all'
                ? 'bg-[#211C19] text-[#F5F0E8] border-[#211C19]'
                : 'bg-white/60 text-[#211C19] border-[#D8C9B5]'
            }`}
          >
            All Reviews ({reviewsList.length})
          </button>
          {[5, 4, 3].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setSelectedStarFilter(star)}
              className={`px-3 py-1 rounded-xs border transition-colors cursor-pointer ${
                selectedStarFilter === star
                  ? 'bg-[#211C19] text-[#F5F0E8] border-[#211C19]'
                  : 'bg-white/60 text-[#211C19] border-[#D8C9B5]'
              }`}
            >
              {star} Stars
            </button>
          ))}
        </div>

        {/* Review Cards List */}
        <div className="space-y-4">
          {filteredReviews.length === 0 ? (
            <p className="text-xs text-[#8C8175] py-8 text-center">
              No reviews found for this star filter.
            </p>
          ) : (
            filteredReviews.map((rev) => (
              <div
                key={rev.id}
                className="p-6 rounded-xs bg-white/60 border border-[#D8C9B5]/40"
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-serif text-base text-[#211C19]">
                        {rev.author}
                      </span>
                      {rev.verified && (
                        <span className="text-[10px] font-sans uppercase tracking-wider text-[#3b5e39] font-medium flex items-center gap-0.5">
                          <Check size={11} strokeWidth={2.5} /> Verified Purchase
                        </span>
                      )}
                    </div>
                    {rev.location && (
                      <p className="text-[11px] text-[#8C8175]">{rev.location}</p>
                    )}
                  </div>

                  <span className="text-xs font-sans text-[#8C8175]">{rev.date}</span>
                </div>

                <div className="flex items-center text-[#B69A69] mb-2">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} size={12} fill="currentColor" strokeWidth={0} />
                  ))}
                </div>

                <h4 className="font-serif text-sm text-[#211C19] font-medium mb-1">
                  {rev.title}
                </h4>
                <p className="text-xs text-[#312A26] font-light leading-relaxed">
                  {rev.comment}
                </p>
              </div>
            ))
          )}
        </div>
      </section>

      {/* ============================================================== */}
      {/* 17. RELATED PRODUCTS: YOU MAY ALSO LIKE */}
      {/* ============================================================== */}
      <section className="mb-24 pt-12 border-t border-[#D8C9B5]/50">
        <div className="flex items-center justify-between mb-8">
          <div>
            <span className="text-[10px] font-sans tracking-[0.24em] uppercase text-[#8C8175] font-semibold">
              CURATED PAIRINGS
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#211C19] mt-1">
              YOU MAY ALSO LIKE
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {relatedProducts.map((relProduct) => (
            <ProductCard
              key={relProduct.id}
              product={relProduct}
              isWishlisted={wishlistIds.includes(relProduct.id)}
              onToggleWishlist={onToggleWishlist}
              onQuickAdd={() => onAddToBag(relProduct, '100ml', 1)}
              onSelectProduct={onSelectProduct}
            />
          ))}
        </div>
      </section>

      {/* ============================================================== */}
      {/* 18. RECENTLY VIEWED COMPACT BAR */}
      {/* ============================================================== */}
      {recentlyViewed.length > 0 && (
        <section className="pt-8 border-t border-[#D8C9B5]/50">
          <span className="text-[10px] font-sans tracking-[0.24em] uppercase text-[#8C8175] font-semibold block mb-4">
            RECENTLY VIEWED
          </span>
          <div className="flex items-center gap-4 overflow-x-auto pb-4">
            {recentlyViewed.map((rv) => (
              <div
                key={rv.id}
                onClick={() => onSelectProduct(rv)}
                className="flex items-center gap-3 p-2.5 rounded-xs bg-white/50 border border-[#D8C9B5]/40 hover:border-[#211C19] transition-colors cursor-pointer shrink-0"
              >
                <div className="w-10 h-12 bg-white flex items-center justify-center rounded-2xs">
                  <PerfumeBottleVisual
                    name={rv.name}
                    size="sm"
                    className="w-8 h-10"
                    interactive={false}
                  />
                </div>
                <div>
                  <p className="font-serif text-xs text-[#211C19] truncate max-w-[120px]">
                    {rv.name}
                  </p>
                  <p className="text-[10px] font-sans text-[#8C8175] tabular-nums">
                    ₹{rv.price.toLocaleString('en-IN')}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ============================================================== */}
      {/* 36. STICKY MOBILE BOTTOM PURCHASE BAR */}
      {/* ============================================================== */}
      <div className="fixed bottom-0 inset-x-0 z-40 lg:hidden bg-[#F5F0E8]/95 backdrop-blur-md border-t border-[#D8C9B5]/60 p-3 shadow-lg flex items-center justify-between">
        <div>
          <p className="text-[10px] font-sans text-[#8C8175] uppercase truncate max-w-[140px]">
            {product.name} ({selectedSize})
          </p>
          <p className="font-sans font-medium text-sm text-[#211C19] tabular-nums">
            ₹{(currentPrice * quantity).toLocaleString('en-IN')}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onToggleWishlist(product)}
            className="p-2.5 rounded-xs border border-[#D8C9B5] text-[#211C19] bg-white"
            aria-label="Wishlist"
          >
            <Heart
              size={16}
              fill={isWishlisted ? 'currentColor' : 'none'}
              className={isWishlisted ? 'text-[#942b41]' : 'text-[#211C19]'}
            />
          </button>
          <button
            type="button"
            onClick={() => onAddToBag(product, selectedSize, quantity)}
            className="btn-luxury-primary text-xs py-2.5 px-6 whitespace-nowrap cursor-pointer"
          >
            ADD TO BAG
          </button>
        </div>
      </div>

      {/* ============================================================== */}
      {/* 14. NOTE EXPERIENCE GLASS MODAL */}
      {/* ============================================================== */}
      {selectedNoteInfo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#211C19]/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-sm bg-[#F5F0E8] border border-[#B69A69]/40 rounded-xs shadow-2xl p-6 text-center">
            <button
              type="button"
              onClick={() => setSelectedNoteInfo(null)}
              className="absolute top-4 right-4 text-[#8C8175] hover:text-[#211C19]"
            >
              <X size={18} />
            </button>

            <span className="text-[10px] font-sans tracking-[0.24em] uppercase text-[#B69A69] font-semibold">
              {selectedNoteInfo.category}
            </span>
            <h3 className="font-serif text-2xl text-[#211C19] mt-1 mb-3">
              {selectedNoteInfo.name}
            </h3>
            <p className="text-xs text-[#312A26] font-light leading-relaxed mb-6">
              {selectedNoteInfo.description}
            </p>

            <button
              type="button"
              onClick={() => setSelectedNoteInfo(null)}
              className="btn-luxury-primary text-xs py-2 px-6"
            >
              CONTINUE EXPLORING
            </button>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* WRITE A REVIEW MODAL */}
      {/* ============================================================== */}
      {writeReviewModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#211C19]/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-md bg-[#F5F0E8] border border-[#B69A69]/40 rounded-xs shadow-2xl p-6 sm:p-8">
            <button
              type="button"
              onClick={() => setWriteReviewModalOpen(false)}
              className="absolute top-4 right-4 text-[#8C8175] hover:text-[#211C19]"
            >
              <X size={18} />
            </button>

            <div className="text-center mb-6">
              <span className="text-[10px] font-sans tracking-[0.24em] uppercase text-[#8C8175]">
                HAUTE PARFUMERIE
              </span>
              <h3 className="font-serif text-2xl text-[#211C19] mt-1">
                Share Your Experience
              </h3>
              <p className="text-xs text-[#8C8175] mt-1">
                Reflecting upon {product.name}
              </p>
            </div>

            <form onSubmit={handleAddReview} className="space-y-4">
              <div>
                <label className="block text-[11px] font-sans uppercase tracking-wider text-[#8C8175] mb-1">
                  Rating
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setNewReviewRating(star)}
                      className="p-1 text-[#B69A69] cursor-pointer"
                    >
                      <Star
                        size={20}
                        fill={star <= newReviewRating ? 'currentColor' : 'none'}
                        strokeWidth={1.5}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-sans uppercase tracking-wider text-[#8C8175] mb-1">
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  value={newReviewAuthor}
                  onChange={(e) => setNewReviewAuthor(e.target.value)}
                  placeholder="Eleanor Vance"
                  className="w-full px-3 py-2 text-xs bg-white border border-[#D8C9B5] text-[#211C19] rounded-xs"
                />
              </div>

              <div>
                <label className="block text-[11px] font-sans uppercase tracking-wider text-[#8C8175] mb-1">
                  Review Headline
                </label>
                <input
                  type="text"
                  value={newReviewTitle}
                  onChange={(e) => setNewReviewTitle(e.target.value)}
                  placeholder="e.g. Sublime sillage and creamy dry-down"
                  className="w-full px-3 py-2 text-xs bg-white border border-[#D8C9B5] text-[#211C19] rounded-xs"
                />
              </div>

              <div>
                <label className="block text-[11px] font-sans uppercase tracking-wider text-[#8C8175] mb-1">
                  Your Review *
                </label>
                <textarea
                  required
                  rows={3}
                  value={newReviewComment}
                  onChange={(e) => setNewReviewComment(e.target.value)}
                  placeholder="Describe how the fragrance develops on your skin..."
                  className="w-full px-3 py-2 text-xs bg-white border border-[#D8C9B5] text-[#211C19] rounded-xs resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full btn-luxury-primary text-xs py-3 cursor-pointer"
              >
                SUBMIT VERIFIED REVIEW
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
