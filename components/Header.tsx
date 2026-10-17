'use client';

import React, { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { 
  Sparkles, 
  RotateCcw, 
  Plus, 
  Instagram,
  Facebook,
  Youtube,
  Menu,
  Bell,
  LogIn
} from 'lucide-react';
import { Button } from './ui/Button';
import { Badge } from './ui/Badge';
import { useERPStore } from '../lib/store';
import { useMobileNav } from './MobileNavContext';
import { AuthModal } from './AuthModal';

export function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const { user, isAuthenticated, resetToDefaults } = useERPStore();
  const { toggle } = useMobileNav();
  const [isAuthOpen, setIsAuthOpen] = useState(false);

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
    <header className="bg-white border-b border-slate-200 sticky top-0 z-30 px-4 sm:px-6 lg:px-8 py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
      <div className="flex items-center gap-3 min-w-0">
        {/* Mobile & Tablet Hamburger Menu Toggle */}
        <button
          onClick={toggle}
          className="lg:hidden p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors shrink-0"
          aria-label="Open mobile navigation menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h1 className="text-base sm:text-lg lg:text-xl font-bold text-[#333333] tracking-tight truncate">{title}</h1>
            <Badge variant="primary" size="sm" className="hidden sm:inline-flex shrink-0 items-center gap-1.5 font-bold">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo.png" alt="" className="w-3.5 h-3.5 object-contain" />
              Digital Marketing for Dentists
            </Badge>
          </div>
          <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5 line-clamp-1">{subtitle}</p>
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-3 shrink-0 self-end sm:self-auto">
        {/* Connected Channels indicator (including YouTube per client request) */}
        <div className="hidden xl:flex items-center gap-2 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-600">
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

        {/* Quick Highlight CTA Button (#e97538) - STRICTLY ONLY BUTTON IN ORANGE */}
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
          className="hidden sm:inline-flex text-[#333333] hover:text-[#4f98db]"
        >
          <Plus className="w-3.5 h-3.5 mr-1 text-slate-500" />
          New Flyer
        </Button>

        {/* Free Trial Badge & User Avatar / Sign In */}
        <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
          <button 
            className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors" 
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
          </button>

          {isAuthenticated ? (
            <div 
              onClick={() => setIsAuthOpen(true)}
              className="flex items-center gap-2 px-2 py-1 bg-slate-50 hover:bg-[#f0f7fd] border border-slate-200 hover:border-[#b9ddf7] rounded-xl cursor-pointer transition-all"
              title="Click to view Account / Free Trial options"
            >
              <div className="w-7 h-7 rounded-full bg-[#f0f7fd] border border-[#b9ddf7] flex items-center justify-center font-bold text-xs text-[#4f98db] shrink-0">
                {user?.avatarInitials || 'PS'}
              </div>
              <div className="hidden md:block text-left">
                <div className="text-[11px] font-bold text-[#333333] leading-none">{user?.name || 'Dr. Priya'}</div>
                <div className="text-[9px] text-[#4f98db] font-semibold mt-0.5">
                  {user?.isTrial ? `${user.trialDaysRemaining}d Trial` : 'Active'}
                </div>
              </div>
            </div>
          ) : (
            <Button
              size="sm"
              variant="primary"
              onClick={() => setIsAuthOpen(true)}
              className="text-xs"
            >
              <LogIn className="w-3.5 h-3.5 mr-1" />
              Sign In
            </Button>
          )}
        </div>

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

      {/* Interactive Authentication & Free Trial Modal */}
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </header>
  );
}
