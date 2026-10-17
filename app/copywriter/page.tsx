'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { 
  Sparkles, 
  Send, 
  Check, 
  Plus, 
  Trash2, 
  Instagram, 
  Facebook, 
  Youtube,
  ShieldCheck, 
  Layers, 
  Video, 
  FileText
} from 'lucide-react';
import { useERPStore } from '../../lib/store';
import { Card, CardHeader, CardTitle } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { MockPostPreview } from '../../components/MockPostPreview';
import { generateDentalContent } from '../../lib/ai-prompts';
import { runQualityCheck } from '../../lib/qc-engine';
import { defaultBrandProfile } from '../../lib/default-data';
import { ContentFormat, ContentRecord, PlatformType, ProductionFrequency } from '../../types';

function CopywriterContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { brand, calendar, contentRecords, saveContentRecord } = useERPStore();

  const safeBrand = brand || defaultBrandProfile;
  const safeTreatments = safeBrand.treatments?.length ? safeBrand.treatments : defaultBrandProfile.treatments;
  const safeIcps = safeBrand.icpProfiles?.length ? safeBrand.icpProfiles : defaultBrandProfile.icpProfiles;
  const safeCalendar = calendar || [];

  const editId = searchParams.get('edit');
  const calId = searchParams.get('calId');
  const initialTopic = searchParams.get('topic') || '';
  const initialFormat = (searchParams.get('format') as ContentFormat) || 'single';
  const initialTreatment = searchParams.get('treatment') || safeTreatments[0]?.id || '';
  const initialIcp = searchParams.get('icp') || safeIcps[0]?.id || '';

  const [frequencyMode, setFrequencyMode] = useState<ProductionFrequency>('weekly');

  // Generation Form State
  const [selectedTopic, setSelectedTopic] = useState(initialTopic);
  const [selectedCalendarId, setSelectedCalendarId] = useState(calId || '');
  const [format, setFormat] = useState<ContentFormat>(initialFormat);
  const [platforms, setPlatforms] = useState<PlatformType[]>(['instagram', 'facebook', 'youtube']);
  const [treatmentId, setTreatmentId] = useState(initialTreatment);
  const [icpId, setIcpId] = useState(initialIcp);
  const [customInstructions, setCustomInstructions] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  // Active Content Record
  const [currentRecord, setCurrentRecord] = useState<ContentRecord | null>(null);
  const [submittedToApprovals, setSubmittedToApprovals] = useState(false);

  useEffect(() => {
    if (editId) {
      const existing = contentRecords.find(r => r.id === editId);
      if (existing) {
        setCurrentRecord(existing);
        setFormat(existing.format || 'single');
        setPlatforms(existing.platforms || ['instagram', 'facebook', 'youtube']);
        setTreatmentId(existing.treatmentId || safeTreatments[0]?.id || '');
      }
    } else if (!currentRecord && contentRecords.length > 0) {
      const first = contentRecords[0];
      setCurrentRecord(first);
      if (first.platforms) setPlatforms(first.platforms);
      if (first.treatmentId) setTreatmentId(first.treatmentId);
      if (first.format) setFormat(first.format);
    }
  }, [editId, contentRecords]);

  const handleCalendarSelect = (cId: string) => {
    setSelectedCalendarId(cId);
    const item = calendar.find(c => c.id === cId);
    if (item) {
      setSelectedTopic(item.topic);
      setFormat(item.format);
      setTreatmentId(item.targetTreatmentId);
      setPlatforms(item.platforms || ['instagram', 'facebook', 'youtube']);
    }
  };

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const treatment = safeTreatments.find(t => t.id === treatmentId) || safeTreatments[0];
      const icp = safeIcps.find(i => i.id === icpId) || safeIcps[0];

      const generated = generateDentalContent({
        topic: selectedTopic || `Modern ${treatment.name} Clinical Guide`,
        format,
        frequencyMode,
        treatment,
        icp,
        brand: safeBrand,
        customInstructions
      });

      generated.platforms = platforms;

      if (selectedCalendarId) {
        generated.calendarItemId = selectedCalendarId;
      }

      setCurrentRecord(generated);
      setIsGenerating(false);
    }, 700);
  };

  const handleSaveAndSubmit = () => {
    if (!currentRecord) return;
    const qc = runQualityCheck(currentRecord, brand);
    const recordToSave: ContentRecord = {
      ...currentRecord,
      qcResults: qc,
      status: 'pending_approval'
    };

    saveContentRecord(recordToSave);
    setSubmittedToApprovals(true);
    setTimeout(() => {
      setSubmittedToApprovals(false);
      router.push('/approvals');
    }, 1500);
  };

  const togglePlatform = (p: PlatformType) => {
    const list: PlatformType[] = Array.isArray(platforms) ? platforms : ['instagram', 'facebook', 'youtube'];
    if (list.includes(p)) {
      if (list.length > 1) setPlatforms(list.filter(x => x !== p));
    } else {
      setPlatforms([...list, p]);
    }
  };

  return (
    <div className="space-y-6">
      {/* Frequency & Cadence Toolbar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-[#333333]">Production Cadence:</span>
          <span className="text-xs text-slate-500">Configure cadence for multi-platform AI generation</span>
        </div>

        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-100 rounded-lg">
          <span className="text-[10px] font-bold uppercase text-slate-400 px-2">Frequency:</span>
          {(['weekly', 'monthly', 'on_request'] as ProductionFrequency[]).map((mode) => (
            <button
              key={mode}
              onClick={() => setFrequencyMode(mode)}
              className={`px-3 py-1 text-xs font-semibold rounded-md capitalize transition-all ${
                frequencyMode === mode
                  ? 'bg-[#4f98db] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {mode.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Main 2-Column Studio */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-bold uppercase tracking-wider text-[#333333]">
                1. Post Parameters & AI Prompts
              </CardTitle>
              <Badge variant="primary" size="sm">
                Persona: {safeBrand.brandPersona?.archetype || 'Clinical Authority'}
              </Badge>
            </CardHeader>

            <div className="space-y-4 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  Select Planned Topic from Content Calendar (Optional)
                </label>
                <select
                  value={selectedCalendarId}
                  onChange={(e) => handleCalendarSelect(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs bg-white"
                >
                  <option value="">-- Or enter custom topic below --</option>
                  {safeCalendar.map(c => (
                    <option key={c.id} value={c.id}>
                      {c.date} • [{c.pillar}] {c.topic}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  Post Topic / Hook Theme
                </label>
                <input
                  type="text"
                  placeholder="e.g. 5 Common Myths About Invisalign Clear Aligners"
                  value={selectedTopic}
                  onChange={(e) => setSelectedTopic(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs"
                />
              </div>

              {/* Format & Platforms Row (with YouTube) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Content Format</label>
                  <div className="grid grid-cols-3 gap-1.5">
                    {[
                      { id: 'single', label: 'Single Post', icon: FileText },
                      { id: 'carousel', label: 'Carousel', icon: Layers },
                      { id: 'reel', label: 'Reel / Shorts', icon: Video },
                    ].map(f => (
                      <button
                        key={f.id}
                        type="button"
                        onClick={() => setFormat(f.id as any)}
                        className={`p-2 rounded-lg border text-center font-medium transition-all ${
                          format === f.id
                            ? 'bg-[#f0f7fd] border-[#4f98db] text-[#1d528c] font-bold'
                            : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        <f.icon className="w-3.5 h-3.5 mx-auto mb-1" />
                        <span className="text-[10px] block">{f.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Target Platforms</label>
                  <div className="grid grid-cols-3 gap-1.5 pt-1">
                    <button
                      type="button"
                      onClick={() => togglePlatform('instagram')}
                      className={`flex items-center justify-center gap-1 py-2 px-2 rounded-lg border text-xs font-semibold transition-all ${
                        (platforms || []).includes('instagram')
                          ? 'bg-pink-50 border-pink-400 text-pink-700'
                          : 'border-slate-200 text-slate-400'
                      }`}
                    >
                      <Instagram className="w-3.5 h-3.5" /> IG
                    </button>
                    <button
                      type="button"
                      onClick={() => togglePlatform('facebook')}
                      className={`flex items-center justify-center gap-1 py-2 px-2 rounded-lg border text-xs font-semibold transition-all ${
                        (platforms || []).includes('facebook')
                          ? 'bg-blue-50 border-blue-400 text-blue-700'
                          : 'border-slate-200 text-slate-400'
                      }`}
                    >
                      <Facebook className="w-3.5 h-3.5" /> FB
                    </button>
                    <button
                      type="button"
                      onClick={() => togglePlatform('youtube')}
                      className={`flex items-center justify-center gap-1 py-2 px-2 rounded-lg border text-xs font-semibold transition-all ${
                        (platforms || []).includes('youtube')
                          ? 'bg-red-50 border-red-400 text-red-700'
                          : 'border-slate-200 text-slate-400'
                      }`}
                    >
                      <Youtube className="w-3.5 h-3.5" /> YT
                    </button>
                  </div>
                </div>
              </div>

              {/* Treatment and Persona Pickers */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Featured Treatment</label>
                  <select
                    value={treatmentId}
                    onChange={(e) => setTreatmentId(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs bg-white"
                  >
                    {safeTreatments.map(t => (
                      <option key={t.id} value={t.id}>{t.name} ({t.category})</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Target Patient Persona (ICP)</label>
                  <select
                    value={icpId}
                    onChange={(e) => setIcpId(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs bg-white"
                  >
                    {safeIcps.map(i => (
                      <option key={i.id} value={i.id}>{i.name} {i.age ? `(${i.age})` : ''}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Custom Instructions */}
              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  Custom Doctor Instructions / Promotional Angle
                </label>
                <input
                  type="text"
                  placeholder="e.g. Highlight our $500 Invisalign voucher and free 3D digital smile scan"
                  value={customInstructions}
                  onChange={(e) => setCustomInstructions(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs"
                />
              </div>

              {/* Generate Trigger Button */}
              <Button
                variant="primary"
                size="md"
                className="w-full"
                onClick={handleGenerate}
                loading={isGenerating}
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Generate Dental Copy & Visual Plan
              </Button>
            </div>
          </Card>

          {/* Editable Post Copy Card */}
          {currentRecord && (
            <Card className="space-y-4">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <CardTitle className="text-sm font-bold uppercase tracking-wider text-[#333333]">
                    2. Generated Clinical Copy
                  </CardTitle>
                  <Badge variant="purple" size="sm">{currentRecord.frequencyMode} batch</Badge>
                </div>
                {currentRecord.qcResults && (
                  <Badge variant={currentRecord.qcResults.passed ? 'success' : 'warning'}>
                    QC Score: {currentRecord.qcResults.score}%
                  </Badge>
                )}
              </CardHeader>

              <div className="space-y-4 text-xs">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    First Line Hook (Thumb-Stop)
                  </label>
                  <input
                    type="text"
                    value={currentRecord?.hook || ''}
                    onChange={(e) => setCurrentRecord(prev => prev ? { ...prev, hook: e.target.value } : null)}
                    className="w-full px-3 py-2 font-semibold text-slate-900 border border-slate-200 rounded-lg text-xs"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    Clinical Educational Caption
                  </label>
                  <textarea
                    rows={6}
                    value={currentRecord?.caption || ''}
                    onChange={(e) => setCurrentRecord(prev => prev ? { ...prev, caption: e.target.value } : null)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs leading-relaxed"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    Call To Action (CTA)
                  </label>
                  <input
                    type="text"
                    value={currentRecord?.cta || ''}
                    onChange={(e) => setCurrentRecord(prev => prev ? { ...prev, cta: e.target.value } : null)}
                    className="w-full px-3 py-2 border border-slate-200 bg-slate-50/70 rounded-lg text-xs text-[#333333] font-medium"
                  />
                </div>

                {/* Submission Action */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div className="text-[11px] text-slate-500">
                    Routes directly to <span className="font-semibold text-slate-700">Pending Approvals</span> queue.
                  </div>

                  <Button
                    variant="primary"
                    size="md"
                    onClick={handleSaveAndSubmit}
                    disabled={submittedToApprovals}
                  >
                    {submittedToApprovals ? (
                      <>
                        <Check className="w-4 h-4 mr-1 text-white" />
                        Routed to Approvals!
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-1" />
                        Submit for Doctor Sign-Off
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </Card>
          )}
        </div>

        {/* Right Column: Live Feed Simulation */}
        <div className="lg:col-span-5 space-y-5">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-[#333333] uppercase tracking-wider">
              Social Media Preview
            </h3>
            <span className="text-xs text-slate-400">Live Mockup</span>
          </div>

          {currentRecord ? (
            <MockPostPreview record={currentRecord} brand={safeBrand} />
          ) : (
            <Card className="p-8 text-center text-slate-400 text-xs">
              Configure parameters on the left and click &quot;Generate Dental Copy&quot; to preview.
            </Card>
          )}

          {currentRecord?.qcResults && (
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-xs uppercase font-bold text-slate-700 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  Automated Quality Check
                </CardTitle>
                <span className="text-xs font-bold text-emerald-600">
                  {currentRecord.qcResults.score}/100
                </span>
              </CardHeader>
              <div className="space-y-2 text-xs">
                {(currentRecord.qcResults.checks || []).map((c, i) => (
                  <div key={i} className="flex items-start gap-2 text-[11px]">
                    <span className={`w-3.5 h-3.5 rounded-full flex items-center justify-center text-[9px] text-white shrink-0 mt-0.5 ${
                      c.passed ? 'bg-emerald-500' : 'bg-amber-500'
                    }`}>
                      {c.passed ? '✓' : '!'}
                    </span>
                    <div>
                      <div className="font-semibold text-slate-800 leading-tight">{c.rule}</div>
                      <div className="text-[10px] text-slate-500">{c.message}</div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

class CopywriterErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error: Error | null }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error("AI Copywriter Studio caught error:", error, errorInfo);
  }

  handleReset = () => {
    try {
      localStorage.removeItem('dental_erp_brand');
      localStorage.removeItem('dental_erp_content');
      localStorage.removeItem('dental_erp_calendar');
      localStorage.removeItem('dental_erp_analytics');
      localStorage.removeItem('dental_erp_credits');
    } catch {}
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-8 max-w-lg mx-auto my-12 bg-white rounded-2xl border border-sky-200 shadow-md text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-sky-50 text-[#4f98db] mx-auto flex items-center justify-center font-bold text-xl">
            ✨
          </div>
          <h2 className="text-base font-bold text-[#333333]">Synchronizing AI Copywriter Studio</h2>
          <p className="text-xs text-slate-500 leading-relaxed">
            Your workspace cache was upgraded to support YouTube Shorts, reels captions, and multi-format presets.
          </p>
          <div className="pt-2">
            <button
              onClick={this.handleReset}
              className="px-5 py-2.5 bg-[#4f98db] text-white rounded-xl text-xs font-bold hover:bg-[#3d82c2] transition-colors shadow-xs"
            >
              Update Cache & Launch Studio
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function CopywriterPage() {
  return (
    <CopywriterErrorBoundary>
      <Suspense fallback={<div className="p-8 text-center text-slate-400 text-sm">Loading AI Studio...</div>}>
        <CopywriterContent />
      </Suspense>
    </CopywriterErrorBoundary>
  );
}
