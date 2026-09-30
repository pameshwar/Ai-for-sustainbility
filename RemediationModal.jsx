import React from 'react';
import { X, CheckCircle2, DollarSign, Leaf, AlertTriangle, ArrowRight, Wrench, ShieldAlert } from 'lucide-react';

export default function RemediationModal({ item, isOpen, onClose, onToggleStatus }) {
  if (!isOpen || !item) return null;

  const severityBadges = {
    CRITICAL: 'bg-rose-500/20 text-rose-300 border-rose-500/40',
    HIGH: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
    MEDIUM: 'bg-blue-500/20 text-blue-300 border-blue-500/40',
    LOW: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
  };

  const isResolved = item.status === 'RESOLVED';

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex justify-end transition-opacity">
      <div className="relative w-full max-w-xl min-h-screen glass-panel p-6 sm:p-8 flex flex-col justify-between border-l border-slate-700/80 shadow-2xl animate-in slide-in-from-right duration-300">
        
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <span className={`px-2.5 py-1 rounded-full text-xs font-mono font-bold border ${severityBadges[item.severity] || severityBadges.MEDIUM}`}>
                {item.severity} ANOMALY
              </span>
              <span className="text-xs font-mono text-slate-400 uppercase">
                {item.category.replace('_', ' / ')}
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Title & Impact Description */}
          <div className="mt-5">
            <h2 className="font-display font-bold text-2xl text-white">
              {item.title}
            </h2>
            <div className="mt-3 p-4 rounded-xl bg-slate-900/80 border border-slate-800">
              <div className="flex items-start gap-2.5">
                <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <p className="text-sm text-slate-300 leading-relaxed">
                  {item.impact_description}
                </p>
              </div>
            </div>
          </div>

          {/* Financial & Carbon ROI Tiles */}
          <div className="mt-6 grid grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/30">
              <div className="flex items-center gap-1.5 text-xs font-mono text-emerald-400">
                <DollarSign className="w-4 h-4" />
                <span>Est. Annual Savings</span>
              </div>
              <p className="mt-1 font-display font-extrabold text-2xl text-emerald-300">
                ${Number(item.est_cost_savings_usd).toLocaleString()}
                <span className="text-xs font-sans font-normal text-slate-400 ml-1">/yr</span>
              </p>
            </div>

            <div className="p-4 rounded-xl bg-cyber-950/30 border border-cyber-500/30">
              <div className="flex items-center gap-1.5 text-xs font-mono text-cyber-400">
                <Leaf className="w-4 h-4" />
                <span>Est. Carbon Reduction</span>
              </div>
              <p className="mt-1 font-display font-extrabold text-2xl text-cyber-300">
                {Number(item.est_carbon_reduction_kg).toLocaleString()}
                <span className="text-xs font-sans font-normal text-slate-400 ml-1">kg CO2</span>
              </p>
            </div>
          </div>

          {/* Remediation Action Steps */}
          <div className="mt-6">
            <h3 className="text-sm font-semibold text-slate-200 flex items-center gap-2 mb-3">
              <Wrench className="w-4 h-4 text-eco-400" />
              <span>Step-by-Step Remediation Plan</span>
            </h3>

            <div className="space-y-3">
              {(Array.isArray(item.remediation_steps) ? item.remediation_steps : [item.remediation_steps]).map((step, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-slate-900/60 border border-slate-800">
                  <div className="w-6 h-6 rounded-full bg-slate-800 text-eco-400 font-mono text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 leading-normal">
                    {step}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="mt-8 pt-6 border-t border-slate-800 flex items-center justify-between gap-4">
          <div className="text-xs text-slate-400">
            Current Status: <span className="font-semibold text-white uppercase">{item.status}</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-sm text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
            >
              Close
            </button>

            <button
              onClick={() => {
                const nextStatus = isResolved ? 'PENDING' : 'RESOLVED';
                onToggleStatus(item.id, nextStatus);
                onClose();
              }}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold shadow-lg transition-all ${
                isResolved
                  ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  : 'bg-gradient-to-r from-eco-500 to-cyber-500 text-obsidian-950 hover:brightness-110 shadow-glow-emerald'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{isResolved ? 'Re-open Action Item' : 'Mark as Resolved (+Score)'}</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
