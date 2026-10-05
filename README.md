# Dental ERP: Social Media Content & Creative Operations Automation 🦷✨

An end-to-end AI-powered Social Media Marketing & Creative Operations Automation platform designed specifically for dental practices and dental marketing agencies. Built with **Next.js 14+ (App Router)**, **React**, **TypeScript**, and **Tailwind CSS**.

---

## 📋 Features Overview (Based on Client Specification)

| Module | Route | What it does | Where it goes |
|---|---|---|---|
| **Client & Brand Intake** | `/brand-intake` | Formulates practice voice, ICP personas, treatment USPs, visual identity (palette & logo), and compiled system prompts | **System Prompts / Brand Profile** |
| **Content Calendar** | `/calendar` | Monthly & weekly interactive planner across 6 clinical pillars with 1-click AI generation handoff | **ERP Content Calendar** |
| **AI Copywriter Studio** | `/copywriter` | Writes hooks, educational captions, CTAs, carousel slides, and video reel scripts (Monthly, Weekly, On-Demand) | **ERP Content Records** |
| **Creative Production** | `/creative` | Assembles visuals with controlled templates (1:1, 4:5, 9:16) linked to clinic Google Drive storage | **ERP Creative Records & Google Drive** |
| **Standalone Flyer Studio** | `/creative?tab=flyers`| Dedicated ad-hoc promotional flyer generator with printable PDF/graphic export | **Printable Clinic Assets** |
| **Quality Check & Approvals** | `/approvals` | 6-rule automated compliance checker (aspect ratio, CTA presence, logo placement, medical disclaimer) with Doctor sign-off | **ERP Pending Approvals** |
| **Delivery & Meta Scheduling** | `/delivery` | Approved content bank, 1-click text copy, high-res graphic download, and automated Facebook & Instagram scheduling | **Facebook & Instagram Publishing** |
| **Analytics & Learning** | `/analytics` | Real-time social engagement metrics, reach, patient inquiries attributed to treatments, and AI feedback loop | **ERP Analytics Dashboard** |
| **Integrations & Roadmap** | `/integrations` | Meta Graph API, Google Drive connector, DM automation triggers, WhatsApp routing bot, and Reels video workflow | **Connected Channels & Automation Hub** |

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 14+ (App Router)](https://nextjs.org/)
- **UI & Styling**: [Tailwind CSS](https://tailwindcss.com/), [Lucide React Icons](https://lucide.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Storage / State**: React Store with localStorage synchronization and pluggable backend
- **APIs**:
  - `POST /api/generate`: REST endpoint for programmatic AI dental copy generation
  - `POST /api/qc`: REST endpoint for automated compliance and brand guidelines scoring

---

## 🚀 Getting Started

### 1. Clone & Install Dependencies
```bash
git clone https://github.com/shamshadkhan36/dental-erp.git
cd dental-erp
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Production Build
```bash
npm run build
npm run start
```

---

## 🩺 Clinical Content Pillars Covered
1. **Educational / Oral Hygiene Tips** (Nightguards, TMJ, flossing techniques)
2. **Smile Transformations** (Invisalign before/after, ceramic smile makeovers)
3. **Dental Myth vs Fact** (Implants vs root canal pain, whitening enamel safety)
4. **Doctor & Team Spotlight** (Clinical credentials, 3D digital scanner advantages)
5. **Patient Testimonials** (All-on-4 full arch implants, life transformations)
6. **Promotions & Awareness Days** (Free screening camps, seasonal whitening specials)

---

## 📄 License
MIT License. Built for Dental ERP operations.
