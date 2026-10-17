'use client';

import React, { useState } from 'react';
import { 
  ShieldCheck, 
  FileText, 
  Scale, 
  CheckCircle2, 
  Lock, 
  Bot, 
  AlertTriangle,
  X
} from 'lucide-react';
import { Button } from './ui/Button';
import { Badge } from './ui/Badge';

interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAccept?: () => void;
}

export function TermsModal({ isOpen, onClose, onAccept }: TermsModalProps) {
  const [activeTab, setActiveTab] = useState<'ndc' | 'erp'>('ndc');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
      <div 
        className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#f0f7fd] text-[#4f98db] flex items-center justify-center font-bold">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-[#333333]">Terms of Service & Regulatory Rules</h3>
                <Badge variant="primary" size="sm">NDC Compliant</Badge>
              </div>
              <p className="text-[11px] text-slate-500">
                National Dental Commission (NDC) guidelines & Digital Marketing for Dentists ERP
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-slate-100 bg-slate-50/80 px-5 pt-2 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('ndc')}
            className={`flex items-center gap-1.5 py-2.5 px-4 border-b-2 transition-all ${
              activeTab === 'ndc'
                ? 'border-[#4f98db] text-[#4f98db] font-bold bg-white rounded-t-lg'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            1. NDC Advertising Rules
          </button>
          <button
            onClick={() => setActiveTab('erp')}
            className={`flex items-center gap-1.5 py-2.5 px-4 border-b-2 transition-all ${
              activeTab === 'erp'
                ? 'border-[#4f98db] text-[#4f98db] font-bold bg-white rounded-t-lg'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <FileText className="w-4 h-4" />
            2. ERP Software Terms
          </button>
        </div>

        {/* Scrollable Terms Content */}
        <div className="p-6 overflow-y-auto space-y-4 text-xs text-slate-600 leading-relaxed max-h-[50vh]">
          {activeTab === 'ndc' ? (
            <div className="space-y-4">
              <div className="p-3 bg-sky-50 border border-sky-100 rounded-xl text-sky-900 font-medium">
                National Dental Commission (NDC) & State Dental Council statutory guidelines governing clinical social media content, patient communication, and practitioner ethics.
              </div>

              <div className="space-y-3">
                <div className="space-y-1">
                  <h4 className="font-bold text-slate-900">1. Prohibition of False Guarantees & Superlatives</h4>
                  <p>Dentists must never publish claims guaranteeing 100% painless treatment, permanent tooth retention without maintenance, or miracle cosmetic outcomes. Self-laudatory superlatives (e.g. &quot;best dentist in city&quot;) are prohibited.</p>
                </div>

                <div className="space-y-1">
                  <h4 className="font-bold text-slate-900">2. Mandatory Clinical Disclaimers</h4>
                  <p>All social media posts, reels, and flyers automatically append statutory disclaimers (e.g. <em>&quot;Clinical outcomes vary. Personal clinical evaluation required.&quot;</em>). Practitioners agree not to omit or obscure these notices.</p>
                </div>

                <div className="space-y-1">
                  <h4 className="font-bold text-slate-900">3. Verified Patient Consent for Photography & Scans</h4>
                  <p>Patient case reveals, before-and-after smile photographs, and clinical reels require explicit, written informed patient consent archived at the practice before publication.</p>
                </div>

                <div className="space-y-1">
                  <h4 className="font-bold text-slate-900">4. Transparent Practitioner Registration Code</h4>
                  <p>Practitioners must enter valid State Dental Council registration credentials and DCI / National Dental Register (NDR) identification for authentic credential verification.</p>
                </div>

                <div className="space-y-1">
                  <h4 className="font-bold text-slate-900">5. 6–12 Month Periodic Registry Re-Verification</h4>
                  <p>Practitioner registration status will be checked against the official State Dental Council register every 6 to 12 months to verify active licensed standing.</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-medium">
                Digital Marketing for Dentists ERP Software License, AI Generation Boundaries, and Clinical Liability Allocation.
              </div>

              <div className="space-y-3">
                <div className="space-y-1">
                  <h4 className="font-bold text-slate-900 flex items-center gap-1.5">
                    <Bot className="w-3.5 h-3.5 text-[#4f98db]" />
                    1. Final Clinical Review & Doctor Sign-Off Responsibility
                  </h4>
                  <p>The ERP AI engine provides copywriting and design drafts based on clinical parameters. <strong>The licensed dentist remains the ultimate signing authority.</strong> No post or flyer should be published without doctor approval.</p>
                </div>

                <div className="space-y-1">
                  <h4 className="font-bold text-slate-900 flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5 text-emerald-600" />
                    2. Google Drive Storage & Workspace Privacy
                  </h4>
                  <p>Cloud assets in Google Drive are accessed exclusively to render approved social graphics. Multi-tenant practice data is isolated with strict Row-Level Security.</p>
                </div>

                <div className="space-y-1">
                  <h4 className="font-bold text-slate-900 flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                    3. 14-Day Free Trial Starter Kit Limits
                  </h4>
                  <p>The trial includes 25 AI Copy credits, 5 Video renders, 10 Graphics, and 2GB cloud storage for practice evaluation. Credits are non-transferable and renew upon subscription upgrade.</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between">
          <span className="text-[11px] text-slate-400">
            Read full agreement on the <a href="/terms" target="_blank" className="text-[#4f98db] underline">Terms Page</a>
          </span>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={onClose}>
              Close
            </Button>
            {onAccept && (
              <Button 
                variant="primary" 
                size="sm" 
                onClick={() => {
                  onAccept();
                  onClose();
                }}
              >
                <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
                Agree & Accept Terms
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
