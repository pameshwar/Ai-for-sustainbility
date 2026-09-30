import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Circle, 
  Clock, 
  ChevronRight, 
  DollarSign, 
  Leaf, 
  Filter,
  Zap,
  Droplets,
  Trash2,
  Sparkles,
  AlertTriangle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import RemediationModal from './RemediationModal';

export default function ActionFeed({ items = [], onToggleStatus, onTriggerReAudit, isAuditing = false }) {
  const [filterCategory, setFilterCategory] = useState('ALL');
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [selectedItem, setSelectedItem] = useState(null);

  const handleStatusChange = (id, newStatus) => {
    if (newStatus === 'RESOLVED') {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 }
      });
    }
    onToggleStatus(id, newStatus);
  };

  const filteredItems = items.filter(item => {
    if (filterCategory !== 'ALL' && item.category !== filterCategory) return false;
    if (filterStatus !== 'ALL' && item.status !== filterStatus) return false;
    return true;
  });

  const severityStyles = {
    CRITICAL: 'text-rose-400 bg-rose-950/60 border-rose-500/40',
    HIGH: 'text-amber-400 bg-amber-950/60 border-amber-500/40',
    MEDIUM: 'text-blue-400 bg-blue-950/60 border-blue-500/40',
    LOW: 'text-emerald-400 bg-emerald-950/60 border-emerald-500/40'
  };

  const categoryIcons = {
    energy_hvac: Zap,
    water_plumbing: Droplets,
    waste_management: Trash2
  };

  return (
    <div className="p-6 rounded-2xl glass-card">
      {/* Feed Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="font-display font-bold text-lg text-white">AI Resource Anomaly Feed</h2>
            <span className="px-2 py-0.5 rounded-full text-xs font-mono font-semibold bg-eco-500/20 text-eco-300 border border-eco-500/30">
              {items.filter(i => i.status !== 'RESOLVED').length} Active
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Prioritized engineering remediation tasks powered by Gemini 2.5 structured telemetry audit.
          </p>
        </div>

        {/* Re-Audit Trigger Button */}
        {onTriggerReAudit && (
          <button
            onClick={onTriggerReAudit}
            disabled={isAuditing}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-eco-400 border border-eco-500/30 transition-all disabled:opacity-50"
          >
            <Sparkles className={`w-3.5 h-3.5 ${isAuditing ? 'animate-spin' : ''}`} />
            <span>{isAuditing ? 'Auditing Telemetry...' : 'Run Gemini Re-Audit'}</span>
          </button>
        )}
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3 py-4 border-b border-slate-800/80">
        {/* Domain Filters */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {[
            { id: 'ALL', label: 'All Domains' },
            { id: 'energy_hvac', label: 'Energy / HVAC', icon: Zap },
            { id: 'water_plumbing', label: 'Water', icon: Droplets },
            { id: 'waste_management', label: 'Waste', icon: Trash2 },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setFilterCategory(tab.id)}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                filterCategory === tab.id
                  ? 'bg-eco-500/20 text-eco-300 border border-eco-500/40'
                  : 'text-slate-400 hover:text-white bg-slate-900/60 border border-slate-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Status Filters */}
        <div className="flex items-center gap-1 bg-slate-900/80 p-1 rounded-lg border border-slate-800">
          {['ALL', 'PENDING', 'RESOLVED'].map(st => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`px-2.5 py-0.5 rounded text-[11px] font-medium transition-all ${
                filterStatus === st
                  ? 'bg-slate-700 text-white font-semibold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Items List */}
      <div className="mt-4 space-y-3">
        {filteredItems.length === 0 ? (
          <div className="py-12 text-center text-slate-400">
            <CheckCircle2 className="w-10 h-10 text-eco-500 mx-auto mb-2 opacity-60" />
            <p className="text-sm font-medium text-slate-300">No anomalies match the current filters.</p>
            <p className="text-xs text-slate-500 mt-1">All resource streams within optimal tolerance!</p>
          </div>
        ) : (
          filteredItems.map(item => {
            const Icon = categoryIcons[item.category] || Zap;
            const isResolved = item.status === 'RESOLVED';

            return (
              <div
                key={item.id}
                className={`p-4 rounded-xl border transition-all ${
                  isResolved
                    ? 'bg-slate-900/30 border-slate-800/60 opacity-60'
                    : 'bg-slate-900/70 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  {/* Left: Checkbox & Info */}
                  <div className="flex items-start gap-3 flex-1 min-w-0">
                    <button
                      onClick={() => handleStatusChange(item.id, isResolved ? 'PENDING' : 'RESOLVED')}
                      title={isResolved ? 'Mark as Unresolved' : 'Mark as Resolved (+Score)'}
                      className="mt-0.5 text-slate-500 hover:text-eco-400 transition-colors shrink-0"
                    >
                      {isResolved ? (
                        <CheckCircle2 className="w-5 h-5 text-eco-400 fill-eco-950" />
                      ) : (
                        <Circle className="w-5 h-5 hover:stroke-eco-400" />
                      )}
                    </button>

                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold border ${severityStyles[item.severity] || severityStyles.MEDIUM}`}>
                          {item.severity}
                        </span>
                        <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
                          <Icon className="w-3 h-3 text-slate-400" />
                          <span>{item.category.replace('_', ' / ')}</span>
                        </span>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-medium ${
                          isResolved ? 'bg-emerald-950 text-emerald-400' : 'bg-slate-800 text-slate-400'
                        }`}>
                          {item.status}
                        </span>
                      </div>

                      <h3 className={`text-sm font-semibold truncate ${isResolved ? 'line-through text-slate-400' : 'text-white'}`}>
                        {item.title}
                      </h3>

                      <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                        {item.impact_description}
                      </p>

                      {/* ROI Badges */}
                      <div className="mt-3 flex flex-wrap items-center gap-4 text-xs font-mono">
                        <div className="flex items-center gap-1 text-emerald-400 font-semibold">
                          <DollarSign className="w-3.5 h-3.5" />
                          <span>+${Number(item.est_cost_savings_usd).toLocaleString()}/yr</span>
                        </div>
                        <div className="flex items-center gap-1 text-cyber-400 font-semibold">
                          <Leaf className="w-3.5 h-3.5" />
                          <span>-{Number(item.est_carbon_reduction_kg).toLocaleString()} kg CO2</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right: Slide-over details button */}
                  <button
                    onClick={() => setSelectedItem(item)}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white shrink-0 transition-colors"
                  >
                    <span>View Plan</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Slide-over Remediation Modal */}
      <RemediationModal
        item={selectedItem}
        isOpen={Boolean(selectedItem)}
        onClose={() => setSelectedItem(null)}
        onToggleStatus={handleStatusChange}
      />
    </div>
  );
}
