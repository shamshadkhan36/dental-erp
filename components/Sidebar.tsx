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
    },
    {
      name: 'Client & Brand Intake',
      href: '/brand-intake',
      icon: Sliders,
    },
    {
      name: 'Content Calendar',
      href: '/calendar',
      icon: CalendarIcon,
    },
    {
      name: 'AI Copywriter',
      href: '/copywriter',
      icon: PenTool,
    },
    {
      name: 'Creative & Flyer Studio',
      href: '/creative',
      icon: ImageIcon,
    },
    {
      name: 'QC & Approvals',
      href: '/approvals',
      icon: CheckCircle2,
      badge: pendingApprovalsCount > 0 ? pendingApprovalsCount : undefined,
    },
    {
      name: 'Delivery & Meta Publish',
      href: '/delivery',
      icon: Send,
    },
    {
      name: 'Analytics & Learning',
      href: '/analytics',
      icon: BarChart3,
    },
    {
      name: 'Automations & Roadmap',
      href: '/integrations',
      icon: Bot,
    }
  ];

  return (
    <aside className="w-[60px] sm:w-[216px] xl:w-[248px] bg-white text-[#647873] flex flex-col min-h-screen border-r border-[#e7eeeb] shrink-0 transition-[width]">
      {/* Clinic Logo Header */}
      <div className="px-2.5 sm:px-5 py-5 border-b border-[#edf2ef] flex items-center justify-center sm:justify-start gap-3">
        <div className="w-9 h-9 rounded-xl bg-[#e6f4ed] flex items-center justify-center text-[#20836d]">
          <Sparkles className="w-5 h-5" />
        </div>
        <div className="hidden sm:block min-w-0">
          <h1 className="font-semibold text-[#28443d] text-sm tracking-tight">Apex Smile Studio</h1>
          <p className="text-[10px] text-[#879891] font-medium tracking-tight">Dental content workspace</p>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-1.5 sm:px-3 py-5 space-y-1 overflow-y-auto">
        <div className="hidden sm:block px-3 pb-2.5 text-[10px] font-semibold uppercase tracking-[.14em] text-[#9aa9a3]">
          Workspace
        </div>
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              title={item.name}
              aria-label={item.name}
              aria-current={isActive ? 'page' : undefined}
              className={`flex items-center justify-center sm:justify-between px-2 sm:px-3 py-2.5 rounded-xl text-xs font-medium transition-all group ${
                isActive
                  ? 'bg-[#eaf5ef] text-[#1b735f] font-semibold'
                  : 'hover:bg-[#f5f8f6] text-[#677b74] hover:text-[#28443d]'
              }`}
            >
              <div className="flex items-center justify-center sm:justify-start gap-0 sm:gap-3 truncate">
                <Icon className={`w-[17px] h-[17px] shrink-0 transition-transform group-hover:scale-105 ${isActive ? 'text-[#23816a]' : 'text-[#91a19a] group-hover:text-[#398673]'}`} />
                <div className="hidden sm:block truncate text-left leading-snug">{item.name}</div>
              </div>
              {item.badge !== undefined && (
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold shrink-0 ${
                  isActive ? 'bg-white text-[#1b735f]' : 'bg-[#fbf2df] text-[#a16f26] border border-[#f1e1bd]'
                } hidden sm:inline-flex`}>
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Google Drive Status Footer */}
      <div className="p-2 sm:p-4 border-t border-[#edf2ef] bg-[#fbfcfb]">
        <div className="flex items-center justify-center sm:justify-between text-xs text-[#82928c] mb-1.5">
          <span className="flex items-center gap-1.5 text-[#35866f]" title="Drive connected">
            <span className="w-2 h-2 rounded-full bg-[#55ae86]"></span>
            <span className="hidden sm:inline">Drive connected</span>
          </span>
          <span className="hidden sm:inline text-[10px] text-[#9aa9a3]">v2.4.0</span>
        </div>
        <div className="hidden sm:block text-[10px] text-[#9aa9a3] truncate">
          Folder: /MarketingAssets_2026
        </div>
      </div>
    </aside>
  );
}
