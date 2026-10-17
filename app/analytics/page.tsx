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
  Bot,
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
  const [activeHoverPoint, setActiveHoverPoint] = useState<number | null>(null);

  // Fallback to default data if organicPlatforms is undefined
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

  // 30-Day Organic Reach Trend Data Points for SVG Area Chart
  const trendPoints = [
    { day: 'Oct 01', reach: 620, inquiries: 2 },
    { day: 'Oct 04', reach: 890, inquiries: 3 },
    { day: 'Oct 07', reach: 1140, inquiries: 5 },
    { day: 'Oct 10', reach: 1420, inquiries: 6 },
    { day: 'Oct 13', reach: 1880, inquiries: 8 },
    { day: 'Oct 16', reach: 2150, inquiries: 9 },
    { day: 'Oct 19', reach: 2490, inquiries: 11 },
    { day: 'Oct 22', reach: 2840, inquiries: 13 },
    { day: 'Oct 25', reach: 3120, inquiries: 14 },
    { day: 'Oct 28', reach: 3450, inquiries: 16 },
    { day: 'Oct 31', reach: 3820, inquiries: 18 },
  ];

  const maxTrendReach = 4000;
  const svgWidth = 640;
  const svgHeight = 180;
  const paddingX = 40;
  const paddingY = 25;

  // Generate SVG coordinates
  const coordinates = trendPoints.map((pt, idx) => {
    const x = paddingX + (idx / (trendPoints.length - 1)) * (svgWidth - paddingX * 2);
    const y = svgHeight - paddingY - (pt.reach / maxTrendReach) * (svgHeight - paddingY * 2);
    return { ...pt, x, y };
  });

  const pathData = coordinates.reduce(
    (acc, pt, idx) => (idx === 0 ? `M ${pt.x} ${pt.y}` : `${acc} L ${pt.x} ${pt.y}`),
    ''
  );

  const areaData = `${pathData} L ${coordinates[coordinates.length - 1].x} ${svgHeight - paddingY} L ${coordinates[0].x} ${svgHeight - paddingY} Z`;

  return (
    <div className="space-y-6">
      {/* Streamlined Toolbar - No duplicate headings */}
      <div className="bg-white p-3.5 rounded-xl border border-slate-200/90 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Badge variant="primary" size="sm">100% Organic Tracking</Badge>
          <span className="text-xs text-slate-500">Non-promoted clinical content insights</span>
        </div>

        <div className="flex items-center gap-2.5">
          <select 
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="text-xs border border-slate-200 rounded-lg px-2.5 py-1.5 bg-slate-50 font-medium text-[#333333] outline-none focus:border-[#4f98db]"
          >
            <option>October 2026 (Last 30 Days)</option>
            <option>September 2026 (Last Month)</option>
            <option>Q3 2026 (Quarter Organic)</option>
          </select>
          <Link href="/calendar">
            <Button size="sm" variant="primary">
              <CalendarIcon className="w-3.5 h-3.5 mr-1" />
              Apply to Calendar
            </Button>
          </Link>
        </div>
      </div>

      {/* Platform Channel Filter Pills - Clean unified styling */}
      <div className="bg-white p-2 rounded-xl border border-slate-200/90 shadow-xs flex items-center justify-between gap-2 overflow-x-auto">
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setSelectedPlatform('all')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all ${
              selectedPlatform === 'all'
                ? 'bg-[#333333] text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            All Channels
            <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
              selectedPlatform === 'all' ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
            }`}>
              {totalOrganicInquiries} Leads
            </span>
          </button>

          <button
            onClick={() => setSelectedPlatform('instagram')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all ${
              selectedPlatform === 'instagram'
                ? 'bg-[#4f98db] text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Instagram className="w-3.5 h-3.5" />
            Instagram
            <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
              selectedPlatform === 'instagram' ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
            }`}>
              {organicData.instagram.organicInquiries} Leads
            </span>
          </button>

          <button
            onClick={() => setSelectedPlatform('facebook')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all ${
              selectedPlatform === 'facebook'
                ? 'bg-[#4f98db] text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Facebook className="w-3.5 h-3.5" />
            Facebook
            <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
              selectedPlatform === 'facebook' ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
            }`}>
              {organicData.facebook.organicInquiries} Leads
            </span>
          </button>

          <button
            onClick={() => setSelectedPlatform('youtube')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all ${
              selectedPlatform === 'youtube'
                ? 'bg-[#4f98db] text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Youtube className="w-3.5 h-3.5" />
            YouTube
            <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
              selectedPlatform === 'youtube' ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
            }`}>
              {organicData.youtube.organicInquiries} Leads
            </span>
          </button>
        </div>

        <div className="hidden lg:flex items-center gap-2 text-[11px] text-slate-400 pr-2">
          <Info className="w-3.5 h-3.5 text-[#4f98db]" />
          <span>Strict organic non-promoted reach</span>
        </div>
      </div>

      {/* Primary KPI Cards Grid - Unified Brand Palette (#4f98db & #333333) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card hoverEffect className="border-l-4 border-l-[#4f98db]">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-xs font-semibold uppercase tracking-wider">Organic Inquiries</span>
            <MessageSquare className="w-4 h-4 text-[#4f98db]" />
          </div>
          <div className="text-2xl font-bold text-[#333333]">
            {selectedPlatform === 'all' 
              ? `${totalOrganicInquiries} Patient Leads`
              : `${organicData[selectedPlatform].organicInquiries} Patient Leads`}
          </div>
          <div className="text-[11px] text-[#4f98db] font-semibold mt-1 flex items-center gap-1">
            <ArrowUpRight className="w-3.5 h-3.5" /> High-intent patient inquiries
          </div>
        </Card>

        <Card hoverEffect className="border-l-4 border-l-[#4f98db]">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-xs font-semibold uppercase tracking-wider">Organic Reach</span>
            <Users className="w-4 h-4 text-[#4f98db]" />
          </div>
          <div className="text-2xl font-bold text-[#333333]">
            {selectedPlatform === 'all'
              ? totalOrganicReach.toLocaleString()
              : organicData[selectedPlatform].reach.toLocaleString()}
          </div>
          <div className="text-[11px] text-slate-500 mt-1 flex items-center gap-1">
            <span className="text-emerald-600 font-semibold">+24%</span> local non-paid audience
          </div>
        </Card>

        <Card hoverEffect className="border-l-4 border-l-[#4f98db]">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-xs font-semibold uppercase tracking-wider">Engagement Rate</span>
            <TrendingUp className="w-4 h-4 text-[#4f98db]" />
          </div>
          <div className="text-2xl font-bold text-[#333333]">
            {selectedPlatform === 'all'
              ? `${avgOrganicEngagement}%`
              : `${organicData[selectedPlatform].engagementRate}%`}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            Benchmark: 1.8% – 2.5%
          </div>
        </Card>

        <Card hoverEffect className="border-l-4 border-l-[#4f98db]">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-xs font-semibold uppercase tracking-wider">Organic Impressions</span>
            <BarChart3 className="w-4 h-4 text-[#4f98db]" />
          </div>
          <div className="text-2xl font-bold text-[#333333]">
            {selectedPlatform === 'all'
              ? totalOrganicImpressions.toLocaleString()
              : organicData[selectedPlatform].impressions.toLocaleString()}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            Total non-paid impressions
          </div>
        </Card>
      </div>

      {/* Requirement 9: VISUAL GRAPHS & NUMBERS SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Graph 1: 30-Day Organic Reach Trend (Interactive SVG Area Chart) */}
        <Card className="lg:col-span-8 p-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 mb-3 border-b border-slate-100">
            <div>
              <h3 className="text-sm font-bold text-[#333333] flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-[#4f98db]" />
                30-Day Organic Reach Trend & Inquiry Trajectory
              </h3>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Visual daily trend of non-paid dental audience reach across all connected accounts.
              </p>
            </div>
            <div className="flex items-center gap-4 text-xs font-semibold">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#4f98db]"></span>
                <span className="text-[#333333]">Reach Growth</span>
              </div>
              <div className="text-[#4f98db] font-bold bg-[#f0f7fd] px-2.5 py-1 rounded-md border border-[#b9ddf7]/70">
                Peak: 3,820 / day
              </div>
            </div>
          </div>

          {/* SVG Graph Component */}
          <div className="w-full overflow-x-auto">
            <svg 
              viewBox={`0 0 ${svgWidth} ${svgHeight}`} 
              className="w-full h-44 overflow-visible select-none"
            >
              <defs>
                <linearGradient id="reachGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#4f98db" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="#4f98db" stopOpacity="0.02" />
                </linearGradient>
              </defs>

              {/* Grid Horizontal Lines */}
              {[0, 1000, 2000, 3000, 4000].map((val) => {
                const y = svgHeight - paddingY - (val / maxTrendReach) * (svgHeight - paddingY * 2);
                return (
                  <g key={val}>
                    <line 
                      x1={paddingX} 
                      y1={y} 
                      x2={svgWidth - paddingX} 
                      y2={y} 
                      stroke="#f1f5f9" 
                      strokeDasharray="4 4" 
                      strokeWidth="1" 
                    />
                    <text 
                      x={paddingX - 8} 
                      y={y + 3} 
                      textAnchor="end" 
                      fontSize="9" 
                      fill="#94a3b8"
                      fontWeight="500"
                    >
                      {val === 0 ? '0' : `${val / 1000}k`}
                    </text>
                  </g>
                );
              })}

              {/* Shaded Area Under Curve */}
              <path d={areaData} fill="url(#reachGradient)" />

              {/* Main Line Curve */}
              <path 
                d={pathData} 
                fill="none" 
                stroke="#4f98db" 
                strokeWidth="2.5" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
              />

              {/* Interactive Data Points */}
              {coordinates.map((pt, idx) => (
                <g 
                  key={idx} 
                  className="cursor-pointer group"
                  onMouseEnter={() => setActiveHoverPoint(idx)}
                  onMouseLeave={() => setActiveHoverPoint(null)}
                >
                  <circle 
                    cx={pt.x} 
                    y={pt.y} 
                    r={activeHoverPoint === idx ? "5" : "3.5"} 
                    fill="#ffffff" 
                    stroke="#4f98db" 
                    strokeWidth="2"
                    className="transition-all"
                  />
                  {/* Tooltip on hover */}
                  {activeHoverPoint === idx && (
                    <g>
                      <rect 
                        x={pt.x - 36} 
                        y={pt.y - 32} 
                        width="72" 
                        height="24" 
                        rx="6" 
                        fill="#333333" 
                        className="shadow-md"
                      />
                      <text 
                        x={pt.x} 
                        y={pt.y - 17} 
                        textAnchor="middle" 
                        fontSize="9" 
                        fontWeight="bold" 
                        fill="#ffffff"
                      >
                        {pt.reach.toLocaleString()} reach
                      </text>
                    </g>
                  )}
                  {/* Date Label on X Axis */}
                  <text 
                    x={pt.x} 
                    y={svgHeight - 6} 
                    textAnchor="middle" 
                    fontSize="9" 
                    fill="#94a3b8"
                    fontWeight="500"
                  >
                    {pt.day}
                  </text>
                </g>
              ))}
            </svg>
          </div>
        </Card>

        {/* Graph 2: Platform Attribution Comparison (Bar Graph & Numbers) */}
        <Card className="lg:col-span-4 p-5 flex flex-col justify-between">
          <div>
            <div className="pb-3 mb-3 border-b border-slate-100">
              <h3 className="text-sm font-bold text-[#333333]">Organic Platform Attribution</h3>
              <p className="text-[11px] text-slate-500 mt-0.5">Leads & reach comparison</p>
            </div>

            <div className="space-y-4">
              {/* Instagram Bar */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-[#333333] flex items-center gap-1.5">
                    <Instagram className="w-3.5 h-3.5 text-pink-600" /> Instagram
                  </span>
                  <span className="font-bold text-[#4f98db]">
                    {organicData.instagram.organicInquiries} Leads (52%)
                  </span>
                </div>
                <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-[#4f98db] rounded-full" style={{ width: '52%' }}></div>
                </div>
                <div className="flex justify-between text-[10px] text-slate-400">
                  <span>{organicData.instagram.reach.toLocaleString()} Reach</span>
                  <span>{organicData.instagram.engagementRate}% Eng</span>
                </div>
              </div>

              {/* Facebook Bar */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-[#333333] flex items-center gap-1.5">
                    <Facebook className="w-3.5 h-3.5 text-blue-600" /> Facebook
                  </span>
                  <span className="font-bold text-[#4f98db]">
                    {organicData.facebook.organicInquiries} Leads (32%)
                  </span>
                </div>
                <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-[#4f98db] rounded-full" style={{ width: '32%' }}></div>
                </div>
                <div className="flex justify-between text-[10px] text-slate-400">
                  <span>{organicData.facebook.reach.toLocaleString()} Reach</span>
                  <span>{organicData.facebook.engagementRate}% Eng</span>
                </div>
              </div>

              {/* YouTube Bar */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-[#333333] flex items-center gap-1.5">
                    <Youtube className="w-3.5 h-3.5 text-red-600" /> YouTube
                  </span>
                  <span className="font-bold text-[#4f98db]">
                    {organicData.youtube.organicInquiries} Leads (16%)
                  </span>
                </div>
                <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-[#4f98db] rounded-full" style={{ width: '16%' }}></div>
                </div>
                <div className="flex justify-between text-[10px] text-slate-400">
                  <span>{organicData.youtube.reach.toLocaleString()} Reach</span>
                  <span>{organicData.youtube.engagementRate}% Eng</span>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 text-[11px] text-slate-500">
            Total Inquiries: <strong className="text-[#333333]">142 Patient Consultations</strong>
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
                <CardTitle className="text-sm font-bold uppercase tracking-wider text-[#333333]">
                  Organic Inquiries by Clinical Treatment
                </CardTitle>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Direct patient inquiries attributed exclusively to organic posts
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
                      <span className="font-bold text-[#333333]">{t.name}</span>
                      <div className="flex items-center gap-3">
                        <span className="text-slate-400">{t.reach.toLocaleString()} reach</span>
                        <span className="font-bold text-[#4f98db]">{t.inquiries} inquiries</span>
                      </div>
                    </div>
                    {/* Visual Bar */}
                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#4f98db] rounded-full"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>

        {/* Right Column: AI Learning Engine & Top Organic Published Posts */}
        <div className="lg:col-span-6 space-y-6">
          {/* AI Practice Learning Loop */}
          <Card className="bg-[#f0f7fd] border-[#b9ddf7]">
            <CardHeader className="border-b border-[#b9ddf7]/60">
              <div className="flex items-center gap-2 text-[#1d528c]">
                <Bot className="w-5 h-5 text-[#4f98db]" />
                <CardTitle className="text-sm font-bold uppercase tracking-wider text-[#1d528c]">
                  AI Organic Growth Recommendations
                </CardTitle>
              </div>
              <Badge variant="primary" size="sm">Algorithmic Feedback</Badge>
            </CardHeader>

            <div className="space-y-3 text-xs">
              {analytics.aiRecommendations.map((rec, i) => (
                <div key={i} className="p-3 bg-white rounded-xl border border-[#b9ddf7]/70 shadow-2xs flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-[#4f98db] text-white font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <p className="text-slate-700 leading-relaxed">
                    {rec}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-3 border-t border-[#b9ddf7]/60 flex justify-end">
              <Link href="/calendar">
                <Button size="sm" variant="primary">
                  <Sparkles className="w-3.5 h-3.5 mr-1" />
                  Auto-Update Next Month&apos;s Calendar
                </Button>
              </Link>
            </div>
          </Card>

          {/* Top Converting Published Posts */}
          <Card>
            <CardHeader>
              <div>
                <CardTitle className="text-sm font-bold uppercase tracking-wider text-[#333333]">
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
                      <span className="font-bold text-[#333333]">{post.title}</span>
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

                    <span className="font-bold text-[#4f98db] bg-[#f0f7fd] border border-[#b9ddf7]/60 px-2 py-0.5 rounded-full">
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
