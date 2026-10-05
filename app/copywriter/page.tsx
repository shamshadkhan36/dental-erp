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
  ShieldCheck, 
  Sliders, 
  Layers, 
  Video, 
  FileText,
  AlertCircle
} from 'lucide-react';
import { useERPStore } from '../../lib/store';
import { Card, CardHeader, CardTitle } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { MockPostPreview } from '../../components/MockPostPreview';
import { generateDentalContent } from '../../lib/ai-prompts';
import { runQualityCheck } from '../../lib/qc-engine';
import { ContentFormat, ContentRecord, PlatformType, ProductionFrequency } from '../../types';

function CopywriterContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { brand, calendar, contentRecords, saveContentRecord } = useERPStore();

  const editId = searchParams.get('edit');
  const calId = searchParams.get('calId');
  const initialTopic = searchParams.get('topic') || '';
  const initialFormat = (searchParams.get('format') as ContentFormat) || 'single';
  const initialTreatment = searchParams.get('treatment') || brand.treatments[0]?.id;
  const initialIcp = searchParams.get('icp') || brand.icpProfiles[0]?.id;

  // Frequency selector: Monthly | Weekly | On Request
  const [frequencyMode, setFrequencyMode] = useState<ProductionFrequency>('weekly');

  // Generation Form State
  const [selectedTopic, setSelectedTopic] = useState(initialTopic);
  const [selectedCalendarId, setSelectedCalendarId] = useState(calId || '');
  const [format, setFormat] = useState<ContentFormat>(initialFormat);
  const [platforms, setPlatforms] = useState<PlatformType[]>(['instagram', 'facebook']);
  const [treatmentId, setTreatmentId] = useState(initialTreatment);
  const [icpId, setIcpId] = useState(initialIcp);
  const [customInstructions, setCustomInstructions] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  // Active Content Record being edited or generated
  const [currentRecord, setCurrentRecord] = useState<ContentRecord | null>(null);
  const [submittedToApprovals, setSubmittedToApprovals] = useState(false);

  // Load existing record if editing
  useEffect(() => {
    if (editId) {
      const existing = contentRecords.find(r => r.id === editId);
      if (existing) {
        setCurrentRecord(existing);
        setFormat(existing.format);
        setPlatforms(existing.platforms);
        setTreatmentId(existing.treatmentId);
      }
    } else if (!currentRecord && contentRecords.length > 0) {
      setCurrentRecord(contentRecords[0]);
    }
  }, [editId, contentRecords]);

  // When calendar item selected, prefill topic and treatment
  const handleCalendarSelect = (cId: string) => {
    setSelectedCalendarId(cId);
    const item = calendar.find(c => c.id === cId);
    if (item) {
      setSelectedTopic(item.topic);
      setFormat(item.format);
      setTreatmentId(item.targetTreatmentId);
      setPlatforms(item.platforms);
    }
  };

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const treatment = brand.treatments.find(t => t.id === treatmentId) || brand.treatments[0];
      const icp = brand.icpProfiles.find(i => i.id === icpId) || brand.icpProfiles[0];

      const generated = generateDentalContent({
        topic: selectedTopic || `Modern ${treatment.name} Clinical Guide`,
        format,
        frequencyMode,
        treatment,
        icp,
        brand,
        customInstructions
      });

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
    if (platforms.includes(p)) {
      if (platforms.length > 1) setPlatforms(platforms.filter(x => x !== p));
    } else {
      setPlatforms([...platforms, p]);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner: Frequency Selection */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900">AI Copywriter & Creative Studio</h2>
          <p className="text-xs text-slate-500">
            Generate high-converting dental hooks, captions, carousel slides, and reel scripts.
          </p>
        </div>

        {/* Frequency Modes per Spreadsheet */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl">
          <span className="text-[10px] font-bold uppercase text-slate-400 px-2">Frequency:</span>
          {(['weekly', 'monthly', 'on_request'] as ProductionFrequency[]).map((mode) => (
            <button
              key={mode}
              onClick={() => setFrequencyMode(mode)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg capitalize transition-all ${
                frequencyMode === mode
                  ? 'bg-sky-600 text-white shadow-xs'
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
        {/* Left Column: Generation Controls & Live Editor */}
        <div className="lg:col-span-7 space-y-6">
          {/* Generation Configuration Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-bold uppercase tracking-wider text-slate-800">
                1. Post Parameters & AI Prompts
              </CardTitle>
              <Badge variant="primary" size="sm">
                Voice: {brand.brandVoice.split(',')[0]}
              </Badge>
            </CardHeader>

            <div className="space-y-4 text-xs">
              {/* Select from Calendar option */}
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
                  {calendar.map(c => (
                    <option key={c.id} value={c.id}>
                      {c.date} • [{c.pillar}] {c.topic}
                    </option>
                  ))}
                </select>
              </div>

              {/* Topic Input */}
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

              {/* Format & Platforms Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Content Format</label>
                  <div className="grid grid-cols-3 gap-1.5">
                    {[
                      { id: 'single', label: 'Single Post', icon: FileText },
                      { id: 'carousel', label: 'Carousel', icon: Layers },
                      { id: 'reel', label: 'Reel Script', icon: Video },
                    ].map(f => (
                      <button
                        key={f.id}
                        type="button"
                        onClick={() => setFormat(f.id as any)}
                        className={`p-2 rounded-lg border text-center font-medium transition-all ${
                          format === f.id
                            ? 'bg-sky-50 border-sky-500 text-sky-700 font-bold'
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
                  <div className="flex gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => togglePlatform('instagram')}
                      className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg border text-xs font-semibold transition-all ${
                        platforms.includes('instagram')
                          ? 'bg-pink-50 border-pink-400 text-pink-700'
                          : 'border-slate-200 text-slate-400'
                      }`}
                    >
                      <Instagram className="w-4 h-4" /> Instagram
                    </button>
                    <button
                      type="button"
                      onClick={() => togglePlatform('facebook')}
                      className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg border text-xs font-semibold transition-all ${
                        platforms.includes('facebook')
                          ? 'bg-blue-50 border-blue-400 text-blue-700'
                          : 'border-slate-200 text-slate-400'
                      }`}
                    >
                      <Facebook className="w-4 h-4" /> Facebook
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
                    {brand.treatments.map(t => (
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
                    {brand.icpProfiles.map(i => (
                      <option key={i.id} value={i.id}>{i.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Custom Instructions */}
              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  Custom Doctor Instructions / Seasonal Angles
                </label>
                <input
                  type="text"
                  placeholder="e.g. Emphasize zero-percent financing and evening slots for busy executives"
                  value={customInstructions}
                  onChange={(e) => setCustomInstructions(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs"
                />
              </div>

              {/* Generate Trigger */}
              <Button
                variant="primary"
                size="md"
                className="w-full shadow-md"
                onClick={handleGenerate}
                loading={isGenerating}
              >
                <Sparkles className="w-4 h-4 mr-2 text-sky-200" />
                Generate Dental Copy & Visual Plan
              </Button>
            </div>
          </Card>

          {/* Editable Post Copy Card */}
          {currentRecord && (
            <Card className="space-y-4">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <CardTitle className="text-sm font-bold uppercase tracking-wider text-slate-800">
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
                {/* Hook Editor */}
                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    First Line Hook (Thumb-Stop)
                  </label>
                  <input
                    type="text"
                    value={currentRecord.hook}
                    onChange={(e) => setCurrentRecord({ ...currentRecord, hook: e.target.value })}
                    className="w-full px-3 py-2 font-semibold text-slate-900 border border-slate-200 rounded-lg text-xs"
                  />
                </div>

                {/* Caption Editor */}
                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    Clinical Educational Caption
                  </label>
                  <textarea
                    rows={6}
                    value={currentRecord.caption}
                    onChange={(e) => setCurrentRecord({ ...currentRecord, caption: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs leading-relaxed"
                  />
                </div>

                {/* CTA Editor */}
                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    Call To Action (CTA)
                  </label>
                  <input
                    type="text"
                    value={currentRecord.cta}
                    onChange={(e) => setCurrentRecord({ ...currentRecord, cta: e.target.value })}
                    className="w-full px-3 py-2 border border-sky-200 bg-sky-50/50 rounded-lg text-xs text-sky-900 font-medium"
                  />
                </div>

                {/* Carousel Slides Breakdown if Carousel */}
                {currentRecord.format === 'carousel' && currentRecord.carouselSlides && (
                  <div className="pt-2 border-t border-slate-100 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-800">Carousel Slide Breakdown ({currentRecord.carouselSlides.length} Slides)</span>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          const newSlide = {
                            slideNumber: (currentRecord.carouselSlides?.length || 0) + 1,
                            badge: "Bonus Tip",
                            title: "Next Step to Perfection",
                            bodyText: "Book your examination today.",
                            visualCue: "Clinic staff smiling at reception"
                          };
                          setCurrentRecord({
                            ...currentRecord,
                            carouselSlides: [...(currentRecord.carouselSlides || []), newSlide]
                          });
                        }}
                      >
                        <Plus className="w-3.5 h-3.5 mr-1" /> Add Slide
                      </Button>
                    </div>

                    <div className="space-y-3">
                      {currentRecord.carouselSlides.map((slide, idx) => (
                        <div key={idx} className="p-3 bg-slate-50 border border-slate-200/80 rounded-xl space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-slate-700 text-[11px]">
                              Slide {slide.slideNumber}: {slide.badge}
                            </span>
                            <button
                              onClick={() => {
                                const updated = currentRecord.carouselSlides?.filter((_, i) => i !== idx);
                                setCurrentRecord({ ...currentRecord, carouselSlides: updated });
                              }}
                              className="text-slate-400 hover:text-rose-500"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <input
                            type="text"
                            value={slide.title}
                            onChange={(e) => {
                              const updated = [...(currentRecord.carouselSlides || [])];
                              updated[idx].title = e.target.value;
                              setCurrentRecord({ ...currentRecord, carouselSlides: updated });
                            }}
                            className="w-full px-2.5 py-1 border border-slate-200 rounded font-semibold text-xs"
                          />
                          <textarea
                            rows={2}
                            value={slide.bodyText}
                            onChange={(e) => {
                              const updated = [...(currentRecord.carouselSlides || [])];
                              updated[idx].bodyText = e.target.value;
                              setCurrentRecord({ ...currentRecord, carouselSlides: updated });
                            }}
                            className="w-full px-2.5 py-1 border border-slate-200 rounded text-xs"
                          />
                          <div className="text-[10px] text-slate-500 italic">
                            Visual Cue: {slide.visualCue}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Reel Script Breakdown if Reel */}
                {currentRecord.format === 'reel' && currentRecord.reelScript && (
                  <div className="pt-2 border-t border-slate-100 space-y-3">
                    <span className="font-bold text-slate-800">Doctor Reel Script (30-Sec Pacing)</span>
                    <div className="space-y-2.5">
                      {currentRecord.reelScript.scenes.map((scene, i) => (
                        <div key={i} className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5">
                          <div className="flex items-center justify-between text-[11px] font-bold text-rose-600">
                            <span>Scene {i + 1} ({scene.second})</span>
                            <span className="text-slate-500 font-normal">Text: {scene.onScreenText}</span>
                          </div>
                          <p className="text-slate-700 italic">Voiceover: &quot;{scene.voiceover}&quot;</p>
                          <p className="text-[10px] text-slate-400">Action: {scene.action}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Submission Action */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div className="text-[11px] text-slate-500">
                    Routes directly to <span className="font-semibold text-slate-700">Pending Approvals</span> queue.
                  </div>

                  <Button
                    variant="success"
                    size="md"
                    onClick={handleSaveAndSubmit}
                    disabled={submittedToApprovals}
                  >
                    {submittedToApprovals ? (
                      <>
                        <Check className="w-4 h-4 mr-1 text-emerald-200" />
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
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
              Social Media Preview
            </h3>
            <span className="text-xs text-slate-400">Real-Time Mockup</span>
          </div>

          {currentRecord ? (
            <MockPostPreview record={currentRecord} brand={brand} />
          ) : (
            <Card className="p-8 text-center text-slate-400 text-xs">
              Configure parameters on the left and click &quot;Generate Dental Copy&quot; to preview.
            </Card>
          )}

          {/* Quality Check breakdown widget */}
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
                {currentRecord.qcResults.checks.map((c, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] text-white shrink-0 mt-0.5 ${
                      c.passed ? 'bg-emerald-500' : 'bg-amber-500'
                    }`}>
                      {c.passed ? '✓' : '!'}
                    </span>
                    <div>
                      <div className="font-semibold text-slate-800 leading-tight">{c.rule}</div>
                      <div className="text-[11px] text-slate-500">{c.message}</div>
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

export default function CopywriterPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-slate-400 text-sm">Loading AI Studio...</div>}>
      <CopywriterContent />
    </Suspense>
  );
}
