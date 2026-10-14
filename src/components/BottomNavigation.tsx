import React, { useEffect, useRef } from 'react';
import {
  Home,
  Tag,
  Sparkles,
  MapPin,
  Camera,
  Star,
} from 'lucide-react';
import { Language } from '../data/translations';
import { AppPage } from '../App';

interface BottomNavigationProps {
  lang: Language;
  currentPage: AppPage;
  onNavigatePage: (page: AppPage) => void;
  showGalleryTab?: boolean;
  showReviewsTab?: boolean;
}

interface NavButtonConfig {
  id: AppPage;
  emoji: string;
  icon: React.ComponentType<{ className?: string }>;
  labelAr: string;
  labelEn: string;
}

export function BottomNavigation({
  lang,
  currentPage,
  onNavigatePage,
  showGalleryTab = true,
  showReviewsTab = true,
}: BottomNavigationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<{ [key in AppPage]?: HTMLButtonElement | null }>({});

  const buttons: NavButtonConfig[] = [
    {
      id: 'home',
      emoji: '🏠',
      icon: Home,
      labelAr: 'الرئيسية',
      labelEn: 'Home',
    },
    {
      id: 'pricing',
      emoji: '💰',
      icon: Tag,
      labelAr: 'الأسعار والخدمات',
      labelEn: 'Pricing',
    },
    {
      id: 'features',
      emoji: '✨',
      icon: Sparkles,
      labelAr: 'المميزات والولاء',
      labelEn: 'Features',
    },
    {
      id: 'branches',
      emoji: '📍',
      icon: MapPin,
      labelAr: 'فروعنا بجدة',
      labelEn: 'Branches',
    },
    ...(showGalleryTab !== false
      ? [
          {
            id: 'gallery' as AppPage,
            emoji: '📸',
            icon: Camera,
            labelAr: 'المعرض',
            labelEn: 'Gallery',
          },
        ]
      : []),
    ...(showReviewsTab !== false
      ? [
          {
            id: 'reviews' as AppPage,
            emoji: '⭐',
            icon: Star,
            labelAr: 'آراء العملاء',
            labelEn: 'Reviews',
          },
        ]
      : []),
  ];

  // Auto-center the active button in the scrollable bottom dock on mobile
  useEffect(() => {
    const activeBtnEl = buttonRefs.current[currentPage];
    const container = containerRef.current;
    if (activeBtnEl && container) {
      const containerRect = container.getBoundingClientRect();
      const btnRect = activeBtnEl.getBoundingClientRect();
      const scrollOffset =
        btnRect.left -
        containerRect.left -
        containerRect.width / 2 +
        btnRect.width / 2;

      container.scrollBy({ left: scrollOffset, behavior: 'smooth' });
    }
  }, [currentPage]);

  const handleButtonClick = (pageId: AppPage) => {
    onNavigatePage(pageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav
      aria-label={lang === 'ar' ? 'أزرار التنقل الرئيسية أسفل الشاشة' : 'Bottom navigation buttons'}
      className="fixed bottom-0 left-0 right-0 z-40 pointer-events-none pb-[max(8px,env(safe-area-inset-bottom,8px))] pt-1 px-2 sm:px-4"
    >
      <div className="max-w-4xl mx-auto pointer-events-auto">
        {/* Ambient Neon Glow behind the buttons dock */}
        <div className="relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/30 via-cyan-400/40 to-blue-600/30 rounded-2xl blur-lg opacity-70 pointer-events-none" />

          {/* Buttons Container: Flex dock with tactile, distinct button tiles */}
          <div
            ref={containerRef}
            className="relative flex items-center justify-start md:justify-center gap-1.5 sm:gap-2 p-2 rounded-2xl bg-[#060913]/95 backdrop-blur-2xl border border-cyan-400/35 shadow-[0_8px_30px_rgba(0,0,0,0.85)] overflow-x-auto scrollbar-none touch-manipulation select-none"
            dir={lang === 'ar' ? 'rtl' : 'ltr'}
          >
            {buttons.map((btn) => {
              const Icon = btn.icon;
              const isActive = currentPage === btn.id;

              return (
                <button
                  key={btn.id}
                  ref={(el) => {
                    buttonRefs.current[btn.id] = el;
                  }}
                  type="button"
                  onClick={() => handleButtonClick(btn.id)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`group relative flex items-center gap-1.5 sm:gap-2 px-3 py-2 sm:px-4 sm:py-2.5 rounded-xl transition-all duration-200 cursor-pointer whitespace-nowrap shrink-0 active:scale-95 touch-manipulation border ${
                    isActive
                      ? 'bg-gradient-to-r from-cyan-500 via-blue-600 to-blue-700 text-white border-cyan-300 shadow-[0_0_18px_rgba(6,182,212,0.55)] font-black'
                      : 'bg-slate-900/90 text-slate-300 border-slate-800 hover:border-cyan-500/50 hover:bg-slate-800/90 hover:text-white'
                  }`}
                >
                  {/* Emoji & Icon Container */}
                  <div className="flex items-center gap-1">
                    <span className="text-xs sm:text-sm select-none" role="img" aria-hidden="true">
                      {btn.emoji}
                    </span>
                    <Icon
                      className={`w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-200 ${
                        isActive
                          ? 'text-cyan-100 scale-110 drop-shadow-[0_0_6px_#ffffff]'
                          : 'text-slate-400 group-hover:text-cyan-300'
                      }`}
                    />
                  </div>

                  {/* Button Label Text */}
                  <span
                    className={`text-[11px] sm:text-xs font-['Alexandria',sans-serif] tracking-tight ${
                      isActive ? 'font-black text-white' : 'font-semibold'
                    }`}
                  >
                    {lang === 'ar' ? btn.labelAr : btn.labelEn}
                  </span>

                  {/* Active Indicator Glow Dot */}
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-200 shadow-[0_0_6px_#38bdf8] animate-pulse" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
