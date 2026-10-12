'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Sparkles, 
  Calendar as CalendarIcon, 
  PenTool, 
  Image as ImageIcon, 
  CheckCircle2, 
  Send, 
  BarChart3, 
  Sliders, 
  Bot, 
  Layers, 
  Lock
} from 'lucide-react';
import { useERPStore } from '../lib/store';

export function Sidebar() {
  const pathname = usePathname();
  const { contentRecords, flyers } = useERPStore();

  const pendingApprovalsCount = 
    contentRecords.filter(r => r.status === 'pending_approval').length + 
    flyers.filter(f => f.status === 'pending_approval').length;

  const navItems = [
    {
      name: 'ERP Dashboard',
      href: '/',
      icon: Layers,
      description: 'Operations overview & credits'
    },
    {
      name: 'Client & Brand Intake',
      href: '/brand-intake',
      icon: Sliders,
      description: 'Voice, Persona, ICP & Offers'
    },
    {
      name: 'Content Calendar',
      href: '/calendar',
      icon: CalendarIcon,
      description: 'Full Month & Weekly updates'
    },
    {
      name: 'AI Copywriter',
      href: '/copywriter',
      icon: PenTool,
      description: 'Hooks, captions, carousels & reels'
    },
    {
      name: 'Creative Studio',
      href: '/creative',
      icon: ImageIcon,
      description: 'Reels, Story, Wallpaper & Flyers'
    },
    {
      name: 'QC & Approvals',
      href: '/approvals',
      icon: CheckCircle2,
      badge: pendingApprovalsCount > 0 ? pendingApprovalsCount : undefined,
      description: 'Automated compliance & sign-off'
    },
    {
      name: 'Delivery & Publish',
      href: '/delivery',
      icon: Send,
      description: 'Meta (IG, FB) & YouTube scheduler'
    },
    {
      name: 'Analytics & Growth',
      href: '/analytics',
      icon: BarChart3,
      description: 'Platform-specific organic insights'
    },
    // Requirement 6: Disable Automation and Roadmap for now
    {
      name: 'Automations & Roadmap',
      href: '/integrations',
      icon: Bot,
      disabled: true,
      description: 'Paused for maintenance'
    }
  ];

  return (
    <aside className="w-72 bg-[#333333] text-slate-200 flex flex-col min-h-screen border-r border-[#262626] shrink-0">
      {/* Brand Header with Client Colors (#4f98db, #e97538) */}
      <div className="p-5 border-b border-white/10 flex items-center gap-3">
        {/* Custom DentiSync Vector Tooth & Pulse Logo */}
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#4f98db] to-[#7ebef1] flex items-center justify-center text-white shadow-md shadow-[#4f98db]/30 shrink-0">
          <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2C8 2 6 4.5 6 7.5C6 11 8 13 9 17C9.5 19 10 22 12 22C14 22 14.5 19 15 17C16 13 18 11 18 7.5C18 4.5 16 2 12 2Z"/>
            <path d="M9 7C9.5 8 10.5 8.5 12 8.5C13.5 8.5 14.5 8 15 7" stroke="#e97538" strokeWidth="2.5"/>
          </svg>
        </div>
        <div>
          <div className="flex items-center gap-1.5">
            <h1 className="font-extrabold text-white text-base tracking-wide">DentiSync</h1>
            <span className="px-1.5 py-0.2 bg-[#e97538] text-white text-[9px] font-black rounded uppercase tracking-wider">
              PRO
            </span>
          </div>
          <p className="text-[11px] text-[#4f98db] font-medium tracking-tight">Dental Marketing & Creative Ops</p>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-3 py-4 space-y-1.5 overflow-y-auto">
        <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
          Core Operations Module
        </div>
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          if (item.disabled) {
            return (
              <div
                key={item.href}
                className="flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium opacity-50 cursor-not-allowed bg-black/20 text-slate-400 border border-white/5"
                title="This module is temporarily paused per client configuration"
              >
                <div className="flex items-center gap-3 truncate">
                  <Icon className="w-4 h-4 shrink-0 text-slate-500" />
                  <div className="truncate text-left">
                    <div className="truncate leading-snug flex items-center gap-1.5">
                      <span>{item.name}</span>
                      <Lock className="w-3 h-3 text-slate-400 inline" />
                    </div>
                    <div className="text-[10px] font-normal truncate text-slate-500">
                      {item.description}
                    </div>
                  </div>
                </div>
                <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-white/10 text-slate-400 uppercase tracking-wider">
                  Paused
                </span>
              </div>
            );
          }

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all group ${
                isActive
                  ? 'bg-[#4f98db] text-white font-semibold shadow-md shadow-[#4f98db]/30'
                  : 'hover:bg-white/10 text-slate-300 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3 truncate">
                <Icon className={`w-4 h-4 shrink-0 transition-transform group-hover:scale-110 ${isActive ? 'text-white' : 'text-[#4f98db] group-hover:text-white'}`} />
                <div className="truncate text-left">
                  <div className="truncate leading-snug">{item.name}</div>
                  <div className={`text-[10px] font-normal truncate ${isActive ? 'text-sky-100' : 'text-slate-400'}`}>
                    {item.description}
                  </div>
                </div>
              </div>
              {item.badge !== undefined && (
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold shrink-0 ${
                  isActive ? 'bg-white text-[#333333]' : 'bg-[#e97538] text-white font-black shadow-xs'
                }`}>
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Google Drive Status Footer */}
      <div className="p-4 border-t border-white/10 bg-black/20">
        <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5">
          <span className="flex items-center gap-1.5 text-emerald-400 font-semibold text-[11px]">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            GDrive Sync Active
          </span>
          <span className="text-[10px] text-slate-400 font-mono">v2.5</span>
        </div>
        <div className="text-[11px] text-slate-400 truncate font-mono">
          /ApexDental_Assets_2026
        </div>
      </div>
    </aside>
  );
}
