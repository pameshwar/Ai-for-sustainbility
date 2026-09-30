import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Activity, 
  Sparkles, 
  Zap, 
  Droplets, 
  Trash2, 
  ShieldCheck, 
  ArrowRight, 
  TrendingUp, 
  CheckCircle2, 
  Gauge, 
  FileSpreadsheet, 
  Cpu, 
  Building2, 
  Star,
  Layers,
  ChevronRight,
  Play
} from 'lucide-react';
import SavingsCalculator from '../components/SavingsCalculator';

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-obsidian-950 text-slate-100 overflow-hidden">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-16 pb-24 lg:pt-24 lg:pb-32 overflow-hidden">
        {/* Glowing background mesh */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-eco-500/15 via-cyber-500/15 to-transparent rounded-full filter blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center max-w-3xl mx-auto">
            
            {/* Live Telemetry Active Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-medium bg-eco-950/80 text-eco-400 border border-eco-500/30 shadow-glow-emerald mb-6 animate-pulse-slow">
              <span className="w-2 h-2 rounded-full bg-eco-400 animate-ping" />
              <span>Google Gemini 2.5 Pro + Telemetry Telepathy Online</span>
            </div>

            {/* Headline */}
            <h1 className="font-display font-extrabold text-4xl sm:text-6xl lg:text-7xl tracking-tight text-white leading-[1.1]">
              Real-Time Sustainability &{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-eco-400 via-emerald-300 to-cyber-400">
                Resource Anomaly
              </span>{' '}
              Intelligence.
            </h1>

            {/* Subtitle */}
            <p className="mt-6 text-base sm:text-xl text-slate-300 max-w-2xl mx-auto font-light leading-relaxed">
              Centralize Energy (kWh), Water (Liters), and Solid Waste (kg) across commercial facilities. Detect hidden off-hour leaks and HVAC spikes instantaneously with Gemini-powered engineering action playbooks.
            </p>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/dashboard"
                className="w-full sm:w-auto px-8 py-4 rounded-xl font-display font-bold text-base bg-gradient-to-r from-eco-500 to-cyber-500 hover:from-eco-400 hover:to-cyber-400 text-obsidian-950 shadow-glow-emerald flex items-center justify-center gap-2.5 transition-all transform hover:scale-[1.02]"
              >
                <Sparkles className="w-5 h-5" />
                <span>Launch Live Command Center</span>
              </Link>
              
              <Link
                to="/onboarding"
                className="w-full sm:w-auto px-8 py-4 rounded-xl font-display font-semibold text-base bg-slate-900/80 hover:bg-slate-800 text-slate-200 border border-slate-700/80 flex items-center justify-center gap-2 transition-all"
              >
                <Building2 className="w-5 h-5 text-eco-400" />
                <span>Onboard New Facility</span>
              </Link>
            </div>

            {/* Micro stats banner */}
            <div className="mt-10 pt-6 border-t border-slate-800/80 flex flex-wrap items-center justify-center gap-6 sm:gap-12 text-xs font-mono text-slate-400">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-eco-400" />
                <span>No Hardware Lock-in</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-eco-400" />
                <span>Sub-Second Gemini Audit</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-eco-400" />
                <span>Automated ESG Scope 1 & 2</span>
              </div>
            </div>

          </div>

          {/* Interactive Live Preview Component */}
          <div className="mt-14 max-w-5xl mx-auto rounded-2xl glass-panel p-4 sm:p-6 border border-slate-700/80 shadow-2xl relative">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                </div>
                <span className="text-xs font-mono text-slate-400 ml-2">EcoPulse Telemetry Stream — Active Monitor</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-950/60 px-2.5 py-1 rounded-full border border-emerald-500/30">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                <span>Live Feed: Metropolis Tower One (75,000 sq ft)</span>
              </div>
            </div>

            {/* Interactive Preview Tiles */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
              
              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
                <div className="flex items-center justify-between text-xs text-amber-400 font-mono">
                  <span className="flex items-center gap-1.5"><Zap className="w-4 h-4" /> Energy Surge</span>
                  <span className="px-1.5 py-0.5 rounded bg-amber-950 border border-amber-500/30">CRITICAL</span>
                </div>
                <p className="text-sm font-semibold text-white mt-2">Off-Hours Chiller Plant Overcooling</p>
                <p className="text-xs text-slate-400 mt-1">2:00 AM compressor surge pulling 492 kWh.</p>
                <div className="mt-3 flex items-center justify-between text-xs font-mono text-emerald-400">
                  <span>Potential Recapture:</span>
                  <span className="font-bold">+$21,500/yr</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
                <div className="flex items-center justify-between text-xs text-cyber-400 font-mono">
                  <span className="flex items-center gap-1.5"><Droplets className="w-4 h-4" /> Plumbing Leak</span>
                  <span className="px-1.5 py-0.5 rounded bg-cyan-950 border border-cyan-500/30">HIGH</span>
                </div>
                <p className="text-sm font-semibold text-white mt-2">Continuous Solenoid Weeping</p>
                <p className="text-xs text-slate-400 mt-1">Cooling tower blowdown failing zero-flow baseline.</p>
                <div className="mt-3 flex items-center justify-between text-xs font-mono text-cyber-400">
                  <span>Water Abatement:</span>
                  <span className="font-bold">280 L / hr</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
                <div className="flex items-center justify-between text-xs text-eco-400 font-mono">
                  <span className="flex items-center gap-1.5"><Gauge className="w-4 h-4" /> EcoPulse Rating</span>
                  <span className="px-1.5 py-0.5 rounded bg-emerald-950 border border-emerald-500/30">71 / 100</span>
                </div>
                <p className="text-sm font-semibold text-white mt-2">Efficiency Trajectory</p>
                <p className="text-xs text-slate-400 mt-1">Resolving 2 pending items lifts score to 88/100.</p>
                <div className="mt-3 flex items-center justify-between text-xs font-mono text-slate-300">
                  <span>Carbon Offset:</span>
                  <span className="font-bold text-emerald-400">82.7 Tons CO2e</span>
                </div>
              </div>

            </div>

            <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <span>Simulated with continuous BACnet/IP telemetry feed</span>
              <Link to="/dashboard" className="text-eco-400 hover:text-eco-300 font-medium flex items-center gap-1">
                <span>Open Full Interactive Dashboard</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* 2. THREE OPERATIONAL SURFACES SHOWCASE */}
      <section id="features" className="py-20 bg-slate-950/60 border-y border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-mono text-eco-400 uppercase tracking-widest font-semibold block mb-2">
              Tri-Domain Architecture
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white">
              Unified Visibility Across All Resource Streams
            </h2>
            <p className="text-slate-400 text-sm mt-3">
              Eliminate disconnected spreadsheets and siloed utility portals. EcoPulse AI correlates all three operational domains simultaneously.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Domain 1: Energy */}
            <div className="p-8 rounded-2xl glass-card relative overflow-hidden group">
              <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center mb-6">
                <Zap className="w-6 h-6" />
              </div>
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block">Domain 01</span>
              <h3 className="font-display font-bold text-xl text-white mt-1">Energy & HVAC Telemetry</h3>
              <p className="text-slate-400 text-sm mt-3 leading-relaxed">
                Submeter electricity consumption (kWh), detect off-hours chiller overrides, eliminate peak coincident tariff spikes, and monitor variable frequency drives (VFDs).
              </p>
              <ul className="mt-6 space-y-2.5 text-xs text-slate-300 border-t border-slate-800/80 pt-4">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                  <span>Off-Peak Setback Auditing</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                  <span>Utility Ratchet Demand Shaving</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                  <span>HVAC Damper Mechanical Fault Alerts</span>
                </li>
              </ul>
            </div>

            {/* Domain 2: Water */}
            <div className="p-8 rounded-2xl glass-card relative overflow-hidden group">
              <div className="w-12 h-12 rounded-xl bg-cyber-500/20 text-cyber-400 flex items-center justify-center mb-6">
                <Droplets className="w-6 h-6" />
              </div>
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block">Domain 02</span>
              <h3 className="font-display font-bold text-xl text-white mt-1">Water & Plumbing Infrastructure</h3>
              <p className="text-slate-400 text-sm mt-3 leading-relaxed">
                Track flow rates (L/min & GPM), identify weeping solenoid valves, catch cooling tower blowdown overflows, and eliminate silent unmetered leaks before structural damage.
              </p>
              <ul className="mt-6 space-y-2.5 text-xs text-slate-300 border-t border-slate-800/80 pt-4">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyber-400" />
                  <span>02:00–05:00 AM Zero-Flow Verification</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyber-400" />
                  <span>Cooling Tower Conductivity Calibration</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyber-400" />
                  <span>High-Pressure Riser Rupture Protection</span>
                </li>
              </ul>
            </div>

            {/* Domain 3: Waste */}
            <div className="p-8 rounded-2xl glass-card relative overflow-hidden group">
              <div className="w-12 h-12 rounded-xl bg-eco-500/20 text-eco-400 flex items-center justify-center mb-6">
                <Trash2 className="w-6 h-6" />
              </div>
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block">Domain 03</span>
              <h3 className="font-display font-bold text-xl text-white mt-1">Solid Waste & Circularity</h3>
              <p className="text-slate-400 text-sm mt-3 leading-relaxed">
                Log daily waste compaction weight (kg), monitor recycling diversion percentages, catch mixed-waste contamination, and cut unnecessary hauling tipping fees.
              </p>
              <ul className="mt-6 space-y-2.5 text-xs text-slate-300 border-t border-slate-800/80 pt-4">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-eco-400" />
                  <span>Landfill Diversion Ratio Tracking</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-eco-400" />
                  <span>Cardboard Baler Reclamation Optimization</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-eco-400" />
                  <span>Organics Composting Verification</span>
                </li>
              </ul>
            </div>

          </div>

        </div>
      </section>

      {/* 3. INTERACTIVE ROI CALCULATOR SECTION */}
      <section id="calculator" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SavingsCalculator />
      </section>

      {/* 4. HOW IT WORKS (ARCHITECTURE & AI) */}
      <section id="how-it-works" className="py-20 bg-slate-950/40 border-t border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-mono text-cyber-400 uppercase tracking-widest font-semibold block mb-2">
              Next-Gen Architecture
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white">
              From Raw Submeter Logs to Remediated Score in 4 Steps
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 relative">
              <div className="text-3xl font-display font-extrabold text-slate-700 mb-2">01</div>
              <h3 className="font-semibold text-white text-base">Telemetry Ingest</h3>
              <p className="text-xs text-slate-400 mt-2">
                Connect utility meters, IoT smart plugs, or CSV batch feeds via high-throughput Express REST API.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 relative">
              <div className="text-3xl font-display font-extrabold text-eco-500/40 mb-2">02</div>
              <h3 className="font-semibold text-white text-base">Gemini 2.5 Audit</h3>
              <p className="text-xs text-slate-400 mt-2">
                Server invokes Google Gemini Pro with forced JSON Schema to detect anomalies and quantify dollar loss.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 relative">
              <div className="text-3xl font-display font-extrabold text-cyber-500/40 mb-2">03</div>
              <h3 className="font-semibold text-white text-base">Action Checklist</h3>
              <p className="text-xs text-slate-400 mt-2">
                Facility technicians execute step-by-step playbooks categorized by urgency with exact setpoint instructions.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 relative">
              <div className="text-3xl font-display font-extrabold text-amber-500/40 mb-2">04</div>
              <h3 className="font-semibold text-white text-base">Dynamic Score Boost</h3>
              <p className="text-xs text-slate-400 mt-2">
                Marking items resolved immediately recalculates your EcoPulse rating (0–100) and exports verified ESG audits.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* 5. SOCIAL PROOF & TESTIMONIALS */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-mono text-eco-400 uppercase tracking-widest font-semibold block mb-2">
            Enterprise Endorsements
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white">
            Trusted by Commercial Facilities & Real Estate REITs
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="p-6 rounded-2xl glass-card flex flex-col justify-between">
            <div>
              <div className="flex gap-1 text-amber-400 mb-3">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-400" />)}
              </div>
              <p className="text-slate-300 text-sm italic leading-relaxed">
                "Within 48 hours of feeding telemetry into EcoPulse AI, Gemini detected our cooling towers blowdown weeping overnight. It saved us $34,000 in unnecessary water bills in Q1 alone."
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-800 flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-eco-500/20 text-eco-400 font-bold flex items-center justify-center text-xs">
                MR
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Marcus Ramos</p>
                <p className="text-xs text-slate-400">Chief Facility Engineer, Horizon REIT</p>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl glass-card flex flex-col justify-between">
            <div>
              <div className="flex gap-1 text-amber-400 mb-3">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-400" />)}
              </div>
              <p className="text-slate-300 text-sm italic leading-relaxed">
                "Our ESG compliance team used to spend 3 weeks compiling utility bills for GRESB and LEED Arc reports. EcoPulse generates audit-ready Scope 1 and 2 calculations in one click."
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-800 flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-cyber-500/20 text-cyber-400 font-bold flex items-center justify-center text-xs">
                EL
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Dr. Elena Lindqvist</p>
                <p className="text-xs text-slate-400">VP of Sustainability, UrbanCore Portfolios</p>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl glass-card flex flex-col justify-between">
            <div>
              <div className="flex gap-1 text-amber-400 mb-3">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-400" />)}
              </div>
              <p className="text-slate-300 text-sm italic leading-relaxed">
                "The dynamic EcoPulse Score created healthy competition between our 4 regional distribution hubs. Our team eliminated off-hour HVAC overcooling in two weeks flat."
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-800 flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center text-xs">
                JT
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Jason Thornton</p>
                <p className="text-xs text-slate-400">Director of Operations, Pan-Pacific Logistics</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 6. TRANSPARENT PRICING TIERS */}
      <section id="pricing" className="py-20 bg-slate-950/60 border-t border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-mono text-eco-400 uppercase tracking-widest font-semibold block mb-2">
              Transparent Deployment
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white">
              Predictable Pricing Built for Single Buildings & City Portfolios
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            
            {/* Tier 1: Starter */}
            <div className="p-8 rounded-2xl glass-card flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono text-slate-400 uppercase font-semibold">Starter Facility</span>
                <div className="mt-3 flex items-baseline gap-1">
                  <span className="font-display font-extrabold text-4xl text-white">$249</span>
                  <span className="text-slate-400 text-xs font-mono">/ building / mo</span>
                </div>
                <p className="text-xs text-slate-400 mt-2">Up to 50,000 sq ft, 3 submeters</p>

                <ul className="mt-6 space-y-3 text-xs text-slate-300 border-t border-slate-800 pt-4">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-eco-400" /> Hourly Energy & Water Telemetry</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-eco-400" /> Weekly Gemini Anomaly Audits</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-eco-400" /> Dynamic EcoPulse Efficiency Score</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-eco-400" /> Standard Email Alert Notifications</li>
                </ul>
              </div>

              <Link
                to="/onboarding"
                className="mt-8 w-full py-3 rounded-xl text-center text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
              >
                Start 14-Day Pilot
              </Link>
            </div>

            {/* Tier 2: Pro (Featured) */}
            <div className="p-8 rounded-2xl glass-panel border-2 border-eco-500/80 shadow-glow-emerald flex flex-col justify-between relative transform md:-translate-y-2">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-[10px] font-mono font-bold bg-gradient-to-r from-eco-500 to-cyber-500 text-obsidian-950 uppercase tracking-wider">
                Most Popular for REITs
              </div>
              <div>
                <span className="text-xs font-mono text-eco-400 uppercase font-semibold">Commercial Portfolio</span>
                <div className="mt-3 flex items-baseline gap-1">
                  <span className="font-display font-extrabold text-4xl text-white">$699</span>
                  <span className="text-slate-400 text-xs font-mono">/ facility / mo</span>
                </div>
                <p className="text-xs text-slate-400 mt-2">Up to 250,000 sq ft, unlimited meters</p>

                <ul className="mt-6 space-y-3 text-xs text-slate-200 border-t border-slate-800 pt-4">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-eco-400" /> Real-time BACnet / Modbus Ingestion</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-eco-400" /> Continuous Gemini 2.5 Pro Audits</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-eco-400" /> Step-by-Step Remediation Workflows</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-eco-400" /> Exportable ESG Executive Reports (PDF)</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-eco-400" /> Multi-Tenant Supabase RLS Isolation</li>
                </ul>
              </div>

              <Link
                to="/onboarding"
                className="mt-8 w-full py-3.5 rounded-xl text-center text-xs font-bold bg-gradient-to-r from-eco-500 to-cyber-500 hover:from-eco-400 hover:to-cyber-400 text-obsidian-950 shadow-glow-emerald transition-all transform hover:scale-[1.02]"
              >
                Deploy Professional Tier
              </Link>
            </div>

            {/* Tier 3: Enterprise */}
            <div className="p-8 rounded-2xl glass-card flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono text-slate-400 uppercase font-semibold">Urban Municipalities</span>
                <div className="mt-3 flex items-baseline gap-1">
                  <span className="font-display font-extrabold text-4xl text-white">Custom</span>
                </div>
                <p className="text-xs text-slate-400 mt-2">City-wide infrastructure & campus grids</p>

                <ul className="mt-6 space-y-3 text-xs text-slate-300 border-t border-slate-800 pt-4">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-eco-400" /> Dedicated Gemini Fine-Tuned Instance</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-eco-400" /> Custom SCADA & Utility Webhooks</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-eco-400" /> Custom GHG Scope 1/2/3 Verification</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-eco-400" /> 24/7 Dedicated Sustainability Architect</li>
                </ul>
              </div>

              <Link
                to="/onboarding"
                className="mt-8 w-full py-3 rounded-xl text-center text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
              >
                Contact Solutions Team
              </Link>
            </div>

          </div>

        </div>
      </section>

      {/* 7. FINAL CALL TO ACTION */}
      <section className="py-20 relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="p-10 sm:p-14 rounded-3xl bg-gradient-to-br from-eco-950/60 via-slate-900/80 to-cyber-950/60 border border-eco-500/40 shadow-glow-emerald">
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight">
              Start Cutting Resource Waste In Under 5 Minutes
            </h2>
            <p className="mt-4 text-slate-300 text-sm sm:text-base max-w-xl mx-auto">
              Access the live demo facility immediately, explore real-time telemetry, or onboard your own meters with automated Gemini intelligence.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/dashboard"
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-eco-500 to-cyber-500 hover:from-eco-400 hover:to-cyber-400 text-obsidian-950 shadow-glow-emerald transition-all"
              >
                Enter Live Demo Command Center
              </Link>
              <Link
                to="/auth/signup"
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-semibold text-sm bg-slate-800 hover:bg-slate-700 text-white transition-colors"
              >
                Create Free Account
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
