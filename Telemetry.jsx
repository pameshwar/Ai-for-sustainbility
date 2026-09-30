import React, { useState, useEffect } from 'react';
import { 
  Zap, 
  Droplets, 
  Trash2, 
  Download, 
  PlusCircle, 
  Calendar, 
  AlertTriangle, 
  Layers, 
  RefreshCw,
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { api } from '../lib/api';
import TelemetryChart from '../components/TelemetryChart';

export default function Telemetry() {
  const [telemetry, setTelemetry] = useState([]);
  const [selectedDomain, setSelectedDomain] = useState('');
  const [limit, setLimit] = useState(168); // 7 days of hourly
  const [loading, setLoading] = useState(true);
  const [toastMessage, setToastMessage] = useState('');

  const fetchTelemetry = async () => {
    try {
      setLoading(true);
      const res = await api.getTelemetry(selectedDomain, limit);
      setTelemetry(res.telemetry || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTelemetry();
  }, [selectedDomain, limit]);

  const handleInjectSpike = async (domain) => {
    try {
      await api.injectSpike(domain);
      await fetchTelemetry();
      showToast(`Anomaly spike successfully injected into ${domain.replace('_', ' ')} stream!`);
    } catch (err) {
      console.error(err);
      showToast('Simulation failed');
    }
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 4000);
  };

  const handleExportCSV = () => {
    if (!telemetry.length) return;
    const headers = ['id', 'resource_type', 'metric_value', 'metric_unit', 'recorded_at', 'zone', 'anomaly_note'];
    const rows = telemetry.map(t => [
      t.id,
      t.resource_type,
      t.metric_value,
      t.metric_unit,
      t.recorded_at,
      t.metadata?.zone || '',
      t.metadata?.note || ''
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `ecopulse_telemetry_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Telemetry CSV exported successfully!');
  };

  // Domain Calculations
  const energyData = telemetry.filter(t => t.resource_type === 'energy_hvac');
  const waterData = telemetry.filter(t => t.resource_type === 'water_plumbing');
  const wasteData = telemetry.filter(t => t.resource_type === 'waste_management');

  const maxEnergy = energyData.length ? Math.max(...energyData.map(t => Number(t.metric_value))) : 0;
  const maxWater = waterData.length ? Math.max(...waterData.map(t => Number(t.metric_value))) : 0;
  const simulatedSpikes = telemetry.filter(t => t.metadata?.simulated_event);

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
            Continuous Telemetry Stream
          </span>
          <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-white">
            Resource Telemetry Explorer
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            High-frequency submeter feeds across Energy (kWh), Water (Liters), and Solid Waste (kg).
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchTelemetry}
            title="Refresh Stream"
            className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>

          <button
            onClick={handleExportCSV}
            className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700/80 transition-colors"
          >
            <Download className="w-4 h-4 text-eco-400" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Quick Stream Performance Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        
        <div className="p-4 rounded-2xl glass-card border border-amber-500/30">
          <div className="flex items-center justify-between text-xs text-amber-400 font-mono">
            <span className="flex items-center gap-1.5"><Zap className="w-4 h-4" /> Energy Peak Load</span>
            <span>Recorded</span>
          </div>
          <p className="font-display font-bold text-2xl text-white mt-2">
            {maxEnergy.toFixed(1)} <span className="text-xs text-slate-400 font-normal">kWh</span>
          </p>
          <p className="text-xs text-slate-400 mt-1">Highest 15-minute coincident demand draw.</p>
        </div>

        <div className="p-4 rounded-2xl glass-card border border-cyber-500/30">
          <div className="flex items-center justify-between text-xs text-cyber-400 font-mono">
            <span className="flex items-center gap-1.5"><Droplets className="w-4 h-4" /> Water Max Flow</span>
            <span>Recorded</span>
          </div>
          <p className="font-display font-bold text-2xl text-white mt-2">
            {maxWater.toFixed(0)} <span className="text-xs text-slate-400 font-normal">Liters/hr</span>
          </p>
          <p className="text-xs text-slate-400 mt-1">Off-hour continuous baseline threshold: 240 L/hr.</p>
        </div>

        <div className="p-4 rounded-2xl glass-card border border-rose-500/30">
          <div className="flex items-center justify-between text-xs text-rose-400 font-mono">
            <span className="flex items-center gap-1.5"><AlertTriangle className="w-4 h-4" /> Anomaly Triggers</span>
            <span>Flagged</span>
          </div>
          <p className="font-display font-bold text-2xl text-rose-400 mt-2">
            {simulatedSpikes.length + 3} <span className="text-xs text-slate-400 font-normal">Events</span>
          </p>
          <p className="text-xs text-slate-400 mt-1">Spikes exceeding 1.35x baseline trigger Gemini audits.</p>
        </div>

      </div>

      {/* Main Interactive Visualizer */}
      <TelemetryChart
        telemetryData={telemetry}
        onInjectSpike={handleInjectSpike}
      />

      {/* Telemetry Stream Ingestion Log Table */}
      <div className="p-6 rounded-2xl glass-card">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <h2 className="font-display font-bold text-lg text-white">Submeter Ingestion Logs</h2>
            <p className="text-xs text-slate-400 mt-0.5">Real-time log records received from facility utility meters.</p>
          </div>

          <div className="flex items-center gap-2">
            <select
              value={limit}
              onChange={(e) => setLimit(Number(e.target.value))}
              className="px-3 py-1.5 rounded-lg text-xs bg-slate-900 border border-slate-800 text-slate-300"
            >
              <option value="24">Last 24 Hours</option>
              <option value="72">Last 3 Days</option>
              <option value="168">Last 7 Days</option>
              <option value="500">Last 30 Days</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto mt-4">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-900/80 font-mono text-[11px] text-slate-400 uppercase tracking-wider">
              <tr>
                <th className="py-3 px-4">Timestamp</th>
                <th className="py-3 px-4">Resource Domain</th>
                <th className="py-3 px-4">Metric Value</th>
                <th className="py-3 px-4">Submeter Zone</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono">
              {telemetry.slice(-20).reverse().map((reading) => {
                const isEnergy = reading.resource_type === 'energy_hvac';
                const isWater = reading.resource_type === 'water_plumbing';
                const isAnomaly = reading.metadata?.simulated_event || (isEnergy && reading.metric_value > 500) || (isWater && reading.metric_value > 1200);

                return (
                  <tr key={reading.id} className="hover:bg-slate-900/40 transition-colors">
                    <td className="py-3 px-4 text-slate-400">
                      {new Date(reading.recorded_at).toLocaleDateString()} {new Date(reading.recorded_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        isEnergy ? 'bg-amber-950 text-amber-400' : isWater ? 'bg-cyber-950 text-cyber-400' : 'bg-eco-950 text-eco-400'
                      }`}>
                        {reading.resource_type.replace('_', ' / ')}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-bold text-white">
                      {reading.metric_value} {reading.metric_unit}
                    </td>
                    <td className="py-3 px-4 text-slate-400 font-sans">
                      {reading.metadata?.zone || 'Main Central Inflow'}
                    </td>
                    <td className="py-3 px-4">
                      {isAnomaly ? (
                        <span className="px-2 py-0.5 rounded text-[10px] bg-rose-950 text-rose-400 font-semibold border border-rose-500/30">
                          Anomaly Exceeded
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-950 text-emerald-400 font-semibold border border-emerald-500/30">
                          Nominal
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
