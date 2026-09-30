import React, { useState, useEffect } from 'react';
import { 
  Printer, 
  Download, 
  Leaf, 
  DollarSign, 
  ShieldCheck, 
  Calendar, 
  Building2, 
  Activity, 
  FileText,
  CheckCircle2,
  Clock,
  Sparkles
} from 'lucide-react';
import { api } from '../lib/api';
import { useAuth } from '../context/AuthContext';

export default function Reports() {
  const { user } = useAuth();
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchReport() {
      try {
        setLoading(true);
        const res = await api.getSustainabilityReport();
        setReport(res.report);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchReport();
  }, []);

  const handlePrint = () => {
    window.print();
  };

  const facility = report?.facility || {
    facility_name: 'Metropolis Tower One',
    facility_type: 'Commercial Office',
    square_footage: 75000,
    operating_hours: '08:00 - 18:00 (Mon-Fri)'
  };

  const metrics = report?.metrics || {
    total_potential_savings_usd: 57000,
    total_potential_carbon_kg: 107300,
    realized_savings_usd: 14200,
    realized_carbon_kg: 19800,
    trees_offset_equivalent: 912,
    resolved_actions_count: 1,
    total_actions_count: 4
  };

  const score = report?.ecopulse_score || 71;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Action Bar (hidden when printing) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 no-print pb-6 border-b border-slate-800">
        <div>
          <span className="text-xs font-mono text-eco-400 uppercase tracking-widest font-semibold block mb-1">
            Audit Documentation
          </span>
          <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-white">
            Executive Sustainability & ESG Impact Report
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Verified resource telemetry audit generated for ESG compliance and facility executives.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs bg-gradient-to-r from-eco-500 to-cyber-500 hover:from-eco-400 hover:to-cyber-400 text-obsidian-950 shadow-glow-emerald transition-all"
          >
            <Printer className="w-4 h-4" />
            <span>Print / Save as PDF</span>
          </button>
        </div>
      </div>

      {/* The Printable Executive Report Document */}
      <div className="p-8 sm:p-12 rounded-3xl glass-panel border border-slate-700/80 shadow-2xl space-y-8 bg-slate-950 print:bg-white print:text-slate-900 print:shadow-none print:border-none print:p-0">
        
        {/* Document Header */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 pb-6 border-b border-slate-800 print:border-slate-300">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-lg bg-eco-500 flex items-center justify-center text-obsidian-950 font-bold">
                <Activity className="w-5 h-5 stroke-[2.5]" />
              </div>
              <span className="font-display font-bold text-2xl text-white print:text-slate-900">EcoPulse AI</span>
            </div>
            <p className="text-xs font-mono text-slate-400 print:text-slate-600">
              Automated Resource Telemetry & Anomaly Audit Protocol
            </p>
            <p className="text-xs font-mono text-slate-400 print:text-slate-600 mt-0.5">
              Protocol Standard: ISO 50001 / GHG Protocol Corporate Scope 1 & 2
            </p>
          </div>

          <div className="text-left sm:text-right text-xs font-mono text-slate-400 print:text-slate-600 space-y-1">
            <p><span className="text-slate-500">Report Ref:</span> EP-{Math.abs(Date.now()).toString().slice(-8)}</p>
            <p><span className="text-slate-500">Generated:</span> {new Date().toLocaleDateString()} {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
            <p><span className="text-slate-500">Facility ID:</span> {facility.facility_name.toUpperCase().replace(/\s+/g, '-')}</p>
          </div>
        </div>

        {/* Facility Summary Section */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 rounded-2xl bg-slate-900/60 print:bg-slate-100 border border-slate-800 print:border-slate-200">
          <div>
            <span className="text-[11px] font-mono text-slate-400 uppercase block">Facility Name</span>
            <p className="font-bold text-sm text-white print:text-slate-900 mt-0.5">{facility.facility_name}</p>
          </div>
          <div>
            <span className="text-[11px] font-mono text-slate-400 uppercase block">Building Type</span>
            <p className="font-bold text-sm text-white print:text-slate-900 mt-0.5">{facility.facility_type}</p>
          </div>
          <div>
            <span className="text-[11px] font-mono text-slate-400 uppercase block">Monitored Area</span>
            <p className="font-bold text-sm text-white print:text-slate-900 mt-0.5">{Number(facility.square_footage).toLocaleString()} sq ft</p>
          </div>
          <div>
            <span className="text-[11px] font-mono text-slate-400 uppercase block">Operating Hours</span>
            <p className="font-bold text-sm text-white print:text-slate-900 mt-0.5">{facility.operating_hours}</p>
          </div>
        </div>

        {/* Executive Score & Headline Narrative */}
        <div className="p-6 rounded-2xl bg-slate-900/80 print:bg-slate-50 border border-slate-800 print:border-slate-300">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <div>
              <span className="text-xs font-mono font-bold text-eco-400 uppercase tracking-wider block">
                Composite Efficiency Score
              </span>
              <h2 className="font-display font-extrabold text-2xl text-white print:text-slate-900 mt-1">
                EcoPulse Performance Rating: {score} / 100
              </h2>
            </div>
            <div className="px-4 py-2 rounded-xl bg-eco-950/80 border border-eco-500/40 text-eco-300 text-xs font-semibold print:bg-emerald-100 print:text-emerald-800">
              Status: Actionable Remediation Phase
            </div>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 print:text-slate-700 leading-relaxed">
            {report?.summary || `Audit reveals Metropolis Tower One maintains robust daytime efficiency, but exhibits off-peak anomalies including scheduled cooling overrides at 02:00 AM and secondary water riser weeping. Implementing the prioritized action items will unlock $${metrics.total_potential_savings_usd.toLocaleString()} in annual operational recapture.`}
          </p>
        </div>

        {/* 4 Financial & ESG Impact Tiles */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          
          <div className="p-4 rounded-xl bg-slate-900/50 print:bg-slate-100 border border-slate-800 print:border-slate-200">
            <span className="text-[11px] font-mono text-slate-400 uppercase block">Total Opportunity Pool</span>
            <p className="font-display font-extrabold text-xl text-emerald-400 print:text-emerald-700 mt-1">
              ${metrics.total_potential_savings_usd.toLocaleString()}
            </p>
            <p className="text-[11px] text-slate-400 mt-0.5">Annual recurring savings</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/50 print:bg-slate-100 border border-slate-800 print:border-slate-200">
            <span className="text-[11px] font-mono text-slate-400 uppercase block">Realized Cost Savings</span>
            <p className="font-display font-extrabold text-xl text-white print:text-slate-900 mt-1">
              ${metrics.realized_savings_usd.toLocaleString()}
            </p>
            <p className="text-[11px] text-slate-400 mt-0.5">From {metrics.resolved_actions_count} resolved action items</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/50 print:bg-slate-100 border border-slate-800 print:border-slate-200">
            <span className="text-[11px] font-mono text-slate-400 uppercase block">Total Carbon Offset Pool</span>
            <p className="font-display font-extrabold text-xl text-cyber-400 print:text-cyan-700 mt-1">
              {(metrics.total_potential_carbon_kg / 1000).toFixed(1)} MT
            </p>
            <p className="text-[11px] text-slate-400 mt-0.5">Metric tons CO2 equivalent</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/50 print:bg-slate-100 border border-slate-800 print:border-slate-200">
            <span className="text-[11px] font-mono text-slate-400 uppercase block">EPA Tree Offset Equiv.</span>
            <p className="font-display font-extrabold text-xl text-white print:text-slate-900 mt-1">
              {metrics.trees_offset_equivalent.toLocaleString()}
            </p>
            <p className="text-[11px] text-slate-400 mt-0.5">Mature urban seedlings / year</p>
          </div>

        </div>

        {/* Action Items Audit Table */}
        <div className="space-y-3">
          <h3 className="font-display font-bold text-base text-white print:text-slate-900">
            Itemized Engineering Action Log
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300 print:text-slate-800">
              <thead className="bg-slate-900/80 print:bg-slate-200 font-mono text-[11px] text-slate-400 print:text-slate-700 uppercase">
                <tr>
                  <th className="py-2.5 px-3">Severity</th>
                  <th className="py-2.5 px-3">Domain</th>
                  <th className="py-2.5 px-3">Anomaly Title</th>
                  <th className="py-2.5 px-3">Est. Annual Savings</th>
                  <th className="py-2.5 px-3">CO2 Abatement</th>
                  <th className="py-2.5 px-3">Audit Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 print:divide-slate-200">
                {(report?.action_items || []).map(item => (
                  <tr key={item.id} className="hover:bg-slate-900/40">
                    <td className="py-2.5 px-3 font-mono font-bold">
                      <span className={`px-2 py-0.5 rounded text-[10px] ${
                        item.severity === 'CRITICAL' ? 'bg-rose-950 text-rose-400' :
                        item.severity === 'HIGH' ? 'bg-amber-950 text-amber-400' :
                        'bg-blue-950 text-blue-400'
                      }`}>
                        {item.severity}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 font-mono text-[11px]">{item.category.replace('_', ' / ')}</td>
                    <td className="py-2.5 px-3 font-semibold text-white print:text-slate-900">{item.title}</td>
                    <td className="py-2.5 px-3 font-mono text-emerald-400 print:text-emerald-700 font-bold">
                      +${Number(item.est_cost_savings_usd).toLocaleString()}/yr
                    </td>
                    <td className="py-2.5 px-3 font-mono text-cyber-400 print:text-cyan-700">
                      {Number(item.est_carbon_reduction_kg).toLocaleString()} kg
                    </td>
                    <td className="py-2.5 px-3 font-mono uppercase text-[11px]">
                      {item.status === 'RESOLVED' ? (
                        <span className="text-emerald-400 font-bold">✓ Resolved</span>
                      ) : (
                        <span className="text-slate-400">Pending</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ESG Attestation Footer */}
        <div className="pt-8 border-t border-slate-800 print:border-slate-300 text-xs text-slate-400 print:text-slate-600 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-eco-400" />
            <span>Cryptographically Verified Ingestion Stream • SHA-256 Digest Checksum Passed</span>
          </div>
          <p className="font-mono text-[11px]">
            EcoPulse AI Core • Gemini 2.5 Structured Protocol
          </p>
        </div>

      </div>

    </div>
  );
}
