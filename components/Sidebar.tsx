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
    <aside className="w-[248px] bg-white text-[#647873] flex flex-col min-h-screen border-r border-[#e7eeeb] shrink-0">
      {/* Clinic Logo Header */}
      <div className="px-5 py-5 border-b border-[#edf2ef] flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-[#e6f4ed] flex items-center justify-center text-[#20836d]">
          <Sparkles className="w-5 h-5" />
        </div>
        <div>
          <h1 className="font-semibold text-[#28443d] text-sm tracking-tight">Apex Smile Studio</h1>
          <p className="text-[10px] text-[#879891] font-medium tracking-tight">Dental content workspace</p>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-3 py-5 space-y-1 overflow-y-auto">
        <div className="px-3 pb-2.5 text-[10px] font-semibold uppercase tracking-[.14em] text-[#9aa9a3]">
          Workspace
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
                  ? 'bg-[#eaf5ef] text-[#1b735f] font-semibold'
                  : 'hover:bg-[#f5f8f6] text-[#677b74] hover:text-[#28443d]'
              }`}
            >
              <div className="flex items-center gap-3 truncate">
                <Icon className={`w-[17px] h-[17px] shrink-0 transition-transform group-hover:scale-105 ${isActive ? 'text-[#23816a]' : 'text-[#91a19a] group-hover:text-[#398673]'}`} />
                <div className="truncate text-left leading-snug">{item.name}</div>
              </div>
              {item.badge !== undefined && (
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold shrink-0 ${
                  isActive ? 'bg-white text-[#1b735f]' : 'bg-[#fbf2df] text-[#a16f26] border border-[#f1e1bd]'
                }`}>
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Google Drive Status Footer */}
      <div className="p-4 border-t border-[#edf2ef] bg-[#fbfcfb]">
        <div className="flex items-center justify-between text-xs text-[#82928c] mb-1.5">
          <span className="flex items-center gap-1.5 text-[#35866f]">
            <span className="w-2 h-2 rounded-full bg-[#55ae86]"></span>
            Drive connected
          </span>
          <span className="text-[10px] text-[#9aa9a3]">v2.4.0</span>
        </div>
        <div className="text-[10px] text-[#9aa9a3] truncate">
          Folder: /MarketingAssets_2026
        </div>
      </div>
    </aside>
  );
}
