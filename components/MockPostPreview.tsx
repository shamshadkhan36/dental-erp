'use client';

import React, { useState } from 'react';
import { 
  Heart, 
  MessageCircle, 
  Send, 
  Bookmark, 
  MoreHorizontal, 
  ChevronLeft, 
  ChevronRight, 
  Instagram, 
  Facebook, 
  Youtube,
  CheckCircle2,
  AlertTriangle,
  ThumbsUp,
  Share2
} from 'lucide-react';
import { ContentRecord, BrandProfile, PlatformType } from '../types';
import { Badge } from './ui/Badge';

interface MockPostPreviewProps {
  record: ContentRecord;
  brand: BrandProfile;
  initialPlatform?: PlatformType;
}

export function MockPostPreview({
  record,
  brand,
  initialPlatform = 'instagram'
}: MockPostPreviewProps) {
  const [activePlatform, setActivePlatform] = useState<PlatformType>(initialPlatform);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showFullCaption, setShowFullCaption] = useState(false);

  const slides = record?.carouselSlides || [];
  const hasCarousel = record?.format === 'carousel' && slides.length > 0;

  const clinicName = brand?.clinicName || 'Apex Smile Studio';
  const address = brand?.address || 'New York, NY';
  const logoUrl = brand?.logoUrl || 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=150&auto=format&fit=crop&q=80';
  const caption = record?.caption || '';
  const cta = record?.cta || 'Schedule your visit today.';
  const hashtags = Array.isArray(record?.hashtags) ? record.hashtags : [];

  return (
    <div className="bg-slate-50 border border-slate-200/90 rounded-2xl overflow-hidden shadow-sm flex flex-col">
      {/* Platform Switcher & Format Header (Instagram, Facebook & YouTube) */}
      <div className="px-4 py-2.5 bg-white border-b border-slate-200 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 p-0.5 bg-slate-100 rounded-lg">
          <button
            onClick={() => setActivePlatform('instagram')}
            className={`flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-md transition-all ${
              activePlatform === 'instagram'
                ? 'bg-white text-pink-600 shadow-xs'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <Instagram className="w-3.5 h-3.5" />
            Instagram
          </button>
          <button
            onClick={() => setActivePlatform('facebook')}
            className={`flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-md transition-all ${
              activePlatform === 'facebook'
                ? 'bg-white text-blue-600 shadow-xs'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <Facebook className="w-3.5 h-3.5" />
            Facebook
          </button>
          <button
            onClick={() => setActivePlatform('youtube')}
            className={`flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-md transition-all ${
              activePlatform === 'youtube'
                ? 'bg-white text-red-600 shadow-xs'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <Youtube className="w-3.5 h-3.5" />
            YouTube
          </button>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant={record.format === 'carousel' ? 'purple' : record.format === 'reel' ? 'primary' : 'default'} size="sm">
            {record.format.toUpperCase()}
          </Badge>
          {record.qcResults && (
            <Badge variant={record.qcResults.passed ? 'success' : 'warning'} size="sm">
              {record.qcResults.passed ? (
                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
              ) : (
                <AlertTriangle className="w-3 h-3 text-amber-600" />
              )}
              QC {record.qcResults.score}%
            </Badge>
          )}
        </div>
      </div>

      {/* Feed Container */}
      <div className="p-4 flex justify-center bg-slate-100/60">
        <div className="w-full max-w-[420px] bg-white rounded-xl border border-slate-200 shadow-md overflow-hidden">
          {/* Post Header */}
          <div className="px-3.5 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full ring-2 ring-[#4f98db]/30 overflow-hidden bg-slate-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={logoUrl} 
                  alt={clinicName} 
                  className="w-full h-full object-cover" 
                />
              </div>
              <div>
                <div className="flex items-center gap-1">
                  <span className="text-xs font-bold text-slate-900 leading-tight">
                    {activePlatform === 'instagram' ? 'apexsmilestudio' : activePlatform === 'youtube' ? `${clinicName} • YouTube` : clinicName}
                  </span>
                  <span className="w-3.5 h-3.5 rounded-full bg-[#4f98db] text-white flex items-center justify-center text-[9px]">
                    ✓
                  </span>
                </div>
                <p className="text-[10px] text-slate-500">{address.split(',')[0]}</p>
              </div>
            </div>
            <button className="text-slate-400 hover:text-slate-600">
              <MoreHorizontal className="w-4 h-4" />
            </button>
          </div>

          {/* Visual Canvas Area */}
          <div className="relative aspect-square sm:aspect-[4/5] bg-slate-900 overflow-hidden flex flex-col justify-end text-white">
            {/* Visual background image */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src={record?.creativeAssetUrl || "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=1080&auto=format&fit=crop&q=80"} 
              alt={record?.title || 'Dental post'}
              className="absolute inset-0 w-full h-full object-cover opacity-85"
            />

            {/* Dark gradient for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>

            {/* Clinic Logo Watermark in Top Right */}
            <div className="absolute top-3 right-3 px-2.5 py-1 bg-black/50 backdrop-blur-md rounded-md text-[10px] font-semibold tracking-wider uppercase text-sky-200 border border-white/10">
              {clinicName.split(' ')[0]} Clinical
            </div>

            {/* Carousel Slide Overlay */}
            {hasCarousel ? (
              <div className="relative z-10 p-5">
                <div className="inline-block px-2 py-0.5 mb-2 rounded bg-[#4f98db] text-white text-[10px] font-bold uppercase tracking-wider">
                  {slides[currentSlide]?.badge || `Slide ${currentSlide + 1}/${slides.length}`}
                </div>
                <h4 className="text-lg font-bold leading-tight mb-2 text-white drop-shadow-md">
                  {slides[currentSlide]?.title}
                </h4>
                <p className="text-xs text-slate-200 leading-relaxed mb-3 drop-shadow">
                  {slides[currentSlide]?.bodyText}
                </p>
                <div className="text-[10px] text-sky-300 italic">
                  Visual Direction: {slides[currentSlide]?.visualCue}
                </div>
              </div>
            ) : record.format === 'reel' ? (
              <div className="relative z-10 p-5">
                <div className="inline-block px-2 py-0.5 mb-2 rounded bg-rose-500 text-white text-[10px] font-bold uppercase tracking-wider">
                  {activePlatform === 'youtube' ? 'YouTube Shorts' : 'Reel Video Hook'}
                </div>
                <h4 className="text-base font-bold leading-snug text-white mb-2">
                  {record.reelScript?.hookVisual || record.hook}
                </h4>
                <p className="text-xs text-slate-200">
                  Audio: {record.reelScript?.audioTrackSuggestion || 'Upbeat Clinical Beat'}
                </p>
              </div>
            ) : (
              <div className="relative z-10 p-5">
                <span className="px-2 py-0.5 bg-[#4f98db] rounded text-[10px] font-bold tracking-wide uppercase mb-2 inline-block">
                  {record.treatmentName}
                </span>
                <h4 className="text-base font-bold text-white drop-shadow leading-snug">
                  {record.hook}
                </h4>
              </div>
            )}

            {/* Carousel Pagination Controls */}
            {hasCarousel && (
              <>
                <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1.5 z-20">
                  {slides.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentSlide(idx)}
                      className={`h-1.5 rounded-full transition-all ${
                        currentSlide === idx ? 'w-5 bg-[#4f98db]' : 'w-1.5 bg-white/50'
                      }`}
                    />
                  ))}
                </div>

                {currentSlide > 0 && (
                  <button
                    onClick={() => setCurrentSlide(prev => prev - 1)}
                    className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 text-white flex items-center justify-center hover:bg-black/70 z-20"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                )}

                {currentSlide < slides.length - 1 && (
                  <button
                    onClick={() => setCurrentSlide(prev => prev + 1)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 text-white flex items-center justify-center hover:bg-black/70 z-20"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                )}
              </>
            )}
          </div>

          {/* Social Engagement Bar */}
          <div className="p-3">
            {activePlatform === 'youtube' ? (
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3 text-slate-700 text-xs font-semibold">
                  <span className="flex items-center gap-1 cursor-pointer hover:text-red-600">
                    <ThumbsUp className="w-4 h-4" /> 480
                  </span>
                  <span className="flex items-center gap-1 cursor-pointer hover:text-slate-900">
                    <MessageCircle className="w-4 h-4" /> 34
                  </span>
                  <span className="flex items-center gap-1 cursor-pointer hover:text-slate-900">
                    <Share2 className="w-4 h-4" /> Share
                  </span>
                </div>
                <Badge variant="primary" size="sm">Shorts</Badge>
              </div>
            ) : (
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3 text-slate-700">
                  <Heart className="w-5 h-5 hover:text-rose-500 cursor-pointer" />
                  <MessageCircle className="w-5 h-5 hover:text-[#4f98db] cursor-pointer" />
                  <Send className="w-5 h-5 hover:text-[#4f98db] cursor-pointer" />
                </div>
                <Bookmark className="w-5 h-5 text-slate-700 hover:text-slate-900 cursor-pointer" />
              </div>
            )}

            <div className="text-xs font-bold text-slate-900 mb-1">
              {activePlatform === 'instagram' ? '128 likes' : activePlatform === 'youtube' ? '2.8K views • 480 likes' : '34 reactions • 8 comments'}
            </div>

            {/* Caption Text */}
            <div className="text-xs text-slate-800 leading-relaxed">
              <span className="font-bold mr-1">
                {activePlatform === 'instagram' ? 'apexsmilestudio' : clinicName}
              </span>
              <span>
                {showFullCaption ? caption : `${caption.slice(0, 130)}${caption.length > 130 ? '...' : ''}`}
              </span>
              {caption.length > 130 && (
                <button
                  onClick={() => setShowFullCaption(!showFullCaption)}
                  className="text-slate-400 font-semibold ml-1 hover:text-slate-600 inline"
                >
                  {showFullCaption ? 'less' : 'more'}
                </button>
              )}
            </div>

            {/* CTA Box with #e97538 highlight */}
            <div className="mt-2.5 p-2 bg-[#fdf2ec] border border-[#fbd3be] rounded-lg text-xs text-[#d6652a] font-medium flex items-center gap-2">
              <span className="font-bold text-[#e97538]">CTA:</span>
              <span className="text-[11px] leading-tight">{cta}</span>
            </div>

            {/* Hashtags */}
            <div className="mt-2 text-[11px] text-[#4f98db] space-x-1 font-normal line-clamp-2">
              {hashtags.map((h, i) => (
                <span key={i} className="hover:underline cursor-pointer">{h}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
