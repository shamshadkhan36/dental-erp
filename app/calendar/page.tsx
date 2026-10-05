'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Calendar as CalendarIcon, 
  Sparkles, 
  Plus, 
  ChevronLeft, 
  ChevronRight, 
  Filter, 
  Clock, 
  Instagram, 
  Facebook,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { useERPStore } from '../../lib/store';
import { Card, CardHeader, CardTitle } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
import { CalendarItem, ContentFormat, ContentPillar, PlatformType } from '../../types';

export default function ContentCalendarPage() {
  const router = useRouter();
  const { calendar, brand, addCalendarItem } = useERPStore();
  const [selectedPillar, setSelectedPillar] = useState<string>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // New item form state
  const [newItem, setNewItem] = useState<Partial<CalendarItem>>({
    date: new Date().toISOString().split('T')[0],
    dayOfWeek: 'Wednesday',
    timeSlot: '11:00 AM',
    topic: '',
    pillar: 'Educational',
    format: 'single',
    platforms: ['instagram', 'facebook'],
    targetTreatmentId: brand.treatments[0]?.id || '',
    targetIcpId: brand.icpProfiles[0]?.id || '',
    status: 'planned'
  });

  const filteredItems = calendar.filter(item => {
    if (selectedPillar === 'all') return true;
    return item.pillar === selectedPillar;
  });

  const pillars: ContentPillar[] = [
    'Educational',
    'Smile Makeover',
    'Myth vs Fact',
    'Doctor Spotlight',
    'Patient Review',
    'Special Offer'
  ];

  const handleCreateItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItem.topic) return;

    const fullItem: CalendarItem = {
      id: `cal-${Date.now()}`,
      date: newItem.date || new Date().toISOString().split('T')[0],
      dayOfWeek: new Date(newItem.date || '').toLocaleDateString('en-US', { weekday: 'long' }),
      timeSlot: newItem.timeSlot || '11:00 AM',
      topic: newItem.topic,
      pillar: (newItem.pillar as ContentPillar) || 'Educational',
      format: (newItem.format as ContentFormat) || 'single',
      platforms: newItem.platforms || ['instagram', 'facebook'],
      targetTreatmentId: newItem.targetTreatmentId || brand.treatments[0]?.id || '',
      targetIcpId: newItem.targetIcpId || brand.icpProfiles[0]?.id || '',
      status: 'planned'
    };

    addCalendarItem(fullItem);
    setIsModalOpen(false);
    setNewItem({
      date: new Date().toISOString().split('T')[0],
      dayOfWeek: 'Wednesday',
      timeSlot: '11:00 AM',
      topic: '',
      pillar: 'Educational',
      format: 'single',
      platforms: ['instagram', 'facebook'],
      targetTreatmentId: brand.treatments[0]?.id || '',
      targetIcpId: brand.icpProfiles[0]?.id || '',
      status: 'planned'
    });
  };

  const handleGenerate = (item: CalendarItem) => {
    router.push(
      `/copywriter?calId=${item.id}&topic=${encodeURIComponent(item.topic)}&format=${item.format}&treatment=${item.targetTreatmentId}&icp=${item.targetIcpId}`
    );
  };

  return (
    <div className="space-y-6">
      {/* Calendar Header with Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center font-bold">
            <CalendarIcon className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-slate-900">October 2026 Content Schedule</h2>
              <Badge variant="primary" size="sm">Monthly Cadence</Badge>
            </div>
            <p className="text-xs text-slate-500">
              Coordinated cross-platform content strategy across 6 clinical pillars.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <Button variant="primary" size="md" onClick={() => setIsModalOpen(true)}>
            <Plus className="w-4 h-4 mr-1.5" />
            Plan New Topic
          </Button>
        </div>
      </div>

      {/* Filter by Content Pillar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        <span className="text-slate-400 font-bold uppercase text-[10px] flex items-center gap-1 shrink-0 mr-1">
          <Filter className="w-3 h-3" /> Filter Pillar:
        </span>
        <button
          onClick={() => setSelectedPillar('all')}
          className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
            selectedPillar === 'all'
              ? 'bg-slate-900 text-white'
              : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
          }`}
        >
          All Topics ({calendar.length})
        </button>
        {pillars.map((pillar) => {
          const count = calendar.filter(c => c.pillar === pillar).length;
          return (
            <button
              key={pillar}
              onClick={() => setSelectedPillar(pillar)}
              className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-all ${
                selectedPillar === pillar
                  ? 'bg-sky-600 text-white'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {pillar} ({count})
            </button>
          );
        })}
      </div>

      {/* Calendar List / Grid of Scheduled Items */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredItems.map((item) => {
          const treatment = brand.treatments.find(t => t.id === item.targetTreatmentId);
          const isPending = item.status === 'pending_approval';
          const isApproved = item.status === 'approved' || item.status === 'scheduled';

          return (
            <Card key={item.id} hoverEffect className="flex flex-col justify-between">
              <div>
                {/* Top Card Bar */}
                <div className="flex items-center justify-between mb-3 pb-2.5 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-900">{item.date}</span>
                    <span className="text-[11px] text-slate-400">({item.dayOfWeek})</span>
                  </div>
                  <div className="flex items-center gap-1">
                    {item.platforms.includes('instagram') && (
                      <span className="w-5 h-5 rounded-full bg-pink-50 text-pink-600 flex items-center justify-center text-[10px]" title="Instagram">
                        <Instagram className="w-3 h-3" />
                      </span>
                    )}
                    {item.platforms.includes('facebook') && (
                      <span className="w-5 h-5 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center text-[10px]" title="Facebook">
                        <Facebook className="w-3 h-3" />
                      </span>
                    )}
                  </div>
                </div>

                {/* Pillar & Format Badges */}
                <div className="flex items-center gap-1.5 mb-2.5">
                  <Badge variant="outline" size="sm">
                    {item.pillar}
                  </Badge>
                  <Badge variant={item.format === 'carousel' ? 'purple' : item.format === 'reel' ? 'primary' : 'default'} size="sm">
                    {item.format.toUpperCase()}
                  </Badge>
                  <Badge 
                    variant={isApproved ? 'success' : isPending ? 'warning' : 'default'} 
                    size="sm"
                    className="ml-auto"
                  >
                    {item.status.replace('_', ' ')}
                  </Badge>
                </div>

                {/* Topic Title */}
                <h4 className="text-sm font-bold text-slate-900 leading-snug mb-2">
                  {item.topic}
                </h4>

                {/* Clinical Treatment Target */}
                <div className="text-[11px] text-slate-500 mb-4">
                  <span className="font-semibold text-slate-700">Treatment:</span> {treatment?.name || 'General Dental Care'}
                </div>
              </div>

              {/* Action Button at bottom */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-400 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {item.timeSlot}
                </span>

                {item.contentRecordId ? (
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => router.push(`/copywriter?edit=${item.contentRecordId}`)}
                  >
                    View Post Copy
                  </Button>
                ) : (
                  <Button 
                    size="sm" 
                    variant="primary"
                    onClick={() => handleGenerate(item)}
                  >
                    <Sparkles className="w-3.5 h-3.5 mr-1 text-sky-200" />
                    Generate Copy
                  </Button>
                )}
              </div>
            </Card>
          );
        })}
      </div>

      {/* Add Calendar Item Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Plan New Content Calendar Slot"
      >
        <form onSubmit={handleCreateItem} className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Post Topic / Theme</label>
            <input
              type="text"
              required
              placeholder="e.g. 5 Common Myths About Root Canal Therapy"
              value={newItem.topic}
              onChange={(e) => setNewItem({ ...newItem, topic: e.target.value })}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Scheduled Date</label>
              <input
                type="date"
                required
                value={newItem.date}
                onChange={(e) => setNewItem({ ...newItem, date: e.target.value })}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Optimal Time Slot</label>
              <input
                type="text"
                value={newItem.timeSlot}
                onChange={(e) => setNewItem({ ...newItem, timeSlot: e.target.value })}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Content Pillar</label>
              <select
                value={newItem.pillar}
                onChange={(e) => setNewItem({ ...newItem, pillar: e.target.value as any })}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs bg-white"
              >
                {pillars.map(p => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Format</label>
              <select
                value={newItem.format}
                onChange={(e) => setNewItem({ ...newItem, format: e.target.value as any })}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs bg-white"
              >
                <option value="single">Single Post (1:1 / 4:5)</option>
                <option value="carousel">Carousel (Multi-slide 4:5)</option>
                <option value="reel">Reel / Video (9:16)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Target Procedure</label>
            <select
              value={newItem.targetTreatmentId}
              onChange={(e) => setNewItem({ ...newItem, targetTreatmentId: e.target.value })}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs bg-white"
            >
              {brand.treatments.map(t => (
                <option key={t.id} value={t.id}>{t.name} ({t.category})</option>
              ))}
            </select>
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
            <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Add to Calendar
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
