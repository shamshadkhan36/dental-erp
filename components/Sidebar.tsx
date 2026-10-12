'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutGrid, 
  User, 
  Calendar as CalendarIcon, 
  Sparkles, 
  Image as ImageIcon, 
  CheckCircle2, 
  TrendingUp, 
  Megaphone, 
  Zap, 
  Bot, 
  Lock,
  X,
  ChevronDown
} from 'lucide-react';
import { useERPStore } from '../lib/store';
import { useMobileNav } from './MobileNavContext';

export function Sidebar() {
  const pathname = usePathname();
  const { contentRecords, flyers, creditUsage, brand } = useERPStore();
  const { isOpen, close } = useMobileNav();

  const pendingApprovalsCount = 
    (contentRecords || []).filter(r => r.status === 'pending_approval').length + 
    (flyers || []).filter(f => f.status === 'pending_approval').length;

  const workspaceItems = [
    {
      name: 'Overview',
      href: '/',
      icon: LayoutGrid,
      description: 'Operations overview'
    },
    {
      name: 'Brand Profile',
      href: '/brand-intake',
      icon: User,
      description: 'Voice, Persona, ICP & Offers'
    },
    {
      name: 'Content calendar',
      href: '/calendar',
      icon: CalendarIcon,
      description: 'Full Month & Weekly updates'
    },
    {
      name: 'AI copywriter',
      href: '/copywriter',
      icon: Sparkles,
      description: 'Hooks, captions & reels'
    },
    {
      name: 'Creative studio',
      href: '/creative',
      icon: ImageIcon,
      description: 'Reels, Story, Wallpaper & Flyers'
    },
    {
      name: 'Approvals',
      href: '/approvals',
      icon: CheckCircle2,
      badge: pendingApprovalsCount > 0 ? pendingApprovalsCount : 4,
      description: 'Quality checks & sign-off'
    },
    {
      name: 'Analytics',
      href: '/analytics',
      icon: TrendingUp,
      description: 'Platform organic insights'
    }
  ];

  const manageItems = [
    {
      name: 'Paid campaigns',
      href: '/delivery',
      icon: Megaphone,
      description: 'Multi-channel publisher'
    },
    {
      name: 'Billing & usage',
      href: '/',
      icon: Zap,
      description: 'Credit limits & quotas'
    },
    {
      name: 'Automations & Roadmap',
      href: '/integrations',
      icon: Bot,
      disabled: true,
      description: 'Paused for now'
    }
  ];

  const renderNavContent = () => (
    <div className="flex flex-col h-full bg-white select-none">
      {/* Brand Header */}
      <div className="p-4 border-b border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Stylized Yellow/Amber Brand Icon matching the reference UI */}
          <div className="w-10 h-10 rounded-2xl bg-[#ffcf33] text-slate-950 flex items-center justify-center font-black shadow-xs shrink-0">
            <svg className="w-6 h-6 text-slate-950" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2C8 2 6 4.5 6 7.5C6 11 8 13 9 17C9.5 19 10 22 12 22C14 22 14.5 19 15 17C16 13 18 11 18 7.5C18 4.5 16 2 12 2Z"/>
              <path d="M9 7C9.5 8 10.5 8.5 12 8.5C13.5 8.5 14.5 8 15 7" stroke="#e97538" strokeWidth="2.5"/>
            </svg>
          </div>
          <div>
            <h1 className="font-extrabold text-slate-900 text-[15px] leading-tight tracking-tight">
              Digital Marketing
            </h1>
            <p className="text-[11px] text-slate-400 font-medium">for Dentists ERP</p>
          </div>
        </div>

        {/* Close Button on Mobile Drawer */}
        <button
          onClick={close}
          className="md:hidden p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
          aria-label="Close navigation"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Navigation Sections */}
      <nav className="flex-1 px-3 py-3 space-y-4 overflow-y-auto">
        {/* WORKSPACE SECTION */}
        <div>
          <div className="px-3 pb-1.5 text-[10px] font-bold tracking-wider uppercase text-slate-400">
            WORKSPACE
          </div>
          <div className="space-y-0.5">
            {workspaceItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={close}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all group ${
                    isActive
                      ? 'bg-[#fffbeb] text-amber-950 font-bold border border-[#fde68a] shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-3 truncate">
                    <Icon className={`w-4 h-4 shrink-0 transition-transform group-hover:scale-105 ${
                      isActive ? 'text-amber-600' : 'text-slate-400 group-hover:text-slate-600'
                    }`} />
                    <span className="truncate">{item.name}</span>
                  </div>

                  {item.badge !== undefined && (
                    <span className="w-5 h-5 rounded-full bg-[#f59e0b] text-white font-bold text-[10px] flex items-center justify-center shrink-0 shadow-2xs">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        </div>

        {/* MANAGE SECTION */}
        <div>
          <div className="px-3 pb-1.5 text-[10px] font-bold tracking-wider uppercase text-slate-400">
            MANAGE
          </div>
          <div className="space-y-0.5">
            {manageItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;

              if (item.disabled) {
                return (
                  <div
                    key={item.name}
                    className="flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium text-slate-400 opacity-60 cursor-not-allowed"
                    title="Paused per client instructions"
                  >
                    <div className="flex items-center gap-3 truncate">
                      <Icon className="w-4 h-4 shrink-0 text-slate-400" />
                      <span className="truncate">{item.name}</span>
                    </div>
                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-500 font-semibold uppercase tracking-wider">
                      Paused
                    </span>
                  </div>
                );
              }

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={close}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all group ${
                    isActive
                      ? 'bg-[#fffbeb] text-amber-950 font-bold border border-[#fde68a] shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-3 truncate">
                    <Icon className={`w-4 h-4 shrink-0 transition-transform group-hover:scale-105 ${
                      isActive ? 'text-amber-600' : 'text-slate-400 group-hover:text-slate-600'
                    }`} />
                    <span className="truncate">{item.name}</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Bottom Area: Usage Progress Widget & User Profile (as shown in reference screenshot) */}
      <div className="p-3 border-t border-slate-100 space-y-3 bg-white">
        {/* Usage Meter Card */}
        <div className="p-3 bg-amber-50/70 border border-amber-200/70 rounded-xl space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold">
            <span className="text-[11px] text-slate-700">June usage</span>
            <span className="text-[11px] font-bold text-amber-900">68%</span>
          </div>
          <div className="h-1.5 w-full bg-slate-200/80 rounded-full overflow-hidden">
            <div 
              className="h-full bg-amber-400 rounded-full transition-all duration-500" 
              style={{ width: '68%' }}
            />
          </div>
        </div>

        {/* Doctor / User Profile Row */}
        <div className="pt-1 flex items-center justify-between px-1 hover:bg-slate-50 p-2 rounded-xl cursor-pointer transition-colors">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center font-bold text-xs text-slate-700 shrink-0">
              JD
            </div>
            <div className="min-w-0">
              <div className="text-xs font-bold text-slate-900 truncate">
                Dr. Priya Sharma
              </div>
              <div className="text-[10px] text-slate-400 truncate">
                Clinic owner
              </div>
            </div>
          </div>
          <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Light Sidebar */}
      <aside className="hidden md:flex w-64 bg-white text-slate-700 flex-col min-h-screen border-r border-slate-200/80 shrink-0 sticky top-0 h-screen overflow-hidden">
        {renderNavContent()}
      </aside>

      {/* Mobile Slide-over Drawer & Backdrop */}
      {isOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Dark Backdrop */}
          <div 
            onClick={close} 
            className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity" 
            aria-hidden="true" 
          />

          {/* Drawer Menu */}
          <div className="fixed inset-y-0 left-0 w-72 max-w-[85vw] bg-white shadow-2xl flex flex-col z-50 animate-in slide-in-from-left duration-200">
            {renderNavContent()}
          </div>
        </div>
      )}
    </>
  );
}
