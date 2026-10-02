import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { HomepageContentConfig, Banner } from '../../types';
import {
  LayoutTemplate,
  Save,
  Check,
  Eye,
  Megaphone,
  Sparkles,
  Layers,
  FileText,
} from 'lucide-react';

export const AdminContent: React.FC = () => {
  const { homepageConfig, updateHomepageConfig, banners, toggleBanner, addBanner } =
    useStore();

  const [formConfig, setFormConfig] = useState<HomepageContentConfig>(homepageConfig);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [activeAnnouncement, setActiveAnnouncement] = useState(
    banners[0]?.text ||
      'Complimentary express insured delivery on all orders above ₹6,000 · Complimentary discovery sample with every flacon.'
  );

  const handleSaveHomepage = (e: React.FormEvent) => {
    e.preventDefault();
    updateHomepageConfig(formConfig);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300 font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#D8C9B5]/40">
        <div>
          <span className="text-[10px] font-sans tracking-[0.22em] uppercase text-[#8C8175] font-semibold">
            EDITORIAL EDITING & DIGITAL SHOWROOM
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#211C19] mt-0.5">
            Storefront Content & CMS
          </h1>
        </div>

        {savedSuccess && (
          <div className="flex items-center gap-2 p-2.5 bg-[#3b5e39]/10 border border-[#3b5e39]/30 rounded-xs text-xs text-[#3b5e39] font-medium animate-in fade-in">
            <Check size={14} />
            <span>Storefront content updated successfully</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSaveHomepage} className="space-y-6">
        {/* Top Announcement Bar CMS */}
        <div className="bg-white/80 backdrop-blur-sm border border-[#D8C9B5]/70 rounded-xs p-6 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Megaphone size={16} className="text-[#B69A69]" />
              <h2 className="font-serif text-xl text-[#211C19]">Store Announcement Bar</h2>
            </div>
            <span className="text-[10px] text-[#3b5e39] uppercase font-bold tracking-wider">
              {banners[0]?.active ? 'Active Banner' : 'Inactive'}
            </span>
          </div>

          <div>
            <label className="text-[10px] uppercase tracking-wider text-[#8C8175] font-semibold block mb-1">
              Banner Announcement Copy
            </label>
            <input
              type="text"
              value={activeAnnouncement}
              onChange={(e) => setActiveAnnouncement(e.target.value)}
              placeholder="Announce promotions, gifts, or shipping perks..."
              className="w-full px-3.5 py-2.5 text-xs bg-[#FAF7F2] border border-[#D8C9B5] rounded-xs focus:border-[#211C19] focus:outline-hidden"
            />
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => {
                if (banners[0]) toggleBanner(banners[0].id);
              }}
              className="text-xs text-[#211C19] hover:text-[#B69A69] underline cursor-pointer"
            >
              Toggle Banner Visibility ({banners[0]?.active ? 'Hide' : 'Show'})
            </button>
          </div>
        </div>

        {/* Hero Section Editorial CMS */}
        <div className="bg-white/80 backdrop-blur-sm border border-[#D8C9B5]/70 rounded-xs p-6 shadow-2xs space-y-4">
          <div className="flex items-center gap-2.5 pb-2 border-b border-[#D8C9B5]/40">
            <Sparkles size={16} className="text-[#B69A69]" />
            <h2 className="font-serif text-xl text-[#211C19]">Hero Stage & Headline</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] uppercase tracking-wider text-[#8C8175] font-semibold block mb-1">
                Eyebrow Label
              </label>
              <input
                type="text"
                value={formConfig.heroEyebrow}
                onChange={(e) => setFormConfig({ ...formConfig, heroEyebrow: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-[#FAF7F2] border border-[#D8C9B5] rounded-xs focus:border-[#211C19] focus:outline-hidden"
              />
            </div>
            <div>
              <label className="text-[10px] uppercase tracking-wider text-[#8C8175] font-semibold block mb-1">
                Main Hero Headline
              </label>
              <input
                type="text"
                value={formConfig.heroHeading}
                onChange={(e) => setFormConfig({ ...formConfig, heroHeading: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-[#FAF7F2] border border-[#D8C9B5] rounded-xs focus:border-[#211C19] focus:outline-hidden"
              />
            </div>
          </div>

          <div>
            <label className="text-[10px] uppercase tracking-wider text-[#8C8175] font-semibold block mb-1">
              Hero Editorial Narrative
            </label>
            <textarea
              rows={2}
              value={formConfig.heroDescription}
              onChange={(e) => setFormConfig({ ...formConfig, heroDescription: e.target.value })}
              className="w-full px-3 py-2 text-xs bg-[#FAF7F2] border border-[#D8C9B5] rounded-xs focus:border-[#211C19] focus:outline-hidden"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] uppercase tracking-wider text-[#8C8175] font-semibold block mb-1">
                Primary CTA Button Text
              </label>
              <input
                type="text"
                value={formConfig.heroCtaText}
                onChange={(e) => setFormConfig({ ...formConfig, heroCtaText: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-[#FAF7F2] border border-[#D8C9B5] rounded-xs focus:border-[#211C19] focus:outline-hidden"
              />
            </div>
            <div>
              <label className="text-[10px] uppercase tracking-wider text-[#8C8175] font-semibold block mb-1">
                Secondary CTA Button Text
              </label>
              <input
                type="text"
                value={formConfig.heroSecondaryCtaText}
                onChange={(e) =>
                  setFormConfig({ ...formConfig, heroSecondaryCtaText: e.target.value })
                }
                className="w-full px-3 py-2 text-xs bg-[#FAF7F2] border border-[#D8C9B5] rounded-xs focus:border-[#211C19] focus:outline-hidden"
              />
            </div>
          </div>
        </div>

        {/* Section Headings CMS */}
        <div className="bg-white/80 backdrop-blur-sm border border-[#D8C9B5]/70 rounded-xs p-6 shadow-2xs space-y-4">
          <div className="flex items-center gap-2.5 pb-2 border-b border-[#D8C9B5]/40">
            <Layers size={16} className="text-[#B69A69]" />
            <h2 className="font-serif text-xl text-[#211C19]">Storefront Section Headings</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] uppercase tracking-wider text-[#8C8175] font-semibold block mb-1">
                Bestsellers Heading
              </label>
              <input
                type="text"
                value={formConfig.bestsellersHeading}
                onChange={(e) =>
                  setFormConfig({ ...formConfig, bestsellersHeading: e.target.value })
                }
                className="w-full px-3 py-2 text-xs bg-[#FAF7F2] border border-[#D8C9B5] rounded-xs focus:border-[#211C19] focus:outline-hidden"
              />
            </div>
            <div>
              <label className="text-[10px] uppercase tracking-wider text-[#8C8175] font-semibold block mb-1">
                Bestsellers Tagline
              </label>
              <input
                type="text"
                value={formConfig.bestsellersSubheading}
                onChange={(e) =>
                  setFormConfig({ ...formConfig, bestsellersSubheading: e.target.value })
                }
                className="w-full px-3 py-2 text-xs bg-[#FAF7F2] border border-[#D8C9B5] rounded-xs focus:border-[#211C19] focus:outline-hidden"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] uppercase tracking-wider text-[#8C8175] font-semibold block mb-1">
                Anthology Collection Heading
              </label>
              <input
                type="text"
                value={formConfig.collectionHeading}
                onChange={(e) =>
                  setFormConfig({ ...formConfig, collectionHeading: e.target.value })
                }
                className="w-full px-3 py-2 text-xs bg-[#FAF7F2] border border-[#D8C9B5] rounded-xs focus:border-[#211C19] focus:outline-hidden"
              />
            </div>
            <div>
              <label className="text-[10px] uppercase tracking-wider text-[#8C8175] font-semibold block mb-1">
                Newsletter Invitation Heading
              </label>
              <input
                type="text"
                value={formConfig.newsletterHeading}
                onChange={(e) =>
                  setFormConfig({ ...formConfig, newsletterHeading: e.target.value })
                }
                className="w-full px-3 py-2 text-xs bg-[#FAF7F2] border border-[#D8C9B5] rounded-xs focus:border-[#211C19] focus:outline-hidden"
              />
            </div>
          </div>
        </div>

        {/* Save Bar */}
        <div className="p-4 bg-white/80 border border-[#D8C9B5] rounded-xs flex items-center justify-between">
          <span className="text-xs text-[#8C8175]">
            Edits immediately propagate across public boutique pages.
          </span>
          <button
            type="submit"
            className="btn-luxury-primary text-xs py-2.5 px-6 cursor-pointer flex items-center gap-2"
          >
            <Save size={14} />
            <span>SAVE STOREFRONT CONTENT</span>
          </button>
        </div>
      </form>
    </div>
  );
};
