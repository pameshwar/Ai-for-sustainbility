import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  RefreshCw, 
  FileText, 
  AlertTriangle, 
  ArrowRight, 
  CheckCircle2, 
  Calendar, 
  TrendingUp, 
  Building2,
  ShieldCheck,
  Zap,
  Droplets,
  Trash2
} from 'lucide-react';
import { api } from '../lib/api';
import { useAuth } from '../context/AuthContext';
import ScoreGauge from '../components/ScoreGauge';
import MetricCard from '../components/MetricCard';
import TelemetryChart from '../components/TelemetryChart';
import ActionFeed from '../components/ActionFeed';

export default function Dashboard({ onScoreUpdate }) {
  const { user, facility } = useAuth();
  const [loading, setLoading] = useState(true);
  const [auditing, setAuditing] = useState(false);
  const [assessment, setAssessment] = useState(null);
  const [actionItems, setActionItems] = useState([]);
  const [telemetry, setTelemetry] = useState([]);
  const [error, setError] = useState('');
  const [toastMessage, setToastMessage] = useState('');

  const loadData = async () => {
    try {
      setLoading(true);
      setError('');
      const [assessmentRes, telemetryRes] = await Promise.all([
        api.getLatestAssessment(),
        api.getTelemetry('', 168)
      ]);

      setAssessment(assessmentRes.assessment);
      setActionItems(assessmentRes.action_items || []);
      setTelemetry(telemetryRes.telemetry || []);
      
      if (onScoreUpdate && assessmentRes.assessment?.ecopulse_score) {
        onScoreUpdate(assessmentRes.assessment.ecopulse_score);
      }
    } catch (err) {
      console.error(err);
      setError('Could not load dashboard data. Retrying with local cache...');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleTriggerAudit = async () => {
    try {
      setAuditing(true);
      const res = await api.triggerAudit();
      setAssessment(res.assessment);
      setActionItems(res.action_items || []);
      if (onScoreUpdate && res.assessment?.ecopulse_score) {
        onScoreUpdate(res.assessment.ecopulse_score);
      }
      showToast('Gemini 2.5 audit complete! Anomaly list updated.');
    } catch (err) {
      console.error(err);
      showToast('Audit failed: ' + err.message);
    } finally {
      setAuditing(false);
    }
  };

  const handleToggleStatus = async (id, status) => {
    try {
      const res = await api.updateActionItemStatus(id, status);
      // Update local action items
      setActionItems(prev => prev.map(item => item.id === id ? { ...item, status } : item));
      
      if (res.new_ecopulse_score) {
        setAssessment(prev => ({ ...prev, ecopulse_score: res.new_ecopulse_score }));
        if (onScoreUpdate) onScoreUpdate(res.new_ecopulse_score);
        showToast(`EcoPulse score increased to ${res.new_ecopulse_score}! 🎉`);
      }
    } catch (err) {
      console.error(err);
      showToast('Failed to update status');
    }
  };

  const handleInjectSpike = async (domain) => {
    try {
      await api.injectSpike(domain);
      const telemetryRes = await api.getTelemetry('', 168);
      setTelemetry(telemetryRes.telemetry || []);
      showToast(`Simulated anomaly spike injected into ${domain.replace('_', ' ')}! Run re-audit to detect.`);
    } catch (err) {
      console.error(err);
      showToast('Simulation injection failed');
    }
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 4500);
  };

  // Compute live card values from telemetry
  const latestEnergy = telemetry.filter(t => t.resource_type === 'energy_hvac').slice(-1)[0]?.metric_value || 462.8;
  const latestWater = telemetry.filter(t => t.resource_type === 'water_plumbing').slice(-1)[0]?.metric_value || 1180;
  const latestWaste = telemetry.filter(t => t.resource_type === 'waste_management').slice(-1)[0]?.metric_value || 185;

  const currentScore = assessment?.ecopulse_score || 71;
  const pendingCount = actionItems.filter(i => i.status !== 'RESOLVED').length;
  const criticalCount = actionItems.filter(i => i.severity === 'CRITICAL' && i.status !== 'RESOLVED').length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-2xl glass-panel border border-eco-500/50 shadow-2xl text-xs font-semibold text-eco-300 flex items-center gap-2 animate-in slide-in-from-bottom duration-300">
          <Sparkles className="w-4 h-4 text-eco-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Dashboard Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
            <Building2 className="w-3.5 h-3.5 text-eco-400" />
            <span className="text-white font-semibold">{facility?.name || 'Metropolis Tower One'}</span>
            <span>•</span>
            <span>75,000 sq ft</span>
            <span>•</span>
            <span className="text-emerald-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Continuous Telemetry Ingestion
            </span>
          </div>

          <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-white mt-1">
            Sustainability & Resource Command Center
          </h1>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={loadData}
            title="Refresh Telemetry"
            className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>

          <Link
            to="/reports"
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700/80 transition-colors"
          >
            <FileText className="w-4 h-4 text-cyber-400" />
            <span>Executive Report</span>
          </Link>

          <button
            onClick={handleTriggerAudit}
            disabled={auditing}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-eco-500 to-cyber-500 hover:from-eco-400 hover:to-cyber-400 text-obsidian-950 shadow-glow-emerald transition-all transform hover:scale-[1.02] disabled:opacity-50"
          >
            <Sparkles className={`w-4 h-4 ${auditing ? 'animate-spin' : ''}`} />
            <span>{auditing ? 'Auditing with Gemini...' : 'Run Gemini Re-Audit'}</span>
          </button>
        </div>
      </div>

      {/* Critical Alert Warning Banner (If critical anomalies exist) */}
      {criticalCount > 0 && (
        <div className="p-4 rounded-2xl bg-gradient-to-r from-rose-950/80 via-slate-900 to-rose-950/80 border border-rose-500/40 shadow-glow-rose flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center shrink-0">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-mono font-bold text-rose-400 uppercase tracking-wider">
                {criticalCount} Critical Resource Inefficiencies Flagged
              </p>
              <p className="text-xs text-slate-300 mt-0.5">
                Significant off-hours HVAC load or unmetered water flow detected. Resolving these items recovers up to $33,900/yr.
              </p>
            </div>
          </div>
          <Link
            to="/action-plan"
            className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-rose-500 text-obsidian-950 hover:bg-rose-400 shrink-0 flex items-center gap-1 transition-colors"
          >
            <span>Fix Now</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      )}

      {/* Top Grid: ScoreGauge & 4 Key Metric Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Dynamic Circular ScoreGauge */}
        <div className="lg:col-span-4">
          <ScoreGauge score={currentScore} previousScore={65} />
        </div>

        {/* Right: Metric Cards Grid */}
        <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
          
          <MetricCard
            category="energy_hvac"
            title="Active Power Draw"
            value={Number(latestEnergy).toFixed(1)}
            unit="kWh"
            trend="+14.2%"
            trendDirection="up"
            status={criticalCount > 0 ? "Spike Alert" : "Nominal"}
            statusType={criticalCount > 0 ? "warning" : "nominal"}
            subtext="Off-hours chiller load detected at 02:00 AM"
          />

          <MetricCard
            category="water_plumbing"
            title="Water Consumption"
            value={Number(latestWater).toFixed(0)}
            unit="Liters/hr"
            trend="+9.8%"
            trendDirection="up"
            status="Leak Detected"
            statusType="warning"
            subtext="Continuous flow 280 L/hr failing zero baseline"
          />

          <MetricCard
            category="waste_management"
            title="Daily Compaction"
            value={Number(latestWaste).toFixed(0)}
            unit="kg / day"
            trend="-4.5%"
            trendDirection="down"
            status="Diversion 38%"
            statusType="warning"
            subtext="Cardboard baling opportunity identified"
          />

          <MetricCard
            category="carbon_offset"
            title="Potential CO2 Abated"
            value="82.7"
            unit="Tons CO2e"
            trend="+24.0%"
            trendDirection="down"
            status="LEED Arc Ready"
            statusType="nominal"
            subtext="Equivalent to 3,810 mature trees planted"
          />

        </div>
      </div>

      {/* Middle Section: Time-Series Recharts Visualizer */}
      <TelemetryChart
        telemetryData={telemetry}
        onInjectSpike={handleInjectSpike}
      />

      {/* Bottom Section: AI Anomaly Action Feed */}
      <ActionFeed
        items={actionItems}
        onToggleStatus={handleToggleStatus}
        onTriggerReAudit={handleTriggerAudit}
        isAuditing={auditing}
      />

    </div>
  );
}
