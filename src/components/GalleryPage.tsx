import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Image as ImageIcon,
  Video,
  Play,
  X,
  Sparkles,
  ExternalLink,
  Camera,
  Maximize2,
  Film,
} from 'lucide-react';
import { Language } from '../data/translations';
import { GalleryMediaItem, DEFAULT_GALLERY_ITEMS } from '../data/customization';

interface GalleryPageProps {
  lang: Language;
  items?: GalleryMediaItem[];
}

export function GalleryPage({ lang, items }: GalleryPageProps) {
  const [filter, setFilter] = useState<'all' | 'image' | 'video'>('all');
  const [selectedMedia, setSelectedMedia] = useState<GalleryMediaItem | null>(null);

  const mediaList = items && items.length > 0 ? items : DEFAULT_GALLERY_ITEMS;

  const filteredItems = mediaList.filter((item) => {
    if (filter === 'all') return true;
    return item.type === filter;
  });

  return (
    <div className="space-y-4 pt-1 animate-fadeIn pb-8 text-start">
      {/* 1. Header */}
      <div className="text-center space-y-1">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-950/70 border border-blue-500/40 text-cyan-300 text-xs font-bold shadow-sm">
          <Camera className="w-3.5 h-3.5 text-cyan-400" />
          <span>{lang === 'ar' ? 'معرض الصور والفيديوهات' : 'Photo & Video Gallery'}</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-black text-white">
          {lang === 'ar' ? 'أعمالنا وجودة غسيلنا على الطبيعة' : 'Our Work & Wash Showcase'}
        </h2>
        <p className="text-xs text-slate-300">
          {lang === 'ar'
            ? 'شاهد جودة الغسيل الفاخر، رغوة الشامبو، وتعقيم البخار وتلميع سيارات عملائنا'
            : 'Explore our premium wash results, Lifelines foam, steam sanitization & tire detailing'}
        </p>
      </div>

      {/* 2. Filter Tabs */}
      <div className="flex items-center justify-center gap-1.5 p-1 bg-black/60 rounded-xl border border-blue-950 max-w-xs mx-auto">
        <button
          type="button"
          onClick={() => setFilter('all')}
          className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
            filter === 'all'
              ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-sm font-black'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <span>{lang === 'ar' ? 'الكل' : 'All'}</span>
          <span className="text-[10px] opacity-75">({mediaList.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setFilter('image')}
          className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
            filter === 'image'
              ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-sm font-black'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <ImageIcon className="w-3.5 h-3.5" />
          <span>{lang === 'ar' ? 'صور' : 'Photos'}</span>
          <span className="text-[10px] opacity-75">
            ({mediaList.filter((m) => m.type === 'image').length})
          </span>
        </button>

        <button
          type="button"
          onClick={() => setFilter('video')}
          className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
            filter === 'video'
              ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-sm font-black'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Film className="w-3.5 h-3.5" />
          <span>{lang === 'ar' ? 'فيديوهات' : 'Videos'}</span>
          <span className="text-[10px] opacity-75">
            ({mediaList.filter((m) => m.type === 'video').length})
          </span>
        </button>
      </div>

      {/* 3. Media Grid */}
      {filteredItems.length === 0 ? (
        <div className="p-8 text-center rounded-2xl bg-black/40 border border-slate-800 text-slate-400 text-xs">
          {lang === 'ar' ? 'لا توجد وسائط مضافة حالياً في هذا القسم' : 'No media items found in this section'}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {filteredItems.map((item, index) => {
            const isVideo = item.type === 'video';
            const hasValidImage = item.thumbnailUrl || (!isVideo && item.url);

            return (
              <motion.div
                key={item.id || index}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.25, delay: index * 0.04 }}
                onClick={() => setSelectedMedia(item)}
                className="group relative cursor-pointer overflow-hidden rounded-2xl bg-[#091124] border border-blue-900/40 hover:border-cyan-400/60 shadow-md hover:shadow-[0_0_20px_rgba(0,180,255,0.25)] transition-all flex flex-col justify-between"
              >
                {/* Media Image / Thumbnail */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-black/80 flex items-center justify-center">
                  {hasValidImage ? (
                    <img
                      src={item.thumbnailUrl || item.url}
                      alt={item.titleAr}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-[#0c1936] via-[#071126] to-[#040814] flex flex-col items-center justify-center p-4">
                      <Film className="w-10 h-10 text-cyan-400/60 mb-1" />
                      <span className="text-[10px] text-cyan-300 font-bold opacity-80">RM.STAR VIDEO</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent" />

                  {/* Top Badge: Photo or Video */}
                  <div className="absolute top-2.5 start-2.5 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-black/75 backdrop-blur-md border border-white/20 text-white text-[10px] font-bold">
                    {isVideo ? (
                      <>
                        <Video className="w-3 h-3 text-red-400" />
                        <span>{lang === 'ar' ? 'فيديو' : 'Video'}</span>
                      </>
                    ) : (
                      <>
                        <ImageIcon className="w-3 h-3 text-cyan-400" />
                        <span>{lang === 'ar' ? 'صورة' : 'Photo'}</span>
                      </>
                    )}
                  </div>

                  {/* Play Button Overlay for Videos */}
                  {isVideo && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-red-600/90 group-hover:bg-red-500 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                        <Play className="w-5 h-5 fill-white ms-0.5" />
                      </div>
                    </div>
                  )}

                  {/* Fullscreen icon indicator */}
                  <div className="absolute top-2.5 end-2.5 w-7 h-7 rounded-full bg-black/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Maximize2 className="w-3.5 h-3.5" />
                  </div>

                  {/* Bottom title inside thumbnail */}
                  <div className="absolute bottom-2.5 start-3 end-3">
                    <h4 className="text-xs sm:text-sm font-black text-white leading-tight drop-shadow-md">
                      {lang === 'ar' ? item.titleAr : item.titleEn}
                    </h4>
                  </div>
                </div>

                {/* Subtitle / Description */}
                {item.descAr && (
                  <div className="p-2.5 text-[11px] text-slate-300 line-clamp-2 leading-relaxed bg-[#080e1c]">
                    {lang === 'ar' ? item.descAr : item.descEn}
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      )}

      {/* 4. Lightbox Modal */}
      <AnimatePresence>
        {selectedMedia && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-5"
            onClick={() => setSelectedMedia(null)}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl bg-[#091122] rounded-2xl border border-cyan-500/40 overflow-hidden shadow-[0_0_35px_rgba(0,180,255,0.3)] text-start space-y-3"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setSelectedMedia(null)}
                className="absolute top-3 end-3 z-10 p-1.5 rounded-full bg-black/70 text-white hover:bg-red-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Media Player or Large Image */}
              <div className="relative w-full max-h-[65vh] bg-black flex items-center justify-center overflow-hidden">
                {selectedMedia.type === 'video' ? (
                  selectedMedia.url.startsWith('data:video') ||
                  selectedMedia.url.endsWith('.mp4') ||
                  selectedMedia.url.endsWith('.webm') ||
                  selectedMedia.url.endsWith('.mov') ||
                  selectedMedia.url.includes('.mp4?') ||
                  selectedMedia.url.includes('imgur.com') ? (
                    <video
                      src={selectedMedia.url}
                      controls
                      autoPlay
                      className="w-full max-h-[60vh] object-contain"
                    />
                  ) : selectedMedia.url.includes('youtube.com') || selectedMedia.url.includes('youtu.be') ? (
                    <iframe
                      src={
                        selectedMedia.url.includes('embed')
                          ? selectedMedia.url
                          : selectedMedia.url.replace('watch?v=', 'embed/')
                      }
                      title={selectedMedia.titleAr}
                      className="w-full aspect-[16/9] border-0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    <div className="relative w-full aspect-[16/9] flex flex-col items-center justify-center gap-3 p-4 bg-gradient-to-b from-[#0b1428] to-black">
                      <img
                        src={selectedMedia.thumbnailUrl || selectedMedia.url}
                        alt={selectedMedia.titleAr}
                        className="absolute inset-0 w-full h-full object-cover opacity-40"
                      />
                      <div className="relative z-10 text-center space-y-2">
                        <div className="w-14 h-14 rounded-full bg-red-600 flex items-center justify-center mx-auto text-white shadow-lg">
                          <Play className="w-6 h-6 fill-white ms-1" />
                        </div>
                        <a
                          href={selectedMedia.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500 text-black font-extrabold text-xs shadow-md"
                        >
                          <span>{lang === 'ar' ? 'تشغيل المقطع في نافذة جديدة' : 'Open Video in New Tab'}</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>
                  )
                ) : (
                  <img
                    src={selectedMedia.url}
                    alt={selectedMedia.titleAr}
                    className="w-full max-h-[60vh] object-contain"
                  />
                )}
              </div>

              {/* Media Info Footer */}
              <div className="p-4 pt-1 space-y-1">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-sm sm:text-base font-black text-white">
                    {lang === 'ar' ? selectedMedia.titleAr : selectedMedia.titleEn}
                  </h3>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-950 text-cyan-300 border border-blue-500/30 font-bold">
                    {selectedMedia.type === 'video'
                      ? lang === 'ar'
                        ? 'فيديو'
                        : 'Video'
                      : lang === 'ar'
                      ? 'صورة'
                      : 'Photo'}
                  </span>
                </div>
                {selectedMedia.descAr && (
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {lang === 'ar' ? selectedMedia.descAr : selectedMedia.descEn}
                  </p>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
