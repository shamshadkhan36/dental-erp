'use client';

import React from 'react';
import Link from 'next/link';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  DollarSign, 
  Sparkles, 
  Calendar as CalendarIcon, 
  ArrowUpRight, 
  Instagram, 
  Facebook, 
  MessageSquare, 
  Share2, 
  Heart,
  Bot
} from 'lucide-react';
import { useERPStore } from '../../lib/store';
import { Card, CardHeader, CardTitle } from '../../components/ui/Card';
import { PageBanner } from '../../components/ui/PageBanner';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';

export default function AnalyticsPage() {
  const { analytics, brand } = useERPStore();

  return (
    <div className="space-y-6">
      <PageBanner eyebrow="Practice insights" title="Analytics & Growth Dashboard" description="Understand how social performance connects to treatment interest and practice growth." icon={BarChart3} action={
        <>
          <Badge variant="success">Learning loop active</Badge>
          <Link href="/calendar">
            <Button size="sm" variant="primary">
              <CalendarIcon className="w-3.5 h-3.5 mr-1 text-sky-200" />
              Use insights
            </Button>
          </Link>
        </>
      } />

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card hoverEffect className="border-l-4 border-l-emerald-500">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-xs font-semibold uppercase tracking-wider">Patient Inquiries</span>
            <MessageSquare className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-2xl font-bold text-slate-900">{analytics.patientInquiries} Leads</div>
          <div className="text-[11px] text-emerald-600 font-semibold mt-1 flex items-center gap-1">
            <ArrowUpRight className="w-3.5 h-3.5" /> +28% this month
          </div>
        </Card>

        <Card hoverEffect className="border-l-4 border-l-sky-500">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-xs font-semibold uppercase tracking-wider">Revenue Pipeline</span>
            <DollarSign className="w-4 h-4 text-sky-500" />
          </div>
          <div className="text-2xl font-bold text-slate-900">
            ${analytics.estimatedRevenuePipeline.toLocaleString()}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            Attributed to booked treatments
          </div>
        </Card>

        <Card hoverEffect className="border-l-4 border-l-purple-500">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-xs font-semibold uppercase tracking-wider">Total Reach</span>
            <Users className="w-4 h-4 text-purple-500" />
          </div>
          <div className="text-2xl font-bold text-slate-900">66,600</div>
          <div className="text-[11px] text-purple-600 font-semibold mt-1">
            Local Patients Reached
          </div>
        </Card>

        <Card hoverEffect className="border-l-4 border-l-amber-500">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-xs font-semibold uppercase tracking-wider">Avg Engagement</span>
            <TrendingUp className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-bold text-slate-900">{analytics.avgEngagementRate}%</div>
          <div className="text-[11px] text-slate-500 mt-1">
            Industry Benchmark: 1.8%
          </div>
        </Card>
      </div>

      {/* Main 2-Column Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Treatment Conversion Breakdown */}
        <div className="lg:col-span-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-bold uppercase tracking-wider text-slate-800">
                Patient Inquiries by Clinical Treatment
              </CardTitle>
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
                        <span className="text-slate-400">{t.reach.toLocaleString()} reach</span>
                        <span className="font-bold text-emerald-600">{t.inquiries} inquiries</span>
                      </div>
                    </div>
                    {/* Visual Bar */}
                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-sky-500 to-teal-400 rounded-full"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>

          {/* Platform Distribution */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-bold uppercase tracking-wider text-slate-800">
                Platform Performance Split
              </CardTitle>
              <span className="text-xs text-slate-500">IG vs FB</span>
            </CardHeader>

            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="p-4 bg-pink-50/50 rounded-xl border border-pink-100 space-y-1">
                <Instagram className="w-6 h-6 text-pink-600 mx-auto" />
                <div className="text-xl font-bold text-slate-900">{analytics.platformSplit.instagram}%</div>
                <div className="text-xs text-slate-600 font-medium">Instagram Audience</div>
                <div className="text-[10px] text-slate-400">Primary for Invisalign & Veneers</div>
              </div>

              <div className="p-4 bg-blue-50/50 rounded-xl border border-blue-100 space-y-1">
                <Facebook className="w-6 h-6 text-blue-600 mx-auto" />
                <div className="text-xl font-bold text-slate-900">{analytics.platformSplit.facebook}%</div>
                <div className="text-xs text-slate-600 font-medium">Facebook Audience</div>
                <div className="text-[10px] text-slate-400">Primary for Implants & Family Care</div>
              </div>
            </div>
          </Card>
        </div>

        {/* Right Column: AI Learning Engine & Top Posts */}
        <div className="lg:col-span-6 space-y-6">
          {/* AI Practice Learning Loop */}
          <Card className="bg-sky-50/50 border-sky-200">
            <CardHeader className="border-sky-100">
              <div className="flex items-center gap-2 text-sky-900">
                <Bot className="w-5 h-5 text-sky-600" />
                <CardTitle className="text-sm font-bold uppercase tracking-wider text-sky-900">
                  AI Practice Growth Recommendations
                </CardTitle>
              </div>
              <Badge variant="primary" size="sm">Automated Feedback</Badge>
            </CardHeader>

            <div className="space-y-3 text-xs">
              {analytics.aiRecommendations.map((rec, i) => (
                <div key={i} className="p-3 bg-white rounded-xl border border-sky-100 shadow-2xs flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-sky-500 text-white font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">
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
              <CardTitle className="text-sm font-bold uppercase tracking-wider text-slate-800">
                Top Converting Published Posts
              </CardTitle>
              <Badge variant="outline">Verified Metrics</Badge>
            </CardHeader>

            <div className="space-y-3">
              {analytics.recentPublishedPosts.map((post) => (
                <div key={post.id} className="p-3 rounded-xl border border-slate-200/80 bg-slate-50/50 hover:bg-white transition-all space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {post.platform === 'instagram' ? (
                        <Instagram className="w-3.5 h-3.5 text-pink-600" />
                      ) : (
                        <Facebook className="w-3.5 h-3.5 text-blue-600" />
                      )}
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
                      {post.inquiries} Booking Inquiries
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
