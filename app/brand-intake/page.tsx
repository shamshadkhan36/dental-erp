'use client';

import React, { useState } from 'react';
import { 
  Save, 
  Copy, 
  Check, 
  Plus, 
  Trash2, 
  Sparkles, 
  UserCheck, 
  Palette, 
  FolderGit2, 
  Sliders,
  MessageSquare,
  Tag,
  ShieldCheck,
  HeartHandshake
} from 'lucide-react';
import { useERPStore } from '../../lib/store';
import { Card, CardHeader, CardTitle } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { compileSystemPrompt } from '../../lib/ai-prompts';
import { DentalOffer, DentalTreatment, ICPProfile } from '../../types';

export default function BrandIntakePage() {
  const { brand, updateBrand, saveOffer, deleteOffer } = useERPStore();
  const [formData, setFormData] = useState(brand);
  const [activeTab, setActiveTab] = useState<'profile' | 'icp' | 'treatments' | 'visual' | 'prompt'>('profile');
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);

  // New offer modal/inline form
  const [showAddOffer, setShowAddOffer] = useState(false);
  const [newOffer, setNewOffer] = useState<Partial<DentalOffer>>({
    title: '',
    treatmentId: brand.treatments[0]?.id || '',
    discountValue: '$500 OFF',
    promoCode: 'SMILE500',
    validUntil: 'October 31, 2026',
    terms: 'Valid for new patients initiating full treatment.',
    ctaText: 'Claim Your Voucher Now',
    status: 'active'
  });

  const compiledPrompt = compileSystemPrompt(formData);

  const handleSave = () => {
    updateBrand(formData);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const copyPromptToClipboard = () => {
    navigator.clipboard.writeText(compiledPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCreateOffer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newOffer.title) return;
    const selectedTreat = formData.treatments.find(t => t.id === newOffer.treatmentId) || formData.treatments[0];
    const created: DentalOffer = {
      id: `off-${Date.now()}`,
      title: newOffer.title || 'Special Clinic Offer',
      treatmentId: selectedTreat.id,
      treatmentName: selectedTreat.name,
      discountValue: newOffer.discountValue || 'Special Discount',
      promoCode: newOffer.promoCode || 'SMILE',
      validUntil: newOffer.validUntil || 'Limited Time',
      terms: newOffer.terms || 'Standard terms apply.',
      ctaText: newOffer.ctaText || 'Claim Offer',
      status: 'active'
    };

    saveOffer(created);
    setFormData(prev => ({ ...prev, offers: [...prev.offers, created] }));
    setShowAddOffer(false);
    setNewOffer({
      title: '',
      treatmentId: brand.treatments[0]?.id || '',
      discountValue: '$500 OFF',
      promoCode: 'SMILE500',
      validUntil: 'October 31, 2026',
      terms: 'Valid for new patients initiating full treatment.',
      ctaText: 'Claim Your Voucher Now',
      status: 'active'
    });
  };

  return (
    <div className="space-y-6">
      {/* Header bar with Save button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h2 className="text-lg font-bold text-[#333333]">Client & Brand Intake Knowledge Base</h2>
          <p className="text-xs text-slate-500">
            Configure practice voice, brand persona, patient profiles (with age, objections & motivations), and treatment offers.
          </p>
        </div>
        <div className="flex items-center gap-2">
          {/* Client CTA Highlight Button #e97538 */}
          <Button variant="cta" size="md" onClick={handleSave}>
            {saved ? (
              <>
                <Check className="w-4 h-4 mr-1 text-white" />
                Changes Saved!
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-1" />
                Save Brand Profile
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex overflow-x-auto gap-2 border-b border-slate-200 pb-2">
        {[
          { id: 'profile', label: '1. Brand Voice & Persona', icon: Sliders },
          { id: 'icp', label: '2. Patient Personas (ICP)', icon: UserCheck },
          { id: 'treatments', label: '3. Treatments & Offers Panel', icon: Tag },
          { id: 'visual', label: '4. Visual Identity & Drive', icon: Palette },
          { id: 'prompt', label: '5. Compiled System Prompts', icon: MessageSquare },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-xl whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? 'bg-[#4f98db] text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab 1: Profile, Voice & Persona */}
      {activeTab === 'profile' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Clinic Information</CardTitle>
            </CardHeader>
            <div className="space-y-4 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Practice Name</label>
                <input
                  type="text"
                  value={formData.clinicName}
                  onChange={(e) => setFormData({ ...formData, clinicName: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Tagline / Mission</label>
                <input
                  type="text"
                  value={formData.tagline}
                  onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Phone Number</label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">WhatsApp Business</label>
                  <input
                    type="text"
                    value={formData.whatsapp}
                    onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Clinic Address</label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Website URL</label>
                <input
                  type="text"
                  value={formData.website}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs"
                />
              </div>
            </div>
          </Card>

          {/* BRAND PERSONA & VOICE (Client Requirement #2) */}
          <Card>
            <CardHeader>
              <CardTitle>Brand Persona & Communication Tone</CardTitle>
              <Badge variant="primary">AI Archetype</Badge>
            </CardHeader>
            <div className="space-y-4 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Brand Persona Archetype</label>
                <select
                  value={formData.brandPersona.archetype}
                  onChange={(e) => setFormData({
                    ...formData,
                    brandPersona: { ...formData.brandPersona, archetype: e.target.value as any }
                  })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs bg-white font-medium text-[#333333]"
                >
                  <option value="Clinical Authority">Clinical Authority (Evidence-based, high-tech, board-certified trust)</option>
                  <option value="Empathetic Healer">Empathetic Healer (Gentle touch, dental anxiety demystifier)</option>
                  <option value="Cosmetic Visionary">Cosmetic Visionary (Aesthetic perfection, luxury smile makeovers)</option>
                  <option value="Family Guardian">Family Guardian (Multi-generational, friendly, pediatric comfort)</option>
                </select>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Formality & Style</label>
                <select
                  value={formData.brandPersona.formalityLevel}
                  onChange={(e) => setFormData({
                    ...formData,
                    brandPersona: { ...formData.brandPersona, formalityLevel: e.target.value as any }
                  })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs bg-white"
                >
                  <option value="Warm & Conversational">Warm & Conversational (Approachable & reassuring)</option>
                  <option value="Professional Clinical">Professional Clinical (Scientific & precise)</option>
                  <option value="Luxurious & High-End">Luxurious & High-End (Boutique concierge feel)</option>
                </select>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Communication Style</label>
                <textarea
                  rows={2}
                  value={formData.brandPersona.communicationStyle}
                  onChange={(e) => setFormData({
                    ...formData,
                    brandPersona: { ...formData.brandPersona, communicationStyle: e.target.value }
                  })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs leading-relaxed"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Required Brand Key Phrases</label>
                <div className="space-y-2">
                  {formData.keyPhrases.map((phrase, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <input
                        type="text"
                        value={phrase}
                        onChange={(e) => {
                          const updated = [...formData.keyPhrases];
                          updated[idx] = e.target.value;
                          setFormData({ ...formData, keyPhrases: updated });
                        }}
                        className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-xs"
                      />
                      <button
                        onClick={() => {
                          const updated = formData.keyPhrases.filter((_, i) => i !== idx);
                          setFormData({ ...formData, keyPhrases: updated });
                        }}
                        className="text-slate-400 hover:text-rose-500 p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setFormData({ ...formData, keyPhrases: [...formData.keyPhrases, "Digital 3D precision care"] })}
                  >
                    <Plus className="w-3.5 h-3.5 mr-1" /> Add Key Phrase
                  </Button>
                </div>
              </div>

              <div>
                <label className="font-semibold text-rose-700 block mb-1">Prohibited Terms (AI Blacklist)</label>
                <div className="space-y-2">
                  {formData.prohibitedTerms.map((term, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <input
                        type="text"
                        value={term}
                        onChange={(e) => {
                          const updated = [...formData.prohibitedTerms];
                          updated[idx] = e.target.value;
                          setFormData({ ...formData, prohibitedTerms: updated });
                        }}
                        className="w-full px-3 py-1.5 border border-rose-200 bg-rose-50/30 rounded-lg text-xs"
                      />
                      <button
                        onClick={() => {
                          const updated = formData.prohibitedTerms.filter((_, i) => i !== idx);
                          setFormData({ ...formData, prohibitedTerms: updated });
                        }}
                        className="text-slate-400 hover:text-rose-500 p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Tab 2: Patient Personas (ICP) with Age, Pain Points, Objections, Motivations */}
      {activeTab === 'icp' && (
        <div className="space-y-5">
          <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-slate-200">
            <div>
              <h3 className="text-sm font-bold text-[#333333]">Target Patient Personas (ICP Profiles)</h3>
              <p className="text-xs text-slate-500">
                Segmented profiles with Age, Pain Points, Objections, and Motivations to guide AI psychological hooks.
              </p>
            </div>
            <Button
              size="sm"
              variant="cta"
              onClick={() => {
                const newIcp: ICPProfile = {
                  id: `icp-${Date.now()}`,
                  name: "New Target Demographic",
                  age: "25 - 45 years",
                  targetDemographic: "e.g. Busy executives or brides-to-be",
                  painPoints: ["Fear of long treatments", "Discolored smile"],
                  objections: ["High upfront cost", "Pain anxiety"],
                  motivations: ["Looking best in upcoming event", "Confidence boost"],
                  recommendedTreatments: ["Invisalign Clear Aligners"],
                  preferredTone: "Reassuring, luxury aesthetic"
                };
                setFormData({ ...formData, icpProfiles: [...formData.icpProfiles, newIcp] });
              }}
            >
              <Plus className="w-3.5 h-3.5 mr-1" /> Add Patient Persona
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {formData.icpProfiles.map((icp, idx) => (
              <Card key={icp.id} className="space-y-3.5 border-t-4 border-t-[#4f98db]">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <input
                    type="text"
                    value={icp.name}
                    onChange={(e) => {
                      const updated = [...formData.icpProfiles];
                      updated[idx].name = e.target.value;
                      setFormData({ ...formData, icpProfiles: updated });
                    }}
                    className="font-bold text-[#333333] text-sm border-b border-transparent hover:border-slate-300 focus:outline-none w-full mr-2"
                  />
                  <button
                    onClick={() => {
                      const updated = formData.icpProfiles.filter((_, i) => i !== idx);
                      setFormData({ ...formData, icpProfiles: updated });
                    }}
                    className="text-slate-400 hover:text-rose-500"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="text-xs space-y-2.5">
                  {/* Age Range Field (Client Requirement #2) */}
                  <div>
                    <label className="text-[11px] font-bold text-slate-700 block mb-0.5">
                      Target Age Range
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 24 - 38 years"
                      value={icp.age}
                      onChange={(e) => {
                        const updated = [...formData.icpProfiles];
                        updated[idx].age = e.target.value;
                        setFormData({ ...formData, icpProfiles: updated });
                      }}
                      className="w-full px-2.5 py-1.5 border border-slate-200 rounded-lg text-xs font-semibold text-[#4f98db]"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-slate-700 block mb-0.5">
                      Target Demographic
                    </label>
                    <input
                      type="text"
                      value={icp.targetDemographic}
                      onChange={(e) => {
                        const updated = [...formData.icpProfiles];
                        updated[idx].targetDemographic = e.target.value;
                        setFormData({ ...formData, icpProfiles: updated });
                      }}
                      className="w-full px-2.5 py-1.5 border border-slate-200 rounded-lg text-xs"
                    />
                  </div>

                  {/* Pain Points (Client Requirement #2) */}
                  <div>
                    <label className="text-[11px] font-bold text-rose-700 block mb-0.5">
                      Pain Points & Anxieties
                    </label>
                    <textarea
                      rows={2}
                      value={icp.painPoints.join(', ')}
                      onChange={(e) => {
                        const updated = [...formData.icpProfiles];
                        updated[idx].painPoints = e.target.value.split(',').map(s => s.trim());
                        setFormData({ ...formData, icpProfiles: updated });
                      }}
                      className="w-full px-2.5 py-1.5 border border-rose-200 bg-rose-50/20 rounded-lg text-xs"
                    />
                  </div>

                  {/* Objections (Client Requirement #2) */}
                  <div>
                    <label className="text-[11px] font-bold text-amber-800 block mb-0.5">
                      Patient Objections & Hesitations
                    </label>
                    <textarea
                      rows={2}
                      value={icp.objections.join(', ')}
                      onChange={(e) => {
                        const updated = [...formData.icpProfiles];
                        updated[idx].objections = e.target.value.split(',').map(s => s.trim());
                        setFormData({ ...formData, icpProfiles: updated });
                      }}
                      className="w-full px-2.5 py-1.5 border border-amber-200 bg-amber-50/20 rounded-lg text-xs"
                    />
                  </div>

                  {/* Motivations (Client Requirement #2) */}
                  <div>
                    <label className="text-[11px] font-bold text-emerald-800 block mb-0.5">
                      Patient Motivations & Desired Outcome
                    </label>
                    <textarea
                      rows={2}
                      value={icp.motivations.join(', ')}
                      onChange={(e) => {
                        const updated = [...formData.icpProfiles];
                        updated[idx].motivations = e.target.value.split(',').map(s => s.trim());
                        setFormData({ ...formData, icpProfiles: updated });
                      }}
                      className="w-full px-2.5 py-1.5 border border-emerald-200 bg-emerald-50/20 rounded-lg text-xs"
                    />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Treatments & Dedicated Offers Panel */}
      {activeTab === 'treatments' && (
        <div className="space-y-6">
          {/* SECTION A: Dedicated Treatment Offers Panel (Client Requirement #2) */}
          <Card className="border-l-4 border-l-[#e97538] bg-white p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <Tag className="w-5 h-5 text-[#e97538]" />
                  <h3 className="text-base font-bold text-[#333333]">Active Clinic Offers & Promotions Panel</h3>
                  <Badge variant="cta">{formData.offers.length} Live Offers</Badge>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  Special treatment discounts, vouchers, and consultation packages automatically woven into AI post hooks and CTAs.
                </p>
              </div>

              <Button
                size="sm"
                variant="cta"
                onClick={() => setShowAddOffer(true)}
              >
                <Plus className="w-3.5 h-3.5 mr-1" /> Create New Offer
              </Button>
            </div>

            {/* Inline Add Offer Form */}
            {showAddOffer && (
              <form onSubmit={handleCreateOffer} className="p-4 bg-[#fdf2ec] border border-[#fbd3be] rounded-xl space-y-3 text-xs">
                <div className="font-bold text-[#d6652a] text-sm">Add New Promotional Offer</div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="sm:col-span-2">
                    <label className="font-semibold text-slate-700 block mb-1">Campaign Headline</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. $500 OFF Comprehensive Invisalign Treatment"
                      value={newOffer.title}
                      onChange={(e) => setNewOffer({ ...newOffer, title: e.target.value })}
                      className="w-full px-3 py-1.5 border border-slate-300 rounded-lg bg-white"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Target Treatment</label>
                    <select
                      value={newOffer.treatmentId}
                      onChange={(e) => setNewOffer({ ...newOffer, treatmentId: e.target.value })}
                      className="w-full px-3 py-1.5 border border-slate-300 rounded-lg bg-white"
                    >
                      {formData.treatments.map(t => (
                        <option key={t.id} value={t.id}>{t.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Discount Value</label>
                    <input
                      type="text"
                      placeholder="$500 OFF"
                      value={newOffer.discountValue}
                      onChange={(e) => setNewOffer({ ...newOffer, discountValue: e.target.value })}
                      className="w-full px-3 py-1.5 border border-slate-300 rounded-lg bg-white font-bold text-[#e97538]"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Promo Code</label>
                    <input
                      type="text"
                      placeholder="INVISALIGN500"
                      value={newOffer.promoCode}
                      onChange={(e) => setNewOffer({ ...newOffer, promoCode: e.target.value })}
                      className="w-full px-3 py-1.5 border border-slate-300 rounded-lg bg-white font-mono"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Valid Until</label>
                    <input
                      type="text"
                      placeholder="Nov 15, 2026"
                      value={newOffer.validUntil}
                      onChange={(e) => setNewOffer({ ...newOffer, validUntil: e.target.value })}
                      className="w-full px-3 py-1.5 border border-slate-300 rounded-lg bg-white"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <Button type="button" size="sm" variant="outline" onClick={() => setShowAddOffer(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" size="sm" variant="cta">
                    Save Offer to Database
                  </Button>
                </div>
              </form>
            )}

            {/* List of Offers */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {formData.offers.map((offer) => (
                <div key={offer.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex flex-col justify-between space-y-3">
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="px-2 py-0.5 rounded font-black text-xs bg-[#e97538] text-white">
                        {offer.discountValue}
                      </span>
                      <button
                        onClick={() => deleteOffer(offer.id)}
                        className="text-slate-400 hover:text-rose-500"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <h4 className="font-bold text-slate-900 text-xs leading-snug">{offer.title}</h4>
                    <p className="text-[11px] text-slate-500 mt-1">For: {offer.treatmentName}</p>
                    <p className="text-[10px] text-slate-400 mt-1 italic">{offer.terms}</p>
                  </div>

                  <div className="pt-2 border-t border-slate-200/80 flex items-center justify-between text-[11px]">
                    <span className="font-mono font-bold text-slate-700 bg-white px-2 py-0.5 rounded border border-slate-200">
                      {offer.promoCode}
                    </span>
                    <span className="text-slate-500 font-semibold">{offer.validUntil}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* SECTION B: Core Treatment Menu */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-bold text-[#333333]">Clinical Procedures & USPs</h3>
              <Button
                size="sm"
                variant="primary"
                onClick={() => {
                  const newTreatment: DentalTreatment = {
                    id: `treat-${Date.now()}`,
                    name: "New Clinical Procedure",
                    category: "Cosmetic",
                    usp: "Digital guided workflow & zero-discomfort protocol",
                    typicalDuration: "45 minutes"
                  };
                  setFormData({ ...formData, treatments: [...formData.treatments, newTreatment] });
                }}
              >
                <Plus className="w-3.5 h-3.5 mr-1" /> Add Treatment
              </Button>
            </div>

            {formData.treatments.map((t, idx) => (
              <Card key={t.id} className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center text-xs">
                  <div className="md:col-span-3">
                    <label className="text-[10px] font-bold uppercase text-slate-400">Treatment Name</label>
                    <input
                      type="text"
                      value={t.name}
                      onChange={(e) => {
                        const updated = [...formData.treatments];
                        updated[idx].name = e.target.value;
                        setFormData({ ...formData, treatments: updated });
                      }}
                      className="w-full px-3 py-1.5 font-bold text-slate-800 border border-slate-200 rounded-lg"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="text-[10px] font-bold uppercase text-slate-400">Category</label>
                    <select
                      value={t.category}
                      onChange={(e) => {
                        const updated = [...formData.treatments];
                        updated[idx].category = e.target.value as any;
                        setFormData({ ...formData, treatments: updated });
                      }}
                      className="w-full px-3 py-1.5 border border-slate-200 rounded-lg bg-white"
                    >
                      <option value="Cosmetic">Cosmetic</option>
                      <option value="Restorative">Restorative</option>
                      <option value="Orthodontics">Orthodontics</option>
                      <option value="Surgical">Surgical</option>
                      <option value="Preventive">Preventive</option>
                    </select>
                  </div>

                  <div className="md:col-span-4">
                    <label className="text-[10px] font-bold uppercase text-slate-400">Clinical USP</label>
                    <input
                      type="text"
                      value={t.usp}
                      onChange={(e) => {
                        const updated = [...formData.treatments];
                        updated[idx].usp = e.target.value;
                        setFormData({ ...formData, treatments: updated });
                      }}
                      className="w-full px-3 py-1.5 border border-slate-200 rounded-lg"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="text-[10px] font-bold uppercase text-slate-400">Typical Duration</label>
                    <input
                      type="text"
                      value={t.typicalDuration}
                      onChange={(e) => {
                        const updated = [...formData.treatments];
                        updated[idx].typicalDuration = e.target.value;
                        setFormData({ ...formData, treatments: updated });
                      }}
                      className="w-full px-3 py-1.5 border border-slate-200 rounded-lg"
                    />
                  </div>

                  <div className="md:col-span-1 flex justify-end">
                    <button
                      onClick={() => {
                        const updated = formData.treatments.filter((_, i) => i !== idx);
                        setFormData({ ...formData, treatments: updated });
                      }}
                      className="text-slate-400 hover:text-rose-500 p-2"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Visual Identity with Client Palette (#4f98db, #333333, #e97538, #ffffff) */}
      {activeTab === 'visual' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Brand Colors & Visual Identity</CardTitle>
            </CardHeader>
            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Primary Color</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={formData.primaryColor}
                      onChange={(e) => setFormData({ ...formData, primaryColor: e.target.value })}
                      className="w-8 h-8 rounded border border-slate-300 cursor-pointer"
                    />
                    <input
                      type="text"
                      value={formData.primaryColor}
                      onChange={(e) => setFormData({ ...formData, primaryColor: e.target.value })}
                      className="w-full px-2 py-1 border border-slate-200 rounded text-xs uppercase font-mono font-bold text-[#4f98db]"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Secondary Color</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={formData.secondaryColor}
                      onChange={(e) => setFormData({ ...formData, secondaryColor: e.target.value })}
                      className="w-8 h-8 rounded border border-slate-300 cursor-pointer"
                    />
                    <input
                      type="text"
                      value={formData.secondaryColor}
                      onChange={(e) => setFormData({ ...formData, secondaryColor: e.target.value })}
                      className="w-full px-2 py-1 border border-slate-200 rounded text-xs uppercase font-mono font-bold text-[#333333]"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">CTA Highlight</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={formData.accentColor}
                      onChange={(e) => setFormData({ ...formData, accentColor: e.target.value })}
                      className="w-8 h-8 rounded border border-slate-300 cursor-pointer"
                    />
                    <input
                      type="text"
                      value={formData.accentColor}
                      onChange={(e) => setFormData({ ...formData, accentColor: e.target.value })}
                      className="w-full px-2 py-1 border border-slate-200 rounded text-xs uppercase font-mono font-bold text-[#e97538]"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Logo URL</label>
                <input
                  type="text"
                  value={formData.logoUrl}
                  onChange={(e) => setFormData({ ...formData, logoUrl: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Google Drive Root Folder</label>
                <div className="flex items-center gap-2">
                  <FolderGit2 className="w-5 h-5 text-[#4f98db] shrink-0" />
                  <input
                    type="text"
                    value={formData.gdriveRootFolder}
                    onChange={(e) => setFormData({ ...formData, gdriveRootFolder: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs"
                  />
                </div>
              </div>
            </div>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Call To Action (CTA) Library</CardTitle>
            </CardHeader>
            <div className="space-y-3 text-xs">
              {formData.ctaTemplates.map((cta, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#f0f7fd] text-[#4f98db] text-[10px] font-bold flex items-center justify-center shrink-0">
                    {idx + 1}
                  </span>
                  <input
                    type="text"
                    value={cta}
                    onChange={(e) => {
                      const updated = [...formData.ctaTemplates];
                      updated[idx] = e.target.value;
                      setFormData({ ...formData, ctaTemplates: updated });
                    }}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs"
                  />
                  <button
                    onClick={() => {
                      const updated = formData.ctaTemplates.filter((_, i) => i !== idx);
                      setFormData({ ...formData, ctaTemplates: updated });
                    }}
                    className="text-slate-400 hover:text-rose-500 p-1"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {/* Tab 5: Compiled System Prompt */}
      {activeTab === 'prompt' && (
        <Card>
          <CardHeader>
            <div>
              <CardTitle>Compiled System Prompt for AI Generator</CardTitle>
              <p className="text-xs text-slate-500">
                Includes Brand Persona, Patient ICP Age/Pain Points/Objections/Motivations, and Active Treatment Offers.
              </p>
            </div>
            <Button size="sm" variant="outline" onClick={copyPromptToClipboard}>
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 mr-1 text-emerald-600" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 mr-1" />
                  Copy Prompt
                </>
              )}
            </Button>
          </CardHeader>

          <pre className="p-4 bg-[#333333] text-[#7ebef1] font-mono text-xs rounded-xl overflow-x-auto whitespace-pre-wrap leading-relaxed max-h-[500px]">
            {compiledPrompt}
          </pre>
        </Card>
      )}
    </div>
  );
}
