'use client';

import React, { useState } from 'react';
import { 
  Download, 
  Send, 
  Sparkles, 
  Check, 
  Phone, 
  MapPin, 
  Calendar, 
  Tag, 
  ShieldCheck 
} from 'lucide-react';
import { FlyerRecord, BrandProfile } from '../types';
import { Button } from './ui/Button';
import { Badge } from './ui/Badge';

interface FlyerEditorProps {
  initialFlyer?: FlyerRecord;
  brand: BrandProfile;
  onSaveToApprovals: (flyer: FlyerRecord) => void;
}

export function FlyerEditor({
  initialFlyer,
  brand,
  onSaveToApprovals
}: FlyerEditorProps) {
  const [flyer, setFlyer] = useState<FlyerRecord>(
    initialFlyer || {
      id: `flyer-${Date.now().toString(36)}`,
      campaignTitle: "Fall Dental Wellness Camp",
      headline: "Complete Dental Wellness & Smile Screening",
      subheadline: "Because every confident smile begins with proactive care. Open for all ages this month.",
      offerBadge: "FREE 3D DIGITAL EXAM",
      bulletPoints: [
        "Comprehensive Oral Cancer & Gum Health Exam",
        "High-definition digital low-radiation X-rays",
        "Personalized cosmetic smile preview",
        "Complimentary preventive care hygiene kit"
      ],
      termsAndConditions: "Appointment reservation required due to clinical capacity. Non-transferable.",
      validUntil: "Valid Through October 31, 2026",
      contactNumber: brand.phone,
      clinicAddress: brand.address,
      templateStyle: "modern_clinical",
      accentColor: "#0284c7",
      status: "draft",
      createdAt: new Date().toISOString()
    }
  );

  const [isCopied, setIsCopied] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleDownload = () => {
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
    // Trigger browser print or simulated download
    window.print();
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    onSaveToApprovals({
      ...flyer,
      status: 'pending_approval'
    });
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Editor Controls */}
      <div className="lg:col-span-6 space-y-5">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
              1. Flyer Campaign Configuration
            </h3>
            <Badge variant="primary">Ad-Hoc Request</Badge>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Campaign Title (Internal Reference)
            </label>
            <input
              type="text"
              value={flyer.campaignTitle}
              onChange={(e) => setFlyer({ ...flyer, campaignTitle: e.target.value })}
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Main Promotional Headline
            </label>
            <input
              type="text"
              value={flyer.headline}
              onChange={(e) => setFlyer({ ...flyer, headline: e.target.value })}
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Subheadline / Description
            </label>
            <textarea
              rows={2}
              value={flyer.subheadline}
              onChange={(e) => setFlyer({ ...flyer, subheadline: e.target.value })}
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Offer Callout Badge
              </label>
              <input
                type="text"
                value={flyer.offerBadge}
                onChange={(e) => setFlyer({ ...flyer, offerBadge: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 font-bold text-sky-600"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Validity Window
              </label>
              <input
                type="text"
                value={flyer.validUntil}
                onChange={(e) => setFlyer({ ...flyer, validUntil: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Offer Highlights (Bullet Points)
            </label>
            {flyer.bulletPoints.map((bp, idx) => (
              <div key={idx} className="flex items-center gap-2 mb-2">
                <span className="w-5 h-5 rounded-full bg-sky-100 text-sky-700 text-[10px] font-bold flex items-center justify-center shrink-0">
                  {idx + 1}
                </span>
                <input
                  type="text"
                  value={bp}
                  onChange={(e) => {
                    const newBp = [...flyer.bulletPoints];
                    newBp[idx] = e.target.value;
                    setFlyer({ ...flyer, bulletPoints: newBp });
                  }}
                  className="w-full px-3 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>
            ))}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Template Theme
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { id: 'modern_clinical', name: 'Clinical Blue', color: '#0284c7' },
                { id: 'premium_aesthetic', name: 'Teal Luxury', color: '#0d9488' },
                { id: 'family_friendly', name: 'Navy Trust', color: '#1e293b' },
                { id: 'urgent_care', name: 'Rose Emergency', color: '#e11d48' },
              ].map(tpl => (
                <button
                  key={tpl.id}
                  onClick={() => setFlyer({ ...flyer, templateStyle: tpl.id as any, accentColor: tpl.color })}
                  className={`p-2.5 rounded-xl border text-xs font-medium text-left flex flex-col gap-1 transition-all ${
                    flyer.templateStyle === tpl.id
                      ? 'border-sky-500 bg-sky-50/50 ring-2 ring-sky-500/20'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <span className="w-4 h-4 rounded-full" style={{ backgroundColor: tpl.color }}></span>
                  <span className="text-[11px] font-semibold text-slate-800">{tpl.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="pt-2 flex items-center gap-3">
            <Button
              variant="primary"
              className="flex-1"
              onClick={handleSubmit}
              disabled={isSubmitted}
            >
              {isSubmitted ? (
                <>
                  <Check className="w-4 h-4 mr-1 text-emerald-300" />
                  Sent to Pending Approvals!
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-1" />
                  Send for Doctor Sign-Off
                </>
              )}
            </Button>

            <Button
              variant="outline"
              onClick={handleDownload}
            >
              <Download className="w-4 h-4 mr-1 text-slate-600" />
              Print / PDF
            </Button>
          </div>
        </div>
      </div>

      {/* Live Flyer Visual Canvas Preview */}
      <div className="lg:col-span-6 flex flex-col items-center">
        <div className="w-full max-w-[480px] bg-white rounded-2xl shadow-xl border border-slate-200/90 overflow-hidden print:m-0 print:border-none print:shadow-none">
          {/* Top Banner with Clinic Logo */}
          <div 
            className="p-6 text-white relative overflow-hidden"
            style={{ backgroundColor: flyer.accentColor }}
          >
            <div className="absolute right-0 top-0 translate-x-8 -translate-y-8 w-40 h-40 rounded-full bg-white/10 blur-xl"></div>
            
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-white p-1 shadow-sm">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={brand.logoUrl} alt={brand.clinicName} className="w-full h-full object-cover rounded-lg" />
                </div>
                <div>
                  <h4 className="font-extrabold text-sm tracking-wide uppercase">{brand.clinicName}</h4>
                  <p className="text-[10px] text-white/80">{brand.tagline}</p>
                </div>
              </div>
              <div className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-[10px] font-bold tracking-widest uppercase border border-white/20">
                Official Clinic Notice
              </div>
            </div>

            <div className="inline-block px-3 py-1 bg-amber-400 text-slate-950 font-black text-xs rounded-md shadow-md tracking-wider mb-2">
              {flyer.offerBadge}
            </div>
            
            <h2 className="text-xl font-extrabold leading-tight text-white drop-shadow-sm mb-1.5">
              {flyer.headline}
            </h2>
            <p className="text-xs text-white/90 leading-relaxed font-normal">
              {flyer.subheadline}
            </p>
          </div>

          {/* Flyer Body Details */}
          <div className="p-6 space-y-5 bg-white">
            <div>
              <h5 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-3">
                Included in This Special Screening:
              </h5>
              <div className="space-y-2.5">
                {flyer.bulletPoints.map((bp, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div 
                      className="w-5 h-5 rounded-full flex items-center justify-center text-white shrink-0 mt-0.5"
                      style={{ backgroundColor: flyer.accentColor }}
                    >
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                    <span className="text-xs text-slate-800 font-medium leading-relaxed">
                      {bp}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Validity Box */}
            <div className="p-3.5 bg-slate-50 border border-slate-200/80 rounded-xl flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-sky-600" />
                <div>
                  <div className="text-[10px] uppercase font-bold text-slate-400">Offer Validity</div>
                  <div className="text-xs font-bold text-slate-900">{flyer.validUntil}</div>
                </div>
              </div>
              <Badge variant="success">Confirmed</Badge>
            </div>

            {/* Clinic Contact & Location */}
            <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
              <div className="flex items-center gap-2 text-xs text-slate-700 font-semibold">
                <Phone className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Call Treatment Desk: {flyer.contactNumber}</span>
              </div>
              <div className="flex items-start gap-2 text-xs text-slate-500">
                <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                <span className="text-[11px]">{flyer.clinicAddress}</span>
              </div>
            </div>

            <p className="text-[9px] text-slate-400 leading-tight italic pt-1">
              * {flyer.termsAndConditions}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
