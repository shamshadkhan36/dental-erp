'use client';

import React, { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { 
  Image as ImageIcon, 
  FileText, 
  FolderGit2, 
  ExternalLink, 
  Sparkles, 
  Check, 
  Upload, 
  Layers, 
  Download,
  Sliders
} from 'lucide-react';
import { useERPStore } from '../../lib/store';
import { Card, CardHeader, CardTitle } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { FlyerEditor } from '../../components/FlyerEditor';
import { MockPostPreview } from '../../components/MockPostPreview';
import { ContentRecord, FlyerRecord } from '../../types';

function CreativeContent() {
  const searchParams = useSearchParams();
  const initialTab = searchParams.get('tab') === 'flyers' ? 'flyers' : 'social';
  const [activeTab, setActiveTab] = useState<'social' | 'flyers'>(initialTab);

  const { brand, contentRecords, flyers, saveContentRecord, saveFlyer } = useERPStore();
  const [selectedRecordId, setSelectedRecordId] = useState(contentRecords[0]?.id || '');
  const [customImageUrl, setCustomImageUrl] = useState('');
  const [showWatermark, setShowWatermark] = useState(true);
  const [templateAspect, setTemplateAspect] = useState<'square' | 'portrait' | 'story'>('portrait');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const selectedRecord = contentRecords.find(r => r.id === selectedRecordId) || contentRecords[0];

  const handleUpdateVisual = () => {
    if (!selectedRecord) return;
    const updated: ContentRecord = {
      ...selectedRecord,
      creativeAssetUrl: customImageUrl || selectedRecord.creativeAssetUrl,
    };
    saveContentRecord(updated);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  const handleSaveFlyerToApprovals = (flyer: FlyerRecord) => {
    saveFlyer(flyer);
  };

  const clinicPhotoPresets = [
    { name: "Consultation & Exam", url: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=1080&auto=format&fit=crop&q=80" },
    { name: "3D Aligner Simulation", url: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=1080&auto=format&fit=crop&q=80" },
    { name: "Digital Guided Surgery", url: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=1080&auto=format&fit=crop&q=80" },
    { name: "Confident Patient Smile", url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=1080&auto=format&fit=crop&q=80" },
    { name: "Laser Whitening Tech", url: "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?w=1080&auto=format&fit=crop&q=80" }
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner with Tab Switching */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Creative Production & Flyer Studio</h2>
          <p className="text-xs text-slate-500">
            Generate and assemble graphics using clinic brand standards linked to Google Drive.
          </p>
        </div>

        {/* Tab navigation */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl">
          <button
            onClick={() => setActiveTab('social')}
            className={`flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
              activeTab === 'social'
                ? 'bg-sky-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            Social Media Graphics
          </button>
          <button
            onClick={() => setActiveTab('flyers')}
            className={`flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
              activeTab === 'flyers'
                ? 'bg-sky-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <FileText className="w-4 h-4" />
            Dental Flyers & Posters
          </button>
        </div>
      </div>

      {/* TAB 1: Social Media Graphics & Google Drive */}
      {activeTab === 'social' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Controls Column */}
          <div className="lg:col-span-6 space-y-5">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-bold uppercase tracking-wider text-slate-800">
                  Select Content Record to Assemble
                </CardTitle>
                <Badge variant="purple">Controlled Templates</Badge>
              </CardHeader>

              <div className="space-y-4 text-xs">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">
                    Active Post Copy Record
                  </label>
                  <select
                    value={selectedRecordId}
                    onChange={(e) => {
                      setSelectedRecordId(e.target.value);
                      const rec = contentRecords.find(r => r.id === e.target.value);
                      if (rec?.creativeAssetUrl) setCustomImageUrl(rec.creativeAssetUrl);
                    }}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs bg-white"
                  >
                    {contentRecords.map(r => (
                      <option key={r.id} value={r.id}>
                        [{r.format.toUpperCase()}] {r.title} ({r.treatmentName})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Aspect Ratio Selector */}
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Canvas Format</label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'square', label: '1:1 Square', note: '1080x1080 Feed' },
                      { id: 'portrait', label: '4:5 Portrait', note: '1080x1350 Carousel' },
                      { id: 'story', label: '9:16 Story/Reel', note: '1080x1920 Vertical' },
                    ].map(a => (
                      <button
                        key={a.id}
                        type="button"
                        onClick={() => setTemplateAspect(a.id as any)}
                        className={`p-2.5 rounded-xl border text-center transition-all ${
                          templateAspect === a.id
                            ? 'bg-sky-50 border-sky-500 text-sky-700 font-bold'
                            : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        <span className="text-xs font-semibold block">{a.label}</span>
                        <span className="text-[10px] text-slate-400 block">{a.note}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Preset Clinical Imagery */}
                <div>
                  <label className="font-semibold text-slate-700 block mb-2">
                    Choose Approved Clinical Artwork (or Upload)
                  </label>
                  <div className="grid grid-cols-5 gap-2">
                    {clinicPhotoPresets.map((photo, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setCustomImageUrl(photo.url)}
                        className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                          (customImageUrl || selectedRecord?.creativeAssetUrl) === photo.url
                            ? 'border-sky-500 ring-2 ring-sky-500/30'
                            : 'border-transparent opacity-75 hover:opacity-100'
                        }`}
                        title={photo.name}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={photo.url} alt={photo.name} className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Custom Image URL / Upload */}
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Image URL / Drive Asset Link</label>
                  <input
                    type="text"
                    placeholder="https://..."
                    value={customImageUrl || selectedRecord?.creativeAssetUrl || ''}
                    onChange={(e) => setCustomImageUrl(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs"
                  />
                </div>

                {/* Branding controls */}
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                  <label className="flex items-center gap-2 cursor-pointer font-medium text-slate-700">
                    <input
                      type="checkbox"
                      checked={showWatermark}
                      onChange={(e) => setShowWatermark(e.target.checked)}
                      className="w-4 h-4 rounded text-sky-600 focus:ring-sky-500"
                    />
                    Display Clinical Logo Watermark
                  </label>

                  <Badge variant="success">Auto Brand Colors</Badge>
                </div>

                <div className="pt-2 flex items-center gap-3">
                  <Button
                    variant="primary"
                    className="flex-1"
                    onClick={handleUpdateVisual}
                  >
                    {savedSuccess ? (
                      <>
                        <Check className="w-4 h-4 mr-1 text-emerald-300" />
                        Artwork Assembled & Saved!
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4 mr-1 text-sky-200" />
                        Apply Visual Artwork
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </Card>

            {/* Google Drive Integration Box */}
            <Card className="bg-sky-50/50 border-sky-200">
              <div className="flex items-start justify-between gap-3 text-xs">
                <div className="flex items-center gap-2 text-sky-900 font-bold">
                  <FolderGit2 className="w-5 h-5 text-sky-600 shrink-0" />
                  <span>Google Drive Synced Folder</span>
                </div>
                <Badge variant="primary" size="sm">Active Sync</Badge>
              </div>
              <p className="text-[11px] text-sky-800/80 mt-2 leading-relaxed">
                Assets generated here are mapped to your clinic&apos;s Google Drive folder at:
                <br />
                <code className="text-[10px] bg-white px-2 py-0.5 rounded border border-sky-200 mt-1 inline-block font-mono">
                  {selectedRecord?.gdriveAssetLink || brand.gdriveRootFolder}
                </code>
              </p>
              <div className="mt-3">
                <a
                  href={brand.gdriveRootFolder}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs font-bold text-sky-700 hover:text-sky-800 flex items-center gap-1"
                >
                  Open in Google Drive <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </Card>
          </div>

          {/* Preview Column */}
          <div className="lg:col-span-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
                Artwork Canvas Preview
              </h3>
              <Badge variant="outline">Live Rendering</Badge>
            </div>

            {selectedRecord && (
              <MockPostPreview 
                record={{
                  ...selectedRecord,
                  creativeAssetUrl: customImageUrl || selectedRecord.creativeAssetUrl
                }} 
                brand={brand} 
              />
            )}
          </div>
        </div>
      )}

      {/* TAB 2: Dedicated Flyer Studio */}
      {activeTab === 'flyers' && (
        <div className="space-y-6">
          <div className="bg-sky-50/60 border border-sky-200 rounded-xl p-4 text-xs text-sky-950 flex items-start gap-3">
            <span className="w-6 h-6 rounded-full bg-sky-500 text-white flex items-center justify-center font-bold text-xs shrink-0">
              i
            </span>
            <div>
              <span className="font-bold">Clinic Flyer Workflow:</span> Per your ERP specification, flyers operate on an ad-hoc single request basis (e.g. Free Dental Camps, Emergency Clinic specials, Seasonal Whitening packages). Once designed, they are routed to <strong>Pending Approvals</strong> and become immediately downloadable in print-ready high-resolution formats.
            </div>
          </div>

          <FlyerEditor
            brand={brand}
            initialFlyer={flyers[0]}
            onSaveToApprovals={handleSaveFlyerToApprovals}
          />
        </div>
      )}
    </div>
  );
}

export default function CreativePage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-slate-400 text-sm">Loading Creative Studio...</div>}>
      <CreativeContent />
    </Suspense>
  );
}
