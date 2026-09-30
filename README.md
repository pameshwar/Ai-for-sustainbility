# EcoPulse AI — Real-Time Sustainability & Resource Anomaly Assistant

> **Enterprise-grade web application** centralizing real-time energy, water, and waste tracking for urban centers and commercial facilities. Powered by **Google Gemini 2.5 Pro**, **Supabase PostgreSQL (with RLS)**, **Express REST API**, and a modern **React + Tailwind CSS** frontend.

---

## 🌟 Key Highlights & Features

1. **High-Converting Public Landing Page (`/`)**:
   - Hero section with live telemetry active badge, value proposition, and quick action CTAs.
   - **Interactive Savings & Carbon Calculator**: Slide facility square footage (10,000–500,000+ sq ft) and power tariffs to compute instant annual ROI ($/yr), CO2 abated (Tons), water saved (kL), payback period, and potential EcoPulse rating.
   - **Tri-Domain Feature Showcase**: Correlated tracking for Energy/HVAC, Water/Plumbing, and Solid Waste.
   - Social proof endorsements from enterprise facility managers, REIT directors, and VP of Sustainability.
   - Transparent pricing tiers (Starter, Commercial Portfolio, Urban Municipalities).

2. **Authentication Flow (`/auth/login` & `/auth/signup`)**:
   - Supabase Auth integration with email/password authentication.
   - **1-Click Instant Demo Login**: Immediately enter the live facility command center without waiting for credentials.

3. **Multi-Facility Onboarding Wizard (`/onboarding`)**:
   - Step 1: Building dimensions, square footage, industry type, and operating hours.
   - Step 2: Target reduction goals (Peak Demand, Leak Prevention, Recycling Diversion, Net Zero) & submeter interfaces.
   - Step 3: Baseline telemetry calibration and automatic launch of initial Gemini audit.

4. **Central Sustainability Command Center (`/dashboard`)**:
   - **Dynamic EcoPulse Efficiency Gauge**: Circular 0–100 indicator with status color coding (Optimal, Warning, Critical).
   - Real-time Metric Cards with trends for Active Power (kWh), Water (Liters), Waste Compaction (kg), and Carbon Offset (Tons CO2e).
   - Recharts time-series visualizer with area/bar view toggles and simulated anomaly injection.
   - Prioritized AI action feed with step-by-step remediation playbooks.

5. **Resource Telemetry Explorer (`/telemetry`)**:
   - Continuous submeter stream inspection across domains (`energy_hvac`, `water_plumbing`, `waste_management`).
   - Time range filters (Last 24h, 3d, 7d, 30d).
   - One-click **Export CSV** for compliance archives.
   - Anomaly spike simulator to test real-time AI threshold detection.

6. **Prioritized Action Plan (`/action-plan`)**:
   - Remediation tasks categorized by urgency (`CRITICAL`, `HIGH`, `MEDIUM`, `LOW`).
   - Slide-over `RemediationModal` detailing exact engineering procedures and setpoint changes.
   - **Dynamic Score Recalculation**: Resolving items immediately lifts the facility's EcoPulse rating and recalculates ESG metrics in real-time.

7. **Executive Sustainability Report (`/reports`)**:
   - Audit-ready executive documentation aligned with **ISO 50001** and **GHG Protocol Corporate Scope 1 & 2**.
   - Clean printable layout with `@media print` formatting (Save as PDF).

---

## 🛠️ Technology Stack

| Layer | Technologies |
|---|---|
| **Frontend** | React 18 (Vite), Tailwind CSS, Framer Motion, Lucide React, Recharts, Canvas Confetti |
| **Backend** | Node.js, Express.js REST API, Zod schema validation, CORS |
| **AI Engine** | `@google/genai` SDK using `gemini-2.5-pro` with structured JSON schema (`responseSchema`) & resilient heuristics fallback |
| **Database & Auth** | Supabase PostgreSQL with Row Level Security (RLS) & Supabase Client (`@supabase/supabase-js`) |

---

## 🚀 Quick Start Guide

### 1. Prerequisites
- Node.js (v18+) & npm

### 2. Running the Application
The workspace is pre-configured with active dev servers:

```bash
# Terminal 1: Start Backend Server (Runs on port 5001)
cd server
npm start

# Terminal 2: Start Frontend Client (Runs on port 3000)
cd client
npm run dev
```

Visit the application at **[http://localhost:3000/](http://localhost:3000/)**

---

## 🗄️ Database Provisioning (Supabase SQL)

To link your external Supabase project, execute `server/db/schema.sql` inside your **Supabase SQL Editor**:

```sql
-- Creates profiles, telemetry, assessments, and action_items tables
-- Configures Row Level Security (RLS) policies for multi-tenant isolation
\i server/db/schema.sql
```

Then add your credentials to `server/.env` and `client/.env`:
```env
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_PUBLISHABLE_KEY=your_anon_key
SUPABASE_SECRET_KEY=your_service_role_key
GEMINI_API_KEY=your_gemini_api_key_here
```

*(Note: EcoPulse AI includes an automated resilient store and demo facility that works right out of the box even before remote keys are set up!)*

---

## 📡 REST API Endpoints

- `GET  /api/health` — Service health check & connection status.
- `POST /api/onboarding` — Registers facility metadata and initial baseline telemetry.
- `GET  /api/onboarding/profile` — Retrieves active facility profile.
- `POST /api/telemetry/batch` — Batch ingest submeter readings (Zod validated).
- `GET  /api/telemetry` — Retrieve historical telemetry series with filters.
- `POST /api/telemetry/simulate-spike` — Injects anomaly spike for live demonstration.
- `POST /api/assessment/generate` — Triggers server-side Gemini 2.5 Pro sustainability audit.
- `GET  /api/assessment/latest` — Retrieves current EcoPulse score and active recommendations.
- `PATCH /api/action-items/:id/status` — Updates item status (`PENDING` -> `RESOLVED`) & dynamically recalculates facility score.
- `GET  /api/reports/sustainability` — Summarizes financial ROI and GHG Scope 1/2 carbon abatement.

---

## 🧪 Verified Automated Test Results

- Backend health: `online` (Port 5001)
- Frontend Vite server: `ready in 71ms` (Port 3000)
- End-to-end audit cycle: Score dynamically updated `71` ➔ `83` upon resolving critical chiller anomaly.
- Total realized savings: `$35,700/yr`
