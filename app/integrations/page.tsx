'use client';

import React, { useState } from 'react';
import { 
  Bot, 
  MessageSquare, 
  Video, 
  Check, 
  FolderGit2, 
  Instagram, 
  Facebook, 
  Phone, 
  Sparkles, 
  ShieldCheck, 
  Send,
  Zap,
  ArrowRight
} from 'lucide-react';
import { useERPStore } from '../../lib/store';
import { Card, CardHeader, CardTitle } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';

export default function IntegrationsPage() {
  const { brand } = useERPStore();

  const [dmKeywords, setDmKeywords] = useState([
    { keyword: 'INVISALIGN', response: 'Hi there! Tap here to see our 3D Invisalign simulation and claim your $500 voucher: https://apexsmilestudio.com/invisalign-promo' },
    { keyword: 'IMPLANTS', response: 'Hello! Dr. Chen specializes in guided 3D implants. We have complimentary CBCT scans this month. Would you like a morning or afternoon appointment?' },
    { keyword: 'HOURS', response: 'Our New York clinic is open Mon-Fri 8am-6pm and Saturdays 9am-3pm. Call us directly at (555) 382-7645!' }
  ]);

  const [whatsappEnabled, setWhatsappEnabled] = useState(true);
  const [reelsAiEnabled, setReelsAiEnabled] = useState(true);
  const [savedNote, setSavedNote] = useState(false);

  const handleSave = () => {
    setSavedNote(true);
    setTimeout(() => setSavedNote(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-slate-900">Integrations, DM Automations & Roadmap</h2>
            <Badge variant="primary">Module Expansion</Badge>
          </div>
          <p className="text-xs text-slate-500">
            Configure external channel webhooks, Google Drive asset sync, WhatsApp routing, and DM bots.
          </p>
        </div>

        <Button size="md" variant="primary" onClick={handleSave}>
          {savedNote ? (
            <>
              <Check className="w-4 h-4 mr-1 text-emerald-300" />
              Settings Saved!
            </>
          ) : (
            'Save Configuration'
          )}
        </Button>
      </div>

      {/* Connected Channel Integrations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Meta Graph API Card */}
        <Card className="border-t-4 border-t-sky-500">
          <CardHeader>
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center">
                <Facebook className="w-5 h-5" />
              </div>
              <div>
                <CardTitle className="text-sm font-bold text-slate-900">Meta Graph API (FB & IG)</CardTitle>
                <span className="text-[11px] text-slate-400">Status: Active & Authorized</span>
              </div>
            </div>
            <Badge variant="success">Connected</Badge>
          </CardHeader>

          <div className="space-y-3 text-xs">
            <div className="p-3 bg-slate-50 rounded-xl space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-slate-600 flex items-center gap-1.5 font-medium">
                  <Instagram className="w-4 h-4 text-pink-600" /> Instagram Business Account:
                </span>
                <span className="font-bold text-slate-900">@apexsmilestudio</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-600 flex items-center gap-1.5 font-medium">
                  <Facebook className="w-4 h-4 text-blue-600" /> Facebook Official Clinic Page:
                </span>
                <span className="font-bold text-slate-900">Apex Smile Studio NYC</span>
              </div>
            </div>

            <div className="text-[11px] text-slate-500 leading-relaxed">
              Provides scheduled automated publication for Feed images, Carousels, and Reels without manual mobile app posting.
            </div>
          </div>
        </Card>

        {/* Google Drive Asset Storage Card */}
        <Card className="border-t-4 border-t-teal-500">
          <CardHeader>
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center">
                <FolderGit2 className="w-5 h-5" />
              </div>
              <div>
                <CardTitle className="text-sm font-bold text-slate-900">Google Drive Asset Connector</CardTitle>
                <span className="text-[11px] text-slate-400">Status: Real-Time Cloud Sync</span>
              </div>
            </div>
            <Badge variant="success">Connected</Badge>
          </CardHeader>

          <div className="space-y-3 text-xs">
            <div className="p-3 bg-slate-50 rounded-xl space-y-1">
              <div className="text-slate-500 text-[11px]">Mapped Clinic Directory:</div>
              <code className="text-slate-800 font-mono text-[11px] block truncate">
                {brand.gdriveRootFolder}
              </code>
            </div>

            <div className="text-[11px] text-slate-500 leading-relaxed">
              High-resolution patient case photos, logos, and generated flyer PDFs are automatically backed up to your clinic&apos;s Google Workspace drive.
            </div>
          </div>
        </Card>
      </div>

      {/* Spreadsheet Specific Roadmap Modules */}
      <div className="space-y-4 pt-2">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
          Spreadsheet Feature Modules (Upcoming & Future Integrations)
        </h3>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Module 1: Reels Video Production (Spreadsheet Item #7) */}
          <Card className="flex flex-col justify-between">
            <div>
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center">
                    <Video className="w-4 h-4" />
                  </div>
                  <CardTitle className="text-xs uppercase tracking-wider text-slate-900">
                    Reels Production
                  </CardTitle>
                </div>
                <Badge variant="purple" size="sm">Spreadsheet Item #7</Badge>
              </CardHeader>

              <div className="space-y-3 text-xs mt-2">
                <p className="text-slate-600 leading-relaxed">
                  Video workflow that generates or assembles 15-30 second dental educational clips with doctor voiceovers and animated text overlays.
                </p>

                <div className="p-3 bg-slate-50 rounded-xl space-y-2">
                  <label className="flex items-center justify-between cursor-pointer font-medium text-slate-800">
                    <span>Enable AI Voiceover Sync</span>
                    <input
                      type="checkbox"
                      checked={reelsAiEnabled}
                      onChange={(e) => setReelsAiEnabled(e.target.checked)}
                      className="w-4 h-4 text-sky-600 rounded"
                    />
                  </label>
                  <div className="text-[10px] text-slate-400">
                    Auto-synthesizes clinical scripts into natural speech.
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100">
              <Badge variant="outline" size="sm" className="w-full justify-center py-1">
                Upcoming Module Engine
              </Badge>
            </div>
          </Card>

          {/* Module 2: DM Automations (Spreadsheet Item #9) */}
          <Card className="flex flex-col justify-between">
            <div>
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
                    <Bot className="w-4 h-4" />
                  </div>
                  <CardTitle className="text-xs uppercase tracking-wider text-slate-900">
                    DM Automations
                  </CardTitle>
                </div>
                <Badge variant="purple" size="sm">Spreadsheet Item #9</Badge>
              </CardHeader>

              <div className="space-y-3 text-xs mt-2">
                <p className="text-slate-600 leading-relaxed">
                  Connected social media channels trigger instant automated direct message responses when patients comment on post hooks.
                </p>

                <div className="space-y-2">
                  {dmKeywords.map((dm, i) => (
                    <div key={i} className="p-2.5 bg-slate-50 border border-slate-200/80 rounded-lg space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-sky-700 text-[10px]">Trigger: &quot;{dm.keyword}&quot;</span>
                        <Badge variant="success" size="sm">Active</Badge>
                      </div>
                      <p className="text-[11px] text-slate-600 line-clamp-2">{dm.response}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100">
              <Badge variant="outline" size="sm" className="w-full justify-center py-1">
                Social Channel Listener
              </Badge>
            </div>
          </Card>

          {/* Module 3: WhatsApp Sales & Support (Spreadsheet Item #10) */}
          <Card className="flex flex-col justify-between">
            <div>
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                    <Phone className="w-4 h-4" />
                  </div>
                  <CardTitle className="text-xs uppercase tracking-wider text-slate-900">
                    WhatsApp Patient Sales & Support
                  </CardTitle>
                </div>
                <Badge variant="purple" size="sm">Spreadsheet Item #10</Badge>
              </CardHeader>

              <div className="space-y-3 text-xs mt-2">
                <p className="text-slate-600 leading-relaxed">
                  Routes high-intent dental leads directly to the clinic&apos;s treatment coordinator WhatsApp for immediate booking.
                </p>

                <div className="p-3 bg-emerald-50/50 border border-emerald-100 rounded-xl space-y-2">
                  <div className="flex items-center justify-between text-slate-800 font-bold">
                    <span>Front Desk WhatsApp:</span>
                    <span className="text-emerald-700">{brand.whatsapp}</span>
                  </div>
                  <label className="flex items-center justify-between cursor-pointer font-medium text-slate-700 pt-1">
                    <span>Instant Patient Booking Bot</span>
                    <input
                      type="checkbox"
                      checked={whatsappEnabled}
                      onChange={(e) => setWhatsappEnabled(e.target.checked)}
                      className="w-4 h-4 text-emerald-600 rounded"
                    />
                  </label>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100">
              <Badge variant="outline" size="sm" className="w-full justify-center py-1">
                Lead Conversion Webhook
              </Badge>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
