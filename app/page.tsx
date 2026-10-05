'use client';

import React from 'react';
import Link from 'next/link';
import {
  ArrowRight, BarChart3, CalendarDays,
  CheckCircle2, Clock3, FileText, MessageCircle, PenLine, Sparkles,
  Instagram, Facebook, Clock,
} from 'lucide-react';
import { useERPStore } from '../lib/store';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';

const stages = [
  { key: 'planned', label: 'Planned', color: '#c2d2cb' },
  { key: 'draft', label: 'Draft', color: '#93a9a2' },
  { key: 'pending_approval', label: 'In review', color: '#e4aa4d' },
  { key: 'changes_requested', label: 'Changes requested', color: '#cf806c' },
  { key: 'approved', label: 'Approved', color: '#4b9b80' },
  { key: 'scheduled', label: 'Scheduled', color: '#317c68' },
  { key: 'published', label: 'Published', color: '#1f5d51' },
];

function Metric({ label, value, note, icon: Icon }: {
  label: string; value: string | number; note: string; icon: React.ElementType;
}) {
  return (
    <Card className="p-5 min-h-[142px] flex flex-col justify-between">
      <div className="flex items-center justify-between gap-2">
        <span className="text-[11px] font-semibold uppercase tracking-[.09em] text-[#788b85]">{label}</span>
        <span className="w-8 h-8 rounded-xl bg-[#eff7f3] text-[#27866e] flex items-center justify-center"><Icon className="w-4 h-4" /></span>
      </div>
      <div>
        <div className="text-[27px] leading-none font-semibold tracking-tight text-[#203b35]">{value}</div>
        <div className="mt-2 text-[11px] text-[#82928d]">{note}</div>
      </div>
    </Card>
  );
}

export default function DashboardOverview() {
  const { brand, calendar, contentRecords, flyers, analytics } = useERPStore();
  const pendingPosts = contentRecords.filter((record) => record.status === 'pending_approval');
  const pendingFlyers = flyers.filter((flyer) => flyer.status === 'pending_approval');
  const scheduled = contentRecords.filter((record) => record.status === 'scheduled');
  const published = contentRecords.filter((record) => record.status === 'published');
  const total = contentRecords.length || 1;
  const donutStops: string[] = [];
  let offset = 0;
  const stageCounts = stages.map((stage) => {
    const count = contentRecords.filter((record) => record.status === stage.key).length;
    const start = offset;
    offset += count / total * 100;
    donutStops.push(`${stage.color} ${start}% ${offset}%`);
    return { ...stage, count, percent: Math.round(count / total * 100) };
  });
  const totalPending = pendingPosts.length + pendingFlyers.length;
  const nextCalendarItem = calendar.find((item) => item.status === 'planned' || item.status === 'scheduled');
  const quickLinks = [
    { href: '/calendar', label: 'Plan content', detail: 'Add a post to your calendar', icon: CalendarDays },
    { href: '/copywriter', label: 'Write with AI', detail: 'Create a caption or reel script', icon: PenLine },
    { href: '/approvals', label: 'Review content', detail: `${totalPending} items waiting for sign-off`, icon: CheckCircle2 },
  ];

  return (
    <div className="space-y-7 pb-8">
      <section className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-[.14em] text-[#398673] mb-2">Practice overview</div>
          <h2 className="text-[26px] sm:text-[30px] leading-tight tracking-[-.035em] font-semibold text-[#203b35]">Good morning, {brand.clinicName}</h2>
          <p className="mt-1 text-sm text-[#7b8c86]">Here’s what’s happening across your content today.</p>
        </div>
        <Link href="/copywriter"><Button><Sparkles className="w-4 h-4" /> Create content</Button></Link>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-3.5">
        <Metric label="Content created" value={analytics.totalPosts} note="in your content library" icon={FileText} />
        <Metric label="Needs approval" value={totalPending} note="doctor review required" icon={Clock3} />
        <Metric label="Scheduled" value={scheduled.length} note="ready to publish" icon={CalendarDays} />
        <Metric label="Patient inquiries" value={analytics.patientInquiries} note="attributed to social" icon={MessageCircle} />
        <Metric label="Engagement rate" value={`${analytics.avgEngagementRate}%`} note="average across posts" icon={BarChart3} />
      </section>

      <section className="grid grid-cols-1 xl:grid-cols-[1.35fr_1fr] gap-4">
        <Card className="p-5 sm:p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-sm font-semibold text-[#27423b]">Content status</h3>
              <p className="text-xs text-[#8a9994] mt-1">A quick look at your production pipeline</p>
            </div>
            <Link href="/calendar" className="text-xs font-medium text-[#32836e] hover:text-[#1c6655] flex items-center gap-1">View calendar <ArrowRight className="w-3.5 h-3.5" /></Link>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-7 sm:gap-10 pt-7 pb-2">
            <div className="relative w-44 h-44 shrink-0 rounded-full" style={{ background: `conic-gradient(${contentRecords.length ? donutStops.join(', ') : '#e6eeea 0% 100%'})` }}>
              <div className="absolute inset-[15px] rounded-full bg-white flex flex-col items-center justify-center">
                <span className="text-[32px] leading-none font-semibold tracking-tight text-[#203b35]">{contentRecords.length}</span>
                <span className="text-[11px] text-[#82928c] mt-1">total posts</span>
              </div>
            </div>
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
              {stageCounts.map((stage) => (
                <div key={stage.key} className="flex items-center justify-between gap-3 text-xs">
                  <span className="flex items-center gap-2 text-[#647873]"><span className="w-2 h-2 rounded-full" style={{ backgroundColor: stage.color }} />{stage.label}</span>
                  <span className="font-semibold text-[#334c46] tabular-nums">{stage.count}<span className="ml-2 font-normal text-[#9aa8a3]">{stage.percent}%</span></span>
                </div>
              ))}
              <Link href="/approvals" className="sm:col-span-2 mt-1 pt-3 border-t border-[#edf2ef] flex items-center justify-between text-xs text-[#32836e] hover:text-[#1c6655]">
                Open approval queue <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </Card>

        <Card className="p-5 sm:p-6 overflow-hidden relative">
          <div className="absolute -right-12 -top-16 w-40 h-40 rounded-full bg-[#eef7f2]" />
          <div className="flex items-start justify-between gap-4">
            <div className="relative">
              <h3 className="text-sm font-semibold text-[#27423b]">Channel mix</h3>
              <p className="text-xs text-[#8a9994] mt-1">Share of activity by platform</p>
            </div>
            <span className="relative text-[10px] font-medium text-[#748780] bg-white border border-[#e8efeb] rounded-full px-2.5 py-1">All time</span>
          </div>
          <div className="space-y-3 pt-5 relative">
            {[{ name: 'Instagram', value: analytics.platformSplit.instagram, icon: Instagram, color: '#b95883', tint: '#fbf0f5', label: 'Primary channel' }, { name: 'Facebook', value: analytics.platformSplit.facebook, icon: Facebook, color: '#4e75b9', tint: '#eff3fb', label: 'Community reach' }].map((channel) => {
              const ChannelIcon = channel.icon;
              return <div key={channel.name} className="rounded-2xl border border-[#e9efec] bg-white p-3.5">
                <div className="flex items-center gap-3">
                  <span className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: channel.tint, color: channel.color }}><ChannelIcon className="w-[18px] h-[18px]" /></span>
                  <div className="flex-1 min-w-0"><div className="text-xs font-semibold text-[#3b554d]">{channel.name}</div><div className="text-[10px] text-[#93a19b] mt-0.5">{channel.label}</div></div>
                  <div className="text-[22px] leading-none font-semibold tracking-tight text-[#304a43] tabular-nums">{channel.value}<span className="text-xs text-[#7c9288]">%</span></div>
                </div>
                <div className="mt-3 h-1.5 rounded-full bg-[#edf3f0] overflow-hidden"><div className="h-full rounded-full transition-all" style={{ width: `${Math.max(channel.value, 3)}%`, background: channel.color }} /></div>
              </div>;
            })}
          </div>
          <div className="mt-4 px-1 flex items-center justify-between text-[11px]">
            <span className="text-[#82928c]">Posts published</span><span className="font-semibold text-[#3f6256]">{published.length}</span>
          </div>
          <Link href="/analytics" className="mt-4 pt-3 border-t border-[#edf2ef] w-full text-xs font-semibold text-[#32836e] hover:text-[#1c6655] flex justify-between items-center">Explore analytics <ArrowRight className="w-3.5 h-3.5" /></Link>
        </Card>
      </section>

      <section className="grid grid-cols-1 xl:grid-cols-[1.35fr_1fr] gap-4">
        <Card className="p-5 sm:p-6">
          <div className="flex items-center justify-between gap-3 mb-4">
            <div><h3 className="text-sm font-semibold text-[#27423b]">Your next steps</h3><p className="text-xs text-[#8a9994] mt-1">Keep your content moving</p></div>
            <Link href="/approvals" className="text-xs font-medium text-[#32836e] hover:text-[#1c6655]">See queue</Link>
          </div>
          <div className="divide-y divide-[#edf2ef]">
            {quickLinks.map(({ href, label, detail, icon: Icon }) => (
              <Link href={href} key={href} className="group flex items-center gap-3.5 py-3.5 first:pt-1 last:pb-1">
                <span className="w-9 h-9 rounded-xl bg-[#eff7f3] text-[#398673] flex items-center justify-center"><Icon className="w-4 h-4" /></span>
                <span className="flex-1 min-w-0"><span className="block text-xs font-semibold text-[#3c554e] group-hover:text-[#137c70]">{label}</span><span className="block text-[11px] text-[#8a9994] mt-0.5">{detail}</span></span>
                <ArrowRight className="w-4 h-4 text-[#a5b2ac] group-hover:text-[#398673] transition-colors" />
              </Link>
            ))}
          </div>
        </Card>
        <Card className="p-5 sm:p-6 bg-gradient-to-br from-[#f5faf7] to-[#edf5f1] border-[#e3eee8] overflow-hidden relative">
          <div className="absolute -right-8 -bottom-12 w-36 h-36 rounded-full border-[22px] border-white/45" />
          <div className="flex items-center justify-between gap-3">
            <div><h3 className="text-sm font-semibold text-[#27423b]">Up next on your calendar</h3><p className="text-xs text-[#8a9994] mt-1">Your next planned post</p></div>
            <span className="w-9 h-9 rounded-xl bg-white text-[#4c927c] flex items-center justify-center shadow-sm"><CalendarDays className="w-4 h-4" /></span>
          </div>
          {nextCalendarItem ? <div className="mt-5 rounded-2xl bg-white/90 border border-white p-4 shadow-[0_8px_24px_rgba(41,92,72,.06)] relative">
            <div className="flex gap-3.5">
              <div className="w-[54px] h-[62px] rounded-xl bg-[#eaf5ef] flex flex-col items-center justify-center text-[#317d67] shrink-0">
                <span className="text-[9px] font-bold uppercase tracking-[.12em]">{nextCalendarItem.dayOfWeek.slice(0, 3)}</span>
                <span className="text-[22px] leading-none font-semibold mt-1">{new Date(`${nextCalendarItem.date}T00:00:00`).getDate()}</span>
              </div>
              <div className="min-w-0 flex-1 pt-0.5">
                <div className="flex items-center gap-1 text-[10px] font-medium text-[#85968f]"><Clock className="w-3 h-3" />{nextCalendarItem.date}</div>
                <div className="mt-1.5 text-sm font-semibold leading-snug text-[#304a43] line-clamp-2">{nextCalendarItem.topic}</div>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between gap-2">
              <span className="px-2.5 py-1 rounded-full bg-[#f1f7f3] text-[10px] font-medium text-[#54806e]">{nextCalendarItem.pillar}</span>
              <span className="text-[10px] font-medium uppercase tracking-wide text-[#8b9a94]">{nextCalendarItem.format}</span>
            </div>
            <Link href="/calendar" className="mt-4 pt-3 border-t border-[#edf2ef] flex items-center justify-between text-xs font-semibold text-[#32836e] hover:text-[#1c6655]">Open content calendar <ArrowRight className="w-3.5 h-3.5" /></Link>
          </div> : <div className="mt-5 rounded-2xl bg-white/90 border border-white p-4 text-xs leading-relaxed text-[#82928c] relative">No upcoming posts planned yet. Add a post to your calendar to see it here.<Link href="/calendar" className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-[#32836e] hover:text-[#1c6655]">Plan a post <ArrowRight className="w-3 h-3" /></Link></div>}
        </Card>
      </section>
    </div>
  );
}
