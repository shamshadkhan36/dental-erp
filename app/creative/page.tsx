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
  Video, 
  Play, 
  Smartphone, 
  Monitor, 
  Youtube, 
  Instagram, 
  Facebook,
  Type,
  Subtitles,
  Film
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
  const initialTab = searchParams.get('tab') || 'social';
  const [activeTab, setActiveTab] = useState<'social' | 'reels' | 'story' | 'wallpaper' | 'flyers'>(initialTab as any);

  const { brand, contentRecords, flyers, saveContentRecord, saveFlyer } = useERPStore();
  const [selectedRecordId, setSelectedRecordId] = useState(contentRecords[0]?.id || '');
  const [customImageUrl, setCustomImageUrl] = useState('');
  const [showWatermark, setShowWatermark] = useState(true);
  const [templateAspect, setTemplateAspect] = useState<'square' | 'portrait' | 'story'>('portrait');
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Requirement 1: Reels Section States
  const [videoSource, setVideoSource] = useState<'drive' | 'generate'>('drive');
  const [captionStyle, setCaptionStyle] = useState<'static_text' | 'text_and_captions'>('text_and_captions');
  const [selectedDriveVideo, setSelectedDriveVideo] = useState('DrChen_GuidedImplant_3D_Broll.mp4');
  const [aiVideoPrompt, setAiVideoPrompt] = useState('Cinematic 3D animation of clear aligner gently moving teeth into perfect alignment with soft studio lighting.');
  const [isRenderingVideo, setIsRenderingVideo] = useState(false);

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
      {/* Top Banner with All Requested Tabs (Social, Reels, Story, Wallpaper, Flyers) */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-[#333333]">Creative Production Studio</h2>
          <p className="text-xs text-slate-500">
            Controlled visual branding for Instagram, Facebook & YouTube Shorts linked to Google Drive.
          </p>
        </div>

        {/* Tab navigation */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-100 rounded-xl">
          <button
            onClick={() => setActiveTab('social')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              activeTab === 'social'
                ? 'bg-[#4f98db] text-white shadow-xs'
                : 'text-slate-600 hover:text-[#333333]'
            }`}
          >
            <ImageIcon className="w-3.5 h-3.5" />
            Social Graphics
          </button>

          {/* Client Requested: Reels Section */}
          <button
            onClick={() => setActiveTab('reels')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              activeTab === 'reels'
                ? 'bg-[#4f98db] text-white shadow-xs'
                : 'text-slate-600 hover:text-[#333333]'
            }`}
          >
            <Film className="w-3.5 h-3.5 text-rose-500" />
            Reels & Video
          </button>

          {/* Client Requested: Story Tab */}
          <button
            onClick={() => setActiveTab('story')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              activeTab === 'story'
                ? 'bg-[#4f98db] text-white shadow-xs'
                : 'text-slate-600 hover:text-[#333333]'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5 text-purple-600" />
            Story
          </button>

          {/* Client Requested: Wallpaper Tab */}
          <button
            onClick={() => setActiveTab('wallpaper')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              activeTab === 'wallpaper'
                ? 'bg-[#4f98db] text-white shadow-xs'
                : 'text-slate-600 hover:text-[#333333]'
            }`}
          >
            <Monitor className="w-3.5 h-3.5 text-teal-600" />
            Wallpaper
          </button>

          <button
            onClick={() => setActiveTab('flyers')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              activeTab === 'flyers'
                ? 'bg-[#4f98db] text-white shadow-xs'
                : 'text-slate-600 hover:text-[#333333]'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            Flyers & Posters
          </button>
        </div>
      </div>

      {/* TAB 1: Social Media Graphics (IG, FB, YouTube) */}
      {activeTab === 'social' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-6 space-y-5">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-bold uppercase tracking-wider text-[#333333]">
                  Controlled Social Templates
                </CardTitle>
                <Badge variant="primary">Multi-Platform (IG, FB, YT)</Badge>
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
                      { id: 'story', label: '9:16 Shorts/Reel', note: '1080x1920 Vertical' },
                    ].map(a => (
                      <button
                        key={a.id}
                        type="button"
                        onClick={() => setTemplateAspect(a.id as any)}
                        className={`p-2.5 rounded-xl border text-center transition-all ${
                          templateAspect === a.id
                            ? 'bg-[#f0f7fd] border-[#4f98db] text-[#1d528c] font-bold'
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
                    Choose Approved Clinical Artwork (or Drive Link)
                  </label>
                  <div className="grid grid-cols-5 gap-2">
                    {clinicPhotoPresets.map((photo, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setCustomImageUrl(photo.url)}
                        className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                          (customImageUrl || selectedRecord?.creativeAssetUrl) === photo.url
                            ? 'border-[#4f98db] ring-2 ring-[#4f98db]/30'
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

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                  <label className="flex items-center gap-2 cursor-pointer font-medium text-slate-700">
                    <input
                      type="checkbox"
                      checked={showWatermark}
                      onChange={(e) => setShowWatermark(e.target.checked)}
                      className="w-4 h-4 rounded text-[#4f98db] focus:ring-[#4f98db]"
                    />
                    Display Logo Watermark
                  </label>
                  <Badge variant="primary">Brand Colors #4f98db</Badge>
                </div>

                <Button
                  variant="cta"
                  className="w-full"
                  onClick={handleUpdateVisual}
                >
                  {savedSuccess ? (
                    <>
                      <Check className="w-4 h-4 mr-1" />
                      Artwork Applied & Saved!
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 mr-1" />
                      Apply Visual Artwork
                    </>
                  )}
                </Button>
              </div>
            </Card>
          </div>

          <div className="lg:col-span-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-[#333333] uppercase tracking-wider">
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

      {/* REQUIREMENT 1: REELS & VIDEO PRODUCTION SECTION */}
      {activeTab === 'reels' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-6 space-y-5">
            <Card className="border-l-4 border-l-rose-500">
              <CardHeader>
                <div>
                  <CardTitle className="text-sm font-bold uppercase tracking-wider text-[#333333] flex items-center gap-2">
                    <Film className="w-4 h-4 text-rose-500" />
                    Reels & YouTube Shorts Video Engine
                  </CardTitle>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Configure video source, overlay typography, and voiceover pacing.
                  </p>
                </div>
                <Badge variant="purple">9:16 Vertical Video</Badge>
              </CardHeader>

              <div className="space-y-4 text-xs">
                {/* 1. TWO VIDEO OPTIONS (Drive vs AI Video) requested by client */}
                <div>
                  <label className="font-bold text-slate-800 block mb-1.5 uppercase text-[10px] tracking-wider">
                    Step 1: Choose Video Source
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setVideoSource('drive')}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        videoSource === 'drive'
                          ? 'border-[#4f98db] bg-[#f0f7fd] ring-2 ring-[#4f98db]/20'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center gap-2 font-bold text-slate-900 mb-1">
                        <FolderGit2 className="w-4 h-4 text-[#4f98db]" />
                        1. Select from Drive
                      </div>
                      <div className="text-[11px] text-slate-500">
                        Select raw clinical B-roll or doctor footage from Google Drive.
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setVideoSource('generate')}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        videoSource === 'generate'
                          ? 'border-[#e97538] bg-[#fdf2ec] ring-2 ring-[#e97538]/20'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center gap-2 font-bold text-slate-900 mb-1">
                        <Sparkles className="w-4 h-4 text-[#e97538]" />
                        2. Generate a Video
                      </div>
                      <div className="text-[11px] text-slate-500">
                        Use AI video generation from clinical scripts & dental prompts.
                      </div>
                    </button>
                  </div>
                </div>

                {/* Video Selection / Generation Inputs */}
                {videoSource === 'drive' ? (
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                    <label className="font-semibold text-slate-700 block">
                      Choose Footage from Clinic Google Drive
                    </label>
                    <select
                      value={selectedDriveVideo}
                      onChange={(e) => setSelectedDriveVideo(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs bg-white font-medium"
                    >
                      <option value="DrChen_GuidedImplant_3D_Broll.mp4">DrChen_GuidedImplant_3D_Broll.mp4 (1080x1920 • 28s)</option>
                      <option value="Invisalign_Smile_Reveal_FintechPatient.mp4">Invisalign_Smile_Reveal_FintechPatient.mp4 (1080x1920 • 19s)</option>
                      <option value="Clinic_WaitingLounge_MovieGlasses_Tour.mp4">Clinic_WaitingLounge_MovieGlasses_Tour.mp4 (1080x1920 • 22s)</option>
                      <option value="Laser_Whitening_Application_Macro.mp4">Laser_Whitening_Application_Macro.mp4 (1080x1920 • 15s)</option>
                    </select>
                    <div className="text-[10px] text-slate-400 flex items-center justify-between">
                      <span>Folder: /MarketingAssets_2026/Reels/Raw_Video</span>
                      <a href={brand.gdriveRootFolder} target="_blank" rel="noreferrer" className="text-[#4f98db] hover:underline flex items-center gap-0.5">
                        Open Drive <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                ) : (
                  <div className="p-3 bg-[#fdf2ec]/50 rounded-xl border border-[#fbd3be] space-y-2">
                    <label className="font-semibold text-slate-800 block">
                      AI Dental Video Generation Prompt
                    </label>
                    <textarea
                      rows={3}
                      value={aiVideoPrompt}
                      onChange={(e) => setAiVideoPrompt(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs bg-white"
                    />
                    <div className="flex justify-between items-center text-[11px]">
                      <span className="text-slate-500">Credits needed: 1 Video Render</span>
                      <Button
                        size="sm"
                        variant="cta"
                        loading={isRenderingVideo}
                        onClick={() => {
                          setIsRenderingVideo(true);
                          setTimeout(() => setIsRenderingVideo(false), 2000);
                        }}
                      >
                        <Sparkles className="w-3 h-3 mr-1" />
                        Render AI Video
                      </Button>
                    </div>
                  </div>
                )}

                {/* 2. TWO TEXT OVERLAPPING OPTIONS requested by client */}
                <div>
                  <label className="font-bold text-slate-800 block mb-1.5 uppercase text-[10px] tracking-wider">
                    Step 2: Video Caption & Overlay Format
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setCaptionStyle('static_text')}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        captionStyle === 'static_text'
                          ? 'border-[#4f98db] bg-[#f0f7fd] ring-2 ring-[#4f98db]/20'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center gap-2 font-bold text-slate-900 mb-1">
                        <Type className="w-4 h-4 text-[#4f98db]" />
                        1. Static Text Overlapping
                      </div>
                      <div className="text-[11px] text-slate-500">
                        Fixed headline banner & clinic CTA in top/bottom video safe zones.
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setCaptionStyle('text_and_captions')}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        captionStyle === 'text_and_captions'
                          ? 'border-[#e97538] bg-[#fdf2ec] ring-2 ring-[#e97538]/20'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center gap-2 font-bold text-slate-900 mb-1">
                        <Subtitles className="w-4 h-4 text-[#e97538]" />
                        2. Text + Dynamic Captions
                      </div>
                      <div className="text-[11px] text-slate-500">
                        Title banner plus animated word-by-word karaoke subtitles synced to speech.
                      </div>
                    </button>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-slate-500">Target Platforms:</span>
                  <div className="flex gap-2">
                    <Badge variant="primary"><Instagram className="w-3 h-3 text-pink-600 inline mr-1" /> IG Reels</Badge>
                    <Badge variant="primary"><Youtube className="w-3 h-3 text-red-600 inline mr-1" /> YT Shorts</Badge>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Interactive 9:16 Video Player Mockup */}
          <div className="lg:col-span-6 flex flex-col items-center">
            <div className="w-full max-w-[340px] aspect-[9/16] bg-slate-950 rounded-3xl shadow-2xl border-4 border-slate-800 overflow-hidden relative text-white flex flex-col justify-between p-5">
              {/* Simulated Video Background */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=1080&auto=format&fit=crop&q=80"
                alt="Reel preview"
                className="absolute inset-0 w-full h-full object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-slate-950/70"></div>

              {/* Top Bar with Platform Indicators */}
              <div className="relative z-10 flex items-center justify-between">
                <div className="flex items-center gap-1.5 px-2.5 py-1 bg-black/50 backdrop-blur-md rounded-full text-[10px] font-bold border border-white/20">
                  <Play className="w-3 h-3 text-emerald-400 fill-emerald-400" />
                  <span>0:24 / 0:30</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-6 h-6 rounded-full bg-pink-600/80 flex items-center justify-center text-[10px]">
                    <Instagram className="w-3.5 h-3.5" />
                  </span>
                  <span className="w-6 h-6 rounded-full bg-red-600/80 flex items-center justify-center text-[10px]">
                    <Youtube className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>

              {/* OVERLAY OPTION 1: Static Text Overlapping Video */}
              <div className="relative z-10 text-center my-auto px-2">
                <div className="inline-block px-3 py-1 bg-[#4f98db] text-white font-extrabold text-xs uppercase tracking-wider rounded-md shadow-lg mb-2">
                  Myth vs Fact 🦷
                </div>
                <h3 className="text-base font-black leading-tight drop-shadow-md text-white mb-2">
                  &quot;Do Dental Implants Hurt Worse Than Root Canals?&quot;
                </h3>

                {/* OVERLAY OPTION 2: Text + Dynamic Captions Overlapping Video */}
                {captionStyle === 'text_and_captions' && (
                  <div className="mt-4 p-2.5 bg-black/60 backdrop-blur-md rounded-xl border border-white/20 inline-block animate-pulse">
                    <span className="text-xs font-black text-white">
                      &quot;...actually has <span className="text-[#e97538] font-black underline">virtually ZERO</span> pain-sensing nerves!&quot;
                    </span>
                    <div className="text-[9px] text-[#4f98db] mt-1 font-bold uppercase tracking-widest">
                      Dynamic Captions Synced
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom Video Meta Bar */}
              <div className="relative z-10 space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-white text-slate-900 font-bold flex items-center justify-center text-xs">
                    AS
                  </div>
                  <div>
                    <div className="text-xs font-bold">@apexsmilestudio</div>
                    <div className="text-[10px] text-slate-300">Dr. Sarah Chen • Clinical Reel</div>
                  </div>
                </div>

                <div className="p-2 bg-[#e97538] text-white rounded-lg text-center font-bold text-xs shadow-md">
                  Comment &quot;IMPLANT&quot; for Free Consultation
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* REQUIREMENT 1: STORY TAB (Requested for now) */}
      {activeTab === 'story' && (
        <Card className="p-8 text-center space-y-4 max-w-2xl mx-auto">
          <div className="w-14 h-14 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center mx-auto">
            <Smartphone className="w-7 h-7" />
          </div>
          <h3 className="text-base font-bold text-[#333333]">Instagram & Facebook Story Studio</h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
            Staging templates for daily 24-hour clinic stories (Interactive Q&A patient stickers, Treatment of the Day, Clinic behind-the-scenes polls).
          </p>
          <div className="grid grid-cols-3 gap-3 pt-4 text-xs">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="font-bold block text-slate-800">Q&A Sticker</span>
              <span className="text-[10px] text-slate-400">Ask the Dentist</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="font-bold block text-slate-800">Before & After</span>
              <span className="text-[10px] text-slate-400">Tap to Reveal</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="font-bold block text-slate-800">Today&apos;s Open Slot</span>
              <span className="text-[10px] text-slate-400">Last-Minute Booking</span>
            </div>
          </div>
          <Badge variant="primary">Story Module Staging Active</Badge>
        </Card>
      )}

      {/* REQUIREMENT 1: WALLPAPER TAB (Requested for now) */}
      {activeTab === 'wallpaper' && (
        <Card className="p-8 text-center space-y-4 max-w-2xl mx-auto">
          <div className="w-14 h-14 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center mx-auto">
            <Monitor className="w-7 h-7" />
          </div>
          <h3 className="text-base font-bold text-[#333333]">Clinic Digital Wallpapers & TV Displays</h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
            Generate customized 16:9 4K waiting room TV screensavers, patient treatment lounge slides, and mobile wallpapers with clinic branding and QR codes.
          </p>
          <div className="grid grid-cols-2 gap-3 pt-4 text-xs">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="font-bold block text-slate-800">16:9 Clinic TV Display</span>
              <span className="text-[10px] text-slate-400">Waiting Room Loop</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="font-bold block text-slate-800">9:16 Patient Mobile</span>
              <span className="text-[10px] text-slate-400">Clinic App Wallpapers</span>
            </div>
          </div>
          <Badge variant="primary">Wallpaper Module Staging Active</Badge>
        </Card>
      )}

      {/* TAB 5: Dedicated Flyer Studio */}
      {activeTab === 'flyers' && (
        <div className="space-y-6">
          <div className="bg-[#f0f7fd] border border-[#b9ddf7] rounded-xl p-4 text-xs text-[#1d528c] flex items-start gap-3">
            <span className="w-6 h-6 rounded-full bg-[#4f98db] text-white flex items-center justify-center font-bold text-xs shrink-0">
              i
            </span>
            <div>
              <span className="font-bold">Clinic Flyer Workflow:</span> Dedicated ad-hoc promotional flyers for community screenings, whitening flash packages, and seasonal offers. Available for instant high-resolution printing or PDF export.
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
