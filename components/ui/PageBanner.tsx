import React from 'react';
import type { LucideIcon } from 'lucide-react';

interface PageBannerProps {
  eyebrow: string;
  title: string;
  description: string;
  icon: LucideIcon;
  action?: React.ReactNode;
}

export function PageBanner({ eyebrow, title, description, icon: Icon, action }: PageBannerProps) {
  return (
    <section className="relative overflow-hidden flex flex-col sm:flex-row sm:items-center justify-between gap-5 rounded-[1.65rem] border border-[#e1ebe5] bg-gradient-to-br from-white via-white to-[#f0f8f3] px-5 py-5 sm:px-7 sm:py-6 shadow-[0_8px_26px_rgba(27,70,53,.045)]">
      <div className="absolute -right-12 -top-24 h-56 w-56 rounded-full border-[28px] border-[#e5f2ea]/70 pointer-events-none" />
      <div className="relative flex items-center gap-4 min-w-0">
        <span className="hidden sm:flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#e7f4ec] text-[#267a60] ring-1 ring-inset ring-[#d6eade]"><Icon className="h-5 w-5" /></span>
        <div className="min-w-0">
          <div className="mb-1 text-[10px] font-bold uppercase tracking-[.16em] text-[#398673]">{eyebrow}</div>
          <h2 className="text-lg sm:text-xl font-semibold leading-tight text-[#263f36]">{title}</h2>
          <p className="mt-1 text-xs sm:text-[13px] leading-relaxed text-[#788b82]">{description}</p>
        </div>
      </div>
      {action && <div className="relative flex shrink-0 flex-wrap items-center gap-2">{action}</div>}
    </section>
  );
}
