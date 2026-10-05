'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Sparkles, RotateCcw, Plus, Check } from 'lucide-react';
import { Button } from './ui/Button';
import { useERPStore } from '../lib/store';

export function Header() {
  const router = useRouter();
  const { resetToDefaults } = useERPStore();

  return (
    <header className="bg-white/95 backdrop-blur border-b border-[#e8eeeb] sticky top-0 z-30 px-4 sm:px-7 py-3 flex flex-wrap items-center justify-between gap-3">
      <div className="flex items-center gap-2.5 text-xs font-medium text-[#61776d]">
        <span className="w-8 h-8 rounded-xl bg-[#eaf5ef] text-[#287a61] flex items-center justify-center"><Check className="w-4 h-4" /></span>
        <span>Practice workspace</span>
        <span className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-[#e5eee8] bg-[#f8fbf9] px-2.5 py-1 text-[10px] text-[#55806b]"><span className="w-1.5 h-1.5 rounded-full bg-[#54a77b]" />Channels ready</span>
      </div>

      <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
        <Button size="sm" variant="primary" onClick={() => router.push('/copywriter')} className="shadow-sm shadow-emerald-900/10">
          <Sparkles className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">AI Generator</span><span className="sm:hidden">Create</span>
        </Button>
        <Button size="sm" variant="outline" onClick={() => router.push('/creative?tab=flyers')}>
          <Plus className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">New Flyer</span>
        </Button>
        <Button size="sm" variant="ghost" onClick={() => {
          if (confirm('Reset all data to default dental clinic showcase state?')) resetToDefaults();
        }} title="Reset to default demo data" aria-label="Reset demo data" className="text-slate-400 hover:text-slate-700 px-2.5">
          <RotateCcw className="w-3.5 h-3.5" />
        </Button>
      </div>
    </header>
  );
}
