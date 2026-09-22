import { motion } from 'motion/react';
import { Home, Tag, MapPin, Sparkles, Star, Share2 } from 'lucide-react';
import { Language, translations } from '../data/translations';

export type PageTab = 'home' | 'prices' | 'branches' | 'services' | 'reviews' | 'links';

interface BottomNavigationProps {
  currentTab: PageTab;
  onTabChange: (tab: PageTab) => void;
  lang: Language;
}

export function BottomNavigation({ currentTab, onTabChange, lang }: BottomNavigationProps) {
  const t = translations[lang];

  const tabs = [
    { id: 'home' as PageTab, label: t.tabHome, icon: Home },
    { id: 'prices' as PageTab, label: t.tabPrices, icon: Tag, badge: 'جديد' },
    { id: 'branches' as PageTab, label: t.tabBranches, icon: MapPin, badge: '24h' },
    { id: 'services' as PageTab, label: t.tabServices, icon: Sparkles },
    { id: 'reviews' as PageTab, label: t.tabReview, icon: Star },
    { id: 'links' as PageTab, label: t.tabLinks, icon: Share2 },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 p-1.5 pointer-events-none">
      <div className="w-full max-w-md mx-auto pointer-events-auto">
        <div className="flex items-center justify-between p-1 rounded-2xl bg-[#070b16]/95 backdrop-blur-xl border border-cyan-400/30 shadow-[0_0_25px_rgba(0,102,255,0.35)]">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = currentTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => {
                  onTabChange(tab.id);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`relative flex flex-col items-center justify-center flex-1 py-1 px-0.5 rounded-xl transition-all ${
                  isActive
                    ? 'text-cyan-300 font-bold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTabPill"
                    className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-600/40 via-cyan-500/30 to-blue-600/40 border border-cyan-400/50 shadow-[0_0_12px_rgba(0,210,255,0.4)]"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}

                <div className="relative flex items-center justify-center">
                  <Icon className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isActive ? 'text-cyan-300 drop-shadow-[0_0_8px_#00e5ff]' : ''}`} />
                  {tab.badge && !isActive && (
                    <span className="absolute -top-1 -right-2 px-1 py-0.2 rounded-full bg-cyan-400 text-black text-[7px] font-black leading-none">
                      {tab.badge}
                    </span>
                  )}
                </div>

                <span className="relative text-[9px] sm:text-[10px] mt-0.5 whitespace-nowrap tracking-tight">
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
