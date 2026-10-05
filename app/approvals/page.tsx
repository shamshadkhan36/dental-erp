'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  MessageSquare, 
  Eye, 
  PenTool, 
  ShieldCheck, 
  Send, 
  Clock, 
  Sparkles, 
  Check, 
  FileText
} from 'lucide-react';
import { useERPStore } from '../../lib/store';
import { Card, CardHeader, CardTitle } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
import { MockPostPreview } from '../../components/MockPostPreview';
import { ContentRecord, FlyerRecord } from '../../types';

export default function ApprovalsPage() {
  const { brand, contentRecords, flyers, updateContentStatus, saveFlyer } = useERPStore();

  const [activeFilter, setActiveFilter] = useState<'pending' | 'approved' | 'changes'>('pending');
  const [selectedRecordForPreview, setSelectedRecordForPreview] = useState<ContentRecord | null>(null);
  const [revisionModalRecord, setRevisionModalRecord] = useState<ContentRecord | null>(null);
  const [revisionNote, setRevisionNote] = useState('');

  const pendingPosts = contentRecords.filter(r => r.status === 'pending_approval');
  const approvedPosts = contentRecords.filter(r => r.status === 'approved' || r.status === 'scheduled' || r.status === 'published');
  const changesPosts = contentRecords.filter(r => r.status === 'changes_requested');

  const pendingFlyers = flyers.filter(f => f.status === 'pending_approval');

  const displayedPosts = 
    activeFilter === 'pending' ? pendingPosts :
    activeFilter === 'approved' ? approvedPosts : changesPosts;

  const handleApprove = (recordId: string) => {
    updateContentStatus(recordId, 'approved', 'Approved by Doctor for social publication');
  };

  const handleApproveFlyer = (flyer: FlyerRecord) => {
    saveFlyer({
      ...flyer,
      status: 'approved'
    });
  };

  const handleRequestChanges = (e: React.FormEvent) => {
    e.preventDefault();
    if (!revisionModalRecord) return;
    updateContentStatus(revisionModalRecord.id, 'changes_requested', revisionNote);
    setRevisionModalRecord(null);
    setRevisionNote('');
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-slate-900">Quality Check & Approvals Queue</h2>
            <Badge variant="warning">{pendingPosts.length + pendingFlyers.length} Awaiting Doctor Sign-Off</Badge>
          </div>
          <p className="text-xs text-slate-500">
            Verify automated quality checks (dimensions, medical accuracy, logo, colors) and sign off on posts.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl text-xs">
          <button
            onClick={() => setActiveFilter('pending')}
            className={`px-3 py-1.5 font-semibold rounded-lg transition-all ${
              activeFilter === 'pending'
                ? 'bg-amber-500 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Pending Review ({pendingPosts.length + pendingFlyers.length})
          </button>
          <button
            onClick={() => setActiveFilter('approved')}
            className={`px-3 py-1.5 font-semibold rounded-lg transition-all ${
              activeFilter === 'approved'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Approved Content ({approvedPosts.length})
          </button>
          <button
            onClick={() => setActiveFilter('changes')}
            className={`px-3 py-1.5 font-semibold rounded-lg transition-all ${
              activeFilter === 'changes'
                ? 'bg-rose-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Needs Revision ({changesPosts.length})
          </button>
        </div>
      </div>

      {/* Pending Flyers Section (if on pending tab) */}
      {activeFilter === 'pending' && pendingFlyers.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-700 uppercase tracking-wider">
            <FileText className="w-4 h-4 text-sky-600" />
            Ad-Hoc Promotional Flyers Awaiting Approval ({pendingFlyers.length})
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {pendingFlyers.map((flyer) => (
              <Card key={flyer.id} className="p-4 border-l-4 border-l-sky-500 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="purple" size="sm">PRINT / DIGITAL FLYER</Badge>
                    <span className="text-[11px] font-bold text-amber-600">Doctor Review Required</span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 mb-1">{flyer.headline}</h4>
                  <p className="text-xs text-slate-500 mb-2">{flyer.subheadline}</p>
                  <div className="p-2 bg-slate-50 rounded-lg text-xs space-y-1 mb-3">
                    <div className="font-semibold text-slate-700">Special Offer: {flyer.offerBadge}</div>
                    <div className="text-[11px] text-slate-500">Validity: {flyer.validUntil}</div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <Link href="/creative?tab=flyers">
                    <Button size="sm" variant="outline">
                      Inspect & Edit
                    </Button>
                  </Link>

                  <Button
                    size="sm"
                    variant="success"
                    onClick={() => handleApproveFlyer(flyer)}
                  >
                    <Check className="w-4 h-4 mr-1 text-emerald-200" />
                    Approve Flyer
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Social Media Content Posts Queue */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs font-bold text-slate-700 uppercase tracking-wider">
          <span>Social Media Content Records ({displayedPosts.length})</span>
          <span className="text-slate-400 font-normal">Automated QC & Compliance Validation</span>
        </div>

        {displayedPosts.length === 0 ? (
          <Card className="p-12 text-center text-slate-400 text-xs">
            No posts found in this queue. Use the AI Copywriter to generate new content!
          </Card>
        ) : (
          <div className="space-y-4">
            {displayedPosts.map((post) => {
              const qc = post.qcResults;
              return (
                <Card key={post.id} className="p-5 space-y-4 hover:border-slate-300 transition-all">
                  {/* Top Bar: Title, Format, QC Badge */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                    <div className="flex items-center gap-2.5">
                      <Badge variant={post.format === 'carousel' ? 'purple' : post.format === 'reel' ? 'primary' : 'default'}>
                        {post.format.toUpperCase()}
                      </Badge>
                      <h3 className="text-sm font-bold text-slate-900">{post.title}</h3>
                    </div>

                    <div className="flex items-center gap-3">
                      {qc && (
                        <div className="flex items-center gap-1.5 px-2.5 py-1 bg-slate-50 border border-slate-200 rounded-lg text-xs">
                          <ShieldCheck className="w-4 h-4 text-emerald-600" />
                          <span className="font-semibold text-slate-700">QC Score:</span>
                          <span className={`font-bold ${qc.score >= 90 ? 'text-emerald-600' : 'text-amber-600'}`}>
                            {qc.score}%
                          </span>
                        </div>
                      )}
                      <Badge variant={post.status === 'approved' ? 'success' : post.status === 'pending_approval' ? 'warning' : 'danger'}>
                        {post.status.replace('_', ' ')}
                      </Badge>
                    </div>
                  </div>

                  {/* 2-Column: Copy details & QC Checks */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 text-xs">
                    {/* Copy details */}
                    <div className="lg:col-span-7 space-y-2.5">
                      <div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-0.5">
                          Hook (First Line)
                        </span>
                        <p className="font-bold text-slate-900 bg-slate-50 p-2.5 rounded-lg border border-slate-100 leading-snug">
                          {post.hook}
                        </p>
                      </div>

                      <div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-0.5">
                          Clinical Caption
                        </span>
                        <p className="text-slate-600 line-clamp-3 bg-slate-50 p-2.5 rounded-lg border border-slate-100 leading-relaxed">
                          {post.caption}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 text-[11px] text-sky-800 bg-sky-50 p-2 rounded-lg">
                        <span className="font-bold">CTA:</span>
                        <span className="truncate">{post.cta}</span>
                      </div>
                    </div>

                    {/* QC Checklist */}
                    <div className="lg:col-span-5 bg-slate-50/60 border border-slate-200/80 rounded-xl p-3.5 space-y-2">
                      <div className="text-[11px] font-bold text-slate-700 uppercase tracking-wider flex items-center justify-between mb-1">
                        <span>Quality Check Diagnostics</span>
                        <span className="text-emerald-600 font-semibold text-[10px]">Verified Automated</span>
                      </div>

                      {qc?.checks.map((check, i) => (
                        <div key={i} className="flex items-start gap-2 text-[11px]">
                          <span className={`w-3.5 h-3.5 rounded-full flex items-center justify-center text-[9px] text-white shrink-0 mt-0.5 ${
                            check.passed ? 'bg-emerald-500' : 'bg-amber-500'
                          }`}>
                            {check.passed ? '✓' : '!'}
                          </span>
                          <div>
                            <span className="font-semibold text-slate-800">{check.rule}: </span>
                            <span className="text-slate-500">{check.message}</span>
                          </div>
                        </div>
                      ))}

                      {post.approvalNotes && (
                        <div className="mt-2 pt-2 border-t border-slate-200 text-[11px] text-amber-800 bg-amber-50 p-2 rounded-lg">
                          <span className="font-bold">Doctor Notes: </span>
                          {post.approvalNotes}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Action Bar */}
                  <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setSelectedRecordForPreview(post)}
                      >
                        <Eye className="w-3.5 h-3.5 mr-1" />
                        Preview Post
                      </Button>

                      <Link href={`/copywriter?edit=${post.id}`}>
                        <Button size="sm" variant="ghost">
                          <PenTool className="w-3.5 h-3.5 mr-1" />
                          Edit Copy
                        </Button>
                      </Link>
                    </div>

                    <div className="flex items-center gap-2">
                      {post.status !== 'approved' && (
                        <>
                          <Button
                            size="sm"
                            variant="danger"
                            onClick={() => setRevisionModalRecord(post)}
                          >
                            <XCircle className="w-3.5 h-3.5 mr-1" />
                            Request Revisions
                          </Button>

                          <Button
                            size="sm"
                            variant="success"
                            onClick={() => handleApprove(post.id)}
                          >
                            <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
                            Sign Off & Approve
                          </Button>
                        </>
                      )}

                      {post.status === 'approved' && (
                        <Link href="/delivery">
                          <Button size="sm" variant="primary">
                            <Send className="w-3.5 h-3.5 mr-1" />
                            Schedule on Meta (FB & IG)
                          </Button>
                        </Link>
                      )}
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </div>

      {/* Preview Modal */}
      {selectedRecordForPreview && (
        <Modal
          isOpen={true}
          onClose={() => setSelectedRecordForPreview(null)}
          title={`Clinical Preview: ${selectedRecordForPreview.title}`}
          maxWidth="2xl"
        >
          <div className="space-y-4">
            <MockPostPreview record={selectedRecordForPreview} brand={brand} />
            <div className="flex justify-end gap-2 pt-2">
              <Button variant="outline" onClick={() => setSelectedRecordForPreview(null)}>
                Close Preview
              </Button>
              {selectedRecordForPreview.status !== 'approved' && (
                <Button 
                  variant="success" 
                  onClick={() => {
                    handleApprove(selectedRecordForPreview.id);
                    setSelectedRecordForPreview(null);
                  }}
                >
                  Approve Immediately
                </Button>
              )}
            </div>
          </div>
        </Modal>
      )}

      {/* Revision Request Notes Modal */}
      {revisionModalRecord && (
        <Modal
          isOpen={true}
          onClose={() => setRevisionModalRecord(null)}
          title="Request Revisions on Clinical Content"
          maxWidth="md"
        >
          <form onSubmit={handleRequestChanges} className="space-y-4 text-xs">
            <p className="text-slate-600">
              Provide clinical feedback or instructions for the AI copywriter / design team:
            </p>
            <textarea
              rows={4}
              required
              placeholder="e.g. Tone is too casual; please emphasize FDA-approved ceramic brackets and board certification."
              value={revisionNote}
              onChange={(e) => setRevisionNote(e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs"
            />
            <div className="flex justify-end gap-2 pt-2">
              <Button type="button" variant="outline" onClick={() => setRevisionModalRecord(null)}>
                Cancel
              </Button>
              <Button type="submit" variant="danger">
                Send Revision Notice
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
