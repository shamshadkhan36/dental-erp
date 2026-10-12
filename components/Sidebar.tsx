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
  const { contentRecords, flyers } = useERPStore();
  const { isOpen, close } = useMobileNav();

  const pendingApprovalsCount = 
    (contentRecords || []).filter(r => r.status === 'pending_approval').length + 
    (flyers || []).filter(f => f.status === 'pending_approval').length;

  const workspaceItems = [
    {
      name: 'Overview',
      href: '/',
      icon: LayoutGrid
    },
    {
      name: 'Brand Profile',
      href: '/brand-intake',
      icon: User
    },
    {
      name: 'Content calendar',
      href: '/calendar',
      icon: CalendarIcon
    },
    {
      name: 'AI copywriter',
      href: '/copywriter',
      icon: Sparkles
    },
    {
      name: 'Creative studio',
      href: '/creative',
      icon: ImageIcon
    },
    {
      name: 'Approvals',
      href: '/approvals',
      icon: CheckCircle2,
      badge: pendingApprovalsCount > 0 ? pendingApprovalsCount : 4
    },
    {
      name: 'Analytics',
      href: '/analytics',
      icon: TrendingUp
    }
  ];

  const manageItems = [
    {
      name: 'Paid campaigns',
      href: '/delivery',
      icon: Megaphone
    },
    {
      name: 'Billing & usage',
      href: '/',
      icon: Zap
    },
    {
      name: 'Automations & Roadmap',
      href: '/integrations',
      icon: Bot,
      disabled: true
    }
  ];

  const renderNavContent = () => (
    <div className="flex flex-col h-full bg-[#ffffff] select-none text-[#333333]">
      {/* Brand Header with Primary #4f98db and Secondary #333333 */}
      <div className="p-4 border-b border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Brand Icon in Primary #4f98db with CTA Highlight #e97538 accent */}
          <div className="w-10 h-10 rounded-2xl bg-[#4f98db] text-white flex items-center justify-center shadow-xs shrink-0">
            <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2C8 2 6 4.5 6 7.5C6 11 8 13 9 17C9.5 19 10 22 12 22C14 22 14.5 19 15 17C16 13 18 11 18 7.5C18 4.5 16 2 12 2Z"/>
              <path d="M9 7C9.5 8 10.5 8.5 12 8.5C13.5 8.5 14.5 8 15 7" stroke="#e97538" strokeWidth="2.5"/>
            </svg>
          </div>
          <div>
            <h1 className="font-extrabold text-[#333333] text-[15px] leading-tight tracking-tight">
              DentiSync
            </h1>
            <p className="text-[11px] text-[#4f98db] font-semibold">Dental Marketing ERP</p>
          </div>
        </div>

        {/* Close Button on Mobile Drawer */}
        <button
          onClick={close}
          className="md:hidden p-1.5 text-slate-400 hover:text-[#333333] hover:bg-slate-100 rounded-lg transition-colors"
          aria-label="Close navigation"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Navigation Sections */}
      <nav className="flex-1 px-3 py-4 space-y-5 overflow-y-auto">
        {/* WORKSPACE SECTION */}
        <div>
          <div className="px-3 pb-2 text-[10px] font-bold tracking-widest uppercase text-slate-400">
            WORKSPACE
          </div>
          <div className="space-y-1">
            {workspaceItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={close}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-medium transition-all group ${
                    isActive
                      ? 'border-2 border-[#4f98db] bg-[#f0f7fd] text-[#333333] font-bold shadow-2xs'
                      : 'text-[#333333] hover:text-[#4f98db] hover:bg-[#f0f7fd]/60 border-2 border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3 truncate">
                    <Icon className={`w-4 h-4 shrink-0 transition-transform group-hover:scale-105 ${
                      isActive ? 'text-[#4f98db]' : 'text-slate-400 group-hover:text-[#4f98db]'
                    }`} />
                    <span className="truncate">{item.name}</span>
                  </div>

                  {/* Approvals / Notification Badge using CTA highlight #e97538 */}
                  {item.badge !== undefined && (
                    <span className="w-5 h-5 rounded-full bg-[#e97538] text-white font-bold text-[11px] flex items-center justify-center shrink-0 shadow-2xs">
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
          <div className="px-3 pb-2 text-[10px] font-bold tracking-widest uppercase text-slate-400">
            MANAGE
          </div>
          <div className="space-y-1">
            {manageItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;

              if (item.disabled) {
                return (
                  <div
                    key={item.name}
                    className="flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-medium text-slate-400 opacity-60 cursor-not-allowed border-2 border-transparent"
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
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-medium transition-all group ${
                    isActive
                      ? 'border-2 border-[#4f98db] bg-[#f0f7fd] text-[#333333] font-bold shadow-2xs'
                      : 'text-[#333333] hover:text-[#4f98db] hover:bg-[#f0f7fd]/60 border-2 border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3 truncate">
                    <Icon className={`w-4 h-4 shrink-0 transition-transform group-hover:scale-105 ${
                      isActive ? 'text-[#4f98db]' : 'text-slate-400 group-hover:text-[#4f98db]'
                    }`} />
                    <span className="truncate">{item.name}</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Bottom Area: Usage Progress Widget & User Profile styled in #4f98db, #333333, #ffffff */}
      <div className="p-3 border-t border-slate-100 space-y-2.5 bg-[#ffffff]">
        {/* Usage Meter Card */}
        <div className="p-3.5 bg-[#f8fafc] border border-slate-200/80 rounded-2xl space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold">
            <span className="text-[12px] text-[#333333] font-medium">Monthly usage</span>
            <span className="text-[12px] font-bold text-[#4f98db]">68%</span>
          </div>
          <div className="h-1.5 w-full bg-slate-200/90 rounded-full overflow-hidden">
            <div 
              className="h-full bg-[#4f98db] rounded-full transition-all duration-500" 
              style={{ width: '68%' }}
            />
          </div>
        </div>

        {/* Doctor / User Profile Row */}
        <div className="flex items-center justify-between px-2 hover:bg-slate-50 p-2 rounded-2xl cursor-pointer transition-colors">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-9 h-9 rounded-full bg-[#f0f7fd] border border-[#b9ddf7] flex items-center justify-center font-bold text-xs text-[#4f98db] shrink-0">
              JD
            </div>
            <div className="min-w-0">
              <div className="text-xs font-bold text-[#333333] truncate">
                Dr. Priya Sharma
              </div>
              <div className="text-[11px] text-slate-400 truncate">
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
      {/* Desktop Persistent Light Sidebar with Background #ffffff */}
      <aside className="hidden md:flex w-64 bg-[#ffffff] text-[#333333] flex-col min-h-screen border-r border-slate-200/80 shrink-0 sticky top-0 h-screen overflow-hidden">
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
          <div className="fixed inset-y-0 left-0 w-72 max-w-[85vw] bg-[#ffffff] shadow-2xl flex flex-col z-50 animate-in slide-in-from-left duration-200">
            {renderNavContent()}
          </div>
        </div>
      )}
    </>
  );
}
