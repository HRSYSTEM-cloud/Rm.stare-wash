import React, { useState } from 'react';
import { Camera, Play, X, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import { Language } from '../data/translations';
import { GalleryMediaItem, DEFAULT_GALLERY_ITEMS } from '../data/customization';

interface LuxuryGalleryProps {
  lang: Language;
  items?: GalleryMediaItem[];
}

export function LuxuryGallery({ lang, items = DEFAULT_GALLERY_ITEMS }: LuxuryGalleryProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeMedia, setActiveMedia] = useState<GalleryMediaItem | null>(null);

  const displayItems = items && items.length > 0 ? items : DEFAULT_GALLERY_ITEMS;

  const categories = [
    { id: 'all', labelAr: 'الكل', labelEn: 'All' },
    { id: 'wash', labelAr: 'رغوة وغسيل', labelEn: 'Wash & Foam' },
    { id: 'detailing', labelAr: 'تلميع وجنوط', labelEn: 'Detailing' },
    { id: 'steam', labelAr: 'بخار وتعقيم', labelEn: 'Steam Care' },
    { id: 'facility', labelAr: 'المسارات والصالة', labelEn: 'Facility' },
  ];

  const filteredItems =
    selectedCategory === 'all'
      ? displayItems
      : displayItems.filter((i) => (i.category || 'wash') === selectedCategory);

  return (
    <section id="gallery" className="py-10 sm:py-14 relative bg-gradient-to-b from-[#05070c] via-[#070b16] to-[#05070c] scroll-mt-20">
      <div className="max-w-5xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 text-xs font-bold mb-3">
            <Camera className="w-3.5 h-3.5" />
            <span>{lang === 'ar' ? 'معرض الأعمال الواقعي' : 'Real Life Gallery'}</span>
          </div>

          <h2 className="font-['Cairo',sans-serif] text-2xl sm:text-3xl font-bold text-white tracking-normal mb-2">
            {lang === 'ar' ? 'من داخل صالات ومسارات RM.STAR' : 'From Inside RM.STAR Facilities'}
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {lang === 'ar'
              ? 'شاهد كثافة الرغوة، نظافة وتلميع المحركات والجنوط، والنتائج المبهرة لسيارات عملائنا في جدة.'
              : 'Glimpse the rich foam coverage, wheel shine, and pristine showroom finish.'}
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-['Alexandria',sans-serif] font-bold transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/25'
                  : 'bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {lang === 'ar' ? cat.labelAr : cat.labelEn}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveMedia(item)}
              className="group relative rounded-2xl overflow-hidden aspect-[4/3] bg-slate-950 border border-slate-800/80 hover:border-cyan-400/50 cursor-pointer shadow-lg transition-all"
            >
              <img
                src={item.type === 'video' ? (item.thumbnailUrl || item.url) : item.url}
                alt={item.titleAr}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />

              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

              {/* Video Play Badge */}
              {item.type === 'video' && (
                <div className="absolute top-3 left-3 w-8 h-8 rounded-full bg-cyan-500 text-slate-950 flex items-center justify-center shadow-lg">
                  <Play className="w-4 h-4 fill-slate-950 translate-x-0.5" />
                </div>
              )}

              {/* Caption */}
              <div className="absolute bottom-3 right-3 left-3 text-right">
                <h4 className="font-['Alexandria',sans-serif] font-bold text-sm text-white drop-shadow truncate">
                  {lang === 'ar' ? item.titleAr : item.titleEn}
                </h4>
                {item.descAr && (
                  <p className="text-[11px] text-slate-300 line-clamp-1 mt-0.5">
                    {lang === 'ar' ? item.descAr : item.descEn}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {activeMedia && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setActiveMedia(null)}
        >
          <button
            onClick={() => setActiveMedia(null)}
            className="absolute top-5 right-5 w-10 h-10 rounded-full bg-slate-900/80 border border-slate-700 text-white flex items-center justify-center hover:bg-slate-800 z-10"
          >
            <X className="w-5 h-5" />
          </button>

          <div
            className="max-w-4xl w-full max-h-[85vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            {activeMedia.type === 'video' && activeMedia.url.includes('.mp4') ? (
              <video
                src={activeMedia.url}
                controls
                autoPlay
                className="max-w-full max-h-[70vh] rounded-2xl shadow-2xl"
              />
            ) : (
              <img
                src={activeMedia.url}
                alt={activeMedia.titleAr}
                className="max-w-full max-h-[70vh] object-contain rounded-2xl shadow-2xl"
              />
            )}

            <div className="mt-4 text-center text-white">
              <h3 className="font-['Alexandria',sans-serif] font-bold text-lg text-cyan-300">
                {lang === 'ar' ? activeMedia.titleAr : activeMedia.titleEn}
              </h3>
              {activeMedia.descAr && (
                <p className="text-sm text-slate-300 max-w-lg mt-1">
                  {lang === 'ar' ? activeMedia.descAr : activeMedia.descEn}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
