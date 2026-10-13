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
  Youtube,
  Layers,
  LayoutGrid,
  List
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
  const [calendarView, setCalendarView] = useState<'month_grid' | 'cards'>('month_grid');
  const [updateMode, setUpdateMode] = useState<'monthly' | 'weekly'>('monthly');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // New item form state
  const [newItem, setNewItem] = useState<Partial<CalendarItem>>({
    date: '2026-10-15',
    dayOfWeek: 'Thursday',
    timeSlot: '11:00 AM',
    topic: '',
    pillar: 'Educational',
    format: 'single',
    platforms: ['instagram', 'facebook', 'youtube'],
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
      date: newItem.date || '2026-10-15',
      dayOfWeek: new Date(newItem.date || '2026-10-15').toLocaleDateString('en-US', { weekday: 'long' }),
      timeSlot: newItem.timeSlot || '11:00 AM',
      topic: newItem.topic,
      pillar: (newItem.pillar as ContentPillar) || 'Educational',
      format: (newItem.format as ContentFormat) || 'single',
      platforms: newItem.platforms || ['instagram', 'facebook', 'youtube'],
      targetTreatmentId: newItem.targetTreatmentId || brand.treatments[0]?.id || '',
      targetIcpId: newItem.targetIcpId || brand.icpProfiles[0]?.id || '',
      status: 'planned'
    };

    addCalendarItem(fullItem);
    setIsModalOpen(false);
    setNewItem({
      date: '2026-10-15',
      dayOfWeek: 'Thursday',
      timeSlot: '11:00 AM',
      topic: '',
      pillar: 'Educational',
      format: 'single',
      platforms: ['instagram', 'facebook', 'youtube'],
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

  // October 2026: 31 days (Starts on Thursday Oct 1)
  // Calendar days array for Full Month Grid
  const daysInMonth = Array.from({ length: 31 }, (_, i) => i + 1);
  // Oct 1 2026 is a Thursday, so padding days (Sun, Mon, Tue, Wed = 4 blank cells)
  const paddingDays = [null, null, null, null];

  return (
    <div className="space-y-6">
      {/* Calendar Header with Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#f0f7fd] text-[#4f98db] flex items-center justify-center font-bold">
            <CalendarIcon className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-[#333333]">October 2026 Editorial Calendar</h2>
              <Badge variant="primary" size="sm">
                {updateMode === 'monthly' ? 'Monthly Batch' : 'Weekly Cadence'}
              </Badge>
            </div>
            <p className="text-xs text-slate-500">
              Coordinated cross-platform content strategy across Instagram, Facebook & YouTube.
            </p>
          </div>
        </div>

        {/* Action Controls & View Switcher */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Monthly vs Weekly Update toggle requested by client */}
          <div className="flex items-center p-1 bg-slate-100 rounded-xl text-xs font-semibold">
            <button
              onClick={() => setUpdateMode('monthly')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                updateMode === 'monthly' ? 'bg-[#4f98db] text-white shadow-xs' : 'text-slate-600 hover:text-[#333333]'
              }`}
            >
              Monthly Update
            </button>
            <button
              onClick={() => setUpdateMode('weekly')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                updateMode === 'weekly' ? 'bg-[#4f98db] text-white shadow-xs' : 'text-slate-600 hover:text-[#333333]'
              }`}
            >
              Weekly Update
            </button>
          </div>

          {/* Month Grid vs Cards toggle */}
          <div className="flex items-center p-1 bg-slate-100 rounded-xl text-xs font-semibold">
            <button
              onClick={() => setCalendarView('month_grid')}
              className={`p-1.5 rounded-lg transition-all ${
                calendarView === 'month_grid' ? 'bg-white text-[#4f98db] shadow-xs' : 'text-slate-500 hover:text-[#333333]'
              }`}
              title="Full Month 31-Day Matrix View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setCalendarView('cards')}
              className={`p-1.5 rounded-lg transition-all ${
                calendarView === 'cards' ? 'bg-white text-[#4f98db] shadow-xs' : 'text-slate-500 hover:text-[#333333]'
              }`}
              title="Post Cards View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>

          <Button variant="cta" size="sm" onClick={() => setIsModalOpen(true)}>
            <Plus className="w-4 h-4 mr-1" />
            Plan Topic Slot
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
              ? 'bg-[#333333] text-white'
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
                  ? 'bg-[#4f98db] text-white'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {pillar} ({count})
            </button>
          );
        })}
      </div>

      {/* REQUIREMENT 3: FULL MONTH 31-DAY MATRIX VIEW */}
      {calendarView === 'month_grid' ? (
        <Card className="p-5 overflow-hidden">
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
            <h3 className="font-bold text-[#333333] text-sm flex items-center gap-2">
              <CalendarIcon className="w-4 h-4 text-[#4f98db]" />
              October 2026 • Full Month Interactive Grid
            </h3>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block"></span> Approved
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block ml-2"></span> Pending Review
              <span className="w-2.5 h-2.5 rounded-full bg-[#4f98db] inline-block ml-2"></span> Planned
            </div>
          </div>

          {/* Responsive wrapper: preserves readable day cell widths on tablet / iPad / mobile */}
          <div className="overflow-x-auto pb-2 -mx-2 px-2 sm:mx-0 sm:px-0">
            <div className="min-w-[700px]">
              {/* Days of Week Header */}
              <div className="grid grid-cols-7 gap-2 text-center text-xs font-bold uppercase tracking-wider text-slate-400 pb-2">
                <div>Sun</div>
                <div>Mon</div>
                <div>Tue</div>
                <div>Wed</div>
                <div>Thu</div>
                <div>Fri</div>
                <div>Sat</div>
              </div>

              {/* Month Matrix Grid */}
              <div className="grid grid-cols-7 gap-2">
                {/* Blank leading days for October 2026 */}
                {paddingDays.map((_, i) => (
                  <div key={`pad-${i}`} className="min-h-[110px] bg-slate-50/50 rounded-xl border border-dashed border-slate-200/60 p-2 opacity-40"></div>
                ))}

                {/* 31 Calendar Days */}
                {daysInMonth.map((day) => {
                  const dateStr = `2026-10-${day < 10 ? '0' + day : day}`;
                  const dayPosts = filteredItems.filter(item => item.date === dateStr);
                  const isToday = day === 12;

                  return (
                    <div
                      key={day}
                      className={`min-h-[110px] rounded-xl border p-2 flex flex-col justify-between transition-all ${
                        isToday
                          ? 'border-[#4f98db] bg-[#f0f7fd]/40 ring-2 ring-[#4f98db]/20'
                          : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-2xs'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className={`text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center ${
                          isToday ? 'bg-[#4f98db] text-white' : 'text-slate-700'
                        }`}>
                          {day}
                        </span>
                        {dayPosts.length > 0 && (
                          <span className="text-[10px] text-slate-400 font-semibold">{dayPosts.length} post</span>
                        )}
                      </div>

                      {/* Scheduled Post Chips */}
                      <div className="space-y-1 my-1 overflow-y-auto max-h-[70px]">
                        {dayPosts.map((post) => {
                          const isApproved = post.status === 'approved' || post.status === 'scheduled';
                          const isPending = post.status === 'pending_approval';

                          return (
                            <div
                              key={post.id}
                              onClick={() => handleGenerate(post)}
                              className={`p-1.5 rounded-lg text-[10px] leading-tight font-medium cursor-pointer border transition-all truncate ${
                                isApproved
                                  ? 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100'
                                  : isPending
                                  ? 'bg-amber-50 text-amber-800 border-amber-200 hover:bg-amber-100'
                                  : 'bg-[#f0f7fd] text-[#1d528c] border-[#b9ddf7] hover:bg-[#e0effb]'
                              }`}
                              title={`${post.topic} (${post.format.toUpperCase()})`}
                            >
                              <div className="flex items-center gap-1 font-bold">
                                {post.platforms.includes('youtube') && <Youtube className="w-2.5 h-2.5 text-red-600 inline shrink-0" />}
                                {post.platforms.includes('instagram') && <Instagram className="w-2.5 h-2.5 text-pink-600 inline shrink-0" />}
                                <span className="truncate">{post.topic}</span>
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      <div className="flex justify-end">
                        <button
                          onClick={() => {
                            setNewItem(prev => ({ ...prev, date: dateStr }));
                            setIsModalOpen(true);
                          }}
                          className="text-[10px] text-slate-400 hover:text-[#4f98db] font-bold"
                        >
                          + Add
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </Card>
      ) : (
        /* Post Cards View */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
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
                      <span className="text-xs font-bold text-[#333333]">{item.date}</span>
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
                      {item.platforms.includes('youtube') && (
                        <span className="w-5 h-5 rounded-full bg-red-50 text-red-600 flex items-center justify-center text-[10px]" title="YouTube">
                          <Youtube className="w-3 h-3" />
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
                  <h4 className="text-sm font-bold text-[#333333] leading-snug mb-2">
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
                      <Sparkles className="w-3.5 h-3.5 mr-1" />
                      Generate Copy
                    </Button>
                  )}
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {/* Add Calendar Item Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Plan Editorial Content Slot"
      >
        <form onSubmit={handleCreateItem} className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Post Topic / Hook Theme</label>
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
              <label className="block font-semibold text-slate-700 mb-1">Time Slot</label>
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
                <option value="reel">Reel / YouTube Shorts (9:16)</option>
                <option value="story">Story (9:16)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Target Platforms</label>
            <div className="flex gap-4">
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={newItem.platforms?.includes('instagram')}
                  onChange={(e) => {
                    const current = newItem.platforms || [];
                    setNewItem({
                      ...newItem,
                      platforms: e.target.checked ? [...current, 'instagram'] : current.filter(p => p !== 'instagram')
                    });
                  }}
                  className="rounded text-[#4f98db]"
                />
                <Instagram className="w-3.5 h-3.5 text-pink-600" /> Instagram
              </label>
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={newItem.platforms?.includes('facebook')}
                  onChange={(e) => {
                    const current = newItem.platforms || [];
                    setNewItem({
                      ...newItem,
                      platforms: e.target.checked ? [...current, 'facebook'] : current.filter(p => p !== 'facebook')
                    });
                  }}
                  className="rounded text-[#4f98db]"
                />
                <Facebook className="w-3.5 h-3.5 text-blue-600" /> Facebook
              </label>
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={newItem.platforms?.includes('youtube')}
                  onChange={(e) => {
                    const current = newItem.platforms || [];
                    setNewItem({
                      ...newItem,
                      platforms: e.target.checked ? [...current, 'youtube'] : current.filter(p => p !== 'youtube')
                    });
                  }}
                  className="rounded text-[#4f98db]"
                />
                <Youtube className="w-3.5 h-3.5 text-red-600" /> YouTube
              </label>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
            <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="cta">
              Add to Calendar
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
