import React, { useState, useEffect } from 'react';
import { 
  CheckSquare, 
  Sparkles, 
  DollarSign, 
  Leaf, 
  ShieldCheck, 
  AlertTriangle, 
  RefreshCw,
  Zap,
  Droplets,
  Trash2,
  TrendingUp,
  Circle
} from 'lucide-react';
import { api } from '../lib/api';
import ActionFeed from '../components/ActionFeed';
import RemediationModal from '../components/RemediationModal';

export default function ActionPlan({ onScoreUpdate }) {
  const [assessment, setAssessment] = useState(null);
  const [actionItems, setActionItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [auditing, setAuditing] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const loadActionPlan = async () => {
    try {
      setLoading(true);
      const res = await api.getLatestAssessment();
      setAssessment(res.assessment);
      setActionItems(res.action_items || []);
      if (onScoreUpdate && res.assessment?.ecopulse_score) {
        onScoreUpdate(res.assessment.ecopulse_score);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadActionPlan();
  }, []);

  const handleToggleStatus = async (id, status) => {
    try {
      const res = await api.updateActionItemStatus(id, status);
      setActionItems(prev => prev.map(item => item.id === id ? { ...item, status } : item));
      
      if (res.new_ecopulse_score) {
        setAssessment(prev => ({ ...prev, ecopulse_score: res.new_ecopulse_score }));
        if (onScoreUpdate) onScoreUpdate(res.new_ecopulse_score);
        showToast(`Item updated to ${status}! EcoPulse rating is now ${res.new_ecopulse_score}/100.`);
      }
    } catch (err) {
      console.error(err);
      showToast('Status update failed');
    }
  };

  const handleTriggerAudit = async () => {
    try {
      setAuditing(true);
      const res = await api.triggerAudit();
      setAssessment(res.assessment);
      setActionItems(res.action_items || []);
      if (onScoreUpdate && res.assessment?.ecopulse_score) {
        onScoreUpdate(res.assessment.ecopulse_score);
      }
      showToast('Gemini sustainability re-audit completed!');
    } catch (err) {
      console.error(err);
      showToast('Audit failed: ' + err.message);
    } finally {
      setAuditing(false);
    }
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 4500);
  };

  // Metrics
  const totalPotentialSavings = actionItems.reduce((acc, i) => acc + Number(i.est_cost_savings_usd || 0), 0);
  const totalCarbonOffset = actionItems.reduce((acc, i) => acc + Number(i.est_carbon_reduction_kg || 0), 0);
  const resolvedSavings = actionItems.filter(i => i.status === 'RESOLVED').reduce((acc, i) => acc + Number(i.est_cost_savings_usd || 0), 0);
  const resolvedCount = actionItems.filter(i => i.status === 'RESOLVED').length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-2xl glass-panel border border-eco-500/50 shadow-2xl text-xs font-semibold text-eco-300 flex items-center gap-2 animate-in slide-in-from-bottom duration-300">
          <Sparkles className="w-4 h-4 text-eco-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono text-eco-400 uppercase tracking-widest font-semibold block mb-1">
            Engineering Action Playbooks
          </span>
          <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-white">
            Prioritized Remediation Checklist
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            AI-detected anomalies mapped directly to building engineer work orders with verified ROI.
          </p>
        </div>

        <button
          onClick={handleTriggerAudit}
          disabled={auditing}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-eco-500 to-cyber-500 hover:from-eco-400 hover:to-cyber-400 text-obsidian-950 shadow-glow-emerald transition-all transform hover:scale-[1.02] disabled:opacity-50"
        >
          <Sparkles className={`w-4 h-4 ${auditing ? 'animate-spin' : ''}`} />
          <span>{auditing ? 'Auditing Telemetry...' : 'Trigger Gemini Re-Audit'}</span>
        </button>
      </div>

      {/* Summary KPI Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        
        <div className="p-5 rounded-2xl glass-card">
          <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block">Total Recapture Pool</span>
          <div className="mt-1 flex items-baseline gap-1 text-emerald-400">
            <span className="font-display font-extrabold text-3xl">${totalPotentialSavings.toLocaleString()}</span>
            <span className="text-xs text-slate-400">/yr</span>
          </div>
          <p className="text-xs text-slate-400 mt-1">Available across all active recommendations.</p>
        </div>

        <div className="p-5 rounded-2xl glass-card">
          <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block">Realized Savings</span>
          <div className="mt-1 flex items-baseline gap-1 text-eco-400">
            <span className="font-display font-extrabold text-3xl">${resolvedSavings.toLocaleString()}</span>
            <span className="text-xs text-slate-400">/yr</span>
          </div>
          <p className="text-xs text-slate-400 mt-1">{resolvedCount} of {actionItems.length} playbooks completed.</p>
        </div>

        <div className="p-5 rounded-2xl glass-card">
          <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block">Carbon Offset Pool</span>
          <div className="mt-1 flex items-baseline gap-1 text-cyber-400">
            <span className="font-display font-extrabold text-3xl">{(totalCarbonOffset / 1000).toFixed(1)}</span>
            <span className="text-xs text-slate-400">Tons CO2e</span>
          </div>
          <p className="text-xs text-slate-400 mt-1">Equivalent to {(totalCarbonOffset / 21.7).toFixed(0)} trees planted.</p>
        </div>

        <div className="p-5 rounded-2xl glass-card">
          <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block">EcoPulse Rating</span>
          <div className="mt-1 flex items-baseline gap-1 text-white">
            <span className="font-display font-extrabold text-3xl">{assessment?.ecopulse_score || 71}</span>
            <span className="text-xs text-slate-400">/ 100</span>
          </div>
          <p className="text-xs text-slate-400 mt-1">Recalculates dynamically upon each fix.</p>
        </div>

      </div>

      {/* Main Action Feed Component */}
      <ActionFeed
        items={actionItems}
        onToggleStatus={handleToggleStatus}
        onTriggerReAudit={handleTriggerAudit}
        isAuditing={auditing}
      />

    </div>
  );
}
