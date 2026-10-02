import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { ProductCollection } from '../../types';
import {
  Layers,
  Plus,
  Edit2,
  Trash2,
  Eye,
  Check,
  X,
  Package,
  Save,
  AlertTriangle,
} from 'lucide-react';

export const AdminCollections: React.FC = () => {
  const { collections, products, addCollection, updateCollection, deleteCollection } =
    useStore();

  const [editingCollection, setEditingCollection] = useState<ProductCollection | null>(null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const [formData, setFormData] = useState<Partial<ProductCollection>>({
    name: '',
    description: '',
    productIds: [],
    status: 'Published',
  });

  const handleOpenCreate = () => {
    setEditingCollection(null);
    setIsCreatingNew(true);
    setFormData({
      name: '',
      description: '',
      productIds: [],
      status: 'Published',
    });
  };

  const handleOpenEdit = (col: ProductCollection) => {
    setEditingCollection(col);
    setIsCreatingNew(false);
    setFormData({
      ...col,
      productIds: [...col.productIds],
    });
  };

  const handleToggleProductInCollection = (productId: string) => {
    const current = formData.productIds || [];
    if (current.includes(productId)) {
      setFormData({
        ...formData,
        productIds: current.filter((id) => id !== productId),
      });
    } else {
      setFormData({
        ...formData,
        productIds: [...current, productId],
      });
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name) return;

    const slug = (formData.slug || formData.name)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    if (isCreatingNew) {
      const newCol: ProductCollection = {
        id: `col-${slug}`,
        name: formData.name,
        slug,
        description: formData.description || '',
        productIds: formData.productIds || [],
        displayOrder: collections.length + 1,
        status: formData.status || 'Published',
      };
      addCollection(newCol);
    } else if (editingCollection) {
      updateCollection({
        ...editingCollection,
        ...formData,
        name: formData.name,
        description: formData.description || '',
        productIds: formData.productIds || [],
      } as ProductCollection);
    }

    setEditingCollection(null);
    setIsCreatingNew(false);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300 font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#D8C9B5]/40">
        <div>
          <span className="text-[10px] font-sans tracking-[0.22em] uppercase text-[#8C8175] font-semibold">
            CURATED ANTHOLOGIES & SERIES
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#211C19] mt-0.5">
            Collections ({collections.length})
          </h1>
        </div>

        <button
          type="button"
          onClick={handleOpenCreate}
          className="btn-luxury-primary text-xs py-2.5 px-5 cursor-pointer flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus size={15} />
          <span>CREATE COLLECTION</span>
        </button>
      </div>

      {/* Collections Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {collections.map((col) => {
          const assignedProducts = products.filter((p) => col.productIds.includes(p.id));

          return (
            <div
              key={col.id}
              className="bg-white/80 backdrop-blur-sm border border-[#D8C9B5]/70 rounded-xs p-6 shadow-2xs hover:border-[#211C19] transition-all flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="font-mono text-[10px] text-[#8C8175]">
                    ORDER #{col.displayOrder}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-medium border uppercase tracking-wider ${
                      col.status === 'Published'
                        ? 'bg-[#3b5e39]/10 text-[#3b5e39] border-[#3b5e39]/30'
                        : 'bg-stone-200 text-stone-700 border-stone-300'
                    }`}
                  >
                    {col.status}
                  </span>
                </div>

                <h3 className="font-serif text-xl text-[#211C19] mb-1.5">{col.name}</h3>
                <p className="text-xs text-[#8C8175] line-clamp-2 leading-relaxed">
                  {col.description || 'No editorial synopsis provided.'}
                </p>
              </div>

              {/* Assigned Products Preview */}
              <div className="pt-3 border-t border-[#D8C9B5]/40">
                <span className="text-[10px] uppercase font-sans tracking-wider text-[#8C8175] font-semibold block mb-2">
                  Assigned Creations ({assignedProducts.length})
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {assignedProducts.length === 0 ? (
                    <span className="text-[11px] text-[#8C8175] italic">No products linked</span>
                  ) : (
                    assignedProducts.map((p) => (
                      <span
                        key={p.id}
                        className="px-2 py-0.5 rounded-2xs bg-[#FAF7F2] border border-[#D8C9B5] text-[10px] text-[#312A26]"
                      >
                        {p.name}
                      </span>
                    ))
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="pt-3 border-t border-[#D8C9B5]/40 flex items-center justify-between">
                <span className="text-[10px] font-mono text-[#8C8175]">/{col.slug}</span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleOpenEdit(col)}
                    className="p-1.5 text-[#8C8175] hover:text-[#211C19] transition-colors cursor-pointer"
                    title="Edit Collection"
                  >
                    <Edit2 size={14} />
                  </button>
                  <button
                    type="button"
                    onClick={() => setDeleteConfirmId(col.id)}
                    className="p-1.5 text-[#8C8175] hover:text-[#942b41] transition-colors cursor-pointer"
                    title="Delete Collection"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* =================================================================== */}
      {/* CREATE / EDIT COLLECTION MODAL */}
      {/* =================================================================== */}
      {(isCreatingNew || editingCollection) && (
        <div className="fixed inset-0 z-50 bg-[#211C19]/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#FAF7F2] max-w-xl w-full border border-[#D8C9B5] rounded-xs shadow-2xl p-6 relative font-sans max-h-[90vh] overflow-y-auto">
            <button
              type="button"
              onClick={() => {
                setEditingCollection(null);
                setIsCreatingNew(false);
              }}
              className="absolute top-4 right-4 p-2 text-[#8C8175] hover:text-[#211C19]"
            >
              <X size={18} />
            </button>

            <span className="text-[10px] font-sans tracking-widest uppercase text-[#B69A69] font-semibold block mb-1">
              CURATION BUILDER
            </span>
            <h2 className="font-serif text-2xl text-[#211C19] mb-4">
              {isCreatingNew ? 'Create New Collection' : `Edit ${editingCollection?.name}`}
            </h2>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="text-[10px] uppercase tracking-wider text-[#8C8175] font-semibold block mb-1">
                  Collection Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name || ''}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Amber & Smoked Resins"
                  className="w-full px-3 py-2 text-xs bg-white border border-[#D8C9B5] rounded-xs focus:border-[#211C19] focus:outline-hidden"
                />
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-wider text-[#8C8175] font-semibold block mb-1">
                  Editorial Synopsis
                </label>
                <textarea
                  rows={2}
                  value={formData.description || ''}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Short poetic description displayed in the boutique header..."
                  className="w-full px-3 py-2 text-xs bg-white border border-[#D8C9B5] rounded-xs focus:border-[#211C19] focus:outline-hidden"
                />
              </div>

              {/* Product Multi-Select */}
              <div>
                <label className="text-[10px] uppercase tracking-wider text-[#8C8175] font-semibold block mb-2">
                  Select Associated Flacons ({formData.productIds?.length || 0} selected)
                </label>
                <div className="space-y-1.5 max-h-48 overflow-y-auto bg-white p-3 border border-[#D8C9B5] rounded-xs">
                  {products.map((p) => {
                    const isSelected = formData.productIds?.includes(p.id);
                    return (
                      <label
                        key={p.id}
                        className={`flex items-center justify-between p-2 rounded-2xs text-xs cursor-pointer transition-colors ${
                          isSelected ? 'bg-[#F5F0E8] font-medium text-[#211C19]' : 'text-[#8C8175] hover:bg-stone-50'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => handleToggleProductInCollection(p.id)}
                            className="accent-[#211C19] rounded-2xs"
                          />
                          <span>{p.name}</span>
                        </div>
                        <span className="text-[10px] text-[#8C8175]">{p.family}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-wider text-[#8C8175] font-semibold block mb-1">
                  Status
                </label>
                <select
                  value={formData.status || 'Published'}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                  className="w-full px-3 py-2 text-xs bg-white border border-[#D8C9B5] rounded-xs focus:border-[#211C19] focus:outline-hidden"
                >
                  <option value="Published">Published</option>
                  <option value="Draft">Draft</option>
                </select>
              </div>

              <div className="pt-3 border-t border-[#D8C9B5] flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setEditingCollection(null);
                    setIsCreatingNew(false);
                  }}
                  className="btn-luxury-outline text-xs py-2 px-4 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-luxury-primary text-xs py-2 px-5 cursor-pointer flex items-center gap-1.5"
                >
                  <Save size={13} />
                  <span>SAVE COLLECTION</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 bg-[#211C19]/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white max-w-sm w-full p-6 rounded-xs border border-[#D8C9B5] shadow-xl text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-[#942b41]/10 text-[#942b41] flex items-center justify-center mx-auto">
              <AlertTriangle size={24} />
            </div>
            <h3 className="font-serif text-xl text-[#211C19]">Delete Collection?</h3>
            <p className="text-xs text-[#8C8175]">
              This removes the curation. Individual perfume creations will remain untouched.
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
                  deleteCollection(deleteConfirmId);
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
