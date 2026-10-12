'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Sparkles, 
  Calendar as CalendarIcon, 
  ArrowUpRight, 
  Instagram, 
  Facebook, 
  Youtube,
  MessageSquare, 
  Share2, 
  Heart,
  Eye,
  Bot,
  Filter,
  CheckCircle2,
  Bookmark,
  Video,
  Download,
  Info
} from 'lucide-react';
import { useERPStore } from '../../lib/store';
import { defaultAnalytics } from '../../lib/default-data';
import { Card, CardHeader, CardTitle } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';

export default function AnalyticsPage() {
  const { analytics, brand } = useERPStore();
  const [selectedPlatform, setSelectedPlatform] = useState<'all' | 'instagram' | 'facebook' | 'youtube'>('all');
  const [dateRange, setDateRange] = useState('October 2026 (Last 30 Days)');

  // Fallback to default data if organicPlatforms is undefined in localStorage
  const organicData = analytics?.organicPlatforms || defaultAnalytics.organicPlatforms;

  const totalOrganicReach = 
    organicData.instagram.reach + 
    organicData.facebook.reach + 
    organicData.youtube.reach;

  const totalOrganicImpressions = 
    organicData.instagram.impressions + 
    organicData.facebook.impressions + 
    organicData.youtube.impressions;

  const totalOrganicInquiries = 
    organicData.instagram.organicInquiries + 
    organicData.facebook.organicInquiries + 
    organicData.youtube.organicInquiries;

  const totalOrganicVideoViews = 
    (organicData.instagram.videoViews || 0) + 
    (organicData.youtube.videoViews || 0);

  const avgOrganicEngagement = (
    (organicData.instagram.engagementRate + 
     organicData.facebook.engagementRate + 
     organicData.youtube.engagementRate) / 3
  ).toFixed(1);

  // Filter posts based on selected tab
  const posts = analytics?.recentPublishedPosts || defaultAnalytics.recentPublishedPosts;
  const filteredPosts = selectedPlatform === 'all' 
    ? posts 
    : posts.filter(p => p.platform === selectedPlatform);

  return (
    <div className="space-y-6">
      {/* Top Banner - Platform-Specific Organic Focus */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <h2 className="text-lg font-bold text-slate-900">Platform-Specific Organic Analytics & Growth</h2>
            <Badge variant="success">100% Organic Insights Only</Badge>
            <Badge variant="primary">Zero Paid Ad Distortion</Badge>
          </div>
          <p className="text-xs text-slate-500">
            Dedicated organic attribution tracking for <span className="font-semibold text-pink-600">Instagram</span>, <span className="font-semibold text-blue-600">Facebook</span>, and <span className="font-semibold text-red-600">YouTube</span> content performance & clinical patient inquiries.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <select 
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="text-xs border border-slate-200 rounded-lg px-2.5 py-1.5 bg-slate-50 font-medium text-slate-700 outline-none focus:border-[#4f98db]"
          >
            <option>October 2026 (Last 30 Days)</option>
            <option>September 2026 (Last Month)</option>
            <option>Q3 2026 (Quarter Organic)</option>
          </select>
          <Link href="/calendar">
            <Button size="sm" variant="cta">
              <CalendarIcon className="w-3.5 h-3.5 mr-1" />
              Apply to Calendar
            </Button>
          </Link>
        </div>
      </div>

      {/* Platform Selector Tabs */}
      <div className="bg-white p-2 rounded-xl border border-slate-200/80 shadow-xs flex items-center justify-between gap-2 overflow-x-auto">
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setSelectedPlatform('all')}
            className={`px-3.5 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all ${
              selectedPlatform === 'all'
                ? 'bg-[#333333] text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            All Organic Channels
            <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
              selectedPlatform === 'all' ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
            }`}>
              {totalOrganicInquiries} Leads
            </span>
          </button>

          <button
            onClick={() => setSelectedPlatform('instagram')}
            className={`px-3.5 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all ${
              selectedPlatform === 'instagram'
                ? 'bg-pink-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-pink-50 hover:text-pink-700'
            }`}
          >
            <Instagram className="w-3.5 h-3.5 text-pink-500" />
            Instagram Organic
            <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
              selectedPlatform === 'instagram' ? 'bg-white/20 text-white' : 'bg-pink-100 text-pink-700'
            }`}>
              {organicData.instagram.organicInquiries} Leads
            </span>
          </button>

          <button
            onClick={() => setSelectedPlatform('facebook')}
            className={`px-3.5 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all ${
              selectedPlatform === 'facebook'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-blue-50 hover:text-blue-700'
            }`}
          >
            <Facebook className="w-3.5 h-3.5 text-blue-600" />
            Facebook Organic
            <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
              selectedPlatform === 'facebook' ? 'bg-white/20 text-white' : 'bg-blue-100 text-blue-700'
            }`}>
              {organicData.facebook.organicInquiries} Leads
            </span>
          </button>

          <button
            onClick={() => setSelectedPlatform('youtube')}
            className={`px-3.5 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all ${
              selectedPlatform === 'youtube'
                ? 'bg-red-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-red-50 hover:text-red-700'
            }`}
          >
            <Youtube className="w-3.5 h-3.5 text-red-600" />
            YouTube Organic
            <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
              selectedPlatform === 'youtube' ? 'bg-white/20 text-white' : 'bg-red-100 text-red-700'
            }`}>
              {organicData.youtube.organicInquiries} Leads
            </span>
          </button>
        </div>

        <div className="hidden lg:flex items-center gap-2 text-[11px] text-slate-500 pr-2">
          <Info className="w-3.5 h-3.5 text-[#4f98db]" />
          <span>Filters calibrated strictly to organic non-boosted posts</span>
        </div>
      </div>

      {/* Primary KPI Cards Grid (Dynamic to Platform Selection) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1: Organic Inquiries */}
        <Card hoverEffect className="border-l-4 border-l-emerald-500">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-xs font-semibold uppercase tracking-wider">
              {selectedPlatform === 'all' ? 'Total Organic Inquiries' : `${selectedPlatform.toUpperCase()} Organic Inquiries`}
            </span>
            <MessageSquare className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-2xl font-bold text-slate-900">
            {selectedPlatform === 'all' 
              ? `${totalOrganicInquiries} Patient Leads`
              : `${organicData[selectedPlatform].organicInquiries} Patient Leads`}
          </div>
          <div className="text-[11px] text-emerald-600 font-semibold mt-1 flex items-center gap-1">
            <ArrowUpRight className="w-3.5 h-3.5" /> Direct DM & Comments inquiries
          </div>
        </Card>

        {/* KPI 2: Organic Reach */}
        <Card hoverEffect className="border-l-4 border-l-[#4f98db]">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-xs font-semibold uppercase tracking-wider">
              {selectedPlatform === 'all' ? 'Combined Organic Reach' : `${selectedPlatform.toUpperCase()} Organic Reach`}
            </span>
            <Users className="w-4 h-4 text-[#4f98db]" />
          </div>
          <div className="text-2xl font-bold text-slate-900">
            {selectedPlatform === 'all'
              ? totalOrganicReach.toLocaleString()
              : organicData[selectedPlatform].reach.toLocaleString()}
          </div>
          <div className="text-[11px] text-sky-600 font-semibold mt-1 flex items-center gap-1">
            <ArrowUpRight className="w-3.5 h-3.5" /> +24% local non-paid reach
          </div>
        </Card>

        {/* KPI 3: Organic Engagement Rate */}
        <Card hoverEffect className="border-l-4 border-l-amber-500">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-xs font-semibold uppercase tracking-wider">
              {selectedPlatform === 'all' ? 'Avg Organic Engagement' : `${selectedPlatform.toUpperCase()} Engagement`}
            </span>
            <TrendingUp className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-bold text-slate-900">
            {selectedPlatform === 'all'
              ? `${avgOrganicEngagement}%`
              : `${organicData[selectedPlatform].engagementRate}%`}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            Industry Benchmark: 1.8% - 2.5%
          </div>
        </Card>

        {/* KPI 4: Organic Video Views / Impressions */}
        <Card hoverEffect className="border-l-4 border-l-purple-500">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-xs font-semibold uppercase tracking-wider">
              {selectedPlatform === 'facebook' ? 'Organic Post Impressions' : 'Organic Video & Shorts Views'}
            </span>
            <Video className="w-4 h-4 text-purple-500" />
          </div>
          <div className="text-2xl font-bold text-slate-900">
            {selectedPlatform === 'facebook'
              ? organicData.facebook.impressions.toLocaleString()
              : selectedPlatform === 'all'
              ? totalOrganicVideoViews.toLocaleString()
              : (organicData[selectedPlatform].videoViews || 0).toLocaleString()}
          </div>
          <div className="text-[11px] text-purple-600 font-semibold mt-1">
            {selectedPlatform === 'facebook' ? 'Total organic timeline impressions' : 'Organic Reels & Shorts plays'}
          </div>
        </Card>
      </div>

      {/* Platform-Specific Organic Breakdown Cards (Instagram vs Facebook vs YouTube) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Instagram Organic Card */}
        <Card className={`border-t-4 border-t-pink-500 transition-all ${selectedPlatform === 'instagram' ? 'ring-2 ring-pink-500/30 shadow-md' : ''}`}>
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-pink-50 text-pink-600 flex items-center justify-center">
                <Instagram className="w-4 h-4" />
              </div>
              <div>
                <CardTitle className="text-sm font-bold text-slate-900">Instagram Organic</CardTitle>
                <span className="text-[11px] text-slate-400">@apexsmilestudio • Reels & Carousels</span>
              </div>
            </div>
            <Badge variant="outline" className="border-pink-200 text-pink-700 bg-pink-50 font-bold">
              {organicData.instagram.engagementRate}% Eng.
            </Badge>
          </CardHeader>

          <div className="space-y-3 text-xs pt-1">
            <div className="grid grid-cols-2 gap-2 text-center">
              <div className="p-2.5 bg-slate-50 rounded-lg">
                <div className="text-[10px] text-slate-500 uppercase font-medium">Organic Reach</div>
                <div className="text-sm font-bold text-slate-900">{organicData.instagram.reach.toLocaleString()}</div>
              </div>
              <div className="p-2.5 bg-slate-50 rounded-lg">
                <div className="text-[10px] text-slate-500 uppercase font-medium">Impressions</div>
                <div className="text-sm font-bold text-slate-900">{organicData.instagram.impressions.toLocaleString()}</div>
              </div>
              <div className="p-2.5 bg-pink-50 rounded-lg border border-pink-100">
                <div className="text-[10px] text-pink-700 uppercase font-medium">Reel Views</div>
                <div className="text-sm font-bold text-pink-900">{organicData.instagram.videoViews?.toLocaleString()}</div>
              </div>
              <div className="p-2.5 bg-emerald-50 rounded-lg border border-emerald-100">
                <div className="text-[10px] text-emerald-700 uppercase font-medium">Inquiries</div>
                <div className="text-sm font-bold text-emerald-800">{organicData.instagram.organicInquiries} leads</div>
              </div>
            </div>

            <div className="p-2.5 bg-slate-50 rounded-lg space-y-1.5">
              <div className="flex items-center justify-between text-slate-600">
                <span className="flex items-center gap-1"><Heart className="w-3 h-3 text-rose-500" /> Saves & Likes:</span>
                <span className="font-bold text-slate-800">{organicData.instagram.savesOrLikes.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between text-slate-600">
                <span className="flex items-center gap-1"><Share2 className="w-3 h-3 text-sky-500" /> Direct Shares:</span>
                <span className="font-bold text-slate-800">{organicData.instagram.shares}</span>
              </div>
              <div className="flex items-center justify-between text-slate-600">
                <span className="flex items-center gap-1"><Users className="w-3 h-3 text-purple-500" /> Follower Growth:</span>
                <span className="font-bold text-emerald-600">+{organicData.instagram.followersGained} organic</span>
              </div>
            </div>

            <div className="text-[11px] text-slate-500 italic bg-pink-50/50 p-2 rounded-lg border border-pink-100/60">
              <span className="font-bold text-pink-700">Top Organic Treatment:</span> Invisalign Clear Aligners (58% of IG DM inquiries).
            </div>
          </div>
        </Card>

        {/* Facebook Organic Card */}
        <Card className={`border-t-4 border-t-blue-500 transition-all ${selectedPlatform === 'facebook' ? 'ring-2 ring-blue-500/30 shadow-md' : ''}`}>
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                <Facebook className="w-4 h-4" />
              </div>
              <div>
                <CardTitle className="text-sm font-bold text-slate-900">Facebook Organic</CardTitle>
                <span className="text-[11px] text-slate-400">Apex Smile Studio NYC • Page Community</span>
              </div>
            </div>
            <Badge variant="outline" className="border-blue-200 text-blue-700 bg-blue-50 font-bold">
              {organicData.facebook.engagementRate}% Eng.
            </Badge>
          </CardHeader>

          <div className="space-y-3 text-xs pt-1">
            <div className="grid grid-cols-2 gap-2 text-center">
              <div className="p-2.5 bg-slate-50 rounded-lg">
                <div className="text-[10px] text-slate-500 uppercase font-medium">Organic Reach</div>
                <div className="text-sm font-bold text-slate-900">{organicData.facebook.reach.toLocaleString()}</div>
              </div>
              <div className="p-2.5 bg-slate-50 rounded-lg">
                <div className="text-[10px] text-slate-500 uppercase font-medium">Impressions</div>
                <div className="text-sm font-bold text-slate-900">{organicData.facebook.impressions.toLocaleString()}</div>
              </div>
              <div className="p-2.5 bg-blue-50 rounded-lg border border-blue-100">
                <div className="text-[10px] text-blue-700 uppercase font-medium">Page Followers</div>
                <div className="text-sm font-bold text-blue-900">+{organicData.facebook.followersGained}</div>
              </div>
              <div className="p-2.5 bg-emerald-50 rounded-lg border border-emerald-100">
                <div className="text-[10px] text-emerald-700 uppercase font-medium">Inquiries</div>
                <div className="text-sm font-bold text-emerald-800">{organicData.facebook.organicInquiries} leads</div>
              </div>
            </div>

            <div className="p-2.5 bg-slate-50 rounded-lg space-y-1.5">
              <div className="flex items-center justify-between text-slate-600">
                <span className="flex items-center gap-1"><Heart className="w-3 h-3 text-blue-500" /> Post Reactions:</span>
                <span className="font-bold text-slate-800">{organicData.facebook.savesOrLikes.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between text-slate-600">
                <span className="flex items-center gap-1"><Share2 className="w-3 h-3 text-sky-500" /> Community Shares:</span>
                <span className="font-bold text-slate-800">{organicData.facebook.shares}</span>
              </div>
              <div className="flex items-center justify-between text-slate-600">
                <span className="flex items-center gap-1"><MessageSquare className="w-3 h-3 text-emerald-500" /> Messenger Inquiries:</span>
                <span className="font-bold text-emerald-600">{organicData.facebook.organicInquiries} booked consults</span>
              </div>
            </div>

            <div className="text-[11px] text-slate-500 italic bg-blue-50/50 p-2 rounded-lg border border-blue-100/60">
              <span className="font-bold text-blue-700">Top Organic Treatment:</span> Guided Dental Implants & Family Dentistry.
            </div>
          </div>
        </Card>

        {/* YouTube Organic Card */}
        <Card className={`border-t-4 border-t-red-500 transition-all ${selectedPlatform === 'youtube' ? 'ring-2 ring-red-500/30 shadow-md' : ''}`}>
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-red-50 text-red-600 flex items-center justify-center">
                <Youtube className="w-4 h-4" />
              </div>
              <div>
                <CardTitle className="text-sm font-bold text-slate-900">YouTube Organic</CardTitle>
                <span className="text-[11px] text-slate-400">Apex Smile Studio • Shorts & Clinical Q&A</span>
              </div>
            </div>
            <Badge variant="outline" className="border-red-200 text-red-700 bg-red-50 font-bold">
              {organicData.youtube.engagementRate}% Eng.
            </Badge>
          </CardHeader>

          <div className="space-y-3 text-xs pt-1">
            <div className="grid grid-cols-2 gap-2 text-center">
              <div className="p-2.5 bg-slate-50 rounded-lg">
                <div className="text-[10px] text-slate-500 uppercase font-medium">Channel Reach</div>
                <div className="text-sm font-bold text-slate-900">{organicData.youtube.reach.toLocaleString()}</div>
              </div>
              <div className="p-2.5 bg-slate-50 rounded-lg">
                <div className="text-[10px] text-slate-500 uppercase font-medium">Impressions</div>
                <div className="text-sm font-bold text-slate-900">{organicData.youtube.impressions.toLocaleString()}</div>
              </div>
              <div className="p-2.5 bg-red-50 rounded-lg border border-red-100">
                <div className="text-[10px] text-red-700 uppercase font-medium">Shorts / Video Views</div>
                <div className="text-sm font-bold text-red-900">{organicData.youtube.videoViews?.toLocaleString()}</div>
              </div>
              <div className="p-2.5 bg-emerald-50 rounded-lg border border-emerald-100">
                <div className="text-[10px] text-emerald-700 uppercase font-medium">Inquiries</div>
                <div className="text-sm font-bold text-emerald-800">{organicData.youtube.organicInquiries} leads</div>
              </div>
            </div>

            <div className="p-2.5 bg-slate-50 rounded-lg space-y-1.5">
              <div className="flex items-center justify-between text-slate-600">
                <span className="flex items-center gap-1"><Heart className="w-3 h-3 text-red-500" /> Likes & Thumbs Up:</span>
                <span className="font-bold text-slate-800">{organicData.youtube.savesOrLikes.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between text-slate-600">
                <span className="flex items-center gap-1"><Share2 className="w-3 h-3 text-sky-500" /> Video Shares:</span>
                <span className="font-bold text-slate-800">{organicData.youtube.shares}</span>
              </div>
              <div className="flex items-center justify-between text-slate-600">
                <span className="flex items-center gap-1"><Users className="w-3 h-3 text-red-500" /> New Subscribers:</span>
                <span className="font-bold text-emerald-600">+{organicData.youtube.followersGained} organic</span>
              </div>
            </div>

            <div className="text-[11px] text-slate-500 italic bg-red-50/50 p-2 rounded-lg border border-red-100/60">
              <span className="font-bold text-red-700">Top Organic Treatment:</span> 3D Digital Scans & Dental Implant FAQs.
            </div>
          </div>
        </Card>
      </div>

      {/* Main 2-Column Section: Organic Breakdown by Treatment & Top Published Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Organic Clinical Inquiries Breakdown */}
        <div className="lg:col-span-6 space-y-6">
          <Card>
            <CardHeader>
              <div>
                <CardTitle className="text-sm font-bold uppercase tracking-wider text-slate-800">
                  Organic Patient Inquiries by Clinical Treatment
                </CardTitle>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Direct inquiries attributed exclusively to organic social posts
                </p>
              </div>
              <Badge variant="primary">High Intent</Badge>
            </CardHeader>

            <div className="space-y-4 text-xs">
              {analytics.topConvertingTreatments.map((t, idx) => {
                const maxInquiries = 60;
                const percentage = Math.round((t.inquiries / maxInquiries) * 100);

                return (
                  <div key={idx} className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-800">{t.name}</span>
                      <div className="flex items-center gap-3">
                        <span className="text-slate-400">{t.reach.toLocaleString()} organic reach</span>
                        <span className="font-bold text-emerald-600">{t.inquiries} inquiries</span>
                      </div>
                    </div>
                    {/* Visual Bar */}
                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#4f98db] to-teal-400 rounded-full"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>

          {/* Organic Platform Channel Share */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-bold uppercase tracking-wider text-slate-800">
                Organic Inquiries Share by Platform
              </CardTitle>
              <span className="text-xs text-slate-500">142 Total Organic Inquiries</span>
            </CardHeader>

            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="p-3 bg-pink-50/50 rounded-xl border border-pink-100 space-y-1">
                <Instagram className="w-5 h-5 text-pink-600 mx-auto" />
                <div className="text-lg font-bold text-slate-900">
                  {Math.round((organicData.instagram.organicInquiries / totalOrganicInquiries) * 100)}%
                </div>
                <div className="text-[11px] text-slate-600 font-medium">Instagram</div>
                <div className="text-[10px] text-pink-600 font-semibold">{organicData.instagram.organicInquiries} Leads</div>
              </div>

              <div className="p-3 bg-blue-50/50 rounded-xl border border-blue-100 space-y-1">
                <Facebook className="w-5 h-5 text-blue-600 mx-auto" />
                <div className="text-lg font-bold text-slate-900">
                  {Math.round((organicData.facebook.organicInquiries / totalOrganicInquiries) * 100)}%
                </div>
                <div className="text-[11px] text-slate-600 font-medium">Facebook</div>
                <div className="text-[10px] text-blue-600 font-semibold">{organicData.facebook.organicInquiries} Leads</div>
              </div>

              <div className="p-3 bg-red-50/50 rounded-xl border border-red-100 space-y-1">
                <Youtube className="w-5 h-5 text-red-600 mx-auto" />
                <div className="text-lg font-bold text-slate-900">
                  {Math.round((organicData.youtube.organicInquiries / totalOrganicInquiries) * 100)}%
                </div>
                <div className="text-[11px] text-slate-600 font-medium">YouTube</div>
                <div className="text-[10px] text-red-600 font-semibold">{organicData.youtube.organicInquiries} Leads</div>
              </div>
            </div>
          </Card>
        </div>

        {/* Right Column: AI Learning Engine & Top Organic Published Posts */}
        <div className="lg:col-span-6 space-y-6">
          {/* AI Practice Learning Loop - Organic Specific */}
          <Card className="bg-sky-50/50 border-sky-200">
            <CardHeader className="border-sky-100">
              <div className="flex items-center gap-2 text-sky-900">
                <Bot className="w-5 h-5 text-[#4f98db]" />
                <CardTitle className="text-sm font-bold uppercase tracking-wider text-sky-900">
                  AI Organic Growth Recommendations
                </CardTitle>
              </div>
              <Badge variant="primary" size="sm">Algorithmic Feedback</Badge>
            </CardHeader>

            <div className="space-y-3 text-xs">
              {analytics.aiRecommendations.map((rec, i) => (
                <div key={i} className="p-3 bg-white rounded-xl border border-sky-100 shadow-2xs flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-[#4f98db] text-white font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <p className="text-slate-700 leading-relaxed">
                    {rec}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-3 border-t border-sky-100 flex justify-end">
              <Link href="/calendar">
                <Button size="sm" variant="cta">
                  <Sparkles className="w-3.5 h-3.5 mr-1" />
                  Auto-Update Next Month&apos;s Calendar
                </Button>
              </Link>
            </div>
          </Card>

          {/* Top Converting Published Posts (Filterable by platform) */}
          <Card>
            <CardHeader>
              <div>
                <CardTitle className="text-sm font-bold uppercase tracking-wider text-slate-800">
                  Top Converting Organic Posts
                </CardTitle>
                <span className="text-[11px] text-slate-400">
                  {selectedPlatform === 'all' ? 'All Platforms' : selectedPlatform.toUpperCase()}
                </span>
              </div>
              <Badge variant="outline">Verified Organic</Badge>
            </CardHeader>

            <div className="space-y-3">
              {filteredPosts.map((post) => (
                <div key={post.id} className="p-3 rounded-xl border border-slate-200/80 bg-slate-50/50 hover:bg-white transition-all space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {post.platform === 'instagram' && <Instagram className="w-3.5 h-3.5 text-pink-600" />}
                      {post.platform === 'facebook' && <Facebook className="w-3.5 h-3.5 text-blue-600" />}
                      {post.platform === 'youtube' && <Youtube className="w-3.5 h-3.5 text-red-600" />}
                      <span className="font-bold text-slate-900">{post.title}</span>
                    </div>
                    <span className="text-[10px] text-slate-400">{post.date}</span>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-100">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1">
                        <Heart className="w-3 h-3 text-rose-500" /> {post.likes}
                      </span>
                      <span className="flex items-center gap-1">
                        <Share2 className="w-3 h-3 text-sky-500" /> {post.shares}
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageSquare className="w-3 h-3 text-teal-500" /> {post.comments}
                      </span>
                    </div>

                    <span className="font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                      {post.inquiries} Direct Inquiries
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
