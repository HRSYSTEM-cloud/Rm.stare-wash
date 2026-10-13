import React from 'react';
import { ExternalLink, Share2 } from 'lucide-react';
import { Language } from '../data/translations';
import { AppCustomization } from '../data/customization';
import { getDynamicSocialLinks } from '../data/branches';

interface LuxurySocialsProps {
  lang: Language;
  customData: AppCustomization;
}

export function LuxurySocials({ lang, customData }: LuxurySocialsProps) {
  const socialLinks = getDynamicSocialLinks(customData);

  if (socialLinks.length === 0) return null;

  const getPlatformStyle = (iconName: string) => {
    switch (iconName) {
      case 'tiktok':
        return 'bg-slate-900/90 border-slate-700 text-white hover:border-cyan-400 hover:text-cyan-300';
      case 'snapchat':
        return 'bg-amber-950/40 border-amber-500/30 text-amber-300 hover:bg-amber-900/50';
      case 'instagram':
        return 'bg-pink-950/40 border-pink-500/30 text-pink-300 hover:bg-pink-900/50';
      case 'twitter':
        return 'bg-slate-900 border-slate-700 text-white hover:border-slate-500';
      case 'youtube':
        return 'bg-red-950/40 border-red-500/30 text-red-300 hover:bg-red-900/50';
      default:
        return 'bg-blue-950/40 border-blue-500/30 text-cyan-300 hover:bg-blue-900/50';
    }
  };

  return (
    <section className="py-6 relative bg-[#05070c] border-t border-slate-900">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-400 text-xs font-bold mb-3">
          <Share2 className="w-3.5 h-3.5" />
          <span>{lang === 'ar' ? 'تابعنا على منصات التواصل' : 'Follow Our Social Channels'}</span>
        </div>

        <h3 className="font-['Alexandria',sans-serif] text-xl sm:text-2xl font-black text-white mb-2">
          {lang === 'ar' ? 'ابقَ على تواصل مع RM.STAR' : 'Stay Connected With Us'}
        </h3>

        <p className="text-xs text-slate-400 max-w-md mx-auto mb-6">
          {lang === 'ar'
            ? 'تابع أحدث عروضنا، مسابقاتنا الحصرية، وفيديوهات وتجارب الغسيل اليومية.'
            : 'Explore daily washes, ongoing deals, and exclusive competitions.'}
        </p>

        {/* Dynamic Social Links Grid */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 max-w-2xl mx-auto">
          {socialLinks.map((link) => (
            <a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border font-['Alexandria',sans-serif] text-xs font-bold transition-all hover:scale-105 active:scale-95 shadow-sm ${getPlatformStyle(
                link.iconName
              )}`}
            >
              <span>{link.title}</span>
              <ExternalLink className="w-3 h-3 opacity-70" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
