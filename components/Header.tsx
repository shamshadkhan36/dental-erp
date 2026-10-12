'use client';

import React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { 
  Sparkles, 
  RotateCcw, 
  Plus, 
  Instagram,
  Facebook,
  Youtube,
  Menu
} from 'lucide-react';
import { Button } from './ui/Button';
import { Badge } from './ui/Badge';
import { useERPStore } from '../lib/store';
import { useMobileNav } from './MobileNavContext';

export function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const { brand, resetToDefaults } = useERPStore();
  const { toggle } = useMobileNav();

  const getPageTitle = () => {
    switch (pathname) {
      case '/': return { title: 'Executive Operations & Usage', subtitle: 'Command center for clinical patient acquisition, content flow, and credit usage' };
      case '/brand-intake': return { title: 'Client & Brand Intake', subtitle: 'Configure practice persona, patient profiles (ICP with age, pain points, objections, motivations), and offers' };
      case '/calendar': return { title: 'Content Calendar Planner', subtitle: 'Interactive full month & weekly schedule across Instagram, Facebook, and YouTube' };
      case '/copywriter': return { title: 'AI Copywriter Studio', subtitle: 'Generate high-converting dental hooks, captions, carousels, and video reel scripts' };
      case '/creative': return { title: 'Creative Studio (Reels, Story, Wallpaper & Flyers)', subtitle: 'Controlled templates, video overlays (static vs captions), and Drive / AI video generation' };
      case '/approvals': return { title: 'Quality Check & Approvals Queue', subtitle: 'Automated compliance rule validation and clinical doctor sign-off' };
      case '/delivery': return { title: 'Delivery & Multi-Channel Publish', subtitle: 'Scheduled queue, instant asset downloads, Meta (FB & IG) and YouTube publishing' };
      case '/analytics': return { title: 'Analytics & Growth (Organic Only)', subtitle: 'Platform-specific organic insights for Instagram, Facebook, and YouTube' };
      case '/integrations': return { title: 'Automations & Roadmap (Paused)', subtitle: 'Automations and roadmap modules are temporarily disabled as requested' };
      default: return { title: 'DentiSync Operations', subtitle: 'Social Media & Creative Operations Automation' };
    }
  };

  const { title, subtitle } = getPageTitle();

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-30 px-4 sm:px-8 py-3.5 flex flex-col md:flex-row md:items-center justify-between gap-3">
      <div className="flex items-center gap-3">
        {/* Mobile Hamburger Menu Toggle */}
        <button
          onClick={toggle}
          className="md:hidden p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors shrink-0"
          aria-label="Open mobile navigation menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-lg sm:text-xl font-bold text-[#333333] tracking-tight">{title}</h1>
            <Badge variant="primary" size="sm" className="hidden sm:inline-flex">
              DentiSync ERP
            </Badge>
          </div>
          <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5">{subtitle}</p>
        </div>
      </div>

      <div className="flex items-center gap-3 shrink-0">
        {/* Connected Channels indicator (including YouTube per client request) */}
        <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-600">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <Instagram className="w-3.5 h-3.5 text-pink-600" />
            <Facebook className="w-3.5 h-3.5 text-blue-600" />
            <span className="font-semibold text-[#333333]">Meta</span>
          </span>
          <span className="text-slate-300">|</span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <Youtube className="w-3.5 h-3.5 text-red-600" />
            <span className="font-semibold text-[#333333]">YouTube</span>
          </span>
        </div>

        {/* Quick Highlight CTA Button (#e97538) */}
        <Button
          size="sm"
          variant="cta"
          onClick={() => router.push('/copywriter')}
          className="shadow-sm"
        >
          <Sparkles className="w-3.5 h-3.5 mr-1" />
          AI Studio
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
