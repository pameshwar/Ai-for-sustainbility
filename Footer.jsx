import React from 'react';
import { Activity, ShieldCheck, Github, Twitter, Linkedin, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="w-full border-t border-slate-800/80 bg-obsidian-950/80 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          
          {/* Brand Info */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-eco-500 flex items-center justify-center text-obsidian-950">
                <Activity className="w-4 h-4 stroke-[2.5]" />
              </div>
              <span className="font-display font-bold text-base text-white">EcoPulse AI</span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              Real-time sustainability and resource anomaly assistant powered by Google Gemini 2.5 Pro and Supabase PostgreSQL.
            </p>
            {/* System Status Pill */}
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-slate-900 border border-slate-800 text-[11px] text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Telemetry Ingestion: 99.98% Uptime</span>
            </div>
          </div>

          {/* Platform Links */}
          <div>
            <h4 className="font-mono text-white uppercase tracking-wider text-[11px] font-semibold mb-3">Product</h4>
            <ul className="space-y-2">
              <li><Link to="/dashboard" className="hover:text-eco-400 transition-colors">Command Center</Link></li>
              <li><Link to="/telemetry" className="hover:text-eco-400 transition-colors">Telemetry Visualizer</Link></li>
              <li><Link to="/action-plan" className="hover:text-eco-400 transition-colors">AI Action Plan</Link></li>
              <li><Link to="/reports" className="hover:text-eco-400 transition-colors">ESG Executive Reports</Link></li>
              <li><Link to="/onboarding" className="hover:text-eco-400 transition-colors">Facility Wizard</Link></li>
            </ul>
          </div>

          {/* Architecture & AI */}
          <div>
            <h4 className="font-mono text-white uppercase tracking-wider text-[11px] font-semibold mb-3">Architecture</h4>
            <ul className="space-y-2">
              <li><span className="text-slate-300">Google Gemini 2.5 Pro</span></li>
              <li><span className="text-slate-300">Supabase Row Level Security</span></li>
              <li><span className="text-slate-300">Zod Runtime Validation</span></li>
              <li><span className="text-slate-300">GHG Scope 1 & 2 ESG Schema</span></li>
              <li><span className="text-slate-300">Express REST Microservices</span></li>
            </ul>
          </div>

          {/* Compliance & Security */}
          <div>
            <h4 className="font-mono text-white uppercase tracking-wider text-[11px] font-semibold mb-3">Enterprise Standards</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-1.5 text-slate-300">
                <ShieldCheck className="w-3.5 h-3.5 text-eco-400" />
                <span>Multi-Tenant Data Isolation</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-300">
                <ShieldCheck className="w-3.5 h-3.5 text-eco-400" />
                <span>ISO 50001 Energy Management</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-300">
                <ShieldCheck className="w-3.5 h-3.5 text-eco-400" />
                <span>LEED Arc Dynamic Scoring</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <p>© {new Date().getFullYear()} EcoPulse AI Inc. Built for Urban Centers & Commercial Facilities.</p>
          <div className="flex items-center gap-4">
            <span className="hover:text-slate-300 transition-colors cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-300 transition-colors cursor-pointer">Terms of Service</span>
            <span className="hover:text-slate-300 transition-colors cursor-pointer">Security Whitepaper</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
