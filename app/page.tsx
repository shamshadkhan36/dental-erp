'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Sparkles, 
  Calendar as CalendarIcon, 
  Clock, 
  ArrowUpRight, 
  AlertCircle, 
  ChevronRight,
  Zap,
  Video,
  FileText,
  HardDrive,
  CreditCard,
  Plus
} from 'lucide-react';
import { useERPStore } from '../lib/store';
import { Card, CardHeader, CardTitle } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { MockPostPreview } from '../components/MockPostPreview';

export default function DashboardOverview() {
  const { brand, contentRecords, flyers, creditUsage, updateContentStatus } = useERPStore();

  const pendingPosts = contentRecords.filter(r => r.status === 'pending_approval');
  const pendingFlyers = flyers.filter(f => f.status === 'pending_approval');
  const scheduledPosts = contentRecords.filter(r => r.status === 'scheduled');
  const approvedPosts = contentRecords.filter(r => r.status === 'approved');

  const upcomingPost = scheduledPosts[0] || approvedPosts[0] || contentRecords[0];

  return (
    <div className="space-y-8">
      {/* Top Banner: Clinic Status with Client Visual Identity */}
      <div className="bg-[#333333] text-white rounded-2xl p-6 shadow-xl relative overflow-hidden border border-black/20">
        <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 w-64 h-64 bg-[#4f98db]/20 rounded-full blur-3xl"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-[#4f98db]/20 text-[#4f98db] text-xs font-semibold border border-[#4f98db]/30">
                Active Clinic Workspace
              </span>
              <span className="text-xs text-slate-300">• New York Dental Studio</span>
            </div>
            <h2 className="text-2xl font-extrabold tracking-tight text-white">{brand.clinicName}</h2>
            <p className="text-xs text-slate-300 max-w-xl leading-relaxed">
              Automated social media engine & creative operations pipeline. Empowering practice growth with on-brand AI copywriting, multi-platform publishing (IG, FB & YouTube), and doctor sign-off.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            {/* CTA Highlight Button #e97538 */}
            <Link href="/copywriter">
              <Button variant="cta" size="md" className="shadow-lg shadow-[#e97538]/30">
                <Sparkles className="w-4 h-4 mr-2" />
                Launch AI Studio
              </Button>
            </Link>
            <Link href="/calendar">
              <Button variant="outline" size="md" className="bg-white/10 hover:bg-white/20 text-white border-white/20">
                <CalendarIcon className="w-4 h-4 mr-2" />
                Month Calendar
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Requirement 5: CREDIT USAGE PANEL */}
      <Card className="border-l-4 border-l-[#e97538] bg-white shadow-sm p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-4 mb-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#fdf2ec] text-[#e97538] flex items-center justify-center font-bold">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-[#333333]">Credit Usage & Generation Quotas</h3>
                <Badge variant="cta" size="sm">{creditUsage.planName}</Badge>
              </div>
              <p className="text-xs text-slate-500">
                Usage renews automatically on {creditUsage.renewalDate}. Top-up credits anytime.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button size="sm" variant="outline" className="text-xs">
              <CreditCard className="w-3.5 h-3.5 mr-1 text-slate-500" />
              Manage Billing
            </Button>
            <Button size="sm" variant="cta" className="text-xs">
              <Plus className="w-3.5 h-3.5 mr-1" />
              Add More Credits
            </Button>
          </div>
        </div>

        {/* 4 Quota Bars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* 1. AI Copywriting Credits */}
          <div className="space-y-2 bg-[#f0f7fd] p-4 rounded-xl border border-[#b9ddf7]/60">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-[#333333] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#4f98db]" /> AI Copy Credits
              </span>
              <span className="font-bold text-[#4f98db]">
                {creditUsage.aiCopyCredits.used} / {creditUsage.aiCopyCredits.total}
              </span>
            </div>
            <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
              <div 
                className="bg-[#4f98db] h-full rounded-full transition-all"
                style={{ width: `${(creditUsage.aiCopyCredits.used / creditUsage.aiCopyCredits.total) * 100}%` }}
              ></div>
            </div>
            <div className="text-[10px] text-slate-500 flex justify-between">
              <span>{creditUsage.aiCopyCredits.total - creditUsage.aiCopyCredits.used} remaining</span>
              <span>68% consumed</span>
            </div>
          </div>

          {/* 2. Video & Reel Credits */}
          <div className="space-y-2 bg-[#f0f7fd] p-4 rounded-xl border border-[#b9ddf7]/60">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-[#333333] flex items-center gap-1.5">
                <Video className="w-3.5 h-3.5 text-rose-500" /> Video & Reels
              </span>
              <span className="font-bold text-rose-600">
                {creditUsage.videoCredits.used} / {creditUsage.videoCredits.total}
              </span>
            </div>
            <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
              <div 
                className="bg-rose-500 h-full rounded-full transition-all"
                style={{ width: `${(creditUsage.videoCredits.used / creditUsage.videoCredits.total) * 100}%` }}
              ></div>
            </div>
            <div className="text-[10px] text-slate-500 flex justify-between">
              <span>{creditUsage.videoCredits.total - creditUsage.videoCredits.used} video renders left</span>
              <span>26% consumed</span>
            </div>
          </div>

          {/* 3. Graphic & Flyer Credits */}
          <div className="space-y-2 bg-[#f0f7fd] p-4 rounded-xl border border-[#b9ddf7]/60">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-[#333333] flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-purple-600" /> Graphics & Flyers
              </span>
              <span className="font-bold text-purple-600">
                {creditUsage.graphicCredits.used} / {creditUsage.graphicCredits.total}
              </span>
            </div>
            <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
              <div 
                className="bg-purple-600 h-full rounded-full transition-all"
                style={{ width: `${(creditUsage.graphicCredits.used / creditUsage.graphicCredits.total) * 100}%` }}
              ></div>
            </div>
            <div className="text-[10px] text-slate-500 flex justify-between">
              <span>{creditUsage.graphicCredits.total - creditUsage.graphicCredits.used} designs remaining</span>
              <span>64% consumed</span>
            </div>
          </div>

          {/* 4. Google Drive Cloud Storage */}
          <div className="space-y-2 bg-[#f0f7fd] p-4 rounded-xl border border-[#b9ddf7]/60">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-[#333333] flex items-center gap-1.5">
                <HardDrive className="w-3.5 h-3.5 text-emerald-600" /> Cloud Storage
              </span>
              <span className="font-bold text-emerald-600">
                {creditUsage.storageGb.used} GB / {creditUsage.storageGb.total} GB
              </span>
            </div>
            <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
              <div 
                className="bg-emerald-600 h-full rounded-full transition-all"
                style={{ width: `${(creditUsage.storageGb.used / creditUsage.storageGb.total) * 100}%` }}
              ></div>
            </div>
            <div className="text-[10px] text-slate-500 flex justify-between">
              <span>{(creditUsage.storageGb.total - creditUsage.storageGb.used).toFixed(1)} GB free</span>
              <span>28% capacity</span>
            </div>
          </div>
        </div>
      </Card>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card hoverEffect className="border-l-4 border-l-[#4f98db]">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-xs font-semibold uppercase tracking-wider">Scheduled Queue</span>
            <Clock className="w-4 h-4 text-[#4f98db]" />
          </div>
          <div className="text-2xl font-bold text-[#333333]">{scheduledPosts.length} Posts</div>
          <div className="text-[11px] text-slate-500 mt-1 flex items-center gap-1">
            <span className="text-emerald-600 font-semibold flex items-center">
              Active <ArrowUpRight className="w-3 h-3" />
            </span>
            Meta & YouTube Automation
          </div>
        </Card>

        <Card hoverEffect className="border-l-4 border-l-[#e97538]">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-xs font-semibold uppercase tracking-wider">Pending Doctor QC</span>
            <AlertCircle className="w-4 h-4 text-[#e97538]" />
          </div>
          <div className="text-2xl font-bold text-[#333333]">
            {pendingPosts.length + pendingFlyers.length} Items
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            {pendingPosts.length} Posts • {pendingFlyers.length} Clinic Flyers
          </div>
        </Card>

        <Card hoverEffect className="border-l-4 border-l-emerald-500">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-xs font-semibold uppercase tracking-wider">Organic Inquiries</span>
            <Zap className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-2xl font-bold text-[#333333]">142 Leads</div>
          <div className="text-[11px] text-emerald-600 font-medium mt-1">
            IG (74) • FB (46) • YouTube (22)
          </div>
        </Card>

        <Card hoverEffect className="border-l-4 border-l-purple-500">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-xs font-semibold uppercase tracking-wider">Avg Organic Engagement</span>
            <Sparkles className="w-4 h-4 text-purple-500" />
          </div>
          <div className="text-2xl font-bold text-[#333333]">5.4%</div>
          <div className="text-[11px] text-slate-500 mt-1">
            Top: Invisalign Reels & Shorts
          </div>
        </Card>
      </div>

      {/* Main 2-Column Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Operations Workflow & Approvals Queue */}
        <div className="lg:col-span-7 space-y-6">
          {/* Operations Pipeline Map */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm uppercase tracking-wider text-[#333333]">
                DentiSync Operations Workflow
              </CardTitle>
              <Badge variant="primary" size="sm">ERP Pipeline</Badge>
            </CardHeader>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <Link href="/brand-intake" className="p-3 rounded-xl bg-slate-50 hover:bg-[#f0f7fd] border border-slate-200/80 transition-all group">
                <div className="text-[10px] text-slate-400 font-bold uppercase mb-1">Step 1</div>
                <div className="font-bold text-[#333333] group-hover:text-[#4f98db]">Brand Intake</div>
                <div className="text-[11px] text-slate-500 mt-0.5">Voice, ICP & Offers</div>
              </Link>

              <Link href="/calendar" className="p-3 rounded-xl bg-slate-50 hover:bg-[#f0f7fd] border border-slate-200/80 transition-all group">
                <div className="text-[10px] text-slate-400 font-bold uppercase mb-1">Step 2</div>
                <div className="font-bold text-[#333333] group-hover:text-[#4f98db]">Calendar</div>
                <div className="text-[11px] text-slate-500 mt-0.5">Full Month & Weekly</div>
              </Link>

              <Link href="/copywriter" className="p-3 rounded-xl bg-slate-50 hover:bg-[#f0f7fd] border border-slate-200/80 transition-all group">
                <div className="text-[10px] text-slate-400 font-bold uppercase mb-1">Step 3</div>
                <div className="font-bold text-[#333333] group-hover:text-[#4f98db]">AI Copywriter</div>
                <div className="text-[11px] text-slate-500 mt-0.5">Multi-Platform Copy</div>
              </Link>

              <Link href="/creative" className="p-3 rounded-xl bg-slate-50 hover:bg-[#f0f7fd] border border-slate-200/80 transition-all group">
                <div className="text-[10px] text-slate-400 font-bold uppercase mb-1">Step 4</div>
                <div className="font-bold text-[#333333] group-hover:text-[#4f98db]">Creative Studio</div>
                <div className="text-[11px] text-slate-500 mt-0.5">Reels, Story, Wallpapers</div>
              </Link>
            </div>
          </Card>

          {/* Pending Approvals Quick Action List */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <CardTitle className="text-sm uppercase tracking-wider text-[#333333]">
                  Pending Approvals Queue
                </CardTitle>
                <Badge variant="cta">{pendingPosts.length + pendingFlyers.length} Awaiting</Badge>
              </div>
              <Link href="/approvals" className="text-xs font-semibold text-[#4f98db] hover:underline flex items-center gap-1">
                View All <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </CardHeader>

            <div className="space-y-3">
              {pendingPosts.slice(0, 3).map((item) => (
                <div key={item.id} className="p-3.5 rounded-xl border border-slate-200/80 bg-slate-50/50 hover:bg-white hover:shadow-xs transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Badge variant={item.format === 'carousel' ? 'purple' : 'primary'} size="sm">
                        {item.format.toUpperCase()}
                      </Badge>
                      <span className="text-xs font-bold text-[#333333]">{item.treatmentName}</span>
                    </div>
                    <p className="text-xs text-slate-600 font-medium line-clamp-1">{item.title}</p>
                    <div className="text-[11px] text-slate-400">
                      QC Score: <span className="font-bold text-emerald-600">{item.qcResults?.score}%</span> • Platforms: {item.platforms.join(', ')}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <Button 
                      size="sm" 
                      variant="success" 
                      onClick={() => updateContentStatus(item.id, 'approved', 'Doctor approved from dashboard')}
                    >
                      Approve
                    </Button>
                    <Link href={`/copywriter?edit=${item.id}`}>
                      <Button size="sm" variant="outline">
                        Edit
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}

              {pendingPosts.length === 0 && (
                <div className="py-6 text-center text-xs text-slate-400">
                  All generated content has been reviewed! Ready for scheduling.
                </div>
              )}
            </div>
          </Card>
        </div>

        {/* Right Column: Live Feed Simulation */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-[#333333] uppercase tracking-wider">
              Live Publication Preview
            </h3>
            <span className="text-xs text-slate-400">Scheduled Asset</span>
          </div>

          {upcomingPost ? (
            <MockPostPreview record={upcomingPost} brand={brand} />
          ) : (
            <Card className="p-8 text-center text-slate-400 text-xs">
              No active posts found. Use the AI Generator to create your first clinic post!
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
