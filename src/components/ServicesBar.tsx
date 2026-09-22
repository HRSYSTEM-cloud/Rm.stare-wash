import { SERVICES_HIGHLIGHTS } from '../data/branches';
import { Sparkles, Shield, Car, Zap, Droplets, Clock } from 'lucide-react';

const iconMap: Record<string, any> = {
  Sparkles: Sparkles,
  Shield: Shield,
  Car: Car,
  Zap: Zap,
  Droplets: Droplets,
  Clock: Clock,
};

export function ServicesBar() {
  return (
    <section className="w-full max-w-md mx-auto px-4 py-3 relative z-10">
      <div className="rounded-2xl p-4 bg-[#090e1b] border border-blue-500/20 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-cyan-300 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>خدمات الغسيل المتكاملة</span>
          </span>
          <span className="text-[10px] text-blue-300/80 font-semibold">
            أعلى معايير الجودة
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          {SERVICES_HIGHLIGHTS.map((srv) => {
            const IconComp = iconMap[srv.icon] || Sparkles;
            return (
              <div
                key={srv.id}
                className="p-2.5 rounded-xl bg-[#0c1426] border border-blue-900/30 flex items-start gap-2 text-right"
              >
                <div className="w-7 h-7 rounded-lg bg-blue-950 border border-blue-500/30 flex items-center justify-center text-cyan-300 shrink-0 mt-0.5">
                  <IconComp className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white leading-tight">
                    {srv.title}
                  </h4>
                  <p className="text-[10px] text-slate-400 leading-tight mt-0.5">
                    {srv.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
