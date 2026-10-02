import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { PerfumeBottleVisual } from '../PerfumeBottleVisual';
import {
  Boxes,
  AlertTriangle,
  Search,
  Plus,
  Minus,
  Check,
  Package,
  TrendingUp,
  RefreshCw,
  X,
  Save,
} from 'lucide-react';

export const AdminInventory: React.FC = () => {
  const { products, updateStock } = useStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'low' | 'out'>('all');
  const [restockModalProduct, setRestockModalProduct] = useState<string | null>(null);
  const [batchRestockAmount, setBatchRestockAmount] = useState<number>(25);

  const lowStockProducts = products.filter((p) => p.stock <= (p.lowStockThreshold ?? 10) && p.stock > 0);
  const outOfStockProducts = products.filter((p) => p.stock === 0);

  const totalUnits = products.reduce((acc, p) => acc + p.stock, 0);
  const totalCostValue = products.reduce(
    (acc, p) => acc + p.stock * (p.costPrice || Math.round(p.price * 0.35)),
    0
  );
  const totalRetailValue = products.reduce((acc, p) => acc + p.stock * p.price, 0);

  const filteredProducts = products.filter((p) => {
    if (filterType === 'low' && (p.stock > (p.lowStockThreshold ?? 10) || p.stock === 0)) return false;
    if (filterType === 'out' && p.stock > 0) return false;

    const query = searchQuery.trim().toLowerCase();
    if (!query) return true;
    return (
      p.name.toLowerCase().includes(query) ||
      p.sku.toLowerCase().includes(query) ||
      p.family.toLowerCase().includes(query)
    );
  });

  const handleQuickAdjust = (productId: string, currentStock: number, delta: number) => {
    const next = Math.max(0, currentStock + delta);
    updateStock(productId, next);
  };

  const handleApplyBatchRestock = (e: React.FormEvent) => {
    e.preventDefault();
    if (!restockModalProduct) return;
    const prod = products.find((p) => p.id === restockModalProduct);
    if (prod) {
      updateStock(prod.id, prod.stock + Number(batchRestockAmount));
    }
    setRestockModalProduct(null);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300 font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#D8C9B5]/40">
        <div>
          <span className="text-[10px] font-sans tracking-[0.22em] uppercase text-[#8C8175] font-semibold">
            STOCKS & CELLAR INVENTORY
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#211C19] mt-0.5">
            Inventory Management
          </h1>
        </div>

        {lowStockProducts.length > 0 && (
          <div className="flex items-center gap-2 p-2.5 bg-[#942b41]/10 border border-[#942b41]/30 rounded-xs text-xs text-[#942b41]">
            <AlertTriangle size={15} />
            <span className="font-medium">
              {lowStockProducts.length} creations need cellar replenishment
            </span>
          </div>
        )}
      </div>

      {/* Metric Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white/70 backdrop-blur-sm border border-[#D8C9B5]/60 rounded-xs p-5 shadow-2xs">
          <span className="text-[10px] font-sans uppercase tracking-widest text-[#8C8175] block">
            TOTAL INVENTORY UNITS
          </span>
          <p className="font-serif text-3xl text-[#211C19] tabular-nums mt-1">{totalUnits}</p>
          <span className="text-xs text-[#8C8175] mt-1 block">Across {products.length} formulations</span>
        </div>

        <div className="bg-white/70 backdrop-blur-sm border border-[#D8C9B5]/60 rounded-xs p-5 shadow-2xs">
          <span className="text-[10px] font-sans uppercase tracking-widest text-[#8C8175] block">
            LOW STOCK ITEMS
          </span>
          <p className="font-serif text-3xl text-[#942b41] tabular-nums mt-1">
            {lowStockProducts.length}
          </p>
          <span className="text-xs text-[#8C8175] mt-1 block">Threshold: &lt;= 10 units</span>
        </div>

        <div className="bg-white/70 backdrop-blur-sm border border-[#D8C9B5]/60 rounded-xs p-5 shadow-2xs">
          <span className="text-[10px] font-sans uppercase tracking-widest text-[#8C8175] block">
            CELLAR ASSET VALUE (COST)
          </span>
          <p className="font-sans font-semibold text-2xl text-[#211C19] tabular-nums mt-1">
            ₹{totalCostValue.toLocaleString('en-IN')}
          </p>
          <span className="text-xs text-[#8C8175] mt-1 block">Raw maceration capital</span>
        </div>

        <div className="bg-white/70 backdrop-blur-sm border border-[#D8C9B5]/60 rounded-xs p-5 shadow-2xs">
          <span className="text-[10px] font-sans uppercase tracking-widest text-[#8C8175] block">
            RETAIL VALUE POTENTIAL
          </span>
          <p className="font-sans font-semibold text-2xl text-[#3b5e39] tabular-nums mt-1">
            ₹{totalRetailValue.toLocaleString('en-IN')}
          </p>
          <span className="text-xs text-[#8C8175] mt-1 block">Gross realizable value</span>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white/80 backdrop-blur-sm border border-[#D8C9B5]/70 rounded-xs p-4 shadow-2xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search
            size={14}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8C8175]"
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search flacons or SKU..."
            className="w-full pl-9 pr-4 py-2 text-xs bg-[#FAF7F2] border border-[#D8C9B5] text-[#211C19] rounded-xs focus:border-[#211C19] focus:outline-hidden"
          />
        </div>

        <div className="flex items-center gap-2 text-xs">
          <button
            type="button"
            onClick={() => setFilterType('all')}
            className={`px-3 py-1.5 rounded-2xs font-sans tracking-wide cursor-pointer ${
              filterType === 'all'
                ? 'bg-[#211C19] text-[#F5F0E8] font-medium'
                : 'bg-white border border-[#D8C9B5] text-[#8C8175] hover:text-[#211C19]'
            }`}
          >
            All Stock ({products.length})
          </button>
          <button
            type="button"
            onClick={() => setFilterType('low')}
            className={`px-3 py-1.5 rounded-2xs font-sans tracking-wide cursor-pointer ${
              filterType === 'low'
                ? 'bg-[#942b41] text-white font-medium'
                : 'bg-white border border-[#D8C9B5] text-[#8C8175] hover:text-[#942b41]'
            }`}
          >
            Low Stock ({lowStockProducts.length})
          </button>
          <button
            type="button"
            onClick={() => setFilterType('out')}
            className={`px-3 py-1.5 rounded-2xs font-sans tracking-wide cursor-pointer ${
              filterType === 'out'
                ? 'bg-[#211C19] text-[#F5F0E8] font-medium'
                : 'bg-white border border-[#D8C9B5] text-[#8C8175] hover:text-[#211C19]'
            }`}
          >
            Out of Stock ({outOfStockProducts.length})
          </button>
        </div>
      </div>

      {/* Inventory Table */}
      <div className="bg-white/80 backdrop-blur-sm border border-[#D8C9B5]/70 rounded-xs shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-sans border-collapse">
            <thead>
              <tr className="bg-[#FAF7F2] border-b border-[#D8C9B5] text-[#8C8175] text-[10px] tracking-widest uppercase">
                <th className="py-3 px-4 font-semibold">Flacon</th>
                <th className="py-3 px-4 font-semibold">Fragrance</th>
                <th className="py-3 px-4 font-semibold">SKU</th>
                <th className="py-3 px-4 font-semibold text-right">Cost (₹)</th>
                <th className="py-3 px-4 font-semibold text-right">Retail (₹)</th>
                <th className="py-3 px-4 font-semibold text-center">Status</th>
                <th className="py-3 px-4 font-semibold text-center">Quick Adjust</th>
                <th className="py-3 px-4 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#D8C9B5]/30">
              {filteredProducts.map((p) => {
                const isLow = p.stock <= (p.lowStockThreshold ?? 10) && p.stock > 0;
                const isOut = p.stock === 0;

                return (
                  <tr key={p.id} className="hover:bg-[#FAF7F2]/80 transition-colors">
                    <td className="py-3 px-4">
                      <div className="w-10 h-12 bg-[#F5F0E8] border border-[#D8C9B5]/60 rounded-xs flex items-center justify-center overflow-hidden">
                        <PerfumeBottleVisual
                          name={p.name}
                          liquidColor={p.liquidColor}
                          size="sm"
                        />
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <p className="font-serif text-sm font-semibold text-[#211C19]">{p.name}</p>
                      <p className="text-[10px] text-[#8C8175]">{p.family} · {p.classification}</p>
                    </td>
                    <td className="py-3 px-4 font-mono text-[11px] text-[#8C8175]">{p.sku}</td>
                    <td className="py-3 px-4 text-right text-[#8C8175] tabular-nums">
                      ₹{(p.costPrice || Math.round(p.price * 0.35)).toLocaleString('en-IN')}
                    </td>
                    <td className="py-3 px-4 text-right font-medium text-[#211C19] tabular-nums">
                      ₹{p.price.toLocaleString('en-IN')}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-semibold border tracking-wider uppercase ${
                          isOut
                            ? 'bg-[#942b41]/15 text-[#942b41] border-[#942b41]/30'
                            : isLow
                            ? 'bg-amber-500/15 text-amber-800 border-amber-500/30'
                            : 'bg-[#3b5e39]/10 text-[#3b5e39] border-[#3b5e39]/30'
                        }`}
                      >
                        {isOut ? 'Depleted' : isLow ? `Low (${p.stock})` : `In Stock (${p.stock})`}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center justify-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => handleQuickAdjust(p.id, p.stock, -1)}
                          disabled={p.stock <= 0}
                          className="w-7 h-7 rounded-2xs border border-[#D8C9B5] bg-white hover:bg-stone-50 text-[#211C19] flex items-center justify-center disabled:opacity-30 cursor-pointer"
                          title="Decrease 1 flacon"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="w-12 text-center font-bold tabular-nums text-xs">
                          {p.stock}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleQuickAdjust(p.id, p.stock, 1)}
                          className="w-7 h-7 rounded-2xs border border-[#D8C9B5] bg-white hover:bg-stone-50 text-[#211C19] flex items-center justify-center cursor-pointer"
                          title="Add 1 flacon"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        type="button"
                        onClick={() => {
                          setRestockModalProduct(p.id);
                          setBatchRestockAmount(25);
                        }}
                        className="text-xs text-[#211C19] hover:text-[#B69A69] underline cursor-pointer font-medium"
                      >
                        Log Batch
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Restock Batch Modal */}
      {restockModalProduct && (
        <div className="fixed inset-0 z-50 bg-[#211C19]/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#FAF7F2] max-w-md w-full p-6 rounded-xs border border-[#D8C9B5] shadow-2xl relative font-sans">
            <button
              type="button"
              onClick={() => setRestockModalProduct(null)}
              className="absolute top-4 right-4 p-2 text-[#8C8175] hover:text-[#211C19]"
            >
              <X size={18} />
            </button>

            <span className="text-[10px] font-sans tracking-widest uppercase text-[#B69A69] font-semibold block mb-1">
              CELLAR RECEPTION
            </span>
            <h3 className="font-serif text-2xl text-[#211C19] mb-2">Receive Stock Batch</h3>
            <p className="text-xs text-[#8C8175] mb-4">
              Record new bottled and sealed batch from the Grasse distillation atelier into active inventory.
            </p>

            <form onSubmit={handleApplyBatchRestock} className="space-y-4">
              <div>
                <label className="text-[10px] uppercase tracking-wider text-[#8C8175] font-semibold block mb-1">
                  Creation
                </label>
                <input
                  type="text"
                  disabled
                  value={products.find((p) => p.id === restockModalProduct)?.name || ''}
                  className="w-full px-3 py-2 text-xs bg-stone-100 border border-[#D8C9B5] rounded-xs text-[#211C19] font-medium"
                />
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-wider text-[#8C8175] font-semibold block mb-1">
                  Bottles Received *
                </label>
                <div className="flex gap-2 mb-2">
                  {[10, 25, 50, 100].map((amt) => (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => setBatchRestockAmount(amt)}
                      className={`flex-1 py-1.5 rounded-2xs text-xs font-mono border ${
                        batchRestockAmount === amt
                          ? 'bg-[#211C19] text-[#F5F0E8] border-[#211C19]'
                          : 'bg-white border-[#D8C9B5] text-[#312A26]'
                      }`}
                    >
                      +{amt}
                    </button>
                  ))}
                </div>
                <input
                  type="number"
                  min={1}
                  required
                  value={batchRestockAmount}
                  onChange={(e) => setBatchRestockAmount(Number(e.target.value))}
                  className="w-full px-3 py-2 text-xs bg-white border border-[#D8C9B5] rounded-xs focus:border-[#211C19] focus:outline-hidden tabular-nums font-bold"
                />
              </div>

              <div className="pt-3 border-t border-[#D8C9B5] flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setRestockModalProduct(null)}
                  className="btn-luxury-outline text-xs py-2 px-4 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-luxury-primary text-xs py-2 px-5 cursor-pointer flex items-center gap-1.5"
                >
                  <Save size={13} />
                  <span>RECORD STOCK</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
