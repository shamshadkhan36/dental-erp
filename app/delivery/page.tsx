'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Download, 
  Send, 
  Copy, 
  Check, 
  Calendar as CalendarIcon, 
  Clock, 
  Instagram, 
  Facebook, 
  Youtube,
  Sparkles, 
  FolderGit2, 
  ExternalLink, 
  Eye, 
  Layers
} from 'lucide-react';
import { useERPStore } from '../../lib/store';
import { Card, CardHeader, CardTitle } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
import { MockPostPreview } from '../../components/MockPostPreview';
import { ContentRecord } from '../../types';

export default function DeliveryPage() {
  const { brand, contentRecords, flyers, updateContentStatus } = useERPStore();

  const [activeTab, setActiveTab] = useState<'bank' | 'scheduler'>('bank');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [selectedRecordForPreview, setSelectedRecordForPreview] = useState<ContentRecord | null>(null);

  // Scheduling modal state
  const [scheduleModalRecord, setScheduleModalRecord] = useState<ContentRecord | null>(null);
  const [scheduleDate, setScheduleDate] = useState('2026-10-18');
  const [scheduleTime, setScheduleTime] = useState('11:30');
  const [targetAccounts, setTargetAccounts] = useState({ instagram: true, facebook: true, youtube: true });
  const [scheduledSuccess, setScheduledSuccess] = useState(false);

  const approvedRecords = contentRecords.filter(r => r.status === 'approved');
  const scheduledRecords = contentRecords.filter(r => r.status === 'scheduled');
  const approvedFlyers = flyers.filter(f => f.status === 'approved');

  const handleCopyCaption = (record: ContentRecord) => {
    const fullPost = `${record.hook}\n\n${record.caption}\n\n${record.cta}\n\n${record.hashtags.join(' ')}`;
    navigator.clipboard.writeText(fullPost);
    setCopiedId(record.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handlePublishNow = (recordId: string) => {
    updateContentStatus(recordId, 'published', 'Direct published to social media channels via multi-platform API');
  };

  const handleConfirmSchedule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!scheduleModalRecord) return;
    updateContentStatus(scheduleModalRecord.id, 'scheduled', `Scheduled for ${scheduleDate} at ${scheduleTime}`);
    setScheduledSuccess(true);
    setTimeout(() => {
      setScheduledSuccess(false);
      setScheduleModalRecord(null);
      setActiveTab('scheduler');
    }, 1200);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-[#333333]">Delivery & Multi-Channel Scheduling</h2>
            <Badge variant="primary">Meta (IG, FB) & YouTube Connected</Badge>
          </div>
          <p className="text-xs text-slate-500">
            Export approved copy, download visual assets, and schedule automated publishing across all clinic channels.
          </p>
        </div>

        <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl text-xs">
          <button
            onClick={() => setActiveTab('bank')}
            className={`px-4 py-2 font-semibold rounded-lg transition-all ${
              activeTab === 'bank'
                ? 'bg-[#4f98db] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Approved Content Bank ({approvedRecords.length + approvedFlyers.length})
          </button>
          <button
            onClick={() => setActiveTab('scheduler')}
            className={`px-4 py-2 font-semibold rounded-lg transition-all ${
              activeTab === 'scheduler'
                ? 'bg-[#4f98db] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Scheduled Queue ({scheduledRecords.length})
          </button>
        </div>
      </div>

      {/* TAB 1: Approved Content Bank */}
      {activeTab === 'bank' && (
        <div className="space-y-6">
          {approvedFlyers.length > 0 && (
            <Card className="bg-[#f0f7fd] border-[#b9ddf7]">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Badge variant="cta">CLINIC FLYERS READY</Badge>
                  <h4 className="text-sm font-bold text-slate-900">Approved Promotional Flyers ({approvedFlyers.length})</h4>
                </div>
                <Link href="/creative?tab=flyers">
                  <Button size="sm" variant="outline">
                    Flyer Studio
                  </Button>
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {approvedFlyers.map((flyer) => (
                  <div key={flyer.id} className="p-3 bg-white rounded-xl border border-[#b9ddf7] shadow-2xs flex items-center justify-between">
                    <div>
                      <div className="font-bold text-xs text-slate-900">{flyer.headline}</div>
                      <div className="text-[11px] text-slate-500">Offer: {flyer.offerBadge}</div>
                    </div>
                    <Button 
                      size="sm" 
                      variant="primary"
                      onClick={() => window.print()}
                    >
                      <Download className="w-3.5 h-3.5 mr-1" />
                      Print / PDF
                    </Button>
                  </div>
                ))}
              </div>
            </Card>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {approvedRecords.map((post) => (
              <Card key={post.id} hoverEffect className="flex flex-col justify-between">
                <div>
                  <div className="relative aspect-video rounded-lg overflow-hidden bg-slate-900 mb-3">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={post.creativeAssetUrl || "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=1080&auto=format&fit=crop&q=80"}
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 left-2 flex gap-1">
                      <Badge variant="secondary" size="sm">
                        {post.format.toUpperCase()}
                      </Badge>
                      <Badge variant="success" size="sm">
                        DOCTOR APPROVED
                      </Badge>
                    </div>
                  </div>

                  <h4 className="font-bold text-slate-900 text-sm mb-1">{post.title}</h4>
                  <p className="text-xs text-slate-500 line-clamp-2 mb-3">{post.hook}</p>
                </div>

                <div className="space-y-2 pt-3 border-t border-slate-100 text-xs">
                  <div className="flex items-center justify-between text-slate-400 text-[11px]">
                    <span>Platforms: {post.platforms.join(', ')}</span>
                    <a
                      href={brand.gdriveRootFolder}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[#4f98db] hover:underline flex items-center gap-0.5"
                    >
                      GDrive <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleCopyCaption(post)}
                    >
                      {copiedId === post.id ? (
                        <>
                          <Check className="w-3.5 h-3.5 mr-1 text-emerald-600" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 mr-1 text-slate-600" />
                          Copy Text
                        </>
                      )}
                    </Button>

                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setSelectedRecordForPreview(post)}
                    >
                      <Eye className="w-3.5 h-3.5 mr-1" />
                      Preview
                    </Button>
                  </div>

                  <Button
                    size="sm"
                    variant="cta"
                    className="w-full"
                    onClick={() => setScheduleModalRecord(post)}
                  >
                    <Send className="w-3.5 h-3.5 mr-1" />
                    Schedule Publishing
                  </Button>
                </div>
              </Card>
            ))}

            {approvedRecords.length === 0 && (
              <div className="col-span-3 p-12 text-center text-slate-400 text-xs bg-white rounded-xl border border-slate-200">
                No approved content waiting to be scheduled. Visit the Quality Check & Approvals queue to sign off on posts.
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: Scheduled Queue */}
      {activeTab === 'scheduler' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="border-l-4 border-l-pink-500">
              <div className="text-xs font-semibold uppercase text-slate-500 mb-1 flex items-center gap-1.5">
                <Instagram className="w-4 h-4 text-pink-600" /> Instagram Business
              </div>
              <div className="text-xl font-bold text-slate-900">@apexsmilestudio</div>
              <div className="text-[11px] text-slate-500 mt-1">Auto-publish stories & feed</div>
            </Card>

            <Card className="border-l-4 border-l-blue-500">
              <div className="text-xs font-semibold uppercase text-slate-500 mb-1 flex items-center gap-1.5">
                <Facebook className="w-4 h-4 text-blue-600" /> Facebook Official
              </div>
              <div className="text-xl font-bold text-slate-900">Apex Smile Studio NYC</div>
              <div className="text-[11px] text-slate-500 mt-1">Page feed automation active</div>
            </Card>

            <Card className="border-l-4 border-l-red-500">
              <div className="text-xs font-semibold uppercase text-slate-500 mb-1 flex items-center gap-1.5">
                <Youtube className="w-4 h-4 text-red-600" /> YouTube Shorts & Community
              </div>
              <div className="text-xl font-bold text-slate-900">Apex Dental Studio</div>
              <div className="text-[11px] text-slate-500 mt-1">Shorts auto-scheduling</div>
            </Card>
          </div>

          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Upcoming Auto-Publication Queue ({scheduledRecords.length})
            </h3>

            {scheduledRecords.map((post) => (
              <Card key={post.id} className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-lg bg-slate-900 overflow-hidden shrink-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={post.creativeAssetUrl || "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=1080&auto=format&fit=crop&q=80"}
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="space-y-1 text-xs">
                    <div className="flex items-center gap-2">
                      <Badge variant={post.format === 'carousel' ? 'purple' : 'primary'} size="sm">
                        {post.format.toUpperCase()}
                      </Badge>
                      <h4 className="font-bold text-slate-900">{post.title}</h4>
                    </div>
                    <p className="text-slate-500 line-clamp-1">{post.hook}</p>
                    <div className="text-[11px] text-[#4f98db] font-semibold flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      Scheduled: {post.scheduledAt ? new Date(post.scheduledAt).toLocaleString() : 'Upcoming'}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setSelectedRecordForPreview(post)}
                  >
                    <Eye className="w-3.5 h-3.5 mr-1" />
                    Preview
                  </Button>

                  <Button
                    size="sm"
                    variant="cta"
                    onClick={() => handlePublishNow(post.id)}
                  >
                    <Send className="w-3.5 h-3.5 mr-1" />
                    Publish Immediately
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Schedule Picker Modal */}
      {scheduleModalRecord && (
        <Modal
          isOpen={true}
          onClose={() => setScheduleModalRecord(null)}
          title={`Schedule Multi-Platform Post: ${scheduleModalRecord.title}`}
          maxWidth="md"
        >
          <form onSubmit={handleConfirmSchedule} className="space-y-4 text-xs">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Target Platforms</label>
              <div className="space-y-2">
                <label className="flex items-center gap-2 font-medium text-slate-800">
                  <input
                    type="checkbox"
                    checked={targetAccounts.instagram}
                    onChange={(e) => setTargetAccounts({ ...targetAccounts, instagram: e.target.checked })}
                    className="w-4 h-4 rounded text-[#4f98db]"
                  />
                  <Instagram className="w-4 h-4 text-pink-600" />
                  Instagram Business (@apexsmilestudio)
                </label>
                <label className="flex items-center gap-2 font-medium text-slate-800">
                  <input
                    type="checkbox"
                    checked={targetAccounts.facebook}
                    onChange={(e) => setTargetAccounts({ ...targetAccounts, facebook: e.target.checked })}
                    className="w-4 h-4 rounded text-[#4f98db]"
                  />
                  <Facebook className="w-4 h-4 text-blue-600" />
                  Facebook Practice Page
                </label>
                <label className="flex items-center gap-2 font-medium text-slate-800">
                  <input
                    type="checkbox"
                    checked={targetAccounts.youtube}
                    onChange={(e) => setTargetAccounts({ ...targetAccounts, youtube: e.target.checked })}
                    className="w-4 h-4 rounded text-[#4f98db]"
                  />
                  <Youtube className="w-4 h-4 text-red-600" />
                  YouTube Channel (Shorts & Community)
                </label>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Date</label>
                <input
                  type="date"
                  required
                  value={scheduleDate}
                  onChange={(e) => setScheduleDate(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs"
                />
              </div>
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Time Slot</label>
                <input
                  type="time"
                  required
                  value={scheduleTime}
                  onChange={(e) => setScheduleTime(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
              <Button type="button" variant="outline" onClick={() => setScheduleModalRecord(null)}>
                Cancel
              </Button>
              <Button type="submit" variant="cta">
                {scheduledSuccess ? "Added to Queue!" : "Confirm Multi-Platform Schedule"}
              </Button>
            </div>
          </form>
        </Modal>
      )}

      {/* Preview Modal */}
      {selectedRecordForPreview && (
        <Modal
          isOpen={true}
          onClose={() => setSelectedRecordForPreview(null)}
          title={`Delivery Preview: ${selectedRecordForPreview.title}`}
          maxWidth="2xl"
        >
          <MockPostPreview record={selectedRecordForPreview} brand={brand} />
          <div className="flex justify-end pt-3">
            <Button variant="outline" onClick={() => setSelectedRecordForPreview(null)}>
              Close
            </Button>
          </div>
        </Modal>
      )}
    </div>
  );
}
