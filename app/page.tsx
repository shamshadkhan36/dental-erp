'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Sparkles, 
  Calendar as CalendarIcon, 
  PenTool, 
  Image as ImageIcon, 
  CheckCircle2, 
  Send, 
  BarChart3, 
  Clock, 
  ArrowUpRight, 
  AlertCircle, 
  ExternalLink,
  Bot,
  ChevronRight
} from 'lucide-react';
import { useERPStore } from '../lib/store';
import { Card, CardHeader, CardTitle } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { MockPostPreview } from '../components/MockPostPreview';

export default function DashboardOverview() {
  const { brand, calendar, contentRecords, flyers, analytics, updateContentStatus } = useERPStore();

  const pendingPosts = contentRecords.filter(r => r.status === 'pending_approval');
  const pendingFlyers = flyers.filter(f => f.status === 'pending_approval');
  const scheduledPosts = contentRecords.filter(r => r.status === 'scheduled');
  const approvedPosts = contentRecords.filter(r => r.status === 'approved');

  const upcomingPost = scheduledPosts[0] || approvedPosts[0] || contentRecords[0];

  return (
    <div className="space-y-8">
      {/* Top Banner: Clinic Status */}
      <div className="bg-gradient-to-r from-slate-900 via-sky-950 to-slate-900 text-white rounded-2xl p-6 shadow-xl relative overflow-hidden border border-slate-800">
        <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 w-64 h-64 bg-sky-500/10 rounded-full blur-3xl"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-sky-500/20 text-sky-300 text-xs font-semibold border border-sky-500/30">
                Active Clinic Workspace
              </span>
              <span className="text-xs text-slate-400">• New York Practice</span>
            </div>
            <h2 className="text-2xl font-extrabold tracking-tight text-white">{brand.clinicName}</h2>
            <p className="text-xs text-slate-300 max-w-xl leading-relaxed">
              Automated social media engine & creative operations pipeline. Empowering clinical staff with on-brand AI copywriting, scheduled meta publishing, and doctor-approved compliance.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link href="/copywriter">
              <Button variant="primary" size="md" className="shadow-lg shadow-sky-600/30">
                <Sparkles className="w-4 h-4 mr-2" />
                Launch AI Generator
              </Button>
            </Link>
            <Link href="/calendar">
              <Button variant="outline" size="md" className="bg-white/10 hover:bg-white/20 text-white border-white/20">
                <CalendarIcon className="w-4 h-4 mr-2" />
                View Calendar
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card hoverEffect className="border-l-4 border-l-sky-500">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-xs font-semibold uppercase tracking-wider">Scheduled Queue</span>
            <Clock className="w-4 h-4 text-sky-500" />
          </div>
          <div className="text-2xl font-bold text-slate-900">{scheduledPosts.length} Posts</div>
          <div className="text-[11px] text-slate-500 mt-1 flex items-center gap-1">
            <span className="text-emerald-600 font-semibold flex items-center">
              Ready <ArrowUpRight className="w-3 h-3" />
            </span>
            for Meta Auto-Publishing
          </div>
        </Card>

        <Card hoverEffect className="border-l-4 border-l-amber-500">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-xs font-semibold uppercase tracking-wider">Pending Doctor QC</span>
            <AlertCircle className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-bold text-slate-900">
            {pendingPosts.length + pendingFlyers.length} Items
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            {pendingPosts.length} Posts • {pendingFlyers.length} Clinic Flyers
          </div>
        </Card>

        <Card hoverEffect className="border-l-4 border-l-emerald-500">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-xs font-semibold uppercase tracking-wider">Patient Inquiries</span>
            <Send className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-2xl font-bold text-slate-900">{analytics.patientInquiries} Leads</div>
          <div className="text-[11px] text-emerald-600 font-medium mt-1">
            +24% vs previous 30 days
          </div>
        </Card>

        <Card hoverEffect className="border-l-4 border-l-teal-500">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-xs font-semibold uppercase tracking-wider">Avg Engagement</span>
            <BarChart3 className="w-4 h-4 text-teal-500" />
          </div>
          <div className="text-2xl font-bold text-slate-900">{analytics.avgEngagementRate}%</div>
          <div className="text-[11px] text-slate-500 mt-1">
            Top: Invisalign Carousels (7.2%)
          </div>
        </Card>
      </div>

      {/* Main 2-Column Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Operations Workflow & Approvals Queue */}
        <div className="lg:col-span-7 space-y-6">
          {/* Operations Pipeline Map (Matches Spreadsheet) */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm uppercase tracking-wider text-slate-800">
                Social Media Automation Pipeline
              </CardTitle>
              <Badge variant="outline" size="sm">ERP Workflow</Badge>
            </CardHeader>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <Link href="/brand-intake" className="p-3 rounded-xl bg-slate-50 hover:bg-sky-50 border border-slate-200/80 transition-all group">
                <div className="text-[10px] text-slate-400 font-bold uppercase mb-1">Step 1</div>
                <div className="font-bold text-slate-800 group-hover:text-sky-600">Brand Intake</div>
                <div className="text-[11px] text-slate-500 mt-0.5">Voice, ICP, Prompts</div>
              </Link>

              <Link href="/calendar" className="p-3 rounded-xl bg-slate-50 hover:bg-sky-50 border border-slate-200/80 transition-all group">
                <div className="text-[10px] text-slate-400 font-bold uppercase mb-1">Step 2</div>
                <div className="font-bold text-slate-800 group-hover:text-sky-600">Calendar</div>
                <div className="text-[11px] text-slate-500 mt-0.5">Monthly / Weekly</div>
              </Link>

              <Link href="/copywriter" className="p-3 rounded-xl bg-slate-50 hover:bg-sky-50 border border-slate-200/80 transition-all group">
                <div className="text-[10px] text-slate-400 font-bold uppercase mb-1">Step 3</div>
                <div className="font-bold text-slate-800 group-hover:text-sky-600">AI Copywriter</div>
                <div className="text-[11px] text-slate-500 mt-0.5">Hooks & Captions</div>
              </Link>

              <Link href="/approvals" className="p-3 rounded-xl bg-slate-50 hover:bg-sky-50 border border-slate-200/80 transition-all group">
                <div className="text-[10px] text-slate-400 font-bold uppercase mb-1">Step 4</div>
                <div className="font-bold text-slate-800 group-hover:text-sky-600">QC & Approval</div>
                <div className="text-[11px] text-slate-500 mt-0.5">Doctor Review</div>
              </Link>
            </div>
          </Card>

          {/* Pending Approvals Quick Action List */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <CardTitle className="text-sm uppercase tracking-wider text-slate-800">
                  Pending Approvals Queue
                </CardTitle>
                <Badge variant="warning">{pendingPosts.length + pendingFlyers.length} Awaiting</Badge>
              </div>
              <Link href="/approvals" className="text-xs font-semibold text-sky-600 hover:text-sky-700 flex items-center gap-1">
                View All <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </CardHeader>

            <div className="space-y-3">
              {pendingPosts.slice(0, 3).map((item) => (
                <div key={item.id} className="p-3.5 rounded-xl border border-slate-200/80 bg-slate-50/50 hover:bg-white hover:shadow-sm transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Badge variant={item.format === 'carousel' ? 'purple' : 'primary'} size="sm">
                        {item.format.toUpperCase()}
                      </Badge>
                      <span className="text-xs font-bold text-slate-800">{item.treatmentName}</span>
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

          {/* AI Learning & Recommendations Snippet */}
          <Card className="bg-sky-50/40 border-sky-200">
            <CardHeader className="border-sky-100">
              <div className="flex items-center gap-2 text-sky-900">
                <Bot className="w-4 h-4 text-sky-600" />
                <CardTitle className="text-xs uppercase tracking-wider text-sky-900">
                  AI Practice Growth Recommendation
                </CardTitle>
              </div>
              <Link href="/analytics" className="text-xs text-sky-700 hover:underline">
                Analytics Hub
              </Link>
            </CardHeader>
            <p className="text-xs text-sky-900/90 leading-relaxed">
              💡 {analytics.aiRecommendations[0]}
            </p>
          </Card>
        </div>

        {/* Right Column: Interactive Post Preview */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
              Live Publication Preview
            </h3>
            <span className="text-xs text-slate-500">Scheduled Asset</span>
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
