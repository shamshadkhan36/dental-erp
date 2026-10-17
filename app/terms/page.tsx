'use client';

import React from 'react';
import Link from 'next/link';
import { 
  ShieldCheck, 
  FileText, 
  ArrowLeft, 
  CheckCircle2, 
  AlertTriangle, 
  Scale, 
  Lock, 
  Bot, 
  UserCheck 
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';

export default function TermsAndConditionsPage() {
  return (
    <div className="max-w-4xl mx-auto py-10 px-4 sm:px-6 space-y-8">
      {/* Top Navigation */}
      <div className="flex items-center justify-between">
        <Link href="/">
          <Button variant="outline" size="sm">
            <ArrowLeft className="w-4 h-4 mr-1.5" />
            Back to Dashboard
          </Button>
        </Link>
        <Badge variant="primary">Updated for 2026/2027 Regulatory Standards</Badge>
      </div>

      {/* Header Banner */}
      <div className="bg-white p-8 rounded-2xl border border-slate-200/90 shadow-sm space-y-3">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-[#f0f7fd] text-[#4f98db] flex items-center justify-center font-bold">
            <Scale className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-[#333333]">Terms of Service & Regulatory Compliance</h1>
            <p className="text-xs text-slate-500">
              National Dental Commission (NDC) Ethical Rules & Digital Marketing for Dentists ERP Agreement
            </p>
          </div>
        </div>
        <p className="text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
          By registering for an account, accessing a free trial, or generating social media content using <strong>Digital Marketing for Dentists</strong>, dental practitioners agree to be bound by the ethical advertising standards of the <strong>National Dental Commission (NDC) / State Dental Councils</strong> and these platform terms.
        </p>
      </div>

      {/* Part 1: NDC Ethical Rules & Advertising Standards */}
      <Card className="p-6 sm:p-8 space-y-6 border-l-4 border-l-[#4f98db]">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <div className="w-9 h-9 rounded-lg bg-sky-50 text-[#4f98db] flex items-center justify-center">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-[#333333]">
              Part A: National Dental Commission (NDC) & State Dental Council Advertising Rules
            </h2>
            <p className="text-[11px] text-slate-500">
              Statutory standards governing patient communication, clinical truthfulness, and social media marketing
            </p>
          </div>
        </div>

        <div className="space-y-5 text-xs text-slate-700 leading-relaxed">
          <section className="space-y-2">
            <h3 className="font-bold text-slate-900 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-800 flex items-center justify-center text-[10px]">1</span>
              Prohibition of False Guarantees & Superlatives
            </h3>
            <p className="pl-7 text-slate-600">
              Dental practitioners must never publish claims guaranteeing 100% painless treatment, permanent tooth retention without maintenance, or miracle cosmetic outcomes. The term &quot;best dentist&quot;, &quot;number one implantologist&quot;, or unfounded comparative rankings are strictly prohibited under ethical advertising guidelines.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="font-bold text-slate-900 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-800 flex items-center justify-center text-[10px]">2</span>
              Mandatory Clinical Disclaimers
            </h3>
            <p className="pl-7 text-slate-600">
              All published social media posts, reels, video scripts, and flyers generated through this ERP automatically incorporate mandatory clinical advisories (e.g. <em>&quot;Individual results vary. Clinical evaluation and personalized diagnosis required.&quot;</em>). Practitioners agree not to delete or obscure statutory disclaimers.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="font-bold text-slate-900 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-800 flex items-center justify-center text-[10px]">3</span>
              Patient Consent & Clinical Photography Privacy
            </h3>
            <p className="pl-7 text-slate-600">
              Before and after photographs, digital 3D scans, and testimonial reels may only be published if written, informed patient consent has been obtained and archived at the practice. Unidentified or stock clinical imagery must be clearly distinguishable from actual clinic patients.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="font-bold text-slate-900 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-800 flex items-center justify-center text-[10px]">4</span>
              Dentist Registration & Credential Transparency
            </h3>
            <p className="pl-7 text-slate-600">
              Practitioners must provide verified State Dental Council registration credentials and DCI / National Dental Register (NDR) identification upon registration. Registration numbers and licensed council names must be available in public clinic profile metadata.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="font-bold text-slate-900 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-800 flex items-center justify-center text-[10px]">5</span>
              Periodic Registry Re-Verification (6–12 Month Cycle)
            </h3>
            <p className="pl-7 text-slate-600">
              To prevent unauthorized practice, practitioner active status will be verified against the official National Dental Register (NDR) or State Dental Council roll upon signup and re-verified every 6 to 12 months. Suspended or revoked registrations result in immediate suspension of ERP publishing access.
            </p>
          </section>
        </div>
      </Card>

      {/* Part 2: ERP Terms of Service */}
      <Card className="p-6 sm:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <div className="w-9 h-9 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-[#333333]">
              Part B: Digital Marketing for Dentists ERP Terms of Service
            </h2>
            <p className="text-[11px] text-slate-500">
              Software licensing, AI generation boundaries, and clinical liability allocation
            </p>
          </div>
        </div>

        <div className="space-y-5 text-xs text-slate-700 leading-relaxed">
          <section className="space-y-2">
            <h3 className="font-bold text-slate-900 flex items-center gap-2">
              <Bot className="w-4 h-4 text-[#4f98db]" />
              1. Final Clinical Review & Doctor Sign-Off Responsibility
            </h3>
            <p className="text-slate-600">
              The ERP AI Copywriter and Creative Studio generate proposed drafts based on clinical parameters and doctor prompts. <strong>The licensed dentist or authorized clinic director remains the ultimate and sole signing authority.</strong> No post or flyer should be published without doctor approval in the Quality Check & Approvals queue.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="font-bold text-slate-900 flex items-center gap-2">
              <Lock className="w-4 h-4 text-emerald-600" />
              2. Data Privacy & Google Drive Cloud Storage
            </h3>
            <p className="text-slate-600">
              Clinic assets connected via Google Drive are accessed exclusively to render approved social graphics and reels. The ERP does not sell patient demographics or clinic records to third-party ad networks. Multi-tenant practice workspaces are isolated with Row-Level Security.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="font-bold text-slate-900 flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-purple-600" />
              3. Free Trial Quotas & Credit Consumption
            </h3>
            <p className="text-slate-600">
              The 14-Day Free Trial Starter Kit grants limited trial credits (25 AI Copy credits, 5 Video renders, 10 Graphics, 2GB Storage) solely for clinical marketing evaluation. Unused promotional trial credits expire at the end of the trial period unless upgraded to an active practice tier.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="font-bold text-slate-900 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              4. Termination & Policy Violations
            </h3>
            <p className="text-slate-600">
              Accounts found generating abusive, disparaging, or fraudulent medical claims, or utilizing unauthorized registration codes will have API publishing tokens revoked immediately in compliance with medical advertising authorities.
            </p>
          </section>
        </div>
      </Card>

      {/* Bottom CTA / Confirmation */}
      <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 text-center space-y-3">
        <div className="flex items-center justify-center gap-2 text-emerald-600 font-bold text-sm">
          <CheckCircle2 className="w-5 h-5" />
          <span>Active Practice Compliance Framework</span>
        </div>
        <p className="text-xs text-slate-500 max-w-lg mx-auto">
          Need legal clarification or custom institutional DSO multi-site compliance terms? Contact our regulatory support team at legal@apexsmilestudio.com.
        </p>
        <div className="pt-2">
          <Link href="/">
            <Button variant="primary" size="md">
              Return to Clinic Dashboard
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
