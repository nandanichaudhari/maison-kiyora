import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Product, OlfactoryFamily, ProductVariant } from '../../types';
import { PerfumeBottleVisual } from '../PerfumeBottleVisual';
import {
  Plus,
  Search,
  Filter,
  Edit2,
  Trash2,
  Eye,
  Check,
  AlertTriangle,
  X,
  Layers,
  Sparkles,
  Save,
} from 'lucide-react';

interface AdminProductsProps {
  initialEditProductId?: string | null;
  onClearInitialEdit?: () => void;
}

export const AdminProducts: React.FC<AdminProductsProps> = ({
  initialEditProductId,
  onClearInitialEdit,
}) => {
  const { products, addProduct, updateProduct, deleteProduct } = useStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFamily, setSelectedFamily] = useState<string>('All');
  const [editingProduct, setEditingProduct] = useState<Product | null>(() => {
    if (initialEditProductId) {
      return products.find((p) => p.id === initialEditProductId) || null;
    }
    return null;
  });

  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Form State for Add / Edit
  const [formData, setFormData] = useState<Partial<Product>>({
    name: '',
    subtitle: '',
    description: '',
    price: 3499,
    originalPrice: 4200,
    costPrice: 1200,
    stock: 45,
    lowStockThreshold: 10,
    category: 'Perfume',
    classification: 'Eau de Parfum',
    family: 'Woody',
    badge: undefined,
    status: 'Published',
    topNotes: ['Bergamot', 'Saffron'],
    heartNotes: ['Bulgarian Rose', 'Cedarwood'],
    baseNotes: ['Oud Wood', 'Amber', 'Musk'],
    liquidColor: '#c9933b',
    liquidHighlight: '#e8b86d',
    capColor: '#B69A69',
  });

  // Open Edit Modal
  const handleOpenEdit = (p: Product) => {
    setEditingProduct(p);
    setIsCreatingNew(false);
    setFormData({
      ...p,
      topNotes: [...p.topNotes],
      heartNotes: [...p.heartNotes],
      baseNotes: [...p.baseNotes],
    });
  };

  // Open Create Modal
  const handleOpenCreate = () => {
    setEditingProduct(null);
    setIsCreatingNew(true);
    setFormData({
      name: '',
      subtitle: '',
      description: '',
      price: 3999,
      originalPrice: 4500,
      costPrice: 1300,
      stock: 50,
      lowStockThreshold: 10,
      category: 'Perfume',
      classification: 'Extrait de Parfum',
      family: 'Woody',
      badge: 'NEW',
      status: 'Published',
      topNotes: ['Pink Pepper', 'Italian Bergamot'],
      heartNotes: ['Damask Rose', 'Olibanum'],
      baseNotes: ['Cambodian Oud', 'Bourbon Vanilla', 'Sandalwood'],
      liquidColor: '#c28744',
      liquidHighlight: '#e3ad6a',
      capColor: '#B69A69',
    });
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name) return;

    const slug = (formData.slug || formData.name)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    const variants: ProductVariant[] = [
      {
        size: '50ml',
        price: Math.round(Number(formData.price || 3499) * 0.75),
        originalPrice: Math.round(Number(formData.originalPrice || 4200) * 0.75),
        inStock: Number(formData.stock || 50) > 0,
        sku: `MK-${slug.toUpperCase()}-50ML`,
        costPrice: Math.round(Number(formData.costPrice || 1200) * 0.75),
        stock: Number(formData.stock || 50),
      },
      {
        size: '100ml',
        price: Number(formData.price || 3499),
        originalPrice: Number(formData.originalPrice || 4200),
        inStock: Number(formData.stock || 50) > 0,
        sku: `MK-${slug.toUpperCase()}-100ML`,
        costPrice: Number(formData.costPrice || 1200),
        stock: Number(formData.stock || 50),
      },
    ];

    if (isCreatingNew) {
      const newProd: Product = {
        id: slug,
        slug: slug,
        name: formData.name || 'NEW CREATION',
        subtitle: formData.subtitle || 'A signature olfactory symphony',
        description:
          formData.description ||
          'Distilled with rare harvest essences in Grasse and Paris.',
        price: Number(formData.price || 3499),
        originalPrice: Number(formData.originalPrice || 4200),
        costPrice: Number(formData.costPrice || 1200),
        stock: Number(formData.stock || 50),
        lowStockThreshold: Number(formData.lowStockThreshold || 10),
        sku: `MK-${slug.toUpperCase()}`,
        category: (formData.category as any) || 'Perfume',
        classification: formData.classification || 'Eau de Parfum',
        family: (formData.family as OlfactoryFamily) || 'Woody',
        topNotes: formData.topNotes || [],
        heartNotes: formData.heartNotes || [],
        baseNotes: formData.baseNotes || [],
        sizes: ['50ml', '100ml'],
        rating: 5.0,
        reviewCount: 0,
        inStock: Number(formData.stock || 50) > 0,
        status: formData.status || 'Published',
        badge: formData.badge,
        featured: formData.featured || false,
        liquidColor: formData.liquidColor || '#c9933b',
        liquidHighlight: formData.liquidHighlight || '#e8b86d',
        capColor: formData.capColor || '#B69A69',
        variants,
        reviews: [],
      };
      addProduct(newProd);
    } else if (editingProduct) {
      const updated: Product = {
        ...editingProduct,
        ...formData,
        name: formData.name || editingProduct.name,
        price: Number(formData.price || editingProduct.price),
        originalPrice: Number(formData.originalPrice || editingProduct.originalPrice),
        costPrice: Number(formData.costPrice || editingProduct.costPrice),
        stock: Number(formData.stock ?? editingProduct.stock),
        variants,
      } as Product;
      updateProduct(updated);
    }

    setEditingProduct(null);
    setIsCreatingNew(false);
    onClearInitialEdit?.();
  };

  const filteredProducts = products.filter((p) => {
    const matchesFamily =
      selectedFamily === 'All' ? true : p.family === selectedFamily;
    const query = searchQuery.trim().toLowerCase();
    const matchesQuery =
      !query ||
      p.name.toLowerCase().includes(query) ||
      p.sku.toLowerCase().includes(query) ||
      p.family.toLowerCase().includes(query);
    return matchesFamily && matchesQuery;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Header & Add Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#D8C9B5]/40">
        <div>
          <span className="text-[10px] font-sans tracking-[0.22em] uppercase text-[#8C8175] font-semibold">
            CATALOGUE & ATELIER CREATIONS
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#211C19] mt-0.5">
            Products ({products.length})
          </h1>
        </div>

        <button
          type="button"
          onClick={handleOpenCreate}
          className="btn-luxury-primary text-xs py-2.5 px-5 cursor-pointer flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus size={15} />
          <span>NEW PRODUCT CREATION</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white/80 backdrop-blur-sm border border-[#D8C9B5]/70 rounded-xs p-4 shadow-2xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search
            size={14}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8C8175]"
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search flacon name, SKU, or family..."
            className="w-full pl-9 pr-4 py-2 text-xs bg-[#FAF7F2] border border-[#D8C9B5] text-[#211C19] rounded-xs focus:border-[#211C19] focus:outline-hidden"
          />
        </div>

        {/* Olfactory Family Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 text-xs">
          {['All', 'Woody', 'Floral', 'Citrus', 'Fresh', 'Spicy'].map((fam) => (
            <button
              key={fam}
              type="button"
              onClick={() => setSelectedFamily(fam)}
              className={`px-3 py-1.5 rounded-2xs text-[11px] font-sans tracking-wide transition-colors whitespace-nowrap cursor-pointer ${
                selectedFamily === fam
                  ? 'bg-[#211C19] text-[#F5F0E8] font-medium shadow-xs'
                  : 'bg-white border border-[#D8C9B5] text-[#8C8175] hover:text-[#211C19]'
              }`}
            >
              {fam}
            </button>
          ))}
        </div>
      </div>

      {/* Product List Table */}
      <div className="bg-white/80 backdrop-blur-sm border border-[#D8C9B5]/70 rounded-xs shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-sans border-collapse">
            <thead>
              <tr className="bg-[#FAF7F2] border-b border-[#D8C9B5] text-[#8C8175] text-[10px] tracking-widest uppercase">
                <th className="py-3 px-4 font-semibold">Flacon</th>
                <th className="py-3 px-4 font-semibold">Fragrance</th>
                <th className="py-3 px-4 font-semibold">Family</th>
                <th className="py-3 px-4 font-semibold text-right">Price (100ml)</th>
                <th className="py-3 px-4 font-semibold text-center">Stock</th>
                <th className="py-3 px-4 font-semibold">Status</th>
                <th className="py-3 px-4 font-semibold">Badge</th>
                <th className="py-3 px-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#D8C9B5]/30">
              {filteredProducts.map((p) => {
                const isLow = p.stock <= (p.lowStockThreshold ?? 10);
                return (
                  <tr
                    key={p.id}
                    className="hover:bg-[#FAF7F2]/80 transition-colors group cursor-pointer"
                    onClick={() => handleOpenEdit(p)}
                  >
                    <td className="py-3 px-4">
                      <div className="w-12 h-14 bg-[#F5F0E8] border border-[#D8C9B5]/60 rounded-xs flex items-center justify-center overflow-hidden">
                        <PerfumeBottleVisual
                          name={p.name}
                          liquidColor={p.liquidColor}
                          liquidHighlight={p.liquidHighlight}
                          size="sm"
                        />
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <p className="font-serif text-sm font-semibold text-[#211C19] group-hover:text-[#B69A69] transition-colors">
                        {p.name}
                      </p>
                      <p className="font-mono text-[10px] text-[#8C8175]">{p.sku}</p>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-[#312A26] font-medium">{p.family}</span>
                      <span className="text-[10px] text-[#8C8175] block">
                        {p.classification}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right font-medium text-[#211C19] tabular-nums">
                      ₹{p.price.toLocaleString('en-IN')}
                      {p.originalPrice && (
                        <span className="text-[10px] text-[#8C8175] line-through block">
                          ₹{p.originalPrice.toLocaleString('en-IN')}
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold tabular-nums border ${
                          isLow
                            ? 'bg-[#942b41]/10 text-[#942b41] border-[#942b41]/30'
                            : 'bg-[#3b5e39]/10 text-[#3b5e39] border-[#3b5e39]/30'
                        }`}
                      >
                        {p.stock} units
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          updateProduct({
                            ...p,
                            status: p.status === 'Published' ? 'Draft' : 'Published',
                          });
                        }}
                        className={`px-2 py-0.5 text-[10px] font-medium rounded-full border tracking-wide uppercase cursor-pointer ${
                          p.status === 'Published'
                            ? 'bg-[#3b5e39]/10 text-[#3b5e39] border-[#3b5e39]/30'
                            : 'bg-stone-200 text-stone-700 border-stone-300'
                        }`}
                      >
                        {p.status}
                      </button>
                    </td>
                    <td className="py-3 px-4">
                      {p.badge ? (
                        <span className="text-[10px] tracking-wider px-2 py-0.5 rounded-full bg-[#B69A69]/15 text-[#8c6b3e] border border-[#B69A69]/30 font-semibold uppercase">
                          {p.badge}
                        </span>
                      ) : (
                        <span className="text-[10px] text-[#8C8175]">—</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-right space-x-2">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenEdit(p);
                        }}
                        className="p-1.5 text-[#8C8175] hover:text-[#211C19] transition-colors cursor-pointer"
                        title="Edit Creation"
                      >
                        <Edit2 size={14} />
                      </button>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setDeleteConfirmId(p.id);
                        }}
                        className="p-1.5 text-[#8C8175] hover:text-[#942b41] transition-colors cursor-pointer"
                        title="Delete Creation"
                      >
                        <Trash2 size={14} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* =================================================================== */}
      {/* ADD / EDIT PRODUCT MODAL */}
      {/* =================================================================== */}
      {(isCreatingNew || editingProduct) && (
        <div className="fixed inset-0 z-50 bg-[#211C19]/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
          <div className="bg-[#FAF7F2] max-w-3xl w-full border border-[#D8C9B5] rounded-xs shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col font-sans">
            {/* Modal Header */}
            <div className="p-6 bg-white border-b border-[#D8C9B5] flex items-center justify-between sticky top-0 z-10">
              <div>
                <span className="text-[10px] font-sans tracking-widest uppercase text-[#B69A69] font-semibold block">
                  {isCreatingNew ? 'ATELIER FORMULATION' : 'MODIFY SPECIFICATION'}
                </span>
                <h2 className="font-serif text-2xl text-[#211C19]">
                  {isCreatingNew ? 'Create New Fragrance' : `Edit ${editingProduct?.name}`}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => {
                  setEditingProduct(null);
                  setIsCreatingNew(false);
                  onClearInitialEdit?.();
                }}
                className="p-2 text-[#8C8175] hover:text-[#211C19]"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Body / Form */}
            <form onSubmit={handleSaveProduct} className="p-6 overflow-y-auto space-y-6 flex-1">
              {/* Basic Details */}
              <div className="bg-white p-5 rounded-xs border border-[#D8C9B5] space-y-4">
                <h3 className="font-serif text-lg text-[#211C19]">Brand Nomenclature & Pitch</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-sans uppercase tracking-wider text-[#8C8175] font-semibold block mb-1">
                      Perfume Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name || ''}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. OODY RASPBERRY"
                      className="w-full px-3 py-2 text-xs bg-[#FAF7F2] border border-[#D8C9B5] rounded-xs focus:border-[#211C19] focus:outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-sans uppercase tracking-wider text-[#8C8175] font-semibold block mb-1">
                      Editorial Subtitle
                    </label>
                    <input
                      type="text"
                      value={formData.subtitle || ''}
                      onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                      placeholder="e.g. An opulent contrast of wild berries and smoked oud"
                      className="w-full px-3 py-2 text-xs bg-[#FAF7F2] border border-[#D8C9B5] rounded-xs focus:border-[#211C19] focus:outline-hidden"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-sans uppercase tracking-wider text-[#8C8175] font-semibold block mb-1">
                    Atelier Narrative Description
                  </label>
                  <textarea
                    rows={3}
                    value={formData.description || ''}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Describe the perfume's mood, maceration process, and provenance..."
                    className="w-full px-3 py-2 text-xs bg-[#FAF7F2] border border-[#D8C9B5] rounded-xs focus:border-[#211C19] focus:outline-hidden"
                  />
                </div>
              </div>

              {/* Classification & Visual Tone */}
              <div className="bg-white p-5 rounded-xs border border-[#D8C9B5] space-y-4">
                <h3 className="font-serif text-lg text-[#211C19]">Classification & Aesthetics</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="text-[10px] uppercase tracking-wider text-[#8C8175] font-semibold block mb-1">
                      Olfactory Family
                    </label>
                    <select
                      value={formData.family || 'Woody'}
                      onChange={(e) => setFormData({ ...formData, family: e.target.value as any })}
                      className="w-full px-3 py-2 text-xs bg-[#FAF7F2] border border-[#D8C9B5] rounded-xs focus:border-[#211C19] focus:outline-hidden"
                    >
                      <option value="Woody">Woody</option>
                      <option value="Floral">Floral</option>
                      <option value="Citrus">Citrus</option>
                      <option value="Fresh">Fresh</option>
                      <option value="Spicy">Spicy</option>
                      <option value="Leather">Leather</option>
                      <option value="Powdery">Powdery</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] uppercase tracking-wider text-[#8C8175] font-semibold block mb-1">
                      Concentration
                    </label>
                    <select
                      value={formData.classification || 'Eau de Parfum'}
                      onChange={(e) => setFormData({ ...formData, classification: e.target.value })}
                      className="w-full px-3 py-2 text-xs bg-[#FAF7F2] border border-[#D8C9B5] rounded-xs focus:border-[#211C19] focus:outline-hidden"
                    >
                      <option value="Extrait de Parfum">Extrait de Parfum (30%)</option>
                      <option value="Eau de Parfum">Eau de Parfum (20%)</option>
                      <option value="Elixir Intense">Elixir Intense</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] uppercase tracking-wider text-[#8C8175] font-semibold block mb-1">
                      Promotional Badge
                    </label>
                    <select
                      value={formData.badge || ''}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          badge: e.target.value ? (e.target.value as any) : undefined,
                        })
                      }
                      className="w-full px-3 py-2 text-xs bg-[#FAF7F2] border border-[#D8C9B5] rounded-xs focus:border-[#211C19] focus:outline-hidden"
                    >
                      <option value="">None</option>
                      <option value="NEW">NEW</option>
                      <option value="BESTSELLER">BESTSELLER</option>
                      <option value="LIMITED">LIMITED</option>
                    </select>
                  </div>
                </div>

                {/* Liquid & Flacon Color Picker Preview */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2">
                  <div>
                    <label className="text-[10px] uppercase tracking-wider text-[#8C8175] font-semibold block mb-1">
                      Liquid Hue
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={formData.liquidColor || '#c9933b'}
                        onChange={(e) => setFormData({ ...formData, liquidColor: e.target.value })}
                        className="w-8 h-8 rounded-xs cursor-pointer border border-[#D8C9B5]"
                      />
                      <span className="font-mono text-xs">{formData.liquidColor}</span>
                    </div>
                  </div>
                  <div>
                    <label className="text-[10px] uppercase tracking-wider text-[#8C8175] font-semibold block mb-1">
                      Cap Coating
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={formData.capColor || '#B69A69'}
                        onChange={(e) => setFormData({ ...formData, capColor: e.target.value })}
                        className="w-8 h-8 rounded-xs cursor-pointer border border-[#D8C9B5]"
                      />
                      <span className="font-mono text-xs">{formData.capColor}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-14 bg-[#F5F0E8] border border-[#D8C9B5] rounded-xs flex items-center justify-center overflow-hidden">
                      <PerfumeBottleVisual
                        name={formData.name || 'TEST'}
                        liquidColor={formData.liquidColor}
                        size="sm"
                      />
                    </div>
                    <span className="text-[10px] text-[#8C8175]">Live Flacon Preview</span>
                  </div>
                </div>
              </div>

              {/* Pricing & Inventory */}
              <div className="bg-white p-5 rounded-xs border border-[#D8C9B5] space-y-4">
                <h3 className="font-serif text-lg text-[#211C19]">Pricing & Atelier Stocks</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div>
                    <label className="text-[10px] uppercase tracking-wider text-[#8C8175] font-semibold block mb-1">
                      Selling Price (₹) *
                    </label>
                    <input
                      type="number"
                      required
                      min={500}
                      value={formData.price || ''}
                      onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                      className="w-full px-3 py-2 text-xs bg-[#FAF7F2] border border-[#D8C9B5] rounded-xs focus:border-[#211C19] focus:outline-hidden tabular-nums font-medium"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase tracking-wider text-[#8C8175] font-semibold block mb-1">
                      Compare Price (₹)
                    </label>
                    <input
                      type="number"
                      value={formData.originalPrice || ''}
                      onChange={(e) =>
                        setFormData({ ...formData, originalPrice: Number(e.target.value) })
                      }
                      className="w-full px-3 py-2 text-xs bg-[#FAF7F2] border border-[#D8C9B5] rounded-xs focus:border-[#211C19] focus:outline-hidden tabular-nums"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase tracking-wider text-[#8C8175] font-semibold block mb-1">
                      Units In Stock
                    </label>
                    <input
                      type="number"
                      min={0}
                      value={formData.stock ?? 50}
                      onChange={(e) => setFormData({ ...formData, stock: Number(e.target.value) })}
                      className="w-full px-3 py-2 text-xs bg-[#FAF7F2] border border-[#D8C9B5] rounded-xs focus:border-[#211C19] focus:outline-hidden tabular-nums"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase tracking-wider text-[#8C8175] font-semibold block mb-1">
                      Low Stock Threshold
                    </label>
                    <input
                      type="number"
                      min={1}
                      value={formData.lowStockThreshold ?? 10}
                      onChange={(e) =>
                        setFormData({ ...formData, lowStockThreshold: Number(e.target.value) })
                      }
                      className="w-full px-3 py-2 text-xs bg-[#FAF7F2] border border-[#D8C9B5] rounded-xs focus:border-[#211C19] focus:outline-hidden tabular-nums"
                    />
                  </div>
                </div>
              </div>

              {/* Notes Pyramid */}
              <div className="bg-white p-5 rounded-xs border border-[#D8C9B5] space-y-4">
                <h3 className="font-serif text-lg text-[#211C19]">Olfactory Pyramid Notes (Comma-separated)</h3>
                <div className="space-y-3">
                  <div>
                    <label className="text-[10px] uppercase tracking-wider text-[#8C8175] font-semibold block mb-1">
                      Top Notes (Initial 15 mins)
                    </label>
                    <input
                      type="text"
                      value={formData.topNotes?.join(', ') || ''}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          topNotes: e.target.value.split(',').map((s) => s.trim()).filter(Boolean),
                        })
                      }
                      placeholder="e.g. Wild Raspberry, Saffron, Pink Pepper"
                      className="w-full px-3 py-2 text-xs bg-[#FAF7F2] border border-[#D8C9B5] rounded-xs focus:border-[#211C19] focus:outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase tracking-wider text-[#8C8175] font-semibold block mb-1">
                      Heart Notes (2 - 4 hours)
                    </label>
                    <input
                      type="text"
                      value={formData.heartNotes?.join(', ') || ''}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          heartNotes: e.target.value.split(',').map((s) => s.trim()).filter(Boolean),
                        })
                      }
                      placeholder="e.g. Grasse Centifolia Rose, Birch Tar"
                      className="w-full px-3 py-2 text-xs bg-[#FAF7F2] border border-[#D8C9B5] rounded-xs focus:border-[#211C19] focus:outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase tracking-wider text-[#8C8175] font-semibold block mb-1">
                      Base Notes (Drydown 8+ hours)
                    </label>
                    <input
                      type="text"
                      value={formData.baseNotes?.join(', ') || ''}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          baseNotes: e.target.value.split(',').map((s) => s.trim()).filter(Boolean),
                        })
                      }
                      placeholder="e.g. Smoked Cambodian Oud, Amber, Vanilla Bean"
                      className="w-full px-3 py-2 text-xs bg-[#FAF7F2] border border-[#D8C9B5] rounded-xs focus:border-[#211C19] focus:outline-hidden"
                    />
                  </div>
                </div>
              </div>

              {/* Status & Visibility */}
              <div className="bg-white p-5 rounded-xs border border-[#D8C9B5] flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-semibold text-[#211C19]">Publish to Public Boutique</h4>
                  <p className="text-[11px] text-[#8C8175]">
                    Drafts remain hidden from customer search, collections, and catalog pages.
                  </p>
                </div>
                <select
                  value={formData.status || 'Published'}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                  className="px-3 py-1.5 text-xs bg-[#FAF7F2] border border-[#D8C9B5] rounded-xs focus:border-[#211C19] focus:outline-hidden font-medium"
                >
                  <option value="Published">Published (Live)</option>
                  <option value="Draft">Draft (Hidden)</option>
                  <option value="Archived">Archived</option>
                </select>
              </div>

              {/* Form Buttons */}
              <div className="pt-4 flex items-center justify-end gap-3 sticky bottom-0 bg-[#FAF7F2] py-2 border-t border-[#D8C9B5]">
                <button
                  type="button"
                  onClick={() => {
                    setEditingProduct(null);
                    setIsCreatingNew(false);
                    onClearInitialEdit?.();
                  }}
                  className="btn-luxury-outline text-xs py-2.5 px-5 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-luxury-primary text-xs py-2.5 px-6 cursor-pointer flex items-center gap-1.5"
                >
                  <Save size={14} />
                  <span>{isCreatingNew ? 'PUBLISH CREATION' : 'SAVE CHANGES'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 bg-[#211C19]/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white max-w-sm w-full p-6 rounded-xs border border-[#D8C9B5] shadow-xl text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-[#942b41]/10 text-[#942b41] flex items-center justify-center mx-auto">
              <AlertTriangle size={24} />
            </div>
            <h3 className="font-serif text-xl text-[#211C19]">Remove Creation?</h3>
            <p className="text-xs text-[#8C8175] leading-relaxed">
              This will permanently delete this fragrance from the public storefront and administrative catalog.
            </p>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setDeleteConfirmId(null)}
                className="btn-luxury-outline text-xs py-2 px-4 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  deleteProduct(deleteConfirmId);
                  setDeleteConfirmId(null);
                }}
                className="px-4 py-2 bg-[#942b41] text-white text-xs font-sans tracking-wider rounded-xs hover:bg-[#782335] transition-colors cursor-pointer"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
