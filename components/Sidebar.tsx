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
  FileText
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
      description: 'Operations overview & KPIs'
    },
    {
      name: 'Client & Brand Intake',
      href: '/brand-intake',
      icon: Sliders,
      description: 'Voice, ICP, treatments & prompts'
    },
    {
      name: 'Content Calendar',
      href: '/calendar',
      icon: CalendarIcon,
      description: 'Pillars, topics & time slots'
    },
    {
      name: 'AI Copywriter',
      href: '/copywriter',
      icon: PenTool,
      description: 'Hooks, captions, carousels & reels'
    },
    {
      name: 'Creative & Flyer Studio',
      href: '/creative',
      icon: ImageIcon,
      description: 'Controlled templates & GDrive'
    },
    {
      name: 'QC & Approvals',
      href: '/approvals',
      icon: CheckCircle2,
      badge: pendingApprovalsCount > 0 ? pendingApprovalsCount : undefined,
      description: 'Automated compliance & sign-off'
    },
    {
      name: 'Delivery & Meta Publish',
      href: '/delivery',
      icon: Send,
      description: 'Approved bank, FB & IG scheduler'
    },
    {
      name: 'Analytics & Learning',
      href: '/analytics',
      icon: BarChart3,
      description: 'Social reach & patient inquiries'
    },
    {
      name: 'Automations & Roadmap',
      href: '/integrations',
      icon: Bot,
      description: 'Reels, WhatsApp & DM bot hooks'
    }
  ];

  return (
    <aside className="w-72 bg-[#123b38] text-slate-300 flex flex-col min-h-screen border-r border-[#204944] shrink-0">
      {/* Clinic Logo Header */}
      <div className="p-5 border-b border-white/10 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#36a995] to-[#8bd6bd] flex items-center justify-center text-white shadow-lg shadow-emerald-950/30">
          <Sparkles className="w-5 h-5" />
        </div>
        <div>
          <h1 className="font-bold text-white text-sm tracking-wide">Apex Smile Studio</h1>
          <p className="text-[11px] text-[#8bd6bd] font-medium tracking-tight">Dental ERP • Creative Ops</p>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-3 py-4 space-y-1.5 overflow-y-auto">
        <div className="px-3 pb-2 text-[10px] font-semibold uppercase tracking-[.16em] text-[#91b1a9]">
          Core Operations Module
        </div>
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all group ${
                isActive
                  ? 'bg-[#1d756b] text-white font-semibold shadow-md shadow-black/20 ring-1 ring-white/10'
                  : 'hover:bg-white/[.07] text-[#d0dfda] hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3 truncate">
                <Icon className={`w-4 h-4 shrink-0 transition-transform group-hover:scale-110 ${isActive ? 'text-white' : 'text-[#91b1a9] group-hover:text-[#8bd6bd]'}`} />
                <div className="truncate text-left">
                  <div className="truncate leading-snug">{item.name}</div>
                  <div className={`text-[10px] font-normal truncate ${isActive ? 'text-[#d2f4e9]' : 'text-[#91b1a9]'}`}>
                    {item.description}
                  </div>
                </div>
              </div>
              {item.badge !== undefined && (
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold shrink-0 ${
                  isActive ? 'bg-white text-sky-700' : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                }`}>
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Google Drive Status Footer */}
      <div className="p-4 border-t border-white/10 bg-black/10">
        <div className="flex items-center justify-between text-xs text-[#91b1a9] mb-1.5">
          <span className="flex items-center gap-1.5 text-[#8bd6bd]">
            <span className="w-2 h-2 rounded-full bg-[#66c9a8] animate-pulse"></span>
            GDrive Sync Active
          </span>
          <span className="text-[10px] text-[#91b1a9]">v2.4.0</span>
        </div>
        <div className="text-[11px] text-[#91b1a9] truncate">
          Folder: /MarketingAssets_2026
        </div>
      </div>
    </aside>
  );
}
