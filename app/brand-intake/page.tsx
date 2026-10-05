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
  MessageSquare
} from 'lucide-react';
import { useERPStore } from '../../lib/store';
import { Card, CardHeader, CardTitle } from '../../components/ui/Card';
import { PageBanner } from '../../components/ui/PageBanner';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { compileSystemPrompt } from '../../lib/ai-prompts';
import { DentalTreatment, ICPProfile } from '../../types';

export default function BrandIntakePage() {
  const { brand, updateBrand } = useERPStore();
  const [formData, setFormData] = useState(brand);
  const [activeTab, setActiveTab] = useState<'profile' | 'icp' | 'treatments' | 'visual' | 'prompt'>('profile');
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);

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

  return (
    <div className="space-y-6">
      <PageBanner eyebrow="Practice profile" title="Brand Intake & Knowledge Base" description="Define your practice voice, treatments, target patient personas, and visual guidelines." icon={Sliders} action={
          <Button variant="primary" size="md" onClick={handleSave}>
            {saved ? (
              <>
                <Check className="w-4 h-4 mr-1 text-emerald-300" />
                Changes Saved!
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-1" />
                Save Brand Profile
              </>
            )}
          </Button>
        } />

      {/* Navigation Tabs */}
      <div className="flex w-fit max-w-full overflow-x-auto gap-1.5 rounded-2xl border border-slate-200 bg-white p-1.5 shadow-sm">
        {[
          { id: 'profile', label: '1. Clinic Identity & Voice', icon: Sliders },
          { id: 'icp', label: '2. Patient Personas (ICP)', icon: UserCheck },
          { id: 'treatments', label: '3. Treatments & Offers', icon: Sparkles },
          { id: 'visual', label: '4. Visual Identity & Assets', icon: Palette },
          { id: 'prompt', label: '5. Compiled System Prompts', icon: MessageSquare },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-xl whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? 'bg-[#237a60] text-white shadow-sm'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab 1: Profile & Voice */}
      {activeTab === 'profile' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Clinic Contact & General Info</CardTitle>
            </CardHeader>
            <div className="space-y-4 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Clinic Name</label>
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

          <Card>
            <CardHeader>
              <CardTitle>Brand Voice & Clinical Persona</CardTitle>
            </CardHeader>
            <div className="space-y-4 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Tone of Voice Description</label>
                <textarea
                  rows={3}
                  value={formData.brandVoice}
                  onChange={(e) => setFormData({ ...formData, brandVoice: e.target.value })}
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
                    onClick={() => setFormData({ ...formData, keyPhrases: [...formData.keyPhrases, "New brand phrase"] })}
                  >
                    <Plus className="w-3.5 h-3.5 mr-1" /> Add Key Phrase
                  </Button>
                </div>
              </div>

              <div>
                <label className="font-semibold text-rose-700 block mb-1">Prohibited Terms (AI Compliance Blacklist)</label>
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
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setFormData({ ...formData, prohibitedTerms: [...formData.prohibitedTerms, "Discount terms"] })}
                  >
                    <Plus className="w-3.5 h-3.5 mr-1" /> Add Prohibited Term
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Tab 2: Ideal Customer Profiles (ICP) */}
      {activeTab === 'icp' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-bold text-slate-800">Target Patient Personas</h3>
            <Button
              size="sm"
              variant="primary"
              onClick={() => {
                const newIcp: ICPProfile = {
                  id: `icp-${Date.now()}`,
                  name: "New Patient Segment",
                  targetDemographic: "e.g. Young athletes, seniors, brides-to-be",
                  painPoints: ["Dental emergency fear", "Cost uncertainty"],
                  recommendedTreatments: ["Preventive Dentistry"],
                  preferredTone: "Reassuring and informative"
                };
                setFormData({ ...formData, icpProfiles: [...formData.icpProfiles, newIcp] });
              }}
            >
              <Plus className="w-3.5 h-3.5 mr-1" /> Add Persona
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {formData.icpProfiles.map((icp, idx) => (
              <Card key={icp.id} className="space-y-3">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <input
                    type="text"
                    value={icp.name}
                    onChange={(e) => {
                      const updated = [...formData.icpProfiles];
                      updated[idx].name = e.target.value;
                      setFormData({ ...formData, icpProfiles: updated });
                    }}
                    className="font-bold text-slate-900 text-sm border-b border-transparent hover:border-slate-300 focus:outline-none w-full mr-2"
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

                <div className="text-xs space-y-2">
                  <div>
                    <label className="text-[11px] font-semibold text-slate-500">Target Demographic</label>
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

                  <div>
                    <label className="text-[11px] font-semibold text-slate-500">Preferred Tone</label>
                    <input
                      type="text"
                      value={icp.preferredTone}
                      onChange={(e) => {
                        const updated = [...formData.icpProfiles];
                        updated[idx].preferredTone = e.target.value;
                        setFormData({ ...formData, icpProfiles: updated });
                      }}
                      className="w-full px-2.5 py-1.5 border border-slate-200 rounded-lg text-xs"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-slate-500">Core Patient Insecurities & Pain Points</label>
                    <textarea
                      rows={2}
                      value={icp.painPoints.join(', ')}
                      onChange={(e) => {
                        const updated = [...formData.icpProfiles];
                        updated[idx].painPoints = e.target.value.split(',').map(s => s.trim());
                        setFormData({ ...formData, icpProfiles: updated });
                      }}
                      className="w-full px-2.5 py-1.5 border border-slate-200 rounded-lg text-xs"
                    />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Treatments & Offers */}
      {activeTab === 'treatments' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-bold text-slate-800">Clinical Treatment Menu & Unique Selling Points</h3>
            <Button
              size="sm"
              variant="primary"
              onClick={() => {
                const newTreatment: DentalTreatment = {
                  id: `treat-${Date.now()}`,
                  name: "New Clinical Procedure",
                  category: "Cosmetic",
                  usp: "Unique advantage & comfort features",
                  typicalDuration: "1 hour"
                };
                setFormData({ ...formData, treatments: [...formData.treatments, newTreatment] });
              }}
            >
              <Plus className="w-3.5 h-3.5 mr-1" /> Add Treatment
            </Button>
          </div>

          <div className="space-y-3">
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
                    <label className="text-[10px] font-bold uppercase text-slate-400">Clinical USP / Selling Point</label>
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

      {/* Tab 4: Visual Identity & Google Drive */}
      {activeTab === 'visual' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Palette & Typography</CardTitle>
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
                      className="w-full px-2 py-1 border border-slate-200 rounded text-xs uppercase"
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
                      className="w-full px-2 py-1 border border-slate-200 rounded text-xs uppercase"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Accent Teal/Gold</label>
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
                      className="w-full px-2 py-1 border border-slate-200 rounded text-xs uppercase"
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
                <label className="font-semibold text-slate-700 block mb-1">Clinic Google Drive Root Folder</label>
                <div className="flex items-center gap-2">
                  <FolderGit2 className="w-5 h-5 text-sky-600 shrink-0" />
                  <input
                    type="text"
                    value={formData.gdriveRootFolder}
                    onChange={(e) => setFormData({ ...formData, gdriveRootFolder: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs"
                  />
                </div>
                <p className="text-[11px] text-slate-400 mt-1">
                  Generated creative assets and high-res treatment photos are automatically synchronized to this folder.
                </p>
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
                  <span className="w-5 h-5 rounded-full bg-sky-100 text-sky-700 text-[10px] font-bold flex items-center justify-center shrink-0">
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
              <Button
                size="sm"
                variant="outline"
                onClick={() => setFormData({ ...formData, ctaTemplates: [...formData.ctaTemplates, "Comment 'CONSULT' for appointment"] })}
              >
                <Plus className="w-3.5 h-3.5 mr-1" /> Add CTA Template
              </Button>
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
                This exact prompt is supplied to the AI engine to generate medically accurate, on-brand dental content.
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

          <pre className="p-4 bg-slate-900 text-sky-200 font-mono text-xs rounded-xl overflow-x-auto whitespace-pre-wrap leading-relaxed max-h-[500px]">
            {compiledPrompt}
          </pre>
        </Card>
      )}
    </div>
  );
}
