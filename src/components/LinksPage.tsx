import { useState } from 'react';
import { ExternalLink, Copy, Check, Share2, Sparkles, MapPin, MessageCircle, Phone, Globe } from 'lucide-react';
import { AppCustomization } from '../data/customization';
import { getDynamicBranches, getDynamicSocialLinks } from '../data/branches';
import { SocialLink } from '../types';

interface LinksPageProps {
  customData?: AppCustomization;
}

export function LinksPage({ customData }: LinksPageProps) {
  const [copied, setCopied] = useState(false);
  const currentUrl = typeof window !== 'undefined' ? window.location.href : 'https://rmstar.sa';

  const socialLinks = getDynamicSocialLinks(customData);
  const branches = getDynamicBranches(customData);

  const handleCopy = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'RM.STAR | STAR CAR WASH',
          text: 'مغسلة آر إم ستار للسيارات في جدة — خدمة 24 ساعة (فرع الربوة وفرع القرينية)',
          url: currentUrl,
        });
      } catch {
        // dismissed
      }
    } else {
      handleCopy();
    }
  };

  // Custom Social Icon Renderer
  const renderSocialIcon = (link: SocialLink) => {
    switch (link.iconName) {
      case 'tiktok':
        return (
          <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
            <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298-.002.595.042.88.13V9.4a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.66a6.34 6.34 0 0 0 10.81 4.47 6.27 6.27 0 0 0 1.86-4.47V8.62a8.27 8.27 0 0 0 4.74 1.48V6.69h-.82Z" />
          </svg>
        );
      case 'snapchat':
        return (
          <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
            <path d="M12.016 2.015c-3.79 0-6.082 2.656-6.082 5.097 0 1.25.5 2.5 1.125 3.375.125.188.125.438 0 .625-.562.875-1.5 1.25-2.25 1.438-.375.063-.563.438-.438.75.313.75 1.313 1.25 2.188 1.438.25.063.375.25.375.5 0 .813-.875 1.688-2.625 2-.438.063-.688.5-.5.875.438.875 2.063 1.188 3.5 1.188.563 0 1.188-.063 1.688-.188.375-.063.75.125.938.438.5 1 1.25 1.438 2.063 1.438s1.563-.438 2.063-1.438c.188-.313.563-.5.938-.438.5.125 1.125.188 1.688.188 1.438 0 3.063-.313 3.5-1.188.188-.375-.063-.813-.5-.875-1.75-.313-2.625-1.188-2.625-2 0-.25.125-.438.375-.5.875-.188 1.875-.688 2.188-1.438.125-.313-.063-.688-.438-.75-.75-.188-1.688-.563-2.25-1.438-.125-.188-.125-.438 0-.625.625-.875 1.125-2.125 1.125-3.375 0-2.441-2.292-5.097-6.082-5.097z" />
          </svg>
        );
      case 'instagram':
        return (
          <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
          </svg>
        );
      case 'twitter':
        return (
          <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        );
      case 'youtube':
        return (
          <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
          </svg>
        );
      case 'facebook':
        return (
          <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
          </svg>
        );
      case 'telegram':
        return (
          <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
            <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
          </svg>
        );
      case 'whatsapp':
        return <MessageCircle className="w-5 h-5" />;
      default:
        return <Globe className="w-5 h-5" />;
    }
  };

  return (
    <div className="space-y-4 pt-1 animate-fadeIn">
      {/* Title */}
      <div className="text-center space-y-1">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-950/60 border border-blue-500/30 text-cyan-300 text-xs font-bold">
          <Share2 className="w-3.5 h-3.5 text-cyan-400" />
          <span>🔗 جميع حساباتنا وروابطنا</span>
        </div>
        <h2 className="text-xl font-black text-white">
          RM.STAR Official Links
        </h2>
        <p className="text-xs text-slate-300">
          تواصل معنا أو تابع جديدنا على منصات التواصل الاجتماعي
        </p>
      </div>

      {/* Links List */}
      <div className="space-y-2.5">
        {socialLinks.map((link) => {
          const isTiktok = link.iconName === 'tiktok';
          const isSnapchat = link.iconName === 'snapchat';
          const isInstagram = link.iconName === 'instagram';
          const isWhatsapp = link.iconName === 'whatsapp';

          return (
            <a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center justify-between p-3.5 rounded-xl border transition-all group ${
                isTiktok
                  ? 'bg-gradient-to-r from-[#070c18] via-[#09152b] to-[#070c18] border-cyan-400/40 hover:border-cyan-300 shadow-[0_0_15px_rgba(0,180,255,0.25)]'
                  : isSnapchat
                    ? 'bg-[#151508] border-yellow-400/40 hover:border-yellow-300 shadow-[0_0_15px_rgba(250,204,21,0.2)]'
                    : isInstagram
                      ? 'bg-[#160a16] border-pink-500/40 hover:border-pink-400 shadow-[0_0_15px_rgba(236,72,153,0.2)]'
                      : isWhatsapp
                        ? 'bg-[#081513] border-emerald-500/30 hover:border-emerald-400 hover:shadow-[0_0_15px_rgba(16,185,129,0.25)]'
                        : 'bg-[#070b16] border-blue-500/30 hover:border-blue-400'
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 ${
                    isTiktok
                      ? 'bg-black border-cyan-400/50 text-white'
                      : isSnapchat
                        ? 'bg-[#ffe600] border-yellow-300 text-black shadow-[0_0_10px_#ffe600]'
                        : isInstagram
                          ? 'bg-gradient-to-tr from-amber-500 via-pink-600 to-purple-600 border-pink-400 text-white'
                          : isWhatsapp
                            ? 'bg-emerald-950 border-emerald-400/50 text-emerald-300'
                            : 'bg-blue-950 border-blue-400/50 text-cyan-300'
                  }`}
                >
                  {renderSocialIcon(link)}
                </div>

                <div>
                  <div className="text-sm font-bold text-white flex items-center gap-1.5">
                    <span>{link.title}</span>
                    {link.highlight && (
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-cyan-400 text-black">
                        الرسمي
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-slate-400 font-mono mt-0.5">
                    {link.subtitle}
                  </div>
                </div>
              </div>

              <div className="p-2 rounded-lg bg-white/5 group-hover:bg-white/10 text-cyan-400 group-hover:translate-x-[-2px] transition-all">
                <ExternalLink className="w-4 h-4" />
              </div>
            </a>
          );
        })}
      </div>

      {/* Direct Google Maps Navigation Card */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-[#09152b] to-[#070e1c] border border-blue-500/30 space-y-2.5">
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-cyan-400" />
          <span className="text-xs font-bold text-white">الوصول المباشر لموقع المغسلة (خرائط Google)</span>
        </div>

        <div className="grid grid-cols-2 gap-2 pt-1">
          {branches.map((branch) => {
            const isRabwah = branch.id === 'al-rabwah';
            return (
              <a
                key={branch.id}
                href={branch.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`p-2.5 rounded-xl border text-center transition-all ${
                  isRabwah
                    ? 'bg-red-950/40 border-red-500/40 text-red-300 hover:border-red-400'
                    : 'bg-blue-950/40 border-blue-500/40 text-blue-300 hover:border-blue-400'
                }`}
              >
                <div className="text-xs font-bold text-white">{branch.name}</div>
                <div className="text-[10px] text-cyan-300 mt-1 font-mono">فتح الخريطة ↗</div>
              </a>
            );
          })}
        </div>
      </div>

      {/* Share / Copy App Link */}
      <div className="p-3.5 rounded-xl bg-[#091021] border border-cyan-400/30 flex items-center justify-between gap-2">
        <div className="text-start">
          <div className="text-xs font-bold text-white">مشاركة صفحة RM.STAR</div>
          <div className="text-[11px] text-slate-400 font-mono truncate max-w-[200px]">
            {currentUrl}
          </div>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={handleCopy}
            className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-1 shadow-[0_0_10px_rgba(0,102,255,0.4)] transition-all"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'تم النسخ' : 'نسخ'}</span>
          </button>
          <button
            onClick={handleShare}
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-cyan-300 transition-colors"
            title="مشاركة"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
