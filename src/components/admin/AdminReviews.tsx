import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { ProductReview } from '../../types';
import {
  Star,
  CheckCircle,
  XCircle,
  Trash2,
  Search,
  Filter,
  ShieldCheck,
  MessageSquare,
} from 'lucide-react';

export const AdminReviews: React.FC = () => {
  const { products, approveReview, rejectReview, deleteReview } = useStore();

  const [filterTab, setFilterTab] = useState<'All' | 'Approved' | 'Pending' | 'Rejected'>('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Collect all reviews from all products
  const allReviews: (ProductReview & { productName: string; productId: string })[] = [];
  products.forEach((p) => {
    p.reviews.forEach((r) => {
      allReviews.push({
        ...r,
        productName: p.name,
        productId: p.id,
      });
    });
  });

  const filteredReviews = allReviews.filter((r) => {
    const matchesTab = filterTab === 'All' ? true : r.status === filterTab;
    const q = searchQuery.trim().toLowerCase();
    const matchesSearch =
      !q ||
      r.author.toLowerCase().includes(q) ||
      r.title.toLowerCase().includes(q) ||
      r.comment.toLowerCase().includes(q) ||
      r.productName.toLowerCase().includes(q);
    return matchesTab && matchesSearch;
  });

  const pendingCount = allReviews.filter((r) => r.status === 'Pending').length;

  return (
    <div className="space-y-6 animate-in fade-in duration-300 font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#D8C9B5]/40">
        <div>
          <span className="text-[10px] font-sans tracking-[0.22em] uppercase text-[#8C8175] font-semibold">
            TESTIMONIALS & MODERATION
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#211C19] mt-0.5">
            Client Reviews ({allReviews.length})
          </h1>
        </div>

        {pendingCount > 0 && (
          <div className="flex items-center gap-2 p-2 bg-amber-500/10 border border-amber-500/30 rounded-xs text-xs text-amber-800">
            <MessageSquare size={14} />
            <span className="font-medium">{pendingCount} review(s) pending atelier approval</span>
          </div>
        )}
      </div>

      {/* Filter and Search Bar */}
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
            placeholder="Search reviewer, fragrance, or feedback..."
            className="w-full pl-9 pr-4 py-2 text-xs bg-[#FAF7F2] border border-[#D8C9B5] text-[#211C19] rounded-xs focus:border-[#211C19] focus:outline-hidden"
          />
        </div>

        <div className="flex items-center gap-2 text-xs">
          {(['All', 'Approved', 'Pending', 'Rejected'] as const).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setFilterTab(tab)}
              className={`px-3 py-1.5 rounded-2xs font-sans tracking-wide cursor-pointer ${
                filterTab === tab
                  ? 'bg-[#211C19] text-[#F5F0E8] font-medium'
                  : 'bg-white border border-[#D8C9B5] text-[#8C8175] hover:text-[#211C19]'
              }`}
            >
              {tab}{' '}
              {tab === 'Pending' && pendingCount > 0 && (
                <span className="ml-1 px-1 py-0.2 bg-[#B69A69] text-[#211C19] rounded-full text-[9px] font-bold">
                  {pendingCount}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Reviews Cards List */}
      <div className="space-y-4">
        {filteredReviews.length === 0 ? (
          <div className="bg-white p-12 text-center text-[#8C8175] border border-[#D8C9B5] rounded-xs">
            No reviews matching this criteria.
          </div>
        ) : (
          filteredReviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-white/80 backdrop-blur-sm border border-[#D8C9B5]/70 rounded-xs p-5 shadow-2xs hover:border-[#211C19] transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            >
              <div className="space-y-2 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-serif text-sm font-semibold text-[#211C19]">
                    {rev.productName}
                  </span>
                  <span className="text-[#8C8175]">·</span>
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        size={12}
                        className={
                          star <= rev.rating
                            ? 'text-[#B69A69] fill-[#B69A69]'
                            : 'text-[#D8C9B5]'
                        }
                      />
                    ))}
                  </div>
                  <span className="text-[10px] text-[#8C8175]">({rev.rating}/5)</span>

                  {rev.verified && (
                    <span className="flex items-center gap-1 text-[10px] text-[#3b5e39] font-medium bg-[#3b5e39]/10 px-1.5 py-0.5 rounded-2xs border border-[#3b5e39]/20">
                      <ShieldCheck size={11} />
                      <span>Verified Client</span>
                    </span>
                  )}

                  <span
                    className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full border ${
                      rev.status === 'Approved'
                        ? 'bg-[#3b5e39]/10 text-[#3b5e39] border-[#3b5e39]/30'
                        : rev.status === 'Pending'
                        ? 'bg-amber-500/15 text-amber-800 border-amber-500/30'
                        : 'bg-[#942b41]/10 text-[#942b41] border-[#942b41]/30'
                    }`}
                  >
                    {rev.status || 'Approved'}
                  </span>
                </div>

                <h4 className="font-serif text-base text-[#211C19] font-medium">
                  "{rev.title}"
                </h4>
                <p className="text-xs text-[#312A26] leading-relaxed max-w-3xl">
                  {rev.comment}
                </p>

                <p className="text-[11px] text-[#8C8175]">
                  By <strong className="text-[#211C19] font-medium">{rev.author}</strong> on {rev.date}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                {rev.status !== 'Approved' && (
                  <button
                    type="button"
                    onClick={() => approveReview(rev.id)}
                    className="px-3 py-1.5 rounded-xs bg-[#3b5e39] hover:bg-[#2e492c] text-white text-xs font-sans tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer"
                    title="Approve Review"
                  >
                    <CheckCircle size={13} />
                    <span>APPROVE</span>
                  </button>
                )}

                {rev.status !== 'Rejected' && (
                  <button
                    type="button"
                    onClick={() => rejectReview(rev.id)}
                    className="px-3 py-1.5 rounded-xs border border-[#D8C9B5] bg-white hover:bg-stone-50 text-[#942b41] text-xs font-sans tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer"
                    title="Reject Review"
                  >
                    <XCircle size={13} />
                    <span>REJECT</span>
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => deleteReview(rev.id)}
                  className="p-1.5 text-[#8C8175] hover:text-[#942b41] transition-colors cursor-pointer"
                  title="Delete Review"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
