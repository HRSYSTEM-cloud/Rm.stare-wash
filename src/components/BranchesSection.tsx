import { useState } from 'react';
import { BRANCHES } from '../data/branches';
import { BranchCard } from './BranchCard';
import { MapPin, Navigation, Clock } from 'lucide-react';
import { Language, translations } from '../data/translations';

interface BranchesSectionProps {
  highlightedBranchId?: string;
  lang: Language;
}

export function BranchesSection({ highlightedBranchId, lang }: BranchesSectionProps) {
  const [activeTab, setActiveTab] = useState<'all' | 'al-rabwah' | 'al-qurayniyyah'>('all');
  const t = translations[lang];

  const filteredBranches =
    activeTab === 'all'
      ? BRANCHES
      : BRANCHES.filter((b) => b.id === activeTab);

  return (
    <section id="branches-section" className="w-full max-w-md mx-auto px-1 py-2 space-y-3 relative z-10">
      {/* Section Title */}
      <div className="text-center space-y-1">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-950/60 border border-blue-500/30 text-cyan-300 text-xs font-bold">
          <MapPin className="w-3.5 h-3.5 text-cyan-400" />
          <span>{t.branchesTitle}</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-black text-white">
          {lang === 'ar' ? 'اختر الفرع الأقرب إليك' : 'Find Your Nearest Location'}
        </h2>
        <p className="text-xs text-slate-300/80">
          {t.branchesSubtitle}
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-center p-1 rounded-xl bg-[#0a0f1d] border border-blue-500/30 text-xs">
        <button
          onClick={() => setActiveTab('all')}
          className={`flex-1 py-2 px-2 rounded-lg font-bold transition-all ${
            activeTab === 'all'
              ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-[0_0_12px_rgba(0,150,255,0.5)]'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          {t.allBranchesTab}
        </button>
        <button
          onClick={() => setActiveTab('al-rabwah')}
          className={`flex-1 py-2 px-2 rounded-lg font-bold transition-all ${
            activeTab === 'al-rabwah'
              ? 'bg-gradient-to-r from-red-600 to-red-500 text-white shadow-[0_0_12px_rgba(239,68,68,0.5)]'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          {t.branchRabwahTab}
        </button>
        <button
          onClick={() => setActiveTab('al-qurayniyyah')}
          className={`flex-1 py-2 px-2 rounded-lg font-bold transition-all ${
            activeTab === 'al-qurayniyyah'
              ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-[0_0_12px_rgba(0,150,255,0.5)]'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          {t.branchQurayniyyahTab}
        </button>
      </div>

      {/* Branches List */}
      <div className="space-y-4">
        {filteredBranches.map((branch) => (
          <BranchCard
            key={branch.id}
            branch={branch}
            isHighlighted={branch.id === highlightedBranchId}
            lang={lang}
          />
        ))}
      </div>
    </section>
  );
}
