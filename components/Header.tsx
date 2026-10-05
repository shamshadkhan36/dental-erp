'use client';

import React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Sparkles, RotateCcw, Plus } from 'lucide-react';
import { Button } from './ui/Button';
import { useERPStore } from '../lib/store';

export function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const { resetToDefaults } = useERPStore();

  const getPageTitle = () => {
    switch (pathname) {
      case '/': return { title: 'Dashboard', subtitle: 'A clear view of your practice content and performance' };
      case '/brand-intake': return { title: 'Client & Brand Intake', subtitle: 'Formulate brand voice, patient personas, clinical treatment USPs, and system prompts' };
      case '/calendar': return { title: 'Content Calendar Planner', subtitle: 'Manage monthly content pillars, topics, formats, and scheduled publication slots' };
      case '/copywriter': return { title: 'AI Copywriter Studio', subtitle: 'Generate high-converting hooks, medical captions, carousels, and video reel scripts' };
      case '/creative': return { title: 'Creative Operations & Flyer Studio', subtitle: 'Assemble on-brand visual assets, treatment graphics, and standalone clinic flyers' };
      case '/approvals': return { title: 'Quality Check & Approvals Queue', subtitle: 'Automated compliance rule validation and clinical doctor sign-off' };
      case '/delivery': return { title: 'Approved Content & Meta Delivery', subtitle: 'Scheduled queue, instant asset downloads, and Facebook/Instagram publishing' };
      case '/analytics': return { title: 'Analytics & Practice Growth Insights', subtitle: 'Post reach, engagement metrics, patient inquiries, and AI learning loop' };
      case '/integrations': return { title: 'Automations & Integration Hub', subtitle: 'Meta Graph API, Google Drive sync, WhatsApp lead routing, and DM bots' };
      default: return { title: 'Dental ERP Operations', subtitle: 'Social Media & Creative Operations Automation' };
    }
  };

  const { title, subtitle } = getPageTitle();

  return (
    <header className="bg-white border-b border-[#e8eeeb] sticky top-0 z-30 px-7 py-3.5 flex flex-col md:flex-row md:items-center justify-between gap-3">
      <div>
        <div className="flex items-center gap-2.5">
          <h1 className="text-[15px] font-semibold text-[#304a43] tracking-tight">{title}</h1>
        </div>
        <p className="text-[11px] text-[#879790] mt-0.5">{subtitle}</p>
      </div>

      <div className="flex items-center gap-3 shrink-0">
        {/* Connected Channels indicator */}
        <div className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 bg-[#f5f9f7] border border-[#e2ebe8] rounded-lg text-xs text-slate-600">
          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          <span className="font-semibold text-slate-700">Meta (IG + FB)</span>
          <span className="text-slate-300">|</span>
          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          <span className="font-semibold text-slate-700">GDrive</span>
        </div>

        {/* Quick Generator Button */}
        <Button
          size="sm"
          variant="primary"
          onClick={() => router.push('/copywriter')}
          className="shadow-sm shadow-emerald-900/10"
        >
          <Sparkles className="w-3.5 h-3.5 mr-1 text-sky-200" />
          AI Generator
        </Button>

        {/* Quick Flyer Button */}
        <Button
          size="sm"
          variant="outline"
          onClick={() => router.push('/creative?tab=flyers')}
        >
          <Plus className="w-3.5 h-3.5 mr-1 text-slate-500" />
          New Flyer
        </Button>

        {/* Reset Demo State Button */}
        <Button
          size="sm"
          variant="ghost"
          onClick={() => {
            if (confirm("Reset all data to default dental clinic showcase state?")) {
              resetToDefaults();
            }
          }}
          title="Reset to default demo data"
          className="text-slate-400 hover:text-slate-700"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </Button>
      </div>
    </header>
  );
}
